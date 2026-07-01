import { useState, useEffect, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Plus, Pencil, X, Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import useAdminSelection from '../../hooks/useAdminSelection'
import { getAdminProblems, createProblem, updateProblemQ, deleteProblemQ } from '../../api/api'
import toast from 'react-hot-toast'
import useBodyLock from '../../hooks/useBodyLock'
import SectionLabel from '../../components/admin/SectionLabel'
import { listToText, textToList } from '../../components/admin/adminFormUtils'

// ─── Constants ────────────────────────────────────────────────────────────────

const TRACK_OPTIONS = ['START_CODING', 'LOGIC_BUILDING', 'SKILL_UP', 'INTERVIEW_PREP', 'SCENARIO_CODING']
const TRACK_LABELS  = { START_CODING: 'Start Coding', LOGIC_BUILDING: 'Logic Building', SKILL_UP: 'Skill Up', INTERVIEW_PREP: 'Interview Prep', SCENARIO_CODING: 'Scenario Coding' }
const TRACK_COLORS  = { START_CODING: '#22C55E', LOGIC_BUILDING: '#F59E0B', SKILL_UP: '#0EA5E9', INTERVIEW_PREP: '#EF4444', SCENARIO_CODING: '#8B5CF6' }
const LEVELS  = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
const TYPES   = ['WRITE', 'PATTERN', 'OUTPUT', 'DEBUG', 'CONCEPTUAL']
const LANGS   = ['python', 'java', 'c', 'cpp']
const LANG_LABELS = { python: 'Python', java: 'Java', c: 'C', cpp: 'C++' }
const VARIANTS = ['brute', 'normal', 'optimized']
const VARIANT_LABELS = { brute: 'Brute Force', normal: 'Normal', optimized: 'Optimized' }
const VARIANT_COLORS = { brute: '#EF4444', normal: '#F59E0B', optimized: '#22C55E' }
const MODAL_TABS = ['Basic', 'Content', 'Learning', 'Solutions']
const LEVEL_COLORS = { BEGINNER: '#22C55E', INTERMEDIATE: '#F59E0B', ADVANCED: '#EF4444' }

const emptyVariant = () => ({ logic: '', timeComplexity: 'O(n)', spaceComplexity: 'O(1)', code: { c: '', python: '', java: '', cpp: '' } })
const emptyForm = () => ({
  tracks: [], topics: '', category: '', level: 'BEGINNER', type: 'WRITE',
  title: '', description: '', inputFormat: '', outputFormat: '',
  sampleInput: '', sampleOutput: '', constraints: '',
  hints: '', approach: '',
  solutions: { brute: emptyVariant(), normal: emptyVariant(), optimized: emptyVariant() },
  explanation: '', interviewTip: '', isInterview: false,
  companiesThatAsk: '', orderIndex: 0,
})

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProblemModal({ problem, onClose, onSave }) {
  const initForm = () => {
    if (!problem) return emptyForm()
    return {
      tracks: problem.tracks || [],
      topics: listToText(problem.topics),
      category: problem.category || '',
      level: problem.level || 'BEGINNER',
      type: problem.type || 'WRITE',
      title: problem.title || '',
      description: problem.description || '',
      inputFormat: problem.inputFormat || '',
      outputFormat: problem.outputFormat || '',
      sampleInput: problem.sampleInput || '',
      sampleOutput: problem.sampleOutput || '',
      constraints: problem.constraints || '',
      hints: listToText(problem.hints),
      approach: problem.approach || '',
      solutions: {
        brute:     problem.solutions?.brute     || emptyVariant(),
        normal:    problem.solutions?.normal    || emptyVariant(),
        optimized: problem.solutions?.optimized || emptyVariant(),
      },
      explanation: problem.explanation || '',
      interviewTip: problem.interviewTip || '',
      isInterview: problem.isInterview || false,
      companiesThatAsk: listToText(problem.companiesThatAsk),
      orderIndex: problem.orderIndex || 0,
    }
  }

  const [form, setForm] = useState(initForm)
  const [activeTab, setActiveTab] = useState('Basic')
  const [activeVariant, setActiveVariant] = useState('brute')
  const [activeLang, setActiveLang] = useState('python')
  const [loading, setLoading] = useState(false)

  useBodyLock()

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const toggleTrack = (t) =>
    set('tracks', form.tracks.includes(t) ? form.tracks.filter(x => x !== t) : [...form.tracks, t])

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
    if (form.tracks.length === 0) { toast.error('Select at least one track'); return }
    setLoading(true)
    try {
      const payload = {
        ...form,
        topics:           textToList(form.topics),
        hints:            textToList(form.hints),
        companiesThatAsk: textToList(form.companiesThatAsk),
        orderIndex:       parseInt(form.orderIndex) || 0,
      }
      problem ? await updateProblemQ(problem.id, payload) : await createProblem(payload)
      toast.success(problem ? 'Problem updated' : 'Problem created')
      onSave()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save')
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
              <SectionLabel>Tracks (select all that apply)</SectionLabel>
              <div className="admin-toggle-row">
                {TRACK_OPTIONS.map(t => {
                  const active = form.tracks.includes(t)
                  return (
                    <button key={t} type="button" onClick={() => toggleTrack(t)}
                      className={`admin-toggle-chip${active ? ' is-active' : ''}`}
                      style={{ '--chip-accent': TRACK_COLORS[t], '--chip-accent-bg': TRACK_COLORS[t] + '22' }}>
                      {TRACK_LABELS[t]}
                    </button>
                  )
                })}
              </div>

              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="e.g. Two Sum" />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input className="form-input" value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Data Structures" />
                </div>
                <div className="form-group">
                  <label className="form-label">Order Index</label>
                  <input className="form-input" type="number" min="0" value={form.orderIndex} onChange={e => set('orderIndex', e.target.value)} />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Level</label>
                  <select className="form-input" value={form.level} onChange={e => set('level', e.target.value)}>
                    {LEVELS.map(l => <option key={l} value={l}>{l.charAt(0) + l.slice(1).toLowerCase()}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-input" value={form.type} onChange={e => set('type', e.target.value)}>
                    {TYPES.map(t => <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Topics (one per line)</label>
                <textarea className="form-input admin-textarea-mono" rows={3} value={form.topics} onChange={e => set('topics', e.target.value)} placeholder={'Arrays\nTwo Pointers'} />
              </div>

              <SectionLabel>Interview Settings</SectionLabel>
              <div className="admin-checkbox-row">
                <input type="checkbox" id="isInterview" checked={form.isInterview} onChange={e => set('isInterview', e.target.checked)} className="admin-form-checkbox" />
                <label htmlFor="isInterview" className="admin-form-checkbox-label admin-form-checkbox-label--md">Mark as Interview Question (shows ★ badge)</label>
              </div>
              <div className="form-group">
                <label className="form-label">Companies that ask (one per line)</label>
                <textarea className="form-input admin-textarea-mono" rows={3} value={form.companiesThatAsk} onChange={e => set('companiesThatAsk', e.target.value)} placeholder={'Amazon\nGoogle\nMicrosoft'} />
              </div>
            </>
          )}

          {activeTab === 'Content' && (
            <>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-input admin-textarea-mono" rows={5} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Full problem statement with examples..." />
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
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Sample Input</label>
                  <textarea className="form-input admin-textarea-mono" rows={3} value={form.sampleInput} onChange={e => set('sampleInput', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Sample Output</label>
                  <textarea className="form-input admin-textarea-mono" rows={3} value={form.sampleOutput} onChange={e => set('sampleOutput', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Constraints</label>
                <input className="form-input" value={form.constraints} onChange={e => set('constraints', e.target.value)} placeholder="e.g. 1 <= n <= 10^5" />
              </div>
            </>
          )}

          {activeTab === 'Learning' && (
            <>
              <div className="form-group">
                <label className="form-label">Hints (one per line — progressive, easiest first)</label>
                <textarea className="form-input admin-textarea-mono" rows={4} value={form.hints} onChange={e => set('hints', e.target.value)} placeholder={'Hint 1 — gentle nudge\nHint 2 — more specific\nHint 3 — almost the answer'} />
              </div>
              <div className="form-group">
                <label className="form-label">Approach</label>
                <textarea className="form-input" rows={4} value={form.approach} onChange={e => set('approach', e.target.value)} placeholder="How to think about the problem step by step..." />
              </div>
              <div className="form-group">
                <label className="form-label">Explanation</label>
                <textarea className="form-input" rows={4} value={form.explanation} onChange={e => set('explanation', e.target.value)} placeholder="Why this solution works, key insights..." />
              </div>
              <div className="form-group">
                <label className="form-label">Interview Tip</label>
                <textarea className="form-input" rows={3} value={form.interviewTip} onChange={e => set('interviewTip', e.target.value)} placeholder="What interviewers look for, follow-up questions, common mistakes..." />
              </div>
            </>
          )}

          {activeTab === 'Solutions' && (
            <>
              <div className="admin-toggle-row admin-toggle-row--variant">
                {VARIANTS.map(v => (
                  <button key={v} type="button" onClick={() => setActiveVariant(v)}
                    className={`admin-toggle-chip admin-toggle-chip--variant${activeVariant === v ? ' is-active' : ''}`}
                    style={{ '--chip-accent': VARIANT_COLORS[v], '--chip-accent-bg': VARIANT_COLORS[v] + '18' }}>
                    {VARIANT_LABELS[v]}
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
                  placeholder={`${LANG_LABELS[activeLang]} code for ${VARIANT_LABELS[activeVariant]} solution...`}
                />
              </div>
              <div className="admin-solutions-hint">
                💡 Fill all 3 variants × 4 languages. Switch variants above, then languages.
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
      .catch(() => toast.error('Failed to load'))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }

  useEffect(() => { load() }, [])

  const filtered = problems.filter(p => {
    const matchTrack = trackFilter === 'ALL' || (p.tracks || []).includes(trackFilter)
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
    } catch {
      toast.error('Could not delete all selected problems')
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <AppLayout title="Problems">
      <div className="page-header">
        <div>
          <h1 className="page-title">Problem Solving</h1>
          <p className="page-subtitle">{problems.length} problems across all tracks</p>
        </div>
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
      </div>

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
                <th>Tracks</th>
                <th>Level</th>
                <th>Type</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="admin-table-empty">
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
                    <div className="admin-tag-wrap admin-tag-wrap--180">
                      {(p.tracks || []).map(t => (
                        <span key={t} className="admin-tag-chip--dynamic"
                          style={{
                            '--tag-bg': TRACK_COLORS[t] + '18',
                            '--tag-color': TRACK_COLORS[t],
                            '--tag-border': TRACK_COLORS[t] + '30',
                            '--tag-font-size': '0.58rem',
                            '--tag-radius': '3px',
                          }}>
                          {TRACK_LABELS[t]}
                        </span>
                      ))}
                    </div>
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
                  <td className="text-sm text-muted">{p.type || '—'}</td>
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
