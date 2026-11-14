"""문학늬우스 '1분 문학' 쇼츠 조립기 (세로 1080×1920, 30fps, 길이는 내용에 맞게 — '1분'은 컨셉, 쇼츠 한도 3분)

  python3 make_short.py <script.json> <코너: classic|modern> <qtts 흉내 폴더> <저장소 루트> <출력.mp4>

구성 (발행인 11/14):
  · 처음(intro)·끝(outro): 연필이(마스코트)가 단색 그라데이션 무대에서 말함 → 흰 말풍선 자막(위쪽)
  · 본문(body): 그 작품의 3초 삽화 영상을 배경(흐리게 꽉 채움)+가운데 액자로 반복, 자막은 액자 아래
  · 자막은 나레이션에 맞춰 짧은 마디로 '딱딱딱' 넘어감(문장 안 쉼 구간에 맞춰 마디 시각을 정함)
  · 쇼츠 UI 데드존 피함: 위 0~170, 아래 1500~, 오른쪽 940~(버튼 열) 에는 글자를 두지 않음
  · 나레이션: qtts 작업대기기(마스코트 목소리 복제) 테이크 중 tts_post 규칙으로 고른 것, 차분한 톤(배속 1.0)
  · 배경음악: bgm/munhak-bgm-a.mp3 (직접 합성, 밝고 잔잔한 곡) 낮게
"""
import json, os, re, subprocess, sys, glob
import numpy as np, soundfile as sf
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
W, H, FPS = 1080, 1920, 30
FONTS = os.path.join(HERE, 'fonts')
FONT_B = os.path.join(FONTS, 'Pretendard-ExtraBold.otf')
FONT_M = os.path.join(FONTS, 'Pretendard-SemiBold.otf')


def ensure_fonts():
    """Pretendard(OFL)는 저장소에 두지 않고 npm 에서 받아 온다."""
    if os.path.exists(FONT_B) and os.path.exists(FONT_M): return
    import tempfile, shutil
    os.makedirs(FONTS, exist_ok=True); tmp = tempfile.mkdtemp()
    subprocess.run(['npm', 'pack', 'pretendard@1.3.9'], cwd=tmp, check=True, capture_output=True)
    subprocess.run('tar xzf pretendard-*.tgz', shell=True, cwd=tmp, check=True)
    for n in ('ExtraBold', 'SemiBold'): shutil.copy(os.path.join(tmp, 'package/dist/public/static', f'Pretendard-{n}.otf'), FONTS)
SAFE_L, SAFE_R = 90, 930           # 글자 가로 범위(오른쪽 버튼 열 피함)
CX = (SAFE_L + SAFE_R) // 2
LABEL = {'classic': '1분 고전', 'modern': '1분 현대문학'}


def font(p, s): return ImageFont.truetype(p, s)


# ---------- 나레이션: 테이크 고르기(tts_post 와 같은 규칙) ----------
def build_audio(qdir, name, sc_lines, repo):
    sys.path.insert(0, os.path.join(repo, 'scripts', 'tts'))
    import tts_post as T
    from resemblyzer import VoiceEncoder, preprocess_wav
    enc = VoiceEncoder(); ref = enc.embed_utterance(preprocess_wav(os.path.join(qdir, 'out/casual1/E_think.wav')))
    info = {}
    for p in glob.glob(os.path.join(qdir, 'out', name, '*.wav')):
        w = T.trim_tail(T.load(p)); pw = preprocess_wav(w, source_sr=T.SR)
        full = float(np.dot(enc.embed_utterance(pw), ref)); win = []
        for st in range(0, max(1, len(pw) - 24000), 8000):
            c = pw[st:st + 24000]
            if len(c) > 8000: win.append(float(np.dot(enc.embed_utterance(c), ref)))
        info[os.path.basename(p)[:-4]] = dict(w=w, full=full, low=min(win) if win else full, f0=T.f0_med(w), dur=len(w) / T.SR)
    allf0 = np.nanmedian([v['f0'] for v in info.values()])
    out = []
    for key, text in sc_lines:
        ps = [k for k in info if k.rsplit('_t', 1)[0] == key]
        if not ps: raise SystemExit(f'테이크 없음: {key}')
        dmed = np.median([info[p]['dur'] for p in ps])
        ok = [p for p in ps if info[p]['dur'] < 1.6 * dmed and not (abs(12 * np.log2(info[p]['f0'] / allf0)) > 1.5 if info[p]['f0'] == info[p]['f0'] else False) and info[p]['low'] > info[p]['full'] - 0.12]
        best = max(ok or ps, key=lambda p: (info[p]['full'] + info[p]['low']) / 2 - (0.03 * max(0.0, 12 * np.log2(info[p]['f0'] / T.CALM_F0)) if info[p]['f0'] == info[p]['f0'] else 0))
        w = T.squeeze(info[best]['w'], text)
        out.append((w, T.segs(w)))
    return out, T.SR


