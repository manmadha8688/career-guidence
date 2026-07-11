import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, BookOpen, Zap, Play, Lightbulb, AlertTriangle, Target, Search, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react'
import MatrixRainLoader from '../../components/loaders/MatrixRainLoader'
import EnterArenaButton from '../../components/EnterArenaButton'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useTheme } from '../../context/ThemeContext'
import { getAptitudeTopic, getAptitudeQuestions } from '../../api/api'
import { APTITUDE_CATEGORY_MAP, DIFFICULTY_META } from './aptitudeData'
import { DI_LESSONS } from './dataInterpretationData'
import DataInterpretationLesson from './DataInterpretationLesson'

const EASE = [0.16, 1, 0.3, 1]

export default function AptitudeTopicPage() {
  const { category, group, topicId } = useParams()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  const catMeta = APTITUDE_CATEGORY_MAP[category]

  const [topic, setTopic] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [mode, setMode] = useState('learn')

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    setQuestions([])
    Promise.all([
      getAptitudeTopic(topicId).then(r => setTopic(r.data)).catch(() => setNotFound(true)),
      getAptitudeQuestions(topicId).then(r => setQuestions(r.data || [])).catch(() => setQuestions([])),
    ]).finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [topicId])

  const accent = catMeta?.color || '#0EA5E9'
  const diff = topic ? (DIFFICULTY_META[topic.difficulty] || DIFFICULTY_META.easy) : null
  const videos = topic?.videos || []

  // Each category stores its lesson in a shape tuned to how that subject is
  // taught: quantitative is formula-based (learnIt/crackIt); logical is
  // pattern-based and verbal is rule-based (both under lesson.{mode}).
  const isLogical = category === 'logical'
  const isVerbal = category === 'verbal'
  const learnData = isLogical ? topic?.lesson?.understand
    : isVerbal ? topic?.lesson?.learn
    : topic?.learnIt
  const crackData = (isLogical || isVerbal) ? topic?.lesson?.crack : topic?.crackIt
  const hasLearn = !!learnData
  const hasCrack = !!crackData
  const learnLabel = isLogical ? 'Understand It' : 'Learn It'
  const learnHint = isLogical
    ? 'See the pattern and learn how to think — from zero.'
    : 'Full beginner-first explanation — understand it from zero.'

  // Data Interpretation is taught visually from the frontend (rendered charts),
  // not from DB text — pick up the matching lesson if this is a DI topic.
  const diLesson = category === 'data-interpretation' ? DI_LESSONS[topicId] : null

  return (
    <div className="apt-page" style={{ '--cat-color': accent }}>
      <div className="apt-nav">
        <button
          type="button"
          onClick={() => navigate(
            catMeta && group ? `/aptitude/${category}/${group}`
              : catMeta ? `/aptitude/${category}` : '/aptitude'
          )}
          className="apt-nav__back"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          BACK
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
        <div className={`apt-container apt-container--topic${diLesson ? ' apt-container--di' : ''}`}>
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

          {diLesson ? (
            <DataInterpretationLesson lesson={diLesson} accent={accent} />
          ) : (hasLearn || hasCrack) ? (
            <>
              <div className="apt-modeswitch">
                <div className="apt-seg" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'learn'}
                    className={`apt-seg__btn apt-seg__btn--learn${mode === 'learn' ? ' is-active' : ''}`}
                    onClick={() => setMode('learn')}
                    disabled={!hasLearn}
                  >
                    <BookOpen size={15} /> {learnLabel}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'crack'}
                    className={`apt-seg__btn apt-seg__btn--crack${mode === 'crack' ? ' is-active' : ''}`}
                    onClick={() => setMode('crack')}
                    disabled={!hasCrack}
                  >
                    <Zap size={15} /> Crack It
                  </button>
                </div>
                <p className="apt-modeswitch__hint">
                  {mode === 'learn'
                    ? learnHint
                    : 'Exam-day shortcuts — solve it in seconds.'}
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {mode === 'learn' && hasLearn && (
                    isLogical ? <LogicalUnderstand data={learnData} />
                      : isVerbal ? <VerbalLearn data={learnData} />
                      : <LearnMode data={learnData} />
                  )}
                  {mode === 'crack' && hasCrack && (
                    isLogical ? <LogicalCrack data={crackData} />
                      : isVerbal ? <VerbalCrack data={crackData} />
                      : <CrackMode data={crackData} />
                  )}
                  {mode === 'learn' && !hasLearn && <ComingSoon label={learnLabel} />}
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

          {!diLesson && (questions.length > 0 ? (
            <button
              type="button"
              className="apt-practice-cta"
              onClick={() => navigate(`/aptitude/${category}/${group}/${topicId}/questions`)}
            >
              <span className="apt-practice-cta__icon" aria-hidden="true">🎯</span>
              <span className="apt-practice-cta__body">
                <span className="apt-practice-cta__title">Practice Questions</span>
                <span className="apt-practice-cta__sub">
                  {questions.length} solved question{questions.length !== 1 ? 's' : ''} — answers hidden until you try. Test yourself now.
                </span>
              </span>
              <span className="apt-practice-cta__go">Start <ChevronRight size={16} /></span>
            </button>
          ) : (
            <section className="apt-questions-soon">
              <span className="apt-questions-soon__badge">Practice</span>
              <h2>Questions Coming Soon</h2>
              <p>Solved practice questions and a timed quiz for this topic are on the way.</p>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

// 60-second drill — answers hidden, revealed per-item on click (self-test).
function DrillList({ items }) {
  const [open, setOpen] = useState({})
  return (
    <ol className="apt-drill-list">
      {items.map((d, i) => {
        const shown = !!open[i]
        return (
          <li key={i} className="apt-drill__item">
            <span className="apt-drill__q">{d.question}</span>
            <button
              type="button"
              className={`apt-drill__reveal${shown ? ' is-shown' : ''}`}
              onClick={() => setOpen(o => ({ ...o, [i]: !o[i] }))}
              aria-label={shown ? 'Hide answer' : 'Show answer'}
            >
              {shown ? <span className="apt-drill__a">{d.answer}</span> : 'Tap to reveal'}
            </button>
          </li>
        )
      })}
    </ol>
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
                {f.example && <p className="apt-formula__ex"><strong>Example:</strong> {f.example}</p>}
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
      {Array.isArray(data.questionTypes) && data.questionTypes.length > 0 && (
        <Card>
          <h3 className="apt-card-h"><Target size={16} /> Every question type</h3>
          <div className="apt-qtype-list">
            {data.questionTypes.map((qt, i) => (
              <div key={i} className="apt-qtype">
                <h4 className="apt-qtype__name">{qt.name}</h4>
                {qt.idea && <p className="apt-qtype__idea">{qt.idea}</p>}
                <ExampleBlock ex={{ level: 'Example', problem: qt.problem, steps: qt.steps, answer: qt.answer }} />
              </div>
            ))}
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
      {data.oneLine && (
        <Card className="apt-lesson__oneline">
          <h3 className="apt-card-h">⚡ The whole topic in one line</h3>
          <p className="apt-oneline">{data.oneLine}</p>
        </Card>
      )}
      {Array.isArray(data.shortcuts) && data.shortcuts.length > 0 && (
        <Card>
          <h3 className="apt-card-h">🎯 Shortcuts — one per question type</h3>
          <div className="apt-scut-list">
            {data.shortcuts.map((s, i) => (
              <div key={i} className="apt-scut">
                <h4 className="apt-scut__name">{s.name}</h4>
                {s.method && <code className="apt-formula__eq">{s.method}</code>}
                {s.whereNumbersGo && <p className="apt-scut__where"><strong>Where the numbers go:</strong> {s.whereNumbersGo}</p>}
                {s.example && <p className="apt-scut__ex"><strong>Same example:</strong> {s.example}</p>}
                {s.timeSaved && <p className="apt-scut__time"><Clock size={13} /> {s.timeSaved}</p>}
                <div className="apt-scut__when">
                  {s.whenWorks && <span className="apt-scut__yes"><CheckCircle2 size={13} /> {s.whenWorks}</span>}
                  {s.whenFails && <span className="apt-scut__no"><XCircle size={13} /> {s.whenFails}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {Array.isArray(data.patternGuide) && data.patternGuide.length > 0 && (
        <Card>
          <h3 className="apt-card-h"><Search size={16} /> Pattern recognition — read the question, pick the trick</h3>
          <div className="apt-pattern-list">
            {data.patternGuide.map((p, i) => (
              <div key={i} className="apt-pattern">
                <span className="apt-pattern__signal">{p.signal}</span>
                <span className="apt-pattern__arrow" aria-hidden="true">→</span>
                <span className="apt-pattern__use">{p.use}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      {Array.isArray(data.drill) && data.drill.length > 0 && (
        <Card className="apt-lesson__drill">
          <h3 className="apt-card-h"><Clock size={16} /> 60-second drill</h3>
          <p className="apt-drill__hint">Say the answer out loud first, then reveal to check. If you can name the trick for each, you own this topic.</p>
          <DrillList items={data.drill} />
        </Card>
      )}
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

// ── Shared "best for / be careful when" two-column grid ─────────────────────
function WhenGrid({ yes, no, yesLabel, noLabel }) {
  const hasYes = Array.isArray(yes) && yes.length > 0
  const hasNo = Array.isArray(no) && no.length > 0
  if (!hasYes && !hasNo) return null
  return (
    <div className="apt-when-grid">
      {hasYes && (
        <Card className="apt-when apt-when--yes">
          <h3 className="apt-card-h">{yesLabel}</h3>
          <ul className="apt-bullet-list">{yes.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </Card>
      )}
      {hasNo && (
        <Card className="apt-when apt-when--no">
          <h3 className="apt-card-h">{noLabel}</h3>
          <ul className="apt-bullet-list">{no.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </Card>
      )}
    </div>
  )
}

// ── Shared: fully-solved question types (Logical + Verbal) ──────────────────
function WorkedTypes({ items, heading }) {
  if (!Array.isArray(items) || items.length === 0) return null
  return (
    <Card>
      <h3 className="apt-card-h"><Target size={16} /> {heading}</h3>
      <div className="apt-qtype-list">
        {items.map((qt, i) => (
          <div key={i} className="apt-qtype">
            <h4 className="apt-qtype__name">{qt.name}</h4>
            {qt.idea && <p className="apt-qtype__idea">{qt.idea}</p>}
            <ExampleBlock ex={{ level: 'Example', problem: qt.problem, steps: qt.steps, answer: qt.answer }} />
          </div>
        ))}
      </div>
    </Card>
  )
}

// ── LOGICAL: pattern-based lesson ───────────────────────────────────────────
function LogicalUnderstand({ data }) {
  return (
    <div className="apt-lesson">
      {data.realLife && (
        <Card className="apt-lesson__realLife">
          <h3 className="apt-card-h">🌍 A real-life example</h3>
          <p>{data.realLife}</p>
        </Card>
      )}
      {data.coreIdea && (
        <Card>
          <h3 className="apt-card-h">💬 What it actually asks</h3>
          <p>{data.coreIdea}</p>
        </Card>
      )}
      {data.howToThink && (
        <Card>
          <h3 className="apt-card-h">🧭 How to think about it</h3>
          <p>{data.howToThink}</p>
        </Card>
      )}
      {Array.isArray(data.patterns) && data.patterns.length > 0 && (
        <Card>
          <h3 className="apt-card-h">🧩 Patterns to know</h3>
          <div className="apt-formula-list">
            {data.patterns.map((p, i) => (
              <div key={i} className="apt-formula">
                {p.name && <span className="apt-formula__label">{p.name}</span>}
                {p.whatItLooksLike && <code className="apt-formula__eq">{p.whatItLooksLike}</code>}
                {p.howItWorks && <p className="apt-formula__break">{p.howItWorks}</p>}
                {p.example && <p className="apt-formula__ex"><strong>Example:</strong> {p.example}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}
      <WorkedTypes items={data.workedTypes} heading="Every question type" />
      {Array.isArray(data.traps) && data.traps.length > 0 && (
        <Card className="apt-lesson__mistakes">
          <h3 className="apt-card-h"><AlertTriangle size={16} /> Common mistakes</h3>
          <ul className="apt-bullet-list">{data.traps.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </Card>
      )}
      {data.memoryHook && (
        <Card className="apt-lesson__trick">
          <h3 className="apt-card-h"><Lightbulb size={16} /> Quick memory hook</h3>
          <p>{data.memoryHook}</p>
        </Card>
      )}
    </div>
  )
}

function LogicalCrack({ data }) {
  return (
    <div className="apt-lesson">
      {data.oneLine && (
        <Card className="apt-lesson__oneline">
          <h3 className="apt-card-h">⚡ The whole topic in one line</h3>
          <p className="apt-oneline">{data.oneLine}</p>
        </Card>
      )}
      {Array.isArray(data.techniques) && data.techniques.length > 0 && (
        <Card>
          <h3 className="apt-card-h">🎯 Fast techniques — one per question type</h3>
          <div className="apt-scut-list">
            {data.techniques.map((s, i) => (
              <div key={i} className="apt-scut">
                <h4 className="apt-scut__name">{s.name}</h4>
                {s.method && <code className="apt-formula__eq">{s.method}</code>}
                {s.howToApply && <p className="apt-scut__where"><strong>How to apply:</strong> {s.howToApply}</p>}
                {s.example && <p className="apt-scut__ex"><strong>Example:</strong> {s.example}</p>}
                {s.timeSaved && <p className="apt-scut__time"><Clock size={13} /> {s.timeSaved}</p>}
                <div className="apt-scut__when">
                  {s.whenWorks && <span className="apt-scut__yes"><CheckCircle2 size={13} /> {s.whenWorks}</span>}
                  {s.whenFails && <span className="apt-scut__no"><XCircle size={13} /> {s.whenFails}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {Array.isArray(data.clueToMethod) && data.clueToMethod.length > 0 && (
        <Card>
          <h3 className="apt-card-h"><Search size={16} /> Read the clue → pick the method</h3>
          <div className="apt-pattern-list">
            {data.clueToMethod.map((p, i) => (
              <div key={i} className="apt-pattern">
                <span className="apt-pattern__signal">{p.clue}</span>
                <span className="apt-pattern__arrow" aria-hidden="true">→</span>
                <span className="apt-pattern__use">{p.method}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      {Array.isArray(data.drill) && data.drill.length > 0 && (
        <Card className="apt-lesson__drill">
          <h3 className="apt-card-h"><Clock size={16} /> 60-second drill</h3>
          <p className="apt-drill__hint">Say the answer out loud first, then reveal to check. If you can name the method for each, you own this topic.</p>
          <DrillList items={data.drill} />
        </Card>
      )}
      {data.whyItWorks && (
        <Card>
          <h3 className="apt-card-h">🧠 Why it works</h3>
          <p>{data.whyItWorks}</p>
        </Card>
      )}
      <WhenGrid yes={data.bestFor} no={data.notFor} yesLabel="✅ Best for" noLabel="🚫 Be careful when" />
      {data.practicePattern && (
        <Card className="apt-lesson__pattern">
          <h3 className="apt-card-h">🔁 Practice this pattern</h3>
          <p>{data.practicePattern}</p>
        </Card>
      )}
    </div>
  )
}

// ── VERBAL: rule-based lesson ───────────────────────────────────────────────
function VerbalLearn({ data }) {
  return (
    <div className="apt-lesson">
      {data.realLife && (
        <Card className="apt-lesson__realLife">
          <h3 className="apt-card-h">🌍 A real-life example</h3>
          <p>{data.realLife}</p>
        </Card>
      )}
      {data.coreIdea && (
        <Card>
          <h3 className="apt-card-h">💬 What it actually tests</h3>
          <p>{data.coreIdea}</p>
        </Card>
      )}
      {data.howItWorks && (
        <Card>
          <h3 className="apt-card-h">🧭 How it works</h3>
          <p>{data.howItWorks}</p>
        </Card>
      )}
      {Array.isArray(data.rules) && data.rules.length > 0 && (
        <Card>
          <h3 className="apt-card-h">📘 Rules to remember</h3>
          <div className="apt-formula-list">
            {data.rules.map((r, i) => (
              <div key={i} className="apt-formula">
                {r.name && <span className="apt-formula__label">{r.name}</span>}
                {r.rule && <code className="apt-formula__eq">{r.rule}</code>}
                {r.explanation && <p className="apt-formula__break">{r.explanation}</p>}
                {r.example && <p className="apt-formula__ex"><strong>Example:</strong> {r.example}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}
      <WorkedTypes items={data.workedTypes} heading="Every question type" />
      {Array.isArray(data.traps) && data.traps.length > 0 && (
        <Card className="apt-lesson__mistakes">
          <h3 className="apt-card-h"><AlertTriangle size={16} /> Common mistakes</h3>
          <ul className="apt-bullet-list">{data.traps.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </Card>
      )}
      {data.memoryHook && (
        <Card className="apt-lesson__trick">
          <h3 className="apt-card-h"><Lightbulb size={16} /> Quick memory hook</h3>
          <p>{data.memoryHook}</p>
        </Card>
      )}
    </div>
  )
}

function VerbalCrack({ data }) {
  return (
    <div className="apt-lesson">
      {data.oneLine && (
        <Card className="apt-lesson__oneline">
          <h3 className="apt-card-h">⚡ The whole topic in one line</h3>
          <p className="apt-oneline">{data.oneLine}</p>
        </Card>
      )}
      {Array.isArray(data.strategies) && data.strategies.length > 0 && (
        <Card>
          <h3 className="apt-card-h">🎯 Exam strategies — one per question type</h3>
          <div className="apt-scut-list">
            {data.strategies.map((s, i) => (
              <div key={i} className="apt-scut">
                <h4 className="apt-scut__name">{s.name}</h4>
                {s.method && <code className="apt-formula__eq">{s.method}</code>}
                {s.howToApply && <p className="apt-scut__where"><strong>How to apply:</strong> {s.howToApply}</p>}
                {s.example && <p className="apt-scut__ex"><strong>Example:</strong> {s.example}</p>}
                <div className="apt-scut__when">
                  {s.whenWorks && <span className="apt-scut__yes"><CheckCircle2 size={13} /> {s.whenWorks}</span>}
                  {s.whenFails && <span className="apt-scut__no"><XCircle size={13} /> {s.whenFails}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {Array.isArray(data.signalGuide) && data.signalGuide.length > 0 && (
        <Card>
          <h3 className="apt-card-h"><Search size={16} /> Signal words — spot it, know the move</h3>
          <div className="apt-pattern-list">
            {data.signalGuide.map((p, i) => (
              <div key={i} className="apt-pattern">
                <span className="apt-pattern__signal">{p.signal}</span>
                <span className="apt-pattern__arrow" aria-hidden="true">→</span>
                <span className="apt-pattern__use">{p.use}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      {Array.isArray(data.drill) && data.drill.length > 0 && (
        <Card className="apt-lesson__drill">
          <h3 className="apt-card-h"><Clock size={16} /> 60-second drill</h3>
          <p className="apt-drill__hint">Say the answer out loud first, then reveal to check.</p>
          <DrillList items={data.drill} />
        </Card>
      )}
      {data.whyItWorks && (
        <Card>
          <h3 className="apt-card-h">🧠 Why it works</h3>
          <p>{data.whyItWorks}</p>
        </Card>
      )}
      <WhenGrid yes={data.bestFor} no={data.notFor} yesLabel="✅ Best for" noLabel="🚫 Be careful when" />
      {data.practicePattern && (
        <Card className="apt-lesson__pattern">
          <h3 className="apt-card-h">🔁 Practice this pattern</h3>
          <p>{data.practicePattern}</p>
        </Card>
      )}
    </div>
  )
}
