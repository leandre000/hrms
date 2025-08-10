import React, { useState } from 'react'
import { Calendar, Clock, User, Video, MapPin, Plus } from 'lucide-react'

const InterviewsPage = () => {
  const [viewMode, setViewMode] = useState('upcoming')

  const interviews = [
    {
      id: 'INT001',
      candidate: 'Alex Thompson',
      position: 'Senior Frontend Developer',
      interviewer: 'Sarah Wilson',
      date: '2024-01-26',
      time: '10:00 AM',
      duration: 60,
      type: 'Video Call',
      status: 'Scheduled',
      round: 'Technical Interview',
      notes: 'Focus on React and TypeScript experience',
      meetingLink: 'https://meet.company.com/alex-thompson'
    },
    {
      id: 'INT002',
      candidate: 'Sarah Johnson',
      position: 'Marketing Specialist',
      interviewer: 'Mike Johnson',
      date: '2024-01-26',
      time: '2:00 PM',
      duration: 45,
      type: 'In-Person',
      status: 'Scheduled',
      round: 'First Interview',
      notes: 'Review portfolio and discuss campaign experience',
      location: 'Conference Room A'
    },
    {
      id: 'INT003',
      candidate: 'Michael Chen',
      position: 'Product Manager',
      interviewer: 'Lisa Rodriguez',
      date: '2024-01-25',
      time: '11:00 AM',
      duration: 90,
      type: 'Video Call',
      status: 'Completed',
      round: 'Final Interview',
      notes: 'Excellent product sense, strong leadership background',
      rating: 4.5
    },
    {
      id: 'INT004',
      candidate: 'Emma Wilson',
      position: 'UX Designer',
      interviewer: 'David Brown',
      date: '2024-01-24',
      time: '3:00 PM',
      duration: 60,
      type: 'Video Call',
      status: 'Completed',
      round: 'Portfolio Review',
      notes: 'Good design skills but lacks experience in user research',
      rating: 3.2
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      case 'Rescheduled': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'Video Call' ? 
      <Video className="w-4 h-4 text-blue-500" /> :
      <MapPin className="w-4 h-4 text-green-500" />
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < Math.floor(rating) 
            ? 'text-yellow-400' 
            : i < rating 
            ? 'text-yellow-400 opacity-50'
            : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ))
  }

  const filteredInterviews = interviews.filter(interview => {
    if (viewMode === 'upcoming') {
      return interview.status === 'Scheduled'
    } else if (viewMode === 'completed') {
      return interview.status === 'Completed'
    }
    return true
  })

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Interview Scheduling</h1>
            <p className="text-gray-600">Manage interview schedules and candidate evaluations</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Schedule Interview
          </button>
        </div>

        {/* View Toggle */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setViewMode('upcoming')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'upcoming' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setViewMode('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'completed' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Interviews
            </button>
          </div>
        </div>

        {/* Interview List */}
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <div key={interview.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{interview.candidate}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {interview.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{interview.position} • {interview.round}</p>
                  <p className="text-gray-700 text-sm">{interview.notes}</p>
                </div>
                
                {interview.rating && (
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Rating</div>
                    <div className="flex">
                      {renderStars(interview.rating)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{interview.rating}/5</div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{new Date(interview.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-600">{interview.time}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{interview.duration} minutes</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getTypeIcon(interview.type)}
                  <div>
                    <div className="font-medium">{interview.type}</div>
                    <div className="text-sm text-gray-600">
                      {interview.type === 'Video Call' ? 'Remote' : interview.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{interview.interviewer}</div>
                    <div className="text-sm text-gray-600">Interviewer</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Interview ID: {interview.id}
                </div>
                <div className="flex gap-2">
                  {interview.status === 'Scheduled' && (
                    <>
                      {interview.meetingLink && (
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Join Meeting
                        </a>
                      )}
                      <button className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                        Reschedule
                      </button>
                    </>
                  )}
                  {interview.status === 'Completed' && (
                    <button className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg hover:bg-primary-100 transition-colors">
                      View Feedback
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-primary-600">{interviews.length}</div>
            <div className="text-sm text-gray-600">Total Interviews</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">
              {interviews.filter(i => i.status === 'Scheduled').length}
            </div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">
              {interviews.filter(i => i.status === 'Completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-orange-600">
              {interviews.filter(i => i.type === 'Video Call').length}
            </div>
            <div className="text-sm text-gray-600">Video Calls</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewsPage
