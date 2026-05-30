import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, XCircle, ArrowLeft, RotateCcw, Trophy } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAttemptResult } from '../../api/api'
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

function BadgeBanner({ badge, score, total }) {
  if (!badge) return null
  const config = {
    SUBJECT_MASTERED: { bg: 'linear-gradient(135deg,#065F46,#047857)', icon: '🏅', label: 'Subject Mastered!' },
    INTERVIEW_READY:  { bg: 'linear-gradient(135deg,#1E40AF,#2563EB)', icon: '🎯', label: 'Interview Ready!' },
    JOB_READY:        { bg: 'linear-gradient(135deg,#7C3AED,#6D28D9)', icon: '🏆', label: 'Job Ready!' },
  }
  const c = config[badge]
  if (!c) return null
  return (
    <div style={{ background: c.bg, color: 'white', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{c.label}</div>
      <div style={{ opacity: 0.85, fontSize: '0.875rem', marginTop: '0.25rem' }}>
        Score: {score}/{total} ({Math.round(score / total * 100)}%)
      </div>
    </div>
  )
}

export default function QuizResultPage() {
  const { attemptId } = useParams()
  const [searchParams] = useSearchParams()
  const quizType = searchParams.get('type')   // 'concept' | 'subject' | 'roadmap'
  const refId    = searchParams.get('refId')
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    getAttemptResult(attemptId)
      .then(r => setResult(r.data))
      .catch(() => { toast.error('Failed to load result'); navigate(-1) })
      .finally(() => setLoading(false))
  }, [attemptId])

  if (loading) return (
    <AppLayout title="Quiz Result">
      <div className="flex-center" style={{ height: '60vh' }}><div className="loading-spinner-lg" /></div>
    </AppLayout>
  )

  if (!result) return null

  const pct = Math.round((result.score / result.total) * 100)
  const retryIn = formatRetry(result.nextRetryAt)
  const wrongCount = result.results?.filter(r => !r.correct).length || 0
  const displayed = showAll ? result.results : result.results?.slice(0, 5)

  return (
    <AppLayout title="Quiz Result">
      <div className="quiz-container">
        <button className="btn btn-ghost btn-sm mb-3" onClick={() =>
          quizType === 'concept' && refId ? navigate(`/concepts/${refId}`) : navigate('/subjects')
        }>
          <ArrowLeft size={15} /> {quizType === 'concept' ? 'Back to Concept' : 'Back to Subjects'}
        </button>

        {/* Score card */}
        <div className={`result-score-box card ${result.passed ? '' : ''}`}
          style={{ borderTop: `4px solid ${result.passed ? 'var(--success)' : 'var(--danger)'}` }}>
          <div className={`result-score ${result.passed ? 'result-passed' : 'result-failed'}`}>
            {result.score}/{result.total}
          </div>
          <div className={`result-verdict ${result.passed ? 'result-passed' : 'result-failed'}`}>
            {result.passed
              ? <><CheckCircle size={20} style={{ display:'inline', marginRight:6 }} />PASSED ✓</>
              : <><XCircle size={20} style={{ display:'inline', marginRight:6 }} />FAILED ✗</>
            }
          </div>
          <div className="text-muted text-sm" style={{ marginTop: '0.5rem' }}>
            {pct}% · {result.total - result.score} wrong · {result.results?.filter(r => r.correct).length} correct
          </div>

          {!result.passed && retryIn && (
            <div style={{ marginTop: '1rem', padding: '0.625rem 1rem', background: '#FEF3C7', borderRadius: 'var(--radius-md)', color: '#92400E', fontSize: '0.875rem' }}>
              <RotateCcw size={14} style={{ display:'inline', marginRight:6 }} />
              You can retry in <strong>{retryIn}</strong>
            </div>
          )}
        </div>

        {/* Badge */}
        <BadgeBanner badge={result.badge} score={result.score} total={result.total} />

        {/* Answer review */}
        <div style={{ marginBottom: '1rem' }}>
          <div className="flex-between mb-2">
            <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>
              Answer Review {wrongCount > 0 && <span style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>({wrongCount} wrong)</span>}
            </h2>
            {result.results?.length > 5 && (
              <button className="btn btn-ghost btn-sm" onClick={() => setShowAll(s => !s)}>
                {showAll ? 'Show less' : `Show all ${result.results.length}`}
              </button>
            )}
          </div>

          {displayed?.map((r, i) => (
            <div key={r.questionId} className={`answer-review-card ${r.correct ? 'answer-correct' : 'answer-wrong'}`}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.625rem' }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}>
                  {r.correct
                    ? <CheckCircle size={16} color="var(--success)" />
                    : <XCircle size={16} color="var(--danger)" />
                  }
                </span>
                <div style={{ fontWeight: 500, fontSize: '0.9rem', flex: 1 }}>{r.text}</div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.5rem', paddingLeft: '1.75rem' }}>
                {r.options.map((opt, oi) => {
                  const isCorrect = oi === r.correctIndex
                  const isStudent = oi === r.studentAnswer
                  const cls = isCorrect ? 'option-correct' : (isStudent && !isCorrect) ? 'option-wrong' : 'option-neutral'
                  return (
                    <span key={oi} className={`option-badge ${cls}`}>
                      {LETTERS[oi]}. {opt}
                      {isCorrect && ' ✓'}
                      {isStudent && !isCorrect && ' ✗'}
                    </span>
                  )
                })}
              </div>

              {r.explanation && (
                <div className="explanation-box" style={{ paddingLeft: '1.75rem' }}>
                  💡 {r.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '2rem' }}>
          {result.passed && quizType === 'concept' && refId && (
            <button className="btn btn-primary" onClick={() => navigate(`/concepts/${refId}`)}>
              <CheckCircle size={15} /> Back to Concept
            </button>
          )}
          {result.passed && quizType !== 'concept' && (
            <Link to="/subjects" className="btn btn-primary">
              <Trophy size={15} /> Continue Learning
            </Link>
          )}
          {!result.passed && !retryIn && quizType && refId && (
            <button className="btn btn-primary" onClick={() => navigate(`/quiz/${quizType}/${refId}`)}>
              <RotateCcw size={15} /> Retry Quiz
            </button>
          )}
          {quizType === 'concept' && refId ? (
            <button className="btn btn-ghost" onClick={() => navigate(`/concepts/${refId}`)}>
              Back to Concept
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={() => navigate('/subjects')}>
              Back to Subjects
            </button>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
