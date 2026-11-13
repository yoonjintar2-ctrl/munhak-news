"""코너별 공유 페이지(카톡·슬랙 미리보기용)를 만든다.

archive/<날짜>.json 마다 6개 코너(sentence, poem, novel, writer, puzzle, trivia)에 대해
  s/<날짜>-<코너>.html  : 그 코너 전용 og:title / og:description / og:image, 사람은 ../?d=<날짜>#<코너> 로 이동
  s/<날짜>-<코너>.jpg   : 1200x630 미리보기 카드(신문 지면 결)
내용이 바뀐 코너만 다시 만든다(share-sig 비교).  사용: python3 scripts/make_share.py [날짜 ...]
"""
import hashlib, html, json, os, re, sys, glob

SITE = "https://mnews.jintar.co.kr/"
OUT = "s"
SECS = ["sentence", "poem", "novel", "writer", "puzzle", "trivia", "classic", "rx", "day", "modern"]
NAME = {"sentence": "오늘의 문장", "poem": "오늘의 시", "novel": "오늘의 소설 구절", "writer": "오늘의 문인", "puzzle": "낱말 퍼즐", "trivia": "문학 상식 OX", "classic": "1분 고전", "rx": "기분 처방전", "day": "그날의 문학", "modern": "1분 현대문학"}


def esc(x):
    return html.escape(str(x or ""), quote=True)


def clip(t, n):
    t = re.sub(r"\s+", " ", str(t or "")).strip()
    return t if len(t) <= n else t[: n - 1].rstrip() + "…"


def kdate(d):
    y, m, dd = d.split("-")
    return f"{y}. {int(m)}. {int(dd)}."


def content(D, sec):
    """(og 제목, og 설명, 카드 머리글, 카드 본문, 카드 그림 경로 또는 None, 카드 꼬리)"""
    if sec == "sentence":
        S = D["sentence"]
        return (f"“{clip(S['text'], 60)}” — {S['writer']} 「{S['work']}」", clip(S["meaning"], 110),
                "“" + "<br>".join(esc(b) for b in (S.get("big") or [S["text"]])) + "”", esc(clip(S["meaning"], 90)), S.get("img"), f"{esc(S['writer'])} 「{esc(S['work'])}」 {S['year']}")
    if sec == "poem":
        P = D["poem"]
        first = (P.get("lines") or [""])[0] if ((P.get("public_domain") or P.get("permission")) and P.get("lines")) else (P.get("book") or "")
        return (f"오늘의 시 · {P['writer']} 「{P['title']}」", clip(first + " " + P.get("analysis", ""), 110),
                f"「{esc(P['title'])}」", esc(clip(first, 70)), P.get("img"), f"{esc(P['writer'])} · {P['year']}")
    if sec == "novel":
        N = D["novel"]
        return (f"오늘의 소설 구절 · {N['writer']} 『{N['title']}』", clip("“" + N["quote"] + "” " + N.get("context", ""), 110),
                "“" + esc(clip(N["quote"], 60)) + "”", esc(clip(N.get("quote_orig") or N.get("context"), 90)), N.get("img"), f"{esc(N['writer'])} 『{esc(N['title'])}』 {N['year']}")
    if sec == "writer":
        W = D["writer"]
        return (f"오늘의 문인 · {W['name']} ({W.get('life','')})", clip(W["bio"], 110),
                esc(W["name"]) + (f"<small>{esc(W.get('hanja',''))}</small>" if W.get("hanja") else ""), esc(clip(W["bio"], 95)), W.get("img"), "대표작 · " + esc(", ".join(W.get("works", [])[:3])))
    if sec == "puzzle":
        Z = D["puzzle"]["words"]
        ac = sorted([w for w in Z if w["dir"] == "across"], key=lambda w: w["n"])[:3]
        return (f"낱말 퍼즐 · {len(Z)}문제 — 오늘의 작품과 문학 용어", " / ".join(f"{w['n']}. {w['clue']}" for w in ac)[:110],
                "오늘의 낱말 퍼즐", esc(f"가로 {ac[0]['n']}. {ac[0]['clue']} ({len(ac[0]['a'])}글자)") if ac else "", None, f"{len(Z)}문제 · 한 칸에 한 음절")
    if sec == "trivia":
        T = D.get("trivia") or []
        return (f"문학 상식 OX · {clip(T[0]['q'], 40)}" if T else "문학 상식", " / ".join("Q" + str(i + 1) + ". " + t["q"] for i, t in enumerate(T))[:110],
                "O일까, X일까?", esc(clip(T[0]["q"], 70)) if T else "", None, f"{len(T)}문항 · 정답과 해설은 지면에서")
    if sec in ("classic", "modern"):
        C = D[sec]
        return (f"{NAME[sec]} · {C['writer']} 「{C['title']}」", clip(C.get("oneline", "") + " " + " ".join(C.get("story") or C.get("lines", [])), 110),
                f"「{esc(C['title'])}」", esc(clip(C.get("oneline"), 80)), None, f"{esc(C['writer'])} · {C['year']} · 1분이면 읽는 줄거리")
    if sec == "day":
        Y = D.get("onthisday") or []
        m, dd = D["date"][5:].split("-")
        return (f"그날의 문학 · {int(m)}월 {int(dd)}일 — {clip(Y[0]['title'], 40)}" if Y else "그날의 문학", " / ".join(y["year"] + " " + y["title"] for y in Y)[:110],
                f"{int(m)}월 {int(dd)}일,<br>그해에는", esc(clip(Y[0]["year"] + " · " + Y[0]["title"], 80)) if Y else "", None, " · ".join(y["year"] for y in Y))
    if sec == "rx":
        return ("기분 처방전 · 오늘 기분에 맞는 문장 한 알", "지쳤어요·울적해요·불안해요·화나요·설레요·멍해요 — 기분을 고르면 금로동 약사가 문장 한 알을 지어 드립니다.",
                "오늘 기분에<br>문장 한 알", "기분을 고르면 출처가 분명한 문장을 처방해 드려요.", None, "문학 약국 · 금로동 약사")
    raise KeyError(sec)


