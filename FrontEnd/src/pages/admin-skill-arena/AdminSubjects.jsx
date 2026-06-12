import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminSubjects, createSubject, updateSubject, deleteSubject } from '../../api/api'
import toast from 'react-hot-toast'

const RANKS = ['E', 'D', 'C', 'B', 'A', 'S']
const RANK_COLORS = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#4ADE80', E: '#888888' }
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

// Convert list array → newline-separated string for textarea
const listToText = (arr) => (arr || []).join('\n')
// Convert newline-separated string → cleaned array
const textToList = (str) => str.split('\n').map(s => s.trim()).filter(Boolean)

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--warning)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: '0.375rem', marginBottom: '0.75rem', marginTop: '0.25rem' }}>
      {children}
    </div>
  )
}

function SubjectModal({ subject, onClose, onSave }) {
  const [form, setForm] = useState(() => subject ? {
    title:            subject.title || '',
    description:      subject.description || '',
    icon:             subject.icon || '📚',
    color:            subject.color || '#4F46E5',
    rank:             subject.rank || 'E',
    overview:         subject.overview || '',
    whyLearn:         subject.whyLearn || '',
    forWho:           subject.forWho || '',
    prerequisites:    listToText(subject.prerequisites),
    outcomes:         listToText(subject.outcomes),
    whatYouWillBuild: listToText(subject.whatYouWillBuild),
    toolsRequired:    listToText(subject.toolsRequired),
    difficulty:       subject.difficulty || 'Beginner',
    estimatedHours:   subject.estimatedHours || '',
    careerUse:        subject.careerUse || '',
  } : {
    title: '', description: '', icon: '📚', color: '#4F46E5', rank: 'E',
    overview: '', whyLearn: '', forWho: '',
    prerequisites: '', outcomes: '', whatYouWillBuild: '', toolsRequired: '',
    difficulty: 'Beginner', estimatedHours: '', careerUse: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        prerequisites:    textToList(form.prerequisites),
        outcomes:         textToList(form.outcomes),
        whatYouWillBuild: textToList(form.whatYouWillBuild),
        toolsRequired:    textToList(form.toolsRequired),
        estimatedHours:   parseInt(form.estimatedHours) || 0,
      }
      subject ? await updateSubject(subject.id, payload) : await createSubject(payload)
      toast.success(subject ? 'Subject updated' : 'Subject created')
      onSave()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 680, maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-header" style={{ flexShrink: 0 }}>
          <h3 className="modal-title">{subject ? 'Edit Subject' : 'New Subject'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', flex: 1, padding: '0 1.5rem 1.5rem' }}>

          {/* ── BASICS ── */}
          <SectionLabel>Basic Info</SectionLabel>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Description <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(one-line)</span></label>
            <input className="form-input" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Icon (emoji)</label>
              <input className="form-input" value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="📚" />
            </div>
            <div className="form-group">
              <label className="form-label">Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input type="color" value={form.color} onChange={e => set('color', e.target.value)} style={{ width: 40, height: 38, border: 'none', background: 'none', cursor: 'pointer' }} />
                <input className="form-input" value={form.color} onChange={e => set('color', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Rank</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {RANKS.map(r => (
                  <button key={r} type="button" onClick={() => set('rank', r)}
                    style={{ padding: '0.3rem 0.75rem', borderRadius: 6, cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.06em', border: `1.5px solid ${RANK_COLORS[r]}`, background: form.rank === r ? RANK_COLORS[r] : 'transparent', color: form.rank === r ? '#fff' : RANK_COLORS[r], transition: 'all 0.15s' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select className="form-input" value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group" style={{ maxWidth: 160 }}>
            <label className="form-label">Estimated Hours</label>
            <input className="form-input" type="number" min="0" value={form.estimatedHours} onChange={e => set('estimatedHours', e.target.value)} placeholder="e.g. 12" />
          </div>

          {/* ── RICH CONTENT ── */}
          <SectionLabel>Rich Content</SectionLabel>
          <div className="form-group">
            <label className="form-label">Overview <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(beginner-friendly intro)</span></label>
            <textarea className="form-input" rows={3} value={form.overview} onChange={e => set('overview', e.target.value)} placeholder="HTML is the skeleton of every website..." />
          </div>
          <div className="form-group">
            <label className="form-label">Why Learn This?</label>
            <textarea className="form-input" rows={3} value={form.whyLearn} onChange={e => set('whyLearn', e.target.value)} placeholder="Explain importance in jobs, projects, interviews..." />
          </div>
          <div className="form-group">
            <label className="form-label">Who Is This For?</label>
            <textarea className="form-input" rows={2} value={form.forWho} onChange={e => set('forWho', e.target.value)} placeholder="Complete beginners with zero coding experience..." />
          </div>
          <div className="form-group">
            <label className="form-label">Career Use</label>
            <textarea className="form-input" rows={2} value={form.careerUse} onChange={e => set('careerUse', e.target.value)} placeholder="Required in every frontend, full stack..." />
          </div>

          {/* ── LISTS ── */}
          <SectionLabel>Lists (one item per line)</SectionLabel>
          <div className="form-group">
            <label className="form-label">What you need to know first</label>
            <textarea className="form-input" rows={3} value={form.prerequisites} onChange={e => set('prerequisites', e.target.value)} placeholder="Basic computer usage&#10;Understanding of web browsers" style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Outcomes — what learner can do after</label>
            <textarea className="form-input" rows={4} value={form.outcomes} onChange={e => set('outcomes', e.target.value)} placeholder="Build complete web pages from scratch&#10;Structure content using semantic HTML5&#10;Create forms that validate user input" style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
          </div>
          <div className="form-group">
            <label className="form-label">What You Will Build</label>
            <textarea className="form-input" rows={3} value={form.whatYouWillBuild} onChange={e => set('whatYouWillBuild', e.target.value)} placeholder="Personal profile page with photo and bio&#10;Restaurant menu page with tables and images&#10;Multi-section blog post" style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
          </div>

          <div className="form-group">
            <label className="form-label">Tools Required</label>
            <textarea className="form-input" rows={3} value={form.toolsRequired} onChange={e => set('toolsRequired', e.target.value)} placeholder="VS Code&#10;Node.js v18+&#10;Git" style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
          </div>

          <div className="modal-actions" style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading-spinner" /> : null}
              {subject ? 'Update Subject' : 'Create Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [deleting, setDeleting] = useState({})

  const load = () => {
    setLoading(true)
    getAdminSubjects()
      .then(r => setSubjects(r.data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}" and all its concepts?`)) return
    setDeleting(p => ({ ...p, [id]: true }))
    try {
      await deleteSubject(id)
      toast.success('Subject deleted')
      load()
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(p => ({ ...p, [id]: false })) }
  }

  const filtered = subjects.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.description || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppLayout title="Subjects">
      <div className="page-header">
        <div>
          <h1 className="page-title">Subjects</h1>
          <p className="page-subtitle">{subjects.length} subjects in the platform</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input className="form-input" style={{ paddingLeft: '2.25rem', width: 220 }} placeholder="Search subjects…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={() => setModal('new')}>
            <Plus size={15} /> New Subject
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-center" style={{ height: '40vh' }}><div className="loading-spinner-lg" /></div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Rank</th>
                <th>Difficulty</th>
                <th>Hours</th>
                <th>Concepts</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No subjects match "{search}"</td></tr>
              ) : filtered.map(s => {
                const richCount = [s.overview, s.whyLearn, s.forWho, s.careerUse].filter(Boolean).length
                const listCount = [(s.prerequisites||[]).length, (s.outcomes||[]).length, (s.whatYouWillBuild||[]).length].reduce((a,b)=>a+b,0)
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: 36, height: 36, background: s.color + '22', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                          {s.icon}
                        </div>
                        <div>
                          <div className="table-name">{s.title}</div>
                          <div className="text-xs text-muted truncate" style={{ maxWidth: 260 }}>{s.description}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 4, border: `1.5px solid ${RANK_COLORS[s.rank] || '#888'}`, color: RANK_COLORS[s.rank] || '#888', background: (RANK_COLORS[s.rank] || '#888') + '18' }}>
                        {s.rank || 'E'}
                      </span>
                    </td>
                    <td className="text-sm text-muted">{s.difficulty || <span style={{ color: 'var(--border)' }}>—</span>}</td>
                    <td className="text-sm text-muted">{s.estimatedHours > 0 ? `${s.estimatedHours}h` : <span style={{ color: 'var(--border)' }}>—</span>}</td>
                    <td className="text-sm text-muted">{s.totalConcepts}</td>
                    
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => setModal(s)}><Pencil size={13} /></button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id, s.title)} disabled={deleting[s.id]}>
                          {deleting[s.id] ? <span className="loading-spinner" /> : <Trash2 size={13} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <SubjectModal
          subject={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); load() }}
        />
      )}
    </AppLayout>
  )
}
