import { useState, useEffect } from 'react'
import { TEST_DELAY_MS } from '../../../components/loaders/_config'
import DungeonPortalLoader from '../../../components/loaders/DungeonPortalLoader'
import ProgressBar from '../../../components/ProgressBar'
import { getSubject, getQuizStatus } from '../../../api/api'
import { Search, Trophy, Lock, CheckCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'


// ─── Subject Panel (overlay-right OR in-grid-left) ────────
export default function SubjectPanel({ subjectId, onClose, onSkillClick, selectedConceptId, navigate, startQuiz, mode = 'overlay' }) {
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
    }).finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
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
        <div className="flex-center" style={{ flex: 1, minHeight: 120 }}><DungeonPortalLoader panel height={120} /></div>
      ) : !subject ? null : (
        <div className={isGrid ? undefined : 'sl-subject-panel-body'} style={isGrid ? { flex: 1, overflowY: 'auto', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' } : undefined}>

          {/* Subject meta */}
          <div className="sl-panel-subject-meta">
            <div className="sl-panel-subject-icon" style={{ background: subject.color + '22', width: 36, height: 36, fontSize: '1.25rem' }}>
              {subject.icon}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div className="sl-panel-subject-title" style={{ fontSize: '0.9rem' }}>{subject.title}</div>
                <button
                  onClick={() => navigate(`/missions?subjectTitle=${encodeURIComponent(subject.title)}`)}
                  title={`View missions for ${subject.title}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                    background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.35)',
                    borderRadius: 4, padding: '0.15rem 0.45rem', cursor: 'pointer',
                    fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem',
                    letterSpacing: '0.06em', color: '#F59E0B',
                    transition: 'all 0.15s', flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.1)'}
                >
                  ⚔ MISSIONS
                </button>
              </div>
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
