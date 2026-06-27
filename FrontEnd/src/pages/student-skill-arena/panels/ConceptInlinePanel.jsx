import { useState, useEffect, useRef } from 'react'
import { TEST_DELAY_MS } from '../../../components/loaders/_config'
import DungeonPortalLoader from '../../../components/loaders/DungeonPortalLoader'
import { getConcept, getQuizStatus } from '../../../api/api'
import ReportButton from '../../../components/ReportButton'
import { ChevronLeft, AlertTriangle, Trophy, Brain, CheckCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import ConceptVideo from './ConceptVideo'
import LivePreview from './LivePreview'

export default function ConceptInlinePanel({ conceptId, navList, onClose, navigate, startQuiz, subjectTitle = '' }) {
  const subjectType = /css/i.test(subjectTitle) ? 'css'
    : /javascript|js\b/i.test(subjectTitle) ? 'js'
    : /html/i.test(subjectTitle) ? 'html'
    : /react/i.test(subjectTitle) ? 'react'
    : null
  const isWebSubject = subjectType !== null
  const [concept, setConcept]       = useState(null)
  const [quizStatus, setQuizStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab]         = useState('simple')
  const tipRef      = useRef(null)
  const mistakesRef = useRef(null)
  const quizRef     = useRef(null)
  const panelRef    = useRef(null)

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  useEffect(() => {
    let active = true
    setLoading(true); setTab('simple')
    panelRef.current?.parentElement?.scrollTo({ top: 0, behavior: 'instant' })
    window.scrollTo({ top: 0, behavior: 'instant' })
    Promise.all([
      getConcept(conceptId),
      getQuizStatus('concept', conceptId).catch(() => null),
    ]).then(([c, qs]) => {
      if (!active) return
      setConcept(c.data)
      if (qs) setQuizStatus(qs.data)
    }).finally(() => {
      if (active) setTimeout(() => setLoading(false), TEST_DELAY_MS)
    })
    return () => { active = false }
  }, [conceptId])

  const navIdx   = navList.findIndex(c => c.id === conceptId)
  const prevC    = navIdx > 0 ? navList[navIdx - 1] : null
  const nextC    = navIdx < navList.length - 1 ? navList[navIdx + 1] : null
  const isMastered = quizStatus?.hasPassed

  if (loading) return (
    <div className="sl-concept-inline">
      <div className="flex-center" style={{ flex: 1, height: '100%' }}>
        <DungeonPortalLoader panel height={280} />
      </div>
    </div>
  )

  if (!concept) return null

  return (
    <div className="sl-concept-inline" ref={panelRef}>
      {/* Header */}
      <div className="sl-concept-inline-header">
        <button className="btn btn-ghost btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.04em' }}
          onClick={onClose}>
          <ChevronLeft size={14} /> Gates
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sl-concept-inline-title">{concept.title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap', justifyContent: 'flex-end', minWidth: 0 }}>
          {concept.tip && (
            <button onClick={() => scrollTo(tipRef)} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.80rem', letterSpacing: '0.07em', padding: '0.18rem 0.55rem', borderRadius: 20, border: '1px solid rgba(245,158,11,0.35)', background: 'rgba(245,158,11,0.07)', color: '#F59E0B', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.07)'}>
              ⚡ TIP
            </button>
          )}
          {concept.commonMistakes?.length > 0 && (
            <button onClick={() => scrollTo(mistakesRef)} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.07em', padding: '0.18rem 0.55rem', borderRadius: 20, border: '1px solid rgba(239,68,68,0.35)', background: 'rgba(239,68,68,0.07)', color: '#EF4444', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.07)'}>
              ⚠ MISTAKES
            </button>
          )}
          <button onClick={() => scrollTo(quizRef)} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.07em', padding: '0.18rem 0.55rem', borderRadius: 20, border: '1px solid rgba(155,110,212,0.35)', background: 'rgba(155,110,212,0.07)', color: 'var(--primary)', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,110,212,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(155,110,212,0.07)'}>
            ⚔ TEST
          </button>
          <ReportButton variant="inline" pageTitle={`Concept — ${concept.title}`} />
          {concept.completed && (
            <span className="badge badge-cleared" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.06em' }}>
              <CheckCircle size={9} style={{ marginRight: 3 }} /> CLEARED
            </span>
          )}
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '1rem', color: 'var(--text-muted)' }}>
            <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
            {concept.estimatedMinutes}m
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="sl-concept-inline-body">

        {concept.introduction && (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, padding: '0.75rem 1rem', background: 'rgba(155,110,212,0.06)', borderLeft: '3px solid #9B6ED4', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
            {concept.introduction}
          </p>
        )}

        <ConceptVideo videoUrl={concept.videoUrl} videoTitle={concept.videoTitle} title={concept.title} />

        {(concept.explanationSimple || concept.explanationTechnical) && (
          <div>
            <div className="sl-concept-tabs">
              <button className={`sl-concept-tab${tab === 'simple' ? ' active' : ''}`} onClick={() => setTab('simple')}>Simple Mode</button>
              <button className={`sl-concept-tab${tab === 'technical' ? ' active' : ''}`} onClick={() => setTab('technical')}>Hunter Mode</button>
            </div>
            {tab === 'simple' && concept.explanationSimple && (
              <div className="sl-concept-tab-content">{concept.explanationSimple}</div>
            )}
            {tab === 'technical' && concept.explanationTechnical && (
              <div className="sl-concept-tab-content">{concept.explanationTechnical}</div>
            )}
          </div>
        )}

        {concept.syntax && (
          <div>
            <div className="code-block-header">
              <span className="code-lang">[ SYNTAX ]</span>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', color: 'var(--text-muted)' }}
                onClick={() => { navigator.clipboard.writeText(concept.syntax); toast.success('Copied!') }}>
                COPY
              </button>
            </div>
            <div className="code-block">{concept.syntax}</div>
          </div>
        )}

        {concept.examples?.length > 0 && (
          <div>
            <div className="concept-section-heading" style={{ marginBottom: '0.625rem' }}>Examples</div>
            <div className="concept-examples-list">
              {concept.examples.map((ex, i) => (
                <div key={i} className="concept-example-card">
                  <div className="concept-example-header">
                    <span className="concept-example-num">{i + 1}</span>
                    <span className="concept-example-title">{ex.title}</span>
                  </div>
                  {ex.description && <p className="concept-example-desc">{ex.description}</p>}
                  {ex.code && (
                    <>
                      <div className="code-block-header" style={{ margin: '0.5rem 0.75rem 0' }}>
                        <span className="code-lang">[ CODE ]</span>
                        <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', color: 'var(--text-muted)' }}
                          onClick={() => { navigator.clipboard.writeText(ex.code); toast.success('Copied!') }}>COPY</button>
                      </div>
                      <div className="code-block" style={{ margin: '0 0.75rem' }}>{ex.code}</div>
                      {isWebSubject && <LivePreview code={ex.code} subjectType={subjectType} demoHtml={ex.demoHtml} />}
                    </>
                  )}
                  {ex.output && !isWebSubject && (
                    <div className="concept-example-output">
                      <div className="concept-example-output-label">[ OUTPUT ]</div>
                      <pre>{ex.output}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {concept.keyPoints?.length > 0 && (
          <div>
            <div className="concept-section-heading" style={{ marginBottom: '0.5rem' }}>Key Points</div>
            <div className="concept-keypoints-list">
              {concept.keyPoints.map((kp, i) => (
                <div key={i} className="concept-keypoint">
                  <span className="concept-keypoint-dot" />
                  <span>{kp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {concept.tip && (
          <div ref={tipRef} className="concept-tip-box">
            <div className="concept-tip-label">⚡ Hunter Tip</div>
            <p className="concept-tip-text">{concept.tip}</p>
          </div>
        )}

        {concept.commonMistakes?.length > 0 && (
          <div ref={mistakesRef}>
            <div className="concept-section-heading" style={{ marginBottom: '0.5rem' }}>Common Mistakes</div>
            <div className="concept-mistakes-list">
              {concept.commonMistakes.map((m, i) => (
                <div key={i} className="concept-mistake">
                  <AlertTriangle size={14} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!concept.introduction && concept.whatItIs && (
          <div>
            <div className="concept-section-heading" style={{ marginBottom: '0.5rem' }}>What Is It?</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{concept.whatItIs}</p>
          </div>
        )}
        {!concept.introduction && concept.codeExample && (
          <div>
            <div className="code-block-header">
              <span className="code-lang">[ EXAMPLE ]</span>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', color: 'var(--text-muted)' }}
                onClick={() => { navigator.clipboard.writeText(concept.codeExample); toast.success('Copied!') }}>COPY</button>
            </div>
            <div className="code-block">{concept.codeExample}</div>
          </div>
        )}

        <div ref={quizRef} style={{ marginTop: '0.25rem' }}>
          {isMastered ? (
            <div style={{ border: '1.5px solid #4ADE8055', borderRadius: 'var(--radius-md)', padding: '1rem', background: 'rgba(74,222,128,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Trophy size={18} color="#4ADE80" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: '#4ADE80', fontSize: '0.9rem' }}>
                    ⚔️ Skill Cleared!
                  </div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: '#4ADE80', opacity: 0.75, marginTop: 2 }}>
                    {quizStatus.bestScore}/{quizStatus.bestTotal} · {quizStatus.attemptCount} attempt{quizStatus.attemptCount !== 1 ? 's' : ''} · +{quizStatus.bestScore * 10} XP earned
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', flexShrink: 0 }}
                  onClick={() => startQuiz('concept', conceptId, concept?.title ?? 'Skill Trial', null)}>Retry</button>
              </div>
            </div>
          ) : (
            <div style={{ border: '1.5px solid rgba(155,110,212,0.25)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', background: 'rgba(155,110,212,0.04)' }}>
              <Brain size={24} color="var(--primary)" style={{ marginBottom: '0.375rem' }} />
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Ready for Gate Trial?</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                10 trials · Need 8/10 to master
              </div>
              <button className="btn btn-primary w-full" style={{ justifyContent: 'center', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.06em', fontSize: '0.875rem' }}
                onClick={() => startQuiz('concept', conceptId, concept?.title ?? 'Skill Trial', null)}>
                <Brain size={14} /> Begin Skill Trial →
              </button>
              {quizStatus?.attemptCount > 0 && (
                <div style={{ marginTop: '0.5rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  Best: {quizStatus.bestScore}/{quizStatus.bestTotal}
                </div>
              )}
            </div>
          )}
        </div>

        {(prevC || nextC) && (
          <div className="sl-concept-prev-next">
            {prevC ? (
              <div className="sl-concept-nav-btn" onClick={() => onClose('prev', prevC.id)}>
                <span className="sl-concept-nav-label">← Previous Skill</span>
                <span className="sl-concept-nav-title">{prevC.title}</span>
              </div>
            ) : <div style={{ flex: 1 }} />}
            {nextC && (
              <div className="sl-concept-nav-btn right-align" onClick={() => onClose('next', nextC.id)}>
                <span className="sl-concept-nav-label">Next Skill →</span>
                <span className="sl-concept-nav-title">{nextC.title}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
