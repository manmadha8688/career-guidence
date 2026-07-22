// Single source of truth for the Solo-Leveling rank ladder (E → S).
// XP thresholds match backend RankUtil + slRank.js getRank().
export const RANK_LADDER = [
  { letter: 'E', label: 'E-RANK', cls: 'rank-e', color: '#888888', bg: '#88888815', min: 0 },
  { letter: 'D', label: 'D-RANK', cls: 'rank-d', color: '#4ADE80', bg: '#4ADE8015', min: 1000 },
  { letter: 'C', label: 'C-RANK', cls: 'rank-c', color: '#60A5FA', bg: '#60A5FA15', min: 3500 },
  { letter: 'B', label: 'B-RANK', cls: 'rank-b', color: '#9B6ED4', bg: '#9B6ED415', min: 8000 },
  { letter: 'A', label: 'A-RANK', cls: 'rank-a', color: '#F59E0B', bg: '#F59E0B15', min: 16000 },
  { letter: 'S', label: 'S-RANK', cls: 'rank-s', color: '#EF4444', bg: '#EF444415', min: 30000 },
]

// Letter → hex maps for the rank badge accent, split by theme. These exact
// values were duplicated across slRank, dashboardUtils, several admin pages,
// SubjectPanel and AboutGateModal — centralized here without changing any value.
export const RANK_COLORS_DARK  = { S: '#EF4444', A: '#F59E0B', B: '#9B6ED4', C: '#60A5FA', D: '#4ADE80', E: '#888888' }
export const RANK_COLORS_LIGHT = { S: '#DC2626', A: '#B45309', B: '#7C5DBB', C: '#1D4ED8', D: '#15803D', E: '#6B7FA3' }
