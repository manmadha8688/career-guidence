#!/usr/bin/env python3
"""Verify all quantitative topics in production."""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
topics = json.loads((ROOT / "quantitative-topics.json").read_text(encoding="utf-8"))

ok = []
partial = []
pending = []

for t in topics:
    slug = t["topic"]
    r = subprocess.run(
        [sys.executable, str(ROOT / "verify_topic.py"), slug],
        capture_output=True,
        text=True,
    )
    line = r.stdout.strip().split("\n")[0] if r.stdout else r.stderr
    if "total=100" in line:
        ok.append(slug)
    elif "total=20" in line:
        pending.append(slug)
    else:
        partial.append((slug, line))

print(f"OK (100): {len(ok)}")
print(f"Pending (20): {len(pending)}")
print(f"Partial: {len(partial)}")
if pending:
    print("Pending:", ", ".join(pending))
if partial:
    for s, l in partial:
        print(f"  {s}: {l}")
