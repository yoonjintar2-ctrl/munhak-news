"""유튜브 업로드(YouTube Data API v3, 맥 없이). usstock-news 에서 가져와 문학늬우스용으로 덧붙임(11/27).
깃허브 Actions 시크릿 3개: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN
(문학늬우스 채널 UCC6rvGkmmC-HgWYxdJ6KP-g 계정으로 youtube.upload + youtube.force-ssl 승인).
문학늬우스 전용: spec 의 "captions_srt"(본편 자막 srt 내용) → captions.insert, "playlists"(재생목록 이름 목록) → playlistItems.insert,
"categoryId"(기본 27 교육), "notify"(구독자 알림, 기본 true).

python3 scripts/video/upload.py <mp4> <thumb.jpg> <video.json> [--publish-at 2026-11-22T07:00:00+09:00]
- video.json 의 title/description/tags 사용. 이미 같은 제목으로 올린 기록(video/uploaded.json)이 있으면 건너뜀(중복 금지).
- AI 합성 음성 사용 → containsSyntheticMedia=true, 아동용 아님.
"""
import json, os, sys, time
import requests

TOK = 'https://oauth2.googleapis.com/token'
UP = 'https://www.googleapis.com/upload/youtube/v3/videos'
TH = 'https://www.googleapis.com/upload/youtube/v3/thumbnails/set'
CAP = 'https://www.googleapis.com/upload/youtube/v3/captions'
API = 'https://www.googleapis.com/youtube/v3'
LOG = os.path.join(os.path.dirname(__file__), '..', '..', 'video', 'uploaded.json')


def token():
    r = requests.post(TOK, data={'client_id': os.environ['YT_CLIENT_ID'], 'client_secret': os.environ['YT_CLIENT_SECRET'],
                                 'refresh_token': os.environ['YT_REFRESH_TOKEN'], 'grant_type': 'refresh_token'}, timeout=30)
    r.raise_for_status()
    return r.json()['access_token']


def caption(H, vid, srt, lang='ko', name='한국어'):
    meta = json.dumps({'snippet': {'videoId': vid, 'language': lang, 'name': name, 'isDraft': False}})
    b = 'mnewsBoundary7f3a'
    body = (f'--{b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n{meta}\r\n'
            f'--{b}\r\nContent-Type: application/octet-stream\r\n\r\n').encode() + srt.encode('utf-8') + f'\r\n--{b}--\r\n'.encode()
    r = requests.post(CAP + '?uploadType=multipart&part=snippet', headers={**H, 'Content-Type': f'multipart/related; boundary={b}'}, data=body, timeout=120)
    print('자막', r.status_code, '' if r.status_code == 200 else r.text[:300])
    return r.status_code == 200


def playlists(H, vid, names):
    r = requests.get(API + '/playlists', headers=H, params={'part': 'snippet', 'mine': 'true', 'maxResults': 50}, timeout=30)
    if r.status_code != 200:
        print('재생목록 목록 실패', r.status_code, r.text[:200]); return []
    have = {p['snippet']['title']: p['id'] for p in r.json().get('items', [])}
    done = []
    for n in names:
        pid = have.get(n) or next((i for t, i in have.items() if t.startswith(n)), None)
        if not pid:
            print('재생목록 없음:', n, '| 있는 것:', ' / '.join(have)); continue
        q = requests.post(API + '/playlistItems?part=snippet', headers={**H, 'Content-Type': 'application/json'},
                          json={'snippet': {'playlistId': pid, 'resourceId': {'kind': 'youtube#video', 'videoId': vid}}}, timeout=30)
        print('재생목록', n, q.status_code, '' if q.status_code == 200 else q.text[:200])
        if q.status_code == 200: done.append(n)
    return done


def main(mp4, thumb, spec, publish_at=None, key=None):
    V = json.load(open(spec, encoding='utf-8'))
    log = json.load(open(LOG, encoding='utf-8')) if os.path.exists(LOG) else []
    key = key or V.get('key') or V['date'] + ':' + V.get('kind', 'summary')
    if any(x.get('key') == key for x in log):
        print('이미 올림 — 건너뜀', key); return
    at = token(); H = {'Authorization': f'Bearer {at}'}
    status = {'privacyStatus': 'private' if publish_at else 'public', 'selfDeclaredMadeForKids': False, 'containsSyntheticMedia': True}
    if publish_at: status['publishAt'] = publish_at
    meta = {'snippet': {'title': V['title'][:100], 'description': V['description'][:4900], 'tags': (V.get('tags') if isinstance(V.get('tags'), list) else [])[:15],
                        'categoryId': str(V.get('categoryId', '27')), 'defaultLanguage': 'ko', 'defaultAudioLanguage': 'ko'}, 'status': status}
    size = os.path.getsize(mp4)
    nt = 'true' if V.get('notify', True) else 'false'
    r = requests.post(UP + f'?uploadType=resumable&part=snippet,status&notifySubscribers={nt}', headers={**H, 'Content-Type': 'application/json; charset=UTF-8',
                      'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': str(size)}, data=json.dumps(meta), timeout=60)
    r.raise_for_status(); loc = r.headers['Location']
    for k in range(5):
        try:
            with open(mp4, 'rb') as f:
                r = requests.put(loc, headers={**H, 'Content-Type': 'video/mp4'}, data=f, timeout=600)
            if r.status_code in (200, 201): break
        except requests.RequestException as e:
            print('재시도', e)
        time.sleep(10 * (k + 1))
    r.raise_for_status(); vid = r.json()['id']
    print('업로드', vid, V['title'])
    if thumb and os.path.exists(thumb):
        t = requests.post(TH + f'?videoId={vid}', headers={**H, 'Content-Type': 'image/jpeg'}, data=open(thumb, 'rb').read(), timeout=120)
        print('썸네일', t.status_code, t.text[:200] if t.status_code != 200 else '')
    extra = {}
    if V.get('captions_srt'):
        extra['captions'] = caption(H, vid, V['captions_srt'])
    if V.get('playlists'):
        extra['playlists'] = playlists(H, vid, V['playlists'])
    log.insert(0, {**extra, 'key': key, 'id': vid, 'title': V['title'], 'at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'publishAt': publish_at})
    json.dump(log[:400], open(LOG, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


def check():
    """업로드 없이 토큰 확인: 어느 채널인지·재생목록 이름을 video/yt_check.json 에 적는다(쿼터 2단위)."""
    H = {'Authorization': f'Bearer {token()}'}
    c = requests.get(API + '/channels', headers=H, params={'part': 'snippet', 'mine': 'true'}, timeout=30)
    p = requests.get(API + '/playlists', headers=H, params={'part': 'snippet', 'mine': 'true', 'maxResults': 50}, timeout=30)
    out = {'at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'channels_status': c.status_code,
           'channels': [{'id': x['id'], 'title': x['snippet']['title']} for x in c.json().get('items', [])] if c.ok else c.text[:300],
           'playlists_status': p.status_code, 'playlists': [x['snippet']['title'] for x in p.json().get('items', [])] if p.ok else p.text[:300]}
    print(json.dumps(out, ensure_ascii=False))
    json.dump(out, open(os.path.join(os.path.dirname(LOG), 'yt_check.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    if sys.argv[1:2] == ['--check']:
        check(); sys.exit(0)
    a = sys.argv[1:]; pa = None
    if '--publish-at' in a:
        i = a.index('--publish-at'); pa = a[i + 1]; del a[i:i + 2]
    k = None
    if '--key' in a:
        i = a.index('--key'); k = a[i + 1]; del a[i:i + 2]
    main(*a, publish_at=pa, key=k)
