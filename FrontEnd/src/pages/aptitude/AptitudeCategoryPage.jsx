import { useState, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Search, X } from 'lucide-react'
import Navbar from '../../components/navbars/Navbar'
import AptitudeLoader from '../../components/loaders/AptitudeLoader'
import BookmarkButton from '../../components/BookmarkButton'
import SectionNotFoundPage from '../../components/SectionNotFoundPage'
import blurOnEnter from '../../utils/blurOnEnter'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { getAptitudeGroups, aptitudeCache } from '../../api/api'
import '../../styles/pages/shared/aptitude.css'
import { APTITUDE_CATEGORY_MAP } from './aptitudeData'

const EASE = [0.16, 1, 0.3, 1]

export default function AptitudeCategoryPage() {
  const { category } = useParams()
  const navigate = useNavigate()

  const meta = APTITUDE_CATEGORY_MAP[category]

  // Seed from cache so a revisit renders instantly; only an uncached visit loads.
  const [groups, setGroups] = useState(() => aptitudeCache.groups(category) || [])
  const [loading, setLoading] = useState(() => aptitudeCache.groups(category) === undefined)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!meta) return
    let alive = true
    let doneTimer
    const cached = aptitudeCache.groups(category)
    if (cached) { setGroups(cached); setLoading(false) }
    else setLoading(true)
    setQuery('')
    getAptitudeGroups(category)
      .then(r => { if (alive) setGroups(r.data || []) })
      .catch(() => {
        if (!alive) return
        toast.error('Could not load topics. Please try again.')
        setGroups([])
      })
      .finally(() => { if (alive && !cached) doneTimer = setTimeout(() => setLoading(false), PAGE_MIN_MS) })
    return () => { alive = false; clearTimeout(doneTimer) }
  }, [category])

  const q = query.trim().toLowerCase()

  // A group matches if its own name/description matches, OR any topic inside it
  // matches — so a student can search a topic ("relative speed") and still land
  // on the group that teaches it, without knowing the group's name.
  const shownGroups = useMemo(() => {
    if (!q) return groups
    return groups.filter(g =>
      `${g.displayName || ''} ${g.description || ''}`.toLowerCase().includes(q) ||
      (g.topicNames || []).some(n => (n || '').toLowerCase().includes(q))
    )
  }, [groups, q])

  if (!meta) return <SectionNotFoundPage variant="aptitude" />

  const totalTopics = groups.reduce((n, g) => n + (g.topicCount || 0), 0)
  const isSearching = q !== ''

  return (
    <div className="apt-page" style={{ '--cat-color': meta.color }}>
      <Navbar sticky />

      {loading ? (
        <AptitudeLoader variant={category} fullPage label={`LOADING ${meta.label.toUpperCase()}`} />
      ) : (
        <div className="apt-container">
          <div className="apt-cat-head">
            <h1 className="apt-cat-head__title">{meta.label}</h1>
            <p className="apt-cat-head__desc">{meta.description}</p>
            <span className="apt-cat-head__count">
              {isSearching
                ? `${shownGroups.length} of ${groups.length} group${groups.length !== 1 ? 's' : ''}`
                : `${groups.length} group${groups.length !== 1 ? 's' : ''} · ${totalTopics} topic${totalTopics !== 1 ? 's' : ''}`}
            </span>
          </div>

          {groups.length > 0 && (
            <div className="apt-toolbar">
              <div className="apt-search">
                <Search size={15} className="apt-search__icon" aria-hidden="true" />
                <input
                  type="text"
                  className="apt-search__input"
                  placeholder="Search groups or topics…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={blurOnEnter}
                  aria-label="Search groups or topics"
                />
                {query && (
                  <button type="button" className="apt-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {groups.length === 0 ? (
            <div className="apt-empty">No groups available yet.</div>
          ) : shownGroups.length === 0 ? (
            <div className="apt-empty">
              No groups or topics match “{query.trim()}”.
              <button type="button" className="apt-empty__btn" onClick={() => setQuery('')}>Clear search</button>
            </div>
          ) : (
            <div className="apt-group-grid">
              {shownGroups.map((g, i) => {
                // When the match came from a topic (not the group name), show which
                // topic(s) matched so the result doesn't look like a mystery.
                const matched = isSearching ? (g.topicNames || []).filter(n => (n || '').toLowerCase().includes(q)) : []
                // Carry the query into the group only when a topic matched, so the
                // group opens pre-filtered to that topic instead of dumping the full
                // list. (A name-only match opens the group normally, showing all.)
                const goto = () => navigate(
                  `/aptitude/${category}/${g.slug}${matched.length > 0 ? `?q=${encodeURIComponent(query.trim())}` : ''}`
                )
                return (
                  <motion.div
                    role="button"
                    tabIndex={0}
                    key={g.slug}
                    className="apt-group-card"
                    onClick={goto}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goto() } }}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4), ease: EASE }}
                    whileHover={{ y: -4 }}
                  >
                    <span className="apt-group-card__rail" aria-hidden="true" />
                    <BookmarkButton
                      iconOnly
                      stopPropagation
                      className="apt-card-bm"
                      type="APTITUDE"
                      refId={`/aptitude/${category}/${g.slug}`}
                      title={`${g.displayName} · ${meta.label}`}
                      icon={g.icon || '📘'}
                    />
                    <div className="apt-group-card__top">
                      <span className="apt-group-card__icon" aria-hidden="true">{g.icon || '📘'}</span>
                      <span className="apt-group-card__count">{g.topicCount} topic{g.topicCount !== 1 ? 's' : ''}</span>
                    </div>
                    <h2 className="apt-group-card__title">{g.displayName}</h2>
                    <p className="apt-group-card__desc">{g.description}</p>
                    {matched.length > 0 && (
                      <span className="apt-group-card__match" title={matched.join(', ')}>
                        Includes: {matched.slice(0, 3).join(', ')}{matched.length > 3 ? ` +${matched.length - 3} more` : ''}
                      </span>
                    )}
                    <span className="apt-group-card__enter">
                      Open <ChevronRight size={14} />
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
