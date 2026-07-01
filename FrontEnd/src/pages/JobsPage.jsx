import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  MapPin, Clock, Briefcase, Plus, X, Search,
  ChevronDown, ChevronUp, Sun, Moon, ChevronLeft,
  Filter, RefreshCw, Calendar, Building2, Layers
} from 'lucide-react'
import { getWalkIns, postWalkIn, removeWalkIn } from '../api/api'
import toast from 'react-hot-toast'
import ScrollToTop from '../components/ScrollToTop'

const CITIES = ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Noida', 'Delhi', 'Kolkata', 'Ahmedabad', 'Gurugram']
const DATE_OPTS = [
  { label: 'Any Date', value: 'all' },
  { label: 'Today', value: '0' },
  { label: 'Tomorrow', value: '1' },
  { label: 'Next 3 Days', value: '3' },
  { label: 'This Week', value: '7' },
]

function daysUntil(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0)
  const d = new Date(dateStr); d.setHours(0,0,0,0)
  return Math.round((d - today) / 86400000)
}
function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
}

// ── Sidebar filter section ─────────────────────────────────────────
function FilterSection({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: open ? '1rem' : 0 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'none', border: 'none', cursor: 'pointer', padding: '0.875rem 0',
        color: '#E2E8F0', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem',
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {Icon && <Icon size={13} style={{ opacity: 0.6 }} />} {title}
        </span>
        {open ? <ChevronUp size={13} style={{ opacity: 0.4 }} /> : <ChevronDown size={13} style={{ opacity: 0.4 }} />}
      </button>
      {open && <div style={{ paddingBottom: '0.25rem' }}>{children}</div>}
    </div>
  )
}

