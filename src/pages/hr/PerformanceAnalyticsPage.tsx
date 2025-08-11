import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Award,
  Download,
  Filter,
  Calendar,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building
} from 'lucide-react'

interface PerformanceData {
  department: string
  avgRating: number
  topPerformers: number
  needsImprovement: number
  onTrack: number
  totalEmployees: number
  completionRate: number
  trend: 'up' | 'down' | 'stable'
}

interface RatingDistribution {
  rating: number
  count: number
  percentage: number
  color: string
}

interface GoalProgress {
  category: string
  completed: number
  inProgress: number
  notStarted: number
  total: number
}

const PerformanceAnalyticsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('2024')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const performanceData: PerformanceData[] = [
    {
      department: 'Engineering',
      avgRating: 4.2,
      topPerformers: 12,
      needsImprovement: 3,
      onTrack: 30,
      totalEmployees: 45,
      completionRate: 89.5,
      trend: 'up'
    },
    {
      department: 'Sales',
      avgRating: 3.9,
      topPerformers: 8,
      needsImprovement: 5,
      onTrack: 19,
      totalEmployees: 32,
      completionRate: 82.1,
      trend: 'stable'
    },
    {
      department: 'Marketing',
      avgRating: 4.1,
      topPerformers: 6,
      needsImprovement: 2,
      onTrack: 20,
      totalEmployees: 28,
      completionRate: 91.2,
      trend: 'up'
    },
    {
      department: 'HR',
      avgRating: 4.3,
      topPerformers: 4,
      needsImprovement: 1,
      onTrack: 10,
      totalEmployees: 15,
      completionRate: 94.7,
      trend: 'up'
    }
  ]

  const ratingDistribution: RatingDistribution[] = [
    { rating: 5, count: 35, percentage: 25.9, color: 'bg-green-500' },
    { rating: 4, count: 52, percentage: 38.5, color: 'bg-blue-500' },
    { rating: 3, count: 32, percentage: 23.7, color: 'bg-yellow-500' },
    { rating: 2, count: 12, percentage: 8.9, color: 'bg-orange-500' },
    { rating: 1, count: 4, percentage: 3.0, color: 'bg-red-500' }
  ]

  const goalProgress: GoalProgress[] = [
    {
      category: 'Individual Goals',
      completed: 245,
      inProgress: 89,
      notStarted: 12,
      total: 346
    },
    {
      category: 'Team Goals',
      completed: 18,
      inProgress: 7,
      notStarted: 2,
      total: 27
    },
    {
      category: 'Department Goals',
      completed: 12,
      inProgress: 3,
      notStarted: 0,
      total: 15
    }
  ]

  const overallMetrics = {
    avgCompanyRating: 4.1,
    totalEmployees: 135,
    topPerformers: 30,
    needsImprovement: 11,
    onTrack: 79,
    completionRate: 88.9,
    improvementAreas: 3
  }

  const filteredData = selectedDepartment === 'all' 
    ? performanceData 
    : performanceData.filter(dept => dept.department === selectedDepartment)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
      default: return null
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-blue-600'
    if (rating >= 3.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-600">Analyze employee performance, goal progress, and development trends</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download size={20} />
            Export Report
          </button>
          <button className="btn-primary">
            <BarChart3 size={20} />
            Generate Insights
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {performanceData.map(dept => (
                <option key={dept.department} value={dept.department}>{dept.department}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[2024, 2023, 2022].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Company Rating</p>
              <p className={`text-2xl font-bold ${getRatingColor(overallMetrics.avgCompanyRating)}`}>
                {overallMetrics.avgCompanyRating}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Top Performers</p>
              <p className="text-2xl font-bold text-gray-900">{overallMetrics.topPerformers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Goal Completion</p>
              <p className="text-2xl font-bold text-gray-900">{overallMetrics.completionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Needs Improvement</p>
              <p className="text-2xl font-bold text-gray-900">{overallMetrics.needsImprovement}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'departments', 'goals', 'trends'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                  <div className="space-y-3">
                    {ratingDistribution.map((rating) => (
                      <div key={rating.rating} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded ${rating.color}`}></div>
                          <span className="text-gray-600">{rating.rating} Stars</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${rating.color}`}
                              style={{ width: `${rating.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-12">{rating.count}</span>
                          <span className="text-sm text-gray-500 w-12">{rating.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Top Performers</span>
                      <span className="font-semibold text-green-600">{overallMetrics.topPerformers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">On Track</span>
                      <span className="font-semibold text-blue-600">{overallMetrics.onTrack}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Needs Improvement</span>
                      <span className="font-semibold text-yellow-600">{overallMetrics.needsImprovement}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '22.2%' }}></div>
                      <div className="bg-blue-500 h-2 rounded-full -mt-2" style={{ width: '58.5%' }}></div>
                      <div className="bg-yellow-500 h-2 rounded-full -mt-2" style={{ width: '8.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Strong performance culture</p>
                    <p className="text-lg font-semibold text-green-600">88.9% completion</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Top performers identified</p>
                    <p className="text-lg font-semibold text-blue-600">30 employees</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Development areas</p>
                    <p className="text-lg font-semibold text-yellow-600">3 departments</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Performers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On Track</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((dept) => (
                      <tr key={dept.department} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Building className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="font-medium text-gray-900">{dept.department}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.totalEmployees}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${getRatingColor(dept.avgRating)}`}>
                            {dept.avgRating}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{dept.topPerformers}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{dept.onTrack}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full" 
                                style={{ width: `${dept.completionRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{dept.completionRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getTrendIcon(dept.trend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {goalProgress.map((goal) => (
                  <div key={goal.category} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{goal.category}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-semibold text-green-600">{goal.completed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">In Progress</span>
                        <span className="font-semibold text-blue-600">{goal.inProgress}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Not Started</span>
                        <span className="font-semibold text-gray-600">{goal.notStarted}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(goal.completed / goal.total) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-blue-500 h-2 rounded-full -mt-2" 
                          style={{ width: `${(goal.inProgress / goal.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-medium text-gray-900">
                          {Math.round((goal.completed / goal.total) * 100)}% Complete
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Achievement Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Strengths</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        High completion rate for individual goals
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Strong team collaboration on shared objectives
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Clear goal setting and tracking processes
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Areas for Improvement</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                        Some goals lack clear milestones
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                        Need better progress tracking tools
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                        Regular check-ins could be improved
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q1 2024</span>
                      <span className="font-semibold text-green-600">4.1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q4 2023</span>
                      <span className="font-semibold text-green-600">4.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q3 2023</span>
                      <span className="font-semibold text-blue-600">3.9</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q2 2023</span>
                      <span className="font-semibold text-blue-600">3.8</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Completion Trends</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">2024 YTD</span>
                      <span className="font-semibold text-green-600">88.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">2023 Full Year</span>
                      <span className="font-semibold text-green-600">87.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">2022 Full Year</span>
                      <span className="font-semibold text-blue-600">85.1%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictions & Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Expected Rating</p>
                    <p className="text-lg font-semibold text-blue-600">4.2</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Goal Target</p>
                    <p className="text-lg font-semibold text-green-600">90%</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Top Performers</p>
                    <p className="text-lg font-semibold text-purple-600">35</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PerformanceAnalyticsPage
