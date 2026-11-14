"""쇼츠 나레이션 중 '작품 읽는 부분'(body)을 지면 '듣기'로 — 발행인 11/14 "나레이션 중 작품 읽는 부분은 사이트에도 그대로"
  python3 scripts/shorts/site_audio.py shorts/scripts/<날짜>.json <qtts 흉내 폴더(out/shorts-<날짜>/, out/casual1/E_think.wav)> [출력 폴더=audio]
→ audio/<날짜>-classic.mp3, audio/<날짜>-modern.mp3 (연필이 소개·마무리 인사는 빼고 본문만, 차분한 톤: 문장 사이 0.6초, 배속 1.0)
테이크 고르기·꼬리 자르기·쉼 줄이기는 make_short.py / tts_post.py 와 같은 규칙."""
import json, os, subprocess, sys
import numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.join(REPO, 'scripts', 'tts'))
import make_short as M, tts_jobs as J, tts_post as T


def main(script, qdir, outdir='audio'):
    S = json.load(open(script, encoding='utf-8')); D = S['date']; os.makedirs(outdir, exist_ok=True)
    for k in ('classic', 'modern'):
        if k not in S: continue
        C = S[k]; n0 = len(C['intro'])
        keys = [(f'{k}_{n0 + i:02d}', J.ko(l.replace(' / ', ' '))) for i, l in enumerate(C['body'])]
        clips, sr = M.build_audio(qdir, f'shorts-{D}', keys, REPO)
        parts = []
        for w, _ in clips: parts += [w.astype(np.float32), np.zeros(int(sr * T.GAP), np.float32)]
        wav = os.path.join(outdir, f'{D}-{k}.wav'); sf.write(wav, np.concatenate(parts), sr)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-af', 'loudnorm=I=-16:TP=-1.5', '-ac', '1', '-b:a', '64k', wav[:-4] + '.mp3'], check=True)
        os.remove(wav); print('mp3:', wav[:-4] + '.mp3')


if __name__ == '__main__':
    main(*sys.argv[1:4])
