import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401 && window.location.pathname !== '/login') {
      clearUserCache()
      localStorage.clear()
      window.location.href = '/login'
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
  try { sessionStorage.setItem(CACHE_NS, JSON.stringify(store)) } catch {}
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

// ─── AUTH ────────────────────────────────────
export const registerUser     = (data)      => api.post('/auth/register', data)
export const loginUser        = (data)      => api.post('/auth/login', data)
export const guestLogin       = (guestId)   => api.post('/auth/guest', guestId ? { guestId } : {})
export const getMe            = ()          => api.get('/auth/me')

// ─── SUBJECTS ────────────────────────────────
export const getSubjects      = ()          => withCache('subjects',          5*60_000, () => api.get('/subjects'))
export const getSubject       = (id)        => withCache(`subject:${id}`,     5*60_000, () => api.get(`/subjects/${id}`))
export const searchSubjects   = (q)         => api.get(`/subjects/search?q=${encodeURIComponent(q)}`)

// ─── CONCEPTS ────────────────────────────────
export const getConcepts      = (subId)     => api.get(`/subjects/${subId}/concepts`)
export const getConcept       = (id)        => withCache(`concept:${id}`,     5*60_000, () => api.get(`/concepts/${id}`))
export const searchConcepts   = (q)         => api.get(`/concepts/search?q=${encodeURIComponent(q)}`)

// ─── PROGRESS ────────────────────────────────
export const completeConcept    = (id)      => api.post(`/progress/concept/${id}/complete`)
export const uncompleteConcept  = (id)      => api.delete(`/progress/concept/${id}/uncomplete`)
export const getProgressSummary = ()        => withCache('progressSummary',   60_000,   () => api.get('/progress/summary'))
export const getHunterStats     = ()        => withCache('hunterStats',        60_000,   () => api.get('/progress/hunter-stats'))

// ─── ROADMAPS ────────────────────────────────
export const getRoadmaps        = ()        => withCache('roadmaps',          5*60_000, () => api.get('/roadmaps'))
export const getRoadmap         = (id)      => withCache(`roadmap:${id}`,     5*60_000, () => api.get(`/roadmaps/${id}`))
export const enrollRoadmap      = (id)      => api.post(`/roadmaps/${id}/enroll`)
export const pauseRoadmap       = (id)      => api.post(`/roadmaps/${id}/pause`)
export const resumeRoadmap      = (id)      => api.post(`/roadmaps/${id}/resume`)
export const getEnrolledRoadmaps = ()       => api.get('/roadmaps/enrolled')

// ─── ADMIN ───────────────────────────────────
export const getAdminStats      = ()        => api.get('/admin/stats')
export const getAdminUsers      = (p,s,q)   => api.get(`/admin/users?page=${p}&size=${s}&search=${q||''}`)
export const deleteUser         = (id)      => api.delete(`/admin/users/${id}`)
export const getUserProgress    = (id)      => api.get(`/admin/users/${id}/progress`)

export const getAdminSubjects   = ()        => api.get('/admin/subjects')
export const createSubject      = (d)       => api.post('/admin/subjects', d)      .then(r => { clearApiCache('subjects', 'subject:*');                    return r })
export const updateSubject      = (id,d)    => api.put(`/admin/subjects/${id}`, d) .then(r => { clearApiCache('subjects', `subject:${id}`);                return r })
export const deleteSubject      = (id)      => api.delete(`/admin/subjects/${id}`) .then(r => { clearApiCache('subjects', 'subject:*', 'concept:*');       return r })

export const getAdminConcepts   = (subId)   => api.get(`/admin/concepts?subjectId=${subId}`)
export const createConcept      = (d)       => api.post('/admin/concepts', d)      .then(r => { clearApiCache('subjects', 'subject:*');                    return r })
export const updateConcept      = (id,d)    => api.put(`/admin/concepts/${id}`, d) .then(r => { clearApiCache(`concept:${id}`, 'subjects', 'subject:*');   return r })
export const deleteConcept      = (id)      => api.delete(`/admin/concepts/${id}`) .then(r => { clearApiCache('subjects', 'subject:*', 'concept:*');       return r })
export const migrateRichContent = ()        => api.post('/admin/migrate/rich-content')

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
export const getQuizStatus     = (type, refId)     => withCache(`quizStatus:${type}:${refId}`, 2*60_000, () => api.get(`/quiz/${type}/${refId}/status`))
export const getSubjectStatus  = (subjectId)       => withCache(`quizStatus:subject:${subjectId}`, 2*60_000, () => api.get(`/quiz/subject/${subjectId}/status`))
export const getRoadmapStatus  = (roadmapId)       => withCache(`roadmapStatus:${roadmapId}`, 2*60_000, () => api.get(`/quiz/roadmap/${roadmapId}/status`))

// ─── FEEDBACK ─────────────────────────────────────────
export const submitFeedback = (data) => api.post('/feedback', data)
export const getAllFeedbacks = ()     => api.get('/feedback')

// ─── MISSIONS ─────────────────────────────────────────
export const getMissions  = ()     => api.get('/missions')
export const getMission   = (id)   => api.get(`/missions/${id}`)

// ─── PROBLEMS (public) ────────────────────────────────────────
export const getProblems    = (track)  => api.get('/problems' + (track ? `?track=${track}` : ''))
export const getProblem     = (id)     => api.get(`/problems/${id}`)

// ─── ADMIN PROBLEMS ───────────────────────────────────────────
export const getAdminProblems  = ()       => api.get('/admin/problems')
export const createProblem     = (d)      => api.post('/admin/problems', d)
export const updateProblemQ    = (id, d)  => api.put(`/admin/problems/${id}`, d)
export const deleteProblemQ    = (id)     => api.delete(`/admin/problems/${id}`)

// ─── ADMIN MISSIONS ───────────────────────────────────────────
export const getAdminMissions = ()       => api.get('/admin/missions')
export const createMission    = (d)      => api.post('/admin/missions', d)
export const updateMission    = (id, d)  => api.put(`/admin/missions/${id}`, d)
export const deleteMission    = (id)     => api.delete(`/admin/missions/${id}`)

export default api
