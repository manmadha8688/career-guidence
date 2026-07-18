# Code Style — LearnForEarn / ARISE

> Naming and style conventions gstack `/review` reads to know this repo.
> For depth: visual/design → [design.md](design.md); React structure/state → [frontend.md](frontend.md); Spring layers/cache → [backend.md](backend.md).

---

## Frontend (React 19 + Vite 8)

### File & symbol naming
| Kind | Pattern | Location |
|---|---|---|
| Page | `XxxPage.jsx` | `src/pages/` |
| Panel (own state + API calls) | `XxxPanel.jsx` | co-located `panels/` |
| Modal (overlay + scroll lock) | `XxxModal.jsx` | co-located `modals/` |
| Mobile-only overlay | `MobileXxx.jsx` | co-located `mobile/` |
| Hook | `useXxx.js` | `src/hooks/` |
| Shared UI | PascalCase `.jsx` | `src/components/` |

- Components PascalCase; hooks camelCase `use*`; utils camelCase.
- One default-exported component per page/panel/modal file.

### CSS / theming (hard rules)
- **CSS variables for ALL theming** — `var(--bg-primary)`, `var(--text-primary)`, `var(--ps-card-bg)`. Never `dark ? colorA : colorB` for backgrounds/text/borders.
- **Gradient text → CSS class only** (`.lp-grad-text`, `.lp-grad-orange`, `.lp-grad-blue`, `.mission-title-grad`). Never inline `background-clip: text`.
- Per-item accents via scoped custom prop + `color-mix(in srgb, var(--accent) 12%, var(--ps-card-bg))`.
- Class names: kebab-case, BEM-ish, feature prefix — `.sl-panel`, `.gym-path__card`, `.lp-hero__punch`.
- New section styles go in the matching file under `src/styles/pages/…` — do NOT dump into `global.css`.
- Every new surface must be verified in **both** light and dark themes.
- Loader/auth-left-panel hardcoded darks are the only sanctioned exceptions.

### Motion & fonts
- **framer-motion** for React-driven animation; CSS `@keyframes` for ambient loops.
- Shared ease: `const EASE = [0.16, 1, 0.3, 1]`.
- Entrances: `whileInView` + `viewport={{ once: true, amount: 0.3 }}`, stagger `delay: i * 0.05–0.08`.
- Animate only `transform` / `opacity` in loops. Always add `@media (prefers-reduced-motion: reduce)`.
- Fonts: **Orbitron** (headings, numbers, ranks, stats), **Rajdhani** (body, buttons, labels), **Share Tech Mono** (code, metadata, eyebrows).

### API & state style
- All API calls through `src/api/api.js` — never import axios in a page/component.
- Reads use `withCache(key, ttl, fn)`; mutations call `clearApiCache(...)` for affected keys.
- Local `useState` first; Context only for auth (`AuthContext`) and theme (`ThemeContext`). No Redux/Zustand/new context.
- Async effects use the `let active = true` guard + cleanup. Clean up every interval/timeout/listener.

---

## Backend (Spring Boot 3.3.5 / Java 21)

### Style
- **Thin controllers** — no business logic. Return `ResponseEntity<T>` with correct status codes. No `@CrossOrigin` (CORS is global in `SecurityConfig`).
- Strict layering: **Controller → Service → Repository**. Never skip a layer.
- **Lombok** for boilerplate (`@Getter/@Setter/@Builder/@RequiredArgsConstructor`) — do not hand-write trivial getters/setters where Lombok is already used.
- Constructor injection (via `@RequiredArgsConstructor` `final` fields), not field `@Autowired`.
- Services own caching (`CacheService.get/evict`); repositories are query-only.
- Never return `null` from a service — empty list / `Optional` / throw with a clear message.

### Naming
- Classes PascalCase (`ProfileService`, `QuizController`); methods/fields camelCase.
- Repositories extend `MongoRepository<T, String>`; custom finders use derived names (`findByUserIdAndSubjectIdIn`) or `@Query`.
- Collections snake_case plural; fields camelCase (Spring maps automatically).

### DTOs (hard rule)
- Use DTOs for responses — never expose a `@Document` model with sensitive fields directly.
- **DTOs never expose `password`; never expose `email` in public/list responses.** Guest name shown as `Guest#XXXX`.

### Errors
- Throw `RuntimeException` subclasses with clear messages; `@ControllerAdvice` returns `{ "error": "message" }`.
- 400 bad input · 401 unauthenticated · 403 wrong role · 404 not found · 500 unexpected.
- **Never silently swallow a caught exception** — at minimum `log.error("context", e)` before any fallback/redirect. Empty `catch {}` (or catch that only redirects) hides prod failures.

---

## Code hygiene (both stacks — apply by default)
- **No dead code.** Don't leave exports/functions/props/vars that nothing imports or uses. Remove them (verify unused across `src/` / the module first). ESLint bar stays **0 errors**; don't add new warnings.
- **No obvious/narrating comments.** Comment intent, trade-offs, and non-obvious constraints only.
- **Dev-only surfaces gated:** demo/debug routes render only under `import.meta.env.DEV` (redirect to `/` in prod). Never ship a debug route to production.
- Keep changes **behavior-preserving** unless the task says otherwise: same output, same API contract, same UI. Optimize the implementation, not the result.
