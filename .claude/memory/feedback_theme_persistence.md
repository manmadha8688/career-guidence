---
name: feedback-theme-persistence
description: GOLDEN RULE — theme-switching colors belong in CSS vars, not inline JSX. Gradient text uses CSS class. Never inline dark?A:B for backgrounds.
metadata:
  type: feedback
---

**THE GOLDEN RULE: If it switches on theme, it belongs in CSS. Not in JSX.**

## Rule 1 — Backgrounds use CSS variables

Never: `style={{ background: dark ? '#0C1020' : '#F0F4FF' }}`
Always: `style={{ background: 'var(--bg-primary)' }}`

Inline `dark ? A : B` only updates on React re-render. The CSS `data-theme` attribute switch is instant — inline styles lag and flash the wrong color.

## Rule 2 — Gradient text uses CSS class

Never: `style={{ background: 'linear-gradient(...)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}`
Always: `className="lp-grad-text"` (defined in global.css)

Inline gradient text shows as a solid color block on theme switch.

**Existing gradient classes to reuse:**
- `.lp-grad-text` — purple gradient (landing page, general headings)
- `.lp-grad-orange` — orange gradient
- `.lp-grad-blue` — blue gradient
- `.mission-title-grad` — mission board title
- `.cg-hero-title` — career guidance title

## Rule 3 — ThemeContext reads from DOM, not localStorage

`useState` initializer reads `document.documentElement.getAttribute('data-theme')` — NOT `localStorage.getItem('theme')`.
The `index.html` inline script sets `data-theme` before React mounts, so DOM is always correct.

## Rule 4 — Auth page left panel is always dark

Left panel uses hardcoded dark values (`#090E1C`, `#E2E8F0`, `#8B9AB8`) — never theme vars.
Right panel uses CSS vars and responds to theme.
Enforced in CSS: `[data-theme="light"] .ap-left { background: #090E1C !important; }`

## Checklist for any new page with theme

1. Page backgrounds → define CSS vars in `global.css` under `:root` + `[data-theme="light"]`
2. Gradient headings → create a CSS class with `[data-theme="light"]` override
3. Never use `light ? '#dark' : '#light'` inline for backgrounds
