import React, { useState } from 'react'
import { MessageSquare, Users, Star, TrendingUp, Calendar, CheckCircle, AlertCircle, Eye, Edit, Plus, Search, Filter } from 'lucide-react'

const AdminFeedbackPage = () => {
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [view, setView] = useState<'feedback' | 'surveys' | 'analytics'>('feedback')

  const feedbackData = [
    {
      id: 1,
      type: '360_review',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      reviewPeriod: '2024 Q1',
      status: 'completed',
      submissionDate: '2024-01-20',
      feedbackGiver: 'Sarah Wilson',
      giverRole: 'Manager',
      overallRating: 4.2,
      categories: {
        technical: 4.5,
        communication: 4.0,
        collaboration: 4.3,
        leadership: 3.8,
        problemSolving: 4.4
      },
      strengths: 'Excellent technical skills and reliable delivery',
      improvements: 'Could improve communication with stakeholders',
      goals: 'Focus on leadership development and cross-team collaboration',
      anonymous: false
    },
    {
      id: 2,
      type: 'peer_feedback',
      employeeId: 'EMP002',
      employeeName: 'Sarah Wilson',
      department: 'Engineering',
      position: 'Engineering Manager',
      reviewPeriod: '2024 Q1',
      status: 'in_progress',
      submissionDate: null,
      feedbackGiver: 'Michael Chen',
      giverRole: 'Peer',
      overallRating: null,
      categories: {
        technical: null,
        communication: null,
        collaboration: null,
        leadership: null,
        problemSolving: null
      },
      strengths: '',
      improvements: '',
      goals: '',
      anonymous: false
    },
    {
      id: 3,
      type: 'upward_feedback',
      employeeId: 'EMP002',
      employeeName: 'Sarah Wilson',
      department: 'Engineering',
      position: 'Engineering Manager',
      reviewPeriod: '2024 Q1',
      status: 'completed',
      submissionDate: '2024-01-18',
      feedbackGiver: 'Anonymous',
      giverRole: 'Direct Report',
      overallRating: 4.6,
      categories: {
        technical: 4.2,
        communication: 4.8,
        collaboration: 4.7,
        leadership: 4.9,
        problemSolving: 4.5
      },
      strengths: 'Great listener, provides clear direction, supports team growth',
      improvements: 'Could delegate more effectively',
      goals: 'Continue developing strategic thinking skills',
      anonymous: true
    }
  ]

  const surveys = [
    {
      id: 1,
      title: 'Employee Engagement Survey Q1 2024',
      type: 'engagement',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      responses: 45,
      totalEmployees: 60,
      averageScore: 4.2,
      categories: ['Work Environment', 'Management', 'Career Development', 'Work-Life Balance']
    },
    {
      id: 2,
      title: 'Remote Work Effectiveness Survey',
      type: 'pulse',
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
      responses: 52,
      totalEmployees: 60,
      averageScore: 3.8,
      categories: ['Productivity', 'Communication', 'Technology', 'Wellbeing']
    }
  ]

  const types = ['all', '360_review', 'peer_feedback', 'upward_feedback', 'self_assessment']
  const statuses = ['all', 'completed', 'in_progress', 'pending', 'overdue']
  const departments = ['all', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case '360_review':
        return 'bg-purple-100 text-purple-800'
      case 'peer_feedback':
        return 'bg-blue-100 text-blue-800'
      case 'upward_feedback':
        return 'bg-green-100 text-green-800'
      case 'self_assessment':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesType = typeFilter === 'all' || feedback.type === typeFilter
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || feedback.department === departmentFilter
    return matchesType && matchesStatus && matchesDepartment
  })

  const stats = {
    totalFeedback: feedbackData.length,
    completedFeedback: feedbackData.filter(f => f.status === 'completed').length,
    averageRating: feedbackData.filter(f => f.overallRating).reduce((sum, f) => sum + f.overallRating, 0) / feedbackData.filter(f => f.overallRating).length,
    pendingFeedback: feedbackData.filter(f => f.status === 'pending' || f.status === 'in_progress').length,
    activeSurveys: surveys.filter(s => s.status === 'active').length,
    surveyResponseRate: Math.round((surveys.reduce((sum, s) => sum + s.responses, 0) / surveys.reduce((sum, s) => sum + s.totalEmployees, 0)) * 100)
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Feedback Management</h1>
            <p className="text-gray-600">Manage 360-degree feedback and employee surveys</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('feedback')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'feedback' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Feedback
              </button>
              <button
                onClick={() => setView('surveys')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'surveys' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Surveys
              </button>
              <button
                onClick={() => setView('analytics')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'analytics' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Analytics
              </button>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              Create Survey
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.completedFeedback}</div>
                <div className="text-sm text-gray-600">Completed Feedback</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              {stats.totalFeedback} total submissions
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.pendingFeedback}</div>
                <div className="text-sm text-gray-600">Pending Feedback</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">
              Requires follow-up
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.averageRating ? stats.averageRating.toFixed(1) : 'N/A'}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              Overall feedback score
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.surveyResponseRate}%</div>
                <div className="text-sm text-gray-600">Survey Response Rate</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              {stats.activeSurveys} active surveys
            </div>
          </div>
        </div>

        {view === 'feedback' && (
          <>
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.replace('_', ' ').toUpperCase()}
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
              </div>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
              {filteredFeedback.map((feedback) => (
                <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{feedback.employeeName}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(feedback.type)}`}>
                          {feedback.type.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                          {feedback.status.replace('_', ' ').toUpperCase()}
                        </span>
                        {feedback.anonymous && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            Anonymous
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{feedback.position} • {feedback.department}</span>
                        <span>Given by: {feedback.feedbackGiver} ({feedback.giverRole})</span>
                        <span>Period: {feedback.reviewPeriod}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {feedback.overallRating && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Overall Rating: {feedback.overallRating}/5</h4>
                        <div className="space-y-2">
                          {Object.entries(feedback.categories).map(([category, rating]) => (
                            rating && (
                              <div key={category} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium">{rating}</span>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Feedback Summary</h4>
                        <div className="space-y-3 text-sm">
                          {feedback.strengths && (
                            <div>
                              <span className="font-medium text-green-700">Strengths:</span>
                              <p className="text-gray-600 mt-1">{feedback.strengths}</p>
                            </div>
                          )}
                          {feedback.improvements && (
                            <div>
                              <span className="font-medium text-yellow-700">Areas for Improvement:</span>
                              <p className="text-gray-600 mt-1">{feedback.improvements}</p>
                            </div>
                          )}
                          {feedback.goals && (
                            <div>
                              <span className="font-medium text-blue-700">Development Goals:</span>
                              <p className="text-gray-600 mt-1">{feedback.goals}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {feedback.submissionDate ? `Submitted: ${new Date(feedback.submissionDate).toLocaleDateString()}` : 'Not submitted yet'}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                        {feedback.status === 'pending' && (
                          <button className="text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors">
                            Send Reminder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'surveys' && (
          <div className="space-y-4">
            {surveys.map((survey) => (
              <div key={survey.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{survey.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(survey.status)}`}>
                        {survey.status.toUpperCase()}
                      </span>
                      <span>Type: {survey.type}</span>
                      <span>{new Date(survey.startDate).toLocaleDateString()} - {new Date(survey.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                    <div className="font-semibold text-gray-900">{survey.responses}/{survey.totalEmployees}</div>
                    <div className="text-sm text-gray-500">{Math.round((survey.responses / survey.totalEmployees) * 100)}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Average Score</div>
                    <div className="font-semibold text-gray-900">{survey.averageScore}/5.0</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Categories</div>
                    <div className="text-sm text-gray-700">{survey.categories.join(', ')}</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="w-full mr-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{Math.round((survey.responses / survey.totalEmployees) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(survey.responses / survey.totalEmployees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-sm bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors">
                        View Results
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Feedback Trends</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completion Rate:</span>
                  <span className="font-semibold text-gray-900">{Math.round((stats.completedFeedback / stats.totalFeedback) * 100)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Response Time:</span>
                  <span className="font-semibold text-gray-900">5.2 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Most Common Type:</span>
                  <span className="font-semibold text-gray-900">360 Reviews</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Participation</h2>
              <div className="space-y-3">
                {departments.slice(1).map((dept) => {
                  const deptFeedback = feedbackData.filter(f => f.department === dept).length
                  return (
                    <div key={dept} className="flex justify-between items-center">
                      <span className="text-gray-600">{dept}:</span>
                      <span className="font-semibold text-gray-900">{deptFeedback} submissions</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminFeedbackPage
