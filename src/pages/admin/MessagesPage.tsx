import React, { useState } from 'react'
import { MessageSquare, Send, Search, Plus, Users, Clock, CheckCircle } from 'lucide-react'

const AdminMessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState('')

  const conversations = [
    {
      id: 1,
      name: 'Sarah Wilson',
      role: 'Engineering Manager',
      lastMessage: 'Can we schedule the performance review for next week?',
      timestamp: '2024-01-24T10:30:00',
      unread: 2,
      status: 'online'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Principal Engineer',
      lastMessage: 'The new policy document is ready for review',
      timestamp: '2024-01-24T09:15:00',
      unread: 0,
      status: 'away'
    },
    {
      id: 3,
      name: 'All Engineering',
      role: 'Department Group',
      lastMessage: 'Team meeting moved to 3 PM tomorrow',
      timestamp: '2024-01-23T16:45:00',
      unread: 5,
      status: 'group'
    }
  ]

  const messages = [
    {
      id: 1,
      senderId: 1,
      senderName: 'Sarah Wilson',
      content: 'Hi, I wanted to discuss the performance review schedule for our team.',
      timestamp: '2024-01-24T10:25:00',
      isOwn: false
    },
    {
      id: 2,
      senderId: 'admin',
      senderName: 'You',
      content: 'Of course! What timeframe works best for you and the team?',
      timestamp: '2024-01-24T10:26:00',
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      senderName: 'Sarah Wilson',
      content: 'Can we schedule the performance review for next week? I think that would give everyone enough time to prepare.',
      timestamp: '2024-01-24T10:30:00',
      isOwn: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Messages</h1>
            <p className="text-gray-600">Communicate with employees and teams</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Message
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-[600px] flex">
          {/* Conversations List */}
          <div className="w-1/3 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === conversation.id ? 'bg-primary-50 border-r-2 border-r-primary-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        {conversation.status === 'group' ? (
                          <Users className="w-5 h-5 text-primary-600" />
                        ) : (
                          <span className="text-sm font-medium text-primary-600">
                            {conversation.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      {conversation.status !== 'group' && (
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.status)}`}></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 truncate">{conversation.name}</h4>
                          <p className="text-xs text-gray-500">{conversation.role}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-gray-500">
                            {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {conversation.unread > 0 && (
                            <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                {selectedConv?.status === 'group' ? (
                  <Users className="w-5 h-5 text-primary-600" />
                ) : (
                  <span className="text-sm font-medium text-primary-600">
                    {selectedConv?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{selectedConv?.name}</h3>
                <p className="text-sm text-gray-500">{selectedConv?.role}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOwn 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {!message.isOwn && (
                      <p className="text-xs font-medium mb-1">{message.senderName}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? 'text-primary-100' : 'text-gray-500'}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newMessage.trim()) {
                      // Handle send message
                      setNewMessage('')
                    }
                  }}
                />
                <button 
                  className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
                  onClick={() => {
                    if (newMessage.trim()) {
                      // Handle send message
                      setNewMessage('')
                    }
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMessagesPage
