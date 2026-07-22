import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import SystemAwakeningLoader from '../../components/loaders/SystemAwakeningLoader'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { getAptitudeMockPaper, submitAptitudeMock } from '../../api/api'
import { getApiError } from '../../utils/apiError'
import { stashQuizReview } from '../../utils/quizReviewOnce'
import { useAuth } from '../../context/AuthContext'
import { getRank } from '../../utils/slRank'
import '../../styles/pages/dashboard/index.css'
import '../../styles/pages/dashboard/quiz-page.css'
import '../../styles/pages/shared/aptitude.css'

const LETTERS = ['A', 'B', 'C', 'D']

function formatTime(secs) {
  const m = Math.floor(Math.max(0, secs) / 60).toString().padStart(2, '0')
  const s = (Math.max(0, secs) % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function timerColor(secs, total) {
  if (!total) return '#9B6ED4'
  const pct = secs / total
  if (pct < 0.1) return '#EF4444'
  if (pct < 0.25) return '#F59E0B'
  return '#9B6ED4'
}

export default function AptitudeMockExamPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const submittingRef = useRef(false)
  const sectionAdvancingRef = useRef(false)

  const [paper, setPaper] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [sectionIdx, setSectionIdx] = useState(0)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [overallLeft, setOverallLeft] = useState(null)
  const [sectionLeft, setSectionLeft] = useState(null)
  const [overallTotal, setOverallTotal] = useState(null)
  const [sectionTotal, setSectionTotal] = useState(null)

  const xp = user?.xp ?? 0
  const rank = getRank(xp)
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  const section = paper?.sections?.[sectionIdx]
  const questions = section?.questions || []
  const q = questions[current]
  const isLastSection = paper ? sectionIdx >= paper.sections.length - 1 : false
  const isLastQuestion = current >= questions.length - 1

  const allQuestionIds = useMemo(
    () => (paper?.sections || []).flatMap(s => (s.questions || []).map(qn => qn.id)),
    [paper],
  )

  const answeredCount = useMemo(
    () => allQuestionIds.filter(id => answers[id]).length,
    [allQuestionIds, answers],
  )

  useEffect(() => {
    let alive = true
    let doneTimer
    getAptitudeMockPaper()
      .then(r => {
        if (!alive) return
        const data = r.data
        setPaper(data)
        setOverallLeft(data.overallTimeSeconds)
        setOverallTotal(data.overallTimeSeconds)
        const first = data.sections?.[0]
        if (first) {
          setSectionLeft(first.timeSeconds)
          setSectionTotal(first.timeSeconds)
        }
      })
      .catch(err => {
        if (alive) {
          toast.error(getApiError(err, 'Could not load the mock paper. Please try again.'))
          navigate('/aptitude')
        }
      })
      .finally(() => { if (alive) doneTimer = setTimeout(() => setLoading(false), PAGE_MIN_MS) })
    return () => { alive = false; clearTimeout(doneTimer) }
  }, [navigate])

  const doSubmit = useCallback(async () => {
    if (submittingRef.current || !paper) return
    submittingRef.current = true
    setSubmitting(true)
    try {
      const res = await submitAptitudeMock({ answers, questionIds: allQuestionIds })
      const data = res.data
      stashQuizReview(data.attemptId, data)
      navigate(`/aptitude/mock/result/${data.attemptId}`, { replace: true, state: { result: data } })
    } catch (err) {
      toast.error(getApiError(err, 'Could not submit the mock. Please try again.'))
      submittingRef.current = false
      setSubmitting(false)
    }
  }, [answers, allQuestionIds, navigate, paper])

  const advanceSection = useCallback(() => {
    if (!paper || sectionAdvancingRef.current || submittingRef.current) return
    if (isLastSection) {
      doSubmit()
      return
    }
    sectionAdvancingRef.current = true
    const nextIdx = sectionIdx + 1
    const nextSec = paper.sections[nextIdx]
    setSectionIdx(nextIdx)
    setCurrent(0)
    setSectionLeft(nextSec.timeSeconds)
    setSectionTotal(nextSec.timeSeconds)
    toast.success(`${nextSec.label} — section ${nextIdx + 1} of ${paper.sections.length}`)
    requestAnimationFrame(() => { sectionAdvancingRef.current = false })
  }, [doSubmit, isLastSection, paper, sectionIdx])

  useEffect(() => {
    if (overallLeft === null || submittingRef.current) return
    if (overallLeft <= 0) { doSubmit(); return }
    const t = setTimeout(() => setOverallLeft(n => n - 1), 1000)
    return () => clearTimeout(t)
  }, [overallLeft, doSubmit])

  useEffect(() => {
    if (sectionLeft === null || sectionAdvancingRef.current || submittingRef.current) return
    if (sectionLeft <= 0) { advanceSection(); return }
    const t = setTimeout(() => setSectionLeft(n => n - 1), 1000)
    return () => clearTimeout(t)
  }, [sectionLeft, advanceSection])

  const selectAnswer = letter => {
    if (!q) return
    setAnswers(prev => ({ ...prev, [q.id]: letter }))
  }

  const prev = () => current > 0 && setCurrent(c => c - 1)
  const next = () => current < questions.length - 1 && setCurrent(c => c + 1)

  if (loading) return <SystemAwakeningLoader subtitle="LOADING MOCK" />

  if (!paper || !section || !q) {
    return (
      <div className="dash-quiz-page">
        <div className="dash-quiz-unavailable">
          <h2 className="dash-quiz-unavailable__title">Mock not available</h2>
          <p className="dash-quiz-unavailable__text">Not enough questions in the bank yet. Try again later.</p>
          <button type="button" className="dash-quiz-back-btn" onClick={() => navigate('/aptitude')}>
            <ArrowLeft size={13} /> APTITUDE
          </button>
        </div>
      </div>
    )
  }

  const chosen = answers[q.id]
  const progress = ((current + 1) / questions.length) * 100
  const overallColor = timerColor(overallLeft, overallTotal)
  const sectionColor = timerColor(sectionLeft, sectionTotal)

  return (
    <div className="dash-quiz-page apt-mock-exam">

      <header className="dash-quiz-header apt-mock-exam__header">
        <button type="button" onClick={() => navigate('/aptitude')} className="dash-quiz-back-btn">
          <ArrowLeft size={13} /> APTITUDE
        </button>

        <div className="dash-quiz-progress-wrap">
          <div className="dash-quiz-progress-labels">
            <span className="dash-quiz-progress-trial apt-mock-exam__section-label" style={{ '--sec-color': section.color }}>
              {section.icon} {section.label} · Q{current + 1}/{questions.length}
            </span>
            <span className="dash-quiz-progress-answered">{answeredCount}/{paper.totalQuestions} ANSWERED</span>
          </div>
          <div className="dash-quiz-progress-track">
            <div className="dash-quiz-progress-fill" style={{ '--progress-pct': `${progress}%`, background: section.color }} />
          </div>
        </div>

        <div className="dash-quiz-header-right apt-mock-exam__timers">
          <div className="apt-mock-exam__timer-block">
            <span className="apt-mock-exam__timer-label">SECTION</span>
            <div className="dash-quiz-timer" style={{ '--timer-color': sectionColor }}>{formatTime(sectionLeft)}</div>
          </div>
          <div className="apt-mock-exam__timer-block">
            <span className="apt-mock-exam__timer-label">OVERALL</span>
            <div className="dash-quiz-timer" style={{ '--timer-color': overallColor }}>{formatTime(overallLeft)}</div>
          </div>
          <span className={`rank-badge ${rank.cls} dash-quiz-rank-badge`}>{rank.label}</span>
          <div className="dash-avatar dash-avatar--sm" style={{ '--avatar-bg': user?.avatarColor || '#9B6ED4', '--rank-color': rank.color }}>
            {initials}
          </div>
        </div>
      </header>

      <div className="dash-quiz-body">
        <div className="dash-quiz-inner">
          <div className="dash-quiz-question-card">
            <div className="dash-quiz-question-label">Q {current + 1} · SECTION {sectionIdx + 1}/3</div>
            <div className="dash-quiz-question-text">{q.question}</div>
          </div>

          <div className="dash-quiz-options">
            {(q.options || []).map((opt, i) => {
              const letter = LETTERS[i]
              const isSelected = chosen === letter
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => selectAnswer(letter)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectAnswer(letter) }
                  }}
                  className={`dash-quiz-option${isSelected ? ' is-selected' : ''}`}
                >
                  <div className="dash-quiz-option__letter">{letter}</div>
                  <span className="dash-quiz-option__text">{opt}</span>
                  {isSelected && <div className="dash-quiz-option__dot" />}
                </div>
              )
            })}
          </div>

          <div className="dash-quiz-nav">
            <div className="dash-quiz-dots">
              {questions.map((qn, i) => (
                <button
                  key={qn.id}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`dash-quiz-dot${i === current ? ' is-current' : ''}${answers[qn.id] ? ' is-answered' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="dash-quiz-actions apt-mock-exam__actions">
              <button type="button" onClick={prev} disabled={current === 0} className="dash-quiz-prev-btn">← PREV</button>

              {!isLastQuestion ? (
                <button type="button" onClick={next} className="dash-quiz-next-btn">NEXT →</button>
              ) : (
                <button type="button" onClick={advanceSection} disabled={submitting} className="apt-mock-exam__finish-btn">
                  {isLastSection ? (submitting ? 'SUBMITTING…' : 'SUBMIT MOCK') : 'FINISH SECTION →'}
                </button>
              )}

              {!isLastQuestion && (
                <button type="button" onClick={advanceSection} disabled={submitting} className="apt-mock-exam__finish-early">
                  {isLastSection ? 'Submit early' : 'Finish section early'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
