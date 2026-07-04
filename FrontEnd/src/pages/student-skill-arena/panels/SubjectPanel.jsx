import { useState, useEffect } from 'react'
import { TEST_DELAY_MS } from '../../../components/loaders/_config'
import DungeonPortalLoader from '../../../components/loaders/DungeonPortalLoader'
import ProgressBar from '../../../components/ProgressBar'
import { getSubject, getQuizStatus } from '../../../api/api'
import { Search, Trophy, Lock, CheckCircle, Clock } from 'lucide-react'

const RANK_COLORS = { S:'#EF4444', A:'#F59E0B', B:'#9B6ED4', C:'#60A5FA', D:'#4ADE80', E:'#888888' }

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
  const bodyClass    = isGrid ? 'dash-subject-grid-body' : 'sl-subject-panel-body'

  return (
    <div className={wrapperClass}>
      <div className="sl-subject-panel-header">
        <span className="dash-panel-label">[ SKILLS ]</span>
        <button className="sl-subject-panel-close" onClick={onClose}>✕</button>
      </div>

      {loading ? (
        <div className="flex-center dash-flex-center-fill"><DungeonPortalLoader panel height={120} /></div>
      ) : !subject ? null : (
        <div className={bodyClass}>
          <div className="sl-panel-subject-meta">
            <div
              className="sl-panel-subject-icon dash-subject-icon"
              style={{ '--subject-color-bg': subject.color + '22' }}
            >
              {subject.icon}
            </div>
            <div className="dash-flex-1">
              <div className="dash-subject-title-row">
                <div className="sl-panel-subject-title dash-subject-title--sm">{subject.title}</div>
                <button
                  onClick={() => navigate(`/missions?subjectTitle=${encodeURIComponent(subject.title)}`)}
                  title={`View missions for ${subject.title}`}
                  className="dash-missions-btn"
                >
                  ⚔ MISSIONS
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="sl-panel-progress-row">
              <span>{subject.completedCount}/{subject.totalConcepts} skills</span>
              <span className="sl-panel-progress-pct">{pct}%</span>
            </div>
            <ProgressBar value={pct} size="sm" />
          </div>

          {!isGrid && (
            quizStatus?.hasBadge ? (
              <div className="dash-gate-badge-row">
                <Trophy size={13} color="#4ADE80" />
                <div className="dash-flex-1">
                  <div className="dash-gate-badge-row__title">GATE CLOSED · BADGE EARNED</div>
                  <div className="dash-gate-badge-row__score">{quizStatus.badgeScore}/{quizStatus.badgeTotal}</div>
                </div>
                <button className="btn btn-ghost btn-sm dash-gate-badge-row__retry"
                  onClick={() => startQuiz('subject', subjectId, subject?.title ?? 'Gate Assessment', subject?.icon)}>Retry</button>
              </div>
            ) : pct >= 100 ? (
              <button className="dash-gate-test-btn"
                onClick={() => startQuiz('subject', subjectId, subject?.title ?? 'Gate Assessment', subject?.icon)}>
                <Trophy size={14} />
                {quizStatus?.badgeScore > 0 ? `Retry Final Test · ${quizStatus.badgeScore}/25` : 'Take Final Test to Close Gate →'}
              </button>
            ) : (
              <div className="dash-gate-locked-row">
                <Lock size={12} color="var(--text-muted)" className="dash-gate-locked-row__icon" />
                <div className="dash-gate-locked-row__text">
                  FINAL TEST LOCKED · Clear all {subject.totalConcepts} skills to unlock
                </div>
              </div>
            )
          )}

          <div className="dash-search-wrap">
            <Search size={12} className="dash-search-icon dash-search-icon--panel" />
            <input className="form-input dash-search-input--panel"
              placeholder="Scout skills…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="dash-skill-list">
            {concepts.map((c, i) => {
              const skillNumClass = c.completed ? 'dash-skill-num--cleared'
                : selectedConceptId === c.id ? 'dash-skill-num--active' : 'dash-skill-num--default'
              const rankCol = RANK_COLORS[c.rank] || '#888888'
              return (
                <div
                  key={c.id}
                  className={`sl-skill-item${c.completed ? ' cleared' : ''}${selectedConceptId === c.id ? ' active-skill' : ''}`}
                  onClick={() => onSkillClick(c.id, subject.concepts)}
                >
                  <div className={`sl-skill-num dash-skill-num ${skillNumClass}`}>
                    {c.completed ? <CheckCircle size={11} color="#4ADE80" /> : i + 1}
                  </div>
                  <div className="sl-skill-info">
                    <div className="sl-skill-title">{c.title}</div>
                    <div className="sl-skill-mins">
                      <Clock size={9} className="dash-skill-clock" />{c.estimatedMinutes}m
                    </div>
                  </div>
                  {c.rank && (
                    <span
                      className="dash-skill-rank"
                      style={{ '--rank-color': rankCol, '--rank-color-40': `${rankCol}40`, '--rank-color-15': rankCol + '15' }}
                    >{c.rank}</span>
                  )}
                </div>
              )
            })}
            {concepts.length === 0 && (
              <div className="dash-empty-msg">
                {search ? 'NO SKILLS MATCH' : 'NO SKILLS AVAILABLE'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
