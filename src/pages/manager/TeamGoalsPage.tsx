import React, { useState } from 'react'
import { Target, Plus, Edit, Save, X, Calendar, Users, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface TeamGoal {
  id: string
  title: string
  description: string
  category: 'performance' | 'project' | 'learning' | 'innovation' | 'collaboration'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'not-started' | 'in-progress' | 'on-track' | 'at-risk' | 'completed'
  startDate: string
  targetDate: string
  completionDate?: string
  progress: number
  assignedTo: string[]
  dependencies: string[]
  metrics: {
    target: string
    current: string
    unit: string
  }
  notes: string
  milestones: {
    id: string
    title: string
    dueDate: string
    completed: boolean
  }[]
}

const TeamGoalsPage = () => {
  const [goals, setGoals] = useState<TeamGoal[]>([
    {
      id: '1',
      title: 'Improve Code Quality Score',
      description: 'Achieve and maintain a code quality score of 95% across all projects by implementing automated testing and code review processes.',
      category: 'performance',
      priority: 'high',
      status: 'in-progress',
      startDate: '2024-10-01',
      targetDate: '2025-03-31',
      progress: 65,
      assignedTo: ['Sarah Chen', 'Alex Rodriguez'],
      dependencies: ['Automated Testing Setup', 'Code Review Guidelines'],
      metrics: {
        target: '95',
        current: '87',
        unit: '%'
      },
      notes: 'Need to focus on increasing test coverage for legacy code.',
      milestones: [
        { id: '1', title: 'Setup automated testing pipeline', dueDate: '2024-11-30', completed: true },
        { id: '2', title: 'Implement code review guidelines', dueDate: '2024-12-31', completed: true },
        { id: '3', title: 'Achieve 90% test coverage', dueDate: '2025-01-31', completed: false },
        { id: '4', title: 'Reach 95% quality score', dueDate: '2025-03-31', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Launch New Product Feature',
      description: 'Successfully launch the advanced analytics dashboard feature with zero critical bugs and 100% user acceptance.',
      category: 'project',
      priority: 'critical',
      status: 'on-track',
      startDate: '2024-11-01',
      targetDate: '2025-02-28',
      progress: 80,
      assignedTo: ['Mike Johnson', 'Emily Davis'],
      dependencies: ['Backend API Completion', 'UI/UX Design Approval'],
      metrics: {
        target: '100',
        current: '80',
        unit: '%'
      },
      notes: 'Frontend development is ahead of schedule. Backend integration needs attention.',
      milestones: [
        { id: '1', title: 'Complete UI/UX design', dueDate: '2024-12-15', completed: true },
        { id: '2', title: 'Finish backend API', dueDate: '2025-01-15', completed: false },
        { id: '3', title: 'Integration testing', dueDate: '2025-02-15', completed: false },
        { id: '4', title: 'Production launch', dueDate: '2025-02-28', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Team Skill Development',
      description: 'Ensure all team members complete at least 2 advanced training courses and obtain relevant certifications.',
      category: 'learning',
      priority: 'medium',
      status: 'in-progress',
      startDate: '2024-09-01',
      targetDate: '2025-06-30',
      progress: 45,
      assignedTo: ['All Team Members'],
      dependencies: ['Training Budget Approval', 'Course Selection'],
      metrics: {
        target: '100',
        current: '45',
        unit: '%'
      },
      notes: 'Most team members have completed 1 course. Need to encourage second course enrollment.',
      milestones: [
        { id: '1', title: 'Training budget approval', dueDate: '2024-10-01', completed: true },
        { id: '2', title: 'Course selection and enrollment', dueDate: '2024-11-30', completed: true },
        { id: '3', title: 'Complete first course', dueDate: '2025-03-31', completed: false },
        { id: '4', title: 'Complete second course', dueDate: '2025-06-30', completed: false }
      ]
    },
    {
      id: '4',
      title: 'Reduce Technical Debt',
      description: 'Reduce technical debt by 30% through code refactoring, documentation updates, and legacy system modernization.',
      category: 'performance',
      priority: 'high',
      status: 'at-risk',
      startDate: '2024-08-01',
      targetDate: '2025-05-31',
      progress: 35,
      assignedTo: ['Sarah Chen', 'Alex Rodriguez', 'Mike Johnson'],
      dependencies: ['Code Analysis Tools', 'Refactoring Guidelines'],
      metrics: {
        target: '30',
        current: '35',
        unit: '%'
      },
      notes: 'Progress is slower than expected due to ongoing feature development. May need to extend timeline.',
      milestones: [
        { id: '1', title: 'Setup code analysis tools', dueDate: '2024-09-30', completed: true },
        { id: '2', title: 'Identify technical debt items', dueDate: '2024-10-31', completed: true },
        { id: '3', title: 'Complete 50% of refactoring', dueDate: '2025-03-31', completed: false },
        { id: '4', title: 'Achieve 30% reduction', dueDate: '2025-05-31', completed: false }
      ]
    }
  ])

  const [showAddGoal, setShowAddGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')

  const filteredGoals = goals.filter(goal => {
    const matchesCategory = filterCategory === 'All' || goal.category === filterCategory
    const matchesStatus = filterStatus === 'All' || goal.status === filterStatus
    const matchesPriority = filterPriority === 'All' || goal.priority === filterPriority
    
    return matchesCategory && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'on-track': return 'bg-green-100 text-green-800'
      case 'at-risk': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-800'
      case 'project': return 'bg-green-100 text-green-800'
      case 'learning': return 'bg-purple-100 text-purple-800'
      case 'innovation': return 'bg-orange-100 text-orange-800'
      case 'collaboration': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate)
    const now = new Date()
    const diffTime = target.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'on-track': return <TrendingUp className="h-4 w-4" />
      case 'at-risk': return <AlertCircle className="h-4 w-4" />
      case 'in-progress': return <Clock className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Goals</h1>
        <p className="text-gray-600">Set, track, and manage team goals to drive performance and success</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Goals</p>
              <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {goals.filter(g => g.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-gray-900">
                {goals.filter(g => g.status === 'at-risk').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Categories</option>
              <option value="performance">Performance</option>
              <option value="project">Project</option>
              <option value="learning">Learning</option>
              <option value="innovation">Innovation</option>
              <option value="collaboration">Collaboration</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="on-track">On Track</option>
              <option value="at-risk">At Risk</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowAddGoal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Goal
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                    {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                    {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {getStatusIcon(goal.status)}
                    <span className="ml-1">{goal.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Goal Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span>{goal.assignedTo.length} assigned</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Target className="h-4 w-4 mr-2 text-gray-400" />
                <span>Target: {goal.metrics.target}{goal.metrics.unit} | Current: {goal.metrics.current}{goal.metrics.unit}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span className={getDaysRemaining(goal.targetDate) < 30 ? 'text-red-600 font-medium' : ''}>
                  {getDaysRemaining(goal.targetDate)} days remaining
                </span>
              </div>
            </div>

            {/* Milestones */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Milestones:</h4>
              <div className="space-y-1">
                {goal.milestones.slice(0, 3).map((milestone) => (
                  <div key={milestone.id} className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full mr-2 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={milestone.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                      {milestone.title}
                    </span>
                    <span className="ml-auto text-gray-500">
                      {new Date(milestone.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {goal.milestones.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{goal.milestones.length - 3} more milestones
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                <span>Dependencies: {goal.dependencies.length}</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                  View Details
                </button>
                <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                  Update Progress
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Target className="h-4 w-4 mr-2" />
          Goal Templates
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <TrendingUp className="h-4 w-4 mr-2" />
          Progress Report
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Calendar className="h-4 w-4 mr-2" />
          Goal Calendar
        </button>
      </div>
    </div>
  )
}

export default TeamGoalsPage
