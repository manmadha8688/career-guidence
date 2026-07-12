---
name: content-pipeline
description: Bring any curriculum subject to full "gold-standard" parity — audit + enrich every concept, seed exactly 20 questions/concept, add 3 tricky problems/concept. Use when adding a new subject or filling gaps in an existing one.
metadata:
  type: skill
  invokedBy: /seed-subject
---

# Content Pipeline Skill — Full-Parity Subject Treatment

The repeatable process that took the curriculum from 10 → 52 finished subjects
(642 concepts, ~10k questions). Follow it for EVERY new subject so the bar never drops.

Also read `.claude/memory/feedback_content.md` (content mindset, video rules, schema).

---

## The bar (what "done" means for one subject)

A subject is DONE only when **every concept** has:
1. **Complete explanations** — no gaps. `explanationSimple` (teach from zero) AND
   `explanationTechnical` (depth + exam mindset), plus `examples`, `keyPoints`, `tip`,
   `commonMistakes`. Real-world complications and traps are **woven into the explanation
   itself**, not just bolted on.
2. **Exactly 20 questions** — difficulty spread ~**7 EASY / 9 MEDIUM / 4 HARD**,
   `correctIndex` varied across 0–3, distractors are real misconceptions.
3. **3 tricky problems** — one each of `OUTPUT` / `GOTCHA` / `REAL_WORLD` where possible.

Verify with `node list-subjects.mjs` → the subject must show `Nc  (20·N)q  tricky:N/N`.

---

## The 3 tasks (in order, per subject)

### Task 1 — Audit & Enrich (explanations first, ALWAYS)
- `node dump-content.mjs "<Subject Title>"` → read every concept fully.
- Judge like a teacher, not a template-filler. Ask: could a zero-knowledge student
  understand it, remember it days later, and solve any exam question on it?
- Consider **merge / split / reorder** across concepts (e.g. Python Fundamentals merged
  `None`, `is vs ==` into one). Fix ordering anomalies. Make judgements — don't ask.
- Enrich ONLY genuine gaps with `append-section.mjs`. **Do not pad** already-strong
  concepts. Weave exam-mindset in (e.g. "in git a merge conflict will arise here",
  "don't push secrets/keys"), then move on.
- Research for accuracy from anywhere — no knowledge limit. Never assert a fact you
  aren't sure of; for version-drift-prone facts, cite the lesson's own stated values.

### Task 2 — Seed 20 questions/concept
- Author a `spec-q-<subj>.json` and run `node seed-questions.mjs spec-q-<subj>.json`.
- Base every question strictly on THIS subject's concept content.
- Script validates: exactly 4 options, `correctIndex` 0–3, difficulty in
  {EASY,MEDIUM,HARD}; it's idempotent per concept. Re-seed one concept with `--force`
  if you overshot (e.g. 21) or need to replace weak questions.

### Task 3 — Add 3 tricky problems/concept
- Author `spec-tricky-<subj>.json`, run `node apply-tricky.mjs spec-tricky-<subj>.json`.
- `type` ∈ `OUTPUT | GOTCHA | REAL_WORLD`; each has `title, prompt, code?, answer, explanation`.
- `explanation` must teach the WHY — the trap, the rule, the real-world takeaway.

---

## Toolkit (`C:\manmadha\_curaudit`, external to repo)

The reusable scripts + `PLAYBOOK.md` (agent instructions). Run from that folder.

| Script | Purpose |
|---|---|
| `db.mjs` | MongoDB Atlas connection (shared by all scripts) |
| `list-subjects.mjs` | Overview: per-subject concept / question / tricky counts |
| `dump-content.mjs "<Subject>"` | Human-readable, question-free concept dump for review |
| `dump.mjs "<Subject>"` | Full dump WITH questions+tricky → `out-<slug>.json` (spot-check + gold ref) |
| `seed-questions.mjs <spec>` | Seed MCQs (validates + idempotent; `--force` to replace) |
| `apply-tricky.mjs <spec>` | Apply tricky problems to concepts |
| `append-section.mjs` | Idempotently append to a concept text field (enrichment) |
| `update-concept.mjs` / `replace-field.mjs` | Targeted concept field edits / find-replace |
| `check-empty.mjs` | Flag concepts with thin (<200 char) bodies |
| `fix-question.mjs <id> <text>` | Patch a single question's text |

**Gold-standard references** (study before authoring — this IS the quality bar):
`node dump.mjs "Python Basics"` and `node dump.mjs "Spring Boot REST API & Database"`.

**Brand-new subject from scratch** (create subject + concepts + content, not just
questions): use the copy-paste template in
[`new-subject-prompt.md`](new-subject-prompt.md) — fill the placeholders and run it
yourself or hand it to a subagent.

---

## Schema (must match exactly)

**Question** (`questions` collection): `conceptId`, `subjectId`, `text`,
`options` (exactly 4 strings), `correctIndex` (0–3), `explanation`, `difficulty`
(`EASY`|`MEDIUM`|`HARD`).

**TrickyProblem** (nested in `Concept.trickyProblems`): `type`
(`OUTPUT`|`GOTCHA`|`REAL_WORLD`), `title`, `prompt`, `code` (optional), `answer`, `explanation`.

**Concept** rich fields: `introduction`, `explanationSimple`, `explanationTechnical`,
`syntax`, `examples[] {title,description,code,output,demoHtml}`, `keyPoints[]`, `tip`,
`commonMistakes[]`, `trickyProblems[]`, `videoUrl`, `videoTitle`, `rank`,
`estimatedMinutes`, `orderIndex`.

---

## Multi-agent workflow (how to scale)

Proven pipeline for many subjects at once:
- **Hybrid split:** delegate well-defined engineering subjects (Node, Express, Django,
  Docker, BI/tools, etc.) to `generalPurpose` subagents; do accuracy-sensitive
  ML/Stats/PyTorch subjects yourself.
- **~4 agents in flight.** More than ~4 heavy agents + heavy parent work =
  `resource_exhausted`. Keep your own work light while agents run.
- Each agent prompt: "Read `PLAYBOOK.md` fully" + subject + the 3 tasks + subject-specific
  accuracy traps + "confirm counts via `list-subjects.mjs`; report per-concept spread,
  enrichments, and anything unsure."
- **Verify EVERY agent output** before marking done: `node dump.mjs "<Subject>"` then
  grep the accuracy-sensitive claims the agent flagged. Fix small issues yourself
  (e.g. `fix-question.mjs`). Only then refill the pipeline with the next subject.
- If an agent fails mid-run, check `list-subjects.mjs` — partial seeds are idempotent;
  relaunch clean.

---

## Aptitude / Logical / Verbal (separate models — different from academic subjects)

These do **not** use the `Concept` model. They have their own collections/models:
`AptitudeGroup`, `AptitudeTopic` (Quantitative), `LogicalTopic`, `VerbalTopic`,
`AptitudeQuestion`. Data Interpretation is rendered **frontend-only** (representation-heavy),
not seeded to DB. When adding aptitude content, follow those models — don't reuse the
academic concept pipeline.

---

## Standing autonomy rule (from the user)

Run the scripts yourself — **do not ask permission** to run commands. Don't divert,
hallucinate, or over-think. Deliver best results; make judgements and keep going one
subject at a time until all are complete.
