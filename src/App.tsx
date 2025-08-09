import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'

// Layouts
import AdminLayout from '@/layouts/AdminLayout'
import EmployeeLayout from '@/layouts/EmployeeLayout'
import ManagerLayout from '@/layouts/ManagerLayout'
import HRLayout from '@/layouts/HRLayout'
import AuditorLayout from '@/layouts/AuditorLayout'
import TrainerLayout from '@/layouts/TrainerLayout'

// Dashboard Pages
import DashboardPage from '@/pages/admin/DashboardPage'
import EmployeeDashboard from '@/pages/employee/EmployeeDashboard'
import ManagerDashboard from '@/pages/manager/ManagerDashboard'
import HRDashboard from '@/pages/hr/HRDashboard'
import AuditorDashboard from '@/pages/auditor/AuditorDashboard'
import TrainerDashboard from '@/pages/trainer/TrainerDashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            {/* Add more admin routes here as needed */}
          </Route>

          {/* Employee Routes */}
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<EmployeeDashboard />} />
            {/* Add more employee routes here as needed */}
          </Route>

          {/* Manager Routes */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            {/* Add more manager routes here as needed */}
          </Route>

          {/* HR Routes */}
          <Route path="/hr" element={<HRLayout />}>
            <Route index element={<HRDashboard />} />
            {/* Add more HR routes here as needed */}
          </Route>

          {/* Auditor Routes */}
          <Route path="/auditor" element={<AuditorLayout />}>
            <Route index element={<AuditorDashboard />} />
            {/* Add more auditor routes here as needed */}
          </Route>

          {/* Trainer Routes */}
          <Route path="/trainer" element={<TrainerLayout />}>
            <Route index element={<TrainerDashboard />} />
            {/* Add more trainer routes here as needed */}
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
