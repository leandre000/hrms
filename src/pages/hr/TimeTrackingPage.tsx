import React, { useState } from 'react'
import { Clock, Calendar, Play, Pause, Square, Filter, Download } from 'lucide-react'

const TimeTrackingPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('all')
  const [dateRange, setDateRange] = useState('this-week')

  const timeEntries = [
    {
      id: 'TE001',
      employee: 'John Doe',
      department: 'Engineering',
      date: '2024-01-25',
      clockIn: '09:00 AM',
      clockOut: '05:30 PM',
      breakTime: 60,
      totalHours: 7.5,
      status: 'Completed',
      project: 'Web Platform',
      notes: 'Frontend development work'
    },
    {
      id: 'TE002',
      employee: 'Jane Smith',
      department: 'Marketing',
      date: '2024-01-25',
      clockIn: '08:30 AM',
      clockOut: '05:00 PM',
      breakTime: 45,
      totalHours: 7.75,
      status: 'Completed',
      project: 'Campaign Launch',
      notes: 'Social media content creation'
    },
    {
      id: 'TE003',
      employee: 'Mike Johnson',
      department: 'Sales',
      date: '2024-01-25',
      clockIn: '09:15 AM',
      clockOut: null,
      breakTime: 0,
      totalHours: 0,
      status: 'Active',
      project: 'Client Meetings',
      notes: 'Sales calls and presentations'
    }
  ]

  const todayStats = {
    totalEmployees: 142,
    clockedIn: 127,
    late: 8,
    averageHours: 7.6,
    totalHours: 965.2
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Active': return 'bg-blue-100 text-blue-800'
      case 'Late': return 'bg-red-100 text-red-800'
      case 'Break': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Play className="w-4 h-4 text-blue-500" />
      case 'Break': return <Pause className="w-4 h-4 text-yellow-500" />
      case 'Completed': return <Square className="w-4 h-4 text-green-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
            <p className="text-gray-600">Monitor employee time and attendance records</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-gray-900">Total Employees</h3>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {todayStats.totalEmployees}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Play className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Clocked In</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {todayStats.clockedIn}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-gray-900">Late Today</h3>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {todayStats.late}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">Avg Hours</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {todayStats.averageHours}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium text-gray-900">Total Hours</h3>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {todayStats.totalHours}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Employees</option>
              <option value="john-doe">John Doe</option>
              <option value="jane-smith">Jane Smith</option>
              <option value="mike-johnson">Mike Johnson</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Time Entries Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Clock In</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Clock Out</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Break</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Total Hours</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Project</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {timeEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{entry.employee}</div>
                        <div className="text-sm text-gray-500">{entry.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{entry.clockIn}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {entry.clockOut || <span className="text-gray-400">--</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{entry.breakTime} min</td>
                    <td className="px-6 py-4 text-gray-900">
                      {entry.totalHours > 0 ? `${entry.totalHours}h` : '--'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(entry.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                          {entry.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{entry.project}</div>
                        <div className="text-sm text-gray-500">{entry.notes}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTrackingPage
