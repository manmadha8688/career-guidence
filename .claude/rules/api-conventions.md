# API Conventions

> gstack `/review` reads this file for the project's REST shapes, error format, and cache-invalidation map.

## Base URL Pattern
```
/api/{resource}                → list / create
/api/{resource}/{id}           → get / update / delete
/api/{resource}/{id}/{action}  → enroll, pause, resume, start
/api/admin/{resource}          → admin-only endpoints
/api/auth/{action}             → register, login, guest, me, logout
```

## Endpoint Map (Frontend → Backend)

### Auth
| Frontend call | Backend endpoint | Method |
|---|---|---|
| `loginUser(data)` | `/api/auth/login` | POST |
| `registerUser(data)` | `/api/auth/register` | POST |
| `guestLogin(guestId?)` | `/api/auth/guest` | POST |
| `getMe()` | `/api/auth/me` | GET |

### Subjects & Concepts
| Frontend | Backend |
|---|---|
| `getSubjects()` | `GET /api/subjects` |
| `getSubject(id)` | `GET /api/subjects/{id}` |
| `getConcept(id)` | `GET /api/concepts/{id}` |
| `completeConcept(id)` | `POST /api/progress/concept/{id}/complete` |
| `uncompleteConcept(id)` | `DELETE /api/progress/concept/{id}/uncomplete` |

### Roadmaps
| Frontend | Backend |
|---|---|
| `getRoadmaps()` | `GET /api/roadmaps` |
| `getRoadmap(id)` | `GET /api/roadmaps/{id}` |
| `enrollRoadmap(id)` | `POST /api/roadmaps/{id}/enroll` |
| `pauseRoadmap(id)` | `POST /api/roadmaps/{id}/pause` |
| `resumeRoadmap(id)` | `POST /api/roadmaps/{id}/resume` |

### Quiz
| Frontend | Backend |
|---|---|
| `startConceptQuiz(id)` | `POST /api/quiz/concept/{id}/start` |
| `startSubjectQuiz(id)` | `POST /api/quiz/subject/{id}/start` |
| `startRoadmapQuiz(id)` | `POST /api/quiz/roadmap/{id}/start` |
| `submitQuiz(data)` | `POST /api/quiz/submit` |
| `getAttemptResult(id)` | `GET /api/quiz/attempt/{id}` |
| `getQuizStatus(type, id)` | `GET /api/quiz/{type}/{id}/status` |
| `getBulkSubjectStatus(ids)` | `GET /api/quiz/subjects/bulk-status?ids=…` |

### Progress
| Frontend | Backend |
|---|---|
| `getProgressSummary()` | `GET /api/progress/summary` |
| `getHunterStats()` | `GET /api/progress/hunter-stats` |

## Request / Response Format

### Success response
```json
{ "id": "...", "field": "value" }
// or for lists:
[ { "id": "...", ... } ]
```

### Error response (always)
```json
{ "error": "Human-readable message" }
```

### Auth header
Cookie: `SESSION_TOKEN=<jwt>` (httpOnly, sent automatically by browser)
Frontend: `axios.create({ withCredentials: true })`

## HTTP Status Codes Used
| Code | When |
|------|------|
| 200 | Success (GET, PUT) |
| 201 | Created (POST new resource) |
| 204 | Deleted (DELETE) |
| 400 | Bad request / validation error |
| 401 | Not authenticated (interceptor redirects to /login) |
| 403 | Authenticated but not authorized (wrong role) |
| 404 | Resource not found |
| 500 | Server error |

## Frontend Cache Invalidation After Mutations

When calling a mutation, clear these cache keys:
```js
// After completeConcept / uncompleteConcept:
clearApiCache('progressSummary', 'hunterStats', 'subject:' + subjectId, 'quizStatus:*')

// After enrollRoadmap / pauseRoadmap / resumeRoadmap:
clearApiCache('roadmap:' + id, 'roadmaps', 'enrolledRoadmaps')

// After admin subject/concept mutations:
clearApiCache('subjects', 'subject:*', 'concept:*')
```
