"""올리기 전 음성 확인(11/27 발행인 지시 — 미국주식 늬우스 '괴물 목소리' 사고 재발 방지).
샘플레이트를 잘못 읽으면 소리가 느리고 낮아진다(44.1kHz 를 24kHz 로 읽으면 1.84배 느리고 약 10반음 낮음).
완성본(사이트 mp3·영상)을 원본 wav(타입캐스트가 준 그대로, 샘플레이트는 파일 헤더에서 읽음)와 비교한다.

  python3 scripts/tts/audio_guard.py site  D /tmp/q audio     → 사이트 mp3 7개
  python3 scripts/tts/audio_guard.py video D /tmp/q /tmp/v    → 영상 5편
끝 줄이 'GUARD OK' 면 통과, 'GUARD FAIL' 이면 올리지 말고 보고(종료 코드 1).

기준:
- 길이: 완성본 길이 / 쓰인 원본 wav 길이 합 이 0.5~1.5 (문장 사이 쉼을 더하고 긴 쉼을 줄여 보통 0.7~1.2).
- 높이: 완성본 목소리 높이(librosa pyin 중앙값)가 원본 wav 중앙값과 2반음 안. 영상은 배경음악이 섞여 3반음 안.
- tts/voice_ref.json 에 고른 목소리의 원래 높이가 있으면 원본도 그것과 2반음 안(다른 목소리가 섞이는 사고 방지).
"""
import glob, json, os, re, subprocess, sys
import numpy as np, soundfile as sf, librosa

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')


def dur(p):
    if p.endswith('.wav'):
        return sf.info(p).duration                       # 헤더에서 읽음
    o = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout
    return float(o.strip() or 0)


def f0_med(p, max_sec=40):
    """파일 헤더의 샘플레이트 그대로 읽어(sr=None) 높이 중앙값(Hz)."""
    if p.endswith('.wav'):
        w, sr = sf.read(p, dtype='float32')
        if w.ndim > 1: w = w.mean(1)
    else:   # mp3·mp4: ffmpeg 으로 소리만 wav 로 꺼냄(샘플레이트는 원래 것 유지)
        t = '/tmp/_guard.wav'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', p, '-vn', '-ac', '1', '-t', str(max_sec), t], check=True)
        w, sr = sf.read(t, dtype='float32')
    w = w[: int(max_sec * sr)]
    f0, _, _ = librosa.pyin(w, fmin=70, fmax=500, sr=sr, frame_length=int(2 ** np.ceil(np.log2(sr * 0.03))))
    f0 = f0[~np.isnan(f0)]
    return float(np.median(f0)) if len(f0) else float('nan')


def src_f0(paths, n=6):
    vals = [f0_med(p) for p in sorted(paths)[:n]]
    vals = [v for v in vals if v == v]
    return float(np.median(vals)) if vals else float('nan')


def semis(a, b):
    return abs(12 * np.log2(a / b)) if a == a and b == b and a > 0 and b > 0 else 99.0


def check(name, out, srcs, ref_hz, tol_semi, bad):
    if not os.path.exists(out):
        print(f'· {name}: 완성본 없음 — 건너뜀'); return
    if not srcs:
        print(f'❌ {name}: 원본 wav 없음'); bad.append(name); return
    d_out, d_src = dur(out), sum(dur(p) for p in srcs)
    r = d_out / d_src if d_src else 99
    fo = f0_med(out)
    s = semis(fo, ref_hz)
    ok = 0.5 <= r <= 1.5 and s <= tol_semi
    print(f'{"✅" if ok else "❌"} {name}: 길이 {d_out:.1f}s / 원본 {d_src:.1f}s = {r:.2f}배, 높이 {fo:.0f}Hz vs 원본 {ref_hz:.0f}Hz ({s:.1f}반음)')
    if not ok: bad.append(name)


def main(mode, D, q, outdir):
    bad = []
    mn, sh, fd = (os.path.join(q, 'out', f'{n}-{D}') for n in ('mnews', 'shorts', 'food'))
    allsrc = [p for d in (mn, sh, fd) for p in glob.glob(os.path.join(d, '*_t0.wav'))]
    ref = src_f0(allsrc, 10)
    vr = os.path.join(ROOT, 'tts', 'voice_ref.json')
    if os.path.exists(vr):
        base = json.load(open(vr, encoding='utf-8')).get('f0_hz')
        if base:
            s = semis(ref, base)
            print(f'{"✅" if s <= 2 else "❌"} 원본 목소리 높이 {ref:.0f}Hz vs 고른 목소리 기준 {base:.0f}Hz ({s:.1f}반음)')
            if s > 2: bad.append('voice')
    if mode == 'site':
        for sec in ('sentence', 'poem', 'novel', 'writer', 'day'):
            check(sec, os.path.join(outdir, f'{D}-{sec}.mp3'), glob.glob(os.path.join(mn, f'{sec}_*_t0.wav')), ref, 2.0, bad)
        for k in ('classic', 'modern'):
            check(k, os.path.join(outdir, f'{D}-{k}.mp3'), glob.glob(os.path.join(sh, f'{k}_*_t0.wav')), ref, 2.0, bad)
    else:
        check('food', os.path.join(outdir, f'{D}-food.mp4'), glob.glob(os.path.join(fd, '*_t0.wav')), ref, 3.0, bad)
        for k in ('classic', 'modern'):
            src = glob.glob(os.path.join(sh, f'{k}_*_t0.wav'))
            check(k, os.path.join(outdir, f'{D}-{k}.mp4'), src, ref, 3.0, bad)
            # 결말까지 쇼츠는 앞부분만 쓰므로 길이는 하한 없이 상한만 본다
            out = os.path.join(outdir, f'{D}-{k}-full.mp4')
            if os.path.exists(out) and src:
                r = dur(out) / sum(dur(p) for p in src); fo = f0_med(out); s = semis(fo, ref)
                ok = r <= 1.5 and s <= 3.0
                print(f'{"✅" if ok else "❌"} {k}-full: {r:.2f}배, 높이 {fo:.0f}Hz ({s:.1f}반음)')
                if not ok: bad.append(k + '-full')
    print('GUARD FAIL ' + ' '.join(bad) if bad else 'GUARD OK')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main(*sys.argv[1:5])
