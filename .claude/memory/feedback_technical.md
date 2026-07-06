---
name: feedback-technical
description: Debugging lessons — frontend cache, Redis L2, JSX parser, deployment headers
metadata:
  type: feedback
---

# Technical Debugging Feedback

---

## Frontend sessionStorage cache

When data looks wrong after a **direct MongoDB edit** (Atlas, Compass), suspect stale **sessionStorage** cache first.

- Cache key namespace: `__sl_api__` in sessionStorage.
- Only busts on app mutations or `sl:refresh` (post-quiz) — not manual DB edits.
- **Fix:** DevTools → Application → Session Storage → delete `__sl_api__`, or close the tab.

---

## Redis L2 → Integer/Long ClassCastException (500)

**Symptom (test/prod, not local):** `/api/subjects`, `/api/subjects/search`, `/api/progress/summary` return 500.

**Cause:** `GenericJackson2JsonRedisSerializer` + `DefaultTyping.NON_FINAL` — cached `long` counts deserialize as `Integer` from Redis.

**Fix:** Use `CacheService.getLong(...)` — never assign cached numbers straight to primitive `long`. Self-healing; no Redis flush needed.

---

## JSX string parser bug (blank page)

Never put HTML tags (`<div>`, `<input>`) or `${var}` inside string values in JSX files (`body: "..."`). Vite misparses → silent blank page.

Use plain text or describe elements as `(div element)`.

---

## Google sign-in COOP warning

`Cross-Origin-Opener-Policy policy would block window.postMessage` — add to `vercel.json`:

```json
{ "key": "Cross-Origin-Opener-Policy", "value": "same-origin-allow-popups" }
```

---

## CSP connect-src (Vercel)

Vercel applies `vercel.json` headers at deploy time — include `https://*.onrender.com` in `connect-src` for all Render backends (test + prod).
