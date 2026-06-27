# /front-fix — Fix Any Frontend Issue

Identify → trace → fix. Step-by-step for every React issue in this project.

---

## IDENTIFY YOUR ISSUE

```
A) White screen / app crashed         → Section 1
B) Page blank, data not showing       → Section 2
C) Loading spinner never stops        → Section 3
D) Wrong data / stale state           → Section 4
E) Quiz broken                        → Section 5
F) Auth / login / session broken      → Section 6
G) Theme / styles broken              → Section 7
H) Navigation / routing broken        → Section 8
I) Modal not opening or not closing   → Section 9
J) Dashboard panels not loading       → Section 10
```

---

## SECTION 1 — White Screen / App Crashed

**Step 1 — Check browser console:**
```
ReferenceError: X is not defined
→ A function is called but never defined
→ Example was: toggleQuest — was in DashboardPage onClick but not defined
→ Fix: remove the onClick or define the function

Rendered fewer hooks than expected
→ Hook called after early return (Rules of Hooks violation)
→ Check modals: useBodyLock() must be BEFORE any if (!x) return null
→ Fix: move all hooks above the first conditional return

Cannot read properties of null/undefined
→ Accessing .property on null
→ Fix: add optional chaining: user?.role, data?.items, concept?.title

Objects are not valid as a React child
→ Passing an object where JSX expects string/number
→ Fix: render the specific field: {obj.name} not {obj}
```

**Step 2 — Check ErrorBoundary:**
```
→ Does page show "Something went wrong" fallback?
→ That means a component threw during render
→ Open browser console for the actual error
→ ErrorBoundary.jsx catches it — check componentDidCatch log
```

**Step 3 — Lazy loading issues:**
```bash
# Check the lazy import path exists
grep -n "lazy(" FrontEnd/src/App.jsx | head -10
# For each lazy import — verify the file exists at that path

npm run build 2>&1 | grep "error"
# → Build errors show broken imports immediately
```

---

## SECTION 2 — Data Not Showing (Blank Page)

**Step 1 — Network tab:**
```
Open DevTools → Network → look for API calls
→ Is the request being made?
   NO → check useEffect dependency array, component mounted?
   YES → what is the status code?

200 → data returned but not rendered → check JSX conditional
401 → session expired → re-login
403 → wrong role
404 → wrong endpoint URL
500 → backend error → check Render logs
CORS error → CORS_ALLOWED_ORIGINS mismatch
```

**Step 2 — SessionStorage cache:**
```
DevTools → Application → Session Storage → __sl_api__
→ Is there a stale cached value for this key?
→ Delete the key and refresh to force fresh fetch

Or clear all frontend cache:
→ Open console: sessionStorage.removeItem('__sl_api__')
```

**Step 3 — Check the API call exists:**
```bash
grep -n "getMissions\|getSubjects\|getProblems" FrontEnd/src/api/api.js
# → Verify the function exists and matches the backend endpoint
```

---

## SECTION 3 — Infinite Loading Spinner

**Root cause: `setLoading(false)` not in `finally` block**

```bash
# Find the loading reset in the broken component
grep -n "setLoading\|finally" FrontEnd/src/pages/MissionsPage.jsx
# → setLoading(false) must be in .finally(() => ...) NOT in .then()
```

**Fix pattern:**
```js
// WRONG — loading stays true if API fails:
getMissions().then(r => {
  setMissions(r.data)
  setLoading(false)  // ← skipped on error!
})

// CORRECT — always resets:
getMissions()
  .then(r => setMissions(r.data))
  .catch(() => toast.error('Failed to load'))
  .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
```

---

## SECTION 4 — Wrong Data / Stale State

**After admin creates content — not appearing:**
```
→ Backend cache evicted immediately ✓
→ Frontend sessionStorage still has old data (TTL: 2 min for subjects/concepts)
→ Solution: wait 2 minutes OR clear sessionStorage manually
→ Hard refresh (Ctrl+F5) clears sessionStorage in most browsers
```

**After completing concept — progress not updating:**
```bash
# Check sl:refresh is dispatched from QuizResultPage on pass
grep -n "dispatchEvent\|sl:refresh" \
  FrontEnd/src/pages/student-skill-arena/QuizResultPage.jsx
# → Must dispatch on passing score

# Check DashboardPage listens for it
grep -n "sl:refresh" \
  FrontEnd/src/pages/student-skill-arena/DashboardPage.jsx
# → Must have window.addEventListener('sl:refresh', ...)
```

**Old concept showing when new one clicked (race condition):**
```bash
grep -n "let active\|active = false" \
  FrontEnd/src/pages/student-skill-arena/panels/ConceptInlinePanel.jsx
# → Must have active flag to cancel stale response
# Fix already applied — if missing, add:
# let active = true
# .then(([c, qs]) => { if (!active) return; setState... })
# return () => { active = false }
```

---

## SECTION 5 — Quiz Broken

**Quiz won't start:**
```bash
# Check the quiz start endpoint
curl -b cookies.txt -s -X POST \
  http://localhost:8080/api/quiz/concept/CONCEPT_ID/start | python -m json.tool
# → Is refId valid? Is user authenticated?
```

