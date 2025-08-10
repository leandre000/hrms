import React, { useState } from 'react'
import { MessageSquare, Send, Search, Plus, Phone, Video, MoreVertical, Smile, Paperclip, Users } from 'lucide-react'

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock chat data
  const chats = [
    {
      id: 1,
      type: 'direct',
      name: 'Sarah Wilson',
      role: 'Engineering Manager',
      avatar: '/avatars/sarah.jpg',
      lastMessage: 'Thanks for the update on the project. Let\'s discuss the timeline in our 1:1.',
      lastMessageTime: '2024-01-20T10:30:00',
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: 1,
          sender: 'Sarah Wilson',
          content: 'Hi John! How\'s the React refactoring going?',
          timestamp: '2024-01-20T09:15:00',
          type: 'text'
        },
        {
          id: 2,
          sender: 'me',
          content: 'Going well! I\'ve completed about 60% of the components. Should be done by Friday.',
          timestamp: '2024-01-20T09:18:00',
          type: 'text'
        },
        {
          id: 3,
          sender: 'Sarah Wilson',
          content: 'Great progress! Any blockers or concerns?',
          timestamp: '2024-01-20T09:20:00',
          type: 'text'
        },
        {
          id: 4,
          sender: 'me',
          content: 'No major blockers. Just need clarification on the new API endpoints.',
          timestamp: '2024-01-20T09:25:00',
          type: 'text'
        },
        {
          id: 5,
          sender: 'Sarah Wilson',
          content: 'Thanks for the update on the project. Let\'s discuss the timeline in our 1:1.',
          timestamp: '2024-01-20T10:30:00',
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      type: 'group',
      name: 'Frontend Team',
      participants: ['Sarah Wilson', 'Alex Thompson', 'Mike Chen', 'Emily Chen'],
      avatar: '/avatars/team.jpg',
      lastMessage: 'Alex: The new design system components are ready for review!',
      lastMessageTime: '2024-01-20T08:45:00',
      unreadCount: 5,
      messages: [
        {
          id: 1,
          sender: 'Mike Chen',
          content: 'Morning team! Daily standup in 15 minutes.',
          timestamp: '2024-01-20T08:30:00',
          type: 'text'
        },
        {
          id: 2,
          sender: 'Alex Thompson',
          content: 'The new design system components are ready for review!',
          timestamp: '2024-01-20T08:45:00',
          type: 'text'
        }
      ]
    },
    {
      id: 3,
      type: 'direct',
      name: 'Alex Thompson',
      role: 'Junior Developer',
      avatar: '/avatars/alex.jpg',
      lastMessage: 'Can you help me with the useState hook implementation?',
      lastMessageTime: '2024-01-19T16:20:00',
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          sender: 'Alex Thompson',
          content: 'Hey John! Thanks for the code review yesterday.',
          timestamp: '2024-01-19T15:30:00',
          type: 'text'
        },
        {
          id: 2,
          sender: 'me',
          content: 'No problem! Your code is getting much cleaner.',
          timestamp: '2024-01-19T15:35:00',
          type: 'text'
        },
        {
          id: 3,
          sender: 'Alex Thompson',
          content: 'Can you help me with the useState hook implementation?',
          timestamp: '2024-01-19T16:20:00',
          type: 'text'
        }
      ]
    },
    {
      id: 4,
      type: 'direct',
      name: 'Lisa Rodriguez',
      role: 'VP of People',
      avatar: '/avatars/lisa.jpg',
      lastMessage: 'Your performance review is scheduled for next week.',
      lastMessageTime: '2024-01-18T14:10:00',
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: 1,
          sender: 'Lisa Rodriguez',
          content: 'Hi John! Hope you\'re having a great week.',
          timestamp: '2024-01-18T14:00:00',
          type: 'text'
        },
        {
          id: 2,
          sender: 'Lisa Rodriguez',
          content: 'Your performance review is scheduled for next week.',
          timestamp: '2024-01-18T14:10:00',
          type: 'text'
        }
      ]
    },
    {
      id: 5,
      type: 'group',
      name: 'Project Alpha',
      participants: ['Sarah Wilson', 'David Kim', 'Emily Chen', 'Mike Chen'],
      avatar: '/avatars/project.jpg',
      lastMessage: 'David: Updated the project timeline in the shared document.',
      lastMessageTime: '2024-01-18T11:30:00',
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: 'David Kim',
          content: 'Updated the project timeline in the shared document.',
          timestamp: '2024-01-18T11:30:00',
          type: 'text'
        }
      ]
    }
  ]

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message = {
        id: selectedChat.messages.length + 1,
        sender: 'me',
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text'
      }
      
      // Add message to selected chat
      selectedChat.messages.push(message)
      setNewMessage('')
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const totalUnreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0)

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">
              Stay connected with your team
              {totalUnreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {totalUnreadCount} unread
                </span>
              )}
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Message
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-96">
            {/* Chat List */}
            <div className="lg:col-span-1 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border-0 focus:ring-0 p-0 text-sm placeholder-gray-500"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-80">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat?.id === chat.id ? 'bg-primary-50 border-primary-200' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          {chat.type === 'group' ? (
                            <Users className="w-5 h-5 text-primary-600" />
                          ) : (
                            <MessageSquare className="w-5 h-5 text-primary-600" />
                          )}
                        </div>
                        {chat.type === 'direct' && chat.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">
                              {formatTime(chat.lastMessageTime)}
                            </span>
                            {chat.unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1rem] h-4 flex items-center justify-center">
                                {chat.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                        {chat.type === 'direct' && chat.role && (
                          <p className="text-xs text-gray-500 mb-1">{chat.role}</p>
                        )}
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        {selectedChat.type === 'group' ? (
                          <Users className="w-5 h-5 text-primary-600" />
                        ) : (
                          <MessageSquare className="w-5 h-5 text-primary-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedChat.name}</h3>
                        {selectedChat.type === 'direct' ? (
                          <p className="text-sm text-gray-500">
                            {selectedChat.role} • {selectedChat.isOnline ? 'Online' : 'Offline'}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">
                            {selectedChat.participants.length} participants
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Video className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedChat.messages.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${message.sender === 'me' ? 'order-2' : ''}`}>
                          {message.sender !== 'me' && selectedChat.type === 'group' && (
                            <p className="text-xs text-gray-500 mb-1">{message.sender}</p>
                          )}
                          <div
                            className={`rounded-lg px-3 py-2 ${
                              message.sender === 'me'
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                          <Smile className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* No Chat Selected */
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p>Choose a conversation from the left to start messaging.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Team Channels</h3>
                <p className="text-sm text-gray-600">Join team discussions</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Video className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Video Calls</h3>
                <p className="text-sm text-gray-600">Start a video meeting</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Message History</h3>
                <p className="text-sm text-gray-600">Search past conversations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage
