import React, { useState } from 'react'
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Video,
  Clock,
  Users,
  Play,
  Calendar,
  Globe,
  FileText,
  Link
} from 'lucide-react'

interface Webinar {
  id: string
  title: string
  description: string
  host: string
  date: string
  startTime: string
  endTime: string
  maxAttendees: number
  registeredAttendees: number
  status: 'Scheduled' | 'Live' | 'Completed' | 'Cancelled'
  type: 'Public' | 'Private' | 'Corporate'
  category: string
  webinarLink: string
  recordingUrl?: string
  materials: string[]
  tags: string[]
}

const mockWebinars: Webinar[] = [
  {
    id: '1',
    title: 'Digital Transformation Strategies',
    description: 'Learn about modern digital transformation approaches for enterprises',
    host: 'Dr. Sarah Johnson',
    date: '2024-12-25',
    startTime: '2:00 PM',
    endTime: '3:30 PM',
    maxAttendees: 200,
    registeredAttendees: 156,
    status: 'Scheduled',
    type: 'Public',
    category: 'Digital Strategy',
    webinarLink: 'https://zoom.us/j/123456789',
    materials: ['Digital_Transformation_Guide.pdf', 'Case_Studies.pptx'],
    tags: ['Digital', 'Transformation', 'Strategy', 'Enterprise']
  },
  {
    id: '2',
    title: 'AI in Project Management',
    description: 'Exploring AI tools and techniques for project management',
    host: 'Mike Chen',
    date: '2024-12-26',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    maxAttendees: 150,
    registeredAttendees: 150,
    status: 'Live',
    type: 'Corporate',
    category: 'Artificial Intelligence',
    webinarLink: 'https://teams.microsoft.com/l/meetup-join/456',
    materials: ['AI_PM_Tools.pdf', 'Demo_Instructions.docx'],
    tags: ['AI', 'Project Management', 'Automation']
  },
  {
    id: '3',
    title: 'Cybersecurity Best Practices',
    description: 'Essential cybersecurity practices for modern organizations',
    host: 'Lisa Rodriguez',
    date: '2024-12-24',
    startTime: '1:00 PM',
    endTime: '2:30 PM',
    maxAttendees: 300,
    registeredAttendees: 245,
    status: 'Completed',
    type: 'Public',
    category: 'Cybersecurity',
    webinarLink: 'https://meet.google.com/abc-defg-hij',
    recordingUrl: 'https://drive.google.com/recording456',
    materials: ['Security_Handbook.pdf', 'Checklist.docx'],
    tags: ['Cybersecurity', 'Security', 'Best Practices']
  }
]

const WebinarManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const filteredWebinars = mockWebinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.host.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || webinar.status === statusFilter
    const matchesType = typeFilter === 'all' || webinar.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800'
      case 'Live': return 'bg-green-100 text-green-800'
      case 'Completed': return 'bg-gray-100 text-gray-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Public': return 'bg-green-100 text-green-800'
      case 'Private': return 'bg-blue-100 text-blue-800'
      case 'Corporate': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: mockWebinars.length,
    scheduled: mockWebinars.filter(w => w.status === 'Scheduled').length,
    live: mockWebinars.filter(w => w.status === 'Live').length,
    completed: mockWebinars.filter(w => w.status === 'Completed').length,
    totalAttendees: mockWebinars.reduce((sum, webinar) => sum + webinar.registeredAttendees, 0)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Webinar Management</h1>
          <p className="text-gray-600">Schedule and manage webinars for training and knowledge sharing</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Webinar
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Webinars</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Video className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Live Now</p>
              <p className="text-2xl font-bold text-green-600">{stats.live}</p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-600">{stats.completed}</p>
            </div>
            <Users className="w-8 h-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalAttendees}</p>
            </div>
            <Globe className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search webinars, hosts, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Live">Live</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Webinars Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Webinar Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Host & Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWebinars.map((webinar) => (
                <tr key={webinar.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Video className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{webinar.title}</div>
                        <div className="text-sm text-gray-500">{webinar.description}</div>
                        <div className="text-xs text-gray-400">{webinar.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{webinar.host}</div>
                      <div className="text-sm text-gray-500">{webinar.date}</div>
                      <div className="text-xs text-gray-400">{webinar.startTime} - {webinar.endTime}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{webinar.registeredAttendees}/{webinar.maxAttendees}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(webinar.registeredAttendees / webinar.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(webinar.status)}`}>
                        {webinar.status}
                      </span>
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(webinar.type)}`}>
                          {webinar.type}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedWebinar(webinar)
                          setShowDetailsModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {webinar.status === 'Scheduled' && (
                        <button className="text-green-600 hover:text-green-900">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-purple-600 hover:text-purple-900">
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

      {/* Details Modal */}
      {showDetailsModal && selectedWebinar && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Webinar Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedWebinar.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedWebinar.status)}`}>
                    {selectedWebinar.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedWebinar.type)}`}>
                    {selectedWebinar.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedWebinar.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Host</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedWebinar.host}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedWebinar.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedWebinar.startTime} - {selectedWebinar.endTime}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attendees</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedWebinar.registeredAttendees}/{selectedWebinar.maxAttendees}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-900">{selectedWebinar.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Webinar Link</label>
                <a href={selectedWebinar.webinarLink} target="_blank" rel="noopener noreferrer" className="mt-1 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <Link className="w-4 h-4" />
                  Join Webinar
                </a>
              </div>
              
              {selectedWebinar.recordingUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recording</label>
                  <a href={selectedWebinar.recordingUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-sm text-blue-600 hover:text-blue-800">
                    View Recording
                  </a>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Materials</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedWebinar.materials.map((material, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <FileText className="w-3 h-3 mr-1" />
                      {material}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedWebinar.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Edit Webinar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WebinarManagementPage
