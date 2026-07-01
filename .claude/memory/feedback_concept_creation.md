---
name: feedback-concept-creation
description: Rules for creating subjects, concepts, and questions — mindset, API fields, quality over quantity, beginner-progressive
metadata:
  type: feedback
---

## Mindset
Think like a domain expert teaching a student — not filling a template. Every sentence must earn its place.

## Core Rules (apply to all content)
1. **Cover fully** — length determined by what the concept needs, not a fixed number
2. **No fixed counts** — examples, tips, mistakes: as many as genuinely help
3. **Beginner-progressive** — meet them where they are, build them up
4. **No overhyping** — no "best framework", "game-changer". State facts.
5. **Don't assume easy understanding** — use analogies, before/after, step-by-step
6. **State the level clearly** — student should know immediately if foundational/advanced
7. **Quality over quantity** — everything must genuinely help understanding
8. **Short intro, detailed explanation** — card intro = 1-2 sentences max

## Subject API Fields
`POST /api/admin/subjects`

`title`, `description` (1 sentence card-friendly), `color` (#hex), `icon` (emoji), `rank` (A-E), `difficulty`, `estimatedHours`, `overview` (2-3 honest sentences), `whyLearn` (real career reason), `forWho`, `prerequisites`, `outcomes` (specific realistic outcomes), `whatYouWillBuild`, `toolsRequired`, `careerUse`

## Concept API Fields
`POST /api/admin/concepts`

- `title` — clear, matches topic
- `subjectId`, `orderIndex`
- `introduction` — 1-2 sentences for card
- `explanationSimple` — plain English, analogies, numbered steps
- `explanationTechnical` — internal mechanics, API details, edge cases
- `syntax` — clean realistic code snippet
- `examples` — `{title, description, code, output}` — as many as needed
- `keyPoints` — most important things to remember
- `tip` — one sharp practical insight
- `commonMistakes` — real mistakes students make
- `rank` (A-E), `estimatedMinutes`

## Question Pattern (DataSeeder)
```java
q.apply(new String[]{ conceptId, "question", "opt0", "opt1", "opt2", "opt3", "correctIndex", "explanation", "EASY/MEDIUM/HARD" })
```
- 20 questions per concept
- Correct index spread: 0,1,2,3 — no predictable pattern
- Every option plausible
- Explanation: WHY the answer is correct
- Guard: `if (questionRepository.countByConceptId("id") == 0)`
