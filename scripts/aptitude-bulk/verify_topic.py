#!/usr/bin/env python3
"""Verify question counts and answer distribution for a topic."""
import json
import sys
import urllib.request
from collections import Counter
from pathlib import Path

BASE = "https://learnforearn.onrender.com/api"
COOKIE_FILE = Path(__file__).resolve().parent.parent.parent / "tmp_cookies.txt"


def cookie():
    for line in COOKIE_FILE.read_text(encoding="utf-8").splitlines():
        if not line.strip() or (line.startswith("#") and not line.startswith("#HttpOnly_")):
            continue
        parts = line.split("\t")
        if len(parts) >= 7 and parts[5] == "jwt":
            return f"jwt={parts[6]}"
    raise SystemExit("No jwt cookie")


def fetch(topic):
    req = urllib.request.Request(
        f"{BASE}/aptitude/questions/{topic}",
        headers={"Cookie": cookie()},
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())


def main():
    topic = sys.argv[1]
    qs = fetch(topic)
    ans = Counter(q["answer"] for q in qs)
    diff = Counter(q["difficulty"] for q in qs)
    print(f"{topic}: total={len(qs)} answers={dict(ans)} difficulty={dict(diff)}")
    if len(qs) != 100:
        print("WARN: expected 100 total")
    for k in "ABCD":
        if ans.get(k, 0) != 25:
            print(f"WARN: answer {k} count is {ans.get(k,0)}, expected 25 across all 100")


if __name__ == "__main__":
    main()
