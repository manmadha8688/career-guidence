import { useState, useEffect } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Flag, Trash2, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminReports, updateReport, deleteReport, getReportStats } from '../../api/api'
import { REPORT_TYPE_LABELS } from '../../constants/reportTypes'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'

const STATUS_META = {
  OPEN:        { label: 'Open',        color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   icon: AlertCircle },
  IN_PROGRESS: { label: 'In Progress', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  icon: Clock },
  RESOLVED:    { label: 'Resolved',    color: '#4ADE80', bg: 'rgba(74,222,128,0.1)',  icon: CheckCircle },
}

const TYPE_LABEL = REPORT_TYPE_LABELS

function parseContext(raw) {
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

function ContextBlock({ context }) {
  if (!context) return null
  const entries = Object.entries(context).filter(([k]) => k !== 'fullUrl' && k !== 'platform')
  if (!entries.length && !context.fullUrl) return null
  return (
    <div>
      <div className="admin-report-field-label">AUTO CONTEXT</div>
      <div className="admin-report-context-body">
        {context.fullUrl && <code className="admin-report-context-url">{context.fullUrl}</code>}
        {entries.map(([k, v]) => (
          <span key={k}><strong className="admin-report-context-key">{k}:</strong> {String(v)}</span>
        ))}
      </div>
    </div>
  )
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
  const [statusFilter, setStatusFilter] = useState('')  // '' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'

  const load = async (p = 0, sf = statusFilter) => {
    setLoading(true)
    try {
      const [r, s] = await Promise.all([getAdminReports(p, 20, sf), getReportStats()])
      setReports(r.data.content)
      setTotalPages(r.data.totalPages)
      setPage(p)
      setStats(s.data)
    } catch (err) { toast.error(getApiError(err, 'We could not load reports. Please refresh.')) }
    finally { setTimeout(() => setLoading(false), TEST_DELAY_MS) }
  }

  useEffect(() => { load(0, statusFilter) }, [statusFilter])

  const handleFilterChange = (sf) => {
    setStatusFilter(sf)
    setExpanded(null)
  }

  const handleUpdate = async (id) => {
    const changes = editing[id] || {}
    if (!changes.status && !changes.adminNote) return
    setSaving(p => ({ ...p, [id]: true }))
    try {
      await updateReport(id, changes)
      toast.success('Report updated')
      setEditing(p => { const n = {...p}; delete n[id]; return n })
      load(page)
    } catch (err) { toast.error(getApiError(err, 'We could not update this report. Please try again.')) }
    finally { setSaving(p => ({ ...p, [id]: false })) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this report?')) return
    try {
      await deleteReport(id)
      toast.success('Deleted')
      load(page)
    } catch (err) { toast.error(getApiError(err, 'We could not delete this report. Please try again.')) }
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

      <div className="admin-reports-stats">
        {[
          { label: 'Total',       value: stats.total || 0,      color: '#9B6ED4' },
          { label: 'Open',        value: stats.open || 0,       color: '#EF4444' },
          { label: 'In Progress', value: stats.inProgress || 0, color: '#F59E0B' },
          { label: 'Resolved',    value: stats.resolved || 0,   color: '#4ADE80' },
        ].map(s => (
          <div key={s.label} className="admin-reports-stat-card" style={{ '--stat-accent': s.color }}>
            <div className="admin-reports-stat-value">{s.value}</div>
            <div className="admin-reports-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="filter-chips admin-filter-chips-spaced">
        {[
          { key: '',            label: 'All' },
          { key: 'OPEN',        label: `Open (${stats.open || 0})` },
          { key: 'IN_PROGRESS', label: `In Progress (${stats.inProgress || 0})` },
          { key: 'RESOLVED',    label: `Resolved (${stats.resolved || 0})` },
        ].map(f => (
          <button
            key={f.key}
            className={`filter-chip${statusFilter === f.key ? ' active' : ''}`}
            onClick={() => handleFilterChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <RadarLoader height={220} />
      ) : reports.length === 0 ? (
        <div className="flex-center admin-reports-empty">
          <Flag size={32} opacity={0.3} />
          <span>{statusFilter ? `No ${STATUS_META[statusFilter]?.label.toLowerCase()} reports` : 'No reports yet'}</span>
        </div>
      ) : (
        <div className="admin-reports-list">
          {reports.map(r => {
            const sm = STATUS_META[r.status] || STATUS_META.OPEN
            const SIcon = sm.icon
            const isOpen = expanded === r.id
            const ed = editing[r.id] || {}

            return (
              <div key={r.id} className="admin-report-card" style={{ '--report-accent': sm.color }}>
                <div className="admin-report-row" onClick={() => setExpanded(isOpen ? null : r.id)}>
                  <span className="admin-report-status" style={{ '--report-accent': sm.color, '--report-accent-bg': sm.bg }}>
                    <SIcon size={10} /> {sm.label.toUpperCase()}
                  </span>

                  <span className="admin-report-type">
                    {TYPE_LABEL[r.type] || r.type}
                  </span>

                  <span className="admin-report-page">
                    {r.pageTitle || r.pageUrl}
                  </span>

                  <span className="admin-report-user">{r.userName}</span>

                  <span className="admin-report-date">{fmt(r.createdAt)}</span>

                  {isOpen ? <ChevronUp size={14} color="var(--text-muted)" /> : <ChevronDown size={14} color="var(--text-muted)" />}
                </div>

                {isOpen && (
                  <div className="admin-report-expanded">
                    <div className="admin-report-expanded__inner">

                      <div>
                        <div className="admin-report-field-label">WHAT HAPPENED</div>
                        <div className="admin-report-field-body">
                          {r.description}
                        </div>
                      </div>

                      {r.expectedBehavior && (
                        <div>
                          <div className="admin-report-field-label">EXPECTED BEHAVIOR</div>
                          <div className="admin-report-field-body admin-report-field-body--expected">
                            {r.expectedBehavior}
                          </div>
                        </div>
                      )}

                      <ContextBlock context={parseContext(r.context)} />

                      <div className="admin-report-meta-row">
                        <div>
                          <div className="admin-report-meta-label">USER</div>
                          <div className="admin-report-meta-value">{r.userName} · {r.userEmail}</div>
                        </div>
                        <div>
                          <div className="admin-report-meta-label">PAGE URL</div>
                          <div className="admin-report-meta-url">{r.pageUrl}</div>
                        </div>
                      </div>

                      <div className="admin-report-controls">
                        <div className="admin-report-control-field--status">
                          <label className="admin-report-control-label">STATUS</label>
                          <select
                            value={ed.status ?? r.status}
                            onChange={e => setEdit(r.id, 'status', e.target.value)}
                            className="form-input admin-report-control-input"
                          >
                            <option value="OPEN">Open</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                          </select>
                        </div>

                        <div className="admin-report-control-field--note">
                          <label className="admin-report-control-label">ADMIN NOTE</label>
                          <input
                            className="form-input admin-report-control-input"
                            placeholder="Add a note..."
                            value={ed.adminNote ?? (r.adminNote || '')}
                            onChange={e => setEdit(r.id, 'adminNote', e.target.value)}
                          />
                        </div>

                        <div className="admin-report-control-actions">
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

                      {r.adminNote && !ed.adminNote && (
                        <div className="admin-report-existing-note">
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
