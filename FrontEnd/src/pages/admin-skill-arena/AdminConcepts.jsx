import { useState, useEffect, useRef, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Plus, Pencil, X, ChevronDown, Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import useAdminSelection from '../../hooks/useAdminSelection'
import { getAdminSubjects, getAdminConcepts, createConcept, updateConcept, deleteConcept } from '../../api/api'
import toast from 'react-hot-toast'
import useBodyLock from '../../hooks/useBodyLock'

const RANK_COLORS = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#4ADE80', E: '#888888' }

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
    <div ref={ref} className="admin-select-wrap admin-select-wrap--220">
      <div className="form-input admin-select-trigger"
        onClick={() => { setOpen(o => !o); setQuery('') }}>
        <span className="admin-select-value">
          {selected ? `${selected.icon} ${selected.title}` : placeholder}
        </span>
        <ChevronDown size={14} className={`admin-select-chevron${open ? ' is-open' : ''}`} />
      </div>
      {open && (
        <div className="admin-select-dropdown">
          <div className="admin-select-filter">
            <input autoFocus className="form-input admin-select-filter-input" placeholder="Type to filter…"
              value={query} onChange={e => setQuery(e.target.value)} onClick={e => e.stopPropagation()} />
          </div>
          <div className="admin-select-list">
            {filtered.length === 0
              ? <div className="admin-select-empty">No matches</div>
              : filtered.map(s => (
                <div key={s.id}
                  onClick={() => { onChange(s.id); setOpen(false); setQuery('') }}
                  className={`admin-select-option${s.id === value ? ' is-selected' : ''}`}>
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
    <div className="admin-section-divider">
      <div className="admin-section-divider__line" />
      <span className="admin-section-divider__label">{label}</span>
      <div className="admin-section-divider__line" />
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

  useBodyLock()

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const addExample = () => setForm(f => ({ ...f, examples: [...f.examples, emptyExample()] }))
  const removeExample = i => setForm(f => ({ ...f, examples: f.examples.filter((_, idx) => idx !== i) }))
  const updateExample = (i, field, val) => setForm(f => ({
    ...f, examples: f.examples.map((ex, idx) => idx === i ? { ...ex, [field]: val } : ex)
  }))

  const addKeyPoint = () => setForm(f => ({ ...f, keyPoints: [...f.keyPoints, ''] }))
  const removeKeyPoint = i => setForm(f => ({ ...f, keyPoints: f.keyPoints.filter((_, idx) => idx !== i) }))
  const updateKeyPoint = (i, val) => setForm(f => ({
    ...f, keyPoints: f.keyPoints.map((kp, idx) => idx === i ? val : kp)
  }))

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

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal admin-form-modal--780">
        <div className="modal-header">
          <h3 className="modal-title">{concept ? 'Edit Concept' : 'New Concept'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>

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
            <div className="admin-rank-picker admin-rank-picker--md">
              {['E','D','C','B','A','S'].map(r => (
                <button key={r} type="button" onClick={() => set('rank', r)}
                  className={`admin-rank-btn admin-rank-btn--sm${form.rank === r ? ' is-active' : ''}`}
                  style={{ '--rank-color': RANK_COLORS[r] }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <SectionDivider label="Content" />
          <div className="form-group">
            <label className="form-label">Introduction <span className="admin-form-label-hint">(one-line hook shown at top)</span></label>
            <input className="form-input" value={form.introduction} onChange={e => set('introduction', e.target.value)} placeholder="e.g. Variables are containers for storing data…" />
          </div>
          <div className="form-group">
            <label className="form-label">Simple Explanation <span className="admin-form-label-hint">(analogy / beginner friendly)</span></label>
            <textarea className="form-input" rows={4} value={form.explanationSimple} onChange={e => set('explanationSimple', e.target.value)} placeholder="Think of a variable like a labeled box…" />
          </div>
          <div className="form-group">
            <label className="form-label">Technical Explanation <span className="admin-form-label-hint">(developer level)</span></label>
            <textarea className="form-input" rows={4} value={form.explanationTechnical} onChange={e => set('explanationTechnical', e.target.value)} placeholder="Java is statically typed — variable types are resolved at compile time…" />
          </div>
          <div className="form-group">
            <label className="form-label">Syntax Block</label>
            <textarea className="form-input admin-textarea-mono--875" rows={5} value={form.syntax} onChange={e => set('syntax', e.target.value)} placeholder="type variableName = value;" />
          </div>

          <SectionDivider label="Examples" />
          {form.examples.map((ex, i) => (
            <div key={i} className="admin-example-card">
              <div className="admin-example-card__header">
                <span className="admin-example-card__title">Example {i + 1}</span>
                <button type="button" className="btn btn-ghost btn-sm admin-example-card__remove" onClick={() => removeExample(i)}>
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
                <textarea className="form-input admin-textarea-mono--875" rows={5} value={ex.code} onChange={e => updateExample(i, 'code', e.target.value)} placeholder="// example code" />
              </div>
              <div className="form-group admin-example-card__group-last">
                <label className="form-label">Expected Output</label>
                <textarea className="form-input admin-textarea-mono--875" rows={2} value={ex.output} onChange={e => updateExample(i, 'output', e.target.value)} placeholder="Hello World" />
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm admin-add-row-btn" onClick={addExample}>
            <Plus size={13} /> Add Example
          </button>

          <SectionDivider label="Key Points" />
          {form.keyPoints.map((kp, i) => (
            <div key={i} className="admin-list-item-row">
              <input className="form-input admin-list-item-row__input" value={kp} onChange={e => updateKeyPoint(i, e.target.value)} placeholder={`Key point ${i + 1}…`} />
              <button type="button" className="btn btn-ghost btn-sm admin-list-item-row__remove" onClick={() => removeKeyPoint(i)}>
                <X size={13} />
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm admin-add-row-btn" onClick={addKeyPoint}>
            <Plus size={13} /> Add Key Point
          </button>

          <SectionDivider label="Pro Tip" />
          <div className="form-group">
            <label className="form-label">Tip</label>
            <textarea className="form-input" rows={2} value={form.tip} onChange={e => set('tip', e.target.value)} placeholder="A pro tip or best practice to highlight…" />
          </div>

          <SectionDivider label="Common Mistakes" />
          {form.commonMistakes.map((m, i) => (
            <div key={i} className="admin-list-item-row">
              <input className="form-input admin-list-item-row__input" value={m} onChange={e => updateMistake(i, e.target.value)} placeholder={`Common mistake ${i + 1}…`} />
              <button type="button" className="btn btn-ghost btn-sm admin-list-item-row__remove" onClick={() => removeMistake(i)}>
                <X size={13} />
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm admin-add-row-btn" onClick={addMistake}>
            <Plus size={13} /> Add Common Mistake
          </button>

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
            <textarea className="form-input admin-textarea-mono--875" rows={4} value={form.codeExample} onChange={e => set('codeExample', e.target.value)} placeholder="// Used as fallback code block if no Examples are added" />
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
  const [deleteModal, setDeleteModal] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)

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

  const filtered = concepts.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

  const filteredIds = useMemo(() => filtered.map(c => c.id), [filtered])
  const selection = useAdminSelection(filteredIds)

  const deleteTargets = useMemo(
    () => selection.selectedIds.map(id => ({
      id,
      label: concepts.find(c => c.id === id)?.title || id,
    })),
    [selection.selectedIds, concepts],
  )

  const confirmBulkDelete = async () => {
    setBulkDeleting(true)
    try {
      for (const id of selection.selectedIds) {
        await deleteConcept(id)
      }
      toast.success(`Deleted ${selection.selectedIds.length} concept${selection.selectedIds.length !== 1 ? 's' : ''}`)
      selection.clear()
      setDeleteModal(false)
      reload()
    } catch {
      toast.error('Could not delete all selected concepts')
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <AppLayout title="Concepts">
      <div className="page-header">
        <div>
          <h1 className="page-title">Concepts</h1>
          <p className="page-subtitle">Manage learning content by subject</p>
        </div>
        <div className="admin-page-actions admin-page-actions--wrap">
          <SearchableSelect items={subjects} value={selectedSubject} onChange={setSelectedSubject} placeholder="Select subject…" />
          <div className="admin-search-wrap">
            <Search size={15} className="admin-search-icon" />
            <input
              className="form-input admin-search-input admin-search-input--narrow"
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
        <>
          <AdminBulkToolbar
            count={selection.count}
            label="concept"
            deleting={bulkDeleting}
            onClear={selection.clear}
            onDelete={() => setDeleteModal(true)}
          />
          <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="admin-th-checkbox">
                  <input
                    type="checkbox"
                    className="table-checkbox"
                    aria-label="Select all concepts"
                    checked={selection.allSelected}
                    ref={el => { if (el) el.indeterminate = selection.someSelected }}
                    onChange={selection.toggleAll}
                  />
                </th>
                <th>#</th><th>Concept</th><th>Est. Time</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="admin-table-empty">No concepts match "{search}"</td></tr>
              ) : filtered.map(c => (
                <tr key={c.id} className={selection.isSelected(c.id) ? 'row-selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      aria-label={`Select ${c.title}`}
                      checked={selection.isSelected(c.id)}
                      onChange={() => selection.toggle(c.id)}
                    />
                  </td>
                  <td className="text-muted text-sm admin-order-cell--40">{c.orderIndex}</td>
                  <td>
                    <div className="admin-row-flex admin-row-flex--sm">
                      <div className="table-name">{c.title}</div>
                      {c.rank && (
                        <span className="admin-rank-badge admin-rank-badge--sm" style={{ '--rank-color': RANK_COLORS[c.rank] || '#888' }}>{c.rank}</span>
                      )}
                    </div>
                    {(c.introduction || c.whatItIs) && <div className="text-xs text-muted truncate admin-truncate-desc--400">{(c.introduction || c.whatItIs).substring(0, 80)}…</div>}
                  </td>
                  <td className="text-sm text-muted">{c.estimatedMinutes}m</td>
                  <td>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModal(c)} aria-label={`Edit ${c.title}`}>
                      <Pencil size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

      {modal && (
        <ConceptModal
          concept={modal === 'new' ? null : modal}
          subjects={subjects}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); reload() }}
        />
      )}

      <AdminDeleteModal
        open={deleteModal}
        title="Delete selected concepts?"
        subtitle="Each concept and its questions and progress data will be permanently removed."
        items={deleteTargets}
        deleting={bulkDeleting}
        onConfirm={confirmBulkDelete}
        onClose={() => !bulkDeleting && setDeleteModal(false)}
      />
    </AppLayout>
  )
}
