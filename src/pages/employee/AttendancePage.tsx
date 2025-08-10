import React, { useState } from 'react'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, Download } from 'lucide-react'

const AttendancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01')
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  // Mock attendance data
  const attendanceData = [
    { date: '2024-01-01', status: 'holiday', checkIn: null, checkOut: null, hours: 0, notes: 'New Year\'s Day' },
    { date: '2024-01-02', status: 'present', checkIn: '09:00', checkOut: '17:30', hours: 8.5, notes: '' },
    { date: '2024-01-03', status: 'present', checkIn: '08:45', checkOut: '17:15', hours: 8.5, notes: '' },
    { date: '2024-01-04', status: 'late', checkIn: '09:30', checkOut: '17:30', hours: 8, notes: 'Traffic delay' },
    { date: '2024-01-05', status: 'present', checkIn: '09:00', checkOut: '17:00', hours: 8, notes: '' },
    { date: '2024-01-08', status: 'present', checkIn: '08:50', checkOut: '17:20', hours: 8.5, notes: '' },
    { date: '2024-01-09', status: 'absent', checkIn: null, checkOut: null, hours: 0, notes: 'Sick leave' },
    { date: '2024-01-10', status: 'present', checkIn: '09:05', checkOut: '17:35', hours: 8.5, notes: '' },
    { date: '2024-01-11', status: 'half-day', checkIn: '09:00', checkOut: '13:00', hours: 4, notes: 'Medical appointment' },
    { date: '2024-01-12', status: 'present', checkIn: '08:55', checkOut: '17:25', hours: 8.5, notes: '' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'late':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'half-day':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'holiday':
        return <Calendar className="w-4 h-4 text-purple-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800'
      case 'absent':
        return 'bg-red-100 text-red-800'
      case 'late':
        return 'bg-yellow-100 text-yellow-800'
      case 'half-day':
        return 'bg-blue-100 text-blue-800'
      case 'holiday':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = parseInt(selectedMonth.split('-')[0])
    const month = parseInt(selectedMonth.split('-')[1]) - 1
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const attendance = attendanceData.find(item => item.date === dateString)
      days.push({
        day,
        dateString,
        attendance: attendance || { status: 'not-marked', checkIn: null, checkOut: null, hours: 0, notes: '' }
      })
    }

    return days
  }

  const monthlyStats = {
    totalDays: 22,
    presentDays: 18,
    absentDays: 2,
    lateDays: 1,
    halfDays: 1,
    totalHours: 156.5,
    averageHours: 8.2
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
            <p className="text-gray-600">Track your attendance and work hours</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('calendar')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  view === 'calendar' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  view === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{monthlyStats.totalDays}</div>
              <div className="text-sm text-gray-600">Total Days</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{monthlyStats.presentDays}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{monthlyStats.absentDays}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{monthlyStats.lateDays}</div>
              <div className="text-sm text-gray-600">Late</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{monthlyStats.halfDays}</div>
              <div className="text-sm text-gray-600">Half Days</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{monthlyStats.totalHours}</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{monthlyStats.averageHours}</div>
              <div className="text-sm text-gray-600">Avg/Day</div>
            </div>
          </div>
        </div>

        {/* Calendar or List View */}
        <div className="bg-white rounded-lg shadow-sm border">
          {view === 'calendar' ? (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </h2>
              
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((dayData, index) => (
                  <div key={index} className="aspect-square border border-gray-200 p-1">
                    {dayData ? (
                      <div className="h-full flex flex-col">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {dayData.day}
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          {getStatusIcon(dayData.attendance.status)}
                        </div>
                        {dayData.attendance.hours > 0 && (
                          <div className="text-xs text-gray-500 text-center">
                            {dayData.attendance.hours}h
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-full"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span>Late</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Half Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Holiday</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance List</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Check In</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Check Out</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Hours</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData
                      .filter(item => item.date.startsWith(selectedMonth))
                      .map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                              {getStatusIcon(item.status)}
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4">{item.checkIn || '-'}</td>
                          <td className="py-3 px-4">{item.checkOut || '-'}</td>
                          <td className="py-3 px-4">{item.hours || '-'}</td>
                          <td className="py-3 px-4 text-gray-600">{item.notes || '-'}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AttendancePage
