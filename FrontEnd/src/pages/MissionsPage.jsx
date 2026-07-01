import { useState, useEffect } from 'react'
import { TEST_DELAY_MS } from '../components/loaders/_config'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import SmokeBladeLoader from '../components/loaders/SmokeBladeLoader'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { getMissions } from '../api/api'
import toast from 'react-hot-toast'

const RANK_META = {
  D: { color: '#22C55E', bg: 'rgba(34,197,94,0.12)', label: 'D-RANK', desc: 'Academy Level' },
  C: { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', label: 'C-RANK', desc: 'Genin Level' },
  B: { color: '#9B6ED4', bg: 'rgba(155,110,212,0.12)', label: 'B-RANK', desc: 'Chunin Level' },
  A: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', label: 'A-RANK', desc: 'Jonin Level' },
  S: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',  label: 'S-RANK', desc: 'Kage Level' },
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
            title={light ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <button
            type="button"
            onClick={() => navigate(user ? '/skill-arena/dashboard' : '/login?redirect=/skill-arena/dashboard')}
            className="missions-nav__arena"
          >
            ⚔ <span className="mission-arena-label">SKILL ARENA</span>
          </button>
        </div>
      </div>

      <div className="missions-hero">
        <h1 className="mission-title-grad missions-hero__title">MISSION BOARD</h1>
        <p className="missions-hero__sub">Accept your mission. Prove your worth. Build your legacy.</p>
      </div>

      <div className="missions-filters-wrap">
        <div className="missions-filters-label">
          <span className="missions-filters-label__text">◈ FILTER MISSIONS</span>
          <div className="missions-filters-label__line" />
          {(category || subFilter || filter) && (
            <span className="missions-filters-label__count">
              {filtered.length} FOUND
            </span>
          )}
        </div>

        <div className="missions-filters-panel">
          <MissionSelect value={category} onChange={e => handleCategoryChange(e.target.value)} active={!!category}>
            <option value="">All Project Types</option>
            <option value="subject">Subject Practice</option>
            <option value="academic">Academic Projects</option>
            <option value="role_based">Role Based Projects</option>
          </MissionSelect>

          <MissionSelect
            value={subFilter}
            onChange={e => setSubFilter(e.target.value)}
            active={!!subFilter}
            disabled={!category || (category !== 'subject' && category !== 'role_based')}
            accentColor={category === 'role_based' ? 'rgba(245,158,11,0.5)' : 'rgba(34,197,94,0.5)'}
          >
            {!category || (category !== 'subject' && category !== 'role_based')
              ? <option value="">— Select Type First —</option>
              : category === 'subject'
                ? <>
                    <option value="">All Subjects</option>
                    {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </>
                : <>
                    <option value="">All Roles</option>
                    {roleOptions.map(r => <option key={r} value={r}>{r}</option>)}
                  </>
            }
          </MissionSelect>

          <div className="missions-filters-divider" />

          <div className="missions-search-wrap">
            <svg className="missions-search-icon" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Search title, subject, tech..."
              className={`missions-search-input${filter ? ' is-active' : ''}`}
            />
            {filter && (
              <button type="button" onClick={() => setFilter('')} className="missions-search-clear" aria-label="Clear search">✕</button>
            )}
          </div>

          {(category || subFilter || filter) && (
            <button
              type="button"
              onClick={() => { setCategory(''); setSubFilter(''); setFilter('') }}
              className="missions-clear-btn"
            >
              ✕ CLEAR
            </button>
          )}
        </div>

        <div className="missions-result-hint">
          {(category || filter)
            ? `${filtered.length} MISSION${filtered.length !== 1 ? 'S' : ''} FOUND`
            : `${missions.length} MISSIONS AVAILABLE`
          }
        </div>
      </div>

      <div className="missions-container">
        {loading ? (
          <SmokeBladeLoader inline />
        ) : filtered.length === 0 ? (
          <div className="missions-empty">
            NO MISSIONS FOUND
          </div>
        ) : (
          <div className="missions-grid">
            {filtered.map((mission, i) => (
              <MissionCard
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

function MissionSelect({ value, onChange, active, accentColor, disabled, children }) {
  const wrapStyle = accentColor ? { '--select-accent': accentColor } : undefined

  return (
    <div className="mission-select-wrap" style={wrapStyle}>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mission-select${active ? ' is-active' : ''}`}
      >
        {children}
      </select>
      <span className="mission-select__chev" aria-hidden="true">▾</span>
    </div>
  )
}

function MissionCard({ mission, index, onClick }) {
  const m = RANK_META[mission.rank] || RANK_META['D']

  return (
    <div
      className="mission-card"
      onClick={onClick}
      style={{
        '--rank-color': m.color,
        '--rank-bg': m.bg,
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <div className="mission-card__header">
        <div className="rank-stamp mission-card__rank">
          {mission.rank}-RANK
        </div>
        <div className="mission-card__hours">
          ⏱ {mission.estimatedHours}h
        </div>
      </div>

      <h3 className="mission-card__title">
        {mission.title}
      </h3>

      <p className="mission-card__brief">
        {mission.missionBrief}
      </p>

      <div className="mission-card__tags">
        {mission.techStack?.slice(0, 4).map(t => {
          const tc = TECH_COLORS[t] || { bg: 'rgba(255,127,42,0.1)', color: '#FF7F2A' }
          return (
            <span
              key={t}
              className="mission-card__tag"
              style={{ '--tag-bg': tc.bg, '--tag-color': tc.color }}
            >
              {t}
            </span>
          )
        })}
      </div>

      {mission.subjectTitles?.length > 0 && (
        <div className="mission-card__subjects">
          {mission.subjectTitles.slice(0, 3).map(s => (
            <span key={s} className="mission-card__subject">
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mission-card__corner">
        <div className="mission-card__corner-inner" />
      </div>
    </div>
  )
}
