import React, { useState } from 'react'
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Filter, 
  Search,
  Plus,
  Download,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar
} from 'lucide-react'

interface FeedbackItem {
  id: string
  employeeName: string
  employeeId: string
  feedbackType: 'Performance' | 'Peer' | 'Manager' | '360' | 'Exit'
  rating: number
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue'
  submittedDate: string
  dueDate: string
  assignedTo: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  category: string
}

interface FeedbackSummary {
  totalFeedback: number
  pendingFeedback: number
  completedFeedback: number
  overdueFeedback: number
  avgRating: number
  responseRate: number
  satisfactionScore: number
}

const FeedbackPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const feedbackData: FeedbackItem[] = [
    {
      id: '1',
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      feedbackType: 'Performance',
      rating: 4.5,
      status: 'Completed',
      submittedDate: '2024-01-15',
      dueDate: '2024-01-30',
      assignedTo: 'Sarah Johnson',
      priority: 'High',
      category: 'Technical Skills'
    },
    {
      id: '2',
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      feedbackType: 'Peer',
      rating: 4.2,
      status: 'In Progress',
      submittedDate: '2024-01-20',
      dueDate: '2024-02-05',
      assignedTo: 'Mike Wilson',
      priority: 'Medium',
      category: 'Communication'
    },
    {
      id: '3',
      employeeName: 'David Brown',
      employeeId: 'EMP003',
      feedbackType: 'Manager',
      rating: 3.8,
      status: 'Pending',
      submittedDate: '2024-01-25',
      dueDate: '2024-02-10',
      assignedTo: 'Lisa Chen',
      priority: 'High',
      category: 'Leadership'
    },
    {
      id: '4',
      employeeName: 'Sarah Wilson',
      employeeId: 'EMP004',
      feedbackType: '360',
      rating: 4.7,
      status: 'Completed',
      submittedDate: '2024-01-10',
      dueDate: '2024-01-25',
      assignedTo: 'HR Team',
      priority: 'Medium',
      category: 'Overall Performance'
    }
  ]

  const feedbackSummary: FeedbackSummary = {
    totalFeedback: 156,
    pendingFeedback: 23,
    completedFeedback: 128,
    overdueFeedback: 5,
    avgRating: 4.2,
    responseRate: 87.3,
    satisfactionScore: 8.6
  }

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesSearch = feedback.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || feedback.feedbackType === selectedType
    const matchesStatus = selectedStatus === 'all' || feedback.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || feedback.priority === selectedPriority
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-gray-100 text-gray-800'
      case 'Medium': return 'bg-blue-100 text-blue-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feedback Management</h1>
          <p className="text-gray-600">Manage employee feedback, reviews, and development conversations</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download size={20} />
            Export Data
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Feedback
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{feedbackSummary.totalFeedback}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{feedbackSummary.pendingFeedback}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{feedbackSummary.completedFeedback}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{feedbackSummary.avgRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search employees or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Performance">Performance</option>
              <option value="Peer">Peer</option>
              <option value="Manager">Manager</option>
              <option value="360">360°</option>
              <option value="Exit">Exit</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'feedback', 'analytics', 'templates'].map((tab) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-semibold text-green-600">{feedbackSummary.completedFeedback}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">In Progress</span>
                      <span className="font-semibold text-blue-600">{feedbackSummary.totalFeedback - feedbackSummary.completedFeedback - feedbackSummary.pendingFeedback}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-semibold text-yellow-600">{feedbackSummary.pendingFeedback}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overdue</span>
                      <span className="font-semibold text-red-600">{feedbackSummary.overdueFeedback}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '82.1%' }}></div>
                      <div className="bg-blue-500 h-2 rounded-full -mt-2" style={{ width: '3.2%' }}></div>
                      <div className="bg-yellow-500 h-2 rounded-full -mt-2" style={{ width: '14.7%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-semibold text-blue-600">{feedbackSummary.responseRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Satisfaction Score</span>
                      <span className="font-semibold text-green-600">{feedbackSummary.satisfactionScore}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Avg Rating</span>
                      <span className="font-semibold text-purple-600">{feedbackSummary.avgRating}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {feedbackData.slice(0, 5).map((feedback) => (
                    <div key={feedback.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{feedback.employeeName}</p>
                          <p className="text-sm text-gray-600">{feedback.feedbackType} feedback</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex">{getRatingStars(feedback.rating)}</div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                          {feedback.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFeedback.map((feedback) => (
                      <tr key={feedback.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{feedback.employeeName}</div>
                            <div className="text-sm text-gray-500">{feedback.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{feedback.feedbackType}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">{getRatingStars(feedback.rating)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                            {feedback.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(feedback.priority)}`}>
                            {feedback.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{feedback.dueDate}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{feedback.assignedTo}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                          <button className="text-gray-600 hover:text-gray-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Type Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Performance</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Peer</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Manager</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">360°</span>
                      <span className="font-semibold">8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Exit</span>
                      <span className="font-semibold">2%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Trends</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q1 2024</span>
                      <span className="font-semibold text-green-600">4.2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q4 2023</span>
                      <span className="font-semibold text-green-600">4.1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q3 2023</span>
                      <span className="font-semibold text-blue-600">4.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q2 2023</span>
                      <span className="font-semibold text-blue-600">3.9</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Improving ratings</p>
                    <p className="text-lg font-semibold text-green-600">+0.3 avg</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">High response rate</p>
                    <p className="text-lg font-semibold text-blue-600">87.3%</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Overdue items</p>
                    <p className="text-lg font-semibold text-yellow-600">5 feedback</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Feedback Templates</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Performance Review</h4>
                  <p className="text-sm text-gray-600 mb-4">Standard template for annual performance reviews</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                      Use Template
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Peer Feedback</h4>
                  <p className="text-sm text-gray-600 mb-4">Template for peer-to-peer feedback sessions</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                      Use Template
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">360° Review</h4>
                  <p className="text-sm text-gray-600 mb-4">Comprehensive feedback from multiple sources</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                      Use Template
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Edit
                    </button>
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

export default FeedbackPage
