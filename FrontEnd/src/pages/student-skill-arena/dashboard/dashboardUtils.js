export const NAV_ITEMS = [
  { label: 'OVERVIEW',     sub: 'Dashboard',       view: 'arena' },
  { label: 'DUNGEON GATE', sub: 'Subjects',        view: 'gates' },
  { label: 'HUNTER PATH',  sub: 'Career Roadmaps', view: 'paths' },
  { label: 'MISSIONS',     sub: 'Build Projects',  view: 'missions', href: '/missions' },
]

export const DAILY_QUESTS = [
  { id: 'q1', label: 'Complete 1 concept', xp: 50 },
  { id: 'q2', label: 'Study for 20 min',   xp: 30 },
]

// Re-exported from the shared source so existing importers of this module are unaffected.
export { RANK_LADDER } from '../../../constants/ranks'

export const STAT_DEFS = [
  { key: 'INT', label: 'INTELLIGENCE', domain: 'Backend',         color: '#9B6ED4', lightColor: '#7C5DBB', hint: 'Java · Python · Spring · Node', match: t => /java|spring|python|oop|data.struct|mongodb|django|node|backend/.test(t) },
  { key: 'AGI', label: 'AGILITY',      domain: 'Frontend',        color: '#4ADE80', lightColor: '#15803D', hint: 'HTML · CSS · React · JS',       match: t => /react|javascript|html|css|frontend/.test(t) },
  { key: 'END', label: 'ENDURANCE',    domain: 'Databases & Ops', color: '#60A5FA', lightColor: '#1D4ED8', hint: 'SQL · Docker · Git · Deploy',   match: t => /sql|postgres|mysql|docker|git|deploy|database/.test(t) },
  { key: 'PER', label: 'PERCEPTION',   domain: 'Problem Solving', color: '#F59E0B', lightColor: '#B45309', hint: 'APIs · Security · Algorithms',  match: t => /security|jwt|rest|api|design|algorithm|boot|express/.test(t) },
]

const _SR_D = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#4ADE80', E: '#888888' }
const _SR_L = { S: '#DC2626', A: '#B45309', B: '#7C5DBB', C: '#1D4ED8', D: '#15803D', E: '#6B7FA3' }
const _sr = () => document.documentElement.getAttribute('data-theme') === 'light' ? _SR_L : _SR_D

export const statRank = (pct) => {
  const r = _sr()
  if (pct >= 95) return { label: 'S', color: r.S }
  if (pct >= 80) return { label: 'A', color: r.A }
  if (pct >= 60) return { label: 'B', color: r.B }
  if (pct >= 40) return { label: 'C', color: r.C }
  if (pct >= 20) return { label: 'D', color: r.D }
  return              { label: 'E', color: r.E }
}

export const gateRankByOrder = (idx) => {
  const r = _sr()
  if (idx <= 1) return { label: 'D', cls: 'rank-d', color: r.D }
  if (idx <= 3) return { label: 'C', cls: 'rank-c', color: r.C }
  if (idx <= 6) return { label: 'B', cls: 'rank-b', color: r.B }
  if (idx <= 9) return { label: 'A', cls: 'rank-a', color: r.A }
  return            { label: 'S', cls: 'rank-s', color: r.S }
}

export const RANK_META = {
  S: { cls: 'rank-s', color: '#EF4444' },
  A: { cls: 'rank-a', color: '#F59E0B' },
  B: { cls: 'rank-b', color: '#9B6ED4' },
  C: { cls: 'rank-c', color: '#60A5FA' },
  D: { cls: 'rank-d', color: '#4ADE80' },
  E: { cls: 'rank-e', color: '#888888' },
}

export const subjectGateRank = (s) => {
  const r = RANK_META[s?.rank] || RANK_META['E']
  return { label: s?.rank || 'E', ...r }
}

export const computeStats = (sp = []) =>
  STAT_DEFS.map(def => {
    const matched    = sp.filter(s => def.match(s.title.toLowerCase()))
    const totalDone  = matched.reduce((a, s) => a + (s.completedConcepts ?? 0), 0)
    const totalAll   = matched.reduce((a, s) => a + (s.totalConcepts ?? 0), 0)
    const pct        = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0
    const cleared    = matched.filter(s => (s.percentage ?? 0) >= 100).map(s => s.title)
    const inProgress = matched.filter(s => (s.percentage ?? 0) > 0 && (s.percentage ?? 0) < 100)
    const next       = matched.find(s => (s.percentage ?? 0) === 0)
    const sRank      = statRank(pct)
    const light      = document.documentElement.getAttribute('data-theme') === 'light'
    const statColor  = light ? def.lightColor : def.color
    return { ...def, pct, totalDone, totalAll, cleared, inProgress, next, sRank, statColor }
  })

const questKey = (userId) => `sl_quests_${userId}`

export const loadQuestState = (userId) => {
  try {
    const s = localStorage.getItem(questKey(userId))
    if (!s) return {}
    const { date, state } = JSON.parse(s)
    if (date !== new Date().toDateString()) return {}
    return state
  } catch { return {} }
}

export const saveQuestState = (state, userId) =>
  localStorage.setItem(questKey(userId), JSON.stringify({ date: new Date().toDateString(), state }))
