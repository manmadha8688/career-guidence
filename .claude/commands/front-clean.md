# /front-clean — Frontend Unused Code & Dead File Cleanup

Safely remove all unused imports, dead files, orphan exports, and stale assets.
Rule: verify zero usage before deleting anything.

---

## STEP 1 — Unused Imports Scan

```bash
cd FrontEnd && npm run lint 2>&1 | grep "no-unused-vars\|is defined but never used" | \
  grep -v "node_modules"
# → Lists all unused variables and imports per file
```

**Known patterns to check:**
```bash
# Unused lucide icons
grep -rn "from 'lucide-react'" FrontEnd/src/ --include="*.jsx" | head -20
# → For each file, verify every imported icon appears in the JSX

# Unused React imports  
grep -rn "^import.*useState\|^import.*useEffect\|^import.*useRef" \
  FrontEnd/src/ --include="*.jsx" | head -20
# → Verify each hook is actually used in the file body
```

---

## STEP 2 — Dead Files Scan

```bash
# Check for files not imported anywhere
# Key files to verify:
for f in \
  "FrontEnd/src/pages/NotFoundPage.jsx" \
  "FrontEnd/src/pages/LoaderDemo.jsx" \
  "FrontEnd/src/pages/deployment/GuideLayout.jsx" \
  "FrontEnd/src/pages/ailab/helpers.jsx" \
  "FrontEnd/src/pages/ailab/ToolPageLayout.jsx"; do
  name=$(basename $f .jsx)
  count=$(grep -rn "$name" FrontEnd/src/ --include="*.jsx" --include="*.js" | grep -v "^$f:" | wc -l)
  echo "$name: $count references"
done
```

**Files that should be gone:**
```bash
# These were deleted — verify they don't exist
ls FrontEnd/src/App.css 2>/dev/null && echo "DEAD FILE: App.css" || echo "✓ App.css deleted"
ls FrontEnd/src/index.css 2>/dev/null && echo "DEAD FILE: index.css" || echo "✓ index.css deleted"
ls FrontEnd/public/icons.svg 2>/dev/null && echo "DEAD FILE: icons.svg" || echo "✓ icons.svg deleted"
ls FrontEnd/src/pages/deployment/HuggingFacePage.jsx 2>/dev/null && echo "DEAD FILE" || echo "✓ Deleted"
ls FrontEnd/src/pages/deployment/guideData.js 2>/dev/null && echo "DEAD FILE: guideData.js MONOLITH" || echo "✓ Split"
ls FrontEnd/src/pages/ailab/tools/ 2>/dev/null && echo "DEAD DIR: ailab/tools/" || echo "✓ Cleaned"
```

---

## STEP 3 — Unused API Exports

```bash
# Exports in api.js with zero usage
for fn in migrateRichContent getUserProgress getEnrolledRoadmaps getSubjectStatus searchSubjects searchConcepts getConcepts; do
  count=$(grep -rn "$fn" FrontEnd/src/ --include="*.jsx" --include="*.js" | grep -v "api.js" | wc -l)
  echo "$fn: $count external usages"
done
# → Any 0 = safe to remove from api.js
```

---

## STEP 4 — Duplicate/Orphan AI Lab Pages

```bash
# Check ailab/tools/ doesn't exist (should be deleted)
ls FrontEnd/src/pages/ailab/tools/ 2>/dev/null | wc -l
# → Should be 0 or directory missing

# Verify toolComponents.js imports from correct subdirs
grep "from './tools/" FrontEnd/src/pages/ailab/toolComponents.js
# → Should return 0 (all imports from agents/, foundations/, etc.)
```

---

## STEP 5 — CSS Dead Code

```bash
# Check for App.css / index.css imports
grep -rn "App.css\|index.css" FrontEnd/src/ --include="*.jsx" --include="*.js"
# → Should return 0

# Verify CSS files are all imported somewhere
grep -rn "landing-animations.css" FrontEnd/src/ --include="*.jsx"
# → Should show: LandingPage.jsx
grep -rn "pages-animations.css" FrontEnd/src/ --include="*.jsx"
# → Should show: FresherInstructionsPage.jsx + CareerGuidancePage.jsx
```

---

## STEP 6 — Package Cleanup Check

```bash
cat FrontEnd/package.json | grep -E '"dependencies"|"devDependencies"' -A 30 | head -40
```

**Should NOT be present (already removed):**
- `three` ❌
- `@react-three/fiber` ❌
- `@react-three/drei` ❌
- `@react-three/postprocessing` ❌
- `postprocessing` ❌
- `tailwindcss` ❌

**Verify:**
```bash
grep -E "three|tailwind" FrontEnd/package.json
# → Should return 0
```

---

## STEP 7 — Apply Safe Removals

For each confirmed unused item:
1. Remove the import line
2. Run `npm run build` — verify still passes
3. Never delete a file without checking all import paths

**Auto-safe:**
- Remove unused icon imports
- Remove unused hook imports
- Remove unused constant declarations

**Needs manual check:**
- Removing API functions (check backend might call frontend state)
- Removing component files (check dynamic imports in toolComponents.js)
