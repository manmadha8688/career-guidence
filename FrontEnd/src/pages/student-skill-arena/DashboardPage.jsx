import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, LogOut, Search, Brain, Trophy, X, Clock, ChevronLeft, ChevronRight, AlertTriangle, Lock, PlayCircle, Zap } from 'lucide-react'
import {
  getProgressSummary, getRoadmap, getRoadmapStatus,
  getSubjects, getSubject, getConcept, getQuizStatus, completeConcept,
  getRoadmaps, enrollRoadmap,
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
  { id: 'q3', label: 'Pass a quiz 8/10',      xp: 100 },
  { id: 'q4', label: 'Clear next gate skill', xp: 80 },
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

const loadQuestState = () => {
  try {
    const s = localStorage.getItem('sl_quests')
    if (!s) return {}
    const { date, state } = JSON.parse(s)
    if (date !== new Date().toDateString()) return {}
    return state
  } catch { return {} }
}
const saveQuestState = (state) =>
  localStorage.setItem('sl_quests', JSON.stringify({ date: new Date().toDateString(), state }))

// ─── Concept Inline Panel ─────────────────────────────────
function ConceptInlinePanel({ conceptId, navList, onClose, navigate }) {
  const [concept, setConcept]       = useState(null)
  const [quizStatus, setQuizStatus] = useState(null)
  const [loading, setLoading]       = useState(true)
  const [tab, setTab]               = useState('simple')
  const [marking, setMarking]       = useState(false)

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

  const handleMarkDone = async () => {
    if (!concept || concept.completed) return
    setMarking(true)
    try {
      await completeConcept(concept.id)
      setConcept(c => ({ ...c, completed: true }))
      toast.success('⚔️ Skill cleared!')
    } catch { toast.error('Failed to clear skill') }
    finally { setMarking(false) }
  }

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

        {/* Quiz / Mark Done */}
        <div style={{ marginTop: '0.25rem' }}>
          {isMastered ? (
            <div style={{ border: '1.5px solid #4ADE8055', borderRadius: 'var(--radius-md)', padding: '1rem', background: 'rgba(74,222,128,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
                <Trophy size={18} color="#4ADE80" />
                <div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: '#4ADE80', fontSize: '0.9rem' }}>Skill Mastered!</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: '#4ADE80', opacity: 0.7 }}>
                    {quizStatus.bestScore}/{quizStatus.bestTotal} · {quizStatus.attemptCount} attempt{quizStatus.attemptCount !== 1 ? 's' : ''}
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto', fontSize: '0.72rem' }}
                  onClick={() => navigate(`/skill-arena/quiz/concept/${conceptId}`)}>Retry</button>
              </div>
              {concept.completed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ADE80', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                  <CheckCircle size={14} /> SKILL CLEARED
                </div>
              ) : (
                <button className="btn w-full" onClick={handleMarkDone} disabled={marking}
                  style={{ justifyContent: 'center', background: 'rgba(74,222,128,0.12)', color: '#4ADE80', border: '1.5px solid #4ADE8055', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.06em' }}>
                  {marking ? <span className="loading-spinner" /> : '⚔️'}
                  {marking ? 'Saving…' : 'Clear This Skill'}
                </button>
              )}
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
      setRoadmap(r => ({ ...r, enrolled: true }))
      toast.success('⚔️ Path registered!')
    } catch { toast.error('Failed to register') }
    finally { setEnrolling(false) }
  }

  const subjectRankColor = (s) => {
    const map = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#4ADE80', E: '#888888' }
    return map[s?.rank] || '#888888'
  }

  const pct      = roadmap?.overallPercentage ?? 0
  const subjects = roadmap?.subjects ?? []

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

          {/* Progress */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
              <span>{roadmap.completedSubjects ?? 0}/{roadmap.totalSubjects ?? subjects.length} gates cleared</span>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem', color: roadmap.color, fontWeight: 700 }}>{pct}%</span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${roadmap.color}88, ${roadmap.color})`, borderRadius: 3, transition: 'width 0.8s ease' }} />
            </div>
          </div>

          {/* Enroll / path trial button */}
          {!roadmap.enrolled ? (
            <button
              onClick={handleEnroll} disabled={enrolling}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: `linear-gradient(135deg, ${roadmap.color}CC, ${roadmap.color})`, border: 'none', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em' }}
            >
              {enrolling ? <span className="loading-spinner" style={{ borderTopColor: '#fff' }} /> : '⚔️'}
              {enrolling ? 'Registering…' : 'Begin Hunt'}
            </button>
          ) : status?.allSubjectsDone ? (
            <button
              onClick={() => navigate(`/skill-arena/quiz/roadmap/${roadmapId}`)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', border: 'none', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', color: '#1A0F00', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em' }}
            >
              <Trophy size={14} /> Begin Path Trial
            </button>
          ) : null}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>GATES</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Gates list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {subjects.map((s, i) => {
              const p       = s.percentage ?? 0
              const cleared = p >= 100
              const active  = p > 0 && p < 100
              const sColor  = subjectRankColor(s)
              return (
                <div
                  key={s.id}
                  onClick={() => s.totalConcepts > 0 && onGateClick(s.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 0.625rem',
                    background: 'var(--bg-secondary)',
                    border: `1px solid ${cleared ? 'rgba(74,222,128,0.2)' : active ? 'rgba(155,110,212,0.2)' : 'var(--border)'}`,
                    borderLeft: `3px solid ${cleared ? '#4ADE80' : active ? '#9B6ED4' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    cursor: s.totalConcepts > 0 ? 'pointer' : 'default',
                    opacity: s.totalConcepts > 0 ? 1 : 0.45,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (s.totalConcepts > 0) e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = cleared ? 'rgba(74,222,128,0.2)' : active ? 'rgba(155,110,212,0.2)' : 'var(--border)' }}
                >
                  {/* Step circle */}
                  <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', fontWeight: 700, background: cleared ? 'rgba(74,222,128,0.15)' : 'var(--bg-tertiary)', border: `1.5px solid ${cleared ? '#4ADE8055' : 'var(--border)'}`, color: cleared ? '#4ADE80' : 'var(--text-muted)' }}>
                    {cleared ? <CheckCircle size={11} color="#4ADE80" /> : s.totalConcepts > 0 ? i + 1 : <Lock size={10} />}
                  </div>

                  {/* Icon + title */}
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

                  {/* Status pill */}
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.06em', padding: '0.1rem 0.35rem', borderRadius: 3, flexShrink: 0, background: cleared ? 'rgba(74,222,128,0.1)' : active ? 'rgba(155,110,212,0.1)' : 'rgba(136,136,136,0.07)', color: cleared ? '#4ADE80' : active ? '#B48AE8' : '#555' }}>
                    {cleared ? 'DONE' : active ? 'HUNT' : 'SEALED'}
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

  const [quests, setQuests]           = useState(loadQuestState)
  const [avatarOpen, setAvatarOpen]   = useState(false)

  const [subjects, setSubjects]       = useState([])
  const [quizStatuses, setQuizStatuses] = useState({})
  const [gatesLoaded, setGatesLoaded] = useState(false)
  const [gateSearch, setGateSearch]   = useState('')
  const [gateFilter, setGateFilter]   = useState('All')

  const [allRoadmaps, setAllRoadmaps] = useState([])
  const [pathsLoaded, setPathsLoaded] = useState(false)
  const [pathSearch, setPathSearch]   = useState('')
  const [enrolling, setEnrolling]     = useState({})

  useEffect(() => {
    getProgressSummary()
      .then(s => {
        setSummary(s.data)
        // XP and rank now come from the API — persist to localStorage for Navbar fallback
        window.dispatchEvent(new CustomEvent('sl:xp'))
      })
      .catch(() => toast.error('Failed to load status window'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const view    = searchParams.get('view') || 'arena'
    const subject = searchParams.get('subject')
    if (view === 'gates' && !gatesLoaded) loadGates()
    if (view === 'paths' && !pathsLoaded) loadPaths()
    if (subject) setSelectedSubjectId(subject)
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!avatarOpen) return
    const handler = () => setAvatarOpen(false)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [avatarOpen])

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

  const toggleQuest = (id) => {
    const next = { ...quests, [id]: !quests[id] }
    setQuests(next); saveQuestState(next)
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
          <span className={`rank-badge ${gr.cls}`}>{gr.label} RANK</span>
          {quizStatuses[s.id]?.hasPassed && <Trophy size={11} color="#4ADE80" />}
        </div>
        <div className="sl-gate-title">{s.title}</div>
        <div className="sl-gate-meta">{s.totalConcepts > 0 ? `${s.totalConcepts} skills` : 'Coming soon'}</div>
        <div className="sl-gate-bar-track">
          <div className="sl-gate-bar-fill" style={{ width: `${p}%`, background: cleared ? gr.color : `${gr.color}88` }} />
        </div>
        <div className="sl-gate-status" style={{ color: cleared ? gr.color : sealed ? '#2A3A65' : `${gr.color}BB` }}>
          {cleared ? 'GATE CLEARED' : sealed ? 'GATE SEALED' : `IN PROGRESS ${p}%`}
        </div>
      </div>
    )
  }

  const renderMiddle = () => {
    if (activeView === 'arena') {
      const display = arenaSubjects.length > 0
        ? arenaSubjects
        : (summary?.subjectProgress ?? []).map(sp => ({
            id: sp.subjectId, title: sp.title, icon: sp.icon,
            totalConcepts: sp.total, completedConcepts: sp.completed,
            percentage: sp.percentage,
          }))

      return (
        <>
          <div className="sl-panel-title">
            Active Dungeon Gates
            {activeRoadmap && <span style={{ color: '#9B6ED4', fontFamily: "'Rajdhani', sans-serif", fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}> — {activeRoadmap.title}</span>}
          </div>
          {display.length > 0 ? (
            <div className="sl-gates-grid">
              {display.slice(0, 6).map((s, i) => {
                const p = s.percentage ?? (s.totalConcepts > 0 ? Math.round((s.completedConcepts / s.totalConcepts) * 100) : 0)
                const gr = subjectGateRank(s)
                const cleared = p >= 100, sealed = p === 0
                return (
                  <div key={s.id} className="sl-gate-card" onClick={() => s.totalConcepts > 0 && openSubjectPanel(s.id)}>
                    <span className={`rank-badge ${gr.cls}`}>{gr.label} RANK</span>
                    <div className="sl-gate-title">{s.title}</div>
                    <div className="sl-gate-meta">{s.totalConcepts} skills · {Math.max(1, Math.ceil(s.totalConcepts / 3))}w</div>
                    <div className="sl-gate-bar-track">
                      <div className="sl-gate-bar-fill" style={{ width: `${p}%`, background: cleared ? gr.color : `${gr.color}88` }} />
                    </div>
                    <div className="sl-gate-status" style={{ color: cleared ? gr.color : sealed ? '#2A3A65' : `${gr.color}BB` }}>
                      {cleared ? 'GATE CLEARED' : sealed ? 'GATE SEALED' : `IN PROGRESS ${p}%`}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🚪</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>NO ACTIVE PATH — SWITCH TO HUNTER PATH TO ENROLL</div>
            </div>
          )}
          {activeRoadmap && (
            <div className="sl-panel sl-path-footer" style={{ marginTop: '0.75rem', cursor: 'pointer' }}
              onClick={() => navigate(`/skill-arena/roadmaps/${activeRoadmap.id}`)}>
              <div>
                <div className="sl-path-title">ACTIVE HUNTER PATH — {activeRoadmap.title.toUpperCase()}</div>
                <div className="sl-path-meta">{completedGates} of {totalGates} gates cleared · Est. {activeRoadmap.estimatedWeeks ?? '?'} weeks</div>
              </div>
              <div>
                <div className="sl-path-pct">{overallPct}%</div>
                <div className="sl-path-pct-label">PATH CLEAR</div>
              </div>
            </div>
          )}
        </>
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
                  {r.enrolled ? (
                    <>
                      <div className="sl-gate-bar-track"><div className="sl-gate-bar-fill" style={{ width: `${r.overallPercentage}%`, background: `${r.color}AA` }} /></div>
                      <div className="sl-gate-status" style={{ color: r.color, marginTop: '0.25rem' }}>ACTIVE — {r.overallPercentage}%</div>
                    </>
                  ) : (
                    <button className="btn btn-primary btn-sm w-full" style={{ justifyContent: 'center', marginTop: '0.4rem', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.05em', fontSize: '0.8rem' }}
                      onClick={e => handleEnrollPath(e, r.id)} disabled={enrolling[r.id]}>
                      {enrolling[r.id] ? <span className="loading-spinner" /> : '⚔️'} {enrolling[r.id] ? 'Registering…' : 'Begin Hunt'}
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
      {/* ══ NAVBAR ══ */}
      <nav className="sl-dash-nav">
        <div className="sl-dash-nav-logo" onClick={() => switchView('arena')}>ARISE</div>
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
          <div style={{ position: 'relative' }}>
            <div className="sl-nav-avatar" style={{ background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}` }}
              onClick={e => { e.stopPropagation(); setAvatarOpen(o => !o) }}>
              {initials}
            </div>
            {avatarOpen && (
              <div className="sl-nav-logout" onClick={e => { e.stopPropagation(); logout() }}>
                <LogOut size={10} style={{ display: 'inline', marginRight: 5 }} /> EXIT SYSTEM
  
              </div>
              
            )}
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
          mode="overlay"
          subjectId={selectedSubjectId}
          onClose={() => {
            closeSubjectPanel()
            // keep roadmap panel open if we came from one
          }}
          onSkillClick={openConcept}
          selectedConceptId={selectedConceptId}
          navigate={navigate}
        />
      )}
    </div>
  )
}
