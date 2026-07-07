import { useState, useEffect, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Plus, Pencil, X, Search, Trash2 } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminPageToolbar from '../../components/admin/AdminPageToolbar'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import useAdminSelection from '../../hooks/useAdminSelection'
import { getAdminProblems, createProblem, updateProblemQ, deleteProblemQ } from '../../api/api'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'
import useBodyLock from '../../hooks/useBodyLock'
import SectionLabel from '../../components/admin/SectionLabel'
import { listToText, textToList } from '../../components/admin/adminFormUtils'

// ─── Constants ────────────────────────────────────────────────────────────────

const TRACK_OPTIONS = ['START_CODING', 'LOGIC_BUILDING', 'SKILL_UP', 'CRACK_IT', 'BUILD_IT', 'PROVE_IT']
const TRACK_LABELS  = { START_CODING: 'Start Coding', LOGIC_BUILDING: 'Logic Building', SKILL_UP: 'Skill Up', CRACK_IT: 'Crack It', BUILD_IT: 'Build It', PROVE_IT: 'Prove It' }
const TRACK_COLORS  = { START_CODING: '#9CA3AF', LOGIC_BUILDING: '#4ADE80', SKILL_UP: '#60A5FA', CRACK_IT: '#9B6ED4', BUILD_IT: '#F59E0B', PROVE_IT: '#EF4444' }
const LEVELS  = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
const LANGS   = ['python', 'java', 'c', 'cpp']
const LANG_LABELS = { python: 'Python', java: 'Java', c: 'C', cpp: 'C++' }
const VARIANTS = ['brute', 'normal', 'optimized']
const VARIANT_LABELS = { brute: 'Brute Force', normal: 'Cleaner Way', optimized: 'Optimal' }
const VARIANT_COLORS = { brute: '#F59E0B', normal: '#60A5FA', optimized: '#4ADE80' }
const MODAL_TABS = ['Basic', 'Content', 'Learning', 'Solutions']
const LEVEL_COLORS = { BEGINNER: '#4ADE80', INTERMEDIATE: '#F59E0B', ADVANCED: '#C084FC' }

const emptyVariant = () => ({ logic: '', timeComplexity: 'O(n)', spaceComplexity: 'O(1)', code: { c: '', python: '', java: '', cpp: '' } })
const emptyExample = () => ({ input: '', output: '', explanation: '' })
const emptyForm = () => ({
  track: 'START_CODING', topics: '', category: '', level: 'BEGINNER',
  title: '', description: '', inputFormat: '', outputFormat: '',
  constraints: '', codeSnippet: '',
  examples: [emptyExample(), emptyExample()],
  hints: '', approach: '', whatYouLearn: '',
  solutions: { brute: emptyVariant(), normal: emptyVariant(), optimized: emptyVariant() },
  explanation: '', tip: '', orderIndex: 0,
})

