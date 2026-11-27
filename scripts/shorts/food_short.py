"""문학 한술 쇼츠(세로·60초 안) 대본 + 나레이션 작업 — 발행인 11/17 "유튜브에도 매일 쇼츠로"
  python3 scripts/shorts/food_short.py drafts/<날짜>.json
    → shorts/scripts/<날짜>-food.json (format portrait, tts_name food-<날짜>)
    → tts/jobs/food-<날짜>.json (맥 TTS 넣기 때 shorts 작업과 함께)
지면 food 에 사람이 쓰는 것: short = {"hook": 첫 문장(첫 2초에 작품·음식), "lines": [4~6문장], "outro": 마무리 1문장, "thumb": [두 줄], "title": 유튜브 제목(#해시태그 포함)}
전체 300~420자(약 45~55초). 마무리는 '오늘 문학늬우스' 지면 초대로."""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from fill_body import chunk


def main(issue):
    I = json.load(open(issue, encoding='utf-8')); D = I['date']; F = I['food']; S0 = F['short']
    body = [chunk(x) for x in S0['lines']]
    n = len(re.sub(r'\s', '', S0['hook'] + ''.join(S0['lines']) + S0['outro']))
    assert 200 <= n <= 460, f'문학 한술 쇼츠 글자 수 {n} — 300~420자로'
    assert '문학늬우스' in S0['outro'], 'outro 에 문학늬우스 초대'
    S = {"date": D, "format": "portrait", "tts_name": f"food-{D}",
         "food": {"title": F['name'], "writer": f"{F['writer']} 「{F['work']}」", "video": F.get('video') or F['img'],
                  "intro": [chunk(S0['hook'])], "body": body, "outro": [chunk(S0['outro'])],
                  "scenes": [{"from": 0, "video": F.get('video') or F['img']}],
                  "yt": {"thumb": S0.get('thumb') or [F['name'], ''], "title": S0['title']}}}
    out = f'shorts/scripts/{D}-food.json'
    json.dump(S, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    import shorts_job
    shorts_job.main(out, 'tts/jobs', 2)
    print(out, f'{n}자, 본문 {len(body)}문장')


if __name__ == '__main__':
    main(sys.argv[1])
