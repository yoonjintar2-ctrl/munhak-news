# 1분 문학 영상 — 매일 만들기·검수·업로드 (발행인 2026-11-14: "내일부터는 알아서 검수한 다음 올려")

> **11/18 변경(발행인)**: 05:40 예약 메시지에 남아 있는 "예고 쇼츠(teaser.py, 앞부분)"는 아래 4-2 **결말까지 쇼츠(`teaser.py ... --full`)** 로 바꿔 읽는다. 예고 쇼츠는 더 만들지 않는다.

채널: 유튜브 **문학늬우스** (@munhaknews, 채널 ID `UCC6rvGkmmC-HgWYxdJ6KP-g`, Google 계정 yoonjintar2). 맥 크롬은 평소 **샌디스크 올인**(yoonjintar4 계정) 상태 → 올릴 때만 바꾸고 **끝나면 반드시 되돌린다**. 연 탭은 닫는다.
첫 업로드(본보기): 「메밀꽃 필 무렵」 https://youtu.be/sOBinuRuldw · 「나를 보내지 마」 https://youtu.be/mD5u_w7Azt8

## 하루 순서 (D = 오늘)
1. 나레이션: 전날 밤 `tts/jobs/shorts-D.json` 과 `tts/jobs/food-D.json`(문학 한술 쇼츠, 11/17~) 이 맥 qtts 에 들어가 `out/<tts_name>/DONE` 까지 생성.
2. 가져오기: 맥에서 `cd ~/mnt/qtts/out && tar czf <tts_name>.tgz <tts_name> casual1/E_think.wav` → stage → `/tmp/q/out/` 에 풂(shorts-D, food-D 둘 다).
2-1. **발음 미세 어색함 검수(발행인 11/17)**: `python3 scripts/tts/prosody_qa.py /tmp/q shorts-D` (food-D 도) — 같은 문장 테이크끼리 음높이·글자 길이를 맞대어 한쪽만 튄 곳을 찾는다(out/<이름>/prosody.json). make_short 가 이 점수로 테이크를 고른다.
   의심 문장이 있으면 05:10 수거 직후 `python3 scripts/tts/prosody_qa.py fix /tmp/q shorts-D tts/jobs/shorts-D.json /mnt/user-data/outputs/shorts-D-fix.json.part` → 맥 `qtts/jobs/` 에 넣고(.part 뒤 mv) 05:40 에 다시 가져와 테이크가 늘어난 채로 만든다(테이크당 약 55초, 12문장 안).
   05:40 빌드 뒤에도 고른 테이크 점수가 1 이상인 문장은 보고에 '귀로 들어 볼 곳'(영상 시각)으로 적는다.
