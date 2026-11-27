> ⚠️ **예전 방식(맥)** — 2026-11-27 발행인 결정으로 맥북을 쉬게 하면서 「05:10 맥 음성 수집」 예약 작업은 꺼 두었다. 지금은 docs/RUNBOOK_cloud_video.md (타입캐스트 + 유튜브 API, 맥 없음). 기록용으로 남겨 둔다.

# RUNBOOK — 05:10 음성 수집·사이트 mp3 (맥, Sonnet)
D = 오늘. 1~2줄 보고. 승인 요청 금지. 맥에서 지우지 않는다(tgz 하나 만드는 것만).
1. 저장소 pull. `audio/D-*.mp3` 가 이미 7개 있으면 "이미 수집됨" 보고하고 끝.
2. 맥 확인(device_bash 한 번): `cd $HOME/mnt/qtts/out; for n in shorts food mnews; do echo $n $(ls $n-D|grep -c wav) $(ls $n-D/DONE 2>/dev/null); done`.
   mnews-D/DONE 이 없으면 `sleep 280` 을 넣은 같은 명령으로 다시 확인(06:15 까지). 그때도 없으면 있는 것만으로 진행.
3. `cd $HOME/mnt/qtts/out && tar czf all-D.tgz shorts-D food-D mnews-D casual1/E_think.wav` → device_stage_files 로 `~/Downloads/qtts/out/all-D.tgz`.
4. `bash scripts/daily/collect.sh D /mnt/user-data/uploads/qtts/out/all-D.tgz` (실패하면 한 번 더).
보고: mp3 개수, 빠진 코너.
