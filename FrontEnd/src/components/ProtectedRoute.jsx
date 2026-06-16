import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SystemAwakeningLoader from './loaders/SystemAwakeningLoader'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <SystemAwakeningLoader subtitle="VERIFYING IDENTITY" />

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }
  if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/skill-arena/dashboard" replace />

  return children
}
