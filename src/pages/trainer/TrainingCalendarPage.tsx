import { useState } from 'react'
import { 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Eye, 
  Edit, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  BookOpen,
  Video,
  MessageSquare,
  X
} from 'lucide-react'

interface TrainingSession {
  id: string
  title: string
  type: 'workshop' | 'webinar' | 'classroom' | 'online' | 'assessment'
  date: string
  startTime: string
  endTime: string
  duration: number // in minutes
  instructor: string
  location: string
  maxParticipants: number
  currentParticipants: number
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  program: string
  course: string
  description: string
  tags: string[]
}

const mockSessions: TrainingSession[] = [
  {
    id: 'SESS001',
    title: 'Digital Marketing Fundamentals Workshop',
    type: 'workshop',
    date: '2024-03-25',
    startTime: '09:00',
    endTime: '17:00',
    duration: 480,
    instructor: 'Michael Chen',
    location: 'Training Room A',
    maxParticipants: 25,
    currentParticipants: 18,
    status: 'scheduled',
    program: 'Digital Marketing Fundamentals',
    course: 'Social Media Marketing',
    description: 'Comprehensive workshop covering digital marketing basics and social media strategies',
    tags: ['Marketing', 'Social Media', 'Beginner']
  },
  {
    id: 'SESS002',
    title: 'React.js Advanced Concepts',
    type: 'online',
    date: '2024-03-26',
    startTime: '14:00',
    endTime: '16:00',
    duration: 120,
    instructor: 'Emily Watson',
    location: 'Virtual Classroom',
    maxParticipants: 30,
    currentParticipants: 22,
    status: 'scheduled',
    program: 'Web Development Bootcamp',
    course: 'React.js Advanced',
    description: 'Advanced React patterns, hooks, and state management',
    tags: ['Development', 'React', 'Advanced']
  },
  {
    id: 'SESS003',
    title: 'Data Analysis with Python',
    type: 'classroom',
    date: '2024-03-27',
    startTime: '10:00',
    endTime: '15:00',
    duration: 300,
    instructor: 'Dr. Robert Kim',
    location: 'Computer Lab B',
    maxParticipants: 20,
    currentParticipants: 15,
    status: 'scheduled',
    program: 'Data Science Essentials',
    course: 'Python for Data Analysis',
    description: 'Hands-on data analysis using pandas, numpy, and matplotlib',
    tags: ['Data Science', 'Python', 'Intermediate']
  },
  {
    id: 'SESS004',
    title: 'Agile Project Management',
    type: 'webinar',
    date: '2024-03-28',
    startTime: '13:00',
    endTime: '15:00',
    duration: 120,
    instructor: 'Jennifer Lee',
    location: 'Webinar Platform',
    maxParticipants: 50,
    currentParticipants: 35,
    status: 'scheduled',
    program: 'Project Management',
    course: 'Agile Methodology',
    description: 'Introduction to Agile methodologies, Scrum, and Kanban practices',
    tags: ['Project Management', 'Agile', 'Beginner']
  },
  {
    id: 'SESS005',
    title: 'UX/UI Design Principles',
    type: 'workshop',
    date: '2024-03-29',
    startTime: '09:00',
    endTime: '16:00',
    duration: 420,
    instructor: 'Alex Thompson',
    location: 'Design Studio',
    maxParticipants: 15,
    currentParticipants: 12,
    status: 'scheduled',
    program: 'UX/UI Design',
    course: 'User Research Methods',
    description: 'Design thinking workshop with hands-on prototyping exercises',
    tags: ['Design', 'UX/UI', 'Beginner']
  }
]

