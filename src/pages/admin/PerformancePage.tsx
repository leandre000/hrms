import React, { useState } from 'react'
import { BarChart3, Users, Star, TrendingUp, Calendar, CheckCircle, AlertCircle, Eye, Edit, Plus, Search, Filter, Download } from 'lucide-react'

const AdminPerformancePage = () => {
  const [periodFilter, setPeriodFilter] = useState('current')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [view, setView] = useState<'overview' | 'reviews' | 'calibration'>('overview')

  const performanceData = [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      reviewer: 'Sarah Wilson',
      period: '2024 Q1',
      overallRating: 4.2,
      categories: {
        technical: 4.5,
        communication: 4.0,
        leadership: 3.8,
        productivity: 4.3,
        teamwork: 4.1
      },
      goals: 5,
      goalsCompleted: 4,
      status: 'completed',
      reviewDate: '2024-01-15',
      nextReview: '2024-04-15',
      strengths: ['Strong technical skills', 'Reliable delivery', 'Mentors junior developers'],
      improvements: ['Leadership skills', 'Communication with stakeholders'],
      promotionReadiness: 'ready',
      salary: 95000,
      recommendedIncrease: 8
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Wilson',
      department: 'Engineering',
      position: 'Engineering Manager',
      reviewer: 'Michael Chen',
      period: '2024 Q1',
      overallRating: 4.6,
      categories: {
        technical: 4.2,
        communication: 4.8,
        leadership: 4.9,
        productivity: 4.5,
        teamwork: 4.7
      },
      goals: 6,
      goalsCompleted: 6,
      status: 'completed',
      reviewDate: '2024-01-10',
      nextReview: '2024-04-10',
      strengths: ['Excellent leadership', 'Team development', 'Strategic thinking'],
      improvements: ['Technical depth in new technologies'],
      promotionReadiness: 'ready',
      salary: 120000,
      recommendedIncrease: 12
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Michael Chen',
      department: 'Engineering',
      position: 'Principal Engineer',
      reviewer: 'Lisa Rodriguez',
      period: '2024 Q1',
      overallRating: 4.8,
      categories: {
        technical: 4.9,
        communication: 4.6,
        leadership: 4.8,
        productivity: 4.9,
        teamwork: 4.7
      },
      goals: 4,
      goalsCompleted: 4,
      status: 'completed',
      reviewDate: '2024-01-05',
      nextReview: '2024-04-05',
      strengths: ['Technical excellence', 'Architecture leadership', 'Innovation'],
      improvements: ['Delegation skills'],
      promotionReadiness: 'not_ready',
      salary: 140000,
      recommendedIncrease: 10
    },
    {
      id: 4,
      employeeId: 'EMP005',
      employeeName: 'Alex Thompson',
      department: 'Engineering',
      position: 'Junior Developer',
      reviewer: 'Sarah Wilson',
      period: '2024 Q1',
      overallRating: 3.6,
      categories: {
        technical: 3.8,
        communication: 3.4,
        leadership: 3.2,
        productivity: 3.9,
        teamwork: 3.7
      },
      goals: 4,
      goalsCompleted: 3,
      status: 'in_progress',
      reviewDate: null,
      nextReview: '2024-02-01',
      strengths: ['Quick learner', 'Eager to improve', 'Good coding practices'],
      improvements: ['Communication skills', 'Time management', 'Code review participation'],
      promotionReadiness: 'needs_development',
      salary: 70000,
      recommendedIncrease: 5
    }
  ]

  const departments = ['all', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
  const statuses = ['all', 'completed', 'in_progress', 'overdue', 'scheduled']
  const periods = ['current', '2024 Q1', '2023 Q4', '2023 Q3']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPromotionColor = (readiness: string) => {
    switch (readiness) {
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'not_ready':
        return 'bg-yellow-100 text-yellow-800'
      case 'needs_development':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredData = performanceData.filter(record => {
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    const matchesPeriod = periodFilter === 'current' || record.period === periodFilter
    return matchesDepartment && matchesStatus && matchesPeriod
  })

  const stats = {
    totalReviews: performanceData.length,
    completedReviews: performanceData.filter(r => r.status === 'completed').length,
    averageRating: (performanceData.reduce((sum, r) => sum + r.overallRating, 0) / performanceData.length).toFixed(1),
    promotionReady: performanceData.filter(r => r.promotionReadiness === 'ready').length,
    highPerformers: performanceData.filter(r => r.overallRating >= 4.5).length,
    needsImprovement: performanceData.filter(r => r.overallRating < 3.5).length,
    avgGoalCompletion: Math.round((performanceData.reduce((sum, r) => sum + (r.goalsCompleted / r.goals * 100), 0) / performanceData.length)),
    totalSalaryIncrease: performanceData.reduce((sum, r) => sum + (r.salary * r.recommendedIncrease / 100), 0)
  }

  const ratingDistribution = [
    { rating: '4.5-5.0', count: performanceData.filter(r => r.overallRating >= 4.5).length, color: 'bg-green-500' },
    { rating: '4.0-4.4', count: performanceData.filter(r => r.overallRating >= 4.0 && r.overallRating < 4.5).length, color: 'bg-blue-500' },
    { rating: '3.5-3.9', count: performanceData.filter(r => r.overallRating >= 3.5 && r.overallRating < 4.0).length, color: 'bg-yellow-500' },
    { rating: '3.0-3.4', count: performanceData.filter(r => r.overallRating >= 3.0 && r.overallRating < 3.5).length, color: 'bg-orange-500' },
    { rating: '<3.0', count: performanceData.filter(r => r.overallRating < 3.0).length, color: 'bg-red-500' }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
            <p className="text-gray-600">Manage employee performance reviews and development</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('overview')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'overview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setView('reviews')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'reviews' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setView('calibration')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'calibration' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Calibration
              </button>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              Start Review Cycle
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.averageRating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              {stats.completedReviews}/{stats.totalReviews} reviews completed
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.highPerformers}</div>
                <div className="text-sm text-gray-600">High Performers</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              Rating 4.5+ (Excellence)
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.promotionReady}</div>
                <div className="text-sm text-gray-600">Promotion Ready</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              Ready for advancement
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.avgGoalCompletion}%</div>
                <div className="text-sm text-gray-600">Goal Completion</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">
              Average across all employees
            </div>
          </div>
        </div>

        {view === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Rating Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Rating Distribution</h2>
              <div className="space-y-3">
                {ratingDistribution.map((dist, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-16 text-sm font-medium text-gray-600">{dist.rating}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className={`${dist.color} h-6 rounded-full flex items-center justify-end pr-2`}
                        style={{ width: `${(dist.count / stats.totalReviews) * 100}%` }}
                      >
                        {dist.count > 0 && (
                          <span className="text-white text-xs font-medium">{dist.count}</span>
                        )}
                      </div>
                    </div>
                    <div className="w-12 text-sm text-gray-500">{((dist.count / stats.totalReviews) * 100).toFixed(0)}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Performance */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h2>
              <div className="space-y-4">
                {departments.slice(1).map((dept) => {
                  const deptData = performanceData.filter(r => r.department === dept)
                  const avgRating = deptData.length > 0 ? (deptData.reduce((sum, r) => sum + r.overallRating, 0) / deptData.length).toFixed(1) : '0.0'
                  const highPerformers = deptData.filter(r => r.overallRating >= 4.5).length
                  
                  return (
                    <div key={dept} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">{dept}</h3>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{avgRating}</div>
                          <div className="text-sm text-gray-500">{deptData.length} employees</div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{highPerformers} high performers</span>
                        <span>{((highPerformers / deptData.length) * 100).toFixed(0)}% excellence rate</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(parseFloat(avgRating) / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period === 'current' ? 'Current Period' : period}
                </option>
              ))}
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Performance Reviews Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Overall Rating</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Goals</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Promotion</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Salary Impact</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{record.employeeName}</div>
                          <div className="text-sm text-gray-500">{record.position}</div>
                          <div className="text-sm text-gray-500">{record.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-gray-900">{record.overallRating}</div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= record.overallRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Reviewer: {record.reviewer}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{record.goalsCompleted}/{record.goals} completed</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(record.goalsCompleted / record.goals) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {Math.round((record.goalsCompleted / record.goals) * 100)}% completion
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        {record.nextReview && `Next: ${new Date(record.nextReview).toLocaleDateString()}`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPromotionColor(record.promotionReadiness)}`}>
                        {record.promotionReadiness.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{record.recommendedIncrease}% increase</div>
                      <div className="text-sm text-gray-500">
                        ${((record.salary * record.recommendedIncrease) / 100).toLocaleString()} additional
                      </div>
                      <div className="text-sm text-gray-500">
                        New: ${(record.salary + (record.salary * record.recommendedIncrease / 100)).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View Review">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Edit Review">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors" title="Schedule Meeting">
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {view === 'calibration' && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Calibration</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Calibration Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Total Budget Impact:</span>
                    <span className="font-semibold ml-2">${stats.totalSalaryIncrease.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">High Performers:</span>
                    <span className="font-semibold ml-2">{stats.highPerformers}/{stats.totalReviews}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Promotion Ready:</span>
                    <span className="font-semibold ml-2">{stats.promotionReady} employees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPerformancePage
