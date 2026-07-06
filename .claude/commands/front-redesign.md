# /front-redesign — Redesign or Restyle a UI Section

Use when the user wants to redesign, restyle, modernize, or "make impressive/unique" any part of the frontend.
Act as the **`design-engineer`** agent (senior product designer + React developer).

**Read first:** `.claude/rules/design.md` → `.claude/memory/feedback_design.md` → `.claude/rules/frontend.md`.

---

## STEP 0 — Lock the scope

```
- WHAT exactly is being redesigned? (one component/section)
- WHAT stays untouched? (heroes/sections the user likes — do NOT touch)
- WHAT feeling do they want? (impress / calm-modern / playful / minimal)
- Any hard constraints? (muted colors, full width, all items visible, no buttons)
```

Restate the intent in one line before building. If the target is ambiguous, ask once.

---

## STEP 1 — Concept (brief, then build)

Decide the ONE signature idea for the section (a motion, a layout twist, a character moment).
Everything else stays calm to make that idea land. Sketch mentally:

```
- Layout:      grid? split? list? stage?
- Hierarchy:   what does the eye hit 1st / 2nd / 3rd?
- Accent:      which single color per item, used where (number/icon/hover)?
- Motion:      entrance + one hover/tilt interaction
- Mobile:      the simpler fallback (stack / snap carousel)
```

---

## STEP 2 — Build (data-driven React)

```jsx
const EASE = [0.16, 1, 0.3, 1]
const ITEMS = [ /* one object per card — title, accent, copy, fx */ ]

// map ITEMS → motion cards. No copy-pasted markup.
<motion.article
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
/>
```

**Checklist:**
- [ ] Items in an array, rendered with `.map()`
- [ ] Reuse existing components before making new ones (`GymLoginSquad`, split-hero, etc.)
- [ ] Icon-only buttons have `aria-label`; FX layers have `aria-hidden="true"`
- [ ] Real `<button>`/`<a>` semantics

---

## STEP 3 — Style (CSS file + tokens)

```
- New styles → correct file in src/styles/pages/… (NOT global.css)
- Feature class prefix, kebab-case: .feature__part
- Colors: var(--…) only. Per-item accent via --accent + color-mix()
- Fluid: clamp() for font-size + section padding
- Fonts: Orbitron (headings/numbers), Rajdhani (body), Share Tech Mono (tags)
```

**Both themes:** verify dark + light. Prefer `color-mix(in srgb, var(--accent) 8%, var(--ps-card-bg))` over flat opacity.

---

## STEP 4 — Motion + responsive + a11y

- [ ] Entrance reveal with stagger; hover lift + accent shift; tap `scale: 0.97`
- [ ] `@media (prefers-reduced-motion: reduce)` disables infinite animations
- [ ] Only `transform`/`opacity` animated in loops
- [ ] Mobile fallback present (`900px`/`720px`/`560px` breakpoints)
- [ ] Touch targets ≥ 44px, works at 360px width

---

## STEP 5 — Verify

```bash
cd FrontEnd
npm run build 2>&1 | tail -5     # ✓ built, no errors
npm run lint 2>&1 | grep error   # 0 new errors
```

- [ ] Dark + light both correct
- [ ] Untouched sections still intact
- [ ] No unrequested buttons/overlays added

---

## DON'T (redesign-specific)

- Don't hide items behind scroll-locked "one at a time" when the user wants to pick/compare.
- Don't add intro/overlay gimmicks unless asked.
- Don't default to bright/saturated fills — muted base, accent on purpose.
- Don't invent a parallel design system — reuse tokens + patterns.
- Don't touch the hero/section the user said they like.

---

## OUTPUT

1. One-line intent + the concept (1–2 sentences).
2. Files changed.
3. What the user might want to tweak (copy length, accent, density) — offer to adjust.
