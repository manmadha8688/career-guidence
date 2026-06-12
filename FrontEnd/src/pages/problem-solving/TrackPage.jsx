import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Search, X, ChevronRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { getProblems } from '../../api/api'
import ReportButton from '../../components/ReportButton'

const SLUG_TO_TRACK = {
  'start-coding':    'START_CODING',
  'logic-building':  'LOGIC_BUILDING',
  'skill-up':        'SKILL_UP',
  'interview-prep':  'INTERVIEW_PREP',
  'scenario-coding': 'SCENARIO_CODING',
}
const TRACK_META = {
  START_CODING:    { title: 'Start Coding',    color: '#22C55E' },
  LOGIC_BUILDING:  { title: 'Logic Building',  color: '#F59E0B' },
  SKILL_UP:        { title: 'Skill Up',        color: '#0EA5E9' },
  INTERVIEW_PREP:  { title: 'Interview Prep',  color: '#EF4444' },
  SCENARIO_CODING: { title: 'Scenario Coding', color: '#8B5CF6' },
}
const LEVEL_META = {
  BEGINNER:     { label: 'Beginner',     color: '#22C55E' },
  INTERMEDIATE: { label: 'Intermediate', color: '#F59E0B' },
  ADVANCED:     { label: 'Advanced',     color: '#EF4444' },
}
const TYPE_META = {
  WRITE:      { label: 'Write Code',   color: '#0EA5E9' },
  PATTERN:    { label: 'Pattern',      color: '#A78BFA' },
  OUTPUT:     { label: 'Output Based', color: '#34D399' },
  DEBUG:      { label: 'Debug',        color: '#FB923C' },
  CONCEPTUAL: { label: 'Conceptual',   color: '#94A3B8' },
}

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

  // Logic Building — single topic dropdown
  const [logicTopic, setLogicTopic] = useState('All')

  // Skill Up — cascading category → topic
  const [skillCategory, setSkillCategory] = useState('All')
  const [skillTopic, setSkillTopic]       = useState('All')

  // Interview Prep — level filter
  const [interviewLevel, setInterviewLevel] = useState('All')

  useEffect(() => {
    if (!track) { navigate('/problem-solving', { replace: true }); return }
    setLoading(true)
    setSearch('')
    setLogicTopic('All')
    setSkillCategory('All')
    setSkillTopic('All')
    setInterviewLevel('All')
    getProblems(track)
      .then(r => setQuestions(r.data))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false))
  }, [track])

  // ── Derived filter options ──────────────────────────────────────────────────

  // Logic Building: unique topics across all questions
  const logicTopics = useMemo(() => {
    const s = new Set()
    questions.forEach(q => (q.topics || []).forEach(t => s.add(t)))
    return ['All', ...[...s].sort()]
  }, [questions])

  // Skill Up: unique categories
  const skillCategories = useMemo(() => {
    const s = new Set()
    questions.forEach(q => q.category && s.add(q.category))
    return ['All', ...[...s].sort()]
  }, [questions])

  // Skill Up: topics filtered by selected category
  const skillTopics = useMemo(() => {
    const base = skillCategory === 'All'
      ? questions
      : questions.filter(q => q.category === skillCategory)
    const s = new Set()
    base.forEach(q => (q.topics || []).forEach(t => s.add(t)))
    return ['All', ...[...s].sort()]
  }, [questions, skillCategory])

  // When category changes, reset topic
  const handleCategoryChange = (cat) => {
    setSkillCategory(cat)
    setSkillTopic('All')
  }

  // ── Filtered questions ──────────────────────────────────────────────────────
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

    if (track === 'LOGIC_BUILDING' && logicTopic !== 'All')
      qs = qs.filter(p => (p.topics || []).includes(logicTopic))

    if (track === 'SKILL_UP') {
      if (skillCategory !== 'All') qs = qs.filter(p => p.category === skillCategory)
      if (skillTopic !== 'All')    qs = qs.filter(p => (p.topics || []).includes(skillTopic))
    }

    if ((track === 'INTERVIEW_PREP' || track === 'SCENARIO_CODING') && interviewLevel !== 'All')
      qs = qs.filter(p => p.level === interviewLevel)

    return qs
  }, [questions, search, logicTopic, skillCategory, skillTopic, interviewLevel, track])

  if (!meta) return null

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', background: 'var(--ps-bg)', fontFamily: "'Rajdhani', sans-serif", color: 'var(--text-primary)' }}>

      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem', height: 52,
        background: 'var(--ps-nav-bg)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--ps-nav-border)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button onClick={() => navigate('/problem-solving')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
          fontSize: '0.72rem', letterSpacing: '0.1em',
          color: meta.color, padding: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          TRACKS
        </button>

        <span className="ps-nav-center" style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.12em', color: meta.color,
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}>
          {meta.title.toUpperCase()}
        </span>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={toggleTheme} style={{
            background: 'none', border: '1px solid var(--ps-nav-border)',
            borderRadius: 6, width: 32, height: 32, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ps-muted)',
          }}>
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button onClick={() => navigate('/skill-arena/dashboard')} style={{
            background: 'var(--ps-accent-dim)', border: '1px solid var(--ps-accent)55',
            borderRadius: 6, padding: '0.25rem 0.65rem', cursor: 'pointer',
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
            letterSpacing: '0.07em', color: 'var(--ps-accent)',
          }}>
            ⚔ SKILL ARENA
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 0' }}>
          <div style={{
            width: 36, height: 36,
            border: '3px solid var(--ps-accent-dim)', borderTopColor: meta.color,
            borderRadius: '50%', animation: 'spin 0.7s linear infinite',
          }} />
        </div>
      ) : track === 'SKILL_UP' ? (
        <SkillUpView
          questions={filtered}
          categories={skillCategories} selectedCategory={skillCategory} onCategoryChange={handleCategoryChange}
          topics={skillTopics}         selectedTopic={skillTopic}    onTopicChange={setSkillTopic}
          search={search} onSearch={setSearch}
          light={light} navigate={navigate}
        />
      ) : track === 'INTERVIEW_PREP' ? (
        <InterviewPrepView
          questions={filtered}
          level={interviewLevel} onLevelChange={setInterviewLevel}
          search={search} onSearch={setSearch}
          navigate={navigate}
        />
      ) : track === 'SCENARIO_CODING' ? (
        <ScenarioView
          questions={filtered}
          level={interviewLevel} onLevelChange={setInterviewLevel}
          search={search} onSearch={setSearch}
          light={light} navigate={navigate}
        />
      ) : (
        <LinearView
          track={track} questions={filtered}
          topics={track === 'LOGIC_BUILDING' ? logicTopics : null}
          selectedTopic={logicTopic} onTopicChange={setLogicTopic}
          search={search} onSearch={setSearch}
          light={light} navigate={navigate} meta={meta}
        />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .ps-nav-center { display: none !important; }
          .ps-view-container { padding: 0.875rem !important; }
          .ps-searchbar-wrap { flex: 1 1 100% !important; }
          .ps-filter-select { flex: 1 1 auto !important; min-width: 0 !important; }
          .ps-filter-select select { width: 100% !important; box-sizing: border-box !important; }
          .ps-filter-row { box-sizing: border-box !important; }
        }
      `}</style>
    </div>
  )
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="ps-searchbar-wrap" style={{ position: 'relative', flex: '1 1 160px', minWidth: 0 }}>
      <Search size={14} style={{
        position: 'absolute', left: '0.75rem', top: '50%',
        transform: 'translateY(-50%)', color: 'var(--ps-muted)', pointerEvents: 'none',
      }} />
      <input value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Search problems...'}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '0.55rem 2rem 0.55rem 2.2rem', borderRadius: 8,
          border: '1.5px solid var(--ps-card-border)',
          background: 'var(--ps-card-bg)', color: 'var(--text-primary)',
          fontFamily: "'Rajdhani', sans-serif", fontSize: '0.9rem', outline: 'none',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--ps-accent)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--ps-card-border)' }}
      />
      {value && (
        <button onClick={() => onChange('')} style={{
          position: 'absolute', right: '0.6rem', top: '50%',
          transform: 'translateY(-50%)', background: 'none', border: 'none',
          cursor: 'pointer', color: 'var(--ps-muted)', padding: 0,
        }}>
          <X size={13} />
        </button>
      )}
    </div>
  )
}

function FilterSelect({ label, value, onChange, options, accentColor, renderLabel }) {
  const active = value !== 'All'
  const color = accentColor || 'var(--ps-accent)'
  return (
    <div className="ps-filter-select" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {label && (
        <span style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem',
          letterSpacing: '0.1em', color: 'var(--ps-muted)', textTransform: 'uppercase',
        }}>
          {label}
        </span>
      )}
      <div style={{ position: 'relative' }}>
        <select value={value} onChange={e => onChange(e.target.value)} style={{
          background: active ? `${color}15` : 'var(--ps-card-bg)',
          border: `1.5px solid ${active ? color + '60' : 'var(--ps-card-border)'}`,
          borderRadius: 8,
          padding: '0.52rem 2rem 0.52rem 0.875rem',
          color: active ? color : 'var(--text-primary)',
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
          fontSize: '0.88rem', cursor: 'pointer', outline: 'none',
          appearance: 'none', WebkitAppearance: 'none',
          minWidth: 0, width: '100%', transition: 'all 0.15s',
        }}>
          {options.map(opt => (
            <option key={opt} value={opt} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
              {renderLabel ? renderLabel(opt) : opt}
            </option>
          ))}
        </select>
        <span style={{
          position: 'absolute', right: '0.65rem', top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
          color: active ? color : 'var(--ps-muted)',
          fontSize: '0.65rem', lineHeight: 1,
        }}>
          ▾
        </span>
      </div>
    </div>
  )
}

function ProblemCard({ problem, index, showIndex, onClick }) {
  const lm = LEVEL_META[problem.level] || LEVEL_META.BEGINNER
  const tm = TYPE_META[problem.type] || TYPE_META.WRITE
  return (
    <div onClick={onClick} style={{
      background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)',
      borderLeft: `3px solid ${lm.color}`, borderRadius: 8,
      padding: '0.875rem 1rem', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: '0.875rem',
      transition: 'all 0.15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ps-accent)'; e.currentTarget.style.transform = 'translateX(3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--ps-card-border)'; e.currentTarget.style.transform = 'translateX(0)' }}
    >
      {showIndex && (
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: 'var(--ps-muted)', minWidth: 24, textAlign: 'right' }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.3rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {problem.title}
        </div>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          <Chip color={lm.color}>{lm.label}</Chip>
          <Chip color={tm.color}>{tm.label}</Chip>
          {(problem.topics || []).slice(0, 2).map(t => <Chip key={t}>{t}</Chip>)}
          {problem.isInterview && <Chip color="#EF4444">★ Interview</Chip>}
        </div>
      </div>
      <ChevronRight size={15} style={{ color: 'var(--ps-muted)', flexShrink: 0 }} />
    </div>
  )
}

function InterviewCard({ problem, index, onClick }) {
  const lm = LEVEL_META[problem.level] || LEVEL_META.BEGINNER
  const tm = TYPE_META[problem.type] || TYPE_META.WRITE
  return (
    <div onClick={onClick} style={{
      background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)',
      borderLeft: `3px solid #EF4444`, borderRadius: 8,
      padding: '0.875rem 1rem', cursor: 'pointer',
      transition: 'all 0.15s', overflow: 'hidden', minWidth: 0,
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#EF4444'; e.currentTarget.style.transform = 'translateX(3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--ps-card-border)'; e.currentTarget.style.transform = 'translateX(0)' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: 'var(--ps-muted)', minWidth: 24, textAlign: 'right', paddingTop: '0.15rem' }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
            {problem.title}
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: (problem.companiesThatAsk?.length > 0) ? '0.5rem' : 0 }}>
            <Chip color={lm.color}>{lm.label}</Chip>
            <Chip color={tm.color}>{tm.label}</Chip>
            {(problem.topics || []).slice(0, 2).map(t => <Chip key={t}>{t}</Chip>)}
          </div>
          {(problem.companiesThatAsk || []).length > 0 && (
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--ps-muted)', letterSpacing: '0.06em' }}>ASKED BY</span>
              {problem.companiesThatAsk.map(c => (
                <span key={c} style={{
                  fontSize: '0.6rem', fontFamily: "'Share Tech Mono', monospace",
                  padding: '0.1rem 0.4rem', borderRadius: 3,
                  background: 'rgba(239,68,68,0.08)', color: '#EF4444',
                  border: '1px solid rgba(239,68,68,0.2)',
                }}>{c}</span>
              ))}
            </div>
          )}
        </div>
        <ChevronRight size={15} style={{ color: 'var(--ps-muted)', flexShrink: 0, marginTop: '0.15rem' }} />
      </div>
    </div>
  )
}

