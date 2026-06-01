import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { startConceptQuiz, startSubjectQuiz, startRoadmapQuiz, submitQuiz } from '../../api/api'
import { getStoredXp, getRank } from '../../utils/slRank'
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

  const [quiz, setQuiz]         = useState(null)
  const [answers, setAnswers]   = useState([])
  const [current, setCurrent]   = useState(0)
  const [loading, setLoading]   = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [totalSeconds, setTotalSeconds] = useState(null)

  const xp   = getStoredXp()
  const rank = getRank(xp)
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
          setTimeLeft(secs)
          setTotalSeconds(secs)
        }
      })
      .catch(err => {
        toast.error(err.response?.data?.error || 'Failed to start trial')
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
        answers: currentAnswers || answers,
      })
      navigate(`/skill-arena/quiz/result/${res.data.attemptId}?type=${type}&refId=${refId}`)
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

  // ─── Loading ───────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 56, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 1.5rem' }}>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '1.1rem', color: '#B48AE8', letterSpacing: '0.12em' }}>ARISE</span>
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
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', fontFamily: "'Rajdhani', sans-serif" }}>

      {/* ── Top bar ── */}
      <header style={{
        height: 56, flexShrink: 0,
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 1.5rem', gap: '1rem',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.06em' }}
          onClick={() => navigate('/skill-arena/dashboard?view=gates')}
        >
          <ArrowLeft size={14} /> GATES
        </button>

        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: '#9B6ED4', letterSpacing: '0.14em' }}>
            ⚔ [ GATE TRIAL INITIATED ] — {typeLabel.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {timeLeft !== null && (
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1rem', fontWeight: 700, color: tColor, letterSpacing: '0.04em', minWidth: 60, textAlign: 'right', transition: 'color 0.3s' }}>
              {formatTime(timeLeft)}
            </div>
          )}
          <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.68rem' }}>{rank.label}</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', color: '#fff', fontFamily: "'Rajdhani', sans-serif" }}>
            {initials}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 1rem', overflow: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 780 }}>

          {/* Progress row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: '#9B6ED4', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
              TRIAL {current + 1} / {quiz.questions.length}
            </span>
            <div style={{ flex: 1, height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7B5EA7, #9B6ED4)', borderRadius: 2, transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
              {answeredCount} ANSWERED
            </span>
          </div>

          {/* Question card */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderTop: '3px solid rgba(155,110,212,0.6)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            marginBottom: '1rem',
            animation: 'gateOpen 0.18s ease',
          }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: '#9B6ED4', letterSpacing: '0.14em', marginBottom: '1rem' }}>
              TRIAL {current + 1}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {q.text}
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {q.options.map((opt, i) => {
                const isSelected = answered === i
                return (
                  <div
                    key={i}
                    onClick={() => selectAnswer(i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1rem 1.25rem',
                      background: isSelected ? 'rgba(155,110,212,0.1)' : 'var(--bg-secondary)',
                      border: `1.5px solid ${isSelected ? '#9B6ED4' : 'var(--border)'}`,
                      borderRadius: 10,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 0 0 1px #9B6ED455, 0 4px 12px rgba(155,110,212,0.15)' : 'none',
                    }}
                    onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)'; e.currentTarget.style.background = 'rgba(155,110,212,0.04)' } }}
                    onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-secondary)' } }}
                  >
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem', fontWeight: 700,
                      background: isSelected ? '#9B6ED4' : 'transparent',
                      border: `1.5px solid ${isSelected ? '#9B6ED4' : 'var(--border-hover)'}`,
                      color: isSelected ? '#fff' : 'var(--text-muted)',
                      transition: 'all 0.15s',
                    }}>
                      {LETTERS[i]}
                    </div>
                    <span style={{ fontSize: '0.9375rem', color: isSelected ? '#C8D5EE' : 'var(--text-secondary)', fontWeight: isSelected ? 600 : 400, flex: 1, lineHeight: 1.4 }}>
                      {opt}
                    </span>
                    {isSelected && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#9B6ED4', flexShrink: 0 }} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation dots */}
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1rem', justifyContent: 'center' }}>
            {quiz.questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: 30, height: 30, borderRadius: '50%', cursor: 'pointer',
                  fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', fontWeight: 700,
                  border: i === current
                    ? '1.5px solid #9B6ED4'
                    : answers[i] !== -1 ? '1.5px solid #4ADE8055' : '1.5px solid var(--border)',
                  background: i === current
                    ? '#9B6ED4'
                    : answers[i] !== -1 ? 'rgba(74,222,128,0.15)' : 'var(--bg-tertiary)',
                  color: i === current ? '#fff' : answers[i] !== -1 ? '#4ADE80' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Action row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={prev}
              disabled={current === 0}
              style={{
                background: 'none', border: '1px solid var(--border)', borderRadius: 8,
                padding: '0.625rem 1.25rem', cursor: current === 0 ? 'not-allowed' : 'pointer',
                color: current === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em',
                opacity: current === 0 ? 0.4 : 1,
              }}
            >
              ← PREV
            </button>

            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textAlign: 'center' }}>
              You can change answers before submitting
              {type !== 'concept' && <><br />Timer auto-submits when expired</>}
            </div>

            {!isLast ? (
              <button
                onClick={next}
                disabled={answered === -1}
                style={{
                  background: answered === -1 ? 'rgba(155,110,212,0.2)' : 'linear-gradient(135deg, #7B5EA7, #9B6ED4)',
                  border: 'none', borderRadius: 8,
                  padding: '0.625rem 1.5rem', cursor: answered === -1 ? 'not-allowed' : 'pointer',
                  color: answered === -1 ? '#6B5F8F' : '#fff',
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em',
                  transition: 'all 0.15s',
                }}
              >
                NEXT →
              </button>
            ) : (
              <button
                onClick={() => handleSubmit(answers)}
                disabled={submitting}
                style={{
                  background: submitting ? 'rgba(74,222,128,0.2)' : 'linear-gradient(135deg, #22C55E, #4ADE80)',
                  border: 'none', borderRadius: 8,
                  padding: '0.625rem 1.5rem', cursor: submitting ? 'not-allowed' : 'pointer',
                  color: submitting ? '#4ADE80' : '#0A1A0A',
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.06em',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
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
  )
}
