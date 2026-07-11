import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Zap, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import MatrixRainLoader from '../../components/loaders/MatrixRainLoader'
import EnterArenaButton from '../../components/EnterArenaButton'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useTheme } from '../../context/ThemeContext'
import { getAptitudeTopic, getAptitudeQuestions } from '../../api/api'
import { APTITUDE_CATEGORY_MAP, DIFFICULTY_META } from './aptitudeData'

const EASE = [0.16, 1, 0.3, 1]

export default function AptitudeQuestionsPage() {
  const { category, group, topicId } = useParams()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  const catMeta = APTITUDE_CATEGORY_MAP[category]
  const accent = catMeta?.color || '#0EA5E9'

  const [topic, setTopic] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [revealed, setRevealed] = useState({})

  useEffect(() => {
    setLoading(true)
    setRevealed({})
    Promise.all([
      getAptitudeTopic(topicId).then(r => setTopic(r.data)).catch(() => setTopic(null)),
      getAptitudeQuestions(topicId).then(r => setQuestions(r.data || [])).catch(() => setQuestions([])),
    ]).finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [topicId])

  const backToTopic = () => navigate(`/aptitude/${category}/${group}/${topicId}`)
  const toggle = (id) => setRevealed(r => ({ ...r, [id]: !r[id] }))
  const revealedCount = Object.values(revealed).filter(Boolean).length
  const allOpen = questions.length > 0 && revealedCount === questions.length
  const toggleAll = () => {
    if (allOpen) setRevealed({})
    else setRevealed(Object.fromEntries(questions.map((q, i) => [q.id || i, true])))
  }

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
        <MatrixRainLoader accentColor={accent} fullPage label="LOADING QUESTIONS" />
      ) : (
        <div className="apt-container apt-container--topic">
          <div className="apt-practice__head">
            <span className="apt-practice__badge">Practice · {questions.length} question{questions.length !== 1 ? 's' : ''}</span>
            <h1 className="apt-practice__title">{topic?.displayName || 'Practice'} — test yourself</h1>
            <p className="apt-practice__sub">
              Solve each one on your own first. The answer stays hidden until you tap
              <strong> Reveal</strong> — no peeking. These cover every question type on this topic.
            </p>
            {questions.length > 0 && (
              <button type="button" className="apt-practice__toggle-all" onClick={toggleAll}>
                {allOpen ? <><EyeOff size={14} /> Hide all answers</> : <><Eye size={14} /> Reveal all answers</>}
              </button>
            )}
          </div>

          {questions.length === 0 ? (
            <section className="apt-questions-soon">
              <span className="apt-questions-soon__badge">Practice</span>
              <h2>Questions coming soon</h2>
              <p>Solved practice questions for this topic are on the way. Meanwhile, work through the lesson and its worked examples.</p>
              <button type="button" className="apt-empty__btn" onClick={backToTopic}>Back to lesson</button>
            </section>
          ) : (
            <ol className="apt-q-list">
              {questions.map((q, i) => {
                const id = q.id || i
                const isOpen = !!revealed[id]
                const diff = DIFFICULTY_META[q.difficulty] || DIFFICULTY_META.easy
                return (
                  <motion.li
                    key={id}
                    className="apt-q"
                    style={{ '--diff-color': diff.color }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3), ease: EASE }}
                  >
                    <div className="apt-q__head">
                      <span className="apt-q__num">Q{q.order || i + 1}</span>
                      <span className="apt-q__diff">{diff.label}</span>
                      {q.type && <span className="apt-q__type">{q.type}</span>}
                    </div>
                    <p className="apt-q__text">{q.question}</p>

                    <div className="apt-q__options">
                      {(q.options || []).map((opt, oi) => {
                        const letter = String.fromCharCode(65 + oi)
                        const isAns = isOpen && letter === q.answer
                        return (
                          <div key={oi} className={`apt-q__opt${isAns ? ' is-answer' : ''}`}>
                            <span className="apt-q__opt-letter">{letter}</span>
                            <span className="apt-q__opt-text">{opt}</span>
                            {isAns && <CheckCircle2 size={15} className="apt-q__opt-tick" />}
                          </div>
                        )
                      })}
                    </div>

                    <button type="button" className="apt-q__reveal" onClick={() => toggle(id)}>
                      {isOpen ? <><EyeOff size={14} /> Hide solution</> : <><Eye size={14} /> Reveal answer &amp; solution</>}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="apt-q__sol"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                        >
                          <p className="apt-q__answer"><strong>Answer:</strong> {q.answer}</p>
                          {q.solution && <p className="apt-q__sol-text">{q.solution}</p>}
                          {q.trick && (
                            <p className="apt-q__trick"><Zap size={14} /> <span>{q.trick}</span></p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                )
              })}
            </ol>
          )}
        </div>
      )}
    </div>
  )
}
