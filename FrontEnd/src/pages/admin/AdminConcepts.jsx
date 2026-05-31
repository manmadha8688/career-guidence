import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, X, ChevronUp, ChevronDown, Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminSubjects, getAdminConcepts, createConcept, updateConcept, deleteConcept } from '../../api/api'
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
    <div ref={ref} style={{ position: 'relative', minWidth: 220 }}>
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

function ConceptModal({ concept, subjects, onClose, onSave }) {
  const [form, setForm] = useState(concept
    ? { subjectId: concept.subject?.id, title: concept.title, whatItIs: concept.whatItIs || '', whyItMatters: concept.whyItMatters || '', codeExample: concept.codeExample || '', estimatedMinutes: concept.estimatedMinutes || 15, orderIndex: concept.orderIndex || 0 }
    : { subjectId: subjects[0]?.id || '', title: '', whatItIs: '', whyItMatters: '', codeExample: '', estimatedMinutes: 15, orderIndex: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      concept ? await updateConcept(concept.id, form) : await createConcept(form)
      toast.success(concept ? 'Concept updated' : 'Concept created')
      onSave()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 680 }}>
        <div className="modal-header">
          <h3 className="modal-title">{concept ? 'Edit Concept' : 'New Concept'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Subject *</label>
              <select className="form-input" value={form.subjectId} onChange={e => setForm({ ...form, subjectId: Number(e.target.value) })} required>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.icon} {s.title}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Order Index</label>
              <input type="number" className="form-input" value={form.orderIndex} onChange={e => setForm({ ...form, orderIndex: Number(e.target.value) })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">What Is It?</label>
            <textarea className="form-input" rows={3} value={form.whatItIs} onChange={e => setForm({ ...form, whatItIs: e.target.value })} placeholder="Explain this concept in simple terms…" />
          </div>
          <div className="form-group">
            <label className="form-label">Why Does It Matter?</label>
            <textarea className="form-input" rows={3} value={form.whyItMatters} onChange={e => setForm({ ...form, whyItMatters: e.target.value })} placeholder="Why should a student care about this?" />
          </div>
          <div className="form-group">
            <label className="form-label">Code Example</label>
            <textarea className="form-input" rows={5} value={form.codeExample} onChange={e => setForm({ ...form, codeExample: e.target.value })} placeholder="// Paste code example here" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Estimated Minutes</label>
            <input type="number" className="form-input" value={form.estimatedMinutes} onChange={e => setForm({ ...form, estimatedMinutes: Number(e.target.value) })} min={1} />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading-spinner" /> : null}
              {concept ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminConcepts() {
  const [subjects, setSubjects] = useState([])
  const [concepts, setConcepts] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(null)
  const [deleting, setDeleting] = useState({})

  useEffect(() => {
    getAdminSubjects().then(r => {
      setSubjects(r.data)
      if (r.data.length > 0) setSelectedSubject(r.data[0].id)
    })
  }, [])

  useEffect(() => {
    if (!selectedSubject) return
    setLoading(true)
    getAdminConcepts(selectedSubject)
      .then(r => setConcepts(r.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }, [selectedSubject])

  const reload = () => {
    if (!selectedSubject) return
    setLoading(true)
    getAdminConcepts(selectedSubject)
      .then(r => setConcepts(r.data))
      .finally(() => setLoading(false))
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete concept "${title}"?`)) return
    setDeleting(p => ({ ...p, [id]: true }))
    try {
      await deleteConcept(id)
      toast.success('Concept deleted')
      reload()
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(p => ({ ...p, [id]: false })) }
  }

  const filtered = concepts.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout title="Concepts">
      <div className="page-header">
        <div>
          <h1 className="page-title">Concepts</h1>
          <p className="page-subtitle">Manage learning content by subject</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <SearchableSelect items={subjects} value={selectedSubject} onChange={setSelectedSubject} placeholder="Select subject…" />
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              className="form-input"
              style={{ paddingLeft: '2.25rem', width: 200 }}
              placeholder="Search concepts…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => setModal('new')}>
            <Plus size={15} /> New Concept
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-center" style={{ height: '30vh' }}><div className="loading-spinner-lg" /></div>
      ) : concepts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-text">No concepts yet</div>
          <div className="empty-state-sub">Add the first concept to this subject</div>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr><th>#</th><th>Concept</th><th>Est. Time</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No concepts match "{search}"</td></tr>
              ) : filtered.map(c => (
                <tr key={c.id}>
                  <td className="text-muted text-sm" style={{ width: 40 }}>{c.orderIndex}</td>
                  <td>
                    <div className="table-name">{c.title}</div>
                    {c.whatItIs && <div className="text-xs text-muted truncate" style={{ maxWidth: 400 }}>{c.whatItIs.substring(0, 70)}…</div>}
                  </td>
                  <td className="text-sm text-muted">{c.estimatedMinutes}m</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setModal(c)}><Pencil size={13} /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id, c.title)} disabled={deleting[c.id]}>
                        {deleting[c.id] ? <span className="loading-spinner" /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <ConceptModal
          concept={modal === 'new' ? null : modal}
          subjects={subjects}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); reload() }}
        />
      )}
    </AppLayout>
  )
}
