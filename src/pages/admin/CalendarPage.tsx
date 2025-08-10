import React, { useState } from 'react'
import { Calendar, Clock, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

const AdminCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')

  const events = [
    {
      id: 1,
      title: 'All Hands Meeting',
      date: '2024-01-25',
      time: '10:00',
      type: 'meeting',
      attendees: ['All Staff'],
      location: 'Main Conference Room'
    },
    {
      id: 2,
      title: 'John Doe - Performance Review',
      date: '2024-01-26',
      time: '14:00',
      type: 'review',
      attendees: ['John Doe', 'Sarah Wilson'],
      location: 'HR Office'
    },
    {
      id: 3,
      title: 'Safety Training Session',
      date: '2024-01-27',
      time: '09:00',
      type: 'training',
      attendees: ['Engineering Team'],
      location: 'Training Room B'
    }
  ]

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'review': return 'bg-green-100 text-green-800 border-green-200'
      case 'training': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Calendar</h1>
            <p className="text-gray-600">Manage meetings, reviews, and organizational events</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Day
              </button>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              Schedule Event
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button className="p-2 hover:bg-gray-100 rounded">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 6 // Adjust for month start
                    const isCurrentMonth = day > 0 && day <= 31
                    const dayEvents = events.filter(event => {
                      const eventDay = new Date(event.date).getDate()
                      return eventDay === day
                    })
                    
                    return (
                      <div
                        key={i}
                        className={`min-h-[80px] p-2 border rounded ${
                          isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">
                          {isCurrentMonth ? day : ''}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded border ${getEventColor(event.type)}`}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="text-xs opacity-75">{event.time}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="border-l-4 border-primary-500 pl-4">
                    <div className="font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    <div className="text-sm text-gray-500">{event.location}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {event.attendees.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Events This Week:</span>
                  <span className="font-medium">{events.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Performance Reviews:</span>
                  <span className="font-medium">{events.filter(e => e.type === 'review').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Training Sessions:</span>
                  <span className="font-medium">{events.filter(e => e.type === 'training').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCalendarPage
