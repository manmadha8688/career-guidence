import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sun, Moon, ChevronRight, Search, X } from 'lucide-react'
import MatrixRainLoader from '../../components/loaders/MatrixRainLoader'
import EnterArenaButton from '../../components/EnterArenaButton'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useTheme } from '../../context/ThemeContext'
import { getAptitudeTopics } from '../../api/api'
import { APTITUDE_CATEGORY_MAP, DIFFICULTY_META, PRIORITY_META, sortTopics } from './aptitudeData'

const EASE = [0.16, 1, 0.3, 1]

// Difficulty as a level (drives the signal-bar meter on each card).
const DIFF_LEVEL = { easy: 1, medium: 2, hard: 3 }

// Filter chip definitions (built from the shared meta so labels/colors stay in sync).
const PRI_CHIPS = [
  { key: 'all', label: 'All' },
  ...Object.entries(PRIORITY_META).map(([key, v]) => ({ key, label: v.label, color: v.color })),
]
const DIFF_CHIPS = [
  { key: 'all', label: 'All' },
  ...Object.entries(DIFFICULTY_META).map(([key, v]) => ({ key, label: v.label, color: v.color })),
]

export default function AptitudeCategoryPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  const meta = APTITUDE_CATEGORY_MAP[category]

  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [priFilter, setPriFilter] = useState('all')
  const [diffFilter, setDiffFilter] = useState('all')

  useEffect(() => {
    if (!meta) { navigate('/aptitude', { replace: true }); return }
    setLoading(true)
    setQuery(''); setPriFilter('all'); setDiffFilter('all')
    getAptitudeTopics(category)
      .then(r => setTopics(sortTopics(r.data || [])))
      .catch(() => setTopics([]))
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [category])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return topics.filter(t => {
      if (priFilter !== 'all' && t.priority !== priFilter) return false
      if (diffFilter !== 'all' && t.difficulty !== diffFilter) return false
      if (q && !`${t.displayName || ''} ${t.description || ''}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [topics, query, priFilter, diffFilter])

  const isFiltering = query.trim() !== '' || priFilter !== 'all' || diffFilter !== 'all'
  const clearAll = () => { setQuery(''); setPriFilter('all'); setDiffFilter('all') }

  if (!meta) return null

  return (
    <div className="apt-page" style={{ '--cat-color': meta.color }}>
      <div className="apt-nav">
        <button type="button" onClick={() => navigate('/aptitude')} className="apt-nav__back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          APTITUDE
        </button>

        <span className="apt-nav__center">
          <span className="apt-nav__icon" aria-hidden="true">{meta.icon}</span>
          {meta.label}
        </span>

        <div className="apt-nav__actions">
          <button type="button" onClick={toggleTheme} className="apt-nav__theme" aria-label="Toggle theme">
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <EnterArenaButton />
        </div>
      </div>

      {loading ? (
        <MatrixRainLoader accentColor={meta.color} fullPage label={`LOADING ${meta.label.toUpperCase()}`} />
      ) : (
        <div className="apt-container">
          <div className="apt-cat-head">
            <h1 className="apt-cat-head__title">{meta.label}</h1>
            <p className="apt-cat-head__desc">{meta.description}</p>
            <span className="apt-cat-head__count">
              {isFiltering
                ? `${filtered.length} of ${topics.length} topic${topics.length !== 1 ? 's' : ''}`
                : `${topics.length} topic${topics.length !== 1 ? 's' : ''}`}
            </span>
          </div>

          {topics.length > 0 && (
            <div className="apt-toolbar">
              <div className="apt-search">
                <Search size={15} className="apt-search__icon" aria-hidden="true" />
                <input
                  type="text"
                  className="apt-search__input"
                  placeholder="Search topics…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  aria-label="Search topics"
                />
                {query && (
                  <button type="button" className="apt-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="apt-filters">
                <label className="apt-select">
                  <span className="apt-select__label">Priority</span>
                  <select
                    className={`apt-select__field${priFilter !== 'all' ? ' is-set' : ''}`}
                    value={priFilter}
                    onChange={e => setPriFilter(e.target.value)}
                  >
                    {PRI_CHIPS.map(c => (
                      <option key={c.key} value={c.key}>{c.key === 'all' ? 'All priorities' : c.label}</option>
                    ))}
                  </select>
                </label>

                <label className="apt-select">
                  <span className="apt-select__label">Difficulty</span>
                  <select
                    className={`apt-select__field${diffFilter !== 'all' ? ' is-set' : ''}`}
                    value={diffFilter}
                    onChange={e => setDiffFilter(e.target.value)}
                  >
                    {DIFF_CHIPS.map(c => (
                      <option key={c.key} value={c.key}>{c.key === 'all' ? 'All levels' : c.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          )}

          {topics.length === 0 ? (
            <div className="apt-empty">No topics available yet.</div>
          ) : filtered.length === 0 ? (
            <div className="apt-empty">
              No topics match your filters.
              <button type="button" className="apt-empty__btn" onClick={clearAll}>Clear filters</button>
            </div>
          ) : (
            <div className="apt-topic-grid">
              {filtered.map((t, i) => {
                const diff = DIFFICULTY_META[t.difficulty] || DIFFICULTY_META.easy
                const pri = PRIORITY_META[t.priority]
                const level = DIFF_LEVEL[t.difficulty] || 1
                return (
                  <motion.button
                    type="button"
                    key={t.topic}
                    className="apt-topic-card"
                    style={{ '--diff-color': diff.color }}
                    onClick={() => navigate(`/aptitude/${category}/${t.topic}`)}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4), ease: EASE }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="apt-topic-card__top">
                      <span className="apt-topic-card__icon" aria-hidden="true">{t.icon || '📘'}</span>
                      {/* Difficulty = signal-bar meter (a level); priority = dot + label (a flag).
                          Two different visual languages so they can't be mistaken for each other. */}
                      <span
                        className="apt-topic-card__diff"
                        title={`Difficulty: ${diff.label}`}
                      >
                        <span className="apt-topic-card__meter" aria-hidden="true">
                          <i className={level >= 1 ? 'is-on' : ''} />
                          <i className={level >= 2 ? 'is-on' : ''} />
                          <i className={level >= 3 ? 'is-on' : ''} />
                        </span>
                        {diff.label}
                      </span>
                    </div>

                    {pri && (
                      <span className="apt-topic-card__pri" style={{ '--pri-color': pri.color }} title={`Priority: ${pri.label}`}>
                        <span className="apt-topic-card__pri-dot" aria-hidden="true" />
                        {pri.label}
                      </span>
                    )}

                    <h2 className="apt-topic-card__title">{t.displayName}</h2>
                    <p className="apt-topic-card__desc">{t.description}</p>
                    <span className="apt-topic-card__enter">
                      Learn <ChevronRight size={14} />
                    </span>
                  </motion.button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
