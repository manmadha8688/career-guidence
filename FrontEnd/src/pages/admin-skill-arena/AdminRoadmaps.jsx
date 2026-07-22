import { useState, useEffect, useRef, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Plus, Pencil, Trash2, X, Settings, Search, ChevronDown, Check } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminPageToolbar from '../../components/admin/AdminPageToolbar'
import '../../styles/pages/admin/index.css'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import blurOnEnter from '../../utils/blurOnEnter'
import useAdminSelection from '../../hooks/useAdminSelection'
import {
  getAdminRoadmaps, createRoadmap, updateRoadmap, deleteRoadmap,
  getRoadmapSubjects, getAdminSubjects, addSubjectToRoadmap, removeSubjectFromRoadmap, reorderSubjectInRoadmap
} from '../../api/api'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'
import { removeRoadmapSubjectConfirmOptions } from '../../utils/confirmRemoveLink'
import { useConfirm } from '../../context/ConfirmContext'
import useBodyLock from '../../hooks/useBodyLock'
import SectionLabel from '../../components/admin/SectionLabel'
import { listToText, textToList } from '../../components/admin/adminFormUtils'

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
    <div ref={ref} className="admin-select-wrap">
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

function RoadmapModal({ roadmap, onClose, onSave }) {
  const initForm = () => roadmap ? {
    title: roadmap.title || '', description: roadmap.description || '',
    roleTarget: roadmap.roleTarget || '', icon: roadmap.icon || '🗺️',
    color: roadmap.color || '#7C3AED', estimatedWeeks: roadmap.estimatedWeeks || 12,
    overview: roadmap.overview || '', whyLearn: roadmap.whyLearn || '',
    forWho: roadmap.forWho || '',
    roleTargets: listToText(roadmap.roleTargets),
    prerequisites: listToText(roadmap.prerequisites),
    toolsRequired: listToText(roadmap.toolsRequired),
    outcomes: listToText(roadmap.outcomes),
  } : {
    title: '', description: '', roleTarget: '', icon: '🗺️', color: '#7C3AED', estimatedWeeks: 12,
    overview: '', whyLearn: '', forWho: '', roleTargets: '', prerequisites: '', toolsRequired: '', outcomes: '',
  }

  const [form, setForm] = useState(initForm)
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  useBodyLock()

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true)
    try {
      const payload = {
        ...form,
        roleTargets:   textToList(form.roleTargets),
        prerequisites: textToList(form.prerequisites),
        toolsRequired: textToList(form.toolsRequired),
        outcomes:      textToList(form.outcomes),
      }
      roadmap ? await updateRoadmap(roadmap.id, payload) : await createRoadmap(payload)
      toast.success(roadmap ? 'Updated' : 'Created'); onSave()
    } catch (err) { toast.error(getApiError(err, 'We could not save this roadmap. Please try again.')) } finally { setTimeout(() => setLoading(false), TEST_DELAY_MS) }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal admin-form-modal">
        <div className="modal-header admin-form-modal__header">
          <h3 className="modal-title">{roadmap ? 'Edit Roadmap' : 'New Roadmap'}</h3>
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
          <div className="form-group">
            <label className="form-label">Role Target</label>
            <input className="form-input" value={form.roleTarget} onChange={e => set('roleTarget', e.target.value)} placeholder="e.g. Java Full Stack Developer" />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Icon (emoji)</label>
              <input className="form-input" value={form.icon} onChange={e => set('icon', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Estimated Weeks</label>
              <input type="number" className="form-input" value={form.estimatedWeeks} onChange={e => set('estimatedWeeks', Number(e.target.value))} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Color</label>
            <div className="admin-color-picker-row">
              <input type="color" value={form.color} onChange={e => set('color', e.target.value)} className="admin-color-picker" />
              <input className="form-input" value={form.color} onChange={e => set('color', e.target.value)} />
            </div>
          </div>

          <SectionLabel>Rich Info (shown in About popup)</SectionLabel>
          <div className="form-group">
            <label className="form-label">Overview</label>
            <textarea className="form-input" rows={3} value={form.overview} onChange={e => set('overview', e.target.value)} placeholder="What is this roadmap? Beginner-friendly intro..." />
          </div>
          <div className="form-group">
            <label className="form-label">Why This Path?</label>
            <textarea className="form-input" rows={2} value={form.whyLearn} onChange={e => set('whyLearn', e.target.value)} placeholder="Why should a student pick this path?..." />
          </div>
          <div className="form-group">
            <label className="form-label">Who Is This For?</label>
            <textarea className="form-input" rows={2} value={form.forWho} onChange={e => set('forWho', e.target.value)} placeholder="Students who want to become...?" />
          </div>

          <div className="form-group">
            <label className="form-label">Target Roles (one per line)</label>
            <textarea className="form-input admin-textarea-mono" rows={4} value={form.roleTargets} onChange={e => set('roleTargets', e.target.value)} placeholder={'Java Full Stack Developer\nSpring Boot Developer\nBackend Java Developer'} />
          </div>

          <SectionLabel>Lists (one item per line)</SectionLabel>
          <div className="form-group">
            <label className="form-label">What You Need First</label>
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.prerequisites} onChange={e => set('prerequisites', e.target.value)} placeholder={'Basic computer usage\nHTML + CSS fundamentals'} />
          </div>
          <div className="form-group">
            <label className="form-label">Tools Required</label>
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.toolsRequired} onChange={e => set('toolsRequired', e.target.value)} placeholder={'VS Code\nNode.js v18+\nGit'} />
          </div>
          <div className="form-group">
            <label className="form-label">What You Will Achieve</label>
            <textarea className="form-input admin-textarea-mono" rows={3} value={form.outcomes} onChange={e => set('outcomes', e.target.value)} placeholder={'Build full-stack applications\nDeploy to cloud\nClear Java interviews'} />
          </div>

          <div className="modal-actions admin-modal-actions--bordered">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading-spinner" /> : null} {roadmap ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function SubjectsPanel({ roadmap, onClose }) {
  const confirm = useConfirm()
  const [rsubs, setRsubs] = useState([])
  const [allSubs, setAllSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [selectedSub, setSelectedSub] = useState('')
  const [orderIdx, setOrderIdx] = useState(1)
  const [editingId, setEditingId] = useState(null)
  const [editIdx, setEditIdx] = useState(1)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const load = () => {
    setLoading(true)
    Promise.all([getRoadmapSubjects(roadmap.id), getAdminSubjects()])
      .then(([rs, all]) => { setRsubs(rs.data); setAllSubs(all.data) })
      .catch(err => toast.error(getApiError(err, 'We could not load roadmap subjects. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }

  useEffect(() => { load() }, [])

  const handleAdd = async () => {
    if (!selectedSub) return
    setAdding(true)
    try {
      await addSubjectToRoadmap(roadmap.id, { subjectId: selectedSub, orderIndex: orderIdx })
      toast.success('Subject added'); setSelectedSub(''); load()
    } catch (err) { toast.error(getApiError(err, 'We could not add this subject. Please try again.')) } finally { setAdding(false) }
  }

  const handleRemove = async (rs) => {
    const subjectTitle = rs.subject?.title || 'Subject'
    if (!(await confirm(removeRoadmapSubjectConfirmOptions(subjectTitle, roadmap.title)))) return
    try {
      await removeSubjectFromRoadmap(roadmap.id, rs.subject?.id)
      toast.success('Removed')
      load()
    } catch (err) { toast.error(getApiError(err, 'We could not remove this subject. Please try again.')) }
  }

  const handleReorder = async (subId) => {
    try {
      await reorderSubjectInRoadmap(roadmap.id, subId, editIdx)
      toast.success('Order updated'); setEditingId(null); load()
    } catch (err) { toast.error(getApiError(err, 'We could not update the order. Please try again.')) }
  }

  const assigned = new Set(rsubs.map(rs => rs.subject?.id))
  const available = allSubs.filter(s => !assigned.has(s.id))
  // Copy before sorting — sorting rsubs in place mutates state during render (a React
  // violation). Memoized so the sort only re-runs when the subject list changes.
  const sortedRsubs = useMemo(() => [...rsubs].sort((a, b) => a.orderIndex - b.orderIndex), [rsubs])

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal admin-form-modal--600">
        <div className="modal-header">
          <h3 className="modal-title">Subjects in "{roadmap.title}"</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        {loading ? <RadarLoader height={220} /> : (
          <>
            <div className="admin-panel-add-box">
              <div className="form-label mb-1">Add Subject</div>
              <div className="admin-panel-add-row">
                <SearchableSelect items={available} value={selectedSub} onChange={setSelectedSub} placeholder="Select subject…" />
                <input type="number" className="form-input admin-order-input--narrow" value={orderIdx} onChange={e => setOrderIdx(Number(e.target.value))} placeholder="Order" min={1} />
                <button className="btn btn-primary btn-sm" onClick={handleAdd} disabled={adding || !selectedSub}>
                  {adding ? <span className="loading-spinner" /> : <Plus size={13} />} Add
                </button>
              </div>
            </div>
            <div className="admin-col-stack">
              {sortedRsubs.map(rs => (
                <div key={rs.id} className="admin-list-card">
                  {editingId === rs.subject?.id ? (
                    <input
                      type="number" min={1}
                      value={editIdx}
                      onChange={e => setEditIdx(Number(e.target.value))}
                      className="admin-order-input"
                      onKeyDown={e => { if (e.key === 'Enter') handleReorder(rs.subject?.id); if (e.key === 'Escape') setEditingId(null) }}
                      autoFocus
                    />
                  ) : (
                    <span className="admin-order-badge">{rs.orderIndex}</span>
                  )}
                  <span className="admin-emoji-lg">{rs.subject?.icon}</span>
                  <span className="text-sm font-semibold admin-flex-1">{rs.subject?.title}</span>
                  {editingId === rs.subject?.id ? (
                    <>
                      <button className="btn btn-primary btn-sm" onClick={() => handleReorder(rs.subject?.id)}><Check size={12} /></button>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}><X size={12} /></button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-ghost btn-sm" onClick={() => { setEditingId(rs.subject?.id); setEditIdx(rs.orderIndex) }}><Pencil size={12} /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemove(rs)}><Trash2 size={12} /></button>
                    </>
                  )}
                </div>
              ))}
              {rsubs.length === 0 && <p className="text-muted text-sm admin-empty-inline">No subjects added yet</p>}
            </div>
          </>
        )}
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminRoadmaps() {
  const [roadmaps, setRoadmaps] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [subjectsPanel, setSubjectsPanel] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)

  const load = () => {
    setLoading(true)
    getAdminRoadmaps().then(r => setRoadmaps(r.data)).catch(err => toast.error(getApiError(err, 'We could not load roadmaps. Please refresh.'))).finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => roadmaps.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    (r.roleTarget || '').toLowerCase().includes(search.toLowerCase())
  ), [roadmaps, search])

  const filteredIds = useMemo(() => filtered.map(r => r.id), [filtered])
  const selection = useAdminSelection(filteredIds)

  const deleteTargets = useMemo(
    () => selection.selectedIds.map(id => ({
      id,
      label: roadmaps.find(r => r.id === id)?.title || id,
    })),
    [selection.selectedIds, roadmaps],
  )

  const confirmBulkDelete = async () => {
    setBulkDeleting(true)
    try {
      for (const id of selection.selectedIds) {
        await deleteRoadmap(id)
      }
      toast.success(`Deleted ${selection.selectedIds.length} roadmap${selection.selectedIds.length !== 1 ? 's' : ''}`)
      selection.clear()
      setDeleteModal(false)
      load()
    } catch (err) {
      toast.error(getApiError(err, 'Some selected roadmaps could not be deleted. Please try again.'))
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <AppLayout title="Roadmaps">
      <AdminPageToolbar subtitle={`${roadmaps.length} career roadmaps`}>
        <div className="admin-page-actions">
          <div className="admin-search-wrap">
            <Search size={15} className="admin-search-icon" />
            <input
              className="form-input admin-search-input"
              placeholder="Search roadmaps…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={blurOnEnter}
            />
          </div>
          <button className="btn btn-primary" onClick={() => setModal('new')}><Plus size={15} /> New Roadmap</button>
        </div>
      </AdminPageToolbar>

      {loading ? <RadarLoader height={220} /> : (
        <>
          <AdminBulkToolbar
            count={selection.count}
            label="roadmap"
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
                    aria-label="Select all roadmaps"
                    checked={selection.allSelected}
                    ref={el => { if (el) el.indeterminate = selection.someSelected }}
                    onChange={selection.toggleAll}
                  />
                </th>
                <th>Roadmap</th><th>Role</th><th>Weeks</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="admin-table-empty">No roadmaps match "{search}"</td></tr>
              ) : filtered.map(r => (
                <tr key={r.id} className={selection.isSelected(r.id) ? 'row-selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      aria-label={`Select ${r.title}`}
                      checked={selection.isSelected(r.id)}
                      onChange={() => selection.toggle(r.id)}
                    />
                  </td>
                  <td>
                    <div className="admin-row-flex">
                      <div className="admin-icon-box" style={{ '--admin-icon-bg': r.color + '22' }}>
                        {r.icon}
                      </div>
                      <div>
                        <div className="table-name">{r.title}</div>
                        <div className="text-xs text-muted truncate admin-truncate-desc">{r.description}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-primary">{r.roleTarget || '—'}</span></td>
                  <td className="text-sm text-muted">{r.estimatedWeeks}w</td>
                  <td>
                    <div className="admin-action-btns">
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSubjectsPanel(r)}><Settings size={13} /> Subjects</button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setModal(r)} aria-label={`Edit ${r.title}`}><Pencil size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

      {modal && <RoadmapModal roadmap={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={() => { setModal(null); load() }} />}
      {subjectsPanel && <SubjectsPanel roadmap={subjectsPanel} onClose={() => setSubjectsPanel(null)} />}

      <AdminDeleteModal
        open={deleteModal}
        title="Delete selected roadmaps?"
        subtitle="Each roadmap and its subject links and enrollment data will be permanently removed."
        items={deleteTargets}
        deleting={bulkDeleting}
        onConfirm={confirmBulkDelete}
        onClose={() => !bulkDeleting && setDeleteModal(false)}
      />
    </AppLayout>
  )
}
