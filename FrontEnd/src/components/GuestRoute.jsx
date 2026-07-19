import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { resolveAuthRedirect } from '../utils/authRedirect'
import { isRegistered } from '../utils/auth'
import SystemAwakeningLoader from './loaders/SystemAwakeningLoader'

export default function GuestRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <SystemAwakeningLoader subtitle="VERIFYING IDENTITY" />

  if (isRegistered(user)) {
    return <Navigate to={resolveAuthRedirect(location.search, '/')} replace />
  }

  return <Outlet />
}
