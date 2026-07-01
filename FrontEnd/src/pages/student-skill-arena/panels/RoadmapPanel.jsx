import { useState, useEffect } from 'react'
import { TEST_DELAY_MS } from '../../../components/loaders/_config'
import DungeonPortalLoader from '../../../components/loaders/DungeonPortalLoader'
import { getRoadmap, getRoadmapStatus, enrollRoadmap, pauseRoadmap, resumeRoadmap } from '../../../api/api'
import { CheckCircle, Trophy, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RoadmapPanel({ roadmapId, onClose, onGateClick, navigate, startQuiz }) {
  const [roadmap, setRoadmap]   = useState(null)
  const [status, setStatus]     = useState(null)
  const [loading, setLoading]   = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [pausing, setPausing]     = useState(false)
  const [resuming, setResuming]   = useState(false)

  useEffect(() => {
    setLoading(true); setRoadmap(null)
    Promise.all([
      getRoadmap(roadmapId),
      getRoadmapStatus(roadmapId).catch(() => null),
    ]).then(([r, rs]) => {
      setRoadmap(r.data)
      if (rs) setStatus(rs.data)
    }).finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
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
    setResuming(true)
    try {
      await resumeRoadmap(roadmapId)
      setRoadmap(r => ({ ...r, paused: false }))
      toast.success('⚔️ Hunt resumed!')
    } catch { toast.error('Failed to resume') }
    finally { setResuming(false) }
  }

  const pct      = roadmap?.overallPercentage ?? 0
  const subjects = roadmap?.subjects ?? []
  const isEnrolled = roadmap?.enrolled
  const isPaused   = roadmap?.paused
  const showProgress = isEnrolled && !isPaused

  return (
    <div className="sl-subject-panel">
      <div className="sl-subject-panel-header">
        <span className="dash-panel-label">[ HUNTER PATH ]</span>
        <button className="sl-subject-panel-close" onClick={onClose}>✕</button>
      </div>

      {loading ? (
        <div className="flex-center dash-flex-center-fill--tall"><DungeonPortalLoader panel height={180} /></div>
      ) : !roadmap ? null : (
        <div className="sl-subject-panel-body">
          <div className="dash-roadmap-header">
            <div
              className="dash-roadmap-icon"
              style={{ '--path-color-bg': roadmap.color + '22' }}
            >{roadmap.icon}</div>
            <div className="dash-flex-1">
              <div className="dash-roadmap-title-row">
                <div className="dash-roadmap-title">{roadmap.title}</div>
                <button
                  onClick={() => navigate('/missions?category=role_based')}
                  title="View role-based missions"
                  className="dash-missions-btn"
                >
                  ⚔ MISSIONS
                </button>
              </div>
              <div className="dash-roadmap-role" style={{ '--path-color': roadmap.color }}>{roadmap.roleTarget}</div>
            </div>
            {isEnrolled && (
              <button onClick={isPaused ? handleResume : handlePause} disabled={pausing || resuming}
                title={isPaused ? 'Resume Hunt' : 'Pause Hunt'}
                className="dash-roadmap-pause-btn">
                {(pausing || resuming) ? <span className="loading-spinner dash-roadmap-pause-btn__spinner" /> : isPaused ? '▶' : '⏸'}
              </button>
            )}
          </div>

          {showProgress && (
            <div>
              <div className="dash-roadmap-progress-labels">
                <span>{roadmap.completedSubjects ?? 0}/{roadmap.totalSubjects ?? subjects.length} gates cleared</span>
                <span className="dash-roadmap-progress-pct" style={{ '--path-color': roadmap.color }}>{pct}%</span>
              </div>
              <div className="dash-progress-track">
                <div
                  className="dash-progress-fill"
                  style={{ '--progress-pct': `${pct}%`, '--accent': roadmap.color, '--accent-80': `${roadmap.color}88` }}
                />
              </div>
            </div>
          )}

          {!isEnrolled ? (
            <button onClick={handleEnroll} disabled={enrolling}
              className="dash-roadmap-enroll-btn"
              style={{ '--path-color': roadmap.color }}>
              {enrolling ? <span className="loading-spinner dash-roadmap-enroll-btn__spinner" /> : '⚔️'}
              {enrolling ? 'Registering…' : 'Begin Hunt'}
            </button>
          ) : status?.allSubjectsDone ? (
            <button onClick={() => startQuiz('roadmap', roadmapId, roadmap?.title ?? 'Path Final Trial', roadmap?.icon)}
              className="dash-roadmap-final-btn">
              <Trophy size={15} /> TAKE PATH FINAL TEST
            </button>
          ) : isEnrolled ? (
            <div className="dash-roadmap-locked-banner">
              <Lock size={13} color="var(--text-muted)" className="dash-roadmap-locked-banner__icon" />
              <span className="dash-roadmap-locked-banner__text">
                PATH FINAL TEST LOCKED · Earn badges for all {subjects.length} gates to unlock
              </span>
            </div>
          ) : null}

          <div className="dash-roadmap-divider">
            <div className="dash-roadmap-divider__line" />
            <span className="dash-roadmap-divider__label">GATES</span>
            <div className="dash-roadmap-divider__line" />
          </div>

          <div className="dash-roadmap-gates">
            {subjects.map((s, i) => {
              const p          = showProgress ? (s.percentage ?? 0) : 0
              const hasBadge   = s.hasBadge ?? false
              const allLearned = showProgress && p >= 100
              const gateClosed = allLearned && hasBadge
              const active     = showProgress && p > 0 && !gateClosed
              const gateClass  = gateClosed ? 'dash-roadmap-gate--closed'
                : allLearned ? 'dash-roadmap-gate--learned'
                : active ? 'dash-roadmap-gate--active' : 'dash-roadmap-gate--idle'
              return (
                <div key={s.id} className="dash-roadmap-gate-wrap">
                  <div
                    onClick={() => s.totalConcepts > 0 && onGateClick(s.id)}
                    className={`dash-roadmap-gate ${gateClass}${s.totalConcepts > 0 ? ' is-clickable' : ' is-disabled'}`}
                  >
                    <div className="dash-roadmap-gate__num">
                      {gateClosed ? <CheckCircle size={11} color="#4ADE80" /> : s.totalConcepts > 0 ? i + 1 : <Lock size={10} />}
                    </div>
                    <span className="dash-roadmap-gate__icon">{s.icon}</span>
                    <div className="dash-flex-1">
                      <div className="dash-roadmap-gate__title">{s.title}</div>
                      {active && !allLearned ? (
                        <div className="dash-roadmap-gate__progress-row">
                          <div className="dash-progress-track dash-progress-track--sm dash-flex-1">
                            <div className="dash-progress-fill" style={{ '--progress-pct': `${p}%`, '--accent': '#9B6ED4' }} />
                          </div>
                          <span className="dash-roadmap-gate__pct">{p}%</span>
                        </div>
                      ) : (
                        <div className="dash-roadmap-gate__status">
                          {gateClosed ? 'GATE CLOSED' : allLearned ? 'SKILLS LEARNED' : s.totalConcepts > 0 ? `${s.totalConcepts} skills` : 'sealed'}
                        </div>
                      )}
                    </div>
                    <span className="dash-roadmap-gate__badge">
                      {gateClosed ? 'DONE' : allLearned ? 'TEST' : active ? 'HUNT' : 'Enter'}
                    </span>
                  </div>
                  {allLearned && !hasBadge && (
                    <button
                      onClick={e => { e.stopPropagation(); startQuiz('subject', s.id, s.title, s.icon) }}
                      className="dash-roadmap-gate-test-btn"
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
