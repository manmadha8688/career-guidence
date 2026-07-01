import axios from 'axios'
import { buildLoginReturnUrl } from '../utils/authRedirect'
import { clearBrowserSessionPreservingPrefs } from '../utils/browserSession'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({ baseURL: BASE_URL, withCredentials: true })

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

// Clears every key that carries per-user data.
// Call on login (switching users) and logout.
// Roadmap content (no user data) is intentionally kept.
export function clearUserCache() {
  clearApiCache(
    'progressSummary', 'hunterStats',
    'subjects', 'subject:*', 'concept:*',
    'quizStatus:*', 'roadmapStatus:*'
  )
}

// ─── PUBLIC ──────────────────────────────────
export const getPublicStats = () => withCache('publicStats', 5*60_000, () => api.get('/public-stats'))

// ─── AUTH ────────────────────────────────────
export const registerUser     = (data)      => api.post('/auth/register', data)
export const sendOtp          = (email)     => api.post('/auth/send-otp', { email })
export const verifyOtp        = (email, otp) => api.post('/auth/verify-otp', { email, otp })
export const loginUser        = (data)      => api.post('/auth/login', data)
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

// ─── ROADMAPS ────────────────────────────────
export const getRoadmaps        = ()        => withCache('roadmaps',          5*60_000, () => api.get('/roadmaps'))
export const getRoadmap         = (id)      => withCache(`roadmap:${id}`,     5*60_000, () => api.get(`/roadmaps/${id}`))
export const enrollRoadmap      = (id)      => api.post(`/roadmaps/${id}/enroll`) .then(r => { clearApiCache(`roadmap:${id}`, 'roadmaps'); return r })
export const pauseRoadmap       = (id)      => api.post(`/roadmaps/${id}/pause`)  .then(r => { clearApiCache(`roadmap:${id}`, 'roadmaps'); return r })
export const resumeRoadmap      = (id)      => api.post(`/roadmaps/${id}/resume`) .then(r => { clearApiCache(`roadmap:${id}`, 'roadmaps'); return r })

// ─── ADMIN ───────────────────────────────────
export const getAdminStats      = ()        => withCache('adminStats', 2*60_000, () => api.get('/admin/stats'))
export const getAdminUsers      = (p,s,q)   => api.get(`/admin/users?page=${p}&size=${s}&search=${encodeURIComponent(q || '')}`)
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
export const submitQuiz        = (data)            => api.post('/quiz/submit', data)
export const getAttemptResult  = (attemptId)       => api.get(`/quiz/attempt/${attemptId}`)
export const getQuizStatus          = (type, refId) => withCache(`quizStatus:${type}:${refId}`, 2*60_000, () => api.get(`/quiz/${type}/${refId}/status`))
export const getBulkSubjectStatus   = (ids)         => withCache(`quizStatus:bulk:${ids.join(',')}`, 2*60_000, () => api.get(`/quiz/subjects/bulk-status?ids=${ids.join(',')}`))
export const getRoadmapStatus  = (roadmapId)       => withCache(`roadmapStatus:${roadmapId}`, 2*60_000, () => api.get(`/quiz/roadmap/${roadmapId}/status`))

// ─── FEEDBACK ─────────────────────────────────────────
export const submitFeedback = (data) => api.post('/feedback', data)
export const getAllFeedbacks = (p=0,s=15) => api.get(`/feedback?page=${p}&size=${s}`)

// ─── MISSIONS ─────────────────────────────────────────
export const getMissions  = ()     => withCache('missions',      30_000, () => api.get('/missions'))
export const getMission   = (id)   => withCache(`mission:${id}`, 30_000, () => api.get(`/missions/${id}`))

// ─── PROBLEMS (public) ────────────────────────────────────────
export const getProblems  = (track) => withCache(`problems:${track||'all'}`, 5*60_000, () => api.get('/problems' + (track ? `?track=${track}` : '')))
export const getProblem   = (id)    => withCache(`problem:${id}`,            5*60_000, () => api.get(`/problems/${id}`))

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
export const postWalkIn        = (d)      => api.post('/walkins', d)             .then(r => { clearApiCache('walkIns', 'adminWalkIns', 'adminStats'); return r })
export const removeWalkIn      = (id)     => api.delete(`/walkins/${id}`)        .then(r => { clearApiCache('walkIns', 'adminWalkIns', 'adminStats'); return r })
export const getAdminWalkIns   = ()       => withCache('adminWalkIns', 2*60_000, () => api.get('/admin/walkins'))
export const createWalkIn      = (d)      => postWalkIn(d)
export const updateAdminWalkIn = (id, d)  => api.put(`/admin/walkins/${id}`, d)  .then(r => { clearApiCache('adminWalkIns'); return r })
export const deleteWalkIn      = (id)     => removeWalkIn(id)

// ─── REPORTS ──────────────────────────────────────────
export const submitReport       = (data)     => api.post('/reports', data)
export const getAdminReports    = (p=0,s=20,status='') => api.get(`/reports?page=${p}&size=${s}${status ? `&status=${status}` : ''}`)
export const updateReport       = (id, d)    => api.put(`/reports/${id}`, d)
export const deleteReport       = (id)       => api.delete(`/reports/${id}`)
export const getReportStats     = ()         => api.get('/reports/stats')

export default api
