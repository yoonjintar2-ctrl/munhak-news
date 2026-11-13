"""전날 밤 써 둔 drafts/<날짜>.json 을 아침에 발행한다.

  python3 scripts/publish_draft.py <날짜>
- drafts/<날짜>.json → today.json, archive/<날짜>.json
- audio/<날짜>-<코너>.mp3 가 있으면 audio 칸을 채움(새벽에 맥이 만든 '듣기' 음성)
- archive/index.json 맨 앞에 추가, img/og.jpg 를 오늘 문장 포스터로
- '듣기'는 최근 3개 호만: 그보다 오래된 호의 mp3 를 지우고 archive 의 audio 칸을 뺌
"""
import glob, json, os, shutil, sys

KEEP = 3


def load(p):
    return json.load(open(p, encoding="utf-8"))


def save(p, D):
    json.dump(D, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


def attach_audio(D):
    au = {}
    for p in sorted(glob.glob(f"audio/{D['date']}-*.mp3")):
        au[os.path.basename(p)[len(D["date"]) + 1:-4]] = p
    if au:
        D["audio"] = au
    else:
        D.pop("audio", None)
    return D


def prune_audio():
    idx = load("archive/index.json")
    keep = {x["date"] for x in idx[:KEEP]}
    for p in glob.glob("audio/*.mp3"):
        if os.path.basename(p)[:10] not in keep:
            os.remove(p)
    for x in idx[KEEP:]:
        fp = f"archive/{x['date']}.json"
        if os.path.exists(fp):
            D = load(fp)
            if D.pop("audio", None) is not None:
                save(fp, D)


def main(date):
    src = f"drafts/{date}.json"
    if not os.path.exists(src):
        sys.exit(f"초안 없음: {src}")
    D = attach_audio(load(src))
    save("today.json", D)
    save(f"archive/{date}.json", D)
    idx = [x for x in load("archive/index.json") if x["date"] != date]
    S = D.get("sentence") or {}
    idx.insert(0, {"date": date, "no": D["no"], "sentence": (S.get("text") or "")[:40], "writer": S.get("writer", "")})
    save("archive/index.json", idx)
    post = (S.get("img") or "")
    if post and os.path.exists(post):
        shutil.copy(post, "img/og.jpg")
    prune_audio()
    print(f"발행: 제{D['no']}호 {date}, 듣기 {len(D.get('audio', {}))}개")


def audio_only(date):
    """발행 뒤 늦게 도착한 음성만 붙일 때: python3 scripts/publish_draft.py --audio <날짜>"""
    for fp in ("today.json", f"archive/{date}.json"):
        if os.path.exists(fp):
            D = load(fp)
            if D.get("date") == date:
                save(fp, attach_audio(D))
    prune_audio()


if __name__ == "__main__":
    if sys.argv[1] == "--audio":
        audio_only(sys.argv[2])
    else:
        main(sys.argv[1])
