# RUNBOOK — 04:52 음성 수집 + 영상 5편 렌더 + 유튜브 API 업로드 (클라우드만, Sonnet) — 2026-11-27~
D = 오늘(Asia/Seoul). 무인 실행: 묻지 않는다, 승인 요청 금지. **맥·브라우저·컴퓨터 사용 도구는 쓰지 않는다.**
흐름: 전날 20:37 초안이 tts/typecast/*-D.json 을 push → Actions typecast-tts 가 tts-out 브랜치에 zip → 이 작업이 받아서 사이트 mp3 + 영상 → yt-queue → Actions yt-upload.

1. `cd /home/claude/munhak-news && git pull -q` (없으면 clone). `grep -c "\"$D:" video/uploaded.json` 이 5면 "이미 올림" 보고하고 끝.
2. 음성: `bash scripts/daily/collect_tc.sh D 60` — zip 을 받아 /tmp/q/out 에 풀고 audio/D-*.mp3 push. 마지막 줄들에 mp3 개수와 **타입캐스트 글자 수**가 나온다.
   zip 이 60분 안에 안 나오면: tts/typecast/*-D.json 이 main 에 있는지 확인 → 없으면 `python3 scripts/tts/to_typecast.py D` 로 만들어 push 하고 한 번 더 기다림(40분). 그래도 없으면 보고하고 끝(06:40 발행은 음성 없이 나감).
3. 렌더: `nohup bash scripts/daily/render_all.sh D > /tmp/v/render_all.log 2>&1 &` 후 `sleep 540` 으로 기다리며 `cat /tmp/v/render-D.txt` (5편 qa 줄 + title 줄이 나오면 끝). `qa ❌` 인 편은 올리지 않는다(queue_all 이 자동으로 건너뜀).
4. 업로드: `bash scripts/daily/queue_all.sh D` → yt-queue 브랜치에 올리고 yt-upload 실행(video/kick.txt push).
   5~10분 뒤 `git pull -q && python3 -c "import json;[print(x['key'],x['id'],x.get('captions',''),x.get('playlists','')) for x in json.load(open('video/uploaded.json')) if x['key'].startswith('D:')]"` 로 확인.
   안 올라갔으면 Actions 로그 대신 `git ls-remote origin yt-queue` 와 kick 을 한 번 더(`bash scripts/video/yt_kick.sh`). 일일 업로드 한도 오류면 24시간 다시 시도하지 않는다.
   최종 화면(엔딩 화면)은 API 로 못 넣는다 — 생략.
보고(존댓말 3줄): 5편 링크(https://youtu.be/<id>), 타입캐스트 글자 수(하루 목표 4,500자 안쪽 / 월 14만 자), 문제 1줄.
절대 규칙: 중복 업로드 금지(uploaded.json 키), 로그인·결제 금지, 토큰·키를 출력하거나 파일에 쓰지 않는다.
