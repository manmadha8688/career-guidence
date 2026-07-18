import { useState, useEffect, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Plus, Pencil, X, Search, Trash2, ChevronRight, ArrowLeft, ListTree, HelpCircle } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminPageToolbar from '../../components/admin/AdminPageToolbar'
import '../../styles/pages/admin/index.css'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import SectionLabel from '../../components/admin/SectionLabel'
import useBodyLock from '../../hooks/useBodyLock'
import blurOnEnter from '../../utils/blurOnEnter'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'
import {
  getAdminAptitudeGroups, createAptitudeGroup, updateAptitudeGroup, deleteAptitudeGroup,
  getAdminAptitudeTopics, getAdminAptitudeTopic, createAptitudeTopic, updateAptitudeTopic, deleteAptitudeTopic,
  getAdminAptitudeQuestions, createAptitudeQuestion, updateAptitudeQuestion, deleteAptitudeQuestion,
} from '../../api/api'

const CATEGORIES = [
  { id: 'quantitative',        label: 'Quantitative' },
  { id: 'logical',             label: 'Logical' },
  { id: 'verbal',              label: 'Verbal' },
  { id: 'data-interpretation', label: 'Data Interpretation' },
]
const DIFFICULTIES = ['easy', 'medium', 'hard']
const PRIORITIES = ['high', 'medium', 'low']
const ANSWERS = ['A', 'B', 'C', 'D']

// Keys that are edited via dedicated form fields — everything else on a topic
// (videos + the category-specific lesson block) is edited as raw JSON.
const TOPIC_META_KEYS = ['id', 'category', 'group', 'topic', 'displayName', 'description', 'icon', 'difficulty', 'priority', 'order', 'active']

// Skeleton so admins see the expected lesson shape when authoring a new topic.
function lessonTemplate(category) {
  if (category === 'logical') return {
    videos: [],
    lesson: {
      understand: { realLife: '', coreIdea: '', howToThink: '', patterns: [], workedTypes: [], traps: [], memoryHook: '' },
      crack: { oneLine: '', techniques: [], clueToMethod: [], drill: [], whyItWorks: '', bestFor: [], notFor: [], practicePattern: '' },
    },
  }
  if (category === 'verbal') return {
    videos: [],
    lesson: {
      learn: { realLife: '', coreIdea: '', howItWorks: '', rules: [], workedTypes: [], traps: [], memoryHook: '' },
      crack: { oneLine: '', strategies: [], signalGuide: [], drill: [], whyItWorks: '', bestFor: [], notFor: [], practicePattern: '' },
    },
  }
  return {
    videos: [],
    learnIt: { realLife: '', plainMeaning: '', mathIntro: '', formulas: [], questionTypes: [], commonMistakes: [], memoryTrick: '' },
    crackIt: { oneLine: '', shortcuts: [], patternGuide: [], drill: [] },
  }
}

