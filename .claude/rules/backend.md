# Backend Rules — Spring Boot Application

## Architecture Pattern

```
Controller → Service → Repository (MongoDB)
               ↓
          CacheService (Caffeine L1 + Redis L2)
```

Never skip layers. Controllers call Services. Services call Repositories. Services handle caching.

## Controller Rules

- Thin controllers — no business logic
- Return `ResponseEntity<T>` with correct HTTP status codes
- Use `@PreAuthorize("hasRole('ADMIN')")` for admin endpoints
- `@CrossOrigin` NOT used — CORS handled globally in SecurityConfig

```java
// Correct pattern
@PostMapping("/missions")
public ResponseEntity<Mission> create(@RequestBody MissionRequest req,
                                       @AuthenticationPrincipal UserDetails user) {
    return ResponseEntity.ok(missionService.create(req, user.getUsername()));
}
```

## Service Rules

- All DB mutations call `CacheService.evict()` or `CacheService.evictAll()` immediately after save
- Read-heavy endpoints use `CacheService.get(cacheName, key, () -> repository.findXxx())`
- Cache names correspond to entity type: `"subjects"`, `"concepts"`, `"missions"`, `"problems"`, `"progress"`
- Never return `null` — return empty list / Optional / throw with meaningful message

```java
// Correct cache pattern
public List<Subject> getAllSubjects() {
    return cacheService.get("subjects", "all", () -> subjectRepository.findAll());
}

// Correct mutation pattern
public Subject updateSubject(String id, SubjectRequest req) {
    Subject saved = subjectRepository.save(map(req));
    cacheService.evict("subjects", "all");
    cacheService.evict("subjects", "id:" + id);
    return saved;
}
```

## Repository Rules

- Extend `MongoRepository<T, String>`
- Custom queries use `@Query` with MongoDB JSON syntax
- Avoid N+1: batch queries with `findByUserIdAndSubjectIdIn()` not per-subject loops
- The `getProgressSummary` optimization must be maintained — do NOT add per-subject DB calls

## Error Handling

- Throw `RuntimeException` subclasses with clear messages for service-level errors
- `@ControllerAdvice` global handler returns `{ error: "message" }` JSON
- 400 for bad input, 401 for unauthorized, 403 for forbidden, 404 for not found, 500 for unexpected

## DTO Rules

- Use DTOs for API responses — never expose `@Document` model directly if it has sensitive fields
- `User` model: never return `password` field in any response
- `AdminStatsDTO` has `totalGuests` — maintain this field

## Security Rules

- JWT secret from `JWT_SECRET` env var — never hardcoded
- CORS origins from `CORS_ALLOWED_ORIGINS` env var — never hardcoded
- Password hashing: BCrypt only
- Role check: Spring Security `@PreAuthorize` or `SecurityContextHolder`

## Two-Level Cache (Critical)

```
Request → CacheService.get("subjects", "all", supplier)
            ├── Caffeine hit → return immediately (0ms)
            ├── Redis hit → fill Caffeine + return (<5ms)
            └── DB hit → fill both caches + return
```

Profile `local` = Caffeine only (no Redis). Profile `prod` = both.
`CacheWarmup` fills Caffeine on startup from DB for all static data.
**Always evict both levels on mutations.**
