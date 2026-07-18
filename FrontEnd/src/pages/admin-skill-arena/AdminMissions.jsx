import { useState, useEffect, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Plus, Pencil, X, Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminPageToolbar from '../../components/admin/AdminPageToolbar'
import '../../styles/pages/admin/index.css'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import blurOnEnter from '../../utils/blurOnEnter'
import useAdminSelection from '../../hooks/useAdminSelection'
import { getAdminMissions, createMission, updateMission, deleteMission, getAdminSubjects } from '../../api/api'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'
import useBodyLock from '../../hooks/useBodyLock'
import SectionLabel from '../../components/admin/SectionLabel'
import { listToText, textToList } from '../../components/admin/adminFormUtils'

const RANKS = ['D', 'C', 'B', 'A', 'S']
const RANK_COLORS = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#22C55E' }

function MissionModal({ mission, subjects, onClose, onSave }) {
  const [form, setForm] = useState(() => mission ? {
    title:            mission.title || '',
    missionBrief:     mission.missionBrief || '',
    rank:             mission.rank || 'D',
    category:         mission.category || '',
    targetRoles:      listToText(mission.targetRoles),
    techStack:        listToText(mission.techStack),
    estimatedHours:   mission.estimatedHours || '',
    subjectIds:       mission.subjectIds || [],
    subjectTitles:    mission.subjectTitles || [],
    objectives:       listToText(mission.objectives),
    bonusObjectives:  listToText(mission.bonusObjectives),
    approachSteps:    listToText(mission.approachSteps),
    hints:            listToText(mission.hints),
    learningOutcome:  mission.learningOutcome || '',
    prerequisites:    listToText(mission.prerequisites),
    conceptsCovered:  listToText(mission.conceptsCovered),
    commonMistakes:   listToText(mission.commonMistakes),
    published:        mission.published !== false,
    orderIndex:       mission.orderIndex ?? 0,
  } : {
    title: '', missionBrief: '', rank: 'D', category: '', targetRoles: '',
    techStack: '', estimatedHours: '', subjectIds: [], subjectTitles: [],
    objectives: '', bonusObjectives: '', approachSteps: '', hints: '',
    learningOutcome: '', prerequisites: '', conceptsCovered: '', commonMistakes: '',
    published: true, orderIndex: 0,
  })
  const [loading, setLoading] = useState(false)

  useBodyLock()

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const toggleSubject = (subj) => {
    setForm(f => {
      const already = f.subjectIds.includes(subj.id)
      return {
        ...f,
        subjectIds:    already ? f.subjectIds.filter(id => id !== subj.id)       : [...f.subjectIds, subj.id],
        subjectTitles: already ? f.subjectTitles.filter(t => t !== subj.title)   : [...f.subjectTitles, subj.title],
      }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        techStack:       textToList(form.techStack),
        targetRoles:     textToList(form.targetRoles),
        objectives:      textToList(form.objectives),
        bonusObjectives: textToList(form.bonusObjectives),
        approachSteps:   textToList(form.approachSteps),
        hints:           textToList(form.hints),
        learningOutcome: form.learningOutcome,
        prerequisites:   textToList(form.prerequisites),
        conceptsCovered: textToList(form.conceptsCovered),
        commonMistakes:  textToList(form.commonMistakes),
        estimatedHours:  parseInt(form.estimatedHours) || 0,
        orderIndex:      parseInt(form.orderIndex) || 0,
      }
      mission ? await updateMission(mission.id, payload) : await createMission(payload)
      toast.success(mission ? 'Mission updated' : 'Mission created')
      onSave()
    } catch (err) {
      toast.error(getApiError(err, 'We could not save this mission. Please try again.'))
    } finally {
      setTimeout(() => setLoading(false), TEST_DELAY_MS)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal admin-form-modal--700">
        <div className="modal-header admin-form-modal__header">
          <h3 className="modal-title">{mission ? 'Edit Mission' : 'New Mission'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form-modal__body">
          <SectionLabel>Basic Info</SectionLabel>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Mission Brief</label>
            <textarea className="form-input" rows={3} value={form.missionBrief} onChange={e => set('missionBrief', e.target.value)} placeholder="Short description of the challenge..." />
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
              <label className="form-label">Estimated Hours</label>
              <input className="form-input" type="number" min="0" value={form.estimatedHours} onChange={e => set('estimatedHours', e.target.value)} placeholder="e.g. 8" />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Order Index</label>
              <input className="form-input" type="number" min="0" value={form.orderIndex} onChange={e => set('orderIndex', e.target.value)} />
            </div>
            <div className="form-group admin-form-group-checkbox-row">
              <input type="checkbox" id="pub" checked={form.published} onChange={e => set('published', e.target.checked)} className="admin-form-checkbox" />
              <label htmlFor="pub" className="admin-form-checkbox-label">Published (visible to students)</label>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Project Category</label>
              <select className="form-input" value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="">— Not set —</option>
                <option value="SUBJECT_PRACTICE">Subject Practice</option>
                <option value="ACADEMIC">Academic Projects</option>
                <option value="ROLE_BASED">Role Based Projects</option>
              </select>
            </div>
            {form.category === 'ROLE_BASED' && (
              <div className="form-group">
                <label className="form-label">Target Roles (one per line)</label>
                <textarea className="form-input admin-textarea-mono" rows={3} value={form.targetRoles} onChange={e => set('targetRoles', e.target.value)} placeholder={'Python Full Stack\nFrontend Developer\nData Analyst'} />
              </div>
            )}
          </div>

          <SectionLabel>Tech Stack (one per line)</SectionLabel>
          <div className="form-group">
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.techStack} onChange={e => set('techStack', e.target.value)} placeholder={'Python\nFlask\nSQLite'} />
          </div>

          <SectionLabel>Linked Subjects</SectionLabel>
          <div className="admin-chip-wrap">
            {subjects.length === 0 && <span className="admin-muted-note">No subjects loaded</span>}
            {subjects.map(s => {
              const selected = form.subjectIds.includes(s.id)
              const accent = s.color || 'var(--primary)'
              return (
                <button key={s.id} type="button" onClick={() => toggleSubject(s)}
                  className={`admin-subject-chip${selected ? ' is-selected' : ''}`}
                  style={{ '--chip-accent': accent, '--chip-accent-bg': accent + '22' }}>
                  {s.icon} {s.title}
                </button>
              )
            })}
          </div>

          <SectionLabel>Guidance (Student-Facing)</SectionLabel>
          <div className="form-group">
            <label className="form-label">🎯 Learning Outcome <span className="admin-form-label-hint">(1 sentence — what student achieves)</span></label>
            <input className="form-input" value={form.learningOutcome} onChange={e => set('learningOutcome', e.target.value)} placeholder="After this, you can build a responsive grid layout without guidance." />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">⚡ Prerequisites <span className="admin-form-label-hint">(one per line)</span></label>
              <textarea className="form-input admin-textarea-mono" rows={3} value={form.prerequisites} onChange={e => set('prerequisites', e.target.value)} placeholder={'Flexbox\nCSS Grid\nMedia Queries'} />
            </div>
            <div className="form-group">
              <label className="form-label">📚 Concepts Covered <span className="admin-form-label-hint">(one per line)</span></label>
              <textarea className="form-input admin-textarea-mono" rows={3} value={form.conceptsCovered} onChange={e => set('conceptsCovered', e.target.value)} placeholder={'CSS Grid\nResponsive Design\nCSS Variables'} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">⚠ Common Mistakes <span className="admin-form-label-hint">(one per line)</span></label>
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.commonMistakes} onChange={e => set('commonMistakes', e.target.value)} placeholder={'Forgetting box-sizing: border-box\nNot testing on mobile viewport'} />
          </div>

          <SectionLabel>Content (one item per line)</SectionLabel>
          <div className="form-group">
            <label className="form-label">Objectives</label>
            <textarea className="form-input admin-textarea-mono" rows={4} value={form.objectives} onChange={e => set('objectives', e.target.value)} placeholder={'Build a REST API with authentication\nConnect to a database\nDeploy to the cloud'} />
          </div>
          <div className="form-group">
            <label className="form-label">Bonus Objectives</label>
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.bonusObjectives} onChange={e => set('bonusObjectives', e.target.value)} placeholder={'Add rate limiting\nWrite unit tests'} />
          </div>
          <div className="form-group">
            <label className="form-label">Approach Steps</label>
            <textarea className="form-input admin-textarea-mono" rows={4} value={form.approachSteps} onChange={e => set('approachSteps', e.target.value)} placeholder={'Start by planning your data models\nSet up the project structure\nImplement authentication first'} />
          </div>
          <div className="form-group">
            <label className="form-label">Hints</label>
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.hints} onChange={e => set('hints', e.target.value)} placeholder={'Use environment variables for secrets\nJWT tokens expire — handle refresh logic'} />
          </div>

          <div className="modal-actions admin-modal-actions--bordered">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading-spinner" /> : null}
              {mission ? 'Update Mission' : 'Create Mission'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminMissions() {
  const [missions, setMissions] = useState([])
  const [subjects, setSubjects] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)

  const load = () => {
    setLoading(true)
    Promise.all([getAdminMissions(), getAdminSubjects()])
      .then(([m, s]) => { setMissions(m.data); setSubjects(s.data) })
      .catch(err => toast.error(getApiError(err, 'We could not load missions. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }

  useEffect(() => { load() }, [])

  const q = search.toLowerCase().trim()
  const filtered = q === ''
    ? missions
    : missions.filter(m =>
        m.title?.toLowerCase().includes(q) ||
        m.missionBrief?.toLowerCase().includes(q) ||
        m.subjectTitles?.some(s => s.toLowerCase().includes(q)) ||
        m.techStack?.some(t => t.toLowerCase().includes(q)) ||
        m.rank?.toLowerCase().includes(q)
      )

  const filteredIds = useMemo(() => filtered.map(m => m.id), [filtered])
  const selection = useAdminSelection(filteredIds)

  const deleteTargets = useMemo(
    () => selection.selectedIds.map(id => ({
      id,
      label: missions.find(m => m.id === id)?.title || id,
    })),
    [selection.selectedIds, missions],
  )

  const confirmBulkDelete = async () => {
    setBulkDeleting(true)
    try {
      for (const id of selection.selectedIds) {
        await deleteMission(id)
      }
      toast.success(`Deleted ${selection.selectedIds.length} mission${selection.selectedIds.length !== 1 ? 's' : ''}`)
      selection.clear()
      setDeleteModal(false)
      load()
    } catch (err) {
      toast.error(getApiError(err, 'Some selected missions could not be deleted. Please try again.'))
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <AppLayout title="Missions">
      <AdminPageToolbar subtitle={`${missions.length} missions in the platform`}>
        <div className="admin-page-actions">
          <div className="admin-search-wrap">
            <Search size={15} className="admin-search-icon" />
            <input className="form-input admin-search-input" placeholder="Search missions…" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={blurOnEnter} />
          </div>
          <button className="btn btn-primary" onClick={() => setModal('new')}>
            <Plus size={15} /> New Mission
          </button>
        </div>
      </AdminPageToolbar>

      {loading ? (
        <RadarLoader height={220} />
      ) : (
        <>
          <AdminBulkToolbar
            count={selection.count}
            label="mission"
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
                    aria-label="Select all missions"
                    checked={selection.allSelected}
                    ref={el => { if (el) el.indeterminate = selection.someSelected }}
                    onChange={selection.toggleAll}
                  />
                </th>
                <th>Mission</th>
                <th>Rank</th>
                <th>Tech Stack</th>
                <th>Subjects</th>
                <th>Hours</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="admin-table-empty">
                  {search ? `No missions match "${search}"` : 'No missions yet — click New Mission to add one'}
                </td></tr>
              ) : filtered.map(m => (
                <tr key={m.id} className={selection.isSelected(m.id) ? 'row-selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      aria-label={`Select ${m.title}`}
                      checked={selection.isSelected(m.id)}
                      onChange={() => selection.toggle(m.id)}
                    />
                  </td>
                  <td>
                    <div className="table-name">{m.title}</div>
                    <div className="text-xs text-muted truncate admin-truncate-desc">{m.missionBrief}</div>
                  </td>
                  <td>
                    <span className="admin-rank-badge" style={{ '--rank-color': RANK_COLORS[m.rank] || '#888' }}>
                      {m.rank || 'D'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-tag-wrap">
                      {(m.techStack || []).slice(0, 3).map(t => (
                        <span key={t} className="admin-tag-chip">{t}</span>
                      ))}
                      {(m.techStack || []).length > 3 && <span className="admin-tag-more">+{m.techStack.length - 3}</span>}
                    </div>
                  </td>
                  <td className="text-sm text-muted admin-cell-max-200">
                    {(m.subjectTitles || []).length > 0
                      ? (m.subjectTitles || []).join(', ')
                      : <span className="admin-em-dash">—</span>}
                  </td>
                  <td className="text-sm text-muted">
                    {m.estimatedHours > 0 ? `${m.estimatedHours}h` : <span className="admin-em-dash">—</span>}
                  </td>
                  <td>
                    {m.published ? (
                      <span className="admin-status-live">live</span>
                    ) : (
                      <span className="admin-status-draft">draft</span>
                    )}
                  </td>
                  <td>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModal(m)} aria-label={`Edit ${m.title}`}>
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
        <MissionModal
          mission={modal === 'new' ? null : modal}
          subjects={subjects}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); load() }}
        />
      )}

      <AdminDeleteModal
        open={deleteModal}
        title="Delete selected missions?"
        subtitle="Each mission and its associated data will be permanently removed."
        items={deleteTargets}
        deleting={bulkDeleting}
        onConfirm={confirmBulkDelete}
        onClose={() => !bulkDeleting && setDeleteModal(false)}
      />
    </AppLayout>
  )
}
