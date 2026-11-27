#!/usr/bin/env python3
"""유튜브 설명 만들기 — 영상 소개 + 오늘 문학늬우스 지면의 다른 코너 한 줄씩(발행인 11/15).
python3 scripts/shorts/yt_desc.py shorts/scripts/<날짜>.json classic /tmp/v/<날짜>-classic.timeline.json [repo=.]
"""
import json, os, sys


def ts(s): return '%d:%02d' % (s // 60, s % 60)


def clip(t, n): t = ' '.join(str(t or '').split()); return t if len(t) <= n else t[:n - 1].rstrip() + '…'


def main(script, kind, timeline, repo='.'):
    S = json.load(open(script, encoding='utf-8')); C = S[kind]; D0 = S['date']
    D = None
    for p in (f'archive/{D0}.json', f'drafts/{D0}.json', 'today.json'):
        fp = os.path.join(repo, p)
        if os.path.exists(fp):
            x = json.load(open(fp, encoding='utf-8'))
            if x.get('date') == D0: D = x; break
    if D and D.get(kind): C = {**D[kind], **C}
    T = json.load(open(timeline, encoding='utf-8'))['items']
    b = next(i['a'] for i in T if i['sec'] == 'body'); o = next(i['a'] for i in T if i['sec'] == 'outro')
    e = None
    if C.get('ending_from') is not None and C.get('story_n', 0) < len(C.get('body', [])):
        ln = (1 if S.get('opener') else 0) + len(C['intro']) + C['ending_from']
        e = next((i['a'] for i in T if i.get('ln') == ln), None)
    L = [f"1분 만에 떠먹여 주는, 1분 문학 — 오늘은 {C['writer']}의 「{C['title']}」({C.get('year', '')}).",
         '틀어 두고 들으세요. 줄거리를 연필이가 처음부터 결말까지 읽어 드려요.', '',
         f"⏱ 0:00 인트로 · {ts(b)} 줄거리" + (f" · {ts(e)} 결말" if e else '') + f" · {ts(o)} 연필이의 정리·오늘의 지면", '']
    if D:
        no = D.get('no'); md = f"{int(D0[5:7])}월 {int(D0[8:])}일"
        L.append(f"📰 오늘({md}, 제{no}호) 문학늬우스 지면에는")
        add = lambda s: L.append('· ' + s)
        if D.get('sentence'): x = D['sentence']; add(f"오늘의 문장 — {x['writer']} 「{x['work']}」 “{clip(' '.join(x['big']) if isinstance(x.get('big'), list) else x.get('big') or x.get('text', ''), 40)}”")
        if D.get('poem'): x = D['poem']; add(f"오늘의 시 — {x['writer']} 「{x['title']}」")
        if D.get('novel'): x = D['novel']; add(f"소설 구절 — {x['writer']} 『{x['title']}』")
        if D.get('writer'): add(f"오늘의 문인 — {D['writer']['name']}")
        other = 'modern' if kind == 'classic' else 'classic'
        if D.get(other): x = D[other]; add(f"{'1분 현대문학' if other == 'modern' else '1분 고전'} — {x['writer']} 「{x['title']}」 (같은 채널 영상도 함께)")
        if D.get('onthisday'): add(f"그날의 문학 — {clip(D['onthisday'][0]['title'], 40)}")
        if D.get('go'): add(f"오늘의 한 수 — {D['go']['title']} ({D['go']['game']})")
        if D.get('man'): add(f"오늘의 사나이 — {D['man']['name']}")
        if D.get('zodiac'): add("띠별 오늘의 문장 — 운세 대신 열두 띠에 문장 한 줄씩")
        add("그 밖에 문학 상식 OX · 낱말 퍼즐 · 기분 처방전")
        L.append('👉 https://mnews.jintar.co.kr')
        L.append('')
    L += ['나레이션: 연필이(AI 음성) · 그림: 문학늬우스 3D 삽화 · 음악: 문학늬우스 자체 제작',
          f"#1분문학 #문학늬우스 #{C['title'].replace(' ', '')} #{C['writer'].replace(' ', '')}"]
    out = '\n'.join(L)
    assert len(out) < 4900
    print(out)


if __name__ == '__main__':
    main(*sys.argv[1:])
