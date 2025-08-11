import React, { useState } from 'react'
import {
  Calendar,
  Plus,
  Search,
  ChevronLeft,
  Users,
  User,
  Filter,
  Building,
  AlertTriangle,
  Star,
  Clock,
  MapPin,
  Video,
  Edit,
  MoreVertical,
  Tag
} from 'lucide-react'

interface CalendarEvent {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  allDay: boolean
  location: string
  attendees: string[]
  type: 'meeting' | 'interview' | 'training' | 'holiday' | 'deadline' | 'reminder'
  priority: 'low' | 'medium' | 'high'
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  color: string
  recurring: boolean
  recurringPattern?: string
}

interface CalendarView {
  id: string
  name: string
  icon: any
}

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState('month')
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  // Mock data
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Standup Meeting',
      description: 'Daily team synchronization meeting to discuss progress and blockers',
      startDate: new Date(2024, 0, 22, 9, 0),
      endDate: new Date(2024, 0, 22, 9, 30),
      allDay: false,
      location: 'Conference Room A',
      attendees: ['Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Brown'],
      type: 'meeting',
      priority: 'medium',
      status: 'scheduled',
      color: 'bg-blue-500',
      recurring: true,
      recurringPattern: 'daily'
    },
    {
      id: '2',
      title: 'Candidate Interview - John Smith',
      description: 'Technical interview for Senior Developer position',
      startDate: new Date(2024, 0, 22, 14, 0),
      endDate: new Date(2024, 0, 22, 15, 0),
      allDay: false,
      location: 'Interview Room 1',
      attendees: ['Sarah Johnson', 'HR Manager'],
      type: 'interview',
      priority: 'high',
      status: 'scheduled',
      color: 'bg-green-500',
      recurring: false
    },
    {
      id: '3',
      title: 'Leadership Training Workshop',
      description: 'Workshop on developing leadership skills for managers',
      startDate: new Date(2024, 0, 23, 10, 0),
      endDate: new Date(2024, 0, 23, 16, 0),
      allDay: false,
      location: 'Training Center',
      attendees: ['All Managers'],
      type: 'training',
      priority: 'high',
      status: 'scheduled',
      color: 'bg-purple-500',
      recurring: false
    },
    {
      id: '4',
      title: 'Project Deadline - Q1 Goals',
      description: 'Deadline for completing Q1 project milestones',
      startDate: new Date(2024, 0, 25),
      endDate: new Date(2024, 0, 25),
      allDay: true,
      location: 'N/A',
      attendees: ['Project Team'],
      type: 'deadline',
      priority: 'high',
      status: 'scheduled',
      color: 'bg-red-500',
      recurring: false
    },
    {
      id: '5',
      title: 'New Year Holiday',
      description: 'Company closed for New Year celebration',
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 0, 1),
      allDay: true,
      location: 'N/A',
      attendees: ['All Employees'],
      type: 'holiday',
      priority: 'low',
      status: 'scheduled',
      color: 'bg-yellow-500',
      recurring: true,
      recurringPattern: 'yearly'
    }
  ]

  const calendarViews: CalendarView[] = [
    { id: 'day', name: 'Day', icon: Calendar },
    { id: 'week', name: 'Week', icon: Calendar },
    { id: 'month', name: 'Month', icon: Calendar },
    { id: 'agenda', name: 'Agenda', icon: Calendar }
  ]

  const eventTypes = [
    { id: 'all', name: 'All Events', color: 'bg-gray-500' },
    { id: 'meeting', name: 'Meetings', color: 'bg-blue-500' },
    { id: 'interview', name: 'Interviews', color: 'bg-green-500' },
    { id: 'training', name: 'Training', color: 'bg-purple-500' },
    { id: 'deadline', name: 'Deadlines', color: 'bg-red-500' },
    { id: 'holiday', name: 'Holidays', color: 'bg-yellow-500' }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || event.type === selectedType
    return matchesSearch && matchesType
  })

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDate = new Date(startDate)
    
    while (currentDate <= lastDay || days.length < 42) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
  }

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startDate)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users size={14} />
      case 'interview': return <User size={14} />
      case 'training': return <Building size={14} />
      case 'deadline': return <AlertTriangle size={14} />
      case 'holiday': return <Star size={14} />
      default: return <Calendar size={14} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const today = new Date()
  const monthDays = getMonthDays(currentDate)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Manage your schedule and events</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Filter size={20} />
            Filter
          </button>
          <button 
            onClick={() => setShowEventModal(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            New Event
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
            </button>
            <button
              onClick={() => setCurrentDate(today)}
              className="px-3 py-1 text-sm text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50"
            >
              Today
            </button>
          </div>

          {/* View Selector */}
          <div className="flex space-x-1">
            {calendarViews.map((view) => {
              const Icon = view.icon
              return (
                <button
                  key={view.id}
                  onClick={() => setSelectedView(view.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    selectedView === view.id
                      ? 'bg-primary-100 text-primary-800'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} className="inline mr-2" />
                  {view.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center space-x-2 ${
                  selectedType === type.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {monthDays.map((date, index) => {
            const isCurrentMonth = date.getMonth() === currentDate.getMonth()
            const isToday = date.toDateString() === today.toDateString()
            const dayEvents = getEventsForDate(date)

            return (
              <div
                key={index}
                className={`min-h-[120px] border-r border-b border-gray-200 p-2 ${
                  !isCurrentMonth ? 'bg-gray-50' : ''
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } ${isToday ? 'text-blue-600' : ''}`}>
                  {date.getDate()}
                </div>
                
                {/* Events for this day */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`p-1 rounded text-xs cursor-pointer border-l-4 ${getPriorityColor(event.priority)} ${
                        event.allDay ? 'bg-gray-100' : 'bg-white'
                      } hover:bg-gray-50`}
                    >
                      <div className="flex items-center space-x-1">
                        {getEventTypeIcon(event.type)}
                        <span className="truncate font-medium">{event.title}</span>
                      </div>
                      {!event.allDay && (
                        <div className="text-gray-500 text-xs">
                          {formatTime(event.startDate)}
                        </div>
                      )}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Upcoming Events Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
            <div className="space-y-3">
              {filteredEvents
                .filter(event => event.startDate >= today)
                .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${event.color}`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {event.allDay ? 'All Day' : `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`}
                            </span>
                            {event.location && (
                              <span className="flex items-center">
                                <MapPin size={12} className="mr-1" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {event.recurring && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Recurring
                          </span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          event.priority === 'high' ? 'bg-red-100 text-red-800' :
                          event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 text-left text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 flex items-center space-x-2">
                <Video size={16} />
                <span>Schedule Video Call</span>
              </button>
              <button className="w-full px-4 py-3 text-left text-sm font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-50 flex items-center space-x-2">
                <Users size={16} />
                <span>Create Team Meeting</span>
              </button>
              <button className="w-full px-4 py-3 text-left text-sm font-medium text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 flex items-center space-x-2">
                <Building size={16} />
                <span>Schedule Training</span>
              </button>
              <button className="w-full px-4 py-3 text-left text-sm font-medium text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 flex items-center space-x-2">
                <User size={16} />
                <span>Book Interview</span>
              </button>
            </div>
          </div>

          {/* Event Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Events</span>
                <span className="font-semibold text-gray-900">{filteredEvents.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Meetings</span>
                <span className="font-semibold text-blue-600">
                  {filteredEvents.filter(e => e.type === 'meeting').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Interviews</span>
                <span className="font-semibold text-green-600">
                  {filteredEvents.filter(e => e.type === 'interview').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Training</span>
                <span className="font-semibold text-purple-600">
                  {filteredEvents.filter(e => e.type === 'training').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${selectedEvent.color}`}></div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowEventModal(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">{selectedEvent.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Time</p>
                      <p className="text-sm text-gray-600">
                        {selectedEvent.allDay 
                          ? 'All Day' 
                          : `${formatTime(selectedEvent.startDate)} - ${formatTime(selectedEvent.endDate)}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  {selectedEvent.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-gray-600">{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Attendees</p>
                      <p className="text-sm text-gray-600">{selectedEvent.attendees.length} people</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Tag className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Type</p>
                      <p className="text-sm text-gray-600 capitalize">{selectedEvent.type}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEvent.attendees.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Attendees</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.attendees.map((attendee, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {attendee}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Join Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalendarPage
