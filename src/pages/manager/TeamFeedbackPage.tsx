import React, { useState } from 'react'
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Users, 
  Filter, 
  Search, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock
} from 'lucide-react'

interface Feedback {
  id: string
  employeeId: string
  employeeName: string
  feedbackType: 'performance' | 'behavior' | 'suggestion' | 'concern' | 'recognition'
  rating: number
  message: string
  submittedDate: string
  status: 'pending' | 'reviewed' | 'addressed' | 'closed'
  priority: 'low' | 'medium' | 'high'
  category: string
  assignedTo?: string
  response?: string
  responseDate?: string
}

const mockFeedback: Feedback[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'Sarah Johnson',
    feedbackType: 'performance',
    rating: 4,
    message: 'Sarah has shown excellent leadership skills in the recent project. Her communication and team coordination have improved significantly.',
    submittedDate: '2024-01-15',
    status: 'reviewed',
    priority: 'medium',
    category: 'Leadership',
    assignedTo: 'HR Manager',
    response: 'Thank you for the feedback. We will discuss this in the next performance review.',
    responseDate: '2024-01-16'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Mike Chen',
    feedbackType: 'suggestion',
    rating: 5,
    message: 'I suggest implementing a weekly team huddle to improve communication and collaboration across departments.',
    submittedDate: '2024-01-14',
    status: 'pending',
    priority: 'high',
    category: 'Process Improvement'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Emily Davis',
    feedbackType: 'recognition',
    rating: 5,
    message: 'Emily went above and beyond to help a client during a critical situation. Her dedication deserves recognition.',
    submittedDate: '2024-01-13',
    status: 'addressed',
    priority: 'medium',
    category: 'Customer Service',
    assignedTo: 'Team Lead',
    response: 'Great work Emily! This will be noted in your performance record.',
    responseDate: '2024-01-14'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    employeeName: 'David Wilson',
    feedbackType: 'concern',
    rating: 2,
    message: 'There seems to be a lack of clear communication about project deadlines and expectations.',
    submittedDate: '2024-01-12',
    status: 'pending',
    priority: 'high',
    category: 'Communication'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    employeeName: 'Lisa Brown',
    feedbackType: 'behavior',
    rating: 3,
    message: 'Lisa has been consistently late to team meetings, which affects team productivity.',
    submittedDate: '2024-01-11',
    status: 'reviewed',
    priority: 'medium',
    category: 'Attendance',
    assignedTo: 'HR Manager',
    response: 'We will address this in the next one-on-one meeting.',
    responseDate: '2024-01-12'
  }
]

const TeamFeedbackPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)

  const filteredFeedback = mockFeedback.filter(feedback => {
    const matchesSearch = feedback.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter
    const matchesType = typeFilter === 'all' || feedback.feedbackType === typeFilter
    const matchesPriority = priorityFilter === 'all' || feedback.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'addressed': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return <TrendingUp className="w-4 h-4" />
      case 'behavior': return <Users className="w-4 h-4" />
      case 'suggestion': return <MessageSquare className="w-4 h-4" />
      case 'concern': return <MessageSquare className="w-4 h-4" />
      case 'recognition': return <Star className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  const renderStars = (rating: number) => {
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Feedback</h1>
          <p className="text-gray-600">Manage and review team feedback and suggestions</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Feedback
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{mockFeedback.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockFeedback.filter(f => f.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {mockFeedback.filter(f => f.priority === 'high').length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-green-600">
                {(mockFeedback.reduce((acc, f) => acc + f.rating, 0) / mockFeedback.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="addressed">Addressed</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="performance">Performance</option>
            <option value="behavior">Behavior</option>
            <option value="suggestion">Suggestion</option>
            <option value="concern">Concern</option>
            <option value="recognition">Recognition</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
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
                    <div className="flex items-center gap-2">
                      {getTypeIcon(feedback.feedbackType)}
                      <span className="text-sm text-gray-900 capitalize">{feedback.feedbackType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(feedback.rating)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {feedback.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feedback.status)}`}>
                      {feedback.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(feedback.priority)}`}>
                      {feedback.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(feedback.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedFeedback(feedback)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Feedback Details</h3>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedFeedback.employeeName} ({selectedFeedback.employeeId})</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{selectedFeedback.feedbackType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <div className="mt-1 flex items-center gap-1">
                      {renderStars(selectedFeedback.rating)}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedFeedback.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedFeedback.status)}`}>
                      {selectedFeedback.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedFeedback.priority)}`}>
                      {selectedFeedback.priority}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Submitted Date</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedFeedback.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                
                {selectedFeedback.assignedTo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedFeedback.assignedTo}</p>
                  </div>
                )}
                
                {selectedFeedback.response && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Response</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedFeedback.response}</p>
                    {selectedFeedback.responseDate && (
                      <p className="mt-1 text-xs text-gray-500">
                        Responded on: {new Date(selectedFeedback.responseDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                  Respond
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamFeedbackPage
