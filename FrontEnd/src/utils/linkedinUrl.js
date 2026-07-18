import { normalizeHttpUrl } from './normalizeHttpUrl'

/** linkedin.com profile paths only — rejects typo domains like linedin.com. */
export const LINKEDIN_PROFILE_RE =
  /^https?:\/\/(?:[a-z]{2}\.)?(?:www\.)?linkedin\.com\/(?:in|company|school|pub)\/[a-zA-Z0-9\-_%]+(?:\/)?$/i

export function isLinkedInProfileUrl(raw) {
  const v = normalizeHttpUrl(raw)
  if (!v) return false
  return LINKEDIN_PROFILE_RE.test(v)
}

export function linkedinUrlState(raw) {
  const v = (raw || '').trim()
  if (!v) return 'empty'
  const normalized = normalizeHttpUrl(v)
  if (!normalized) return 'invalid'
  if (!LINKEDIN_PROFILE_RE.test(normalized)) return 'not-linkedin'
  return 'valid'
}

export const LINKEDIN_URL_HINT = 'Use https://www.linkedin.com/in/your-name'
