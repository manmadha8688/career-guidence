import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, BookOpen, Zap, Play, Lightbulb, AlertTriangle } from 'lucide-react'
import MatrixRainLoader from '../../components/loaders/MatrixRainLoader'
import EnterArenaButton from '../../components/EnterArenaButton'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useTheme } from '../../context/ThemeContext'
import { getAptitudeTopic } from '../../api/api'
import { APTITUDE_CATEGORY_MAP, DIFFICULTY_META } from './aptitudeData'

const EASE = [0.16, 1, 0.3, 1]

export default function AptitudeTopicPage() {
  const { category, topicId } = useParams()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  const catMeta = APTITUDE_CATEGORY_MAP[category]

  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [mode, setMode] = useState('learn')

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    getAptitudeTopic(topicId)
      .then(r => setTopic(r.data))
      .catch(() => setNotFound(true))
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [topicId])

  const accent = catMeta?.color || '#0EA5E9'
  const diff = topic ? (DIFFICULTY_META[topic.difficulty] || DIFFICULTY_META.easy) : null
  const hasLearn = !!topic?.learnIt
  const hasCrack = !!topic?.crackIt
  const videos = topic?.videos || []

  return (
    <div className="apt-page" style={{ '--cat-color': accent }}>
      <div className="apt-nav">
        <button
          type="button"
          onClick={() => navigate(catMeta ? `/aptitude/${category}` : '/aptitude')}
          className="apt-nav__back"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {catMeta ? catMeta.label.toUpperCase() : 'APTITUDE'}
        </button>

        <span className="apt-nav__center apt-nav__center--topic">
          {topic?.displayName || 'Topic'}
        </span>

        <div className="apt-nav__actions">
          <button type="button" onClick={toggleTheme} className="apt-nav__theme" aria-label="Toggle theme">
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <EnterArenaButton />
        </div>
      </div>

      {loading ? (
        <MatrixRainLoader accentColor={accent} fullPage label="LOADING TOPIC" />
      ) : notFound ? (
        <div className="apt-container">
          <div className="apt-empty">
            This topic could not be found.
            <button type="button" className="apt-empty__btn" onClick={() => navigate('/aptitude')}>
              Back to Aptitude
            </button>
          </div>
        </div>
      ) : (
        <div className="apt-container apt-container--topic">
          <motion.header
            className="apt-topic-head"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="apt-topic-head__icon" aria-hidden="true">{topic.icon || '📘'}</span>
            <div className="apt-topic-head__meta">
              <div className="apt-topic-head__row">
                <h1 className="apt-topic-head__title">{topic.displayName}</h1>
                {diff && <span className="apt-topic-head__diff" style={{ '--diff-color': diff.color }}>{diff.label}</span>}
              </div>
              <p className="apt-topic-head__desc">{topic.description}</p>
            </div>
          </motion.header>

          {videos.length > 0 && (
            <section className="apt-videos" aria-label="Recommended videos">
              <h2 className="apt-section-h">
                <Play size={15} /> Watch first
              </h2>
              <div className="apt-videos__grid">
                {videos.map((v, i) => (
                  <a
                    key={i}
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apt-video-card"
                  >
                    <span className="apt-video-card__play"><Play size={16} /></span>
                    <span className="apt-video-card__body">
                      <span className="apt-video-card__label">{v.label}</span>
                      {v.note && <span className="apt-video-card__note">{v.note}</span>}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {(hasLearn || hasCrack) ? (
            <>
              <div className="apt-mode-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'learn'}
                  className={`apt-mode-tab${mode === 'learn' ? ' is-active' : ''}`}
                  onClick={() => setMode('learn')}
                  disabled={!hasLearn}
                >
                  <BookOpen size={15} /> Learn It
                  <span className="apt-mode-tab__sub">Full explanation</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'crack'}
                  className={`apt-mode-tab${mode === 'crack' ? ' is-active' : ''}`}
                  onClick={() => setMode('crack')}
                  disabled={!hasCrack}
                >
                  <Zap size={15} /> Crack It
                  <span className="apt-mode-tab__sub">Shortcut methods</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {mode === 'learn' && hasLearn && <LearnMode data={topic.learnIt} />}
                  {mode === 'crack' && hasCrack && <CrackMode data={topic.crackIt} />}
                  {mode === 'learn' && !hasLearn && <ComingSoon label="Learn It" />}
                  {mode === 'crack' && !hasCrack && <ComingSoon label="Crack It" />}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <div className="apt-lesson-soon">
              <span className="apt-lesson-soon__icon">📝</span>
              <h2>Detailed lesson coming soon</h2>
              <p>We are writing the full <strong>Learn It</strong> and <strong>Crack It</strong> guides for this topic. Check back shortly.</p>
            </div>
          )}

          <section className="apt-questions-soon">
            <span className="apt-questions-soon__badge">Practice</span>
            <h2>Questions Coming Soon</h2>
            <p>Solved practice questions and a timed quiz for this topic are on the way.</p>
          </section>
        </div>
      )}
    </div>
  )
}

function ComingSoon({ label }) {
  return (
    <div className="apt-lesson-soon apt-lesson-soon--inline">
      <span className="apt-lesson-soon__icon">📝</span>
      <h2>{label} guide coming soon</h2>
      <p>This mode is being written for this topic. Try the other mode meanwhile.</p>
    </div>
  )
}

function ExampleBlock({ ex }) {
  return (
    <div className="apt-example">
      <div className="apt-example__head">
        <span className="apt-example__level">{ex.level}</span>
        <p className="apt-example__problem">{ex.problem}</p>
      </div>
      {Array.isArray(ex.steps) && ex.steps.length > 0 && (
        <ol className="apt-example__steps">
          {ex.steps.map((s, i) => (
            <li key={i} className="apt-example__step">
              {typeof s === 'string' ? (
                <span className="apt-example__action">{s}</span>
              ) : (
                <>
                  <span className="apt-example__action">{s.action}</span>
                  {s.why && <span className="apt-example__why">{s.why}</span>}
                </>
              )}
            </li>
          ))}
        </ol>
      )}
      {ex.answer && <div className="apt-example__answer"><strong>Answer:</strong> {ex.answer}</div>}
    </div>
  )
}

function LearnMode({ data }) {
  return (
    <div className="apt-lesson">
      {data.realLife && (
        <Card className="apt-lesson__realLife">
          <h3 className="apt-card-h">🌍 A real-life example</h3>
          <p>{data.realLife}</p>
        </Card>
      )}
      {data.plainMeaning && (
        <Card>
          <h3 className="apt-card-h">💬 What it actually means</h3>
          <p>{data.plainMeaning}</p>
        </Card>
      )}
      {data.mathIntro && (
        <Card>
          <h3 className="apt-card-h">➗ The maths behind it</h3>
          <p>{data.mathIntro}</p>
        </Card>
      )}
      {Array.isArray(data.formulas) && data.formulas.length > 0 && (
        <Card>
          <h3 className="apt-card-h">📐 Formulas, broken down</h3>
          <div className="apt-formula-list">
            {data.formulas.map((f, i) => (
              <div key={i} className="apt-formula">
                {f.label && <span className="apt-formula__label">{f.label}</span>}
                <code className="apt-formula__eq">{f.formula}</code>
                {f.breakdown && <p className="apt-formula__break">{f.breakdown}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}
      {Array.isArray(data.examples) && data.examples.length > 0 && (
        <Card>
          <h3 className="apt-card-h">✍️ Worked examples</h3>
          <div className="apt-example-list">
            {data.examples.map((ex, i) => <ExampleBlock key={i} ex={ex} />)}
          </div>
        </Card>
      )}
      {Array.isArray(data.commonMistakes) && data.commonMistakes.length > 0 && (
        <Card className="apt-lesson__mistakes">
          <h3 className="apt-card-h"><AlertTriangle size={16} /> Common mistakes</h3>
          <ul className="apt-bullet-list">
            {data.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </Card>
      )}
      {data.memoryTrick && (
        <Card className="apt-lesson__trick">
          <h3 className="apt-card-h"><Lightbulb size={16} /> Quick memory trick</h3>
          <p>{data.memoryTrick}</p>
        </Card>
      )}
    </div>
  )
}

function CrackMode({ data }) {
  return (
    <div className="apt-lesson">
      {data.theTrick && (
        <Card className="apt-lesson__trick">
          <h3 className="apt-card-h">⚡ The trick</h3>
          <p>{data.theTrick}</p>
        </Card>
      )}
      {data.shortcut && (data.shortcut.formula || data.shortcut.whereNumbersGo) && (
        <Card className="apt-lesson__shortcut">
          <h3 className="apt-card-h">🎯 The shortcut</h3>
          {data.shortcut.formula && <code className="apt-formula__eq apt-formula__eq--big">{data.shortcut.formula}</code>}
          {data.shortcut.whereNumbersGo && <p className="apt-shortcut__where">{data.shortcut.whereNumbersGo}</p>}
        </Card>
      )}
      {Array.isArray(data.examples) && data.examples.length > 0 && (
        <Card>
          <h3 className="apt-card-h">⚡ Same examples, shortcut only</h3>
          <div className="apt-example-list">
            {data.examples.map((ex, i) => <ExampleBlock key={i} ex={ex} />)}
          </div>
        </Card>
      )}
      {Array.isArray(data.comparison) && data.comparison.length > 0 && (
        <Card>
          <h3 className="apt-card-h">⚖️ Normal vs shortcut</h3>
          <div className="apt-compare">
            {data.comparison.map((c, i) => (
              <div key={i} className="apt-compare__row">
                {c.example && <div className="apt-compare__ex">{c.example}</div>}
                <div className="apt-compare__cols">
                  <div className="apt-compare__col apt-compare__col--normal">
                    <span className="apt-compare__tag">Normal method</span>
                    <p>{c.normal}</p>
                  </div>
                  <div className="apt-compare__col apt-compare__col--shortcut">
                    <span className="apt-compare__tag">Shortcut</span>
                    <p>{c.shortcut}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {data.whyItWorks && (
        <Card>
          <h3 className="apt-card-h">🧠 Why the shortcut works</h3>
          <p>{data.whyItWorks}</p>
        </Card>
      )}
      {(Array.isArray(data.whenWorks) && data.whenWorks.length > 0) ||
      (Array.isArray(data.whenNot) && data.whenNot.length > 0) ? (
        <div className="apt-when-grid">
          {Array.isArray(data.whenWorks) && data.whenWorks.length > 0 && (
            <Card className="apt-when apt-when--yes">
              <h3 className="apt-card-h">✅ When it works</h3>
              <ul className="apt-bullet-list">{data.whenWorks.map((w, i) => <li key={i}>{w}</li>)}</ul>
            </Card>
          )}
          {Array.isArray(data.whenNot) && data.whenNot.length > 0 && (
            <Card className="apt-when apt-when--no">
              <h3 className="apt-card-h">🚫 When it does not</h3>
              <ul className="apt-bullet-list">{data.whenNot.map((w, i) => <li key={i}>{w}</li>)}</ul>
            </Card>
          )}
        </div>
      ) : null}
      {data.practicePattern && (
        <Card className="apt-lesson__pattern">
          <h3 className="apt-card-h">🔁 Practice this pattern</h3>
          <p>{data.practicePattern}</p>
        </Card>
      )}
    </div>
  )
}

function Card({ children, className = '' }) {
  return <div className={`apt-card ${className}`}>{children}</div>
}
