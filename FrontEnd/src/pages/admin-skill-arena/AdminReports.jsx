import { useState, useEffect } from 'react'
import { Flag, Trash2, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminReports, updateReport, deleteReport, getReportStats } from '../../api/api'
import toast from 'react-hot-toast'

const STATUS_META = {
  OPEN:        { label: 'Open',        color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   icon: AlertCircle },
  IN_PROGRESS: { label: 'In Progress', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  icon: Clock },
  RESOLVED:    { label: 'Resolved',    color: '#4ADE80', bg: 'rgba(74,222,128,0.1)',  icon: CheckCircle },
}

const TYPE_LABEL = {
  NO_QUESTIONS:    '❓ No questions',
  WRONG_CONTENT:   '✏️ Wrong content',
  MISSING_CONTENT: '📭 Missing content',
  BROKEN:          '🔧 Broken',
  OTHER:           '💬 Other',
}

const fmt = d => d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—'

export default function AdminReports() {
  const [reports, setReports]   = useState([])
  const [stats, setStats]       = useState({})
  const [page, setPage]         = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading]   = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [editing, setEditing]   = useState({})   // { [id]: { note, status } }
  const [saving, setSaving]     = useState({})

  const load = async (p = 0) => {
    setLoading(true)
    try {
      const [r, s] = await Promise.all([getAdminReports(p), getReportStats()])
      setReports(r.data.content)
      setTotalPages(r.data.totalPages)
      setPage(p)
      setStats(s.data)
    } catch { toast.error('Failed to load reports') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleUpdate = async (id) => {
    const changes = editing[id] || {}
    if (!changes.status && !changes.adminNote) return
    setSaving(p => ({ ...p, [id]: true }))
    try {
      await updateReport(id, changes)
      toast.success('Report updated')
      setEditing(p => { const n = {...p}; delete n[id]; return n })
      load(page)
    } catch { toast.error('Failed to update') }
    finally { setSaving(p => ({ ...p, [id]: false })) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this report?')) return
    try {
      await deleteReport(id)
      toast.success('Deleted')
      load(page)
    } catch { toast.error('Failed to delete') }
  }

  const setEdit = (id, field, val) =>
    setEditing(p => ({ ...p, [id]: { ...p[id], [field]: val } }))

  return (
    <AppLayout title="Reports">
      <div className="page-header">
        <div>
          <h1 className="page-title">Issue Reports</h1>
          <p className="page-subtitle">Reports submitted by students</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total',       value: stats.total || 0,      color: '#9B6ED4' },
          { label: 'Open',        value: stats.open || 0,       color: '#EF4444' },
          { label: 'In Progress', value: stats.inProgress || 0, color: '#F59E0B' },
          { label: 'Resolved',    value: stats.resolved || 0,   color: '#4ADE80' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '1rem',
            borderTop: `3px solid ${s.color}`,
          }}>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '1.5rem', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex-center" style={{ height: '40vh' }}><div className="loading-spinner-lg" /></div>
      ) : reports.length === 0 ? (
        <div className="flex-center" style={{ height: '20vh', color: 'var(--text-muted)', flexDirection: 'column', gap: '0.5rem' }}>
          <Flag size={32} opacity={0.3} />
          <span>No reports yet</span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {reports.map(r => {
            const sm = STATUS_META[r.status] || STATUS_META.OPEN
            const SIcon = sm.icon
            const isOpen = expanded === r.id
            const ed = editing[r.id] || {}

            return (
              <div key={r.id} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderLeft: `4px solid ${sm.color}`,
                borderRadius: 10, overflow: 'hidden',
              }}>
                {/* Row */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.25rem', cursor: 'pointer' }}
                  onClick={() => setExpanded(isOpen ? null : r.id)}
                >
                  {/* Status */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace",
                    letterSpacing: '0.06em', color: sm.color, background: sm.bg,
                    border: `1px solid ${sm.color}30`, borderRadius: 5,
                    padding: '0.15rem 0.5rem', flexShrink: 0,
                  }}>
                    <SIcon size={10} /> {sm.label.toUpperCase()}
                  </span>

                  {/* Type */}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
                    {TYPE_LABEL[r.type] || r.type}
                  </span>

                  {/* Page */}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.pageTitle || r.pageUrl}
                  </span>

                  {/* User */}
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', flexShrink: 0 }}>{r.userName}</span>

                  {/* Date */}
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0, fontFamily: "'Share Tech Mono', monospace" }}>{fmt(r.createdAt)}</span>

                  {isOpen ? <ChevronUp size={14} color="var(--text-muted)" /> : <ChevronDown size={14} color="var(--text-muted)" />}
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                      {/* Description */}
                      <div>
                        <div style={{ fontSize: '0.72rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>DESCRIPTION</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, background: 'var(--bg-secondary)', borderRadius: 7, padding: '0.75rem 0.875rem' }}>
                          {r.description}
                        </div>
                      </div>

                      {/* User info */}
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em' }}>USER</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{r.userName} · {r.userEmail}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em' }}>PAGE URL</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.2rem' }}>{r.pageUrl}</div>
                        </div>
                      </div>

                      {/* Admin controls */}
                      <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        {/* Status select */}
                        <div style={{ flex: '1 1 160px' }}>
                          <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em', marginBottom: '0.4rem' }}>STATUS</label>
                          <select
                            value={ed.status ?? r.status}
                            onChange={e => setEdit(r.id, 'status', e.target.value)}
                            className="form-input"
                            style={{ fontSize: '0.85rem' }}
                          >
                            <option value="OPEN">Open</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                          </select>
                        </div>

                        {/* Admin note */}
                        <div style={{ flex: '2 1 240px' }}>
                          <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em', marginBottom: '0.4rem' }}>ADMIN NOTE</label>
                          <input
                            className="form-input"
                            style={{ fontSize: '0.85rem' }}
                            placeholder="Add a note..."
                            value={ed.adminNote ?? (r.adminNote || '')}
                            onChange={e => setEdit(r.id, 'adminNote', e.target.value)}
                          />
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleUpdate(r.id)}
                            disabled={saving[r.id] || (!ed.status && !ed.adminNote)}
                          >
                            {saving[r.id] ? <span className="loading-spinner" /> : 'Save'}
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(r.id)}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Existing admin note */}
                      {r.adminNote && !ed.adminNote && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--warning)', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 7, padding: '0.5rem 0.75rem' }}>
                          📝 {r.adminNote}
                        </div>
                      )}
                    </div>
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
