"""쇼츠 대본(shorts/scripts/<날짜>.json) → 맥 qtts 나레이션 작업 파일 tts/jobs/shorts-<날짜>.json
  python3 scripts/shorts/shorts_job.py shorts/scripts/<날짜>.json [출력 폴더=tts/jobs] [테이크=2]
id: open_00(맨 앞 컨셉 소개), <코너>_<번호 두 자리>  — make_short.py 와 같은 번호 규칙(intro→body→outro 순)"""
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


if __name__ == '__main__':
    main(*sys.argv[1:])
