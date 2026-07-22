import axios from 'axios'
import { buildLoginReturnUrl } from '../utils/authRedirect'
import { clearBrowserSessionPreservingPrefs } from '../utils/browserSession'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// 60s ceiling: generous enough to survive a cold Render free-tier spin-up,
// but bounded so a truly hung request fails fast (mapped to a friendly
// timeout message in utils/apiError.js) instead of spinning forever.
const api = axios.create({ baseURL: BASE_URL, withCredentials: true, timeout: 60000 })

const AUTH_PUBLIC_PATHS = ['/login', '/register', '/forgot-password']

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401 && !AUTH_PUBLIC_PATHS.includes(window.location.pathname)) {
      clearUserCache()
      clearBrowserSessionPreservingPrefs()
      window.location.href = buildLoginReturnUrl(window.location.pathname, window.location.search)
    }
    return Promise.reject(err)
  }
)

// ─── CLIENT-SIDE CACHE ───────────────────────
// sessionStorage so cache survives full-page reloads (logout redirect, etc.)
// _inflight deduplicates concurrent requests that start before the first resolves
const CACHE_NS = '__sl_api__'
const _inflight = {}

function _read() {
  try { return JSON.parse(sessionStorage.getItem(CACHE_NS) || '{}') } catch { return {} }
}
function _write(store) {
  try { sessionStorage.setItem(CACHE_NS, JSON.stringify(store)) } catch (e) {
    if (import.meta.env.DEV) console.warn('[api] cache write failed:', e.message)
  }
}

function withCache(key, ttlMs, fn) {
  const store = _read()
  const hit = store[key]
  if (hit && Date.now() - hit.ts < ttlMs) return Promise.resolve({ data: hit.data })
  if (_inflight[key]) return _inflight[key]
  const p = fn()
    .then(res => { const s = _read(); s[key] = { data: res.data, ts: Date.now() }; _write(s); delete _inflight[key]; return res })
    .catch(e  => { delete _inflight[key]; throw e })
  _inflight[key] = p
  return p
}

export function clearApiCache(...keys) {
  if (!keys.length) { sessionStorage.removeItem(CACHE_NS); return }
  const store = _read()
  keys.forEach(k => {
    if (k.endsWith('*')) {
      const pfx = k.slice(0, -1)
      Object.keys(store).filter(ck => ck.startsWith(pfx)).forEach(ck => delete store[ck])
    } else { delete store[k] }
  })
  _write(store)
}

// Wipes the ENTIRE client API cache. Called on login (switching users) and
// logout so no per-user data can leak or go stale across accounts —
// progress, roadmap enrolment, quiz status, walk-in ownership (`mine`),
// admin stats, etc. Global content (subjects/missions/problems) simply
// refetches on next use, a negligible cost for guaranteed correctness.
export function clearUserCache() {
  clearApiCache()
}

// ─── PUBLIC ──────────────────────────────────
export const getPublicStats = () => withCache('publicStats', 5*60_000, () => api.get('/public-stats'))

// ─── AUTH ────────────────────────────────────
export const registerUser     = (data)      => api.post('/auth/register', data)
export const sendOtp          = (email)     => api.post('/auth/send-otp', { email })
export const verifyOtp        = (email, otp) => api.post('/auth/verify-otp', { email, otp })
export const loginUser        = (data)      => api.post('/auth/login', data)
export const googleLogin      = (credential) => api.post('/auth/google', { credential })
export const guestLogin       = (guestId)   => api.post('/auth/guest', guestId ? { guestId } : {})
export const getMe            = ()          => api.get('/auth/me')
export const forgotPassword       = (email) => api.post('/auth/forgot-password', { email })
export const verifyForgotPasswordOtp = (email, otp) => api.post('/auth/forgot-password/verify-otp', { email, otp })
export const resetPassword        = (email, newPassword) => api.post('/auth/reset-password', { email, newPassword })

// ─── SUBJECTS ────────────────────────────────
export const getSubjects      = ()          => withCache('subjects',          2*60_000, () => api.get('/subjects'))
export const getSubject       = (id)        => withCache(`subject:${id}`,     2*60_000, () => api.get(`/subjects/${id}`))
// ─── CONCEPTS ────────────────────────────────
export const getConcept       = (id)        => withCache(`concept:${id}`,     2*60_000, () => api.get(`/concepts/${id}`))