/* ─────────────────────────── GROUP MODAL ─────────────────────────── */
function GroupModal({ group, defaultCategory, onClose, onSave }) {
  const [form, setForm] = useState(() => group ? {
    category: group.category, slug: group.slug, displayName: group.displayName || '',
    description: group.description || '', icon: group.icon || '', order: group.order ?? 0, active: group.active !== false,
  } : {
    category: defaultCategory || 'quantitative', slug: '', displayName: '',
    description: '', icon: '📘', order: 0, active: true,
  })
  const [loading, setLoading] = useState(false)
  useBodyLock()
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, order: parseInt(form.order) || 0 }
      group ? await updateAptitudeGroup(group.id, payload) : await createAptitudeGroup(payload)
      toast.success(group ? 'Group updated' : 'Group created')
      onSave()
    } catch (err) {
      toast.error(getApiError(err, 'We could not save this group. Please try again.'))
    } finally {
      setTimeout(() => setLoading(false), TEST_DELAY_MS)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal admin-form-modal">
        <div className="modal-header admin-form-modal__header">
          <h3 className="modal-title">{group ? 'Edit Group' : 'New Group'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="admin-form-modal__body">
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-input" value={form.category} onChange={e => set('category', e.target.value)} disabled={!!group}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Slug * <span className="admin-form-label-hint">(url-safe, unique)</span></label>
              <input className="form-input" value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="number-basics" required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Display Name *</label>
            <input className="form-input" value={form.displayName} onChange={e => set('displayName', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input className="form-input" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Icon (emoji)</label>
              <input className="form-input" value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="📘" />
            </div>
            <div className="form-group">
              <label className="form-label">Order</label>
              <input className="form-input" type="number" value={form.order} onChange={e => set('order', e.target.value)} />
            </div>
          </div>
          <label className="admin-check-row">
            <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} />
            <span>Active (visible to students)</span>
          </label>
          <div className="modal-actions admin-modal-actions--bordered">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading-spinner" /> : null}
              {group ? 'Update Group' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─────────────────────────── TOPIC MODAL ─────────────────────────── */
function TopicModal({ topic, group, onClose, onSave }) {
  const category = group.category
  const [form, setForm] = useState({
    topic: '', displayName: '', description: '', icon: '📗',
    difficulty: 'easy', priority: 'high', order: 0, active: true,
  })
  const [content, setContent] = useState(() => JSON.stringify(lessonTemplate(category), null, 2))
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(!!topic)
  useBodyLock()
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    if (!topic) return
    getAdminAptitudeTopic(topic.topic)
      .then(r => {
        const full = r.data || {}
        setForm({
          topic: full.topic || '', displayName: full.displayName || '', description: full.description || '',
          icon: full.icon || '', difficulty: full.difficulty || 'easy', priority: full.priority || 'high',
          order: full.order ?? 0, active: full.active !== false,
        })
        const lessonPart = {}
        Object.keys(full).forEach(k => { if (!TOPIC_META_KEYS.includes(k)) lessonPart[k] = full[k] })
        setContent(JSON.stringify(lessonPart, null, 2))
      })
      .catch(err => toast.error(getApiError(err, 'Could not load this topic.')))
      .finally(() => setFetching(false))
  }, [topic])

  const submit = async e => {
    e.preventDefault()
    let lessonObj
    try {
      lessonObj = content.trim() ? JSON.parse(content) : {}
    } catch {
      toast.error('Lesson content is not valid JSON. Please fix it before saving.')
      return
    }
    setLoading(true)
    try {
      const payload = {
        category, group: group.slug,
        topic: form.topic, displayName: form.displayName, description: form.description, icon: form.icon,
        difficulty: form.difficulty, priority: form.priority, order: parseInt(form.order) || 0, active: form.active,
        ...lessonObj,
      }
      topic ? await updateAptitudeTopic(topic.id, payload) : await createAptitudeTopic(payload)
      toast.success(topic ? 'Topic updated' : 'Topic created')
      onSave()
    } catch (err) {
      toast.error(getApiError(err, 'We could not save this topic. Please try again.'))
    } finally {
      setTimeout(() => setLoading(false), TEST_DELAY_MS)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal admin-form-modal admin-form-modal--780">
        <div className="modal-header admin-form-modal__header">
          <h3 className="modal-title">{topic ? 'Edit Topic' : 'New Topic'} <span className="admin-form-label-hint">· {group.displayName}</span></h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        {fetching ? (
          <div className="admin-form-modal__body"><RadarLoader height={160} /></div>
        ) : (
          <form onSubmit={submit} className="admin-form-modal__body">
            <SectionLabel>Metadata</SectionLabel>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Slug * <span className="admin-form-label-hint">(unique across all topics)</span></label>
                <input className="form-input" value={form.topic} onChange={e => set('topic', e.target.value)} placeholder="percentages" required disabled={!!topic} />
              </div>
              <div className="form-group">
                <label className="form-label">Display Name *</label>
                <input className="form-input" value={form.displayName} onChange={e => set('displayName', e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <input className="form-input" value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Icon (emoji)</label>
                <input className="form-input" value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="📗" />
              </div>
              <div className="form-group">
                <label className="form-label">Order</label>
                <input className="form-input" type="number" value={form.order} onChange={e => set('order', e.target.value)} />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select className="form-input" value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
                  {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="form-input" value={form.priority} onChange={e => set('priority', e.target.value)}>
                  {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <label className="admin-check-row">
              <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} />
              <span>Active (visible to students)</span>
            </label>

            <SectionLabel>Lesson content (JSON)</SectionLabel>
            <p className="admin-form-label-hint admin-json-hint">
              {category === 'quantitative' || category === 'data-interpretation'
                ? 'Object with videos, learnIt and crackIt.'
                : category === 'logical'
                  ? 'Object with videos and lesson.understand / lesson.crack.'
                  : 'Object with videos and lesson.learn / lesson.crack.'}
            </p>
            <div className="form-group">
              <textarea className="form-input admin-textarea-mono" rows={16} value={content} onChange={e => setContent(e.target.value)} spellCheck={false} />
            </div>

            <div className="modal-actions admin-modal-actions--bordered">
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading-spinner" /> : null}
                {topic ? 'Update Topic' : 'Create Topic'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────── QUESTION MODAL ─────────────────────────── */
function QuestionModal({ question, topicSlug, onClose, onSave }) {
  const [form, setForm] = useState(() => question ? {
    question: question.question || '', options: [0, 1, 2, 3].map(i => question.options?.[i] || ''),
    answer: question.answer || 'A', difficulty: question.difficulty || 'easy', order: question.order ?? 0,
    type: question.type || '', trick: question.trick || '', solution: question.solution || '', active: question.active !== false,
  } : {
    question: '', options: ['', '', '', ''], answer: 'A', difficulty: 'easy', order: 0,
    type: '', trick: '', solution: '', active: true,
  })
  const [loading, setLoading] = useState(false)
  useBodyLock()
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setOption = (i, v) => setForm(f => ({ ...f, options: f.options.map((o, oi) => oi === i ? v : o) }))

  const submit = async e => {
    e.preventDefault()
    if (form.options.some(o => !o.trim())) { toast.error('All 4 options are required.'); return }
    setLoading(true)
    try {
      const payload = {
        topic: topicSlug, question: form.question, options: form.options,
        answer: form.answer, difficulty: form.difficulty, order: parseInt(form.order) || 0,
        type: form.type, trick: form.trick, solution: form.solution, active: form.active,
      }
      question ? await updateAptitudeQuestion(question.id, payload) : await createAptitudeQuestion(payload)
      toast.success(question ? 'Question updated' : 'Question created')
      onSave()
    } catch (err) {
      toast.error(getApiError(err, 'We could not save this question. Please try again.'))
    } finally {
      setTimeout(() => setLoading(false), TEST_DELAY_MS)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal admin-form-modal admin-form-modal--700">
        <div className="modal-header admin-form-modal__header">
          <h3 className="modal-title">{question ? 'Edit Question' : 'New Question'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="admin-form-modal__body">
          <div className="form-group">
            <label className="form-label">Question *</label>
            <textarea className="form-input" rows={2} value={form.question} onChange={e => set('question', e.target.value)} required />
          </div>
          <SectionLabel>Options (mark the correct one below)</SectionLabel>
          {form.options.map((opt, i) => (
            <div className="form-group admin-q-option-row" key={i}>
              <label className="form-label">{ANSWERS[i]}{form.answer === ANSWERS[i] ? ' ✓' : ''}</label>
              <input className="form-input" value={opt} onChange={e => setOption(i, e.target.value)} required />
            </div>
          ))}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Correct Answer</label>
              <select className="form-input" value={form.answer} onChange={e => set('answer', e.target.value)}>
                {ANSWERS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select className="form-input" value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Order</label>
              <input className="form-input" type="number" value={form.order} onChange={e => set('order', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Type <span className="admin-form-label-hint">(question type it tests)</span></label>
              <input className="form-input" value={form.type} onChange={e => set('type', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Trick <span className="admin-form-label-hint">(one-line shortcut, optional)</span></label>
            <input className="form-input" value={form.trick} onChange={e => set('trick', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Solution</label>
            <textarea className="form-input" rows={3} value={form.solution} onChange={e => set('solution', e.target.value)} />
          </div>
          <label className="admin-check-row">
            <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} />
            <span>Active (visible to students)</span>
          </label>
          <div className="modal-actions admin-modal-actions--bordered">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading-spinner" /> : null}
              {question ? 'Update Question' : 'Create Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─────────────────────────── MAIN PANEL ─────────────────────────── */
export default function AdminAptitude() {
  const [view, setView] = useState('groups')       // groups | topics | questions
  const [groups, setGroups] = useState([])
  const [topics, setTopics] = useState([])
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('quantitative')
  const [search, setSearch] = useState('')

  const [activeGroup, setActiveGroup] = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)

  const [modal, setModal] = useState(null)          // { kind:'group'|'topic'|'question', item }
  const [deleteTarget, setDeleteTarget] = useState(null) // { kind, id, label }
  const [deleting, setDeleting] = useState(false)

  const loadGroups = () => {
    setLoading(true)
    getAdminAptitudeGroups()
      .then(r => setGroups(r.data || []))
      .catch(err => toast.error(getApiError(err, 'We could not load groups. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }
  const loadTopics = (groupSlug) => {
    setLoading(true)
    getAdminAptitudeTopics(groupSlug)
      .then(r => setTopics(r.data || []))
      .catch(err => toast.error(getApiError(err, 'We could not load topics. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }
  const loadQuestions = (topicSlug) => {
    setLoading(true)
    getAdminAptitudeQuestions(topicSlug)
      .then(r => setQuestions(r.data || []))
      .catch(err => toast.error(getApiError(err, 'We could not load questions. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }

  useEffect(() => { loadGroups() }, [])

  const openTopics = (group) => { setActiveGroup(group); setView('topics'); setSearch(''); loadTopics(group.slug) }
  const openQuestions = (topic) => { setActiveTopic(topic); setView('questions'); setSearch(''); loadQuestions(topic.topic) }
  const backToGroups = () => { setView('groups'); setActiveGroup(null); setSearch('') }
  const backToTopics = () => { setView('topics'); setActiveTopic(null); setSearch(''); if (activeGroup) loadTopics(activeGroup.slug) }

  const reload = () => {
    setModal(null)
    if (view === 'groups') loadGroups()
    else if (view === 'topics') loadTopics(activeGroup.slug)
    else loadQuestions(activeTopic.topic)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      if (deleteTarget.kind === 'group') await deleteAptitudeGroup(deleteTarget.id)
      else if (deleteTarget.kind === 'topic') await deleteAptitudeTopic(deleteTarget.id)
      else await deleteAptitudeQuestion(deleteTarget.id)
      toast.success(`${deleteTarget.kind[0].toUpperCase() + deleteTarget.kind.slice(1)} deleted`)
      setDeleteTarget(null)
      reload()
    } catch (err) {
      toast.error(getApiError(err, 'This item could not be deleted. Please try again.'))
    } finally {
      setDeleting(false)
    }
  }

  // ── filtered lists ──
  const shownGroups = useMemo(() => groups
    .filter(g => g.category === category)
    .filter(g => (g.displayName || '').toLowerCase().includes(search.toLowerCase()) || (g.slug || '').toLowerCase().includes(search.toLowerCase())),
    [groups, category, search])
  const shownTopics = useMemo(() => topics
    .filter(t => (t.displayName || '').toLowerCase().includes(search.toLowerCase()) || (t.topic || '').toLowerCase().includes(search.toLowerCase())),
    [topics, search])
  const shownQuestions = useMemo(() => questions
    .filter(q => (q.question || '').toLowerCase().includes(search.toLowerCase())),
    [questions, search])

  const subtitle = view === 'groups'
    ? `${shownGroups.length} groups in ${CATEGORIES.find(c => c.id === category)?.label}`
    : view === 'topics'
      ? `${topics.length} topics in ${activeGroup?.displayName}`
      : `${questions.length} questions in ${activeTopic?.displayName}`

  return (
    <AppLayout title="Aptitude">
      {/* Breadcrumb */}
      <div className="admin-breadcrumb">
        <button className="admin-breadcrumb__link" onClick={backToGroups}>Groups</button>
        {view !== 'groups' && activeGroup && (
          <>
            <ChevronRight size={13} className="admin-breadcrumb__sep" />
            <button className="admin-breadcrumb__link" onClick={backToTopics} disabled={view === 'topics'}>{activeGroup.displayName}</button>
          </>
        )}
        {view === 'questions' && activeTopic && (
          <>
            <ChevronRight size={13} className="admin-breadcrumb__sep" />
            <span className="admin-breadcrumb__current">{activeTopic.displayName}</span>
          </>
        )}
      </div>

      <AdminPageToolbar subtitle={subtitle}>
        <div className="admin-page-actions">
          {view !== 'groups' && (
            <button className="btn btn-ghost" onClick={view === 'topics' ? backToGroups : backToTopics}>
              <ArrowLeft size={15} /> Back
            </button>
          )}
          <div className="admin-search-wrap">
            <Search size={15} className="admin-search-icon" />
            <input className="form-input admin-search-input" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={blurOnEnter} />
          </div>
          {view === 'groups' && <button className="btn btn-primary" onClick={() => setModal({ kind: 'group', item: null })}><Plus size={15} /> New Group</button>}
          {view === 'topics' && <button className="btn btn-primary" onClick={() => setModal({ kind: 'topic', item: null })}><Plus size={15} /> New Topic</button>}
          {view === 'questions' && <button className="btn btn-primary" onClick={() => setModal({ kind: 'question', item: null })}><Plus size={15} /> New Question</button>}
        </div>
      </AdminPageToolbar>

      {/* Category tabs (groups view only) */}
      {view === 'groups' && (
        <div className="admin-tabs">
          {CATEGORIES.map(c => (
            <button key={c.id} className={`admin-tab${category === c.id ? ' is-active' : ''}`} onClick={() => { setCategory(c.id); setSearch('') }}>
              {c.label}
            </button>
          ))}
        </div>
      )}

      {loading ? <RadarLoader height={220} /> : (
        <div className="table-container">
          <table className="table">
            {/* GROUPS */}
            {view === 'groups' && (
              <>
                <thead><tr><th>Group</th><th>Slug</th><th>Order</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {shownGroups.length === 0 ? (
                    <tr><td colSpan={5} className="admin-table-empty">No groups here yet.</td></tr>
                  ) : shownGroups.map(g => (
                    <tr key={g.id}>
                      <td>
                        <div className="admin-row-flex">
                          <div className="admin-icon-box">{g.icon || '📘'}</div>
                          <div>
                            <div className="table-name">{g.displayName}</div>
                            <div className="text-xs text-muted truncate admin-truncate-desc--260">{g.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm text-muted">{g.slug}</td>
                      <td className="text-sm text-muted">{g.order}</td>
                      <td>{g.active ? <span className="admin-badge admin-badge--on">Active</span> : <span className="admin-badge admin-badge--off">Hidden</span>}</td>
                      <td className="admin-row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => openTopics(g)} title="Manage topics" aria-label={`Manage topics in ${g.displayName}`}><ListTree size={14} /></button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setModal({ kind: 'group', item: g })} title="Edit" aria-label={`Edit ${g.displayName}`}><Pencil size={13} /></button>
                        <button className="btn btn-ghost btn-sm admin-btn-danger" onClick={() => setDeleteTarget({ kind: 'group', id: g.id, label: g.displayName })} title="Delete" aria-label={`Delete ${g.displayName}`}><Trash2 size={13} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
            {/* TOPICS */}
            {view === 'topics' && (
              <>
                <thead><tr><th>Topic</th><th>Difficulty</th><th>Priority</th><th>Order</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {shownTopics.length === 0 ? (
                    <tr><td colSpan={6} className="admin-table-empty">No topics in this group yet.</td></tr>
                  ) : shownTopics.map(t => (
                    <tr key={t.id}>
                      <td>
                        <div className="admin-row-flex">
                          <div className="admin-icon-box">{t.icon || '📗'}</div>
                          <div>
                            <div className="table-name">{t.displayName}</div>
                            <div className="text-xs text-muted truncate admin-truncate-desc--260">{t.topic}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm text-muted">{t.difficulty}</td>
                      <td className="text-sm text-muted">{t.priority}</td>
                      <td className="text-sm text-muted">{t.order}</td>
                      <td>{t.active ? <span className="admin-badge admin-badge--on">Active</span> : <span className="admin-badge admin-badge--off">Hidden</span>}</td>
                      <td className="admin-row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => openQuestions(t)} title="Manage questions" aria-label={`Manage questions in ${t.displayName}`}><HelpCircle size={14} /></button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setModal({ kind: 'topic', item: t })} title="Edit" aria-label={`Edit ${t.displayName}`}><Pencil size={13} /></button>
                        <button className="btn btn-ghost btn-sm admin-btn-danger" onClick={() => setDeleteTarget({ kind: 'topic', id: t.id, label: t.displayName })} title="Delete" aria-label={`Delete ${t.displayName}`}><Trash2 size={13} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
            {/* QUESTIONS */}
            {view === 'questions' && (
              <>
                <thead><tr><th>#</th><th>Question</th><th>Answer</th><th>Difficulty</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {shownQuestions.length === 0 ? (
                    <tr><td colSpan={6} className="admin-table-empty">No questions in this topic yet.</td></tr>
                  ) : shownQuestions.map(q => (
                    <tr key={q.id}>
                      <td className="text-sm text-muted">{q.order}</td>
                      <td><div className="table-name admin-truncate-desc--400">{q.question}</div></td>
                      <td><span className="admin-badge admin-badge--on">{q.answer}</span></td>
                      <td className="text-sm text-muted">{q.difficulty}</td>
                      <td>{q.active ? <span className="admin-badge admin-badge--on">Active</span> : <span className="admin-badge admin-badge--off">Hidden</span>}</td>
                      <td className="admin-row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => setModal({ kind: 'question', item: q })} title="Edit" aria-label={`Edit question ${q.order}`}><Pencil size={13} /></button>
                        <button className="btn btn-ghost btn-sm admin-btn-danger" onClick={() => setDeleteTarget({ kind: 'question', id: q.id, label: q.question?.slice(0, 60) })} title="Delete" aria-label={`Delete question ${q.order}`}><Trash2 size={13} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      )}

      {modal?.kind === 'group' && (
        <GroupModal group={modal.item} defaultCategory={category} onClose={() => setModal(null)} onSave={reload} />
      )}
      {modal?.kind === 'topic' && activeGroup && (
        <TopicModal topic={modal.item} group={activeGroup} onClose={() => setModal(null)} onSave={reload} />
      )}
      {modal?.kind === 'question' && activeTopic && (
        <QuestionModal question={modal.item} topicSlug={activeTopic.topic} onClose={() => setModal(null)} onSave={reload} />
      )}

      <AdminDeleteModal
        open={!!deleteTarget}
        title={`Delete this ${deleteTarget?.kind || 'item'}?`}
        subtitle={deleteTarget?.kind === 'group'
          ? 'The group will be removed. A group that still has topics cannot be deleted — remove its topics first.'
          : deleteTarget?.kind === 'topic'
            ? 'The topic and all of its questions will be permanently removed.'
            : 'This question will be permanently removed.'}
        items={deleteTarget ? [{ id: deleteTarget.id, label: deleteTarget.label }] : []}
        deleting={deleting}
        onConfirm={confirmDelete}
        onClose={() => !deleting && setDeleteTarget(null)}
      />
    </AppLayout>
  )
}
