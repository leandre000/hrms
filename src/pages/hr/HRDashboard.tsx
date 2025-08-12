import { 
  Users, 
  UserPlus, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Target,
  Award,
  Shield,
  BarChart3,
  FileText,
  Building,
  Plus
} from 'lucide-react'

const HRDashboard = () => {
  const orgStats = [
    {
      name: 'Total Employees',
      value: '1,247',
      change: '+23',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'New Hires (MTD)',
      value: '18',
      change: '+5',
      changeType: 'increase',
      icon: UserPlus,
      color: 'bg-green-500'
    },
    {
      name: 'Monthly Payroll',
      value: '$2.4M',
      change: '+8.2%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      name: 'Avg. Attendance',
      value: '94.8%',
      change: '-0.5%',
      changeType: 'decrease',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ]

  const departmentData = [
    {
      name: 'Engineering',
      employees: 450,
      headcount: 480,
      growth: '+15',
      performance: 4.2,
      color: 'bg-blue-500'
    },
    {
      name: 'Sales',
      employees: 180,
      headcount: 200,
      growth: '+8',
      performance: 4.0,
      color: 'bg-green-500'
    },
    {
      name: 'Marketing',
      employees: 75,
      headcount: 80,
      growth: '+3',
      performance: 4.1,
      color: 'bg-purple-500'
    },
    {
      name: 'Operations',
      employees: 120,
      headcount: 125,
      growth: '+2',
      performance: 3.9,
      color: 'bg-orange-500'
    }
  ]

  const criticalAlerts = [
    {
      id: 1,
      type: 'compliance',
      title: 'Compliance Training Overdue',
      message: '45 employees need to complete mandatory training by Dec 15',
      priority: 'high',
      icon: Shield,
      color: 'text-red-600'
    },
    {
      id: 2,
      type: 'payroll',
      title: 'Payroll Processing Due',
      message: 'Monthly payroll processing required in 2 days',
      priority: 'medium',
      icon: DollarSign,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'performance',
      title: 'Performance Reviews',
      message: '23 managers have pending performance reviews',
      priority: 'medium',
      icon: BarChart3,
      color: 'text-blue-600'
    }
  ]

  const recentHires = [
    {
      id: 1,
      name: 'Emma Wilson',
      position: 'Senior UX Designer',
      department: 'Design',
      startDate: 'Dec 10, 2024',
      status: 'onboarding',
      avatar: 'EW'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Backend Developer',
      department: 'Engineering',
      startDate: 'Dec 8, 2024',
      status: 'active',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      position: 'Marketing Manager',
      department: 'Marketing',
      startDate: 'Dec 5, 2024',
      status: 'active',
      avatar: 'SJ'
    }
  ]

  const hrMetrics = [
    {
      title: 'Time to Hire',
      value: '21 days',
      target: '18 days',
      trend: 'up',
      progress: 75
    },
    {
      title: 'Employee Satisfaction',
      value: '4.3/5',
      target: '4.5/5',
      trend: 'up',
      progress: 86
    },
    {
      title: 'Retention Rate',
      value: '92.5%',
      target: '95%',
      trend: 'down',
      progress: 92
    },
    {
      title: 'Training Completion',
      value: '87%',
      target: '95%',
      trend: 'up',
      progress: 87
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'All-Hands Meeting',
      date: 'Today, 3:00 PM',
      type: 'meeting',
      attendees: 1247
    },
    {
      id: 2,
      title: 'New Hire Orientation',
      date: 'Tomorrow, 9:00 AM',
      type: 'orientation',
      attendees: 8
    },
    {
      id: 3,
      title: 'Leadership Training',
      date: 'Dec 15, 2:00 PM',
      type: 'training',
      attendees: 25
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">HR Command Center</h1>
        <p className="text-purple-100">Your comprehensive view of organizational health and HR operations.</p>
      </div>

      {/* Organization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orgStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
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

      {/* Critical Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Critical Alerts
          </h3>
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
            {criticalAlerts.length} Active
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {criticalAlerts.map((alert) => (
            <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <alert.icon className={`w-5 h-5 ${alert.color}`} />
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                  alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {alert.priority}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
              <p className="text-sm text-gray-600">{alert.message}</p>
              <button className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Take Action →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
          <div className="space-y-4">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                  <div>
                    <p className="font-medium text-gray-900">{dept.name}</p>
                    <p className="text-sm text-gray-600">{dept.employees}/{dept.headcount} employees</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{dept.performance}</p>
                    <p className="text-xs text-gray-500">Performance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{dept.growth}</p>
                    <p className="text-xs text-gray-500">Growth</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Hires */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Hires</h3>
          <div className="space-y-4">
            {recentHires.map((hire) => (
              <div key={hire.id} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">{hire.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{hire.name}</p>
                  <p className="text-sm text-gray-600">{hire.position}</p>
                  <p className="text-xs text-gray-500">{hire.department} • {hire.startDate}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  hire.status === 'onboarding' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {hire.status === 'onboarding' ? 'Onboarding' : 'Active'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HR Metrics and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HR Key Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key HR Metrics</h3>
          <div className="space-y-4">
            {hrMetrics.map((metric, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{metric.title}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Target: {metric.target}</span>
                  <span>{metric.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-primary-500"
                    style={{ width: `${metric.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'meeting' ? 'bg-blue-500' :
                  event.type === 'orientation' ? 'bg-green-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-xs text-gray-500">{event.attendees} attendees</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
            View full calendar
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <UserPlus className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Add Employee</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <DollarSign className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Run Payroll</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <BarChart3 className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Generate Report</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FileText className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Create Policy</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Building className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Org Chart</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Shield className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Compliance</p>
          </button>
        </div>
      </div>

      {/* Analytics & Reports Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 text-primary-600 mr-2" />
          Analytics & Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Compliance Overview */}
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Compliance Status</h4>
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Policies Active:</span>
                <span className="font-medium text-gray-900">24/24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Training Complete:</span>
                <span className="font-medium text-gray-900">87%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Audit Status:</span>
                <span className="font-medium text-green-600">Compliant</span>
              </div>
            </div>
            <button className="w-full mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
              View Details →
            </button>
          </div>

          {/* Workforce Analytics */}
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Workforce Insights</h4>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Turnover Rate:</span>
                <span className="font-medium text-gray-900">12.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Satisfaction:</span>
                <span className="font-medium text-gray-900">4.2/5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Productivity:</span>
                <span className="font-medium text-gray-900">87%</span>
              </div>
            </div>
            <button className="w-full mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
              View Analytics →
            </button>
          </div>

          {/* Performance Metrics */}
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Performance</h4>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reviews Complete:</span>
                <span className="font-medium text-gray-900">78%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Goals Met:</span>
                <span className="font-medium text-gray-900">82%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Training Hours:</span>
                <span className="font-medium text-gray-900">24.5</span>
              </div>
            </div>
            <button className="w-full mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
              View Performance →
            </button>
          </div>

          {/* Recent Reports */}
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Recent Reports</h4>
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <div className="font-medium text-gray-900">Turnover Analysis</div>
                <div className="text-xs text-gray-500">Generated 2 days ago</div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="font-medium text-gray-900">Compliance Audit</div>
                <div className="text-xs text-gray-500">Generated 5 days ago</div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="font-medium text-gray-900">Performance Review</div>
                <div className="text-xs text-gray-500">Generated 1 week ago</div>
              </div>
            </div>
            <button className="w-full mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All Reports →
            </button>
          </div>

          {/* Compliance Documents */}
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Compliance Docs</h4>
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Policies:</span>
                <span className="font-medium text-gray-900">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Procedures:</span>
                <span className="font-medium text-gray-900">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Forms:</span>
                <span className="font-medium text-gray-900">32</span>
              </div>
            </div>
            <button className="w-full mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
              View Documents →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Quick Actions</h4>
              <Plus className="w-5 h-5 text-primary-600" />
            </div>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-primary-600 hover:text-primary-700">
                Generate Compliance Report
              </button>
              <button className="w-full text-left text-sm text-primary-600 hover:text-primary-700">
                Schedule Audit
              </button>
              <button className="w-full text-left text-sm text-primary-600 hover:text-primary-700">
                Update Policy
              </button>
            </div>
            <button className="w-full mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
              More Actions →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HRDashboard