// ── Walk-in Card ───────────────────────────────────────────────────
function WalkInCard({ job, onDelete, userId, isAdmin, light }) {
  const [expanded, setExpanded] = useState(false)
  const days = daysUntil(job.walkInDate)
  const canDelete = isAdmin || job.postedById === userId

  const dateBadge = days === 0
    ? { bg: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: 'rgba(74,222,128,0.3)', label: 'TODAY' }
    : days === 1
    ? { bg: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: 'rgba(245,158,11,0.3)', label: 'TOMORROW' }
    : days <= 3
    ? { bg: 'rgba(251,146,60,0.12)', color: '#FB923C', border: 'rgba(251,146,60,0.25)', label: `IN ${days} DAYS` }
    : { bg: 'rgba(148,163,184,0.08)', color: '#94A3B8', border: 'rgba(148,163,184,0.15)', label: fmtDate(job.walkInDate) }

  return (
    <div style={{
      background: light ? '#fff' : '#0d1324',
      border: `1px solid ${light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 14, overflow: 'hidden',
      transition: 'box-shadow 0.2s, transform 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(155,110,212,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = '' }}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, #7C3AED, #9B6ED4, #60A5FA)` }} />
      <div style={{ padding: '1.125rem 1.25rem' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '1rem', color: light ? '#0F172A' : '#F1F5F9', marginBottom: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {job.companyName}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#9B6ED4' }}>{job.role}</div>
          </div>
          <span style={{ flexShrink: 0, fontSize: '0.62rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 6, background: dateBadge.bg, color: dateBadge.color, border: `1px solid ${dateBadge.border}`, fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
            {dateBadge.label}
          </span>
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem', marginBottom: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: light ? '#475569' : '#94A3B8' }}>
            <MapPin size={11} /> {job.city}{job.location ? `, ${job.location}` : ''}
          </span>
          {job.walkInTime && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: light ? '#475569' : '#94A3B8' }}>
              <Clock size={11} /> {job.walkInTime}
            </span>
          )}
        </div>

        {/* Skills */}
        {(job.skills || []).length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.875rem' }}>
            {job.skills.map(s => (
              <span key={s} style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: 4, background: 'rgba(155,110,212,0.1)', color: '#C4B5FD', border: '1px solid rgba(155,110,212,0.2)' }}>{s}</span>
            ))}
          </div>
        )}

        {/* Expanded */}
        {expanded && (
          <div style={{ marginBottom: '0.875rem', padding: '0.75rem', background: light ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)', borderRadius: 8, border: `1px solid ${light ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}` }}>
            {job.description && <p style={{ fontSize: '0.82rem', color: light ? '#475569' : '#94A3B8', lineHeight: 1.65, margin: '0 0 0.5rem' }}>{job.description}</p>}
            {job.contactInfo && <div style={{ fontSize: '0.78rem', color: '#9B6ED4', fontFamily: "'Share Tech Mono', monospace" }}>📞 {job.contactInfo}</div>}
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: `1px solid ${light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}` }}>
          <div style={{ fontSize: '0.62rem', color: light ? '#94A3B8' : '#475569', fontFamily: "'Share Tech Mono', monospace" }}>
            by {job.postedBy}
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={() => setExpanded(e => !e)} style={{ fontSize: '0.68rem', padding: '0.25rem 0.65rem', borderRadius: 6, cursor: 'pointer', background: 'rgba(155,110,212,0.08)', border: '1px solid rgba(155,110,212,0.25)', color: '#9B6ED4', fontFamily: "'Share Tech Mono', monospace" }}>
              {expanded ? '↑ Less' : '↓ More'}
            </button>
            {canDelete && (
              <button onClick={() => onDelete(job.id)} style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.08)', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Post Walk-In Modal ─────────────────────────────────────────────
function PostModal({ onClose, onSuccess, light }) {
  const [form, setForm] = useState({ companyName: '', role: '', walkInDate: '', walkInTime: '', city: '', location: '', contactInfo: '', description: '', skillInput: '' })
  const [skills, setSkills] = useState([])
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const addSkill = () => { const s = form.skillInput.trim(); if (s && !skills.includes(s)) setSkills(sk => [...sk, s]); set('skillInput', '') }
  const today = new Date().toISOString().split('T')[0]

  const submit = async () => {
    if (!form.companyName || !form.role || !form.walkInDate || !form.city) { toast.error('Company, Role, Date, City are required'); return }
    setSaving(true)
    try {
      await postWalkIn({ ...form, skills })
      toast.success('Walk-in posted!'); onSuccess()
    } catch (e) { toast.error(e?.response?.data?.error || 'Failed to post') }
    finally { setSaving(false) }
  }

  const inp = { width: '100%', padding: '0.625rem 0.875rem', borderRadius: 8, fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', background: light ? '#F8FAFC' : '#0a0d1e', border: `1px solid ${light ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)'}`, color: light ? '#0F172A' : '#E2E8F0', boxSizing: 'border-box' }
  const lbl = { fontSize: '0.72rem', fontWeight: 600, color: light ? '#475569' : '#94A3B8', marginBottom: '0.3rem', display: 'block', letterSpacing: '0.03em' }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: light ? '#fff' : '#0a0d1e', border: `1px solid ${light ? 'rgba(0,0,0,0.1)' : 'rgba(155,110,212,0.2)'}`, borderTop: '3px solid #9B6ED4', borderRadius: 18, width: '100%', maxWidth: 540, maxHeight: '90vh', overflow: 'auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.85rem', color: '#9B6ED4', letterSpacing: '0.06em' }}>POST WALK-IN</div>
            <div style={{ fontSize: '0.72rem', color: light ? '#94A3B8' : '#475569', marginTop: 2 }}>Help fellow students find opportunities</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={18} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Company Name *</label><input style={inp} placeholder="e.g. TCS, Wipro, Infosys" value={form.companyName} onChange={e => set('companyName', e.target.value)} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Job Role *</label><input style={inp} placeholder="e.g. Java Developer, QA Engineer" value={form.role} onChange={e => set('role', e.target.value)} /></div>
          <div><label style={lbl}>Walk-in Date *</label><input type="date" min={today} style={inp} value={form.walkInDate} onChange={e => set('walkInDate', e.target.value)} /></div>
          <div><label style={lbl}>Walk-in Time</label><input style={inp} placeholder="10 AM – 2 PM" value={form.walkInTime} onChange={e => set('walkInTime', e.target.value)} /></div>
          <div>
            <label style={lbl}>City *</label>
            <select style={inp} value={form.city} onChange={e => set('city', e.target.value)}>
              <option value="">Select city</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label style={lbl}>Venue / Area</label><input style={inp} placeholder="Address or area name" value={form.location} onChange={e => set('location', e.target.value)} /></div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>Required Skills</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input style={{ ...inp, flex: 1 }} placeholder="Type a skill, press Enter" value={form.skillInput} onChange={e => set('skillInput', e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }} />
              <button onClick={addSkill} style={{ padding: '0 0.875rem', borderRadius: 8, background: 'rgba(155,110,212,0.12)', border: '1px solid rgba(155,110,212,0.3)', color: '#9B6ED4', cursor: 'pointer', fontWeight: 700, flexShrink: 0 }}>Add</button>
            </div>
            {skills.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
                {skills.map(s => <span key={s} onClick={() => setSkills(sk => sk.filter(x => x !== s))} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 4, background: 'rgba(155,110,212,0.1)', color: '#C4B5FD', border: '1px solid rgba(155,110,212,0.2)', cursor: 'pointer' }}>{s} ✕</span>)}
              </div>
            )}
          </div>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Contact Info</label><input style={inp} placeholder="Email or phone (optional)" value={form.contactInfo} onChange={e => set('contactInfo', e.target.value)} /></div>
          <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Additional Details</label><textarea rows={3} style={{ ...inp, resize: 'vertical' }} placeholder="Eligibility, salary, what to bring..." value={form.description} onChange={e => set('description', e.target.value)} /></div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: 8, background: light ? 'rgba(74,222,128,0.06)' : 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', marginBottom: '0.25rem' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: light ? '#15803D' : '#4ADE80', lineHeight: 1.6 }}>
              🤝 <strong>Post only real, verified walk-ins.</strong> Your post helps fellow students get opportunities — inaccurate info wastes their time and effort. Let's build a community that genuinely helps each other.
            </p>
          </div>
          <button onClick={onClose} style={{ padding: '0.65rem 1.25rem', borderRadius: 10, background: 'transparent', border: `1px solid ${light ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)'}`, color: light ? '#475569' : '#94A3B8', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={submit} disabled={saving} style={{ padding: '0.65rem 1.75rem', borderRadius: 10, background: 'linear-gradient(135deg,#7C3AED,#9B6ED4)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Posting…' : 'Post Walk-In'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Coming Soon placeholder ────────────────────────────────────────
function JobsComingSoon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem' }}>🚀</div>
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '1.1rem', color: '#9B6ED4', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>COMING SOON</div>
      <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 360 }}>
        Full job listings — fresher roles, internships, and campus drives — are on the way. Walk-in updates are live now!
      </p>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────
export default function JobsPage() {
  const { user } = useAuth()
  const { theme: th, toggleTheme: tog } = useTheme()
  const navigate = useNavigate()
  const light = th === 'light'

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [mobileFilter, setMobileFilter] = useState(false)

  // Filters
  const [search, setSearch] = useState('')
  const [selCities, setSelCities] = useState([])
  const [selDate, setSelDate] = useState('all')
  const [selSkills, setSelSkills] = useState([])

  const bg = light ? '#F1F5F9' : '#060D1A'
  const sidebarBg = light ? '#fff' : '#0a0d1e'
  const border = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)'
  const text = light ? '#0F172A' : '#F1F5F9'
  const sub = light ? '#475569' : '#64748B'

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await getWalkIns()
      setJobs(data)
    } catch { toast.error('Failed to load walk-ins') }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this walk-in?')) return
    try {
      await removeWalkIn(id)
      toast.success('Deleted'); load()
    } catch { toast.error('Failed to delete') }
  }

  const toggleCity = (c) => setSelCities(s => s.includes(c) ? s.filter(x => x !== c) : [...s, c])
  const toggleSkill = (s) => setSelSkills(sk => sk.includes(s) ? sk.filter(x => x !== s) : [...sk, s])
  const clearAll = () => { setSearch(''); setSelCities([]); setSelDate('all'); setSelSkills([]) }
  const activeFilterCount = selCities.length + (selDate !== 'all' ? 1 : 0) + selSkills.length

  const allSkills = [...new Set(jobs.flatMap(j => j.skills || []))]

  const filtered = jobs.filter(j => {
    if (search && !j.companyName.toLowerCase().includes(search.toLowerCase()) && !j.role.toLowerCase().includes(search.toLowerCase()) && !(j.skills||[]).some(s=>s.toLowerCase().includes(search.toLowerCase()))) return false
    if (selCities.length > 0 && !selCities.includes(j.city)) return false
    if (selDate !== 'all') { const d = daysUntil(j.walkInDate); if (selDate === '0' && d !== 0) return false; if (selDate === '1' && d !== 1) return false; if (selDate === '3' && d > 3) return false; if (selDate === '7' && d > 7) return false }
    if (selSkills.length > 0 && !selSkills.some(s => (j.skills||[]).includes(s))) return false
    return true
  })

  const todayJobs = filtered.filter(j => daysUntil(j.walkInDate) === 0)
  const upcomingJobs = filtered.filter(j => daysUntil(j.walkInDate) > 0)

  // ── Sidebar JSX (inlined to avoid remount-on-render bug) ─────────
  const sidebarJsx = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div style={{ marginBottom: '0.75rem', padding: '0.625rem 0.875rem', background: 'rgba(155,110,212,0.08)', border: '1px solid rgba(155,110,212,0.2)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: '#C4B5FD', fontFamily: "'Share Tech Mono', monospace" }}>{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
          <button onClick={clearAll} style={{ fontSize: '0.65rem', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace", display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <RefreshCw size={10} /> Clear all
          </button>
        </div>
      )}

      {/* Search in sidebar */}
      <FilterSection title="Search" icon={Search}>
        <div style={{ position: 'relative' }}>
          <Search size={12} style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Company, role or skill..."
            style={{ width: '100%', paddingLeft: '2rem', paddingRight: '0.75rem', paddingTop: '0.55rem', paddingBottom: '0.55rem', borderRadius: 8, border: `1px solid ${border}`, background: light ? '#F8FAFC' : '#060a14', color: text, fontSize: '0.82rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
        </div>
      </FilterSection>

      {/* Date */}
      <FilterSection title="Walk-In Date" icon={Calendar}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {DATE_OPTS.map(opt => (
            <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.3rem 0.25rem', borderRadius: 6, transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,110,212,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <input type="radio" name="date" checked={selDate === opt.value} onChange={() => setSelDate(opt.value)}
                style={{ accentColor: '#9B6ED4', flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem', color: selDate === opt.value ? '#C4B5FD' : sub }}>{opt.label}</span>
              {opt.value === '0' && jobs.filter(j => daysUntil(j.walkInDate) === 0).length > 0 && (
                <span style={{ marginLeft: 'auto', fontSize: '0.62rem', background: 'rgba(74,222,128,0.12)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 999, padding: '0.05rem 0.4rem' }}>
                  {jobs.filter(j => daysUntil(j.walkInDate) === 0).length}
                </span>
              )}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* City */}
      <FilterSection title="Location" icon={MapPin}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {CITIES.filter(c => jobs.some(j => j.city === c)).map(c => {
            const count = jobs.filter(j => j.city === c).length
            return (
              <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.3rem 0.25rem', borderRadius: 6, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,110,212,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <input type="checkbox" checked={selCities.includes(c)} onChange={() => toggleCity(c)} style={{ accentColor: '#9B6ED4', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: selCities.includes(c) ? '#C4B5FD' : sub, flex: 1 }}>{c}</span>
                <span style={{ fontSize: '0.62rem', color: '#475569', background: 'rgba(255,255,255,0.06)', borderRadius: 4, padding: '0.05rem 0.35rem' }}>{count}</span>
              </label>
            )
          })}
        </div>
      </FilterSection>


      {/* Skills */}
      {allSkills.length > 0 && (
        <FilterSection title="Skills" icon={Layers} defaultOpen={false}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {allSkills.slice(0, 20).map(s => (
              <button key={s} onClick={() => toggleSkill(s)} style={{
                fontSize: '0.68rem', padding: '0.2rem 0.55rem', borderRadius: 5, cursor: 'pointer',
                background: selSkills.includes(s) ? 'rgba(155,110,212,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${selSkills.includes(s) ? 'rgba(155,110,212,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: selSkills.includes(s) ? '#C4B5FD' : sub,
                transition: 'all 0.15s',
              }}>{s}</button>
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: "'Rajdhani', sans-serif" }}>

      {/* ── Top Nav ──────────────────────────────────────────── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: light ? 'rgba(241,245,249,0.97)' : 'rgba(6,13,26,0.97)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 1.25rem', height: 52, gap: '1rem' }}>
          {/* Back */}
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.68rem', letterSpacing: '0.1em', color: '#9B6ED4', padding: 0, flexShrink: 0 }}>
            <ChevronLeft size={14} /> Jobs
          </button>

          <div style={{ flex: 1 }} />

          {/* Right actions */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
            {/* Mobile filter toggle */}
            <button onClick={() => setMobileFilter(m => !m)} className="jobs-filter-btn" style={{ display: 'none', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.7rem', borderRadius: 7, border: `1px solid ${border}`, background: activeFilterCount > 0 ? 'rgba(155,110,212,0.1)' : 'transparent', color: activeFilterCount > 0 ? '#C4B5FD' : sub, cursor: 'pointer', fontSize: '0.7rem', fontFamily: "'Share Tech Mono', monospace" }}>
              <Filter size={12} /> {activeFilterCount > 0 ? activeFilterCount : ''}
            </button>
            <button onClick={tog} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
              {light ? <Moon size={13} /> : <Sun size={13} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', maxWidth: 1280, margin: '0 auto' }}>

          {/* Left Sidebar */}
          <aside style={{
            width: 264, flexShrink: 0,
            borderRight: `1px solid ${border}`,
            padding: '1.25rem',
            minHeight: 'calc(100vh - 52px)',
            position: 'sticky', top: 52,
            maxHeight: 'calc(100vh - 52px)',
            overflowY: 'auto',
            background: sidebarBg,
            display: 'flex', flexDirection: 'column',
          }} className="jobs-sidebar">
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#64748B', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Filter Walk-Ins
            </div>
            {sidebarJsx}
          </aside>

          {/* Main content */}
          <main style={{ flex: 1, minWidth: 0, padding: '1.5rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', letterSpacing: '-0.01em', margin: '0 0 0.3rem', color: text }}>
                  Walk-In Interviews
                </h1>
                <p style={{ fontSize: '0.82rem', color: sub, margin: 0 }}>
                  {loading ? 'Loading…' : `${filtered.length} active walk-in${filtered.length !== 1 ? 's' : ''}${activeFilterCount > 0 ? ' (filtered)' : ''} across India`}
                </p>
              </div>
              <button onClick={() => {
                  if (!user) { navigate('/login?redirect=/walk-ins') } else { setShowModal(true) }
                }} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: 'linear-gradient(135deg,#7C3AED,#9B6ED4)', border: 'none',
                  borderRadius: 10, padding: '0.65rem 1.25rem', color: '#fff',
                  fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                  fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.03em',
                  boxShadow: '0 0 20px rgba(155,110,212,0.3)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  flexShrink: 0,
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(155,110,212,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 20px rgba(155,110,212,0.3)' }}
                >
                  <Plus size={15} /> Post Walk-In
                </button>
            </div>

            {/* Mobile filter bar */}
            {mobileFilter && (
              <div style={{ background: sidebarBg, border: `1px solid ${border}`, borderRadius: 12, padding: '1rem', marginBottom: '1.25rem' }} className="jobs-mobile-filters">
                {sidebarJsx}
              </div>
            )}

            {/* Community note */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 10, background: light ? 'rgba(155,110,212,0.06)' : 'rgba(155,110,212,0.08)', border: '1px solid rgba(155,110,212,0.18)', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🤝</span>
              <p style={{ margin: 0, fontSize: '0.8rem', color: light ? '#5B21B6' : '#C4B5FD', lineHeight: 1.65 }}>
                <strong>This is a community board.</strong> Students post walk-in opportunities to help each other. If you know of a walk-in interview happening near you, post it here — your one post could change someone's career. Please share only accurate and verified information.
              </p>
            </div>

            {/* Content */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: sub }}>Loading walk-ins...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: text, marginBottom: '0.5rem' }}>No walk-ins found</div>
                <p style={{ color: sub, fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {activeFilterCount > 0 ? 'Try clearing some filters.' : user && user.role !== 'GUEST' ? 'Be the first to post!' : 'Check back soon.'}
                </p>
                {activeFilterCount > 0 && <button onClick={clearAll} style={{ padding: '0.6rem 1.25rem', borderRadius: 8, border: '1px solid rgba(155,110,212,0.3)', background: 'rgba(155,110,212,0.08)', color: '#C4B5FD', cursor: 'pointer', fontFamily: 'inherit' }}>Clear Filters</button>}
              </div>
            ) : (
              <div>
                {/* Today */}
                {todayJobs.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
                      <div style={{ width: 3, height: 18, borderRadius: 2, background: '#4ADE80' }} />
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', color: '#4ADE80' }}>TODAY'S WALK-INS</span>
                      <span style={{ fontSize: '0.62rem', background: 'rgba(74,222,128,0.12)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 999, padding: '0.05rem 0.45rem' }}>{todayJobs.length}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: '0.875rem' }}>
                      {todayJobs.map(j => <WalkInCard key={j.id} job={j} onDelete={handleDelete} userId={user?.id} isAdmin={user?.role === 'ADMIN'} light={light} />)}
                    </div>
                  </div>
                )}

                {/* Upcoming */}
                {upcomingJobs.length > 0 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
                      <div style={{ width: 3, height: 18, borderRadius: 2, background: '#9B6ED4' }} />
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', color: '#9B6ED4' }}>UPCOMING WALK-INS</span>
                      <span style={{ fontSize: '0.62rem', background: 'rgba(155,110,212,0.12)', color: '#C4B5FD', border: '1px solid rgba(155,110,212,0.2)', borderRadius: 999, padding: '0.05rem 0.45rem' }}>{upcomingJobs.length}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: '0.875rem' }}>
                      {upcomingJobs.map(j => <WalkInCard key={j.id} job={j} onDelete={handleDelete} userId={user?.id} isAdmin={user?.role === 'ADMIN'} light={light} />)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>

      {showModal && <PostModal onClose={() => setShowModal(false)} onSuccess={() => { setShowModal(false); load() }} light={light} />}
      <ScrollToTop />

      <style>{`
        @media (max-width: 768px) {
          .jobs-sidebar { display: none !important; }
          .jobs-filter-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
