import { useState, useEffect, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Plus, Pencil, X, Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import useAdminSelection from '../../hooks/useAdminSelection'
import { getAdminSubjects, createSubject, updateSubject, deleteSubject } from '../../api/api'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'
import useBodyLock from '../../hooks/useBodyLock'
import SectionLabel from '../../components/admin/SectionLabel'
import { listToText, textToList } from '../../components/admin/adminFormUtils'

const RANKS = ['E', 'D', 'C', 'B', 'A', 'S']
const RANK_COLORS = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#4ADE80', E: '#888888' }
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

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

  useBodyLock()

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
      toast.error(getApiError(err, 'We could not save this subject. Please try again.'))
    } finally {
      setTimeout(() => setLoading(false), TEST_DELAY_MS)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal admin-form-modal">
        <div className="modal-header admin-form-modal__header">
          <h3 className="modal-title">{subject ? 'Edit Subject' : 'New Subject'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form-modal__body">

          <SectionLabel>Basic Info</SectionLabel>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Description <span className="admin-form-label-hint">(one-line)</span></label>
            <input className="form-input" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Icon (emoji)</label>
              <input className="form-input" value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="📚" />
            </div>
            <div className="form-group">
              <label className="form-label">Color</label>
              <div className="admin-color-picker-row">
                <input type="color" value={form.color} onChange={e => set('color', e.target.value)} className="admin-color-picker" />
                <input className="form-input" value={form.color} onChange={e => set('color', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Rank</label>
              <div className="admin-rank-picker">
                {RANKS.map(r => (
                  <button key={r} type="button" onClick={() => set('rank', r)}
                    className={`admin-rank-btn${form.rank === r ? ' is-active' : ''}`}
                    style={{ '--rank-color': RANK_COLORS[r] }}>
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
          <div className="form-group admin-form-group-narrow">
            <label className="form-label">Estimated Hours</label>
            <input className="form-input" type="number" min="0" value={form.estimatedHours} onChange={e => set('estimatedHours', e.target.value)} placeholder="e.g. 12" />
          </div>

          <SectionLabel>Rich Content</SectionLabel>
          <div className="form-group">
            <label className="form-label">Overview <span className="admin-form-label-hint">(beginner-friendly intro)</span></label>
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

          <SectionLabel>Lists (one item per line)</SectionLabel>
          <div className="form-group">
            <label className="form-label">What you need to know first</label>
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.prerequisites} onChange={e => set('prerequisites', e.target.value)} placeholder="Basic computer usage&#10;Understanding of web browsers" />
          </div>
          <div className="form-group">
            <label className="form-label">Outcomes — what learner can do after</label>
            <textarea className="form-input admin-textarea-mono" rows={4} value={form.outcomes} onChange={e => set('outcomes', e.target.value)} placeholder="Build complete web pages from scratch&#10;Structure content using semantic HTML5&#10;Create forms that validate user input" />
          </div>
          <div className="form-group">
            <label className="form-label">What You Will Build</label>
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.whatYouWillBuild} onChange={e => set('whatYouWillBuild', e.target.value)} placeholder="Personal profile page with photo and bio&#10;Restaurant menu page with tables and images&#10;Multi-section blog post" />
          </div>

          <div className="form-group">
            <label className="form-label">Tools Required</label>
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.toolsRequired} onChange={e => set('toolsRequired', e.target.value)} placeholder="VS Code&#10;Node.js v18+&#10;Git" />
          </div>

          <div className="modal-actions admin-modal-actions--bordered">
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
  const [deleteModal, setDeleteModal] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)

  const load = () => {
    setLoading(true)
    getAdminSubjects()
      .then(r => setSubjects(r.data))
      .catch(err => toast.error(getApiError(err, 'We could not load subjects. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }

  useEffect(() => { load() }, [])

  const filtered = subjects.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.description || '').toLowerCase().includes(search.toLowerCase())
  )

  const filteredIds = useMemo(() => filtered.map(s => s.id), [filtered])
  const selection = useAdminSelection(filteredIds)

  const deleteTargets = useMemo(
    () => selection.selectedIds.map(id => ({
      id,
      label: subjects.find(s => s.id === id)?.title || id,
    })),
    [selection.selectedIds, subjects],
  )

  const confirmBulkDelete = async () => {
    setBulkDeleting(true)
    try {
      for (const id of selection.selectedIds) {
        await deleteSubject(id)
      }
      toast.success(`Deleted ${selection.selectedIds.length} subject${selection.selectedIds.length !== 1 ? 's' : ''}`)
      selection.clear()
      setDeleteModal(false)
      load()
    } catch (err) {
      toast.error(getApiError(err, 'Some selected subjects could not be deleted. Please try again.'))
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <AppLayout title="Subjects">
      <div className="page-header">
        <div>
          <h1 className="page-title">Subjects</h1>
          <p className="page-subtitle">{subjects.length} subjects in the platform</p>
        </div>
        <div className="admin-page-actions">
          <div className="admin-search-wrap">
            <Search size={15} className="admin-search-icon" />
            <input className="form-input admin-search-input" placeholder="Search subjects…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={() => setModal('new')}>
            <Plus size={15} /> New Subject
          </button>
        </div>
      </div>

      <AdminBulkToolbar
        count={selection.count}
        label="subject"
        deleting={bulkDeleting}
        onClear={selection.clear}
        onDelete={() => setDeleteModal(true)}
      />

      {loading ? (
        <RadarLoader height={220} />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="admin-th-checkbox">
                  <input
                    type="checkbox"
                    className="table-checkbox"
                    aria-label="Select all subjects"
                    checked={selection.allSelected}
                    ref={el => { if (el) el.indeterminate = selection.someSelected }}
                    onChange={selection.toggleAll}
                  />
                </th>
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
                <tr><td colSpan={8} className="admin-table-empty">No subjects match "{search}"</td></tr>
              ) : filtered.map(s => (
                  <tr key={s.id} className={selection.isSelected(s.id) ? 'row-selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        className="table-checkbox"
                        aria-label={`Select ${s.title}`}
                        checked={selection.isSelected(s.id)}
                        onChange={() => selection.toggle(s.id)}
                      />
                    </td>
                    <td>
                      <div className="admin-row-flex">
                        <div className="admin-icon-box" style={{ '--admin-icon-bg': s.color + '22' }}>
                          {s.icon}
                        </div>
                        <div>
                          <div className="table-name">{s.title}</div>
                          <div className="text-xs text-muted truncate admin-truncate-desc--260">{s.description}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-rank-badge" style={{ '--rank-color': RANK_COLORS[s.rank] || '#888' }}>
                        {s.rank || 'E'}
                      </span>
                    </td>
                    <td className="text-sm text-muted">{s.difficulty || <span className="admin-em-dash">—</span>}</td>
                    <td className="text-sm text-muted">{s.estimatedHours > 0 ? `${s.estimatedHours}h` : <span className="admin-em-dash">—</span>}</td>
                    <td className="text-sm text-muted">{s.totalConcepts}</td>
                    
                    <td>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModal(s)} aria-label={`Edit ${s.title}`}>
                        <Pencil size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
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

      <AdminDeleteModal
        open={deleteModal}
        title="Delete selected subjects?"
        subtitle="Each subject and all of its concepts, questions, and progress data will be permanently removed."
        items={deleteTargets}
        deleting={bulkDeleting}
        onConfirm={confirmBulkDelete}
        onClose={() => !bulkDeleting && setDeleteModal(false)}
      />
    </AppLayout>
  )
}
