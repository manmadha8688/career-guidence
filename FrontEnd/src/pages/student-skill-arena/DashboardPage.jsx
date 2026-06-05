import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, LogOut, Search, Brain, Trophy, X, Clock, ChevronLeft, ChevronRight, AlertTriangle, Lock, PlayCircle, Zap, Info, Award, BarChart2, Menu } from 'lucide-react'
import {
  getProgressSummary, getRoadmap, getRoadmapStatus,
  getSubjects, getSubject, getConcept, getQuizStatus,
  getRoadmaps, enrollRoadmap, pauseRoadmap, resumeRoadmap,
  getHunterStats,
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
  { key: 'INT', label: 'INTELLIGENCE', domain: 'Backend',          color: '#9B6ED4', hint: 'Java · Python · Spring · Node', match: t => /java|spring|python|oop|data.struct|mongodb|django|node|backend/.test(t) },
  { key: 'AGI', label: 'AGILITY',      domain: 'Frontend',         color: '#4ADE80', hint: 'HTML · CSS · React · JS',       match: t => /react|javascript|html|css|frontend/.test(t) },
  { key: 'END', label: 'ENDURANCE',    domain: 'Databases & Ops',  color: '#60A5FA', hint: 'SQL · Docker · Git · Deploy',   match: t => /sql|postgres|mysql|docker|git|deploy|database/.test(t) },
  { key: 'PER', label: 'PERCEPTION',   domain: 'Problem Solving',  color: '#F59E0B', hint: 'APIs · Security · Algorithms',  match: t => /security|jwt|rest|api|design|algorithm|boot|express/.test(t) },
]

// Stat rank from 0-100 pct — independent per category
const statRank = (pct) => {
  if (pct >= 95) return { label: 'S', color: '#EF4444' }
  if (pct >= 80) return { label: 'A', color: '#F59E0B' }
  if (pct >= 60) return { label: 'B', color: '#9B6ED4' }
  if (pct >= 40) return { label: 'C', color: '#60A5FA' }
  if (pct >= 20) return { label: 'D', color: '#4ADE80' }
  return              { label: 'E', color: '#888888' }
}

