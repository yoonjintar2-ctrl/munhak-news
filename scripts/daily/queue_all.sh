#!/bin/bash
# 11/27~ 맥 크롬 대신 유튜브 API: render_all.sh 가 만든 /tmp/v 의 5편을 yt-queue 에 올리고 yt-upload 를 한 번 실행.
# 순서(키 이름순으로 올라감): 1 문학 한술 → 2 결말까지 classic → 3 modern → 4 본편 classic → 5 modern. 모두 바로 공개.
# 본편: 자막(srt) + 재생목록(classic '1분 고전', modern '1분 현대문학' + origin 국내면 '한국 문학', 아니면 '세계 문학'). 최종 화면은 API 로 못 넣음.
# 사용: bash scripts/daily/queue_all.sh D
D=$1; cd "$(dirname "$0")/../.."; rm -rf /tmp/v/spec
python3 - "$D" <<'P'
import json, re, sys, os
D = sys.argv[1]; d = json.load(open(f'drafts/{D}.json'))
rep = open(f'/tmp/v/render-{D}.txt').read() if os.path.exists(f'/tmp/v/render-{D}.txt') else ''
def tags(t): return [h.lstrip('#') for h in re.findall(r'#\S+', t) if h.lower() != '#shorts'][:12] + ['문학늬우스', '1분문학']
S = json.load(open(f'shorts/scripts/{D}.json'))
F = json.load(open(f'shorts/scripts/{D}-food.json'))
jobs = [('1-food', 'food', F.get('food', F).get('yt', {}).get('title'), None)]
for k in ('classic', 'modern'):
    jobs.append((f'2-{k}-full' if k == 'classic' else '3-modern-full', f'{k}-full', json.load(open(f'shorts/scripts/{D}-{k}-full.json'))[k]['yt']['title'], None))
for k in ('classic', 'modern'):
    pl = ['1분 고전' if k == 'classic' else '1분 현대문학', '한국 문학' if d[k].get('origin', '') in ('국내', '한국', 'KR', 'ko') else '세계 문학']
    jobs.append((f'4-{k}' if k == 'classic' else '5-modern', k, S[k]['yt']['title'], pl))
os.makedirs('/tmp/v/spec', exist_ok=True)
for key, kind, title, pl in jobs:
    mp4 = f'/tmp/v/{D}-{kind}.mp4'
    if not os.path.exists(mp4) or f'qa ❌ {mp4}' in rep:
        print('건너뜀', kind); continue
    spec = {'key': f'{D}:{key}', 'title': title, 'description': open(f'/tmp/v/desc-{kind}.txt').read(), 'tags': tags(title), 'categoryId': '27'}
    if pl:
        spec['playlists'] = pl
        srt = f'/tmp/v/{D}-{kind}.srt'
        if os.path.exists(srt): spec['captions_srt'] = open(srt, encoding='utf-8').read()
    json.dump(spec, open(f'/tmp/v/spec/{key}.json', 'w'), ensure_ascii=False, indent=1)
    print(f'{key}\t{mp4}')
P

[ "$DRY" = 1 ] && { ls /tmp/v/spec; exit 0; }
for s in /tmp/v/spec/[1-5]-*.json; do
  [ -f "$s" ] || continue
  k=$(basename $s .json); kind=${k#?-}
  NO_KICK=1 bash scripts/video/yt_queue.sh "$D:$k" /tmp/v/$D-$kind.mp4 /nonexistent.jpg $s
done
bash scripts/video/yt_kick.sh
echo "올린 뒤 확인: video/uploaded.json (몇 분 걸림)"
