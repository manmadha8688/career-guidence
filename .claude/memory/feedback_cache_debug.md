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
