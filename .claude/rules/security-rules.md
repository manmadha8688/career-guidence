# Security Rules (gstack) — LearnForEarn / ARISE

> Condensed, enforceable checklist gstack `/review` and `/cso` read for this repo.
> Full rationale and CORS/CSP detail in [security.md](security.md).

---

## Auth & session
- **httpOnly cookie ONLY.** JWT is never stored in `localStorage`, `sessionStorage`, or React state. Auth state lives only in `AuthContext` (populated from `GET /api/auth/me`).
- `axios.create({ withCredentials: true })` — cookie sent automatically. 401 interceptor clears cache and redirects to `/login`.
- JWT: 24h expiry, `JWT_SECRET` env var only. BCrypt work factor **12** for password hashing. Google Sign-In ID tokens verified server-side against `GOOGLE_CLIENT_ID`. OTP via Brevo.
- **`logout()` MUST preserve `guest_device_id` and `theme`** in localStorage; clear everything else + API cache.

## Secrets & config
- Secrets only in env vars, never in source or git: `MONGODB_URI`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`, `SPRING_REDIS_URL`, `BREVO_API_KEY`, `GOOGLE_CLIENT_ID`, `COOKIE_SECURE`, `APP_URL`.
- `VITE_` vars are PUBLIC (bundled) — only non-secret values (`VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`). Never a secret behind a `VITE_` prefix.
- Never commit `.env.local`, `.env.*.local`, `application-local.properties`, or anything containing `MONGODB_URI`/`JWT_SECRET`.
- Never log JWTs or credentials.

## Authorization
- Admin endpoints require `@PreAuthorize("hasRole('ADMIN')")` (or `SecurityContextHolder` role check). Backend re-validates every time — never trust the frontend role check.
- Frontend gate: `<ProtectedRoute adminOnly>` for admin routes; `user?.role === 'ADMIN'` with optional chaining. Both layers required.
- CORS origins from `CORS_ALLOWED_ORIGINS` env var only — never hardcoded, never `"*"` in prod.

## Data exposure
- **DTOs never return `password`.** **`email` never appears in public/list responses.** Guest displayed as `Guest#XXXX`; admin stats show counts, no guest PII.

## Content / injection
- No `dangerouslySetInnerHTML` anywhere. User content rendered via JSX (auto-escaped).
- The only sanctioned raw-HTML surface is the interactive code runner iframe (`sandbox="allow-scripts allow-same-origin"`) — intentional, do not extend the pattern elsewhere.
- Backend validates all `@RequestBody` DTOs (`@Valid` + `@NotBlank`/`@Email`/`@Size`); strip HTML from stored user strings. Frontend validation is defense-in-depth only.
