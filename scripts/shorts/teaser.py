"""본편(가로) → 세로 예고 쇼츠 대본 — 발행인 11/17 채널 개선 "쇼츠로 새 시청자를 본편으로"
  python3 scripts/shorts/teaser.py shorts/scripts/<날짜>.json classic   → shorts/scripts/<날짜>-classic-tz.json
인트로 + 본문 앞부분(약 40초 분량) + 마무리 한 줄(shorts_job 이 미리 읽혀 둔 <코너>_tz). 나레이션은 본편 테이크를 그대로 빌려 씀(새 녹음 없음).
만들기: python3 scripts/shorts/make_short.py shorts/scripts/<날짜>-classic-tz.json classic /tmp/q . /tmp/v/<날짜>-classic-tz.mp4"""
import json, re, sys
sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__)))
from shorts_job import TEASER_OUT


def main(script, kind, budget=210):
    S = json.load(open(script, encoding='utf-8')); C = S[kind]; D = S['date']
    n0 = len(C['intro']); body, keys, n = [], [f'{kind}_{i:02d}' for i in range(n0)], sum(len(re.sub(r'\s|/', '', l)) for l in C['intro'])
    for i, l in enumerate(C['body']):
        m = len(re.sub(r'\s|/', '', l))
        if body and n + m > budget: break
        body.append(l); keys.append(f'{kind}_{n0 + i:02d}'); n += m
    keys.append(f'{kind}_tz')
    T = {**C, 'body': body, 'outro': [TEASER_OUT], 'keys': keys,
         'scenes': [sc for sc in (C.get('scenes') or []) if sc['from'] < len(body)] or [{'from': 0, 'video': C['video']}],
         'yt': {'title': C['yt']['title'].split(' | ')[0] + ' (예고) | 1분 문학 #shorts ' + ' '.join(w for w in C['yt']['title'].split() if w.startswith('#'))[:60]}}
    T.pop('story_n', None); T.pop('ending_from', None)
    out = script.replace('.json', f'-{kind}-tz.json')
    json.dump({'date': D, 'format': 'portrait', 'tts_name': S.get('tts_name') or f'shorts-{D}', 'opener': S.get('opener'), kind: T}, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(out, f'본문 {len(body)}문장 · 약 {n}자')


if __name__ == '__main__':
    main(*sys.argv[1:3])
