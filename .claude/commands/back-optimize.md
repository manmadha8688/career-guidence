# /back-optimize — Backend Performance Optimization

Identify and fix slow queries, missing caches, N+1 patterns, and heavy responses.

---

## STEP 1 — Baseline Measurement

**Start backend and time critical endpoints:**
```bash
# Login first
curl -c cookies.txt -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"Test@1234"}' -s > /dev/null

# Time each endpoint (run each twice — first=cache miss, second=cache hit)
echo "=== Subjects ===" && time curl -s http://localhost:8080/api/subjects > /dev/null
echo "=== Progress Summary (1st) ===" && time curl -s -b cookies.txt http://localhost:8080/api/progress/summary > /dev/null
echo "=== Progress Summary (2nd/cached) ===" && time curl -s -b cookies.txt http://localhost:8080/api/progress/summary > /dev/null
echo "=== Missions ===" && time curl -s http://localhost:8080/api/missions > /dev/null
```

**Targets:**
| Endpoint | First call | Cached |
|----------|-----------|--------|
| `/api/subjects` | < 100ms | < 10ms |
| `/api/progress/summary` | < 500ms | < 50ms |
| `/api/missions` | < 200ms | < 10ms |
| `/api/quiz/subjects/bulk-status` | < 300ms | < 50ms |

---

## STEP 2 — Cache Coverage Audit

```bash
# Find all service methods and check cache coverage
grep -rn "public.*List\|public.*Optional\|public.*DTO" \
  Student-BackEnd/src/main/java/com/service/ --include="*.java" | \
  grep -v "//\|private\|void\|create\|update\|delete\|save"
# → For each public read method: is it wrapped in CacheService.get()?
```

**Fix missing cache:**
```java
// Before (no cache):
public List<Mission> getAllMissions() {
    return missionRepository.findAll();
}

// After (with cache):
public List<Mission> getAllMissions() {
    return cacheService.get("missions", "all", () -> missionRepository.findAll());
}
```

---

## STEP 3 — Query Optimization

```bash
# Find repository method names — check for N+1 risk
grep -rn "fun.*findBy\|List.*findBy\|Optional.*findBy" \
  Student-BackEnd/src/main/java/com/repository/ --include="*.java"
```

**Common N+1 fixes for this project:**

```java
// BAD — N queries for N subjects
subjects.forEach(s -> {
    int count = conceptRepository.countBySubjectId(s.getId()); // N queries!
    s.setTotalConcepts(count);
});

// GOOD — 1 query, process in memory
List<Concept> all = conceptRepository.findBySubjectIdIn(subjectIds);
Map<String, Long> counts = all.stream().collect(
    Collectors.groupingBy(Concept::getSubjectId, Collectors.counting())
);
```

---

## STEP 4 — CacheWarmup Coverage

```bash
grep -n "warm\|ApplicationReadyEvent\|loadAll" \
  Student-BackEnd/src/main/java/com/config/CacheWarmup.java
```

**Must pre-load:**
- [ ] All subjects
- [ ] All concepts (grouped by subjectId)
- [ ] All roadmaps
- [ ] All missions
- [ ] All problems (by track)

**Add to CacheWarmup if missing:**
```java
@EventListener(ApplicationReadyEvent.class)
public void warmAll() {
    subjectService.getAllSubjects();      // fills Caffeine
    missionService.getAllMissions();      // fills Caffeine
    problemService.getAll();             // fills Caffeine
    // etc.
}
```

---

## STEP 5 — Response Payload Optimization

```bash
# Check if list endpoints return full objects (could be heavy)
curl -s http://localhost:8080/api/subjects | python -m json.tool | head -50
# → Subject list should return lightweight fields
# → Should NOT include full concept arrays in subject list response
```

**If subject list includes concepts:**
```java
// Bad: returns all nested data
return subjectRepository.findAll(); // includes concepts array

// Good: lightweight projection or DTO
return subjectRepository.findAll().stream()
    .map(SubjectListDTO::from) // only: id, title, icon, color, rank, totalConcepts
    .collect(Collectors.toList());
```

---

## STEP 6 — Admin List Pagination

```bash
# Admin endpoints with large data should paginate
grep -rn "Pageable\|PageRequest\|page\|size" \
  Student-BackEnd/src/main/java/com/controller/AdminController.java
# → Users, Reports, Feedbacks should all be paginated
```

---

## STEP 7 — Database Index Suggestions

```bash
# Check repositories for frequently queried fields
grep -rn "findByUserId\|findBySubjectId\|findByTrack\|findByCategory" \
  Student-BackEnd/src/main/java/com/repository/ --include="*.java"
```

**Recommended indexes (MongoDB Atlas):**
| Collection | Field | Index type |
|-----------|-------|-----------|
| `user_concept_progress` | `userId` | Single |
| `user_concept_progress` | `userId + conceptId` | Compound unique |
| `quiz_attempts` | `userId` | Single |
| `quiz_attempts` | `userId + refId + takenAt` | Compound |
| `user_subject_badges` | `userId` | Single |
| `user_roadmap_enrollments` | `userId` | Single |

---

## STEP 8 — Apply Safe Optimizations

**Safe to apply immediately:**
1. Wrap uncached read methods in `CacheService.get()`
2. Add missing entities to `CacheWarmup.warmAll()`
3. Replace N+1 loops with batch queries + in-memory processing

**Needs testing:**
- Changing cache TTL values (may affect data freshness)
- Adding Pageable to existing endpoints (breaking API change — coordinate with frontend)
- Response projection changes (must verify frontend still works)
