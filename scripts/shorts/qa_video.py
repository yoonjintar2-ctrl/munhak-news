#!/usr/bin/env python3
"""1분 문학 영상 자동 검수 (발행인 11/14: "내일부터는 알아서 검수한 다음 올려").

python3 scripts/shorts/qa_video.py shorts/scripts/<날짜>.json classic out-classic.mp4 [repo=.]
 → 통과면 종료코드 0, 문제 있으면 1. 같은 이름 .qa.png(장면 12컷 모음)를 만든다 — 반드시 Read 로 눈으로도 본다.

기계 검사
 1) 파일: 1920×1080(가로) 또는 1080×1920(세로), h264 + aac, 길이 = 타임라인 total ±0.8초
 2) 소리: 통합 음량 -17~-13 LUFS, 최대 -0.5 dBTP 이하, 나레이션 안에 2.5초 넘는 무음 없음(빠진 문장 의심)
 3) 화면: 0.3초 넘는 검은 화면 없음
 4) 본문 = 지면 줄거리(story) 문장 전부, 한 글자도 다르지 않게(띄어쓰기·자막 마디 기호 제외)
 5) 자막: 마디마다 0.35초 이상 떠 있고 초당 14글자 이하(10 넘으면 주의), 마디 사이 빈틈 1.6초 이하, 한 마디 18자 이하
 6) 장면 영상 파일이 모두 있고 장면이 2개 이상이면 실제로 바뀜
"""
import json, os, re, subprocess, sys
from PIL import Image, ImageDraw


