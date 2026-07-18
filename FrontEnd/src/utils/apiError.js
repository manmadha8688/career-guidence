// Central resolver for API/network errors.
//
// Turns any axios error into a single, user-facing message that is:
//  - formal and clear (never blames the user, never leaks internals)
//  - network-aware (offline, unreachable server, timeout)
//  - respectful of server-provided messages when they exist
//
// Usage:  toast.error(getApiError(err, 'We could not save your changes.'))

const NETWORK_OFFLINE  = 'You appear to be offline. Reconnect to the internet and try again.'
const NETWORK_UNREACHED = 'We could not reach the server. Please check your connection and try again.'
const NETWORK_TIMEOUT  = 'The request took too long to respond. Please try again in a moment.'
const SERVER_ERROR     = 'Our servers are having a moment. Please try again shortly.'
const RATE_LIMITED     = 'That is a few too many requests. Please wait a moment and try again.'
const GENERIC          = 'Something did not go through. Please try again.'

// Pull the first meaningful field-validation message from a { errors: {...} } body.
function firstValidationMessage(data) {
  if (!data?.errors || typeof data.errors !== 'object') return null
  const first = Object.values(data.errors).find(Boolean)
  return typeof first === 'string' ? first : null
}

export function getApiError(err, fallback = GENERIC) {
  // Browser reports no connectivity at all.
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return NETWORK_OFFLINE
  }

  // Request timed out before the server answered.
  if (err?.code === 'ECONNABORTED' || /timeout/i.test(err?.message || '')) {
    return NETWORK_TIMEOUT
  }

  const response = err?.response

  // No response object at all → request never reached the server.
  if (!response) {
    return NETWORK_UNREACHED
  }

  const status = response.status
  const data   = response.data

  // Prefer an explicit, user-safe message the backend chose to send.
  if (data?.error && typeof data.error === 'string' && data.error !== 'link_verification_failed') {
    return data.error
  }

  const validation = firstValidationMessage(data)
  if (validation) return validation

  if (status === 429) return RATE_LIMITED
  if (status >= 500)  return SERVER_ERROR

  return fallback
}

export default getApiError
