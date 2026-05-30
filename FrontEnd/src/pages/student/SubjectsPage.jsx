import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Brain, Trophy } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import ProgressBar from '../../components/ProgressBar'
import { getSubjects, searchSubjects, getQuizStatus } from '../../api/api'
import toast from 'react-hot-toast'

const FILTERS = ['All', 'In Progress', 'Completed', 'Not Started']

function debounce(fn, delay) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay) }
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([])
  const [quizStatuses, setQuizStatuses] = useState({})
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    getSubjects()
      .then(r => {
        setSubjects(r.data)
        // fetch quiz status for every subject in parallel
        r.data.forEach(s => {
          getQuizStatus('subject', s.id)
            .then(qs => setQuizStatuses(prev => ({ ...prev, [s.id]: qs.data })))
            .catch(() => {})
        })
      })
      .catch(() => toast.error('Failed to load subjects'))
      .finally(() => setLoading(false))
  }, [])

  const doSearch = useCallback(debounce(q => {
    if (!q.trim()) {
      getSubjects().then(r => setSubjects(r.data))
    } else {
      searchSubjects(q).then(r => setSubjects(r.data))
    }
  }, 300), [])

  const handleSearch = e => {
    setQuery(e.target.value)
    doSearch(e.target.value)
  }

  const filtered = subjects.filter(s => {
    const pct = s.totalConcepts > 0 ? (s.completedCount / s.totalConcepts) * 100 : 0
    if (filter === 'Completed') return pct === 100
    if (filter === 'In Progress') return pct > 0 && pct < 100
    if (filter === 'Not Started') return pct === 0
    return true
  })

  return (
    <AppLayout title="Subjects">
      <div className="page-header">
        <div>
          <h1 className="page-title">Subjects</h1>
          <p className="page-subtitle">Explore all available subjects and track your progress</p>
        </div>
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input className="search-input" placeholder="Search subjects…" value={query} onChange={handleSearch} />
        </div>
      </div>

      <div className="filter-chips">
        {FILTERS.map(f => (
          <button key={f} className={`filter-chip${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex-center" style={{ height: '40vh' }}><div className="loading-spinner-lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <div className="empty-state-text">No subjects found</div>
          <div className="empty-state-sub">Try a different search or filter</div>
        </div>
      ) : (
        <div className="grid-auto">
          {filtered.map(s => {
            const hasContent = s.totalConcepts > 0
            const pct = hasContent ? Math.round((s.completedCount / s.totalConcepts) * 100) : 0
            const qs = quizStatuses[s.id]
            const hasPassed = qs?.hasPassed
            const hasTried = qs?.attemptCount > 0

            return (
              <div key={s.id}
                className="subject-card"
                style={{ cursor: hasContent ? 'pointer' : 'default', position: 'relative', opacity: hasContent ? 1 : 0.72 }}
                onClick={() => hasContent && navigate(`/subjects/${s.id}`)}
              >
                {/* Coming Soon overlay badge */}
                {!hasContent && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: '#F1F5F9', color: '#64748B',
                    fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em',
                    padding: '3px 10px', borderRadius: '99px',
                    border: '1px solid #E2E8F0',
                  }}>
                    COMING SOON
                  </div>
                )}

                <div className="subject-card-header">
                  <div className="subject-card-icon" style={{ background: s.color + '22' }}>
                    <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="subject-card-title">{s.title}</div>
                    <div className="subject-card-desc">{s.description}</div>
                  </div>
                  {hasPassed && (
                    <Trophy size={16} color="#065F46" style={{ flexShrink: 0 }} title="Subject badge earned!" />
                  )}
                </div>

                {hasContent ? (
                  <>
                    <div style={{ padding: '0 1.5rem 0.75rem' }}>
                      <div className="flex-between" style={{ marginBottom: '0.375rem' }}>
                        <span className="subject-progress-text">{s.completedCount} of {s.totalConcepts} concepts</span>
                        <span className="subject-progress-pct">{pct}%</span>
                      </div>
                      <ProgressBar value={pct} size="sm" />
                    </div>

                    {/* Subject Test button */}
                    <div style={{ padding: '0 1.5rem 1.25rem' }} onClick={e => e.stopPropagation()}>
                      {hasPassed ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: 600, color: '#065F46' }}>
                            <Trophy size={14} /> Badge Earned · {qs.bestScore}/{qs.bestTotal}
                          </span>
                          <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}
                            onClick={() => navigate(`/quiz/subject/${s.id}`)}>
                            Retake
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm w-full"
                          style={{ justifyContent: 'center', background: 'var(--primary-bg)', color: 'var(--primary)', border: '1.5px solid var(--primary)', fontWeight: 600 }}
                          onClick={() => navigate(`/quiz/subject/${s.id}`)}
                        >
                          <Brain size={14} />
                          {hasTried ? `Retry Subject Test · ${qs.bestScore}/${qs.bestTotal}` : 'Take Subject Test →'}
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  /* No concepts — coming soon footer */
                  <div style={{ padding: '0 1.5rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    🚧 Concepts coming soon
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </AppLayout>
  )
}
