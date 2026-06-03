import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { startConceptQuiz, startSubjectQuiz, startRoadmapQuiz, submitQuiz } from '../../api/api'
import { getRank } from '../../utils/slRank'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

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
  const typeLabel = type === 'concept' ? 'Skill Gate Trial'
                  : type === 'subject' ? 'Gate Assessment'
                  : 'Path Final Trial'

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
          setTimeLeft(secs); setTotalSeconds(secs)
        }
      })
      .catch(err => { toast.error(err.response?.data?.error || 'Failed to start trial'); navigate(-1) })
      .finally(() => setLoading(false))
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
    } catch {
      toast.error('Failed to submit trial')
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
  if (loading) return (
    <div style={{ height: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 52, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 1.5rem' }}>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '1rem', color: '#B48AE8', letterSpacing: '0.12em' }}>ARISE</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner-lg" />
      </div>
    </div>
  )

  if (!quiz) return null

  const q            = quiz.questions[current]
  const answered     = answers[current]
  const isLast       = current === quiz.questions.length - 1
  const answeredCount = answers.filter(a => a !== -1).length
  const progress     = ((current + 1) / quiz.questions.length) * 100
  const tColor       = timeLeft !== null ? timerColor(timeLeft, totalSeconds) : '#9B6ED4'

  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Rajdhani', sans-serif",
    }}>

      {/* ── Header (fixed 52px) ── */}
      <header style={{
        height: 52, flexShrink: 0,
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 1.25rem', gap: '0.875rem',
      }}>
        <button
          onClick={() => navigate('/skill-arena/dashboard?view=gates')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.06em', flexShrink: 0 }}
        >
          <ArrowLeft size={13} /> GATES
        </button>

        {/* Progress bar in header */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#9B6ED4', letterSpacing: '0.1em' }}>
              TRIAL {current + 1} / {quiz.questions.length}
            </span>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              {answeredCount} ANSWERED
            </span>
          </div>
          <div style={{ height: 3, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7B5EA7, #9B6ED4)', borderRadius: 2, transition: 'width 0.3s ease' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
          {timeLeft !== null && (
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.9rem', fontWeight: 700, color: tColor, letterSpacing: '0.04em', transition: 'color 0.3s', minWidth: 52, textAlign: 'right' }}>
              {formatTime(timeLeft)}
            </div>
          )}
          <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.62rem' }}>{rank.label}</span>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.7rem', color: '#fff' }}>
            {initials}
          </div>
        </div>
      </header>

      {/* ── Body (fills remaining height, no scroll) ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '0.875rem 1.25rem 0.75rem',
        minHeight: 0,
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 720, width: '100%', margin: '0 auto', minHeight: 0 }}>

          {/* Question */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderTop: '3px solid rgba(155,110,212,0.6)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.875rem 1.25rem 1rem',
            marginBottom: '0.625rem',
            flexShrink: 0,
          }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#9B6ED4', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>
              TRIAL {current + 1}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.55 }}>
              {q.text}
            </div>
          </div>

          {/* Options — fill remaining space evenly */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', minHeight: 0, marginBottom: '0.625rem' }}>
            {q.options.map((opt, i) => {
              const isSelected = answered === i
              return (
                <div
                  key={i}
                  onClick={() => selectAnswer(i)}
                  style={{
                    flex: 1,
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    padding: '0 1rem',
                    background: isSelected ? 'rgba(155,110,212,0.1)' : 'var(--bg-secondary)',
                    border: `1.5px solid ${isSelected ? '#9B6ED4' : 'var(--border)'}`,
                    borderRadius: 10,
                    cursor: 'pointer',
                    transition: 'all 0.12s ease',
                    boxShadow: isSelected ? '0 0 0 1px #9B6ED455' : 'none',
                    minHeight: 0,
                  }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)'; e.currentTarget.style.background = 'rgba(155,110,212,0.04)' } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-secondary)' } }}
                >
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', fontWeight: 700,
                    background: isSelected ? '#9B6ED4' : 'transparent',
                    border: `1.5px solid ${isSelected ? '#9B6ED4' : 'var(--border-hover)'}`,
                    color: isSelected ? '#fff' : 'var(--text-muted)',
                    transition: 'all 0.12s',
                  }}>
                    {LETTERS[i]}
                  </div>
                  <span style={{ fontSize: '0.9rem', color: isSelected ? '#C8D5EE' : 'var(--text-secondary)', fontWeight: isSelected ? 600 : 400, flex: 1, lineHeight: 1.4 }}>
                    {opt}
                  </span>
                  {isSelected && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#9B6ED4', flexShrink: 0 }} />}
                </div>
              )
            })}
          </div>

          {/* Nav dots + actions (always at bottom) */}
          <div style={{ flexShrink: 0 }}>
            {/* Question dots */}
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '0.625rem' }}>
              {quiz.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: 26, height: 26, borderRadius: '50%', cursor: 'pointer',
                    fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', fontWeight: 700,
                    border: i === current ? '1.5px solid #9B6ED4' : answers[i] !== -1 ? '1.5px solid #4ADE8055' : '1.5px solid var(--border)',
                    background: i === current ? '#9B6ED4' : answers[i] !== -1 ? 'rgba(74,222,128,0.15)' : 'var(--bg-tertiary)',
                    color: i === current ? '#fff' : answers[i] !== -1 ? '#4ADE80' : 'var(--text-muted)',
                    transition: 'all 0.12s',
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Prev / Next / Submit */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={prev}
                disabled={current === 0}
                style={{
                  background: 'none', border: '1px solid var(--border)', borderRadius: 8,
                  padding: '0.5rem 1.125rem', cursor: current === 0 ? 'not-allowed' : 'pointer',
                  color: current === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em',
                  opacity: current === 0 ? 0.4 : 1,
                }}
              >
                ← PREV
              </button>

              {!isLast ? (
                <button
                  onClick={next}
                  disabled={answered === -1}
                  style={{
                    background: answered === -1 ? 'rgba(155,110,212,0.2)' : 'linear-gradient(135deg, #7B5EA7, #9B6ED4)',
                    border: 'none', borderRadius: 8,
                    padding: '0.5rem 1.5rem', cursor: answered === -1 ? 'not-allowed' : 'pointer',
                    color: answered === -1 ? '#6B5F8F' : '#fff',
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.06em',
                    transition: 'all 0.12s',
                  }}
                >
                  NEXT →
                </button>
              ) : answered === -1 ? (
                <button
                  disabled
                  style={{
                    background: 'rgba(155,110,212,0.1)', border: '1px solid rgba(155,110,212,0.2)',
                    borderRadius: 8, padding: '0.5rem 1.5rem', cursor: 'not-allowed',
                    color: '#6B5F8F', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                    fontSize: '0.875rem', letterSpacing: '0.06em',
                  }}
                >
                  ANSWER TO SUBMIT
                </button>
              ) : (
                <button
                  onClick={() => handleSubmit(answers)}
                  disabled={submitting}
                  style={{
                    background: submitting ? 'rgba(74,222,128,0.2)' : 'linear-gradient(135deg, #22C55E, #4ADE80)',
                    border: 'none', borderRadius: 8,
                    padding: '0.5rem 1.5rem', cursor: submitting ? 'not-allowed' : 'pointer',
                    color: submitting ? '#4ADE80' : '#0A1A0A',
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '0.875rem', letterSpacing: '0.06em',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}
                >
                  {submitting ? <span className="loading-spinner" style={{ borderTopColor: '#4ADE80' }} /> : '⚔️'}
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
