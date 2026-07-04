# /change-check — Targeted Verification After Any Change

Run this after ANY frontend or backend change instead of a full project re-audit.
Verifies only what the change touches + its blast radius.

---

## STEP 1 — Identify What Changed

```bash
git status
git diff --stat
```

Classify each changed file:

| Changed file type | Blast radius to check |
|-------------------|----------------------|
| Page component (`pages/*.jsx`) | That page + its route + any panel/modal it renders |
| Shared component (`components/*.jsx`) | Every page importing it (`grep -rn "ComponentName"`) |
| `api.js` | Every caller of the changed function + backend endpoint match |
| Context (`AuthContext`/`ThemeContext`) | App-wide — run full frontend build + smoke the main flows |
| Hook (`hooks/*.js`) | Every consumer of the hook |
| `global.css` | Both themes on affected pages |
| Guide data (`deployment/guides/*.js`) | Only that one deployment page |
| Backend controller | Frontend api.js function contract + auth annotation |
| Backend service | Cache eviction correctness + N+1 check on that method |
| Backend model | DTO exposure check (no new sensitive fields leaked) |
| `SecurityConfig` / `JwtFilter` | Full auth flow test (login, /me, 401, 403) |

---

## STEP 2 — Frontend Change Checklist (only if frontend changed)

```bash
cd FrontEnd && npm run build 2>&1 | grep -E "(error|✓|built in)"
```

For each changed component, verify:
- [ ] Hooks called before any early return
- [ ] New useEffect has cleanup (timers, listeners, active flag)
- [ ] New API call uses api.js + withCache for reads
- [ ] Mutations clear the right cache keys
- [ ] Colors use CSS vars (both themes work)
- [ ] New modal uses `useBodyLock()`
- [ ] New route added as `React.lazy()` + prefetch if main flow

---

## STEP 3 — Backend Change Checklist (only if backend changed)

```powershell
cd Student-BackEnd; .\mvnw.cmd clean package -DskipTests 2>&1 | Select-Object -Last 3
```

For each changed class, verify:
- [ ] Mutation → `CacheService.evict()` present for all affected keys
- [ ] New endpoint → `@PreAuthorize` if admin, matches api.js contract
- [ ] No repository call inside a loop (N+1)
- [ ] No sensitive field in response DTO
- [ ] Error path returns `{ "error": "..." }` JSON

---

## STEP 4 — Contract Check (only if BOTH sides changed)

- [ ] api.js function path/method matches controller mapping exactly
- [ ] Response fields frontend destructures all exist in backend DTO
- [ ] Frontend cache clear keys cover backend cache evict scope

---

## STEP 5 — Smoke the Affected Flow

Run only the user flow the change touches (not everything):
- Auth change → login → /me → logout → guest login
- Dashboard change → open gates → open concept → start quiz
- Quiz change → start → answer → submit → result → sl:refresh fired
- Admin change → mutate → student view shows fresh data (after cache TTL)
- Deployment guide change → open that one guide page in both themes

---

## OUTPUT

Report: files changed → checks run → issues found → fixes applied → build result.
If zero issues: "Change verified. No blast-radius issues. Build passes."
