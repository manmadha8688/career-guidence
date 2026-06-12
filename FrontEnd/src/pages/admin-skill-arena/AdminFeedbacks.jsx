import { useState, useEffect } from 'react'
import { MessageSquare, Star, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAllFeedbacks } from '../../api/api'
import toast from 'react-hot-toast'

const CATEGORY_COLOR = {
  Bug:        { bg: '#FEE2E2', color: '#991B1B', dark: 'rgba(239,68,68,0.15)',  text: '#EF4444' },
  Suggestion: { bg: '#DBEAFE', color: '#1E40AF', dark: 'rgba(96,165,250,0.15)', text: '#60A5FA' },
  Content:    { bg: '#FEF3C7', color: '#92400E', dark: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  Other:      { bg: '#F3E8FF', color: '#6B21A8', dark: 'rgba(155,110,212,0.15)',text: '#9B6ED4' },
}

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize: '0.9rem', color: s <= rating ? '#F59E0B' : 'var(--border)' }}>★</span>
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
  // summary stats accumulated from current page only (approximation) — kept in state from first load
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
        // recalc summary on every page load
        const avg = items.length ? (items.reduce((s, f) => s + f.rating, 0) / items.length).toFixed(1) : '—'
        setSummary({ avg, useful: items.filter(f => f.isUseful === true).length, notUseful: items.filter(f => f.isUseful === false).length })
      })
      .catch(() => toast.error('Failed to load feedbacks'))
      .finally(() => setLoading(false))
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

      {/* Summary cards */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}><Star size={20} /></div>
          <div className="stat-info">
            <div className="stat-value">{summary.avg}</div>
            <div className="stat-label">Avg Rating (page)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#D1FAE5', color: '#059669' }}><ThumbsUp size={20} /></div>
          <div className="stat-info">
            <div className="stat-value">{summary.useful}</div>
            <div className="stat-label">Found Useful (page)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEE2E2', color: '#DC2626' }}><ThumbsDown size={20} /></div>
          <div className="stat-info">
            <div className="stat-value">{summary.notUseful}</div>
            <div className="stat-label">Not Useful (page)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EEF2FF', color: '#4F46E5' }}><MessageSquare size={20} /></div>
          <div className="stat-info">
            <div className="stat-value">{totalCount}</div>
            <div className="stat-label">Total Responses</div>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="filter-chips" style={{ marginBottom: '1.25rem' }}>
        {FILTERS.map(f => (
          <button key={f} className={`filter-chip${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {/* Feedback list */}
      {loading ? (
        <div className="flex-center" style={{ height: '40vh' }}><div className="loading-spinner-lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💬</div>
          <div className="empty-state-text">No feedback yet</div>
          <div className="empty-state-sub">Feedback submitted from the landing page will appear here.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {filtered.map(fb => {
            const cat = fb.category ? CATEGORY_COLOR[fb.category] : null
            return (
              <div key={fb.id} className="card" style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {/* Left: rating + category + useful */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexWrap: 'wrap' }}>
                    <Stars rating={fb.rating} />
                    {fb.category && (
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 99, background: cat?.dark, color: cat?.text, border: `1px solid ${cat?.text}33` }}>
                        {fb.category === 'Bug' ? '🐛' : fb.category === 'Suggestion' ? '💡' : fb.category === 'Content' ? '📚' : '💬'} {fb.category}
                      </span>
                    )}
                    {fb.isUseful === true  && <span style={{ fontSize: '0.72rem', color: '#4ADE80' }}>👍 Useful</span>}
                    {fb.isUseful === false && <span style={{ fontSize: '0.72rem', color: '#EF4444' }}>👎 Not useful</span>}
                  </div>
                  {/* Right: date + user */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatDate(fb.createdAt)}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {fb.userId ? `User: ${fb.userId.slice(-6)}` : 'Guest'}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                {fb.experience && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, marginBottom: fb.categoryNote ? '0.75rem' : 0 }}>
                    {fb.experience}
                  </p>
                )}

                {/* Category note */}
                {fb.categoryNote && (
                  <div style={{ marginTop: fb.experience ? 0 : 0, padding: '0.625rem 0.875rem', background: cat ? cat.dark : 'var(--bg-tertiary)', borderLeft: `3px solid ${cat?.text || 'var(--primary)'}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: cat?.text || 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.25rem' }}>{fb.category} detail</span>
                    {fb.categoryNote}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex-center" style={{ gap: '0.5rem', marginTop: '1.5rem' }}>
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
