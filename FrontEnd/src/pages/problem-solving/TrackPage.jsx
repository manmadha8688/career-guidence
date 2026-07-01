import { useState, useEffect, useMemo } from 'react'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Search, X, ChevronRight } from 'lucide-react'
import MatrixRainLoader from '../../components/loaders/MatrixRainLoader'
import { useTheme } from '../../context/ThemeContext'
import { getProblems } from '../../api/api'

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
// Short, experience-based tip shown at the top of each track.
const TRACK_TIPS = {
  START_CODING:    'Type every example yourself — never copy-paste. Syntax sticks through your fingers, not your eyes.',
  LOGIC_BUILDING:  'Stuck? Solve it on paper with one small example first, then turn that into code. A dry-run beats guessing.',
  SKILL_UP:        'Get the brute-force version working first, then optimize. A slow answer that runs beats a clever one that does not.',
  INTERVIEW_PREP:  'Say your approach out loud before you code. In real interviews, how you think is scored as much as the answer.',
  SCENARIO_CODING: 'Read the rules twice and list the edge cases before writing a line. Scenario problems are won on the details.',
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

  const [logicTopic, setLogicTopic] = useState('All')
  const [skillCategory, setSkillCategory] = useState('All')
  const [skillTopic, setSkillTopic]       = useState('All')
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
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [track])

  const logicTopics = useMemo(() => {
    const s = new Set()
    questions.forEach(q => (q.topics || []).forEach(t => s.add(t)))
    return ['All', ...[...s].sort()]
  }, [questions])

  const skillCategories = useMemo(() => {
    const s = new Set()
    questions.forEach(q => q.category && s.add(q.category))
    return ['All', ...[...s].sort()]
  }, [questions])

  const skillTopics = useMemo(() => {
    const base = skillCategory === 'All'
      ? questions
      : questions.filter(q => q.category === skillCategory)
    const s = new Set()
    base.forEach(q => (q.topics || []).forEach(t => s.add(t)))
    return ['All', ...[...s].sort()]
  }, [questions, skillCategory])

  const handleCategoryChange = (cat) => {
    setSkillCategory(cat)
    setSkillTopic('All')
  }

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
    <div className="ps-page" style={{ '--track-color': meta.color }}>
      <div className="ps-nav">
        <button type="button" onClick={() => navigate(-1)} className="ps-nav__back ps-nav__back--track">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          TRACKS
        </button>

        <span className="ps-nav-center ps-nav-center--track">
          {meta.title.toUpperCase()}
        </span>

        <div className="ps-nav__actions">
          <button type="button" onClick={toggleTheme} className="ps-nav__theme">
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button type="button" onClick={() => navigate('/skill-arena/dashboard')} className="ps-nav__arena">
            ⚔ SKILL ARENA
          </button>
        </div>
      </div>

      {loading ? (
        <MatrixRainLoader accentColor={meta.color} fullPage label={`LOADING ${meta.label || 'TRACK'}`} />
      ) : track === 'SKILL_UP' ? (
        <SkillUpView
          questions={filtered}
          categories={skillCategories} selectedCategory={skillCategory} onCategoryChange={handleCategoryChange}
          topics={skillTopics}         selectedTopic={skillTopic}    onTopicChange={setSkillTopic}
          search={search} onSearch={setSearch}
          navigate={navigate}
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
          navigate={navigate}
        />
      ) : (
        <LinearView
          track={track} questions={filtered}
          topics={track === 'LOGIC_BUILDING' ? logicTopics : null}
          selectedTopic={logicTopic} onTopicChange={setLogicTopic}
          search={search} onSearch={setSearch}
          navigate={navigate} meta={meta}
        />
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

function ProblemCard({ problem, index, showIndex, onClick }) {
  const lm = LEVEL_META[problem.level] || LEVEL_META.BEGINNER
  const tm = TYPE_META[problem.type] || TYPE_META.WRITE
  return (
    <div
      onClick={onClick}
      className="ps-problem-card"
      style={{ '--lm-color': lm.color }}
    >
      {showIndex && (
        <div className="ps-problem-card__index">
          {String(index + 1).padStart(2, '0')}
        </div>
      )}
      <div className="ps-problem-card__body">
        <div className="ps-problem-card__title">{problem.title}</div>
        <div className="ps-problem-card__chips">
          <Chip color={lm.color}>{lm.label}</Chip>
          <Chip color={tm.color}>{tm.label}</Chip>
          {(problem.topics || []).slice(0, 2).map(t => <Chip key={t}>{t}</Chip>)}
          {problem.isInterview && <Chip color="#EF4444">★ Interview</Chip>}
        </div>
      </div>
      <ChevronRight size={15} className="ps-problem-card__chevron" />
    </div>
  )
}

function InterviewCard({ problem, index, onClick }) {
  const lm = LEVEL_META[problem.level] || LEVEL_META.BEGINNER
  const tm = TYPE_META[problem.type] || TYPE_META.WRITE
  const hasCompanies = (problem.companiesThatAsk?.length > 0)
  return (
    <div onClick={onClick} className="ps-interview-card">
      <div className="ps-interview-card__row">
        <div className="ps-interview-card__index">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="ps-interview-card__body">
          <div className="ps-interview-card__title">{problem.title}</div>
          <div className={`ps-interview-card__chips${hasCompanies ? ' ps-interview-card__chips--companies' : ''}`}>
            <Chip color={lm.color}>{lm.label}</Chip>
            <Chip color={tm.color}>{tm.label}</Chip>
            {(problem.topics || []).slice(0, 2).map(t => <Chip key={t}>{t}</Chip>)}
          </div>
          {hasCompanies && (
            <div className="ps-interview-card__companies">
              <span className="ps-interview-card__companies-label">ASKED BY</span>
              {problem.companiesThatAsk.map(c => (
                <span key={c} className="ps-company-badge">{c}</span>
              ))}
            </div>
          )}
        </div>
        <ChevronRight size={15} className="ps-interview-card__chevron" />
      </div>
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

function LinearView({ track, questions, topics, selectedTopic, onTopicChange, search, onSearch, navigate, meta }) {
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
    <div className="ps-view-container ps-view-container--narrow">
      <div className="ps-filter-row">
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

      <div className="ps-result-wrap">
        <ResultCount count={questions.length} filters={activeFilters} />
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

      {Object.keys(grouped).length === 0 ? <Empty /> : (
        Object.entries(grouped).map(([cat, qs]) => (
          <div key={cat} className="ps-category-group" style={{ '--track-color': meta.color }}>
            <div className="ps-category-label">{cat}</div>
            <div className="ps-problem-list">
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

function SkillUpView({ questions, categories, selectedCategory, onCategoryChange, topics, selectedTopic, onTopicChange, search, onSearch, navigate }) {
  const activeFilters = [
    selectedCategory !== 'All' ? selectedCategory : null,
    selectedTopic !== 'All' ? selectedTopic : null,
  ].filter(Boolean).join(' › ')

  return (
    <div className="ps-view-container ps-view-container--wide">
      <div className="ps-filter-row ps-filter-row--boxed">
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
          <button type="button" onClick={() => { onCategoryChange('All'); onTopicChange('All') }} className="ps-filter-clear">
            ✕ CLEAR
          </button>
        )}
      </div>

      <div className="ps-result-wrap ps-result-wrap--tight">
        <ResultCount count={questions.length} filters={activeFilters || null} />
      </div>

      <div className="ps-hint-banner ps-hint-banner--tip">
        💡 Tip: {TRACK_TIPS.SKILL_UP}
      </div>

      {questions.length === 0 ? <Empty /> : (
        <div className="ps-problem-list">
          {questions.map((q, i) => (
            <ProblemCard key={q.id} problem={q} index={i} showIndex
              onClick={() => navigate(`/problem-solving/${q.id}`)} />
          ))}
        </div>
      )}
    </div>
  )
}

const LEVELS = ['All', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED']
const LEVEL_LABELS = { All: 'All Levels', BEGINNER: 'Beginner', INTERMEDIATE: 'Intermediate', ADVANCED: 'Advanced' }

function InterviewPrepView({ questions, level, onLevelChange, search, onSearch, navigate }) {
  return (
    <div className="ps-view-container ps-view-container--narrow">
      <div className="ps-filter-row">
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

      <div className="ps-result-wrap">
        <ResultCount count={questions.length} filters={level !== 'All' ? LEVEL_LABELS[level] : null} />
      </div>

      <div className="ps-hint-banner ps-hint-banner--tip">
        💡 Tip: {TRACK_TIPS.INTERVIEW_PREP}
      </div>

      {questions.length === 0 ? <Empty /> : (
        <div className="ps-problem-list ps-problem-list--spaced">
          {questions.map((q, i) => (
            <InterviewCard key={q.id} problem={q} index={i}
              onClick={() => navigate(`/problem-solving/${q.id}`)} />
          ))}
        </div>
      )}
    </div>
  )
}

function ScenarioView({ questions, level, onLevelChange, search, onSearch, navigate }) {
  const CATEGORY_COLORS = {
    Transport: '#22C55E', Healthcare: '#EF4444', Banking: '#F59E0B',
    Education: '#0EA5E9', 'Food Delivery': '#F97316', Gaming: '#8B5CF6',
    'HR System': '#06B6D4', Inventory: '#84CC16', Library: '#A78BFA',
    Infrastructure: '#64748B',
  }

  return (
    <div className="ps-view-container ps-view-container--wide">
      <div className="ps-scenario-banner">
        <div className="ps-scenario-banner__tag">REAL WORLD</div>
        <div className="ps-scenario-banner__title">Scenario Coding</div>
        <div className="ps-scenario-banner__desc">
          Story-based problems from company placement exams. Each problem gives a real-world scenario with clear rules — you implement the logic.
        </div>
      </div>

      <div className="ps-filter-row">
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

      <div className="ps-result-wrap">
        <ResultCount count={questions.length} filters={level !== 'All' ? LEVEL_LABELS[level] : null} />
      </div>

      <div className="ps-hint-banner ps-hint-banner--tip">
        💡 Tip: {TRACK_TIPS.SCENARIO_CODING}
      </div>

      {questions.length === 0 ? <Empty /> : (
        <div className="ps-scenario-grid">
          {questions.map((q) => {
            const lm = LEVEL_META[q.level] || LEVEL_META.BEGINNER
            const catColor = CATEGORY_COLORS[q.category] || '#8B5CF6'
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => navigate(`/problem-solving/${q.id}`)}
                className="ps-scenario-card"
                style={{ '--cat-color': catColor, '--lm-color': lm.color }}
              >
                <div className="ps-scenario-card__meta">
                  <span className="ps-scenario-card__cat">{q.category}</span>
                  <span className="ps-scenario-card__level">{lm.label}</span>
                </div>
                <div className="ps-scenario-card__title">{q.title}</div>
                <div className="ps-scenario-card__desc">
                  {q.description?.split('\n')[0]}
                </div>
                {q.isInterview && (
                  <div className="ps-scenario-card__exam">★ ASKED IN PLACEMENT EXAMS</div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
