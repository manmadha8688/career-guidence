# /seed-subject — Full-Parity Subject Treatment

Bring a curriculum subject to the gold standard: audit + enrich every concept,
seed exactly 20 questions/concept, and add 3 tricky problems/concept.

**Read `.claude/skills/content-pipeline/SKILL.md` first — it is the authoritative playbook.**
Also read `.claude/memory/feedback_content.md` (content mindset, video + schema rules).

---

## Inputs
- **Subject title** (exact, including any trailing space) — e.g. `"Django Framework "`.
- If no subject is named, run `node list-subjects.mjs` (in `C:\manmadha\_curaudit`) and
  pick the earliest subject showing `0q` or `tricky: 0/N`.

---

## Steps (do them yourself — do not ask permission to run commands)

1. **Assess.** `cd C:\manmadha\_curaudit` → `node list-subjects.mjs` to see current
   counts. `node dump.mjs "Python Basics"` once to re-anchor on the quality bar.
2. **Task 1 — Audit & Enrich.** `node dump-content.mjs "<Subject>"`, read every concept.
   Consider merge/split/reorder. Enrich ONLY genuine gaps via `append-section.mjs`
   (weave exam-mindset into the explanation; do not pad strong concepts).
3. **Task 2 — Questions.** Author `spec-q-<subj>.json`, run
   `node seed-questions.mjs spec-q-<subj>.json`. Exactly 20/concept, ~7E/9M/4H,
   `correctIndex` varied, grounded strictly in this subject. Use `--force` to fix
   an overshoot or replace weak questions.
4. **Task 3 — Tricky.** Author `spec-tricky-<subj>.json`, run
   `node apply-tricky.mjs spec-tricky-<subj>.json`. 3/concept, mix OUTPUT/GOTCHA/REAL_WORLD.
5. **Verify.** `node list-subjects.mjs` must show `Nc  (20·N)q  tricky:N/N`.
   `node dump.mjs "<Subject>"` and spot-check the accuracy-sensitive claims.
   Patch small issues (`fix-question.mjs <id> <text>`) rather than re-running everything.

## Scaling (many subjects)
Use the multi-agent workflow in the skill: ~4 `generalPurpose` subagents on well-defined
engineering subjects, you handle accuracy-sensitive ML/Stats, keep your own work light,
and **verify every agent output** before refilling the pipeline.

## Brand-new subject (no concepts yet)
If the subject/concepts don't exist yet, use the copy-paste template
`.claude/skills/content-pipeline/new-subject-prompt.md` — it also creates the subject +
concept rich content before questions/tricky.

## Definition of done
Every concept: complete two-mode explanation, 20 questions (7E/9M/4H), 3 tricky.
Counts confirmed in `list-subjects.mjs`; accuracy spot-checked.
