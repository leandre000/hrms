import React, { useState } from 'react'
import { Calendar, Clock, Users, Video, MapPin, Plus, Edit, Trash2, CheckCircle, XCircle, AlertCircle, Filter, Search } from 'lucide-react'

const InterviewsPage = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [showSchedule, setShowSchedule] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('today')

  const interviews = [
    {
      id: 1,
      candidateName: 'Alice Johnson',
      position: 'Senior Frontend Developer',
      type: 'Technical Interview',
      datetime: '2024-01-25T10:00:00',
      duration: 60,
      format: 'video',
      interviewer: 'Sarah Wilson',
      location: 'Zoom Meeting',
      status: 'scheduled',
      candidateEmail: 'alice.johnson@email.com',
      notes: 'Focus on React and TypeScript experience',
      meetingLink: 'https://zoom.us/j/123456789',
      round: 2,
      totalRounds: 3
    },
    {
      id: 2,
      candidateName: 'Robert Kim',
      position: 'Marketing Manager',
      type: 'HR Screening',
      datetime: '2024-01-24T14:00:00',
      duration: 30,
      format: 'in_person',
      interviewer: 'Lisa Rodriguez',
      location: 'Conference Room A',
      status: 'completed',
      candidateEmail: 'robert.kim@email.com',
      notes: 'Initial screening, discuss salary expectations',
      meetingLink: null,
      round: 1,
      totalRounds: 3,
      feedback: 'Strong candidate, proceed to next round'
    },
    {
      id: 3,
      candidateName: 'Emma Davis',
      position: 'Junior Developer',
      type: 'Coding Assessment',
      datetime: '2024-01-26T15:30:00',
      duration: 90,
      format: 'video',
      interviewer: 'Michael Chen',
      location: 'HackerRank Platform',
      status: 'scheduled',
      candidateEmail: 'emma.davis@email.com',
      notes: 'Basic programming concepts and problem solving',
      meetingLink: 'https://hackerrank.com/test/abc123',
      round: 1,
      totalRounds: 2
    },
    {
      id: 4,
      candidateName: 'John Miller',
      position: 'Senior Frontend Developer',
      type: 'Final Interview',
      datetime: '2024-01-23T11:00:00',
      duration: 45,
      format: 'video',
      interviewer: 'David Kim',
      location: 'Google Meet',
      status: 'cancelled',
      candidateEmail: 'john.miller@email.com',
      notes: 'Candidate withdrew application',
      meetingLink: 'https://meet.google.com/xyz-abc-def',
      round: 3,
      totalRounds: 3
    },
    {
      id: 5,
      candidateName: 'Maria Garcia',
      position: 'UX Designer',
      type: 'Portfolio Review',
      datetime: '2024-01-25T16:00:00',
      duration: 60,
      format: 'in_person',
      interviewer: 'Jennifer Adams',
      location: 'Design Studio',
      status: 'scheduled',
      candidateEmail: 'maria.garcia@email.com',
      notes: 'Review portfolio and design process',
      meetingLink: null,
      round: 2,
      totalRounds: 3
    }
  ]

  const interviewTypes = ['HR Screening', 'Technical Interview', 'Coding Assessment', 'Portfolio Review', 'Final Interview', 'Panel Interview']
  const statuses = ['all', 'scheduled', 'completed', 'cancelled', 'rescheduled']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      case 'rescheduled':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredInterviews = interviews.filter(interview => {
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter
    const today = new Date()
    const interviewDate = new Date(interview.datetime)
    
    let matchesDate = true
    if (dateFilter === 'today') {
      matchesDate = interviewDate.toDateString() === today.toDateString()
    } else if (dateFilter === 'week') {
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      matchesDate = interviewDate >= today && interviewDate <= weekFromNow
    }
    
    return matchesStatus && matchesDate
  })

  const stats = {
    scheduled: interviews.filter(i => i.status === 'scheduled').length,
    completed: interviews.filter(i => i.status === 'completed').length,
    todayInterviews: interviews.filter(i => {
      const today = new Date().toDateString()
      const interviewDate = new Date(i.datetime).toDateString()
      return interviewDate === today && i.status === 'scheduled'
    }).length,
    upcomingWeek: interviews.filter(i => {
      const today = new Date()
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      const interviewDate = new Date(i.datetime)
      return interviewDate >= today && interviewDate <= weekFromNow && i.status === 'scheduled'
    }).length
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
            <p className="text-gray-600">Manage and track candidate interviews</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowSchedule(true)}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Schedule Interview
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('calendar')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.scheduled}</div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.todayInterviews}</div>
                <div className="text-sm text-gray-600">Today</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.upcomingWeek}</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="all">All Dates</option>
            </select>
          </div>
        </div>

        {/* Interview Content */}
        {view === 'calendar' ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInterviews.map((interview) => (
                <div key={interview.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(interview.status)}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                        {interview.status}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-1">{interview.candidateName}</h3>
                  <p className="text-sm text-gray-600 mb-2">{interview.position}</p>
                  <p className="text-sm font-medium text-primary-600 mb-3">{interview.type}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(interview.datetime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(interview.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {` (${interview.duration}min)`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {interview.format === 'video' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                      <span>{interview.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{interview.interviewer}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <div className="text-xs text-gray-500 mb-2">
                      Round {interview.round} of {interview.totalRounds}
                    </div>
                    {interview.meetingLink && interview.status === 'scheduled' && (
                      <button className="w-full bg-primary-600 text-white py-2 px-3 rounded text-sm hover:bg-primary-700 transition-colors">
                        Join Interview
                      </button>
                    )}
                    {interview.status === 'completed' && interview.feedback && (
                      <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
                        {interview.feedback}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Candidate</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Interview Type</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Date & Time</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Interviewer</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInterviews.map((interview) => (
                    <tr key={interview.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{interview.candidateName}</div>
                          <div className="text-sm text-gray-500">{interview.position}</div>
                          <div className="text-xs text-gray-400">Round {interview.round} of {interview.totalRounds}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{interview.type}</div>
                        <div className="text-sm text-gray-500">
                          {interview.duration} minutes • {interview.format}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{new Date(interview.datetime).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(interview.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{interview.interviewer}</div>
                        <div className="text-sm text-gray-500">{interview.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                          {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {interview.meetingLink && interview.status === 'scheduled' && (
                            <button className="text-sm bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors">
                              Join
                            </button>
                          )}
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
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

        {/* Schedule Interview Modal */}
        {showSchedule && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule Interview</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Candidate</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select candidate</option>
                        <option value="alice">Alice Johnson</option>
                        <option value="robert">Robert Kim</option>
                        <option value="emma">Emma Davis</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select type</option>
                        {interviewTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                      <input
                        type="number"
                        min="15"
                        max="180"
                        step="15"
                        value="60"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select interviewer</option>
                        <option value="sarah">Sarah Wilson</option>
                        <option value="michael">Michael Chen</option>
                        <option value="lisa">Lisa Rodriguez</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input type="radio" name="format" value="video" className="mr-2" />
                        Video Call
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" value="in_person" className="mr-2" />
                        In Person
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" value="phone" className="mr-2" />
                        Phone
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location/Meeting Link</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter location or meeting link"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Interview notes or agenda"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Schedule Interview
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSchedule(false)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewsPage
