# 문학늬우스 (mnews.jintar.co.kr)

매일 아침 문장 하나를 배달하는 흑백 종이신문형 문학 사이트. 발행인 윤진탈(지구별), 글 금로동 기자.

- `index.html` — 지면 한 장. `today.json`(또는 `?d=날짜` → `archive/<날짜>.json`)을 읽어 그린다.
- `today.json` — 그날 원고. 형식은 `DATA-FORMAT.md`.
- `archive/<날짜>.json`, `archive/index.json` — 지난 호와 '지난 호' 메뉴 목록.
- `img/<날짜>-sentence|poem|novel.mp4/.jpg` — 3초 반복 3D 삽화와 포스터, `img/<날짜>-writer.png` — 문인 실루엣.
- `scripts/m3d/` — 3D 삽화 키트(광고늬우스에서 가져옴). `NODE_PATH=$(npm root -g) node scripts/m3d/render.cjs scenes/<날짜>-poem.js img/<날짜>-poem.mp4 [--still 1.2]`
- `scripts/build_puzzle.py <날짜>` — `data/words-<날짜>.json`([[답, 단서], …], 문학 용어+그날 작품 낱말 60~90개)으로 13×13 낱말 퍼즐을 만들어 today.json에 넣는다.
- `scripts/make_share.py [날짜]` — 코너별 공유 페이지 `s/<날짜>-<코너>.html`(카톡 미리보기용 og 태그, 사람은 `?d=날짜#코너`로 이동)와 1200×630 카드 `s/<날짜>-<코너>.jpg`. 지면의 링크 복사 단추가 이 주소를 복사한다. 발행 때마다 돌린다.
- 코너마다 [글로 복사][이미지로 복사][링크 복사] 단추. 이미지는 `vendor/html2canvas.min.js`로 그 코너만 찍는다.
- `docs/PROMPT.md` — 처음 만들기(A)와 매일 발행 예약 작업(B) 프롬프트.

- `data/rx.json` — 기분 처방전 약장. moods(기분 6개)와 items(기분별 문장: text, 외국어면 orig·translator, writer, work, year, dose=복용법, sources). 지면이 기분 단추를 누를 때마다 같은 기분 문장 중 하나를 고른다. 매일 발행 때 오늘의 문장이 어느 기분에 잘 맞으면 1개 추가(같은 문장 중복 금지).

## 지면 순서
제호 → 오늘의 문장(가장 크게 + 뜻·장면·효과) → 오늘의 시(전문+삽화+읽기+한 줄) · 오늘의 소설 구절(원문·직접 번역+삽화+맥락+문체) → 오늘의 문인 · 낱말 퍼즐 · 문학 상식(OX 3문항) → 1분 고전(today.json `classic`: title, writer, year, where, oneline, lines 5개, ending, why, sources) · 기분 처방전(약봉투) → 판권

## 규칙
- 국내 7 : 국외 3(주 단위). 같은 작가는 30일 안에 다시 쓰지 않는다.
- 시 전문은 저작권이 끝난 작품만. 외국 작품은 직접 번역해 "금로동 옮김". 사실·인용은 WebSearch로 확인한 것만, 출처 URL을 sources에.
- 삽화: 카메라 고정, 오브젝트 2~3개 이상 움직임, 망점·해칭 금지, 실존 인물 얼굴 세부·글자·로고 금지.
- 지난 호에서 빈 코너는 숨긴다(`[hidden]{display:none!important}`).
