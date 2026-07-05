# Design Audit Skill

Audit the LearnForEarn frontend for visual quality, UX, responsiveness, theming, motion, and accessibility.
Pairs with `.claude/rules/design.md`. Use the `design-engineer` lens.

## Scope

Target: `FrontEnd/src/` — `.jsx` components + `src/styles/**`.
Report **confirmed issues only**, with file + line + minimal fix. No hypotheticals.

## Audit Checklist

### 1. Color + theming
- [ ] No hardcoded hex for backgrounds/text in `.jsx` (allowed only in loaders/auth)
  ```bash
  grep -rn "background:.*#\|color:.*#" FrontEnd/src/pages/ --include="*.jsx" | grep -v "loaders\|auth"
  ```
- [ ] No inline `dark ? '#..' : '#..'` for backgrounds — use CSS vars
- [ ] Gradient text uses `.lp-grad-text`, not inline `background-clip: text`
- [ ] Every new surface verified in BOTH dark and light (prefer `color-mix` over flat opacity)
- [ ] Accent used sparingly (not saturating whole sections)

### 2. Typography
- [ ] Orbitron for headings/numbers, Rajdhani for body, Share Tech Mono for tags/code
- [ ] Font sizes fluid via `clamp()` (no fixed px headings that overflow mobile)
- [ ] Heading order sensible (no skipped levels for style)

### 3. Layout + spacing
- [ ] Section padding fluid (`clamp()`), consistent rhythm
- [ ] Reading content constrained (`max-width`); full-bleed only for hero/stages
- [ ] Grid used for structure; absolute only for `pointer-events:none` FX

### 4. Motion
- [ ] framer-motion entrances use `viewport={{ once: true }}` (no re-trigger jank)
- [ ] Shared `EASE = [0.16,1,0.3,1]`; durations 0.45–0.65s entrance / 0.2–0.25s hover
- [ ] Only `transform`/`opacity` animated in loops (no width/top/left)
- [ ] `@media (prefers-reduced-motion: reduce)` disables infinite animations
  ```bash
  grep -rn "prefers-reduced-motion" FrontEnd/src/styles/
  ```

### 5. Responsive
- [ ] Every desktop-only interaction has a mobile fallback (stack/carousel)
- [ ] Breakpoints coherent (560/720/900/1100)
- [ ] Works at 360px width; no horizontal overflow
  ```bash
  grep -rn "@media" FrontEnd/src/styles/pages/ | grep -o "max-width: [0-9]*px" | sort -u
  ```

### 6. Accessibility
- [ ] Icon-only buttons have `aria-label`
  ```bash
  grep -rn "<button" FrontEnd/src/pages/ --include="*.jsx" | grep -iv "aria-label\|>[A-Za-z]"
  ```
- [ ] Decorative FX layers have `aria-hidden="true"`
- [ ] Actions are `<button>`, navigation is `<a>`/`navigate()` (not clickable divs)
- [ ] Focus-visible styles exist for interactive elements
- [ ] Text contrast ≥ 4.5:1 both themes

### 7. Consistency + reuse
- [ ] New section styles live in `src/styles/pages/…`, not dumped in `global.css`
- [ ] Class names use a feature prefix (kebab-case, BEM-ish)
- [ ] Reused existing components/patterns instead of duplicating (`GymLoginSquad`, split-hero, card grids)
- [ ] Repeated cards are data-driven (`.map()`), not hand-copied markup

### 8. Redesign-lesson regressions (see feedback_design_iterations.md)
- [ ] No scroll-locked "one item at a time" where users need to compare
- [ ] No unrequested intro/overlay screens
- [ ] No unrequested CTA buttons
- [ ] Not overly bright/saturated by default

## Output Format

For each issue:
1. File path + line
2. Category (Color / Type / Layout / Motion / Responsive / A11y / Consistency)
3. Severity: CRITICAL / HIGH / MEDIUM / LOW
4. One-line description
5. Minimal fix
