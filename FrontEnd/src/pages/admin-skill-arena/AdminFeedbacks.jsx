import { useState, useEffect } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { MessageSquare, Star, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAllFeedbacks } from '../../api/api'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'

const CATEGORY_COLOR = {
  Bug:        { bg: '#FEE2E2', color: '#991B1B', dark: 'rgba(239,68,68,0.15)',  text: '#EF4444' },
  Suggestion: { bg: '#DBEAFE', color: '#1E40AF', dark: 'rgba(96,165,250,0.15)', text: '#60A5FA' },
  Content:    { bg: '#FEF3C7', color: '#92400E', dark: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  Other:      { bg: '#F3E8FF', color: '#6B21A8', dark: 'rgba(155,110,212,0.15)',text: '#9B6ED4' },
}

function Stars({ rating }) {
  return (
    <div className="admin-feedback-stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={`admin-feedback-star${s <= rating ? ' is-filled' : ' is-empty'}`}>★</span>
      ))}
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [filter, setFilter]         = useState('All')
  const [page, setPage]             = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [summary, setSummary]       = useState({ avg: '—', useful: 0, notUseful: 0 })

  const load = (p = 0) => {
    setLoading(true)
    getAllFeedbacks(p)
      .then(r => {
        const items = r.data.content
        setFeedbacks(items)
        setPage(r.data.number)
        setTotalPages(r.data.totalPages)
        setTotalCount(r.data.totalElements)
        const avg = items.length ? (items.reduce((s, f) => s + f.rating, 0) / items.length).toFixed(1) : '—'
        setSummary({ avg, useful: items.filter(f => f.isUseful === true).length, notUseful: items.filter(f => f.isUseful === false).length })
      })
      .catch(err => toast.error(getApiError(err, 'We could not load feedback. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }

  useEffect(() => { load() }, [])

  const FILTERS = ['All', 'Bug', 'Suggestion', 'Content', 'Other', 'No Category']
  const filtered = feedbacks.filter(f => {
    if (filter === 'All')         return true
    if (filter === 'No Category') return !f.category
    return f.category === filter
  })

  return (
    <AppLayout title="User Feedback">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Feedback</h1>
          <p className="page-subtitle">{totalCount} response{totalCount !== 1 ? 's' : ''} collected</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={load} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      <div className="stats-grid admin-stats-grid-spaced">
        <div className="stat-card">
          <div className="stat-icon admin-feedback-stat-icon--rating"><Star size={20} /></div>
          <div className="stat-info">
            <div className="stat-value">{summary.avg}</div>
            <div className="stat-label">Avg Rating (page)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon admin-feedback-stat-icon--useful"><ThumbsUp size={20} /></div>
          <div className="stat-info">
            <div className="stat-value">{summary.useful}</div>
            <div className="stat-label">Found Useful (page)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon admin-feedback-stat-icon--not-useful"><ThumbsDown size={20} /></div>
          <div className="stat-info">
            <div className="stat-value">{summary.notUseful}</div>
            <div className="stat-label">Not Useful (page)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon admin-feedback-stat-icon--total"><MessageSquare size={20} /></div>
          <div className="stat-info">
            <div className="stat-value">{totalCount}</div>
            <div className="stat-label">Total Responses</div>
          </div>
        </div>
      </div>

      <div className="filter-chips admin-filter-chips-spaced">
        {FILTERS.map(f => (
          <button key={f} className={`filter-chip${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {loading ? (
        <RadarLoader height={220} />
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💬</div>
          <div className="empty-state-text">No feedback yet</div>
          <div className="empty-state-sub">Feedback submitted from the landing page will appear here.</div>
        </div>
      ) : (
        <div className="admin-feedback-list">
          {filtered.map(fb => {
            const cat = fb.category ? CATEGORY_COLOR[fb.category] : null
            return (
              <div key={fb.id} className="card admin-feedback-card">
                <div className="admin-feedback-card__header">
                  <div className="admin-feedback-card__left">
                    <Stars rating={fb.rating} />
                    {fb.category && (
                      <span className="admin-feedback-category"
                        style={{ '--cat-bg': cat?.dark, '--cat-color': cat?.text, '--cat-border': cat?.text + '33' }}>
                        {fb.category === 'Bug' ? '🐛' : fb.category === 'Suggestion' ? '💡' : fb.category === 'Content' ? '📚' : '💬'} {fb.category}
                      </span>
                    )}
                    {fb.isUseful === true  && <span className="admin-feedback-useful-yes">👍 Useful</span>}
                    {fb.isUseful === false && <span className="admin-feedback-useful-no">👎 Not useful</span>}
                  </div>
                  <div className="admin-feedback-card__right">
                    <div className="admin-feedback-date">{formatDate(fb.createdAt)}</div>
                    <div className="admin-feedback-user">
                      {fb.userId ? `User: ${fb.userId.slice(-6)}` : 'Guest'}
                    </div>
                  </div>
                </div>

                {fb.experience && (
                  <p className={`admin-feedback-experience${fb.categoryNote ? ' admin-feedback-experience--spaced' : ''}`}>
                    {fb.experience}
                  </p>
                )}

                {fb.categoryNote && (
                  <div className="admin-feedback-note"
                    style={{ '--cat-bg': cat ? cat.dark : undefined, '--cat-color': cat?.text }}>
                    <span className="admin-feedback-note__label">{fb.category} detail</span>
                    {fb.categoryNote}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex-center admin-pagination">
          <button className="btn btn-ghost btn-sm" disabled={page === 0} onClick={() => load(page - 1)}>← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`btn btn-sm ${page === i ? 'btn-primary' : 'btn-ghost'}`} onClick={() => load(i)}>{i + 1}</button>
          ))}
          <button className="btn btn-ghost btn-sm" disabled={page === totalPages - 1} onClick={() => load(page + 1)}>Next →</button>
        </div>
      )}
    </AppLayout>
  )
}
