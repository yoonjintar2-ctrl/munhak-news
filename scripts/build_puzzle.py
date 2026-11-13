"""오늘 단어 목록(data/words-<날짜>.json: [[답, 단서], ...])으로 13×13 낱말 퍼즐을 만들어 today.json의 puzzle 칸에 넣는다.
사용: python scripts/build_puzzle.py 2026-11-13"""
import json, sys, hashlib, random, os
sys.path.insert(0, os.path.dirname(__file__))
import make_puzzle as M
M.N = int(os.environ.get('PZ_N', '11'))  # 격자 한 변(지면 높이에 맞춰 11)
date = sys.argv[1]
bank = [{"a": a, "c": c} for a, c in json.load(open(f"data/words-{date}.json", encoding="utf-8")) if 2 <= len(a) <= 5]
best = None
for k in range(60):
    rnd = random.Random(date + str(k)); words = rnd.sample(bank, len(bank))
    words = [w for w in words if not any(o is not w and w["a"] in o["a"] for o in words)]
    placed, grid = M.build(words, date + str(k), beam=120)
    rs = [r for r, _ in grid]; cs = [c for _, c in grid]
    n = len(placed); area = (max(rs) - min(rs) + 1) * (max(cs) - min(cs) + 1)
    # 지면 높이에 맞게 16~20단어, 작은 격자를 선호
    sc = -abs(n - 18) * 10 - area * 0.4 - (100 if n > 20 else 0)
    if not best or sc > best[0]: best = (sc, placed, grid)
_, placed, grid = best
rs = [r for r, _ in grid]; cs = [c for _, c in grid]; r0, c0 = min(rs), min(cs)
for p in placed: p["r"] -= r0; p["c"] -= c0
starts = sorted({(p["r"], p["c"]) for p in placed}); num = {s: i + 1 for i, s in enumerate(starts)}
out = sorted([{"n": num[(p["r"], p["c"])], "dir": p["dir"], "r": p["r"], "c": p["c"], "a": p["a"], "clue": p["clue"]} for p in placed], key=lambda p: (p["dir"], p["n"]))
pz = {"size": [max(rs) - r0 + 1, max(cs) - c0 + 1], "words": out}
T = json.load(open("today.json", encoding="utf-8")); T["puzzle"] = pz
json.dump(T, open("today.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("puzzle", len(out), "words", pz["size"])
