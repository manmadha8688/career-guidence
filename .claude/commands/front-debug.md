# /front-debug — Frontend Debug Workflow

Step-by-step debugging for any frontend issue.

---

## IDENTIFY THE ISSUE TYPE FIRST

```
A) White screen / crash          → Section 1
B) Data not loading              → Section 2
C) UI stuck in loading state     → Section 3
D) State wrong after action      → Section 4
E) Quiz not working              → Section 5
F) Theme / styling broken        → Section 6
G) Auth / session issue          → Section 7
H) Navigation broken             → Section 8
```

---

## SECTION 1 — White Screen / Crash

```
1. Open browser DevTools → Console tab
   → "ReferenceError: X is not defined"
      Cause: function used but never defined (e.g., toggleQuest was missing)
      Fix: define the function or remove the click handler

   → "Rendered fewer hooks than expected"
      Cause: Rules of Hooks violation (hook after early return)
      Fix: move hooks before any conditional return

   → "Cannot read properties of null/undefined"
      Cause: accessing .property on null
      Fix: add optional chaining: user?.role, data?.items

2. Check React ErrorBoundary:
   → Does app show "Something went wrong" fallback?
   → Means a component threw during render
   → Look at ErrorBoundary.jsx componentDidCatch for the actual error

3. Check if Suspense is waiting forever:
   → Lazy-loaded chunk failing to load?
   → Check Network tab for 404 on .js chunks
   → Verify the file exists at the import path
```

---

## SECTION 2 — Data Not Loading (Empty Page)

```
1. DevTools → Network tab
   → Is the API request being made?
     NO → check useEffect dependency array, check if component mounted
     YES → check response status

2. Check response status:
   → 401 → session expired, re-login
   → 403 → wrong role, check ProtectedRoute
   → 404 → endpoint wrong, check api.js function
   → 500 → backend error, check Render logs
   → CORS error → check CORS_ALLOWED_ORIGINS env var

3. Check sessionStorage cache:
   → DevTools → Application → Session Storage → __sl_api__
   → Is stale data cached? Delete key and refresh to test
   → Or: clearApiCache() in browser console

4. Trace the code path:
   Component useEffect → api.js function → network → backend controller
```

---

## SECTION 3 — Stuck Loading State

```
1. Is setLoading(false) in a finally block?
   grep -n "setLoading\|finally" path/to/component.jsx
   → If NOT in finally → error path skips it → add to finally

2. Did the API call throw silently?
   grep -n "\.catch(() => {})" path/to/component.jsx
   → Silent catch = loading never stops on error
   → Fix: add setLoading(false) in catch or move to finally

3. Did component unmount before effect completed?
   → active flag missing → state update on unmounted component
   → Won't cause infinite load but will cause warnings
```

---

## SECTION 4 — Wrong State After Action

```
1. After quiz pass, dashboard not updating:
   → Check sl:refresh dispatched in QuizResultPage
   → grep -n "dispatchEvent\|sl:refresh" src/pages/student-skill-arena/QuizResultPage.jsx
   → Verify DashboardPage listener: grep -n "sl:refresh" src/pages/student-skill-arena/DashboardPage.jsx

2. After admin creates content, doesn't appear in student view:
   → Frontend cache TTL (2 min for subjects/concepts)
   → Solution: wait 2 min OR clear sessionStorage manually
   → Backend cache evicted immediately but frontend still has old data

3. After enrollment, path still shows "Begin Hunt":
   → enrollRoadmap clears cache for roadmap:{id} and roadmaps
   → Check: api.js enrollRoadmap has clearApiCache() call
   → If cleared, check optimistic update in RoadmapPanel

4. Stale state after logout:
   → clearUserCache() must run on logout
   → grep -n "clearUserCache" src/context/AuthContext.jsx
```

---

## SECTION 5 — Quiz Not Working

```
1. Quiz won't start:
   Check: POST /api/quiz/{type}/{refId}/start → response?
   Check: refId is valid (not undefined/null)

2. Timer not counting:
   Check: QuizPage.jsx - useEffect with [timeLeft] dependency
   Check: Is timeLeft null? (null-timed quiz doesn't start timer)

3. Submit fails silently:
   Check: submitQuiz response in Network tab
   Check: Is submitting=true preventing click? (intended)

4. After pass, XP not updating:
   Check: sl:refresh event fired (QuizResultPage)
   Check: DashboardPage received sl:refresh and called getProgressSummary()
   Check: Backend evicted progress cache after quiz submit
```

---

## SECTION 6 — Theme / Styling Broken

```
1. Colors not switching on theme toggle:
   → Component using inline dark?A:B instead of CSS vars
   → Fix: replace with var(--bg-primary), var(--text-primary) etc.

2. Flash of wrong theme on page load:
   → index.html inline script must set data-theme before first paint
   → grep "data-theme" FrontEnd/index.html
   → Must be in <head> before CSS link

3. Gradient text broken:
   → Must use className="lp-grad-text" CSS class
   → Never inline background-clip: text with data-theme
```

---

## SECTION 7 — Auth / Session Issue

```
1. Always redirected to login:
   → getMe() failing? Check Network → /api/auth/me
   → Cookie not sent? Check withCredentials: true in api.js
   → CORS blocking cookie? Check CORS_ALLOWED_ORIGINS

2. Admin can't access admin pages:
   → user.role must be exactly "ADMIN" (check backend sets this)
   → ProtectedRoute check: user?.role === 'ADMIN'

3. Guest session not persisting:
   → guest_device_id in localStorage?
   → DevTools → Application → Local Storage → guest_device_id
```

---

## SECTION 8 — Navigation Broken

```
1. Browser back/forward broken:
   → ScrollResetter in App.jsx handles scroll, not routing
   → Check React Router version compatibility

2. Route shows blank instead of 404:
   → Catch-all should render <NotFoundPage />
   → grep -n "path=\"\*\"" FrontEnd/src/App.jsx

3. Redirect loop:
   → Check 401 interceptor: window.location.pathname !== '/login'
   → This prevents infinite redirects on the login page itself
```
