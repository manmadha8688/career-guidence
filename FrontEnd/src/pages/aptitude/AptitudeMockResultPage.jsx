import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Zap, RotateCcw, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'
import SystemAwakeningLoader from '../../components/loaders/SystemAwakeningLoader'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import CooldownTimer from '../../components/CooldownTimer'
import { getAttemptResult, getAptitudeMockStatus } from '../../api/api'
import { getApiError } from '../../utils/apiError'
import { useAuth } from '../../context/AuthContext'
import { getRank } from '../../utils/slRank'
import { peekQuizReview } from '../../utils/quizReviewOnce'
import { asMockSummary, mockHasLiveReview } from '../../utils/aptitudeMockReviewOnce'
import '../../styles/pages/dashboard/index.css'
import '../../styles/pages/dashboard/quiz-result-page.css'
import '../../styles/pages/shared/aptitude.css'

const LETTERS = ['A', 'B', 'C', 'D']
const PASS_COLOR = '#4ADE80'
const FAIL_COLOR = '#EF4444'
const MOCK_ACCENT = '#F59E0B'
const SECTION_SHORT = { quantitative: 'Quant', logical: 'Logical', verbal: 'Verbal' }

function canRetryNow(nextRetryAt) {
  if (!nextRetryAt) return true
  return new Date(nextRetryAt).getTime() <= Date.now()
}

