---
name: feedback-design
description: Design, theme, and redesign lessons — CSS vars, muted accents, winning page formulas
metadata:
  type: feedback
---

# Design & Theme Feedback

Read with `.claude/rules/design.md` before any redesign.

---

## Golden theme rules

**If it switches on theme, it belongs in CSS — not JSX.**

1. **Backgrounds** → `var(--bg-primary)` etc. Never inline `dark ? '#0C1020' : '#F0F4FF'`.
2. **Gradient text** → CSS class (`.lp-grad-text`, `.mission-title-grad`, `.cg-hero-title`). Never inline `background-clip: text`.
3. **ThemeContext** reads `document.documentElement.getAttribute('data-theme')`, not localStorage (index.html sets theme before React mounts).
4. **Auth left panel** is always dark (`#090E1C`) — enforced in CSS with `[data-theme="light"] .ap-left { background: #090E1C !important; }`.

### Mission-page specifics

- Backgrounds: CSS vars (`var(--mission-page-bg)`), not inline conditionals.
- Mobile hover: `@media (hover: none) { .mission-card { transition: none !important; } }` — prevents touch “popup closing”.
- Navigation: use `navigate(href)`, not `window.location.href` (avoids full reload).

---

## What the user consistently wants

1. **Show all options at once** — no scroll-pinned one-at-a-time reveals.
2. **No forced intro overlays** — no boot-screen gimmicks unless asked (404 cinematic is an exception).
3. **Muted, modern colors** — neutral surfaces; accent is a small dose, not saturated fills.
4. **Full width when asked** — remove inner max-width wrappers.
5. **Only what was requested** — don’t add CTAs unprompted.
6. **Keep parts they like** — never touch a section the user is happy with.
7. **Impress through craft, not noise** — motion + layout + one strong idea.

---

## Winning formulas (by page)

### Hero (Code Gym / general)

- Split hero: left copy, right animated bots (`lv-hero--split`, `lv-hero__shell`).
- Punchlines: paired “Stop X. / Start Y.” — blunt, anti-tutorial-hell.
- Bots: reuse `GymLoginSquad`, login timing, `mode="trio"`, `clearAfterDone`, sarcastic-but-kind tone.

### Tracks / Code Gym gates

- Solo Leveling language: Gate, Rank, Quest, System, Hunter — not “floors”.
- 3-column responsive grid of all five cards, data-driven `GATES` array.
- Per-rank ambient FX; hover lift via framer `whileHover` (not CSS transform on same element).

### Deploy Guidance

- Hub = Launch Stations pipeline hero → sticky station rail → full-width stacked stations.
- Guide detail = Mission Mode: scroll progress, mission map, localStorage step check-off.

### Mission Board

- Hero: “Vibe-code all you want. / The bugs are still yours.”
- Briefing tabs (4 types), chip refine row, dossier cards with rank stamp.

### 404 — Time Rift

- User wants choreographed cinematic sequence on special pages.
- 5-beat director sequence; always-dark void; sarcastic roast copy; reduced-motion fallback.

---

## Process reminders

- Apply feedback literally; iterate quickly on copy + density.
- After visual changes: `npm run build`, verify dark + light.
- Always ship mobile fallback + `prefers-reduced-motion`.
