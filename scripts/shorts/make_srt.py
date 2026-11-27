"""유튜브 자막 파일(.srt) — 영상 타임라인(<영상>.timeline.json)의 자막 마디 그대로 (발행인 11/17: 검색·자동번역용, 화면 자막은 이미 박혀 있어 자동 켜기 태그는 안 씀)
  python3 scripts/shorts/make_srt.py /tmp/v/<날짜>-classic.timeline.json /tmp/v/<날짜>-classic.srt"""
import json, sys


def ts(s):
    ms = int(round(s * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); sec, ms = divmod(ms, 1000)
    return f'{h:02d}:{m:02d}:{sec:02d},{ms:03d}'


def main(tl, out):
    T = json.load(open(tl, encoding='utf-8'))['items']; L = []
    for n, it in enumerate(T, 1):
        b = min(it['b'], T[n]['a']) if n < len(T) else it['b']
        L += [str(n), f"{ts(it['a'])} --> {ts(b)}", it['txt'].strip(), '']
    open(out, 'w', encoding='utf-8').write('\n'.join(L)); print(out, len(T), '마디')


if __name__ == '__main__':
    main(*sys.argv[1:3])
