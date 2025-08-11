import React, { useState } from 'react'
import {
  MessageSquare,
  Search,
  Filter,
  Send,
  MoreVertical,
  Phone,
  Video,
  User,
  Users,
  Paperclip,
  Smile,
  Clock,
  Check,
  CheckCheck,
  Plus,
  Edit,
  Trash2,
  Archive,
  Star,
  Reply,
  Forward,
  X
} from 'lucide-react'

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  isRead: boolean
  isOwn: boolean
  attachments?: string[]
  type: 'text' | 'image' | 'file' | 'system'
}

interface Conversation {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
  isGroup: boolean
  groupName?: string
  lastActivity: string
  isPinned: boolean
  isArchived: boolean
}

interface Contact {
  id: string
  name: string
  avatar: string
  department: string
  position: string
  status: 'online' | 'offline' | 'away' | 'busy'
  lastSeen: string
}

const MessagesPage = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [messageText, setMessageText] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showNewMessage, setShowNewMessage] = useState(false)

  // Mock data
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/api/avatars/sarah-johnson.jpg',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      status: 'online',
      lastSeen: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: '/api/avatars/michael-chen.jpg',
      department: 'Sales',
      position: 'Sales Director',
      status: 'away',
      lastSeen: '15 minutes ago'
    },
    {
      id: '3',
      name: 'Emily Davis',
      avatar: '/api/avatars/emily-davis.jpg',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'online',
      lastSeen: '1 minute ago'
    },
    {
      id: '4',
      name: 'David Brown',
      avatar: '/api/avatars/david-brown.jpg',
      department: 'HR',
      position: 'HR Specialist',
      status: 'busy',
      lastSeen: '1 hour ago'
    }
  ]

  const conversations: Conversation[] = [
    {
      id: '1',
      participants: ['1', '2'],
      lastMessage: {
        id: '1',
        senderId: '2',
        senderName: 'Michael Chen',
        senderAvatar: '/api/avatars/michael-chen.jpg',
        content: 'Can we discuss the Q4 sales strategy tomorrow?',
        timestamp: '2:30 PM',
        isRead: false,
        isOwn: false,
        type: 'text'
      },
      unreadCount: 1,
      isGroup: false,
      lastActivity: '2:30 PM',
      isPinned: true,
      isArchived: false
    },
    {
      id: '2',
      participants: ['1', '3'],
      lastMessage: {
        id: '2',
        senderId: '1',
        senderName: 'Sarah Johnson',
        senderAvatar: '/api/avatars/sarah-johnson.jpg',
        content: 'The new marketing campaign looks great!',
        timestamp: '1:45 PM',
        isRead: true,
        isOwn: true,
        type: 'text'
      },
      unreadCount: 0,
      isGroup: false,
      lastActivity: '1:45 PM',
      isPinned: false,
      isArchived: false
    },
    {
      id: '3',
      participants: ['1', '2', '3', '4'],
      lastMessage: {
        id: '3',
        senderId: '4',
        senderName: 'David Brown',
        senderAvatar: '/api/avatars/david-brown.jpg',
        content: 'Team meeting scheduled for 3 PM today',
        timestamp: '12:20 PM',
        isRead: true,
        isOwn: false,
        type: 'text'
      },
      unreadCount: 0,
      isGroup: true,
      groupName: 'Team Collaboration',
      lastActivity: '12:20 PM',
      isPinned: false,
      isArchived: false
    }
  ]

  const messages: Message[] = [
    {
      id: '1',
      senderId: '2',
      senderName: 'Michael Chen',
      senderAvatar: '/api/avatars/michael-chen.jpg',
      content: 'Hi Sarah, how are you doing?',
      timestamp: '10:00 AM',
      isRead: true,
      isOwn: false,
      type: 'text'
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'Sarah Johnson',
      senderAvatar: '/api/avatars/sarah-johnson.jpg',
      content: 'Hi Michael! I\'m doing great, thanks for asking. How about you?',
      timestamp: '10:02 AM',
      isRead: true,
      isOwn: true,
      type: 'text'
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Michael Chen',
      senderAvatar: '/api/avatars/michael-chen.jpg',
      content: 'I\'m good too! I wanted to discuss the Q4 sales strategy with you. Are you available for a quick call tomorrow?',
      timestamp: '10:05 AM',
      isRead: true,
      isOwn: false,
      type: 'text'
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Sarah Johnson',
      senderAvatar: '/api/avatars/sarah-johnson.jpg',
      content: 'Absolutely! I have some time tomorrow morning. What works best for you?',
      timestamp: '10:08 AM',
      isRead: true,
      isOwn: true,
      type: 'text'
    },
    {
      id: '5',
      senderId: '2',
      senderName: 'Michael Chen',
      senderAvatar: '/api/avatars/michael-chen.jpg',
      content: 'Perfect! How about 10 AM? I can share the sales projections and get your input on the technical requirements.',
      timestamp: '2:30 PM',
      isRead: false,
      isOwn: false,
      type: 'text'
    }
  ]

  const currentConversation = conversations.find(conv => conv.id === activeConversation)
  const currentMessages = activeConversation ? messages : []

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return

    // In a real app, this would send the message to the backend
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '1', // Current user
      senderName: 'Sarah Johnson',
      senderAvatar: '/api/avatars/sarah-johnson.jpg',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      isOwn: true,
      type: 'text'
    }

    // Add to messages array
    messages.push(newMessage)
    
    // Update conversation
    if (currentConversation) {
      currentConversation.lastMessage = newMessage
      currentConversation.lastActivity = newMessage.timestamp
    }

    setMessageText('')
  }

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participants.some(participantId => {
      const contact = contacts.find(c => c.id === participantId)
      return contact?.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'unread' && conv.unreadCount > 0) ||
      (selectedFilter === 'pinned' && conv.isPinned) ||
      (selectedFilter === 'archived' && conv.isArchived)

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const messageTime = new Date(timestamp)
    const diffInHours = (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return timestamp
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return messageTime.toLocaleDateString()
    }
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <button
              onClick={() => setShowNewMessage(true)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-2 mt-3">
            {['all', 'unread', 'pinned', 'archived'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                  selectedFilter === filter
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => {
            const otherParticipant = contacts.find(c => c.id === conversation.participants.find(p => p !== '1'))
            const displayName = conversation.isGroup ? conversation.groupName : otherParticipant?.name
            const displayAvatar = conversation.isGroup ? '/api/avatars/group.jpg' : otherParticipant?.avatar

            return (
              <div
                key={conversation.id}
                onClick={() => setActiveConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  activeConversation === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={displayAvatar}
                      alt={displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {!conversation.isGroup && otherParticipant && (
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(otherParticipant.status)}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{displayName}</h3>
                      <div className="flex items-center space-x-1">
                        {conversation.isPinned && <Star size={14} className="text-yellow-500" />}
                        <span className="text-xs text-gray-500">{formatTime(conversation.lastActivity)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>
                    {conversation.unreadCount > 0 && (
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessage.senderName}
                        </span>
                        <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {currentConversation && (() => {
                    const otherParticipant = contacts.find(c => c.id === currentConversation.participants.find(p => p !== '1'))
                    const displayName = currentConversation.isGroup ? currentConversation.groupName : otherParticipant?.name
                    const displayAvatar = currentConversation.isGroup ? '/api/avatars/group.jpg' : otherParticipant?.avatar

                    return (
                      <>
                        <img
                          src={displayAvatar}
                          alt={displayName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">{displayName}</h2>
                          {!currentConversation.isGroup && otherParticipant && (
                            <p className="text-sm text-gray-600">
                              {otherParticipant.status === 'online' ? 'Online' : otherParticipant.lastSeen}
                            </p>
                          )}
                        </div>
                      </>
                    )
                  })()}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Phone size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Video size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!message.isOwn && (
                      <img
                        src={message.senderAvatar}
                        alt={message.senderName}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end space-x-1 mt-1 ${
                        message.isOwn ? 'text-primary-200' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.isOwn && (
                          <span className="text-xs">
                            {message.isRead ? <CheckCheck size={12} /> : <Check size={12} />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Paperclip size={20} />
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Smile size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Messages</h2>
              <p className="text-gray-600">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Message</h3>
              <button
                onClick={() => setShowNewMessage(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="">Select contact</option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id}>{contact.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Type your message..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowNewMessage(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesPage
