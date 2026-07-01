---
name: project-code-audit
description: Full frontend audit completed June 2026 — all applied changes, pending CONFIRM/RISKY items, current lint state
metadata:
  type: project
---

## Status: All safe changes applied. Build passes.

## Applied — Import & Dead Code Cleanup
- Removed unused imports: ChevronDown (ReportButton), ChevronRight (Sidebar), Mail+RefreshCw (RegisterPage), AnimatePresence+useInView (AILabPage), Play+ChevronLeft (ToolPageLayout), AdminSkeleton (AdminSubjects)
- Deleted: src/App.css, src/index.css, public/icons.svg, src/pages/deployment/HuggingFacePage.jsx
- Deleted duplicate: ailab/tools/OpenClawPage.jsx, ailab/tools/RAGPage.jsx
- Renamed: deployment/SupabasePage.jsx → SupabaseDeployPage.jsx

## Applied — Bug Fixes
- `toggleQuest` ReferenceError in DashboardPage — removed undefined onClick handler
- `InstructionsModal` Rules of Hooks — moved useBodyLock before early return guard
- `ConceptInlinePanel` race condition — added `active` flag to prevent stale API response
- `RoadmapPanel` — added separate `resuming` state (was sharing `pausing` flag)
- `MissionsPage` silent catch — replaced with toast.error
- `CopyButton` setTimeout leak — added useRef + cleanup

## Applied — Performance
- App.jsx: all 54 routes converted to React.lazy(); main bundle: 1607kB → 316kB (-80%)
- guideData.js (15,874 lines) split into guideIndex.js + 20 guide files in guides/
- usePrefetchRoutes() fires on idle to pre-load main page chunks
- useMemo on computeStats in DashboardPage

## Applied — Dependencies
- Removed: three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, postprocessing (~1.15MB, zero imports)
- Removed: tailwindcss (no config, no usage)
- dependencies: 8 packages (was 13)

## Applied — Claude Code Structure
- Created full .claude/ system: rules/, commands/, skills/, agents/, memory/
- 12 front-* and back-* commands created
- deploy-ready command created
- All memory migrated to project .claude/memory/

## Pending (NEEDS CONFIRMATION)
- Restrict /loader-demo to admin-only or remove before production

## Known Lint State
224 pre-existing lint errors (no-unused-vars in inline styles, exhaustive-deps). Build passes. None introduced by audit.
