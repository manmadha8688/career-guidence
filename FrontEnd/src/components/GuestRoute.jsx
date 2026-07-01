import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SystemAwakeningLoader from './loaders/SystemAwakeningLoader'

function resolveAuthRedirect(search) {
  const redirect = new URLSearchParams(search).get('redirect')
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }
  return '/'
}

export default function GuestRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <SystemAwakeningLoader subtitle="VERIFYING IDENTITY" />

  if (user && user.role !== 'GUEST') {
    return <Navigate to={resolveAuthRedirect(location.search)} replace />
  }

  return <Outlet />
}
