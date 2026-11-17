"""발음 미세 어색함 검수 — 같은 문장 테이크끼리 음높이 흐름·글자 길이를 맞대어 본다(발행인 11/17).

"발음이 정말 좋은데 가끔 조금 어색한 게 있다 — 음의 높낮이나 특정 글자 하나의 길이가 아주 미세하게 다른 정도"
 → 같은 문장을 두 번 이상 읽힌 테이크를 MFCC 로 글자 위치끼리 맞춘 뒤(DTW)
   ① 음높이: 한 테이크만 어느 지점에서 2.5반음 넘게 튀면(80ms 이상) 표시
   ② 길이: 한 테이크만 어느 소리를 2배 넘게 끌면(180ms 이상) 표시
   튄 쪽은 '자기 자신의 매끄러운 억양선에서 더 벗어난 테이크'로 정한다. 모든 테이크가 같은 곳에서 같게 읽으면 원래 억양으로 본다.

  python3 scripts/tts/prosody_qa.py <qtts 폴더> <작업 이름(shorts-<날짜>)> [줄 id 접두어(classic,modern)]
    → 문장마다 테이크별 점수와 의심 표시를 출력, <qtts>/out/<이름>/prosody.json 에 저장
  python3 scripts/tts/prosody_qa.py fix <qtts> <이름> tts/jobs/<이름>.json /tmp/<이름>-fix.json
    → 의심 문장만 테이크 2개 더 읽히는 작업(맥 jobs/ 에 넣기, 같은 out 폴더에 _t2·_t3 로 쌓임)
  make_short.build_audio 가 이 점수로 테이크를 고른다(점수 1 = 이상 1곳, 낮을수록 좋음).
"""
import glob, json, os, re, sys
import numpy as np, librosa

SR = 24000; HOP = 240           # 10ms
PITCH_ST, PITCH_MIN, RESID = 3.5, 8, 2.0    # 반음, 프레임(80ms)
LEN_RATIO, LEN_MIN = 2.2, 18    # 배, 프레임(180ms)
FLAG = 1.0                      # 고른 테이크 점수가 이 이상이면 '의심'


def _load(p):
    import soundfile as sf
    w, sr = sf.read(p, dtype='float32')
    if w.ndim > 1: w = w.mean(1)
    if sr != SR: w = librosa.resample(w, orig_sr=sr, target_sr=SR)
    i = np.where(np.abs(w) > 0.01)[0]
    return w[max(0, i[0] - 1200): i[-1] + 1200] if len(i) else w


def feats(w):
    m = librosa.feature.mfcc(y=w, sr=SR, n_mfcc=14, hop_length=HOP, n_fft=1024)[1:]
    m = (m - m.mean(1, keepdims=True)) / (m.std(1, keepdims=True) + 1e-6)
    f0, v, _ = librosa.pyin(w, fmin=80, fmax=500, sr=SR, frame_length=1024, hop_length=HOP)
    st = 12 * np.log2(np.where(v, f0, np.nan) / 100.0)
    rms = librosa.feature.rms(y=w, frame_length=960, hop_length=HOP)[0]
    n = min(m.shape[1], len(st), len(rms))
    loud = 20 * np.log10(rms[:n] + 1e-9) > -38
    sm = np.full(n, np.nan)                         # 자기 억양선(31프레임 중앙값, 유성음만)
    for i in range(n):
        seg = st[max(0, i - 15): i + 16]; seg = seg[~np.isnan(seg)]
        if len(seg) >= 5: sm[i] = np.median(seg)
    return dict(m=m[:, :n], st=st[:n], sm=sm, loud=loud, n=n)


def _runs(mask, minlen):
    out, s = [], None
    for i, x in enumerate(list(mask) + [False]):
        if x and s is None: s = i
        if not x and s is not None:
            if i - s >= minlen: out.append((s, i))
            s = None
    return out


