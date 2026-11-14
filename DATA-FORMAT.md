# today.json 형식 (archive/<날짜>.json도 같은 형식)

```json
{
  "date": "2026-11-14",
  "no": 1,
  "publisher": { "name": "윤진탈", "org": "지구별" },
  "author": { "name": "금로동", "title": "기자" },

  "sentence": {
    "text": "설렁탕을 사다 놓았는데 왜 먹지를 못하니, 왜 먹지를 못하니…",
    "speaker": "김첨지",
    "work": "운수 좋은 날", "writer": "현진건", "year": 1924, "origin": "국내",
    "meaning": "문장이 지닌 의미 (150자 안팎)",
    "context": "어떤 장면에서 누가 어떤 의도로 한 말인지",
    "craft": "작가가 노린 효과 — 반어, 반복 등",
    "sources": ["https://… (WebSearch로 확인한 주소)"]
  },

  "poem": {
    "title": "진달래꽃", "writer": "김소월", "year": 1925, "origin": "국내",
    "public_domain": true,
    "translator": null,
    "lines": ["나 보기가 역겨워", "가실 때에는", "…"],
    "img": "img/2026-11-14-poem.jpg",
    "video": "img/2026-11-14-poem.mp4",
    "alt": "삽화 설명",
    "analysis": "시어·형식·시대 배경 (350~500자)",
    "oneline": "기자의 한 줄 감상",
    "sources": []
  },

  "novel": {
    "title": "…", "writer": "…", "year": 0, "origin": "국외",
    "quote": "한두 문장 (저작권이 살아 있으면 짧게)",
    "translator": "금로동 옮김",
    "img": "img/2026-11-14-novel.jpg",
    "video": "img/2026-11-14-novel.mp4",
    "alt": "…",
    "context": "앞뒤 맥락",
    "analysis": "인물·문체 (350~500자)",
    "sources": []
  },

  "writer": {
    "name": "…", "life": "1902–1934",
    "bio": "250~350자",
    "works": ["대표작1", "대표작2", "대표작3"],
    "link": "오늘 소개 작품과의 연결 한두 문장",
    "img": "img/2026-11-14-writer.png",
    "alt": "얼굴 세부 없는 실루엣 펜화"
  },

  "puzzle": {
    "size": [13, 13],
    "words": [{ "n": 1, "dir": "across", "r": 0, "c": 2, "a": "진달래", "clue": "김소월이 영변 약산에서 아름 따다 뿌린 꽃" }]
  },

  "trivia": [
    { "q": "문제 또는 상식 한 줄", "a": "O/X 또는 정답", "why": "해설 1~2문장" }
  ]
}
```

- `img`와 `video`가 같이 있으면 web/vidup.js가 그 자리의 그림을 반복 영상으로 바꿉니다. 영상 포스터는 같은 이름의 .jpg입니다.
- `public_domain`이 false인 시는 `lines`에 전문을 넣지 않습니다. 그런 날은 시를 다른 작품으로 바꿉니다.
- `archive/index.json`은 `[{"date","no","sentence","writer"}]` 목록이며 '지난 호' 메뉴에 씁니다.


## 추가 필드 (2026-11-13)
- `poem.permission` / `poem.text_file`: 저작권자 허락을 받은 시. 전문은 발행인이 직접 `poems/<날짜>.txt`에 붙여 넣고, 페이지가 읽어 연 단위로 보여 줍니다(기자는 전문을 옮겨 적지 않음).
- `classic` / `modern`: 1분 고전·1분 현대문학. 같은 형식 {title, writer, year, origin, where, oneline, story[문단], ending(스포일러 접기), why, sources}.
- `onthisday`: [{year, title, body, sources[]}] — 「그날의 문학」, 오늘 날짜의 과거 문학 사건 2~3개. 화면에는 발행 연도 − year로 'N년 전 오늘'이 크게 붙습니다.


## 1분 고전·1분 현대문학 장면 삽화 `scenes` (2026-11-14~)
`classic`·`modern` 에 이야기 국면이 바뀌는 대목마다 3초 장면 영상 3~4개:
```json
"scenes": [
  {"after": 0, "img": "img/2026-11-15-classic-s1.jpg", "video": "img/2026-11-15-classic-s1.mp4", "alt": "장면 설명"},
  {"after": 2, "img": "…-s2.jpg", "video": "…-s2.mp4", "alt": "…"}
]
```
- `after` = `story` 문단 번호(0부터). 지면에서는 그 문단 바로 아래에 '장면' 영상이 나온다(대표 영상 `img`/`video` 는 코너 맨 위 그대로).
- 장면 파일은 `scripts/m3d/scenes/<날짜>-classic-s1.js` … 로 만들고 960×640 3초로 렌더, 포스터는 `--still 0.4`.
- 같은 영상을 쇼츠(`shorts/scripts/<날짜>.json` 의 `scenes`)에서도 그 대목 배경으로 쓴다.


## go — ⑪ 오늘의 한 수 (바둑 기보 한 장, 발행인 11/15)
```json
"go": {"title":"「신의 한 수」 백78","game":"대회·판","date":"YYYY-MM-DD","black":"흑 대국자","white":"백 대국자","result":"백 180수 불계승",
 "moves":"pd dp cd …(SGF 좌표, 첫 수부터 to 수까지 공백으로)","from":71,"to":78,"key":78,"key_label":"L11",
 "lead":"한 문장","body":["2~3문단, 합쳐 250~400자"],"lit":"(선택) 오늘 지면 다른 코너와 잇는 한 줄","sources":["기사 URL","기보 출처(저장소 경로)"]}
```
- 화면은 처음부터 to 수까지 두어 보며(따낸 돌 자동 제거) from~to 수에 번호를 달고 key 수에 동그라미. 좌표 표기는 A~T(I 없음)·1~19(아래가 1).
- 기보는 **실제 SGF 파일**에서만 가져온다(지어내기 금지): github.com/yenw/computer-go-dataset(Professional·AI 폴더), homepages.cwi.nl/~aeb/go/games(일본 프로 기보) 등. 소개하는 수 번호·좌표는 기사·해설과 대조해 맞는지 확인.
- colors(선택): 접바둑·놓고 시작하는 판처럼 흑백이 번갈아 두지 않을 때 수마다 "B"/"W" 배열.

## zodiac — ⑫ 띠별 오늘의 문장 (발행인 11/15)
`"zodiac": [{"key":"rat|ox|tiger|rabbit|dragon|snake|horse|sheep|monkey|rooster|dog|pig","animal":"쥐","text":"문장(시는 / 로 줄바꿈)","orig":"(외국어면 원문)","translator":"금로동 옮김","writer":"","work":"","year":1938,"note":"오늘 참고할 한두 문장(40~60자, 운세 말투 말고 다정한 권유)","sources":["원문 확인 URL"]}]` — 12개, 쥐부터 돼지 순. 띠 그림은 img/zodiac/<key>.png(Noto Emoji 흑백, OFL). 출생 연도는 화면이 자동 계산.
