import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, ChevronUp, ChevronDown } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminSubjects, getAdminConcepts, createConcept, updateConcept, deleteConcept } from '../../api/api'
import toast from 'react-hot-toast'

function ConceptModal({ concept, subjects, onClose, onSave }) {
  const [form, setForm] = useState(concept
    ? { subjectId: concept.subject?.id, title: concept.title, whatItIs: concept.whatItIs || '', whyItMatters: concept.whyItMatters || '', codeExample: concept.codeExample || '', estimatedMinutes: concept.estimatedMinutes || 15, orderIndex: concept.orderIndex || 0 }
    : { subjectId: subjects[0]?.id || '', title: '', whatItIs: '', whyItMatters: '', codeExample: '', estimatedMinutes: 15, orderIndex: 0 })
  const [loading, setLoading] = useState(false)

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

  return (
    <AppLayout title="Concepts">
      <div className="page-header">
        <div>
          <h1 className="page-title">Concepts</h1>
          <p className="page-subtitle">Manage learning content by subject</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('new')}>
          <Plus size={15} /> New Concept
        </button>
      </div>

      <div className="form-group" style={{ maxWidth: 320, marginBottom: '1.5rem' }}>
        <label className="form-label">Filter by Subject</label>
        <select className="form-input" value={selectedSubject} onChange={e => setSelectedSubject(Number(e.target.value))}>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.icon} {s.title}</option>)}
        </select>
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
              {concepts.map(c => (
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
