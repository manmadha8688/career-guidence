# /back-clean — Backend Unused Code & Dead Endpoint Cleanup

Safely remove unused code, dead methods, orphan endpoints, and redundant logic.

---

## STEP 1 — Dead Endpoints

```bash
# List all controller endpoints
grep -rn "@GetMapping\|@PostMapping\|@PutMapping\|@DeleteMapping" \
  Student-BackEnd/src/main/java/com/controller/ --include="*.java" | \
  grep -v "//"
```

**Cross-check with frontend api.js:**
```bash
grep -n "api\.get\|api\.post\|api\.put\|api\.delete" \
  FrontEnd/src/api/api.js | grep -v "//"
```

→ Any backend endpoint not called by frontend `api.js` is a candidate for removal.
→ **Exception:** endpoints used by future features or admin tools — mark NEEDS CONFIRMATION

---

## STEP 2 — Unused Service Methods

```bash
# Find public service methods
grep -rn "public " \
  Student-BackEnd/src/main/java/com/service/ --include="*.java" | \
  grep -v "//\|@Override\|class " | \
  sed 's/.*public //' | cut -d'(' -f1 | sort
```

→ For each: is it called by a controller or another service?
→ If zero callers and not in CacheWarmup → candidate for removal

---

## STEP 3 — Orphan Repository Methods

```bash
# List all custom repository methods
grep -rn "List\|Optional\|Page\|int\|boolean\|void" \
  Student-BackEnd/src/main/java/com/repository/ --include="*.java" | \
  grep "find\|count\|exists\|delete" | grep -v "//\|import\|class"
```

→ Each custom method should be called by at least one service
→ Unused: `searchSubjects`, `searchConcepts` — if confirmed unused in service → remove

---

## STEP 4 — Unused DTO Fields

```bash
# DTOs with fields that are never set or never read
find Student-BackEnd/src/main/java/com/dto -name "*.java"
# → Open each DTO and check: is every field populated and consumed?
```

---

## STEP 5 — DataSeeder Cleanup

```bash
# Check DataSeeder for commented-out or old seed methods
grep -n "//\|TODO\|FIXME\|deprecated" \
  Student-BackEnd/src/main/java/com/config/DataSeeder.java | head -20

# Check for seed methods no longer needed
grep -n "private.*seed\|private.*create\|private.*populate" \
  Student-BackEnd/src/main/java/com/config/DataSeeder.java
```

---

## STEP 6 — Dead Config Beans

```bash
# Check for beans that are never injected
grep -rn "@Bean" \
  Student-BackEnd/src/main/java/com/config/ --include="*.java"
# → Verify each @Bean is @Autowired or constructor-injected somewhere
```

---

## STEP 7 — After Cleanup Build

```bash
cd C:\manmadha\Student-project\Student-BackEnd
.\mvnw.cmd clean package -DskipTests 2>&1 | tail -3
# → BUILD SUCCESS required before any removal is complete
```

**Safety rule:** Remove one class/method at a time, build after each.
