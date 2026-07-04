---
name: feedback-design-iterations
description: Hard-won design lessons from real user corrections during redesign work (Code Gym / Problem Solving hero + tracks). Read before any redesign.
metadata:
  type: feedback
---

# Design Iteration Lessons

Real corrections the user made while redesigning the **Code Gym / Problem Solving** page.
These are patterns to follow and mistakes never to repeat. Full rules: `.claude/rules/design.md`.

## What the user consistently wants

1. **Show all options at once.** A scroll-pinned "one gate/dimension at a time" experience was rejected ("its only showing one gate"). When users pick or compare tracks/plans/options → render ALL of them, visible together.
2. **No forced intro/overlay screens.** An overlay ("FIVE DIMENSIONS DETECTED" / "SYSTEM ONLINE") was explicitly removed. No boot-screen gimmicks unless asked.
3. **Muted, modern colors — not bright.** "dont use bright colors use modern layout." Neutral surfaces via CSS vars; accent color is a small dose (number, icon, hover glow), never a saturated fill across a section.
4. **Full width when asked.** Remove inner max-width wrappers; don't cram content to one side.
5. **Only what was requested.** Removing the hero CTA button was explicitly asked ("remove button in hero"). Don't add CTAs/buttons unprompted.
6. **Keep the parts they like.** The hero (punchlines + bots) was to stay while only the tracks section changed. Never touch a section the user is happy with.
7. **Impress through craft, not noise.** "feel shock … how he can do design like this" was satisfied by strong motion + layout + one idea — and the later muted version was preferred once the flashy one was too much. Craft > loudness.

## Hero — the winning formula

- **Split hero, full-width shell**: left = copy, right = animated bots. Class `lv-hero--split` + `lv-hero__shell` (`min-height: calc(100vh - 52px)`, flex-center).
- **Punchline copy** the user loved: paired "Stop X. / Start Y." lines
  (Stop taking notes → Start making mistakes; Stop planning to practice → Start practicing badly).
  Tone: blunt, motivating, anti-tutorial-hell.
- **Bot conversation = login style.** Reuse `GymLoginSquad` with `[{ speaker, text }]`, login timing (`getLineReadMs`, `LINE_GAP_MS`, `BEAT_TAIL_MS`), `mode="trio"`, and `clearAfterDone` so it plays once and stops.
  - Personalities: **nova** optimist, **echo** overthinker (stats), **pixel** dry roast.
  - Start with a welcome, run a sarcastic-but-kind exchange, then go quiet.
- Bare bots in hero: `gym-login-scene--bare` (no card bg/border/glow) + `gym-login-scene--hero`.

## Tracks section — the winning formula (current)

- Order below the hero: **Gate grid → ticker → method** (`GymTrackPath` renders `GymGates`, `GymTicker`, `GymMethod`).
- **Solo Leveling "System" theme** — the user explicitly rejected "floors" and the vertical climb-rail. Use anime/System language: **Gate, Rank (E/D/C/B/A/S), Quest, System, Hunter, Monarch, Arise**.
- **3-column responsive grid** (`.gym-gates__grid`: 3 → 2 → 1 cols) of all five cards, data-driven from a `GATES` array.
- Each card (`.gym-gate`, whole card is a `motion.button`): big glowing rank letter, `SYSTEM · …` label, floating icon, punchy hero-style one-liner, sarcastic desc, dashed **QUEST** line, mono skill chips, "Enter the Gate" CTA.
- **Per-rank ambient FX that intensify with level** — E awaken pulse, D rising dot-field, C scan line, B orbit ring, A aura + shimmer (`.gym-gate--{e,d,c,b,a} .gym-gate__fx`).
- Accent per card via `--rank` + `color-mix`; muted base surfaces (`--ps-card-bg`, `--ps-card-border`).
- Hover lift via framer `whileHover` (NOT CSS transform — framer's inline transform overrides CSS `:hover` transform); CSS `:hover` handles border/shadow/gap only.
- Copy tone matches hero: blunt, sarcastic, anti-tutorial-hell.

### Superseded ideas (rejected)
- Zigzag floor cards with `--floor-color` and "FLOOR n" wording → user wanted Solo Leveling theme, no "floors".
- Vertical scroll-linked climb rail (progress fill + orb) → replaced by the 3-column gate grid.

## Deploy Guidance — the winning formula (July 2026 full redesign)

- User rejected incremental hero-only change AND the old 3-column utility layout (left filter | cards | right platforms) — wanted "complete redesign, whole pages inside and whole folder."
- **Hub = "Launch Stations"**: LaunchPipeline hero (CODE → PUSH → BUILD → ● LIVE with flowing connectors + radar pulse on LIVE) → sticky station rail (numbered chips 01-06, scroll-spy active state, search) → vertically stacked full-width stations (01 Frontend → 02 Full Stack → 03 Backend → 04 AI & ML → 05 Databases → 06 Free Hosting Arsenal), each with big ghost number, accent color, tagline, card grid. All cards always visible.
- **Guide detail = "Mission Mode"**: fixed thin scroll-progress bar (stack color, framer useScroll+useSpring scaleX) → header progress badge (⚡ X/Y steps · Z%) → clickable mission map (phase dots, ✓ fill when phase complete) → per-step check-off circles persisted in localStorage (`deploy_done_{stackId}`) → phase banners show live X/Y counters → completion celebrate state on the done card.
- Files: DeploymentGuidePage.jsx (rewritten), deployment/GuideLayout.jsx (rewritten), styles/pages/shared/deployment-stations.css (new, imported after deployment.css in shared/index.css).
- Old hub-only CSS (sidebar/filter-btn/banner/hub-layout/search-wrap/stack-grid/section-label/platform-list blocks in deployment.css) is now dead — safe to prune in a cleanup pass.

## Mission Board — the winning formula (July 2026 redesign)

- User wanted: attract/impress students, motivate REAL-WORLD builds, and say explicitly "vibe-coding is fine but you must know concepts + find/fix bugs yourself."
- **Hero = the AI-era honest pitch**: paired punchlines "Vibe-code all you want. / The bugs are still yours." (line 2 uses `.mission-title-grad`), sub reinforces concept+debug ownership, stats strip (N live missions · 3 types · 100% portfolio-grade).
- **Briefing tabs replace dropdowns**: 4 large selectable cards (All ⚡ / Subject 📘 / Role-Based 💼 / Academic 🎓) each with icon, one-liner, live count badge, per-tab accent. Data-driven from BRIEFINGS array.
- **Refine row**: subject/role dropdown → horizontal chip row (all visible, scrollable); search inline; count on right.
- **Dossier cards** (`.mb-card`): rotated rank stamp (straightens on hover), rank label + hours, 3-line-clamp brief, tech chips, dashed footer with "◇ N objectives" + "ACCEPT MISSION →" slide-in on hover, shine sweep. Framer entrance stagger + whileHover lift. `@media (hover:none)`: CTA always visible, shine off.
- Files: MissionsPage.jsx (rewritten, logic preserved), styles/pages/shared/missions-board.css (new). Old MissionSelect/MissionCard markup removed; old board styles in missions.css partially dead — prune later.

## Process reminders

- Iterate on copy + density quickly; the user gives tight, specific feedback — apply it literally, don't over-interpret.
- After each visual change: `npm run build`, verify dark + light.
- Always ship a mobile fallback and `prefers-reduced-motion` handling.
