import { MOCK_XP_RANGE, QUIZ_XP } from '../../utils/quizXp'

/** Core mock exam — mirrors backend AptitudeService MOCK_* constants. */
export const MOCK_OVERALL_SECONDS = 65 * 60
export const MOCK_SECTIONS = [
  { id: 'quantitative', label: 'Quantitative Aptitude', icon: '🧮', color: '#0EA5E9', timeSeconds: 25 * 60, questionCount: 20 },
  { id: 'logical', label: 'Logical Reasoning', icon: '🧩', color: '#9B6ED4', timeSeconds: 20 * 60, questionCount: 15 },
  { id: 'verbal', label: 'Verbal Ability', icon: '📖', color: '#22C55E', timeSeconds: 20 * 60, questionCount: 15 },
]

export const MOCK_TOTAL_QUESTIONS = MOCK_SECTIONS.reduce((n, s) => n + s.questionCount, 0)
export const MOCK_PASS = QUIZ_XP.mock.pass
export const MOCK_PASS_PCT = Math.round((MOCK_PASS / QUIZ_XP.mock.total) * 100)
export const MOCK_RETRY_MINUTES = 15

export const MOCK_INSTRUCTIONS = {
  label: 'CORE MOCK',
  color: '#F59E0B',
  questions: MOCK_TOTAL_QUESTIONS,
  time: '65 min',
  rules: [
    '50 questions across 3 sections — Quant (20), Logical (15), Verbal (15). No Data Interpretation.',
    'Overall timer: 65 minutes — runs continuously from start to final submit.',
    'Each section has its own timer (25 / 20 / 20 min). Finish a section early to move on.',
    'You cannot return to a previous section — only to earlier questions in the current section.',
    `Pass mark: ${MOCK_PASS}/${QUIZ_XP.mock.total} (${MOCK_PASS_PCT}%). XP: ${MOCK_XP_RANGE} — base at pass + bonus per extra correct; only improvement XP on retakes.`,
    `Wait ${MOCK_RETRY_MINUTES} minutes between mock attempts before starting again.`,
    'Question review is available right after submit only — history stores score summary, like Skill Arena trials.',
  ],
}
