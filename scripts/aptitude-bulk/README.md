# Aptitude Bulk Question Upload

Adds 80 MCQ questions per topic (orders 21–100) to reach 100 total for **Quantitative, Logical, and Verbal** only.

**Data Interpretation is excluded** — lessons and practice live in the frontend (`FrontEnd/src/pages/aptitude/di/` + `dataInterpretationData.js`), not the database.

## Setup

1. Copy `credentials.json.example` → `credentials.json` (gitignored) with admin email/password.
2. Login:
   ```powershell
   curl.exe -s -c tmp_cookies.txt -X POST "https://learnforearn.onrender.com/api/auth/login" -H "Content-Type: application/json" --data-binary "@scripts/aptitude-bulk/credentials.json"
   ```

## Commands

```powershell
python scripts/aptitude-bulk/audit_topics.py              # 83 topics (quant + logical + verbal)
python scripts/aptitude-bulk/fetch_existing.py number-system
python scripts/aptitude-bulk/upload_questions.py --dry-run scripts/aptitude-bulk/generated/quantitative/number-system.json
python scripts/aptitude-bulk/upload_questions.py scripts/aptitude-bulk/generated/quantitative/number-system.json
python scripts/aptitude-bulk/verify_topic.py number-system
```

See `QUESTION_SPEC.md` for JSON format and quality rules.

## Remove mistaken DB uploads (DI only)

```powershell
python scripts/aptitude-bulk/delete_topic_questions.py
```
