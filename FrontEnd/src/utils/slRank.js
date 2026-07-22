// ── Rank lookup from XP (used by Navbar/QuizPage which don't have summary) ──

import { RANK_LADDER, RANK_COLORS_DARK, RANK_COLORS_LIGHT } from '../constants/ranks'

const isLight = () => document.documentElement.getAttribute('data-theme') === 'light'

const rc = () => isLight() ? RANK_COLORS_LIGHT : RANK_COLORS_DARK

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
