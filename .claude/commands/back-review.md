# /back-review — Full Backend Code Review

Complete review: structure → code quality → architecture → cache → security → scalability.

---

## STEP 1 — Build Verification

```powershell
cd C:\manmadha\Student-project\Student-BackEnd
.\mvnw.cmd clean package -DskipTests 2>&1 | tail -5
```
✅ Must show: `BUILD SUCCESS`

---

## STEP 2 — Architecture Check

```bash
# Verify layer separation
find Student-BackEnd/src/main/java -name "*.java" | \
  grep -E "controller|service|repository|model|dto|config" | \
  sed 's/.*\///' | sort

# Expected structure:
# controller/ → thin HTTP handlers only
# service/    → business logic + caching
# repository/ → MongoDB queries only
# model/      → Document entities (no business logic)
# dto/        → API request/response shapes
# config/     → Spring config beans
```

**Rules:**
- [ ] Controller methods < 15 lines (no logic — delegate to service)
- [ ] Service methods contain ALL business logic + cache calls
- [ ] Repository extends MongoRepository — no raw queries unless needed
- [ ] No `@Autowired` field injection — use constructor injection

---

## STEP 3 — Cache Architecture Review

```bash
# Every service read should use CacheService.get()
grep -rn "CacheService.get\|cacheService.get" \
  Student-BackEnd/src/main/java/com/service/ --include="*.java"

# Every service mutation should call evict()
grep -rn "CacheService.evict\|cacheService.evict" \
  Student-BackEnd/src/main/java/com/service/ --include="*.java"

# CacheWarmup should cover all static data
grep -n "warm\|preload\|getAll\|findAll" \
  Student-BackEnd/src/main/java/com/config/CacheWarmup.java
```

**Check every entity:**
| Service | Read cached? | Mutation evicts? |
|---------|-------------|-----------------|
| SubjectService | ✓ | ✓ |
| ConceptService | ✓ | ✓ |
| RoadmapService | ✓ | ✓ |
| MissionService | ✓ | ✓ |
| ProblemService | ✓ | ✓ |
| ProgressService | ✓ | ✓ |
| AdminService | — | ✓ (all mutations) |

---

## STEP 4 — N+1 Query Check

```bash
# Search for repository calls inside loops/streams
grep -rn "\.forEach\|\.stream()\|for (" \
  Student-BackEnd/src/main/java/com/service/ --include="*.java" | \
  grep -v "//\|Test"
# → For each result: open the file, check if repository.findXxx() is called inside the loop
```

**Critical methods to verify:**
```bash
# getProgressSummary must use batch queries
grep -n "repository\." \
  Student-BackEnd/src/main/java/com/service/ProgressService.java | \
  grep -v "//\|count\|exists"
# → Should show: findByUserId (NOT findByUserIdAndSubjectId in a loop)

# getBulkSubjectStatus must use batch queries
grep -n "repository\." \
  Student-BackEnd/src/main/java/com/service/QuizService.java | \
  grep "bulkStatus\|getBulk" -A 10
```

---

## STEP 5 — Security Review

```bash
# All admin controllers must have @PreAuthorize
grep -rn "@PreAuthorize\|class.*AdminController" \
  Student-BackEnd/src/main/java/com/controller/ --include="*.java"
# → AdminController must have @PreAuthorize("hasRole('ADMIN')") at class level

# No password in any DTO
grep -rn "password" \
  Student-BackEnd/src/main/java/com/dto/ --include="*.java"
# → Should return 0 (password never in response DTOs)

# Secrets from env vars only
grep -rn "JWT_SECRET\|MONGODB_URI\|redis://" \
  Student-BackEnd/src/main/java/ --include="*.java"
# → Should NOT contain actual secret values — only env var placeholders
grep -rn "JWT_SECRET\|MONGODB_URI" \
  Student-BackEnd/src/main/resources/ --include="*.properties" --include="*.yml"
# → Must read: ${JWT_SECRET}, ${MONGODB_URI} — not hardcoded values
```

---

## STEP 6 — Error Handling Review

```bash
# Global exception handler must exist
find Student-BackEnd/src/main/java -name "*ControllerAdvice*" -o -name "*ExceptionHandler*"

# All exception handlers return { "error": "..." } format
grep -rn "@ExceptionHandler\|ResponseEntity" \
  Student-BackEnd/src/main/java/com/ --include="*ControllerAdvice*"
```

**Check error response format:**
```bash
# Test manually — should return { "error": "..." }
curl http://localhost:8080/api/subjects/nonexistent-id 2>/dev/null
# → {"error":"Subject not found"} not stack trace
```

---

## STEP 7 — Controller Endpoint Audit

```bash
# List all endpoints
grep -rn "@GetMapping\|@PostMapping\|@PutMapping\|@DeleteMapping\|@RequestMapping" \
  Student-BackEnd/src/main/java/com/controller/ --include="*.java" | \
  grep -v "//\|import" | \
  sed 's/.*@/@ /' | sort
```

**Verify against api.js:**
- [ ] Every `api.js` function has a matching backend endpoint
- [ ] HTTP methods match (GET/POST/PUT/DELETE)
- [ ] Path variables match (`{id}`, `{type}`, etc.)
- [ ] Response shapes match what frontend expects

---

## STEP 8 — DTO Validation

```bash
# All request body DTOs should have @Valid annotations in controller
grep -rn "@Valid\|@RequestBody" \
  Student-BackEnd/src/main/java/com/controller/ --include="*.java"

# DTOs should have @NotBlank, @Email, @Size on required fields
grep -rn "@NotBlank\|@Email\|@NotNull\|@Size" \
  Student-BackEnd/src/main/java/com/dto/ --include="*.java"
```

---

## STEP 9 — Pass / Fail Summary

| Check | Pass |
|-------|------|
| mvn clean package | BUILD SUCCESS |
| No logic in controllers | < 15 lines per method |
| All reads cached | CacheService.get() present |
| All mutations evict | CacheService.evict() after save |
| No N+1 queries | No repo call in loops |
| Admin endpoints protected | @PreAuthorize on all |
| No password in DTOs | grep returns 0 |
| Error handler exists | @ControllerAdvice found |