// ─── PROGRESS ────────────────────────────────
export const getProgressSummary = ()        => withCache('progressSummary',   60_000,   () => api.get('/progress/summary'))
export const getHunterStats     = ()        => withCache('hunterStats',        60_000,   () => api.get('/progress/hunter-stats'))
export const getDashboardBootstrap = ()     => withCache('dashboardBootstrap', 30_000,   () => api.get('/dashboard/bootstrap').then(res => {
  const store = _read()
  const ts = Date.now()
  if (res.data?.progressSummary) store.progressSummary = { data: res.data.progressSummary, ts }
  if (res.data?.quests) store.quests = { data: res.data.quests, ts }
  if (res.data?.roadmaps) store.roadmaps = { data: res.data.roadmaps, ts }
  if (res.data?.quizHistory) store['quizHistory:5'] = { data: res.data.quizHistory, ts }
  _write(store)
  return res
}))

// ─── DAILY QUESTS ────────────────────────────
// Server-authoritative daily quests. Not cached: the state changes with each study
// ping and must reflect the concept-quest sync immediately.
export const getQuests   = ()  => withCache('quests', 60_000, () => api.get('/progress/quests'))
export const studyPing   = ()  => api.post('/progress/study-ping').then(r => { clearApiCache('quests'); return r })

// ─── CERTIFICATES ────────────────────────────
export const getCertificates   = ()      => withCache('certificates', 60_000, () => api.get('/certificates'))
export const getCertificate    = (id)    => api.get(`/certificates/${id}`)
export const verifyCertificate = (code)  => api.get(`/certificates/verify/${encodeURIComponent(code)}`)

// ─── ROADMAPS ────────────────────────────────
export const getRoadmaps        = ()        => withCache('roadmaps',          5*60_000, () => api.get('/roadmaps'))
export const getRoadmap         = (id)      => withCache(`roadmap:${id}`,     5*60_000, () => api.get(`/roadmaps/${id}`))
// Enroll / pause / resume change the enrolled-roadmap list AND the user's
// progress-derived views (progress summary + hunter stats "active path" strip),
// so evict those user caches too — mirrors the submitQuiz eviction pattern below.
export const enrollRoadmap      = (id)      => api.post(`/roadmaps/${id}/enroll`) .then(r => { clearApiCache(`roadmap:${id}`, 'roadmaps', 'progressSummary', 'hunterStats', 'dashboardBootstrap'); return r })
export const pauseRoadmap       = (id)      => api.post(`/roadmaps/${id}/pause`)  .then(r => { clearApiCache(`roadmap:${id}`, 'roadmaps', 'progressSummary', 'hunterStats', 'dashboardBootstrap'); return r })
export const resumeRoadmap      = (id)      => api.post(`/roadmaps/${id}/resume`) .then(r => { clearApiCache(`roadmap:${id}`, 'roadmaps', 'progressSummary', 'hunterStats', 'dashboardBootstrap'); return r })

// ─── ADMIN ───────────────────────────────────
export const getAdminStats      = ()        => withCache('adminStats', 2*60_000, () => api.get('/admin/stats'))
export const getAdminUsers      = (p, s, q, filter) => {
  const params = new URLSearchParams({ page: p, size: s, search: q || '' })
  if (filter && filter !== 'all') params.set('filter', filter)
  return api.get(`/admin/users?${params}`)
}
export const deleteUser         = (id)      => api.delete(`/admin/users/${id}`).then(r => { clearApiCache('adminStats'); return r })

export const getAdminSubjects   = ()        => api.get('/admin/subjects')
export const createSubject      = (d)       => api.post('/admin/subjects', d)      .then(r => { clearApiCache('subjects', 'subject:*');                    return r })
export const updateSubject      = (id,d)    => api.put(`/admin/subjects/${id}`, d) .then(r => { clearApiCache('subjects', `subject:${id}`);                return r })
export const deleteSubject      = (id)      => api.delete(`/admin/subjects/${id}`) .then(r => { clearApiCache('subjects', 'subject:*', 'concept:*');       return r })

