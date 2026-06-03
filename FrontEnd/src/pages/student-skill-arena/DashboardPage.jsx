import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, LogOut, Search, Brain, Trophy, X, Clock, ChevronLeft, ChevronRight, AlertTriangle, Lock, PlayCircle, Zap, Info } from 'lucide-react'
import {
  getProgressSummary, getRoadmap, getRoadmapStatus,
  getSubjects, getSubject, getConcept, getQuizStatus,
  getRoadmaps, enrollRoadmap, pauseRoadmap, resumeRoadmap,
} from '../../api/api'
import { useAuth } from '../../context/AuthContext'
import { getRank } from '../../utils/slRank'
import ProgressBar from '../../components/ProgressBar'
import toast from 'react-hot-toast'

// ─── Constants ────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'SKILL ARENA',  view: 'arena' },
  { label: 'DUNGEON GATE', view: 'gates' },
  { label: 'HUNTER PATH',  view: 'paths' },
]

const DAILY_QUESTS = [
  { id: 'q1', label: 'Complete 1 concept',    xp: 50 },
  { id: 'q2', label: 'Study for 20 min',      xp: 30 },
]

const RANK_LADDER = [
  { letter: 'E', label: 'E-RANK', cls: 'rank-e', color: '#888888', bg: '#88888815', min: 0 },
  { letter: 'D', label: 'D-RANK', cls: 'rank-d', color: '#4ADE80', bg: '#4ADE8015', min: 500 },
  { letter: 'C', label: 'C-RANK', cls: 'rank-c', color: '#60A5FA', bg: '#60A5FA15', min: 1500 },
  { letter: 'B', label: 'B-RANK', cls: 'rank-b', color: '#9B6ED4', bg: '#9B6ED415', min: 3000 },
  { letter: 'A', label: 'A-RANK', cls: 'rank-a', color: '#F59E0B', bg: '#F59E0B15', min: 6000 },
  { letter: 'S', label: 'S-RANK', cls: 'rank-s', color: '#EF4444', bg: '#EF444415', min: 10000 },
]

const STAT_DEFS = [
  { key: 'INT', label: 'INTELLIGENCE', tags: 'Java · Spring',   color: '#9B6ED4', match: t => /java|spring|python|oop|data.struct|mongodb|django|node|backend/.test(t) },
  { key: 'AGI', label: 'AGILITY',      tags: 'React · JS',      color: '#4ADE80', match: t => /react|javascript|html|css|frontend/.test(t) },
  { key: 'END', label: 'ENDURANCE',    tags: 'SQL · Deploy',    color: '#60A5FA', match: t => /sql|postgres|mysql|docker|git|deploy|database/.test(t) },
  { key: 'PER', label: 'PERCEPTION',   tags: 'Problem Solving', color: '#F59E0B', match: t => /security|jwt|rest|api|design|algorithm|boot|express/.test(t) },
]

const GATE_FILTERS = ['All', 'Active Hunt', 'Cleared', 'Not Started']

// ─── Helpers ──────────────────────────────────────────────
const gateRankByOrder = (idx) => {
  if (idx <= 1) return { label: 'D', cls: 'rank-d', color: '#4ADE80' }
  if (idx <= 3) return { label: 'C', cls: 'rank-c', color: '#60A5FA' }
  if (idx <= 6) return { label: 'B', cls: 'rank-b', color: '#9B6ED4' }
  if (idx <= 9) return { label: 'A', cls: 'rank-a', color: '#F59E0B' }
  return            { label: 'S', cls: 'rank-s', color: '#EF4444' }
}

const RANK_META = {
  S: { cls: 'rank-s', color: '#EF4444' },
  A: { cls: 'rank-a', color: '#F59E0B' },
  B: { cls: 'rank-b', color: '#9B6ED4' },
  C: { cls: 'rank-c', color: '#60A5FA' },
  D: { cls: 'rank-d', color: '#4ADE80' },
  E: { cls: 'rank-e', color: '#888888' },
}

// Uses rank from API; falls back to E if missing
const subjectGateRank = (s) => {
  const r = RANK_META[s?.rank] || RANK_META['E']
  return { label: s?.rank || 'E', ...r }
}

const computeStats = (sp = []) =>
  STAT_DEFS.map(def => {
    const m = sp.filter(s => def.match(s.title.toLowerCase()))
    const avg = m.length ? Math.round(m.reduce((a, s) => a + s.percentage, 0) / m.length) : 0
    return { ...def, value: Math.min(100, 10 + Math.round(avg * 0.9)) }
  })

const questKey = (userId) => `sl_quests_${userId}`

const loadQuestState = (userId) => {
  try {
    const s = localStorage.getItem(questKey(userId))
    if (!s) return {}
    const { date, state } = JSON.parse(s)
    if (date !== new Date().toDateString()) return {}
    return state
  } catch { return {} }
}
const saveQuestState = (state, userId) =>
  localStorage.setItem(questKey(userId), JSON.stringify({ date: new Date().toDateString(), state }))

