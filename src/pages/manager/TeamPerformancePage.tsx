import {
  Users,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Star,
  Calendar,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import { useState } from "react";

const TeamPerformancePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("overall");

  const performanceMetrics = [
    {
      name: "Overall Performance",
      value: "4.2/5",
      change: "+0.3",
      changeType: "increase",
      icon: TrendingUp,
      color: "bg-green-500",
      trend: "up",
    },
    {
      name: "Task Completion",
      value: "87%",
      change: "+5%",
      changeType: "increase",
      icon: CheckCircle,
      color: "bg-blue-500",
      trend: "up",
    },
    {
      name: "On-Time Delivery",
      value: "92%",
      change: "+3%",
      changeType: "increase",
      icon: Clock,
      color: "bg-purple-500",
      trend: "up",
    },
    {
      name: "Quality Score",
      value: "4.5/5",
      change: "+0.2",
      changeType: "increase",
      icon: Award,
      color: "bg-orange-500",
      trend: "up",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Senior Developer",
      avatar: "SC",
      overallScore: 4.8,
      taskCompletion: 95,
      onTimeDelivery: 98,
      qualityScore: 4.7,
      productivity: 92,
      collaboration: 4.6,
      innovation: 4.5,
      trend: "up",
      lastReview: "Dec 1, 2024",
      nextReview: "Mar 1, 2025",
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      position: "UI/UX Designer",
      avatar: "AR",
      overallScore: 4.5,
      taskCompletion: 88,
      onTimeDelivery: 85,
      qualityScore: 4.6,
      productivity: 87,
      collaboration: 4.8,
      innovation: 4.9,
      trend: "stable",
      lastReview: "Nov 15, 2024",
      nextReview: "Feb 15, 2025",
    },
    {
      id: 3,
      name: "David Kim",
      position: "Backend Developer",
      avatar: "DK",
      overallScore: 4.2,
      taskCompletion: 82,
      onTimeDelivery: 78,
      qualityScore: 4.3,
      productivity: 85,
      collaboration: 4.1,
      innovation: 4.0,
      trend: "up",
      lastReview: "Nov 30, 2024",
      nextReview: "Feb 28, 2025",
    },
    {
      id: 4,
      name: "Emily Watson",
      position: "Frontend Developer",
      avatar: "EW",
      overallScore: 4.6,
      taskCompletion: 90,
      onTimeDelivery: 92,
      qualityScore: 4.5,
      productivity: 89,
      collaboration: 4.7,
      innovation: 4.4,
      trend: "up",
      lastReview: "Dec 5, 2024",
      nextReview: "Mar 5, 2025",
    },
    {
      id: 5,
      name: "Michael Brown",
      position: "DevOps Engineer",
      avatar: "MB",
      overallScore: 4.3,
      taskCompletion: 85,
      onTimeDelivery: 88,
      qualityScore: 4.4,
      productivity: 86,
      collaboration: 4.2,
      innovation: 4.3,
      trend: "stable",
      lastReview: "Nov 20, 2024",
      nextReview: "Feb 20, 2025",
    },
    {
      id: 6,
      name: "Lisa Wang",
      position: "QA Engineer",
      avatar: "LW",
      overallScore: 4.7,
      taskCompletion: 93,
      onTimeDelivery: 95,
      qualityScore: 4.8,
      productivity: 91,
      collaboration: 4.5,
      innovation: 4.2,
      trend: "up",
      lastReview: "Dec 10, 2024",
      nextReview: "Mar 10, 2025",
    },
  ];

  const performanceTrends = [
    { month: "Jul", performance: 3.8, tasks: 75, quality: 4.0 },
    { month: "Aug", performance: 3.9, tasks: 78, quality: 4.1 },
    { month: "Sep", performance: 4.0, tasks: 80, quality: 4.2 },
    { month: "Oct", performance: 4.1, tasks: 82, quality: 4.3 },
    { month: "Nov", performance: 4.2, tasks: 85, quality: 4.4 },
    { month: "Dec", performance: 4.2, tasks: 87, quality: 4.5 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4.0) return "text-blue-600";
    if (score >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down")
      return (
        <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
      );
    return <BarChart3 className="w-4 h-4 text-gray-500" />;
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 4.5)
      return {
        level: "Exceeds Expectations",
        color: "bg-green-100 text-green-800",
      };
    if (score >= 4.0)
      return {
        level: "Meets Expectations",
        color: "bg-blue-100 text-blue-800",
      };
    if (score >= 3.5)
      return {
        level: "Needs Improvement",
        color: "bg-yellow-100 text-yellow-800",
      };
    return { level: "Below Expectations", color: "bg-red-100 text-red-800" };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Performance</h1>
          <p className="text-gray-600">
            Track and analyze your team's performance metrics and KPIs
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="btn-primary">
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance Review
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${metric.color} bg-opacity-10`}>
                <metric.icon
                  className={`w-6 h-6 ${metric.color.replace("bg-", "text-")}`}
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {metric.name}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  metric.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {metric.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Trends Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Performance Trends
          </h2>
          <div className="flex space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="month">Last 6 Months</option>
              <option value="quarter">Last 4 Quarters</option>
              <option value="year">Last 2 Years</option>
            </select>
          </div>
        </div>

        <div className="h-64 flex items-end justify-between space-x-2">
          {performanceTrends.map((trend, index) => (
            <div
              key={trend.month}
              className="flex-1 flex flex-col items-center"
            >
              <div className="w-full bg-gray-200 rounded-t-lg relative">
                <div
                  className="bg-primary-500 rounded-t-lg transition-all duration-300"
                  style={{ height: `${(trend.performance / 5) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-medium text-gray-900">
                  {trend.month}
                </p>
                <p className="text-xs text-gray-500">{trend.performance}/5</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Individual Performance
            </h2>
            <div className="flex space-x-2">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="overall">Overall Score</option>
                <option value="tasks">Task Completion</option>
                <option value="quality">Quality Score</option>
                <option value="productivity">Productivity</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overall Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task Completion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quality Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productivity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {member.avatar}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`text-sm font-medium ${getScoreColor(
                          member.overallScore
                        )}`}
                      >
                        {member.overallScore}/5
                      </span>
                      <span
                        className={`ml-2 text-xs px-2 py-1 rounded-full ${
                          getPerformanceLevel(member.overallScore).color
                        }`}
                      >
                        {getPerformanceLevel(member.overallScore).level}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {member.taskCompletion}%
                      </span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${member.taskCompletion}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`text-sm font-medium ${getScoreColor(
                          member.qualityScore
                        )}`}
                      >
                        {member.qualityScore}/5
                      </span>
                      <div className="ml-2 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= member.qualityScore
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {member.productivity}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTrendIcon(member.trend)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Performers
          </h3>
          <div className="space-y-4">
            {teamMembers
              .sort((a, b) => b.overallScore - a.overallScore)
              .slice(0, 3)
              .map((member, index) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {member.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600">
                      {member.overallScore}/5
                    </p>
                    <p className="text-xs text-gray-500">Overall Score</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Areas for Improvement
          </h3>
          <div className="space-y-4">
            {teamMembers
              .filter((member) => member.overallScore < 4.5)
              .slice(0, 3)
              .map((member) => (
                <div
                  key={member.id}
                  className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <span className="text-sm text-yellow-800">
                      {member.overallScore}/5
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Focus areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.collaboration < 4.5 && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Collaboration
                      </span>
                    )}
                    {member.innovation < 4.5 && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Innovation
                      </span>
                    )}
                    {member.taskCompletion < 90 && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Task Completion
                      </span>
                    )}
                  </div>
                </div>
              ))}
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
            <BarChart3 className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">
              Schedule Reviews
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Target className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Set Goals</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Award className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Recognize</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Training Plan</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformancePage;