export const getAdminConcepts   = (subId)   => api.get(`/admin/concepts?subjectId=${subId}`)
export const createConcept      = (d)       => api.post('/admin/concepts', d)      .then(r => { clearApiCache('subjects', 'subject:*');                    return r })
export const updateConcept      = (id,d)    => api.put(`/admin/concepts/${id}`, d) .then(r => { clearApiCache(`concept:${id}`, 'subjects', 'subject:*');   return r })
export const deleteConcept      = (id)      => api.delete(`/admin/concepts/${id}`) .then(r => { clearApiCache('subjects', 'subject:*', 'concept:*');       return r })
export const getAdminRoadmaps   = ()        => api.get('/admin/roadmaps')
export const createRoadmap      = (d)       => api.post('/admin/roadmaps', d)      .then(r => { clearApiCache('roadmaps');                                 return r })
export const updateRoadmap      = (id,d)    => api.put(`/admin/roadmaps/${id}`, d) .then(r => { clearApiCache('roadmaps', `roadmap:${id}`);                return r })
export const deleteRoadmap      = (id)      => api.delete(`/admin/roadmaps/${id}`) .then(r => { clearApiCache('roadmaps', `roadmap:${id}`);                return r })
export const getRoadmapSubjects = (id)      => api.get(`/admin/roadmaps/${id}/subjects`)
export const addSubjectToRoadmap   = (rid,d)      => api.post(`/admin/roadmaps/${rid}/subjects`, d)                          .then(r => { clearApiCache('roadmaps', `roadmap:${rid}`); return r })
export const removeSubjectFromRoadmap = (rid,sid) => api.delete(`/admin/roadmaps/${rid}/subjects/${sid}`)                    .then(r => { clearApiCache('roadmaps', `roadmap:${rid}`); return r })
export const reorderSubjectInRoadmap  = (rid,sid,newOrderIndex) => api.put(`/admin/roadmaps/${rid}/subjects/${sid}/reorder`, { newOrderIndex }).then(r => { clearApiCache('roadmaps', `roadmap:${rid}`); return r })

// ─── ADMIN QUESTIONS ─────────────────────────────
export const getConceptQuestions = (conceptId)    => api.get(`/admin/questions/concept/${conceptId}`)
export const createQuestion      = (d)            => api.post('/admin/questions', d)
export const updateQuestion      = (id, d)        => api.put(`/admin/questions/${id}`, d)
export const deleteQuestion      = (id)           => api.delete(`/admin/questions/${id}`)

// ─── QUIZ ─────────────────────────────────────────
export const startConceptQuiz  = (conceptId)       => api.post(`/quiz/concept/${conceptId}/start`)
export const startSubjectQuiz  = (subjectId)       => api.post(`/quiz/subject/${subjectId}/start`)
export const startRoadmapQuiz  = (roadmapId)       => api.post(`/quiz/roadmap/${roadmapId}/start`)
// A quiz pass changes XP/level/rank, concept completion, subject/roadmap badges,
// certificates, gate/quiz status and attempt history. Bust every user-specific
// cache so the arena reflects the new state immediately instead of serving stale
// (pre-quiz) data until each TTL lapses. `subject:*` covers the skills list's
// per-concept `completed` flags + completedCount.
export const submitQuiz        = (data)            => api.post('/quiz/submit', data).then(r => {
  clearApiCache('progressSummary', 'hunterStats', 'certificates', 'quizStatus:*', 'roadmapStatus:*', 'quizHistory:*', 'subject:*')
  return r
})
export const getAttemptResult  = (attemptId)       => api.get(`/quiz/attempt/${attemptId}`)
// Full attempt history (newest first). limit=0 → all. Short TTL so new attempts show fast.
export const getQuizHistory    = (limit = 0)       => withCache(`quizHistory:${limit}`, 30_000, () => api.get(`/quiz/history?limit=${limit}`))
export const getQuizStatus          = (type, refId) => withCache(`quizStatus:${type}:${refId}`, 2*60_000, () => api.get(`/quiz/${type}/${refId}/status`))
export const getBulkSubjectStatus   = (ids)         => withCache(`quizStatus:bulk:${ids.join(',')}`, 2*60_000, () => api.get(`/quiz/subjects/bulk-status?ids=${ids.join(',')}`))
export const getRoadmapStatus  = (roadmapId)       => withCache(`roadmapStatus:${roadmapId}`, 2*60_000, () => api.get(`/quiz/roadmap/${roadmapId}/status`))

// ─── FEEDBACK ─────────────────────────────────────────
export const submitFeedback = (data) => api.post('/feedback', data)
export const getAllFeedbacks = (p=0,s=15) => api.get(`/feedback?page=${p}&size=${s}`)

// ─── MISSIONS ─────────────────────────────────────────
export const getMissions  = ()     => withCache('missions',      30_000, () => api.get('/missions'))
export const getMission   = (id)   => withCache(`mission:${id}`, 30_000, () => api.get(`/missions/${id}`))

