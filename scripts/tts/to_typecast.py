"""예전 맥 qtts 작업 파일(tts/jobs/{shorts,food,mnews}-D.json, 테이크 2개) → 타입캐스트 작업 파일(tts/typecast/<같은 이름>.json, 테이크 1개).

  python3 scripts/tts/to_typecast.py D            → tts/typecast/{shorts,food,mnews}-D.json, 글자 수 출력
  python3 scripts/tts/to_typecast.py D --dry      → 파일은 안 쓰고 글자 수만

- 타입캐스트는 같은 문장을 다시 읽어도 거의 같아서 테이크는 _t0 하나만(글자 = 크레딧, 문학늬우스 몫 하루 약 4,500자).
- 맥 TTS 끝 잘림 막으려던 꼬리 " 음." / " ," 는 지운다(타입캐스트는 잘림 없음).
- 이 파일들을 push 하면 Actions(typecast-tts)가 음성을 만들어 tts-out 브랜치에 <이름>.zip 으로 올린다.
"""
import json, os, re, sys

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
TC = {'emotion': 'normal', 'tempo': 1.0}   # 문학늬우스: 차분하게
# 11/28: 타입캐스트가 맥 TTS보다 약 11% 느려 '결말까지' 쇼츠가 3분을 넘음 → 영상 대본(shorts)만 1.1배
TEMPO = {'shorts': 1.1}


def clean(t):
    t = re.sub(r'\s*음\.\s*$', '', t.strip())
    t = re.sub(r'\s*,\s*$', '', t)
    return t.strip()


def main(D, dry=False):
    total = 0
    for n in ('shorts', 'food', 'mnews'):
        src = os.path.join(ROOT, 'tts', 'jobs', f'{n}-{D}.json')
        if not os.path.exists(src):
            print('없음', src); continue
        J = json.load(open(src, encoding='utf-8'))
        items = []
        for it in J['items']:
            if not re.search(r'_t0$', it['id']): continue
            t = clean(it['text'])
            if t: items.append({'id': it['id'], 'text': t})
        chars = sum(len(i['text']) for i in items)
        total += chars
        print(f'{n}-{D}: {len(items)}줄 {chars}자')
        if not dry:
            os.makedirs(os.path.join(ROOT, 'tts', 'typecast'), exist_ok=True)
            json.dump({'name': J['name'], 'tc': {**TC, 'tempo': TEMPO.get(n, TC['tempo'])}, 'items': items},
                      open(os.path.join(ROOT, 'tts', 'typecast', f'{n}-{D}.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'합계 {total}자 (타입캐스트 크레딧, 문학늬우스 하루 목표 4,500자 안쪽)')
    return total


if __name__ == '__main__':
    main(sys.argv[1], '--dry' in sys.argv)
