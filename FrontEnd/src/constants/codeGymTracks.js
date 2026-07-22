// Single source of truth for Code Gym track metadata (label/title, rank, color).
// Superset of the two former inline copies:
//   - ProblemDetailPage read { label, color }
//   - TrackPage read { title, rank, color }
// `label` and `title` hold the same string, so both callers get identical values.
export const TRACK_META = {
  START_CODING:    { title: 'Start Coding',   label: 'Start Coding',   rank: 'E', color: '#9CA3AF' },
  LOGIC_BUILDING:  { title: 'Logic Building', label: 'Logic Building', rank: 'D', color: '#4ADE80' },
  SKILL_UP:        { title: 'Skill Up',       label: 'Skill Up',       rank: 'C', color: '#60A5FA' },
  CRACK_IT:        { title: 'Crack It',       label: 'Crack It',       rank: 'B', color: '#9B6ED4' },
  BUILD_IT:        { title: 'Build It',       label: 'Build It',       rank: 'A', color: '#F59E0B' },
  PROVE_IT:        { title: 'Prove It',       label: 'Prove It',       rank: 'S', color: '#EF4444' },
}
