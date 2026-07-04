# Auth bot conversation feedback

- Auth page bots (nova/echo/pixel) should talk among themselves first on page load, then react to user actions with scenario-specific beats.
- Tone: English, dry sarcastic — not generic helper copy.
- Reading time: hide timer arms on **last line display**, not beat start; min ~2.6s per line.
- Never set hide timers inside React `setState` updaters (caused orphan timers cutting beats short).
- Beat priority: `GREET` / `FOCUS_PASSWORD` cannot be interrupted by `TYPING_*` / `EMAIL_VALID` / `FORM_VALID`.
- Password click: full 5-line skit — nova+echo eyes shut, pixel peeks, nova "No.", pixel "Fine. Okay. Eyes shut." → pixel covers eyes.
- Quick email return after password: `dismissCompanion()` then `EMAIL_RETURN_QUICK`.

## Tone rule (auth + Code Gym)
- Sarcastic but **kind** — bots tease the student playfully, never mean/insulting. Avoid jabs at the person ("wrong life choices", "useless", "Tutorial Hell", "zero output"). Frame teasing as "we've all been there" encouragement.
- Conversations **play once on display, never loop** (Code Gym hero uses `clearAfterDone`; auth is event-driven — `GREET` once on mount, then reactive beats).

## Mobile bots (required)
- Auth bots MUST show on mobile too (login/register/forgot). Do NOT `display:none` the leading col.
- Pattern: reveal `.auth-stage-col--leading` as a compact strip above the form (`grid-template-rows: auto minmax(0,1fr)`), `.login-scene-center { transform: scale(~0.72) }`, hide desk/arc/grid, bump `.login-manga-bubble-text` font to offset the scale, and anchor side-bot bubbles inward (`--glitch` → right:0, `--byte` → left:0) so the 3rd bot's bubble never overflows. Desktop untouched (changes live only inside `@media (max-width:900px)`).

Implemented in: `companionMurmurs.js`, `useSequentialLine.js`, `AuthFormContext.jsx`, auth form focus handlers, `MangaSpeechBubble.jsx`, `LoginAnimation.jsx`, `auth-animations.css` (mobile strip), `ProblemSolvingPage.jsx` (Code Gym hero convo).
