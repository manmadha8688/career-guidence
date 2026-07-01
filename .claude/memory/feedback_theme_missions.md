---
name: feedback-theme-missions
description: Theme switching lessons for Missions page — CSS vars for backgrounds, CSS class for gradient text, mobile hover fix
metadata:
  type: feedback
---

Gradient text in mission pages MUST use a CSS class, not inline style.

**Why:** `background-clip: text` with `WebkitTextFillColor: transparent` as inline React style shows as a solid color block on theme switch.

**How to apply:** Define `.mission-title-grad` in global.css with `[data-theme="light"]` variant. Use `className="mission-title-grad"`. Never use inline background-clip for gradient text.

Page backgrounds must use CSS variables (`var(--mission-page-bg)` etc.) defined in `:root` and `[data-theme="light"]` — NOT inline `light ? ... : ...`. Inline conditionals depend on React re-render rather than instant CSS variable switch.

**Mobile hover fix:** `@media (hover: none) { .mission-card { transition: none !important; } }` — prevents card lift animation from firing on touch (caused "popup closing" effect before navigation).

**Navigation:** Links with `href` property must use `navigate(link.href)` NOT `window.location.href = link.href` — the latter causes a full page reload.
