import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Settings, Search, ChevronDown, Check } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import {
  getAdminRoadmaps, createRoadmap, updateRoadmap, deleteRoadmap,
  getRoadmapSubjects, getAdminSubjects, addSubjectToRoadmap, removeSubjectFromRoadmap, reorderSubjectInRoadmap
} from '../../api/api'
import toast from 'react-hot-toast'

function SearchableSelect({ items, value, onChange, placeholder = 'Select…' }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)
  const selected = items.find(s => s.id === value)
  const filtered = items.filter(s => s.title.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1, minWidth: 180 }}>
      <div className="form-input" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', userSelect: 'none' }}
        onClick={() => { setOpen(o => !o); setQuery('') }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected ? `${selected.icon} ${selected.title}` : placeholder}
        </span>
        <ChevronDown size={14} style={{ flexShrink: 0, color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </div>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 400 }}>
          <div style={{ padding: '0.5rem' }}>
            <input autoFocus className="form-input" style={{ fontSize: '0.875rem' }} placeholder="Type to filter…"
              value={query} onChange={e => setQuery(e.target.value)} onClick={e => e.stopPropagation()} />
          </div>
          <div style={{ maxHeight: 220, overflowY: 'auto' }}>
            {filtered.length === 0
              ? <div style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center' }}>No matches</div>
              : filtered.map(s => (
                <div key={s.id}
                  onClick={() => { onChange(s.id); setOpen(false); setQuery('') }}
                  style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', background: s.id === value ? 'var(--primary-bg)' : 'transparent', color: s.id === value ? 'var(--primary)' : 'var(--text-primary)' }}
                  onMouseEnter={e => { if (s.id !== value) e.currentTarget.style.background = 'var(--bg-tertiary)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = s.id === value ? 'var(--primary-bg)' : 'transparent' }}>
                  <span>{s.icon}</span> {s.title}
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

function RoadmapModal({ roadmap, onClose, onSave }) {
  const [form, setForm] = useState(roadmap || { title: '', description: '', roleTarget: '', icon: '🗺️', color: '#7C3AED', estimatedWeeks: 12 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true)
    try {
      roadmap ? await updateRoadmap(roadmap.id, form) : await createRoadmap(form)
      toast.success(roadmap ? 'Updated' : 'Created'); onSave()
    } catch { toast.error('Failed to save') } finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">{roadmap ? 'Edit Roadmap' : 'New Roadmap'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={2} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Role Target</label>
            <input className="form-input" value={form.roleTarget || ''} onChange={e => setForm({ ...form, roleTarget: e.target.value })} placeholder="e.g. Java Full Stack" />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Icon (emoji)</label>
              <input className="form-input" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Estimated Weeks</label>
              <input type="number" className="form-input" value={form.estimatedWeeks} onChange={e => setForm({ ...form, estimatedWeeks: Number(e.target.value) })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Color</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ width: 40, height: 38, border: 'none', background: 'none', cursor: 'pointer' }} />
              <input className="form-input" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading-spinner" /> : null} {roadmap ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function SubjectsPanel({ roadmap, onClose }) {
  const [rsubs, setRsubs] = useState([])
  const [allSubs, setAllSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [selectedSub, setSelectedSub] = useState('')
  const [orderIdx, setOrderIdx] = useState(1)
  const [editingId, setEditingId] = useState(null)
  const [editIdx, setEditIdx] = useState(1)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const load = () => {
    setLoading(true)
    Promise.all([getRoadmapSubjects(roadmap.id), getAdminSubjects()])
      .then(([rs, all]) => { setRsubs(rs.data); setAllSubs(all.data) })
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleAdd = async () => {
    if (!selectedSub) return
    setAdding(true)
    try {
      await addSubjectToRoadmap(roadmap.id, { subjectId: selectedSub, orderIndex: orderIdx })
      toast.success('Subject added'); setSelectedSub(''); load()
    } catch { toast.error('Failed to add') } finally { setAdding(false) }
  }

  const handleRemove = async (subId) => {
    try {
      await removeSubjectFromRoadmap(roadmap.id, subId)
      toast.success('Removed'); load()
    } catch { toast.error('Failed to remove') }
  }

  const handleReorder = async (subId) => {
    try {
      await reorderSubjectInRoadmap(roadmap.id, subId, editIdx)
      toast.success('Order updated'); setEditingId(null); load()
    } catch { toast.error('Failed to update order') }
  }

  const assigned = new Set(rsubs.map(rs => rs.subject?.id))
  const available = allSubs.filter(s => !assigned.has(s.id))

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 600 }}>
        <div className="modal-header">
          <h3 className="modal-title">Subjects in "{roadmap.title}"</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        {loading ? <div className="flex-center" style={{ height: 200 }}><div className="loading-spinner-lg" /></div> : (
          <>
            <div style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div className="form-label mb-1">Add Subject</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <SearchableSelect items={available} value={selectedSub} onChange={setSelectedSub} placeholder="Select subject…" />
                <input type="number" className="form-input" style={{ width: 80 }} value={orderIdx} onChange={e => setOrderIdx(Number(e.target.value))} placeholder="Order" min={1} />
                <button className="btn btn-primary btn-sm" onClick={handleAdd} disabled={adding || !selectedSub}>
                  {adding ? <span className="loading-spinner" /> : <Plus size={13} />} Add
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {rsubs.sort((a, b) => a.orderIndex - b.orderIndex).map(rs => (
                <div key={rs.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  {editingId === rs.subject?.id ? (
                    <input
                      type="number" min={1}
                      value={editIdx}
                      onChange={e => setEditIdx(Number(e.target.value))}
                      style={{ width: 52, padding: '0.2rem 0.4rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--primary)', background: 'var(--bg-card)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', textAlign: 'center' }}
                      onKeyDown={e => { if (e.key === 'Enter') handleReorder(rs.subject?.id); if (e.key === 'Escape') setEditingId(null) }}
                      autoFocus
                    />
                  ) : (
                    <span style={{ width: 28, height: 28, background: 'var(--primary-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>{rs.orderIndex}</span>
                  )}
                  <span style={{ fontSize: '1.25rem' }}>{rs.subject?.icon}</span>
                  <span className="text-sm font-semibold" style={{ flex: 1 }}>{rs.subject?.title}</span>
                  {editingId === rs.subject?.id ? (
                    <>
                      <button className="btn btn-primary btn-sm" onClick={() => handleReorder(rs.subject?.id)}><Check size={12} /></button>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}><X size={12} /></button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-ghost btn-sm" onClick={() => { setEditingId(rs.subject?.id); setEditIdx(rs.orderIndex) }}><Pencil size={12} /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemove(rs.subject?.id)}><Trash2 size={12} /></button>
                    </>
                  )}
                </div>
              ))}
              {rsubs.length === 0 && <p className="text-muted text-sm" style={{ textAlign: 'center', padding: '1rem' }}>No subjects added yet</p>}
            </div>
          </>
        )}
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminRoadmaps() {
  const [roadmaps, setRoadmaps] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [subjectsPanel, setSubjectsPanel] = useState(null)
  const [deleting, setDeleting] = useState({})

  const load = () => {
    setLoading(true)
    getAdminRoadmaps().then(r => setRoadmaps(r.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete roadmap "${title}"?`)) return
    setDeleting(p => ({ ...p, [id]: true }))
    try { await deleteRoadmap(id); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
    finally { setDeleting(p => ({ ...p, [id]: false })) }
  }

  const filtered = roadmaps.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    (r.roleTarget || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppLayout title="Roadmaps">
      <div className="page-header">
        <div>
          <h1 className="page-title">Roadmaps</h1>
          <p className="page-subtitle">{roadmaps.length} career roadmaps</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              className="form-input"
              style={{ paddingLeft: '2.25rem', width: 220 }}
              placeholder="Search roadmaps…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => setModal('new')}><Plus size={15} /> New Roadmap</button>
        </div>
      </div>

      {loading ? <div className="flex-center" style={{ height: '40vh' }}><div className="loading-spinner-lg" /></div> : (
        <div className="table-container">
          <table className="table">
            <thead><tr><th>Roadmap</th><th>Role</th><th>Weeks</th><th></th></tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No roadmaps match "{search}"</td></tr>
              ) : filtered.map(r => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 36, height: 36, background: r.color + '22', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                        {r.icon}
                      </div>
                      <div>
                        <div className="table-name">{r.title}</div>
                        <div className="text-xs text-muted truncate" style={{ maxWidth: 280 }}>{r.description}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-primary">{r.roleTarget || '—'}</span></td>
                  <td className="text-sm text-muted">{r.estimatedWeeks}w</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setSubjectsPanel(r)}><Settings size={13} /> Subjects</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => setModal(r)}><Pencil size={13} /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id, r.title)} disabled={deleting[r.id]}>
                        {deleting[r.id] ? <span className="loading-spinner" /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && <RoadmapModal roadmap={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={() => { setModal(null); load() }} />}
      {subjectsPanel && <SubjectsPanel roadmap={subjectsPanel} onClose={() => setSubjectsPanel(null)} />}
    </AppLayout>
  )
}
