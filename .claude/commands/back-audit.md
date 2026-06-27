# /back-audit — Deep Backend Production Audit

Think: "This API goes live tomorrow. What breaks under real load?"
Covers: correctness, performance regressions, security holes, edge cases.

---

## TASK 1 — Cache Correctness Audit

**Read path — must be cached:**
```bash
grep -rn "cacheService.get\|CacheService.get" \
  Student-BackEnd/src/main/java/com/service/ --include="*.java" | \
  grep -v "//"
```

**Write path — must evict:**
```bash
grep -rn "\.save(\|\.delete(\|\.deleteById(" \
  Student-BackEnd/src/main/java/com/service/ --include="*.java" | \
  grep -v "//"
# → For EVERY save/delete: is CacheService.evict() called nearby?
```

**Critical: verify these evictions exist after each AdminService mutation:**
```bash
grep -n "evict\|save\|delete" \
  Student-BackEnd/src/main/java/com/service/AdminService.java | head -40
```

| Mutation | Must evict |
|----------|-----------|
| createSubject | `subjects:all` + `subjects:id:{id}` |
| updateSubject | `subjects:all` + `subjects:id:{id}` |
| deleteSubject | `subjects:all` + `subjects:id:{id}` + `concepts:*` |
| createConcept | `subjects:id:{subjectId}` + `concepts:id:{id}` |
| updateConcept | `concepts:id:{id}` + `subjects:id:{subjectId}` |
| deleteConcept | `concepts:id:{id}` + `subjects:id:{subjectId}` |
| createMission | `missions:all` |
| createProblem | `problems:all` + `problems:track:{track}` |

---

## TASK 2 — Performance Baselines (Regression Check)

**Start backend and run timed requests:**
```bash
# Progress summary — must be < 50ms after first call (Caffeine hit)
time curl -s -b cookies.txt http://localhost:8080/api/progress/summary > /dev/null

# Subjects — must be < 10ms (CacheWarmup pre-loaded)
time curl -s http://localhost:8080/api/subjects > /dev/null

# Bulk quiz status — must be < 50ms cached
time curl -s -b cookies.txt \
  "http://localhost:8080/api/quiz/subjects/bulk-status?ids=id1,id2" > /dev/null
```

**If > 500ms: regression detected. Check:**
```bash
grep -n "repository\." \
  Student-BackEnd/src/main/java/com/service/ProgressService.java
# → getProgressSummary must NOT have per-subject repository calls
# → Should use: findByUserId (one call) + process in memory
```

---

## TASK 3 — N+1 Query Detection

```bash
# Search for suspicious patterns
grep -rn -A 5 "\.forEach\|\.stream()" \
  Student-BackEnd/src/main/java/com/service/ --include="*.java" | \
  grep -E "repository\.|Repository\." | grep -v "//"
# → Any repository call inside a stream/forEach = N+1 bug
```

**Known critical methods:**
```bash
# ProgressService.buildProgressSummary must not have per-subject DB calls
grep -n -A 30 "buildProgressSummary\|getProgressSummary" \
  Student-BackEnd/src/main/java/com/service/ProgressService.java | \
  grep "repository\." | grep -v "findByUserId\|findByUserId"
# → Should only show findByUserId (batch), not per-subject queries
```

---

## TASK 4 — Auth Flow Audit

```bash
# JWT filter must validate every request
find Student-BackEnd/src/main/java -name "JwtFilter*" -o -name "JwtAuthenticationFilter*"
cat that-file | grep -n "doFilter\|getHeader\|validateToken\|setAuthentication"
```

**Test manually:**
```bash
# Unauthenticated → 401
curl -s http://localhost:8080/api/progress/summary | python -m json.tool
# → {"error": "Unauthorized"} or 401 status

# Wrong role → 403
curl -s -b student.txt http://localhost:8080/api/admin/users | python -m json.tool
# → {"error": "Forbidden"} or 403 status

# Valid admin → 200
curl -s -b admin.txt http://localhost:8080/api/admin/users | python -m json.tool
# → Array of users
```

---

## TASK 5 — Error Handling Completeness

```bash
# Every controller should be wrapped by ControllerAdvice
# Test 404 case:
curl -s http://localhost:8080/api/subjects/fake-nonexistent-id-99999
# → Should return {"error":"..."} not HTML error page or stack trace

# Test invalid data:
curl -s -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid"}'
# → Should return {"error":"validation message"} not 500

# Test missing required field:
curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{}'
# → {"error":"..."} not 500 NullPointerException
```

---

## TASK 6 — XP & Quest Logic Audit

```bash
# Daily bonus uses takenAt (NOT completedAt)
grep -n "takenAt\|dailyBonus\|isFirstToday" \
  Student-BackEnd/src/main/java/com/service/QuizService.java
```

**Verify pass marks haven't changed:**
```bash
grep -n "CONCEPT_TOTAL\|SUBJECT_TOTAL\|ROADMAP_TOTAL\|passScore\|passNum\|8\|19\|35" \
  Student-BackEnd/src/main/java/com/config/QuizConstants.java
# → concept=8/10, subject=19/25, roadmap=35/50
```

**XP formula:**
```bash
grep -n "xpEarned\|score.*10\|dailyBonusEarned" \
  Student-BackEnd/src/main/java/com/service/QuizService.java
# → xpEarned = score * 10 + (isFirstToday ? 50 : 0)
```

---

## TASK 7 — Guest Account Audit

```bash
# Guest login creates correct role
grep -n "GUEST\|guestId\|guest_" \
  Student-BackEnd/src/main/java/com/service/AuthService.java

# Guest device reuse works
curl -X POST http://localhost:8080/api/auth/guest \
  -H "Content-Type: application/json" \
  -d '{"guestId":"test-device-123"}'
# → Should return same user on repeated calls with same guestId
```

---

## TASK 8 — DB Consistency Check

```bash
# Run backend then check seeded data
curl -s http://localhost:8080/api/subjects | python -m json.tool | grep '"title"'
# → Should show seeded subjects (HTML, CSS, JavaScript, Django, etc.)

curl -s http://localhost:8080/api/missions | python -m json.tool | grep -c '"title"'
# → Should show 55+ missions

# DataSeeder should not re-seed if data exists
grep -n "existsBy\|existsByTitle\|count()" \
  Student-BackEnd/src/main/java/com/config/DataSeeder.java | head -10
# → Guards must prevent duplicate seeding
```
