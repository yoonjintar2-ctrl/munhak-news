"""AI 삽화(정지 그림) → 3초 장면 영상 (11/18 발행인 "완전히 자동화" — 맥 SDXL-Lightning 그림 + 카메라 움직임)
  python3 scripts/img/animate.py in.png out.mp4 [--move push|pull|left|right] [--sec 3] [--w 1280 --h 720]
천천히 밀기/당기기/옆으로 흐르기 + 종이 결 + 아주 약한 빛 흔들림. 같은 이름 .jpg(0.4초 정지 컷)도 만든다."""
import sys, os, subprocess, argparse, numpy as np
from PIL import Image, ImageFilter, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

def main():
    a = argparse.ArgumentParser(); a.add_argument('src'); a.add_argument('out')
    a.add_argument('--move', default='push'); a.add_argument('--sec', type=float, default=3); a.add_argument('--w', type=int, default=1280); a.add_argument('--h', type=int, default=720); a.add_argument('--fps', type=int, default=30)
    o = a.parse_args()
    im = Image.open(o.src).convert('L'); W, H = o.w, o.h
    # 화면 비율로 가운데 맞춰 자르기
    r = W / H; iw, ih = im.size
    if iw / ih > r: nw = int(ih * r); im = im.crop(((iw - nw) // 2, 0, (iw - nw) // 2 + nw, ih))
    else: nh = int(iw / r); im = im.crop((0, (ih - nh) // 2, iw, (ih - nh) // 2 + nh))
    im = im.resize((W * 2, H * 2), Image.LANCZOS)   # 2배로 두고 부드럽게 움직이기
    rng = np.random.default_rng(7); grain = rng.normal(0, 1, (H, W)).astype(np.float32)
    n = int(o.sec * o.fps)
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'gray', '-s', f'{W}x{H}', '-r', str(o.fps), '-i', '-',
                           '-c:v', 'libx264', '-crf', '20', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', o.out], stdin=subprocess.PIPE)
    still = None
    for i in range(n):
        t = i / max(1, n - 1); e = t * t * (3 - 2 * t)
        z = {'push': 1.0 + 0.08 * e, 'pull': 1.08 - 0.08 * e}.get(o.move, 1.06)
        dx = {'left': 0.04 - 0.08 * e, 'right': -0.04 + 0.08 * e}.get(o.move, 0.0)
        cw, ch = W * 2 / z, H * 2 / z; cx = W + dx * W * 2; cy = H
        fr = im.transform((W, H), Image.EXTENT, (cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2), Image.BICUBIC)
        arr = np.asarray(fr, np.float32)
        arr = arr * (1 + 0.012 * np.sin(i * 0.9) * np.sin(i * 0.37)) + grain * 2.0  # 정지 결(깜박이는 결은 용량이 커져 GitHub 100MB 넘음, 11/19)
        arr = np.clip(arr, 0, 255).astype(np.uint8); ff.stdin.write(arr.tobytes())
        if still is None and i >= int(0.4 * o.fps): still = arr
    ff.stdin.close(); ff.wait()
    Image.fromarray(still).save(os.path.splitext(o.out)[0] + '.jpg', quality=88)
    print('ok', o.out)

if __name__ == '__main__': main()
