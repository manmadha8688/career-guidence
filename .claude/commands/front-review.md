# /front-review — Full Frontend Code Review

Complete review of the React frontend: structure → code quality → naming → architecture → scalability.

---

## STEP 1 — Project Structure Check

```bash
# Count lines in large files
wc -l FrontEnd/src/pages/student-skill-arena/DashboardPage.jsx
wc -l FrontEnd/src/pages/LandingPage.jsx
wc -l FrontEnd/src/styles/global.css

# Check folder structure is correct
ls FrontEnd/src/pages/student-skill-arena/panels/
ls FrontEnd/src/pages/student-skill-arena/modals/
ls FrontEnd/src/pages/student-skill-arena/mobile/
ls FrontEnd/src/pages/deployment/guides/
```

**Check:**
- [ ] DashboardPage.jsx < 1100 lines (was extracted into panels/modals/mobile)
- [ ] All deployment guide data in `guides/` (not in guideData.js monolith)
- [ ] 20 thin wrapper pages in `deployment/` (each < 25 lines)
- [ ] All loaders in `components/loaders/`
- [ ] Custom hooks in `hooks/` (useBodyLock, useSkyTransition)

---

## STEP 2 — Import Audit (Every File)

For each file in src/pages/ and src/components/, check:

**Unused imports to flag:**
```bash
# Search for common unused patterns
grep -rn "AnimatePresence\|useInView" FrontEnd/src/pages/ailab/AILabPage.jsx
grep -rn "ChevronDown" FrontEnd/src/components/ReportButton.jsx
grep -rn "from 'axios'" FrontEnd/src/pages/ --include="*.jsx"
# → LandingPage should use api.js NOT direct axios
```

**Rules:**
- [ ] No direct `import axios from 'axios'` in pages — must use `api.js`
- [ ] No unused lucide-react icons
- [ ] No unused React hook imports
- [ ] All `lazy()` pages exist as real files

---

## STEP 3 — Component Quality Review

**Check each extracted component:**

```bash
# Panels must have active flag for async effects
grep -n "let active" FrontEnd/src/pages/student-skill-arena/panels/ConceptInlinePanel.jsx
grep -n "let active" FrontEnd/src/pages/student-skill-arena/panels/SubjectPanel.jsx

# Modals must use useBodyLock BEFORE any early return
grep -n "useBodyLock\|if (!meta)\|if (!roadmap)" \
  FrontEnd/src/pages/student-skill-arena/modals/InstructionsModal.jsx
```

**Check component responsibilities:**
- [ ] Panels own their state + API calls (no prop drilling for data)
- [ ] Modals use `useBodyLock()` — never inline useEffect for overflow
- [ ] No component > 400 lines unless it's DashboardPage (main SPA controller)
- [ ] No business logic in UI components

---

## STEP 4 — State & Hooks Review

**Check for stale closures and missing cleanups:**

```bash
# All useEffect with API calls should have active flag OR abort
grep -rn "useEffect" FrontEnd/src/pages/student-skill-arena/panels/ --include="*.jsx"

# Check all intervals have cleanup
grep -rn "setInterval\|setTimeout" FrontEnd/src/ --include="*.jsx" | grep -v "clearInterval\|clearTimeout\|useRef"
```

**Check:**
- [ ] `active = false` cleanup in all prop-changing async effects
- [ ] `useBodyLock()` in all 5+ modal components
- [ ] `finally` block resets loading state (not just `.then`)
- [ ] No `toggleQuest` or other undefined function references
- [ ] RoadmapPanel: separate `pausing` and `resuming` state flags

---

## STEP 5 — API Layer Review

```bash
# All pages must use api.js functions
grep -rn "from '../api/api'\|from '../../api/api'" FrontEnd/src/pages/ --include="*.jsx" | wc -l

# Check cache keys match what they should be
grep -n "clearApiCache\|withCache" FrontEnd/src/api/api.js | head -30
```

**Check:**
- [ ] All reads use `withCache(key, ttl, fn)`
- [ ] All mutations call `clearApiCache()` with correct keys
- [ ] `sl:refresh` event properly dispatched from QuizResultPage on pass
- [ ] DashboardPage listens for `sl:refresh` and re-fetches all data

---

## STEP 6 — Routing Review

```bash
# All routes must be lazy loaded
grep -n "lazy(" FrontEnd/src/App.jsx | wc -l
grep -n "^import.*from './pages" FrontEnd/src/App.jsx
# → Should return 0 (no eager page imports)

# Prefetch covers main routes
grep -n "import(" FrontEnd/src/App.jsx | grep "usePrefetchRoutes" -A 20
```

**Check:**
- [ ] All 56 page routes are `React.lazy()`
- [ ] `usePrefetchRoutes()` covers: Landing, Login, Register, Dashboard, Missions, AILab, Deployment, ProblemSolving
- [ ] All admin routes have `adminOnly` prop on ProtectedRoute
- [ ] Catch-all `*` → NotFoundPage (not silent redirect)

---

## STEP 7 — CSS & Theme Review

```bash
# No hardcoded colors in backgrounds (should use CSS vars)
grep -rn "background.*#0C1020\|background.*#10162A\|background.*#090E1C" \
  FrontEnd/src/pages/ --include="*.jsx" | grep -v "loaders\|auth\|Landing"
# → Should return 0 (all backgrounds use var(--bg-primary) etc.)

# No dark?A:B inline theme checks for backgrounds
grep -rn "dark ?.*background\|theme.*background" FrontEnd/src/pages/ --include="*.jsx" | \
  grep -v "//\|loaders"
```

**Check:**
- [ ] Backgrounds use `var(--bg-primary)`, `var(--bg-card)` etc.
- [ ] Gradient text uses `.lp-grad-text` CSS class — never inline background-clip
- [ ] No AppLayout on: DashboardPage, QuizPage, QuizResultPage, RoadmapDetailPage
- [ ] Theme toggle works on all pages

---

## STEP 8 — Build + Lint

```bash
cd FrontEnd
npm run lint 2>&1 | grep "error" | wc -l
npm run build 2>&1 | tail -5
```

**Pass criteria:**
- [ ] `npm run build` → ✓ built in < 5s
- [ ] No new lint errors introduced
- [ ] Main bundle (index.js) < 400 kB

---

## OUTPUT FORMAT

For each issue found:
- File + line number
- Issue type: CRITICAL / HIGH / MEDIUM / STYLE
- Description
- Minimal fix
