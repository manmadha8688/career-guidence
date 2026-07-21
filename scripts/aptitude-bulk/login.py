#!/usr/bin/env python3
"""Login to production API and save jwt cookie."""
import json
import urllib.request
from pathlib import Path

BASE = "https://learnforearn.onrender.com/api"
ROOT = Path(__file__).resolve().parent
CREDS = ROOT / "credentials.json"
COOKIE = ROOT.parent.parent / "tmp_cookies.txt"


def main():
    if not CREDS.exists():
        raise SystemExit(f"Create {CREDS} from credentials.json.example")
    body = json.loads(CREDS.read_text(encoding="utf-8"))
    data = json.dumps(body).encode()
    req = urllib.request.Request(
        f"{BASE}/auth/login",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        resp.read()
    # urllib doesn't save cookies — use curl output if present, else manual note
    print("Use: curl -c tmp_cookies.txt -X POST .../auth/login -d @credentials.json")
    print("Or run from repo root with curl as documented in README.md")


if __name__ == "__main__":
    main()
