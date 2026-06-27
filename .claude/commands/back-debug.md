# /back-debug — Backend Debug Workflow

Step-by-step debugging for any backend issue.

---

## IDENTIFY ISSUE TYPE FIRST

```
A) App won't start             → Section 1
B) 401 / auth errors           → Section 2
C) 403 / role errors           → Section 3
D) 404 / endpoint not found    → Section 4
E) 500 / server error          → Section 5
F) Slow responses              → Section 6
G) Data stale / not updating   → Section 7
H) DB / Atlas issues           → Section 8
```

---

## SECTION 1 — App Won't Start

```bash
# Run and capture full startup log
cd C:\manmadha\Student-project\Student-BackEnd
.\mvnw.cmd spring-boot:run 2>&1 | head -100
```

**Common causes:**
```
"Port 8080 already in use"
→ Kill existing process:
   PowerShell: Get-Process -Name java | Stop-Process

"MongoTimeoutException" or "unable to connect to MongoDB"
→ Check MONGODB_URI env var
→ Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for dev)
→ Check cluster is not paused (M0 free tier can pause after inactivity)

"Parameter 0 of constructor... not of required type"
→ Spring bean wiring issue — check @Service, @Repository annotations

"JWT_SECRET environment variable not set"
→ Set env var before running:
   $env:JWT_SECRET = "dev-secret-12345"
```

---

## SECTION 2 — 401 Unauthorized

```bash
# Test without cookie
curl -v http://localhost:8080/api/progress/summary 2>&1 | grep "< HTTP"
# → Should show: HTTP/1.1 401

# Test WITH valid cookie
curl -c cookies.txt -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"***REMOVED***"}' -s
curl -b cookies.txt -v http://localhost:8080/api/progress/summary 2>&1 | grep "< HTTP"
# → Should show: HTTP/1.1 200
```

**Debug path:**
```
401 still after login →
  Check: Is SESSION_TOKEN cookie being set after login?
  curl -v -X POST .../login → look for "Set-Cookie: SESSION_TOKEN"

  Check: Is JwtFilter intercepting request?
  grep -n "doFilterInternal\|getHeader\|JWT" Student-BackEnd/src/.../JwtFilter.java

  Check: SecurityConfig public paths correct?
  grep -n "permitAll\|antMatchers\|requestMatchers" \
    Student-BackEnd/src/.../SecurityConfig.java
```

---

## SECTION 3 — 403 Forbidden

```bash
# Verify user role in DB
curl -b cookies.txt http://localhost:8080/api/auth/me
# → Check "role" field: "STUDENT", "GUEST", or "ADMIN"

# Test admin endpoint with student cookie (expected 403)
curl -b student.txt http://localhost:8080/api/admin/users
```

**Debug path:**
```
403 when should be 200 →
  Check user.role in /api/auth/me response
  Check @PreAuthorize on the endpoint: @PreAuthorize("hasRole('ADMIN')")
  Check Spring Security role prefix: role must be stored as "ADMIN" not "ROLE_ADMIN"
  
  Fix if double prefix: grep "ROLE_" Student-BackEnd/src/...
```

---

## SECTION 4 — 404 Not Found

```bash
# Check endpoint actually exists
grep -rn '"/api/progress/summary"\|@GetMapping.*summary' \
  Student-BackEnd/src/main/java/com/controller/ --include="*.java"

# Check base path
grep -rn "@RequestMapping" \
  Student-BackEnd/src/main/java/com/controller/ --include="*.java"
# → Most controllers have @RequestMapping("/api/xxx")
```

**Common causes:**
```
→ Endpoint defined in controller but base path different
→ Method is correct but HTTP verb wrong (GET vs POST)
→ Path variable mismatch: /api/subjects/{id} but called as /api/subject/{id}
```

---

## SECTION 5 — 500 Server Error

```bash
# Check backend logs for stack trace
# Local: watch the terminal where spring-boot:run is running
# Render: Dashboard → Service → Logs tab

# Reproduce and get stack trace:
curl -v http://localhost:8080/api/failing-endpoint 2>&1
```

**Common causes:**
```
NullPointerException →
  Add null check before accessing nested object
  Check: is user authenticated? Is data present before accessing fields?

MongoException →
  Invalid ObjectId format passed to repository
  Check: id coming from route param — is it valid MongoDB ObjectId format?

JsonMappingException →
  Request body doesn't match DTO field names
  Check: field names in DTO vs what frontend sends
```

---

## SECTION 6 — Slow Response

```bash
# Time the slow endpoint
time curl -s -b cookies.txt http://localhost:8080/api/progress/summary > /dev/null

# Check if it's a cache miss
# First call is always slower (DB hit)
# Second call should be instant (Caffeine hit)
time curl -s -b cookies.txt http://localhost:8080/api/progress/summary > /dev/null
# → If 2nd call still slow: cache not working
```

**Debug cache:**
```bash
# Check CacheService is being called
grep -n "cacheService.get\|CacheService.get" \
  Student-BackEnd/src/main/java/com/service/ProgressService.java

# Check Caffeine bean is configured
grep -n "CacheManager\|Caffeine\|maximumSize\|expireAfterWrite" \
  Student-BackEnd/src/main/java/com/config/CacheConfig.java
```

---

## SECTION 7 — Stale Data After Admin Update

```bash
# Verify cache was evicted
# Check AdminService has CacheService.evict() after the mutation:
grep -n "evict\|save" \
  Student-BackEnd/src/main/java/com/service/AdminService.java
```

**Frontend cache is separate:**
```
Backend cache evicts immediately ✓
But frontend sessionStorage has 2-min TTL

→ After admin update: backend serves fresh data
→ Frontend still shows cached version for up to 2 minutes
→ Solution: hard refresh (Ctrl+F5) or wait 2 minutes
→ This is by design — see caching strategy in CLAUDE.md
```

---

## SECTION 8 — MongoDB / Atlas Issues

```bash
# Test Atlas connection
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"***REMOVED***"}'
# → If this fails: Atlas is unreachable
```

**Atlas checklist:**
```
☐ MongoDB Atlas cluster: is it running? (M0 free can be paused)
  → atlas.mongodb.com → check cluster status

☐ IP Whitelist: is your current IP allowed?
  → Atlas → Network Access → Add IP Address

☐ MONGODB_URI: correct format?
  → mongodb+srv://user:password@cluster.mongodb.net/learnData_db

☐ Database name: is it "learnData_db"?
  → Check last segment of connection string
```
