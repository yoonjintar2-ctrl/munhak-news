#!/bin/bash
# 영상 5편 렌더·검수 (한 번에 하나씩 — CPU 2개). 결과 /tmp/v, 요약 /tmp/v/render-D.txt
# 사용: bash scripts/daily/render_all.sh D   (맥 out 의 shorts-D·food-D 가 /tmp/q/out 에 풀려 있어야 함)
D=$1; cd "$(dirname "$0")/../.."; mkdir -p /tmp/v
[ -f /tmp/q/out/casual1/E_think.wav ] || export TTS_ENGINE=typecast   # 11/27~ 맥 없음: 타입캐스트 음성(테이크 1개)
 R=/tmp/v/render-$D.txt; : > $R
python3 scripts/tts/prosody_qa.py /tmp/q food-$D >/dev/null 2>&1; python3 scripts/tts/prosody_qa.py /tmp/q shorts-$D >/dev/null 2>&1
mk(){ timeout 600 python3 scripts/shorts/make_short.py "$1" $2 /tmp/q . "$3" > "$3.log" 2>&1; tail -n1 "$3.log"; }
dur(){ ffprobe -v error -show_entries format=duration -of csv=p=0 "$1" 2>/dev/null | cut -d. -f1; }
qa(){ timeout 300 python3 scripts/shorts/qa_video.py "$1" $2 "$3" . 2>&1 | grep -qE "통과" && echo "qa ok $3" || echo "qa ❌ $3"; }
mk shorts/scripts/$D-food.json food /tmp/v/$D-food.mp4 >> $R; qa shorts/scripts/$D-food.json food /tmp/v/$D-food.mp4 >> $R
for k in classic modern; do
  python3 scripts/shorts/teaser.py shorts/scripts/$D.json $k --full >/dev/null 2>&1
  f=/tmp/v/$D-$k-full.mp4; mk shorts/scripts/$D-$k-full.json $k $f >> $R
  if [ "$(dur $f)" -gt 179 ]; then  # 쇼츠 3분 한도: 마무리 멘트 첫 줄만 남기고 다시
    python3 -c "import json;p='shorts/scripts/$D-$k-full.json';S=json.load(open(p));C=S['$k'];C['outro']=C['outro'][:1];C['keys']=C['keys'][:-2];json.dump(S,open(p,'w'),ensure_ascii=False,indent=1)"
    mk shorts/scripts/$D-$k-full.json $k $f >> $R; fi
  [ "$(dur $f)" -gt 179 ] && echo "⚠️ $k-full 179초 넘음 — 건너뜀" >> $R
  qa shorts/scripts/$D-$k-full.json $k $f >> $R
  python3 scripts/shorts/yt_desc.py shorts/scripts/$D.json $k /tmp/v/$D-$k-full.timeline.json . | grep -v "가로 본편" > /tmp/v/desc-$k-full.txt
done
for k in classic modern; do f=/tmp/v/$D-$k.mp4; mk shorts/scripts/$D.json $k $f >> $R; qa shorts/scripts/$D.json $k $f >> $R
  python3 scripts/shorts/make_srt.py /tmp/v/$D-$k.timeline.json /tmp/v/$D-$k.srt >/dev/null
  python3 scripts/shorts/yt_desc.py shorts/scripts/$D.json $k /tmp/v/$D-$k.timeline.json . > /tmp/v/desc-$k.txt; done
python3 - "$D" >> $R <<'P'
import json,sys;D=sys.argv[1];d=json.load(open(f'drafts/{D}.json'));f=d['food'];b=f['body'][0] if isinstance(f['body'],list) else f['body']
open('/tmp/v/desc-food.txt','w').write(f"문학 한술 — {f['writer']} {f['work']} 속 {f['name']}.\n\n{b}\n\n👉 https://mnews.jintar.co.kr/s/{D}-food.html\n\n#문학한술 #문학늬우스 #shorts")
S=json.load(open(f'shorts/scripts/{D}-food.json'));print('title food |',S.get('food',S).get('yt',{}).get('title'))
for k in ['classic','modern']:
  print(f'title {k}-full |',json.load(open(f'shorts/scripts/{D}-{k}-full.json'))[k]['yt']['title'])
  print(f'title {k} |',json.load(open(f'shorts/scripts/{D}.json'))[k]['yt']['title'],'| origin',d[k].get('origin',''))
P
# 업로드: 11/27~ 맥 크롬 대신 유튜브 API — bash scripts/daily/queue_all.sh D (예전 video-upload 브랜치 방식은 docs/YOUTUBE-UPLOAD.md 예전 방식 절)
cat $R
