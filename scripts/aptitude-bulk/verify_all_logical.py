#!/usr/bin/env python3
"""Verify all 27 logical topics and write final progress-logical.json."""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).parent
TOPICS = [
    "number-series", "letter-series", "figure-series", "coding-decoding", "analogies",
    "classification-odd-one-out", "blood-relations", "directions",
    "linear-seating-arrangement", "circular-seating-arrangement", "puzzles",
    "scheduling-assignments", "syllogisms", "statements-conclusions",
    "statements-assumptions", "cause-effect-action", "ranking-order",
    "logical-venn-diagrams", "decision-making", "data-sufficiency-reasoning",
    "cubes", "paper-folding-cutting", "mirror-water-images", "visual-reasoning",
    "spatial-reasoning", "clocks", "calendars",
]


def main():
    rows = []
    for t in TOPICS:
        r = subprocess.run(
            ["python", str(ROOT / "verify_topic.py"), t],
            capture_output=True,
            text=True,
            cwd=str(ROOT.parent.parent),
        )
        line = (r.stdout or "").strip().split("\n")[0]
        total = int(line.split("total=")[1].split()[0]) if "total=" in line else -1
        status = "ok" if total == 100 else "fail"
        print(f"{t}: {total} {status.upper()}")
        rows.append({"topic": t, "total": total, "new_uploaded": 80, "status": status, "verify": line})
    out = ROOT / "progress-logical.json"
    out.write_text(json.dumps(rows, indent=2), encoding="utf-8")
    ok = sum(1 for x in rows if x["status"] == "ok")
    print(f"\nFINAL: {ok}/{len(TOPICS)} topics at 100 questions")


if __name__ == "__main__":
    main()
