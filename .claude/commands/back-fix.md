# /back-fix — Fix Any Backend Issue

Identify → trace → fix. Step-by-step for every Spring Boot issue in this project.

---

## IDENTIFY YOUR ISSUE

```
A) App won't start at all             → Section 1
B) 401 Unauthorized on all requests  → Section 2
C) 403 Forbidden on valid requests   → Section 3
D) 404 Endpoint not found            → Section 4
E) 500 Internal Server Error         → Section 5
F) Slow response / timeout           → Section 6
G) Data stale after admin update     → Section 7
H) MongoDB / Atlas connection issue  → Section 8
I) CORS error from frontend          → Section 9
J) Quiz / XP / badge not working     → Section 10
K) Cache not working                 → Section 11
```

---

## SECTION 1 — App Won't Start

```powershell
cd C:\manmadha\Student-project\Student-BackEnd
.\mvnw.cmd spring-boot:run 2>&1 | head -80
```

**Common errors and fixes:**

```
Port 8080 already in use
→ Kill existing Java process:
   PowerShell: Get-Process -Name java | Stop-Process -Force

"Failed to configure a DataSource" or MongoTimeoutException
→ MongoDB Atlas unreachable
→ Check MONGODB_URI env var is set
→ Check your IP is in Atlas whitelist (Network Access tab)
→ Atlas free tier cluster might be paused — check atlas.mongodb.com

"Parameter 0 of constructor in X required a bean of type Y"
→ Spring bean wiring issue
→ Check @Service, @Repository, @Component annotations are present
→ Check the class is in the component scan path

"JWT_SECRET is not set" or "Could not determine field type"
→ Missing env var
→ Set locally: $env:JWT_SECRET = "dev-secret-for-testing-only"

"Application failed to start" + "Port already in use"
→ Check: netstat -ano | findstr :8080
→ Kill: taskkill /F /PID <pid>
```

---

## SECTION 2 — 401 Unauthorized

**Always getting 401 even after login?**

```bash
# Step 1: Verify login actually returns a cookie
curl -v -c cookies.txt -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"***REMOVED***"}' 2>&1 | \
  grep -E "Set-Cookie|HTTP/"
# → Must show: Set-Cookie: SESSION_TOKEN=...
# → If no Set-Cookie → login failed or cookie config broken

# Step 2: Use the cookie
curl -b cookies.txt http://localhost:8080/api/auth/me
# → Should return user object
```

**Debug JWT filter:**
```bash
grep -rn "doFilterInternal\|getHeader\|validateToken\|Bearer" \
  Student-BackEnd/src/main/java/com/ --include="JwtFilter.java" -o \
  --include="*AuthenticationFilter*"
# → Filter must extract "Authorization: Bearer <token>" header
# → OR cookie-based auth: reads SESSION_TOKEN cookie
```

**Debug SecurityConfig public paths:**
```bash
grep -n "permitAll\|requestMatchers\|antMatchers" \
  Student-BackEnd/src/main/java/com/config/SecurityConfig.java
# → /api/auth/** and /api/subjects and /api/missions should be public
# → /api/progress/** and /api/quiz/** need auth
```

---

## SECTION 3 — 403 Forbidden

**User authenticated but still 403:**

```bash
# Check user's actual role
curl -b cookies.txt http://localhost:8080/api/auth/me | python -m json.tool | grep role
# → "role": "STUDENT" or "ADMIN" or "GUEST"
```

**Admin endpoint getting 403:**
```bash
grep -rn "@PreAuthorize\|hasRole\|ADMIN" \
  Student-BackEnd/src/main/java/com/controller/ --include="*AdminController*"
# → Must have @PreAuthorize("hasRole('ADMIN')") at class level
# → Role in DB must be "ADMIN" not "ROLE_ADMIN" (Spring adds ROLE_ prefix internally)
```

**Fix role mismatch:**
```bash
# Check what role value is stored in MongoDB
# In Atlas: db.users.findOne({email: "admin@demo.com"}, {role: 1})
# → Should be: "ADMIN" (not "ROLE_ADMIN")
```

---

## SECTION 4 — 404 Not Found