const TrainingCalendarPage = () => {
  const [sessions, setSessions] = useState<TrainingSession[]>(mockSessions)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || session.type === typeFilter
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'text-blue-600 bg-blue-100'
      case 'webinar': return 'text-purple-600 bg-purple-100'
      case 'classroom': return 'text-green-600 bg-green-100'
      case 'online': return 'text-orange-600 bg-orange-100'
      case 'assessment': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100'
      case 'in-progress': return 'text-green-600 bg-green-100'
      case 'completed': return 'text-gray-600 bg-gray-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const quickStats = [
    { label: 'Total Sessions', value: sessions.length, icon: Calendar, color: 'text-blue-600' },
    { label: 'This Week', value: sessions.filter(s => {
      const sessionDate = new Date(s.date)
      const weekStart = new Date(currentDate)
      weekStart.setDate(currentDate.getDate() - currentDate.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      return sessionDate >= weekStart && sessionDate <= weekEnd
    }).length, icon: Clock, color: 'text-green-600' },
    { label: 'Total Participants', value: sessions.reduce((sum, s) => sum + s.currentParticipants, 0), icon: Users, color: 'text-purple-600' },
    { label: 'Upcoming', value: sessions.filter(s => new Date(s.date) > new Date()).length, icon: BookOpen, color: 'text-orange-600' }
  ]

  const sessionTypes = Array.from(new Set(sessions.map(s => s.type)))

  const getCurrentWeekDates = () => {
    const weekStart = new Date(currentDate)
    weekStart.setDate(currentDate.getDate() - currentDate.getDay())
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const getSessionsForDate = (date: Date) => {
    return filteredSessions.filter(session => {
      const sessionDate = new Date(session.date)
      return sessionDate.toDateString() === date.toDateString()
    })
  }

  const formatTime = (time: string) => {
    return time
  }

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId))
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 7)
    } else {
      newDate.setDate(currentDate.getDate() + 7)
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training Calendar</h1>
          <p className="text-gray-600">Manage and schedule training sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            Schedule Session
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search sessions, programs, or instructors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {sessionTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-2 ${viewMode === 'calendar' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
              >
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateWeek('prev')}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Today
              </button>
              <button
                onClick={() => navigateWeek('next')}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Week Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="bg-gray-50 p-3 text-center">
                <div className="text-sm font-medium text-gray-500">{day}</div>
              </div>
            ))}
            
            {/* Calendar Days */}
            {getCurrentWeekDates().map((date, index) => {
              const daySessions = getSessionsForDate(date)
              const isToday = date.toDateString() === new Date().toDateString()
              
              return (
                <div key={index} className={`bg-white min-h-32 p-2 ${isToday ? 'bg-blue-50' : ''}`}>
                  <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                    {date.getDate()}
                  </div>
                  
                  {/* Sessions for this day */}
                  <div className="space-y-1">
                    {daySessions.map((session) => (
                      <div
                        key={session.id}
                        className="text-xs p-1 rounded cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedSession(session)
                          setShowDetailModal(true)
                        }}
                      >
                        <div className="font-medium text-gray-900 truncate">{session.title}</div>
                        <div className="text-gray-500">{formatTime(session.startTime)}</div>
                        <span className={`inline-block px-1 py-0.5 text-xs rounded ${getTypeColor(session.type)}`}>
                          {session.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{session.title}</div>
                        <div className="text-sm text-gray-500">{session.program} - {session.course}</div>
                        <div className="text-sm text-gray-500">Instructor: {session.instructor}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(session.startTime)} - {formatTime(session.endTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(session.type)}`}>
                        {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.currentParticipants}/{session.maxParticipants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedSession(session)
                            setShowDetailModal(true)
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSession(session.id)}
                          className="text-red-600 hover:text-red-900"
                        >
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
      )}

      {/* Session Detail Modal */}
      {showDetailModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Session Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Session Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Title:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedSession.title}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Type:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedSession.type)}`}>
                      {selectedSession.type.charAt(0).toUpperCase() + selectedSession.type.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSession.status)}`}>
                      {selectedSession.status.charAt(0).toUpperCase() + selectedSession.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Description:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedSession.description}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Schedule & Location</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Date:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {new Date(selectedSession.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Time:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {formatTime(selectedSession.startTime)} - {formatTime(selectedSession.endTime)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Duration:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedSession.duration} minutes</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Location:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedSession.location}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Program Details</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Program:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedSession.program}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Course:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedSession.course}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Instructor:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedSession.instructor}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Participation</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Current:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedSession.currentParticipants}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Maximum:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedSession.maxParticipants}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Available:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {selectedSession.maxParticipants - selectedSession.currentParticipants}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSession.tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
              <button className="btn-primary">
                <Edit className="w-4 h-4 mr-2" />
                Edit Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrainingCalendarPage
