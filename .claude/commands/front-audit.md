# /front-audit — Deep Frontend Production Audit

Behavior correctness audit. Think: "This goes live tomorrow — what can break?"
Covers: auth flow, state, async bugs, race conditions, loading states, edge cases, security.

---

## TASK 1 — Auth & Session Flow

**Login:**
```bash
# Trace LoginPage.jsx handleSubmit
grep -n "handleSubmit\|setLoading\|finally\|navigate" \
  FrontEnd/src/pages/auth/LoginPage.jsx
```
- [ ] Loading resets in `finally` (not just `.then`)
- [ ] Duplicate submission prevented (button disabled while loading)
- [ ] Admin → `/admin-skill-arena`, Student → `/skill-arena/dashboard`
- [ ] Failed login shows error, not stuck loader

**Session restore (page refresh):**
- [ ] AuthContext `getMe()` on mount → sets user or null
- [ ] ProtectedRoute: loading=true → shows loader, NOT redirect
- [ ] ProtectedRoute: user=null + loading=false → redirects to `/login?redirect=...`
- [ ] No flash of wrong content between load states

**Logout:**
```bash
grep -n "logout\|localStorage\|clearUserCache" FrontEnd/src/context/AuthContext.jsx
```
- [ ] `localStorage.clear()` then restores `guest_device_id` and `theme`
- [ ] `clearUserCache()` clears all user API cache
- [ ] `window.location.href = '/'` forces full state reset

---

## TASK 2 — API Error Handling

For every page with API calls, check mentally:

**Network failure:**
- [ ] `.catch()` shows toast or error message — NOT `.catch(() => {})`
- [ ] Loading state resets even on network failure
- [ ] User sees actionable message (not blank screen)

**Specific catches to verify:**
```bash
grep -rn "\.catch(() => {})" FrontEnd/src/pages/ --include="*.jsx"
# → Should return 0 after fixes
grep -rn "\.catch(() => toast" FrontEnd/src/pages/ --include="*.jsx"
# → MissionsPage, MissionDetailPage should be here
```

---

## TASK 3 — Loading States

```bash
# Every page with API calls must have loading state
grep -rn "setLoading\|useState(true)" FrontEnd/src/pages/ --include="*.jsx" | grep "true"
```

- [ ] Loading shows immediately (not after 300ms)
- [ ] Loading stops on error AND success (must be in `finally`)
- [ ] Empty state shown when `data.length === 0` (not just blank)
- [ ] No infinite loader (if setLoading(false) in finally — check)

**Check DashboardPage panels specifically:**
```bash
grep -n "setLoading\|finally" \
  FrontEnd/src/pages/student-skill-arena/panels/ConceptInlinePanel.jsx
grep -n "setLoading\|finally" \
  FrontEnd/src/pages/student-skill-arena/panels/SubjectPanel.jsx
```

---

## TASK 4 — State Consistency

**After navigation:**
- [ ] Tab change in Dashboard resets relevant panel state
- [ ] Navigating to a new concept resets tab to 'simple'
- [ ] Modals close correctly and don't leave body locked

**After logout:**
- [ ] No stale user data in sessionStorage (clearUserCache clears it)
- [ ] Dashboard shows empty/loader on re-login, not previous user's data

**Daily quests:**
```bash
grep -n "toggleQuest\|DAILY_QUESTS" \
  FrontEnd/src/pages/student-skill-arena/DashboardPage.jsx
# → toggleQuest must NOT appear (was a crash bug — was fixed)
```

---

## TASK 5 — Race Conditions

**ConceptInlinePanel rapid clicking:**
```bash
grep -n "let active\|active = false" \
  FrontEnd/src/pages/student-skill-arena/panels/ConceptInlinePanel.jsx
# → Must show: let active = true + return () => { active = false }
```

**RoadmapPanel pause/resume:**
```bash
grep -n "pausing\|resuming" \
  FrontEnd/src/pages/student-skill-arena/panels/RoadmapPanel.jsx
# → Must show BOTH: pausing state AND resuming state (separate flags)
```

**QuizPage timer:**
```bash
grep -n "timeLeft\|setTimeout\|setInterval" FrontEnd/src/pages/student-skill-arena/QuizPage.jsx
# → Timer cleanup on unmount?
```

---

## TASK 6 — Event Cleanup

```bash
# All event listeners must have cleanup
grep -rn "addEventListener" FrontEnd/src/ --include="*.jsx" | grep -v "removeEventListener"
# → Each result: verify the removeEventListener exists in cleanup return

# All intervals must be cleared
grep -rn "setInterval" FrontEnd/src/ --include="*.jsx" | grep -v "_config"
# → Each result: verify clearInterval in return () => {}

# Orphaned timeouts
grep -rn "setTimeout" FrontEnd/src/ --include="*.jsx" | grep -v "clearTimeout"
# → Check each — does it need cleanup?
```

---

## TASK 7 — Routing Edge Cases

```bash
# Direct URL access to protected routes
# Test mentally:
# /skill-arena/dashboard → redirect to login if not authenticated ✓
# /admin-skill-arena → redirect to dashboard if not admin ✓

# 404 for invalid routes
grep -n "NotFoundPage\|\* " FrontEnd/src/App.jsx
# → Must show NotFoundPage, not Navigate to /
```

---

## TASK 8 — Security Check

```bash
# No JWT in localStorage
grep -rn "localStorage.setItem.*token\|localStorage.setItem.*jwt" \
  FrontEnd/src/ --include="*.jsx"
# → Should return 0

# No secrets in VITE_ vars
grep -rn "VITE_" FrontEnd/.env.local FrontEnd/.env.example 2>/dev/null
# → Only VITE_API_URL should exist

# All external links safe
grep -rn 'target="_blank"' FrontEnd/src/ --include="*.jsx" | \
  grep -v 'rel="noopener noreferrer"'
# → Should return 0
```

---

## TASK 9 — Rules of Hooks

```bash
# Check modals: useBodyLock must be BEFORE any early return
grep -n "useBodyLock\|if (!" \
  FrontEnd/src/pages/student-skill-arena/modals/InstructionsModal.jsx
# → useBodyLock line number must be LOWER than if (! line number

grep -n "useBodyLock\|if (!" \
  FrontEnd/src/pages/student-skill-arena/modals/AboutRoadmapModal.jsx
grep -n "useBodyLock\|if (!" \
  FrontEnd/src/pages/student-skill-arena/modals/AboutGateModal.jsx
```

---

## TASK 10 — Build Final Check

```bash
cd FrontEnd && npm run build 2>&1 | grep -E "(error|✓|built in)"
```

**Pass = zero errors, built in < 5s**

---

## CRITICAL BUGS CHECKLIST (Previously Fixed — Verify Not Regressed)

- [ ] `toggleQuest` not in DashboardPage.jsx (was ReferenceError)
- [ ] `AnimatePresence` + `useInView` restored in AILabPage.jsx imports
- [ ] `CopyButton` in ProblemDetailPage has useRef timeout cleanup
- [ ] `MissionsPage` `.catch()` shows toast, not silent
- [ ] `InstructionsModal` useBodyLock before guard
- [ ] `ConceptInlinePanel` has `active` flag
- [ ] `RoadmapPanel` has separate `pausing`/`resuming` flags
