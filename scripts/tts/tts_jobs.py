"""문학늬우스 '듣기' 대본 → 맥 qtts 작업대기기(Qwen3-TTS 목소리 복제) 작업 파일.

  python3 tts_jobs.py <today.json 경로> [출력 폴더(기본: ~/Downloads/qtts/jobs)] [테이크 수(기본 2)]
문장마다 끝에 " 음." 꼬리, 숫자·영어는 한글로. 결과: <출력>/mnews-<날짜>.json, 같은 폴더에 mnews-<날짜>.script.json(코너별 문장 순서)
"""
import json, os, re, sys

REF = {"ref_audio": "out/casual1/E_think.wav", "ref_text": "음… 그럼 데이터센터는 이제 못 짓는 건가?"}
DIG = "영일이삼사오육칠팔구"
EN = dict(zip("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "에이 비 씨 디 이 에프 지 에이치 아이 제이 케이 엘 엠 엔 오 피 큐 알 에스 티 유 브이 더블유 엑스 와이 지".split()))


def sino(n):
    n = int(n)
    if n == 0: return "영"
    out = ""
    for unit, name in ((10**8, "억"), (10**4, "만")):
        if n >= unit:
            out += sino(n // unit) + name + " "; n %= unit
    for unit, name in ((1000, "천"), (100, "백"), (10, "십")):
        if n >= unit:
            d = n // unit; out += ("" if d == 1 else DIG[d]) + name; n %= unit
    if n: out += DIG[n]
    return out.strip()


def ko(t):
    t = re.sub(r"\([^)]*[A-Za-z][^)]*\)", "", t or "")          # (Le Petit Prince, 1943) 같은 원어 괄호 생략
    t = re.sub(r"[「」『』《》〈〉“”\"'‘’]", "", t)
    t = re.sub(r"(\d+(?:\.\d+)?)\s*%", lambda m: m.group(1) + " 퍼센트", t)
    t = re.sub(r"\d+\.\d+", lambda m: sino(m.group(0).split(".")[0]) + " 점 " + "".join(DIG[int(c)] for c in m.group(0).split(".")[1]), t)
    t = re.sub(r"\d+", lambda m: sino(m.group(0)) + (" " if t[m.end():m.end() + 1] in "년월일분번호회살명개권편" and t[m.end():m.end() + 1] else ""), t)
    t = re.sub(r"\b[A-Z]{2,5}\b", lambda m: "".join(EN[c] for c in m.group(0)), t)
    t = t.replace("·", ", ").replace("—", ", ").replace("…", "… ")
    return re.sub(r"\s+", " ", t).strip()


def sentences(par):
    par = ko(par)
    parts = re.split(r"(?<=[.?!…])\s+", par)
    out = []
    for p in parts:
        p = p.strip()
        if not p: continue
        if not re.search(r"[.?!…]$", p): p += "."
        out.append(p)
    return out


def script(D):
    T = {}
    S = D.get("sentence")
    if S:
        big = " ".join(S["big"]) if isinstance(S.get("big"), list) else S.get("text", "")
        T["sentence"] = [f"오늘의 문장, {S['writer']}의 {S['work']}.", big, "이 문장이 품은 뜻.", S.get("meaning"), "누가, 어느 장면에서.", S.get("context"), "작가가 노린 것.", S.get("craft")]
    P = D.get("poem")
    if P:
        L = P.get("lines") if (P.get("public_domain") or P.get("permission")) else []
        T["poem"] = [f"오늘의 시, {P['writer']}의 {P['title']}."] + [l for l in (L or []) if l.strip()] + ["읽기.", P.get("analysis")]
    N = D.get("novel")
    if N:
        T["novel"] = [f"오늘의 소설 구절, {N['writer']}의 {N['title']}.", N.get("quote"), "앞뒤 맥락.", N.get("context"), "문체와 인물.", N.get("analysis")]
    W = D.get("writer")
    if W:
        T["writer"] = [f"오늘의 문인, {W['name']}.", W.get("bio")]
    Y = D.get("onthisday")
    if Y:
        yr = int(D["date"][:4])
        T["day"] = ["그날의 문학."] + sum(([f"{yr - int(y['year'])}년 전 오늘.", y["title"] + ".", y["body"]] for y in Y), [])
    for k, lab in (("classic", "일분 고전"), ("modern", "일분 현대문학")):
        C = D.get(k)
        if C:
            T[k] = [f"{lab}, {C['writer']}의 {C['title']}.", C.get("oneline")] + list(C.get("story") or [])
    return {k: sum((sentences(x) for x in v if x), []) for k, v in T.items()}


def main(src, outdir=os.path.expanduser("~/Downloads/qtts/jobs"), takes=2):
    D = json.load(open(src, encoding="utf-8"))
    sc = script(D)
    name = f"mnews-{D['date']}"
    items = []
    for sec, ss in sc.items():
        for i, s in enumerate(ss):
            for k in range(int(takes)):
                items.append({"id": f"{sec}_{i:02d}_t{k}", "text": s + " 음.", "gen": {"non_streaming_mode": True}})
    job = {"name": name, "mode": "clone", **REF, "gen": {"temperature": 0.75, "top_p": 0.9}, "reload_every": 4, "retries": 4, "items": items}
    os.makedirs(outdir, exist_ok=True)
    json.dump(job, open(os.path.join(outdir, name + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump(sc, open(os.path.join(outdir, name + ".script.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{name}: 코너 {len(sc)}개, 문장 {sum(map(len, sc.values()))}개, 테이크 {len(items)}개 (약 {len(items) * 50 // 60}분)")


if __name__ == "__main__":
    main(*sys.argv[1:])