// Per-user submitted work (repo + live demo). Not cached — always fresh for the signed-in hunter.
export const getMissionSubmission  = (id)       => api.get(`/missions/${id}/submission`)
// The hunter's submitted links across all missions, for the board's per-card status.
// Short cache; busted whenever a link is saved/removed so the board reflects it immediately.
export const getMissionSubmissions = ()         => withCache('missionSubmissions', 30_000, () => api.get('/missions/submissions'))
// Saving/removing a verified repo or live-demo link awards/reverses XP, so bust the
// user's XP/level/rank + hunter caches to reflect the new total immediately.
export const saveMissionSubmission = (id, body) => api.put(`/missions/${id}/submission`, body).then(r => {
  clearApiCache('progressSummary', 'hunterStats', 'missionSubmissions')
  return r
})

// ─── RESUME (per-user, up to 3, shareable) ────────────
// Not cached — the builder always reads/writes the freshest copy for the user.
export const listResumes    = ()                 => api.get('/resumes')
export const createResume   = (title, data, skipLinkVerification = false) =>
  api.post('/resumes', { title, data, ...(skipLinkVerification ? { skipLinkVerification: true } : {}) })
export const updateResume   = (id, title, data, skipLinkVerification = false) =>
  api.put(`/resumes/${id}`, { title, data, ...(skipLinkVerification ? { skipLinkVerification: true } : {}) })
export const deleteResume   = (id)               => api.delete(`/resumes/${id}`)
export const setResumeShare = (id, isPublic)     => api.post(`/resumes/${id}/share`, { public: isPublic })
// Public — anyone with the link can view a shared resume.
export const getPublicResume = (slug)            => api.get(`/public/resume/${slug}`)

// ─── CODE RUNNER / JUDGE ──────────────────────────────────────
// Authenticated + rate limited (10/min). `signal` (AbortController) lets the
// caller cancel the run when the user navigates away.
// Plain run — execute code and return stdout/stderr (no test cases).
export const executeCode = (code, language, signal) =>
  api.post('/code/execute', { code, language }, { signal })
// Judge student code against a problem's test cases. payload:
//   { problemId, language, code, mode: 'run' | 'submit' }
export const judgeCode = (payload, signal) =>
  api.post('/code/judge', payload, { signal })

// ─── CODE GYM PROBLEMS (auth required) ────────────────────────
export const getProblems  = (track) => withCache(`problems:${track||'all'}`, 5*60_000, () => api.get('/problems' + (track ? `?track=${track}` : '')))
export const getProblem   = (id)    => withCache(`problem:${id}`,            5*60_000, () => api.get(`/problems/${id}`))

// ─── CODING ARENA (LeetCode-style) ────────────────────────────
// Auth required; run/submit/submissions share the code execution engine
// mutations that reuse the shared code-execution engine (10/min rate limit).
export const getCodingProblems = ()   => withCache('codingProblems:all',   5*60_000, () => api.get('/coding-problems'))
export const getCodingProblem  = (id) => withCache(`codingProblem:${id}`,  5*60_000, () => api.get(`/coding-problems/${id}`))
// { problemId, language, code } — runs the visible sample cases.
export const runCode    = (payload, signal) => api.post('/code/run',    payload, { signal })
// { problemId, language, code } — judges all hidden cases and saves the submission.
export const submitCode = (payload, signal) => {
  const p = api.post('/code/submit', payload, { signal })
  // A submission changes this problem's history — bust its cached list.
  p.then(() => clearApiCache(`codeSubmissions:${payload.problemId}`)).catch(() => {})
  return p
}
export const getCodeSubmissions = (problemId) =>
  withCache(`codeSubmissions:${problemId}`, 30_000, () => api.get(`/code/submissions/${problemId}`))

