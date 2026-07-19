import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import AptitudeLoader from '../../components/loaders/AptitudeLoader'
import EnterArenaButton from '../../components/EnterArenaButton'
import SectionNotFoundPage from '../../components/SectionNotFoundPage'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useTheme } from '../../context/ThemeContext'
import { getAptitudeTopic, getAptitudeQuestions, aptitudeCache } from '../../api/api'
import { APTITUDE_CATEGORY_MAP } from './aptitudeData'
import AptitudePracticeList from './AptitudePracticeList'
import '../../styles/pages/shared/aptitude.css'

export default function AptitudeQuestionsPage() {
  const { category, group, topicId } = useParams()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  const catMeta = APTITUDE_CATEGORY_MAP[category]
  const accent = catMeta?.color || '#0EA5E9'

  // Seed from cache so a revisit renders instantly; only an uncached visit loads.
  const [topic, setTopic] = useState(() => aptitudeCache.topic(topicId) ?? null)
  const [questions, setQuestions] = useState(() => aptitudeCache.questions(topicId) ?? [])
  const [loading, setLoading] = useState(() =>
    !(aptitudeCache.topic(topicId) !== undefined && aptitudeCache.questions(topicId) !== undefined))

  useEffect(() => {
    const ct = aptitudeCache.topic(topicId)
    const cq = aptitudeCache.questions(topicId)
    const cached = ct !== undefined && cq !== undefined
    if (cached) {
      setTopic(ct)
      setQuestions(cq)
      setLoading(false)
    } else {
      setLoading(true)
    }
    let alive = true
    let doneTimer
    Promise.all([
      getAptitudeTopic(topicId).then(r => { if (alive) setTopic(r.data) }).catch(() => { if (alive) setTopic(null) }),
      getAptitudeQuestions(topicId).then(r => { if (alive) setQuestions(r.data || []) }).catch(() => { if (alive) setQuestions([]) }),
    ]).finally(() => { if (alive && !cached) doneTimer = setTimeout(() => setLoading(false), PAGE_MIN_MS) })
    return () => { alive = false; clearTimeout(doneTimer) }
  }, [topicId])

  const backToTopic = () => navigate(`/aptitude/${category}/${group}/${topicId}`)

  // Topic slug doesn't exist — themed aptitude not-found (same as lesson page).
  if (!loading && !topic) return <SectionNotFoundPage variant="aptitude" />

  return (
    <div className="apt-page" style={{ '--cat-color': accent }}>
      <div className="apt-nav">
        <button type="button" onClick={backToTopic} className="apt-nav__back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          LESSON
        </button>
        <span className="apt-nav__center apt-nav__center--topic">
          {topic?.displayName ? `${topic.displayName} · Practice` : 'Practice'}
        </span>
        <div className="apt-nav__actions">
          <button type="button" onClick={toggleTheme} className="apt-nav__theme" aria-label="Toggle theme">
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <EnterArenaButton />
        </div>
      </div>

      {loading ? (
        <AptitudeLoader variant={category} accentColor={accent} fullPage label="LOADING QUESTIONS" />
      ) : (
        <div className="apt-container apt-container--topic">
          <div className="apt-practice__head">
            <span className="apt-practice__badge">Practice · {questions.length} question{questions.length !== 1 ? 's' : ''}</span>
            <h1 className="apt-practice__title">{topic?.displayName || 'Practice'} — test yourself</h1>
            <p className="apt-practice__sub">
              Solve each one on your own first. The answer stays hidden until you tap
              <strong> Reveal</strong> — no peeking. These cover every question type on this topic.
            </p>
          </div>

          <AptitudePracticeList
            questions={questions}
            emptyAction={<button type="button" className="apt-empty__btn" onClick={backToTopic}>Back to lesson</button>}
          />
        </div>
      )}
    </div>
  )
}
