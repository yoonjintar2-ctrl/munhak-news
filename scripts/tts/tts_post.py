"""qtts 결과(out/mnews-<날짜>/*.wav) → 테이크 고르기·후처리 → 코너별 mp3.

  python3 tts_post.py <qtts 폴더(예: ~/Downloads/qtts)> <날짜> <mp3 출력 폴더>
테이크 고르기: 기준 음성과 화자 유사도(resemblyzer, 전체 + 1.5초 창 0.5초 간격 최저값), 음높이 중앙값이 전체 중앙값과 1.5반음 넘게 다르면 버림,
같은 문장 테이크 길이 중앙값의 1.6배 이상이면 버림. 후처리: 끝 '음' 꼬리 자르기(마지막 0.6초 이하 덩어리, 앞 쉼 0.3초 이상), 0.45초 넘는 쉼 → 0.34초, 문장 사이 0.4초, atempo 1.05(피치 유지).
"""
import glob, json, os, re, subprocess, sys
import numpy as np, soundfile as sf, librosa
from resemblyzer import VoiceEncoder, preprocess_wav

SR = 24000
# 11/14 발행인 지시 "샌디스크 올인처럼 차분한 톤": 생성 설정은 그대로, 후처리로 차분하게.
#  배속 1.05→1.0, 문장 안 긴 쉼 0.34→0.40초, 문장 사이 0.4→0.6초, 음높이는 샌디스크 쇼츠 테이크 중앙값(약 193Hz)에 가까운 테이크를 고름.
TEMPO, PAUSE, GAP, CALM_F0 = 1.0, 0.40, 0.60, 193.0


def load(p):
    w, sr = sf.read(p, dtype="float32")
    if w.ndim > 1: w = w.mean(1)
    if sr != SR: w = librosa.resample(w, orig_sr=sr, target_sr=SR)
    return w


def segs(w, thr_db=-38, hop=240):
    rms = librosa.feature.rms(y=w, frame_length=960, hop_length=hop)[0]
    on = 20 * np.log10(rms + 1e-9) > thr_db
    out, st = [], None
    for i, v in enumerate(on):
        if v and st is None: st = i
        if not v and st is not None: out.append([st * hop, i * hop]); st = None
    if st is not None: out.append([st * hop, len(w)])
    return out


def trim_tail(w):
    s = segs(w)
    if len(s) >= 2:
        a, b = s[-1]; pa, pb = s[-2]
        if (b - a) / SR <= 0.6 and (a - pb) / SR >= 0.3:   # 11/14: 0.45초면 '음' 앞 쉼이 0.41초인 테이크에서 꼬리가 남음
            return w[:pb + int(0.08 * SR)]
    return w


def squeeze(w, text):
    s = segs(w)
    if not s: return w
    out = [w[: s[0][1]]]
    for (a0, b0), (a1, b1) in zip(s, s[1:]):
        gap = (a1 - b0) / SR
        keep = gap if gap <= 0.45 else (0.55 if "…" in text else PAUSE)
        out += [np.zeros(int(keep * SR), np.float32), w[a1:b1]]
    return np.concatenate(out + [np.zeros(int(0.05 * SR), np.float32)])


def f0_med(w):
    f0, v, _ = librosa.pyin(w, fmin=80, fmax=600, sr=SR, frame_length=1024)
    f0 = f0[~np.isnan(f0)]
    return float(np.median(f0)) if len(f0) else np.nan


def main(qtts, date, outdir):
    qtts = os.path.expanduser(qtts)
    name = f"mnews-{date}"
    sc = json.load(open(os.path.join(qtts, "jobs", name + ".script.json"), encoding="utf-8"))
    enc = VoiceEncoder()
    ref = enc.embed_utterance(preprocess_wav(os.path.join(qtts, "out/casual1/E_think.wav")))
    cand = {}
    for p in glob.glob(os.path.join(qtts, "out", name, "*.wav")):
        m = re.match(r"(.+)_(\d+)_t(\d+)\.wav$", os.path.basename(p))
        if m: cand.setdefault((m.group(1), int(m.group(2))), []).append(p)
    info = {}
    for key, ps in cand.items():
        for p in ps:
            w = trim_tail(load(p))
            pw = preprocess_wav(w, source_sr=SR)
            full = float(np.dot(enc.embed_utterance(pw), ref))
            win = []
            for st in range(0, max(1, len(pw) - int(1.5 * 16000)), 8000):
                c = pw[st: st + int(1.5 * 16000)]
                if len(c) > 8000: win.append(float(np.dot(enc.embed_utterance(c), ref)))
            info[p] = dict(w=w, full=full, low=min(win) if win else full, f0=f0_med(w), dur=len(w) / SR)
    allf0 = np.nanmedian([v["f0"] for v in info.values()])
    os.makedirs(outdir, exist_ok=True)
    for sec, ss in sc.items():
        parts = []
        for i, text in enumerate(ss):
            ps = cand.get((sec, i), [])
            if not ps: print("빠진 문장", sec, i, text); continue
            dmed = np.median([info[p]["dur"] for p in ps])
            ok = [p for p in ps if info[p]["dur"] < 1.6 * dmed and not (abs(12 * np.log2(info[p]["f0"] / allf0)) > 1.5 if info[p]["f0"] == info[p]["f0"] else False) and info[p]["low"] > info[p]["full"] - 0.12]
            best = max(ok or ps, key=lambda p: (info[p]["full"] + info[p]["low"]) / 2 - (0.03 * max(0.0, 12 * np.log2(info[p]["f0"] / CALM_F0)) if info[p]["f0"] == info[p]["f0"] else 0))   # 높은 톤일수록 감점(반음당 0.03)
            if not ok: print("통과 테이크 없음(가장 나은 것 사용)", sec, i, text)
            parts += [squeeze(info[best]["w"], text), np.zeros(int(GAP * SR), np.float32)]
        if not parts: continue
        wav = os.path.join(outdir, f"{date}-{sec}.wav")
        sf.write(wav, np.concatenate(parts), SR)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-af", ("atempo=%.2f," % TEMPO if TEMPO != 1.0 else "") + "loudnorm=I=-16:TP=-1.5", "-ac", "1", "-b:a", "64k", wav[:-4] + ".mp3"], check=True)
        os.remove(wav)
        print("mp3:", wav[:-4] + ".mp3")


if __name__ == "__main__":
    main(*sys.argv[1:4])
