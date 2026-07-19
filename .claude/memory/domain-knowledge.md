# Domain Knowledge — LearnForEarn / ARISE

> The Solo Leveling vocabulary, the data model, and hard-won gotchas.

## Solo Leveling vocabulary → real concept
| In-app term | Actually means |
|-------------|----------------|
| **Gate** | Subject (a course; contains concepts) |
| **Sealed / cleared Gate** | Subject with 0 concepts done / fully completed |
| **Hunter** | The logged-in user |
| **Rank (E→S)** | XP tier of the hunter (and difficulty tag on subjects/concepts) |
| **Quest / Daily Quest** | A task; daily quests track first-concept-of-day etc. |
| **Path** | Roadmap (ordered subjects toward a role) |
| **The System / ARISE** | The app itself / the level-up UI voice |
| **Trial** | The quiz (unlocks at 100% concept progress) |
| **XP** | Experience points = quiz score × 10 (+50 first concept/day). Also from mission links (below), subject/roadmap quiz passes, badges. |

### Mission-link XP (awarded on verified submission, by mission rank)
A mission grants XP when the hunter links **verified** work: a GitHub repo (owned + exists) and a live deploy URL (reachable). Deploy > repo (running proof is worth more). Awarded **once per link**, reversed exactly if the link is cleared (no add/remove farming). Kept modest — XP also flows from quizzes/bonus/badges.

| Rank | Repo | Deploy | Total |
|---|---|---|---|
| D | 40 | 50 | 90 |
| C | 60 | 90 | 150 |
| B | 100 | 140 | 240 |
| A | 140 | 220 | 360 |
| S | 200 | 340 | 540 |

Impl: `MissionSubmission.repoXp/deployXp` (persisted, award-once ledger) + transient `xpEarned` (save-response delta for the "+N XP" toast). `MissionSubmissionService` awards via `ProgressService.awardXp/deductXp` (which evict `progress` summary); frontend `saveMissionSubmission` busts `progressSummary`+`hunterStats`.

### Profile-completion XP (awarded ONCE per item, NEVER reversed)
Granted the first time each item is observed complete; clearing a field / disconnecting a link never deducts or re-awards. Contact email is part of **Personal** (mobile is NOT required). Each social link awards separately.

| Item | Complete when | XP |
|---|---|---|
| Personal | fullName + bio + location + contact email (same-as-login OR verified public email) | 25 |
| Education | degree + fieldOfStudy + institution + years + cgpa | 30 |
| GitHub | account connected (OAuth) | 20 |
| LinkedIn | link saved (verified) | 20 |
| Portfolio | link saved (verified) | 20 |
| Resume | a resume created + featured on public profile (`featuredResumeId`) | 60 |

Impl: award-once booleans on `User` (`personalXpAwarded`/`educationXpAwarded`/`githubXpAwarded`/`linkedinXpAwarded`/`portfolioXpAwarded`/`resumeXpAwarded`, all `@JsonIgnore`) + transient `xpEarned`. Central `ProfileXpService.applyAwards(user)` mutates flags, applies XP via `ProgressService.applyXp` (in-memory, no save), then saves + evicts `progress`+`hunterStats` + the auth-lookup cache (`UserDetailsServiceImpl.evict`, to stop a stale principal double-awarding). Called from `ProfileService.updateOwnProfile` (returns `xpEarned` in the response map) and `GitHubLinkService.handleCallback` (GitHubAuthController appends `&xp=` to the `github=connected` redirect). Frontend shows "+N XP" toasts; `updateProfile` busts `progressSummary`+`hunterStats` when `xpEarned>0`. Existing users get a one-time backfill on their next save/connect.

## Data model (MongoDB collections)
- `users` — role STUDENT / GUEST / ADMIN, xp, level, avatarColor, username, `tokenVersion`, password (BCrypt). Index: email unique.
- `subjects` — rich fields (overview, whyLearn, forWho, prerequisites, outcomes, whatYouWillBuild, toolsRequired, careerUse), rank, difficulty, icon, color.
- `concepts` — subjectId ref (+ denormalized subjectTitle/subjectIcon), orderIndex, introduction, explanationSimple/Technical, syntax, examples[] (with optional demoHtml), keyPoints[], tip, commonMistakes[], videoUrl/videoTitle. Index: subjectId.
- `roadmaps` + `roadmap_subjects` (join) — roleTarget(s), estimatedWeeks, overview, prerequisites, outcomes.
- `user_concept_progress` — userId+conceptId (compound unique), completedAt. Manual uncomplete supported.
- `user_roadmap_enrollments` — paused boolean.
- `questions` — quiz questions per concept/subject/roadmap.
- `quiz_attempts` — quizType (concept|subject|roadmap), refId, score, total, passed, xpEarned, dailyBonusEarned, takenAt.
- `user_subject_badges` / `user_roadmap_badges` — earned badges.
- `certificates` — issued on roadmap/subject completion (see ProfileService / CertificateService).
- `missions` — category SUBJECT_PRACTICE|ACADEMIC|ROLE_BASED|REAL_WORLD, objectives, hints, approachGuide, commonMistakes.
- `problems` — track (6 tracks), difficulty, solutions[] (brute/normal/optimized), example1/2 + explanations.
- `aptitude_*` — AptitudeTopic/Group/Question + LogicalTopic/VerbalTopic collections.
- `bookmarks`, `reports`, `feedback`, `walkIns`, `login_events`, `user_daily_quests`.

## Gotchas (hard-won — do NOT relearn the hard way)
1. **CSS-var theming only.** Anything that changes with theme belongs in CSS (`var(--bg-primary)`), never `dark ? A : B` in JSX. Gradient text → `.lp-grad-text` class, never inline `background-clip:text`. Exceptions: cinematic loaders + auth left panel use hardcoded dark. See `feedback_theme_*` + `feedback_design.md`.
2. **JSX string bug.** Never put HTML tags or `${}` template literals inside string *values* in JSX — Vite renders a blank page. See `feedback_jsx_strings.md`.
3. **sessionStorage cache masks DB edits.** Manual Atlas edits won't show until the sessionStorage API cache TTL expires — clear DevTools session storage to see fresh data. See `feedback_cache_debug.md`.
4. **Cookie name is `jwt`** (httpOnly). Not `SESSION_TOKEN` (docs sometimes say that name loosely). JwtFilter filters cookies by `"jwt"`.
5. **Token revocation via `tokenVersion`** on the User doc — bump it to kill all live 24h tokens (password reset does this). No refresh token exists.
6. **No AppLayout** on Dashboard/Quiz/QuizResult/RoadmapDetail; QuizPage is 100vh fixed.
7. **Data Interpretation aptitude is frontend-rendered** (AptitudeCharts.jsx + dataInterpretationData.js), NOT stored as DB text.
8. **Seeding**: don't read DataSeeder for content format — fetch shape from live API; add `seedXxx()` methods directly. See `feedback_seeding_approach.md` + `content-pipeline` skill.
9. **APTITUDE** must be in backend bookmark `ALLOWED_TYPES`. See `project_aptitude_di.md`.