// ─── APTITUDE (public) ────────────────────────────────────────
const APT_TTL = 10*60_000
export const getAptitudeCategories = ()          => withCache('aptitudeCategories',        APT_TTL, () => api.get('/aptitude/categories'))
export const getAptitudeGroups     = (category)  => withCache(`aptitudeGroups:${category}`,  APT_TTL, () => api.get(`/aptitude/groups/${category}`))
export const getAptitudeTopics     = (group)     => withCache(`aptitudeTopics:${group}`,     APT_TTL, () => api.get(`/aptitude/topics/${group}`))
export const getAptitudeTopic      = (topicId)   => withCache(`aptitudeTopic:${topicId}`,    APT_TTL, () => api.get(`/aptitude/topic/${topicId}`))
export const getAptitudeQuestions  = (topicId)   => withCache(`aptitudeQuestions:${topicId}`, APT_TTL, () => api.get(`/aptitude/questions/${topicId}`))
export const getAptitudeMockPaper  = ()          => api.get('/aptitude/mock/paper')
export const getAptitudeMockStatus = ()          => withCache('aptitudeMockStatus', 30_000, () => api.get('/aptitude/mock/status'))
export const getAptitudeMockHistory = (limit = 10) => withCache(`aptitudeMockHistory:${limit}`, 30_000, () => api.get(`/aptitude/mock/history?limit=${limit}`))
export const submitAptitudeMock    = (payload)  => api.post('/aptitude/mock/submit', payload).then(r => {
  clearApiCache('progressSummary', 'hunterStats', 'quizHistory:*', 'dashboardBootstrap', 'aptitudeMockStatus', 'aptitudeMockHistory:*')
  return r
})

// Synchronous cache read — returns the cached value (or undefined if absent/stale).
// Lets a page seed its initial state from cache so a revisit renders instantly
// with real data (no loader AND no null-render flash), while the first uncached
// visit still shows the loader for the genuine fetch.
export function getApiCached(key, ttlMs) {
  const store = _read()
  const hit = store[key]
  return (hit && Date.now() - hit.ts < ttlMs) ? hit.data : undefined
}
export const aptitudeCache = {
  groups:    (category) => getApiCached(`aptitudeGroups:${category}`,   APT_TTL),
  topics:    (group)    => getApiCached(`aptitudeTopics:${group}`,      APT_TTL),
  topic:     (topicId)  => getApiCached(`aptitudeTopic:${topicId}`,     APT_TTL),
  questions: (topicId)  => getApiCached(`aptitudeQuestions:${topicId}`, APT_TTL),
}

// ─── ADMIN APTITUDE ───────────────────────────────────────────
// Every mutation clears the public aptitude cache so student pages reflect edits.
const bustAptitude = (r) => { clearApiCache('aptitudeCategories', 'aptitudeGroups:*', 'aptitudeTopics:*', 'aptitudeTopic:*', 'aptitudeQuestions:*'); return r }

export const getAdminAptitudeGroups   = ()       => api.get('/admin/aptitude/groups')
export const createAptitudeGroup      = (d)      => api.post('/admin/aptitude/groups', d)      .then(bustAptitude)
export const updateAptitudeGroup      = (id, d)  => api.put(`/admin/aptitude/groups/${id}`, d) .then(bustAptitude)
export const deleteAptitudeGroup      = (id)     => api.delete(`/admin/aptitude/groups/${id}`) .then(bustAptitude)

export const getAdminAptitudeTopics   = (group)  => api.get(`/admin/aptitude/topics/${group}`)
export const getAdminAptitudeTopic    = (topicId)=> api.get(`/admin/aptitude/topic/${topicId}`)
export const createAptitudeTopic      = (d)      => api.post('/admin/aptitude/topics', d)      .then(bustAptitude)
export const updateAptitudeTopic      = (id, d)  => api.put(`/admin/aptitude/topics/${id}`, d)  .then(bustAptitude)
export const deleteAptitudeTopic      = (id)     => api.delete(`/admin/aptitude/topics/${id}`)  .then(bustAptitude)

export const getAdminAptitudeQuestions = (topic) => api.get(`/admin/aptitude/questions/${topic}`)
export const createAptitudeQuestion    = (d)     => api.post('/admin/aptitude/questions', d)      .then(bustAptitude)
export const updateAptitudeQuestion    = (id, d) => api.put(`/admin/aptitude/questions/${id}`, d)  .then(bustAptitude)
export const deleteAptitudeQuestion    = (id)    => api.delete(`/admin/aptitude/questions/${id}`)  .then(bustAptitude)

// ─── ADMIN PROBLEMS ───────────────────────────────────────────
export const getAdminProblems  = ()       => api.get('/admin/problems')
export const createProblem     = (d)      => api.post('/admin/problems', d)       .then(r => { clearApiCache('problems:*');                              return r })
export const updateProblemQ    = (id, d)  => api.put(`/admin/problems/${id}`, d)  .then(r => { clearApiCache('problems:*', `problem:${id}`);             return r })
export const deleteProblemQ    = (id)     => api.delete(`/admin/problems/${id}`)  .then(r => { clearApiCache('problems:*', `problem:${id}`);             return r })

