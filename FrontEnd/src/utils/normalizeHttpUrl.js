/** Add https:// when omitted; returns '' for blank input. */
export function normalizeHttpUrl(raw) {
  const v = (raw || '').trim()
  if (!v) return ''
  return /^https?:\/\//i.test(v) ? v : `https://${v}`
}

const LOOSE_URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i

export function isLooseHttpUrl(raw) {
  const v = (raw || '').trim()
  if (!v) return false
  return LOOSE_URL_RE.test(v)
}
