import { 
  Clock, 
  Calendar, 
  DollarSign, 
  BookOpen, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  User,
  Award,
  Target
} from 'lucide-react'

const EmployeeDashboard = () => {
  const stats = [
    {
      name: 'Hours This Week',
      value: '38.5',
      target: '40',
      icon: Clock,
      color: 'bg-blue-500',
      progress: 96
    },
    {
      name: 'Leave Balance',
      value: '12 days',
      target: '20 days',
      icon: Calendar,
      color: 'bg-green-500',
      progress: 60
    },
    {
      name: 'Monthly Salary',
      value: '$5,500',
      target: 'Gross',
      icon: DollarSign,
      color: 'bg-purple-500',
      progress: 100
    },
    {
      name: 'Training Progress',
      value: '3 of 5',
      target: 'Courses',
      icon: BookOpen,
      color: 'bg-orange-500',
      progress: 60
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'clock',
      message: 'Clocked in at 9:00 AM',
      time: 'Today',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'training',
      message: 'Completed "Advanced Excel" course',
      time: 'Yesterday',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'leave',
      message: 'Leave request approved for Dec 20-22',
      time: '2 days ago',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'performance',
      message: 'Performance review submitted',
      time: '1 week ago',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Standup',
      time: 'Today, 10:30 AM',
      type: 'meeting',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Training: React Advanced',
      time: 'Tomorrow, 2:00 PM',
      type: 'training',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Performance Review',
      time: 'Dec 15, 3:00 PM',
      type: 'review',
      color: 'bg-purple-500'
    }
  ]

  const goals = [
    {
      id: 1,
      title: 'Complete React Certification',
      progress: 75,
      dueDate: 'Dec 31, 2024',
      status: 'on-track'
    },
    {
      id: 2,
      title: 'Improve Code Review Score',
      progress: 90,
      dueDate: 'Dec 15, 2024',
      status: 'ahead'
    },
    {
      id: 3,
      title: 'Mentor 2 Junior Developers',
      progress: 50,
      dueDate: 'Jan 15, 2025',
      status: 'on-track'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-primary-100">Ready to make today productive? Here's your overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-500">{stat.target}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-2">{stat.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${stat.color}`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Goals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Goals</h3>
          <div className="space-y-4">
            {goals.map((goal) => (
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

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${event.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Clock In/Out</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Calendar className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Request Leave</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <DollarSign className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">View Pay Stub</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <BookOpen className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Browse Training</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
