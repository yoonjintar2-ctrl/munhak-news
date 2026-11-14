"""쇼츠 대본(shorts/scripts/<날짜>.json) → 맥 qtts 나레이션 작업 파일 tts/jobs/shorts-<날짜>.json
  python3 scripts/shorts/shorts_job.py shorts/scripts/<날짜>.json [출력 폴더=tts/jobs] [테이크=2]
id: open_00(맨 앞 컨셉 소개), <코너>_<번호 두 자리>  — make_short.py 와 같은 번호 규칙(intro→body→outro 순)
같은 폴더에 mnews-<날짜>.json(지면 듣기 작업)이 있으면 1분 코너(classic·modern)를 빼 준다 — 그 듣기는 site_audio.py 가 쇼츠 본문으로 만든다."""
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tts'))
import tts_jobs as J


def main(src, outdir='tts/jobs', takes=2):
    S = json.load(open(src, encoding='utf-8')); D = S['date']; items = []
    add = lambda key, line: items.extend({"id": f"{key}_t{k}", "text": J.ko(line.replace(' / ', ' ').replace('/', ' ')) + " 음.", "gen": {"non_streaming_mode": True}} for k in range(int(takes)))
    if S.get('opener'): add('open_00', S['opener'])
    for k in ('classic', 'modern'):
        if k not in S: continue
        for i, l in enumerate(S[k]['intro'] + S[k]['body'] + S[k]['outro']): add(f'{k}_{i:02d}', l)
    job = {"name": f"shorts-{D}", "mode": "clone", **J.REF, "gen": {"temperature": 0.75, "top_p": 0.9}, "reload_every": 4, "retries": 4, "items": items}
    os.makedirs(outdir, exist_ok=True); out = os.path.join(outdir, f'shorts-{D}.json')
    json.dump(job, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'{out}: 테이크 {len(items)}개 (약 {len(items) * 55 // 60}분)')
    # 11/14 발행인: 1분 고전·현대문학 '듣기'는 쇼츠 나레이션 본문을 그대로 씀 → mnews 작업에서 그 코너를 뺀다
    mj, ms = os.path.join(outdir, f'mnews-{D}.json'), os.path.join(outdir, f'mnews-{D}.script.json')
    if os.path.exists(mj):
        j = json.load(open(mj, encoding='utf-8')); n0 = len(j['items'])
        j['items'] = [i for i in j['items'] if not i['id'].startswith(('classic_', 'modern_'))]
        json.dump(j, open(mj, 'w', encoding='utf-8'), ensure_ascii=False, indent=1); print(f'{mj}: 1분 코너 뺌 {n0}→{len(j["items"])}')
    if os.path.exists(ms):
        sc = json.load(open(ms, encoding='utf-8')); [sc.pop(k, None) for k in ('classic', 'modern')]
        json.dump(sc, open(ms, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main(*sys.argv[1:])
