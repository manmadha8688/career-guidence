import { useState, useEffect, useRef } from 'react'
import { TEST_DELAY_MS } from '../../../components/loaders/_config'
import DungeonPortalLoader from '../../../components/loaders/DungeonPortalLoader'
import { getConcept, getQuizStatus } from '../../../api/api'
import ReportButton from '../../../components/ReportButton'
import { ChevronLeft, AlertTriangle, Trophy, Brain, CheckCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import ConceptVideo from './ConceptVideo'
import LivePreview from './LivePreview'
import SectionNotFoundPanel from '../../../components/SectionNotFoundPanel'
import { isMongoId } from '../../../utils/mongoId'

export default function ConceptInlinePanel({ conceptId, navList, onClose, startQuiz, subjectTitle = '' }) {
  const subjectType = /css/i.test(subjectTitle) ? 'css'
    : /javascript|js\b/i.test(subjectTitle) ? 'js'
    : /html/i.test(subjectTitle) ? 'html'
    : /react/i.test(subjectTitle) ? 'react'
    : null
  const isWebSubject = subjectType !== null
  const [concept, setConcept]       = useState(null)
  const [quizStatus, setQuizStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [tab, setTab]         = useState('simple')
  const tipRef      = useRef(null)
  const mistakesRef = useRef(null)
  const quizRef     = useRef(null)
  const panelRef    = useRef(null)

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  useEffect(() => {
    let active = true
    setLoading(true)
    setNotFound(false)
    setConcept(null)
    setTab('simple')
    panelRef.current?.parentElement?.scrollTo({ top: 0, behavior: 'instant' })
    window.scrollTo({ top: 0, behavior: 'instant' })

    if (!isMongoId(conceptId)) {
      setNotFound(true)
      setTimeout(() => { if (active) setLoading(false) }, TEST_DELAY_MS)
      return () => { active = false }
    }

    Promise.all([
      getConcept(conceptId).catch(() => null),
      getQuizStatus('concept', conceptId).catch(() => null),
    ]).then(([c, qs]) => {
      if (!active) return
      if (!c?.data) {
        setNotFound(true)
        return
      }
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
      <div className="flex-center dash-concept-loading">
        <DungeonPortalLoader panel height={280} />
      </div>
    </div>
  )

  if (notFound) {
    return (
      <div className="sl-concept-inline">
        <SectionNotFoundPanel variant="arena-skill" onBack={onClose} />
      </div>
    )
  }

  if (!concept) return null

  return (
    <div className="sl-concept-inline" ref={panelRef}>
      <div className="sl-concept-inline-header">
        <button className="btn btn-ghost btn-sm dash-concept-back-btn" onClick={onClose}>
          <ChevronLeft size={14} /> Gates
        </button>
        <div className="dash-flex-1">
          <div className="sl-concept-inline-title">{concept.title}</div>
        </div>
        <div className="dash-concept-header-actions">
          {concept.tip && (
            <button onClick={() => scrollTo(tipRef)} className="dash-concept-jump-btn dash-concept-jump-btn--tip">⚡ TIP</button>
          )}
          {concept.commonMistakes?.length > 0 && (
            <button onClick={() => scrollTo(mistakesRef)} className="dash-concept-jump-btn dash-concept-jump-btn--mistakes">⚠ MISTAKES</button>
          )}
          <button onClick={() => scrollTo(quizRef)} className="dash-concept-jump-btn dash-concept-jump-btn--quiz">⚔ TEST</button>
          <ReportButton variant="inline" pageTitle={`Concept — ${concept.title}`} />
          {concept.completed && (
            <span className="badge badge-cleared dash-concept-cleared-badge">
              <CheckCircle size={9} className="dash-concept-cleared-badge__icon" /> CLEARED
            </span>
          )}
          <span className="dash-concept-duration">
            <Clock size={11} className="dash-concept-duration__icon" />
            {concept.estimatedMinutes}m
          </span>
        </div>
      </div>

      <div className="sl-concept-inline-body">
        {concept.introduction && (
          <p className="dash-concept-intro">{concept.introduction}</p>
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
              <button className="btn btn-ghost btn-sm dash-concept-copy-btn"
                onClick={() => { navigator.clipboard.writeText(concept.syntax); toast.success('Copied!') }}>
                COPY
              </button>
            </div>
            <div className="code-block">{concept.syntax}</div>
          </div>
        )}

        {concept.examples?.length > 0 && (
          <div>
            <div className="concept-section-heading dash-concept-section-heading--mb-md">Examples</div>
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
                      <div className="code-block-header dash-concept-code-header--inset">
                        <span className="code-lang">[ CODE ]</span>
                        <button className="btn btn-ghost btn-sm dash-concept-copy-btn"
                          onClick={() => { navigator.clipboard.writeText(ex.code); toast.success('Copied!') }}>COPY</button>
                      </div>
                      <div className="code-block dash-concept-code-block--inset">{ex.code}</div>
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
            <div className="concept-section-heading dash-concept-section-heading--mb-sm">Key Points</div>
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
            <div className="concept-section-heading dash-concept-section-heading--mb-sm">Common Mistakes</div>
            <div className="concept-mistakes-list">
              {concept.commonMistakes.map((m, i) => (
                <div key={i} className="concept-mistake">
                  <AlertTriangle size={14} className="dash-concept-mistake-icon" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!concept.introduction && concept.whatItIs && (
          <div>
            <div className="concept-section-heading dash-concept-section-heading--mb-sm">What Is It?</div>
            <p className="dash-concept-what-is">{concept.whatItIs}</p>
          </div>
        )}
        {!concept.introduction && concept.codeExample && (
          <div>
            <div className="code-block-header">
              <span className="code-lang">[ EXAMPLE ]</span>
              <button className="btn btn-ghost btn-sm dash-concept-copy-btn"
                onClick={() => { navigator.clipboard.writeText(concept.codeExample); toast.success('Copied!') }}>COPY</button>
            </div>
            <div className="code-block">{concept.codeExample}</div>
          </div>
        )}

        <div ref={quizRef} className="dash-concept-quiz-section">
          {isMastered ? (
            <div className="dash-concept-quiz-cleared">
              <div className="dash-concept-quiz-cleared__row">
                <Trophy size={18} color="#4ADE80" />
                <div className="dash-flex-1">
                  <div className="dash-concept-quiz-cleared__title">⚔️ Skill Cleared!</div>
                  <div className="dash-concept-quiz-cleared__meta">
                    {quizStatus.bestScore}/{quizStatus.bestTotal} · {quizStatus.attemptCount} attempt{quizStatus.attemptCount !== 1 ? 's' : ''} · +{quizStatus.bestScore * 10} XP earned
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm dash-concept-quiz-cleared__retry"
                  onClick={() => startQuiz('concept', conceptId, concept?.title ?? 'Skill Trial', null)}>Retry</button>
              </div>
            </div>
          ) : (
            <div className="dash-concept-quiz-prompt">
              <Brain size={24} color="var(--primary)" className="dash-concept-quiz-prompt__icon" />
              <div className="dash-concept-quiz-prompt__title">Ready for Gate Trial?</div>
              <div className="dash-concept-quiz-prompt__desc">10 trials · Need 8/10 to master</div>
              <button className="btn btn-primary w-full dash-concept-quiz-prompt__btn"
                onClick={() => startQuiz('concept', conceptId, concept?.title ?? 'Skill Trial', null)}>
                <Brain size={14} /> Begin Skill Trial →
              </button>
              {quizStatus?.attemptCount > 0 && (
                <div className="dash-concept-quiz-prompt__best">
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
            ) : <div className="dash-flex-spacer" />}
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
