# Security Rules

## Authentication

### Cookie-Based Auth (Required)
- JWT is stored in httpOnly cookie ONLY — never in localStorage, sessionStorage, or React state
- `axios.create({ withCredentials: true })` sends cookie on all requests
- 401 interceptor in api.js clears cache and redirects to /login

### Token Handling
- JWT secret: `JWT_SECRET` env var (strong 256-bit random string)
- JWT expiry: 24 hours
- Never log JWT tokens or sensitive auth data

### Frontend Auth Rules
- `AuthContext` is the ONLY source of truth for current user
- User role check: `user?.role === 'ADMIN'` — always use optional chaining
- Never trust frontend role checks for sensitive actions — backend MUST re-validate

## Environment Variables

### What Goes Where
```
VITE_ prefix = PUBLIC (embedded in JS bundle — never put secrets here)
               OK to have: VITE_API_URL (backend URL is public information)
               NEVER put: API keys, passwords, database credentials

Backend env vars (Render dashboard, never in code):
  MONGODB_URI      ← full Atlas connection string with password
  JWT_SECRET       ← cryptographically random 256-bit string
  CORS_ALLOWED_ORIGINS ← exact frontend URL (no trailing slash)
  SPRING_REDIS_URL ← Redis connection URL
```

### Gitignore Verification
The following must NEVER be committed:
- `.env.local`, `.env.*.local` (frontend)
- `application-local.properties` (backend)
- Any file containing `MONGODB_URI` or `JWT_SECRET`

## Input Validation

### Backend (Required)
- Use `@Valid` + `@NotBlank`, `@Email`, `@Size` on all `@RequestBody` DTOs
- Sanitize string inputs — strip HTML tags from user content before storing
- Validate file uploads if ever added (size limit, type whitelist)

### Frontend (Defense in Depth)
- `required` attribute on all required form inputs
- Client-side validation for email format and password strength
- But: never trust client validation alone — backend always re-validates

## CORS

- Allowed origins: from `CORS_ALLOWED_ORIGINS` env var only
- `SecurityConfig` reads env var, not hardcoded
- Never set `allowedOrigins("*")` in production
- Preflight requests handled by Spring Security

## Role-Based Access

### Backend
```java
@PreAuthorize("hasRole('ADMIN')")  // for admin endpoints
// or SecurityContextHolder.getContext().getAuthentication()
```

### Frontend
```jsx
<ProtectedRoute adminOnly>...</ProtectedRoute>
```

Both checks MUST exist. Frontend check prevents UI access. Backend check prevents API abuse.

## Data Exposure Rules

- Never return `password` field in any API response
- Never return the private login `email` in public-facing or list responses
- Exception: the public profile may show the user's opt-in `publicEmail` contact field
  (a separate `User.publicEmail`, empty by default, set on MyProfilePage) — never `user.email`
- Guest users: name displayed as `Guest#XXXX` (generated on creation)
- Admin stats show guest count but no guest PII

## Content Security

- No `dangerouslySetInnerHTML` usage anywhere in frontend
- Live code preview (DashboardPage ConceptInlinePanel) uses iframe with `sandbox="allow-scripts allow-same-origin"` — this is intentional for the interactive code runner
- User-submitted content (walk-in posts): displayed via React JSX (auto-escaped), not innerHTML
