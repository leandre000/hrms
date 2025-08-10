import React, { useState } from 'react'
import { Target, Users, TrendingUp, Calendar, CheckCircle, Clock, AlertTriangle, Plus, Eye, Edit, Search, Filter } from 'lucide-react'

const AdminGoalsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('current')

  const goalsData = [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      goalTitle: 'Complete E-commerce Platform Migration',
      description: 'Lead the migration of legacy e-commerce platform to modern architecture',
      category: 'Project Delivery',
      priority: 'high',
      progress: 85,
      status: 'on_track',
      startDate: '2024-01-01',
      dueDate: '2024-03-31',
      lastUpdate: '2024-01-20',
      kpis: [
        { metric: 'Migration Progress', target: '100%', current: '85%' },
        { metric: 'Zero Downtime', target: 'Yes', current: 'On Track' },
        { metric: 'Performance Improvement', target: '30%', current: '25%' }
      ],
      manager: 'Sarah Wilson'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Wilson',
      department: 'Engineering',
      position: 'Engineering Manager',
      goalTitle: 'Improve Team Productivity by 25%',
      description: 'Implement agile practices and tools to enhance team productivity',
      category: 'Team Development',
      priority: 'high',
      progress: 70,
      status: 'on_track',
      startDate: '2024-01-01',
      dueDate: '2024-06-30',
      lastUpdate: '2024-01-18',
      kpis: [
        { metric: 'Sprint Velocity', target: '25% increase', current: '18% increase' },
        { metric: 'Team Satisfaction', target: '4.5/5', current: '4.2/5' },
        { metric: 'Code Quality Score', target: '90%', current: '87%' }
      ],
      manager: 'Michael Chen'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Michael Chen',
      department: 'Engineering',
      position: 'Principal Engineer',
      goalTitle: 'Design System Architecture for Scalability',
      description: 'Create a scalable architecture that supports 10x user growth',
      category: 'Technical Excellence',
      priority: 'critical',
      progress: 45,
      status: 'at_risk',
      startDate: '2024-01-01',
      dueDate: '2024-04-30',
      lastUpdate: '2024-01-15',
      kpis: [
        { metric: 'Architecture Documentation', target: '100%', current: '60%' },
        { metric: 'Load Testing', target: '10x capacity', current: '5x capacity' },
        { metric: 'Performance Benchmarks', target: 'Defined', current: 'In Progress' }
      ],
      manager: 'Lisa Rodriguez'
    },
    {
      id: 4,
      employeeId: 'EMP005',
      employeeName: 'Alex Thompson',
      department: 'Engineering',
      position: 'Junior Developer',
      goalTitle: 'Complete React Certification',
      description: 'Obtain React developer certification and apply skills to current projects',
      category: 'Professional Development',
      priority: 'medium',
      progress: 95,
      status: 'ahead',
      startDate: '2023-12-01',
      dueDate: '2024-02-29',
      lastUpdate: '2024-01-22',
      kpis: [
        { metric: 'Course Completion', target: '100%', current: '95%' },
        { metric: 'Certification Exam', target: 'Pass', current: 'Scheduled' },
        { metric: 'Project Application', target: '2 projects', current: '1 project' }
      ],
      manager: 'Sarah Wilson'
    }
  ]

  const departments = ['all', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
  const statuses = ['all', 'on_track', 'ahead', 'at_risk', 'behind', 'completed', 'paused']
  const periods = ['current', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'bg-blue-100 text-blue-800'
      case 'ahead':
        return 'bg-green-100 text-green-800'
      case 'at_risk':
        return 'bg-yellow-100 text-yellow-800'
      case 'behind':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-emerald-100 text-emerald-800'
      case 'paused':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_track':
        return <Target className="w-4 h-4" />
      case 'ahead':
        return <TrendingUp className="w-4 h-4" />
      case 'at_risk':
        return <AlertTriangle className="w-4 h-4" />
      case 'behind':
        return <Clock className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredData = goalsData.filter(goal => {
    const matchesStatus = statusFilter === 'all' || goal.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || goal.department === departmentFilter
    return matchesStatus && matchesDepartment
  })

  const stats = {
    totalGoals: goalsData.length,
    onTrack: goalsData.filter(g => g.status === 'on_track').length,
    atRisk: goalsData.filter(g => g.status === 'at_risk' || g.status === 'behind').length,
    completed: goalsData.filter(g => g.status === 'completed').length,
    averageProgress: Math.round(goalsData.reduce((sum, g) => sum + g.progress, 0) / goalsData.length),
    overdue: goalsData.filter(g => new Date(g.dueDate) < new Date() && g.status !== 'completed').length
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goals & KPIs Management</h1>
            <p className="text-gray-600">Track and manage employee goals and key performance indicators</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              Create Goal Template
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.onTrack}</div>
                <div className="text-sm text-gray-600">Goals On Track</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              {Math.round((stats.onTrack / stats.totalGoals) * 100)}% of total goals
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.atRisk}</div>
                <div className="text-sm text-gray-600">At Risk Goals</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">
              Require attention
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed Goals</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {Math.round((stats.completed / stats.totalGoals) * 100)}% completion rate
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.averageProgress}%</div>
                <div className="text-sm text-gray-600">Average Progress</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              Across all active goals
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
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
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {filteredData.map((goal) => (
            <div key={goal.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{goal.goalTitle}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                      {goal.priority.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(goal.status)}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                        {goal.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Employee: {goal.employeeName}</span>
                    <span>Manager: {goal.manager}</span>
                    <span>Category: {goal.category}</span>
                    <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit Goal">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-semibold text-gray-900">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        goal.progress >= 90 ? 'bg-green-500' :
                        goal.progress >= 70 ? 'bg-blue-500' :
                        goal.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last updated: {new Date(goal.lastUpdate).toLocaleDateString()}
                  </div>
                </div>

                {/* KPIs */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Key Performance Indicators</h4>
                  <div className="space-y-2">
                    {goal.kpis.map((kpi, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{kpi.metric}:</span>
                        <div className="text-right">
                          <span className="font-medium text-gray-900">{kpi.current}</span>
                          <span className="text-gray-500 ml-1">/ {kpi.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {goal.department} • {goal.position}
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                      Update Progress
                    </button>
                    <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors">
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminGoalsPage
