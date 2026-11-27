"""초안 → 맥 그림 작업 파일 (11/18 발행인 "완전히 자동화": 삽화는 맥 SDXL-Lightning 으로)
  python3 scripts/img/img_job.py drafts/<날짜>.json tts/jobs   → tts/jobs/zz-img-<날짜>.json  (맥 qtts/jobs/ 에 넣으면 대기기가 그린다)
각 그림 자리(classic·modern 대표 img, scenes[].img, man, food)에 ai 필드(영어 프롬프트, 60단어 이내 — CLIP 77토큰에서 잘림)가 있으면 그 자리를 그린다.
ai 가 없는 자리는 3D(m3d) 그대로. 대표 그림은 씨앗 2개, 장면은 1개(맥 M2 8GB 에서 장당 6~9분, 05:10 전에 끝나게) 그려 아침에 눈으로 더 나은 쪽을 고른다(scripts/img/pick.py)."""
import json, sys, os, re
STYLE = 'black and white pen and ink engraving illustration, cross-hatching'  # 맨 앞에(77토큰 넘으면 뒤가 잘림)
NEG = 'color, text, letters, signature, watermark, deformed hands, extra fingers, extra limbs, distorted face, lowres, blurry, cartoon, 3d render, photo'

KOR_NEG = ', kimono, obi sash, japanese clothing, chinese clothing, qipao'  # 11/19: 「사랑손님과 어머니」 한복이 기모노풍으로 나옴

def slots(D):
    for k in ('classic', 'modern', 'food', 'man'):
        c = D.get(k)
        if not isinstance(c, dict): continue
        kor = c.get('where') == '국내' or 'hanbok' in (c.get('ai') or '') or any('hanbok' in (s.get('ai') or '') for s in c.get('scenes') or [])
        if c.get('ai') and c.get('img'): yield c['img'], c['ai'], kor
        for s in c.get('scenes') or []:
            if s.get('ai') and s.get('img'): yield s['img'], s['ai'], kor

def main(draft, outdir):
    D = json.load(open(draft, encoding='utf-8')); date = re.search(r'\d{4}-\d{2}-\d{2}', draft).group(0)
    items = []
    for img, ai, kor in slots(D):
        n = len(ai.split())
        if n > 60: print(f'⚠️ {img}: 프롬프트 {n}단어 — 60단어 넘으면 뒤가 잘림')
        items.append({'id': os.path.splitext(os.path.basename(img))[0], 'prompt': f'{STYLE}. {ai}', 'neg': NEG + (KOR_NEG if kor else ''), 'seeds': [11, 22] if '-s' not in os.path.basename(img) else [11], 'w': 1344, 'h': 768})
    if not items: print('ai 프롬프트가 있는 자리 없음 — 작업 안 만듦'); return
    out = os.path.join(outdir, f'zz-img-{date}.json')  # 파일 이름 zz- : 대기기가 이름순으로 돌므로 TTS 다음에
    json.dump({'kind': 'image', 'name': f'img-{date}', 'items': items}, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(out, f'{len(items)}자리, 그림 {sum(len(i["seeds"]) for i in items)}장 (장당 6~9분)')

if __name__ == '__main__': main(*sys.argv[1:3])