const GATE_FILTERS = ['All GATES', 'ENTERED', 'CLOSED', 'Not ENTERED']

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
    const matched   = sp.filter(s => def.match(s.title.toLowerCase()))
    // Real totals across all matched subjects — works for any level
    const totalDone = matched.reduce((a, s) => a + (s.completedConcepts ?? 0), 0)
    const totalAll  = matched.reduce((a, s) => a + (s.totalConcepts   ?? 0), 0)
    const pct       = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0
    const cleared   = matched.filter(s => (s.percentage ?? 0) >= 100).map(s => s.title)
    const inProgress= matched.filter(s => (s.percentage ?? 0) > 0 && (s.percentage ?? 0) < 100)
    const next      = matched.find(s => (s.percentage ?? 0) === 0)
    const sRank     = statRank(pct)
    return { ...def, pct, totalDone, totalAll, cleared, inProgress, next, sRank }
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
function ConceptInlinePanel({ conceptId, navList, onClose, navigate, startQuiz }) {
  const [concept, setConcept]       = useState(null)
  const [quizStatus, setQuizStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab]         = useState('simple')
  const tipRef      = useRef(null)
  const mistakesRef = useRef(null)
  const quizRef     = useRef(null)

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          
          
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
          <div ref={tipRef} className="concept-tip-box">
            <div className="concept-tip-label">⚡ Hunter Tip</div>
            <p className="concept-tip-text">{concept.tip}</p>
          </div>
        )}

        {/* Common Mistakes */}
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
function RoadmapPanel({ roadmapId, onClose, onGateClick, navigate, startQuiz }) {
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
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>{roadmap.title}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: roadmap.color, letterSpacing: '0.06em' }}>{roadmap.roleTarget}</div>
            </div>
            {/* Pause / Resume beside title */}
            {isEnrolled && (
              <button onClick={isPaused ? handleResume : handlePause} disabled={pausing}
                title={isPaused ? 'Resume Hunt' : 'Pause Hunt'}
                style={{ flexShrink: 0, padding: '0.35rem 0.6rem', background: 'rgba(136,136,136,0.1)', border: '1px solid var(--border)', borderRadius: 6, cursor: pausing ? 'not-allowed' : 'pointer', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {pausing ? <span className="loading-spinner" style={{ width: 12, height: 12 }} /> : isPaused ? '▶' : '⏸'}
              </button>
            )}
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

          {/* Action button */}
          {!isEnrolled ? (
            /* Not enrolled → Begin Hunt */
            <button onClick={handleEnroll} disabled={enrolling}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: `linear-gradient(135deg, ${roadmap.color}CC, ${roadmap.color})`, border: 'none', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em' }}>
              {enrolling ? <span className="loading-spinner" style={{ borderTopColor: '#fff' }} /> : '⚔️'}
              {enrolling ? 'Registering…' : 'Begin Hunt'}
            </button>
          ) : status?.allSubjectsDone ? (
            /* All gates badged → Path Final Test */
            <button onClick={() => startQuiz('roadmap', roadmapId, roadmap?.title ?? 'Path Final Trial', roadmap?.icon)}
              style={{ width: '100%', padding: '0.625rem 0.75rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.08))', border: '1.5px solid rgba(245,158,11,0.5)', borderRadius: 6, cursor: 'pointer', color: '#F59E0B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.08em', textAlign: 'center', boxShadow: '0 0 12px rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Trophy size={15} /> TAKE PATH FINAL TEST
            </button>
          ) : isEnrolled ? (
            /* Enrolled but gates not all done → locked banner */
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', padding: '0.625rem 0.875rem', background: 'rgba(136,136,136,0.06)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6 }}>
              <Lock size={13} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.05em', lineHeight: 1.6 }}>
                PATH FINAL TEST LOCKED · Earn badges for all {subjects.length} gates to unlock
              </span>
            </div>
          ) : null}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>GATES</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Gates list — always visible, but progress hidden when paused/not enrolled */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {subjects.map((s, i) => {
              const p          = showProgress ? (s.percentage ?? 0) : 0
              const hasBadge   = s.hasBadge ?? false
              const allLearned = showProgress && p >= 100
              const gateClosed = allLearned && hasBadge
              const active     = showProgress && p > 0 && !gateClosed
              const borderCol  = gateClosed ? 'rgba(74,222,128,0.2)' : allLearned ? 'rgba(245,158,11,0.3)' : active ? 'rgba(155,110,212,0.2)' : 'var(--border)'
              const accentCol  = gateClosed ? '#4ADE80' : allLearned ? '#F59E0B' : active ? '#9B6ED4' : 'var(--border)'
              return (
                <div key={s.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div
                    onClick={() => isEnrolled && s.totalConcepts > 0 && onGateClick(s.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.5rem 0.625rem',
                      background: 'var(--bg-secondary)',
                      border: `1px solid ${borderCol}`,
                      borderLeft: `3px solid ${accentCol}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: isEnrolled && s.totalConcepts > 0 ? 'pointer' : 'default',
                      opacity: s.totalConcepts > 0 ? 1 : 0.45,
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { if (isEnrolled && s.totalConcepts > 0) e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = borderCol }}
                  >
                    <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', fontWeight: 700, background: gateClosed ? 'rgba(74,222,128,0.15)' : 'var(--bg-tertiary)', border: `1.5px solid ${gateClosed ? '#4ADE8055' : 'var(--border)'}`, color: gateClosed ? '#4ADE80' : 'var(--text-muted)' }}>
                      {gateClosed ? <CheckCircle size={11} color="#4ADE80" /> : s.totalConcepts > 0 ? i + 1 : <Lock size={10} />}
                    </div>
                    <span style={{ fontSize: '0.875rem', flexShrink: 0 }}>{s.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</div>
                      {active && !allLearned ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem' }}>
                          <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${p}%`, background: '#9B6ED4', borderRadius: 2 }} />
                          </div>
                          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', color: '#9B6ED4', fontWeight: 700 }}>{p}%</span>
                        </div>
                      ) : (
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: gateClosed ? '#4ADE80' : allLearned ? '#F59E0B' : 'var(--text-muted)', letterSpacing: '0.03em' }}>
                          {gateClosed ? 'GATE CLOSED' : allLearned ? 'SKILLS LEARNED' : s.totalConcepts > 0 ? `${s.totalConcepts} skills` : 'sealed'}
                        </div>
                      )}
                    </div>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.06em', padding: '0.1rem 0.35rem', borderRadius: 3, flexShrink: 0, background: gateClosed ? 'rgba(74,222,128,0.1)' : allLearned ? 'rgba(245,158,11,0.1)' : active ? 'rgba(155,110,212,0.1)' : 'rgba(136,136,136,0.07)', color: gateClosed ? '#4ADE80' : allLearned ? '#F59E0B' : active ? '#B48AE8' : '#555' }}>
                      {gateClosed ? 'DONE' : allLearned ? 'TEST' : active ? 'HUNT' : 'Enter'}
                    </span>
                  </div>
                  {/* Final test button for this gate — shown inline when skills learned but no badge */}
                  {allLearned && !hasBadge && (
                    <button
                      onClick={e => { e.stopPropagation(); startQuiz('subject', s.id, s.title, s.icon) }}
                      style={{ width: '100%', padding: '0.35rem 0.625rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: '#F59E0B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.08em', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
                    >
                      <Trophy size={11} /> TAKE GATE FINAL TEST →
                    </button>
                  )}
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
function SubjectPanel({ subjectId, onClose, onSkillClick, selectedConceptId, navigate, startQuiz, mode = 'overlay' }) {
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
            quizStatus?.hasBadge ? (
              /* Badge earned — gate closed */
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--radius-sm)' }}>
                <Trophy size={13} color="#4ADE80" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4ADE80', letterSpacing: '0.08em' }}>GATE CLOSED · BADGE EARNED</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)' }}>{quizStatus.badgeScore}/{quizStatus.badgeTotal}</div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }}
                  onClick={() => startQuiz('subject', subjectId, subject?.title ?? 'Gate Assessment', subject?.icon)}>Retry</button>
              </div>
            ) : pct >= 100 ? (
              /* All skills learned — unlock final test */
              <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.08))', border: '1.5px solid rgba(245,158,11,0.45)', borderRadius: 'var(--radius-sm)', padding: '0.625rem', cursor: 'pointer', color: '#F59E0B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.06em', boxShadow: '0 0 16px rgba(245,158,11,0.12)' }}
                onClick={() => startQuiz('subject', subjectId, subject?.title ?? 'Gate Assessment', subject?.icon)}>
                <Trophy size={14} />
                {quizStatus?.badgeScore > 0 ? `Retry Final Test · ${quizStatus.badgeScore}/25` : 'Take Final Test to Close Gate →'}
              </button>
            ) : (
              /* Skills not all cleared — locked */
              <div style={{ display: 'flex', align: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-sm)' }}>
                <Lock size={12} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.06em', lineHeight: 1.5 }}>
                  FINAL TEST LOCKED · Clear all {subject.totalConcepts} skills to unlock
                </div>
              </div>
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
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#9B6ED4' }}>[ HUNTER INSTRUCTIONS ]</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '0.25rem', display: 'flex', borderRadius: 4 }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', flex: 1 }}>

          {/* ── About ── */}
          <div>
            <SectionTitle>ABOUT LEARNTOEARN</SectionTitle>
            <div style={{ padding: '0.875rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
              <p style={{ fontSize: '0.8125rem', color: '#8B9AB8', lineHeight: 1.75, margin: '0 0 0.625rem' }}>
                LearnToEarn is a Solo Leveling–inspired learning platform where you level up your tech skills like a player. Learn concept by concept, earn XP and badges as proof, and follow structured roadmaps to go from beginner to job-ready.
                </p>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: '#64748B', letterSpacing: '0.06em' }}>
                Skills Arena · Resume · AI · Jobs
              </div>
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

          {/* ── How to Earn Badges ── */}
          <div>
            <SectionTitle>HOW TO EARN BADGES</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                {
                  icon: '🏆',
                  color: '#F59E0B',
                  title: 'Gate Badge',
                  steps: [
                    'Enter a Dungeon Gate and clear all skills inside it',
                    'Once all skills are learned, the "Take Final Test" button unlocks',
                    'Pass the gate final test (19/25) to earn the subject badge',
                  ],
                },
                {
                  icon: '🎖️',
                  color: '#9B6ED4',
                  title: 'Hunter Path Badge',
                  steps: [
                    'Enroll in a Hunter Path from the HUNTER PATH tab',
                    'Earn gate badges for every subject in the path',
                    'Once all gates are closed, the Path Final Trial unlocks',
                    'Pass the roadmap final test to earn the path badge',
                  ],
                },
              ].map(b => (
                <div key={b.title} style={{ padding: '0.875rem', background: `${b.color}0A`, border: `1px solid ${b.color}25`, borderRadius: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{b.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: b.color }}>{b.title}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {b.steps.map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.52rem', fontWeight: 800, color: b.color, flexShrink: 0, marginTop: '0.2rem', minWidth: 14 }}>0{i + 1}</span>
                        <span style={{ fontSize: '0.775rem', color: '#8B9AB8', lineHeight: 1.6 }}>{step}</span>
                      </div>
                    ))}
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

          

        </div>

        {/* ── Sticky footer — exit buttons (desktop only) ── */}
        <div className="sl-drawer-exit-footer" style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(155,110,212,0.12)', background: '#090E1C', position: 'sticky', bottom: 0 }}>
          {user?.role === 'GUEST' && (
            <div style={{ marginBottom: '0.75rem', padding: '0.625rem 0.875rem', background: 'rgba(155,110,212,0.08)', border: '1px solid rgba(155,110,212,0.2)', borderRadius: 8, fontSize: '0.75rem', color: '#8B9AB8', lineHeight: 1.6 }}>
              <span style={{ color: '#C4B5FD', fontWeight: 600 }}>Guest session</span> — create a free account to save your XP and progress permanently.
            </div>
          )}
          <button
            onClick={() => { window.location.href = '/' }}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.65rem', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
            ← EXIT ARENA
          </button>
          <button
            onClick={onLogout}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)', color: '#EF4444', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.1em', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.16)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}>
            <LogOut size={13} /> EXIT SYSTEM
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Quiz Instructions Modal ──────────────────────────────
const QUIZ_META = {
  concept: {
    label: 'SKILL TRIAL', color: '#9B6ED4',
    questions: 10, time: null, passNum: 8, reward: 'XP + Daily Bonus', rewardColor: '#9B6ED4',
    rules: [
      'No time limit — read each question at your own pace',
      'Select one answer per question; you can navigate back freely',
      'Score 8 / 10 or above to clear the skill and earn XP',
      'Your first cleared concept of the day earns +50 bonus XP',
      'Failed? A 10-minute cooldown applies before you can retry',
    ],
  },
  subject: {
    label: 'GATE ASSESSMENT', color: '#F59E0B',
    questions: 25, time: '30 min', passNum: 19, reward: 'Subject Badge', rewardColor: '#F59E0B',
    rules: [
      'Questions are drawn randomly from all skills inside this gate',
      'Timer starts when you begin — 30 minutes total',
      'Score 19 / 25 or above to earn the gate badge and close the gate',
      'You can navigate between questions freely before submitting',
      'Failed? A 24-hour cooldown applies before you can retry',
    ],
  },
  roadmap: {
    label: 'PATH FINAL TRIAL', color: '#EF4444',
    questions: 50, time: '90 min', passNum: 35, reward: 'Path Badge', rewardColor: '#4ADE80',
    rules: [
      'Questions span all subjects and all skills across this path',
      'Timer starts when you begin — 90 minutes total',
      'Score 35 / 50 → Interview Ready Badge',
      'Score 42 / 50 → Job Ready Badge (higher tier)',
      'Failed? A 48-hour cooldown applies before you can retry',
    ],
  },
}

function InstructionsModal({ intent, onClose, onConfirm }) {
  const meta = QUIZ_META[intent.type]
  if (!meta) return null

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: '#090E1C', border: `1px solid ${meta.color}33`, borderTop: `3px solid ${meta.color}`, borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: `0 0 60px ${meta.color}20`, animation: 'slideUp 0.2s ease' }}>

        {/* Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${meta.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.14em', color: meta.color }}>[ {meta.label} PROTOCOL ]</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', padding: '0.2rem' }}><X size={15} /></button>
        </div>

        <div style={{ padding: '1.375rem 1.5rem' }}>

          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.375rem' }}>
            {intent.icon && <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{intent.icon}</span>}
            <div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '1.175rem', color: '#E2E8F0', lineHeight: 1.2 }}>{intent.title}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: meta.color, letterSpacing: '0.08em', marginTop: '0.2rem' }}>{meta.label}</div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem', marginBottom: '1.375rem' }}>
            {[
              { label: 'QUESTIONS', value: meta.questions, color: '#60A5FA', big: true },
              { label: 'TIME LIMIT', value: meta.time ?? 'NONE', color: '#F59E0B', big: true },
              { label: 'PASS MARK', value: `${meta.passNum}/${meta.questions}`, color: meta.color, big: true },
              { label: 'REWARD', value: meta.reward, color: meta.rewardColor, big: false },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '0.75rem 0.375rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                <div style={{ fontFamily: s.big ? "'Orbitron', sans-serif" : "'Rajdhani', sans-serif", fontSize: s.big ? '1.1rem' : '0.72rem', fontWeight: 800, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#64748B', letterSpacing: '0.07em', marginTop: '0.3rem' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10 }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', color: '#64748B', marginBottom: '0.75rem' }}>[ TRIAL RULES ]</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {meta.rules.map((rule, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.5rem', fontWeight: 800, color: meta.color, flexShrink: 0, marginTop: '0.28rem', minWidth: 16 }}>0{i + 1}</span>
                  <span style={{ fontSize: '0.8rem', color: '#8B9AB8', lineHeight: 1.65 }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={onClose}
              style={{ flex: '0 0 100px', padding: '0.75rem', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.06em', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#8B9AB8' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' }}>
              CANCEL
            </button>
            <button onClick={onConfirm}
              style={{ flex: 1, padding: '0.875rem', borderRadius: 8, background: `linear-gradient(135deg, ${meta.color}BB, ${meta.color})`, border: 'none', color: intent.type === 'subject' ? '#1A0F00' : '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '1rem', letterSpacing: '0.08em', cursor: 'pointer', boxShadow: `0 0 24px ${meta.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 40px ${meta.color}60`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 24px ${meta.color}40`}>
              ⚔ BEGIN {meta.label}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Mobile: Avatar action sheet ──────────────────────────
function MobileAvatarMenu({ rank, user, initials, level, xp, onClose, onStatsOpen, onQuestsOpen, onProfileOpen, onLogout }) {
  const xpToNext = rank.next ? rank.next - xp : null
  const MENU_ITEMS = [
    { icon: '⚡', label: 'Stats & Badges',  color: '#9B6ED4', onClick: onStatsOpen },
    { icon: '📋', label: 'Daily Quests',    color: '#4ADE80', onClick: onQuestsOpen },
    { icon: '📖', label: 'Instructions',    color: '#60A5FA', onClick: onProfileOpen },
  ]
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 310, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }} />
      <div style={{ position: 'fixed', top: 62, right: 12, zIndex: 311, width: 260, background: '#0D1322', border: '1px solid rgba(155,110,212,0.3)', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.7)', overflow: 'hidden', animation: 'slideUp 0.15s ease' }}>

        {/* Hunter card header */}
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(155,110,212,0.14)', background: 'rgba(155,110,212,0.07)' }}>
          {/* Row: avatar + name | rank on far right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: user?.avatarColor || '#9B6ED4', border: `2.5px solid ${rank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: `0 0 12px ${rank.color}44` }}>{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#E2E8F0' }}>{user?.fullName}</div>
              {user?.role === 'GUEST' && <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#64748B', background: 'rgba(100,116,139,0.15)', padding: '0.1rem 0.4rem', borderRadius: 3, border: '1px solid rgba(100,116,139,0.2)' }}>GUEST</span>}
            </div>
            {/* Rank badge on the RIGHT */}
            <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.62rem', flexShrink: 0 }}>{rank.label}-RANK</span>
          </div>
          {/* XP bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color: '#F59E0B' }}>POWER: {xp.toLocaleString()} XP</span>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color: '#64748B' }}>LVL {level}</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${rank.progress}%`, background: `linear-gradient(90deg, ${rank.color}80, ${rank.color})`, borderRadius: 3, transition: 'width 1s ease' }} />
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#64748B', marginTop: '0.3rem' }}>
            {xpToNext != null ? `${xpToNext.toLocaleString()} XP to next rank` : 'MAX RANK — S CLASS ACHIEVED'}
          </div>
        </div>

        {/* Action buttons */}
        {MENU_ITEMS.map((item, i) => (
          <button key={item.label} onClick={() => { onClose(); item.onClick() }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', width: '100%', padding: '0.875rem 1rem', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.12s' }}
            onMouseEnter={e => e.currentTarget.style.background = `${item.color}12`}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ fontSize: '1.15rem', width: 26, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9375rem', color: item.color, letterSpacing: '0.02em' }}>{item.label}</span>
          </button>
        ))}

        {/* Exit buttons */}
        {user?.role === 'GUEST' && (
          <div style={{ padding: '0.625rem 1rem', background: 'rgba(155,110,212,0.06)', borderTop: '1px solid rgba(155,110,212,0.12)', fontSize: '0.72rem', color: '#8B9AB8', lineHeight: 1.5 }}>
            <span style={{ color: '#C4B5FD', fontWeight: 600 }}>Guest session</span> — register to save XP permanently.
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => { window.location.href = '/' }}
            style={{ flex: 1, padding: '0.55rem', borderRadius: 7, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.08em', cursor: 'pointer' }}>
            ← Exit Arena
          </button>
          <button onClick={() => { onClose(); onLogout() }}
            style={{ flex: 1, padding: '0.55rem', borderRadius: 7, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.08em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
            <LogOut size={11} /> Exit System
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Mobile: Stats & Badges combined popup ────────────────
function MobileStatsPopup({ user, rank, level, xp, stats, hunterStats, onClose }) {
  const xpToNext = rank.next ? rank.next - xp : null
  const allBadges = hunterStats ? [...(hunterStats.badges || []), ...(hunterStats.roadmapBadges || [])] : []
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 320, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 321, maxHeight: '82vh', background: '#090E1C', borderTop: '2px solid rgba(155,110,212,0.4)', borderRadius: '20px 20px 0 0', boxShadow: '0 -8px 48px rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.22s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(155,110,212,0.12)', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#9B6ED4' }}>[ STATUS WINDOW ]</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }}><X size={16} /></button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Level + XP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', background: 'rgba(155,110,212,0.07)', border: '1px solid rgba(155,110,212,0.18)', borderRadius: 12 }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', fontWeight: 900, color: '#B48AE8', lineHeight: 1 }}>{level}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.14em', marginTop: 2 }}>HUNTER LEVEL</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: '#F59E0B' }}>{xp.toLocaleString()} XP</span>
                <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.6rem' }}>{rank.label}</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${rank.progress}%`, background: `linear-gradient(90deg, ${rank.color}80, ${rank.color})`, borderRadius: 3, transition: 'width 1s ease' }} />
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#64748B', marginTop: 4 }}>
                {xpToNext != null ? `${xpToNext.toLocaleString()} XP to next rank` : 'MAX RANK ACHIEVED'}
              </div>
            </div>
          </div>
          {/* Stat bars */}
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textAlign: 'center' }}>— COMBAT STATS —</div>
          {stats.map(stat => {
            const isUntouched = stat.totalAll === 0
            return (
              <div key={stat.key} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '0.625rem 0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: stat.color }}>{stat.key}</span>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#64748B', marginLeft: '0.4rem' }}>{stat.label}</span>
                  </div>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.68rem', fontWeight: 700, color: stat.color }}>{isUntouched ? '0%' : `${stat.pct}%`}</span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${isUntouched ? 0 : stat.pct}%`, background: `linear-gradient(90deg, ${stat.color}50, ${stat.color})`, borderRadius: 3, transition: 'width 1.2s ease' }} />
                </div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.54rem', color: '#404860', marginTop: 4 }}>{stat.totalDone}/{stat.totalAll} skills · {stat.domain}</div>
              </div>
            )
          })}

          {/* Badges section */}
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>— BADGES —</div>
          {allBadges.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: '#404860', letterSpacing: '0.08em' }}>
              🔒 NO BADGES YET
            </div>
          ) : allBadges.map(b => {
            const key = b.subjectId ?? b.roadmapId
            const scorePct = b.total > 0 ? Math.round((b.score / b.total) * 100) : 0
            const isRoadmap = b.type === 'ROADMAP'
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.875rem', background: `${b.color || '#9B6ED4'}0D`, border: `1px solid ${b.color || '#9B6ED4'}28`, borderRadius: 8 }}>
                <div style={{ fontSize: '1.25rem', flexShrink: 0 }}>{b.icon || (isRoadmap ? '🗺️' : '📚')}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.825rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginTop: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${scorePct}%`, background: b.color || '#9B6ED4', borderRadius: 2 }} />
                  </div>
                </div>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: b.color || '#9B6ED4', flexShrink: 0 }}>{b.score}/{b.total}</span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

// ─── Mobile: Daily Quests popup ───────────────────────────
function MobileQuestsPopup({ quests, doneCount, earnedXp, onClose }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 320, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 321, background: '#090E1C', borderTop: '2px solid rgba(74,222,128,0.4)', borderRadius: '20px 20px 0 0', boxShadow: '0 -8px 48px rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.22s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(74,222,128,0.12)', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#4ADE80' }}>[ DAILY QUESTS ]</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }}><X size={16} /></button>
        </div>
        <div style={{ padding: '1rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {DAILY_QUESTS.map(q => (
            <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', background: quests[q.id] ? 'rgba(74,222,128,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${quests[q.id] ? 'rgba(74,222,128,0.22)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 10 }}>
              <div style={{ width: 22, height: 22, border: `2px solid ${quests[q.id] ? '#4ADE80' : 'var(--border-hover)'}`, borderRadius: 5, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: quests[q.id] ? 'rgba(74,222,128,0.15)' : 'transparent' }}>
                {quests[q.id] && <CheckCircle size={12} color="#4ADE80" />}
              </div>
              <span style={{ flex: 1, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.9375rem', color: quests[q.id] ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: quests[q.id] ? 'line-through' : 'none' }}>{q.label}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', color: quests[q.id] ? '#4ADE80' : '#F59E0B', fontWeight: 700 }}>+{q.xp} XP</span>
            </div>
          ))}
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.25rem', letterSpacing: '0.08em' }}>
            {doneCount}/{DAILY_QUESTS.length} completed · +{earnedXp} XP earned today
          </div>
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
  const [aboutGate, setAboutGate]           = useState(null)
  const [hunterStats, setHunterStats]       = useState(null)
  const [avatarOpen, setAvatarOpen]         = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAvatarMenu, setMobileAvatarMenu] = useState(false)
  const [mobilePopup, setMobilePopup]       = useState(null) // 'status' | 'badges' | null
  const [quizIntent, setQuizIntent]         = useState(null)

  const handleAvatarClick = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setMobileAvatarMenu(o => !o)
    } else {
      setAvatarOpen(o => !o)
    }
  }

  const startQuiz = (type, refId, title, icon) =>
    setQuizIntent({ type, refId, title, icon: icon ?? null })
  const confirmQuiz = () => {
    if (!quizIntent) return
    navigate(`/skill-arena/quiz/${quizIntent.type}/${quizIntent.refId}`)
    setQuizIntent(null)
  }
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
    getHunterStats().then(r => setHunterStats(r.data)).catch(() => {})
  }, []) // eslint-disable-line

  // Re-fetch everything when a concept is cleared (dispatched from QuizResultPage)
  useEffect(() => {
    const refresh = () => {
      getProgressSummary().then(s => {
        setSummary(s.data)
        syncQuestsFromSummary(s.data, user?.id)
      }).catch(() => {})
      getHunterStats().then(r => setHunterStats(r.data)).catch(() => {})
      setPanelRefreshKey(k => k + 1)
      // Reload gate cards + badge statuses directly (bypasses gatesLoaded guard)
      getSubjects().then(r => {
        setSubjects(r.data)
        setGatesLoaded(true)
        r.data.forEach(s => {
          getQuizStatus('subject', s.id)
            .then(qs => setQuizStatuses(prev => ({ ...prev, [s.id]: qs.data })))
            .catch(() => {})
        })
      }).catch(() => {})
      // Reload roadmap cards with fresh allSubjectsDone
      getRoadmaps().then(r => { setAllRoadmaps(r.data); setPathsLoaded(true) }).catch(() => {})
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
  const completedGates = arenaSubjects.filter(s => s.hasBadge).length
  const totalGates     = arenaSubjects.length
  const nextGate       = arenaSubjects.find(s => !s.hasBadge)
  const overallPct     = activeRoadmap?.overallPercentage ?? 0

  const filteredSubjects = subjects.filter(s => {
    const sp = s.totalConcepts > 0 ? Math.round((s.completedCount / s.totalConcepts) * 100) : 0
    if (!s.title.toLowerCase().includes(gateSearch.toLowerCase())) return false
    if (gateFilter === 'Cleared')     return quizStatuses[s.id]?.hasBadge ?? false
    if (gateFilter === 'Active Hunt') return sp > 0 && !(quizStatuses[s.id]?.hasBadge)
    if (gateFilter === 'Not Started') return sp === 0
    return true
  })

  const filteredRoadmaps = allRoadmaps.filter(r =>
    r.title.toLowerCase().includes(pathSearch.toLowerCase()) ||
    (r.roleTarget || '').toLowerCase().includes(pathSearch.toLowerCase())
  )

  const GateCard = ({ s, pOvr }) => {
    const p = pOvr !== undefined ? pOvr : (s.percentage ?? (s.totalConcepts > 0 ? Math.round((s.completedCount / s.totalConcepts) * 100) : 0))
    const gr        = subjectGateRank(s)
    const allLearned = p >= 100
    const hasBadge  = s.hasBadge ?? quizStatuses[s.id]?.hasBadge ?? false
    const gateClosed = allLearned && hasBadge
    const sealed    = p === 0
    return (
      <div className="sl-gate-card" style={{ cursor: s.totalConcepts > 0 ? 'pointer' : 'default', opacity: s.totalConcepts > 0 ? 1 : 0.5 }}
        onClick={() => s.totalConcepts > 0 && openSubjectPanel(s.id)}>
        {/* Top row: title left, rank + about right */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <div className="sl-gate-title" style={{ marginBottom: 0, flex: 1 }}>{s.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
            {gateClosed && <Trophy size={11} color="#4ADE80" />}
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
        {!allLearned && (
          <div className="sl-gate-bar-track">
            <div className="sl-gate-bar-fill" style={{ width: `${p}%`, background: gateClosed ? gr.color : `${gr.color}88` }} />
          </div>
        )}
        {gateClosed ? (
          <div className="sl-gate-status" style={{ color: gr.color }}>GATE CLOSED SUCCESSFULLY</div>
        ) : allLearned ? (
          <button
            onClick={e => { e.stopPropagation(); startQuiz('subject', s.id, s.title, s.icon) }}
            style={{ width: '100%', marginTop: '0.25rem', padding: '0.5rem 0.75rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.08))', border: '1.5px solid rgba(245,158,11,0.5)', borderRadius: 6, cursor: 'pointer', color: '#F59E0B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textAlign: 'center', boxShadow: '0 0 12px rgba(245,158,11,0.15)' }}
          >
            ⚔ TAKE FINAL TEST
          </button>
        ) : (
          <div className="sl-gate-status" style={{ color: sealed ? '#0cbd09' : `${gr.color}BB` }}>
            {sealed ? 'NEW GATE ACTIVATED' : `IN PROGRESS ${p}%`}
          </div>
        )}
      </div>
    )
  }

  const renderMiddle = () => {
    if (activeView === 'arena') {
      const sp = summary?.subjectProgress ?? []
      const cleared    = sp.filter(s => s.hasBadge)
      const inProgress = sp.filter(s => s.percentage > 0 && !s.hasBadge)
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
              { label: 'SKILLS LEARNED', value: totalConceptsDone, suffix: `/ ${totalConceptsAll}`, color: '#9B6ED4' },
              { label: 'GATES CLOSED',  value: cleared.length,    suffix: `/ ${sp.length}`,        color: '#4ADE80' },
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
                  const allLearned = s.percentage >= 100
                  const borderCol  = allLearned ? 'rgba(245,158,11,0.3)' : 'rgba(155,110,212,0.18)'
                  const accentCol  = allLearned ? '#F59E0B' : '#9B6ED4'
                  return (
                    <div key={s.subjectId} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <div onClick={() => openSubjectPanel(s.subjectId)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0.75rem', background: 'var(--bg-secondary)', border: `1px solid ${borderCol}`, borderLeft: `3px solid ${accentCol}`, borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'border-color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = allLearned ? 'rgba(245,158,11,0.5)' : 'rgba(155,110,212,0.45)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = borderCol}>
                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{s.title}</div>
                          {allLearned ? (
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#F59E0B', letterSpacing: '0.04em', marginTop: '0.15rem' }}>SKILLS LEARNED</div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.2rem' }}>
                              <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${s.percentage}%`, background: '#9B6ED4', borderRadius: 2 }} />
                              </div>
                              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', color: '#9B6ED4', fontWeight: 700, flexShrink: 0 }}>{s.percentage}%</span>
                            </div>
                          )}
                        </div>
                        {allLearned ? (
                          <button
                            onClick={e => { e.stopPropagation(); startQuiz('subject', s.subjectId, s.title, s.icon) }}
                            style={{ padding: '0.25rem 0.6rem', background: 'rgba(245,158,11,0.12)', border: '1.5px solid rgba(245,158,11,0.45)', borderRadius: 5, cursor: 'pointer', color: '#F59E0B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                          >
                            <Trophy size={10} /> TAKE FINAL TEST
                          </button>
                        ) : (
                          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#9B6ED4', background: 'rgba(155,110,212,0.1)', border: '1px solid rgba(155,110,212,0.2)', padding: '0.1rem 0.35rem', borderRadius: 3, flexShrink: 0 }}>
                            HUNT
                          </span>
                        )}
                      </div>
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
            <div className="sl-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
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
            <div className="sl-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
              {filteredRoadmaps.map(r => (
                <div key={r.id} className="sl-gate-card"
                  style={{ cursor: 'pointer', borderTop: `3px solid ${r.color}`, outline: selectedRoadmapId === r.id ? `1px solid ${r.color}` : 'none' }}
                  onClick={() => openRoadmapPanel(r.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                    <div style={{ width: 28, height: 28, background: r.color + '22', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{r.icon}</div>
                    <div className="sl-gate-title" style={{ marginBottom: 0, fontSize: '0.875rem' }}>{r.title}</div>
                  </div>
                  <div className="sl-gate-meta">{r.subjectCount ?? '?'} gates · {r.estimatedWeeks}w · {r.roleTarget}</div>
                  {r.allSubjectsDone && (
                    <button
                      onClick={e => { e.stopPropagation(); startQuiz('roadmap', r.id, r.title, r.icon) }}
                      style={{ width: '100%', marginTop: '0.375rem', padding: '0.45rem 0.75rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.08))', border: '1.5px solid rgba(245,158,11,0.5)', borderRadius: 6, cursor: 'pointer', color: '#F59E0B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
                    >
                      <Trophy size={12} /> TAKE PATH FINAL TEST
                    </button>
                  )}
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
      {/* ══ QUIZ INSTRUCTIONS MODAL ══ */}
      {quizIntent && (
        <InstructionsModal
          intent={quizIntent}
          onClose={() => setQuizIntent(null)}
          onConfirm={confirmQuiz}
        />
      )}

      {/* ══ HUNTER PROFILE DRAWER (desktop + mobile Hunter Profile button) ══ */}
      {avatarOpen && (
        <HunterProfileDrawer user={user} rank={rank} level={level} xp={xp}
          onClose={() => setAvatarOpen(false)} onLogout={logout} />
      )}

      {/* ══ MOBILE: avatar action sheet ══ */}
      {mobileAvatarMenu && (
        <MobileAvatarMenu
          rank={rank} user={user} initials={initials} level={level} xp={xp}
          onClose={() => setMobileAvatarMenu(false)}
          onStatsOpen={() => setMobilePopup('stats')}
          onQuestsOpen={() => setMobilePopup('quests')}
          onProfileOpen={() => setAvatarOpen(true)}
          onLogout={logout}
        />
      )}

      {/* ══ MOBILE: Stats & Badges popup ══ */}
      {mobilePopup === 'stats' && (
        <MobileStatsPopup user={user} rank={rank} level={level} xp={xp} stats={stats} hunterStats={hunterStats}
          onClose={() => setMobilePopup(null)} />
      )}

      {/* ══ MOBILE: Daily Quests popup ══ */}
      {mobilePopup === 'quests' && (
        <MobileQuestsPopup quests={quests} doneCount={doneCount} earnedXp={earnedXp}
          onClose={() => setMobilePopup(null)} />
      )}

      {/* ══ NAVBAR ══ */}
      <nav className="sl-dash-nav">

        {/* Mobile: hamburger on LEFT */}
        <button className="sl-mob-menu-btn"
          onClick={() => setMobileMenuOpen(o => !o)}
          style={{ background: mobileMenuOpen ? 'rgba(155,110,212,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${mobileMenuOpen ? 'rgba(155,110,212,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 8, color: mobileMenuOpen ? '#B48AE8' : 'var(--text-secondary)', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}>
          <Menu size={18} />
        </button>

        {/* Desktop: ARISE logo */}
        <div className="sl-dash-nav-logo" onClick={() => navigate('/')}>ARISE</div>

        {/* Mobile: current section name (center) */}
        <div className="sl-mob-section-title">
          {NAV_ITEMS.find(i => i.view === activeView)?.label || 'ARISE'}
        </div>

        {/* Desktop nav links */}
        <div className="sl-dash-nav-links">
          {NAV_ITEMS.map(item => (
            <button key={item.label} className={`sl-nav-link${activeView === item.view ? ' active' : ''}`}
              onClick={() => switchView(item.view)}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop right */}
        <div className="sl-dash-nav-right">
          <div className="sl-nav-xp">
            <span className="sl-nav-xp-label">XP → LVL {level}</span>
            <div className="xp-bar-track" style={{ height: 4, width: 84 }}>
              <div className="xp-bar-fill" style={{ width: `${rank.progress}%`, background: `linear-gradient(90deg, ${rank.color}88, ${rank.color})` }} />
            </div>
          </div>
          <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.72rem', padding: '0.25rem 0.625rem' }}>{rank.label}-RANK</span>
          <div className="sl-nav-avatar" style={{ background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}` }}
            onClick={handleAvatarClick}>{initials}</div>
        </div>

        {/* Mobile: avatar on RIGHT */}
        <div className="sl-mob-avatar" style={{ background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}` }}
          onClick={handleAvatarClick}>{initials}</div>
      </nav>

      {/* ══ MOBILE NAV DROPDOWN (slides down from LEFT-anchored hamburger) ══ */}
      {mobileMenuOpen && (
        <>
          <div onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'fixed', top: 56, left: 0, width: 260, bottom: 0, zIndex: 151, background: '#0D1322', borderRight: '1px solid rgba(155,110,212,0.3)', boxShadow: '8px 0 32px rgba(0,0,0,0.6)', animation: 'slideIn 0.2s ease', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0.875rem 1.25rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.14em', color: '#9B6ED4', borderBottom: '1px solid rgba(155,110,212,0.12)', background: 'rgba(155,110,212,0.05)' }}>
              [ SELECT SECTION ]
            </div>
            {NAV_ITEMS.map(item => (
              <button key={item.label}
                onClick={() => { switchView(item.view); setMobileMenuOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', width: '100%', padding: '1.125rem 1.25rem', background: activeView === item.view ? 'rgba(155,110,212,0.1)' : 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)', borderLeft: activeView === item.view ? '3px solid #9B6ED4' : '3px solid transparent', color: activeView === item.view ? '#B48AE8' : 'var(--text-secondary)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1.0625rem', letterSpacing: '0.08em', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s', textTransform: 'uppercase' }}>
                <span style={{ fontSize: '1.25rem', width: 24, textAlign: 'center', flexShrink: 0 }}>
                  {item.view === 'arena' ? '⚔️' : item.view === 'gates' ? '🚪' : '🗺️'}
                </span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {activeView === item.view && (
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#9B6ED4', background: 'rgba(155,110,212,0.12)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>NOW</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ══ BODY ══ */}
      <div className="sl-dashboard-body">
        <div className="sl-alert-banner">
          <span className="sl-alert-tag">[ SYSTEM ]</span>
          <span className="sl-alert-msg">
            {selectedConceptId
              ? <>Skill detail loaded — complete the Skill trial to master this skill.</>
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
              startQuiz={startQuiz}
            />
            <div className="sl-panel" style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
              <ConceptInlinePanel
                conceptId={selectedConceptId}
                navList={conceptNavList}
                onClose={handleConceptClose}
                navigate={navigate}
                startQuiz={startQuiz}
              />
            </div>
          </div>
        ) : (
          /* ══ NORMAL MODE: 3-col (status | gates | quests+rank) ══ */
          <div className="sl-dashboard-grid">
            {/* ═ LEFT: STATUS WINDOW — hidden on mobile (access via avatar) ═ */}
            <div className="sl-panel sl-dash-left-panel">
              <div className="sl-panel-title">Status Window</div>
              <div className="sl-hunter-level-num">{level}</div>
              <div className="sl-hunter-level-label">HUNTER LEVEL</div>
              <div className="sl-power-xp">POWER: {xp.toLocaleString()} XP</div>

              {stats.map(stat => {
                const isUntouched = stat.totalAll === 0
                return (
                  <div key={stat.key} className="sl-stat-row">
                    {/* Header row: name + rank badge + pct */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                      <span className="sl-stat-name">{stat.label}</span>
                      {!isUntouched && (
                        <span className="sl-stat-value" style={{ color: stat.color }}>{stat.pct}%</span>
                      )}
                    </div>

                    {/* Dynamic subject tags — cleared ones highlighted */}
                    <div className="sl-stat-tags" style={{ lineHeight: 1.5 }}>
                      {isUntouched ? (
                        <span style={{ color: '#404860', fontSize: '0.68rem' }}>{stat.hint}</span>
                      ) : stat.cleared.length > 0 ? (
                        <span style={{ color: stat.color, opacity: 0.85 }}>{stat.cleared.slice(0, 2).join(' · ')}{stat.cleared.length > 2 ? ` +${stat.cleared.length - 2}` : ''}</span>
                      ) : stat.inProgress.length > 0 ? (
                        <span style={{ color: '#8B9AB8' }}>{stat.inProgress[0].title}</span>
                      ) : (
                        <span style={{ color: '#404860' }}>{stat.hint}</span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="sl-stat-track" style={{ marginBottom: isUntouched ? 0 : '0.2rem' }}>
                      <div className="sl-stat-fill" style={{
                        width: `${isUntouched ? 0 : stat.pct}%`,
                        background: `linear-gradient(90deg, ${stat.color}50, ${stat.color})`,
                        boxShadow: stat.pct > 0 ? `0 0 6px ${stat.color}55` : 'none',
                      }} />
                    </div>

                    {/* Concepts count + next gate nudge */}
                    {!isUntouched && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.56rem', color: '#404860', letterSpacing: '0.04em' }}>
                          {stat.totalDone}/{stat.totalAll} skills
                        </span>
                        {stat.next && stat.pct < 100 && (
                          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.54rem', color: stat.color, opacity: 0.7, letterSpacing: '0.04em', cursor: 'pointer' }}
                            onClick={() => { switchView('gates') }}>
                            → {stat.next.title.split(' ')[0]}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* ── Subject Badges ── */}
              <div style={{ marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.625rem' }}>
                  — BADGES —
                </div>
                {!hunterStats ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem' }}><div className="loading-spinner" style={{ width: 14, height: 14 }} /></div>
                ) : (hunterStats.badges.length === 0 && (hunterStats.roadmapBadges ?? []).length === 0) ? (
                  <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                    <div style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>🔒</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#30384A', letterSpacing: '0.06em' }}>NO BADGES YET</div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {[...hunterStats.badges, ...(hunterStats.roadmapBadges ?? [])].map(b => {
                      const key = b.subjectId ?? b.roadmapId
                      const scorePct = b.total > 0 ? Math.round((b.score / b.total) * 100) : 0
                      const isRoadmap = b.type === 'ROADMAP'
                      const badgeLabel = isRoadmap
                        ? (b.badge === 'JOB_READY' ? 'JOB READY' : 'INTERVIEW READY')
                        : null
                      return (
                        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.5rem', background: `${b.color || '#9B6ED4'}0D`, border: `1px solid ${b.color || '#9B6ED4'}25`, borderRadius: 7 }}>
                          <div style={{ fontSize: '0.95rem', flexShrink: 0 }}>{b.icon || (isRoadmap ? '🗺️' : '📚')}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.72rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.title}</div>
                            {isRoadmap ? (
                              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.54rem', color: b.badge === 'JOB_READY' ? '#F59E0B' : '#60A5FA', letterSpacing: '0.04em', marginTop: '0.15rem' }}>{badgeLabel}</div>
                            ) : (
                              <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginTop: '0.2rem', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${scorePct}%`, background: b.color || '#9B6ED4', borderRadius: 2 }} />
                              </div>
                            )}
                          </div>
                          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: b.color || '#9B6ED4', flexShrink: 0 }}>{b.score}/{b.total}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ═ MIDDLE: gate views ═ */}
            <div className="sl-panel" style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
              {renderMiddle()}
            </div>

            {/* ═ RIGHT: DAILY QUESTS + RANK — hidden on mobile (access via avatar) ═ */}
            <div className="sl-dash-right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
          startQuiz={startQuiz}
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
          startQuiz={startQuiz}
        />
      )}

      {/* ══ ABOUT GATE MODAL ══ */}
      {aboutGate && (
        <AboutGateModal subject={aboutGate} onClose={() => setAboutGate(null)} />
      )}
    </div>
  )
}