def sh(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def norm(s):
    return re.sub(r'\s+', '', s.replace(' / ', ' ').replace('/', ''))


def story_of(repo, D, kind):
    for p in (f'drafts/{D}.json', f'archive/{D}.json', 'today.json'):
        fp = os.path.join(repo, p)
        if os.path.exists(fp):
            d = json.load(open(fp, encoding='utf-8'))
            if d.get('date', D) == D and d.get(kind, {}).get('story'):
                return d[kind]['story'], p
    return None, None


def main(script, kind, video, repo='.'):
    S = json.load(open(script, encoding='utf-8')); C = S[kind]; D = S['date']
    tl = json.load(open(os.path.splitext(video)[0] + '.timeline.json', encoding='utf-8'))
    narr = os.path.splitext(video)[0] + '.narr.wav'
    bad, warn = [], []

    # 1) 파일
    pr = json.loads(sh(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', video]).stdout)
    v = [s for s in pr['streams'] if s['codec_type'] == 'video'][0]; a = [s for s in pr['streams'] if s['codec_type'] == 'audio']
    land = S.get('format', 'landscape') == 'landscape'
    if (v['width'], v['height']) != ((1920, 1080) if land else (1080, 1920)): bad.append(f"화면 크기 {v['width']}x{v['height']}")
    if v['codec_name'] != 'h264' or not a or a[0]['codec_name'] != 'aac': bad.append('코덱(h264/aac) 아님')
    dur = float(pr['format']['duration'])
    if abs(dur - tl['total']) > 0.8: bad.append(f"길이 {dur:.1f}초 ≠ 타임라인 {tl['total']:.1f}초")

    # 2) 소리
    ln = sh(['ffmpeg', '-hide_banner', '-nostats', '-i', video, '-af', 'ebur128=peak=true', '-f', 'null', '-']).stderr
    I = re.findall(r'I:\s+(-?[\d.]+) LUFS', ln); P = re.findall(r'Peak:\s+(-?[\d.]+) dBFS', ln)
    if I:
        I = float(I[-1])
        if not -17 <= I <= -13: bad.append(f'음량 {I} LUFS(-17~-13 밖)')
    if P and float(P[-1]) > -0.5: warn.append(f'최대 {P[-1]} dBTP')
    if os.path.exists(narr):
        sd = sh(['ffmpeg', '-hide_banner', '-nostats', '-i', narr, '-af', 'silencedetect=n=-45dB:d=2.5', '-f', 'null', '-']).stderr
        sil = re.findall(r'silence_start: ([\d.]+)', sd)
        sil = [float(x) for x in sil if float(x) < tl['total'] - 3]
        if sil: bad.append(f'나레이션 2.5초 넘는 무음: {", ".join(f"{x:.1f}s" for x in sil)}')

    # 3) 검은 화면
    bd = sh(['ffmpeg', '-hide_banner', '-nostats', '-i', video, '-vf', 'blackdetect=d=0.3:pix_th=0.08', '-an', '-f', 'null', '-']).stderr
    if 'black_start' in bd: bad.append('검은 화면 구간: ' + ' '.join(re.findall(r'black_start:([\d.]+)', bd)[:5]))

    # 4) 본문 = 지면 story
    story, src = story_of(repo, D, kind)
    if story is None: warn.append('지면 story 를 못 찾아 본문 대조 생략')
    else:
        want = norm(''.join(story)); got = norm(''.join(C['body']))
        if want != got:
            i = next((k for k in range(min(len(want), len(got))) if want[k] != got[k]), min(len(want), len(got)))
            bad.append(f'본문≠지면({src}) {i}번째 글자부터 다름: 지면 「{want[i:i+20]}」 / 영상 「{got[i:i+20]}」')

    # 5) 자막 박자
    its = tl['items']
    for k, it in enumerate(its):
        d = it['b'] - it['a']; n = len(re.sub(r'\s', '', it['txt']))
        if d < 0.35: bad.append(f'자막 너무 짧음 {d:.2f}s 「{it["txt"]}」')
        elif n / d > 14: bad.append(f'자막 너무 빠름 {n / d:.1f}자/초 「{it["txt"]}」 — 대본에서 마디를 나누거나 합쳐 다시')
        elif n / d > 10: warn.append(f'자막 빠름 {n / d:.1f}자/초 「{it["txt"]}」')
        if len(it['txt']) > 18: warn.append(f'자막 마디 김({len(it["txt"])}자) 「{it["txt"]}」')
        if k and it['a'] - its[k - 1]['b'] > 1.6: bad.append(f'자막 빈틈 {it["a"] - its[k - 1]["b"]:.1f}s ({its[k - 1]["b"]:.1f}s~)')
    if its[-1]['b'] > tl['total'] + 0.05: bad.append('자막이 영상 끝을 넘음')

    # 6) 장면
    scn = C.get('scenes') or [{'from': 0, 'video': C['video']}]
    for s in scn:
        if not os.path.exists(os.path.join(repo, s['video'])): bad.append(f'장면 영상 없음 {s["video"]}')
    if len({s['video'] for s in scn}) < 2: warn.append('장면 1개뿐(배경이 안 바뀜)')

    # 모음 사진(눈 검수용): 인트로·본문 첫·장면 바뀌는 곳·가운데·아웃트로·끝
    body = [it for it in its if it['sec'] == 'body']; outro = [it for it in its if it['sec'] == 'outro']
    ts = [1.2, (its[0]['b'] + body[0]['a']) / 2 if body else 3]
    if body:
        b0, b1 = body[0]['a'], body[-1]['b']
        ts += [b0 + 1.0] + [b0 + (b1 - b0) * f for f in (0.15, 0.3, 0.45, 0.6, 0.75, 0.9)]
    if outro: ts += [outro[0]['a'] + 1.0, outro[-1]['a'] + 0.6]
    ts += [tl['total'] - 0.5]
    ts = sorted(t for t in ts if 0 < t < dur)[:12]
    tiles = []
    for k, t in enumerate(ts):
        p = f'/tmp/qa_{k}.jpg'; sh(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.2f}', '-i', video, '-frames:v', '1', '-vf', 'scale=640:-1', p])
        if os.path.exists(p):
            im = Image.open(p).convert('RGB'); ImageDraw.Draw(im).text((8, 6), f'{t:.1f}s', fill=(255, 40, 40)); tiles.append(im)
    if tiles:
        w, h = tiles[0].size; cols = 3; rows = (len(tiles) + cols - 1) // cols
        sheet = Image.new('RGB', (w * cols, h * rows), (255, 255, 255))
        for k, im in enumerate(tiles): sheet.paste(im, ((k % cols) * w, (k // cols) * h))
        sheet.save(os.path.splitext(video)[0] + '.qa.png')

    print(f'[{kind}] {dur:.1f}초 · 자막 {len(its)}마디 · 장면 {len(scn)}개 · 음량 {I} LUFS')
    for m in warn: print('  주의:', m)
    for m in bad: print('  ❌', m)
    print('  통과' if not bad else '  불합격')
    return 0 if not bad else 1


if __name__ == '__main__':
    sys.exit(main(*sys.argv[1:]))