**Timer not working:**
```bash
grep -n "timeLeft\|setInterval\|setTimeout" \
  FrontEnd/src/pages/student-skill-arena/QuizPage.jsx
# → Timer only starts when timeLeft !== null
# → Subject/roadmap quizzes have timers; concept quizzes do not
```

**Submit button does nothing:**
```bash
grep -n "submitting\|handleSubmit\|disabled" \
  FrontEnd/src/pages/student-skill-arena/QuizPage.jsx
# → Button disabled while submitting — is submitting stuck true?
# → Check: is submitQuiz() throwing? Is the finally block resetting it?
```

**After passing — XP / dashboard not updating:**
```
1. QuizResultPage dispatches sl:refresh only on PASS
2. DashboardPage listener must be active (not unmounted)
3. Backend must have evicted progress cache after quiz submit
→ Check all three
```

---

## SECTION 6 — Auth / Login Broken

**Always redirected to login:**
```
1. Open DevTools → Network → GET /api/auth/me
   → 200 → user is set, check ProtectedRoute logic
   → 401 → cookie expired or not sent
   → CORS error → check CORS_ALLOWED_ORIGINS backend env var

2. Check cookie exists:
   DevTools → Application → Cookies → SESSION_TOKEN
   → Missing? → login didn't set it → check backend response headers

3. Check withCredentials:
```
```bash
grep -n "withCredentials" FrontEnd/src/api/api.js
# → Must be: axios.create({ withCredentials: true })
```

**Redirect loop (stuck between /login and redirect):**
```bash
grep -n "pathname.*login\|pathname.*'/login'" FrontEnd/src/api/api.js
# → 401 interceptor must check: window.location.pathname !== '/login'
# → This prevents infinite redirect on the login page itself
```

---

## SECTION 7 — Theme / Styles Broken

**Colors not switching:**
```bash
# Find inline theme-conditional colors (should be CSS vars instead)
grep -rn "dark ?.*'#\|theme.*'#" FrontEnd/src/pages/ --include="*.jsx" | \
  grep "background\|color" | grep -v "//\|loaders\|auth"
# → These should be var(--bg-primary), var(--text-primary) etc.
```

**Flash of wrong theme on load:**
```bash
grep "data-theme" FrontEnd/index.html
# → Must be an inline <script> in <head> that sets data-theme BEFORE css loads
# → Check: (function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();
```

**Gradient text broken:**
```bash
grep -rn "background-clip.*text\|WebkitBackgroundClip" FrontEnd/src/pages/ --include="*.jsx"
# → Should be className="lp-grad-text" not inline background-clip
```

---

## SECTION 8 — Navigation / Routing Broken

**Route returns 404 on refresh:**
```bash
cat FrontEnd/vercel.json
# → Must have: "rewrites": [{"source": "/(.*)", "destination": "/index.html"}]
# → Missing = every route except / fails on direct access
```

**Catch-all shows blank instead of 404:**
```bash
grep -n 'path="\*"' FrontEnd/src/App.jsx
# → Must render <NotFoundPage /> not <Navigate to="/" replace />
```

**Back button broken after navigation:**
```bash
grep -n "ScrollResetter\|useNavigationType" FrontEnd/src/App.jsx
# → ScrollResetter handles scroll, not routing
# → Check React Router v6 compatibility
```

---

## SECTION 9 — Modal Not Working

**Modal won't open:**
```bash
# Check the state that controls modal visibility
grep -n "setAboutGate\|setAboutRoadmap\|setQuizIntent\|setOpen" \
  FrontEnd/src/pages/student-skill-arena/DashboardPage.jsx | head -10
# → Is the setter being called on click?
# → Is the state being read in JSX: {aboutGate && <AboutGateModal />}
```

**Body still locked after modal closes:**
```bash
grep -n "useBodyLock\|overflow" \
  FrontEnd/src/pages/student-skill-arena/modals/AboutGateModal.jsx
# → useBodyLock cleanup runs on unmount: return () => { document.body.style.overflow = '' }
# → If modal is not unmounting (still in DOM), body stays locked
```

---

## SECTION 10 — Dashboard Panels Not Loading

**SubjectPanel / ConceptPanel stuck loading:**
```bash
grep -n "setLoading\|finally\|active" \
  FrontEnd/src/pages/student-skill-arena/panels/SubjectPanel.jsx
# → Must have: finally block + active flag
```

**Wrong concept shown after clicking fast:**
```bash
grep -n "let active" \
  FrontEnd/src/pages/student-skill-arena/panels/ConceptInlinePanel.jsx
# → active flag prevents stale response overwriting new state
# → If missing: add it (see Section 4 fix pattern)
```

**RoadmapPanel pause/resume stuck:**
```bash
grep -n "pausing\|resuming" \
  FrontEnd/src/pages/student-skill-arena/panels/RoadmapPanel.jsx
# → Must have BOTH: pausing state AND resuming state (separate)
# → Single flag causes both to block each other
```
