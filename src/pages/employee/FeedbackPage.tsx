import React, { useState } from 'react'
import { MessageSquare, Plus, ThumbsUp, ThumbsDown, Star, Send, User, Calendar, Filter } from 'lucide-react'

const FeedbackPage = () => {
  const [activeTab, setActiveTab] = useState('received')
  const [showNewFeedback, setShowNewFeedback] = useState(false)
  const [filter, setFilter] = useState('all')
  const [newFeedback, setNewFeedback] = useState({
    recipient: '',
    type: 'peer',
    category: '',
    rating: 5,
    message: '',
    anonymous: false
  })

  // Mock feedback data
  const receivedFeedback = [
    {
      id: 1,
      from: 'Sarah Wilson',
      fromRole: 'Manager',
      type: 'manager',
      category: 'Performance Review',
      rating: 4.5,
      message: 'John has shown exceptional growth this quarter. His technical skills have improved significantly, and he has been proactive in taking on challenging tasks. His collaboration with the team is excellent.',
      date: '2024-01-15',
      project: 'HRMS Development',
      anonymous: false,
      helpful: 12,
      tags: ['Technical Skills', 'Collaboration', 'Growth']
    },
    {
      id: 2,
      from: 'Mike Chen',
      fromRole: 'Senior Developer',
      type: 'peer',
      category: 'Project Collaboration',
      rating: 4.2,
      message: 'Great working with John on the authentication module. He was very thorough in code reviews and helped me understand some complex React patterns. Looking forward to more collaborations.',
      date: '2024-01-10',
      project: 'Authentication System',
      anonymous: false,
      helpful: 8,
      tags: ['Code Review', 'Mentoring', 'React']
    },
    {
      id: 3,
      from: 'Anonymous',
      fromRole: 'Team Member',
      type: 'peer',
      category: 'Team Collaboration',
      rating: 4.0,
      message: 'John is always willing to help when someone is stuck. He explains things clearly and patiently. Sometimes he could be more assertive in team discussions.',
      date: '2024-01-05',
      project: 'General',
      anonymous: true,
      helpful: 15,
      tags: ['Helpfulness', 'Communication', 'Patience']
    },
    {
      id: 4,
      from: 'Lisa Rodriguez',
      fromRole: 'Product Manager',
      type: 'stakeholder',
      category: 'Project Delivery',
      rating: 4.8,
      message: 'Outstanding work on the user interface improvements. John understood the requirements perfectly and delivered ahead of schedule. The quality was exceptional.',
      date: '2023-12-20',
      project: 'UI Improvements',
      anonymous: false,
      helpful: 10,
      tags: ['Quality', 'Timeliness', 'Requirements Understanding']
    }
  ]

  const givenFeedback = [
    {
      id: 1,
      to: 'Alex Thompson',
      toRole: 'Junior Developer',
      type: 'peer',
      category: 'Mentoring',
      rating: 4.3,
      message: 'Alex has shown great enthusiasm for learning and consistently asks thoughtful questions. His progress on JavaScript fundamentals has been impressive.',
      date: '2024-01-12',
      project: 'Onboarding',
      anonymous: false
    },
    {
      id: 2,
      to: 'Sarah Wilson',
      toRole: 'Manager',
      type: 'upward',
      category: 'Leadership',
      rating: 4.7,
      message: 'Sarah provides excellent guidance and is always available when the team needs support. Her feedback is constructive and helps us grow professionally.',
      date: '2023-12-30',
      project: 'General',
      anonymous: false
    }
  ]

  const feedbackRequests = [
    {
      id: 1,
      from: 'Sarah Wilson',
      project: 'Q1 Performance Review',
      deadline: '2024-02-01',
      status: 'pending',
      message: 'Please provide feedback on your experience working with John this quarter.'
    },
    {
      id: 2,
      from: 'Mike Chen',
      project: 'Authentication System',
      deadline: '2024-01-25',
      status: 'completed',
      message: 'Feedback on our collaboration during the auth module development.'
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'manager':
        return 'bg-purple-100 text-purple-800'
      case 'peer':
        return 'bg-blue-100 text-blue-800'
      case 'subordinate':
        return 'bg-green-100 text-green-800'
      case 'stakeholder':
        return 'bg-orange-100 text-orange-800'
      case 'upward':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStarRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key={fullStars} className="w-4 h-4 text-yellow-400 fill-current opacity-50" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={fullStars + i + 1} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit feedback logic here
    console.log('Submitting feedback:', newFeedback)
    setShowNewFeedback(false)
    setNewFeedback({
      recipient: '',
      type: 'peer',
      category: '',
      rating: 5,
      message: '',
      anonymous: false
    })
  }

  const filteredFeedback = receivedFeedback.filter(feedback => {
    if (filter === 'all') return true
    return feedback.type === filter
  })

  const avgRating = receivedFeedback.reduce((sum, f) => sum + f.rating, 0) / receivedFeedback.length
  const totalHelpful = receivedFeedback.reduce((sum, f) => sum + f.helpful, 0)

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
            <p className="text-gray-600">Give and receive feedback to foster continuous improvement</p>
          </div>
          <button
            onClick={() => setShowNewFeedback(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Give Feedback
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{receivedFeedback.length}</div>
                <div className="text-sm text-gray-600">Received</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Send className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{givenFeedback.length}</div>
                <div className="text-sm text-gray-600">Given</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ThumbsUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{totalHelpful}</div>
                <div className="text-sm text-gray-600">Helpful Votes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'received', label: 'Received Feedback', count: receivedFeedback.length },
              { id: 'given', label: 'Given Feedback', count: givenFeedback.length },
              { id: 'requests', label: 'Feedback Requests', count: feedbackRequests.filter(r => r.status === 'pending').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'received' && (
          <div>
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Feedback</option>
                  <option value="manager">From Manager</option>
                  <option value="peer">From Peers</option>
                  <option value="stakeholder">From Stakeholders</option>
                </select>
              </div>
            </div>

            {/* Feedback List */}
            <div className="space-y-6">
              {filteredFeedback.map((feedback) => (
                <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {feedback.anonymous ? 'Anonymous' : feedback.from}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getTypeColor(feedback.type)}`}>
                            {feedback.fromRole}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{feedback.category}</span>
                          <span>•</span>
                          <span>{feedback.project}</span>
                          <span>•</span>
                          <span>{new Date(feedback.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{feedback.rating}</span>
                      <div className="flex">{renderStarRating(feedback.rating)}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
                  </div>

                  {feedback.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {feedback.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({feedback.helpful})</span>
                      </button>
                      <button className="text-gray-500 hover:text-primary-600 transition-colors">
                        Reply
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(feedback.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'given' && (
          <div className="space-y-6">
            {givenFeedback.map((feedback) => (
              <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Send className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">To: {feedback.to}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getTypeColor(feedback.type)}`}>
                          {feedback.toRole}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{feedback.category}</span>
                        <span>•</span>
                        <span>{feedback.project}</span>
                        <span>•</span>
                        <span>{new Date(feedback.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{feedback.rating}</span>
                    <div className="flex">{renderStarRating(feedback.rating)}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6">
            {feedbackRequests.map((request) => (
              <div key={request.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{request.project}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Requested by: {request.from}</p>
                    <p className="text-gray-700 mb-3">{request.message}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(request.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  {request.status === 'pending' && (
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Provide Feedback
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Feedback Modal */}
        {showNewFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Give Feedback</h2>
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                    <select
                      required
                      value={newFeedback.recipient}
                      onChange={(e) => setNewFeedback({...newFeedback, recipient: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select recipient</option>
                      <option value="sarah.wilson">Sarah Wilson (Manager)</option>
                      <option value="mike.chen">Mike Chen (Senior Developer)</option>
                      <option value="alex.thompson">Alex Thompson (Junior Developer)</option>
                      <option value="lisa.rodriguez">Lisa Rodriguez (Product Manager)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
                      <select
                        value={newFeedback.type}
                        onChange={(e) => setNewFeedback({...newFeedback, type: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="peer">Peer Feedback</option>
                        <option value="upward">Upward Feedback</option>
                        <option value="subordinate">Downward Feedback</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        required
                        value={newFeedback.category}
                        onChange={(e) => setNewFeedback({...newFeedback, category: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        <option value="Project Collaboration">Project Collaboration</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Communication">Communication</option>
                        <option value="Technical Skills">Technical Skills</option>
                        <option value="Problem Solving">Problem Solving</option>
                        <option value="Mentoring">Mentoring</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Overall Rating: {newFeedback.rating}/5
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={newFeedback.rating}
                      onChange={(e) => setNewFeedback({...newFeedback, rating: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Poor</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Message</label>
                    <textarea
                      required
                      rows={4}
                      value={newFeedback.message}
                      onChange={(e) => setNewFeedback({...newFeedback, message: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Provide specific, constructive feedback..."
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={newFeedback.anonymous}
                      onChange={(e) => setNewFeedback({...newFeedback, anonymous: e.target.checked})}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-700">
                      Submit anonymously
                    </label>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Send Feedback
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewFeedback(false)}
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

export default FeedbackPage