export default function AptitudeMockResultPage() {
  const { attemptId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasLiveReview, setHasLiveReview] = useState(false)
  const [reviewSection, setReviewSection] = useState('')
  const [mockStatus, setMockStatus] = useState(null)

  const xp = user?.xp ?? 0
  const rank = getRank(xp)
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    let active = true
    let doneTimer

    const live = location.state?.result ?? peekQuizReview(attemptId)
    if (live && mockHasLiveReview(live)) {
      setResult(live)
      setHasLiveReview(true)
      setReviewSection('')
      setLoading(false)
      if (live.passed) {
        window.dispatchEvent(new CustomEvent('sl:refresh'))
      }
      return () => { active = false; clearTimeout(doneTimer) }
    }

    getAttemptResult(attemptId)
      .then(r => {
        if (!active) return
        const summary = asMockSummary(r.data)
        setResult(summary)
        setHasLiveReview(false)
      })
      .catch(err => {
        if (active) {
          toast.error(getApiError(err, 'We could not load this result. Please try again.'))
          navigate('/aptitude')
        }
      })
      .finally(() => { if (active) doneTimer = setTimeout(() => setLoading(false), PAGE_MIN_MS) })

    return () => { active = false; clearTimeout(doneTimer) }
  }, [attemptId, location.state, navigate])

  useEffect(() => {
    let active = true
    getAptitudeMockStatus()
      .then(r => { if (active) setMockStatus(r.data) })
      .catch(() => {})
    return () => { active = false }
  }, [attemptId])

  if (loading) return <SystemAwakeningLoader subtitle="LOADING RESULTS" />
  if (!result) return null

  const pct = result.percentage ?? Math.round((result.correct / result.total) * 100)
  const accentColor = result.passed ? PASS_COLOR : FAIL_COLOR
  const wrongCount = hasLiveReview
    ? (result.sections || []).reduce((n, s) => n + (s.items || []).filter(i => !i.correct).length, 0)
    : Math.max(0, result.total - result.correct)
  const showRetry = mockStatus ? mockStatus.canRetry : canRetryNow(result.nextRetryAt)
  const retryUntil = mockStatus?.nextRetryAt ?? result.nextRetryAt
  const sectionRows = result.sections || []
  const activeSection = sectionRows.find(s => s.id === reviewSection)
  const reviewItems = activeSection?.items || []
  const toggleReviewSection = (id) => setReviewSection(prev => (prev === id ? '' : id))

  return (
    <div className="dash-quiz-result-page apt-mock-result" style={{ '--accent': accentColor, '--mock-accent': MOCK_ACCENT }}>
      <header className="dash-quiz-result-header">
        <button type="button" className="dash-quiz-result-back" onClick={() => navigate('/aptitude')}>
          <ArrowLeft size={14} /> APTITUDE
        </button>
        <div className="dash-quiz-result-header-center">
          <span className="dash-quiz-result-status">
            [ MOCK ] {result.passed ? 'MOCK PASSED ✓' : 'MOCK FAILED ✗'}
          </span>
        </div>
        <div className="dash-quiz-result-header-right">
          <span className={`rank-badge ${rank.cls} dash-quiz-result-rank-badge`}>{rank.label}</span>
          <div className="dash-avatar dash-avatar--md" style={{ '--avatar-bg': user?.avatarColor || '#9B6ED4', '--rank-color': rank.color }}>
            {initials}
          </div>
        </div>
      </header>

      <div className="dash-quiz-result-content">
        <div className="dash-quiz-result-inner">
          <div className="dash-quiz-result-hero">
            <div className="dash-quiz-result-score">
              {result.correct}/{result.total}
            </div>
            <div className="dash-quiz-result-verdict">
              {result.passed
                ? <><CheckCircle size={18} /> MOCK PASSED ✓</>
                : <><XCircle size={18} /> MOCK FAILED ✗</>}
            </div>
            <div className="dash-quiz-result-stats">
              <span>{pct}% ACCURACY</span>
              <span>·</span>
              <span>{result.correct} CORRECT</span>
              <span>·</span>
              <span>{wrongCount} WRONG</span>
            </div>
            {result.passed && result.xpEarned > 0 && (
              <div className="dash-quiz-result-xp-wrap">
                <div className="dash-quiz-result-xp">
                  <Zap size={14} /> +{result.xpEarned} XP EARNED
                </div>
              </div>
            )}
          </div>

          {hasLiveReview ? (
            <div className="apt-mock-result__sections">
              <div className="apt-mock-result__review-title">Question review</div>
              <div className="apt-mock-result__sec-tabs">
                {sectionRows.map(sec => {
                  const isOpen = reviewSection === sec.id
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      className={`apt-mock-result__sec-tab${isOpen ? ' is-open' : ''}`}
                      style={{ '--sec-color': sec.color }}
                      onClick={() => toggleReviewSection(sec.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="apt-mock-result__sec-tab-main">
                        <span className="apt-mock-result__sec-tab-name">
                          {SECTION_SHORT[sec.id] || sec.label}
                        </span>
                        <span className="apt-mock-result__sec-tab-score">{sec.correct}/{sec.total}</span>
                      </span>
                      <ChevronDown
                        size={16}
                        className={`apt-mock-result__sec-tab-chev${isOpen ? ' is-open' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </div>

              {activeSection && (
                <div className="apt-mock-result__review" style={{ '--sec-color': activeSection.color }}>
                  {reviewItems.map(item => (
                    <div key={item.id} className={`apt-mock-result__item${item.correct ? ' is-correct' : ' is-wrong'}`}>
                      <div className="apt-mock-result__item-head">
                        <span>Q{item.order}</span>
                        {item.correct
                          ? <CheckCircle size={16} className="apt-mock-result__icon--ok" />
                          : <XCircle size={16} className="apt-mock-result__icon--bad" />}
                      </div>
                      <p className="apt-mock-result__q">{item.question}</p>
                      <div className="apt-mock-result__opts">
                        {(item.options || []).map((opt, oi) => {
                          const letter = LETTERS[oi]
                          let cls = 'apt-mock-result__opt'
                          if (letter === item.correctAnswer) cls += ' is-answer'
                          else if (letter === item.chosenAnswer) cls += ' is-chosen'
                          return (
                            <div key={oi} className={cls}>
                              <span>{letter}</span> {opt}
                            </div>
                          )
                        })}
                      </div>
                      {item.solution && <p className="apt-mock-result__sol">{item.solution}</p>}
                      {item.trick && (
                        <p className="apt-mock-result__trick"><Zap size={14} /> {item.trick}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="dash-quiz-result-summary-note apt-mock-result__saved-note">
              Score saved to your mock history. Question-by-question review is only available right after you finish.
            </p>
          )}

          <div className="dash-quiz-result-actions">
            {showRetry ? (
              <button type="button" className="dash-quiz-result-primary-btn" onClick={() => navigate('/aptitude/mock')}>
                <RotateCcw size={15} /> TRY AGAIN
              </button>
            ) : (
              <CooldownTimer
                until={retryUntil}
                onDone={() => getAptitudeMockStatus().then(r => setMockStatus(r.data)).catch(() => {})}
                prefix="Try again in"
                asButton
                buttonClassName="apt-mock-result__retry-btn apt-mock-result__retry-btn--wait"
                iconSize={15}
              />
            )}
            <button type="button" className="dash-quiz-result-secondary-btn" onClick={() => navigate('/aptitude')}>
              ← BACK TO APTITUDE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
