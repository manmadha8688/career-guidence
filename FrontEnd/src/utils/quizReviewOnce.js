/** One-time quiz review payload — lives in memory only, cleared on page reload. */
const reviews = new Map()

export function stashQuizReview(attemptId, payload) {
  if (attemptId && payload) reviews.set(attemptId, payload)
}

/** Read without removing — safe under React Strict Mode double-mount. */
export function peekQuizReview(attemptId) {
  if (!attemptId) return null
  return reviews.get(attemptId) ?? null
}

/** Strip question review from API summaries — never reload full review from server. */
export function asQuizSummary(data) {
  if (!data) return data
  return { ...data, results: [] }
}
