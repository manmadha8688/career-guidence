# Aptitude Bulk Question Spec

**Scope:** Quantitative, Logical, and Verbal only. **Data Interpretation is frontend-only** (`FrontEnd/src/pages/aptitude/di/`) — do not bulk-upload DI questions to the API.

Each topic JSON file lives at `generated/{category}/{topic}.json`.

## File shape

```json
{
  "topic": "number-system",
  "category": "quantitative",
  "group": "number-basics",
  "questions": [ ...80 items... ]
}
```

## Each question object

```json
{
  "order": 21,
  "difficulty": "easy",
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "answer": "A",
  "solution": "Step 1: ... Step 2: ... Answer: ...",
  "trick": "Optional one-line shortcut",
  "type": "Question pattern name"
}
```

## Difficulty mapping (80 new questions, orders 21–100)

| Orders | Tier | difficulty field |
|--------|------|------------------|
| 21–35 | Easy | easy |
| 36–55 | Medium | medium |
| 56–75 | Hard | hard |
| 76–90 | Very Hard | hard |
| 91–100 | Application | hard |

Use `type` to distinguish tiers: e.g. `"Placement trap"`, `"CAT level"`, `"Real-world disguise"`.

## Answer distribution (80 new)

Exactly 20 × A, 20 × B, 20 × C, 20 × D.

## Rules

- Read `existing/{topic}.json` first — no duplicate scenarios or numbers
- Topic isolation: solvable using ONLY this topic's concepts
- 4 options, one correct, traps must be believable
- Full step-by-step solution on every question
- MCQ only

## Upload

```bash
python fetch_existing.py number-system
python upload_questions.py generated/quantitative/number-system.json
```