# ---------- 자막 마디 나누기 ----------
def chunks(line, maxlen=13):
    """화면용 원문(숫자 그대로)을 마디로. 대본에 ' / ' 로 끊을 곳을 적어 두면 그대로 따르고(권장), 없으면 쉼표·마침표·길이로 자동."""
    if '/' in line: return [c.strip() for c in line.split('/') if c.strip()]
    parts = [p.strip() for p in re.split(r'(?<=[,.?!])\s+', line) if p.strip()]
    res = []
    for p in parts:
        words = p.split(); cur = []
        for w_ in words:
            if cur and len(' '.join(cur + [w_])) > maxlen:
                carry = []
                while len(cur) > 1 and len(re.sub(r'[^가-힣A-Za-z0-9]', '', cur[-1])) <= 1: carry.insert(0, cur.pop())   # '허 생원'처럼 한 글자 낱말이 마디 끝에 홀로 남지 않게
                res.append(' '.join(cur)); cur = carry + [w_]
            else:
                cur.append(w_)
        if cur: res.append(' '.join(cur))
    # 너무 짧은 꼬리(2자 이하)는 앞 마디에 붙임
    fixed = []
    for c in res:
        if fixed and len(re.sub(r'[^가-힣A-Za-z0-9]', '', c)) <= 2 and len(fixed[-1]) + len(c) <= maxlen + 3: fixed[-1] += ' ' + c
        else: fixed.append(c)
    return fixed


def syl(s, ko):
    return max(1, len(re.sub(r'[^가-힣]', '', ko(s))))


def chunk_times(chs, segs, sr, ko):
    """마디별 음절 수 비율을 문장 안 '소리 나는 구간'에 나눠 얹어 시작 시각을 구한다."""
    vs = [(a / sr, b / sr) for a, b in segs]; tot = sum(b - a for a, b in vs) or 1e-6
    ws = np.array([syl(c, ko) for c in chs], float); cum = np.concatenate([[0], np.cumsum(ws)]) / ws.sum()

    def at(frac):                                   # 누적 '말한 시간' 비율 → 실제 시각
        target = frac * tot; acc = 0
        for a, b in vs:
            if acc + (b - a) >= target: return a + (target - acc)
            acc += b - a
        return vs[-1][1]
    st = [at(f) for f in cum[:-1]]
    # 쉼 구간 안에 시작이 걸리면 다음 소리 시작으로 당김(마디가 말보다 늦게 뜨지 않게, 살짝 먼저)
    st2 = []
    for t in st:
        for a, b in vs:
            if t < a: t = a; break
            if a <= t <= b: break
        st2.append(max(0, t - 0.06))
    return st2


