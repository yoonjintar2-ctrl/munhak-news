"""쇼츠 본문 = 지면 줄거리 그대로 (발행인 11/14: "쇼츠 나레이션이 사이트 작품 요약 텍스트를 전부 다 읽게")
  python3 scripts/shorts/fill_body.py shorts/scripts/<날짜>.json <호 JSON: drafts/<날짜>.json 또는 today.json>
· classic·modern 의 body 를 지면 story 의 모든 문장으로 채우고(자막 마디 ' / ' 자동 표시),
· scenes 를 지면 장면에 맞춰 다시 짠다: 문단 p 를 읽는 동안 = 그 문단 장면(scenes.after == p), 없으면 대표 영상.
· intro·outro·opener 는 사람이 쓴 그대로 둔다(outro 에서 줄거리를 되풀이하지 않게).
· tts_name 이 없으면 shorts-<날짜> 를 쓴다. 이미 같은 이름으로 다른 문장을 녹음 중이면 tts_name 을 새로 정해 넘길 것(--name).
길이: 지면 story 1,000~1,150자면 쇼츠 전체 약 2분 30초~2분 50초(유튜브 쇼츠 한도 3분)."""
import json, re, sys

DEP = ('듯', '것', '수', '줄', '때', '건', '데', '만큼', '뿐', '척', '채', '적', '대로', '듯이', '터', '뒤', '중', '쪽', '번')
MAXLEN = 14


def split_sentences(par):
    par = re.sub(r'\s+', ' ', par).strip()
    parts = re.split(r'(?<=[.?!…])\s+|(?<=[.?!…]["”’」』\'])\s+', par)
    return [p.strip() for p in parts if p and p.strip()]


GOOD_END = set('은는이가을를에와과도의로고며서면만요다께니랑데지')   # '게'는 빼 둠(…게 되다/하다)   # 이 글자로 끝나는 어절 뒤에서 끊으면 자연스러움(조사·연결어미)


def _protect(s):
    """「…」 『…』 "…" '…' 같은 묶음(제목·인용)은 띄어쓰기를 임시 문자로 바꿔 한 마디로 다룬다(24자 이하)."""
    def rep(m):
        t = m.group(0)
        return t.replace(' ', '\u00a0') if len(t) <= 24 else t
    return re.sub(r"「[^」]*」|『[^』]*』|\"[^\"]*\"|“[^”]*”|'[^']*'", rep, s)


def _bare(w): return re.sub(r'[^가-힣A-Za-z0-9]', '', w)


def _isdep(w):
    """의존 명사·보조 용언으로 시작하는 어절('듯이', '것을', '수', '중이지요' 등) — 앞말과 떼지 않는다. '건너던'처럼 우연히 같은 글자로 시작하는 말은 제외."""
    b = _bare(w)
    return any(b == d or (b.startswith(d) and len(b) - len(d) <= 3 and len(d) == 1 and b[len(d):len(d) + 1] in '이을은가도에만를로이') or (len(d) > 1 and b.startswith(d)) for d in DEP)


def chunk(sentence, maxlen=MAXLEN):
    s = _protect(sentence); out = []
    for seg in [x.strip() for x in re.split(r'(?<=,) +', s) if x.strip()]:
        words = seg.split(' '); cur = []
        for w in words:
            if cur and len(' '.join(cur + [w])) > maxlen:
                # 뒤에서부터 조사·연결어미로 끝나는 어절을 찾아 그 뒤에서 끊는다(앞 마디가 너무 짧지 않게)
                cut = None
                for j in range(len(cur) - 1, -1, -1):
                    b = _bare(cur[j])
                    if len(b) >= 2 and b[-1] in GOOD_END and len(' '.join(cur[:j + 1])) >= 5 and not (j + 1 < len(cur) and _isdep(cur[j + 1])) and not (j + 1 >= len(cur) and _isdep(w)):
                        cut = j; break
                if cut is None:
                    if _isdep(w): cur.append(w); continue
                    cut = len(cur) - 1
                    while cut > 0 and len(_bare(cur[cut])) <= 1: cut -= 1      # '허'처럼 한 글자 어절이 마디 끝에 홀로 남지 않게
                out.append(' '.join(cur[:cut + 1])); cur = cur[cut + 1:] + [w]
            else:
                cur.append(w)
        if cur: out.append(' '.join(cur))
    fixed = []                                             # 너무 짧은 마디(3자 이하)는 옆 마디에 붙임
    for c in out:
        if fixed and (len(c.replace(' ', '')) <= 3 or len(fixed[-1].replace(' ', '')) <= 3) and len(fixed[-1]) + 1 + len(c) <= maxlen + 5:
            fixed[-1] += ' ' + c
        else:
            fixed.append(c)
    return ' / '.join(fixed).replace('\u00a0', ' ')


def main(script, issue, name=None):
    S = json.load(open(script, encoding='utf-8')); I = json.load(open(issue, encoding='utf-8'))
    assert S['date'] == I['date'], (S['date'], I['date'])
    for k in ('classic', 'modern'):
        if k not in S or k not in I: continue
        C, P = S[k], I[k]; body, scenes = [], []
        sc_by_p = {sc['after']: sc['video'] for sc in (P.get('scenes') or []) if sc.get('video')}
        for p, par in enumerate(P.get('story') or []):
            v = sc_by_p.get(p, P.get('video') or C.get('video'))
            if not scenes or scenes[-1]['video'] != v: scenes.append({'from': len(body), 'video': v})
            body += [chunk(s) for s in split_sentences(par)]
        C['body'] = body; C['scenes'] = scenes; C['video'] = P.get('video') or C.get('video')
        C['title'] = P.get('title', C.get('title')); C['writer'] = P.get('writer', C.get('writer'))
        print(k, f'본문 {len(body)}문장, 장면 전환 {len(scenes)}번')
    if name: S['tts_name'] = name
    json.dump(S, open(script, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    a = sys.argv[1:]; nm = None
    if '--name' in a: i = a.index('--name'); nm = a[i + 1]; a = a[:i] + a[i + 2:]
    main(a[0], a[1], nm)
