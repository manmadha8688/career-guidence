import { createContext, useContext, useState, useEffect } from 'react'
import { getMe, clearUserCache } from '../api/api'
import { logApiError } from '../utils/devLog'
import { clearBrowserSessionPreservingPrefs } from '../utils/browserSession'
import api from '../api/api'
import LoadingOverlay from '../components/LoadingOverlay'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [logoutOverlay, setLogoutOverlay] = useState(false)
  const [logoutDone, setLogoutDone] = useState(false)
  const [authOverlay, setAuthOverlay] = useState(null) // { type, completing }

  const showAuthOverlay = (type) => setAuthOverlay({ type, completing: false })
  const completeAuthOverlay = () => setAuthOverlay(o => (o ? { ...o, completing: true } : null))
  const hideAuthOverlay = () => setAuthOverlay(null)

  // On mount — only call /me if we previously stored a session flag.
  // Anonymous visitors (no flag) skip the call entirely — no 401/403 in console.
  useEffect(() => {
    if (!localStorage.getItem('has_session')) {
      setLoading(false)
      return
    }
    getMe()
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('has_session')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  // Listen for sl:refresh — re-fetch /me to get latest xp/level/rank
  useEffect(() => {
    const refresh = () => {
      getMe().then(res => setUser(res.data)).catch(err => logApiError('auth-refresh', err))
    }
    window.addEventListener('sl:refresh', refresh)
    return () => window.removeEventListener('sl:refresh', refresh)
  }, [])

  const login = async (_token, userData) => {
    clearUserCache()
    localStorage.setItem('has_session', '1')
    // The login/register response only carries {id, fullName, email, role}.
    // Set that instantly for a snappy transition, then hydrate the FULL profile
    // (xp, level, rank, username, bio, links…) from /me so the UI shows real
    // user data immediately instead of defaults until the next refresh.
    setUser(userData)
    try {
      const res = await getMe()
      setUser(res.data)
    } catch (err) {
      logApiError('auth-login-hydrate', err)
    }
  }

  const logout = async () => {
    setLogoutOverlay(true)
    setLogoutDone(false)
    try { await api.post('/auth/logout') } catch { /* best-effort: proceed with local cleanup */ }
    clearUserCache()
    clearBrowserSessionPreservingPrefs()
    setLogoutDone(true)
    await new Promise(r => setTimeout(r, 800))
    setUser(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{
      user, login, logout, isAuthenticated: !!user, loading,
      showAuthOverlay, completeAuthOverlay, hideAuthOverlay,
    }}>
      {authOverlay && <LoadingOverlay type={authOverlay.type} completing={authOverlay.completing} />}
      {logoutOverlay && <LoadingOverlay type="logout" completing={logoutDone} />}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
