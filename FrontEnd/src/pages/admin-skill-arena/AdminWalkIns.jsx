import { useState, useEffect } from 'react'
import { Trash2, Search, MapPin, Calendar, Briefcase, User, Plus, X, Pencil } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminWalkIns, createWalkIn, updateAdminWalkIn, deleteWalkIn } from '../../api/api'
import AdminSkeleton from '../../components/loaders/AdminSkeleton'
import toast from 'react-hot-toast'
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
      const { skillInput, ...payload } = form
      if (isEdit) {
        await updateAdminWalkIn(existing.id, payload)
        toast.success('Walk-in updated')
      } else {
        await createWalkIn(payload)
        toast.success('Walk-in posted')
      }
      onSuccess()
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  const inputStyle = {
    width: '100%', padding: '0.5rem 0.75rem', borderRadius: 8,
    border: '1px solid var(--border)', background: 'var(--bg-card)',
    color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'inherit',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block', fontSize: '0.75rem', fontWeight: 600,
    color: 'var(--text-muted)', marginBottom: '0.375rem', letterSpacing: '0.04em',
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderTop: '3px solid #9B6ED4', borderRadius: 14,
        width: '100%', maxWidth: 560, maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{isEdit ? 'Edit Walk-In' : 'Post Walk-In Interview'}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Company Name *</label>
              <input style={inputStyle} value={form.companyName} onChange={e => set('companyName', e.target.value)} placeholder="e.g. TCS" />
            </div>
            <div>
              <label style={labelStyle}>Role *</label>
              <input style={inputStyle} value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Java Developer" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Walk-In Date *</label>
              <input type="date" style={inputStyle} value={form.walkInDate} min={today} onChange={e => set('walkInDate', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Walk-In Time</label>
              <input style={inputStyle} value={form.walkInTime} onChange={e => set('walkInTime', e.target.value)} placeholder="e.g. 10 AM – 2 PM" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>City *</label>
              <select style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)}>
                <option value="">Select city</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Contact Info</label>
              <input style={inputStyle} value={form.contactInfo} onChange={e => set('contactInfo', e.target.value)} placeholder="Email or phone" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Venue / Location</label>
            <input style={inputStyle} value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. TCS Manyata Tech Park, Hebbal" />
          </div>

          <div>
            <label style={labelStyle}>Skills Required</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={form.skillInput}
                onChange={e => set('skillInput', e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Type skill and press Enter"
              />
              <button onClick={addSkill} className="btn btn-primary btn-sm">Add</button>
            </div>
            {form.skills.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {form.skills.map(s => (
                  <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', background: 'rgba(155,110,212,0.12)', color: '#9B6ED4', border: '1px solid rgba(155,110,212,0.25)', borderRadius: 5, padding: '0.15rem 0.5rem' }}>
                    {s} <X size={11} style={{ cursor: 'pointer' }} onClick={() => removeSkill(s)} />
                  </span>
                ))}
              </div>
            )}
          </div>

          {isEdit && (
            <div>
              <label style={labelStyle}>Status</label>
              <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}

          <div>
            <label style={labelStyle}>Description / Additional Details</label>
            <textarea
              style={{ ...inputStyle, height: 80, resize: 'vertical' }}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Eligibility, documents required, batch year, etc."
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexShrink: 0 }}>
          <button onClick={onClose} className="btn btn-ghost">Cancel</button>
          <button onClick={submit} disabled={saving} className="btn btn-primary" style={{ opacity: saving ? 0.7 : 1 }}>
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
  const [deleting, setDeleting] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)

  const load = () => {
    setLoading(true)
    getAdminWalkIns()
      .then(r => setWalkIns(r.data))
      .catch(() => toast.error('Failed to load walk-ins'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id, company) => {
    if (!window.confirm(`Delete walk-in from ${company}?`)) return
    setDeleting(id)
    try {
      await deleteWalkIn(id)
      toast.success('Walk-in deleted')
      setWalkIns(prev => prev.filter(w => w.id !== id))
    } catch {
      toast.error('Failed to delete')
    } finally {
      setDeleting(null)
    }
  }

  const filtered = walkIns.filter(w =>
    !search ||
    w.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    w.role?.toLowerCase().includes(search.toLowerCase()) ||
    w.city?.toLowerCase().includes(search.toLowerCase()) ||
    w.postedBy?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <AppLayout title="Walk-Ins"><AdminSkeleton rows={6} /></AppLayout>

  return (
    <AppLayout title="Walk-In Management">
      <div className="page-header">
        <div>
          <h1 className="page-title">Walk-In Interviews</h1>
          <p className="page-subtitle">{walkIns.length} total — {walkIns.filter(w => w.status === 'ACTIVE').length} active</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={15} /> Post Walk-In
        </button>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search company, role, city, posted by…"
            style={{ width: '100%', paddingLeft: 32, paddingRight: 12, height: 36, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Company / Role</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Skills</th>
              <th>Posted By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No walk-ins found</td></tr>
            ) : filtered.map(w => (
              <tr key={w.id}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{w.companyName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 2 }}>
                    <Briefcase size={11} /> {w.role}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={12} style={{ flexShrink: 0 }} /> {w.walkInDate}
                  </div>
                  {w.walkInTime && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{w.walkInTime}</div>}
                </td>
                <td>
                  <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={12} style={{ flexShrink: 0 }} /> {w.city}
                  </div>
                  {w.location && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2, maxWidth: 180 }}>{w.location}</div>}
                </td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', maxWidth: 180 }}>
                    {(w.skills || []).slice(0, 3).map(s => (
                      <span key={s} style={{ fontSize: '0.65rem', background: 'rgba(155,110,212,0.12)', color: '#9B6ED4', border: '1px solid rgba(155,110,212,0.25)', borderRadius: 4, padding: '0.1rem 0.4rem' }}>{s}</span>
                    ))}
                    {(w.skills || []).length > 3 && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>+{w.skills.length - 3}</span>}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <User size={12} /> {w.postedBy || '—'}
                  </div>
                  {w.createdAt && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {new Date(w.createdAt).toLocaleDateString('en-IN')}
                    </div>
                  )}
                </td>
                <td>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em',
                    padding: '0.15rem 0.5rem', borderRadius: 4,
                    background: w.status === 'ACTIVE' ? 'rgba(34,197,94,0.12)' : 'rgba(100,116,139,0.12)',
                    color: w.status === 'ACTIVE' ? '#22C55E' : '#64748B',
                    border: `1px solid ${w.status === 'ACTIVE' ? 'rgba(34,197,94,0.25)' : 'rgba(100,116,139,0.2)'}`,
                  }}>
                    {w.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => setEditing(w)}
                      className="btn btn-ghost btn-sm"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(w.id, w.companyName)}
                      disabled={deleting === w.id}
                      className="btn btn-danger btn-sm"
                      style={{ opacity: deleting === w.id ? 0.6 : 1 }}
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PostModal
          onClose={() => setShowModal(false)}
          onSuccess={() => { setShowModal(false); load() }}
        />
      )}
      {editing && (
        <PostModal
          existing={editing}
          onClose={() => setEditing(null)}
          onSuccess={() => { setEditing(null); load() }}
        />
      )}
    </AppLayout>
  )
}