CARD = """<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#EDEDED;font-family:"Noto Serif KR","Noto Serif CJK KR",serif;color:#1A1A1A;overflow:hidden;position:relative;word-break:keep-all}
.p{position:absolute;inset:30px 44px;border-top:6px solid #1A1A1A;border-bottom:2px solid #1A1A1A}
.top{display:flex;justify-content:space-between;align-items:baseline;padding:8px 2px 8px;border-bottom:1px solid #1A1A1A}
.top b{font-size:40px;font-weight:900;letter-spacing:-1px}.top b i{font-style:normal;color:#A01E1E;font-size:20px;vertical-align:14px;margin-left:4px}
.top span{font-size:20px;font-weight:700}
.l{position:absolute;left:0;top:96px;bottom:18px;display:flex;flex-direction:column}
.k{font-size:24px;font-weight:900;color:#A01E1E;margin-bottom:16px;display:flex;align-items:center;gap:10px}.k::before{content:"";width:22px;height:4px;background:#A01E1E}
h1{font-size:62px;font-weight:900;line-height:1.22;letter-spacing:-2px}
h1 small{font-size:.45em;color:#7A7A7A;margin-left:10px;font-weight:700}
.d{font-size:25px;line-height:1.6;color:#444;margin-top:18px}
.by{margin-top:auto;font-size:22px;font-weight:700;border-top:1px solid #A6A6A6;padding-top:10px}
.r{position:absolute;right:0;top:100px;width:500px}
.r img{width:500px;height:333px;object-fit:cover;display:block;border:3px solid #1A1A1A;background:#d9d9d4}
.r.wr img{width:250px;height:292px;margin-left:auto}
.cap{font-size:18px;margin-top:8px;text-align:right;color:#4F4F4F}
</style></head><body><div class="p">
<div class="top"><b>문학늬우스</b><span>__DATE__ · 금로동 기자</span></div>
<div class="l" style="width:__LW__px"><div class="k">__KICK__</div><h1>__HEAD__</h1><p class="d">__LEDE__</p><div class="by">__TAIL__</div></div>
__RIGHT__
</div></body></html>"""


