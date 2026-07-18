/** True when the backend rejected save because a link could not be verified. */
export function isLinkVerificationError(err) {
  return err?.response?.status === 422
    && err?.response?.data?.error === 'link_verification_failed'
}

export function getLinkVerificationResults(err) {
  const results = err?.response?.data?.results
  return Array.isArray(results) ? results : []
}

/** Unified copy shown in every link-verify modal (resume, mission, profile). */
export const LINK_VERIFY_HEADLINE = 'The link returned an unexpected response.'
export const LINK_VERIFY_HINT =
  'Use a public http(s) URL — not localhost or a private network address. If it works, save without verification.'

/** Modal item text — same two lines everywhere regardless of backend detail. */
export function getLinkVerifyDisplay() {
  return { message: LINK_VERIFY_HEADLINE, advice: LINK_VERIFY_HINT }
}
