import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import EmployeeSidebar from '@/components/employee/EmployeeSidebar'
import EmployeeHeader from '@/components/employee/EmployeeHeader'

const EmployeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <EmployeeSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <EmployeeHeader onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default EmployeeLayout
