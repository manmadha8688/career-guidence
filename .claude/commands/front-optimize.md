# /front-optimize — Frontend Performance Optimization

Measure → identify → fix. Never optimize without measuring first.

---

## STEP 1 — Measure Bundle Size

```bash
cd FrontEnd && npm run build 2>&1 | grep "dist/assets/index"
# → index.js should be < 350 kB (currently ~316 kB gzip: 103 kB)

# Check for oversized chunks
npm run build 2>&1 | grep "kB" | awk '{print $2, $1}' | sort -rn | head -15
# → Any chunk > 500 kB is a warning
```

**Baseline targets:**
| Chunk | Max size |
|-------|----------|
| `index.js` (main bundle) | < 350 kB |
| Any single page chunk | < 100 kB |
| Spline/3D chunks | excluded (lazy-loaded) |

---

## STEP 2 — Check Lazy Loading Coverage

```bash
# Every page must be lazy — count lazy imports vs total page imports
grep -c "lazy(" FrontEnd/src/App.jsx
grep -c "^const.*lazy(" FrontEnd/src/App.jsx
# → Both counts should match (no eager page imports)

# Check for any eager imports that snuck in
grep -n "^import.*from './pages\|^import.*from '.*pages/" FrontEnd/src/App.jsx
# → Should return 0
```

---

## STEP 3 — Check Prefetch Coverage

```bash
grep -A 20 "usePrefetchRoutes" FrontEnd/src/App.jsx
```

**Must include at minimum:**
- [ ] `./pages/LandingPage`
- [ ] `./pages/auth/LoginPage`
- [ ] `./pages/auth/RegisterPage`
- [ ] `./pages/student-skill-arena/DashboardPage`
- [ ] `./pages/MissionsPage`
- [ ] `./pages/ailab/AILabPage`
- [ ] `./pages/DeploymentGuidePage`
- [ ] `./pages/problem-solving/ProblemSolvingPage`

---

## STEP 4 — API Cache Coverage

```bash
# All GET calls in api.js must use withCache
grep -n "api\.get\|withCache" FrontEnd/src/api/api.js | grep "api\.get" | \
  grep -v "withCache"
# → Any api.get() NOT wrapped in withCache is a cache miss on every call
```

**TTL audit — check current values are appropriate:**
```bash
grep -n "60_000\|2\*60_000\|5\*60_000\|30_000" FrontEnd/src/api/api.js
```
| Data type | Current TTL | Should be |
|-----------|-------------|-----------|
| Subjects/Concepts | 2 min | 2 min ✓ |
| Roadmaps | 5 min | 5 min ✓ |
| Progress/HunterStats | 60 sec | 60 sec ✓ |
| Missions | 30 sec | 30 sec ✓ |

---

## STEP 5 — Unnecessary Re-renders

```bash
# Check React.memo usage on leaf components
grep -rn "React.memo\|memo(" FrontEnd/src/ --include="*.jsx"
# → ConceptVideo should be wrapped with memo()
# → Pure leaf components rendering in long lists should have memo

# Check useMemo usage in DashboardPage
grep -n "useMemo" FrontEnd/src/pages/student-skill-arena/DashboardPage.jsx
# → computeStats must be memoized: useMemo(() => computeStats(...), [summary])
```

---

## STEP 6 — Heavy Dependencies Audit

```bash
# Check package.json for heavy deps
grep -E "@react-three|three|postprocessing|tailwind" FrontEnd/package.json
# → All three/react-three should be REMOVED (were unused — confirmed in cleanup)
# → tailwindcss should be REMOVED (no usage confirmed)

# Check framer-motion usage (justified — AI Lab animations)
grep -rn "from 'framer-motion'" FrontEnd/src/ --include="*.jsx"
# → Should only be in AILabPage.jsx (1 file — justified)

# Check Spline is still lazy-loaded
grep -n "lazy.*spline\|spline.*lazy" FrontEnd/src/pages/ailab/AILabPage.jsx -i
# → Must be lazy(() => import('@splinetool/react-spline'))
```

---

## STEP 7 — Inline Object Creation in Render

```bash
# Inline style objects in map() calls create new objects every render
grep -rn "\.map(.*=>" FrontEnd/src/pages/ --include="*.jsx" | \
  grep "style={{" | head -10
# → These are low priority but worth noting in heavy list renders
```

---

## STEP 8 — Guide Data Split Verification

```bash
# guideData.js monolith should NOT exist
ls FrontEnd/src/pages/deployment/guideData.js 2>/dev/null && echo "PROBLEM: monolith exists" || echo "✓ Monolith deleted"

# All 20 guides should be in guides/ subfolder
ls FrontEnd/src/pages/deployment/guides/ | wc -l
# → Should show 20 files

# Each deployment page imports only its own guide
head -6 FrontEnd/src/pages/deployment/ReactDeployPage.jsx
# → Should import from './guides/reactGuide' NOT './guideData'
```

---

## STEP 9 — Apply Fixes (SAFE ONLY)

If issues found in steps above:

**Safe to auto-apply:**
1. Add missing `withCache()` wrapper on uncached GET calls
2. Add missing `React.memo()` on pure leaf components in lists
3. Add missing `useMemo()` on expensive derived computations
4. Add imports to `usePrefetchRoutes()` for missing main routes

**Needs confirmation:**
- Changing cache TTL values
- Adding new chunks to manual chunk config in vite.config.js
- Removing dependencies

---

## STEP 10 — Final Build Check

```bash
cd FrontEnd && npm run build 2>&1 | tail -8
# → Built successfully, bundle sizes same or smaller than baseline
```
