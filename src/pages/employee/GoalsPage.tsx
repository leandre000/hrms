import React, { useState } from 'react'
import { Target, Plus, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, Edit, Trash2 } from 'lucide-react'

const GoalsPage = () => {
  const [showNewGoal, setShowNewGoal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    targetDate: '',
    metrics: ''
  })

  // Mock goals data
  const goals = [
    {
      id: 1,
      title: 'Complete React Advanced Certification',
      description: 'Obtain advanced React certification to improve frontend development skills',
      category: 'Professional Development',
      priority: 'high',
      status: 'in_progress',
      progress: 75,
      targetDate: '2024-03-31',
      createdDate: '2024-01-01',
      metrics: 'Pass certification exam with 85% or higher',
      milestones: [
        { id: 1, title: 'Complete online course modules', completed: true, date: '2024-02-15' },
        { id: 2, title: 'Practice projects completion', completed: true, date: '2024-03-01' },
        { id: 3, title: 'Take practice exams', completed: false, date: '2024-03-15' },
        { id: 4, title: 'Schedule certification exam', completed: false, date: '2024-03-31' }
      ],
      updates: [
        { date: '2024-02-20', note: 'Completed 8 out of 10 course modules. On track for target date.' },
        { date: '2024-01-15', note: 'Started the course. Planning to dedicate 5 hours per week.' }
      ]
    },
    {
      id: 2,
      title: 'Lead Team Project on HRMS Module',
      description: 'Successfully lead the development of the new employee onboarding module',
      category: 'Leadership',
      priority: 'high',
      status: 'completed',
      progress: 100,
      targetDate: '2024-02-28',
      createdDate: '2023-12-01',
      completedDate: '2024-02-25',
      metrics: 'Deliver project on time with 95% stakeholder satisfaction',
      milestones: [
        { id: 1, title: 'Project planning and team assignment', completed: true, date: '2023-12-15' },
        { id: 2, title: 'Requirements gathering', completed: true, date: '2024-01-10' },
        { id: 3, title: 'Development phase completion', completed: true, date: '2024-02-15' },
        { id: 4, title: 'Testing and deployment', completed: true, date: '2024-02-25' }
      ]
    },
    {
      id: 3,
      title: 'Improve Communication Skills',
      description: 'Enhance presentation and public speaking abilities through practice and training',
      category: 'Soft Skills',
      priority: 'medium',
      status: 'in_progress',
      progress: 40,
      targetDate: '2024-06-30',
      createdDate: '2024-01-15',
      metrics: 'Successfully present at 3 team meetings and receive positive feedback',
      milestones: [
        { id: 1, title: 'Join Toastmasters club', completed: true, date: '2024-02-01' },
        { id: 2, title: 'Complete first speech', completed: true, date: '2024-02-15' },
        { id: 3, title: 'Present project update to stakeholders', completed: false, date: '2024-04-30' },
        { id: 4, title: 'Lead quarterly team presentation', completed: false, date: '2024-06-30' }
      ]
    },
    {
      id: 4,
      title: 'Increase Code Quality Metrics',
      description: 'Improve code quality by reducing bugs and increasing test coverage',
      category: 'Technical',
      priority: 'medium',
      status: 'in_progress',
      progress: 60,
      targetDate: '2024-05-31',
      createdDate: '2024-01-01',
      metrics: 'Achieve 90% test coverage and reduce bug reports by 50%',
      milestones: [
        { id: 1, title: 'Set up automated testing framework', completed: true, date: '2024-01-31' },
        { id: 2, title: 'Increase test coverage to 75%', completed: true, date: '2024-03-15' },
        { id: 3, title: 'Implement code review best practices', completed: false, date: '2024-04-30' },
        { id: 4, title: 'Achieve 90% test coverage target', completed: false, date: '2024-05-31' }
      ]
    },
    {
      id: 5,
      title: 'Mentor Junior Developer',
      description: 'Provide mentorship and guidance to new team member',
      category: 'Leadership',
      priority: 'low',
      status: 'not_started',
      progress: 0,
      targetDate: '2024-12-31',
      createdDate: '2024-03-01',
      metrics: 'Successfully onboard and guide junior developer to productivity'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'not_started':
        return 'bg-gray-100 text-gray-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'in_progress':
        return <Clock className="w-4 h-4" />
      case 'not_started':
        return <AlertCircle className="w-4 h-4" />
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSubmitGoal = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit goal logic here
    console.log('Submitting new goal:', newGoal)
    setShowNewGoal(false)
    setNewGoal({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      targetDate: '',
      metrics: ''
    })
  }

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true
    return goal.status === filter
  })

  const goalStats = {
    total: goals.length,
    completed: goals.filter(g => g.status === 'completed').length,
    inProgress: goals.filter(g => g.status === 'in_progress').length,
    notStarted: goals.filter(g => g.status === 'not_started').length,
    avgProgress: Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goals & KPIs</h1>
            <p className="text-gray-600">Set and track your professional development goals</p>
          </div>
          <button
            onClick={() => setShowNewGoal(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Goal
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Target className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{goalStats.total}</div>
                <div className="text-sm text-gray-600">Total Goals</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{goalStats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{goalStats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{goalStats.notStarted}</div>
                <div className="text-sm text-gray-600">Not Started</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{goalStats.avgProgress}%</div>
                <div className="text-sm text-gray-600">Avg Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Goals</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="not_started">Not Started</option>
            </select>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(goal.status)}`}>
                      {getStatusIcon(goal.status)}
                      {goal.status.replace('_', ' ').charAt(0).toUpperCase() + goal.status.replace('_', ' ').slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getPriorityColor(goal.priority)}`}>
                      {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-medium">{goal.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Target Date:</span>
                      <span className="ml-2 font-medium">{new Date(goal.targetDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Progress:</span>
                      <span className="ml-2 font-medium">{goal.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Metrics */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Success Metrics</h4>
                <p className="text-sm text-gray-600">{goal.metrics}</p>
              </div>

              {/* Milestones */}
              {goal.milestones && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Milestones</h4>
                  <div className="space-y-2">
                    {goal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-3 text-sm">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          milestone.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300'
                        }`}>
                          {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className={milestone.completed ? 'text-gray-900' : 'text-gray-600'}>
                          {milestone.title}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {milestone.completed ? 'Completed' : 'Target'}: {new Date(milestone.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Updates */}
              {goal.updates && goal.updates.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Updates</h4>
                  <div className="space-y-2">
                    {goal.updates.slice(0, 2).map((update, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-700 ml-5">{update.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* New Goal Modal */}
        {showNewGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Goal</h2>
                <form onSubmit={handleSubmitGoal} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                    <input
                      type="text"
                      required
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter a clear, specific goal title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Describe what you want to achieve and why it's important"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        required
                        value={newGoal.category}
                        onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        <option value="Professional Development">Professional Development</option>
                        <option value="Technical">Technical</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Soft Skills">Soft Skills</option>
                        <option value="Career Growth">Career Growth</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={newGoal.priority}
                        onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                    <input
                      type="date"
                      required
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Success Metrics</label>
                    <textarea
                      required
                      rows={2}
                      value={newGoal.metrics}
                      onChange={(e) => setNewGoal({...newGoal, metrics: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="How will you measure success? Be specific and quantifiable."
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Create Goal
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewGoal(false)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GoalsPage
