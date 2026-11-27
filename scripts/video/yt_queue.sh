#!/bin/bash
# (usstock-news 에서 가져옴 11/27) 맥 없이 유튜브 업로드 맡기기: 완성 영상을 yt-queue 브랜치에 올리면 Actions(yt-upload)가 API로 올리고 video/uploaded.json 에 기록한다.
# NO_KICK=1 이면 대기열에만 올리고 실행은 안 함(여러 편을 올린 뒤 kick 한 번)
# bash scripts/video/yt_queue.sh <key 예: 2026-11-28:1-food> <mp4> <thumb.jpg> <대본 json(title/description/tags)> [publish_at ISO]
set -e
KEY=$1; MP4=$2; TH=$3; SPEC=$4; PA=$5
R=$(cd "$(dirname "$0")/../.." && pwd); W=/tmp/ytq_$$; rm -rf $W
git -C $R fetch -q origin yt-queue 2>/dev/null && git -C $R worktree add -q $W origin/yt-queue 2>/dev/null || { git -C $R worktree add -q --detach $W && (cd $W && git checkout -q --orphan yt-queue && git rm -rqf . 2>/dev/null || true); }
D=$W/q/${KEY//:/_}; mkdir -p $D
cp "$MP4" $D/video.mp4; cp "$TH" $D/thumb.jpg 2>/dev/null || true; cp "$SPEC" $D/spec.json
python3 -c "import json,sys;json.dump({'key':sys.argv[1],'publish_at':sys.argv[2]},open(sys.argv[3],'w'))" "$KEY" "$PA" $D/job.json
cd $W && git add -A q && git commit -qm "업로드 대기 $KEY" && for i in 1 2 3; do git push -q origin HEAD:yt-queue && break; git pull -q --rebase origin yt-queue; done
cd $R && git worktree remove --force $W
[ "$NO_KICK" = 1 ] && { echo "yt-queue 에 올림: $KEY (실행은 나중에 kick)"; exit 0; }
bash "$R/scripts/video/yt_kick.sh"
echo "yt-queue 에 올림: $KEY (몇 분 뒤 video/uploaded.json 확인)"