// ─── ADMIN MISSIONS ───────────────────────────────────────────
export const getAdminMissions = ()       => api.get('/admin/missions')
export const createMission    = (d)      => api.post('/admin/missions', d)      .then(r => { clearApiCache('missions', 'mission:*'); return r })
export const updateMission    = (id, d)  => api.put(`/admin/missions/${id}`, d) .then(r => { clearApiCache('missions', `mission:${id}`); return r })
export const deleteMission    = (id)     => api.delete(`/admin/missions/${id}`)  .then(r => { clearApiCache('missions', `mission:${id}`); return r })

// ─── WALK-INS ─────────────────────────────────────────
export const getWalkIns        = ()       => withCache('walkIns', 60_000, () => api.get('/walkins'))
export const postWalkIn        = (d)      => api.post('/walkins', d)             .then(r => { clearApiCache('walkIns', 'adminWalkIns*', 'adminStats'); return r })
export const removeWalkIn      = (id)     => api.delete(`/walkins/${id}`)        .then(r => { clearApiCache('walkIns', 'adminWalkIns*', 'adminStats'); return r })
export const getAdminWalkIns   = (page = 0, size = 20) => withCache(`adminWalkIns:${page}:${size}`, 2*60_000, () => api.get(`/admin/walkins?page=${page}&size=${size}`))
export const createWalkIn      = (d)      => postWalkIn(d)
export const updateAdminWalkIn = (id, d)  => api.put(`/admin/walkins/${id}`, d)  .then(r => { clearApiCache('adminWalkIns*'); return r })
export const deleteWalkIn      = (id)     => removeWalkIn(id)

// ─── SEARCH ───────────────────────────────────────────
export const globalSearch = (q) => api.get('/search?q=' + encodeURIComponent(q))

// ─── BOOKMARKS ────────────────────────────────────────
export const getBookmarks       = ()            => api.get('/bookmarks')
export const addBookmark        = (data)        => api.post('/bookmarks', data)
export const removeBookmark     = (type, refId) => api.delete(`/bookmarks?type=${encodeURIComponent(type)}&refId=${encodeURIComponent(refId)}`)
export const removeBookmarkById = (id)          => api.delete(`/bookmarks/${id}`)

// ─── PROFILE ──────────────────────────────────────────
export const getPublicProfile = (username) => api.get(`/public/profile/${encodeURIComponent(username)}`)
// A profile save can grant one-time completion XP (personal, education, links, resume),
// so bust the user's XP/level/rank + hunter caches to reflect the new total immediately.
export const updateProfile    = (data)     => api.put('/profile/me', data).then(r => {
  if (r?.data?.xpEarned > 0) clearApiCache('progressSummary', 'hunterStats')
  return r
})
export const sendProfileContactOtp = (email) => api.post('/profile/contact-email/send-otp', { email })
export const verifyProfileContactOtp = (email, otp) => api.post('/profile/contact-email/verify-otp', { email, otp })
export const checkUsername    = (username) => api.get('/profile/check-username', { params: { username } })
/** Fetch GitHub authorize URL; pass SPA origin + optional in-app return path after OAuth. */
export const getGitHubConnectUrl = (returnTo = typeof window !== 'undefined' ? window.location.origin : '', returnPath = '') => {
  const params = {}
  if (returnTo) params.returnTo = returnTo
  if (returnPath) params.returnPath = returnPath
  return api.get('/profile/github/connect-url', { params })
}
export const connectGitHub = async (returnPath = '') => {
  const returnTo = window.location.origin
  const { data } = await getGitHubConnectUrl(returnTo, returnPath)
  if (data?.url) window.location.href = data.url
  else throw new Error('GitHub connect URL missing')
}
export const disconnectGitHub = () => api.delete('/profile/github').then(r => { clearUserCache(); return r })

// ─── REPORTS ──────────────────────────────────────────
// Report mutations bust the cached admin dashboard stats so the open-report
// count and totals refresh on the next dashboard visit.
export const submitReport       = (data)     => api.post('/reports', data).then(r => { clearApiCache('adminStats'); return r })
export const getAdminReports    = (p=0,s=20,status='') => api.get(`/reports?page=${p}&size=${s}${status ? `&status=${status}` : ''}`)
export const updateReport       = (id, d)    => api.put(`/reports/${id}`, d).then(r => { clearApiCache('adminStats'); return r })
export const deleteReport       = (id)       => api.delete(`/reports/${id}`).then(r => { clearApiCache('adminStats'); return r })
export const getReportStats     = ()         => api.get('/reports/stats')

export default api
