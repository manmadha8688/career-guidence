#!/usr/bin/env python3
"""Upload only questions whose order is not already present in production."""
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).parent


def existing_orders(topic: str) -> set[int]:
    subprocess.run([sys.executable, str(ROOT / "fetch_existing.py"), topic], check=True)
    data = json.loads((ROOT / "existing" / f"{topic}.json").read_text(encoding="utf-8"))
    return {q["order"] for q in data}


def main():
    path = Path(sys.argv[1])
    data = json.loads(path.read_text(encoding="utf-8"))
    topic = data["topic"]
    have = existing_orders(topic)
    missing = [q for q in data["questions"] if q["order"] not in have]
    if not missing:
        print(f"{topic}: nothing to upload (all orders present)")
        return
    tmp = Path(tempfile.gettempdir()) / f"upload-{topic}.json"
    payload = {**data, "questions": missing}
    tmp.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"{topic}: uploading {len(missing)} missing orders (have {len(have)})")
    r = subprocess.run(
        [sys.executable, str(ROOT / "upload_questions.py"), "--partial", str(tmp)],
        check=False,
    )
    if r.returncode != 0:
        sys.exit(r.returncode)
    r = subprocess.run([sys.executable, str(ROOT / "verify_topic.py"), topic], check=False)
    sys.exit(r.returncode)


if __name__ == "__main__":
    main()
