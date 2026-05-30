import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import ProgressBar from '../../components/ProgressBar'
import { getSubjects, searchSubjects } from '../../api/api'
import toast from 'react-hot-toast'

const FILTERS = ['All', 'In Progress', 'Completed', 'Not Started']

function debounce(fn, delay) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay) }
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    getSubjects()
      .then(r => setSubjects(r.data))
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
            const pct = s.totalConcepts > 0 ? Math.round((s.completedCount / s.totalConcepts) * 100) : 0
            return (
              <div key={s.id} className="subject-card" onClick={() => navigate(`/subjects/${s.id}`)}>
                <div className="subject-card-header">
                  <div className="subject-card-icon" style={{ background: s.color + '22' }}>
                    <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="subject-card-title">{s.title}</div>
                    <div className="subject-card-desc">{s.description}</div>
                  </div>
                </div>
                <div style={{ padding: '0 1.5rem 1rem' }}>
                  <div className="flex-between" style={{ marginBottom: '0.375rem' }}>
                    <span className="subject-progress-text">{s.completedCount} of {s.totalConcepts} concepts</span>
                    <span className="subject-progress-pct">{pct}%</span>
                  </div>
                  <ProgressBar value={pct} size="sm" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </AppLayout>
  )
}
