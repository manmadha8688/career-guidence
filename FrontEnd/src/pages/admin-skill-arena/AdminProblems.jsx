import { useState, useEffect, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import AdminSkeleton from '../../components/loaders/AdminSkeleton'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Plus, Pencil, X, Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import useAdminSelection from '../../hooks/useAdminSelection'
import { getAdminProblems, createProblem, updateProblemQ, deleteProblemQ } from '../../api/api'
import toast from 'react-hot-toast'
import useBodyLock from '../../hooks/useBodyLock'

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

const listToText = (arr) => (arr || []).join('\n')
const textToList = (str) => str.split('\n').map(s => s.trim()).filter(Boolean)

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--warning)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: '0.35rem', marginBottom: '0.75rem', marginTop: '0.25rem' }}>
      {children}
    </div>
  )
}

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

  const tabStyle = (t) => ({
    padding: '0.5rem 1rem', border: 'none', cursor: 'pointer',
    fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.08em',
    fontWeight: 700, transition: 'all 0.12s',
    background: activeTab === t ? 'var(--primary)' : 'transparent',
    color: activeTab === t ? '#fff' : 'var(--text-muted)',
    borderRadius: activeTab === t ? 6 : 0,
  })

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 780, maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div className="modal-header" style={{ flexShrink: 0 }}>
          <h3 className="modal-title">{problem ? 'Edit Problem' : 'New Problem'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: '0.25rem', padding: '0.5rem 1.5rem', borderBottom: '1px solid var(--border)', flexShrink: 0, background: 'var(--bg-secondary)' }}>
          {MODAL_TABS.map(t => (
            <button key={t} style={tabStyle(t)} onClick={() => setActiveTab(t)}>{t.toUpperCase()}</button>
          ))}
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', flex: 1, padding: '1.25rem 1.5rem' }}>

          {/* ── BASIC ── */}
          {activeTab === 'Basic' && (
            <>
              <SectionLabel>Tracks (select all that apply)</SectionLabel>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {TRACK_OPTIONS.map(t => {
                  const active = form.tracks.includes(t)
                  return (
                    <button key={t} type="button" onClick={() => toggleTrack(t)} style={{
                      padding: '0.3rem 0.75rem', borderRadius: 6, cursor: 'pointer',
                      fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.05em',
                      border: `1.5px solid ${active ? TRACK_COLORS[t] : 'var(--border)'}`,
                      background: active ? TRACK_COLORS[t] + '22' : 'transparent',
                      color: active ? TRACK_COLORS[t] : 'var(--text-muted)',
                      transition: 'all 0.12s',
                    }}>
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
                <textarea className="form-input" rows={3} value={form.topics} onChange={e => set('topics', e.target.value)} placeholder={'Arrays\nTwo Pointers'} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
              </div>

              <SectionLabel>Interview Settings</SectionLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                <input type="checkbox" id="isInterview" checked={form.isInterview} onChange={e => set('isInterview', e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--primary)' }} />
                <label htmlFor="isInterview" style={{ cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: "'Share Tech Mono', monospace" }}>Mark as Interview Question (shows ★ badge)</label>
              </div>
              <div className="form-group">
                <label className="form-label">Companies that ask (one per line)</label>
                <textarea className="form-input" rows={3} value={form.companiesThatAsk} onChange={e => set('companiesThatAsk', e.target.value)} placeholder={'Amazon\nGoogle\nMicrosoft'} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
              </div>
            </>
          )}

          {/* ── CONTENT ── */}
          {activeTab === 'Content' && (
            <>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-input" rows={5} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Full problem statement with examples..." style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
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
                  <textarea className="form-input" rows={3} value={form.sampleInput} onChange={e => set('sampleInput', e.target.value)} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Sample Output</label>
                  <textarea className="form-input" rows={3} value={form.sampleOutput} onChange={e => set('sampleOutput', e.target.value)} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Constraints</label>
                <input className="form-input" value={form.constraints} onChange={e => set('constraints', e.target.value)} placeholder="e.g. 1 <= n <= 10^5" />
              </div>
            </>
          )}

          {/* ── LEARNING ── */}
          {activeTab === 'Learning' && (
            <>
              <div className="form-group">
                <label className="form-label">Hints (one per line — progressive, easiest first)</label>
                <textarea className="form-input" rows={4} value={form.hints} onChange={e => set('hints', e.target.value)} placeholder={'Hint 1 — gentle nudge\nHint 2 — more specific\nHint 3 — almost the answer'} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
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

          {/* ── SOLUTIONS ── */}
          {activeTab === 'Solutions' && (
            <>
              {/* Variant selector */}
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
                {VARIANTS.map(v => (
                  <button key={v} type="button" onClick={() => setActiveVariant(v)} style={{
                    padding: '0.35rem 0.875rem', borderRadius: 6, cursor: 'pointer',
                    fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.05em',
                    border: `1.5px solid ${activeVariant === v ? VARIANT_COLORS[v] + '80' : 'var(--border)'}`,
                    background: activeVariant === v ? VARIANT_COLORS[v] + '18' : 'transparent',
                    color: activeVariant === v ? VARIANT_COLORS[v] : 'var(--text-muted)',
                    transition: 'all 0.12s',
                  }}>
                    {VARIANT_LABELS[v]}
                  </button>
                ))}
              </div>

              {/* Variant fields */}
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

              {/* Language tabs */}
              <SectionLabel>Code per Language</SectionLabel>
              <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.75rem' }}>
                {LANGS.map(l => (
                  <button key={l} type="button" onClick={() => setActiveLang(l)} style={{
                    padding: '0.28rem 0.7rem', borderRadius: 6, cursor: 'pointer',
                    fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem',
                    border: `1px solid ${activeLang === l ? 'var(--primary)' : 'var(--border)'}`,
                    background: activeLang === l ? 'var(--primary)' : 'transparent',
                    color: activeLang === l ? '#fff' : 'var(--text-muted)',
                    transition: 'all 0.12s',
                  }}>
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
              <div className="form-group">
                <textarea
                  className="form-input"
                  rows={12}
                  value={form.solutions[activeVariant].code[activeLang]}
                  onChange={e => setSolutionCode(activeVariant, activeLang, e.target.value)}
                  placeholder={`${LANG_LABELS[activeLang]} code for ${VARIANT_LABELS[activeVariant]} solution...`}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.78rem', lineHeight: 1.6 }}
                />
              </div>
              <div style={{
                padding: '0.6rem 0.875rem', borderRadius: 7,
                background: 'var(--bg-tertiary)', border: '1px solid var(--border)',
                fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
                color: 'var(--text-muted)', letterSpacing: '0.05em',
              }}>
                💡 Fill all 3 variants × 4 languages. Switch variants above, then languages.
              </div>
            </>
          )}

          {/* Footer */}
          <div className="modal-actions" style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)', marginTop: '1rem' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
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

  const LEVEL_COLORS = { BEGINNER: '#22C55E', INTERMEDIATE: '#F59E0B', ADVANCED: '#EF4444' }

  return (
    <AppLayout title="Problems">
      <div className="page-header">
        <div>
          <h1 className="page-title">Problem Solving</h1>
          <p className="page-subtitle">{problems.length} problems across all tracks</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Track filter */}
          <select
            value={trackFilter}
            onChange={e => setTrackFilter(e.target.value)}
            className="form-input"
            style={{ width: 170, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem' }}
          >
            <option value="ALL">All Tracks</option>
            {TRACK_OPTIONS.map(t => <option key={t} value={t}>{TRACK_LABELS[t]}</option>)}
          </select>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input className="form-input" style={{ paddingLeft: '2.25rem', width: 220 }} placeholder="Search problems…" value={search} onChange={e => setSearch(e.target.value)} />
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
                <th style={{ width: 44 }}>
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
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
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
                  <td style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', minWidth: 32 }}>
                    {p.orderIndex}
                  </td>
                  <td>
                    <div className="table-name">{p.title}</div>
                    {p.description && <div className="text-xs text-muted truncate" style={{ maxWidth: 260 }}>{p.description.split('\n')[0]}</div>}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', maxWidth: 180 }}>
                      {(p.tracks || []).map(t => (
                        <span key={t} style={{
                          fontSize: '0.58rem', fontFamily: "'Share Tech Mono', monospace",
                          padding: '0.1rem 0.4rem', borderRadius: 3,
                          background: TRACK_COLORS[t] + '18', color: TRACK_COLORS[t],
                          border: `1px solid ${TRACK_COLORS[t]}30`,
                        }}>
                          {TRACK_LABELS[t]}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace",
                      padding: '0.12rem 0.45rem', borderRadius: 4,
                      background: (LEVEL_COLORS[p.level] || '#888') + '15',
                      color: LEVEL_COLORS[p.level] || '#888',
                      border: `1px solid ${(LEVEL_COLORS[p.level] || '#888')}30`,
                    }}>
                      {p.level ? p.level.charAt(0) + p.level.slice(1).toLowerCase() : '—'}
                    </span>
                  </td>
                  <td className="text-sm text-muted">{p.type || '—'}</td>
                  <td className="text-sm text-muted">{p.category || <span style={{ color: 'var(--border)' }}>—</span>}</td>
                  
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
