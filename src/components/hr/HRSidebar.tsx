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
  ChevronDown,
  Target,
  Award,
  TrendingUp,
  Building,
  Briefcase,
  User,
  Database
} from 'lucide-react'

interface HRSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const HRSidebar = ({ isOpen, onClose }: HRSidebarProps) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const navigation = [
    {
      name: 'Dashboard',
      href: '/hr',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Employee Management',
      icon: Users,
      children: [
        { name: 'All Employees', href: '/hr/employees' },
        { name: 'Employee Onboarding', href: '/hr/onboarding' },
        { name: 'Employee Directory', href: '/hr/directory' },
        { name: 'Organization Chart', href: '/hr/org-chart' },
        { name: 'Employee Analytics', href: '/hr/employee-analytics' }
      ]
    },
    {
      name: 'Recruitment & Hiring',
      icon: UserPlus,
      children: [
        { name: 'Job Postings', href: '/hr/jobs' },
        { name: 'Candidate Management', href: '/hr/candidates' },
        { name: 'Interview Scheduling', href: '/hr/interviews' },
        { name: 'Hiring Pipeline', href: '/hr/pipeline' },
        { name: 'Talent Pool', href: '/hr/talent-pool' }
      ]
    },
    {
      name: 'Payroll & Compensation',
      icon: DollarSign,
      children: [
        { name: 'Payroll Processing', href: '/hr/payroll' },
        { name: 'Salary Management', href: '/hr/salaries' },
        { name: 'Benefits Administration', href: '/hr/benefits' },
        { name: 'Tax Management', href: '/hr/tax-management' },
        { name: 'Compensation Analytics', href: '/hr/compensation-analytics' }
      ]
    },
    {
      name: 'Time & Attendance',
      icon: Clock,
      children: [
        { name: 'Time Tracking Overview', href: '/hr/time-tracking' },
        { name: 'Attendance Management', href: '/hr/attendance' },
        { name: 'Leave Management', href: '/hr/leave' },
        { name: 'Overtime Management', href: '/hr/overtime' },
        { name: 'Schedule Management', href: '/hr/schedules' }
      ]
    },
    {
      name: 'Performance Management',
      icon: BarChart3,
      children: [
        { name: 'Performance Reviews', href: '/hr/performance' },
        { name: 'Goal Management', href: '/hr/goals' },
        { name: 'Performance Analytics', href: '/hr/performance-analytics' },
        { name: 'Feedback Systems', href: '/hr/feedback' },
        { name: 'Career Development', href: '/hr/career-development' }
      ]
    },
    {
      name: 'Learning & Development',
      icon: Award,
      children: [
        { name: 'Training Programs', href: '/hr/training' },
        { name: 'Skill Management', href: '/hr/skills' },
        { name: 'Certification Tracking', href: '/hr/certifications' },
        { name: 'Learning Analytics', href: '/hr/learning-analytics' },
        { name: 'Mentorship Programs', href: '/hr/mentorship' }
      ]
    },
    {
      name: 'Organization & Structure',
      icon: Building,
      children: [
        { name: 'Departments', href: '/hr/departments' },
        { name: 'Positions & Roles', href: '/hr/positions' },
        { name: 'Reporting Structure', href: '/hr/reporting' },
        { name: 'Location Management', href: '/hr/locations' },
        { name: 'Cost Centers', href: '/hr/cost-centers' }
      ]
    },
    {
      name: 'Documents & Policies',
      icon: FileText,
      children: [
        { name: 'Document Library', href: '/hr/documents' },
        { name: 'Employee Contracts', href: '/hr/contracts' },
        { name: 'HR Policies', href: '/hr/policies' },
        { name: 'Compliance Documents', href: '/hr/compliance-docs' },
        { name: 'Templates', href: '/hr/templates' }
      ]
    },
    {
      name: 'Compliance & Legal',
      icon: Shield,
      children: [
        { name: 'Compliance Overview', href: '/hr/compliance' },
        { name: 'Audit Management', href: '/hr/audit' },
        { name: 'Legal Requirements', href: '/hr/legal' },
        { name: 'Risk Management', href: '/hr/risk' },
        { name: 'Data Privacy', href: '/hr/privacy' }
      ]
    },
    {
      name: 'Analytics & Reports',
      icon: TrendingUp,
      children: [
        { name: 'HR Dashboard', href: '/hr/hr-dashboard' },
        { name: 'Custom Reports', href: '/hr/reports' },
        { name: 'Workforce Analytics', href: '/hr/workforce-analytics' },
        { name: 'Predictive Analytics', href: '/hr/predictive' },
        { name: 'Executive Reports', href: '/hr/executive-reports' }
      ]
    },
    {
      name: 'System Administration',
      icon: Database,
      children: [
        { name: 'User Management', href: '/hr/user-management' },
        { name: 'Role & Permissions', href: '/hr/roles' },
        { name: 'System Settings', href: '/hr/system-settings' },
        { name: 'Data Management', href: '/hr/data-management' },
        { name: 'Integration Settings', href: '/hr/integrations' }
      ]
    },
    {
      name: 'Calendar',
      href: '/hr/calendar',
      icon: Calendar,
      badge: null
    },
    {
      name: 'Messages',
      icon: MessageSquare,
      href: '/hr/messages',
      badge: '8'
    },
    {
      name: 'My Profile',
      href: '/hr/profile',
      icon: User,
      badge: null
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/hr/settings',
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
              <p className="text-xs text-gray-500">HR Portal</p>
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
              <span className="text-xs font-medium">HR</span>
            </div>
            <div>
              <p className="font-medium">HR Specialist</p>
              <p className="text-xs text-gray-500">hr@company.com</p>
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

export default HRSidebar