const variantHasContent = (v) =>
  !!(v && (v.logic?.trim() || LANGS.some(l => v.code?.[l]?.trim())))

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProblemModal({ problem, onClose, onSave }) {
  const initForm = () => {
    if (!problem) return emptyForm()
    const ex = (problem.examples && problem.examples.length ? problem.examples : [emptyExample()])
      .map(e => ({ input: e.input || '', output: e.output || '', explanation: e.explanation || '' }))
    return {
      track: problem.track || 'START_CODING',
      topics: listToText(problem.topics),
      category: problem.category || '',
      level: problem.level || 'BEGINNER',
      title: problem.title || '',
      description: problem.description || '',
      inputFormat: problem.inputFormat || '',
      outputFormat: problem.outputFormat || '',
      constraints: problem.constraints || '',
      codeSnippet: problem.codeSnippet || '',
      examples: ex,
      hints: listToText(problem.hints),
      approach: problem.approach || '',
      whatYouLearn: listToText(problem.whatYouLearn),
      solutions: {
        brute:     problem.solutions?.brute     || emptyVariant(),
        normal:    problem.solutions?.normal    || emptyVariant(),
        optimized: problem.solutions?.optimized || emptyVariant(),
      },
      explanation: problem.explanation || '',
      tip: problem.tip || '',
      orderIndex: problem.orderIndex || 0,
    }
  }

  const [form, setForm] = useState(initForm)
  const [activeTab, setActiveTab] = useState('Basic')
  const [activeVariant, setActiveVariant] = useState('normal')
  const [activeLang, setActiveLang] = useState('python')
  const [loading, setLoading] = useState(false)

  useBodyLock()

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const setExample = (i, field, val) =>
    setForm(f => ({ ...f, examples: f.examples.map((e, idx) => idx === i ? { ...e, [field]: val } : e) }))
  const addExample = () => setForm(f => ({ ...f, examples: [...f.examples, emptyExample()] }))
  const removeExample = (i) => setForm(f => ({ ...f, examples: f.examples.filter((_, idx) => idx !== i) }))

  const setSolution = (variant, field, val) =>
    setForm(f => ({ ...f, solutions: { ...f.solutions, [variant]: { ...f.solutions[variant], [field]: val } } }))

  const setSolutionCode = (variant, lang, val) =>
    setForm(f => ({
      ...f,
      solutions: {
        ...f.solutions,
        [variant]: { ...f.solutions[variant], code: { ...f.solutions[variant].code, [lang]: val } }
      }
    }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title.trim()) { toast.error('Title is required'); return }
    if (!form.track) { toast.error('Select a track'); return }

    // Keep only variants that actually have content; drop empty ones so the backend stores null.
    const solutions = {}
    VARIANTS.forEach(v => { if (variantHasContent(form.solutions[v])) solutions[v] = form.solutions[v] })

    setLoading(true)
    try {
      const payload = {
        ...form,
        topics:       textToList(form.topics),
        hints:        textToList(form.hints),
        whatYouLearn: textToList(form.whatYouLearn),
        examples:     form.examples.filter(e => e.input.trim() || e.output.trim() || e.explanation.trim()),
        solutions,
        orderIndex:   parseInt(form.orderIndex) || 0,
      }
      problem ? await updateProblemQ(problem.id, payload) : await createProblem(payload)
      toast.success(problem ? 'Problem updated' : 'Problem created')
      onSave()
    } catch (err) {
      toast.error(getApiError(err, 'We could not save this problem. Please try again.'))
    } finally {
      setTimeout(() => setLoading(false), TEST_DELAY_MS)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal admin-form-modal--780-tall">

        <div className="modal-header admin-form-modal__header">
          <h3 className="modal-title">{problem ? 'Edit Problem' : 'New Problem'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="admin-tab-bar">
          {MODAL_TABS.map(t => (
            <button key={t} type="button"
              className={`admin-tab-btn${activeTab === t ? ' is-active' : ''}`}
              onClick={() => setActiveTab(t)}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="admin-form-modal__body admin-form-modal__body--padded">

          {activeTab === 'Basic' && (
            <>
              <SectionLabel>Track (a problem belongs to exactly one)</SectionLabel>
              <div className="admin-toggle-row">
                {TRACK_OPTIONS.map(t => {
                  const active = form.track === t
                  return (
                    <button key={t} type="button" onClick={() => set('track', t)}
                      className={`admin-toggle-chip${active ? ' is-active' : ''}`}
                      style={{ '--chip-accent': TRACK_COLORS[t], '--chip-accent-bg': TRACK_COLORS[t] + '22' }}>
                      {TRACK_LABELS[t]}
                    </button>
                  )
                })}
              </div>

              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="e.g. Sum of Digits" />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Category (group heading)</label>
                  <input className="form-input" value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Loops" />
                </div>
                <div className="form-group">
                  <label className="form-label">Order Index</label>
                  <input className="form-input" type="number" min="0" value={form.orderIndex} onChange={e => set('orderIndex', e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Level</label>
                <select className="form-input" value={form.level} onChange={e => set('level', e.target.value)}>
                  {LEVELS.map(l => <option key={l} value={l}>{l.charAt(0) + l.slice(1).toLowerCase()}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Topics (one per line — used for filtering)</label>
                <textarea className="form-input admin-textarea-mono" rows={3} value={form.topics} onChange={e => set('topics', e.target.value)} placeholder={'Loops\nModulo'} />
              </div>
            </>
          )}

          {activeTab === 'Content' && (
            <>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-input admin-textarea-mono" rows={5} value={form.description} onChange={e => set('description', e.target.value)} placeholder="The problem statement the student reads first..." />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Input Format</label>
                  <textarea className="form-input" rows={2} value={form.inputFormat} onChange={e => set('inputFormat', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Output Format</label>
                  <textarea className="form-input" rows={2} value={form.outputFormat} onChange={e => set('outputFormat', e.target.value)} />
                </div>
              </div>

              <SectionLabel>Examples</SectionLabel>
              {form.examples.map((ex, i) => (
                <div key={i} className="admin-example-card">
                  <div className="admin-example-card__head">
                    <span className="admin-example-card__title">Example {i + 1}</span>
                    {form.examples.length > 1 && (
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeExample(i)} aria-label={`Remove example ${i + 1}`}>
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Input</label>
                      <textarea className="form-input admin-textarea-mono" rows={2} value={ex.input} onChange={e => setExample(i, 'input', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Output</label>
                      <textarea className="form-input admin-textarea-mono" rows={2} value={ex.output} onChange={e => setExample(i, 'output', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Explanation</label>
                    <textarea className="form-input" rows={2} value={ex.explanation} onChange={e => setExample(i, 'explanation', e.target.value)} placeholder="Why this input gives this output..." />
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-ghost btn-sm admin-add-example-btn" onClick={addExample}>
                <Plus size={13} /> Add Example
              </button>

              <div className="form-group admin-form-group--spaced">
                <label className="form-label">Constraints</label>
                <input className="form-input" value={form.constraints} onChange={e => set('constraints', e.target.value)} placeholder="e.g. 1 <= n <= 100" />
              </div>
              <div className="form-group">
                <label className="form-label">Code Snippet (optional — for "read this code" problems)</label>
                <textarea className="form-input admin-textarea-mono--code" rows={5} value={form.codeSnippet} onChange={e => set('codeSnippet', e.target.value)} />
              </div>
            </>
          )}

          {activeTab === 'Learning' && (
            <>
              <div className="form-group">
                <label className="form-label">What You'll Learn (one per line — skills this problem builds)</label>
                <textarea className="form-input admin-textarea-mono" rows={3} value={form.whatYouLearn} onChange={e => set('whatYouLearn', e.target.value)} placeholder={'Writing your first loop\nUsing a counter to repeat an action'} />
              </div>
              <div className="form-group">
                <label className="form-label">Hints (one per line — progressive, easiest first)</label>
                <textarea className="form-input admin-textarea-mono" rows={4} value={form.hints} onChange={e => set('hints', e.target.value)} placeholder={'Hint 1 — gentle nudge\nHint 2 — more specific'} />
              </div>
              <div className="form-group">
                <label className="form-label">Approach (guide the thinking — do not give the full answer)</label>
                <textarea className="form-input" rows={4} value={form.approach} onChange={e => set('approach', e.target.value)} placeholder="How to think about the problem step by step..." />
              </div>
              <div className="form-group">
                <label className="form-label">Explanation (why the solution works)</label>
                <textarea className="form-input" rows={4} value={form.explanation} onChange={e => set('explanation', e.target.value)} placeholder="Why this solution works, key insight..." />
              </div>
              <div className="form-group">
                <label className="form-label">Tip (short, encouraging)</label>
                <textarea className="form-input" rows={2} value={form.tip} onChange={e => set('tip', e.target.value)} placeholder="A friendly nudge to keep the student going..." />
              </div>
            </>
          )}

          {activeTab === 'Solutions' && (
            <>
              <div className="admin-solutions-hint admin-solutions-hint--top">
                💡 Variants are optional. A simple problem can ship just one (fill "Cleaner Way").
                Harder ones can add Brute Force and Optimal. Empty variants are ignored.
              </div>
              <div className="admin-toggle-row admin-toggle-row--variant">
                {VARIANTS.map(v => (
                  <button key={v} type="button" onClick={() => setActiveVariant(v)}
                    className={`admin-toggle-chip admin-toggle-chip--variant${activeVariant === v ? ' is-active' : ''}${variantHasContent(form.solutions[v]) ? ' has-content' : ''}`}
                    style={{ '--chip-accent': VARIANT_COLORS[v], '--chip-accent-bg': VARIANT_COLORS[v] + '18' }}>
                    {VARIANT_LABELS[v]}{variantHasContent(form.solutions[v]) ? ' ✓' : ''}
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label className="form-label">Logic — plain English explanation</label>
                <textarea className="form-input" rows={2} value={form.solutions[activeVariant].logic}
                  onChange={e => setSolution(activeVariant, 'logic', e.target.value)}
                  placeholder="Describe the approach in plain English..." />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Time Complexity</label>
                  <input className="form-input" value={form.solutions[activeVariant].timeComplexity}
                    onChange={e => setSolution(activeVariant, 'timeComplexity', e.target.value)}
                    placeholder="O(n)" />
                </div>
                <div className="form-group">
                  <label className="form-label">Space Complexity</label>
                  <input className="form-input" value={form.solutions[activeVariant].spaceComplexity}
                    onChange={e => setSolution(activeVariant, 'spaceComplexity', e.target.value)}
                    placeholder="O(1)" />
                </div>
              </div>

              <SectionLabel>Code per Language</SectionLabel>
              <div className="admin-toggle-row admin-toggle-row--lang">
                {LANGS.map(l => (
                  <button key={l} type="button" onClick={() => setActiveLang(l)}
                    className={`admin-toggle-chip admin-toggle-chip--lang${activeLang === l ? ' is-active' : ''}`}>
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
              <div className="form-group">
                <textarea
                  className="form-input admin-textarea-mono--code"
                  rows={12}
                  value={form.solutions[activeVariant].code[activeLang]}
                  onChange={e => setSolutionCode(activeVariant, activeLang, e.target.value)}
                  placeholder={`${LANG_LABELS[activeLang]} code for the ${VARIANT_LABELS[activeVariant]} solution...`}
                />
              </div>
            </>
          )}

          <div className="modal-actions admin-modal-actions--bordered-lg">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <div className="admin-modal-footer-actions">
              {MODAL_TABS.indexOf(activeTab) > 0 && (
                <button type="button" className="btn btn-ghost"
                  onClick={() => setActiveTab(MODAL_TABS[MODAL_TABS.indexOf(activeTab) - 1])}>
                  ← Back
                </button>
              )}
              {activeTab !== 'Solutions' ? (
                <button type="button" className="btn btn-primary"
                  onClick={() => setActiveTab(MODAL_TABS[MODAL_TABS.indexOf(activeTab) + 1])}>
                  Next →
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? <span className="loading-spinner" /> : null}
                  {problem ? 'Update Problem' : 'Create Problem'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminProblems() {
  const [problems, setProblems] = useState([])
  const [search, setSearch] = useState('')
  const [trackFilter, setTrackFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)

  const load = () => {
    setLoading(true)
    getAdminProblems()
      .then(r => setProblems(r.data))
      .catch(err => toast.error(getApiError(err, 'We could not load problems. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }

  useEffect(() => { load() }, [])

  const filtered = problems.filter(p => {
    const matchTrack = trackFilter === 'ALL' || p.track === trackFilter
    const q = search.toLowerCase()
    const matchSearch = !q || p.title?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    return matchTrack && matchSearch
  })

  const filteredIds = useMemo(() => filtered.map(p => p.id), [filtered])
  const selection = useAdminSelection(filteredIds)

  const deleteTargets = useMemo(
    () => selection.selectedIds.map(id => ({
      id,
      label: problems.find(p => p.id === id)?.title || id,
    })),
    [selection.selectedIds, problems],
  )

  const confirmBulkDelete = async () => {
    setBulkDeleting(true)
    try {
      for (const id of selection.selectedIds) {
        await deleteProblemQ(id)
      }
      toast.success(`Deleted ${selection.selectedIds.length} problem${selection.selectedIds.length !== 1 ? 's' : ''}`)
      selection.clear()
      setDeleteModal(false)
      load()
    } catch (err) {
      toast.error(getApiError(err, 'Some selected problems could not be deleted. Please try again.'))
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <AppLayout title="Problem Solving">
      <AdminPageToolbar subtitle={`${problems.length} problems across all tracks`}>
        <div className="admin-page-actions admin-page-actions--wrap">
          <select
            value={trackFilter}
            onChange={e => setTrackFilter(e.target.value)}
            className="form-input admin-track-filter"
          >
            <option value="ALL">All Tracks</option>
            {TRACK_OPTIONS.map(t => <option key={t} value={t}>{TRACK_LABELS[t]}</option>)}
          </select>

          <div className="admin-search-wrap">
            <Search size={14} className="admin-search-icon" />
            <input className="form-input admin-search-input" placeholder="Search problems…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <button className="btn btn-primary" onClick={() => setModal('new')}>
            <Plus size={15} /> New Problem
          </button>
        </div>
      </AdminPageToolbar>

      {loading ? (
        <RadarLoader height={220} />
      ) : (
        <>
          <AdminBulkToolbar
            count={selection.count}
            label="problem"
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
                    aria-label="Select all problems"
                    checked={selection.allSelected}
                    ref={el => { if (el) el.indeterminate = selection.someSelected }}
                    onChange={selection.toggleAll}
                  />
                </th>
                <th>#</th>
                <th>Title</th>
                <th>Track</th>
                <th>Level</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="admin-table-empty">
                  {search || trackFilter !== 'ALL' ? 'No problems match your filters.' : 'No problems yet — click New Problem.'}
                </td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} className={selection.isSelected(p.id) ? 'row-selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      aria-label={`Select ${p.title}`}
                      checked={selection.isSelected(p.id)}
                      onChange={() => selection.toggle(p.id)}
                    />
                  </td>
                  <td className="admin-order-cell">
                    {p.orderIndex}
                  </td>
                  <td>
                    <div className="table-name">{p.title}</div>
                    {p.description && <div className="text-xs text-muted truncate admin-truncate-desc--260">{p.description.split('\n')[0]}</div>}
                  </td>
                  <td>
                    {p.track && (
                      <span className="admin-tag-chip--dynamic"
                        style={{
                          '--tag-bg': (TRACK_COLORS[p.track] || '#888') + '18',
                          '--tag-color': TRACK_COLORS[p.track] || '#888',
                          '--tag-border': (TRACK_COLORS[p.track] || '#888') + '30',
                          '--tag-font-size': '0.6rem',
                          '--tag-radius': '3px',
                        }}>
                        {TRACK_LABELS[p.track] || p.track}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="admin-tag-chip--dynamic"
                      style={{
                        '--tag-bg': (LEVEL_COLORS[p.level] || '#888') + '15',
                        '--tag-color': LEVEL_COLORS[p.level] || '#888',
                        '--tag-border': (LEVEL_COLORS[p.level] || '#888') + '30',
                        '--tag-font-size': '0.65rem',
                        '--tag-padding': '0.12rem 0.45rem',
                        '--tag-radius': '4px',
                      }}>
                      {p.level ? p.level.charAt(0) + p.level.slice(1).toLowerCase() : '—'}
                    </span>
                  </td>
                  <td className="text-sm text-muted">{p.category || <span className="admin-em-dash">—</span>}</td>

                  <td>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModal(p)} aria-label={`Edit ${p.title}`}>
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
        <ProblemModal
          problem={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); load() }}
        />
      )}

      <AdminDeleteModal
        open={deleteModal}
        title="Delete selected problems?"
        subtitle="Each problem and its solutions will be permanently removed."
        items={deleteTargets}
        deleting={bulkDeleting}
        onConfirm={confirmBulkDelete}
        onClose={() => !bulkDeleting && setDeleteModal(false)}
      />
    </AppLayout>
  )
}
