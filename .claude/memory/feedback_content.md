---
name: feedback-content
description: Content creation — subjects, concepts, missions, coding questions, videos, seeding, guide tone
metadata:
  type: feedback
---

# Content Creation Feedback

---

## Mindset (subjects & concepts)

Think like a domain expert teaching a student — not filling a template.

1. Cover fully — length = what the concept needs.
2. No fixed counts for examples/tips/mistakes.
3. Beginner-progressive; state level clearly.
4. No overhyping; quality over quantity.
5. Short intro, detailed explanation.

### Subject API — `POST /api/admin/subjects`

`title`, `description`, `color`, `icon`, `rank`, `difficulty`, `estimatedHours`, `overview`, `whyLearn`, `forWho`, `prerequisites`, `outcomes`, `whatYouWillBuild`, `toolsRequired`, `careerUse`

### Concept API — `POST /api/admin/concepts`

`title`, `subjectId`, `orderIndex`, `introduction`, `explanationSimple`, `explanationTechnical`, `syntax`, `examples[]`, `keyPoints[]`, `tip`, `commonMistakes[]`, `rank`, `estimatedMinutes`

### Question pattern (DataSeeder)

```java
q.apply(new String[]{ conceptId, "question", "opt0", "opt1", "opt2", "opt3", "correctIndex", "explanation", "EASY/MEDIUM/HARD" })
```

- 20 questions per concept; correct index spread 0–3; guard with `countByConceptId == 0`.

---

## Full-parity standard (current bar — read for any new subject)

Every subject must reach: **each concept = complete two-mode explanation + exactly
20 questions (~7 EASY / 9 MEDIUM / 4 HARD) + 3 tricky problems.** Full process,
scripts, and multi-agent workflow live in `skills/content-pipeline/SKILL.md`
(command: `/seed-subject`).

- **Explanations first.** Audit and enrich `explanationSimple` (teach from zero) AND
  `explanationTechnical` (depth + exam mindset). Weave real-world complications and
  traps directly INTO the explanation — the structured `trickyProblems` are a
  *supplement*, not the whole job. Consider merge/split/reorder across concepts.
  Do NOT pad already-strong concepts.
- **Tricky problems** live on `Concept.trickyProblems[]`: `type`
  (`OUTPUT`|`GOTCHA`|`REAL_WORLD`), `title`, `prompt`, `code?`, `answer`, `explanation`.
- **Toolkit is in `C:\manmadha\_curaudit`** (external to repo): `list-subjects.mjs`,
  `dump-content.mjs`, `dump.mjs`, `seed-questions.mjs`, `apply-tricky.mjs`,
  `append-section.mjs`, `fix-question.mjs`, + `PLAYBOOK.md`. Gold-standard reference:
  `dump.mjs "Python Basics"` / `"Spring Boot REST API & Database"`.
- **Accuracy:** ground every question strictly in the subject's own content; cite the
  lesson's own values for version-drift-prone facts; never assert an unsure fact.
- **Aptitude/Logical/Verbal use separate models** (`AptitudeGroup`, `AptitudeTopic`,
  `LogicalTopic`, `VerbalTopic`, `AptitudeQuestion`) — NOT the `Concept` pipeline.
  Data Interpretation is frontend-only (not DB-seeded).

---

## Concept videos (CRITICAL)

**Search YouTube FIRST. Concept name comes FROM the video — never reverse.**

1. Search topic on YouTube (2022+, focused, trusted channel).
2. Name concept after what the video covers.
3. One video → two related concepts OK if tightly coupled.
4. No video → concept still OK; `videoUrl`/`videoTitle` null.

**Trusted channels:** StatQuest (stats/ML), Alex The Analyst / Keith Galli (pandas/SQL), Guy in a Cube (Power BI), Andrej Karpathy (DL), Hugging Face (NLP), etc.

---

## Missions — 7 rules

Think like a senior dev assigning real work. Student opens editor and starts.

1. Mission = real buildable project.
2. `missionBrief` = what to build + why (real-world context).
3. Objectives = deliverables (4–7), not theory.
4. Prerequisites = accurate; missing one = fail in 30 min.
5. `conceptsCovered` = honest.
6. `commonMistakes` = project-specific.
7. `approachSteps` = 3–6 high-level phases.

**Types only:** `SUBJECT_PRACTICE`, `ROLE_BASED`, `ACADEMIC`.

- ROLE_BASED / ACADEMIC: `techStack: ["Use any tech stack to complete this mission"]`, empty subjectIds.
- Counts (approx): 53 + 25 + 10 = 88 missions; compute `orderIndex` as max+1.

---

## Coding questions (problem-solving tracks)

1. **Two examples mandatory** — different cases (normal + edge).
2. **Approach** = how to think; **Explanation** = code walkthrough.
3. **Three variants:** Brute, Normal, Optimized (or OPT constant if already optimal).
4. **Names:** `"HashMap: Store Complements — O(N)"` not “Optimized”.
5. **Tracks:** START_CODING → PROVE_IT (see track table in this file’s coding-questions section above).
6. CRACK_IT/BUILD_IT: story context, clean I/O, no company/interview labels.

---

## Seeding approach

Add methods directly to `DataSeeder.java` — format known; don’t read existing seeder for content reference.

```java
if (subjectRepository.findAll().stream().noneMatch(s -> "Title".equals(s.getTitle()))) {
    seedSubjectName();
}
```

`conceptRich(subject, title, intro, simple, technical, syntax, examples, keyPoints, tip, mistakes, minutes, orderIndex, rank)`

Restart backend → seeding runs (non-prod admin seed included).

---

## Fresher Guide & Career Guidance tone

- Peer-to-peer — no “15 years experience” or mentor framing.
- Per role: passion fit, AI impact, future outlook, honest hard realities.
- Direct, motivating, like a smart friend who knows the industry.
