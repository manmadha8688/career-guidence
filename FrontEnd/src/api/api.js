import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

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
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── AUTH ────────────────────────────────────
export const registerUser     = (data)      => api.post('/auth/register', data)
export const loginUser        = (data)      => api.post('/auth/login', data)
export const getMe            = ()          => api.get('/auth/me')

// ─── SUBJECTS ────────────────────────────────
export const getSubjects      = ()          => api.get('/subjects')
export const getSubject       = (id)        => api.get(`/subjects/${id}`)
export const searchSubjects   = (q)         => api.get(`/subjects/search?q=${encodeURIComponent(q)}`)

// ─── CONCEPTS ────────────────────────────────
export const getConcepts      = (subId)     => api.get(`/subjects/${subId}/concepts`)
export const getConcept       = (id)        => api.get(`/concepts/${id}`)
export const searchConcepts   = (q)         => api.get(`/concepts/search?q=${encodeURIComponent(q)}`)

// ─── PROGRESS ────────────────────────────────
export const completeConcept    = (id)      => api.post(`/progress/concept/${id}/complete`)
export const uncompleteConcept  = (id)      => api.delete(`/progress/concept/${id}/uncomplete`)
export const getProgressSummary = ()        => api.get('/progress/summary')

// ─── ROADMAPS ────────────────────────────────
export const getRoadmaps        = ()        => api.get('/roadmaps')
export const getRoadmap         = (id)      => api.get(`/roadmaps/${id}`)
export const enrollRoadmap      = (id)      => api.post(`/roadmaps/${id}/enroll`)
export const getEnrolledRoadmaps = ()       => api.get('/roadmaps/enrolled')

// ─── ADMIN ───────────────────────────────────
export const getAdminStats      = ()        => api.get('/admin/stats')
export const getAdminUsers      = (p,s,q)   => api.get(`/admin/users?page=${p}&size=${s}&search=${q||''}`)
export const deleteUser         = (id)      => api.delete(`/admin/users/${id}`)
export const getUserProgress    = (id)      => api.get(`/admin/users/${id}/progress`)

export const getAdminSubjects   = ()        => api.get('/admin/subjects')
export const createSubject      = (d)       => api.post('/admin/subjects', d)
export const updateSubject      = (id,d)    => api.put(`/admin/subjects/${id}`, d)
export const deleteSubject      = (id)      => api.delete(`/admin/subjects/${id}`)

export const getAdminConcepts   = (subId)   => api.get(`/admin/concepts?subjectId=${subId}`)
export const createConcept      = (d)       => api.post('/admin/concepts', d)
export const updateConcept      = (id,d)    => api.put(`/admin/concepts/${id}`, d)
export const deleteConcept      = (id)      => api.delete(`/admin/concepts/${id}`)

export const getAdminRoadmaps   = ()        => api.get('/admin/roadmaps')
export const createRoadmap      = (d)       => api.post('/admin/roadmaps', d)
export const updateRoadmap      = (id,d)    => api.put(`/admin/roadmaps/${id}`, d)
export const deleteRoadmap      = (id)      => api.delete(`/admin/roadmaps/${id}`)
export const getRoadmapSubjects = (id)      => api.get(`/admin/roadmaps/${id}/subjects`)
export const addSubjectToRoadmap   = (rid,d)      => api.post(`/admin/roadmaps/${rid}/subjects`, d)
export const removeSubjectFromRoadmap = (rid,sid) => api.delete(`/admin/roadmaps/${rid}/subjects/${sid}`)
export const reorderSubjectInRoadmap  = (rid,sid,newOrderIndex) => api.put(`/admin/roadmaps/${rid}/subjects/${sid}/reorder`, { newOrderIndex })

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
export const getQuizStatus     = (type, refId)     => api.get(`/quiz/${type}/${refId}/status`)
export const getSubjectStatus  = (subjectId)       => api.get(`/quiz/subject/${subjectId}/status`)
export const getRoadmapStatus  = (roadmapId)       => api.get(`/quiz/roadmap/${roadmapId}/status`)

export default api
