import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Circle, Clock, ChevronRight, Brain, Trophy } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import ProgressBar from '../../components/ProgressBar'
import { getConcept, completeConcept, getQuizStatus } from '../../api/api'
import toast from 'react-hot-toast'

export default function ConceptPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [concept, setConcept] = useState(null)
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)
  const [quizStatus, setQuizStatus] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    Promise.all([
      getConcept(id),
      getQuizStatus('concept', id).catch(() => null)
    ])
      .then(([c, qs]) => {
        setConcept(c.data)
        if (qs) setQuizStatus(qs.data)
      })
      .catch(() => toast.error('Failed to load concept'))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    const handler = e => {
      if (e.key === 'ArrowLeft' && concept?.prevConcept) navigate(`/concepts/${concept.prevConcept.id}`)
      if (e.key === 'ArrowRight' && concept?.nextConcept) navigate(`/concepts/${concept.nextConcept.id}`)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [concept, navigate])

  const handleMarkDone = async () => {
    if (concept.completed) return
    setMarking(true)
    try {
      await completeConcept(concept.id)
      setConcept(c => ({ ...c, completed: true }))
      toast.success('Concept marked as done! 🎉')
    } catch {
      toast.error('Failed to mark as done')
    } finally {
      setMarking(false)
    }
  }

  if (loading) return (
    <AppLayout>
      <div className="flex-center" style={{ height: '60vh' }}><div className="loading-spinner-lg" /></div>
    </AppLayout>
  )

  if (!concept) return null

  const position = concept.orderIndex
  const total = concept.totalInSubject
  const isMastered = quizStatus?.hasPassed
  const hasTried = quizStatus?.attemptCount > 0

  return (
    <AppLayout title={concept.title}>
      <div className="concept-layout">
        {/* Sidebar */}
        <aside className="concept-sidebar">
          <div className="concept-sidebar-title">{concept.subjectTitle}</div>
          <div style={{ padding: '0.5rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Concept {position} of {total}
          </div>
          <ProgressBar value={total > 0 ? (position / total) * 100 : 0} size="sm" />
          <div style={{ marginTop: '1rem' }}>
            {concept.prevConcept && (
              <Link to={`/concepts/${concept.prevConcept.id}`} className="concept-nav-item">
                <span className="concept-nav-check pending"><Circle size={15} /></span>
                {concept.prevConcept.title}
              </Link>
            )}
            <div className="concept-nav-item active">
              <span className="concept-nav-check" style={{ color: concept.completed ? 'var(--success)' : 'var(--primary)' }}>
                {concept.completed ? <CheckCircle size={15} /> : <Circle size={15} />}
              </span>
              {concept.title}
            </div>
            {concept.nextConcept && (
              <Link to={`/concepts/${concept.nextConcept.id}`} className="concept-nav-item">
                <span className="concept-nav-check pending"><Circle size={15} /></span>
                {concept.nextConcept.title}
              </Link>
            )}
          </div>
          <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            ← → arrow keys to navigate
          </div>
        </aside>

        {/* Main content */}
        <article className="concept-body">
          {/* Breadcrumb */}
          <nav className="concept-breadcrumb">
            <Link to="/subjects">Subjects</Link>
            <ChevronRight size={13} />
            <Link to={`/subjects/${concept.subjectId}`}>{concept.subjectTitle}</Link>
            <ChevronRight size={13} />
            <span>{concept.title}</span>
          </nav>

          {/* Position bar */}
          <div className="concept-position">
            <span className="concept-position-text">Concept {position} of {total}</span>
            <ProgressBar value={total > 0 ? (position / total) * 100 : 0} size="sm" />
          </div>

          <h1 className="concept-title">{concept.title}</h1>

          <div className="concept-meta">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={13} /> {concept.estimatedMinutes} min read
            </span>
            {concept.completed && (
              <span className="badge badge-success">
                <CheckCircle size={11} style={{ marginRight: 4 }} /> Completed
              </span>
            )}
          </div>

          {/* What is it */}
          {concept.whatItIs && (
            <section className="concept-section">
              <h3 className="concept-section-heading">What is it?</h3>
              <p className="concept-section-text">{concept.whatItIs}</p>
            </section>
          )}

          {/* Why it matters */}
          {concept.whyItMatters && (
            <section className="concept-section">
              <h3 className="concept-section-heading">Why does it matter?</h3>
              <p className="concept-section-text">{concept.whyItMatters}</p>
            </section>
          )}

          {/* Code example */}
          {concept.codeExample && (
            <section className="concept-section">
              <h3 className="concept-section-heading">Code Example</h3>
              <div className="code-block-header">
                <span className="code-lang">Example</span>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: 'var(--text-muted)' }}
                  onClick={() => { navigator.clipboard.writeText(concept.codeExample); toast.success('Copied!') }}
                >
                  Copy
                </button>
              </div>
              <div className="code-block">{concept.codeExample}</div>
            </section>
          )}

          {/* Quiz / Done section */}
          <section style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {isMastered ? (
              /* Passed quiz — show mastered + Mark Done */
              <div style={{ border: '1.5px solid var(--success)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', background: '#F0FDF4' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Trophy size={22} color="#065F46" />
                  <div>
                    <div className="font-semibold" style={{ color: '#065F46' }}>Concept Mastered!</div>
                    <div className="text-xs" style={{ color: '#047857' }}>
                      Best score: {quizStatus.bestScore}/{quizStatus.bestTotal} · {quizStatus.attemptCount} attempt{quizStatus.attemptCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}
                    onClick={() => navigate(`/quiz/concept/${id}`)}>
                    Retake
                  </button>
                </div>
                {concept.completed ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#065F46', fontSize: '0.875rem', fontWeight: 500 }}>
                    <CheckCircle size={16} /> Done — concept completed
                  </div>
                ) : (
                  <button
                    className="btn btn-success w-full"
                    onClick={handleMarkDone}
                    disabled={marking}
                    style={{ justifyContent: 'center' }}
                  >
                    {marking ? <span className="loading-spinner" /> : <CheckCircle size={16} />}
                    {marking ? 'Saving…' : 'Mark Done ✓'}
                  </button>
                )}
              </div>
            ) : (
              /* Not yet passed — single "Ready for Test" card */
              <div className="quiz-cta-card">
                <Brain size={28} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                <h3>Ready for the test?</h3>
                <p>10 questions · Need 8/10 to master · Mark Done unlocks after passing</p>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}
                  onClick={() => navigate(`/quiz/concept/${id}`)}
                >
                  <Brain size={15} /> Ready for Test →
                </button>
                {hasTried && (
                  <div className="text-xs text-muted" style={{ marginTop: '0.75rem' }}>
                    Previous best: {quizStatus.bestScore}/{quizStatus.bestTotal}
                    {quizStatus.nextRetryAt && ' · Cooldown active'}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Prev / Next navigation */}
          <div className="concept-prev-next">
            {concept.prevConcept ? (
              <Link to={`/concepts/${concept.prevConcept.id}`} className="concept-nav-btn">
                <span className="concept-nav-btn-label">← Previous</span>
                <span className="concept-nav-btn-title">{concept.prevConcept.title}</span>
              </Link>
            ) : <div />}

            {concept.nextConcept && (
              <Link to={`/concepts/${concept.nextConcept.id}`} className="concept-nav-btn next">
                <span className="concept-nav-btn-label">Next →</span>
                <span className="concept-nav-btn-title">{concept.nextConcept.title}</span>
              </Link>
            )}
          </div>
        </article>
      </div>
      {/* sticky bar removed */}
    </AppLayout>
  )
}
