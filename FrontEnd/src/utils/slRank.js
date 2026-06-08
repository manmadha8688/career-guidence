// ── Rank lookup from XP (used by Navbar/QuizPage which don't have summary) ──

export const calcXp = (completedConcepts) => (completedConcepts || 0) * 50

const isLight = () => document.documentElement.getAttribute('data-theme') === 'light'

const DARK = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#4ADE80', E: '#888888' }
const LIGHT = { S: '#DC2626', A: '#B45309', B: '#7C5DBB', C: '#1D4ED8', D: '#15803D', E: '#6B7FA3' }
const rc = () => isLight() ? LIGHT : DARK

export const getRank = (xp = 0) => {
  const r = rc()
  if (xp >= 10000) return { label: 'S', cls: 'rank-s', color: r.S, next: null,  min: 10000, progress: 100 }
  if (xp >= 6000)  return { label: 'A', cls: 'rank-a', color: r.A, next: 10000, min: 6000,  progress: Math.round((xp - 6000)  / 4000 * 100) }
  if (xp >= 3000)  return { label: 'B', cls: 'rank-b', color: r.B, next: 6000,  min: 3000,  progress: Math.round((xp - 3000)  / 3000 * 100) }
  if (xp >= 1500)  return { label: 'C', cls: 'rank-c', color: r.C, next: 3000,  min: 1500,  progress: Math.round((xp - 1500)  / 1500 * 100) }
  if (xp >= 500)   return { label: 'D', cls: 'rank-d', color: r.D, next: 1500,  min: 500,   progress: Math.round((xp - 500)   / 1000 * 100) }
  return               { label: 'E', cls: 'rank-e', color: r.E, next: 500,   min: 0,     progress: Math.round(xp / 500 * 100) }
}

// ── localStorage fallback (for pages that haven't loaded summary yet) ──
export const getStoredXp   = () => parseInt(localStorage.getItem('sl_xp') || '0', 10)
export const setStoredXp   = (xp) => localStorage.setItem('sl_xp', String(xp))
export const saveCompleted = (n) => setStoredXp(calcXp(n))

export const getGateRank = (pct, hasContent) => {
  const r = rc()
  if (!hasContent) return { label: 'E', cls: 'rank-e', color: '#555555', status: 'GATE SEALED' }
  if (pct >= 100)  return { label: 'S', cls: 'rank-s', color: r.S, status: 'CLEARED' }
  if (pct >= 67)   return { label: 'B', cls: 'rank-b', color: r.B, status: 'ACTIVE HUNT' }
  if (pct >= 34)   return { label: 'C', cls: 'rank-c', color: r.C, status: 'ACTIVE HUNT' }
  if (pct > 0)     return { label: 'D', cls: 'rank-d', color: r.D, status: 'ACTIVE HUNT' }
  return               { label: 'E', cls: 'rank-e', color: r.E, status: 'NOT ENTERED' }
}
