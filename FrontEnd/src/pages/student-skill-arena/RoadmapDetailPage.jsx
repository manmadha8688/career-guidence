import { useState, useEffect, useRef } from 'react'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, PlayCircle, Trophy, Zap, Lock } from 'lucide-react'
import SystemAwakeningLoader from '../../components/loaders/SystemAwakeningLoader'
import SectionNotFoundPage from '../../components/SectionNotFoundPage'
import { isMongoId } from '../../utils/mongoId'
import { getRoadmap, enrollRoadmap, getRoadmapStatus } from '../../api/api'
import BookmarkButton from '../../components/BookmarkButton'
import { getRank } from '../../utils/slRank'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'
import '../../styles/pages/dashboard/index.css'

const RANK_COLORS = {
  S: { color: '#EF4444', bg: '#EF444412' },
  A: { color: '#F59E0B', bg: '#F59E0B12' },
  B: { color: '#9B6ED4', bg: '#9B6ED412' },
  C: { color: '#60A5FA', bg: '#60A5FA12' },
  D: { color: '#4ADE80', bg: '#4ADE8012' },
  E: { color: '#888888', bg: '#88888812' },
}
const subjectRank = (s) => {
  const r = RANK_COLORS[s?.rank] || RANK_COLORS['E']
  return { label: s?.rank || 'E', ...r }
}

