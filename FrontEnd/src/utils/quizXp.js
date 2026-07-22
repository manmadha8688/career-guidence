/** Mirrors backend QuizConstants XP rules — keep in sync with QuizConstants.java */

export const QUIZ_XP = {
  concept: { pass: 8, total: 10, base: 50, perPoint: 10, dailyBonus: 50 },
  subject: { pass: 19, total: 25, base: 150, perPoint: 8 },
  roadmap: { pass: 35, total: 50, base: 300, perPoint: 5, jobReadyPass: 42, jobReadyBonus: 25 },
  mock: { pass: 35, total: 50, base: 120, perPoint: 3 },
}

export function conceptQuizXp(score) {
  const { pass, base, perPoint } = QUIZ_XP.concept
  if (score < pass) return 0
  return base + (score - pass) * perPoint
}

export function subjectQuizXp(score) {
  const { pass, base, perPoint } = QUIZ_XP.subject
  if (score < pass) return 0
  return base + (score - pass) * perPoint
}

export function roadmapQuizXp(score) {
  const { pass, base, perPoint, jobReadyPass, jobReadyBonus } = QUIZ_XP.roadmap
  if (score < pass) return 0
  let xp = base + (score - pass) * perPoint
  if (score >= jobReadyPass) xp += jobReadyBonus
  return xp
}

export function mockQuizXp(score) {
  const { pass, base, perPoint } = QUIZ_XP.mock
  if (score < pass) return 0
  return base + (score - pass) * perPoint
}

export const CONCEPT_XP_RANGE = `${QUIZ_XP.concept.base}–${conceptQuizXp(QUIZ_XP.concept.total)} XP`
export const SUBJECT_XP_RANGE = `${QUIZ_XP.subject.base}–${subjectQuizXp(QUIZ_XP.subject.total)} XP`
export const ROADMAP_XP_RANGE = `${QUIZ_XP.roadmap.base}–${roadmapQuizXp(QUIZ_XP.roadmap.total)} XP`
export const MOCK_XP_RANGE = `${QUIZ_XP.mock.base}–${mockQuizXp(QUIZ_XP.mock.total)} XP`
