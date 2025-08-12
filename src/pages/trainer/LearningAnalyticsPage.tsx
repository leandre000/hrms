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
  Activity,
  PieChart,
  LineChart
} from 'lucide-react'

interface LearningMetric {
  id: string
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  target: number
}

interface ProgramPerformance {
  program: string
  enrolled: number
  completed: number
  inProgress: number
  droppedOut: number
  avgScore: number
  avgTime: number
}

const mockMetrics: LearningMetric[] = [
  {
    id: '1',
    name: 'Active Learners',
    value: 189,
    change: 12.5,
    trend: 'up',
    target: 200
  },
  {
    id: '2',
    name: 'Course Completion Rate',
    value: 78.3,
    change: -2.1,
    trend: 'down',
    target: 85
  },
  {
    id: '3',
    name: 'Average Score',
    value: 84.7,
    change: 5.2,
    trend: 'up',
    target: 80
  },
  {
    id: '4',
    name: 'Learning Hours',
    value: 1247,
    change: 18.9,
    trend: 'up',
    target: 1200
  }
]

const mockProgramPerformance: ProgramPerformance[] = [
  {
    program: 'Project Management',
    enrolled: 45,
    completed: 38,
    inProgress: 5,
    droppedOut: 2,
    avgScore: 87.2,
    avgTime: 24
  },
  {
    program: 'Agile Development',
    enrolled: 32,
    completed: 28,
    inProgress: 3,
    droppedOut: 1,
    avgScore: 82.5,
    avgTime: 18
  },
  {
    program: 'Data Analysis',
    enrolled: 28,
    completed: 25,
    inProgress: 2,
    droppedOut: 1,
    avgScore: 89.1,
    avgTime: 32
  }
]

const LearningAnalyticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedProgram, setSelectedProgram] = useState<string>('all')

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

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredPrograms = selectedProgram === 'all' 
    ? mockProgramPerformance 
    : mockProgramPerformance.filter(p => p.program === selectedProgram)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into learning performance and trends</p>
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
                  {metric.name.includes('Completion') && <CheckCircle className="w-5 h-5 text-blue-600" />}
                  {metric.name.includes('Score') && <Award className="w-5 h-5 text-blue-600" />}
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
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Target: {metric.target}</span>
                <span className={`font-medium ${getProgressColor(metric.value, metric.target)}`}>
                  {Math.round((metric.value / metric.target) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(metric.value, metric.target) === 'text-green-600' ? 'bg-green-500' : getProgressColor(metric.value, metric.target) === 'text-yellow-600' ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Program Performance */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Program Performance</h3>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Programs</option>
              {mockProgramPerformance.map((program) => (
                <option key={program.program} value={program.program}>
                  {program.program}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Time (hrs)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrograms.map((program) => (
                <tr key={program.program} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{program.program}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.enrolled}</div>
                    <div className="text-xs text-gray-500">
                      {program.completed} completed, {program.inProgress} in progress
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(program.completed / program.enrolled) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">
                        {Math.round((program.completed / program.enrolled) * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.avgScore}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.avgTime}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Learning Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Increasing Engagement</span>
              </div>
              <span className="text-lg font-bold text-green-600">+15%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Time to Complete</span>
              </div>
              <span className="text-lg font-bold text-blue-600">-8%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Goal Achievement</span>
              </div>
              <span className="text-lg font-bold text-yellow-600">+12%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">High Performance</p>
                <p className="text-sm text-gray-600">Data Analysis program shows highest completion rates</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Engagement Boost</p>
                <p className="text-sm text-gray-600">Interactive elements increased learner participation by 25%</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Areas for Improvement</p>
                <p className="text-sm text-gray-600">Agile Development program needs content optimization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningAnalyticsPage
