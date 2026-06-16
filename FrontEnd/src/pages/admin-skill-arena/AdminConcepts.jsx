import { useState, useEffect, useRef } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import AdminSkeleton from '../../components/loaders/AdminSkeleton'
import RadarLoader from '../../components/loaders/RadarLoader'
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

const emptyExample = () => ({ title: '', description: '', code: '', output: '' })

function SectionDivider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0 1rem' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}

function ConceptModal({ concept, subjects, onClose, onSave }) {
  const [form, setForm] = useState(concept ? {
    subjectId: concept.subjectId || subjects[0]?.id || '',
    title: concept.title || '',
    introduction: concept.introduction || '',
    explanationSimple: concept.explanationSimple || '',
    explanationTechnical: concept.explanationTechnical || '',
    syntax: concept.syntax || '',
    examples: concept.examples || [],
    keyPoints: concept.keyPoints || [],
    tip: concept.tip || '',
    commonMistakes: concept.commonMistakes || [],
    whatItIs: concept.whatItIs || '',
    whyItMatters: concept.whyItMatters || '',
    codeExample: concept.codeExample || '',
    rank: concept.rank || 'E',
    estimatedMinutes: concept.estimatedMinutes || 15,
    orderIndex: concept.orderIndex || 0
  } : {
    subjectId: subjects[0]?.id || '',
    title: '',
    introduction: '',
    explanationSimple: '',
    explanationTechnical: '',
    syntax: '',
    examples: [],
    keyPoints: [],
    tip: '',
    commonMistakes: [],
    whatItIs: '',
    whyItMatters: '',
    codeExample: '',
    rank: 'E',
    estimatedMinutes: 15,
    orderIndex: 0
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  // Examples helpers
  const addExample = () => setForm(f => ({ ...f, examples: [...f.examples, emptyExample()] }))
  const removeExample = i => setForm(f => ({ ...f, examples: f.examples.filter((_, idx) => idx !== i) }))
  const updateExample = (i, field, val) => setForm(f => ({
    ...f, examples: f.examples.map((ex, idx) => idx === i ? { ...ex, [field]: val } : ex)
  }))

  // Key Points helpers
  const addKeyPoint = () => setForm(f => ({ ...f, keyPoints: [...f.keyPoints, ''] }))
  const removeKeyPoint = i => setForm(f => ({ ...f, keyPoints: f.keyPoints.filter((_, idx) => idx !== i) }))
  const updateKeyPoint = (i, val) => setForm(f => ({
    ...f, keyPoints: f.keyPoints.map((kp, idx) => idx === i ? val : kp)
  }))

  // Common Mistakes helpers
  const addMistake = () => setForm(f => ({ ...f, commonMistakes: [...f.commonMistakes, ''] }))
  const removeMistake = i => setForm(f => ({ ...f, commonMistakes: f.commonMistakes.filter((_, idx) => idx !== i) }))
  const updateMistake = (i, val) => setForm(f => ({
    ...f, commonMistakes: f.commonMistakes.map((m, idx) => idx === i ? val : m)
  }))

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
      setTimeout(() => setLoading(false), TEST_DELAY_MS)
    }
  }

  const mono = { fontFamily: 'monospace', fontSize: '0.875rem' }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 780 }}>
        <div className="modal-header">
          <h3 className="modal-title">{concept ? 'Edit Concept' : 'New Concept'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>

          {/* ── Basic Info ── */}
          <SectionDivider label="Basic Info" />
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Subject *</label>
              <SearchableSelect items={subjects} value={form.subjectId} onChange={val => set('subjectId', val)} placeholder="Select subject…" />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Order</label>
                <input type="number" className="form-input" value={form.orderIndex} onChange={e => set('orderIndex', Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label className="form-label">Minutes</label>
                <input type="number" className="form-input" value={form.estimatedMinutes} onChange={e => set('estimatedMinutes', Number(e.target.value))} min={1} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="e.g. Variables and Data Types" />
          </div>
          <div className="form-group">
            <label className="form-label">Rank</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['E','D','C','B','A','S'].map(r => {
                const colors = { S:'#EF4444', A:'#F59E0B', B:'#9B6ED4', C:'#60A5FA', D:'#4ADE80', E:'#888888' }
                const c = colors[r]
                return (
                  <button key={r} type="button" onClick={() => set('rank', r)}
                    style={{ padding: '0.3rem 0.75rem', borderRadius: 6, cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.06em', border: `1.5px solid ${c}`, background: form.rank === r ? c : 'transparent', color: form.rank === r ? '#fff' : c, transition: 'all 0.15s' }}>
                    {r}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Content ── */}
          <SectionDivider label="Content" />
          <div className="form-group">
            <label className="form-label">Introduction <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(one-line hook shown at top)</span></label>
            <input className="form-input" value={form.introduction} onChange={e => set('introduction', e.target.value)} placeholder="e.g. Variables are containers for storing data…" />
          </div>
          <div className="form-group">
            <label className="form-label">Simple Explanation <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(analogy / beginner friendly)</span></label>
            <textarea className="form-input" rows={4} value={form.explanationSimple} onChange={e => set('explanationSimple', e.target.value)} placeholder="Think of a variable like a labeled box…" />
          </div>
          <div className="form-group">
            <label className="form-label">Technical Explanation <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(developer level)</span></label>
            <textarea className="form-input" rows={4} value={form.explanationTechnical} onChange={e => set('explanationTechnical', e.target.value)} placeholder="Java is statically typed — variable types are resolved at compile time…" />
          </div>
          <div className="form-group">
            <label className="form-label">Syntax Block</label>
            <textarea className="form-input" rows={5} value={form.syntax} onChange={e => set('syntax', e.target.value)} placeholder="type variableName = value;" style={mono} />
          </div>

          {/* ── Examples ── */}
          <SectionDivider label="Examples" />
          {form.examples.map((ex, i) => (
            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '0.875rem', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Example {i + 1}</span>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeExample(i)} style={{ color: 'var(--danger)', padding: '0.2rem 0.4rem' }}>
                  <X size={13} />
                </button>
              </div>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" value={ex.title} onChange={e => updateExample(i, 'title', e.target.value)} placeholder="e.g. Basic Primitives" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input className="form-input" value={ex.description} onChange={e => updateExample(i, 'description', e.target.value)} placeholder="Short description of what this example shows" />
              </div>
              <div className="form-group">
                <label className="form-label">Code</label>
                <textarea className="form-input" rows={5} value={ex.code} onChange={e => updateExample(i, 'code', e.target.value)} placeholder="// example code" style={mono} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Expected Output</label>
                <textarea className="form-input" rows={2} value={ex.output} onChange={e => updateExample(i, 'output', e.target.value)} placeholder="Hello World" style={mono} />
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm" onClick={addExample} style={{ width: '100%', justifyContent: 'center', border: '1px dashed var(--border)', marginBottom: '0.5rem' }}>
            <Plus size={13} /> Add Example
          </button>

          {/* ── Key Points ── */}
          <SectionDivider label="Key Points" />
          {form.keyPoints.map((kp, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
              <input className="form-input" value={kp} onChange={e => updateKeyPoint(i, e.target.value)} placeholder={`Key point ${i + 1}…`} style={{ flex: 1 }} />
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeKeyPoint(i)} style={{ color: 'var(--danger)', flexShrink: 0 }}>
                <X size={13} />
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm" onClick={addKeyPoint} style={{ width: '100%', justifyContent: 'center', border: '1px dashed var(--border)', marginBottom: '0.5rem' }}>
            <Plus size={13} /> Add Key Point
          </button>

          {/* ── Pro Tip ── */}
          <SectionDivider label="Pro Tip" />
          <div className="form-group">
            <label className="form-label">Tip</label>
            <textarea className="form-input" rows={2} value={form.tip} onChange={e => set('tip', e.target.value)} placeholder="A pro tip or best practice to highlight…" />
          </div>

          {/* ── Common Mistakes ── */}
          <SectionDivider label="Common Mistakes" />
          {form.commonMistakes.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
              <input className="form-input" value={m} onChange={e => updateMistake(i, e.target.value)} placeholder={`Common mistake ${i + 1}…`} style={{ flex: 1 }} />
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeMistake(i)} style={{ color: 'var(--danger)', flexShrink: 0 }}>
                <X size={13} />
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm" onClick={addMistake} style={{ width: '100%', justifyContent: 'center', border: '1px dashed var(--border)', marginBottom: '0.5rem' }}>
            <Plus size={13} /> Add Common Mistake
          </button>

          {/* ── Legacy Content ── */}
          <SectionDivider label="Legacy Content (optional)" />
          <div className="form-group">
            <label className="form-label">What Is It?</label>
            <textarea className="form-input" rows={2} value={form.whatItIs} onChange={e => set('whatItIs', e.target.value)} placeholder="Simple one-line definition (used as fallback if Introduction is empty)" />
          </div>
          <div className="form-group">
            <label className="form-label">Why Does It Matter?</label>
            <textarea className="form-input" rows={2} value={form.whyItMatters} onChange={e => set('whyItMatters', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Legacy Code Example</label>
            <textarea className="form-input" rows={4} value={form.codeExample} onChange={e => set('codeExample', e.target.value)} placeholder="// Used as fallback code block if no Examples are added" style={mono} />
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
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }, [selectedSubject])

  const reload = () => {
    if (!selectedSubject) return
    setLoading(true)
    getAdminConcepts(selectedSubject)
      .then(r => setConcepts(r.data))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
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
        <RadarLoader height={220} />
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="table-name">{c.title}</div>
                      {c.rank && (() => {
                        const colors = { S:'#EF4444', A:'#F59E0B', B:'#9B6ED4', C:'#60A5FA', D:'#4ADE80', E:'#888888' }
                        const col = colors[c.rank] || '#888'
                        return <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', fontWeight: 700, padding: '0.1rem 0.35rem', borderRadius: 3, border: `1px solid ${col}`, color: col, background: col + '18', flexShrink: 0 }}>{c.rank}</span>
                      })()}
                    </div>
                    {(c.introduction || c.whatItIs) && <div className="text-xs text-muted truncate" style={{ maxWidth: 400 }}>{(c.introduction || c.whatItIs).substring(0, 80)}…</div>}
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
