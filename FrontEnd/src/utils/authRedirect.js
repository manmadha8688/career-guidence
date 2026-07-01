/**
 * Safe post-login redirect — blocks open redirects (external URLs, protocol-relative paths).
 * @param {string} search - location.search, e.g. "?redirect=/foo"
 * @param {string} fallback - path when redirect is missing or invalid
 */
export function resolveAuthRedirect(search, fallback = '/') {
  const raw = new URLSearchParams(search).get('redirect')
  if (raw && raw.startsWith('/') && !raw.startsWith('//') && !raw.includes('://')) {
    return raw
  }
  return fallback
}

/** Build ?redirect= query for auth links; returns '' when path is empty or '/'. */
export function buildAuthRedirectQuery(path) {
  if (!path || path === '/') return ''
  const safe = resolveAuthRedirect(`?redirect=${encodeURIComponent(path)}`, '/')
  if (safe === '/') return ''
  return `?redirect=${encodeURIComponent(safe)}`
}

/** Encode current location for login redirect after session expiry. */
export function buildLoginReturnUrl(pathname, search = '') {
  const path = `${pathname || '/'}${search || ''}`
  if (path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/forgot-password')) {
    return '/login'
  }
  return `/login?redirect=${encodeURIComponent(path)}`
}
