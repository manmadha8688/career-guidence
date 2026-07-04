// Shared helpers for Code Gym data scripts.
// Logs in as admin against the local backend and returns a fetch wrapper
// that carries the httpOnly auth cookie on every request.

export const BASE = process.env.API_URL || 'http://localhost:8080/api'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@demo.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '***REMOVED***'

export async function login() {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Login failed (${res.status}): ${body}`)
  }
  const raw = res.headers.getSetCookie?.() || []
  const cookie = raw.map(c => c.split(';')[0]).join('; ')
  if (!cookie) throw new Error('Login succeeded but no auth cookie was returned')
  return cookie
}

export function makeClient(cookie) {
  return async (path, options = {}) => {
    const res = await fetch(`${BASE}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', Cookie: cookie, ...(options.headers || {}) },
    })
    const text = await res.text()
    let data = null
    try { data = text ? JSON.parse(text) : null } catch { data = text }
    if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} → ${res.status}: ${text}`)
    return data
  }
}
