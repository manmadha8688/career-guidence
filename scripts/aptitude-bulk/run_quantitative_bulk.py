#!/usr/bin/env python3
"""Generate, upload, and verify all quantitative aptitude bulk questions."""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT))

from generators.base import load_existing_texts, answer_letter, reassign_answer  # noqa: E402
from generators.registry import ALL_GENERATORS  # noqa: E402

OUT = ROOT / "generated" / "quantitative"
PROGRESS = ROOT / "progress-quantitative.json"
TOPICS_FILE = ROOT / "quantitative-topics.json"


def load_quantitative_topics() -> list[dict]:
    audit = json.loads((ROOT / "audit.json").read_text(encoding="utf-8"))
    quant = [t for t in audit if t.get("category") == "quantitative"]
    if quant:
        return [{"topic": t["topic"], "group": t["group"]} for t in quant]
    return json.loads(TOPICS_FILE.read_text(encoding="utf-8"))


def generate_topic(topic: str, group: str) -> dict:
    gen = ALL_GENERATORS[topic]
    existing = load_existing_texts(ROOT / "existing" / f"{topic}.json")
    questions = []
    seen = set(existing)
    for order in range(21, 101):
        letter = answer_letter(order)
        q = gen(order)
        attempt = 0
        while q["question"] in seen and attempt < 5:
            q = gen(order + 1000 + attempt * 17)
            attempt += 1
        q = reassign_answer(q, letter)
        seen.add(q["question"])
        questions.append(q)
    return {"topic": topic, "category": "quantitative", "group": group, "questions": questions}


def load_progress() -> dict:
    if PROGRESS.exists():
        return json.loads(PROGRESS.read_text(encoding="utf-8"))
    return {"completed": [], "failed": [], "summary": {}}


def save_progress(data: dict):
    PROGRESS.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def main():
    topics = load_quantitative_topics()
    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    do_upload = "--upload" in sys.argv
    do_verify = "--verify" in sys.argv or do_upload

    if only:
        topics = [t for t in topics if t["topic"] in only]

    OUT.mkdir(parents=True, exist_ok=True)
    progress = load_progress()
    completed = []
    failed = []
    uploaded_total = 0

    for t in topics:
        slug = t["topic"]
        if slug not in ALL_GENERATORS:
            print(f"SKIP no generator: {slug}")
            failed.append({"topic": slug, "error": "no generator"})
            continue
        try:
            data = generate_topic(slug, t["group"])
            path = OUT / f"{slug}.json"
            path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
            print(f"Generated {len(data['questions'])} -> {path.name}")

            if do_upload:
                r = subprocess.run(
                    [sys.executable, str(ROOT / "upload_questions.py"), "--dry-run", str(path)],
                    capture_output=True,
                    text=True,
                )
                if r.returncode != 0:
                    raise RuntimeError(r.stderr or r.stdout)
                print(r.stdout.strip())
                r = subprocess.run(
                    [sys.executable, str(ROOT / "upload_questions.py"), str(path)],
                    capture_output=True,
                    text=True,
                )
                if r.returncode != 0:
                    raise RuntimeError(r.stderr or r.stdout)
                print(r.stdout.strip())
                uploaded_total += 80

            if do_verify:
                r = subprocess.run(
                    [sys.executable, str(ROOT / "verify_topic.py"), slug],
                    capture_output=True,
                    text=True,
                )
                print(r.stdout.strip())
                if r.returncode != 0:
                    raise RuntimeError(r.stderr or r.stdout)

            completed.append(slug)
            progress["completed"] = list(dict.fromkeys(progress.get("completed", []) + [slug]))
            progress["summary"][slug] = {"generated": 80, "status": "ok"}
            save_progress(progress)
        except Exception as e:
            print(f"FAIL {slug}: {e}")
            failed.append({"topic": slug, "error": str(e)})
            progress.setdefault("failed", []).append({"topic": slug, "error": str(e)})
            save_progress(progress)

    print(f"\nDone: {len(completed)} topics generated, {uploaded_total} uploaded, {len(failed)} failed")
    if failed:
        for f in failed:
            print(f"  - {f['topic']}: {f['error']}")


if __name__ == "__main__":
    main()
