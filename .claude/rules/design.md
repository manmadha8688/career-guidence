# Design Rules — LearnToEarn / ARISE

> The single source of truth for how anything visual is built or redesigned.
> When the user says "redesign", "make it impress", "modern layout", "unique", etc. — read this first, then act as the `design-engineer` agent.

---

## 1. Brand + Aesthetic

| Field | Value |
|-------|-------|
| Brand | LearnToEarn (in-app: ARISE) |
| Theme | Solo Leveling anime — dark gaming, "hunter" energy |
| Audience | Indian graduate students (0 → hired), mostly mobile |
| Feeling | Confident, cinematic, a little playful — never corporate/generic |
| Golden test | "Would a student screenshot this and send it to a friend?" |

Aim for **premium and intentional**, not busy. Shock comes from *craft* (motion, spacing, typography, one strong idea) — NOT from loud colors or clutter.

---

## 2. Color — muted base, accent on purpose

- **ALL colors via CSS variables** — `var(--bg-primary)`, `var(--text-primary)`, `var(--ps-card-bg)`, `var(--ps-card-border)`, `var(--ps-muted)`. Never hardcode hex for backgrounds/text.
  - Exceptions (intentional, keep): cinematic loaders, auth left panel.
- **Base surfaces are muted/neutral.** Cards, backgrounds, borders should feel calm and modern. Do NOT flood a section with saturated greens/purples.
- **Accent = one color, small dose.** Use a track/section accent for a number, an icon, one line, a hover glow — the "1 in 10" rule. If everything glows, nothing does.
- **Per-item accents** via a scoped custom prop (e.g. `--floor-color`, `--rift-color`) + `color-mix(in srgb, var(--accent) 12%, var(--ps-card-bg))` so light/dark both work.
- **Gradient text** → `.lp-grad-text` class only. Never inline `background-clip: text`.
- **Light theme is first-class.** Every new surface must be checked in both themes. Prefer `color-mix` over hard opacity so it adapts.

Rank colors (fixed): E `#888`, D `#4ADE80`, C `#60A5FA`, B `#9B6ED4`, A `#F59E0B`, S `#EF4444`.

---

## 3. Typography

| Font | Use |
|------|-----|
| Orbitron | Headings, numbers, ranks, stats, shock lines |
| Rajdhani | Body, buttons, labels |
| Share Tech Mono | Code, metadata, eyebrows, tags |

- Fluid sizing with `clamp()` — e.g. `clamp(1.5rem, 4.5vw, 2.15rem)`.
- Eyebrow/tag pattern: Share Tech Mono, `~0.6rem`, `letter-spacing: 0.16–0.22em`, uppercase, muted.
- Line-height: headings `1.1–1.2`, body `1.5–1.65`.

---

## 4. Spacing + layout

- **Fluid spacing** with `clamp()` for section padding, e.g. `clamp(2.5rem, 6vw, 4rem)`.
- Content wrap: `max-width` 720–960px centered for reading; full-bleed only for hero/immersive stages.
- **Full-width heroes** use a shell (`min-height: calc(100vh - navH)`, flex-center, horizontal `clamp` padding). No cramped inner max-width unless asked.
- 12–16px card radius; pills use `999px`.
- Grid > absolute positioning for structure. Reserve absolute for FX layers (`pointer-events: none`).

---

## 5. Motion (framer-motion is the standard here)

- Library: **framer-motion** (already a dependency). CSS keyframes for ambient/looping FX.
- Standard ease: `const EASE = [0.16, 1, 0.3, 1]`.
- Entrance: `initial={{ opacity: 0, y: 16–48 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.3 }}`, stagger `delay: i * 0.05–0.08`.
- Durations: entrances `0.45–0.65s`; micro-interactions `0.2–0.25s`.
- Hover: subtle lift (`translateY(-4px…-6px)`) + border/glow shift. Tap: `scale: 0.97–0.98`.
- 3D tilt via pointer → `--rx/--ry` custom props or `useTransform` on a motion value.
- **Always** honor `@media (prefers-reduced-motion: reduce)` — kill infinite animations there.
- Don't animate `width/height/top/left` in loops — use `transform`/`opacity`.

---

## 6. Responsive

- Mobile-first. Breakpoints in this codebase: `560px`, `720px`, `900px`, `1100px`.
- Every scroll-pinned / multi-column desktop experience needs a **simpler mobile fallback** (stacked cards or a snap carousel) — never ship a desktop-only interaction.
- Touch targets ≥ 44px. Test at 360px width.

---

## 7. Accessibility (non-negotiable)

- Real semantic elements: `<button>` for actions, `<a>` for navigation, headings in order.
- Every icon-only control has `aria-label`. Decorative FX layers get `aria-hidden="true"`.
- Focus-visible outline using the section accent.
- Text contrast ≥ 4.5:1 in both themes (muted text still must pass).

---

## 8. Component + CSS conventions

- CSS class prefix per feature, kebab-case, BEM-ish: `.gym-path__card`, `.lv-hero__punch`.
- New page-section styles go in the matching file under `src/styles/pages/…`. Don't dump into `global.css`.
- Reuse existing building blocks before inventing new ones (e.g. `GymLoginSquad` reuses the login-bot CSS from `auth-animations.css`).
- Keep JSX data-driven: define a `TRACKS`/`ITEMS` array, `.map()` it — don't hand-write repeated markup.

---

## 9. Signature patterns to reuse

- **Split hero**: copy on one side, animated character/bots on the other; full-width shell. See `lv-hero--split`.
- **Bot conversation** (`GymLoginSquad`): scripted `[{ speaker, text }]` lines, login-style timing (`getLineReadMs`, `LINE_GAP_MS`), `mode="trio" | "duo"`, `clearAfterDone` to stop after the script. Sarcastic-but-encouraging trio: nova (optimist), echo (overthinker), pixel (dry roast).
- **Track/level cards**: data array → animated cards, per-item accent, unique ambient FX per card, staggered reveal, one shared "summit/goal" capstone.

---

## 10. Redesign lessons (hard-won — do NOT repeat)

These come from real user corrections. See `memory/feedback_design_iterations.md` for the full story.

1. **Show all options at once.** Don't hide items behind a scroll-pinned "one at a time" reveal when the user wants to compare/pick. Show all cards.
2. **No forced intro/overlay screens** ("SYSTEM ONLINE", "X DETECTED") unless asked. They read as gimmicks and block content.
3. **Muted > bright.** Default to neutral surfaces; accents are seasoning. When in doubt, tone it down.
4. **Full width when asked** — remove inner max-width wrappers, don't cram to one side.
5. **Remove CTAs/buttons the user didn't ask for.** Don't add "Start practicing" style buttons unprompted.
6. **Match the existing design system**, don't invent a parallel one. Reuse tokens, fonts, motion ease.
7. **One strong idea per section** beats five competing effects.

---

## 11. When acting on a redesign request

1. Read this file + `memory/feedback_design_iterations.md`.
2. Adopt the `design-engineer` persona (senior product designer + React engineer).
3. Restate the intent in one line, propose the concept, then build.
4. Keep the hero/section the user likes untouched unless told otherwise.
5. Data-drive the markup, use CSS vars + framer-motion, add reduced-motion + mobile fallback.
6. Run `npm run build`, fix lints, confirm both themes.
