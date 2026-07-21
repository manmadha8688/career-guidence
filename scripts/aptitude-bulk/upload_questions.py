#!/usr/bin/env python3
"""Upload aptitude questions from JSON files to admin API."""
import json
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE = "https://learnforearn.onrender.com/api"
COOKIE_FILE = Path(__file__).resolve().parent.parent.parent / "tmp_cookies.txt"
GENERATED = Path(__file__).parent / "generated"


def parse_jwt_cookie(text: str) -> str:
    for line in text.splitlines():
        if not line.strip() or (line.startswith("#") and not line.startswith("#HttpOnly_")):
            continue
        parts = line.split("\t")
        if len(parts) >= 7 and parts[5] == "jwt":
            return f"jwt={parts[6]}"
    raise SystemExit("No jwt cookie found")


def get_cookie_header() -> str:
    if not COOKIE_FILE.exists():
        raise SystemExit("Missing tmp_cookies.txt — run login first")
    return parse_jwt_cookie(COOKIE_FILE.read_text(encoding="utf-8"))


def api_post(path: str, body: dict, cookie: str):
    data = json.dumps(body, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        f"{BASE}{path}",
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8", "Cookie": cookie},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())


def validate_questions(questions: list, topic: str, start_order: int = 21, partial: bool = False):
    if not partial and len(questions) != 80:
        raise ValueError(f"{topic}: expected 80 questions, got {len(questions)}")
    answers = {"A": 0, "B": 0, "C": 0, "D": 0}
    for i, q in enumerate(questions, start=start_order if not partial else questions[0].get("order", start_order)):
        if q.get("topic") and q["topic"] != topic:
            raise ValueError(f"{topic}: question order {q.get('order')} has wrong topic {q['topic']}")
        opts = q.get("options") or []
        if len(opts) != 4:
            raise ValueError(f"{topic} q{q.get('order')}: need 4 options")
        ans = q.get("answer")
        if ans not in "ABCD":
            raise ValueError(f"{topic} q{q.get('order')}: invalid answer {ans}")
        if not partial:
            answers[ans] += 1
        if not q.get("question") or not q.get("solution"):
            raise ValueError(f"{topic} q{q.get('order')}: missing question or solution")
    if not partial:
        for k, v in answers.items():
            if v != 20:
                raise ValueError(f"{topic}: answer {k} count is {v}, expected 20")
    return True


def upload_file(path: Path, cookie: str, dry_run: bool = False, partial: bool = False):
    data = json.loads(path.read_text(encoding="utf-8"))
    topic = data["topic"]
    category = data.get("category", "")
    if category == "data-interpretation" or "data-interpretation" in str(path):
        raise ValueError(f"{topic}: data-interpretation is frontend-only — skip DB upload")
    questions = data["questions"]
    validate_questions(questions, topic, partial=partial)
    if dry_run:
        print(f"DRY RUN OK: {topic} ({len(questions)} questions)")
        return 0
    ok = 0
    for q in questions:
        payload = {
            "topic": topic,
            "order": q["order"],
            "difficulty": q["difficulty"],
            "question": q["question"],
            "options": q["options"],
            "answer": q["answer"],
            "solution": q["solution"],
            "trick": q.get("trick", ""),
            "type": q.get("type", ""),
            "active": True,
        }
        for attempt in range(3):
            try:
                api_post("/admin/aptitude/questions", payload, cookie)
                ok += 1
                break
            except urllib.error.HTTPError as e:
                body = e.read().decode(errors="replace")
                if attempt == 2:
                    raise RuntimeError(f"Upload failed {topic} order {q['order']}: {e.code} {body}")
                time.sleep(2 * (attempt + 1))
        time.sleep(0.05)
    print(f"Uploaded {ok} questions for {topic}")
    return ok


def main():
    dry = "--dry-run" in sys.argv
    partial = "--partial" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if args:
        paths = [Path(p) for p in args]
    else:
        paths = sorted(GENERATED.rglob("*.json"))
    if not paths:
        print("No JSON files to upload")
        return
    cookie = get_cookie_header()
    total = 0
    for p in paths:
        total += upload_file(p, cookie, dry_run=dry, partial=partial)
    print(f"Done. Total uploaded: {total}")


if __name__ == "__main__":
    main()
