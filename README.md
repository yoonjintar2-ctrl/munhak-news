# 문학늬우스 (mnews.jintar.co.kr)

매일 아침 문장 하나를 배달하는 흑백 종이신문형 문학 사이트. 발행인 윤진탈(지구별), 글 금로동 기자.

- `index.html` — 지면 한 장. `today.json`(또는 `?d=날짜` → `archive/<날짜>.json`)을 읽어 그린다.
- `today.json` — 그날 원고. 형식은 `DATA-FORMAT.md`.
- `archive/<날짜>.json`, `archive/index.json` — 지난 호와 '지난 호' 메뉴 목록.
- `img/<날짜>-sentence|poem|novel.mp4/.jpg` — 3초 반복 3D 삽화와 포스터, `img/<날짜>-writer.png` — 문인 실루엣.
- `scripts/m3d/` — 3D 삽화 키트(광고늬우스에서 가져옴). `NODE_PATH=$(npm root -g) node scripts/m3d/render.cjs scenes/<날짜>-poem.js img/<날짜>-poem.mp4 [--still 1.2]`
- `scripts/build_puzzle.py <날짜>` — `data/words-<날짜>.json`([[답, 단서], …], 문학 용어+그날 작품 낱말 60~90개)으로 13×13 낱말 퍼즐을 만들어 today.json에 넣는다.
- `docs/PROMPT.md` — 처음 만들기(A)와 매일 발행 예약 작업(B) 프롬프트.

## 지면 순서
제호 → 오늘의 문장(가장 크게 + 뜻·장면·효과) → 오늘의 시(전문+삽화+읽기+한 줄) · 오늘의 소설 구절(원문·직접 번역+삽화+맥락+문체) → 오늘의 문인 · 낱말 퍼즐 · 문학 상식(OX 3문항) → 판권

## 규칙
- 국내 7 : 국외 3(주 단위). 같은 작가는 30일 안에 다시 쓰지 않는다.
- 시 전문은 저작권이 끝난 작품만. 외국 작품은 직접 번역해 "금로동 옮김". 사실·인용은 WebSearch로 확인한 것만, 출처 URL을 sources에.
- 삽화: 카메라 고정, 오브젝트 2~3개 이상 움직임, 망점·해칭 금지, 실존 인물 얼굴 세부·글자·로고 금지.
- 지난 호에서 빈 코너는 숨긴다(`[hidden]{display:none!important}`).
