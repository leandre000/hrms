import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  X, 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  DollarSign, 
  Clock, 
  FileText, 
  Settings, 
  BarChart3, 
  Shield,
  Calendar,
  MessageSquare,
  LogOut,
  ChevronDown
} from 'lucide-react'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Employee Management',
      icon: Users,
      children: [
        { name: 'All Employees', href: '/admin/employees' },
        { name: 'Departments', href: '/admin/departments' },
        { name: 'Positions', href: '/admin/positions' },
        { name: 'Employee Directory', href: '/admin/directory' }
      ]
    },
    {
      name: 'Recruitment',
      icon: UserPlus,
      children: [
        { name: 'Job Postings', href: '/admin/jobs' },
        { name: 'Candidates', href: '/admin/candidates' },
        { name: 'Interviews', href: '/admin/interviews' },
        { name: 'Hiring Pipeline', href: '/admin/pipeline' }
      ]
    },
    {
      name: 'Payroll',
      icon: DollarSign,
      children: [
        { name: 'Payroll Overview', href: '/admin/payroll' },
        { name: 'Salary Management', href: '/admin/salaries' },
        { name: 'Benefits', href: '/admin/benefits' },
        { name: 'Tax Reports', href: '/admin/tax-reports' }
      ]
    },
    {
      name: 'Time & Attendance',
      icon: Clock,
      children: [
        { name: 'Time Tracking', href: '/admin/time-tracking' },
        { name: 'Attendance', href: '/admin/attendance' },
        { name: 'Leave Management', href: '/admin/leave' },
        { name: 'Overtime', href: '/admin/overtime' }
      ]
    },
    {
      name: 'Performance',
      icon: BarChart3,
      children: [
        { name: 'Performance Reviews', href: '/admin/performance' },
        { name: 'Goals & KPIs', href: '/admin/goals' },
        { name: 'Training', href: '/admin/training' },
        { name: 'Feedback', href: '/admin/feedback' }
      ]
    },
    {
      name: 'Documents',
      icon: FileText,
      children: [
        { name: 'Document Library', href: '/admin/documents' },
        { name: 'Contracts', href: '/admin/contracts' },
        { name: 'Policies', href: '/admin/policies' },
        { name: 'Templates', href: '/admin/templates' }
      ]
    },
    {
      name: 'Compliance',
      icon: Shield,
      children: [
        { name: 'Compliance Overview', href: '/admin/compliance' },
        { name: 'Audit Trails', href: '/admin/audit' },
        { name: 'Reports', href: '/admin/reports' },
        { name: 'Certifications', href: '/admin/certifications' }
      ]
    },
    {
      name: 'Calendar',
      icon: Calendar,
      href: '/admin/calendar',
      badge: null
    },
    {
      name: 'Messages',
      icon: MessageSquare,
      href: '/admin/messages',
      badge: '3'
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      badge: null
    }
  ]

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    )
  }

  const isActive = (href: string) => location.pathname === href

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">HR Pro</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            if (item.href) {
              // Single menu item
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            } else {
              // Menu with children
              const isExpanded = expandedMenus.includes(item.name)
              const hasActiveChild = item.children?.some(child => isActive(child.href))
              
              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                      ${hasActiveChild
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon size={20} className="mr-3" />
                      {item.name}
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`
                            block px-3 py-2 text-sm rounded-lg transition-colors duration-200
                            ${isActive(child.href)
                              ? 'bg-primary-100 text-primary-700'
                              : 'text-gray-600 hover:bg-gray-50'
                            }
                          `}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center px-3 py-2 text-sm text-gray-700">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
              <span className="text-xs font-medium">AD</span>
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@hrpro.com</p>
            </div>
          </div>
          <button className="w-full mt-3 flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <LogOut size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
