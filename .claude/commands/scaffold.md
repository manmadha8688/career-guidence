# /scaffold — Add a New Module (Frontend Page or Backend Resource)

How to add a new module in the LearnForEarn / ARISE repo without breaking layering, caching,
or theming. Follow the boundaries in `.claude/rules/architecture-boundaries.md` (layer rules,
cache flow, no-AppLayout pages). Data-drive markup; reuse existing tokens/components/hooks.

Ask first: is this a **frontend page**, a **backend resource**, or **both** (a full feature —
then also run `/feature`)?

---

## A — New Frontend Page

1. **Create the page component** under the correct `pages/` subfolder:
   - AI tool → `pages/ailab/` (+ register in `toolComponents.js` lazy map)
   - Skill Arena panel/modal/mobile → `student-skill-arena/panels|modals|mobile/`
   - Admin CRUD → `admin-skill-arena/`
   - Problem track → `problem-solving/`
   - Deployment guide → thin wrapper in `deployment/` + data file in `deployment/guides/`
   - Otherwise a top-level `XxxPage.jsx` in `pages/`
   - Naming: `XxxPage.jsx` / `XxxPanel.jsx` (own state+API) / `XxxModal.jsx` (uses `useBodyLock`) / `MobileXxx.jsx`

2. **Add the lazy route in `App.jsx`:**
   ```jsx
   const XxxPage = lazy(() => import('./pages/XxxPage'))
   // <Route path="/xxx" element={<ProtectedRoute><XxxPage /></ProtectedRoute>} />
   // admin → <ProtectedRoute adminOnly> ; catch-all stays → NotFoundPage
   ```
   - Do NOT add an eager import. Add to `usePrefetchRoutes()` only if it's a high-traffic route.
   - No AppLayout on Dashboard/Quiz/QuizResult/RoadmapDetail-style full-page layouts.

3. **Add API calls in `src/api/api.js`** (never import axios in a page):
   ```js
   export const getXxx = (id) => withCache(`xxx:${id}`, 2*60_000, () => api.get(`/xxx/${id}`))
   export const updateXxx = async (id, body) => {
     const r = await api.put(`/xxx/${id}`, body)
     clearApiCache(`xxx:${id}`, 'xxxList')   // bust matching keys
     return r.data
   }
   ```
   - Reads → `withCache(key, ttl, fn)`. Mutations → clear the matching keys.

4. **Styles** under `src/styles/pages/…` with a feature class prefix (`.xxx-…`). CSS vars for all
   colors, both themes. Gradient text via `.lp-grad-text`. Motion via framer-motion + `EASE` +
   `prefers-reduced-motion` fallback.

5. **Verify:** `cd FrontEnd && npm run build && npx eslint src` → 0 errors; check both themes.

---

## B — New Backend Resource

Keep the layering: **Controller → Service → Repository**, caching in the Service only.

1. **Model** — `model/Xxx.java`, `@Document(collection = "xxxs")` (snake_case plural collection,
   camelCase fields). Index `userId` if user-specific. See `.claude/rules/database.md`.

2. **Repository** — `repository/XxxRepository extends MongoRepository<Xxx, String>`. Batch finders
   (`findByUserIdAndRefIdIn`) — never per-item queries in a loop.

3. **Service** — `service/XxxService.java`:
   ```java
   public List<Xxx> getAll() { return cacheService.get("xxxs", "all", xxxRepository::findAll); }
   public Xxx update(String id, XxxRequest r) {
       Xxx saved = xxxRepository.save(map(r));
       cacheService.evict("xxxs", "all");
       cacheService.evict("xxxs", "id:" + id);   // evict EVERY affected key (both cache levels)
       return saved;
   }
   ```
   - Reads via `cacheService.get(name, key, supplier)`. Never return `null`.

4. **Controller** — `controller/XxxController.java`, thin, `ResponseEntity<T>`, correct status codes,
   `@PreAuthorize("hasRole('ADMIN')")` on admin endpoints. No `@CrossOrigin` (CORS is global).
   Follow the `/api/{resource}/{id}/{action}` shape in `.claude/rules/api-conventions.md`.

5. **DTO** — `dto/XxxDTO.java` if the model has sensitive fields. Never expose `password`; don't leak
   `email` in list/public responses.

6. **Cache warm-up** — if the data is static-ish (loaded frequently, changes only on admin mutation),
   add it to `CacheWarmup.java`. Never warm user-specific data (progress/quiz status).

7. **Verify:** `cd Student-BackEnd; .\mvnw.cmd clean package -DskipTests` compiles clean.

---

## OUTPUT

List every file created/changed, the route/endpoint added, cache keys touched (read TTL + evict set),
and the build/eslint/compile result. Then suggest `/team-review` on the diff.
