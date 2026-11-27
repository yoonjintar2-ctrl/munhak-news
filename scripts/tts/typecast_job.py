"""타입캐스트 API로 TTS 작업 파일(tts/typecast/*.json, 예전 맥 qtts 형식 그대로)을 음성으로 만든다. 맥 필요 없음.

python3 scripts/tts/typecast_job.py voices                 → tts/typecast_voices.json (목소리 목록)
python3 scripts/tts/typecast_job.py run <job.json> [...]   → out/<name>/<id>.wav + out/<name>.zip

환경 변수: TYPECAST_API_KEY(깃허브 시크릿), TC_VOICE_NAME(목소리 이름 — 문학늬우스는 저장소 Variables 의 TC_VOICE_NAME, 발행인이 샘플 듣고 고름),
TC_VOICE(목소리 id 직접 지정), TC_MODEL(기본 ssfm-v31, 없으면 v30)
(usstock-news 에서 가져옴 2026-11-27)
작업 파일의 "tc" 칸으로 목소리·감정·속도를 바꿀 수 있다: {"voice": "...", "emotion": "normal", "tempo": 1.0}
"""
import json, os, re, sys, time, zipfile
import requests

API = 'https://api.typecast.ai'
H = {'X-API-KEY': os.environ.get('TYPECAST_API_KEY', '')}
ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
VOICES = os.path.join(ROOT, 'tts', 'typecast_voices.json')
NAME = os.environ.get('TC_VOICE_NAME', '')


def voices():
    for ver in ('v3', 'v2', 'v1'):
        r = requests.get(API + f'/{ver}/voices', headers=H, timeout=60)
        print(ver, r.status_code)
        if r.status_code == 200: break
    r.raise_for_status()
    data = r.json()
    if isinstance(data, dict):
        data = data.get('voices') or data.get('result') or data.get('data') or data
    json.dump(data, open(VOICES, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    hits = [v for v in data if NAME in json.dumps(v, ensure_ascii=False)]
    print(f'목소리 {len(data)}개, "{NAME}" 일치 {len(hits)}개')
    for v in hits[:5]:
        print(json.dumps(v, ensure_ascii=False)[:400])
    return data


def pick_voice():
    if os.environ.get('TC_VOICE'):
        return os.environ['TC_VOICE'], None
    data = json.load(open(VOICES, encoding='utf-8')) if os.path.exists(VOICES) else voices()
    for v in data:
        nm = v.get('voice_name') or v.get('name') or ''
        if isinstance(nm, dict): nm = nm.get('kor') or nm.get('eng') or ''
        if nm == NAME or nm.startswith(NAME):
            models = [m.get('version') or m.get('name') or m for m in v.get('models', [])] if isinstance(v.get('models'), list) else []
            return v.get('voice_id') or v.get('id'), models
    if not NAME: sys.exit('TC_VOICE_NAME 이 비어 있음 — 저장소 Settings → Variables 에 목소리 이름을 넣거나 작업 파일 tc.voice 에 id')
    sys.exit(f'목소리 "{NAME}"를 찾지 못함 — tts/typecast_voices.json 확인')


def clean(t):
    t = re.sub(r'\s*,\s*$', '', t.strip())   # 예전 맥 TTS용 ' ,' 꼬리 제거
    return t


def tts(text, vid, model, emo='normal', tempo=1.0, fmt='wav'):
    body = {'voice_id': vid, 'text': text, 'model': model, 'language': 'kor',
            'prompt': {'emotion_preset': emo, 'emotion_intensity': 1.0},
            'output': {'volume': 100, 'audio_pitch': 0, 'audio_tempo': tempo, 'audio_format': fmt}}
    for k in range(5):
        r = requests.post(API + '/v1/text-to-speech', headers={**H, 'Content-Type': 'application/json'}, json=body, timeout=120)
        if r.status_code == 200 and len(r.content) > 2000:
            return r.content
        if r.status_code in (400, 401, 402, 403):
            sys.exit(f'타입캐스트 오류 {r.status_code}: {r.text[:300]}')
        time.sleep(3 * (k + 1))
    sys.exit(f'타입캐스트 실패 {r.status_code}: {r.text[:300]}')


def run(job):
    J = json.load(open(job, encoding='utf-8'))
    name = J['name']; tc = J.get('tc', {})
    if tc.get('voice'):
        vid = tc['voice']; models = []
        for v in (json.load(open(VOICES, encoding='utf-8')) if os.path.exists(VOICES) else []):
            if v.get('voice_id') == vid: models = [m.get('version') for m in v.get('models', [])]
    else:
        vid, models = pick_voice()
    model = os.environ.get('TC_MODEL') or tc.get('model') or ('ssfm-v31' if 'ssfm-v31' in (models or []) else 'ssfm-v30')
    od = os.path.join(ROOT, 'out', name); os.makedirs(od, exist_ok=True)
    chars = 0
    for it in J['items']:
        t = clean(it['text']); chars += len(t)
        p = os.path.join(od, it['id'] + '.wav')
        if not os.path.exists(p):
            open(p, 'wb').write(tts(t, vid, model, tc.get('emotion', 'normal'), tc.get('tempo', 1.0)))
        print(f'{name}/{it["id"]} ok', flush=True)
    open(os.path.join(od, 'DONE'), 'w').write(time.strftime('%H:%M:%S'))
    zp = os.path.join(ROOT, 'out', name + '.zip')
    with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
        for f in sorted(os.listdir(od)):
            if f.endswith('.wav'): z.write(os.path.join(od, f), f)
    print(f'완료 {name}: {len(J["items"])}줄, {chars}자, 목소리 {vid}, 모델 {model}')


if __name__ == '__main__':
    if sys.argv[1] == 'voices':
        voices()
    else:
        for j in sys.argv[2:]:
            run(j)
