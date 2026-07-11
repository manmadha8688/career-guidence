import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sun, Moon, ChevronRight } from 'lucide-react'
import MatrixRainLoader from '../../components/loaders/MatrixRainLoader'
import EnterArenaButton from '../../components/EnterArenaButton'
import BookmarkButton from '../../components/BookmarkButton'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useTheme } from '../../context/ThemeContext'
import { getAptitudeGroups } from '../../api/api'
import { APTITUDE_CATEGORY_MAP } from './aptitudeData'

const EASE = [0.16, 1, 0.3, 1]

export default function AptitudeCategoryPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  const meta = APTITUDE_CATEGORY_MAP[category]

  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!meta) { navigate('/aptitude', { replace: true }); return }
    setLoading(true)
    getAptitudeGroups(category)
      .then(r => setGroups(r.data || []))
      .catch(() => setGroups([]))
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [category])

  if (!meta) return null

  const totalTopics = groups.reduce((n, g) => n + (g.topicCount || 0), 0)

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
              {groups.length} group{groups.length !== 1 ? 's' : ''} · {totalTopics} topic{totalTopics !== 1 ? 's' : ''}
            </span>
          </div>

          {groups.length === 0 ? (
            <div className="apt-empty">No groups available yet.</div>
          ) : (
            <div className="apt-group-grid">
              {groups.map((g, i) => {
                const goto = () => navigate(`/aptitude/${category}/${g.slug}`)
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
