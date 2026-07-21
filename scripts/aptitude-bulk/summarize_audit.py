#!/usr/bin/env python3
import json
from collections import Counter
from pathlib import Path

rows = json.loads(Path(__file__).parent.joinpath("audit.json").read_text(encoding="utf-8"))
c = Counter(r["count"] for r in rows)
print("count distribution:", dict(sorted(c.items())))
for cat in ["quantitative", "logical", "verbal"]:
    items = [r for r in rows if r["category"] == cat]
    bad = [r for r in items if r["count"] != 100]
    print(f"\n{cat}: {len(items)} topics, {len(bad)} not at 100")
    for r in sorted(bad, key=lambda x: x["count"]):
        print(f"  {r['count']:>3} {r['topic']}")
