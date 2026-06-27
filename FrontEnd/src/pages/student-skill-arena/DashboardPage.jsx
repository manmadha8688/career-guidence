import { useState, useEffect, useRef, useMemo } from 'react'
import { TEST_DELAY_MS, PAGE_MIN_MS } from '../../components/loaders/_config'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ReportButton from '../../components/ReportButton'
import SystemAwakeningLoader from '../../components/loaders/SystemAwakeningLoader'
import DungeonPortalLoader from '../../components/loaders/DungeonPortalLoader'
import { CheckCircle, Search, Brain, Trophy, X, Clock, ChevronLeft, Info, Menu, Sun, Moon } from 'lucide-react'
import {
  getProgressSummary, getRoadmap, getRoadmapStatus, getBulkSubjectStatus,
  getSubjects, getSubject, getConcept, getQuizStatus,
  getRoadmaps, enrollRoadmap, pauseRoadmap, resumeRoadmap,
  getHunterStats, clearApiCache,
} from '../../api/api'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { getRank } from '../../utils/slRank'
import ProgressBar from '../../components/ProgressBar'
import toast from 'react-hot-toast'

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

// ─── Constants ────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'SKILL ARENA',  view: 'arena' },
  { label: 'DUNGEON GATE', view: 'gates' },
  { label: 'HUNTER PATH',  view: 'paths' },
  { label: 'CHALLENGES',   view: null, href: '/problem-solving' },
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
  { key: 'INT', label: 'INTELLIGENCE', domain: 'Backend',          color: '#9B6ED4', lightColor: '#7C5DBB', hint: 'Java · Python · Spring · Node', match: t => /java|spring|python|oop|data.struct|mongodb|django|node|backend/.test(t) },
  { key: 'AGI', label: 'AGILITY',      domain: 'Frontend',         color: '#4ADE80', lightColor: '#15803D', hint: 'HTML · CSS · React · JS',       match: t => /react|javascript|html|css|frontend/.test(t) },
  { key: 'END', label: 'ENDURANCE',    domain: 'Databases & Ops',  color: '#60A5FA', lightColor: '#1D4ED8', hint: 'SQL · Docker · Git · Deploy',   match: t => /sql|postgres|mysql|docker|git|deploy|database/.test(t) },
  { key: 'PER', label: 'PERCEPTION',   domain: 'Problem Solving',  color: '#F59E0B', lightColor: '#B45309', hint: 'APIs · Security · Algorithms',  match: t => /security|jwt|rest|api|design|algorithm|boot|express/.test(t) },
]

const _SR_D = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#4ADE80', E: '#888888' }
const _SR_L = { S: '#DC2626', A: '#B45309', B: '#7C5DBB', C: '#1D4ED8', D: '#15803D', E: '#6B7FA3' }
const _sr   = () => document.documentElement.getAttribute('data-theme') === 'light' ? _SR_L : _SR_D

// Stat rank from 0-100 pct — independent per category
const statRank = (pct) => {
  const r = _sr()
  if (pct >= 95) return { label: 'S', color: r.S }
  if (pct >= 80) return { label: 'A', color: r.A }
  if (pct >= 60) return { label: 'B', color: r.B }
  if (pct >= 40) return { label: 'C', color: r.C }
  if (pct >= 20) return { label: 'D', color: r.D }
  return              { label: 'E', color: r.E }
}

const GATE_FILTERS = ['All GATES', 'ENTERED', 'CLOSED', 'Not ENTERED']

