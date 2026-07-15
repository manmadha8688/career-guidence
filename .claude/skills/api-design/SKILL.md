---
name: api-design
description: How LearnForEarn/ARISE shapes its REST API — URL patterns (/api/{resource}, /{id}/{action}, /api/admin/*, /api/auth/*), response/error shapes, status codes, cookie auth, and the frontend cache-key + eviction conventions. Use when adding or changing an endpoint or its frontend wrapper. The full FE↔BE endpoint map lives in .claude/rules/api-conventions.md.
---

# API Design — LearnForEarn / ARISE

## URL patterns
```
/api/{resource}                 list / create
/api/{resource}/{id}            get / update / delete
/api/{resource}/{id}/{action}   enroll, pause, resume, start   (verbs as sub-paths)
/api/admin/{resource}           admin-only endpoints
/api/auth/{action}              register, login, guest, me, logout
```
Resource names are lowercase plural (`subjects`, `concepts`, `roadmaps`, `missions`, `problems`,
`quiz`, `progress`). Actions are verbs appended after the id, not query flags.

## Response + error shapes
- Success: the object `{ "id": "...", ... }` or an array `[ {...}, ... ]`. No envelope.
- Error (**always** this shape): `{ "error": "Human-readable message" }`, produced by the global
  `@ControllerAdvice` handler. Services throw `RuntimeException` subclasses with clear messages.
- Never return `null` — return empty list / Optional / throw with a meaningful message.

## Status codes
| Code | When |
|------|------|
| 200 | Success (GET, PUT) |
| 201 | Created (POST new resource) |
| 204 | Deleted (DELETE) |
| 400 | Bad request / validation error |
| 401 | Not authenticated (FE interceptor → /login) |
| 403 | Authenticated, wrong role |
| 404 | Not found |
| 500 | Unexpected server error |

## Auth
httpOnly cookie `jwt` (JWT, 24h), sent automatically because the frontend axios client
is created with `withCredentials: true`. No Authorization header from JS, no token in JS storage.
Admin endpoints validate role server-side (never trust the frontend check).

## Adding an endpoint — checklist
1. Backend: Controller (thin, `ResponseEntity`, correct status) → Service (cache + business
   logic) → Repository. Admin routes role-guarded.
2. If it's a **read** of static-ish data, wrap with `cacheService.get(name, key, supplier)` and
   consider adding it to `CacheWarmup`.
3. If it's a **mutation**, call `cacheService.evict(...)` for every affected cache name right
   after the save/delete.
4. Frontend: add a wrapper in `src/api/api.js` — reads use `withCache(key, ttl, fn)`, mutations
   call `clearApiCache(...)`. Never call `api.get` directly from a component.
5. Record the new call in the FE↔BE table in **`.claude/rules/api-conventions.md`**.

## Frontend cache keys + TTLs (source: rules/performance.md)
| Data | key | TTL |
|------|-----|-----|
| Subjects list / single | `subjects` / `subject:{id}` | 2 min |
| Concept | `concept:{id}` | 2 min |
| Progress summary / hunter stats | `progressSummary` / `hunterStats` | 60 s |
| Roadmaps / single | `roadmaps` / `roadmap:{id}` | 5 min |
| Quiz status / bulk | `quizStatus:{type}:{id}` / `quizStatus:bulk:{ids}` | 2 min |
| Missions | `missions`, `mission:{id}` | 30 s |
| Problems | `problems:{track}`, `problem:{id}` | 5 min |

## Eviction conventions (frontend, after mutation)
```
completeConcept / uncompleteConcept → progressSummary, hunterStats, subject:{id}, quizStatus:*
enroll / pause / resume roadmap     → roadmap:{id}, roadmaps, enrolledRoadmaps
admin subject/concept mutations     → subjects, subject:*, concept:*
```
The `sl:refresh` event is the signal to bust all user-specific keys after a quiz pass.

The complete, current FE→BE endpoint map is maintained in
**`.claude/rules/api-conventions.md`** — point there rather than duplicating it.
