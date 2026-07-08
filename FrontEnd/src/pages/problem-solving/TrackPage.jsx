import { useState, useEffect, useMemo } from 'react'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Search, X, ChevronRight } from 'lucide-react'
import MatrixRainLoader from '../../components/loaders/MatrixRainLoader'
import EnterArenaButton from '../../components/EnterArenaButton'
import { useTheme } from '../../context/ThemeContext'
import { getProblems } from '../../api/api'
import blurOnEnter from '../../utils/blurOnEnter'

const SLUG_TO_TRACK = {
  'start-coding':    'START_CODING',
  'logic-building':  'LOGIC_BUILDING',
  'skill-up':        'SKILL_UP',
  'crack-it':        'CRACK_IT',
  'build-it':        'BUILD_IT',
  'prove-it':        'PROVE_IT',
}

// One place for track identity. Colors match the gate cards on the Code Gym page.
// Only Prove It (the final S-rank gate) uses red — everything else stays muted.
const TRACK_META = {
  START_CODING:    { title: 'Start Coding',   rank: 'E', color: '#9CA3AF' },
  LOGIC_BUILDING:  { title: 'Logic Building', rank: 'D', color: '#4ADE80' },
  SKILL_UP:        { title: 'Skill Up',       rank: 'C', color: '#60A5FA' },
  CRACK_IT:        { title: 'Crack It',       rank: 'B', color: '#9B6ED4' },
  BUILD_IT:        { title: 'Build It',       rank: 'A', color: '#F59E0B' },
  PROVE_IT:        { title: 'Prove It',       rank: 'S', color: '#EF4444' },
}

const LEVEL_META = {
  BEGINNER:     { label: 'Beginner',     color: '#4ADE80' },
  INTERMEDIATE: { label: 'Intermediate', color: '#F59E0B' },
  ADVANCED:     { label: 'Advanced',     color: '#C084FC' },
}

// Short, experience-based tip shown at the top of each track.
const TRACK_TIPS = {
  START_CODING:    'Type every example yourself — do not copy-paste. Your fingers need the practice, not just your eyes.',
  LOGIC_BUILDING:  'Stuck? Write one small example on paper first, then turn those steps into code.',
  SKILL_UP:        'Get a simple answer working first, then try to make it faster. Running code beats a perfect plan.',
  CRACK_IT:        'Read the question twice and write down every rule before you code. The thinking matters most.',
  BUILD_IT:        'Make it work first, then improve it. Be ready to explain why your better version is better.',
  PROVE_IT:        'List every rule and edge case on paper first. Real problems need every path covered — not just the easy case.',
}

const LEVEL_ORDER = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']

