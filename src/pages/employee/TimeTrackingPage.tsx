import React, { useState } from 'react'
import { Clock, Play, Pause, Square, Calendar, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react'

const TimeTrackingPage = () => {
  const [isTracking, setIsTracking] = useState(false)
  const [currentTask, setCurrentTask] = useState('')
  const [currentTime, setCurrentTime] = useState('00:00:00')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Mock data for time entries
  const timeEntries = [
    {
      id: 1,
      date: '2024-01-15',
      task: 'Frontend Development',
      project: 'HRMS Portal',
      startTime: '09:00',
      endTime: '12:30',
      duration: '3h 30m',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-15',
      task: 'Code Review',
      project: 'HRMS Portal',
      startTime: '13:30',
      endTime: '15:00',
      duration: '1h 30m',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-01-15',
      task: 'Team Meeting',
      project: 'General',
      startTime: '15:00',
      endTime: '16:00',
      duration: '1h 00m',
      status: 'completed'
    }
  ]

  const weeklyStats = [
    { day: 'Mon', hours: 8.5 },
    { day: 'Tue', hours: 7.5 },
    { day: 'Wed', hours: 8.0 },
    { day: 'Thu', hours: 8.5 },
    { day: 'Fri', hours: 7.0 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 }
  ]

  const handleStartTracking = () => {
    if (currentTask.trim()) {
      setIsTracking(true)
      // Start timer logic here
    }
  }

  const handlePauseTracking = () => {
    setIsTracking(false)
    // Pause timer logic here
  }

  const handleStopTracking = () => {
    setIsTracking(false)
    setCurrentTask('')
    setCurrentTime('00:00:00')
    // Stop and save timer logic here
  }

  const totalHoursToday = timeEntries
    .filter(entry => entry.date === selectedDate)
    .reduce((total, entry) => {
      const [hours, minutes] = entry.duration.split('h ');
      return total + parseInt(hours) + parseInt(minutes.replace('m', '')) / 60;
    }, 0)

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
            <p className="text-gray-600">Track your work hours and manage your time efficiently</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Time Tracker */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Timer */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Activity</h2>
              
              <div className="text-center py-8">
                <div className="text-6xl font-mono font-bold text-primary-600 mb-4">
                  {currentTime}
                </div>
                
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="What are you working on?"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center"
                    disabled={isTracking}
                  />
                </div>

                <div className="flex justify-center gap-3">
                  {!isTracking ? (
                    <button
                      onClick={handleStartTracking}
                      disabled={!currentTask.trim()}
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <Play className="w-5 h-5" />
                      Start
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handlePauseTracking}
                        className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        <Pause className="w-5 h-5" />
                        Pause
                      </button>
                      <button
                        onClick={handleStopTracking}
                        className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Square className="w-5 h-5" />
                        Stop
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Time Entries */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Time Entries</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600">
                    {new Date(selectedDate).toLocaleDateString()}
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {timeEntries
                  .filter(entry => entry.date === selectedDate)
                  .map((entry) => (
                    <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{entry.task}</h3>
                          <p className="text-sm text-gray-600">{entry.project}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{entry.startTime} - {entry.endTime}</span>
                            <span className="font-medium text-primary-600">{entry.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            entry.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {entry.status}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Clock className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                
                {timeEntries.filter(entry => entry.date === selectedDate).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No time entries for this date</p>
                    <p className="text-sm">Start tracking your time to see entries here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Daily Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Hours</span>
                  <span className="font-semibold text-primary-600">{totalHoursToday.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Entries</span>
                  <span className="font-semibold">{timeEntries.filter(entry => entry.date === selectedDate).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    totalHoursToday >= 8 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {totalHoursToday >= 8 ? 'Complete' : 'In Progress'}
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
              <div className="space-y-3">
                {weeklyStats.map((day, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-8">{day.day}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.hours / 8) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900 w-12 text-right">{day.hours}h</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total this week</span>
                  <span className="font-semibold">{weeklyStats.reduce((sum, day) => sum + day.hours, 0)}h</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-primary-600" />
                    <span className="text-sm">View Time Reports</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary-600" />
                    <span className="text-sm">Export Timesheet</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTrackingPage
