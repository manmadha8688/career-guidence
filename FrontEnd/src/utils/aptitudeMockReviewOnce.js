import { QUIZ_XP } from './quizXp'

/** Strip section review from API summaries — full review is submit-only, like skill trials. */
export function asMockSummary(data) {
  if (!data) return data
  return {
    attemptId: data.attemptId,
    correct: data.score,
    total: data.total,
    percentage: data.total > 0 ? Math.round((data.score / data.total) * 100) : 0,
    passMark: QUIZ_XP.mock.pass,
    passed: data.passed,
    xpEarned: data.xpEarned ?? 0,
    nextRetryAt: data.nextRetryAt ?? null,
    sections: [],
  }
}

export function mockHasLiveReview(result) {
  return (result?.sections || []).some(s => (s.items?.length ?? 0) > 0)
}