3. 지면 '듣기'(06:30 전 push): `python3 scripts/shorts/site_audio.py shorts/scripts/D.json /tmp/q audio` → `audio/D-classic.mp3`, `audio/D-modern.mp3` 커밋.
4. 영상: `python3 scripts/shorts/make_short.py shorts/scripts/D.json classic /tmp/q . /tmp/v/D-classic.mp4` (modern 도; 한 편 5~8분).
4-1. **문학 한술 쇼츠(세로, 11/18~)**: `python3 scripts/shorts/make_short.py shorts/scripts/D-food.json food /tmp/q . /tmp/v/D-food.mp4` → qa_video 같은 방식(본문 대조 경고는 무시, 60초 안인지 확인).
4-2. **결말까지 쇼츠(세로, 11/19~ — 11/18 발행인 "예고 쇼츠는 너무 짧아 궁금하지도 않다, 길어지더라도 결말까지 쭉")**: `python3 scripts/shorts/teaser.py shorts/scripts/D.json classic --full` (modern 도) → `make_short.py shorts/scripts/D-classic-full.json classic /tmp/q . /tmp/v/D-classic-full.mp4` — 본편과 같은 테이크로 인트로+본문 전체(결말 포함)+마무리. **쇼츠 한도 3분**: ffprobe 로 179초가 넘으면 대본의 outro 를 첫 줄만 남기고(keys 도 맞춰) 다시 만든다. 제목은 '(결말까지)'. 예고(앞 40초) 쇼츠는 더 만들지 않는다. 하루 업로드: 본편 2 + 결말까지 쇼츠 2 + 문학 한술 1.
5. **검수**: `python3 scripts/shorts/qa_video.py shorts/scripts/D.json classic /tmp/v/D-classic.mp4 .` → ❌ 가 하나라도 있으면 고치고 다시 만든다(본문≠지면 → fill_body 다시, 자막 너무 빠름 → 대본 마디 손보기, 무음 → 테이크 확인). 그리고 `.qa.png` 를 Read 로 직접 보고: 자막·말풍선 잘림/겹침, 연필이 동작, 장면이 줄거리와 맞는지, **장면 속 방향**(차·수레·배가 앞으로 가는지, 탄 사람이 진행 방향을 보는지 — 11/14 운전 장면 실수. 이상하면 그 장면을 고쳐 다시 렌더하고 사이트 영상도 같이 교체), 인서트 원 위치. 나레이션 첫 문장·마지막 문장 테이크를 들어 볼 수 없으니 `tts_post` 기준(화자 유사도·음높이)을 믿되, 길이가 1.6배 넘는 테이크가 골라졌으면 다시 본다. **통과 못 하면 올리지 않고 보고**.
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
   - 재생목록(세부정보 화면의 '재생목록' 선택): 1분 고전 → `1분 고전 | 명작 줄거리 처음부터 결말까지`, 1분 현대문학 → `1분 현대문학 | 요즘 소설 줄거리 처음부터 결말까지`, 국내 작품이면 `한국 문학 줄거리 | …`, 국외면 `세계 문학 줄거리 | …`, 독자 신청작이면 `독자 신청작 | …` 도.
   - 최종 화면(동영상 요소 단계 '최종 화면' → '최신 동영상에서 가져오기' = 영상 1개(시청자 맞춤) + 구독). 업로드 뒤 편집기(`/video/<id>/editor` → 엔딩 화면 + → 템플릿 적용 → 첫 카드 → 저장)로 해도 된다.
   - 다음 ×3 → 공개 상태 **공개** → 게시. 게시 창의 youtu.be 링크를 적어 둔다. (검사 중이어도 게시 가능)
   - **자막 파일**(발행인 11/17): `python3 scripts/shorts/make_srt.py /tmp/v/D-classic.timeline.json /tmp/v/D-classic.srt` → video-upload 브랜치에 같이 push → `studio.youtube.com/video/<id>/translations` → 한국어 행에 마우스 → 연필(수정) → '트랙 덮어쓰기' 계속 → ⋮ → 파일 업로드 → (형식 창이 뜨면) 페이지 JS 로 `input#captions-file-loader.ytve-captions-editor-upload-dialog` 에 DataTransfer 로 srt 넣고 change → 형식 창은 '취소'로 닫기 → '게시'. 화면에 자막이 박혀 있으니 `yt:cc=on` 태그는 쓰지 않는다(겹쳐 보임).
   - **채널 댓글**: 영상 페이지 댓글에 "읽고 싶은 작품이 있으면 댓글로 알려 주세요. 신청하신 작품은 차례대로 영상과 문학늬우스 지면에 싣습니다 📚"(독자 신청작이면 "이 영상도 독자 신청작이에요" 덧붙임). 고정은 채널 고급 기능(전화 인증)이 켜져야 되므로 켜질 때까지 고정 없이.
   - **문학 한술 쇼츠**: 같은 방식으로 D-food.mp4 업로드(제목 `D-food.json` 의 yt.title, 설명은 지면 food 첫 문단 + 사이트 링크 `https://mnews.jintar.co.kr/s/D-food.html` + 해시태그, 아동용 아님, 공개). 세로 60초 안이라 유튜브가 쇼츠로 분류. 쇼츠 '관련 동영상'은 같은 날 1분 고전 영상.
   - **커뮤니티 게시물**(하루 1개): Studio 만들기 → 게시물 작성 → 오늘 공유 카드 하나(`s/D-<코너>.jpg`, 문학 한술·오늘의 한 수·사나이 중 돌아가며) + 한두 줄 + 사이트 링크.
   - 다 올린 뒤 계정 전환으로 **샌디스크 올인**(yoonjintar4) 되돌리기 → 탭 닫기.
9. 정리: `video-upload` 브랜치는 다음 날 덮어씀(지우지 않아도 됨). 보고: 두 링크, 길이, 검수 결과(주의 항목).

## 제목·설명 규칙
- 제목(100자 안): 대본 `C.yt.title` 이 있으면 그대로. 없으면 `「작품」 한 줄 갈고리 | 1분 문학 #작품명붙여쓰기 #작가 #한국문학(국외면 #세계문학) #오디오북` — 첫 낱말에 작품명·작가·노벨상 같은 검색어.
- 설명: `python3 scripts/shorts/yt_desc.py shorts/scripts/D.json classic /tmp/v/D-classic.timeline.json .` 출력 그대로(발행인 11/15: 영상 소개 + 타임스탬프 + **오늘 지면의 다른 코너 한 줄씩**(문장·시·소설·문인·다른 1분 편·그날의 문학·오늘의 한 수·오늘의 사나이·띠별 문장 등) + 사이트 링크 + 해시태그). 업로드 JS 에서는 이 텍스트를 백틱 문자열로 넣는다.
- 저작권: 저작권이 살아 있는 작품은 원문 인용 없이 우리 말로 쓴 줄거리만(지면 규칙 그대로).