def compare(A, B):
    """두 테이크 비교 → (A 이상 목록, B 이상 목록, 애매 목록). 항목: (종류, 초, 크기)"""
    _, wp = librosa.sequence.dtw(X=A['m'], Y=B['m'], metric='euclidean', subseq=False)
    wp = wp[::-1]; a, b = wp[:, 0], wp[:, 1]
    ea, eb, amb = [], [], []
    # ① 음높이
    d = A['st'][a] - B['st'][b]
    ok = ~np.isnan(d)
    if ok.sum() > 20:
        off = np.median(d[ok]); dd = np.where(ok, d - off, 0.0)
        dd = np.where(np.abs(dd) > 7, 0.0, dd)      # 옥타브 오인식은 무시
        for s, e in _runs(np.abs(dd) > PITCH_ST, PITCH_MIN):
            ra = np.nanmean(np.abs(A['st'][a[s:e]] - A['sm'][a[s:e]])); rb = np.nanmean(np.abs(B['st'][b[s:e]] - B['sm'][b[s:e]]))
            mag = float(np.abs(dd[s:e]).mean()); t = (a[s] * HOP / SR, b[s] * HOP / SR)
            if np.isnan(ra) or np.isnan(rb): continue
            # 두 테이크 억양이 그냥 다른 것(둘 다 자연스러움)은 넘어가고, 한쪽이 자기 억양선에서 툭 튄 경우만
            if ra >= RESID and ra > 1.5 * rb: ea.append(('음높이', t[0], mag))
            elif rb >= RESID and rb > 1.5 * ra: eb.append(('음높이', t[1], mag))
            elif min(ra, rb) >= RESID: amb.append(('음높이', t, mag))
    # ② 길이(한쪽만 소리를 끎) — 경로에서 한쪽 프레임만 계속 늘어나는 구간, 소리 나는 곳만
    W = 24
    for i in range(0, len(wp) - W, 4):
        da = a[i + W] - a[i]; db = b[i + W] - b[i]
        if min(da, db) < 4: continue               # 한쪽이 쉼·숨소리면 길이 비교가 아님
        la = A['loud'][a[i]:a[i + W]].mean(); lb = B['loud'][b[i]:b[i + W]].mean()
        if la < 0.9 or lb < 0.9: continue
        if da >= LEN_MIN and da >= LEN_RATIO * db: ea.append(('길이', a[i] * HOP / SR, da / db))
        if db >= LEN_MIN and db >= LEN_RATIO * da: eb.append(('길이', b[i] * HOP / SR, db / da))
    return _dedup(ea), _dedup(eb), amb


def _dedup(xs):
    out = []
    for k, t, m in sorted(xs, key=lambda x: x[1]):
        if out and out[-1][0] == k and t - out[-1][1] < 0.3: out[-1] = (k, out[-1][1], max(m, out[-1][2]))
        else: out.append((k, t, m))
    return out


def score_line(paths):
    """같은 문장 테이크들 → {테이크: dict(score, issues)} — 점수: 음높이 이상 1개=1, 길이 이상=1, 애매(어느 쪽인지 모름)=0.5씩 양쪽"""
    F = {p: feats(_load(p)) for p in paths}
    R = {p: dict(score=0.0, issues=[]) for p in paths}
    ps = list(paths)
    for i in range(len(ps)):
        for j in range(i + 1, len(ps)):
            ea, eb, amb = compare(F[ps[i]], F[ps[j]])
            for x in ea: R[ps[i]]['issues'].append(x[:2] + (round(x[2], 1),))
            for x in eb: R[ps[j]]['issues'].append(x[:2] + (round(x[2], 1),))
            for k, t, m in amb:
                R[ps[i]]['issues'].append((k + '?', t[0], round(m, 1))); R[ps[j]]['issues'].append((k + '?', t[1], round(m, 1)))
    for p in ps:
        iss = _dedup([(k, t, m) for k, t, m in R[p]['issues']])
        R[p]['issues'] = iss
        R[p]['score'] = sum(0.5 if k.endswith('?') else 1.0 for k, _, _ in iss) / max(1, len(ps) - 1)
    return R


