#!/usr/bin/env python3
"""1분 문학 영상 썸네일 1280×720 (11/14 첫 업로드와 같은 틀).

python3 scripts/shorts/make_thumb.py shorts/scripts/<날짜>.json classic out-thumb.jpg [repo=.]
 - 글: 대본 C['yt']['thumb'] = ["첫 줄", "둘째 줄"] (각 8자 안팎, 내용 한 방 — 예: "달밤 80리,", "동이의 왼손")
   없으면 작품 제목 한 줄.
 - 배경: 장면 삽화 포스터(img/<날짜>-<코너>-s2.jpg → s1 → 대표 .jpg) 흐리게·어둡게, 오른쪽 원 안에 연필이(img/brand/yt-profile.png).
"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
W, H = 1280, 720


def font(size, bold=True):
    for p in ([os.path.join(HERE, 'fonts', 'Pretendard-ExtraBold.otf'), os.path.join(HERE, 'fonts', 'Pretendard-Bold.otf')] if bold else []) + \
             [os.path.join(HERE, 'fonts', 'Pretendard-SemiBold.otf'), '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc']:
        if os.path.exists(p): return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def main(script, kind, out, repo='.'):
    try:
        sys.path.insert(0, HERE); import make_short; make_short.ensure_fonts()
    except Exception as e:
        print('글꼴 준비 실패(대체 글꼴 사용):', e)
    S = json.load(open(script, encoding='utf-8')); C = S[kind]; D = S['date']
    lines = (C.get('yt') or {}).get('thumb') or [C['title']]
    bgp = next((os.path.join(repo, p) for p in (f'img/{D}-{kind}-s2.jpg', f'img/{D}-{kind}-s1.jpg', f'img/{D}-{kind}.jpg', C['video'].replace('.mp4', '.jpg'))
                if os.path.exists(os.path.join(repo, p))), None)
    im = Image.new('RGB', (W, H), (60, 60, 60))
    if bgp:
        b = Image.open(bgp).convert('L').convert('RGB'); sc = max(W / b.width, H / b.height)
        b = b.resize((int(b.width * sc) + 1, int(b.height * sc) + 1), Image.LANCZOS); im.paste(b, ((W - b.width) // 2, (H - b.height) // 2))
    im = im.convert('RGBA')
    shade = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(shade)
    d.rectangle((0, 0, 800, H), fill=(25, 25, 25, 175)); d.rectangle((800, 0, W, H), fill=(25, 25, 25, 70))
    im.alpha_composite(shade)
    d = ImageDraw.Draw(im)
    tag = '1분 고전' if kind == 'classic' else '1분 현대문학'
    ft = font(36); tw = d.textlength(tag, font=ft)
    d.rounded_rectangle((60, 70, 60 + tw + 52, 70 + 62), radius=31, fill=(200, 35, 35)); d.text((86, 78), tag, font=ft, fill='white')
    size = 84
    while size > 52 and max(d.textlength(l, font=font(size)) for l in lines) > 690: size -= 4
    fb = font(size); y = 168 if len(lines) > 1 else 230
    for l in lines:
        for dx, dy in ((4, 5),): d.text((60 + dx, y + dy), l, font=fb, fill=(0, 0, 0, 160))
        d.text((60, y), l, font=fb, fill='white', stroke_width=3, stroke_fill=(20, 20, 20)); y += int(size * 1.38)
    sub = f"{C['writer']} 「{C['title']}」"; fs = font(40, bold=False)
    while d.textlength(sub, font=fs) > 700 and fs.size > 26: fs = font(fs.size - 2, bold=False)
    d.text((62, y + 14), sub, font=fs, fill=(255, 232, 160), stroke_width=2, stroke_fill=(20, 20, 20))
    # 오른쪽 원 + 연필이
    R = 235; cx, cy = 1035, 435
    ring = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(ring).ellipse((cx - R - 10, cy - R - 4, cx + R + 10, cy + R + 16), fill=(0, 0, 0, 110))
    im.alpha_composite(ring.filter(ImageFilter.GaussianBlur(10)))
    ImageDraw.Draw(im).ellipse((cx - R - 8, cy - R - 8, cx + R + 8, cy + R + 8), fill='white')
    pf = Image.open(os.path.join(repo, 'img', 'brand', 'yt-profile.png')).convert('RGB').resize((2 * R, 2 * R), Image.LANCZOS)
    m = Image.new('L', (2 * R, 2 * R), 0); ImageDraw.Draw(m).ellipse((0, 0, 2 * R - 1, 2 * R - 1), fill=255)
    im.paste(pf, (cx - R, cy - R), m)
    im.convert('RGB').save(out, quality=90)
    print('ok', out, os.path.getsize(out) // 1024, 'KB')


if __name__ == '__main__':
    main(*sys.argv[1:])
