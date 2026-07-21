#!/usr/bin/env python3
"""Fetch existing questions for a topic (auth required)."""
import json
import sys
import urllib.request
from pathlib import Path

BASE = "https://learnforearn.onrender.com/api"
COOKIE_FILE = Path(__file__).resolve().parent.parent.parent / "tmp_cookies.txt"
OUT_DIR = Path(__file__).parent / "existing"


def get_cookie_header() -> str:
    for line in COOKIE_FILE.read_text(encoding="utf-8").splitlines():
        if not line.strip() or (line.startswith("#") and not line.startswith("#HttpOnly_")):
            continue
        parts = line.split("\t")
        if len(parts) >= 7 and parts[5] == "jwt":
            return f"jwt={parts[6]}"
    raise SystemExit("No jwt cookie")


def fetch(topic: str):
    req = urllib.request.Request(
        f"{BASE}/aptitude/questions/{topic}",
        headers={"Cookie": get_cookie_header()},
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())


def main():
    topic = sys.argv[1]
    qs = fetch(topic)
    OUT_DIR.mkdir(exist_ok=True)
    out = OUT_DIR / f"{topic}.json"
    out.write_text(json.dumps(qs, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Saved {len(qs)} questions to {out}")


if __name__ == "__main__":
    main()