```bash
# List all endpoints
grep -rn "@GetMapping\|@PostMapping\|@PutMapping\|@DeleteMapping" \
  Student-BackEnd/src/main/java/com/controller/ --include="*.java" | \
  grep -v "//\|import" | head -30

# Check base path of controller
grep -rn "@RequestMapping" \
  Student-BackEnd/src/main/java/com/controller/ --include="*.java"
```

**Common causes:**
```
Wrong HTTP method → GET called as POST
→ Check api.js: api.get vs api.post

Path variable mismatch
→ Backend: /api/subjects/{id}
→ Frontend calling: /api/subject/{id} (missing 's')

Controller not registered
→ Missing @RestController annotation
→ Class not in component scan path
```

---

## SECTION 5 — 500 Internal Server Error

```bash
# Get the stack trace (check Render logs in production)
# Locally: the terminal running spring-boot:run shows it

# Reproduce locally:
curl -v http://localhost:8080/api/failing-endpoint 2>&1
# → Look at terminal for: "java.lang.NullPointerException" or similar
```

**Most common causes:**

```
NullPointerException
→ Accessing .method() on null object
→ Add null check: if (user == null) return ResponseEntity.notFound().build()
→ Or use Optional: userRepository.findById(id).orElseThrow()

MongoException: "could not convert 'abc' to ObjectId"
→ Invalid MongoDB ID format passed
→ Validate ID before query: if (!ObjectId.isValid(id)) throw new BadRequestException(...)

HttpMessageNotReadableException
→ Request body doesn't match DTO
→ Check field names match exactly (camelCase matters)
→ Check required fields are present in request

LazyInitializationException (if using JPA, not likely with Mongo)
→ Not applicable for this MongoDB project
```

---

## SECTION 6 — Slow Response / Timeout

```bash
# Time the slow endpoint
time curl -s -b cookies.txt http://localhost:8080/api/progress/summary > /dev/null
# → First call: < 500ms expected
# → Second call: < 50ms expected (Caffeine cache hit)
# → If both are slow: cache is broken
```

**Diagnose slow progress summary:**
```bash
grep -n "repository\." \
  Student-BackEnd/src/main/java/com/service/ProgressService.java | \
  grep -v "//\|private"
# → Should show only: findByUserId (ONE call per repository)
# → If shows: findByUserIdAndSubjectId in a loop → N+1 bug → major slowdown
```

**N+1 fix pattern:**
```java
// SLOW (N queries for N subjects):
subjects.forEach(s -> {
    long count = progressRepo.countByUserIdAndSubjectId(userId, s.getId()); // N calls!
});

// FAST (1 query, process in memory):
List<UserConceptProgress> all = progressRepo.findByUserId(userId);
Map<String, Long> bySubject = all.stream()
    .collect(Collectors.groupingBy(p -> p.getSubjectId(), Collectors.counting()));
```

---

## SECTION 7 — Stale Data After Admin Update

```bash
# Verify cache is being evicted after save
grep -n "evict\|\.save\|\.delete" \
  Student-BackEnd/src/main/java/com/service/AdminService.java | head -20
# → Every save/delete must have CacheService.evict() immediately after
```

**Eviction pattern to add if missing:**
```java
public Subject updateSubject(String id, SubjectRequest req) {
    Subject saved = subjectRepository.save(map(id, req));
    cacheService.evict("subjects", "all");           // ← required
    cacheService.evict("subjects", "id:" + id);     // ← required
    return saved;
}
```

**Frontend cache is separate (2-min TTL):**
```
Backend evicts immediately → next backend call serves fresh data
But frontend sessionStorage keeps old data for 2 more minutes
→ Tell user: wait 2 min or Ctrl+F5 (clears sessionStorage)
→ This is expected behaviour, not a bug
```

---

## SECTION 8 — MongoDB / Atlas Issue

```bash
# Test connection from your machine
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"***REMOVED***"}' -s | python -m json.tool
# → If {"error":"..."} or timeout → Atlas unreachable
```

