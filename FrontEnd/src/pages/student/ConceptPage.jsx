import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Circle, Clock, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import ProgressBar from '../../components/ProgressBar'
import { getConcept, completeConcept, uncompleteConcept } from '../../api/api'
import toast from 'react-hot-toast'

export default function ConceptPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [concept, setConcept] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    getConcept(id)
      .then(r => setConcept(r.data))
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

  const handleToggle = async () => {
    setToggling(true)
    try {
      if (concept.completed) {
        await uncompleteConcept(concept.id)
        toast.success('Marked as incomplete')
      } else {
        await completeConcept(concept.id)
        toast.success('Concept completed! 🎉')
      }
      setConcept(c => ({ ...c, completed: !c.completed }))
    } catch {
      toast.error('Failed to update progress')
    } finally {
      setToggling(false)
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

  return (
    <AppLayout title={concept.title}>
      <div className="concept-layout">
        {/* Sidebar: concept list */}
        <aside className="concept-sidebar">
          <div className="concept-sidebar-title">{concept.subjectTitle}</div>
          {/* We'll just show prev/next context since we don't have the full list loaded */}
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

      {/* Sticky complete bar */}
      <div className="complete-btn-bar">
        <span className="text-sm text-muted">
          {concept.completed ? '✅ You completed this concept' : '📌 Mark this concept when you understand it'}
        </span>
        <button
          className={`btn ${concept.completed ? 'btn-ghost' : 'btn-success'}`}
          onClick={handleToggle}
          disabled={toggling}
        >
          {toggling ? <span className="loading-spinner" /> : concept.completed ? <><Circle size={15} /> Mark Incomplete</> : <><CheckCircle size={15} /> Mark Complete</>}
        </button>
      </div>
    </AppLayout>
  )
}
