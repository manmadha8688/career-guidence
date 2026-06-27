import { createContext, useContext, useState, useEffect } from 'react'
import { getMe, clearUserCache } from '../api/api'
import api from '../api/api'
import LoadingOverlay from '../components/LoadingOverlay'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [logoutOverlay, setLogoutOverlay] = useState(false)
  const [logoutDone, setLogoutDone] = useState(false)

  // On mount — call /me with credentials. httpOnly cookie is sent automatically.
  useEffect(() => {
    getMe()
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  // Listen for sl:refresh — re-fetch /me to get latest xp/level/rank
  useEffect(() => {
    const refresh = () => {
      getMe().then(res => setUser(res.data)).catch(() => {})
    }
    window.addEventListener('sl:refresh', refresh)
    return () => window.removeEventListener('sl:refresh', refresh)
  }, [])

  const login = (_token, userData) => {
    clearUserCache()
    // Cookie is set by the backend response — no localStorage needed
    setUser(userData)
  }

  const logout = async () => {
    setLogoutOverlay(true)
    setLogoutDone(false)
    try { await api.post('/auth/logout') } catch {}
    clearUserCache()
    const guestDeviceId = localStorage.getItem('guest_device_id')
    const theme = localStorage.getItem('theme')
    localStorage.clear()
    if (guestDeviceId) localStorage.setItem('guest_device_id', guestDeviceId)
    if (theme) localStorage.setItem('theme', theme)
    setLogoutDone(true)
    await new Promise(r => setTimeout(r, 800))
    setUser(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {logoutOverlay && <LoadingOverlay type="logout" completing={logoutDone} />}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
