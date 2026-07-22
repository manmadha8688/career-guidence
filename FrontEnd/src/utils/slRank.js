// ── Rank lookup from XP (used by Navbar/QuizPage which don't have summary) ──

import { RANK_LADDER } from '../constants/ranks'

const isLight = () => document.documentElement.getAttribute('data-theme') === 'light'

const DARK = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#4ADE80', E: '#888888' }
const LIGHT = { S: '#DC2626', A: '#B45309', B: '#7C5DBB', C: '#1D4ED8', D: '#15803D', E: '#6B7FA3' }
const rc = () => isLight() ? LIGHT : DARK

export const getRank = (xp = 0) => {
  const r = rc()
  let current = RANK_LADDER[0]
  for (let i = RANK_LADDER.length - 1; i >= 0; i--) {
    if (xp >= RANK_LADDER[i].min) {
      current = RANK_LADDER[i]
      break
    }
  }
  const idx = RANK_LADDER.findIndex((e) => e.letter === current.letter)
  const next = RANK_LADDER[idx + 1] ?? null
  const progress = next
    ? Math.round((xp - current.min) / (next.min - current.min) * 100)
    : 100
  return {
    label: current.letter,
    cls: current.cls,
    color: r[current.letter],
    next: next?.min ?? null,
    min: current.min,
    progress,
  }
}

export const getGateRank = (pct, hasContent) => {
  const r = rc()
  if (!hasContent) return { label: 'E', cls: 'rank-e', color: '#555555', status: 'GATE SEALED' }
  if (pct >= 100)  return { label: 'S', cls: 'rank-s', color: r.S, status: 'CLEARED' }
  if (pct >= 67)   return { label: 'B', cls: 'rank-b', color: r.B, status: 'ACTIVE HUNT' }
  if (pct >= 34)   return { label: 'C', cls: 'rank-c', color: r.C, status: 'ACTIVE HUNT' }
  if (pct > 0)     return { label: 'D', cls: 'rank-d', color: r.D, status: 'ACTIVE HUNT' }
  return               { label: 'E', cls: 'rank-e', color: r.E, status: 'NOT ENTERED' }
}
