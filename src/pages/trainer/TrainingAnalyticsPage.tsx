import React, { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Target,
  Activity
} from 'lucide-react'

interface TrainingMetric {
  id: string
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
}

interface CompletionRate {
  program: string
  completed: number
  inProgress: number
  notStarted: number
  total: number
}

const mockMetrics: TrainingMetric[] = [
  {
    id: '1',
    name: 'Total Learners',
    value: 245,
    change: 12.5,
    trend: 'up'
  },
  {
    id: '2',
    name: 'Active Programs',
    value: 18,
    change: 5.2,
    trend: 'up'
  },
  {
    id: '3',
    name: 'Completion Rate',
    value: 78.3,
    change: -2.1,
    trend: 'down'
  },
  {
    id: '4',
    name: 'Avg. Training Hours',
    value: 24.7,
    change: 8.9,
    trend: 'up'
  }
]

const mockCompletionRates: CompletionRate[] = [
  {
    program: 'Project Management',
    completed: 45,
    inProgress: 23,
    notStarted: 12,
    total: 80
  },
  {
    program: 'Agile Development',
    completed: 38,
    inProgress: 31,
    notStarted: 11,
    total: 80
  },
  {
    program: 'Data Analysis',
    completed: 52,
    inProgress: 18,
    notStarted: 10,
    total: 80
  }
]

const TrainingAnalyticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />
      case 'stable': return <Activity className="w-4 h-4 text-gray-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      case 'stable': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor training performance and learner progress</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => (
          <div key={metric.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  {metric.name.includes('Learners') && <Users className="w-5 h-5 text-blue-600" />}
                  {metric.name.includes('Programs') && <BookOpen className="w-5 h-5 text-blue-600" />}
                  {metric.name.includes('Rate') && <Award className="w-5 h-5 text-blue-600" />}
                  {metric.name.includes('Hours') && <Clock className="w-5 h-5 text-blue-600" />}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
              <div className="flex items-center">
                {getTrendIcon(metric.trend)}
                <span className={`ml-1 text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Rates Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Completion Rates</h3>
          <div className="space-y-4">
            {mockCompletionRates.map((program) => (
              <div key={program.program} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{program.program}</span>
                  <span className="text-gray-500">
                    {Math.round((program.completed / program.total) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(program.completed / program.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{program.completed} completed</span>
                  <span>{program.inProgress} in progress</span>
                  <span>{program.notStarted} not started</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">High Performers</span>
              </div>
              <span className="text-lg font-bold text-green-600">67</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Average Performers</span>
              </div>
              <span className="text-lg font-bold text-yellow-600">89</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-sm font-medium text-red-800">Needs Improvement</span>
              </div>
              <span className="text-lg font-bold text-red-600">23</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Training Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Project Management training completed by 15 learners</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New enrollment in Agile Development program</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Data Analysis assessment scheduled</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Schedule Training</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Manage Learners</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TrainingAnalyticsPage
