#!/usr/bin/env python3
"""Delete all aptitude questions for given topics (admin API)."""
import json
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE = "https://learnforearn.onrender.com/api"
COOKIE_FILE = Path(__file__).resolve().parent.parent.parent / "tmp_cookies.txt"

DI_TOPICS = [
    "bar-graphs",
    "pie-charts",
    "line-graphs",
    "tables",
    "tabular-di",
    "graphical-di",
    "venn-diagram-di",
    "caselets",
    "mixed-data-interpretation",
]


def cookie_header() -> str:
    for line in COOKIE_FILE.read_text(encoding="utf-8").splitlines():
        if not line.strip() or (line.startswith("#") and not line.startswith("#HttpOnly_")):
            continue
        parts = line.split("\t")
        if len(parts) >= 7 and parts[5] == "jwt":
            return f"jwt={parts[6]}"
    raise SystemExit("No jwt cookie — login first")


def api(method: str, path: str, cookie: str):
    req = urllib.request.Request(
        f"{BASE}{path}",
        headers={"Cookie": cookie},
        method=method,
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        body = resp.read().decode()
        return json.loads(body) if body else None


def delete_topic(topic: str, cookie: str, dry_run: bool = False) -> int:
    qs = api("GET", f"/aptitude/questions/{topic}", cookie)
    if not qs:
        print(f"{topic}: 0 questions")
        return 0
    print(f"{topic}: deleting {len(qs)} questions...")
    if dry_run:
        return len(qs)
    deleted = 0
    for q in qs:
        qid = q["id"]
        for attempt in range(3):
            try:
                api("DELETE", f"/admin/aptitude/questions/{qid}", cookie)
                deleted += 1
                break
            except urllib.error.HTTPError as e:
                if attempt == 2:
                    print(f"  FAILED {qid}: {e.code} {e.read().decode(errors='replace')}")
                time.sleep(1)
        time.sleep(0.03)
    return deleted


def main():
    dry = "--dry-run" in sys.argv
    topics = sys.argv[1:] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else DI_TOPICS
    cookie = cookie_header()
    total = 0
    for t in topics:
        total += delete_topic(t, cookie, dry_run=dry)
    print(f"Done. {'Would delete' if dry else 'Deleted'} {total} questions.")


if __name__ == "__main__":
    main()
