#!/usr/bin/env python3
"""Upload missing questions for all quantitative topics below 100."""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
topics = json.loads((ROOT / "quantitative-topics.json").read_text(encoding="utf-8"))
gen = ROOT / "generated" / "quantitative"

for t in topics:
    slug = t["topic"]
    path = gen / f"{slug}.json"
    if not path.exists():
        print(f"SKIP {slug}: no generated file")
        continue
    r = subprocess.run(
        [sys.executable, str(ROOT / "verify_topic.py"), slug],
        capture_output=True,
        text=True,
    )
    if "total=100" in (r.stdout or ""):
        print(f"OK {slug}: already 100")
        continue
    print(f"UPLOAD {slug}...")
    r = subprocess.run(
        [sys.executable, str(ROOT / "upload_missing.py"), str(path)],
        capture_output=False,
    )
    if r.returncode != 0:
        print(f"FAIL {slug}")
        sys.exit(r.returncode)

print("All pending topics processed.")
