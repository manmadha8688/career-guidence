---
name: feedback-product-suggestions
description: During any audit, also do product-level review — missing features, missing page sections, content gaps — not just code
metadata:
  type: feedback
---

Audits must include **product gap analysis**, not just code correctness:

- Missing features that fit the audience (e.g., Resume Builder for students — user explicitly wants this suggested)
- Missing sections on existing pages (e.g., testimonials, FAQ, progress sharing)
- Content gaps per page compared to modern websites
- UX improvements a modern site would have (SEO, social sharing, PWA, offline states)

**Why:** User said "don't just audit code — also check is there any missing section, any content in this page, better to add this feature here — suggest what I'm missing in any page/website."

**How to apply:** Every full audit ends with a "Product Suggestions" section: per-page missing content + platform-level missing features, each marked with effort estimate and value to students.

**Future changes:** Use `/change-check` command for targeted verification after any frontend/backend change — no full re-audit needed. Blast-radius table in that command maps change type → what to verify.