export default function RoadmapDetailPage() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const { user }     = useAuth()
  const [roadmap, setRoadmap]         = useState(null)
  const [roadmapStatus, setRoadmapStatus] = useState(null)
  const [loading, setLoading]         = useState(true)
  const [notFound, setNotFound]       = useState(false)
  const [enrolling, setEnrolling]     = useState(false)
  const mountedRef = useRef(true)

  const xp       = user?.xp ?? 0
  const rank     = getRank(xp)
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    let active = true
    let doneTimer

    if (!isMongoId(id)) {
      setNotFound(true)
      doneTimer = setTimeout(() => setLoading(false), PAGE_MIN_MS)
      return () => { active = false; clearTimeout(doneTimer) }
    }
    Promise.all([
      getRoadmap(id).catch(() => null),
      getRoadmapStatus(id).catch(() => null),
    ])
      .then(([r, rs]) => {
        if (!active) return
        if (!r?.data) {
          setNotFound(true)
          return
        }
        setRoadmap(r.data)
        if (rs) setRoadmapStatus(rs.data)
      })
      .catch(() => { if (active) setNotFound(true) })
      .finally(() => { if (active) doneTimer = setTimeout(() => setLoading(false), PAGE_MIN_MS) })

    return () => { active = false; clearTimeout(doneTimer) }
  }, [id])

  const handleEnroll = async () => {
    setEnrolling(true)
    try {
      await enrollRoadmap(id)
      if (!mountedRef.current) return
      setRoadmap(r => ({ ...r, enrolled: true }))
      toast.success('⚔️ Path registered! Your hunt begins.')
    } catch (err) { if (mountedRef.current) toast.error(getApiError(err, 'We could not register this path. Please try again.')) }
    finally { if (mountedRef.current) setEnrolling(false) }
  }

  // ── Loading ──────────────────────────────────────────
  if (loading) return <SystemAwakeningLoader subtitle="LOADING ROADMAP" />

  if (notFound) return <SectionNotFoundPage variant="hunter-path" />

  if (!roadmap) return null

  const pct              = roadmap.overallPercentage ?? 0
  const completedGates   = roadmap.completedSubjects ?? 0
  const totalGates       = roadmap.totalSubjects ?? roadmap.subjects?.length ?? 0
  const subjects         = roadmap.subjects ?? []

  const pathColorStyle = {
    '--path-color': roadmap.color,
    '--path-color-bg': `${roadmap.color}18`,
    '--path-color-border': `${roadmap.color}30`,
  }

  return (
    <div className="dash-roadmap-page">

      {/* ── Top bar ── */}
      <header className="dash-roadmap-page-header">
        <button
          onClick={() => navigate(-1)}
          className="dash-roadmap-page-back"
        >
          <ArrowLeft size={14} /> PATHS
        </button>

        <div className="dash-roadmap-page-title-wrap">
          <span className="dash-roadmap-page-icon">{roadmap.icon}</span>
          <span className="dash-roadmap-page-title">
            {roadmap.title}
          </span>
          {roadmap.enrolled && (
            <span className="dash-roadmap-page-active-tag">
              ACTIVE
            </span>
          )}
        </div>

        <div className="dash-roadmap-page-header-right">
          <span className={`rank-badge ${rank.cls} dash-roadmap-page-rank-badge`}>{rank.label}</span>
          <div
            className="dash-avatar dash-avatar--md"
            style={{ '--avatar-bg': user?.avatarColor || '#9B6ED4', '--rank-color': rank.color }}
          >
            {initials}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="dash-roadmap-page-content">
        <div className="dash-roadmap-page-inner">

          {/* ── Hero card ── */}
          <div className="dash-roadmap-hero" style={pathColorStyle}>
            {/* Icon */}
            <div className="dash-roadmap-hero__icon-wrap">
              {roadmap.icon}
            </div>

            {/* Info */}
            <div className="dash-roadmap-hero__info">
              <div className="dash-roadmap-hero__title-row">
                <h1 className="dash-roadmap-hero__title">{roadmap.title}</h1>
                <span className="dash-roadmap-hero__role-tag">
                  {roadmap.roleTarget}
                </span>
              </div>
              <p className="dash-roadmap-hero__desc">{roadmap.description}</p>

              {/* Stats row */}
              <div className="dash-roadmap-hero__stats">
                {[
                  { label: 'GATES', value: totalGates },
                  { label: 'CLEARED', value: completedGates },
                  { label: 'WEEKS', value: roadmap.estimatedWeeks ?? '?' },
                ].map(s => (
                  <div key={s.label} className="dash-roadmap-hero__stat">
                    <div className="dash-roadmap-hero__stat-value">{s.value}</div>
                    <div className="dash-roadmap-hero__stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="dash-roadmap-hero__progress-row">
                <div className="dash-progress-track dash-progress-track--lg dash-roadmap-hero__progress-track">
                  <div
                    className="dash-progress-fill"
                    style={{ '--progress-pct': `${pct}%`, '--accent': roadmap.color, '--accent-80': `${roadmap.color}88` }}
                  />
                </div>
                <span className="dash-roadmap-hero__pct">{pct}%</span>
              </div>
            </div>

            {/* Enroll / action */}
            <div className="dash-roadmap-hero__actions">
              {!roadmap.enrolled ? (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="dash-roadmap-enroll-btn-lg"
                  style={pathColorStyle}
                >
                  {enrolling ? <span className="loading-spinner dash-roadmap-enroll-btn-lg__spinner" /> : '⚔️'}
                  {enrolling ? 'Registering…' : 'Begin Hunt'}
                </button>
              ) : (
                roadmapStatus?.allSubjectsDone && (
                  <button
                    onClick={() => navigate(`/skill-arena/quiz/roadmap/${id}`)}
                    className="dash-roadmap-trial-btn"
                  >
                    <Trophy size={16} /> Path Trial
                  </button>
                )
              )}
              <BookmarkButton
                type="ROADMAP"
                refId={id}
                title={roadmap.title}
                description={roadmap.roleTarget}
                icon={roadmap.icon}
                iconOnly
              />
            </div>
          </div>

          {/* ── All cleared banner ── */}
          {roadmapStatus?.allSubjectsDone && (
            <div className="dash-roadmap-cleared-banner">
              <Trophy size={20} color="#F59E0B" className="dash-roadmap-cleared-banner__icon" />
              <div className="dash-roadmap-cleared-banner__body">
                <div className="dash-roadmap-cleared-banner__title">All Gates Cleared!</div>
                <div className="dash-roadmap-cleared-banner__meta">Path Trial available · 50 trials · 90 min</div>
              </div>
              <button
                onClick={() => navigate(`/skill-arena/quiz/roadmap/${id}`)}
                className="dash-roadmap-cleared-banner__btn"
              >
                Begin Path Trial
              </button>
            </div>
          )}

          {/* ── Gate list ── */}
          <div>
            <div className="dash-roadmap-gates-header">
              <div className="dash-roadmap-gates-header__line" />
              DUNGEON GATES
              <div className="dash-roadmap-gates-header__line" />
            </div>

            <div className="dash-roadmap-gates-list">
              {subjects.map((s, i) => {
                const p       = s.percentage ?? 0
                const cleared = p >= 100
                const active  = p > 0 && p < 100
                const sealed  = p === 0
                const sr      = subjectRank(s)
                const gateState = cleared ? 'cleared' : active ? 'active' : 'idle'

                return (
                  <div
                    key={s.id}
                    className={`dash-roadmap-gate-card dash-roadmap-gate-card--${gateState}${sealed && !roadmap.enrolled ? ' is-sealed' : ''}`}
                  >
                    {/* Step number / check */}
                    <div className="dash-roadmap-gate-card__step">
                      {cleared ? <CheckCircle size={16} color="#4ADE80" /> : sealed ? <Lock size={14} color="var(--text-muted)" /> : i + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className="dash-roadmap-gate-card__subject-icon"
                      style={{ '--subject-bg': sr.bg }}
                    >
                      {s.icon}
                    </div>

                    {/* Info */}
                    <div className="dash-roadmap-gate-card__info">
                      <div className="dash-roadmap-gate-card__title-row">
                        <span className="dash-roadmap-gate-card__title">{s.title}</span>
                        <span
                          className="dash-roadmap-gate-card__rank"
                          style={{ '--rank-color': sr.color, '--rank-bg': sr.bg, '--rank-border': `${sr.color}30` }}
                        >
                          {sr.label}
                        </span>
                      </div>
                      <div className="dash-roadmap-gate-card__meta-row">
                        <span className="dash-roadmap-gate-card__skills">
                          {s.completedConcepts ?? 0}/{s.totalConcepts} skills
                        </span>
                        {active && (
                          <div className="dash-roadmap-gate-card__progress">
                            <div className="dash-roadmap-gate-card__progress-track">
                              <div className="dash-roadmap-gate-card__progress-fill" style={{ '--progress-pct': `${p}%` }} />
                            </div>
                            <span className="dash-roadmap-gate-card__pct">{p}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status badge */}
                    <span className="dash-roadmap-gate-card__status">
                      {cleared ? 'CLEARED' : active ? 'ACTIVE HUNT' : 'GATE SEALED'}
                    </span>

                    {/* Action button */}
                    <button
                      onClick={() => navigate(`/skill-arena/dashboard?view=gates&subject=${s.id}`)}
                      className={`dash-roadmap-gate-card__action dash-roadmap-gate-card__action--${gateState}`}
                    >
                      {cleared
                        ? <><CheckCircle size={12} /> Review</>
                        : active
                        ? <><PlayCircle size={12} /> Continue</>
                        : <><Zap size={12} /> Enter Gate</>}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
