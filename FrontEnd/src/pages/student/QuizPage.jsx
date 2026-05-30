import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import { startConceptQuiz, startSubjectQuiz, startRoadmapQuiz, submitQuiz } from '../../api/api'
import toast from 'react-hot-toast'

const LETTERS = ['A', 'B', 'C', 'D']

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function timerClass(secs, total) {
  const pct = secs / total
  if (pct < 0.1) return 'danger'
  if (pct < 0.25) return 'warning'
  return ''
}

export default function QuizPage() {
  const { type, refId } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [totalSeconds, setTotalSeconds] = useState(null)

  useEffect(() => {
    const fn = type === 'concept' ? startConceptQuiz
             : type === 'subject' ? startSubjectQuiz
             : startRoadmapQuiz
    fn(refId)
      .then(r => {
        setQuiz(r.data)
        setAnswers(new Array(r.data.questions.length).fill(-1))
        if (r.data.timeLimitMinutes) {
          const secs = r.data.timeLimitMinutes * 60
          setTimeLeft(secs)
          setTotalSeconds(secs)
        }
      })
      .catch(err => {
        const msg = err.response?.data?.error || 'Failed to start quiz'
        toast.error(msg)
        navigate(-1)
      })
      .finally(() => setLoading(false))
  }, [type, refId])

  const handleSubmit = useCallback(async (currentAnswers) => {
    if (submitting) return
    setSubmitting(true)
    try {
      const res = await submitQuiz({
        type: type.toUpperCase(),
        refId,
        questionIds: quiz.questions.map(q => q.id),
        answers: currentAnswers || answers
      })
      navigate(`/quiz/result/${res.data.attemptId}?type=${type}&refId=${refId}`)
    } catch {
      toast.error('Failed to submit quiz')
      setSubmitting(false)
    }
  }, [submitting, type, refId, quiz, answers, navigate])

  useEffect(() => {
    if (timeLeft === null) return
    if (timeLeft <= 0) {
      handleSubmit(answers)
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const selectAnswer = (idx) => {
    setAnswers(prev => { const a = [...prev]; a[current] = idx; return a })
  }

  const next = () => {
    if (current < quiz.questions.length - 1) setCurrent(c => c + 1)
  }

  const prev = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  if (loading) return (
    <AppLayout title="Quiz">
      <div className="flex-center" style={{ height: '60vh' }}>
        <div className="loading-spinner-lg" />
      </div>
    </AppLayout>
  )

  if (!quiz) return null

  const q = quiz.questions[current]
  const answered = answers[current]
  const isLast = current === quiz.questions.length - 1
  const answeredCount = answers.filter(a => a !== -1).length
  const progress = ((current + 1) / quiz.questions.length) * 100

  const typeLabel = type === 'concept' ? 'Concept Quiz'
                  : type === 'subject' ? 'Subject Assessment'
                  : 'Roadmap Final Test'

  return (
    <AppLayout title={typeLabel}>
      <div className="quiz-container">
        {/* Header */}
        <div className="quiz-header">
          <div style={{ flex: 1 }}>
            <div className="quiz-progress-text" style={{ marginBottom: '0.5rem' }}>
              Question {current + 1} of {quiz.questions.length} · {answeredCount} answered
            </div>
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          {timeLeft !== null && (
            <div className={`quiz-timer ${timerClass(timeLeft, totalSeconds)}`}>
              ⏱ {formatTime(timeLeft)}
            </div>
          )}
        </div>

        {/* Question */}
        <div className="quiz-question-card">
          <div className="quiz-question-number">Question {current + 1}</div>
          <div className="quiz-question-text">{q.text}</div>
          {q.options.map((opt, i) => (
            <div
              key={i}
              className={`quiz-option ${answered === i ? 'selected' : ''}`}
              onClick={() => selectAnswer(i)}
            >
              <span className="quiz-option-letter">{LETTERS[i]}</span>
              {opt}
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {quiz.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: 28, height: 28, borderRadius: '50%', border: 'none', cursor: 'pointer',
                fontSize: '0.7rem', fontWeight: 600,
                background: i === current ? 'var(--primary)'
                          : answers[i] !== -1 ? '#D1FAE5'
                          : 'var(--bg-tertiary)',
                color: i === current ? '#fff' : answers[i] !== -1 ? '#065F46' : 'var(--text-muted)'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="quiz-actions">
          <button className="btn btn-ghost btn-sm" onClick={prev} disabled={current === 0}>
            ← Previous
          </button>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {!isLast ? (
              <button className="btn btn-primary" onClick={next} disabled={answered === -1}>
                Next →
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => handleSubmit(answers)}
                disabled={submitting}
              >
                {submitting ? <span className="loading-spinner" /> : null}
                {submitting ? 'Submitting…' : `Submit Quiz (${answeredCount}/${quiz.questions.length})`}
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted" style={{ textAlign: 'center', marginTop: '1rem' }}>
          You can go back and change answers before submitting.
          {type !== 'concept' && ' Timer counts down — quiz auto-submits when time runs out.'}
        </p>
      </div>
    </AppLayout>
  )
}
