import React, { useState } from 'react'
import { MessageSquare, Send, Search, Filter, Users, Clock, Paperclip, MoreVertical, Reply, Forward, Trash2 } from 'lucide-react'

interface TeamMessage {
  id: string
  sender: string
  senderAvatar: string
  content: string
  timestamp: string
  type: 'announcement' | 'discussion' | 'question' | 'update'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  recipients: string[]
  attachments: string[]
  isRead: boolean
  replies: number
}

const TeamMessagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')
  const [selectedMessage, setSelectedMessage] = useState<TeamMessage | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [showCompose, setShowCompose] = useState(false)

  const mockMessages: TeamMessage[] = [
    {
      id: '1',
      sender: 'Mike Smith',
      senderAvatar: 'MS',
      content: 'Team, please review the updated project timeline for Q1 2025. We have some new requirements that will affect our delivery schedule.',
      timestamp: '2024-12-20T10:30:00Z',
      type: 'announcement',
      priority: 'high',
      recipients: ['All Team Members'],
      attachments: ['Q1_2025_Timeline.pdf'],
      isRead: false,
      replies: 3
    },
    {
      id: '2',
      sender: 'Sarah Chen',
      senderAvatar: 'SC',
      content: 'Has anyone encountered this error when deploying to staging? I\'m getting a 500 error on the user authentication endpoint.',
      timestamp: '2024-12-20T09:15:00Z',
      type: 'question',
      priority: 'medium',
      recipients: ['Development Team'],
      attachments: ['error_log.txt'],
      isRead: true,
      replies: 5
    },
    {
      id: '3',
      sender: 'Emily Davis',
      senderAvatar: 'ED',
      content: 'Great news! Our new design system has been approved by the stakeholders. We can start implementing it across all projects starting next week.',
      timestamp: '2024-12-20T08:45:00Z',
      type: 'update',
      priority: 'medium',
      recipients: ['Design Team', 'Development Team'],
      attachments: ['design_system_guide.pdf', 'component_library.zip'],
      isRead: true,
      replies: 2
    },
    {
      id: '4',
      sender: 'Alex Rodriguez',
      senderAvatar: 'AR',
      content: 'I\'ve completed the backend API documentation. Please review and let me know if you need any clarification on the endpoints.',
      timestamp: '2024-12-19T16:20:00Z',
      type: 'discussion',
      priority: 'low',
      recipients: ['Development Team'],
      attachments: ['api_documentation.md'],
      isRead: false,
      replies: 1
    },
    {
      id: '5',
      sender: 'Lisa Wang',
      senderAvatar: 'LW',
      content: 'URGENT: We have a critical security vulnerability that needs immediate attention. Please review the security audit report and implement fixes by EOD.',
      timestamp: '2024-12-19T14:30:00Z',
      type: 'announcement',
      priority: 'urgent',
      recipients: ['All Team Members'],
      attachments: ['security_audit_report.pdf', 'vulnerability_details.md'],
      isRead: false,
      replies: 8
    }
  ]

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'All' || message.type === filterType
    const matchesPriority = filterPriority === 'All' || message.priority === filterPriority
    
    return matchesSearch && matchesType && matchesPriority
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800'
      case 'discussion': return 'bg-green-100 text-green-800'
      case 'question': return 'bg-yellow-100 text-yellow-800'
      case 'update': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'urgent': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityIcon = (priority: string) => {
    if (priority === 'urgent') return '🚨'
    if (priority === 'high') return '⚠️'
    return ''
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage('')
      setShowCompose(false)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Messages</h1>
        <p className="text-gray-600">Communicate with your team, share updates, and manage important announcements</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{mockMessages.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockMessages.filter(m => !m.isRead).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Announcements</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockMessages.filter(m => m.type === 'announcement').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockMessages.filter(m => new Date(m.timestamp).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Message */}
      {showCompose && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Compose Message</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>Announcement</option>
                <option>Discussion</option>
                <option>Question</option>
                <option>Update</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>Low Priority</option>
                <option>Medium Priority</option>
                <option>High Priority</option>
                <option>Urgent</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>All Team Members</option>
                <option>Development Team</option>
                <option>Design Team</option>
                <option>Management</option>
              </select>
            </div>
          </div>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Paperclip className="h-5 w-5" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowCompose(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                <Send className="h-4 w-4 mr-2 inline" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Types</option>
              <option value="announcement">Announcements</option>
              <option value="discussion">Discussions</option>
              <option value="question">Questions</option>
              <option value="update">Updates</option>
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
              <option value="urgent">Urgent</option>
            </select>
            
            <button
              onClick={() => setShowCompose(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              New Message
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Team Messages</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredMessages.map((message) => (
            <div 
              key={message.id} 
              className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${!message.isRead ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">{message.senderAvatar}</span>
                      </div>
                      <span className="font-medium text-gray-900">{message.sender}</span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(message.type)}`}>
                      {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                      {getPriorityIcon(message.priority)} {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                    </span>
                    {!message.isRead && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        New
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-900 mb-2 line-clamp-2">{message.content}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTimestamp(message.timestamp)}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {message.recipients.join(', ')}
                    </div>
                    {message.attachments.length > 0 && (
                      <div className="flex items-center">
                        <Paperclip className="h-4 w-4 mr-1" />
                        {message.attachments.length} attachment(s)
                      </div>
                    )}
                    {message.replies > 0 && (
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {message.replies} replies
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Reply className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Forward className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message Templates
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Users className="h-4 w-4 mr-2" />
          Manage Recipients
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </button>
      </div>
    </div>
  )
}

export default TeamMessagesPage
