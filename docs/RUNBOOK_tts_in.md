# RUNBOOK — 22:10 음성 넣기 (맥, Sonnet)
D = 내일 날짜(Asia/Seoul). 한국어로 1줄 보고. 승인 요청을 만들지 않는다. 맥에서 아무것도 지우지 않는다.
1. `cd /home/claude/munhak-news && git pull -q` (없으면 clone). `tts/jobs/{shorts,food,mnews}-D.json` 이 없으면 10분마다 pull, 최대 40분. 그래도 없으면 "초안 작업 파일 없음" 보고하고 끝.
2. `python3 scripts/check_dupes.py D` — ❌면 보고에 적되 넣기는 계속.
3. 맥(device_bash): `ls $HOME/mnt/qtts/jobs $HOME/mnt/qtts/jobs_done $HOME/mnt/qtts/out | grep D` — 이미 있으면 그 파일은 건너뜀(중복 금지).
4. 세 파일을 `/mnt/user-data/outputs/<이름>.json.part` 로 복사 → device_commit_files 로 `~/Downloads/qtts/jobs/` 에 쓰고, device_bash 한 번에
   `mv shorts-D.json.part a-shorts-D.json; mv food-D.json.part b-food-D.json; mv mnews-D.json.part c-mnews-D.json` (이름순 처리: 쇼츠 먼저).
   **문학 작업 이름은 숫자 0 으로 시작하지 않는다**(0… 은 미국주식 늬우스 전용 급한 작업).
5. `tail -n1 $HOME/mnt/qtts/worker_log.txt` 의 시각이 10분 넘게 멈췄으면 보고 맨 앞에 "⚠️ 맥에서 ~/Downloads/qtts/TTS_작업대기.command 를 켜 주세요".
보고: 넣은 파일·문장 수 1줄.
