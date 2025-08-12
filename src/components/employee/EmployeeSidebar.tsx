import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  X, 
  LayoutDashboard, 
  User, 
  Clock, 
  Calendar, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Settings,
  LogOut,
  ChevronDown,
  Briefcase,
  DollarSign,
  BookOpen,
  Award
} from 'lucide-react'

interface EmployeeSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const EmployeeSidebar = ({ isOpen, onClose }: EmployeeSidebarProps) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const navigation = [
    {
      name: 'Dashboard',
      href: '/employee',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'My Profile',
      href: '/employee/profile',
      icon: User,
      badge: null
    },
    {
      name: 'Time & Attendance',
      icon: Clock,
      children: [
        { name: 'Time Tracking', href: '/employee/time-tracking' },
        { name: 'My Attendance', href: '/employee/attendance' },
        { name: 'Overtime Requests', href: '/employee/overtime' }
      ]
    },
    {
      name: 'Leave Management',
      icon: Calendar,
      children: [
        { name: 'Request Leave', href: '/employee/leave-request' },
        { name: 'My Leave History', href: '/employee/leave-history' },
        { name: 'Leave Balance', href: '/employee/leave-balance' }
      ]
    },
    {
      name: 'Payroll & Benefits',
      icon: DollarSign,
      children: [
        { name: 'Pay Stubs', href: '/employee/paystubs' },
        { name: 'Tax Documents', href: '/employee/tax-docs' },
        { name: 'Benefits Enrollment', href: '/employee/benefits' }
      ]
    },
    {
      name: 'Performance',
      icon: BarChart3,
      children: [
        { name: 'My Performance', href: '/employee/performance' },
        { name: 'Goals & KPIs', href: '/employee/goals' },
        { name: 'Feedback', href: '/employee/feedback' }
      ]
    },
    {
      name: 'Learning & Development',
      icon: BookOpen,
      children: [
        { name: 'Training Courses', href: '/employee/training' },
        { name: 'Certifications', href: '/employee/certifications' },
        { name: 'Skills Assessment', href: '/employee/skills' }
      ]
    },
    {
      name: 'Documents',
      icon: FileText,
      children: [
        { name: 'My Documents', href: '/employee/documents' },
        { name: 'Company Policies', href: '/employee/policies' },
        { name: 'Employee Handbook', href: '/employee/handbook' }
      ]
    },
    {
      name: 'Career',
      icon: Award,
      children: [
        { name: 'Internal Jobs', href: '/employee/internal-jobs' },
        { name: 'Career Path', href: '/employee/career-path' },
        { name: 'Mentorship', href: '/employee/mentorship' }
      ]
    },
    {
      name: 'Directory',
      href: '/employee/directory',
      icon: Briefcase,
      badge: null
    },
    {
      name: 'Messages',
      icon: MessageSquare,
      href: '/employee/messages',
      badge: '2'
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/employee/settings',
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
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">HR Pro</h1>
              <p className="text-xs text-gray-500">Employee Portal</p>
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
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center px-3 py-2 text-sm text-gray-700">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
              <span className="text-xs font-medium">JD</span>
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john@company.com</p>
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

export default EmployeeSidebar
