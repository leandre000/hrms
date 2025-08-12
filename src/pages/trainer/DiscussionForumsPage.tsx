import React, { useState } from 'react'
import {
  MessageSquare,
  Plus,
  Search,
  Filter,
  Users,
  Clock,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Pin,
  Flag
} from 'lucide-react'

interface ForumTopic {
  id: string
  title: string
  description: string
  category: string
  author: string
  replies: number
  views: number
  lastActivity: string
  status: 'Active' | 'Locked' | 'Pinned' | 'Archived'
  tags: string[]
  isSticky: boolean
}

interface ForumCategory {
  id: string
  name: string
  description: string
  topicCount: number
  postCount: number
  lastActivity: string
}

const mockCategories: ForumCategory[] = [
  {
    id: '1',
    name: 'General Discussion',
    description: 'General questions and discussions about training programs',
    topicCount: 45,
    postCount: 234,
    lastActivity: '2024-12-20'
  },
  {
    id: '2',
    name: 'Technical Support',
    description: 'Technical issues and troubleshooting help',
    topicCount: 23,
    postCount: 156,
    lastActivity: '2024-12-19'
  },
  {
    id: '3',
    name: 'Study Groups',
    description: 'Collaborative study and group discussions',
    topicCount: 18,
    postCount: 89,
    lastActivity: '2024-12-18'
  }
]

const mockTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Best practices for Agile project management',
    description: 'Looking for tips and best practices from experienced project managers',
    category: 'General Discussion',
    author: 'Alex Johnson',
    replies: 12,
    views: 89,
    lastActivity: '2024-12-20',
    status: 'Active',
    tags: ['Agile', 'Project Management', 'Best Practices'],
    isSticky: true
  },
  {
    id: '2',
    title: 'Data Analysis tools recommendation',
    description: 'What tools do you recommend for beginners in data analysis?',
    category: 'Technical Support',
    author: 'Sarah Chen',
    replies: 8,
    views: 67,
    lastActivity: '2024-12-19',
    status: 'Active',
    tags: ['Data Analysis', 'Tools', 'Beginner'],
    isSticky: false
  },
  {
    id: '3',
    title: 'Study group for PMP certification',
    description: 'Anyone interested in forming a study group for PMP exam prep?',
    category: 'Study Groups',
    author: 'Mike Rodriguez',
    replies: 15,
    views: 123,
    lastActivity: '2024-12-18',
    status: 'Active',
    tags: ['PMP', 'Certification', 'Study Group'],
    isSticky: false
  }
]

const DiscussionForumsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null)
  const [showCreateTopic, setShowCreateTopic] = useState(false)

  const filteredTopics = mockTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || topic.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || topic.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Locked': return 'bg-red-100 text-red-800'
      case 'Pinned': return 'bg-blue-100 text-blue-800'
      case 'Archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Unlock className="w-4 h-4" />
      case 'Locked': return <Lock className="w-4 h-4" />
      case 'Pinned': return <Pin className="w-4 h-4" />
      case 'Archived': return <Eye className="w-4 h-4" />
      default: return <Eye className="w-4 h-4" />
    }
  }

  const stats = {
    totalTopics: mockTopics.length,
    totalReplies: mockTopics.reduce((sum, topic) => sum + topic.replies, 0),
    totalViews: mockTopics.reduce((sum, topic) => sum + topic.views, 0),
    activeTopics: mockTopics.filter(topic => topic.status === 'Active').length
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discussion Forums</h1>
          <p className="text-gray-600">Manage forum discussions and moderate conversations</p>
        </div>
        <button 
          onClick={() => setShowCreateTopic(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Topic
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Topics</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTopics}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Replies</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalReplies}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Topics</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.activeTopics}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Forum Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Forum Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockCategories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-2">{category.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{category.topicCount} topics</span>
                <span>{category.postCount} posts</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Last activity: {category.lastActivity}
              </div>
            </div>
          ))}
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
                placeholder="Search topics..."
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
              {mockCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Locked">Locked</option>
              <option value="Pinned">Pinned</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTopics.map((topic) => (
                <tr key={topic.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {topic.isSticky && <Pin className="w-4 h-4 text-blue-500" />}
                        <h4 className="text-sm font-medium text-gray-900">{topic.title}</h4>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{topic.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {topic.tags.map((tag, index) => (
                          <span key={index} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{topic.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{topic.author}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {topic.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {topic.views}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {topic.lastActivity}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(topic.status)}`}>
                      {getStatusIcon(topic.status)}
                      <span className="ml-1">{topic.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
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

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No topics found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}

export default DiscussionForumsPage