ISSUE = """<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#d9d6cf;font-family:"Noto Serif KR","Noto Serif CJK KR",serif;color:#1A1A1A;overflow:hidden;position:relative;word-break:keep-all}
.floor{position:absolute;inset:0;background:repeating-linear-gradient(90deg,#d4d1ca 0 118px,#cbc8c0 118px 120px)}
.mat{position:absolute;left:520px;top:300px;width:640px;height:300px;background:#8f8a80;border-radius:6px;box-shadow:inset 0 0 0 10px #7d786e}
.bell{position:absolute;left:44px;top:44px;width:440px}
.bell .t{font-size:24px;font-weight:900;color:#A01E1E;letter-spacing:2px}
.bell h1{font-size:58px;font-weight:900;line-height:1.2;letter-spacing:-2px;margin-top:12px}
.bell p{font-size:23px;line-height:1.6;color:#3b3b3b;margin-top:20px}
.bell .by{font-size:20px;font-weight:700;margin-top:26px;border-top:1px solid #8a8a8a;padding-top:10px}
.np{position:absolute;left:560px;top:58px;width:560px;height:470px;background:#f3f1ea;border:2px solid #1A1A1A;transform:rotate(-6deg);box-shadow:16px 18px 0 rgba(0,0,0,.28);padding:26px 30px}
.np::after{content:"";position:absolute;left:0;right:0;top:50%;height:2px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.25),transparent)}
.np .m{border-top:6px solid #1A1A1A;border-bottom:2px solid #1A1A1A;padding:8px 0 6px;display:flex;justify-content:space-between;align-items:baseline}
.np .m b{font-size:52px;font-weight:900;letter-spacing:-2px}
.np .m span{font-size:17px;font-weight:700;text-align:right;line-height:1.35}
.np .hd{font-size:31px;font-weight:900;line-height:1.35;margin-top:20px}
.np .cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:20px}
.np .cols i{display:block;height:9px;background:#c9c6be;margin-bottom:9px}
.np .cols i:nth-child(3n){width:70%}
.str{position:absolute;left:1030px;top:30px;width:16px;height:540px;background:#b58a54;transform:rotate(-6deg);box-shadow:2px 0 0 #8a6538}
.stamp{position:absolute;left:930px;top:400px;width:170px;height:170px;border:6px solid #A01E1E;border-radius:50%;color:#A01E1E;font-weight:900;display:grid;place-items:center;text-align:center;font-size:30px;line-height:1.15;transform:rotate(-14deg);background:rgba(243,241,234,.55)}
</style></head><body><div class="floor"></div><div class="mat"></div>
<div class="bell"><div class="t">딩동 · 신문 왔어요</div><h1>__HEAD__</h1><p>__LEDE__</p><div class="by">금로동 기자 · 매일 아침 문 앞 배달</div></div>
<div class="np"><div class="m"><b>문학늬우스</b><span>__NO__<br>__DATE__</span></div><div class="hd">__BIG__</div>
<div class="cols"><div><i></i><i></i><i></i><i></i><i></i></div><div><i></i><i></i><i></i><i></i><i></i></div><div><i></i><i></i><i></i><i></i><i></i></div></div></div>
<div class="stamp">배달<br>완료</div>
</body></html>"""


def issue_text(D):
    m, dd = D["date"][5:].split("-")
    md = f"{int(m)}월 {int(dd)}일"
    picks = []
    S = D.get("sentence") or {}
    w = (S.get("work") or "").strip("「」『』")
    if w: picks.append(f"오늘의 문장 「{w}」")
    for k, lab in (("poem", "시"), ("classic", "1분 고전"), ("modern", "1분 현대문학")):
        X = D.get(k) or {}
        if X.get("title"): picks.append(f"{lab} 「{X['title']}」")
    title = f"📰 문학늬우스 {md} 제{D['no']}호 신문이 도착했습니다"
    desc = (" · ".join(picks) + " — 금로동 기자가 오늘 아침 신문을 문 앞에 두고 갔어요. 펼쳐 보세요.")[:150]
    big = (S.get("big") or [""])
    big = " ".join(big) if isinstance(big, list) else str(big)
    return md, title, desc, big


def page(key, title, desc, image, target, sig):
    url = SITE + f"{OUT}/{key}.html"
    return f"""<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="share-sig" content="{sig}">
<meta name="robots" content="noindex,follow">
<title>{esc(title)} · 문학늬우스</title>
<meta name="description" content="{esc(desc)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="문학늬우스">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{esc(url)}">
<meta property="og:image" content="{esc(image)}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:locale" content="ko_KR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{esc(image)}">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<script>location.replace("../{target}")</script>
<style>body{{font-family:"Noto Serif KR",serif;background:#EDEDED;color:#1A1A1A;margin:0;display:grid;place-items:center;min-height:100vh;text-align:center;padding:24px}}a{{color:inherit}}</style>
</head><body><p><b>문학늬우스</b><br>{esc(title)}<br><br><a href="../{target}">지면에서 보기 →</a></p></body></html>
"""


