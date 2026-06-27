# React Audit Skill

Perform a deep React correctness audit on this project.

## Scope

This skill audits the LearnToEarn frontend for React-specific bugs.
Target: `FrontEnd/src/` — all .jsx and .js files.

## Audit Checklist

### 1. Rules of Hooks
- [ ] No hook called after an early return guard
- [ ] No hook inside a conditional block
- [ ] No hook inside a loop
- [ ] Critical files to check: all files in `pages/student-skill-arena/modals/`

### 2. useEffect Cleanup
For every useEffect, verify:
- [ ] Event listeners have matching removeEventListener
- [ ] setInterval has clearInterval in cleanup
- [ ] setTimeout has clearTimeout in cleanup
- [ ] Async effects use `active` flag to prevent stale state

```js
// Required pattern for prop-changing async effects:
useEffect(() => {
  let active = true
  fetch(id).then(data => { if (active) setState(data) })
  return () => { active = false }
}, [id])
```

### 3. State Management
- [ ] No `useState` for data derivable from props or other state
- [ ] Expensive derived values wrapped in `useMemo`
- [ ] Loading state resets in `finally` blocks (not `.then` only)
- [ ] No stale closure issues in useEffect dependencies

### 4. Component Issues
- [ ] All modals use `useBodyLock()` hook (not inline useEffect)
- [ ] No missing `key` props in mapped lists (no `key={index}` on dynamic lists)
- [ ] ConceptInlinePanel: `active` flag present in conceptId useEffect
- [ ] InstructionsModal: `useBodyLock()` before `if (!meta) return null`

### 5. Race Conditions
- [ ] RoadmapPanel: separate `pausing` and `resuming` state flags
- [ ] ConceptInlinePanel: `active` ref prevents stale response
- [ ] No API calls that can override newer state with older response

### 6. Memory Leaks
- [ ] `CopyButton` in ProblemDetailPage: timeout tracked via `useRef`
- [ ] `FeedbackNudge` goFeedback: 100ms timeout tracked via `useRef`
- [ ] `LandingPage` count-up: `timers[]` array collected + cleared
- [ ] `AuthContext` sl:refresh listener: cleanup in useEffect return

### 7. undefined/null Safety
- [ ] User role check: `user?.role === 'ADMIN'` (with optional chaining)
- [ ] API responses: null checks before accessing nested fields
- [ ] Route params: validate before using as API arguments

## Output Format

For each issue found:
1. File path
2. Line number
3. Bug description
4. Severity: CRITICAL / HIGH / MEDIUM / LOW
5. Minimal fix

Report ONLY confirmed bugs. No hypothetical issues.
