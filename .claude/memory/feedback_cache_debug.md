---
name: feedback-cache-debug
description: Manual DB edits bypass sessionStorage cache — stale data appears until cache is cleared manually
metadata:
  type: feedback
---

When content looks wrong or stale after a direct MongoDB edit (Atlas UI, Compass, scripts), it's the frontend sessionStorage cache serving old data.

**Why:** `api.js` sessionStorage cache only busts on app-triggered admin mutations or `sl:refresh` (post-quiz). Direct DB changes bypass cache invalidation entirely.

**How to apply:** When debugging "wrong data in frontend after DB change" — always suspect cache first.

Fix: open DevTools → Application → Session Storage → delete `__sl_api__` key, or close/reopen the browser tab (sessionStorage is tab-scoped and clears on tab close).

---

## Redis L2 turns cached counts into `Integer` → 500 (ClassCastException)

**Symptom (test/prod only, never local):** endpoints that read a cached concept count 500 with the generic `"Something went wrong. Please try again."` — e.g. `/api/subjects`, `/api/subjects/search`, `/api/progress/summary`. Endpoints that don't read a count work (`/api/roadmaps`, `/api/search`, `/api/progress/hunter-stats` when the user has no badges).

**Root cause:** `CacheConfig` uses `GenericJackson2JsonRedisSerializer` with `DefaultTyping.NON_FINAL`. `java.lang.Long` is `final`, so no `@class`/type tag is written — the cached `long` count round-trips back from Redis as a bare JSON number and deserializes as `Integer`. Reading it into a `long` (`long total = cacheService.get(...)`) emits a `checkcast Long`, which throws `ClassCastException` on the `Integer`. It only bites when the value is served from Redis L2 (after restart / Caffeine eviction) — local dev is Caffeine-only, so it never reproduces there.

**Fix:** read numeric caches via `CacheService.getLong(name, key, supplier)`, which coerces through `Number.longValue()` and tolerates either box type. Self-healing for already-poisoned entries — no Redis flush needed. Never read a standalone cached number straight into a primitive `long`/`int`.

**Also:** Google sign-in popup logs `Cross-Origin-Opener-Policy policy would block the window.postMessage call` — fixed by adding `Cross-Origin-Opener-Policy: same-origin-allow-popups` header in `vercel.json`.
