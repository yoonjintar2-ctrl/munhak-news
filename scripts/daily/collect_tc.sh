#!/bin/bash
# 맥 없이 '수집' (11/27~): Actions(typecast-tts)가 tts-out 브랜치에 올린 <이름>.zip 을 받아 /tmp/q/out/<이름>/ 에 풀고
# 사이트 mp3(audio/D-*.mp3)를 만들어 push. 영상 렌더(render_all.sh)도 이 /tmp/q 를 그대로 쓴다.
# 사용: bash scripts/daily/collect_tc.sh D [기다릴 분=60]
set -e; D=$1; WAIT=${2:-60}; cd "$(dirname "$0")/../.."
export TTS_ENGINE=typecast
RAW=https://raw.githubusercontent.com/yoonjintar2-ctrl/munhak-news/tts-out
mkdir -p /tmp/q/out /tmp/q/jobs
for n in shorts food mnews; do
  [ -f tts/typecast/$n-$D.json ] || { echo "작업 파일 없음: tts/typecast/$n-$D.json"; continue; }
  for i in $(seq 0 $((WAIT/2))); do
    curl -fsSL "$RAW/$n-$D.zip?t=$(date +%s)" -o /tmp/q/$n-$D.zip 2>/dev/null && break
    [ $i -eq $((WAIT/2)) ] && { echo "❌ $n-$D.zip 이 $WAIT분 안에 안 나옴 (Actions typecast-tts 확인)"; exit 1; }
    sleep 120
  done
  rm -rf /tmp/q/out/$n-$D; mkdir -p /tmp/q/out/$n-$D; python3 -c "import zipfile,sys;zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])" /tmp/q/$n-$D.zip /tmp/q/out/$n-$D
  touch /tmp/q/out/$n-$D/DONE; echo "$n-$D: $(ls /tmp/q/out/$n-$D/*.wav | wc -l)개"
done
cp tts/jobs/mnews-$D.script.json /tmp/q/jobs/
python3 -c "import resemblyzer, librosa" 2>/dev/null || pip install --break-system-packages -q resemblyzer librosa soundfile >/dev/null 2>&1
python3 scripts/tts/tts_post.py /tmp/q $D audio 2>&1 | grep -E "mp3:|빠진" | tail -12
python3 scripts/shorts/site_audio.py shorts/scripts/$D.json /tmp/q audio 2>&1 | tail -2   # 1분 코너는 영상 나레이션으로 덮음(반드시 tts_post 뒤)
python3 scripts/tts/audio_guard.py site $D /tmp/q audio 2>/dev/null || { echo "❌ 음성 확인 실패 — 사이트 mp3 를 올리지 않음(보고)"; git checkout -- audio 2>/dev/null; exit 1; }
[ -f tts/typecast_approved.txt ] || { echo "⏸ 발행인 미리듣기 승인 전 — 사이트 mp3 를 올리지 않음"; exit 1; }
python3 scripts/tts/to_typecast.py $D --dry | tail -1     # 오늘 쓴 타입캐스트 글자 수(보고에 적기)
git add audio/$D-*.mp3 && git commit -qm "듣기 음성 $D (타입캐스트)" -m "Co-Authored-By: Claude <noreply@anthropic.com>" || true
for i in 1 2 3 4 5; do git pull -q --rebase && git push -q && break; sleep 20; done
ls audio | grep -c "$D" | sed 's/^/mp3 /'
