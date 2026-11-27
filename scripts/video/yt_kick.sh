#!/bin/bash
# yt-upload 워크플로 실행: main 의 video/kick.txt 를 바꿔 push(→ push 트리거). gh 로그인이 되어 있으면 dispatch 도 시도.
# (yt-queue 브랜치에는 워크플로 파일이 없어서 그 브랜치 push 로는 안 돈다)
R=$(cd "$(dirname "$0")/../.." && pwd); cd $R
date -u +%FT%TZ > video/kick.txt
git add video/kick.txt && git commit -qm "유튜브 업로드 실행" && for i in 1 2 3 4 5; do git pull -q --rebase && git push -q && break; sleep 10; done
echo "yt-upload 실행 요청함(kick)"