export default function TrackPage() {
  const location = useLocation()
  const slug     = location.pathname.split('/').filter(Boolean).pop()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  const track = SLUG_TO_TRACK[slug]
  const meta  = TRACK_META[track]

  const [questions, setQuestions] = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [level, setLevel]         = useState('All')
  const [topic, setTopic]         = useState('All')

  useEffect(() => {
    if (!track) { navigate('/problem-solving', { replace: true }); return }
    setLoading(true)
    setSearch('')
    setLevel('All')
    setTopic('All')
    getProblems(track)
      .then(r => setQuestions(r.data))
      .catch(() => setQuestions([]))
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [track])

  const levels = useMemo(() => {
    const present = new Set(questions.map(q => q.level).filter(Boolean))
    return ['All', ...LEVEL_ORDER.filter(l => present.has(l))]
  }, [questions])

  const topics = useMemo(() => {
    const s = new Set()
    questions.forEach(q => (q.topics || []).forEach(t => s.add(t)))
    return ['All', ...[...s].sort()]
  }, [questions])

  const filtered = useMemo(() => {
    let qs = questions
    if (search.trim()) {
      const q = search.toLowerCase()
      qs = qs.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        (p.topics || []).some(t => t.toLowerCase().includes(q))
      )
    }
    if (level !== 'All') qs = qs.filter(p => p.level === level)
    if (topic !== 'All') qs = qs.filter(p => (p.topics || []).includes(topic))
    return qs
  }, [questions, search, level, topic])

  const grouped = useMemo(() => {
    const map = new Map()
    filtered.forEach(q => {
      const cat = q.category || 'Problems'
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat).push(q)
    })
    return [...map.entries()]
  }, [filtered])

  if (!meta) return null

  const activeFilters = [
    level !== 'All' ? LEVEL_META[level]?.label : null,
    topic !== 'All' ? topic : null,
  ].filter(Boolean).join(' · ')

  return (
    <div className="ps-page" style={{ '--track-color': meta.color }}>
      <div className="ps-nav">
        <button type="button" onClick={() => navigate('/problem-solving')} className="ps-nav__back ps-nav__back--track">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          GATES
        </button>

        <span className="ps-nav-center ps-nav-center--track">
          <span className="ps-nav-rank" aria-hidden="true">{meta.rank}</span>
          {meta.title.toUpperCase()}
        </span>

        <div className="ps-nav__actions">
          <button type="button" onClick={toggleTheme} className="ps-nav__theme">
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <EnterArenaButton />
        </div>
      </div>

      {loading ? (
        <MatrixRainLoader accentColor={meta.color} fullPage label={`LOADING ${meta.title.toUpperCase()}`} />
      ) : (
        <div className="ps-view-container ps-view-container--narrow">
          <div className="ps-filter-row">
            <SearchBar value={search} onChange={setSearch} />
            {levels.length > 2 && (
              <FilterSelect
                label="Level"
                value={level}
                onChange={setLevel}
                options={levels}
                accentColor={meta.color}
                renderLabel={l => (l === 'All' ? 'All Levels' : LEVEL_META[l]?.label || l)}
              />
            )}
            {topics.length > 2 && (
              <FilterSelect
                label="Topic"
                value={topic}
                onChange={setTopic}
                options={topics}
                accentColor={meta.color}
              />
            )}
            {(level !== 'All' || topic !== 'All' || search) && (
              <button
                type="button"
                onClick={() => { setSearch(''); setLevel('All'); setTopic('All') }}
                className="ps-filter-clear"
              >
                ✕ CLEAR
              </button>
            )}
          </div>

          <div className="ps-result-wrap">
            <ResultCount count={filtered.length} filters={activeFilters || null} />
          </div>

          {track === 'START_CODING' && (
            <div className="ps-hint-banner">
              📌 Complete in order — each step builds on the last.
            </div>
          )}

          {TRACK_TIPS[track] && (
            <div className="ps-hint-banner ps-hint-banner--tip">
              💡 Tip: {TRACK_TIPS[track]}
            </div>
          )}

          {grouped.length === 0 ? <Empty /> : (
            grouped.map(([cat, qs]) => (
              <div key={cat} className="ps-category-group" style={{ '--track-color': meta.color }}>
                <div className="ps-category-label">{cat}</div>
                <div className="ps-problem-list">
                  {qs.map((q, i) => (
                    <ProblemCard key={q.id} problem={q} index={i}
                      onClick={() => navigate(`/problem-solving/${q.id}`)} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="ps-searchbar-wrap">
      <Search size={14} className="ps-searchbar-wrap__icon" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={blurOnEnter}
        placeholder={placeholder || 'Search problems...'}
        className="ps-searchbar-wrap__input"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} className="ps-searchbar-wrap__clear">
          <X size={13} />
        </button>
      )}
    </div>
  )
}

function FilterSelect({ label, value, onChange, options, accentColor, renderLabel }) {
  const active = value !== 'All'
  return (
    <div
      className={`ps-filter-select${active ? ' ps-filter-select--active' : ''}`}
      style={accentColor ? { '--accent-color': accentColor } : undefined}
    >
      {label && <span className="ps-filter-select__label">{label}</span>}
      <div className="ps-filter-select__wrap">
        <select value={value} onChange={e => onChange(e.target.value)} className="ps-filter-select__control">
          {options.map(opt => (
            <option key={opt} value={opt}>
              {renderLabel ? renderLabel(opt) : opt}
            </option>
          ))}
        </select>
        <span className="ps-filter-select__chevron">▾</span>
      </div>
    </div>
  )
}

function ProblemCard({ problem, index, onClick }) {
  const lm = LEVEL_META[problem.level] || LEVEL_META.BEGINNER
  return (
    <div onClick={onClick} className="ps-problem-card" style={{ '--lm-color': lm.color }}>
      <div className="ps-problem-card__index">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="ps-problem-card__body">
        <div className="ps-problem-card__title">{problem.title}</div>
        <div className="ps-problem-card__chips">
          <Chip color={lm.color}>{lm.label}</Chip>
          {(problem.topics || []).slice(0, 3).map(t => <Chip key={t}>{t}</Chip>)}
        </div>
      </div>
      <ChevronRight size={15} className="ps-problem-card__chevron" />
    </div>
  )
}

function Chip({ color, children }) {
  const hex = color?.startsWith('#')
  return (
    <span
      className={`ps-chip${hex ? '' : ' ps-chip--muted'}`}
      style={hex ? { '--badge-color': color } : undefined}
    >
      {children}
    </span>
  )
}

function Empty() {
  return <div className="ps-empty">NO PROBLEMS FOUND</div>
}

function ResultCount({ count, filters }) {
  return (
    <div className="ps-result-count">
      {count} PROBLEM{count !== 1 ? 'S' : ''}
      {filters && <span className="ps-result-count__filters"> · {filters}</span>}
    </div>
  )
}
