import React, { useState } from 'react'
import {
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Filter,
  Search,
  Eye,
  Reply,
  Download,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  AlertCircle
} from 'lucide-react'

interface FeedbackItem {
  id: string
  learnerName: string
  program: string
  rating: number
  feedback: string
  category: 'General' | 'Content' | 'Instructor' | 'Technical' | 'Support'
  sentiment: 'Positive' | 'Neutral' | 'Negative'
  status: 'New' | 'Reviewed' | 'Responded' | 'Resolved'
  submittedDate: string
  tags: string[]
}

interface FeedbackStats {
  totalFeedback: number
  averageRating: number
  positiveSentiment: number
  negativeSentiment: number
  responseRate: number
}

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    learnerName: 'Alex Johnson',
    program: 'Project Management',
    rating: 5,
    feedback: 'Excellent course! The instructor was very knowledgeable and the content was practical. I learned a lot that I can apply immediately in my work.',
    category: 'General',
    sentiment: 'Positive',
    status: 'New',
    submittedDate: '2024-12-20',
    tags: ['Excellent', 'Practical', 'Knowledgeable']
  },
  {
    id: '2',
    learnerName: 'Sarah Chen',
    program: 'Agile Development',
    rating: 4,
    feedback: 'Good course overall, but some modules could use more real-world examples. The exercises were helpful for understanding concepts.',
    category: 'Content',
    sentiment: 'Positive',
    status: 'Reviewed',
    submittedDate: '2024-12-19',
    tags: ['Good', 'Real-world examples', 'Helpful exercises']
  },
  {
    id: '3',
    learnerName: 'Mike Rodriguez',
    program: 'Data Analysis',
    rating: 2,
    feedback: 'The course content was too basic for my level. I expected more advanced topics and challenging assignments.',
    category: 'Content',
    sentiment: 'Negative',
    status: 'Responded',
    submittedDate: '2024-12-18',
    tags: ['Too basic', 'Advanced topics needed', 'Challenging assignments']
  }
]

const LearnerFeedbackPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sentimentFilter, setSentimentFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null)

  const filteredFeedback = mockFeedback.filter(feedback => {
    const matchesSearch = feedback.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.program.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || feedback.category === categoryFilter
    const matchesSentiment = sentimentFilter === 'all' || feedback.sentiment === sentimentFilter
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesSentiment && matchesStatus
  })

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100 text-green-800'
      case 'Neutral': return 'bg-gray-100 text-gray-800'
      case 'Negative': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800'
      case 'Reviewed': return 'bg-yellow-100 text-yellow-800'
      case 'Responded': return 'bg-green-100 text-green-800'
      case 'Resolved': return 'bg-purple-100 text-purple-800'
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

  const stats: FeedbackStats = {
    totalFeedback: mockFeedback.length,
    averageRating: Math.round(mockFeedback.reduce((sum, item) => sum + item.rating, 0) / mockFeedback.length * 10) / 10,
    positiveSentiment: mockFeedback.filter(item => item.sentiment === 'Positive').length,
    negativeSentiment: mockFeedback.filter(item => item.sentiment === 'Negative').length,
    responseRate: Math.round((mockFeedback.filter(item => item.status === 'Responded' || item.status === 'Resolved').length / mockFeedback.length) * 100)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learner Feedback</h1>
          <p className="text-gray-600">View and manage learner feedback and survey responses</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFeedback}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}/5</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Positive</p>
              <p className="text-2xl font-bold text-green-600">{stats.positiveSentiment}</p>
            </div>
            <ThumbsUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Negative</p>
              <p className="text-2xl font-bold text-red-600">{stats.negativeSentiment}</p>
            </div>
            <ThumbsDown className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-purple-600">{stats.responseRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
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
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="General">General</option>
              <option value="Content">Content</option>
              <option value="Instructor">Instructor</option>
              <option value="Technical">Technical</option>
              <option value="Support">Support</option>
            </select>
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Responded">Responded</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Learner & Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category & Sentiment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFeedback.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{feedback.learnerName}</div>
                      <div className="text-sm text-gray-500">{feedback.program}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getRatingStars(feedback.rating)}
                      <span className="ml-2 text-sm text-gray-900">({feedback.rating}/5)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-900 line-clamp-3">{feedback.feedback}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {feedback.tags.map((tag, index) => (
                          <span key={index} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                        {feedback.category}
                      </span>
                      <span className={`inline-block px-2 py-1 text-xs rounded ${getSentimentColor(feedback.sentiment)}`}>
                        {feedback.sentiment}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feedback.status)}`}>
                        {feedback.status}
                      </span>
                      <div className="text-xs text-gray-500">
                        {feedback.submittedDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedFeedback(feedback)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Reply className="w-4 h-4" />
                      </button>
                      {feedback.sentiment === 'Negative' && (
                        <button className="text-red-600 hover:text-red-900">
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredFeedback.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Generate Report</h4>
                <p className="text-sm text-gray-500">Create feedback analysis report</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Reply className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Bulk Response</h4>
                <p className="text-sm text-gray-500">Respond to multiple feedback items</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Trend Analysis</h4>
                <p className="text-sm text-gray-500">View feedback trends over time</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LearnerFeedbackPage
