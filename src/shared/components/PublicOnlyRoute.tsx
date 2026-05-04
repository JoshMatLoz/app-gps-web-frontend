import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/auth.store";
import { useShallow } from 'zustand/shallow'

const PublicOnlyRoute = () => {
  const { user, isLoading } = useAuthStore(
    useShallow((state) => ({ user: state.user, isLoading: state.isLoading }))
  )

  if (isLoading) return <div>Cargando...</div>
  if (user) return <Navigate to="/dashboard"/>

  return <Outlet/>

}

export default PublicOnlyRoute;