**Atlas diagnostic checklist:**
```
1. Go to atlas.mongodb.com → Clusters
   → Is cluster status: Active? (not paused)
   → Click Resume if paused

2. Network Access tab
   → Is 0.0.0.0/0 added? (required for Render + local dev)
   → Or add your current IP for local only

3. Database Access tab
   → Does user have readWrite on learnData_db?

4. MONGODB_URI format check:
   → Must be: mongodb+srv://user:pass@cluster.mongodb.net/learnData_db
   → NOT: mongodb://... (must be SRV format for Atlas)
   → Password: URL-encode special chars (e.g. @ → %40, , → %2C)
```

---

## SECTION 9 — CORS Error From Frontend

**Symptom:** Browser console shows:
`Access to fetch at '...' from origin '...' has been blocked by CORS policy`

```bash
# Check what CORS_ALLOWED_ORIGINS is set to
grep -rn "CORS_ALLOWED_ORIGINS\|allowedOrigins\|CorsConfiguration" \
  Student-BackEnd/src/main/java/com/ --include="*.java" | grep -v "//"

# Test CORS manually:
curl -H "Origin: https://learnforearn.com" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS \
  http://localhost:8080/api/subjects -v 2>&1 | grep "Access-Control"
# → Must show: Access-Control-Allow-Origin: https://learnforearn.com
```

**Common CORS mistakes:**
```
Trailing slash in origin:
→ "https://learnforearn.com/" ← WRONG
→ "https://learnforearn.com"  ← CORRECT

Wildcard in production:
→ Never use: allowedOrigins("*") with credentials
→ Must be exact URL

Origin not set in env var:
→ CORS_ALLOWED_ORIGINS must be in Render dashboard env vars
→ Check it's not empty or missing
```

---

## SECTION 10 — Quiz / XP / Badge Not Working

**Quiz XP not earned:**
```bash
grep -n "xpEarned\|score.*10\|dailyBonus" \
  Student-BackEnd/src/main/java/com/service/QuizService.java
# → xpEarned = score × 10 + (dailyBonus ? 50 : 0)
```

**Daily bonus never triggers:**
```bash
grep -n "takenAt\|isFirstToday\|dailyBonusEarned" \
  Student-BackEnd/src/main/java/com/service/QuizService.java
# → Must use QuizAttempt.takenAt for "first today" check
# → NOT UserConceptProgress.completedAt
```

**Pass marks:**
```bash
grep -rn "passScore\|passNum\|CONCEPT_TOTAL\|SUBJECT_TOTAL\|ROADMAP_TOTAL" \
  Student-BackEnd/src/main/java/com/config/QuizConstants.java
# → Concept: 8/10, Subject: 19/25, Roadmap: 35/50
```

**Badge not awarded after subject quiz:**
```bash
grep -n "badge\|UserSubjectBadge\|saveBadge\|createBadge" \
  Student-BackEnd/src/main/java/com/service/QuizService.java
# → Badge created when: passed=true AND type=subject
# → Badge must be saved to user_subject_badges collection
```

---

## SECTION 11 — Cache Not Working

**Data always slow (Caffeine not hitting):**
```bash
# Check CacheService is being called in the service
grep -rn "cacheService.get\|CacheService.get" \
  Student-BackEnd/src/main/java/com/service/ --include="*.java"
# → If empty: service methods read directly from repository without cache

# Check CacheWarmup ran on startup
grep -n "ApplicationReadyEvent\|warmAll\|loadAll" \
  Student-BackEnd/src/main/java/com/config/CacheWarmup.java
# → Must fire on ApplicationReadyEvent to pre-fill Caffeine
```

**Cache not evicting after mutations:**
```bash
grep -n "evict\|save\|delete" \
  Student-BackEnd/src/main/java/com/service/AdminService.java | \
  paste - - | head -20
# → Every save() must be followed by evict() on the next line
```

**Redis not connecting (prod only):**
```bash
# Check Redis env var is set
grep -rn "SPRING_REDIS_URL\|spring.redis\|spring.data.redis" \
  Student-BackEnd/src/main/resources/ --include="*.yml" --include="*.properties"
# → prod profile must read: ${SPRING_REDIS_URL}
# → local profile must disable Redis: spring.cache.type=caffeine
```
