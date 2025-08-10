import React, { useState } from 'react'
import { Star, TrendingUp, TrendingDown, Target, Calendar, Users } from 'lucide-react'

const PerformancePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q1')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  const performanceData = [
    {
      id: 'PERF001',
      employee: 'John Doe',
      department: 'Engineering',
      currentRating: 4.5,
      previousRating: 4.2,
      goals: { completed: 8, total: 10 },
      lastReview: '2024-01-15',
      nextReview: '2024-04-15',
      skills: ['Technical Excellence', 'Team Collaboration', 'Problem Solving'],
      improvements: ['Communication', 'Time Management'],
      manager: 'Sarah Wilson'
    },
    {
      id: 'PERF002',
      employee: 'Jane Smith',
      department: 'Marketing',
      currentRating: 4.2,
      previousRating: 3.8,
      goals: { completed: 7, total: 8 },
      lastReview: '2024-01-10',
      nextReview: '2024-04-10',
      skills: ['Creative Thinking', 'Data Analysis', 'Campaign Management'],
      improvements: ['Public Speaking', 'Strategic Planning'],
      manager: 'Mike Johnson'
    },
    {
      id: 'PERF003',
      employee: 'Mike Johnson',
      department: 'Sales',
      currentRating: 4.8,
      previousRating: 4.6,
      goals: { completed: 9, total: 10 },
      lastReview: '2024-01-05',
      nextReview: '2024-04-05',
      skills: ['Client Relations', 'Negotiation', 'Revenue Growth'],
      improvements: ['CRM Utilization'],
      manager: 'Sales Director'
    }
  ]

  const performanceMetrics = {
    averageRating: 4.3,
    topPerformers: 15,
    improvementNeeded: 8,
    reviewsCompleted: 89,
    totalEmployees: 142
  }

  const departmentPerformance = [
    { department: 'Engineering', avgRating: 4.4, employees: 45, trend: 'up' },
    { department: 'Sales', avgRating: 4.6, employees: 32, trend: 'up' },
    { department: 'Marketing', avgRating: 4.2, employees: 18, trend: 'stable' },
    { department: 'HR', avgRating: 4.1, employees: 12, trend: 'down' },
    { department: 'Finance', avgRating: 4.3, employees: 15, trend: 'up' }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    }
    return <div className="w-4 h-4"></div>
  }

  const getDepartmentTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
    }
  }

  const filteredData = performanceData.filter(emp => 
    departmentFilter === 'all' || emp.department === departmentFilter
  )

  const departments = ['all', ...new Set(performanceData.map(emp => emp.department))]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600">Track and evaluate employee performance across the organization</p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="font-medium text-gray-900">Avg Rating</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {performanceMetrics.averageRating}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Top Performers</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {performanceMetrics.topPerformers}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-gray-900">Need Improvement</h3>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {performanceMetrics.improvementNeeded}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">Reviews Done</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {performanceMetrics.reviewsCompleted}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium text-gray-900">Completion Rate</h3>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((performanceMetrics.reviewsCompleted / performanceMetrics.totalEmployees) * 100)}%
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{dept.department}</h3>
                  {getDepartmentTrendIcon(dept.trend)}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(dept.avgRating)}
                  <span className="ml-2 font-medium text-gray-900">{dept.avgRating}</span>
                </div>
                <div className="text-sm text-gray-600">{dept.employees} employees</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="2024-Q1">2024 Q1</option>
              <option value="2023-Q4">2023 Q4</option>
              <option value="2023-Q3">2023 Q3</option>
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Performance Records */}
        <div className="space-y-4">
          {filteredData.map((employee) => (
            <div key={employee.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">
                      {employee.employee.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{employee.employee}</h3>
                    <p className="text-gray-600">{employee.department}</p>
                    <p className="text-sm text-gray-500">Manager: {employee.manager}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-gray-900">{employee.currentRating}</span>
                    {getTrendIcon(employee.currentRating, employee.previousRating)}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(employee.currentRating)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Goal Progress</h4>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completed: {employee.goals.completed}</span>
                    <span>Total: {employee.goals.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${(employee.goals.completed / employee.goals.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {Math.round((employee.goals.completed / employee.goals.total) * 100)}% Complete
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Strengths</h4>
                  <div className="space-y-1">
                    {employee.skills.slice(0, 3).map((skill, index) => (
                      <div key={index} className="text-sm bg-green-50 text-green-800 px-2 py-1 rounded">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Development Areas</h4>
                  <div className="space-y-1">
                    {employee.improvements.map((area, index) => (
                      <div key={index} className="text-sm bg-yellow-50 text-yellow-800 px-2 py-1 rounded">
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Last Review: {new Date(employee.lastReview).toLocaleDateString()} • 
                  Next Review: {new Date(employee.nextReview).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                    View Details
                  </button>
                  <button className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition-colors">
                    Schedule Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PerformancePage