def main(dates):
    os.makedirs(OUT, exist_ok=True)
    jobs = []
    for f in sorted(glob.glob("archive/20*.json")):
        D = json.load(open(f, encoding="utf-8"))
        d = D["date"]
        if dates and d not in dates:
            continue
        for sec in SECS:
            if sec != "rx" and not D.get({"day": "onthisday"}.get(sec, sec)):
                continue
            title, desc, head, lede, img, tail = content(D, sec)
            key = f"{d}-{sec}"
            sig = hashlib.md5(json.dumps([title, desc, head, lede, img, tail, CARD], ensure_ascii=False).encode()).hexdigest()[:10]
            hp = f"{OUT}/{key}.html"
            if os.path.exists(hp) and f'content="{sig}"' in open(hp, encoding="utf-8").read() and os.path.exists(f"{OUT}/{key}.jpg"):
                continue
            right, lw = "", 1112
            if sec == "puzzle":
                Z = D["puzzle"]; R, C = Z["size"]; cells = {}; nums = {}
                for w in Z["words"]:
                    nums[(w["r"], w["c"])] = w["n"]
                    for i in range(len(w["a"])):
                        cells[(w["r"] + (i if w["dir"] == "down" else 0), w["c"] + (i if w["dir"] == "across" else 0))] = 1
                cs = min(420 // max(R, C), 32)
                g = "".join((f'<i style="background:#EDEDED;position:relative">{"<em>%d</em>" % nums[(r, c)] if (r, c) in nums else ""}</i>' if (r, c) in cells else '<i style="background:#bdbab2"></i>') for r in range(R) for c in range(C))
                right = f'<div class="r" style="width:auto"><div style="display:grid;grid-template-columns:repeat({C},{cs}px);grid-auto-rows:{cs}px;gap:1px;background:#1A1A1A;border:3px solid #1A1A1A">{g}</div></div><style>.r em{{position:absolute;left:2px;top:0;font-size:{max(9, cs // 3)}px;font-style:normal;font-weight:700}}</style>'
                lw = 1112 - C * (cs + 1) - 40
            elif sec == "trivia":
                right = '<div class="r" style="width:330px;display:flex;gap:22px;top:150px"><b style="width:150px;height:150px;border:5px solid #1A1A1A;display:grid;place-items:center;font-size:110px;font-weight:900;line-height:1">O</b><b style="width:150px;height:150px;border:5px solid #1A1A1A;display:grid;place-items:center;font-size:110px;font-weight:900;line-height:1;background:#1A1A1A;color:#EDEDED">X</b></div>'
                lw = 740
            elif sec in ("rx", "classic", "day", "modern"):
                lbl = {"rx": "文學<br>藥局", "classic": "1分<br>古典", "day": "今日<br>文學", "modern": "1分<br>現代"}[sec]
                right = f'<div class="r" style="width:300px;top:120px"><div style="width:280px;height:330px;margin-left:auto;background:#f9f8f3;border:3px solid #1A1A1A;box-shadow:10px 10px 0 #1A1A1A;position:relative;padding:22px"><div style="font-size:30px;font-weight:900;border-bottom:4px double #1A1A1A;padding-bottom:8px">{ {"rx":"문학 약국","classic":"1분 고전","day":"그날의 문학","modern":"1분 현대문학"}[sec] }</div><div style="font-size:18px;color:#A01E1E;font-weight:700;margin-top:10px">{ {"rx":"처방전 · 內服藥","classic":"1분이면 읽는 줄거리","day":"오늘 날짜의 문학사","modern":"요즘 소설 1분 요약"}[sec] }</div><div style="position:absolute;right:24px;bottom:28px;width:110px;height:110px;border:5px solid #A01E1E;border-radius:50%;color:#A01E1E;font-size:26px;font-weight:900;line-height:1.15;display:grid;place-items:center;text-align:center;transform:rotate(-14deg)">{lbl}</div></div></div>'
                lw = 760
            elif img and os.path.exists(img):
                wr = sec == "writer"
                right = f'<div class="r{" wr" if wr else ""}"><img src="file://{os.path.abspath(img)}"><div class="cap">{"얼굴 없는 실루엣 펜화" if wr else "AI 삽화"}</div></div>'
                lw = 820 if wr else 580
            card = CARD.replace("__DATE__", kdate(d)).replace("__KICK__", NAME[sec]).replace("__HEAD__", head).replace("__LEDE__", lede).replace("__TAIL__", tail).replace("__RIGHT__", right).replace("__LW__", str(lw))
            jobs.append((card, f"{OUT}/{key}.jpg"))
            open(hp, "w", encoding="utf-8").write(page(key, title, desc, SITE + f"{OUT}/{key}.jpg", f"?d={d}#{sec}", sig))
        # 호 전체 공유: s/<날짜>-issue.html → ../?d=<날짜>
        md, title, desc, big = issue_text(D)
        key = f"{d}-issue"
        sig = hashlib.md5(json.dumps([title, desc, big, ISSUE], ensure_ascii=False).encode()).hexdigest()[:10]
        hp = f"{OUT}/{key}.html"
        if not (os.path.exists(hp) and f'content="{sig}"' in open(hp, encoding="utf-8").read() and os.path.exists(f"{OUT}/{key}.jpg")):
            y = d[:4]
            card = ISSUE.replace("__HEAD__", f"{md}<br>제{D['no']}호 신문이<br>도착했습니다").replace("__LEDE__", esc(desc.split(" — ")[0])).replace("__NO__", f"제{D['no']}호").replace("__DATE__", f"{y}년 {md}").replace("__BIG__", esc(clip(big, 60)))
            jobs.append((card, f"{OUT}/{key}.jpg"))
            open(hp, "w", encoding="utf-8").write(page(key, title, desc, SITE + f"{OUT}/{key}.jpg", f"?d={d}", sig))
    # 기분별 처방 공유 페이지(날짜와 무관): s/rx-<기분>.html → ../?m=<기분>#rx
    try:
        R = json.load(open("data/rx.json", encoding="utf-8"))
        for m in R["moods"]:
            key = f"rx-{m['key']}"
            title = f"기분 처방전 · {m['label']} — 오늘의 문장 한 알"
            desc = f"증상: {m['symptom']}. 금로동 약사가 이 기분에 맞는 문장을 출처와 함께 지어 드립니다."
            sig = hashlib.md5((title + desc + CARD).encode()).hexdigest()[:10]
            hp = f"{OUT}/{key}.html"
            if os.path.exists(hp) and f'content="{sig}"' in open(hp, encoding="utf-8").read() and os.path.exists(f"{OUT}/{key}.jpg"):
                continue
            right = f'<div class="r" style="width:300px;top:120px"><div style="width:280px;height:330px;margin-left:auto;background:#f9f8f3;border:3px solid #1A1A1A;box-shadow:10px 10px 0 #1A1A1A;position:relative;padding:22px"><div style="font-size:30px;font-weight:900;border-bottom:4px double #1A1A1A;padding-bottom:8px">문학 약국</div><div style="font-size:18px;color:#A01E1E;font-weight:700;margin-top:10px">처방전 · 內服藥</div><div style="font-size:22px;margin-top:22px">증상 <b>{esc(m["label"])}</b></div><div style="position:absolute;right:24px;bottom:28px;width:110px;height:110px;border:5px solid #A01E1E;border-radius:50%;color:#A01E1E;font-size:26px;font-weight:900;line-height:1.15;display:grid;place-items:center;text-align:center;transform:rotate(-14deg)">文學<br>藥局</div></div></div>'
            card = CARD.replace("__DATE__", "기분 처방전").replace("__KICK__", "기분 처방전").replace("__HEAD__", f"오늘 {esc(m['label'])}?<br>문장 한 알 드세요").replace("__LEDE__", esc(m["symptom"]) + " — 출처가 분명한 문장을 지어 드립니다.").replace("__TAIL__", "문학 약국 · 금로동 약사").replace("__RIGHT__", right).replace("__LW__", "760")
            jobs.append((card, f"{OUT}/{key}.jpg"))
            open(hp, "w", encoding="utf-8").write(page(key, title, desc, SITE + f"{OUT}/{key}.jpg", f"?m={m['key']}#rx", sig))
    except FileNotFoundError:
        pass
    if not jobs:
        print("share: nothing to do"); return
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = None
        for kw in ({"executable_path": "/usr/bin/google-chrome"}, {"channel": "chrome"}, {}, {"executable_path": "/opt/pw-browsers/chromium"}):
            try:
                b = p.chromium.launch(args=["--allow-file-access-from-files"], **kw); break
            except Exception:
                continue
        pg = b.new_page(viewport={"width": 1200, "height": 630})
        for card, out in jobs:
            tmp = os.path.abspath(out + ".tmp.html"); open(tmp, "w", encoding="utf-8").write(card)
            pg.goto("file://" + tmp, wait_until="load", timeout=30000)
            try: pg.evaluate("document.fonts.ready")
            except Exception: pass
            pg.evaluate("""()=>{const h=document.querySelector('h1'),l=document.querySelector('.l');if(!l)return;let s=parseFloat(getComputedStyle(h).fontSize);
              while(s>30&&l.scrollHeight>l.clientHeight+1){s-=2;h.style.fontSize=s+'px'}
              const d=document.querySelector('.d');while(d.textContent.length>20&&l.scrollHeight>l.clientHeight+1){d.textContent=d.textContent.replace(/\\s*\\S+…?$/,'…')}}""")
            pg.wait_for_timeout(200)
            pg.screenshot(path=out, type="jpeg", quality=86)
            os.remove(tmp)
        b.close()
    print("share:", len(jobs), "cards")


if __name__ == "__main__":
    main(sys.argv[1:])
