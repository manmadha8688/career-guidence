import { useState, useEffect, useMemo } from 'react'
import { Search, MapPin, Calendar, Briefcase, User, Plus, X, Pencil } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminPageToolbar from '../../components/admin/AdminPageToolbar'
import '../../styles/pages/admin/index.css'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import blurOnEnter from '../../utils/blurOnEnter'
import useAdminSelection from '../../hooks/useAdminSelection'
import { getAdminWalkIns, createWalkIn, updateAdminWalkIn, deleteWalkIn } from '../../api/api'
import AdminSkeleton from '../../components/loaders/AdminSkeleton'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'
import useBodyLock from '../../hooks/useBodyLock'

const CITIES = ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Noida', 'Delhi', 'Kolkata', 'Ahmedabad', 'Gurugram']
const STATUSES = ['ACTIVE', 'EXPIRED']

const EMPTY = { companyName: '', role: '', walkInDate: '', walkInTime: '', city: '', location: '', contactInfo: '', description: '', skillInput: '', skills: [], status: 'ACTIVE' }

function PostModal({ onClose, onSuccess, existing }) {
  const isEdit = !!existing
  const [form, setForm] = useState(() => existing
    ? { ...EMPTY, ...existing, skillInput: '', skills: existing.skills || [] }
    : EMPTY
  )
  const [saving, setSaving] = useState(false)

  useBodyLock()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const addSkill = () => {
    const s = form.skillInput.trim()
    if (s && !form.skills.includes(s)) set('skills', [...form.skills, s])
    set('skillInput', '')
  }

  const removeSkill = (s) => set('skills', form.skills.filter(x => x !== s))

  const submit = async () => {
    if (!form.companyName.trim() || !form.role.trim() || !form.walkInDate || !form.city) {
      toast.error('Company, role, date and city are required')
      return
    }
    setSaving(true)
    try {
      const payload = { ...form }
      delete payload.skillInput
      if (isEdit) {
        await updateAdminWalkIn(existing.id, payload)
        toast.success('Walk-in updated')
      } else {
        await createWalkIn(payload)
        toast.success('Walk-in posted')
      }
      onSuccess()
    } catch (e) {
      toast.error(getApiError(e, 'We could not save this walk-in. Please try again.'))
    } finally {
      setSaving(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} className="admin-walkin-overlay">
      <div className="admin-walkin-modal">
        <div className="admin-walkin-modal__header">
          <div className="admin-walkin-modal__title">{isEdit ? 'Edit Walk-In' : 'Post Walk-In Interview'}</div>
          <button onClick={onClose} className="admin-walkin-modal__close">
            <X size={18} />
          </button>
        </div>

        <div className="admin-walkin-modal__body">
          <div className="admin-walkin-grid-2">
            <div>
              <label className="admin-walkin-label">Company Name *</label>
              <input className="admin-walkin-input" value={form.companyName} onChange={e => set('companyName', e.target.value)} placeholder="e.g. TCS" />
            </div>
            <div>
              <label className="admin-walkin-label">Role *</label>
              <input className="admin-walkin-input" value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Java Developer" />
            </div>
          </div>

          <div className="admin-walkin-grid-2">
            <div>
              <label className="admin-walkin-label">Walk-In Date *</label>
              <input type="date" className="admin-walkin-input" value={form.walkInDate} min={today} onChange={e => set('walkInDate', e.target.value)} />
            </div>
            <div>
              <label className="admin-walkin-label">Walk-In Time</label>
              <input className="admin-walkin-input" value={form.walkInTime} onChange={e => set('walkInTime', e.target.value)} placeholder="e.g. 10 AM – 2 PM" />
            </div>
          </div>

          <div className="admin-walkin-grid-2">
            <div>
              <label className="admin-walkin-label">City *</label>
              <select className="admin-walkin-input" value={form.city} onChange={e => set('city', e.target.value)}>
                <option value="">Select city</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-walkin-label">Contact Info</label>
              <input className="admin-walkin-input" value={form.contactInfo} onChange={e => set('contactInfo', e.target.value)} placeholder="Email or phone" />
            </div>
          </div>

          <div>
            <label className="admin-walkin-label">Venue / Location</label>
            <input className="admin-walkin-input" value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. TCS Manyata Tech Park, Hebbal" />
          </div>

          <div>
            <label className="admin-walkin-label">Skills Required</label>
            <div className="admin-walkin-skill-row">
              <input
                className="admin-walkin-input admin-walkin-input--flex"
                value={form.skillInput}
                onChange={e => set('skillInput', e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Type skill and press Enter"
              />
              <button onClick={addSkill} className="btn btn-primary btn-sm">Add</button>
            </div>
            {form.skills.length > 0 && (
              <div className="admin-walkin-skill-tags">
                {form.skills.map(s => (
                  <span key={s} className="admin-walkin-skill-tag">
                    {s} <X size={11} className="admin-walkin-skill-remove" onClick={() => removeSkill(s)} />
                  </span>
                ))}
              </div>
            )}
          </div>

          {isEdit && (
            <div>
              <label className="admin-walkin-label">Status</label>
              <select className="admin-walkin-input" value={form.status} onChange={e => set('status', e.target.value)}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="admin-walkin-label">Description / Additional Details</label>
            <textarea
              className="admin-walkin-input admin-walkin-input--textarea"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Eligibility, documents required, batch year, etc."
            />
          </div>
        </div>

        <div className="admin-walkin-modal__footer">
          <button onClick={onClose} className="btn btn-ghost">Cancel</button>
          <button onClick={submit} disabled={saving} className={`btn btn-primary${saving ? ' admin-walkin-submit--saving' : ''}`}>
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Post Walk-In'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminWalkIns() {
  const [walkIns, setWalkIns] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [deleteModal, setDeleteModal] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)

  const load = (p = 0) => {
    setLoading(true)
    getAdminWalkIns(p, 20)
      .then(r => {
        setWalkIns(r.data.content)
        setTotal(r.data.totalElements)
        setTotalPages(r.data.totalPages)
        setPage(r.data.number ?? p)
      })
      .catch(err => toast.error(getApiError(err, 'We could not load walk-ins. Please refresh.')))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load(0) }, [])

  const filtered = walkIns.filter(w =>
    !search ||
    w.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    w.role?.toLowerCase().includes(search.toLowerCase()) ||
    w.city?.toLowerCase().includes(search.toLowerCase()) ||
    w.postedBy?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredIds = useMemo(() => filtered.map(w => w.id), [filtered])
  const selection = useAdminSelection(filteredIds)

  const deleteTargets = useMemo(
    () => selection.selectedIds.map(id => ({
      id,
      label: walkIns.find(w => w.id === id)?.companyName || id,
    })),
    [selection.selectedIds, walkIns],
  )

  const confirmBulkDelete = async () => {
    setBulkDeleting(true)
    try {
      for (const id of selection.selectedIds) {
        await deleteWalkIn(id)
      }
      toast.success(`Deleted ${selection.selectedIds.length} walk-in${selection.selectedIds.length !== 1 ? 's' : ''}`)
      selection.clear()
      setDeleteModal(false)
      load(page)
    } catch (err) {
      toast.error(getApiError(err, 'Some selected walk-ins could not be deleted. Please try again.'))
    } finally {
      setBulkDeleting(false)
    }
  }

  if (loading) return <AppLayout title="Walk-In Interviews"><AdminSkeleton rows={6} /></AppLayout>

  return (
    <AppLayout title="Walk-In Interviews">
      <AdminPageToolbar subtitle={`${total} total — ${walkIns.filter(w => w.status === 'ACTIVE').length} active on this page`}>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={15} /> Post Walk-In
        </button>
      </AdminPageToolbar>

      <div className="admin-search-bar-row">
        <div className="admin-search-wrap admin-search-wrap--flex">
          <Search size={15} className="admin-search-icon admin-search-icon--left10" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={blurOnEnter}
            placeholder="Search company, role, city, posted by…"
            className="admin-search-input--full"
          />
        </div>
      </div>

      <AdminBulkToolbar
        count={selection.count}
        label="walk-in"
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
                  aria-label="Select all walk-ins"
                  checked={selection.allSelected}
                  ref={el => { if (el) el.indeterminate = selection.someSelected }}
                  onChange={selection.toggleAll}
                />
              </th>
              <th>Company / Role</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Skills</th>
              <th>Posted By</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="admin-table-empty">No walk-ins found</td></tr>
            ) : filtered.map(w => (
              <tr key={w.id} className={selection.isSelected(w.id) ? 'row-selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    className="table-checkbox"
                    aria-label={`Select ${w.companyName}`}
                    checked={selection.isSelected(w.id)}
                    onChange={() => selection.toggle(w.id)}
                  />
                </td>
                <td>
                  <div className="admin-walkin-company">{w.companyName}</div>
                  <div className="admin-walkin-role">
                    <Briefcase size={11} /> {w.role}
                  </div>
                </td>
                <td>
                  <div className="admin-walkin-cell-row">
                    <Calendar size={12} className="admin-walkin-cell-row__icon" /> {w.walkInDate}
                  </div>
                  {w.walkInTime && <div className="admin-walkin-cell-sub">{w.walkInTime}</div>}
                </td>
                <td>
                  <div className="admin-walkin-cell-row">
                    <MapPin size={12} className="admin-walkin-cell-row__icon" /> {w.city}
                  </div>
                  {w.location && <div className="admin-walkin-cell-sub admin-walkin-cell-sub--location">{w.location}</div>}
                </td>
                <td>
                  <div className="admin-tag-wrap admin-tag-wrap--180">
                    {(w.skills || []).slice(0, 3).map(s => (
                      <span key={s} className="admin-walkin-skill-table-tag">{s}</span>
                    ))}
                    {(w.skills || []).length > 3 && <span className="admin-walkin-skill-more">+{w.skills.length - 3}</span>}
                  </div>
                </td>
                <td>
                  <div className="admin-walkin-cell-row">
                    <User size={12} /> {w.postedBy || '—'}
                  </div>
                  {w.createdAt && (
                    <div className="admin-walkin-cell-sub admin-walkin-cell-sub--72">
                      {new Date(w.createdAt).toLocaleDateString('en-IN')}
                    </div>
                  )}
                </td>
                <td>
                  <span className={`admin-walkin-status${w.status === 'ACTIVE' ? ' admin-walkin-status--active' : ' admin-walkin-status--expired'}`}>
                    {w.status}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => setEditing(w)}
                    className="btn btn-ghost btn-sm"
                    title="Edit"
                    aria-label={`Edit ${w.companyName}`}
                  >
                    <Pencil size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex-center admin-pagination">
          <button className="btn btn-ghost btn-sm" disabled={page === 0} onClick={() => load(page - 1)}>← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`btn btn-sm ${page === i ? 'btn-primary' : 'btn-ghost'}`} onClick={() => load(i)}>{i + 1}</button>
          ))}
          <button className="btn btn-ghost btn-sm" disabled={page === totalPages - 1} onClick={() => load(page + 1)}>Next →</button>
        </div>
      )}

      {showModal && (
        <PostModal
          onClose={() => setShowModal(false)}
          onSuccess={() => { setShowModal(false); load(page) }}
        />
      )}
      {editing && (
        <PostModal
          existing={editing}
          onClose={() => setEditing(null)}
          onSuccess={() => { setEditing(null); load(page) }}
        />
      )}

      <AdminDeleteModal
        open={deleteModal}
        title="Delete selected walk-ins?"
        subtitle="Each walk-in listing will be permanently removed."
        items={deleteTargets}
        deleting={bulkDeleting}
        onConfirm={confirmBulkDelete}
        onClose={() => !bulkDeleting && setDeleteModal(false)}
      />
    </AppLayout>
  )
}
