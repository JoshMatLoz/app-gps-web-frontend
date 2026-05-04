import { Navigate, Route, Routes } from "react-router"
import PublicOnlyRoute from "./shared/components/PublicOnlyRoute"
import LoginPage from "./features/auth/pages/LoginPage"
import ProtectedRoute from "./shared/components/ProtectedRoute"
import DashboardPage from "./shared/pages/DashboardPage"
import GPSModelsPage from "./features/gps/pages/GPSModelsPage"
import GPSTrackersPage from "./features/gps/pages/GPSTrackersPage"
import VehiclesPage from "./features/vehicle/pages/VehiclesPage"
import VehicleModelsPage from "./features/vehicle/pages/VehicleModelsPage"
import ReportsPage from "./features/reports/pages/ReportsPage"
import GPSDetailsPage from "./features/gps-detail/pages/GPSDetailsPage"
import { useEffect } from "react"
import { AuthService } from "./features/auth/services/auth.service"
import { useAuthStore } from "./store/auth.store"
import DashboardLayout from "./shared/components/layout/DashboardLayout"

function App() {

  useEffect(() => {
    AuthService.getProfile()
      .then((user) => {
        useAuthStore.getState().setUser(user)
        useAuthStore.getState().setIsLoading(false)
      })
      .catch(() => {
        useAuthStore.getState().clearUser()
        useAuthStore.getState().setIsLoading(false)
      })
  }, []) // ← array vacío, solo se ejecuta al montar

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route element={<PublicOnlyRoute/>}>
        <Route path="/login" element={<LoginPage/>}/>
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route element={<DashboardLayout/>}>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/gps/models" element={<GPSModelsPage/>}/>
          <Route path="/gps/trackers" element={<GPSTrackersPage/>}/>
          <Route path="/vehicles" element={<VehiclesPage/>}/>
          <Route path="/vehicles/models" element={<VehicleModelsPage/>}/>
          <Route path="/reports" element={<ReportsPage/>}/>
          <Route path="/gps-details" element={<GPSDetailsPage/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
