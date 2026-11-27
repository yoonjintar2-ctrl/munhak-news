# 맥 없이 돌리기 — TTS는 타입캐스트 API, 유튜브는 API 업로드 (2026-11-27, 미국주식 늬우스에서 먼저 적용)

발행인 결정(11/27): **맥북을 완전히 쉬게 한다.** 맥 Qwen TTS 대기기, 맥 크롬 업로드를 더 이상 쓰지 않는다.
그래서 맥에 묶인 예약 작업은 모두 꺼 두었다: 「22:10 음성 넣기 (맥)」, 「05:10 음성 수집 (맥)」, 「04:52 영상 5편 (맥)」.
**이 문서대로 옮기기 전까지 문학늬우스의 '듣기' 음성과 영상 업로드는 멈춰 있다.** 다음 작업에서 가장 먼저 옮긴다.

## 1. TTS — 타입캐스트 API (발행인이 결제한 API 라이트 요금제, 미국주식 늬우스와 함께 씀)
- 요금제: 월 $15(약 2만 원), 월 20만 크레딧, **글자 1개 = 1크레딧**. 미국주식 늬우스가 월 4만~6만 자를 쓰므로 문학늬우스는 **월 14만 자 안쪽**(하루 약 4,500자)으로 쓴다. 넘으면 10만 크레딧당 $9가 자동 결제되니 하루 사용량을 보고에 적는다.
- 그대로 가져다 쓸 파일(저장소 yoonjintar2-ctrl/usstock-news):
  - `scripts/tts/typecast_job.py` — 작업 파일(예전 맥 qtts 형식: `{"name", "items":[{"id","text"}]}`)을 받아 `out/<name>/<id>.wav` 와 `out/<name>.zip` 을 만든다. `"tc": {"tempo": 1.0, "emotion": "normal"}` 로 속도·감정 조절.
  - `.github/workflows/typecast.yml` — `tts/typecast/*.json` 이 push 되면 실행, 결과 zip 을 `tts-out` 브랜치에 올린다. 받기: `curl -fsSL https://raw.githubusercontent.com/yoonjintar2-ctrl/<저장소>/tts-out/<name>.zip`.
- 이 저장소에 할 일: 두 파일을 복사(워크플로의 저장소 이름만 확인), 작업 파일을 `tts/jobs/` 대신 `tts/typecast/` 에 쓰게 초안 단계 수정, '수집' 단계는 맥 대신 위 zip 을 받아 기존 `scripts/tts/tts_post.py` 로 후처리.
- **목소리**: 타입캐스트 목소리 이름을 환경 변수 `TC_VOICE_NAME` 으로 정한다(미국주식은 '한영'). 문학늬우스의 차분한 톤에 맞는 목소리는 발행인에게 샘플 2~3개를 들려주고 고른다(목소리 목록은 Actions 첫 실행 때 `tts/typecast_voices.json` 에 저장됨).
- 문장 끝 '다' 잘림: 타입캐스트는 시험에서 잘림 없음(마지막 30ms 음량 0.0002). 예전 맥 TTS용 ' ,' 꼬리는 스크립트가 자동으로 지운다.

## 2. 유튜브 — API 업로드 (맥·크롬 없음)
- 구글 클라우드 프로젝트 `sandisk-allin-youtube`(OAuth 앱 sandisk-allin-uploader, 프로덕션 게시)를 **같이 쓴다.** 클라이언트 ID·비밀번호는 같고, **채널마다 Refresh token 만 따로** 받는다.
- 문학늬우스 채널(UCC6rvGkmmC-HgWYxdJ6KP-g)용 토큰 받기 — 발행인이 직접(토큰·비밀번호는 Claude가 입력·보관하지 않는다):
  1. developers.google.com/oauthplayground → 톱니바퀴 → Use your own OAuth credentials 에 같은 클라이언트 ID·비밀번호.
  2. 범위 칸에 `https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl` (자막 올리기·재생목록에 force-ssl 필요) → Authorize APIs → **문학늬우스 채널을 가진 계정·채널**을 고른다.
  3. Exchange authorization code for tokens → Refresh token 복사.
  4. munhak-news 저장소 Settings → Secrets → Actions 에 `YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN`, `TYPECAST_API_KEY`(미국주식과 같은 키).
- 그대로 가져다 쓸 파일(usstock-news): `scripts/video/upload.py`(제목·설명·태그·썸네일·아동용 아님·합성 콘텐츠, `video/uploaded.json` 중복 방지), `scripts/video/yt_queue.sh` + `.github/workflows/yt-upload.yml`(완성 영상을 `yt-queue` 브랜치에 올리고 워크플로를 직접 실행 — **push 트리거는 그 브랜치에 워크플로 파일이 없어 돌지 않으니 dispatch 로 실행**). 저장소 이름을 munhak-news 로 바꿔 쓴다.
- 문학늬우스 전용으로 덧붙일 것: 본편 자막(srt) → `captions.insert`, 재생목록 → `playlistItems.insert` (둘 다 force-ssl 범위 필요). 쇼츠는 업로드만.
- 11/27 시험: 미국주식 채널에 API로 올린 영상이 비공개로 묶이지 않고 공개됨(미검증 앱 제한 없음).

## 3. 옮긴 뒤
- 맥 관련 문서(RUNBOOK_tts_in·tts_collect, YOUTUBE-UPLOAD 의 크롬 절)는 '예전 방식'으로 표시만 하고 지우지 않는다.
- 새 예약 작업은 **컴퓨터 사용·브라우저 도구를 쓰지 않는 클라우드 작업**으로 만든다(맥에 묶지 않는다).
