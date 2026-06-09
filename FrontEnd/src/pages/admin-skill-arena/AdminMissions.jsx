import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminMissions, createMission, updateMission, deleteMission, getAdminSubjects } from '../../api/api'
import toast from 'react-hot-toast'

const RANKS = ['D', 'C', 'B', 'A', 'S']
const RANK_COLORS = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#22C55E' }

const listToText = (arr) => (arr || []).join('\n')
const textToList = (str) => str.split('\n').map(s => s.trim()).filter(Boolean)

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--warning)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: '0.375rem', marginBottom: '0.75rem', marginTop: '0.25rem' }}>
      {children}
    </div>
  )
}

function MissionModal({ mission, subjects, onClose, onSave }) {
  const [form, setForm] = useState(() => mission ? {
    title:           mission.title || '',
    missionBrief:    mission.missionBrief || '',
    rank:            mission.rank || 'D',
    category:        mission.category || '',
    targetRoles:     listToText(mission.targetRoles),
    techStack:       listToText(mission.techStack),
    estimatedHours:  mission.estimatedHours || '',
    subjectIds:      mission.subjectIds || [],
    subjectTitles:   mission.subjectTitles || [],
    objectives:      listToText(mission.objectives),
    bonusObjectives: listToText(mission.bonusObjectives),
    approachSteps:   listToText(mission.approachSteps),
    hints:           listToText(mission.hints),
    published:       mission.published !== false,
    orderIndex:      mission.orderIndex ?? 0,
  } : {
    title: '', missionBrief: '', rank: 'D', category: '', targetRoles: '',
    techStack: '', estimatedHours: '', subjectIds: [], subjectTitles: [],
    objectives: '', bonusObjectives: '', approachSteps: '', hints: '',
    published: true, orderIndex: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

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
        estimatedHours:  parseInt(form.estimatedHours) || 0,
        orderIndex:      parseInt(form.orderIndex) || 0,
      }
      mission ? await updateMission(mission.id, payload) : await createMission(payload)
      toast.success(mission ? 'Mission updated' : 'Mission created')
      onSave()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 700, maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-header" style={{ flexShrink: 0 }}>
          <h3 className="modal-title">{mission ? 'Edit Mission' : 'New Mission'}</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', flex: 1, padding: '0 1.5rem 1.5rem' }}>
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
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {RANKS.map(r => (
                  <button key={r} type="button" onClick={() => set('rank', r)}
                    style={{ padding: '0.3rem 0.75rem', borderRadius: 6, cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.06em', border: `1.5px solid ${RANK_COLORS[r]}`, background: form.rank === r ? RANK_COLORS[r] : 'transparent', color: form.rank === r ? '#fff' : RANK_COLORS[r], transition: 'all 0.15s' }}>
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
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.75rem' }}>
              <input type="checkbox" id="pub" checked={form.published} onChange={e => set('published', e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--primary)' }} />
              <label htmlFor="pub" style={{ cursor: 'pointer', fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: "'Share Tech Mono', monospace" }}>Published (visible to students)</label>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Project Category</label>
              <select className="form-input" value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="">— Not set —</option>
                <option value="SUBJECT_PRACTICE">Subject Practice</option>
                <option value="REAL_WORLD">Real World Projects</option>
                <option value="ACADEMIC">Academic Projects</option>
                <option value="ROLE_BASED">Role Based Projects</option>
              </select>
            </div>
            {form.category === 'ROLE_BASED' && (
              <div className="form-group">
                <label className="form-label">Target Roles (one per line)</label>
                <textarea className="form-input" rows={3} value={form.targetRoles} onChange={e => set('targetRoles', e.target.value)} placeholder={'Python Full Stack\nFrontend Developer\nData Analyst'} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
              </div>
            )}
          </div>

          <SectionLabel>Tech Stack (one per line)</SectionLabel>
          <div className="form-group">
            <textarea className="form-input" rows={3} value={form.techStack} onChange={e => set('techStack', e.target.value)} placeholder={'Python\nFlask\nSQLite'} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
          </div>

          <SectionLabel>Linked Subjects</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            {subjects.length === 0 && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No subjects loaded</span>}
            {subjects.map(s => {
              const selected = form.subjectIds.includes(s.id)
              return (
                <button key={s.id} type="button" onClick={() => toggleSubject(s)}
                  style={{ padding: '0.25rem 0.65rem', borderRadius: 20, cursor: 'pointer', fontSize: '0.78rem', fontFamily: "'Share Tech Mono', monospace", border: `1.5px solid ${selected ? (s.color || 'var(--primary)') : 'var(--border)'}`, background: selected ? (s.color || 'var(--primary)') + '22' : 'transparent', color: selected ? (s.color || 'var(--primary)') : 'var(--text-muted)', transition: 'all 0.15s' }}>
                  {s.icon} {s.title}
                </button>
              )
            })}
          </div>

          <SectionLabel>Content (one item per line)</SectionLabel>
          <div className="form-group">
            <label className="form-label">Objectives</label>
            <textarea className="form-input" rows={4} value={form.objectives} onChange={e => set('objectives', e.target.value)} placeholder={'Build a REST API with authentication\nConnect to a database\nDeploy to the cloud'} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Bonus Objectives</label>
            <textarea className="form-input" rows={3} value={form.bonusObjectives} onChange={e => set('bonusObjectives', e.target.value)} placeholder={'Add rate limiting\nWrite unit tests'} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Approach Steps</label>
            <textarea className="form-input" rows={4} value={form.approachSteps} onChange={e => set('approachSteps', e.target.value)} placeholder={'Start by planning your data models\nSet up the project structure\nImplement authentication first'} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Hints</label>
            <textarea className="form-input" rows={3} value={form.hints} onChange={e => set('hints', e.target.value)} placeholder={'Use environment variables for secrets\nJWT tokens expire — handle refresh logic'} style={{ fontFamily: 'monospace', fontSize: '0.82rem' }} />
          </div>

          <div className="modal-actions" style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
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
  const [deleting, setDeleting] = useState({})

  const load = () => {
    setLoading(true)
    Promise.all([getAdminMissions(), getAdminSubjects()])
      .then(([m, s]) => { setMissions(m.data); setSubjects(s.data) })
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    setDeleting(p => ({ ...p, [id]: true }))
    try {
      await deleteMission(id)
      toast.success('Mission deleted')
      load()
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(p => ({ ...p, [id]: false })) }
  }

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

  return (
    <AppLayout title="Missions">
      <div className="page-header">
        <div>
          <h1 className="page-title">Missions</h1>
          <p className="page-subtitle">{missions.length} missions in the platform</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input className="form-input" style={{ paddingLeft: '2.25rem', width: 220 }} placeholder="Search missions…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={() => setModal('new')}>
            <Plus size={15} /> New Mission
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-center" style={{ height: '40vh' }}><div className="loading-spinner-lg" /></div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
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
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  {search ? `No missions match "${search}"` : 'No missions yet — click New Mission to add one'}
                </td></tr>
              ) : filtered.map(m => (
                <tr key={m.id}>
                  <td>
                    <div className="table-name">{m.title}</div>
                    <div className="text-xs text-muted truncate" style={{ maxWidth: 280 }}>{m.missionBrief}</div>
                  </td>
                  <td>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 4, border: `1.5px solid ${RANK_COLORS[m.rank] || '#888'}`, color: RANK_COLORS[m.rank] || '#888', background: (RANK_COLORS[m.rank] || '#888') + '18' }}>
                      {m.rank || 'D'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', maxWidth: 160 }}>
                      {(m.techStack || []).slice(0, 3).map(t => (
                        <span key={t} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", color: 'var(--text-muted)', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>{t}</span>
                      ))}
                      {(m.techStack || []).length > 3 && <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>+{m.techStack.length - 3}</span>}
                    </div>
                  </td>
                  <td className="text-sm text-muted" style={{ maxWidth: 200 }}>
                    {(m.subjectTitles || []).length > 0
                      ? (m.subjectTitles || []).join(', ')
                      : <span style={{ color: 'var(--border)' }}>—</span>}
                  </td>
                  <td className="text-sm text-muted">
                    {m.estimatedHours > 0 ? `${m.estimatedHours}h` : <span style={{ color: 'var(--border)' }}>—</span>}
                  </td>
                  <td>
                    {m.published ? (
                      <span style={{ fontSize: '0.7rem', fontFamily: "'Share Tech Mono', monospace", color: '#4ADE80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '0.15rem 0.5rem', borderRadius: 4 }}>live</span>
                    ) : (
                      <span style={{ fontSize: '0.7rem', fontFamily: "'Share Tech Mono', monospace", color: 'var(--text-muted)', background: 'rgba(136,136,136,0.08)', border: '1px solid var(--border)', padding: '0.15rem 0.5rem', borderRadius: 4 }}>draft</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setModal(m)}><Pencil size={13} /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id, m.title)} disabled={deleting[m.id]}>
                        {deleting[m.id] ? <span className="loading-spinner" /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <MissionModal
          mission={modal === 'new' ? null : modal}
          subjects={subjects}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); load() }}
        />
      )}
    </AppLayout>
  )
}
