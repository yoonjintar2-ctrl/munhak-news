"""초안 → 맥 그림 작업 파일 (11/18 발행인 "완전히 자동화": 삽화는 맥 SDXL-Lightning 으로)
  python3 scripts/img/img_job.py drafts/<날짜>.json tts/jobs   → tts/jobs/img-<날짜>.json  (맥 qtts/jobs/ 에 넣으면 대기기가 그린다)
각 그림 자리(classic·modern 대표 img, scenes[].img, man, food)에 ai 필드(영어 프롬프트, 60단어 이내 — CLIP 77토큰에서 잘림)가 있으면 그 자리를 그린다.
ai 가 없는 자리는 3D(m3d) 그대로. 씨앗 2개씩 그려 아침에 눈으로 더 나은 쪽을 고른다(scripts/img/pick.py)."""
import json, sys, os, re
STYLE = 'engraving illustration, black and white pen and ink, fine cross-hatching, light grey wash, 19th century newspaper style'
NEG = 'color, text, letters, signature, watermark, deformed hands, extra fingers, extra limbs, distorted face, lowres, blurry, cartoon, 3d render, photo'

def slots(D):
    for k in ('classic', 'modern', 'food', 'man'):
        c = D.get(k)
        if not isinstance(c, dict): continue
        if c.get('ai') and c.get('img'): yield c['img'], c['ai']
        for s in c.get('scenes') or []:
            if s.get('ai') and s.get('img'): yield s['img'], s['ai']

def main(draft, outdir):
    D = json.load(open(draft, encoding='utf-8')); date = re.search(r'\d{4}-\d{2}-\d{2}', draft).group(0)
    items = []
    for img, ai in slots(D):
        n = len(ai.split())
        if n > 60: print(f'⚠️ {img}: 프롬프트 {n}단어 — 60단어 넘으면 뒤가 잘림')
        items.append({'id': os.path.splitext(os.path.basename(img))[0], 'prompt': f'{ai}. {STYLE}', 'neg': NEG, 'seeds': [11, 22], 'w': 1344, 'h': 768})
    if not items: print('ai 프롬프트가 있는 자리 없음 — 작업 안 만듦'); return
    out = os.path.join(outdir, f'img-{date}.json')
    json.dump({'kind': 'image', 'name': f'img-{date}', 'items': items}, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(out, f'{len(items)}자리 × 씨앗 2 (장당 약 6분, 맥 M2 8GB)')

if __name__ == '__main__': main(*sys.argv[1:3])
