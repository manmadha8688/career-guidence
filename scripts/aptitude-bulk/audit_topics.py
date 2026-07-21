#!/usr/bin/env python3
"""Audit aptitude topics and question counts via live API."""
import json
import sys
import urllib.request
from pathlib import Path

BASE = "https://learnforearn.onrender.com/api"
COOKIE_FILE = Path(__file__).resolve().parent.parent.parent / "tmp_cookies.txt"

CATEGORIES = ["quantitative", "logical", "verbal"]
# data-interpretation is frontend-only (see FrontEnd/src/pages/aptitude/dataInterpretationData.js)


def api_get(path: str, auth: bool = False):
    req = urllib.request.Request(f"{BASE}{path}")
    if auth and COOKIE_FILE.exists():
        cookie = COOKIE_FILE.read_text(encoding="utf-8").strip()
        # curl cookie file format: domain\tflag\tpath\tsecure\texpiry\tname\tvalue
        for line in cookie.splitlines():
            if not line.strip() or (line.startswith("#") and not line.startswith("#HttpOnly_")):
                continue
            parts = line.split("\t")
            if len(parts) >= 7 and parts[5] == "jwt":
                req.add_header("Cookie", f"jwt={parts[6]}")
                break
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())


def main():
    filter_cat = sys.argv[1] if len(sys.argv) > 1 else None
    rows = []
    for cat in CATEGORIES:
        if filter_cat and cat != filter_cat:
            continue
        groups = api_get(f"/aptitude/groups/{cat}")
        for g in groups:
            topics = api_get(f"/aptitude/topics/{g['slug']}")
            for t in topics:
                slug = t.get("topic") or t.get("slug")
                try:
                    qs = api_get(f"/aptitude/questions/{slug}", auth=True)
                    count = len(qs)
                except Exception as e:
                    count = -1
                    err = str(e)
                else:
                    err = ""
                rows.append({
                    "category": cat,
                    "group": g["slug"],
                    "groupName": g.get("displayName", g["slug"]),
                    "topic": slug,
                    "topicName": t.get("displayName", slug),
                    "count": count,
                    "error": err,
                })
    out = Path(__file__).parent / "audit.json"
    out.write_text(json.dumps(rows, indent=2), encoding="utf-8")
    print(f"Wrote {len(rows)} topics to {out}")
    for r in rows:
        flag = "OK" if r["count"] == 20 else "!!"
        print(f"{flag} {r['count']:>3}  {r['category']}/{r['topic']} ({r['topicName']})")


if __name__ == "__main__":
    main()
