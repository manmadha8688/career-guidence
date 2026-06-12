# Memory Index

- [Permissions](feedback_permissions.md) — full file edit/create/delete permission granted, no confirmation needed
- [LearnPath — Full Project Summary](project_learnpath.md) — READ THIS FIRST: vision, stack, DB creds, file structure, all API endpoints, run commands, critical bugs fixed, seed data, CSS system, what's left

Just start a new chat and say:

▎ "Read my project memory and continue LearnPath"

That's all you need. The memory at C:\Users\ManmadhaJayamangala\.claude\projects\C--manmadha-Student-project\memory\project_learnpath.md loads automatically and I'll have full context instantly.

When you start a new chat:
1. Memory file loads automatically (already done before you type anything)
2. You say "continue LearnPath"
3. I read the memory → full context in one shot
4. Ready to code

claude --resume 70419d65-f0a6-4ae1-9172-ba0cc28b6651

 I am building a learning platform for Indian graduate/fresher students called LearnToEarn (ARISE in-app). Before creating anything, read my memory file at C:\Users\ManmadhaJayamangala\.claude\projects\C--manmadha-Student-project\memory\feedback_concept_creation.md — it has the full rules, API structure, and quality standards I expect.
▎
▎ The core mindset:
▎ - Think like a domain expert teaching a student, not filling a template
▎ - Cover the concept fully — length is driven by what the concept needs, not a fixed count
▎ - Not all students learn the same way — use analogies, mental models, step-by-step breakdowns
▎ - No overhyping, no hallucination, no padding
▎ - Quality over quantity — every subject, concept, example, and question must earn its place
▎
▎ For subjects: POST /api/admin/subjects — fill all fields honestly (no hype in overview/whyLearn)
▎
▎ For concepts: POST /api/admin/concepts — include introduction, explanationSimple, explanationTechnical, syntax, examples (2–3 worked examples with title/description/code/output), keyPoints, tip, commonMistakes. Add as many examples/tips/mistakes as the concept genuinely needs.
▎
▎ For questions (DataSeeder): 20 per concept, correct index spread across 0–1–2–3, mix EASY/MEDIUM/HARD, every option plausible, explanation says WHY. Guard: if (questionRepository.countByConceptId("FIRST_CONCEPT_ID") == 0)
▎
▎ Backend is Spring Boot + MongoDB at localhost:8080. Admin login: admin@demo.com / ***REMOVED***.
▎
▎ Now: [your request here — e.g. "add React Intermediate questions in 2 parts"]