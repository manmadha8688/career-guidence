/** MongoDB ObjectId — 24 hex characters. */
export const MONGO_ID_RE = /^[a-f\d]{24}$/i

export function isMongoId(id) {
  return typeof id === 'string' && MONGO_ID_RE.test(id)
}
