---
name: feedback-mission-creation
description: 7 rules + full quick-reference for all 4 mission types — API fields, Python script, current counts (55 total)
metadata:
  type: feedback
---

## Mindset
Think like a senior developer assigning real work to a junior. The student must be able to open a code editor and start immediately.

## The 7 Rules

1. **Mission = real buildable project** — not a topic list. Student opens editor and starts.
2. **missionBrief tells what to build and why it matters** — include real-world context. Never "In this mission you will learn..."
3. **Objectives = deliverables** — concrete checkoff items, not theory. 4-7 objectives.
4. **Prerequisites = accurate and specific** — only what student MUST know. Missing one = fail in 30 min.
5. **conceptsCovered = honest** — only what this project NATURALLY exercises.
6. **commonMistakes = from real experience** — specific to THIS project, not generic warnings.
7. **approachSteps = high-level phases** — 3-6 steps. Student figures out code. Steps prevent paralysis.

## Mission Types

### SUBJECT_PRACTICE
- `subjectIds[]` + `subjectTitles[]` — link to subject(s)
- `techStack[]` — actual technologies (e.g., `["HTML", "CSS"]`)
- Objectives tied to specific concepts from the subject
- orderIndex: 1–33

### ROLE_BASED
- `subjectIds: []`, `subjectTitles: []` — empty
- `techStack: ["Use any tech stack to complete this mission"]` — ALWAYS this exact string
- `targetRoles: ["Role A", "Role B"]` — job roles
- Portfolio-quality domains: Netflix clone, e-commerce, banking, analytics
- orderIndex: 35–45

### ACADEMIC
- `subjectIds: []`, `subjectTitles: []`, `targetRoles: []` — all empty
- `techStack: ["Use any tech stack to complete this mission"]`
- Domains: healthcare, agriculture, education, e-governance, transport
- Impressive enough for viva presentation AND understandable to non-technical professor
- orderIndex: 46–55

### REAL_WORLD
- Same structure as ROLE_BASED
- Industry-grade, beyond college level
- No missions seeded yet

## Current Counts
- SUBJECT_PRACTICE: 33 missions
- ROLE_BASED: 11 missions
- ACADEMIC: 10 missions
- **Total: 55 missions**
- Next orderIndex: 56+

## API Fields
```python
{
  "title": "...",
  "missionBrief": "...",            # 3-5 sentences: problem + real-world context
  "rank": "D|C|B|A",
  "category": "SUBJECT_PRACTICE|ROLE_BASED|ACADEMIC|REAL_WORLD",
  "techStack": [...],
  "estimatedHours": N,
  "subjectIds": [], "subjectTitles": [],
  "targetRoles": [],
  "learningOutcome": "...",         # 1 sentence: what student can do after
  "prerequisites": [...],
  "conceptsCovered": [...],
  "objectives": [...],              # 4-7 concrete deliverables
  "bonusObjectives": [...],
  "approachSteps": [...],           # 3-6 high-level phases
  "hints": [...],
  "commonMistakes": [...],          # 3-5 real specific mistakes
  "published": true,
  "orderIndex": N
}
```

## Python Seeding Script Pattern
```python
import urllib.request, json, sys
TOKEN = sys.argv[1]
BASE = "http://localhost:8080"
TECH = ["Use any tech stack to complete this mission"]

def post(body):
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(f"{BASE}/api/admin/missions", data=data, method="POST",
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r:
        d = json.load(r)
        print(f"  OK {d['rank']} - {d['title']} ({d['id']})")
```