function Chip({ color = 'var(--ps-muted)', children }) {
  const hex = color.startsWith('#')
  return (
    <span style={{
      fontSize: '0.6rem', fontFamily: "'Share Tech Mono', monospace",
      padding: '0.1rem 0.4rem', borderRadius: 3,
      background: hex ? `${color}15` : 'var(--bg-tertiary)',
      color, border: `1px solid ${hex ? `${color}30` : 'var(--border)'}`,
    }}>
      {children}
    </span>
  )
}

function Empty() {
  return (
    <div style={{
      textAlign: 'center', padding: '4rem 1rem',
      color: 'var(--ps-muted)', fontFamily: "'Share Tech Mono', monospace",
      fontSize: '0.75rem', letterSpacing: '0.08em',
    }}>
      NO PROBLEMS FOUND
    </div>
  )
}

function ResultCount({ count, filters }) {
  return (
    <div style={{
      fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
      letterSpacing: '0.06em', color: 'var(--ps-muted)',
    }}>
      {count} PROBLEM{count !== 1 ? 'S' : ''}
      {filters && <span style={{ color: 'var(--ps-accent)' }}> · {filters}</span>}
    </div>
  )
}

// ─── Track Views ──────────────────────────────────────────────────────────────

function LinearView({ track, questions, topics, selectedTopic, onTopicChange, search, onSearch, light, navigate, meta }) {
  const grouped = useMemo(() => {
    const map = {}
    questions.forEach(q => {
      const cat = q.category || 'General'
      if (!map[cat]) map[cat] = []
      map[cat].push(q)
    })
    return map
  }, [questions])

  const activeFilters = selectedTopic !== 'All' ? selectedTopic : null

  return (
    <div className="ps-view-container" style={{ maxWidth: 760, margin: '0 auto', padding: '1.5rem', boxSizing: 'border-box', width: '100%' }}>

      {/* Filter row */}
      <div className="ps-filter-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={onSearch} />
        {topics && topics.length > 2 && (
          <FilterSelect
            label="Topic"
            value={selectedTopic}
            onChange={onTopicChange}
            options={topics}
            accentColor={meta.color}
          />
        )}
      </div>

      {/* Active filter + count */}
      <div style={{ marginBottom: '1rem' }}>
        <ResultCount count={questions.length} filters={activeFilters} />
      </div>

      {track === 'START_CODING' && (
        <div style={{
          padding: '0.6rem 0.875rem', borderRadius: 7, marginBottom: '1.25rem',
          background: 'var(--ps-hint-bg)', border: '1px solid var(--ps-card-border)',
          fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem',
          color: 'var(--ps-muted)', letterSpacing: '0.05em',
        }}>
          📌 Complete in order — each step builds on the last.
        </div>
      )}

      {Object.keys(grouped).length === 0 ? <Empty /> : (
        Object.entries(grouped).map(([cat, qs]) => (
          <div key={cat} style={{ marginBottom: '1.75rem' }}>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem',
              letterSpacing: '0.12em', color: meta.color, textTransform: 'uppercase',
              marginBottom: '0.6rem',
              borderBottom: '1px solid var(--ps-nav-border)', paddingBottom: '0.35rem',
            }}>
              {cat}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {qs.map((q, i) => (
                <ProblemCard key={q.id} problem={q} index={i} showIndex
                  onClick={() => navigate(`/problem-solving/${q.id}`)} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function SkillUpView({ questions, categories, selectedCategory, onCategoryChange, topics, selectedTopic, onTopicChange, search, onSearch, light, navigate }) {
  const activeFilters = [
    selectedCategory !== 'All' ? selectedCategory : null,
    selectedTopic !== 'All' ? selectedTopic : null,
  ].filter(Boolean).join(' › ')

  return (
    <div className="ps-view-container" style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem', boxSizing: 'border-box', width: '100%' }}>

      {/* Filter row */}
      <div className="ps-filter-row" style={{
        display: 'flex', gap: '0.75rem', alignItems: 'flex-end',
        marginBottom: '1rem', flexWrap: 'wrap',
        padding: '1rem', borderRadius: 10,
        background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)',
      }}>
        <SearchBar value={search} onChange={onSearch} placeholder="Search by title, topic..." />

        <FilterSelect
          label="Category"
          value={selectedCategory}
          onChange={onCategoryChange}
          options={categories}
          accentColor="#0EA5E9"
        />

        <FilterSelect
          label="Topic"
          value={selectedTopic}
          onChange={onTopicChange}
          options={topics}
          accentColor="#A78BFA"
        />

        {(selectedCategory !== 'All' || selectedTopic !== 'All') && (
          <button onClick={() => { onCategoryChange('All'); onTopicChange('All') }} style={{
            alignSelf: 'flex-end',
            background: 'none', border: '1px solid var(--ps-card-border)',
            borderRadius: 8, padding: '0.52rem 0.75rem', cursor: 'pointer',
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem',
            color: 'var(--ps-muted)', whiteSpace: 'nowrap',
            transition: 'all 0.12s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#EF4444'; e.currentTarget.style.color = '#EF4444' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--ps-card-border)'; e.currentTarget.style.color = 'var(--ps-muted)' }}
          >
            ✕ CLEAR
          </button>
        )}
      </div>

      {/* Result count */}
      <div style={{ marginBottom: '0.875rem' }}>
        <ResultCount count={questions.length} filters={activeFilters || null} />
      </div>

      {/* Questions */}
      {questions.length === 0 ? <Empty /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {questions.map((q, i) => (
            <ProblemCard key={q.id} problem={q} index={i} showIndex
              onClick={() => navigate(`/problem-solving/${q.id}`)} />
          ))}
        </div>
      )}
      <ReportButton variant="floating" pageTitle="Code GYM — Track" />
    </div>
  )
}

const LEVELS = ['All', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED']
const LEVEL_LABELS = { All: 'All Levels', BEGINNER: 'Beginner', INTERMEDIATE: 'Intermediate', ADVANCED: 'Advanced' }

function InterviewPrepView({ questions, level, onLevelChange, search, onSearch, navigate }) {
  return (
    <div className="ps-view-container" style={{ maxWidth: 760, margin: '0 auto', padding: '1.5rem', boxSizing: 'border-box', width: '100%' }}>

      {/* Filter row */}
      <div className="ps-filter-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={onSearch} placeholder="Search interview questions..." />
        <FilterSelect
          label="Level"
          value={level}
          onChange={onLevelChange}
          options={LEVELS.map(l => l)}
          accentColor="#EF4444"
          renderLabel={l => LEVEL_LABELS[l] || l}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <ResultCount count={questions.length} filters={level !== 'All' ? LEVEL_LABELS[level] : null} />
      </div>

      {questions.length === 0 ? <Empty /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {questions.map((q, i) => (
            <InterviewCard key={q.id} problem={q} index={i}
              onClick={() => navigate(`/problem-solving/${q.id}`)} />
          ))}
        </div>
      )}
    </div>
  )
}

function ScenarioView({ questions, level, onLevelChange, search, onSearch, light, navigate }) {
  const CATEGORY_COLORS = {
    Transport: '#22C55E', Healthcare: '#EF4444', Banking: '#F59E0B',
    Education: '#0EA5E9', 'Food Delivery': '#F97316', Gaming: '#8B5CF6',
    'HR System': '#06B6D4', Inventory: '#84CC16', Library: '#A78BFA',
    Infrastructure: '#64748B',
  }

  return (
    <div className="ps-view-container" style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem', boxSizing: 'border-box', width: '100%' }}>

      {/* Header banner */}
      <div style={{
        background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
        borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.25rem',
      }}>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', color: '#8B5CF6', marginBottom: '0.3rem' }}>REAL WORLD</div>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>Scenario Coding</div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Story-based problems from company placement exams. Each problem gives a real-world scenario with clear rules — you implement the logic.
        </div>
      </div>

      {/* Filter row */}
      <div className="ps-filter-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <SearchBar value={search} onChange={onSearch} placeholder="Search scenario problems..." />
        <FilterSelect
          label="Level"
          value={level}
          onChange={onLevelChange}
          options={LEVELS.map(l => l)}
          accentColor="#8B5CF6"
          renderLabel={l => LEVEL_LABELS[l] || l}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <ResultCount count={questions.length} filters={level !== 'All' ? LEVEL_LABELS[level] : null} />
      </div>

      {questions.length === 0 ? <Empty /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px,100%), 1fr))', gap: '0.75rem' }}>
          {questions.map((q) => {
            const lm = LEVEL_META[q.level] || LEVEL_META.BEGINNER
            const catColor = CATEGORY_COLORS[q.category] || '#8B5CF6'
            return (
              <button
                key={q.id}
                onClick={() => navigate(`/problem-solving/${q.id}`)}
                style={{
                  background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)',
                  borderLeft: `3px solid ${catColor}`,
                  borderRadius: 10, padding: '1rem 1.125rem',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${catColor}66`; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--ps-card-border)'; e.currentTarget.style.borderLeftColor = catColor; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.62rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.12rem 0.45rem', borderRadius: 3, background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}30` }}>
                    {q.category}
                  </span>
                  <span style={{ fontSize: '0.62rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.12rem 0.45rem', borderRadius: 3, background: `${lm.color}12`, color: lm.color, border: `1px solid ${lm.color}25` }}>
                    {lm.label}
                  </span>
                </div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.3rem', lineHeight: 1.3 }}>
                  {q.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {q.description?.split('\n')[0]}
                </div>
                {q.isInterview && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.62rem', fontFamily: "'Share Tech Mono', monospace", color: '#EF4444' }}>★ ASKED IN PLACEMENT EXAMS</div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
