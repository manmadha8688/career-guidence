---
name: project-production-audit
description: Full production audit June 2026 — fixes applied, user actions needed (SECRET ROTATION), product feature roadmap
metadata:
  type: project
---

## Fixes applied (2026-06-28, both builds pass)

- **Backend health 503 fix** — `application.properties`: `management.health.redis.enabled=false`. Redis health indicator was making /actuator/health return 503 DOWN on local AND live Render (Redis is optional cache with graceful fallback; must not gate health). Takes effect on next backend restart/deploy.
- **JwtFilter M1** — cookie extraction now falls through to Authorization header when no `jwt` cookie exists (was returning null if ANY cookie present but no jwt cookie).
- **HSTS header** added to vercel.json (`max-age=63072000; includeSubDomains`).
- DashboardPage: typo "Strt"→"Start"; removed dead `activeRoadmap`/`arenaSubjects`/`nextGate` state + unreachable banner branch.

## ✅ User actions DONE (confirmed 2026-07-03)

1. Secrets rotated (Brevo key + Mongo password) ✅
2. Backend redeployed to Render (health fix live) ✅

## Launch pages added (2026-07-03)

- Created `/about`, `/terms`, `/privacy` pages — `AboutPage.jsx`, `TermsPage.jsx`, `PrivacyPage.jsx` at pages/ root
- Shared shell: `components/InfoPageLayout.jsx` + `styles/pages/shared/info-pages.css` (CSS vars, both themes)
- About page: NO anime/Solo Leveling mention — described as "leveling system from beginner to expert" per user instruction
- Contact channel on all 3 pages = in-app Report button + landing feedback form (no email published)
- Wired: App.jsx lazy routes + ROUTE_TITLES; LandingFooter legal row (About/Terms/Privacy); sitemap.xml 3 new URLs

## Verified GOOD (no action)

- All 4 previously-fixed frontend bugs still fixed (toggleQuest, useBodyLock order, active flag, pausing/resuming)
- Backend security: CORS from env, httpOnly+secure cookies, @PreAuthorize coverage, @JsonIgnore password, @Valid on auth DTOs, global exception handler, no hardcoded secrets in Java
- Cache evictions complete for ALL admin mutations
- getProgressSummary + getBulkSubjectStatus: no N+1
- SEO (meta/OG/sitemap/robots/titles), a11y (skip link, focus-visible, reduced-motion), Vercel security headers, Dockerfile — all done
- /api/subjects requires auth on local+prod — INTENTIONAL (only called from protected dashboard)

## Open recommendations (MEDIUM — not yet applied)

- **M2** N+1 in `AdminService.getUserProgress` (~3×N queries; admin-only, low traffic)
- **M3** N+1 in `RoadmapService.getEnrolledRoadmaps` (~5×N queries per enrollment)
- **OG image**: og:image/twitter:image point to favicon.svg — social scrapers need PNG 1200×630
- **PNG icon set**: apple-touch-icon 180px + maskable 192/512 for manifest (iOS ignores SVG)
- **CSP header** — needs allowlist: fonts.googleapis.com, fonts.gstatic.com, unpkg.com (LivePreview), prod.spline.design, backend URL. Risky, test carefully.
- **Error tracking** (Sentry) in ErrorBoundary; offline/network-error UX state
- **L1**: WalkInController uses manual role checks instead of @PreAuthorize (works, inconsistent)
- **L3**: CacheService.evictAll uses Redis KEYS (fine at this scale, switch to SCAN if grows)

## Product feature roadmap (from gap analysis — priority order)

1. **Resume Builder + Profile page** — HIGH value; already advertised in HunterProfileDrawer copy ("Resume") but doesn't exist; auto-fill from badges/XP/missions
2. **Terms/Privacy/About/Contact/FAQ pages** — production/legal blocker, LOW effort
3. **Streak system** — daily quests exist but no consecutive-day tracking; biggest retention lever
4. **Testimonials on landing** — feedback COLLECTION exists but never DISPLAYED; needs display section
5. **Interview-prep module** — HR/behavioral bank + aptitude practice (content pages tell students to do this but platform doesn't host it)
6. **Leaderboard** — XP/rank infra exists, only individual stats exposed
7. **Mission submission flow** — "portfolio piece" promised but no submit/showcase
8. **LinkedIn share** (rank/badge share images), **certificates** on path completion
9. Smaller: bookmarks, global search, notifications
