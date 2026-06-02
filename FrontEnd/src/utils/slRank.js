// ── Rank lookup from XP (used by Navbar/QuizPage which don't have summary) ──

export const calcXp = (completedConcepts) => (completedConcepts || 0) * 50


export const getRank = (xp = 0) => {
  if (xp >= 10000) return { label: 'S', cls: 'rank-s', color: '#EF4444', next: null,  min: 10000, progress: 100 }
  if (xp >= 6000)  return { label: 'A', cls: 'rank-a', color: '#F59E0B', next: 10000, min: 6000,  progress: Math.round((xp - 6000)  / 4000 * 100) }
  if (xp >= 3000)  return { label: 'B', cls: 'rank-b', color: '#9B6ED4', next: 6000,  min: 3000,  progress: Math.round((xp - 3000)  / 3000 * 100) }
  if (xp >= 1500)  return { label: 'C', cls: 'rank-c', color: '#60A5FA', next: 3000,  min: 1500,  progress: Math.round((xp - 1500)  / 1500 * 100) }
  if (xp >= 500)   return { label: 'D', cls: 'rank-d', color: '#4ADE80', next: 1500,  min: 500,   progress: Math.round((xp - 500)   / 1000 * 100) }
  return               { label: 'E', cls: 'rank-e', color: '#888888', next: 500,   min: 0,     progress: Math.round(xp / 500 * 100) }
}

// ── localStorage fallback (for pages that haven't loaded summary yet) ──
export const getStoredXp   = () => parseInt(localStorage.getItem('sl_xp') || '0', 10)
export const setStoredXp   = (xp) => localStorage.setItem('sl_xp', String(xp))
// kept for compat
export const saveCompleted = (n) => setStoredXp(calcXp(n))

export const getGateRank = (pct, hasContent) => {
  if (!hasContent) return { label: 'E', cls: 'rank-e', color: '#555555', status: 'GATE SEALED' }
  if (pct >= 100)  return { label: 'S', cls: 'rank-s', color: '#EF4444', status: 'CLEARED' }
  if (pct >= 67)   return { label: 'B', cls: 'rank-b', color: '#9B6ED4', status: 'ACTIVE HUNT' }
  if (pct >= 34)   return { label: 'C', cls: 'rank-c', color: '#60A5FA', status: 'ACTIVE HUNT' }
  if (pct > 0)     return { label: 'D', cls: 'rank-d', color: '#4ADE80', status: 'ACTIVE HUNT' }
  return               { label: 'E', cls: 'rank-e', color: '#888888', status: 'NOT ENTERED' }
}