# ---------- 그리기 도우미 ----------
def text_img(txt, f, fill, stroke=0, stroke_fill=(0, 0, 0)):
    bb = f.getbbox(txt, stroke_width=stroke); w, h = bb[2] - bb[0], bb[3] - bb[1]
    im = Image.new('RGBA', (w + 4, h + 4), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((2 - bb[0], 2 - bb[1]), txt, font=f, fill=fill, stroke_width=stroke, stroke_fill=stroke_fill)
    return im


def bubble(txt):
    """흰 말풍선(색 없음), 글자 가로·세로 정중앙, 덜 꽉 차게."""
    size = 66
    while True:                                            # 긴 마디는 글자를 줄여 안전 영역 안에
        f = font(FONT_B, size); t = text_img(txt, f, (25, 25, 25))
        if t.width + 2 * 56 <= SAFE_R - SAFE_L or size <= 44: break
        size -= 3
    pw, ph = 70 if t.width + 140 <= SAFE_R - SAFE_L else 56, 44; bw = min(SAFE_R - SAFE_L, t.width + pw * 2); bh = t.height + ph * 2
    im = Image.new('RGBA', (bw + 20, bh + 50), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    sh = Image.new('RGBA', im.size, (0, 0, 0, 0)); ImageDraw.Draw(sh).rounded_rectangle((10, 16, bw + 10, bh + 16), 46, fill=(90, 60, 20, 60))
    im = Image.alpha_composite(im, sh.filter(ImageFilter.GaussianBlur(10))); d = ImageDraw.Draw(im)
    d.rounded_rectangle((10, 6, bw + 10, bh + 6), 46, fill=(255, 255, 255, 255))
    tx = bw // 2 + 10; d.polygon([(tx - 26, bh + 4), (tx + 26, bh + 4), (tx, bh + 40)], fill=(255, 255, 255, 255))
    im.alpha_composite(t, (10 + (bw - t.width) // 2, 6 + (bh - t.height) // 2))
    return im


def subtitle(txt):
    size = 76
    while True:                                            # 긴 마디는 글자를 줄여 안전 영역(가로 840) 안에
        im = text_img(txt, font(FONT_B, size), (255, 255, 255), stroke=max(6, size // 8), stroke_fill=(18, 18, 18))
        if im.width <= SAFE_R - SAFE_L or size <= 48: return im
        size -= 4


def header(kind, title, writer):
    f1 = font(FONT_B, 40); f2 = font(FONT_M, 40)
    a = text_img(LABEL[kind], f1, (255, 255, 255)); b = text_img(f'{title} · {writer}', f2, (30, 30, 30))
    h = max(a.height, b.height) + 34; w = a.width + b.width + 34 * 2 + 30
    im = Image.new('RGBA', (w, h), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, w - 1, h - 1), h // 2, fill=(255, 255, 255, 235))
    d.rounded_rectangle((0, 0, a.width + 34 * 2 - 6, h - 1), h // 2, fill=(178, 34, 34, 255))
    im.alpha_composite(a, (34 - 3, (h - a.height) // 2)); im.alpha_composite(b, (a.width + 34 * 2 + 12, (h - b.height) // 2))
    return im


def frames_of(mp4, w=None, h=None):
    """영상을 RGB 프레임 목록으로(3초 반복용)."""
    cmd = ['ffmpeg', '-v', 'error', '-i', mp4]
    if w: cmd += ['-vf', f'scale={w}:{h}']
    cmd += ['-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    if not w:
        pr = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', mp4], capture_output=True, text=True).stdout.strip().split(',')
        w, h = int(pr[0]), int(pr[1])
    n = len(raw) // (w * h * 3)
    return [Image.frombuffer('RGB', (w, h), raw[i * w * h * 3:(i + 1) * w * h * 3]) for i in range(n)]


def frame_files(mp4):
    """큰 마스코트 영상은 메모리 대신 jpg 프레임 파일로 풀어 두고 그때그때 연다."""
    d = os.path.join('/tmp', 'mascot_frames', os.path.splitext(os.path.basename(mp4))[0])
    if not os.path.isdir(d) or not os.listdir(d):
        os.makedirs(d, exist_ok=True); subprocess.run(['ffmpeg', '-v', 'error', '-i', mp4, '-q:v', '2', os.path.join(d, '%03d.jpg')], check=True)
    return sorted(glob.glob(os.path.join(d, '*.jpg')))


def dry_audio(keys, sr=24000):
    """시험용: 진짜 나레이션 대신 음절 수만큼의 '소리 구간'(작은 잡음)을 만든다(화면·자막 박자 점검용)."""
    out = []
    for key, ko in keys:
        parts = [p for p in re.split(r'[,.?!]\s*', ko) if p.strip()]; w = []; segs = []; pos = 0
        for p in parts:
            n = int(sr * len(re.sub(r'[^가-힣]', '', p)) / 6.8); w += [np.zeros(n, np.float32), np.zeros(int(sr * 0.3), np.float32)]
            segs.append([pos, pos + n]); pos += n + int(sr * 0.3)
        out.append((np.concatenate(w), segs))
    return out, sr


def main(script, kind, qdir, repo, out):
    ensure_fonts()
    sys.path.insert(0, os.path.join(repo, 'scripts', 'tts')); import tts_jobs as J
    S = json.load(open(script, encoding='utf-8')); C = S[kind]; D = S['date']
    lines = [('intro', l) for l in C['intro']] + [('body', l) for l in C['body']] + [('outro', l) for l in C['outro']]
    keys = [(f'{kind}_{i:02d}', J.ko(l.replace(' / ', ' '))) for i, (_, l) in enumerate(lines)]
    if S.get('opener'):          # 11/14 발행인: 맨 처음에 컨셉 소개("1분 만에 떠먹여 주는, 1분 문학!") — 두 편 공통, 나레이션 id open_00
        lines = [('intro', S['opener'])] + lines; keys = [('open_00', J.ko(S['opener'].replace(' / ', ' ')))] + keys
    clips, sr = dry_audio(keys) if os.environ.get('DRY') else build_audio(qdir, S.get('tts_name') or f'shorts-{D}', keys, repo)
    # 타임라인
    t = 0.35; items = []; audio = [np.zeros(int(sr * 0.35), np.float32)]
    for i, ((sec, line), (w, segs)) in enumerate(zip(lines, clips)):
        chs = chunks(line); st = chunk_times(chs, segs, sr, J.ko); d = len(w) / sr
        nxt = lines[i + 1][0] if i + 1 < len(lines) else None
        gap = 0.55 if nxt == sec else (0.8 if nxt else 0.9)
        for j, c in enumerate(chs):
            a = t + st[j]; b = t + (st[j + 1] if j + 1 < len(chs) else d + gap * 0.6)
            items.append(dict(sec=sec, txt=c, a=a, b=b))
        items_sec = (sec, t, t + d + gap)
        audio += [w.astype(np.float32), np.zeros(int(sr * gap), np.float32)]
        lines[i] = (sec, line, t, t + d + gap); t += d + gap
    total = t + 0.4; audio.append(np.zeros(int(sr * 0.4), np.float32))
    if total > 59.5: print(f'⚠️ {total:.1f}초 — 60초 넘음');
    narr = os.path.splitext(out)[0] + '.narr.wav'; sf.write(narr, np.concatenate(audio), sr)
    # 구간: intro → body → outro (마스코트 동작: intro=hello, outro 첫 문장=think, 마지막=bow)
    segs_t = {}
    for sec, line, a, b in lines: segs_t.setdefault(sec, [a, b]); segs_t[sec][1] = b
    segs_t['intro'][0] = 0; segs_t['outro'][1] = total
    outro_lines = [l for l in lines if l[0] == 'outro']
    masc = {k: frame_files(os.path.join(repo, 'img', 'mascot', 'shorts', f'{k}.mp4')) for k in ('hello', 'think', 'bow')}
    # 11/14 장면 삽화: 본문 문장 번호(from)부터 그 장면 영상으로 — scenes 가 없으면 대표 영상 하나
    SCN = sorted(C.get('scenes') or [{'from': 0, 'video': C['video']}], key=lambda x: x['from'])
    body_rng = []; bi = 0
    for sec, line, a, b in lines:
        if sec == 'body': body_rng.append((a, b, bi)); bi += 1
    FW = 830; FH = int(FW * 640 / 960); FX, FY = SAFE_L, 400       # 오른쪽 버튼 열(940~) 피함
    cur_vid = {'path': None}

    def scene_frames(path):
        if cur_vid['path'] != path:                                  # 지금 장면만 메모리에(배경은 작게 흐려 두고 그릴 때 키움)
            ill = frames_of(os.path.join(repo, path))
            sw = int(ill[0].width * 640 / ill[0].height)
            bg = [Image.blend(im.resize((sw, 640), Image.BICUBIC).crop(((sw - 360) // 2, 0, (sw - 360) // 2 + 360, 640)).filter(ImageFilter.GaussianBlur(9)), Image.new('RGB', (360, 640), (40, 40, 40)), 0.35) for im in ill]
            fg = [im.resize((FW, FH), Image.LANCZOS) for im in ill]
            cur_vid.update(path=path, bg=bg, fg=fg)
        return cur_vid['bg'], cur_vid['fg']

    def scene_at(tt):
        b_i = 0
        for a, b, i in body_rng:
            if tt >= a: b_i = i
        v = SCN[0]['video']
        for sc in SCN:
            if sc['from'] <= b_i: v = sc['video']
        return v
    hdr = header(kind, C['title'], C['writer'])
    cache = {}
    ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                           '-i', narr, '-stream_loop', '-1', '-i', os.path.join(HERE, 'bgm', 'munhak-bgm-a.mp3'),
                           '-filter_complex', ('[1:a]aresample=44100,volume=1.0[n];[2:a]volume=0.13,afade=t=out:st=%.2f:d=1.2[m];[n][m]amix=inputs=2:duration=first:normalize=0' + ('' if os.environ.get('DRY') else ',loudnorm=I=-15:TP=-1.5') + '[a]') % (total - 1.3),
                           '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
    nf = int(total * FPS)
    for fi in range(nf):
        tt = fi / FPS
        sec = 'intro' if tt < segs_t['intro'][1] else ('body' if tt < segs_t['body'][1] else 'outro')
        if sec == 'body':
            bgs, fgs = scene_frames(scene_at(tt)); k = fi % len(fgs); fr = bgs[k].resize((W, H), Image.BILINEAR)
            frame_box = Image.new('RGB', (FW + 12, FH + 12), (20, 20, 20)); frame_box.paste(fgs[k], (6, 6)); fr.paste(frame_box, (FX - 6, FY - 6))
        else:
            if sec == 'intro': mv = 'hello'
            else: mv = 'think' if tt < outro_lines[-1][2] else 'bow'
            fs = masc[mv]; fr = Image.open(fs[fi % len(fs)]).convert('RGB')
        fr = fr.convert('RGBA')
        fr.alpha_composite(hdr, ((W - hdr.width) // 2 - 20, 190))
        cur = [it for it in items if it['a'] <= tt < it['b']]
        if cur:
            it = cur[-1]; key = (it['sec'] == 'body', it['txt'])
            if key not in cache: cache[key] = subtitle(it['txt']) if key[0] else bubble(it['txt'])
            im = cache[key]; age = tt - it['a']; sc = 0.9 + 0.1 * min(1, age / 0.12)       # 짧게 톡 튀어나옴
            if sc < 1: im = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))), Image.BICUBIC)
            if key[0]: x, y = CX - im.width // 2, 1215 - im.height // 2
            else: x, y = CX - im.width // 2, 300 + int((1 - sc) * 60)
            fr.alpha_composite(im, (x, y))
        ff.stdin.write(fr.convert('RGB').tobytes())
    ff.stdin.close(); ff.wait()
    json.dump(dict(total=total, items=items), open(os.path.splitext(out)[0] + '.timeline.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('ok', out, f'{total:.1f}초', len(items), '마디')


if __name__ == '__main__':
    main(*sys.argv[1:6])
