import { useState, useEffect, useCallback } from 'react'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SystemAwakeningLoader from '../../components/loaders/SystemAwakeningLoader'
import { startConceptQuiz, startSubjectQuiz, startRoadmapQuiz, submitQuiz } from '../../api/api'
import { getRank } from '../../utils/slRank'
import { useAuth } from '../../context/AuthContext'
import { getApiError } from '../../utils/apiError'
import { isMongoId } from '../../utils/mongoId'
import toast from 'react-hot-toast'

const QUIZ_TYPES = { concept: startConceptQuiz, subject: startSubjectQuiz, roadmap: startRoadmapQuiz }

const LETTERS = ['A', 'B', 'C', 'D']

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function timerColor(secs, total) {
  const pct = secs / total
  if (pct < 0.1) return '#EF4444'
  if (pct < 0.25) return '#F59E0B'
  return '#9B6ED4'
}

export default function QuizPage() {
  const { type, refId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [quiz, setQuiz]             = useState(null)
  const [answers, setAnswers]       = useState([])
  const [current, setCurrent]       = useState(0)
  const [loading, setLoading]       = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [timeLeft, setTimeLeft]     = useState(null)
  const [totalSeconds, setTotalSeconds] = useState(null)

  const xp      = user?.xp ?? 0
  const rank    = getRank(xp)
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  useEffect(() => {
    const fn = QUIZ_TYPES[type]
    if (!fn || !isMongoId(refId)) {
      toast.error('That trial link is invalid.')
      navigate(-1)
      return
    }
    let active = true
    let doneTimer
    fn(refId)
      .then(r => {
        if (!active) return
        setQuiz(r.data)
        setAnswers(new Array(r.data.questions.length).fill(-1))
        if (r.data.timeLimitMinutes) {
          const secs = r.data.timeLimitMinutes * 60
          setTimeLeft(secs); setTotalSeconds(secs)
        }
      })
      .catch(err => { if (active) { toast.error(getApiError(err, 'We could not start this trial. Please try again.')); navigate(-1) } })
      .finally(() => { if (active) doneTimer = setTimeout(() => setLoading(false), PAGE_MIN_MS) })
    return () => { active = false; clearTimeout(doneTimer) }
  }, [type, refId])

  const handleSubmit = useCallback(async (currentAnswers) => {
    if (submitting) return
    setSubmitting(true)
    try {
      const res = await submitQuiz({
        type: type.toUpperCase(), refId,
        questionIds: quiz.questions.map(q => q.id),
        answers: currentAnswers || answers,
      })
      navigate(`/skill-arena/quiz/result/${res.data.attemptId}?type=${type}&refId=${refId}`, { replace: true })
    } catch (err) {
      toast.error(getApiError(err, 'We could not submit this trial. Please try again.'))
      setSubmitting(false)
    }
  }, [submitting, type, refId, quiz, answers, navigate])

  useEffect(() => {
    if (timeLeft === null) return
    if (timeLeft <= 0) { handleSubmit(answers); return }
    const t = setTimeout(() => setTimeLeft(n => n - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft])

  const selectAnswer = idx =>
    setAnswers(prev => { const a = [...prev]; a[current] = idx; return a })
  const next = () => current < quiz.questions.length - 1 && setCurrent(c => c + 1)
  const prev = () => current > 0 && setCurrent(c => c - 1)

  // ── Loading ──────────────────────────────────────────
  if (loading) return <SystemAwakeningLoader subtitle="LOADING QUIZ" />

  if (!quiz) return null

  const q            = quiz.questions[current]
  const answered     = answers[current]
  const isLast       = current === quiz.questions.length - 1
  const answeredCount = answers.filter(a => a !== -1).length
  const progress     = ((current + 1) / quiz.questions.length) * 100
  const tColor       = timeLeft !== null ? timerColor(timeLeft, totalSeconds) : '#9B6ED4'

  return (
    <div className="dash-quiz-page">

      {/* ── Header (fixed 52px) ── */}
      <header className="dash-quiz-header">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="dash-quiz-back-btn"
        >
          <ArrowLeft size={13} /> GATES
        </button>

        {/* Progress bar in header */}
        <div className="dash-quiz-progress-wrap">
          <div className="dash-quiz-progress-labels">
            <span className="dash-quiz-progress-trial">
              TRIAL {current + 1} / {quiz.questions.length}
            </span>
            <span className="dash-quiz-progress-answered">
              {answeredCount} ANSWERED
            </span>
          </div>
          <div className="dash-quiz-progress-track">
            <div className="dash-quiz-progress-fill" style={{ '--progress-pct': `${progress}%` }} />
          </div>
        </div>

        <div className="dash-quiz-header-right">
          {timeLeft !== null && (
            <div className="dash-quiz-timer" style={{ '--timer-color': tColor }}>
              {formatTime(timeLeft)}
            </div>
          )}
          <span className={`rank-badge ${rank.cls} dash-quiz-rank-badge`}>{rank.label}</span>
          <div
            className="dash-avatar dash-avatar--sm"
            style={{ '--avatar-bg': user?.avatarColor || '#9B6ED4', '--rank-color': rank.color }}
          >
            {initials}
          </div>
        </div>
      </header>

      {/* ── Body (fills remaining height, no scroll) ── */}
      <div className="dash-quiz-body">
        <div className="dash-quiz-inner">

          {/* Question */}
          <div className="dash-quiz-question-card">
            <div className="dash-quiz-question-label">
              TRIAL {current + 1}
            </div>
            <div className="dash-quiz-question-text">
              {q.text}
            </div>
          </div>

          {/* Options — fill remaining space evenly */}
          <div className="dash-quiz-options">
            {q.options.map((opt, i) => {
              const isSelected = answered === i
              return (
                <div
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`dash-quiz-option${isSelected ? ' is-selected' : ''}`}
                >
                  <div className="dash-quiz-option__letter">
                    {LETTERS[i]}
                  </div>
                  <span className="dash-quiz-option__text">
                    {opt}
                  </span>
                  {isSelected && <div className="dash-quiz-option__dot" />}
                </div>
              )
            })}
          </div>

          {/* Nav dots + actions (always at bottom) */}
          <div className="dash-quiz-nav">
            {/* Question dots */}
            <div className="dash-quiz-dots">
              {quiz.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`dash-quiz-dot${i === current ? ' is-current' : ''}${answers[i] !== -1 ? ' is-answered' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Prev / Next / Submit */}
            <div className="dash-quiz-actions">
              <button
                onClick={prev}
                disabled={current === 0}
                className="dash-quiz-prev-btn"
              >
                ← PREV
              </button>

              {!isLast ? (
                <button
                  onClick={next}
                  disabled={answered === -1}
                  className="dash-quiz-next-btn"
                >
                  NEXT →
                </button>
              ) : answered === -1 ? (
                <button
                  disabled
                  className="dash-quiz-submit-disabled"
                >
                  ANSWER TO SUBMIT
                </button>
              ) : (
                <button
                  onClick={() => handleSubmit(answers)}
                  disabled={submitting}
                  className="dash-quiz-submit-btn"
                >
                  {submitting ? <span className="loading-spinner dash-quiz-submit-btn__spinner" /> : '⚔️'}
                  {submitting ? 'SUBMITTING…' : `SUBMIT (${answeredCount}/${quiz.questions.length})`}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
