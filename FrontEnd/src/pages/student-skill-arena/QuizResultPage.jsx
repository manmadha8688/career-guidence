import { useState, useEffect } from 'react'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, XCircle, ArrowLeft, RotateCcw, Trophy, Zap } from 'lucide-react'
import SystemAwakeningLoader from '../../components/loaders/SystemAwakeningLoader'
import { getAttemptResult } from '../../api/api'
import { badgeMeta } from '../../utils/badgeMeta'
import { getRank } from '../../utils/slRank'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'

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

  const xp       = user?.xp ?? 0
  const rank     = getRank(xp)
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    let active = true
    let doneTimer
    getAttemptResult(attemptId)
      .then(r => {
        if (!active) return
        setResult(r.data)
        // On any pass, tell the dashboard/navbar to re-fetch fresh data (XP, badges,
        // certificates, and the server-driven daily quests — the "complete a concept"
        // quest reconciles from /progress/quests, no client-side bookkeeping needed).
        if (r.data.passed) {
          window.dispatchEvent(new CustomEvent('sl:refresh'))
        }
      })
      .catch(err => { if (active) { toast.error(getApiError(err, 'We could not load this result. Please try again.')); navigate(-1) } })
      .finally(() => { if (active) doneTimer = setTimeout(() => setLoading(false), PAGE_MIN_MS) })
    return () => { active = false; clearTimeout(doneTimer) }
  }, [attemptId])

  // ─── Loading ───────────────────────────────────────────
  if (loading) return <SystemAwakeningLoader subtitle="LOADING RESULTS" />

  if (!result) return null

  const pct        = Math.round((result.score / result.total) * 100)
  const retryIn    = formatRetry(result.nextRetryAt)
  const wrongCount = result.results?.filter(r => !r.correct).length || 0
  const displayed  = showAll ? result.results : result.results?.slice(0, 5)

  const PASS_COLOR = '#4ADE80'
  const FAIL_COLOR = '#EF4444'
  const accentColor = result.passed ? PASS_COLOR : FAIL_COLOR

  // Badge config — unique names shared with certificates/history via badgeMeta
  const bm    = result.badge ? badgeMeta(result.badge) : null
  const badge = bm ? { icon: bm.icon, label: `${bm.label} Unlocked!`, color: bm.color } : null

  return (
    <div className="dash-quiz-result-page" style={{ '--accent': accentColor }}>

      {/* ── Top bar ── */}
      <header className="dash-quiz-result-header">
        <button
          className="dash-quiz-result-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={14} /> GATES
        </button>
        <div className="dash-quiz-result-header-center">
          <span className="dash-quiz-result-status">
            [ SYSTEM ] {result.passed ? 'TRIAL PASSED ✓' : 'TRIAL FAILED ✗'}
          </span>
        </div>
        <div className="dash-quiz-result-header-right">
          <span className={`rank-badge ${rank.cls} dash-quiz-result-rank-badge`}>{rank.label}</span>
          <div
            className="dash-avatar dash-avatar--md"
            style={{ '--avatar-bg': user?.avatarColor || '#9B6ED4', '--rank-color': rank.color }}
          >
            {initials}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="dash-quiz-result-content">
        <div className="dash-quiz-result-inner">

          {/* Score hero card */}
          <div className="dash-quiz-result-hero">
            {/* Score */}
            <div className="dash-quiz-result-score">
              {result.score}/{result.total}
            </div>

            {/* Verdict */}
            <div className="dash-quiz-result-verdict">
              {result.passed
                ? <><CheckCircle size={18} /> TRIAL PASSED ✓</>
                : <><XCircle size={18} /> TRIAL FAILED ✗</>}
            </div>

            {/* Stats row */}
            <div className="dash-quiz-result-stats">
              <span>{pct}% ACCURACY</span>
              <span>·</span>
              <span>{result.results?.filter(r => r.correct).length} CORRECT</span>
              <span>·</span>
              <span>{wrongCount} WRONG</span>
            </div>

            {/* XP earned */}
            {result.passed && result.xpEarned > 0 && (
              <div className="dash-quiz-result-xp-wrap">
                <div className="dash-quiz-result-xp">
                  <Zap size={14} /> +{result.xpEarned} XP EARNED
                </div>
                {result.dailyBonusEarned && (
                  <div className="dash-quiz-result-bonus">
                    ⭐ DAILY BONUS +50 XP — First skill today!
                  </div>
                )}
              </div>
            )}

            {/* Retry timer */}
            {!result.passed && retryIn && (
              <div className="dash-quiz-result-retry">
                <RotateCcw size={13} /> RETRY AVAILABLE IN <strong>{retryIn.toUpperCase()}</strong>
              </div>
            )}
          </div>

          {/* Badge banner */}
          {badge && (
            <div
              className="dash-quiz-result-badge-banner"
              style={{
                '--badge-bg': `${badge.color}0D`,
                '--badge-border': `${badge.color}33`,
                '--badge-color': badge.color,
              }}
            >
              <div className="dash-quiz-result-badge-icon">{badge.icon}</div>
              <div className="dash-quiz-result-badge-label">{badge.label}</div>
              <div className="dash-quiz-result-badge-meta">
                {bm.kind} · Certificate ready
              </div>
            </div>
          )}

          {/* Answer review */}
          <div>
            <div className="dash-quiz-result-review-header">
              <div className="dash-quiz-result-review-title">
                Trial Review
                {wrongCount > 0 && <span className="dash-quiz-result-review-wrong">({wrongCount} wrong)</span>}
              </div>
              {result.results?.length > 5 && (
                <button
                  onClick={() => setShowAll(s => !s)}
                  className="dash-quiz-result-toggle"
                >
                  {showAll ? 'SHOW LESS' : `SHOW ALL ${result.results.length}`}
                </button>
              )}
            </div>

            <div className="dash-quiz-result-review-list">
              {displayed?.map((r) => (
                <div
                  key={r.questionId}
                  className={`dash-quiz-result-review-item ${r.correct ? 'is-correct' : 'is-wrong'}`}
                >
                  <div className="dash-quiz-result-review-q">
                    {r.correct
                      ? <CheckCircle size={15} color="#4ADE80" className="dash-quiz-result-review-q__icon" />
                      : <XCircle size={15} color="#EF4444" className="dash-quiz-result-review-q__icon" />}
                    <div className="dash-quiz-result-review-q__text">{r.text}</div>
                  </div>

                  <div className={`dash-quiz-result-options${r.explanation ? ' dash-quiz-result-options--with-explanation' : ''}`}>
                    {r.options.map((opt, oi) => {
                      const isCorrect = oi === r.correctIndex
                      const isStudent = oi === r.studentAnswer
                      return (
                        <span
                          key={oi}
                          className={`dash-quiz-result-option ${isCorrect ? 'is-correct' : (isStudent && !isCorrect) ? 'is-wrong' : 'is-neutral'}`}
                        >
                          {LETTERS[oi]}. {opt}
                          {isCorrect && ' ✓'}
                          {isStudent && !isCorrect && ' ✗'}
                        </span>
                      )
                    })}
                  </div>

                  {r.explanation && (
                    <div className="dash-quiz-result-explanation">
                      <Zap size={11} className="dash-quiz-result-explanation__icon" />
                      {r.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="dash-quiz-result-actions">
            {result.passed && badge && (
              <button
                onClick={() => navigate('/skill-arena/certificates')}
                className="dash-quiz-result-primary-btn"
              >
                <Trophy size={16} /> VIEW CERTIFICATE
              </button>
            )}
            {result.passed && (
              <button
                onClick={() => navigate('/skill-arena/dashboard?view=gates')}
                className={badge ? 'dash-quiz-result-secondary-btn' : 'dash-quiz-result-primary-btn'}
              >
                <Trophy size={16} /> CONTINUE HUNT
              </button>
            )}
            {!result.passed && !retryIn && quizType && refId && (
              <button
                onClick={() => navigate(`/skill-arena/quiz/${quizType}/${refId}`)}
                className="dash-quiz-result-primary-btn"
              >
                <RotateCcw size={15} /> RETRY TRIAL
              </button>
            )}
            <button
              onClick={() => navigate(-1)}
              className="dash-quiz-result-secondary-btn"
            >
              ← BACK TO GATES
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
