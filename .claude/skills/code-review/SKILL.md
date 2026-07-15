---
name: code-review
description: LearnForEarn/ARISE-specific code-review conventions. Use when reviewing a diff in THIS repo to catch project-specific violations (CSS-var theming, cache eviction, cookie auth, N+1 baselines, DTO exposure, the JSX string→blank-page gotcha) that a generic review misses. Complements gstack /review — do not repeat generic advice.
---

# Code Review — LearnForEarn / ARISE

This skill is the **project-specific** checklist. Run gstack `/review` for generic
correctness/style; this file covers only what is unique to this codebase and would
otherwise slip through. If a finding is generic (unused var, obvious null deref),
let `/review` own it and don't restate it here.

## Frontend must-flags

### 1. Theming — CSS variables only
- **FLAG** any `dark ? '#xxx' : '#yyy'` (or `theme === 'dark' ? ...`) used for a
  **background, text, or border color**. Backgrounds/text switch via CSS vars
  (`var(--bg-primary)`, `var(--text-primary)`, `var(--ps-card-bg)`, `var(--ps-card-border)`,
  `var(--ps-muted)`), never a JS ternary. Rule: "if it switches on theme, it belongs in CSS."
- **FLAG** inline `background-clip: text` / `-webkit-background-clip: text`. Gradient text
  uses an existing CSS class only: `.lp-grad-text`, `.lp-grad-orange`, `.lp-grad-blue`,
  `.mission-title-grad`, `.cg-hero-title`.
- **Allowed exceptions** (do NOT flag): cinematic loaders in `components/loaders/` and the
  auth page left panels — these intentionally hardcode dark values.
- New section styles belong in `src/styles/pages/…` with a feature class prefix, **not** dumped
  into `global.css`.

### 2. JSX string → Vite blank-page gotcha (high severity)
- **FLAG** any HTML tag (`<div>`, `<br>`, etc.) or `${...}` template-literal expression placed
  **inside a string value** in JSX. This silently produces a blank page in Vite with no error.
  Example to reject: `description: "Use <b>bold</b> and ${x}"`. Move markup to real JSX and
  interpolation outside the quotes.

### 3. Auth — httpOnly cookie only
- **FLAG** any write of a JWT/token to `localStorage`, `sessionStorage`, or React state.
  Auth is httpOnly cookie only; `AuthContext` (populated from `/api/auth/me`) is the sole
  source of truth for the current user.
- **FLAG** direct `axios` import in a page/component — all calls go through `src/api/api.js`.
- `logout()` must preserve `guest_device_id` and `theme` in localStorage; flag a blanket
  `localStorage.clear()` that drops them.

### 4. Caching + lazy routes
- **FLAG** a read `api.get()` that skips `withCache(key, ttl, fn)`.
- **FLAG** a mutation that does not call the matching `clearApiCache(...)` keys after success
  (see `.claude/rules/api-conventions.md` for the key map).
- **FLAG** a new route in `App.jsx` added as an eager import instead of `React.lazy()`.
- No-AppLayout pages (DashboardPage, QuizPage, QuizResultPage, RoadmapDetailPage) must not be
  wrapped in `<AppLayout>`. QuizPage must stay 100vh fixed (no added scroll).
- After a passing quiz, `QuizResultPage` must dispatch the `sl:refresh` custom event.

## Backend must-flags

### 5. Cache eviction on every admin mutation
- **FLAG** any admin/service mutation (`save`, `delete`, update) that does not call
  `cacheService.evict(...)` / `evictAll(...)` for the affected cache names immediately after.
  Missing eviction = stale data for all users until TTL. This is the single most common
  backend regression here.

### 6. N+1 baselines (do not regress)
- `getProgressSummary` must stay **2 DB queries**. **FLAG** any per-subject DB call added inside it.
- `getBulkSubjectStatus` must stay **2 DB queries**. **FLAG** reverting to per-subject loops;
  batch with `findByUserIdAndSubjectIdIn(...)`.
- Subjects/concepts are warmed into Caffeine on startup — **FLAG** querying them in hot paths.

### 7. Layering + DTOs
- Enforce Controller → Service → Repository. **FLAG** a controller with business logic or a
  controller calling a repository directly.
- **FLAG** any response that exposes the `password` field, or `email` in a public/list response.
  Use DTOs; guest names show as `Guest#XXXX`.
- Secrets (`JWT_SECRET`, `CORS_ALLOWED_ORIGINS`, `MONGODB_URI`) must come from env vars —
  **FLAG** any hardcoded value.

## Review output
Report project-specific findings first, ordered by severity (blank-page JSX bug and missing
cache eviction are high). For each: file:line, the rule violated, and the concrete fix.
