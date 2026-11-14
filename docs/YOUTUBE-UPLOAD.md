# 1분 문학 영상 — 매일 만들기·검수·업로드 (발행인 2026-11-14: "내일부터는 알아서 검수한 다음 올려")

채널: 유튜브 **문학늬우스** (@munhaknews, 채널 ID `UCC6rvGkmmC-HgWYxdJ6KP-g`, Google 계정 yoonjintar2). 맥 크롬은 평소 **샌디스크 올인**(yoonjintar4 계정) 상태 → 올릴 때만 바꾸고 **끝나면 반드시 되돌린다**. 연 탭은 닫는다.
첫 업로드(본보기): 「메밀꽃 필 무렵」 https://youtu.be/sOBinuRuldw · 「나를 보내지 마」 https://youtu.be/mD5u_w7Azt8

## 하루 순서 (D = 오늘)
1. 나레이션: 전날 밤 `tts/jobs/shorts-D.json` 이 맥 qtts 에 들어가 `out/<tts_name>/DONE` 까지 생성(약 1시간).
2. 가져오기: 맥에서 `cd ~/mnt/qtts/out && tar czf <tts_name>.tgz <tts_name> casual1/E_think.wav` → stage → `/tmp/q/out/` 에 풂.
3. 지면 '듣기'(06:30 전 push): `python3 scripts/shorts/site_audio.py shorts/scripts/D.json /tmp/q audio` → `audio/D-classic.mp3`, `audio/D-modern.mp3` 커밋.
4. 영상: `python3 scripts/shorts/make_short.py shorts/scripts/D.json classic /tmp/q . /tmp/v/D-classic.mp4` (modern 도; 한 편 5~8분).
5. **검수**: `python3 scripts/shorts/qa_video.py shorts/scripts/D.json classic /tmp/v/D-classic.mp4 .` → ❌ 가 하나라도 있으면 고치고 다시 만든다(본문≠지면 → fill_body 다시, 자막 너무 빠름 → 대본 마디 손보기, 무음 → 테이크 확인). 그리고 `.qa.png` 를 Read 로 직접 보고: 자막·말풍선 잘림/겹침, 연필이 동작, 장면이 줄거리와 맞는지, 인서트 원 위치. 나레이션 첫 문장·마지막 문장 테이크를 들어 볼 수 없으니 `tts_post` 기준(화자 유사도·음높이)을 믿되, 길이가 1.6배 넘는 테이크가 골라졌으면 다시 본다. **통과 못 하면 올리지 않고 보고**.
6. 썸네일: 대본 `C.yt.thumb`(두 줄) → `python3 scripts/shorts/make_thumb.py shorts/scripts/D.json classic /tmp/v/D-classic-thumb.jpg .` → Read 로 확인.
7. 파일 옮기기(크롬 file_upload 는 3.8MB 까지라 우회): 임시 고아 브랜치 `video-upload` 에 mp4·thumb 만 넣어 force-push
   (`git init /tmp/vup && cd /tmp/vup && git checkout --orphan video-upload && cp … && git add . && git commit -m "업로드용 D" && git push -f https://github.com/yoonjintar2-ctrl/munhak-news video-upload`, 원격·인증은 저장소와 같게).
   raw 주소: `https://raw.githubusercontent.com/yoonjintar2-ctrl/munhak-news/video-upload/D-classic.mp4`
8. 업로드(맥 크롬, Claude in Chrome):
   - 계정 바꾸기: youtube.com 오른쪽 위 프로필 → 계정 전환 → yoonjintar2 의 **문학늬우스**. (Studio 가 "권한이 없습니다"면 계정이 안 바뀐 것)
   - `https://studio.youtube.com/channel/UCC6rvGkmmC-HgWYxdJ6KP-g/videos/upload?d=ud` 열기 → 페이지 JS 로
     ```js
     const b=await (await fetch(RAW_MP4)).blob(); const f=new File([b],'D-classic.mp4',{type:'video/mp4'});
     const inp=document.querySelector('ytcp-uploads-file-picker input[type=file]')||document.querySelector('input[type=file]');
     const dt=new DataTransfer(); dt.items.add(f); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true}));
     ```
   - 제목: `#title-textarea #textbox` 클릭 → 전체 선택 → `document.execCommand('insertText',false,제목)`. 설명: `#description-textarea #textbox` 같은 방식.
   - 썸네일: `#file-loader`(accept image) 에 같은 DataTransfer 방식으로 thumb.jpg.
   - '아동용 아님': `tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]` 클릭.
   - 다음 ×3 → 공개 상태 **공개** → 게시. 게시 창의 youtu.be 링크를 적어 둔다. (검사 중이어도 게시 가능)
   - 두 편 다 올린 뒤 계정 전환으로 **샌디스크 올인**(yoonjintar4) 되돌리기 → 탭 닫기.
9. 정리: `video-upload` 브랜치는 다음 날 덮어씀(지우지 않아도 됨). 보고: 두 링크, 길이, 검수 결과(주의 항목).

## 제목·설명 규칙
- 제목(100자 안): 대본 `C.yt.title` 이 있으면 그대로. 없으면 `「작품」 한 줄 갈고리 | 1분 문학 #작품명붙여쓰기 #작가 #한국문학(국외면 #세계문학) #오디오북` — 첫 낱말에 작품명·작가·노벨상 같은 검색어.
- 설명:
  ```
  1분 만에 떠먹여 주는, 1분 문학 — 오늘은 <작가>의 「<작품>」(<연도>).
  틀어 두고 들으세요. 줄거리를 연필이가 처음부터 끝까지 읽어 드려요.

  📰 문학늬우스 오늘 호: https://mnews.jintar.co.kr
  ⏱ 0:00 인트로 · <본문 시작 m:ss> 줄거리 · <아웃트로 시작 m:ss> 연필이의 정리

  나레이션: 연필이(AI 음성) · 그림: 문학늬우스 3D 삽화 · 음악: 문학늬우스 자체 제작
  #1분문학 #문학늬우스 #<작품> #<작가>
  ```
  (타임스탬프는 `.timeline.json` 의 body 첫 항목 a, outro 첫 항목 a)
- 저작권: 저작권이 살아 있는 작품은 원문 인용 없이 우리 말로 쓴 줄거리만(지면 규칙 그대로).
