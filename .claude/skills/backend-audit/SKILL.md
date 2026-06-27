# Backend Audit Skill

Perform a deep Spring Boot correctness audit on this project.

## Scope

Target: `Student-BackEnd/src/main/java/`

## Audit Checklist

### 1. Cache Correctness
- [ ] Every admin mutation in AdminService has `CacheService.evict()` after save
- [ ] Cache keys match between get and evict calls
- [ ] CacheWarmup includes all static-ish data (subjects, concepts, missions, problems)
- [ ] No user-specific data warmed in CacheWarmup

### 2. N+1 Query Prevention
- [ ] `getProgressSummary`: confirm still 2 DB queries (subjects from cache, one batch badge query)
- [ ] `getBulkSubjectStatus`: confirm still 2 DB queries
- [ ] No `repository.findXxx()` calls inside for/stream loops

### 3. Security
- [ ] All `/api/admin/**` endpoints have `@PreAuthorize("hasRole('ADMIN')")`
- [ ] No `password` field in any response DTO
- [ ] JWT secret from env var (not hardcoded)
- [ ] CORS origins from env var (not hardcoded)

### 4. Error Handling
- [ ] `@ControllerAdvice` handles all exception types
- [ ] Error responses always return `{ "error": "..." }` JSON format
- [ ] No stack traces leaked to API responses in production

### 5. ProgressService Integrity
Critical: this was optimized from 18 queries to 2. Verify it's maintained:
```java
// Must use:
List<UserConceptProgress> allProgress = progressRepository.findByUserId(userId);
List<UserSubjectBadge> allBadges = badgeRepository.findByUserId(userId);
// NOT: per-subject badge/progress queries in a loop
```

### 6. Quiz Logic
- [ ] Daily bonus: uses `QuizAttempt.takenAt` for "first today" check (not concept completedAt)
- [ ] XP calculation: `score × 10 + (dailyBonus ? 50 : 0)`
- [ ] Pass marks: concept=8/10, subject=19/25, roadmap=35/50
- [ ] Quiz attempt saved atomically with progress update

### 7. Auth Flow
- [ ] `POST /api/auth/login` → sets httpOnly cookie (not returns token in body)
- [ ] `GET /api/auth/me` → validates cookie, returns user without password
- [ ] `POST /api/auth/logout` → invalidates cookie
- [ ] Guest login: creates GUEST-role user, reuses existing by guestId if provided

## Output Format

For each issue:
1. Class + method name
2. Issue description
3. Severity
4. Recommended fix

Check against `.claude/rules/backend.md` for project conventions.
