import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Search, X } from 'lucide-react'
import Navbar from '../../components/navbars/Navbar'
import AptitudeLoader from '../../components/loaders/AptitudeLoader'
import BookmarkButton from '../../components/BookmarkButton'
import SectionNotFoundPage from '../../components/SectionNotFoundPage'
import blurOnEnter from '../../utils/blurOnEnter'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { getAptitudeGroups, getAptitudeTopics, aptitudeCache } from '../../api/api'
import { APTITUDE_CATEGORY_MAP, DIFFICULTY_META, PRIORITY_META, sortTopics } from './aptitudeData'

const EASE = [0.16, 1, 0.3, 1]

// Difficulty as a level (drives the signal-bar meter on each card).
const DIFF_LEVEL = { easy: 1, medium: 2, hard: 3 }

const PRI_CHIPS = [
  { key: 'all', label: 'All' },
  ...Object.entries(PRIORITY_META).map(([key, v]) => ({ key, label: v.label, color: v.color })),
]
const DIFF_CHIPS = [
  { key: 'all', label: 'All' },
  ...Object.entries(DIFFICULTY_META).map(([key, v]) => ({ key, label: v.label, color: v.color })),
]

export default function AptitudeGroupPage() {
  const { category, group } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const meta = APTITUDE_CATEGORY_MAP[category]

  // Seed from cache so a revisit renders instantly; needs topics + group meta.
  const [groupMeta, setGroupMeta] = useState(() => {
    const cg = aptitudeCache.groups(category)
    return cg ? (cg.find(g => g.slug === group) || null) : null
  })
  const [topics, setTopics] = useState(() => {
    const ct = aptitudeCache.topics(group)
    return ct ? sortTopics(ct) : []
  })
  const [loading, setLoading] = useState(() =>
    !(aptitudeCache.topics(group) !== undefined && aptitudeCache.groups(category) !== undefined))
  // Pre-fill the topic search when arriving from the group-list search (?q=…),
  // so a "relative speed" search lands here already filtered to that topic.
  const [query, setQuery] = useState(() => searchParams.get('q') || '')
  const [priFilter, setPriFilter] = useState('all')
  const [diffFilter, setDiffFilter] = useState('all')

  useEffect(() => {
    if (!meta) return
    const ct = aptitudeCache.topics(group)
    const cg = aptitudeCache.groups(category)
    const cached = ct !== undefined && cg !== undefined
    if (cached) {
      setTopics(sortTopics(ct))
      setGroupMeta(cg.find(g => g.slug === group) || null)
      setLoading(false)
    } else {
      setLoading(true)
    }
    setQuery(searchParams.get('q') || ''); setPriFilter('all'); setDiffFilter('all')
    Promise.all([
      getAptitudeTopics(group).then(r => setTopics(sortTopics(r.data || []))).catch(() => setTopics([])),
      getAptitudeGroups(category)
        .then(r => setGroupMeta((r.data || []).find(g => g.slug === group) || null))
        .catch(() => setGroupMeta(null)),
    ]).finally(() => { if (!cached) setTimeout(() => setLoading(false), PAGE_MIN_MS) })
  }, [category, group])

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
  const title = groupMeta?.displayName || 'Topics'

  if (!meta) return <SectionNotFoundPage variant="aptitude" />
  // Group slug doesn't resolve to a real group (once loading has settled).
  if (!loading && !groupMeta) return <SectionNotFoundPage variant="aptitude" />

  return (
    <div className="apt-page" style={{ '--cat-color': meta.color }}>
      <Navbar sticky />

      {loading ? (
        <AptitudeLoader variant={category} fullPage label={`LOADING ${title.toUpperCase()}`} />
      ) : (
        <div className="apt-container">
          <div className="apt-cat-head">
            <h1 className="apt-cat-head__title">{title}</h1>
            {groupMeta?.description && <p className="apt-cat-head__desc">{groupMeta.description}</p>}
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
                  onKeyDown={blurOnEnter}
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
                const goto = () => navigate(`/aptitude/${category}/${group}/${t.topic}`)
                return (
                  <motion.div
                    role="button"
                    tabIndex={0}
                    key={t.topic}
                    className="apt-topic-card"
                    style={{ '--diff-color': diff.color }}
                    onClick={goto}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto() } }}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4), ease: EASE }}
                    whileHover={{ y: -4 }}
                  >
                    <BookmarkButton
                      iconOnly
                      stopPropagation
                      className="apt-card-bm"
                      type="APTITUDE"
                      refId={`/aptitude/${category}/${group}/${t.topic}`}
                      title={`${t.displayName} · ${meta.label}`}
                      icon={t.icon || '📘'}
                    />
                    <div className="apt-topic-card__top">
                      <span className="apt-topic-card__icon" aria-hidden="true">{t.icon || '📘'}</span>
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
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
