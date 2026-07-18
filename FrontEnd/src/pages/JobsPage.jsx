import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/navbars/Navbar'
import {
  MapPin, Clock, Plus, X, Search,
  ChevronDown, ChevronUp,
  Filter, RefreshCw, Calendar, Layers
} from 'lucide-react'
import { getWalkIns, postWalkIn, removeWalkIn } from '../api/api'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { getApiError } from '../utils/apiError'
import { deleteWalkInConfirmOptions } from '../utils/confirmRemoveLink'
import { useConfirm } from '../context/ConfirmContext'
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
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr); d.setHours(0, 0, 0, 0)
  return Math.round((d - today) / 86400000)
}
function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function FilterSection({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`jobs-filter-section${open ? ' is-open' : ''}`}>
      <button type="button" onClick={() => setOpen(o => !o)} className="jobs-filter-section__toggle">
        <span className="jobs-filter-section__title">
          {Icon && <Icon size={13} className="jobs-filter-section__icon" />} {title}
        </span>
        {open ? <ChevronUp size={13} className="jobs-filter-section__chev" /> : <ChevronDown size={13} className="jobs-filter-section__chev" />}
      </button>
      {open && <div className="jobs-filter-section__body">{children}</div>}
    </div>
  )
}

function WalkInCard({ job, onDelete, isAdmin, index = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const days = daysUntil(job.walkInDate)
  const canDelete = isAdmin || job.mine

  const dateBadge = days === 0
    ? { bg: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: 'rgba(74,222,128,0.3)', label: 'TODAY' }
    : days === 1
    ? { bg: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: 'rgba(245,158,11,0.3)', label: 'TOMORROW' }
    : days <= 3
    ? { bg: 'rgba(251,146,60,0.12)', color: '#FB923C', border: 'rgba(251,146,60,0.25)', label: `IN ${days} DAYS` }
    : { bg: 'rgba(148,163,184,0.08)', color: '#94A3B8', border: 'rgba(148,163,184,0.15)', label: fmtDate(job.walkInDate) }

  return (
    <motion.div
      className="jobs-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="jobs-card__accent" />
      <div className="jobs-card__body">
        <div className="jobs-card__header">
          <div className="jobs-card__info">
            <div className="jobs-card__company">{job.companyName}</div>
            <div className="jobs-card__role">{job.role}</div>
          </div>
          <span
            className="jobs-card__badge"
            style={{ '--badge-bg': dateBadge.bg, '--badge-color': dateBadge.color, '--badge-border': dateBadge.border }}
          >
            {dateBadge.label}
          </span>
        </div>

        <div className="jobs-card__meta">
          <span className="jobs-card__meta-item">
            <MapPin size={11} /> {job.city}{job.location ? `, ${job.location}` : ''}
          </span>
          {job.walkInTime && (
            <span className="jobs-card__meta-item">
              <Clock size={11} /> {job.walkInTime}
            </span>
          )}
        </div>

        {(job.skills || []).length > 0 && (
          <div className="jobs-card__skills">
            {job.skills.map(s => (
              <span key={s} className="jobs-card__skill">{s}</span>
            ))}
          </div>
        )}

        {expanded && (
          <div className="jobs-card__expanded">
            {job.description && <p className="jobs-card__desc">{job.description}</p>}
            {job.contactInfo && <div className="jobs-card__contact">📞 {job.contactInfo}</div>}
          </div>
        )}

        <div className="jobs-card__footer">
          <div className="jobs-card__posted">by {job.postedBy}</div>
          <div className="jobs-card__actions">
            <button type="button" onClick={() => setExpanded(e => !e)} className="jobs-card__toggle">
              {expanded ? '↑ Less' : '↓ More'}
            </button>
            {canDelete && (
              <button type="button" onClick={() => onDelete(job.id)} className="jobs-card__delete" aria-label="Delete walk-in">
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PostModal({ onClose, onSuccess }) {
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
    } catch (e) { toast.error(getApiError(e, 'We could not post this walk-in. Please try again.')) }
    finally { setSaving(false) }
  }

  return (
    <div className="jobs-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()} role="presentation">
      <div className="jobs-modal" role="dialog" aria-labelledby="post-walkin-title">
        <div className="jobs-modal__header">
          <div>
            <div id="post-walkin-title" className="jobs-modal__title">POST WALK-IN</div>
            <div className="jobs-modal__sub">Help fellow students find opportunities</div>
          </div>
          <button type="button" onClick={onClose} className="jobs-modal__close" aria-label="Close"><X size={18} /></button>
        </div>

        <div className="jobs-modal__grid">
          <div className="jobs-modal__full">
            <label className="jobs-form-label">Company Name *</label>
            <input className="jobs-form-input" placeholder="e.g. TCS, Wipro, Infosys" value={form.companyName} onChange={e => set('companyName', e.target.value)} />
          </div>
          <div className="jobs-modal__full">
            <label className="jobs-form-label">Job Role *</label>
            <input className="jobs-form-input" placeholder="e.g. Java Developer, QA Engineer" value={form.role} onChange={e => set('role', e.target.value)} />
          </div>
          <div>
            <label className="jobs-form-label">Walk-in Date *</label>
            <input type="date" min={today} className="jobs-form-input" value={form.walkInDate} onChange={e => set('walkInDate', e.target.value)} />
          </div>
          <div>
            <label className="jobs-form-label">Walk-in Time</label>
            <input className="jobs-form-input" placeholder="10 AM – 2 PM" value={form.walkInTime} onChange={e => set('walkInTime', e.target.value)} />
          </div>
          <div>
            <label className="jobs-form-label">City *</label>
            <select className="jobs-form-input" value={form.city} onChange={e => set('city', e.target.value)}>
              <option value="">Select city</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="jobs-form-label">Venue / Area</label>
            <input className="jobs-form-input" placeholder="Address or area name" value={form.location} onChange={e => set('location', e.target.value)} />
          </div>
          <div className="jobs-modal__full">
            <label className="jobs-form-label">Required Skills</label>
            <div className="jobs-skill-row">
              <input
                className="jobs-form-input jobs-form-input--flex"
                placeholder="Type a skill, press Enter"
                value={form.skillInput}
                onChange={e => set('skillInput', e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }}
              />
              <button type="button" onClick={addSkill} className="jobs-skill-add">Add</button>
            </div>
            {skills.length > 0 && (
              <div className="jobs-skill-tags">
                {skills.map(s => (
                  <span key={s} onClick={() => setSkills(sk => sk.filter(x => x !== s))} className="jobs-skill-tag" role="button" tabIndex={0}>{s} ✕</span>
                ))}
              </div>
            )}
          </div>
          <div className="jobs-modal__full">
            <label className="jobs-form-label">Contact Info</label>
            <input className="jobs-form-input" placeholder="Email or phone (optional)" value={form.contactInfo} onChange={e => set('contactInfo', e.target.value)} />
          </div>
          <div className="jobs-modal__full">
            <label className="jobs-form-label">Additional Details</label>
            <textarea rows={3} className="jobs-form-input jobs-form-input--textarea" placeholder="Eligibility, salary, what to bring..." value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
        </div>

        <div className="jobs-modal__footer">
          <div className="jobs-modal__trust">
            <p>
              🤝 <strong>Post only real, verified walk-ins.</strong> Your post helps fellow students get opportunities — inaccurate info wastes their time and effort. Let's build a community that genuinely helps each other.
            </p>
          </div>
          <button type="button" onClick={onClose} className="jobs-modal__cancel">Cancel</button>
          <button type="button" onClick={submit} disabled={saving} className="jobs-modal__submit">
            {saving ? 'Posting…' : 'Post Walk-In'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function JobsComingSoon() {
  return (
    <div className="jobs-coming-soon">
      <div className="jobs-coming-soon__icon">🚀</div>
      <div className="jobs-coming-soon__title">COMING SOON</div>
      <p className="jobs-coming-soon__text">
        Full job listings — fresher roles, internships, and campus drives — are on the way. Walk-in updates are live now!
      </p>
    </div>
  )
}

export default function JobsPage() {
  const { user } = useAuth()
  const confirm = useConfirm()
  const navigate = useNavigate()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [mobileFilter, setMobileFilter] = useState(false)

  const [search, setSearch] = useState('')
  const [selCities, setSelCities] = useState([])
  const [selDate, setSelDate] = useState('all')
  const [selSkills, setSelSkills] = useState([])

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await getWalkIns()
      setJobs(data)
    } catch (err) { toast.error(getApiError(err, 'We could not load walk-ins. Please refresh.')) }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!(await confirm(deleteWalkInConfirmOptions()))) return
    try {
      await removeWalkIn(id)
      toast.success('Deleted'); load()
    } catch (err) { toast.error(getApiError(err, 'We could not delete this walk-in. Please try again.')) }
  }

  const toggleCity = (c) => setSelCities(s => s.includes(c) ? s.filter(x => x !== c) : [...s, c])
  const toggleSkill = (s) => setSelSkills(sk => sk.includes(s) ? sk.filter(x => x !== s) : [...sk, s])
  const clearAll = () => { setSearch(''); setSelCities([]); setSelDate('all'); setSelSkills([]) }
  const activeFilterCount = selCities.length + (selDate !== 'all' ? 1 : 0) + selSkills.length

  const allSkills = [...new Set(jobs.flatMap(j => j.skills || []))]

  const filtered = jobs.filter(j => {
    if (search && !j.companyName.toLowerCase().includes(search.toLowerCase()) && !j.role.toLowerCase().includes(search.toLowerCase()) && !(j.skills || []).some(s => s.toLowerCase().includes(search.toLowerCase()))) return false
    if (selCities.length > 0 && !selCities.includes(j.city)) return false
    if (selDate !== 'all') { const d = daysUntil(j.walkInDate); if (selDate === '0' && d !== 0) return false; if (selDate === '1' && d !== 1) return false; if (selDate === '3' && d > 3) return false; if (selDate === '7' && d > 7) return false }
    if (selSkills.length > 0 && !selSkills.some(s => (j.skills || []).includes(s))) return false
    return true
  })

  const todayJobs = filtered.filter(j => daysUntil(j.walkInDate) === 0)
  const upcomingJobs = filtered.filter(j => daysUntil(j.walkInDate) > 0)

  // The search lives in a sticky sidebar, so after scrolling the list a search
  // can filter results that are now above the fold. Enter exits the field and —
  // only if the results have scrolled out of view above — scrolls back up to
  // them. Searching from the top (results already visible) doesn't move.
  const resultsRef = useRef(null)
  const handleSearchEnter = (e) => {
    if (!(e.key === 'Enter' || e.keyCode === 13) || search.trim() === '') return
    e.preventDefault()
    e.currentTarget.blur()
    const el = resultsRef.current
    if (!el) return
    const NAV_OFFSET = 80 // sticky navbar band
    const rectTop = el.getBoundingClientRect().top
    if (rectTop < NAV_OFFSET) {
      const top = rectTop + window.scrollY - NAV_OFFSET
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
    }
  }

  const sidebarJsx = (
    <div className="jobs-filters">
      {activeFilterCount > 0 && (
        <div className="jobs-active-filters">
          <span className="jobs-active-filters__count">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
          <button type="button" onClick={clearAll} className="jobs-active-filters__clear">
            <RefreshCw size={10} /> Clear all
          </button>
        </div>
      )}

      <FilterSection title="Search" icon={Search}>
        <div className="jobs-search-wrap">
          <Search size={12} className="jobs-search-icon" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearchEnter}
            placeholder="Company, role or skill..."
            className="jobs-search-input"
          />
        </div>
      </FilterSection>

      <FilterSection title="Walk-In Date" icon={Calendar}>
        <div className="jobs-filter-options">
          {DATE_OPTS.map(opt => (
            <label key={opt.value} className="jobs-filter-option">
              <input type="radio" name="date" checked={selDate === opt.value} onChange={() => setSelDate(opt.value)} />
              <span className={`jobs-filter-option__label${selDate === opt.value ? ' is-selected' : ''}`}>{opt.label}</span>
              {opt.value === '0' && jobs.filter(j => daysUntil(j.walkInDate) === 0).length > 0 && (
                <span className="jobs-filter-option__badge">
                  {jobs.filter(j => daysUntil(j.walkInDate) === 0).length}
                </span>
              )}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Location" icon={MapPin}>
        <div className="jobs-filter-options">
          {CITIES.filter(c => jobs.some(j => j.city === c)).map(c => {
            const count = jobs.filter(j => j.city === c).length
            return (
              <label key={c} className="jobs-filter-option">
                <input type="checkbox" checked={selCities.includes(c)} onChange={() => toggleCity(c)} />
                <span className={`jobs-filter-option__label jobs-filter-option__label--flex${selCities.includes(c) ? ' is-selected' : ''}`}>{c}</span>
                <span className="jobs-filter-option__count">{count}</span>
              </label>
            )
          })}
        </div>
      </FilterSection>

      {allSkills.length > 0 && (
        <FilterSection title="Skills" icon={Layers} defaultOpen={false}>
          <div className="jobs-skill-chips">
            {allSkills.slice(0, 20).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSkill(s)}
                className={`jobs-skill-chip${selSkills.includes(s) ? ' is-selected' : ''}`}
              >
                {s}
              </button>
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  )

  return (
    <div className="jobs-page">
      <Navbar sticky />

      <div className="jobs-body">
        <aside className="jobs-sidebar">
          <div className="jobs-sidebar__title">Filter Walk-Ins</div>
          {sidebarJsx}
        </aside>

        <main className="jobs-main" ref={resultsRef}>
          <div className="jobs-header">
            <div>
              <h1 className="jobs-header__title">Walk-In Interviews</h1>
              <p className="jobs-header__sub">
                {loading ? 'Loading…' : `${filtered.length} active walk-in${filtered.length !== 1 ? 's' : ''}${activeFilterCount > 0 ? ' (filtered)' : ''} across India`}
              </p>
            </div>
            <div className="jobs-header__actions">
              <button
                type="button"
                onClick={() => setMobileFilter(m => !m)}
                className={`jobs-filter-btn${activeFilterCount > 0 ? ' is-active' : ''}`}
              >
                <Filter size={12} /> Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!user) { navigate('/login?redirect=/walk-ins') } else { setShowModal(true) }
                }}
                className="jobs-post-btn"
              >
                <Plus size={15} /> Post Walk-In
              </button>
            </div>
          </div>

          {mobileFilter && (
            <div className="jobs-mobile-filters">{sidebarJsx}</div>
          )}

          <div className="jobs-community-note">
            <span className="jobs-community-note__icon">🤝</span>
            <p className="jobs-community-note__text">
              <strong>This is a community board.</strong> Students post walk-in opportunities to help each other. If you know of a walk-in interview happening near you, post it here — your one post could change someone's career. Please share only accurate and verified information.
            </p>
          </div>

          {loading ? (
            <div className="jobs-loading">Loading walk-ins...</div>
          ) : filtered.length === 0 ? (
            <div className="jobs-empty">
              <div className="jobs-empty__icon">📋</div>
              <div className="jobs-empty__title">No walk-ins found</div>
              <p className="jobs-empty__sub">
                {activeFilterCount > 0 ? 'Try clearing some filters.' : user && user.role !== 'GUEST' ? 'Be the first to post!' : 'Check back soon.'}
              </p>
              {activeFilterCount > 0 && <button type="button" onClick={clearAll} className="jobs-clear-btn">Clear Filters</button>}
            </div>
          ) : (
            <div>
              {todayJobs.length > 0 && (
                <div className="jobs-section">
                  <div className="jobs-section__header">
                    <div className="jobs-section__bar jobs-section__bar--today" />
                    <span className="jobs-section__label jobs-section__label--today">TODAY'S WALK-INS</span>
                    <span className="jobs-section__count jobs-section__count--today">{todayJobs.length}</span>
                  </div>
                  <div className="jobs-grid">
                    {todayJobs.map((j, i) => (
                      <WalkInCard key={j.id} job={j} index={i} onDelete={handleDelete} isAdmin={user?.role === 'ADMIN'} />
                    ))}
                  </div>
                </div>
              )}

              {upcomingJobs.length > 0 && (
                <div className="jobs-section">
                  <div className="jobs-section__header">
                    <div className="jobs-section__bar jobs-section__bar--upcoming" />
                    <span className="jobs-section__label jobs-section__label--upcoming">UPCOMING WALK-INS</span>
                    <span className="jobs-section__count jobs-section__count--upcoming">{upcomingJobs.length}</span>
                  </div>
                  <div className="jobs-grid">
                    {upcomingJobs.map((j, i) => (
                      <WalkInCard key={j.id} job={j} index={i} onDelete={handleDelete} isAdmin={user?.role === 'ADMIN'} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {showModal && <PostModal onClose={() => setShowModal(false)} onSuccess={() => { setShowModal(false); load() }} />}
      <ScrollToTop />
    </div>
  )
}
