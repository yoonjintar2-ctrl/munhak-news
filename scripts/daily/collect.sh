#!/bin/bash
# 05:10 수집 (컨테이너 쪽): 맥에서 받은 all-D.tgz 를 풀고 사이트 mp3 를 만들어 push.
# 사용: bash scripts/daily/collect.sh D /mnt/user-data/uploads/qtts/out/all-D.tgz
set -e; D=$1; T=$2; cd "$(dirname "$0")/../.."
mkdir -p /tmp/q/out /tmp/q/jobs; rm -rf /tmp/q/out/*-$D; tar xzf "$T" -C /tmp/q/out
cp tts/jobs/mnews-$D.script.json /tmp/q/jobs/
python3 -c "import resemblyzer" 2>/dev/null || pip install --break-system-packages -q resemblyzer librosa soundfile >/dev/null 2>&1
python3 scripts/tts/tts_post.py /tmp/q $D audio 2>&1 | grep -E "mp3:|빠진" | tail -12
python3 scripts/shorts/site_audio.py shorts/scripts/$D.json /tmp/q audio 2>&1 | tail -2   # 1분 코너는 영상 나레이션으로 덮음(반드시 tts_post 뒤)
git add audio/$D-*.mp3 && git commit -qm "듣기 음성 $D" -m "Co-Authored-By: Claude <noreply@anthropic.com>" || true
for i in 1 2 3 4 5; do git pull -q --rebase && git push -q && break; sleep 20; done
ls audio | grep -c "$D" | sed 's/^/mp3 /'
