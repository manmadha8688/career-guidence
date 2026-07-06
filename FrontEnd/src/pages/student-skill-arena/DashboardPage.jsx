import { useState, useEffect, useMemo, useRef } from 'react'
import { TEST_DELAY_MS, PAGE_MIN_MS } from '../../components/loaders/_config'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SystemAwakeningLoader from '../../components/loaders/SystemAwakeningLoader'
import DungeonPortalLoader from '../../components/loaders/DungeonPortalLoader'
import { CheckCircle, Search, Trophy, Info, Menu, Sun, Moon } from 'lucide-react'
import {
  getProgressSummary, getRoadmap, getBulkSubjectStatus,
  getSubjects, getRoadmaps,
  getHunterStats, clearApiCache,
} from '../../api/api'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { getRank } from '../../utils/slRank'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'
import { logApiError } from '../../utils/devLog'
import {
  NAV_ITEMS, DAILY_QUESTS,
  computeStats, subjectGateRank, loadQuestState, saveQuestState,
} from './dashboard/dashboardUtils'

// ─── Extracted panel components ───────────────────────────
import ConceptInlinePanel  from './panels/ConceptInlinePanel'
import RoadmapPanel        from './panels/RoadmapPanel'
import SubjectPanel        from './panels/SubjectPanel'
import HunterProfileDrawer from './panels/HunterProfileDrawer'
// ─── Extracted modal components ────────────────────────────
import AboutRoadmapModal   from './modals/AboutRoadmapModal'
import AboutGateModal      from './modals/AboutGateModal'
import InstructionsModal   from './modals/InstructionsModal'
// ─── Extracted mobile components ───────────────────────────
import MobileAvatarMenu    from './mobile/MobileAvatarMenu'
import MobileStatsPopup    from './mobile/MobileStatsPopup'
import MobileQuestsPopup   from './mobile/MobileQuestsPopup'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [summary, setSummary]         = useState(null)
  const [loading, setLoading]         = useState(true)

  const [activeView, setActiveView]   = useState(() => searchParams.get('view') || 'arena')
  const [selectedSubjectId, setSelectedSubjectId] = useState(() => searchParams.get('subject') || null)
  const [selectedConceptId, setSelectedConceptId] = useState(() => searchParams.get('concept') || null)
  const [conceptNavList, setConceptNavList] = useState([])
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null)

  const [quests, setQuests]           = useState(() => loadQuestState(user?.id))
  const [aboutGate, setAboutGate]           = useState(null)
  const [aboutRoadmap, setAboutRoadmap]     = useState(null)
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
  const studySecondsRef = useRef(0)

  const [subjects, setSubjects]       = useState([])
  const [quizStatuses, setQuizStatuses] = useState({})
  const [gatesLoaded, setGatesLoaded] = useState(false)
  const [gateSearch, setGateSearch]   = useState('')

  const [allRoadmaps, setAllRoadmaps] = useState([])
  const [pathsLoaded, setPathsLoaded] = useState(false)
  const [pathSearch, setPathSearch]   = useState('')

  const lastScrollY = useRef(0)
  const navHiddenRef = useRef(false)

  // Auto-hide navbar on page scroll (reappears when scrolling up).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const last = lastScrollY.current
      let nav = navHiddenRef.current
      if (y < 60) nav = false
      else if (y > last + 6) nav = true
      else if (y < last - 6) nav = false
      if (nav !== navHiddenRef.current) {
        navHiddenRef.current = nav
        document.documentElement.classList.toggle('nav-hidden', nav)
      }
      lastScrollY.current = y
    }

    navHiddenRef.current = false
    lastScrollY.current = 0
    document.documentElement.classList.remove('nav-hidden')

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.documentElement.classList.remove('nav-hidden')
    }
  }, [loading, activeView, selectedConceptId])

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
    let active = true
    const timers = []
    getProgressSummary()
      .then(s => {
        if (!active) return
        setSummary(s.data)
        syncQuestsFromSummary(s.data, user?.id)
      })
      .catch(err => { if (active) toast.error(getApiError(err, 'We could not load your progress. Please refresh.')) })
      .finally(() => {
        timers.push(setTimeout(() => { if (active) setLoading(false) }, PAGE_MIN_MS))
      })
    getHunterStats()
      .then(r => { if (active) setHunterStats(r.data) })
      .catch(err => logApiError('hunter-stats', err))
    return () => {
      active = false
      timers.forEach(clearTimeout)
    }
  }, []) // eslint-disable-line

  // Re-fetch everything when a concept is cleared (dispatched from QuizResultPage)
  useEffect(() => {
    const refresh = () => {
      clearApiCache('progressSummary', 'hunterStats', 'subjects', 'subject:*', 'concept:*', 'quizStatus:*', 'roadmapStatus:*')
      getProgressSummary().then(s => {
        setSummary(s.data)
        syncQuestsFromSummary(s.data, user?.id)
      }).catch(err => logApiError('progress-refresh', err))
      getHunterStats().then(r => setHunterStats(r.data)).catch(err => logApiError('hunter-stats-refresh', err))
      setPanelRefreshKey(k => k + 1)
      getSubjects().then(r => {
        setSubjects(r.data)
        setTimeout(() => setGatesLoaded(true), TEST_DELAY_MS)
        const ids = r.data.map(s => s.id)
        if (ids.length > 0) {
          getBulkSubjectStatus(ids)
            .then(res => setQuizStatuses(res.data))
            .catch(err => logApiError('quiz-status-refresh', err))
        }
      }).catch(err => {
        logApiError('subjects-refresh', err)
        setGatesLoaded(true)
      })
      getRoadmaps().then(r => {
        setAllRoadmaps(r.data)
        setTimeout(() => setPathsLoaded(true), TEST_DELAY_MS)
      }).catch(err => {
        logApiError('roadmaps-refresh', err)
        setPathsLoaded(true)
      })
    }
    window.addEventListener('sl:refresh', refresh)
    return () => window.removeEventListener('sl:refresh', refresh)
  }, [])

  useEffect(() => {
    const view    = searchParams.get('view') || 'arena'
    const subject = searchParams.get('subject')
    const concept = searchParams.get('concept')

    if (concept) setActiveView('gates')
    else if (view === 'gates' || view === 'paths') setActiveView(view)

    if (view === 'gates' || subject || concept) loadGates()
    if (view === 'paths') loadPaths()
    if (subject) setSelectedSubjectId(subject)
    if (concept) setSelectedConceptId(concept)
  }, []) // eslint-disable-line


  // Auto-check "Study for 20 min" quest after 20 minutes on the dashboard
  useEffect(() => {
    if (loadQuestState(user?.id).q2) return  // already earned today
    studySecondsRef.current = 0
    // Accumulate in a ref (no per-second re-render — that previously remounted every gate card).
    const t = setInterval(() => {
      studySecondsRef.current += 1
      if (studySecondsRef.current >= 1200) {  // 20 minutes = 1200 seconds
        clearInterval(t)
        const updated = { ...loadQuestState(user?.id), q2: true }
        setQuests(updated)
        saveQuestState(updated, user?.id)
      }
    }, 1000)
    return () => clearInterval(t)
  }, []) // eslint-disable-line

  const loadGates = () => {
    if (gatesLoaded) return
    getSubjects().then(r => {
      setSubjects(r.data)
      setTimeout(() => setGatesLoaded(true), TEST_DELAY_MS)
      const ids = r.data.map(s => s.id)
      if (ids.length > 0) {
        getBulkSubjectStatus(ids)
          .then(res => setQuizStatuses(res.data))
          .catch(err => logApiError('quiz-status-gates', err))
      }
    }).catch(err => {
      logApiError('subjects-gates', err)
      setGatesLoaded(true)
    })
  }

  const loadPaths = () => {
    if (pathsLoaded) return
    getRoadmaps().then(r => {
      setAllRoadmaps(r.data)
      setTimeout(() => setPathsLoaded(true), TEST_DELAY_MS)
    }).catch(err => {
      logApiError('roadmaps-paths', err)
      setPathsLoaded(true)
    })
  }

  // Load roadmaps eagerly so Skill Arena can show active path
  useEffect(() => { loadPaths() }, []) // eslint-disable-line

  const switchView = (view) => {
    setActiveView(view)
    setGateSearch(''); setPathSearch('')
    setSelectedSubjectId(null); setSelectedConceptId(null); setConceptNavList([])
    setSelectedRoadmapId(null)
    setSearchParams(view === 'arena' ? {} : { view })
    if (view === 'gates') loadGates()
    if (view === 'paths') loadPaths()
  }

  const openSubjectPanel = (id) => {
    setSelectedSubjectId(id)
    setSelectedConceptId(null); setConceptNavList([])
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
    const params = { ...(activeView !== 'arena' ? { view: activeView } : {}) }
    if (selectedSubjectId) params.subject = selectedSubjectId
    params.concept = conceptId
    setSearchParams(params)
  }

  const handleConceptClose = (action, targetId) => {
    if (action === 'prev' || action === 'next') {
      setSelectedConceptId(targetId)
      const params = { ...(activeView !== 'arena' ? { view: activeView } : {}) }
      if (selectedSubjectId) params.subject = selectedSubjectId
      params.concept = targetId
      setSearchParams(params)
    } else {
      setSelectedConceptId(null); setConceptNavList([])
      const params = { ...(activeView !== 'arena' ? { view: activeView } : {}) }
      if (selectedSubjectId) params.subject = selectedSubjectId
      setSearchParams(params)
    }
  }

  const xp             = summary?.xp    ?? user?.xp    ?? 0
  const rank           = getRank(xp)
  const level          = summary?.level ?? user?.level ?? 1
  const stats          = useMemo(() => computeStats(summary?.subjectProgress), [summary])
  const initials       = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const doneCount      = DAILY_QUESTS.filter(q => quests[q.id]).length
  const earnedXp       = DAILY_QUESTS.filter(q => quests[q.id]).reduce((s, q) => s + q.xp, 0)

  const filteredSubjects = subjects.filter(s =>
    s.title.toLowerCase().includes(gateSearch.toLowerCase())
  )

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
    const enabled   = s.totalConcepts > 0
    const gateColor = gr.color
    return (
      <div
        className={`sl-gate-card dash-gate-card ${enabled ? 'is-enabled' : 'is-disabled'}`}
        style={{
          '--gate-color': gateColor,
          '--gate-bar-bg': gateClosed ? gateColor : `${gateColor}88`,
          '--gate-status-color': gateClosed ? gateColor : sealed ? '#0cbd09' : `${gateColor}BB`,
          '--progress-pct': `${p}%`,
        }}
        onClick={() => enabled && openSubjectPanel(s.id)}>
        {/* Top row: title left, rank + about right */}
        <div className="dash-gate-card__top">
          <div className="sl-gate-title dash-gate-card__title">{s.title}</div>
          <div className="dash-gate-card__actions">
            {gateClosed && <Trophy size={11} color="#4ADE80" />}
            <span className={`rank-badge dash-rank-badge-xxs ${gr.cls}`}>{gr.label}</span>
            <button
              className="dash-gate-card__info-btn"
              style={{ '--gate-color': gateColor }}
              onClick={e => { e.stopPropagation(); setAboutGate(s) }}
              title="About this gate"
            >
              <Info size={18} />
            </button>
          </div>
        </div>
        <div className="sl-gate-meta">{s.totalConcepts > 0 ? `${s.totalConcepts} skills` : 'Coming soon'}</div>
        {!allLearned && (
          <div className="sl-gate-bar-track">
            <div className="sl-gate-bar-fill dash-gate-bar-fill--dynamic" />
          </div>
        )}
        {gateClosed ? (
          <div className="sl-gate-status dash-gate-status--dynamic">GATE CLOSED SUCCESSFULLY</div>
        ) : allLearned ? (
          <button
            className="dash-gate-final-btn"
            onClick={e => { e.stopPropagation(); startQuiz('subject', s.id, s.title, s.icon) }}
          >
            ⚔ TAKE FINAL TEST
          </button>
        ) : (
          <div className="sl-gate-status dash-gate-status--dynamic">
            {sealed ? '' : `IN PROGRESS ${p}%`}
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
      const streak = summary?.streak ?? 0

      // Active enrolled roadmaps from allRoadmaps (loaded lazily)
      const enrolledPaths = allRoadmaps.filter(r => r.enrolled && !r.paused)
      const activePath    = enrolledPaths[0] ?? null

      return (
        <div className="dash-arena-view">

          {/* ── Hunter overview strip ── */}
          <div className="dash-arena-stats">
            {[
              { label: 'SKILLS LEARNED', value: totalConceptsDone, suffix: `/ ${totalConceptsAll}`, color: '#9B6ED4' },
              { label: 'GATES CLOSED',  value: cleared.length,    suffix: `/ ${sp.length}`,        color: '#4ADE80' },
              { label: 'DAY STREAK',     value: streak,            suffix: streak === 1 ? 'day' : 'days', color: '#F59E0B' },
            ].map(stat => (
              <div key={stat.label} className="dash-arena-stat" style={{ '--stat-color': stat.color }}>
                <div className="dash-arena-stat__value">{stat.value}</div>
                <div className="dash-arena-stat__suffix">{stat.suffix}</div>
                <div className="dash-arena-stat__label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ── Active hunter path ── */}
          {activePath ? (
            <div
              className="dash-active-path"
              style={{ '--path-color': activePath.color, '--progress-pct': `${activePath.overallPercentage ?? 0}%` }}
              onClick={() => { switchView('paths'); openRoadmapPanel(activePath.id) }}>
              <div className="dash-active-path__row">
                <span className="dash-active-path__icon">{activePath.icon}</span>
                <div className="dash-flex-1">
                  <div className="dash-active-path__title">{activePath.title}</div>
                  <div className="dash-active-path__label">ACTIVE HUNTER PATH</div>
                </div>
                <span className="dash-active-path__pct">{activePath.overallPercentage ?? 0}%</span>
              </div>
              <div className="dash-active-path__track">
                <div className="dash-active-path__fill" />
              </div>
            </div>
          ) : (
            <div className="dash-no-path" onClick={() => switchView('paths')}>
              <div className="dash-no-path__label">NO ACTIVE PATH</div>
              <div className="dash-no-path__cta">→ Go to Hunter Path to Start Hunting </div>
            </div>
          )}

          {/* ── In-progress gates ── */}
          {inProgress.length > 0 && (
            <div>
              <div className="dash-active-hunts__label">ACTIVE HUNTS</div>
              <div className="dash-active-hunts">
                {inProgress.map(s => {
                  const allLearned = s.percentage >= 100
                  return (
                    <div key={s.subjectId} className="dash-hunt-item-wrap">
                      <div
                        className={`dash-hunt-item ${allLearned ? 'dash-hunt-item--ready' : 'dash-hunt-item--active'}`}
                        style={{ '--progress-pct': `${s.percentage}%` }}
                        onClick={() => openSubjectPanel(s.subjectId)}>
                        <span className="dash-hunt-item__icon">{s.icon}</span>
                        <div className="dash-flex-1">
                          <div className="dash-hunt-item__title">{s.title}</div>
                          {allLearned ? (
                            <div className="dash-hunt-item__learned">SKILLS LEARNED</div>
                          ) : (
                            <div className="dash-hunt-item__progress">
                              <div className="dash-progress-track dash-progress-track--sm dash-flex-1">
                                <div className="dash-progress-fill" style={{ '--accent': '#9B6ED4' }} />
                              </div>
                              <span className="dash-hunt-item__pct">{s.percentage}%</span>
                            </div>
                          )}
                        </div>
                        {allLearned ? (
                          <button
                            className="dash-hunt-test-btn"
                            onClick={e => { e.stopPropagation(); startQuiz('subject', s.subjectId, s.title, s.icon) }}
                          >
                            <Trophy size={10} /> TAKE FINAL TEST
                          </button>
                        ) : (
                          <span className="dash-hunt-badge">HUNT</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}


          {/* ── Cleared gates summary ── */}
          {cleared.length > 0 && (
            <div className="dash-cleared-tags">
              <span className="dash-cleared-tags__label">CLEARED:</span>
              {cleared.map(s => (
                <span key={s.subjectId} className="dash-cleared-tag">
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
          <div className="dash-search-wrap dash-search-wrap--gates">
            <Search size={13} className="dash-search-icon" />
            <input className="form-input dash-search-input"
              placeholder="Scout gates…" value={gateSearch} onChange={e => setGateSearch(e.target.value)} />
          </div>
          {!gatesLoaded ? (
            <div className="flex-center dash-flex-center-fill--h200"><DungeonPortalLoader panel height={200} /></div>
          ) : filteredSubjects.length === 0 ? (
            <div className="dash-no-match">NO GATES MATCH</div>
          ) : (
            <div className="sl-cards-grid dash-cards-grid-2">
              {filteredSubjects.map((s) => <GateCard key={s.id} s={s} />)}
            </div>
          )}
        </>
      )
    }

    if (activeView === 'paths') {
      return (
        <>
          <div className="sl-panel-title">Hunter Paths</div>
          <div className="dash-search-wrap dash-search-wrap--paths">
            <Search size={13} className="dash-search-icon" />
            <input className="form-input dash-search-input"
              placeholder="Scout paths…" value={pathSearch} onChange={e => setPathSearch(e.target.value)} />
          </div>
          {!pathsLoaded ? (
            <div className="flex-center dash-flex-center-fill--h200"><DungeonPortalLoader panel height={200} /></div>
          ) : (
            <div className="sl-cards-grid dash-cards-grid-2">
              {filteredRoadmaps.map(r => {
                const pct = r.overallPercentage ?? 0
                const isActive   = r.enrolled && !r.paused
                const isPaused   = r.enrolled && r.paused
                const isComplete = r.allSubjectsDone
                const pathColor  = r.color
                return (
                  <div
                    key={r.id}
                    className={`sl-gate-card dash-path-card${selectedRoadmapId === r.id ? ' is-selected' : ''}`}
                    style={{
                      '--path-color': pathColor,
                      '--path-icon-bg': `${pathColor}22`,
                      '--path-status-border': `${pathColor}40`,
                      '--progress-pct': `${pct}%`,
                      '--gate-bar-bg': isComplete ? pathColor : `${pathColor}88`,
                      '--gate-status-color': isComplete ? pathColor : isPaused ? 'var(--text-muted)' : isActive ? `${pathColor}BB` : '#0cbd09',
                    }}
                    onClick={() => openRoadmapPanel(r.id)}>

                    {/* Title row */}
                    <div className="dash-path-card__top">
                      <div className="dash-path-card__title-row">
                        <div className="dash-path-card__icon-wrap">{r.icon}</div>
                        <div className="sl-gate-title dash-path-card__title">{r.title}</div>
                      </div>
                      <div className="dash-path-card__actions">
                        {r.enrolled && (
                          <span className={`dash-path-card__status ${isPaused ? 'is-paused' : 'is-active'}`}>
                            {isPaused ? 'PAUSED' : 'ACTIVE'}
                          </span>
                        )}
                        <button
                          className="dash-gate-card__info-btn"
                          style={{ '--gate-color': pathColor }}
                          onClick={async e => {
                            e.stopPropagation()
                            // If rich data already loaded, use instantly — no network call
                            const hasRich = r.overview || (r.roleTargets && r.roleTargets.length > 0)
                              || (r.outcomes && r.outcomes.length > 0)
                            if (hasRich) { setAboutRoadmap(r); return }
                            // First time only: fetch detail to get rich fields
                            const fresh = await getRoadmap(r.id).catch(() => null)
                            setAboutRoadmap(fresh ? fresh.data : r)
                          }}
                          title="About this path"
                        >
                          <Info size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Role target */}
                    <div className="dash-path-card__desc">
                      {r.roleTarget}
                    </div>

                    {/* Meta */}
                    <div className="sl-gate-meta">{r.subjectCount ?? '?'} gates · {r.estimatedWeeks}w</div>

                    {/* Progress bar */}
                    {isActive && pct > 0 && (
                      <div className="sl-gate-bar-track dash-path-card__bar">
                        <div className="sl-gate-bar-fill dash-gate-bar-fill--dynamic" />
                      </div>
                    )}

                    {/* Status line */}
                    <div className="sl-gate-status dash-gate-status--dynamic">
                      {isComplete ? 'ALL GATES CLEARED' : isPaused ? 'PATH PAUSED' : isActive ? (pct > 0 ? `IN PROGRESS ${pct}%` : 'PATH ACTIVE') : 'BEGIN YOUR PATH'}
                    </div>

                    {/* Final test button */}
                    {isComplete && (
                      <button
                        className="dash-gate-final-btn dash-gate-final-btn--sm"
                        onClick={e => { e.stopPropagation(); startQuiz('roadmap', r.id, r.title, r.icon) }}
                      >
                        <Trophy size={12} /> TAKE PATH FINAL TEST
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )
    }
  }

  if (loading) return <SystemAwakeningLoader subtitle="SKILL ARENA" />

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
        <button
          className={`sl-mob-menu-btn dash-mob-menu-btn ${mobileMenuOpen ? 'is-open' : 'is-closed'}`}
          onClick={() => setMobileMenuOpen(o => !o)}>
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
              onClick={() => item.href ? navigate(item.href) : switchView(item.view)}>
              <span className="sl-nav-link__label">{item.label}</span>
              {item.sub && <span className="sl-nav-link__sub">{item.sub}</span>}
            </button>
          ))}
        </div>

        {/* Desktop right */}
        <div className="sl-dash-nav-right">
          <button className="theme-icon-btn" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <div className="sl-nav-xp">
            <span className="sl-nav-xp-label">XP → LVL {level}</span>
            <div className="xp-bar-track dash-nav-xp-bar">
              <div
                className="xp-bar-fill dash-nav-xp-fill"
                style={{ '--progress-pct': `${rank.progress}%`, '--rank-color': rank.color }}
              />
            </div>
          </div>
          <span className={`rank-badge dash-nav-rank-badge ${rank.cls}`}>{rank.label}-RANK</span>
          <div
            className="sl-nav-avatar dash-nav-avatar--dynamic"
            style={{ '--avatar-bg': user?.avatarColor || '#9B6ED4', '--rank-color': rank.color }}
            onClick={handleAvatarClick}>{initials}</div>
        </div>

        {/* Mobile: theme toggle + avatar on RIGHT */}
        <button className="sl-mob-theme-btn dash-mob-theme-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <div
          className="sl-mob-avatar dash-nav-avatar--dynamic"
          style={{ '--avatar-bg': user?.avatarColor || '#9B6ED4', '--rank-color': rank.color }}
          onClick={handleAvatarClick}>{initials}</div>
      </nav>

      {/* ══ MOBILE NAV DROPDOWN (slides down from LEFT-anchored hamburger) ══ */}
      {mobileMenuOpen && (
        <>
          <div className="dash-mob-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />
          <div className="dash-mob-nav-drawer">
            <div className="dash-mob-nav-drawer__header">
              [ SELECT SECTION ]
            </div>
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                className={`dash-mob-nav-item${activeView === item.view ? ' is-active' : ''}`}
                onClick={() => { item.href ? navigate(item.href) : switchView(item.view); setMobileMenuOpen(false) }}>
                <span className="dash-mob-nav-item__icon">
                  {item.view === 'arena' ? '⚔️' : item.view === 'gates' ? '🚪' : item.view === 'paths' ? '🗺️' : '💻'}
                </span>
                <span className="dash-flex-spacer dash-mob-nav-item__text">
                  <span className="dash-mob-nav-item__label">{item.label}</span>
                  {item.sub && <span className="dash-mob-nav-item__sub">{item.sub}</span>}
                </span>
                {activeView === item.view && (
                  <span className="dash-mob-nav-item__now">NOW</span>
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
              ? <>Skill detail loaded — complete the Skill trial <span className="sl-alert-plain">(quiz)</span> to master this skill.</>
              : activeView === 'gates'
              ? <>Scout mode active — <strong>{filteredSubjects.length} gates</strong> <span className="sl-alert-plain">(subjects)</span> detected.</>
              : activeView === 'paths'
              ? <>Hunter path registry — <strong>{allRoadmaps.length} paths</strong> <span className="sl-alert-plain">(career roadmaps)</span> available.</>
              : <>Welcome, Hunter <strong>{user?.fullName?.split(' ')[0]}</strong>. Choose a dungeon gate <span className="sl-alert-plain">(subject)</span> to begin.</>}
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
            <div className="sl-panel dash-panel-scroll">
              <ConceptInlinePanel
                conceptId={selectedConceptId}
                navList={conceptNavList}
                onClose={handleConceptClose}
                navigate={navigate}
                startQuiz={startQuiz}
                subjectTitle={subjects.find(s => s.id === selectedSubjectId)?.title || ''}
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
                const statColor = stat.statColor
                return (
                  <div key={stat.key} className="sl-stat-row">
                    {/* Header row: name + rank badge + pct */}
                    <div className="dash-stat-row-header">
                      <span className="sl-stat-name">{stat.label}</span>
                      {!isUntouched && (
                        <span className="sl-stat-value dash-stat-value--dynamic" style={{ '--stat-color': statColor }}>{stat.pct}%</span>
                      )}
                    </div>

                    {/* Dynamic subject tags — cleared ones highlighted */}
                    <div className="sl-stat-tags dash-stat-tags">
                      {isUntouched ? (
                        <span className="dash-stat-hint">{stat.hint}</span>
                      ) : stat.cleared.length > 0 ? (
                        <span className="dash-stat-cleared" style={{ '--stat-color': statColor }}>{stat.cleared.slice(0, 2).join(' · ')}{stat.cleared.length > 2 ? ` +${stat.cleared.length - 2}` : ''}</span>
                      ) : stat.inProgress.length > 0 ? (
                        <span className="dash-stat-progress">{stat.inProgress[0].title}</span>
                      ) : (
                        <span className="dash-stat-hint">{stat.hint}</span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div
                      className="sl-stat-track dash-stat-track--dynamic"
                      style={{ '--track-mb': isUntouched ? 0 : '0.2rem' }}
                    >
                      <div
                        className="sl-stat-fill dash-stat-fill--dynamic"
                        style={{
                          '--progress-pct': `${isUntouched ? 0 : stat.pct}%`,
                          '--stat-color': statColor,
                          '--stat-color-50': `${statColor}50`,
                          '--stat-glow': stat.pct > 0 ? `0 0 6px ${statColor}55` : 'none',
                        }}
                      />
                    </div>

                    {/* Concepts count + next gate nudge */}
                    {!isUntouched && (
                      <div className="dash-stat-meta">
                        <span className="dash-stat-count">
                          {stat.totalDone}/{stat.totalAll} skills
                        </span>
                        {stat.next && stat.pct < 100 && (
                          <span
                            className="dash-stat-next"
                            style={{ '--stat-color': statColor }}
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
              <div className="dash-badges-section">
                <div className="dash-badges-section__title">
                  — BADGES —
                </div>
                {!hunterStats ? (
                  <div className="dash-badges-loading">
                    {[0, 1, 2].map(i => <div key={i} className="dash-badges-loading__dot" />)}
                  </div>
                ) : (hunterStats.badges.length === 0 && (hunterStats.roadmapBadges ?? []).length === 0) ? (
                  <div className="dash-badges-empty">
                    <div className="dash-badges-empty__icon">🔒</div>
                    <div className="dash-badges-empty__text">NO BADGES YET</div>
                  </div>
                ) : (
                  <div className="dash-badges-list">
                    {[...hunterStats.badges, ...(hunterStats.roadmapBadges ?? [])].map(b => {
                      const key = b.subjectId ?? b.roadmapId
                      const scorePct = b.total > 0 ? Math.round((b.score / b.total) * 100) : 0
                      const isRoadmap = b.type === 'ROADMAP'
                      const badgeColor = b.color || '#9B6ED4'
                      const badgeLabel = isRoadmap
                        ? (b.badge === 'JOB_READY' ? 'JOB READY' : 'INTERVIEW READY')
                        : null
                      return (
                        <div
                          key={key}
                          className="dash-badge-item"
                          style={{
                            '--badge-bg': `${badgeColor}0D`,
                            '--badge-border': `${badgeColor}25`,
                            '--badge-color': badgeColor,
                            '--progress-pct': `${scorePct}%`,
                          }}>
                          <div className="dash-badge-item__icon">{b.icon || (isRoadmap ? '🗺️' : '📚')}</div>
                          <div className="dash-flex-1">
                            <div className="dash-badge-item__title">{b.title}</div>
                            {isRoadmap ? (
                              <div className={`dash-badge-item__roadmap-label ${b.badge === 'JOB_READY' ? 'is-job-ready' : 'is-interview-ready'}`}>{badgeLabel}</div>
                            ) : (
                              <div className="dash-badge-item__bar-track">
                                <div className="dash-badge-item__bar-fill" />
                              </div>
                            )}
                          </div>
                          <span className="dash-badge-item__score">{b.score}/{b.total}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ═ MIDDLE: gate views ═ */}
            <div className="sl-panel dash-panel-scroll">
              {renderMiddle()}
            </div>

            {/* ═ RIGHT: DAILY QUESTS + RANK — hidden on mobile (access via avatar) ═ */}
            <div className="sl-dash-right-panel dash-right-panel">
              <div className="sl-panel">
                <div className="sl-panel-title">Daily Quests</div>
                {DAILY_QUESTS.map(q => (
                  <div key={q.id} className="sl-quest-item">
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
      {aboutRoadmap && (
        <AboutRoadmapModal roadmap={aboutRoadmap} onClose={() => setAboutRoadmap(null)} />
      )}
      {aboutGate && (
        <AboutGateModal subject={aboutGate} onClose={() => setAboutGate(null)} />
      )}
    </div>
  )
}
