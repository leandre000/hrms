import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  X, 
  LayoutDashboard, 
  Shield, 
  FileText, 
  Eye,
  BarChart3, 
  Settings,
  LogOut,
  ChevronDown,
  Activity,
  CheckSquare,
  AlertTriangle,
  Users,
  DollarSign,
  Clock,
  Search,
  Download,
  User
} from 'lucide-react'

interface AuditorSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const AuditorSidebar = ({ isOpen, onClose }: AuditorSidebarProps) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  type NavigationItem = {
    name: string
    href?: string
    icon: any
    badge?: string | null
    children?: { name: string; href: string }[]
  }

  const navigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '/auditor',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Compliance Monitoring',
      icon: Shield,
      children: [
        { name: 'Compliance Overview', href: '/auditor/compliance' },
        { name: 'Policy Adherence', href: '/auditor/policy-adherence' },
        { name: 'Regulatory Reports', href: '/auditor/regulatory-reports' },
        { name: 'Risk Assessment', href: '/auditor/risk-assessment' },
        { name: 'Violation Tracking', href: '/auditor/violations' }
      ]
    },
    {
      name: 'Audit Trails & Logs',
      icon: Activity,
      children: [
        { name: 'System Activity Logs', href: '/auditor/activity-logs' },
        { name: 'User Access Logs', href: '/auditor/access-logs' },
        { name: 'Data Change History', href: '/auditor/change-history' },
        { name: 'Security Events', href: '/auditor/security-events' },
        { name: 'Failed Login Attempts', href: '/auditor/failed-logins' }
      ]
    },
    {
      name: 'Financial Auditing',
      icon: DollarSign,
      children: [
        { name: 'Payroll Audit', href: '/auditor/payroll-audit' },
        { name: 'Expense Verification', href: '/auditor/expense-audit' },
        { name: 'Salary Discrepancies', href: '/auditor/salary-discrepancies' },
        { name: 'Tax Compliance', href: '/auditor/tax-compliance' },
        { name: 'Budget Analysis', href: '/auditor/budget-analysis' }
      ]
    },
    {
      name: 'Employee Data Audit',
      icon: Users,
      children: [
        { name: 'Employee Records', href: '/auditor/employee-records' },
        { name: 'Document Verification', href: '/auditor/document-verification' },
        { name: 'Contract Compliance', href: '/auditor/contract-compliance' },
        { name: 'Leave & Attendance', href: '/auditor/leave-attendance' },
        { name: 'Performance Records', href: '/auditor/performance-records' }
      ]
    },
    {
      name: 'Document Management',
      icon: FileText,
      children: [
        { name: 'Document Repository', href: '/auditor/documents' },
        { name: 'Document Versions', href: '/auditor/document-versions' },
        { name: 'Access Control Audit', href: '/auditor/access-control' },
        { name: 'Document Expiry', href: '/auditor/document-expiry' },
        { name: 'Digital Signatures', href: '/auditor/digital-signatures' }
      ]
    },
    {
      name: 'Reports & Analytics',
      icon: BarChart3,
      children: [
        { name: 'Audit Reports', href: '/auditor/audit-reports' },
        { name: 'Compliance Dashboard', href: '/auditor/compliance-dashboard' },
        { name: 'Trend Analysis', href: '/auditor/trend-analysis' },
        { name: 'Custom Reports', href: '/auditor/custom-reports' },
        { name: 'Executive Summary', href: '/auditor/executive-summary' }
      ]
    },
    {
      name: 'Data Privacy & GDPR',
      icon: Eye,
      children: [
        { name: 'Data Privacy Overview', href: '/auditor/data-privacy' },
        { name: 'GDPR Compliance', href: '/auditor/gdpr' },
        { name: 'Data Processing Records', href: '/auditor/data-processing' },
        { name: 'Consent Management', href: '/auditor/consent-management' },
        { name: 'Data Breach Logs', href: '/auditor/data-breaches' }
      ]
    },
    {
      name: 'Search & Investigation',
      icon: Search,
      children: [
        { name: 'Advanced Search', href: '/auditor/advanced-search' },
        { name: 'Case Investigation', href: '/auditor/investigations' },
        { name: 'Forensic Analysis', href: '/auditor/forensic-analysis' },
        { name: 'Evidence Collection', href: '/auditor/evidence' }
      ]
    },
    {
      name: 'Export & Downloads',
      href: '/auditor/exports',
      icon: Download,
      badge: null
    },
    {
      name: 'My Profile',
      href: '/auditor/profile',
      icon: User,
      badge: null
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/auditor/settings',
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
              <p className="text-xs text-gray-500">Auditor Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Read-Only Notice */}
        <div className="mx-4 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <Eye className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-xs font-medium text-yellow-800">Read-Only Access</span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">Audit and compliance monitoring only</p>
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
              <span className="text-xs font-medium">AU</span>
            </div>
            <div>
              <p className="font-medium">Auditor</p>
              <p className="text-xs text-gray-500">auditor@company.com</p>
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

export default AuditorSidebar