// ─── About Gate Modal ─────────────────────────────────────
function AboutGateModal({ subject, onClose }) {
  const RANK_COLOR = { S:'#EF4444', A:'#F59E0B', B:'#9B6ED4', C:'#60A5FA', D:'#4ADE80', E:'#888888' }
  const rc = RANK_COLOR[subject?.rank] || '#888888'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const Section = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</div>
      {children}
    </div>
  )

  const ListItems = ({ items }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {(items || []).map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <span style={{ color: rc, flexShrink: 0, marginTop: '0.1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem' }}>›</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: 'var(--bg-card)', border: `1px solid ${rc}33`, borderTop: `3px solid ${rc}`, borderRadius: 'var(--radius-lg)', width: 'clamp(340px, 62vw, 860px)', maxHeight: '88vh', display: 'flex', flexDirection: 'column', boxShadow: `0 0 40px ${rc}18` }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, background: subject.color + '22', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
            {subject.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{subject.title}</div>
            <div style={{ display: 'flex', gap: '0.625rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 3, border: `1.5px solid ${rc}`, color: rc, background: rc + '15' }}>{subject.rank || 'E'}-RANK</span>
              {subject.difficulty && <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>{subject.difficulty}</span>}
              {subject.estimatedHours > 0 && <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>{subject.estimatedHours}h</span>}
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>{subject.totalConcepts} skills</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem', borderRadius: 4, flexShrink: 0 }}><X size={16} /></button>
        </div>

        {/* Body — 2-col grid on wide screens, single col on narrow */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', alignContent: 'start' }}>

          {subject.overview && (
            <div style={{ gridColumn: '1 / -1' }}>
              <Section label="Overview">
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, padding: '0.625rem 0.875rem', background: rc + '08', borderLeft: `3px solid ${rc}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>{subject.overview}</p>
              </Section>
            </div>
          )}

          {subject.whyLearn && (
            <Section label="Why Learn This?">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{subject.whyLearn}</p>
            </Section>
          )}

          {subject.forWho && (
            <Section label="Who Is This For?">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{subject.forWho}</p>
            </Section>
          )}

          {subject.prerequisites?.length > 0 && (
            <Section label="What you need to know first">
              <ListItems items={subject.prerequisites} />
            </Section>
          )}

          {subject.outcomes?.length > 0 && (
            <Section label="What You'll Be Able To Do">
              <ListItems items={subject.outcomes} />
            </Section>
          )}

          {subject.whatYouWillBuild?.length > 0 && (
            <Section label="What You'll Build">
              <ListItems items={subject.whatYouWillBuild} />
            </Section>
          )}

          {subject.careerUse && (
            <div style={{ gridColumn: '1 / -1' }}>
              <Section label="Career Use">
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{subject.careerUse}</p>
              </Section>
            </div>
          )}

          {!subject.overview && !subject.whyLearn && !subject.outcomes?.length && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              NO GATE INTEL AVAILABLE YET
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Concept Inline Panel ─────────────────────────────────
function ConceptInlinePanel({ conceptId, navList, onClose, navigate }) {
  const [concept, setConcept]       = useState(null)
  const [quizStatus, setQuizStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab]         = useState('simple')

  useEffect(() => {
    setLoading(true); setTab('simple')
    Promise.all([
      getConcept(conceptId),
      getQuizStatus('concept', conceptId).catch(() => null),
    ]).then(([c, qs]) => {
      setConcept(c.data)
      if (qs) setQuizStatus(qs.data)
    }).finally(() => setLoading(false))
  }, [conceptId])

  const navIdx   = navList.findIndex(c => c.id === conceptId)
  const prevC    = navIdx > 0 ? navList[navIdx - 1] : null
  const nextC    = navIdx < navList.length - 1 ? navList[navIdx + 1] : null
  const isMastered = quizStatus?.hasPassed

  if (loading) return (
    <div className="sl-concept-inline">
      <div className="flex-center" style={{ flex: 1, height: '100%' }}>
        <div className="loading-spinner-lg" />
      </div>
    </div>
  )

  if (!concept) return null

  return (
    <div className="sl-concept-inline">
      {/* Header */}
      <div className="sl-concept-inline-header">
        <button className="btn btn-ghost btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.04em' }}
          onClick={onClose}>
          <ChevronLeft size={14} /> Gates
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sl-concept-inline-title">{concept.title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: 'var(--text-muted)' }}>
            <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
            {concept.estimatedMinutes}m
          </span>
          {concept.completed && (
            <span className="badge badge-cleared" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.06em' }}>
              <CheckCircle size={9} style={{ marginRight: 3 }} /> CLEARED
            </span>
          )}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="sl-concept-inline-body">

        {/* Introduction */}
        {concept.introduction && (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, padding: '0.75rem 1rem', background: 'rgba(155,110,212,0.06)', borderLeft: '3px solid #9B6ED4', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
            {concept.introduction}
          </p>
        )}

        {/* Explanation tabs */}
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

        {/* Syntax */}
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

        {/* Examples */}
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
                    </>
                  )}
                  {ex.output && (
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

        {/* Key Points */}
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

        {/* Tip */}
        {concept.tip && (
          <div className="concept-tip-box">
            <div className="concept-tip-label">⚡ Hunter Tip</div>
            <p className="concept-tip-text">{concept.tip}</p>
          </div>
        )}

        {/* Common Mistakes */}
        {concept.commonMistakes?.length > 0 && (
          <div>
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

        {/* Legacy fallback */}
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

        {/* Quiz status — auto-cleared after passing, no manual button needed */}
        <div style={{ marginTop: '0.25rem' }}>
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
                  onClick={() => navigate(`/skill-arena/quiz/concept/${conceptId}`)}>Retry</button>
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
                onClick={() => navigate(`/skill-arena/quiz/concept/${conceptId}`)}>
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

        {/* Prev / Next */}
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

// ─── Roadmap Panel (right overlay, shows gates list) ─────
function RoadmapPanel({ roadmapId, onClose, onGateClick, navigate }) {
  const [roadmap, setRoadmap]   = useState(null)
  const [status, setStatus]     = useState(null)
  const [loading, setLoading]   = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [pausing, setPausing]   = useState(false)

  useEffect(() => {
    setLoading(true); setRoadmap(null)
    Promise.all([
      getRoadmap(roadmapId),
      getRoadmapStatus(roadmapId).catch(() => null),
    ]).then(([r, rs]) => {
      setRoadmap(r.data)
      if (rs) setStatus(rs.data)
    }).finally(() => setLoading(false))
  }, [roadmapId])

  const handleEnroll = async (e) => {
    e.stopPropagation()
    setEnrolling(true)
    try {
      await enrollRoadmap(roadmapId)
      setRoadmap(r => ({ ...r, enrolled: true, paused: false }))
      toast.success('⚔️ Path registered!')
    } catch { toast.error('Failed to register') }
    finally { setEnrolling(false) }
  }

  const handlePause = async (e) => {
    e.stopPropagation()
    setPausing(true)
    try {
      await pauseRoadmap(roadmapId)
      setRoadmap(r => ({ ...r, paused: true }))
      toast.success('Hunt paused')
    } catch { toast.error('Failed to pause') }
    finally { setPausing(false) }
  }

  const handleResume = async (e) => {
    e.stopPropagation()
    setPausing(true)
    try {
      await resumeRoadmap(roadmapId)
      setRoadmap(r => ({ ...r, paused: false }))
      toast.success('⚔️ Hunt resumed!')
    } catch { toast.error('Failed to resume') }
    finally { setPausing(false) }
  }

  const pct      = roadmap?.overallPercentage ?? 0
  const subjects = roadmap?.subjects ?? []
  const isEnrolled = roadmap?.enrolled
  const isPaused   = roadmap?.paused

  // Show progress only when enrolled AND not paused
  const showProgress = isEnrolled && !isPaused

  return (
    <div className="sl-subject-panel">
      {/* Header */}
      <div className="sl-subject-panel-header">
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9B6ED4' }}>
          [ HUNTER PATH ]
        </span>
        <button className="sl-subject-panel-close" onClick={onClose}>✕</button>
      </div>

      {loading ? (
        <div className="flex-center" style={{ flex: 1 }}><div className="loading-spinner-lg" /></div>
      ) : !roadmap ? null : (
        <div className="sl-subject-panel-body">

          {/* Path header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: roadmap.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
              {roadmap.icon}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>{roadmap.title}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: roadmap.color, letterSpacing: '0.06em' }}>{roadmap.roleTarget}</div>
            </div>
          </div>

          {/* Progress bar — only when enrolled + active */}
          {showProgress && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
                <span>{roadmap.completedSubjects ?? 0}/{roadmap.totalSubjects ?? subjects.length} gates cleared</span>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem', color: roadmap.color, fontWeight: 700 }}>{pct}%</span>
              </div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${roadmap.color}88, ${roadmap.color})`, borderRadius: 3, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          )}

          {/* Action button row */}
          {!isEnrolled ? (
            /* Not enrolled → Begin Hunt */
            <button onClick={handleEnroll} disabled={enrolling}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: `linear-gradient(135deg, ${roadmap.color}CC, ${roadmap.color})`, border: 'none', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em' }}>
              {enrolling ? <span className="loading-spinner" style={{ borderTopColor: '#fff' }} /> : '⚔️'}
              {enrolling ? 'Registering…' : 'Begin Hunt'}
            </button>
          ) : isPaused ? (
            /* Paused → Resume Hunt */
            <button onClick={handleResume} disabled={pausing}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: `linear-gradient(135deg, ${roadmap.color}CC, ${roadmap.color})`, border: 'none', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em' }}>
              {pausing ? <span className="loading-spinner" style={{ borderTopColor: '#fff' }} /> : '▶'}
              {pausing ? 'Resuming…' : 'Resume Hunt'}
            </button>
          ) : status?.allSubjectsDone ? (
            /* All done → Path Trial */
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => navigate(`/skill-arena/quiz/roadmap/${roadmapId}`)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', border: 'none', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', color: '#1A0F00', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em' }}>
                <Trophy size={14} /> Begin Path Trial
              </button>
              <button onClick={handlePause} disabled={pausing}
                style={{ padding: '0.5rem 0.75rem', background: 'rgba(136,136,136,0.12)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.06em' }}>
                {pausing ? '…' : '⏸ Pause'}
              </button>
            </div>
          ) : (
            /* Enrolled + active → Pause Hunt */
            <button onClick={handlePause} disabled={pausing}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: 'rgba(136,136,136,0.1)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em' }}>
              {pausing ? <span className="loading-spinner" /> : '⏸'}
              {pausing ? 'Pausing…' : 'Pause Hunt'}
            </button>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>GATES</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Gates list — always visible, but progress hidden when paused/not enrolled */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {subjects.map((s, i) => {
              const p       = showProgress ? (s.percentage ?? 0) : 0
              const cleared = showProgress && (s.percentage ?? 0) >= 100
              const active  = showProgress && (s.percentage ?? 0) > 0 && (s.percentage ?? 0) < 100
              return (
                <div
                  key={s.id}
                  onClick={() => isEnrolled && s.totalConcepts > 0 && onGateClick(s.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 0.625rem',
                    background: 'var(--bg-secondary)',
                    border: `1px solid ${cleared ? 'rgba(74,222,128,0.2)' : active ? 'rgba(155,110,212,0.2)' : 'var(--border)'}`,
                    borderLeft: `3px solid ${cleared ? '#4ADE80' : active ? '#9B6ED4' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    cursor: isEnrolled && s.totalConcepts > 0 ? 'pointer' : 'default',
                    opacity: s.totalConcepts > 0 ? 1 : 0.45,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (isEnrolled && s.totalConcepts > 0) e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = cleared ? 'rgba(74,222,128,0.2)' : active ? 'rgba(155,110,212,0.2)' : 'var(--border)' }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', fontWeight: 700, background: cleared ? 'rgba(74,222,128,0.15)' : 'var(--bg-tertiary)', border: `1.5px solid ${cleared ? '#4ADE8055' : 'var(--border)'}`, color: cleared ? '#4ADE80' : 'var(--text-muted)' }}>
                    {cleared ? <CheckCircle size={11} color="#4ADE80" /> : s.totalConcepts > 0 ? i + 1 : <Lock size={10} />}
                  </div>
                  <span style={{ fontSize: '0.875rem', flexShrink: 0 }}>{s.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</div>
                    {active ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem' }}>
                        <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${p}%`, background: '#9B6ED4', borderRadius: 2 }} />
                        </div>
                        <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', color: '#9B6ED4', fontWeight: 700 }}>{p}%</span>
                      </div>
                    ) : (
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
                        {s.totalConcepts > 0 ? `${s.totalConcepts} skills` : 'sealed'}
                      </div>
                    )}
                  </div>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.06em', padding: '0.1rem 0.35rem', borderRadius: 3, flexShrink: 0, background: cleared ? 'rgba(74,222,128,0.1)' : active ? 'rgba(155,110,212,0.1)' : 'rgba(136,136,136,0.07)', color: cleared ? '#4ADE80' : active ? '#B48AE8' : '#555' }}>
                    {cleared ? 'DONE' : active ? 'HUNT' : 'Enter'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Subject Panel (overlay-right OR in-grid-left) ────────
function SubjectPanel({ subjectId, onClose, onSkillClick, selectedConceptId, navigate, mode = 'overlay' }) {
  const [subject, setSubject]       = useState(null)
  const [quizStatus, setQuizStatus] = useState(null)
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const isGrid = mode === 'grid'

  useEffect(() => {
    setLoading(true); setSubject(null); setSearch('')
    Promise.all([
      getSubject(subjectId),
      getQuizStatus('subject', subjectId).catch(() => null),
    ]).then(([s, qs]) => {
      setSubject(s.data)
      if (qs) setQuizStatus(qs.data)
    }).finally(() => setLoading(false))
  }, [subjectId])

  const pct = subject?.totalConcepts > 0
    ? Math.round((subject.completedCount / subject.totalConcepts) * 100) : 0

  const concepts = (subject?.concepts ?? []).filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const wrapperClass = isGrid ? 'sl-subject-grid-panel' : 'sl-subject-panel'
  const bodyClass    = isGrid ? 'sl-subject-grid-panel sl-subject-panel-body' : 'sl-subject-panel-body'

  return (
    <div className={wrapperClass}>
      {/* Header */}
      <div className="sl-subject-panel-header">
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9B6ED4' }}>
          [ SKILLS ]
        </span>
        <button className="sl-subject-panel-close" onClick={onClose}>✕</button>
      </div>

      {loading ? (
        <div className="flex-center" style={{ flex: 1, minHeight: 120 }}><div className="loading-spinner-lg" /></div>
      ) : !subject ? null : (
        <div className={isGrid ? undefined : 'sl-subject-panel-body'} style={isGrid ? { flex: 1, overflowY: 'auto', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' } : undefined}>

          {/* Subject meta */}
          <div className="sl-panel-subject-meta">
            <div className="sl-panel-subject-icon" style={{ background: subject.color + '22', width: 36, height: 36, fontSize: '1.25rem' }}>
              {subject.icon}
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="sl-panel-subject-title" style={{ fontSize: '0.9rem' }}>{subject.title}</div>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="sl-panel-progress-row">
              <span>{subject.completedCount}/{subject.totalConcepts} skills</span>
              <span className="sl-panel-progress-pct">{pct}%</span>
            </div>
            <ProgressBar value={pct} size="sm" />
          </div>

          {/* Gate Trial button — only in overlay (right) mode */}
          {!isGrid && (
            quizStatus?.hasPassed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--radius-sm)' }}>
                <Trophy size={13} color="#4ADE80" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4ADE80', letterSpacing: '0.08em' }}>CLEARANCE EARNED</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)' }}>{quizStatus.bestScore}/{quizStatus.bestTotal}</div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }}
                  onClick={() => navigate(`/skill-arena/quiz/subject/${subjectId}`)}>Retry</button>
              </div>
            ) : (
              <button className="btn btn-primary w-full" style={{ justifyContent: 'center', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.06em', fontSize: '0.85rem' }}
                onClick={() => navigate(`/skill-arena/quiz/subject/${subjectId}`)}>
                <Brain size={13} />
                {quizStatus?.attemptCount > 0 ? `Retry Trial · ${quizStatus.bestScore}/25` : 'Begin Gate Trial →'}
              </button>
            )
          )}

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={12} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input className="form-input" style={{ paddingLeft: '1.75rem', fontSize: '0.78rem' }}
              placeholder="Scout skills…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Skills list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {concepts.map((c, i) => (
              <div
                key={c.id}
                className={`sl-skill-item${c.completed ? ' cleared' : ''}${selectedConceptId === c.id ? ' active-skill' : ''}`}
                onClick={() => onSkillClick(c.id, subject.concepts)}
              >
                <div className="sl-skill-num" style={{
                  background: c.completed ? 'rgba(74,222,128,0.15)' : selectedConceptId === c.id ? 'rgba(155,110,212,0.2)' : 'var(--bg-tertiary)',
                  border: c.completed ? '1.5px solid #4ADE8055' : selectedConceptId === c.id ? '1.5px solid #9B6ED455' : '1.5px solid var(--border)',
                  color: c.completed ? '#4ADE80' : selectedConceptId === c.id ? '#9B6ED4' : 'var(--text-muted)',
                }}>
                  {c.completed ? <CheckCircle size={11} color="#4ADE80" /> : i + 1}
                </div>
                <div className="sl-skill-info">
                  <div className="sl-skill-title">{c.title}</div>
                  <div className="sl-skill-mins">
                    <Clock size={9} style={{ display: 'inline', marginRight: 3 }} />{c.estimatedMinutes}m
                  </div>
                </div>
                {c.rank && (() => {
                  const rc = { S:'#EF4444',A:'#F59E0B',B:'#9B6ED4',C:'#60A5FA',D:'#4ADE80',E:'#888888' }
                  const col = rc[c.rank] || '#888888'
                  return <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:'0.55rem', fontWeight:700, padding:'0.1rem 0.3rem', borderRadius:3, border:`1px solid ${col}40`, color:col, background:col+'15', flexShrink:0 }}>{c.rank}</span>
                })()}
                <span className={`sl-skill-badge ${c.completed ? 'cleared' : 'enter'}`}>
                  {c.completed ? 'CLEARED' : 'ENTER'}
                </span>
              </div>
            ))}
            {concepts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                {search ? 'NO SKILLS MATCH' : 'NO SKILLS AVAILABLE'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Hunter Profile Drawer ────────────────────────────────
const HOW_IT_WORKS = [
  { num: '01', color: '#9B6ED4', title: 'Pick a Hunter Path', desc: 'Go to HUNTER PATH tab and choose a career roadmap — Java Full Stack, MERN, Python, Frontend. Each path is a structured sequence of dungeon gates.' },
  { num: '02', color: '#60A5FA', title: 'Enter Dungeon Gates', desc: 'Go to DUNGEON GATE tab — each gate is a subject (HTML, CSS, JavaScript...). Enter a gate and start clearing concepts one by one at your own pace.' },
  { num: '03', color: '#F59E0B', title: 'Clear Concepts & Earn XP', desc: 'Read each concept then pass the quiz (8/10 to clear). Earn XP per concept — first concept of the day gives +50 bonus XP.' },
]

const XP_TIPS = [
  'First concept of the day gives +50 bonus XP',
  'Each quiz earns score × 10 XP (max 100 per concept)',
  'Clear all concepts in a gate to unlock the subject badge',
  'Enroll a Hunter Path to track your full career progress',
]

function SectionTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.14em', color: '#64748B', whiteSpace: 'nowrap' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
    </div>
  )
}

function HunterProfileDrawer({ user, rank, level, xp, onClose, onLogout }) {
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??'
  const xpToNext = rank.next ? rank.next - xp : null

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 300, backdropFilter: 'blur(2px)' }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 92vw)',
        background: '#090E1C',
        borderLeft: '1px solid rgba(155,110,212,0.22)',
        zIndex: 301, overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
        animation: 'slideInRight 0.22s ease',
        boxShadow: '-12px 0 48px rgba(0,0,0,0.6)',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(155,110,212,0.15)', position: 'sticky', top: 0, background: '#090E1C', zIndex: 1 }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#9B6ED4' }}>[ HUNTER PROFILE ]</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '0.25rem', display: 'flex', borderRadius: 4 }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', flex: 1 }}>

          {/* ── Hunter Card ── */}
          <div style={{ background: 'rgba(155,110,212,0.07)', border: '1px solid rgba(155,110,212,0.2)', borderRadius: 12, padding: '1.125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: user?.avatarColor || '#9B6ED4', border: `2.5px solid ${rank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem', color: '#fff', flexShrink: 0, boxShadow: `0 0 16px ${rank.color}44` }}>
                {initials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#E2E8F0', marginBottom: '0.25rem' }}>{user?.fullName}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.62rem' }}>{rank.label}-RANK</span>
                  {user?.role === 'GUEST' && (
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#64748B', background: 'rgba(100,116,139,0.15)', padding: '0.1rem 0.45rem', borderRadius: 4, letterSpacing: '0.05em', border: '1px solid rgba(100,116,139,0.25)' }}>GUEST</span>
                  )}
                </div>
              </div>
            </div>
            {/* XP bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: '#F59E0B' }}>POWER: {xp.toLocaleString()} XP</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: '#64748B' }}>LVL {level}</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${rank.progress}%`, background: `linear-gradient(90deg, ${rank.color}80, ${rank.color})`, borderRadius: 3, transition: 'width 1s ease' }} />
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.67rem', color: '#64748B', marginTop: '0.375rem' }}>
              {xpToNext != null ? `${xpToNext.toLocaleString()} XP to next rank` : 'MAX RANK — S CLASS ACHIEVED'}
            </div>
          </div>

          {/* ── How ARISE Works ── */}
          <div>
            <SectionTitle>HOW ARISE WORKS</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {HOW_IT_WORKS.map(s => (
                <div key={s.num} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 0.875rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${s.color}18`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.58rem', fontWeight: 800, color: s.color, fontFamily: "'Orbitron', sans-serif" }}>{s.num}</div>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '0.2rem' }}>{s.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#8B9AB8', lineHeight: 1.65 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Rank Progression Guide ── */}
          <div>
            <SectionTitle>RANK PROGRESSION GUIDE</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '0.875rem' }}>
              {RANK_LADDER.map(r => {
                const isCurrent = r.letter === rank.label
                const isUnlocked = xp >= r.min
                return (
                  <div key={r.letter} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.55rem 0.75rem', background: isCurrent ? `${r.color}10` : 'rgba(255,255,255,0.02)', border: `1px solid ${isCurrent ? r.color + '35' : 'rgba(255,255,255,0.05)'}`, borderRadius: 8, opacity: isUnlocked ? 1 : 0.45 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, border: `1.5px solid ${r.color}`, background: `${r.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: 800, color: r.color, fontFamily: "'Orbitron', sans-serif", flexShrink: 0 }}>{r.letter}</div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: isCurrent ? r.color : '#8B9AB8' }}>{r.label}</span>
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.64rem', color: isCurrent ? '#F59E0B' : '#64748B' }}>{r.min === 0 ? 'START' : `${r.min.toLocaleString()} XP`}</span>
                    </div>
                    {isCurrent && <span style={{ fontSize: '0.55rem', fontWeight: 700, color: r.color, background: `${r.color}18`, padding: '0.1rem 0.4rem', borderRadius: 3, letterSpacing: '0.06em', fontFamily: "'Share Tech Mono', monospace", flexShrink: 0 }}>NOW</span>}
                  </div>
                )
              })}
            </div>
            {/* XP Tips */}
            <div style={{ padding: '0.75rem 0.875rem', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.18)', borderRadius: 8 }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>[ XP TIPS ]</div>
              {XP_TIPS.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: '#8B9AB8', lineHeight: 1.6 }}>
                  <span style={{ color: '#F59E0B', flexShrink: 0 }}>›</span>{tip}
                </div>
              ))}
            </div>
          </div>

          {/* ── About ── */}
          <div>
            <SectionTitle>ABOUT LEARNTOEARN</SectionTitle>
            <div style={{ padding: '0.875rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
              <p style={{ fontSize: '0.8125rem', color: '#8B9AB8', lineHeight: 1.75, margin: '0 0 0.625rem' }}>
                LearnToEarn is a Solo Leveling-themed learning platform built for Indian graduates. Master tech skills concept by concept, earn XP and badges as proof, and follow structured career roadmaps from zero to job-ready.
              </p>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: '#64748B', letterSpacing: '0.06em' }}>
                Skills Arena · Resume · AI · Jobs
              </div>
            </div>
          </div>

        </div>

        {/* ── Sticky footer — logout ── */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(155,110,212,0.12)', background: '#090E1C', position: 'sticky', bottom: 0 }}>
          {user?.role === 'GUEST' && (
            <div style={{ marginBottom: '0.75rem', padding: '0.625rem 0.875rem', background: 'rgba(155,110,212,0.08)', border: '1px solid rgba(155,110,212,0.2)', borderRadius: 8, fontSize: '0.75rem', color: '#8B9AB8', lineHeight: 1.6 }}>
              <span style={{ color: '#C4B5FD', fontWeight: 600 }}>Guest session</span> — create a free account to save your XP and progress permanently.
            </div>
          )}
          <button onClick={onLogout} style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)', color: '#EF4444', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.1em', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.16)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}>
            <LogOut size={13} /> EXIT SYSTEM
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Main Component ───────────────────────────────────────
export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [summary, setSummary]         = useState(null)
  const [activeRoadmap, setActiveRoadmap] = useState(null)
  const [loading, setLoading]         = useState(true)

  const [activeView, setActiveView]   = useState(() => searchParams.get('view') || 'arena')
  const [selectedSubjectId, setSelectedSubjectId] = useState(() => searchParams.get('subject') || null)
  const [selectedConceptId, setSelectedConceptId] = useState(null)
  const [conceptNavList, setConceptNavList] = useState([])
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null)

  const [quests, setQuests]           = useState(() => loadQuestState(user?.id))
  const [aboutGate, setAboutGate]     = useState(null)  // subject object for About Gate modal
  const [avatarOpen, setAvatarOpen]   = useState(false)
  const [panelRefreshKey, setPanelRefreshKey] = useState(0)
  const [studySeconds, setStudySeconds] = useState(0)

  const [subjects, setSubjects]       = useState([])
  const [quizStatuses, setQuizStatuses] = useState({})
  const [gatesLoaded, setGatesLoaded] = useState(false)
  const [gateSearch, setGateSearch]   = useState('')
  const [gateFilter, setGateFilter]   = useState('All')

  const [allRoadmaps, setAllRoadmaps] = useState([])
  const [pathsLoaded, setPathsLoaded] = useState(false)
  const [pathSearch, setPathSearch]   = useState('')
  const [enrolling, setEnrolling]     = useState({})

  // Sync q1 quest from server (source of truth, works across devices)
  const syncQuestsFromSummary = (summaryData, uid) => {
    if (summaryData?.completedConceptToday) {
      const current = loadQuestState(uid)
      if (!current.q1) {
        const updated = { ...current, q1: true }
        setQuests(updated)
        saveQuestState(updated, uid)
      }
    }
  }

  useEffect(() => {
    getProgressSummary()
      .then(s => {
        setSummary(s.data)
        syncQuestsFromSummary(s.data, user?.id)
      })
      .catch(() => toast.error('Failed to load status window'))
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line

  // Re-fetch everything when a concept is cleared (dispatched from QuizResultPage)
  useEffect(() => {
    const refresh = () => {
      getProgressSummary().then(s => {
        setSummary(s.data)
        syncQuestsFromSummary(s.data, user?.id)
      }).catch(() => {})
      setGatesLoaded(false)                 // force gate cards to reload
      setPanelRefreshKey(k => k + 1)        // force SubjectPanel to re-fetch
    }
    window.addEventListener('sl:refresh', refresh)
    return () => window.removeEventListener('sl:refresh', refresh)
  }, [])

  useEffect(() => {
    const view    = searchParams.get('view') || 'arena'
    const subject = searchParams.get('subject')
    if (view === 'gates' && !gatesLoaded) loadGates()
    if (view === 'paths' && !pathsLoaded) loadPaths()
    if (subject) setSelectedSubjectId(subject)
  }, []) // eslint-disable-line


  // Auto-check "Study for 20 min" quest after 20 minutes on the dashboard
  useEffect(() => {
    if (loadQuestState(user?.id).q2) return  // already earned today
    const t = setInterval(() => {
      setStudySeconds(s => {
        const next = s + 1
        if (next >= 1200) {  // 20 minutes = 1200 seconds
          clearInterval(t)
          const updated = { ...loadQuestState(user?.id), q2: true }
          setQuests(updated)
          saveQuestState(updated, user?.id)
        }
        return next
      })
    }, 1000)
    return () => clearInterval(t)
  }, []) // eslint-disable-line

  const loadGates = () => {
    if (gatesLoaded) return
    getSubjects().then(r => {
      setSubjects(r.data)
      setGatesLoaded(true)
      r.data.forEach(s => {
        getQuizStatus('subject', s.id)
          .then(qs => setQuizStatuses(prev => ({ ...prev, [s.id]: qs.data })))
          .catch(() => {})
      })
    })
  }

  const loadPaths = () => {
    if (pathsLoaded) return
    getRoadmaps().then(r => { setAllRoadmaps(r.data); setPathsLoaded(true) })
  }

  // Load roadmaps eagerly so Skill Arena can show active path
  useEffect(() => { loadPaths() }, []) // eslint-disable-line

  const switchView = (view) => {
    setActiveView(view)
    setGateSearch(''); setGateFilter('All'); setPathSearch('')
    setSelectedSubjectId(null); setSelectedConceptId(null); setConceptNavList([])
    setSelectedRoadmapId(null)
    setSearchParams(view === 'arena' ? {} : { view })
    if (view === 'gates') loadGates()
    if (view === 'paths') loadPaths()
  }

  const openSubjectPanel = (id) => {
    setSelectedSubjectId(id)
    setSelectedConceptId(null); setConceptNavList([])
    // keep roadmap panel open so user can still navigate between gates
    const params = activeView === 'arena' ? {} : { view: activeView }
    setSearchParams({ ...params, subject: id })
  }

  const closeSubjectPanel = () => {
    setSelectedSubjectId(null); setSelectedConceptId(null); setConceptNavList([])
    setSearchParams(activeView === 'arena' ? {} : { view: activeView })
  }

  const openRoadmapPanel = (id) => {
    setSelectedRoadmapId(id)
    setSelectedSubjectId(null); setSelectedConceptId(null); setConceptNavList([])
  }

  const closeRoadmapPanel = () => setSelectedRoadmapId(null)

  const openConcept = (conceptId, navList) => {
    setSelectedConceptId(conceptId)
    setConceptNavList(navList)
  }

  const handleConceptClose = (action, targetId) => {
    if (action === 'prev' || action === 'next') {
      setSelectedConceptId(targetId)
    } else {
      setSelectedConceptId(null); setConceptNavList([])
    }
  }

  const handleEnrollPath = async (e, id) => {
    e.stopPropagation()
    setEnrolling(p => ({ ...p, [id]: true }))
    try {
      await enrollRoadmap(id)
      setAllRoadmaps(rs => rs.map(r => r.id === id ? { ...r, enrolled: true } : r))
      toast.success('⚔️ Path registered!')
    } catch { toast.error('Failed to register') }
    finally { setEnrolling(p => ({ ...p, [id]: false })) }
  }


  const xp             = summary?.xp    ?? user?.xp    ?? 0
  const rank           = getRank(xp)
  const level          = summary?.level ?? user?.level ?? 1
  const stats          = computeStats(summary?.subjectProgress)
  const initials       = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const doneCount      = DAILY_QUESTS.filter(q => quests[q.id]).length
  const earnedXp       = DAILY_QUESTS.filter(q => quests[q.id]).reduce((s, q) => s + q.xp, 0)
  const arenaSubjects  = activeRoadmap?.subjects ?? []
  const completedGates = arenaSubjects.filter(s => s.percentage >= 100).length
  const totalGates     = arenaSubjects.length
  const nextGate       = arenaSubjects.find(s => s.percentage < 100)
  const overallPct     = activeRoadmap?.overallPercentage ?? 0

  const filteredSubjects = subjects.filter(s => {
    const sp = s.totalConcepts > 0 ? Math.round((s.completedCount / s.totalConcepts) * 100) : 0
    if (!s.title.toLowerCase().includes(gateSearch.toLowerCase())) return false
    if (gateFilter === 'Cleared')     return sp === 100
    if (gateFilter === 'Active Hunt') return sp > 0 && sp < 100
    if (gateFilter === 'Not Started') return sp === 0
    return true
  })

  const filteredRoadmaps = allRoadmaps.filter(r =>
    r.title.toLowerCase().includes(pathSearch.toLowerCase()) ||
    (r.roleTarget || '').toLowerCase().includes(pathSearch.toLowerCase())
  )

  const GateCard = ({ s, pOvr }) => {
    const p = pOvr !== undefined ? pOvr : (s.percentage ?? (s.totalConcepts > 0 ? Math.round((s.completedCount / s.totalConcepts) * 100) : 0))
    const gr = subjectGateRank(s)
    const cleared = p >= 100, sealed = p === 0
    return (
      <div className="sl-gate-card" style={{ cursor: s.totalConcepts > 0 ? 'pointer' : 'default', opacity: s.totalConcepts > 0 ? 1 : 0.5 }}
        onClick={() => s.totalConcepts > 0 && openSubjectPanel(s.id)}>
        {/* Top row: title left, rank + about right */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <div className="sl-gate-title" style={{ marginBottom: 0, flex: 1 }}>{s.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
            {quizStatuses[s.id]?.hasPassed && <Trophy size={11} color="#4ADE80" />}
            <span className={`rank-badge ${gr.cls}`} style={{ fontSize: '0.58rem', padding: '0.1rem 0.35rem' }}>{gr.label}</span>
            <button
              onClick={e => { e.stopPropagation(); setAboutGate(s) }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.1rem', display: 'flex', alignItems: 'center', borderRadius: 3, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = gr.color}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              title="About this gate"
            >
              <Info size={18} />
            </button>
          </div>
        </div>
        <div className="sl-gate-meta">{s.totalConcepts > 0 ? `${s.totalConcepts} skills` : 'Coming soon'}</div>
        <div className="sl-gate-bar-track">
          <div className="sl-gate-bar-fill" style={{ width: `${p}%`, background: cleared ? gr.color : `${gr.color}88` }} />
        </div>
        <div className="sl-gate-status" style={{ color: cleared ? gr.color : sealed ? '#0cbd09' : `${gr.color}BB` }}>
          {cleared ? 'GATE CLEARED' : sealed ? 'NEW GATE OPEN' : `IN PROGRESS ${p}%`}
        </div>
      </div>
    )
  }

  const renderMiddle = () => {
    if (activeView === 'arena') {
      const sp = summary?.subjectProgress ?? []
      const inProgress = sp.filter(s => s.percentage > 0 && s.percentage < 100)
      const cleared    = sp.filter(s => s.percentage >= 100)
      const totalConceptsDone = summary?.completedConcepts ?? 0
      const totalConceptsAll  = summary?.totalConcepts ?? 0
      const overallPct = totalConceptsAll > 0 ? Math.round((totalConceptsDone / totalConceptsAll) * 100) : 0
      const streak = summary?.streak ?? 0

      // Active enrolled roadmaps from allRoadmaps (loaded lazily)
      const enrolledPaths = allRoadmaps.filter(r => r.enrolled && !r.paused)
      const activePath    = enrolledPaths[0] ?? null

      // Next gate to tackle: first in-progress, else first sealed
      const nextGateSp = inProgress[0] ?? sp.find(s => s.percentage === 0) ?? null

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>

          {/* ── Hunter overview strip ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem' }}>
            {[
              { label: 'SKILLS CLEARED', value: totalConceptsDone, suffix: `/ ${totalConceptsAll}`, color: '#9B6ED4' },
              { label: 'GATES CLEARED',  value: cleared.length,    suffix: `/ ${sp.length}`,        color: '#4ADE80' },
              { label: 'DAY STREAK',     value: streak,            suffix: streak === 1 ? 'day' : 'days', color: '#F59E0B' },
            ].map(stat => (
              <div key={stat.label} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.625rem 0.75rem', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.25rem', fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginTop: '0.2rem' }}>{stat.suffix}</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginTop: '0.1rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ── Active hunter path ── */}
          {activePath ? (
            <div style={{ background: 'var(--bg-secondary)', border: `1px solid ${activePath.color}33`, borderLeft: `3px solid ${activePath.color}`, borderRadius: 'var(--radius-sm)', padding: '0.75rem 0.875rem', cursor: 'pointer' }}
              onClick={() => { switchView('paths'); openRoadmapPanel(activePath.id) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>{activePath.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{activePath.title}</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: activePath.color, letterSpacing: '0.06em' }}>ACTIVE HUNTER PATH</div>
                </div>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem', fontWeight: 700, color: activePath.color }}>{activePath.overallPercentage ?? 0}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${activePath.overallPercentage ?? 0}%`, background: `linear-gradient(90deg, ${activePath.color}77, ${activePath.color})`, borderRadius: 2, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ) : (
            <div style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => switchView('paths')}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>NO ACTIVE PATH</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.8rem', color: '#9B6ED4', marginTop: '0.25rem', fontWeight: 600 }}>→ Go to Hunter Path to Strt Hunting </div>
            </div>
          )}

          {/* ── In-progress gates ── */}
          {inProgress.length > 0 && (
            <div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>ACTIVE HUNTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {inProgress.map(s => {
                  const gr = RANK_META[s.rank] || RANK_META['E']
                  return (
                    <div key={s.subjectId} onClick={() => openSubjectPanel(s.subjectId)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0.75rem', background: 'var(--bg-secondary)', border: `1px solid rgba(155,110,212,0.18)`, borderLeft: '3px solid #9B6ED4', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'border-color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(155,110,212,0.45)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(155,110,212,0.18)'}>
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{s.title}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.2rem' }}>
                          <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.percentage}%`, background: '#9B6ED4', borderRadius: 2 }} />
                          </div>
                          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', color: '#9B6ED4', fontWeight: 700, flexShrink: 0 }}>{s.percentage}%</span>
                        </div>
                      </div>
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#9B6ED4', background: 'rgba(155,110,212,0.1)', border: '1px solid rgba(155,110,212,0.2)', padding: '0.1rem 0.35rem', borderRadius: 3, flexShrink: 0 }}>HUNT</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Next recommended gate (if nothing in progress) ── */}
          {inProgress.length === 0 && nextGateSp && (
            <div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>RECOMMENDED NEXT GATE</div>
              <div onClick={() => openSubjectPanel(nextGateSp.subjectId)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.875rem', background: 'var(--bg-secondary)', border: '1px solid rgba(74,222,128,0.2)', borderLeft: '3px solid #4ADE80', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.1rem' }}>{nextGateSp.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{nextGateSp.title}</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4ADE80', letterSpacing: '0.06em' }}>{nextGateSp.total} skills · Enter to begin</div>
                </div>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4ADE80' }}>→</span>
              </div>
            </div>
          )}

          {/* ── Cleared gates summary ── */}
          {cleared.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginRight: '0.25rem' }}>CLEARED:</span>
              {cleared.map(s => (
                <span key={s.subjectId} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4ADE80', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', padding: '0.15rem 0.5rem', borderRadius: 3 }}>
                  <CheckCircle size={9} /> {s.title}
                </span>
              ))}
            </div>
          )}

        </div>
      )
    }

    if (activeView === 'gates') {
      return (
        <>
          <div className="sl-panel-title">All Dungeon Gates</div>
          <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
            <Search size={13} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input className="form-input" style={{ paddingLeft: '1.875rem', fontSize: '0.8125rem' }}
              placeholder="Scout gates…" value={gateSearch} onChange={e => setGateSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {GATE_FILTERS.map(f => (
              <button key={f} className={`filter-chip${gateFilter === f ? ' active' : ''}`}
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.05em', padding: '0.2rem 0.5rem' }}
                onClick={() => setGateFilter(f)}>{f}</button>
            ))}
          </div>
          {!gatesLoaded ? (
            <div className="flex-center" style={{ height: '200px' }}><div className="loading-spinner-lg" /></div>
          ) : filteredSubjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.08em' }}>NO GATES MATCH</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
              {filteredSubjects.map((s, i) => <GateCard key={s.id} s={s} />)}
            </div>
          )}
        </>
      )
    }

    if (activeView === 'paths') {
      return (
        <>
          <div className="sl-panel-title">Hunter Paths</div>
          <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
            <Search size={13} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input className="form-input" style={{ paddingLeft: '1.875rem', fontSize: '0.8125rem' }}
              placeholder="Scout paths…" value={pathSearch} onChange={e => setPathSearch(e.target.value)} />
          </div>
          {!pathsLoaded ? (
            <div className="flex-center" style={{ height: '200px' }}><div className="loading-spinner-lg" /></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
              {filteredRoadmaps.map(r => (
                <div key={r.id} className="sl-gate-card"
                  style={{ cursor: 'pointer', borderTop: `3px solid ${r.color}`, outline: selectedRoadmapId === r.id ? `1px solid ${r.color}` : 'none' }}
                  onClick={() => openRoadmapPanel(r.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                    <div style={{ width: 28, height: 28, background: r.color + '22', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{r.icon}</div>
                    <div className="sl-gate-title" style={{ marginBottom: 0, fontSize: '0.875rem' }}>{r.title}</div>
                  </div>
                  <div className="sl-gate-meta">{r.subjectCount ?? '?'} gates · {r.estimatedWeeks}w · {r.roleTarget}</div>
                  
                </div>
              ))}
            </div>
          )}
        </>
      )
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ height: 56, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 1.5rem' }}>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '1.1rem', color: '#B48AE8', letterSpacing: '0.12em' }}>ARISE</span>
      </nav>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loading-spinner-lg" /></div>
    </div>
  )

  return (
    <div className="sl-dashboard-wrapper">
      {/* ══ HUNTER PROFILE DRAWER ══ */}
      {avatarOpen && (
        <HunterProfileDrawer
          user={user}
          rank={rank}
          level={level}
          xp={xp}
          onClose={() => setAvatarOpen(false)}
          onLogout={logout}
        />
      )}

      {/* ══ NAVBAR ══ */}
      <nav className="sl-dash-nav">
        <div className="sl-dash-nav-logo" onClick={() => navigate('/')}>ARISE</div>
        <div className="sl-dash-nav-links">
          {NAV_ITEMS.map(item => (
            <button key={item.label} className={`sl-nav-link${activeView === item.view ? ' active' : ''}`} onClick={() => switchView(item.view)}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="sl-dash-nav-right">
          <div className="sl-nav-xp">
            <span className="sl-nav-xp-label">XP → LVL {level}</span>
            <div className="xp-bar-track" style={{ height: 4, width: 84 }}>
              <div className="xp-bar-fill" style={{ width: `${rank.progress}%`, background: `linear-gradient(90deg, ${rank.color}88, ${rank.color})` }} />
            </div>
          </div>
          <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.72rem', padding: '0.25rem 0.625rem' }}>{rank.label}-RANK</span>
          <div className="sl-nav-avatar" style={{ background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}` }}
            onClick={() => setAvatarOpen(o => !o)}>
            {initials}
          </div>
        </div>
      </nav>

      {/* ══ BODY ══ */}
      <div className="sl-dashboard-body">
        <div className="sl-alert-banner">
          <span className="sl-alert-tag">[ SYSTEM ]</span>
          <span className="sl-alert-msg">
            {selectedConceptId
              ? <>Skill detail loaded — complete the gate trial to master this skill.</>
              : activeView === 'gates'
              ? <>Scout mode active — <strong>{filteredSubjects.length} gates</strong> detected.</>
              : activeView === 'paths'
              ? <>Hunter path registry — <strong>{allRoadmaps.length} paths</strong> available.</>
              : nextGate
              ? <>Active gate: <strong>{nextGate.title}</strong> — {nextGate.totalConcepts - nextGate.completedConcepts} skills remaining.</>
              : <>Welcome, Hunter <strong>{user?.fullName?.split(' ')[0]}</strong>. Choose a dungeon gate to begin.</>}
          </span>
        </div>

        {selectedConceptId ? (
          /* ══ CONCEPT MODE: 2-col (skills | concept), quests hidden ══ */
          <div className="sl-dashboard-grid sl-grid-concept">
            <SubjectPanel
              key={`${selectedSubjectId}-${panelRefreshKey}`}
              mode="grid"
              subjectId={selectedSubjectId}
              onClose={closeSubjectPanel}
              onSkillClick={openConcept}
              selectedConceptId={selectedConceptId}
              navigate={navigate}
            />
            <div className="sl-panel" style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
              <ConceptInlinePanel
                conceptId={selectedConceptId}
                navList={conceptNavList}
                onClose={handleConceptClose}
                navigate={navigate}
              />
            </div>
          </div>
        ) : (
          /* ══ NORMAL MODE: 3-col (status | gates | quests+rank) ══ */
          <div className="sl-dashboard-grid">
            {/* ═ LEFT: STATUS WINDOW ═ */}
            <div className="sl-panel">
              <div className="sl-panel-title">Status Window</div>
              <div className="sl-hunter-level-num">{level}</div>
              <div className="sl-hunter-level-label">HUNTER LEVEL</div>
              <div className="sl-power-xp">POWER: {xp.toLocaleString()} XP</div>
              {stats.map(stat => (
                <div key={stat.key} className="sl-stat-row">
                  <div className="sl-stat-header">
                    <span className="sl-stat-name">{stat.label}</span>
                    <span className="sl-stat-value">{stat.value}</span>
                  </div>
                  <div className="sl-stat-tags">{stat.tags}</div>
                  <div className="sl-stat-track">
                    <div className="sl-stat-fill" style={{ width: `${stat.value}%`, background: `linear-gradient(90deg, ${stat.color}55, ${stat.color})` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* ═ MIDDLE: gate views ═ */}
            <div className="sl-panel" style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
              {renderMiddle()}
            </div>

            {/* ═ RIGHT: DAILY QUESTS + RANK ═ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="sl-panel">
                <div className="sl-panel-title">Daily Quests</div>
                {DAILY_QUESTS.map(q => (
                  <div key={q.id} className="sl-quest-item" onClick={() => toggleQuest(q.id)}>
                    <div className={`sl-quest-check${quests[q.id] ? ' done' : ''}`}>
                      {quests[q.id] && <CheckCircle size={9} color="#9B6ED4" />}
                    </div>
                    <span className={`sl-quest-label${quests[q.id] ? ' done' : ''}`}>{q.label}</span>
                    <span className="sl-quest-xp">+{q.xp} XP</span>
                  </div>
                ))}
                <div className="sl-quest-summary">{doneCount} / {DAILY_QUESTS.length} QUESTS DONE · +{earnedXp} XP</div>
              </div>
              <div className="sl-panel" style={{ flex: 1 }}>
                <div className="sl-panel-title">Rank Progression</div>
                {RANK_LADDER.map((r, i) => {
                  const isCurrent = r.label === `${rank.label}-RANK`
                  const isPast    = xp >= r.min && !isCurrent
                  return (
                    <div key={r.label} className={`sl-rank-item${isCurrent ? ' current' : ''}`}>
                      <div className="sl-rank-item-letter" style={{ background: r.bg, border: `1.5px solid ${r.color}40` }}>
                        <span style={{ color: r.color }}>{r.letter}</span>
                      </div>
                      <div className="sl-rank-item-info">
                        <div className="sl-rank-item-name" style={{ color: isCurrent ? r.color : isPast ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{r.label}</div>
                        <div className="sl-rank-item-xp">{isCurrent ? `${xp.toLocaleString()} / ${RANK_LADDER[i+1]?.min.toLocaleString() ?? '∞'} XP` : `${r.min.toLocaleString()} XP`}</div>
                      </div>
                      {isCurrent && <span className="sl-rank-now">NOW</span>}
                      {isPast    && <CheckCircle size={13} color="#4ADE80" />}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ══ ROADMAP PANEL: right overlay on path card click ══ */}
      {selectedRoadmapId && !selectedSubjectId && !selectedConceptId && (
        <RoadmapPanel
          roadmapId={selectedRoadmapId}
          onClose={closeRoadmapPanel}
          onGateClick={openSubjectPanel}
          navigate={navigate}
        />
      )}

      {/* ══ SUBJECT PANEL: right overlay when gate clicked (closes roadmap panel) ══ */}
      {selectedSubjectId && !selectedConceptId && (
        <SubjectPanel
          key={`${selectedSubjectId}-${panelRefreshKey}`}
          mode="overlay"
          subjectId={selectedSubjectId}
          onClose={closeSubjectPanel}
          onSkillClick={openConcept}
          selectedConceptId={selectedConceptId}
          navigate={navigate}
        />
      )}

      {/* ══ ABOUT GATE MODAL ══ */}
      {aboutGate && (
        <AboutGateModal subject={aboutGate} onClose={() => setAboutGate(null)} />
      )}
    </div>
  )
}
