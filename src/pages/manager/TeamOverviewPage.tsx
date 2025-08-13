import {
  Users,
  Clock,
  TrendingUp,
  UserCheck,
  Calendar,
  Target,
  Award,
  BarChart3,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const TeamOverviewPage = () => {
  const teamStats = [
    {
      name: "Team Size",
      value: "12",
      change: "+2",
      changeType: "increase",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      name: "Active Projects",
      value: "8",
      change: "+1",
      changeType: "increase",
      icon: Briefcase,
      color: "bg-green-500",
    },
    {
      name: "Avg. Performance",
      value: "4.2/5",
      change: "+0.3",
      changeType: "increase",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      name: "On Leave",
      value: "2",
      change: "-1",
      changeType: "decrease",
      icon: Calendar,
      color: "bg-orange-500",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Senior Developer",
      status: "Present",
      performance: 4.8,
      avatar: "SC",
      statusColor: "bg-green-100 text-green-800",
      lastActive: "2 min ago",
      currentTask: "Working on API integration",
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      position: "UI/UX Designer",
      status: "On Leave",
      performance: 4.5,
      avatar: "AR",
      statusColor: "bg-yellow-100 text-yellow-800",
      lastActive: "1 day ago",
      currentTask: "Vacation",
    },
    {
      id: 3,
      name: "David Kim",
      position: "Backend Developer",
      status: "Present",
      performance: 4.2,
      avatar: "DK",
      statusColor: "bg-green-100 text-green-800",
      lastActive: "5 min ago",
      currentTask: "Database optimization",
    },
    {
      id: 4,
      name: "Emily Watson",
      position: "Frontend Developer",
      status: "Late",
      performance: 4.6,
      avatar: "EW",
      statusColor: "bg-red-100 text-red-800",
      lastActive: "15 min ago",
      currentTask: "Component testing",
    },
    {
      id: 5,
      name: "Michael Brown",
      position: "DevOps Engineer",
      status: "Present",
      performance: 4.3,
      avatar: "MB",
      statusColor: "bg-green-100 text-green-800",
      lastActive: "1 min ago",
      currentTask: "Deployment pipeline",
    },
    {
      id: 6,
      name: "Lisa Wang",
      position: "QA Engineer",
      status: "Present",
      performance: 4.7,
      avatar: "LW",
      statusColor: "bg-green-100 text-green-800",
      lastActive: "3 min ago",
      currentTask: "Test automation",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "task_completed",
      employee: "Sarah Chen",
      action: "completed task",
      details: "API integration for user authentication",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "leave_requested",
      employee: "Alex Rodriguez",
      action: "requested leave",
      details: "Vacation - Dec 20-22",
      time: "1 day ago",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "performance_review",
      employee: "David Kim",
      action: "completed performance review",
      details: "Q4 2024 review submitted",
      time: "2 days ago",
      icon: BarChart3,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "goal_achieved",
      employee: "Emily Watson",
      action: "achieved goal",
      details: "Frontend performance optimization",
      time: "3 days ago",
      icon: Target,
      color: "text-orange-600",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      type: "team_meeting",
      title: "Weekly Team Standup",
      time: "Today, 9:00 AM",
      participants: "All team members",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "performance_review",
      title: "Q4 Performance Reviews",
      time: "Dec 15-20",
      participants: "All team members",
      icon: BarChart3,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 3,
      type: "project_deadline",
      title: "Project Alpha Deadline",
      time: "Dec 25",
      participants: "Development team",
      icon: Target,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Overview</h1>
          <p className="text-gray-600">
            Monitor your team's performance, activities, and status
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Users className="w-4 h-4 mr-2" />
            Team Report
          </button>
          <button className="btn-primary">
            <Users className="w-4 h-4 mr-2" />
            Schedule 1:1
          </button>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamStats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon
                  className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`}
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Team Members Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Team Members Status
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {member.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${member.statusColor}`}
                    >
                      {member.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {member.position}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {member.currentTask}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        Performance:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {member.performance}/5
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {member.lastActive}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activities
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.employee}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Events
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${event.color}`}>
                    <event.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">{event.time}</p>
                    <p className="text-xs text-gray-500">
                      {event.participants}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Users className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Team Meeting</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <BarChart3 className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">
              Performance Review
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Target className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Set Goals</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Calendar className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Schedule 1:1</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamOverviewPage;
