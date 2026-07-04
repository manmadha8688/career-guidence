# Memory Index — LearnToEarn Project

> Auto-loaded every session. Read this before working. Rules marked ⚡ are always active.

---

## ⚡ Always-Active Rules

- [Full Permissions](feedback_permissions.md) — all edits, creates, deletes, bash — no confirmation needed
- [Auto-Persist to Claude](feedback_claude_system_sync.md) — any new rule/command/info → write to .claude/ immediately, never keep in conversation only

---

## Design & Theme Rules

- [Design System](../rules/design.md) — READ FOR ANY REDESIGN: tokens, muted-base + accent, spacing/motion scale, framer-motion patterns, signature layouts, redesign playbook
- [Design Iterations](feedback_design_iterations.md) — hard-won redesign lessons: show all options, no forced overlays, muted not bright, full width, keep sections the user likes, hero + tracks winning formulas
- [Theme Persistence](feedback_theme_persistence.md) — GOLDEN RULE: backgrounds → CSS vars, gradient text → CSS class, never inline `dark?A:B` for backgrounds
- [Theme — Missions](feedback_theme_missions.md) — mission page gradient text must be CSS class; backgrounds use CSS vars; mobile hover fix; use navigate() not window.location.href

> **Redesign requests** → act as the `design-engineer` agent, run `/front-redesign`.

---

## Content Creation Rules

- [Concept + Subject Rules](feedback_concept_creation.md) — mindset, API fields, no fixed counts, quality over quantity, beginner-progressive
- [Mission Rules](feedback_mission_creation.md) — 7 rules, 3 types (SUBJECT_PRACTICE/ROLE_BASED/ACADEMIC), API fields, Python script, counts
- [Coding Question Rules](feedback_coding_questions.md) — 2 examples mandatory, approach=thinking, explanation=walkthrough, 3 variants, descriptive names
- [Concept Video Rules](feedback_concept_video_rules.md) — CRITICAL: search YouTube FIRST, concept name FROM video, trusted channels by subject
- [Seeding Approach](feedback_seeding_approach.md) — add to DataSeeder directly, format from session knowledge, restart triggers seeding

---

## Technical Lessons

- [Cache Debug](feedback_cache_debug.md) — manual DB edits bypass frontend sessionStorage cache; clear DevTools session storage
- [JSX String Bug](feedback_jsx_strings.md) — NEVER put HTML tags or ${} inside string values in JSX — blank page in Vite
- [Fresher Guide Tone](feedback_fresher_guide_tone.md) — peer-to-peer tone, honest realities, passion/AI/future per role

---

## Project State

- [Full Project Summary](project_learnpath.md) — READ FIRST: vision, stack, DB, endpoints, run commands, architecture, what's done
- [Code Audit Results](project_code_audit.md) — all changes applied June 2026, pending CONFIRM/RISKY items, lint state
- [Production Audit](project_production_audit.md) — READ: health-503 fix, JwtFilter fix, ⚠️ SECRET ROTATION needed, product feature roadmap (Resume Builder #1)
- [Product Suggestions Rule](feedback_product_suggestions.md) — audits include product gaps, not just code; /change-check for targeted future verification
