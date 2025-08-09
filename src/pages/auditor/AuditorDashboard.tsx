import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  FileText, 
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Download,
  Search
} from 'lucide-react'

const AuditorDashboard = () => {
  const complianceStats = [
    {
      name: 'Overall Compliance',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: Shield,
      color: 'bg-green-500',
      target: '95%'
    },
    {
      name: 'Critical Violations',
      value: '3',
      change: '-2',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'bg-red-500',
      target: '0'
    },
    {
      name: 'Pending Reviews',
      value: '12',
      change: '+4',
      changeType: 'increase',
      icon: Clock,
      color: 'bg-yellow-500',
      target: '5'
    },
    {
      name: 'Documents Audited',
      value: '1,247',
      change: '+156',
      changeType: 'increase',
      icon: FileText,
      color: 'bg-blue-500',
      target: '1,500'
    }
  ]

  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Unauthorized Access Attempt',
      description: 'Multiple failed login attempts detected from IP 192.168.1.100',
      timestamp: '2 minutes ago',
      department: 'IT Security',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Expiry Notice',
      description: '15 employee contracts expire within 30 days',
      timestamp: '1 hour ago',
      department: 'HR',
      status: 'notified'
    },
    {
      id: 3,
      type: 'info',
      title: 'Payroll Discrepancy',
      description: 'Minor calculation difference detected in overtime calculations',
      timestamp: '3 hours ago',
      department: 'Payroll',
      status: 'resolved'
    },
    {
      id: 4,
      type: 'warning',
      title: 'GDPR Data Request',
      description: 'Employee data portability request requires review',
      timestamp: '5 hours ago',
      department: 'Legal',
      status: 'pending'
    }
  ]

  const auditMetrics = [
    {
      category: 'Employee Data',
      totalRecords: 1247,
      audited: 1180,
      compliance: 94.6,
      issues: 7,
      trend: 'up'
    },
    {
      category: 'Financial Records',
      totalRecords: 856,
      audited: 798,
      compliance: 93.2,
      issues: 12,
      trend: 'down'
    },
    {
      category: 'Legal Documents',
      totalRecords: 432,
      audited: 425,
      compliance: 98.4,
      issues: 2,
      trend: 'up'
    },
    {
      category: 'Training Records',
      totalRecords: 2340,
      audited: 2156,
      compliance: 92.1,
      issues: 23,
      trend: 'up'
    }
  ]

  const systemActivity = [
    {
      id: 1,
      user: 'john.doe@company.com',
      action: 'Accessed payroll data',
      resource: 'Payroll System',
      timestamp: '10:30 AM',
      status: 'authorized',
      ip: '192.168.1.45'
    },
    {
      id: 2,
      user: 'hr.manager@company.com',
      action: 'Modified employee record',
      resource: 'Employee Database',
      timestamp: '10:15 AM',
      status: 'authorized',
      ip: '192.168.1.22'
    },
    {
      id: 3,
      user: 'unknown',
      action: 'Failed login attempt',
      resource: 'Admin Panel',
      timestamp: '09:45 AM',
      status: 'blocked',
      ip: '203.0.113.10'
    },
    {
      id: 4,
      user: 'finance.team@company.com',
      action: 'Downloaded salary report',
      resource: 'Reports Module',
      timestamp: '09:30 AM',
      status: 'authorized',
      ip: '192.168.1.67'
    }
  ]

  const complianceChecks = [
    {
      check: 'GDPR Data Processing Records',
      status: 'compliant',
      lastUpdated: '2 days ago',
      nextReview: 'Dec 15, 2024'
    },
    {
      check: 'Employee Contract Renewals',
      status: 'attention',
      lastUpdated: '1 week ago',
      nextReview: 'Dec 10, 2024'
    },
    {
      check: 'Tax Compliance Documentation',
      status: 'compliant',
      lastUpdated: '3 days ago',
      nextReview: 'Jan 1, 2025'
    },
    {
      check: 'Training Completion Records',
      status: 'warning',
      lastUpdated: '5 days ago',
      nextReview: 'Dec 12, 2024'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Audit & Compliance Dashboard</h1>
            <p className="text-gray-200">Monitor organizational compliance and system integrity</p>
          </div>
          <div className="flex items-center space-x-2 bg-yellow-500 bg-opacity-20 px-3 py-2 rounded-lg">
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">Read-Only Access</span>
          </div>
        </div>
      </div>

      {/* Compliance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">Target: {stat.target}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.changeType === 'increase' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All Alerts
          </button>
        </div>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    alert.type === 'critical' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      <span className="text-xs text-gray-500">• {alert.department}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  alert.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  alert.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {alert.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit Metrics */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Metrics by Category</h3>
          <div className="space-y-4">
            {auditMetrics.map((metric, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{metric.category}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{metric.compliance}%</span>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Records</p>
                    <p className="font-medium">{metric.totalRecords.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Audited</p>
                    <p className="font-medium">{metric.audited.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Issues Found</p>
                    <p className="font-medium text-red-600">{metric.issues}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-primary-500"
                      style={{ width: `${metric.compliance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Checks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Checks</h3>
          <div className="space-y-4">
            {complianceChecks.map((check, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{check.check}</h4>
                  <div className={`w-3 h-3 rounded-full ${
                    check.status === 'compliant' ? 'bg-green-500' :
                    check.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Last updated: {check.lastUpdated}</p>
                  <p>Next review: {check.nextReview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Activity Log */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent System Activity</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View Full Log
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {systemActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.resource}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'authorized' ? 'bg-green-100 text-green-800' :
                      activity.status === 'blocked' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Export Compliance Report</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Search className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Advanced Search</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Activity className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">View Audit Trail</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <BarChart3 className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Generate Analytics</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuditorDashboard
