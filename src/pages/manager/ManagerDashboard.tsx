import { 
  Users, 
  Clock, 
  TrendingUp, 
  UserCheck, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Target,
  Award,
  DollarSign,
  BarChart3,
  Briefcase
} from 'lucide-react'

const ManagerDashboard = () => {
  const teamStats = [
    {
      name: 'Team Size',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Avg. Attendance',
      value: '96.5%',
      change: '+1.2%',
      changeType: 'increase',
      icon: Clock,
      color: 'bg-green-500'
    },
    {
      name: 'Team Performance',
      value: '4.2/5',
      change: '+0.3',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      name: 'Open Positions',
      value: '3',
      change: '+1',
      changeType: 'increase',
      icon: UserCheck,
      color: 'bg-orange-500'
    }
  ]

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      position: 'Senior Developer',
      status: 'Present',
      performance: 4.8,
      avatar: 'SC',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      position: 'UI/UX Designer',
      status: 'On Leave',
      performance: 4.5,
      avatar: 'AR',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 3,
      name: 'David Kim',
      position: 'Backend Developer',
      status: 'Present',
      performance: 4.2,
      avatar: 'DK',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      name: 'Emily Watson',
      position: 'Frontend Developer',
      status: 'Late',
      performance: 4.6,
      avatar: 'EW',
      statusColor: 'bg-red-100 text-red-800'
    }
  ]

  const pendingRequests = [
    {
      id: 1,
      type: 'leave',
      employee: 'John Doe',
      request: 'Vacation Leave - 3 days',
      date: 'Dec 20-22',
      priority: 'medium',
      icon: Calendar
    },
    {
      id: 2,
      type: 'overtime',
      employee: 'Sarah Chen',
      request: 'Overtime Approval',
      date: 'This week',
      priority: 'low',
      icon: Clock
    },
    {
      id: 3,
      type: 'performance',
      employee: 'Alex Rodriguez',
      request: 'Performance Review',
      date: 'Overdue',
      priority: 'high',
      icon: TrendingUp
    }
  ]

  const upcomingInterviews = [
    {
      id: 1,
      candidate: 'Michael Brown',
      position: 'Senior React Developer',
      time: 'Today, 2:00 PM',
      type: 'Technical Interview'
    },
    {
      id: 2,
      candidate: 'Lisa Johnson',
      position: 'UX Designer',
      time: 'Tomorrow, 10:00 AM',
      type: 'Portfolio Review'
    },
    {
      id: 3,
      candidate: 'James Wilson',
      position: 'Backend Developer',
      time: 'Dec 15, 3:00 PM',
      type: 'Final Interview'
    }
  ]

  const teamGoals = [
    {
      id: 1,
      title: 'Q4 Project Delivery',
      progress: 85,
      dueDate: 'Dec 31, 2024',
      status: 'on-track'
    },
    {
      id: 2,
      title: 'Team Skill Development',
      progress: 70,
      dueDate: 'Jan 15, 2025',
      status: 'on-track'
    },
    {
      id: 3,
      title: 'Hire 2 Developers',
      progress: 60,
      dueDate: 'Feb 1, 2025',
      status: 'behind'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Team Dashboard</h1>
        <p className="text-blue-100">Manage your team effectively with these insights and tools.</p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamStats.map((stat) => (
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
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">{member.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{member.performance}/5</p>
                    <p className="text-xs text-gray-500">Performance</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${member.statusColor}`}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Requests</h3>
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <request.icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">{request.employee}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    request.priority === 'high' ? 'bg-red-100 text-red-800' :
                    request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{request.request}</p>
                <p className="text-xs text-gray-500 mt-1">{request.date}</p>
                <div className="flex space-x-2 mt-3">
                  <button className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded hover:bg-green-100">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded hover:bg-red-100">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interviews */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{interview.candidate}</p>
                  <p className="text-sm text-gray-600">{interview.position}</p>
                  <p className="text-xs text-gray-500">{interview.time} • {interview.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Goals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Goals</h3>
          <div className="space-y-4">
            {teamGoals.map((goal) => (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    goal.status === 'ahead' ? 'bg-green-100 text-green-800' :
                    goal.status === 'on-track' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {goal.status === 'ahead' ? 'Ahead' : goal.status === 'on-track' ? 'On Track' : 'Behind'}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{goal.progress}% complete</span>
                    <span>Due: {goal.dueDate}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        goal.status === 'ahead' ? 'bg-green-500' :
                        goal.status === 'on-track' ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Users className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Schedule 1:1</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <UserCheck className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Post Job</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <BarChart3 className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Team Report</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Target className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Set Goals</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManagerDashboard
