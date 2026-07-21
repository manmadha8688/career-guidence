#!/usr/bin/env python3
"""Full pipeline: fetch → generate → dry-run → upload → verify → log."""
from __future__ import annotations

import json
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).parent
REPO = ROOT.parent.parent
COOKIE = REPO / "tmp_cookies.txt"
PROGRESS = ROOT / "progress-logical.json"
BASE = "https://learnforearn.onrender.com/api"

LOGICAL_TOPICS = [
    "number-series", "letter-series", "figure-series", "coding-decoding", "analogies",
    "classification-odd-one-out", "blood-relations", "directions",
    "linear-seating-arrangement", "circular-seating-arrangement", "puzzles",
    "scheduling-assignments", "syllogisms", "statements-conclusions",
    "statements-assumptions", "cause-effect-action", "ranking-order",
    "logical-venn-diagrams", "decision-making", "data-sufficiency-reasoning",
    "cubes", "paper-folding-cutting", "mirror-water-images", "visual-reasoning",
    "spatial-reasoning", "clocks", "calendars",
]


def run(cmd: list[str], timeout: int = 600) -> tuple[int, str]:
    r = subprocess.run(cmd, capture_output=True, text=True, cwd=str(REPO), timeout=timeout)
    out = (r.stdout or "") + (r.stderr or "")
    return r.returncode, out


def login():
    creds = ROOT / "credentials.json"
    cmd = [
        "curl.exe", "-s", "-c", str(COOKIE),
        "-X", "POST", f"{BASE}/auth/login",
        "-H", "Content-Type: application/json",
        "--data-binary", f"@{creds}",
    ]
    return run(cmd)


def get_cookie() -> str:
    for line in COOKIE.read_text(encoding="utf-8").splitlines():
        if not line.strip() or (line.startswith("#") and not line.startswith("#HttpOnly_")):
            continue
        parts = line.split("\t")
        if len(parts) >= 7 and parts[5] == "jwt":
            return f"jwt={parts[6]}"
    raise RuntimeError("No jwt cookie")


def verify_count(topic: str) -> dict:
    req = urllib.request.Request(
        f"{BASE}/aptitude/questions/{topic}",
        headers={"Cookie": get_cookie()},
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            qs = json.loads(resp.read().decode())
        from collections import Counter
        ans = Counter(q["answer"] for q in qs)
        return {"total": len(qs), "answers": dict(ans), "ok": len(qs) == 100}
    except urllib.error.HTTPError as e:
        return {"total": -1, "error": str(e), "ok": False}


def load_progress() -> list:
    if PROGRESS.exists():
        return json.loads(PROGRESS.read_text(encoding="utf-8"))
    return []


def save_progress(rows: list):
    PROGRESS.write_text(json.dumps(rows, indent=2), encoding="utf-8")


def process_topic(topic: str, skip_upload: bool = False) -> dict:
    row = {"topic": topic, "timestamp": datetime.now(timezone.utc).isoformat()}
    # fetch existing
    code, out = run(["python", str(ROOT / "fetch_existing.py"), topic])
    row["fetch"] = {"code": code, "output": out.strip()[-200:]}
    if code != 0:
        login()
        code, out = run(["python", str(ROOT / "fetch_existing.py"), topic])
        row["fetch_retry"] = {"code": code}
    # generate
    code, out = run(["python", str(ROOT / "generate_logical.py"), topic])
    row["generate"] = {"code": code, "output": out.strip()}
    if code != 0:
        row["status"] = "failed_generate"
        return row
    gen_path = ROOT / "generated" / "logical" / f"{topic}.json"
    # dry-run
    code, out = run(["python", str(ROOT / "upload_questions.py"), "--dry-run", str(gen_path)])
    row["dry_run"] = {"code": code, "output": out.strip()}
    if code != 0:
        row["status"] = "failed_dry_run"
        return row
    if skip_upload:
        row["status"] = "dry_run_ok"
        return row
    # upload
    code, out = run(["python", str(ROOT / "upload_questions.py"), str(gen_path)], timeout=900)
    row["upload"] = {"code": code, "output": out.strip()[-300:]}
    if code != 0:
        login()
        code, out = run(["python", str(ROOT / "upload_questions.py"), str(gen_path)], timeout=900)
        row["upload_retry"] = {"code": code}
    # verify (admin count + public count)
    time.sleep(1)
    v = verify_count(topic)
    row["verify"] = v
    if not v.get("ok") and v.get("total", 0) < 100:
        # activate if uploaded but inactive (legacy isActive bug)
        run(["python", str(ROOT / "activate_inactive.py"), topic])
        time.sleep(1)
        v = verify_count(topic)
        row["verify"] = v
    row["status"] = "ok" if v.get("ok") else "verify_warn"
    return row


def main():
    skip_upload = "--dry-run-only" in sys.argv
    topics = [t for t in sys.argv[1:] if not t.startswith("--")] or LOGICAL_TOPICS
    login()
    progress = load_progress()
    done = {r["topic"] for r in progress if r.get("status") == "ok"}
    for topic in topics:
        if topic in done and "--force" not in sys.argv:
            print(f"SKIP {topic} (already ok)")
            continue
        print(f"\n=== {topic} ===")
        row = process_topic(topic, skip_upload=skip_upload)
        progress = [r for r in progress if r.get("topic") != topic] + [row]
        save_progress(progress)
        print(json.dumps(row, indent=2))
    print("\n=== SUMMARY ===")
    for t in LOGICAL_TOPICS:
        r = next((x for x in progress if x.get("topic") == t), None)
        if r:
            v = r.get("verify", {})
            print(f"{t}: {r.get('status')} total={v.get('total', '?')}")


if __name__ == "__main__":
    main()
