import React, { useState } from 'react'
import { Target, Plus, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react'

const GoalsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('current')

  const goals = [
    {
      id: 'GOAL001',
      employee: 'John Doe',
      department: 'Engineering',
      title: 'Complete Frontend Architecture Redesign',
      description: 'Lead the redesign of the main application frontend architecture',
      category: 'Technical',
      priority: 'High',
      status: 'In Progress',
      progress: 75,
      startDate: '2024-01-01',
      targetDate: '2024-03-31',
      manager: 'Sarah Wilson',
      keyResults: [
        { title: 'Design new component library', completed: true },
        { title: 'Implement responsive layouts', completed: true },
        { title: 'Optimize performance metrics', completed: false },
        { title: 'Complete testing coverage', completed: false }
      ]
    },
    {
      id: 'GOAL002',
      employee: 'Jane Smith',
      department: 'Marketing',
      title: 'Increase Brand Awareness by 40%',
      description: 'Develop and execute marketing campaigns to boost brand recognition',
      category: 'Business',
      priority: 'High',
      status: 'Completed',
      progress: 100,
      startDate: '2023-10-01',
      targetDate: '2024-01-31',
      manager: 'Mike Johnson',
      keyResults: [
        { title: 'Launch social media campaign', completed: true },
        { title: 'Increase website traffic by 30%', completed: true },
        { title: 'Generate 500 new leads', completed: true },
        { title: 'Improve engagement rate by 25%', completed: true }
      ]
    },
    {
      id: 'GOAL003',
      employee: 'Mike Johnson',
      department: 'Sales',
      title: 'Achieve $2M in New Sales Revenue',
      description: 'Close new business deals to reach revenue target',
      category: 'Revenue',
      priority: 'Critical',
      status: 'At Risk',
      progress: 45,
      startDate: '2024-01-01',
      targetDate: '2024-06-30',
      manager: 'Sales Director',
      keyResults: [
        { title: 'Identify 50 qualified prospects', completed: true },
        { title: 'Conduct 100 sales meetings', completed: false },
        { title: 'Close 10 major deals', completed: false },
        { title: 'Achieve 95% customer satisfaction', completed: true }
      ]
    }
  ]

  const goalStats = {
    totalGoals: 85,
    completed: 28,
    inProgress: 42,
    atRisk: 10,
    overdue: 5,
    avgProgress: 68
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'At Risk': return 'bg-yellow-100 text-yellow-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      case 'Not Started': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'In Progress': return <Clock className="w-4 h-4 text-blue-500" />
      case 'At Risk': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'Overdue': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Target className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredGoals = goals.filter(goal => {
    const matchesStatus = statusFilter === 'all' || goal.status === statusFilter
    const matchesPeriod = periodFilter === 'current' || 
      (periodFilter === 'past' && goal.status === 'Completed') ||
      (periodFilter === 'future' && new Date(goal.startDate) > new Date())
    return matchesStatus && matchesPeriod
  })

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goals & Objectives</h1>
            <p className="text-gray-600">Track and manage employee goals and key results</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Create Goal
          </button>
        </div>

        {/* Goal Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-gray-900">Total Goals</h3>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {goalStats.totalGoals}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Completed</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {goalStats.completed}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">In Progress</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {goalStats.inProgress}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h3 className="font-medium text-gray-900">At Risk</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {goalStats.atRisk}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-gray-900">Overdue</h3>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {goalStats.overdue}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium text-gray-900">Avg Progress</h3>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {goalStats.avgProgress}%
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="At Risk">At Risk</option>
              <option value="Overdue">Overdue</option>
            </select>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="current">Current Period</option>
              <option value="past">Past Goals</option>
              <option value="future">Future Goals</option>
            </select>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-600">Employee:</span>
                      <div className="font-medium">{goal.employee}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Department:</span>
                      <div className="font-medium">{goal.department}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Target Date:</span>
                      <div className="font-medium">{new Date(goal.targetDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Manager:</span>
                      <div className="font-medium">{goal.manager}</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{goal.progress}%</div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        goal.progress >= 80 ? 'bg-green-500' :
                        goal.progress >= 60 ? 'bg-blue-500' :
                        goal.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Key Results */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Key Results</h4>
                <div className="space-y-2">
                  {goal.keyResults.map((result, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        result.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {result.completed && <CheckCircle className="w-3 h-3 text-green-600" />}
                      </div>
                      <span className={`${result.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {result.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Goal ID: {goal.id} • Category: {goal.category}
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                    View Details
                  </button>
                  <button className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition-colors">
                    Update Progress
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

export default GoalsPage
