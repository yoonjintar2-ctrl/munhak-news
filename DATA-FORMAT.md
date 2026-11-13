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
