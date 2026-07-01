# Auth bot conversation feedback

- Auth page bots (nova/echo/pixel) should talk among themselves first on page load, then react to user actions with scenario-specific beats.
- Tone: English, dry sarcastic — not generic helper copy.
- Reading time: hide timer arms on **last line display**, not beat start; min ~2.6s per line.
- Never set hide timers inside React `setState` updaters (caused orphan timers cutting beats short).
- Beat priority: `GREET` / `FOCUS_PASSWORD` cannot be interrupted by `TYPING_*` / `EMAIL_VALID` / `FORM_VALID`.
- Password click: full 5-line skit — nova+echo eyes shut, pixel peeks, nova "No.", pixel "Fine. Okay. Eyes shut." → pixel covers eyes.
- Quick email return after password: `dismissCompanion()` then `EMAIL_RETURN_QUICK`.

Implemented in: `companionMurmurs.js`, `useSequentialLine.js`, `AuthFormContext.jsx`, auth form focus handlers, `MangaSpeechBubble.jsx`, `LoginAnimation.jsx`.
