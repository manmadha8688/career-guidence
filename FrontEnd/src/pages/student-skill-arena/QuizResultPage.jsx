import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, XCircle, ArrowLeft, RotateCcw, Trophy, Zap } from 'lucide-react'
import { getAttemptResult } from '../../api/api'
import { getStoredXp, getRank } from '../../utils/slRank'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const LETTERS = ['A', 'B', 'C', 'D']

function formatRetry(dateStr) {
  if (!dateStr) return null
  const diff = new Date(dateStr) - Date.now()
  if (diff <= 0) return 'now'
  const mins = Math.ceil(diff / 60000)
  if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''}`
  const hrs = Math.ceil(diff / 3600000)
  return `${hrs} hour${hrs !== 1 ? 's' : ''}`
}

export default function QuizResultPage() {
  const { attemptId }    = useParams()
  const [searchParams]   = useSearchParams()
  const quizType         = searchParams.get('type')
  const refId            = searchParams.get('refId')
  const navigate         = useNavigate()
  const { user }         = useAuth()
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  const xp       = getStoredXp()
  const rank     = getRank(xp)
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    getAttemptResult(attemptId)
      .then(r => setResult(r.data))
      .catch(() => { toast.error('Failed to load result'); navigate(-1) })
      .finally(() => setLoading(false))
  }, [attemptId])

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

  if (!result) return null

  const pct        = Math.round((result.score / result.total) * 100)
  const retryIn    = formatRetry(result.nextRetryAt)
  const wrongCount = result.results?.filter(r => !r.correct).length || 0
  const displayed  = showAll ? result.results : result.results?.slice(0, 5)

  const PASS_COLOR = '#4ADE80'
  const FAIL_COLOR = '#EF4444'
  const accentColor = result.passed ? PASS_COLOR : FAIL_COLOR

  // Badge config
  const BADGE_CFG = {
    SUBJECT_MASTERED: { icon: '🏅', label: 'Gate Clearance Earned!', color: '#4ADE80' },
    INTERVIEW_READY:  { icon: '🎯', label: 'Interview Ready!',       color: '#60A5FA' },
    JOB_READY:        { icon: '🏆', label: 'S-Rank Clearance!',      color: '#F59E0B' },
  }
  const badge = result.badge ? BADGE_CFG[result.badge] : null

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
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: accentColor, letterSpacing: '0.14em' }}>
            [ SYSTEM ] {result.passed ? 'TRIAL PASSED ✓' : 'TRIAL FAILED ✗'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.68rem' }}>{rank.label}</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', color: '#fff' }}>
            {initials}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem 1rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Score hero card */}
          <div style={{
            background: 'var(--bg-card)',
            border: `1px solid ${accentColor}33`,
            borderTop: `4px solid ${accentColor}`,
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            textAlign: 'center',
            animation: 'gateOpen 0.25s ease',
          }}>
            {/* Score */}
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: 900, color: accentColor, lineHeight: 1, marginBottom: '0.5rem', textShadow: `0 0 40px ${accentColor}55` }}>
              {result.score}/{result.total}
            </div>

            {/* Verdict */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '1rem', letterSpacing: '0.12em', color: accentColor, marginBottom: '0.625rem' }}>
              {result.passed
                ? <><CheckCircle size={18} /> TRIAL PASSED ✓</>
                : <><XCircle size={18} /> TRIAL FAILED ✗</>}
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              <span>{pct}% ACCURACY</span>
              <span>·</span>
              <span>{result.results?.filter(r => r.correct).length} CORRECT</span>
              <span>·</span>
              <span>{wrongCount} WRONG</span>
            </div>

            {/* XP earned */}
            {result.passed && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', padding: '0.375rem 1rem', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 99, fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', color: '#4ADE80', fontWeight: 700 }}>
                <Zap size={14} /> +{result.score * 10} XP EARNED
              </div>
            )}

            {/* Retry timer */}
            {!result.passed && retryIn && (
              <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, color: '#F59E0B', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                <RotateCcw size={13} /> RETRY AVAILABLE IN <strong style={{ marginLeft: 4 }}>{retryIn.toUpperCase()}</strong>
              </div>
            )}
          </div>

          {/* Badge banner */}
          {badge && (
            <div style={{ textAlign: 'center', padding: '1.5rem', background: `${badge.color}0D`, border: `1px solid ${badge.color}33`, borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{badge.icon}</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: badge.color, letterSpacing: '0.05em' }}>{badge.label}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {result.score}/{result.total} · {pct}%
              </div>
            </div>
          )}

          {/* Answer review */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Trial Review
                {wrongCount > 0 && <span style={{ color: '#EF4444', marginLeft: 8, fontSize: '0.875rem' }}>({wrongCount} wrong)</span>}
              </div>
              {result.results?.length > 5 && (
                <button
                  onClick={() => setShowAll(s => !s)}
                  style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '0.3rem 0.75rem', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}
                >
                  {showAll ? 'SHOW LESS' : `SHOW ALL ${result.results.length}`}
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {displayed?.map((r, i) => (
                <div key={r.questionId}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${r.correct ? 'rgba(74,222,128,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    borderLeft: `4px solid ${r.correct ? '#4ADE80' : '#EF4444'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem 1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.625rem' }}>
                    {r.correct
                      ? <CheckCircle size={15} color="#4ADE80" style={{ flexShrink: 0, marginTop: 2 }} />
                      : <XCircle size={15} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />}
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', flex: 1, lineHeight: 1.5 }}>{r.text}</div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', paddingLeft: '1.5rem', marginBottom: r.explanation ? '0.5rem' : 0 }}>
                    {r.options.map((opt, oi) => {
                      const isCorrect = oi === r.correctIndex
                      const isStudent = oi === r.studentAnswer
                      return (
                        <span key={oi} style={{
                          padding: '0.2rem 0.625rem',
                          borderRadius: 4,
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          background: isCorrect ? 'rgba(74,222,128,0.12)' : (isStudent && !isCorrect) ? 'rgba(239,68,68,0.12)' : 'var(--bg-tertiary)',
                          color: isCorrect ? '#4ADE80' : (isStudent && !isCorrect) ? '#EF4444' : 'var(--text-muted)',
                          border: isCorrect ? '1px solid rgba(74,222,128,0.25)' : (isStudent && !isCorrect) ? '1px solid rgba(239,68,68,0.25)' : '1px solid transparent',
                        }}>
                          {LETTERS[oi]}. {opt}
                          {isCorrect && ' ✓'}
                          {isStudent && !isCorrect && ' ✗'}
                        </span>
                      )
                    })}
                  </div>

                  {r.explanation && (
                    <div style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <Zap size={11} style={{ display: 'inline', marginRight: 6, color: '#9B6ED4' }} />
                      {r.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', padding: '0.5rem 0 2rem' }}>
            {result.passed && (
              <button
                onClick={() => navigate('/skill-arena/dashboard?view=gates')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #7B5EA7, #9B6ED4)', border: 'none', borderRadius: 8, padding: '0.75rem 1.75rem', cursor: 'pointer', color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '0.06em' }}
              >
                <Trophy size={16} /> CONTINUE HUNT
              </button>
            )}
            {!result.passed && !retryIn && quizType && refId && (
              <button
                onClick={() => navigate(`/skill-arena/quiz/${quizType}/${refId}`)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #7B5EA7, #9B6ED4)', border: 'none', borderRadius: 8, padding: '0.75rem 1.75rem', cursor: 'pointer', color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '0.06em' }}
              >
                <RotateCcw size={15} /> RETRY TRIAL
              </button>
            )}
            <button
              onClick={() => navigate('/skill-arena/dashboard?view=gates')}
              style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '0.75rem 1.75rem', cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '0.05em' }}
            >
              ← BACK TO GATES
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
