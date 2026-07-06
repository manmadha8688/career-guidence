---
name: feedback-auth
description: Auth UX — bot conversations, Google OAuth, guest, admin seeding
metadata:
  type: feedback
---

# Auth & Bot Conversation Feedback

---

## Auth page bots (nova / echo / pixel)

- Bots talk among themselves on load, then react to user actions via scenario beats.
- **Tone:** English, dry sarcastic, **kind** — tease playfully, never insulting.
- **Timing:** hide timer on last line display (~2.6s min); never set hide timers inside React setState updaters.
- **Priority:** `GREET` / `FOCUS_PASSWORD` cannot be interrupted by typing/form beats.
- **Play once** — event-driven; no loops (`clearAfterDone` on Code Gym hero).

### Google OAuth beats

Wire in `companionMurmurs.js`: `GOOGLE_CLICK`, `GOOGLE_PROCESSING`, `GOOGLE_SUCCESS`, `GOOGLE_FAILED` (+ register variants). Trigger via `GoogleSignInButton` `onInteract`.

### Mobile bots (required)

- Show on mobile — compact strip above form (`@media max-width:900px`).
- Scale scene ~0.72; anchor side bubbles inward so 3rd bot never overflows.

**Files:** `companionMurmurs.js`, `useSequentialLine.js`, `AuthFormContext.jsx`, `auth-animations.css`, `GoogleSignInButton.jsx`.

---

## Auth architecture reminders

- JWT in **httpOnly cookie** only — never localStorage.
- Cross-origin (Vercel + Render): cookie needs `Secure; SameSite=None`.
- One email = one account; Google links onto existing email.
- Google-only accounts block password login with clear message.
- Guest: `guest_device_id` in localStorage; reuse same guest within window.

---

## Local admin accounts (DataSeeder, non-prod only)

| Email | Password | Role |
|---|---|---|
| `admin@demo.com` | `***REMOVED***` | ADMIN |
| `admin8688@gmail.com` | `***REMOVED***` | ADMIN (main) |

Seeded on backend startup when **not** `prod` profile. Restart local backend after seeder changes.
