#!/usr/bin/env python3
"""중복 검사 — 발행인 11/21 "바둑이나 퀴즈 그 외 모든 코너 전반에 중복은 절대 허용되지 않게".

사용:  python3 scripts/check_dupes.py D          # drafts/D.json(없으면 archive/D.json)을 지난 모든 호와 대조
       python3 scripts/check_dupes.py --all      # 지난 호끼리 이미 겹친 것 전부 보기
겹치는 것이 하나라도 있으면 목록을 찍고 종료 코드 1 (초안 작업은 고친 뒤 다시 돌려 0이 나와야 커밋).

검사하는 것(같은 호 안의 코너끼리도 작품이 겹치면 잡음):
  작품    sentence·poem·novel·classic·modern·food 의 (작가, 작품) — 어느 코너였든 한 번 나온 작품은 다시 안 씀
  문장    sentence.text, novel.quote, zodiac[].text
  인물    writer.name(오늘의 문인), man.name(오늘의 사나이)
  바둑    go.game(대국), go.title
  음식    food.name + food.work
  퀴즈    trivia[].q
  날짜    onthisday[].title, calendar
  처방    data/rx.json items[].text
  퍼즐    puzzle 정답 낱말이 지난 한 호와 절반 넘게 겹치면
"""
import json, os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def norm(s):
    s = str(s or '')
    s = re.sub(r'\(.*?\)|（.*?）', '', s)
    return re.sub(r'[\s\W_]+', '', s).lower()


def load_issues():
    out = {}
    for f in sorted(glob.glob(os.path.join(ROOT, 'archive', '20*.json'))):
        out[os.path.basename(f)[:10]] = json.load(open(f))
    for f in sorted(glob.glob(os.path.join(ROOT, 'drafts', '20*.json'))):
        d = os.path.basename(f)[:10]
        if d not in out:
            out[d] = json.load(open(f))
    return out


def keys(d):
    """(종류, 정규화 키, 보기 좋은 이름, 코너) 목록"""
    k = []
    for c in ('sentence', 'poem', 'novel', 'classic', 'modern', 'food'):
        x = d.get(c) or {}
        title = x.get('work') if c in ('sentence', 'food') else x.get('title')
        w = x.get('writer')
        if title:
            k.append(('작품', norm(w) + '|' + norm(title), f'{w} 「{title}」', c))
    s = d.get('sentence') or {}
    if s.get('text'):
        k.append(('문장', norm(s['text']), s['text'][:30], 'sentence'))
    n = d.get('novel') or {}
    if n.get('quote'):
        k.append(('문장', norm(n['quote']), n['quote'][:30], 'novel'))
    for z in d.get('zodiac') or []:
        if z.get('text'):
            k.append(('문장', norm(z['text']), z['text'][:30], 'zodiac'))
    w = d.get('writer') or {}
    if w.get('name'):
        k.append(('문인', norm(w['name']), w['name'], 'writer'))
    m = d.get('man') or {}
    if m.get('name'):
        k.append(('사나이', norm(m['name']), m['name'], 'man'))
        for alt in re.findall(r'\((.*?)\)', m['name']):
            k.append(('사나이', norm(alt), m['name'], 'man'))
    g = d.get('go') or {}
    if g.get('game'):
        k.append(('바둑 대국', norm(g['game']), g['game'], 'go'))
    if g.get('title'):
        k.append(('바둑 제목', norm(g['title']), g['title'], 'go'))
    f = d.get('food') or {}
    if f.get('name'):
        k.append(('음식', norm(f['name']) + '|' + norm(f.get('work')), f"{f['name']}({f.get('work')})", 'food'))
    for t in d.get('trivia') or []:
        if t.get('q'):
            k.append(('퀴즈', norm(t['q']), t['q'][:40], 'trivia'))
    for o in d.get('onthisday') or []:
        if o.get('title'):
            k.append(('그날의 문학', norm(o['title']), o['title'], 'onthisday'))
    if d.get('calendar'):
        k.append(('달력', norm(d['calendar']), d['calendar'][:40], 'calendar'))
    return k


def puzzle_words(d):
    return {norm(w.get('a')) for w in ((d.get('puzzle') or {}).get('words') or []) if w.get('a')}


def check(target, issues, only_before=False):
    probs = []
    seen = {}
    dates = sorted(issues)
    for D in dates:
        if D == target:
            continue
        if only_before and D > target:
            continue
        for kind, key, label, corner in keys(issues[D]):
            seen.setdefault((kind, key), []).append((D, corner, label))
    mine = keys(issues[target])
    inside = {}
    for kind, key, label, corner in mine:
        # 같은 호 안에서 다른 코너끼리 같은 작품
        if kind == '작품':
            if key in inside and inside[key] != corner:
                probs.append(f'[같은 호] 작품 {label}: {inside[key]} ↔ {corner}')
            inside.setdefault(key, corner)
        hits = list(seen.get((kind, key), []))
        if kind in ('사나이', '문인', '음식', '바둑 대국') and len(key) >= 3:
            # 이름 표기가 조금 달라도(앞에 '대한민국' 붙음, 괄호 속 영문 등) 한쪽이 다른 쪽을 품으면 같은 것으로 봄
            for (k2, key2), v in seen.items():
                if k2 == kind and key2 != key and len(key2) >= 3 and (key in key2 or key2 in key):
                    hits += v
        for D, c, l in hits:
            probs.append(f'[{kind}] {label} ({corner}) — 이미 {D} {c} 에 나옴')
    pw = puzzle_words(issues[target])
    if pw:
        for D in dates:
            if D == target or (only_before and D > target):
                continue
            o = puzzle_words(issues[D])
            if o and len(pw & o) > len(pw) / 2:
                probs.append(f'[퍼즐] 정답 낱말 {len(pw & o)}/{len(pw)}개가 {D} 퍼즐과 같음')
    return probs


def check_rx():
    p = os.path.join(ROOT, 'data', 'rx.json')
    if not os.path.exists(p):
        return []
    items = json.load(open(p)).get('items', [])
    seen, probs = {}, []
    for it in items:
        k = norm(it.get('text'))
        if not k:
            continue
        if k in seen:
            probs.append(f"[처방] {it.get('text','')[:30]} — {seen[k]} 와 {it.get('added')} 에 두 번")
        else:
            seen[k] = it.get('added')
    return probs


def main():
    issues = load_issues()
    if len(sys.argv) > 1 and sys.argv[1] == '--all':
        allp = []
        for D in sorted(issues):
            allp += [f'{D} {p}' for p in check(D, issues, only_before=True)]
        allp += check_rx()
        print('\n'.join(allp) or '겹치는 것 없음')
        sys.exit(1 if allp else 0)
    D = sys.argv[1]
    f = os.path.join(ROOT, 'drafts', D + '.json')
    if not os.path.exists(f):
        f = os.path.join(ROOT, 'archive', D + '.json')
    issues[D] = json.load(open(f))
    probs = check(D, issues) + check_rx()
    if probs:
        print(f'❌ {D} 중복 {len(probs)}건 — 다른 작품·인물·문제로 바꾼 뒤 다시 돌리세요')
        print('\n'.join(probs))
        sys.exit(1)
    print(f'✅ {D} 중복 없음')


if __name__ == '__main__':
    main()