// ─── Helpers ──────────────────────────────────────────────
const gateRankByOrder = (idx) => {
  const r = _sr()
  if (idx <= 1) return { label: 'D', cls: 'rank-d', color: r.D }
  if (idx <= 3) return { label: 'C', cls: 'rank-c', color: r.C }
  if (idx <= 6) return { label: 'B', cls: 'rank-b', color: r.B }
  if (idx <= 9) return { label: 'A', cls: 'rank-a', color: r.A }
  return            { label: 'S', cls: 'rank-s', color: r.S }
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
    const light     = document.documentElement.getAttribute('data-theme') === 'light'
    const statColor = light ? def.lightColor : def.color
    return { ...def, pct, totalDone, totalAll, cleared, inProgress, next, sRank, statColor }
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
// ─── Main Component ───────────────────────────────────────
export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [summary, setSummary]         = useState(null)
  const [activeRoadmap, setActiveRoadmap] = useState(null)
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
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
    getHunterStats().then(r => setHunterStats(r.data)).catch(() => {})
  }, []) // eslint-disable-line

  // Re-fetch everything when a concept is cleared (dispatched from QuizResultPage)
  useEffect(() => {
    const refresh = () => {
      clearApiCache('progressSummary', 'hunterStats', 'subjects', 'subject:*', 'concept:*', 'quizStatus:*', 'roadmapStatus:*', 'enrolledRoadmaps')
      getProgressSummary().then(s => {
        setSummary(s.data)
        syncQuestsFromSummary(s.data, user?.id)
      }).catch(() => {})
      getHunterStats().then(r => setHunterStats(r.data)).catch(() => {})
      setPanelRefreshKey(k => k + 1)
      // Reload gate cards + badge statuses directly (bypasses gatesLoaded guard)
      getSubjects().then(r => {
        setSubjects(r.data)
        setTimeout(() => setGatesLoaded(true), TEST_DELAY_MS)
        const ids = r.data.map(s => s.id)
        if (ids.length > 0) {
          getBulkSubjectStatus(ids)
            .then(res => setQuizStatuses(res.data))
            .catch(() => {})
        }
      }).catch(() => {})
      // Reload roadmap cards with fresh allSubjectsDone
      getRoadmaps().then(r => { setAllRoadmaps(r.data); setTimeout(() => setPathsLoaded(true), TEST_DELAY_MS) }).catch(() => {})
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
      setTimeout(() => setGatesLoaded(true), TEST_DELAY_MS)
      const ids = r.data.map(s => s.id)
      if (ids.length > 0) {
        getBulkSubjectStatus(ids)
          .then(res => setQuizStatuses(res.data))
          .catch(() => {})
      }
    })
  }

  const loadPaths = () => {
    if (pathsLoaded) return
    getRoadmaps().then(r => { setAllRoadmaps(r.data); setTimeout(() => setPathsLoaded(true), TEST_DELAY_MS) })
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
  const stats          = useMemo(() => computeStats(summary?.subjectProgress), [summary])
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
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.25rem', fontWeight: 900, color: stat.statColor, lineHeight: 1 }}>{stat.value}</div>
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
            <div className="flex-center" style={{ height: '200px' }}><DungeonPortalLoader panel height={200} /></div>
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
            <div className="flex-center" style={{ height: '200px' }}><DungeonPortalLoader panel height={200} /></div>
          ) : (
            <div className="sl-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
              {filteredRoadmaps.map(r => {
                const pct = r.overallPercentage ?? 0
                const isActive   = r.enrolled && !r.paused
                const isPaused   = r.enrolled && r.paused
                const isComplete = r.allSubjectsDone
                return (
                  <div key={r.id} className="sl-gate-card"
                    style={{ cursor: 'pointer', borderTop: `3px solid ${r.color}`, outline: selectedRoadmapId === r.id ? `1px solid ${r.color}` : 'none' }}
                    onClick={() => openRoadmapPanel(r.id)}>

                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.375rem', marginBottom: '0.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: 0 }}>
                        <div style={{ width: 26, height: 26, background: r.color + '22', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>{r.icon}</div>
                        <div className="sl-gate-title" style={{ marginBottom: 0, fontSize: '0.8rem' }}>{r.title}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0, marginTop: 2 }}>
                        {r.enrolled && (
                          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.05em', color: isPaused ? 'var(--text-muted)' : r.color, background: isPaused ? 'rgba(136,136,136,0.1)' : r.color + '18', border: `1px solid ${isPaused ? 'var(--border)' : r.color + '40'}`, padding: '0.1rem 0.3rem', borderRadius: 3 }}>
                            {isPaused ? 'PAUSED' : 'ACTIVE'}
                          </span>
                        )}
                        <button
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
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.1rem', display: 'flex', alignItems: 'center', borderRadius: 3, transition: 'color 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.color = r.color}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                          title="About this path"
                        >
                          <Info size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Role target */}
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontStyle: 'italic' }}>
                      {r.roleTarget}
                    </div>

                    {/* Meta */}
                    <div className="sl-gate-meta">{r.subjectCount ?? '?'} gates · {r.estimatedWeeks}w</div>

                    {/* Progress bar */}
                    {isActive && pct > 0 && (
                      <div className="sl-gate-bar-track" style={{ marginTop: '0.3rem' }}>
                        <div className="sl-gate-bar-fill" style={{ width: `${pct}%`, background: isComplete ? r.color : `${r.color}88` }} />
                      </div>
                    )}

                    {/* Status line */}
                    <div className="sl-gate-status" style={{ color: isComplete ? r.color : isPaused ? 'var(--text-muted)' : isActive ? `${r.color}BB` : '#0cbd09' }}>
                      {isComplete ? 'ALL GATES CLEARED' : isPaused ? 'PATH PAUSED' : isActive ? (pct > 0 ? `IN PROGRESS ${pct}%` : 'PATH ACTIVE') : 'BEGIN YOUR PATH'}
                    </div>

                    {/* Final test button */}
                    {isComplete && (
                      <button
                        onClick={e => { e.stopPropagation(); startQuiz('roadmap', r.id, r.title, r.icon) }}
                        style={{ width: '100%', marginTop: '0.25rem', padding: '0.45rem 0.75rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.08))', border: '1.5px solid rgba(245,158,11,0.5)', borderRadius: 6, cursor: 'pointer', color: '#F59E0B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
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
              onClick={() => item.href ? navigate(item.href) : switchView(item.view)}>
              {item.label}
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
            <div className="xp-bar-track" style={{ height: 4, width: 84 }}>
              <div className="xp-bar-fill" style={{ width: `${rank.progress}%`, background: `linear-gradient(90deg, ${rank.color}88, ${rank.color})` }} />
            </div>
          </div>
          <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.72rem', padding: '0.25rem 0.625rem' }}>{rank.label}-RANK</span>
          <div className="sl-nav-avatar" style={{ background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}` }}
            onClick={handleAvatarClick}>{initials}</div>
        </div>

        {/* Mobile: theme toggle + avatar on RIGHT */}
        <button className="sl-mob-theme-btn" onClick={toggleTheme}
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'var(--text-secondary)', width: 34, height: 34, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <div className="sl-mob-avatar" style={{ background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}` }}
          onClick={handleAvatarClick}>{initials}</div>
      </nav>

      {/* ══ MOBILE NAV DROPDOWN (slides down from LEFT-anchored hamburger) ══ */}
      {mobileMenuOpen && (
        <>
          <div onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'fixed', top: 56, left: 0, width: 260, bottom: 0, zIndex: 151, background: 'var(--bg-card)', borderRight: '1px solid rgba(155,110,212,0.3)', boxShadow: '8px 0 32px rgba(0,0,0,0.6)', animation: 'slideIn 0.2s ease', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0.875rem 1.25rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.14em', color: '#9B6ED4', borderBottom: '1px solid rgba(155,110,212,0.12)', background: 'rgba(155,110,212,0.05)' }}>
              [ SELECT SECTION ]
            </div>
            {NAV_ITEMS.map(item => (
              <button key={item.label}
                onClick={() => { item.href ? navigate(item.href) : switchView(item.view); setMobileMenuOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', width: '100%', padding: '1.125rem 1.25rem', background: activeView === item.view ? 'rgba(155,110,212,0.1)' : 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)', borderLeft: activeView === item.view ? '3px solid #9B6ED4' : '3px solid transparent', color: activeView === item.view ? '#B48AE8' : 'var(--text-secondary)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1.0625rem', letterSpacing: '0.08em', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s', textTransform: 'uppercase' }}>
                <span style={{ fontSize: '1.25rem', width: 24, textAlign: 'center', flexShrink: 0 }}>
                  {item.view === 'arena' ? '⚔️' : item.view === 'gates' ? '🚪' : item.view === 'paths' ? '🗺️' : '💻'}
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
                return (
                  <div key={stat.key} className="sl-stat-row">
                    {/* Header row: name + rank badge + pct */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                      <span className="sl-stat-name">{stat.label}</span>
                      {!isUntouched && (
                        <span className="sl-stat-value" style={{ color: stat.statColor }}>{stat.pct}%</span>
                      )}
                    </div>

                    {/* Dynamic subject tags — cleared ones highlighted */}
                    <div className="sl-stat-tags" style={{ lineHeight: 1.5 }}>
                      {isUntouched ? (
                        <span style={{ color: '#404860', fontSize: '0.68rem' }}>{stat.hint}</span>
                      ) : stat.cleared.length > 0 ? (
                        <span style={{ color: stat.statColor, opacity: 0.85 }}>{stat.cleared.slice(0, 2).join(' · ')}{stat.cleared.length > 2 ? ` +${stat.cleared.length - 2}` : ''}</span>
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
                        background: `linear-gradient(90deg, ${stat.statColor}50, ${stat.statColor})`,
                        boxShadow: stat.pct > 0 ? `0 0 6px ${stat.statColor}55` : 'none',
                      }} />
                    </div>

                    {/* Concepts count + next gate nudge */}
                    {!isUntouched && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.56rem', color: '#404860', letterSpacing: '0.04em' }}>
                          {stat.totalDone}/{stat.totalAll} skills
                        </span>
                        {stat.next && stat.pct < 100 && (
                          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.54rem', color: stat.statColor, opacity: 0.7, letterSpacing: '0.04em', cursor: 'pointer' }}
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
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '0.75rem', alignItems: 'center' }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(155,110,212,0.6)', animation: `hlSectionDot 1s ${i*0.2}s ease-in-out infinite` }} />)}
                  </div>
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
