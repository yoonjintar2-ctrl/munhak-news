"""맥 없이 GitHub Actions(CPU)에서 '듣기'·쇼츠 음성을 만든다 (발행인 11/21 "맥북 없이도 작업 가능하도록, 음성 퀄리티는 최대한 유지").
맥 작업대기기(tts_worker.py)와 같은 모델(Qwen3-TTS-12Hz-1.7B-Base)·같은 기준 음성(tts/ref/E_think.wav)·같은 생성 설정·같은 고장 테이크 검사를 쓴다.
CPU 라서 float32 로 돌린다(맥의 bfloat16 보다 정밀도는 같거나 높음).

사용: python3 scripts/cloud/tts_run.py <작업.json>... --shard i/n --out out
  여러 작업 파일의 items 를 이어 붙인 뒤 i 번째 몫만 만든다 → out/<작업 name>/<id>.wav
"""
import os, sys, json, time, argparse, gc
import numpy as np, soundfile as sf, torch

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
REF = os.path.join(ROOT, 'tts', 'ref', 'E_think.wav')
MODEL = os.environ.get('QTTS_BASE', 'Qwen/Qwen3-TTS-12Hz-1.7B-Base')


def broken(w, sr):
    """맥 tts_worker.broken 과 같은 검사"""
    if len(w) < sr * 0.5: return '너무 짧음'
    clip = float((np.abs(w) > 0.98).mean())
    if clip > 0.005: return f'클리핑 {clip*100:.1f}%'
    hop = int(sr * 0.05); r = np.array([np.sqrt((w[i:i + hop] ** 2).mean()) for i in range(0, len(w) - hop, hop)])
    act = r[r > 0.02]
    if len(act) < 10: return '거의 무음'
    if act.std() / act.mean() < 0.3: return '크기가 일정(소음 의심)'
    import librosa
    y = librosa.resample(w, orig_sr=sr, target_sr=16000)
    f0, v, _ = librosa.pyin(y, fmin=70, fmax=600, sr=16000, frame_length=1024)
    if v.mean() < 0.35: return f'유성음 {v.mean()*100:.0f}%'
    if np.nanmedian(f0[v]) > 380: return '삐 소리 의심'
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('jobs', nargs='+'); ap.add_argument('--shard', default='0/1'); ap.add_argument('--out', default='out')
    ap.add_argument('--limit', type=int, default=0)
    a = ap.parse_args()
    si, sn = map(int, a.shard.split('/'))
    torch.set_num_threads(os.cpu_count() or 4)
    todo = []
    for jp in a.jobs:
        J = json.load(open(jp, encoding='utf-8'))
        for it in J['items']:
            todo.append((J, it))
    mine = todo[si::sn]
    if a.limit: mine = mine[:a.limit]
    print(f'몫 {si}/{sn}: {len(mine)}개 (전체 {len(todo)})', flush=True)
    if not mine: return
    from qwen_tts import Qwen3TTSModel
    t0 = time.time()
    tts = Qwen3TTSModel.from_pretrained(MODEL, device_map='cpu', dtype=torch.float32)
    print(f'모델 준비 {time.time()-t0:.0f}초', flush=True)
    prompts = {}
    for J, it in mine:
        key = (J.get('ref_text'), bool(J.get('x_vector_only', False)))
        if key not in prompts:
            prompts[key] = tts.create_voice_clone_prompt(ref_audio=REF, ref_text=J.get('ref_text'), x_vector_only_mode=J.get('x_vector_only', False))
        out = os.path.join(a.out, J['name']); os.makedirs(out, exist_ok=True)
        fp = os.path.join(out, it['id'] + '.wav')
        if os.path.exists(fp): continue
        t1 = time.time()
        cap = {'max_new_tokens': int(12 * (3 + 0.22 * len(it['text'])))}
        gen = {**cap, **J.get('gen', {}), **it.get('gen', {})}
        w, sr, why = None, 24000, None
        for tri in range(J.get('retries', 4) + 1):
            try:
                wavs, sr = tts.generate_voice_clone(text=it['text'], language=it.get('language', 'Korean'), voice_clone_prompt=prompts[key], **gen)
                w = np.asarray(wavs[0], dtype=np.float32)
                why = broken(w, sr) if J.get('check', True) else None
            except Exception as e:
                w, why = np.zeros(2400, np.float32), f'오류 {str(e)[:60]}'
            if not why: break
            print(f"  {it['id']} 고장 테이크({why}) → 다시 {tri+1}", flush=True)
        sf.write(fp, w, sr)
        print(f"[{J['name']}] {it['id']}: {len(w)/sr:.1f}초 ({time.time()-t1:.0f}초 걸림)", flush=True)
        gc.collect()


if __name__ == '__main__':
    main()
