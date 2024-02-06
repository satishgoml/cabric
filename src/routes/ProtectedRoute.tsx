import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '@/providers/AuthProvider'


export const ProtectedRoutes = () => {
  const { session } = useAuth()
  const location = useLocation()
  return session? (
      <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}