def main(qdir, name, prefixes='classic,modern,open,food'):
    qdir = os.path.expanduser(qdir); od = os.path.join(qdir, 'out', name)
    pre = tuple(prefixes.split(','))
    groups = {}
    for p in sorted(glob.glob(os.path.join(od, '*_t*.wav'))):
        k = os.path.basename(p)[:-4].rsplit('_t', 1)[0]
        if k.startswith(pre): groups.setdefault(k, []).append(p)
    res = {}
    old = {}
    pj = os.path.join(od, 'prosody.json')
    if os.path.exists(pj): old = json.load(open(pj, encoding='utf-8'))
    for k, ps in groups.items():
        if len(ps) < 2: continue
        if k in old and k != '_n' and len(old[k]) == len(ps): res[k] = old[k]; continue      # 테이크가 그대로면 지난 결과 재사용
        R = score_line(ps)
        res[k] = {os.path.basename(p)[:-4]: dict(score=round(v['score'], 2), issues=[[a, round(b, 2), c] for a, b, c in v['issues']]) for p, v in R.items()}
    for k in res:
        if k != '_n' and min(v['score'] for v in res[k].values()) >= FLAG: print('의심', k, json.dumps(res[k], ensure_ascii=False))
    res['_n'] = len(glob.glob(os.path.join(od, '*_t*.wav')))
    json.dump(res, open(os.path.join(od, 'prosody.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    n = sum(1 for k, v in res.items() if k != '_n' and min(x['score'] for x in v.values()) >= FLAG)
    print(f'문장 {len(res) - 1}개 중 의심 {n}개 → {od}/prosody.json')




def penalties(qdir, name):
    """make_short.build_audio 용: {테이크 이름: 점수}. prosody.json 이 없거나 테이크가 늘었으면 새로 계산."""
    od = os.path.join(os.path.expanduser(qdir), 'out', name); pj = os.path.join(od, 'prosody.json')
    n_takes = len(glob.glob(os.path.join(od, '*_t*.wav')))
    if not os.path.exists(pj) or json.load(open(pj, encoding='utf-8')).get('_n') != n_takes:
        main(qdir, name)
    r = json.load(open(pj, encoding='utf-8'))
    return {t: v['score'] for k, g in r.items() if k != '_n' for t, v in g.items()}


def fix_job(qdir, name, job_json, out_json, cap=12):
    """의심 문장만 테이크 2개 더(t2,t3) — 아침 05:10 수거 뒤 맥 jobs/ 에 넣으면 05:40 전에 끝남(테이크당 약 55초)."""
    r = json.load(open(os.path.join(os.path.expanduser(qdir), 'out', name, 'prosody.json'), encoding='utf-8'))
    J = json.load(open(job_json, encoding='utf-8'))
    bad = sorted([k for k, g in r.items() if k != '_n' and min(v['score'] for v in g.values()) >= FLAG],
                 key=lambda k: -min(v['score'] for v in r[k].values()))[:cap]
    have = {it['id'].rsplit('_t', 1)[0]: it for it in J['items']}
    items = []
    for k in bad:
        n = len(r[k])
        for t in (n, n + 1): items.append({**have[k], 'id': f'{k}_t{t}'})
    J['items'] = items
    json.dump(J, open(out_json, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'다시 읽힐 문장 {len(bad)}개(테이크 {len(items)}개) → {out_json}')
    return bad


if __name__ == '__main__':
    a = sys.argv[1:]
    if a and a[0] == 'fix': fix_job(*a[1:5])          # prosody_qa.py fix <qtts> <이름> <원래 작업 json> <새 작업 json>
    else: main(*a[:3])
