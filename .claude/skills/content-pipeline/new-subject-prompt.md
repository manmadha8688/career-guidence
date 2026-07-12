# New-Subject Prompt Template (copy-paste)

Use this to spin up a **brand-new subject from scratch** (create the subject + its
concepts + full rich content + 20 questions/concept + 3 tricky/concept), or hand it to a
`generalPurpose` subagent. Fill the `<<...>>` placeholders and delete this heading.

For an EXISTING subject that only needs questions/tricky, use `/seed-subject` instead.

---

```
Read C:\manmadha\_curaudit\PLAYBOOK.md FULLY and follow it exactly (scripts, schema,
quality rules). Also read .claude/memory/feedback_content.md (content mindset, video +
schema rules) and .claude/skills/content-pipeline/SKILL.md (the bar + toolkit).

STUDY THE BAR FIRST (do not skip):
- node dump.mjs "Python Basics"                       -> out-python-basics.json
- node dump.mjs "Spring Boot REST API & Database"     -> out-spring-boot-rest-api-database.json
Match their explanation depth, example quality, question style, distractor quality,
difficulty spread, and tricky-problem craft. That IS the quality bar.

SUBJECT TO BUILD
- Title:        <<Exact Subject Title>>
- One-liner:    <<who it's for + what they'll be able to do>>
- Rank/level:   <<E/D/C/B/A/S>>   Difficulty: <<Beginner/Intermediate/Advanced>>
- Concepts (ordered — these become orderIndex 1..N):
  1. <<Concept 1 title / topic>>
  2. <<Concept 2 title / topic>>
  3. <<...>>
  (If concept list is rough, refine it: merge overlaps, split bloated ones, order
   from zero-knowledge -> advanced. Use your judgement; don't ask permission.)

GOAL FOR EVERY STUDENT (the teaching test)
Each concept must let a zero-knowledge student: understand it completely, remember it
days later, and solve ANY exam question on it without surprise. Teach like a great
teacher — weave real-world complications, gotchas, and exam-mindset INTO the explanation,
not just into a tricky block.

DO ALL OF THIS, IN ORDER
1) CREATE the subject + concepts with FULL rich content. For each concept author:
   introduction (short), explanationSimple (teach from zero), explanationTechnical
   (depth + exam mindset), syntax, examples[] (2 worked: title/description/code/output),
   keyPoints[], tip, commonMistakes[], rank, estimatedMinutes, orderIndex.
   Search YouTube for a real, focused, 2022+ video per concept (trusted channel);
   set videoUrl/videoTitle, or leave null if none fits. Name the concept after what
   the video actually covers when a video drives it.
   (Create via the seeder/admin path used in feedback_content.md, or the _curaudit
   scripts if seeding directly to Mongo.)
2) SEED exactly 20 questions per concept via a spec-q-<subj>.json +
   node seed-questions.mjs. Spread ~7 EASY / 9 MEDIUM / 4 HARD, correctIndex varied
   0-3, 4 options each, every option a plausible real misconception, explanation states
   why-right + why-the-trap-is-wrong. Ground strictly in this subject's own content.
3) ADD 3 tricky problems per concept via spec-tricky-<subj>.json +
   node apply-tricky.mjs. Mix OUTPUT / GOTCHA / REAL_WORLD; explanation teaches the WHY.

ACCURACY RULES (non-negotiable)
- Never assert a fact you aren't sure of. Research for correctness from anywhere.
- For version/price-drift-prone facts, cite the lesson's own stated values, framed as
  such — don't claim current real-world numbers.
- Compute every arithmetic answer carefully.

VERIFY + REPORT
- node list-subjects.mjs must show "<<Title>>": Nc, (20*N)q, tricky:N/N.
- node dump.mjs "<<Title>>" and re-read a few concepts + questions to self-check.
- Report: per-concept question counts (E/M/H), tricky count, which concepts you
  merged/split/reordered and why, videos chosen, and anything you were unsure about.
```

---

## Notes
- Aptitude / Logical / Verbal subjects use DIFFERENT models (`AptitudeGroup`,
  `AptitudeTopic`, `LogicalTopic`, `VerbalTopic`, `AptitudeQuestion`) — do NOT use this
  academic template for them. Data Interpretation is frontend-only.
- Scaling many subjects: keep ~4 subagents in flight, verify each before refilling.
