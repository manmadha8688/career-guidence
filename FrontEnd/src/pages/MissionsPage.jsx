import { useState, useEffect } from 'react'
import { TEST_DELAY_MS } from '../components/loaders/_config'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Sun, Moon, Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import SmokeBladeLoader from '../components/loaders/SmokeBladeLoader'
import EnterArenaButton from '../components/EnterArenaButton'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { getMissions } from '../api/api'
import toast from 'react-hot-toast'

const EASE = [0.16, 1, 0.3, 1]

const RANK_META = {
  D: { color: '#22C55E', bg: 'rgba(34,197,94,0.12)', label: 'D-RANK' },
  C: { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', label: 'C-RANK' },
  B: { color: '#9B6ED4', bg: 'rgba(155,110,212,0.12)', label: 'B-RANK' },
  A: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', label: 'A-RANK' },
  S: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',  label: 'S-RANK' },
}

const TECH_COLORS = {
  Python:       { bg: '#3776AB22', color: '#60A5FA' },
  HTML:         { bg: '#E44D2622', color: '#FF7F2A' },
  CSS:          { bg: '#264DE422', color: '#7BA3FA' },
  JavaScript:   { bg: '#F7DF1E22', color: '#F7DF1E' },
  OOP:          { bg: '#10B98122', color: '#34D399' },
  JSON:         { bg: '#9B6ED422', color: '#C084FC' },
  'File I/O':   { bg: '#F59E0B22', color: '#FCD34D' },
  API:          { bg: '#EF444422', color: '#FCA5A5' },
  DOM:          { bg: '#60A5FA22', color: '#93C5FD' },
  localStorage: { bg: '#4ADE8022', color: '#86EFAC' },
  BOM:          { bg: '#FB923C22', color: '#FDBA74' },
  threading:    { bg: '#A78BFA22', color: '#C4B5FD' },
  requests:     { bg: '#34D39922', color: '#6EE7B7' },
  CSV:          { bg: '#F59E0B22', color: '#FCD34D' },
  collections:  { bg: '#9B6ED422', color: '#C084FC' },
}

// Why missions matter in the AI era — short value props for the hero
const WHY_MISSIONS = [
  { icon: '🤖', color: '#60A5FA', title: 'AI writes the code', text: 'Anyone can vibe-code now. A mission proves that you actually understand what the code is doing.' },
  { icon: '🐛', color: '#F59E0B', title: 'Real bugs to fix', text: 'Break it, debug it, repair it — the messy real-world work that actual jobs are built on.' },
  { icon: '🚀', color: '#22C55E', title: 'Resume-ready proof', text: 'Every mission is a real project you can ship, show, and confidently talk about in interviews.' },
]

// Briefing tabs — one per mission type, data-driven
const BRIEFINGS = [
  { key: '',           icon: '⚡', color: '#FF7F2A', title: 'All Missions',     line: 'The full contract board' },
  { key: 'subject',    icon: '📘', color: '#22C55E', title: 'Subject Practice', line: 'Drill one skill on a real build' },
  { key: 'role_based', icon: '💼', color: '#F59E0B', title: 'Role-Based',       line: 'Take-home briefs for real job roles' },
  { key: 'academic',   icon: '🎓', color: '#60A5FA', title: 'Academic',         line: 'Final-year & viva-ready projects' },
]

export default function MissionsPage() {
  const [missions, setMissions]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('')
  const [category, setCategory]   = useState('')
  const [subFilter, setSubFilter] = useState('')
  const { user }                  = useAuth()
  const { theme, toggleTheme }    = useTheme()
  const light                     = theme === 'light'
  const navigate                  = useNavigate()
  const [searchParams]            = useSearchParams()

  useEffect(() => {
    const subjectFromUrl  = searchParams.get('subjectTitle')
    const categoryFromUrl = searchParams.get('category')
    if (subjectFromUrl) {
      setCategory('subject')
      setSubFilter(subjectFromUrl)
    } else if (categoryFromUrl === 'role_based') {
      setCategory('role_based')
    }
  }, [searchParams])

  useEffect(() => {
    getMissions()
      .then(r => setMissions(r.data))
      .catch(() => toast.error('Failed to load missions. Please refresh.'))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }, [])

  const subjectOptions = [...new Set(
    missions.filter(m => m.category === 'SUBJECT_PRACTICE').flatMap(m => m.subjectTitles || [])
  )].sort()
  const roleOptions = [...new Set(
    missions.filter(m => m.category === 'ROLE_BASED').flatMap(m => m.targetRoles || [])
  )].sort()

  const handleCategoryChange = (val) => {
    setCategory(val)
    setSubFilter('')
  }

  const byCategoryAndSearch = missions.filter(m => {
    if (category === 'subject')
      return m.category === 'SUBJECT_PRACTICE' && (!subFilter || m.subjectTitles?.includes(subFilter))
    if (category === 'academic')    return m.category === 'ACADEMIC'
    if (category === 'role_based')
      return m.category === 'ROLE_BASED' && (!subFilter || m.targetRoles?.includes(subFilter))
    return true
  })

  const filtered = filter.trim() === ''
    ? byCategoryAndSearch
    : byCategoryAndSearch.filter(m => {
        const q = filter.toLowerCase()
        return (
          m.title?.toLowerCase().includes(q) ||
          m.subjectTitles?.some(s => s.toLowerCase().includes(q)) ||
          m.techStack?.some(t => t.toLowerCase().includes(q)) ||
          m.rank?.toLowerCase().includes(q)
        )
      })

  const chipOptions = category === 'subject' ? subjectOptions : category === 'role_based' ? roleOptions : []

  const handleCardClick = (id) => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/missions/${id}`)}`)
      return
    }
    navigate(`/missions/${id}`)
  }

  return (
    <div className="missions-page">

      <div className="missions-nav">
        <button type="button" onClick={() => navigate('/')} className="missions-nav__brand">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          LearnToEarn
        </button>

        <div className="missions-nav__actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="missions-nav__theme"
            aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <EnterArenaButton />
        </div>
      </div>

      {/* ── Hero — copy left, connected value nodes right (full-width) ─── */}
      <section className="mb-hero mb-hero--split">
        <div className="mb-hero__bg" aria-hidden="true">
          <div className="mb-hero__grid" />
        </div>

        <div className="mb-hero__inner">
          <motion.div
            className="mb-hero__copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="mb-hero__eyebrow">
              <span className="mb-hero__eyebrow-dot" />
              REAL PROJECT MISSIONS
            </div>
            <h1 className="mb-hero__title">
              Stop collecting tutorials.
              <span className="mission-title-grad mb-hero__title-line2">Start shipping real projects.</span>
            </h1>
            <p className="mb-hero__sub">
              In the AI era, anyone can generate code. What gets you hired is proving you can
              {' '}<strong>understand it, fix what breaks, and ship something real.</strong>{' '}
              Missions give you that experience — one real-world project at a time.
            </p>
            <div className="mb-hero__hint">↓ Pick a mission type to begin</div>
          </motion.div>

          <div className="mb-hero__props">
            <span className="mb-hero__flow" aria-hidden="true">
              <span className="mb-hero__flow-pulse" />
            </span>
            {WHY_MISSIONS.map((w, i) => (
              <motion.div
                key={w.title}
                className="mb-hero__node"
                style={{ '--prop-color': w.color }}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.13, ease: EASE }}
              >
                <span className="mb-hero__node-marker" aria-hidden="true">{w.icon}</span>
                <span className="mb-hero__node-body">
                  <span className="mb-hero__node-title">{w.title}</span>
                  <span className="mb-hero__node-text">{w.text}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter toolbar — type + sub-filter + search, one row ───────── */}
      <div className="mb-toolbar">
        <div className="mb-toolbar__bar">
          <span className="mb-toolbar__icon" aria-hidden="true"><SlidersHorizontal size={15} /></span>

          <label className="mb-select">
            <span className="mb-select__label">Type</span>
            <div className="mb-select__control">
              <select
                value={category}
                onChange={e => handleCategoryChange(e.target.value)}
                className="mb-select__input"
              >
                {BRIEFINGS.map(b => (
                  <option key={b.key} value={b.key}>{b.title}</option>
                ))}
              </select>
              <ChevronDown size={15} className="mb-select__chev" />
            </div>
          </label>

          {chipOptions.length > 0 && (
            <label className="mb-select">
              <span className="mb-select__label">{category === 'subject' ? 'Subject' : 'Role'}</span>
              <div className="mb-select__control">
                <select
                  value={subFilter}
                  onChange={e => setSubFilter(e.target.value)}
                  className="mb-select__input"
                >
                  <option value="">All {category === 'subject' ? 'Subjects' : 'Roles'}</option>
                  {chipOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={15} className="mb-select__chev" />
              </div>
            </label>
          )}

          <div className="mb-search">
            <Search size={15} className="mb-search__icon" />
            <input
              type="text"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Search title, subject, tech…"
              className="mb-search__input"
            />
            {filter && (
              <button type="button" onClick={() => setFilter('')} className="mb-search__clear" aria-label="Clear search">
                <X size={13} />
              </button>
            )}
          </div>

          <span className="mb-count">
            <strong>{filtered.length}</strong> mission{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Dossier grid ────────────────────────────────────────────────── */}
      <div className="missions-container">
        {loading ? (
          <SmokeBladeLoader inline />
        ) : filtered.length === 0 ? (
          <div className="mb-empty">
            <div className="mb-empty__icon">🗂</div>
            <div className="mb-empty__title">No missions match</div>
            <div className="mb-empty__hint">Try a different type, subject, or search term</div>
            <button
              type="button"
              onClick={() => { setCategory(''); setSubFilter(''); setFilter('') }}
              className="mb-empty__btn"
            >
              Show all missions
            </button>
          </div>
        ) : (
          <div className="mb-grid">
            {filtered.map((mission, i) => (
              <MissionDossier
                key={mission.id}
                mission={mission}
                index={i}
                onClick={() => handleCardClick(mission.id)}
              />
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="missions-footer">
            ◆ {filtered.length} MISSION{filtered.length !== 1 ? 'S' : ''} AVAILABLE · MORE COMING SOON ◆
          </div>
        )}
      </div>
    </div>
  )
}

function MissionDossier({ mission, index, onClick }) {
  const m = RANK_META[mission.rank] || RANK_META['D']
  const objectives = mission.objectives?.length || 0

  return (
    <motion.button
      type="button"
      className="mb-card"
      onClick={onClick}
      style={{ '--rank-color': m.color, '--rank-bg': m.bg }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: EASE }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="mb-card__shine" aria-hidden="true" />

      <div className="mb-card__top">
        <span className="mb-card__stamp">{mission.rank}</span>
        <span className="mb-card__meta">
          <span className="mb-card__rank-label">{m.label}</span>
          <span className="mb-card__hours">⏱ {mission.estimatedHours}h build</span>
        </span>
      </div>

      <h3 className="mb-card__title">{mission.title}</h3>
      <p className="mb-card__brief">{mission.missionBrief}</p>

      <div className="mb-card__tags">
        {mission.techStack?.slice(0, 4).map(t => {
          const tc = TECH_COLORS[t] || { bg: 'rgba(255,127,42,0.1)', color: '#FF7F2A' }
          return (
            <span key={t} className="mb-card__tag" style={{ '--tag-bg': tc.bg, '--tag-color': tc.color }}>
              {t}
            </span>
          )
        })}
      </div>

      <div className="mb-card__foot">
        <span className="mb-card__objectives">
          {objectives > 0 ? `◇ ${objectives} objectives` : '◇ full brief inside'}
        </span>
        <span className="mb-card__accept">ACCEPT MISSION →</span>
      </div>
    </motion.button>
  )
}
