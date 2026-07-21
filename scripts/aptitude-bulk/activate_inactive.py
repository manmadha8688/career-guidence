#!/usr/bin/env python3
"""Set active=true on inactive aptitude questions for a topic (fixes isActive JSON bug)."""
import json
import sys
import time
import urllib.error
import urllib.request
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


def api(method, path, body=None):
    data = json.dumps(body, ensure_ascii=False).encode() if body else None
    req = urllib.request.Request(
        f"{BASE}{path}",
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8", "Cookie": cookie()},
        method=method,
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())


def main():
    topics = sys.argv[1:] if len(sys.argv) > 1 else []
    if not topics:
        raise SystemExit("Usage: activate_inactive.py topic [topic...]")
    for topic in topics:
        qs = api("GET", f"/admin/aptitude/questions/{topic}")
        fixed = 0
        for q in qs:
            if q.get("active") is True:
                continue
            q["active"] = True
            for attempt in range(3):
                try:
                    api("PUT", f"/admin/aptitude/questions/{q['id']}", q)
                    fixed += 1
                    break
                except urllib.error.HTTPError:
                    time.sleep(2)
            time.sleep(0.05)
        print(f"{topic}: activated {fixed} questions")


if __name__ == "__main__":
    main()
