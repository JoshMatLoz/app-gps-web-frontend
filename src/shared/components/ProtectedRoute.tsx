import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/auth.store";
import { useShallow } from 'zustand/shallow'

const ProtectedRoute = () => {
  const { user, isLoading } = useAuthStore(
    useShallow((state) => ({ user: state.user, isLoading: state.isLoading }))
  )

  if (isLoading) return <div>Cargando...</div>
  if (!user) return <Navigate to="/login"/>

  return <Outlet/>

}

export default ProtectedRoute;