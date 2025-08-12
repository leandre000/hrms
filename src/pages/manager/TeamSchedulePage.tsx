import React, { useState } from 'react'
import { Calendar, Clock, Users, Plus, Filter, Search, MapPin } from 'lucide-react'

interface TeamSchedule {
  id: string
  title: string
  type: 'meeting' | 'deadline' | 'event' | 'training'
  date: string
  time: string
  duration: string
  attendees: string[]
  location: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

const TeamSchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [filterType, setFilterType] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const mockSchedule: TeamSchedule[] = [
    {
      id: '1',
      title: 'Weekly Team Standup',
      type: 'meeting',
      date: '2024-12-20',
      time: '09:00',
      duration: '30 min',
      attendees: ['Sarah Chen', 'Mike Johnson', 'Emily Davis', 'Alex Rodriguez'],
      location: 'Conference Room A',
      description: 'Daily team synchronization meeting to discuss progress and blockers',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Project Alpha Deadline',
      type: 'deadline',
      date: '2024-12-22',
      time: '17:00',
      duration: 'N/A',
      attendees: ['Sarah Chen', 'Mike Johnson'],
      location: 'Remote',
      description: 'Final submission deadline for Project Alpha features',
      priority: 'high'
    },
    {
      id: '3',
      title: 'UX Design Workshop',
      type: 'training',
      date: '2024-12-21',
      time: '14:00',
      duration: '2 hours',
      attendees: ['Emily Davis', 'Sarah Chen'],
      location: 'Training Room B',
      description: 'Workshop on advanced UX design principles and tools',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Client Demo Meeting',
      type: 'meeting',
      date: '2024-12-23',
      time: '11:00',
      duration: '1 hour',
      attendees: ['Lisa Wang', 'Sarah Chen', 'Mike Johnson'],
      location: 'Conference Room C',
      description: 'Demo of new features to key client stakeholders',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Code Review Session',
      type: 'meeting',
      date: '2024-12-20',
      time: '15:00',
      duration: '45 min',
      attendees: ['Sarah Chen', 'Alex Rodriguez'],
      location: 'Engineering Pod',
      description: 'Code review for backend API changes',
      priority: 'medium'
    }
  ]

  const filteredSchedule = mockSchedule.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'All' || item.type === filterType
    const matchesDate = item.date === selectedDate
    
    return matchesSearch && matchesType && matchesDate
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="h-4 w-4" />
      case 'deadline': return <Clock className="h-4 w-4" />
      case 'event': return <Calendar className="h-4 w-4" />
      case 'training': return <Users className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800'
      case 'deadline': return 'bg-red-100 text-red-800'
      case 'event': return 'bg-purple-100 text-purple-800'
      case 'training': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Schedule</h1>
        <p className="text-gray-600">Manage and view your team's schedule, meetings, and important deadlines</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Events</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSchedule.filter(item => item.date === selectedDate).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Meetings</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSchedule.filter(item => item.type === 'meeting').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSchedule.filter(item => item.type === 'deadline').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Training Sessions</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSchedule.filter(item => item.type === 'training').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Types</option>
              <option value="meeting">Meetings</option>
              <option value="deadline">Deadlines</option>
              <option value="event">Events</option>
              <option value="training">Training</option>
            </select>
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search schedule items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Schedule List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Schedule for {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredSchedule.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No events scheduled</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
            </div>
          ) : (
            filteredSchedule.map((item) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority} Priority
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.time} ({item.duration})
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {item.attendees.length} attendees
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex flex-col gap-2">
                    <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
                
                {item.attendees.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Attendees:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.attendees.map((attendee, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Calendar className="h-4 w-4 mr-2" />
          Export Schedule
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Users className="h-4 w-4 mr-2" />
          Schedule Team Meeting
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Clock className="h-4 w-4 mr-2" />
          Set Reminders
        </button>
      </div>
    </div>
  )
}

export default TeamSchedulePage
