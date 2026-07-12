// Central mapping for achievement-badge display so subject and career-path badges
// have distinctive, branded names everywhere (dashboard, gates, certificates, history).
// `label` is the unique badge name shown to students; `kind` is the plain meaning.
const BADGES = {
  SUBJECT_MASTERED: { label: 'Gate Sovereign', kind: 'Subject Mastered',  icon: '🎖️', color: '#F59E0B' },
  INTERVIEW_READY:  { label: 'Rising Hunter',  kind: 'Interview Ready',   icon: '🎯', color: '#60A5FA' },
  JOB_READY:        { label: 'Elite Hunter',   kind: 'Job Ready',         icon: '🏆', color: '#F59E0B' },
}

const FALLBACK = { label: 'Achievement', kind: 'Cleared', icon: '🏅', color: '#9B6ED4' }

export function badgeMeta(badge) {
  return BADGES[badge] || FALLBACK
}

export default badgeMeta
