# /back-test — Backend API Testing

Complete endpoint test suite for the Spring Boot backend.

---

## SETUP — Start Backend & Get Cookies

```powershell
# Terminal 1: Start backend
$env:JAVA_HOME = "C:\Users\ManmadhaJayamangala\.p2\pool\plugins\org.eclipse.justj.openjdk.hotspot.jre.full.win32.x86_64_21.0.11.v20260515-1531\jre"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
cd C:\manmadha\Student-project\Student-BackEnd
.\mvnw.cmd spring-boot:run
```

```bash
# Terminal 2: Get auth cookies
# Admin cookie
curl -c admin.txt -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"Admin@123"}' | python -m json.tool

# Student cookie
curl -c student.txt -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"Test@1234"}' | python -m json.tool
```

---

## TEST GROUP 1 — Health & Auth

```bash
echo "=== 1.1 Health ===" && \
curl -s http://localhost:8080/actuator/health | python -m json.tool

echo "=== 1.2 Unauthenticated /me → 401 ===" && \
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/auth/me

echo "=== 1.3 Admin /me → 200 ===" && \
curl -s -b admin.txt http://localhost:8080/api/auth/me | python -m json.tool

echo "=== 1.4 Student /me → 200 ===" && \
curl -s -b student.txt http://localhost:8080/api/auth/me | python -m json.tool | grep '"role"'

echo "=== 1.5 Guest Login ===" && \
curl -s -X POST http://localhost:8080/api/auth/guest \
  -H "Content-Type: application/json" \
  -d '{}' | python -m json.tool | grep '"role"'
```

---

## TEST GROUP 2 — Public Endpoints

```bash
echo "=== 2.1 Subjects list ===" && \
curl -s http://localhost:8080/api/subjects | python -m json.tool | grep '"title"' | head -5

echo "=== 2.2 Missions list ===" && \
curl -s http://localhost:8080/api/missions | python -m json.tool | grep '"title"' | head -5

echo "=== 2.3 Problems - Start Coding track ===" && \
curl -s "http://localhost:8080/api/problems?track=START_CODING" | \
  python -m json.tool | grep '"title"' | head -5

echo "=== 2.4 Public stats ===" && \
curl -s http://localhost:8080/api/public-stats | python -m json.tool
```

---

## TEST GROUP 3 — Student Protected Endpoints

```bash
echo "=== 3.1 Progress summary ===" && \
curl -s -b student.txt http://localhost:8080/api/progress/summary | \
  python -m json.tool | grep '"xp"\|"level"\|"completedConceptToday"'

echo "=== 3.2 Hunter stats ===" && \
curl -s -b student.txt http://localhost:8080/api/progress/hunter-stats | \
  python -m json.tool | head -20

echo "=== 3.3 Roadmaps ===" && \
curl -s -b student.txt http://localhost:8080/api/roadmaps | \
  python -m json.tool | grep '"title"'
```

---

## TEST GROUP 4 — Role-Based Access Control

```bash
echo "=== 4.1 Student → admin endpoint → MUST be 403 ===" && \
curl -s -o /dev/null -w "%{http_code}\n" -b student.txt \
  http://localhost:8080/api/admin/users

echo "=== 4.2 Unauthenticated → progress → MUST be 401 ===" && \
curl -s -o /dev/null -w "%{http_code}\n" \
  http://localhost:8080/api/progress/summary

echo "=== 4.3 Admin → admin endpoint → MUST be 200 ===" && \
curl -s -o /dev/null -w "%{http_code}\n" -b admin.txt \
  http://localhost:8080/api/admin/users

echo "=== 4.4 Admin → admin stats ===" && \
curl -s -b admin.txt http://localhost:8080/api/admin/stats | python -m json.tool
```

---

## TEST GROUP 5 — Quiz Flow

```bash
# Get a concept ID first
CONCEPT_ID=$(curl -s http://localhost:8080/api/subjects | \
  python -m json.tool 2>/dev/null | grep '"id"' | head -1 | \
  sed 's/.*: "//;s/".*//')

echo "Subject ID found: $CONCEPT_ID"

echo "=== 5.1 Start concept quiz ===" && \
curl -s -b student.txt -X POST \
  "http://localhost:8080/api/quiz/concept/${CONCEPT_ID}/start" | \
  python -m json.tool | grep '"questions"\|"attemptId"'

echo "=== 5.2 Quiz status ===" && \
curl -s -b student.txt \
  "http://localhost:8080/api/quiz/concept/${CONCEPT_ID}/status" | \
  python -m json.tool
```

---

## TEST GROUP 6 — Admin CRUD

```bash
echo "=== 6.1 Admin users list (paginated) ===" && \
curl -s -b admin.txt "http://localhost:8080/api/admin/users?page=0&size=5" | \
  python -m json.tool | grep '"fullName"\|"role"' | head -10

echo "=== 6.2 Admin feedbacks ===" && \
curl -s -b admin.txt http://localhost:8080/api/feedback | python -m json.tool | head -20

echo "=== 6.3 Admin reports ===" && \
curl -s -b admin.txt http://localhost:8080/api/reports | python -m json.tool | head -20
```

---

## TEST GROUP 7 — Error Handling

```bash
echo "=== 7.1 Invalid ID → 404 or 400 ===" && \
curl -s http://localhost:8080/api/subjects/INVALID_ID_FORMAT_12345 | python -m json.tool

echo "=== 7.2 Invalid login → error message ===" && \
curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wrong@test.com","password":"wrong"}' | python -m json.tool

echo "=== 7.3 Missing required fields → validation error ===" && \
curl -s -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"bad"}' | python -m json.tool
```

---

## PASS / FAIL SCORECARD

| Test | Expected | Result |
|------|----------|--------|
| 1.1 Health | `{"status":"UP"}` | |
| 1.2 Unauth /me | 401 | |
| 2.1 Subjects | Array with titles | |
| 2.2 Missions | 55+ items | |
| 4.1 Student→Admin | 403 | |
| 4.2 Unauth→Progress | 401 | |
| 4.3 Admin→Admin | 200 | |
| 7.2 Wrong password | `{"error":"..."}` | |

All 8 must pass before deployment.
