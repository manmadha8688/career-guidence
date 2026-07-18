/** Allow only http(s) and mailto for user-controlled href targets. */
export function safeExternalUrl(raw) {
  if (raw == null || typeof raw !== 'string') return null
  const trimmed = raw.trim()
  if (!trimmed) return null
  try {
    const href = /^https?:\/\//i.test(trimmed) || trimmed.startsWith('mailto:')
      ? trimmed
      : `https://${trimmed}`
    const u = new URL(href)
    if (u.protocol === 'http:' || u.protocol === 'https:' || u.protocol === 'mailto:') {
      return u.href
    }
  } catch {
    /* invalid URL */
  }
  return null
}
