import React, { useState } from 'react'
import { Clock, Users, Calendar, Play, Pause, Square, Filter, Search, Download, BarChart3, AlertCircle, CheckCircle, MapPin } from 'lucide-react'

const AdminTimeTrackingPage = () => {
  const [dateFilter, setDateFilter] = useState('today')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const timeEntries = [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      date: '2024-01-24',
      clockIn: '09:00:00',
      clockOut: '17:30:00',
      breakStart: '12:00:00',
      breakEnd: '13:00:00',
      totalHours: 7.5,
      regularHours: 7.5,
      overtimeHours: 0,
      status: 'completed',
      location: 'Office',
      project: 'E-Commerce Platform',
      notes: 'Working on user authentication module',
      isRemote: false
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Wilson',
      department: 'Engineering',
      position: 'Engineering Manager',
      date: '2024-01-24',
      clockIn: '08:30:00',
      clockOut: '18:15:00',
      breakStart: '12:30:00',
      breakEnd: '13:30:00',
      totalHours: 8.75,
      regularHours: 8,
      overtimeHours: 0.75,
      status: 'completed',
      location: 'Office',
      project: 'Team Management',
      notes: 'Sprint planning and code reviews',
      isRemote: false
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Michael Chen',
      department: 'Engineering',
      position: 'Principal Engineer',
      date: '2024-01-24',
      clockIn: '09:15:00',
      clockOut: null,
      breakStart: null,
      breakEnd: null,
      totalHours: 0,
      regularHours: 0,
      overtimeHours: 0,
      status: 'active',
      location: 'Remote',
      project: 'Architecture Review',
      notes: 'System design documentation',
      isRemote: true
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Lisa Rodriguez',
      department: 'Human Resources',
      position: 'VP of People',
      date: '2024-01-24',
      clockIn: '08:45:00',
      clockOut: '17:00:00',
      breakStart: '12:15:00',
      breakEnd: '13:00:00',
      totalHours: 7.5,
      regularHours: 7.5,
      overtimeHours: 0,
      status: 'completed',
      location: 'Office',
      project: 'HR Operations',
      notes: 'Performance review meetings',
      isRemote: false
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'Alex Thompson',
      department: 'Engineering',
      position: 'Junior Developer',
      date: '2024-01-24',
      clockIn: '09:30:00',
      clockOut: '17:45:00',
      breakStart: '12:00:00',
      breakEnd: '12:45:00',
      totalHours: 7.5,
      regularHours: 7.5,
      overtimeHours: 0,
      status: 'late_clock_in',
      location: 'Office',
      project: 'Bug Fixes',
      notes: 'Fixing reported issues from QA',
      isRemote: false
    },
    {
      id: 6,
      employeeId: 'EMP006',
      employeeName: 'Emily Davis',
      department: 'Marketing',
      position: 'Marketing Manager',
      date: '2024-01-24',
      clockIn: null,
      clockOut: null,
      breakStart: null,
      breakEnd: null,
      totalHours: 0,
      regularHours: 0,
      overtimeHours: 0,
      status: 'absent',
      location: null,
      project: null,
      notes: 'Sick leave',
      isRemote: false
    }
  ]

  const departments = ['all', 'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance']
  const statuses = ['all', 'active', 'completed', 'late_clock_in', 'early_clock_out', 'absent', 'break']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'late_clock_in':
        return 'bg-yellow-100 text-yellow-800'
      case 'early_clock_out':
        return 'bg-orange-100 text-orange-800'
      case 'absent':
        return 'bg-red-100 text-red-800'
      case 'break':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'late_clock_in':
        return <AlertCircle className="w-4 h-4" />
      case 'early_clock_out':
        return <AlertCircle className="w-4 h-4" />
      case 'absent':
        return <Square className="w-4 h-4" />
      case 'break':
        return <Pause className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredEntries = timeEntries.filter(entry => {
    const matchesSearch = entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || entry.department === departmentFilter
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const stats = {
    totalEmployees: timeEntries.length,
    activeNow: timeEntries.filter(e => e.status === 'active').length,
    completedToday: timeEntries.filter(e => e.status === 'completed').length,
    totalHoursToday: timeEntries.reduce((sum, e) => sum + e.totalHours, 0),
    overtimeHours: timeEntries.reduce((sum, e) => sum + e.overtimeHours, 0),
    lateArrivals: timeEntries.filter(e => e.status === 'late_clock_in').length,
    absentToday: timeEntries.filter(e => e.status === 'absent').length,
    remoteWorkers: timeEntries.filter(e => e.isRemote).length
  }

  const projectHours = [
    { project: 'E-Commerce Platform', hours: 25.5, employees: 8 },
    { project: 'Mobile App', hours: 18.0, employees: 5 },
    { project: 'Data Analytics', hours: 12.5, employees: 3 },
    { project: 'HR Operations', hours: 15.0, employees: 4 },
    { project: 'Marketing Campaign', hours: 10.0, employees: 3 }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Time Tracking Administration</h1>
            <p className="text-gray-600">Monitor and manage employee time tracking across the organization</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <BarChart3 className="w-4 h-4" />
              Time Reports
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Play className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.activeNow}</div>
                <div className="text-sm text-gray-600">Currently Active</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalHoursToday.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Total Hours Today</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.lateArrivals}</div>
                <div className="text-sm text-gray-600">Late Arrivals</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.remoteWorkers}</div>
                <div className="text-sm text-gray-600">Remote Workers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{stats.completedToday}</div>
              <div className="text-sm text-gray-600">Completed Shifts</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">{stats.overtimeHours.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Overtime Hours</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{stats.absentToday}</div>
              <div className="text-sm text-gray-600">Absent Today</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{((stats.completedToday / stats.totalEmployees) * 100).toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Attendance Rate</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Project Hours Breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Hours Today</h2>
              <div className="space-y-3">
                {projectHours.map((project, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 text-sm">{project.project}</h3>
                      <span className="text-sm font-semibold text-gray-900">{project.hours}h</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>{project.employees} employees</span>
                      <span>{(project.hours / project.employees).toFixed(1)}h avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-primary-600 h-1.5 rounded-full"
                        style={{ width: `${(project.hours / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Time Summary</h2>
              <div className="space-y-4">
                {departments.slice(1).map((dept) => {
                  const deptEntries = timeEntries.filter(entry => entry.department === dept)
                  const deptHours = deptEntries.reduce((sum, entry) => sum + entry.totalHours, 0)
                  const deptActive = deptEntries.filter(entry => entry.status === 'active').length
                  const deptCompleted = deptEntries.filter(entry => entry.status === 'completed').length
                  
                  return (
                    <div key={dept} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-900">{dept}</h3>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{deptHours.toFixed(1)}h</div>
                          <div className="text-sm text-gray-500">{deptEntries.length} employees</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-green-600">{deptActive}</div>
                          <div className="text-gray-500">Active</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-blue-600">{deptCompleted}</div>
                          <div className="text-gray-500">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-600">{deptEntries.length > 0 ? (deptHours / deptEntries.length).toFixed(1) : '0.0'}h</div>
                          <div className="text-gray-500">Avg Hours</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-0 focus:ring-0 p-0 text-sm placeholder-gray-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
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
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Time Entries Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Clock In/Out</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Break</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Hours</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Project</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{entry.employeeName}</div>
                          <div className="text-sm text-gray-500">{entry.position}</div>
                          <div className="text-sm text-gray-500">{entry.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(entry.status)}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                          {entry.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      {entry.isRemote && (
                        <div className="text-xs text-purple-600 mt-1">Remote</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900">
                          In: {entry.clockIn || 'Not clocked in'}
                        </div>
                        <div className="text-gray-500">
                          Out: {entry.clockOut || 'Not clocked out'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {entry.breakStart && entry.breakEnd ? (
                          <>
                            <div className="text-gray-900">{entry.breakStart} - {entry.breakEnd}</div>
                            <div className="text-gray-500">
                              {((new Date(`2024-01-01T${entry.breakEnd}`) - new Date(`2024-01-01T${entry.breakStart}`)) / (1000 * 60)).toFixed(0)} min
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-400">No break</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{entry.totalHours.toFixed(1)}h total</div>
                        <div className="text-gray-500">{entry.regularHours.toFixed(1)}h regular</div>
                        {entry.overtimeHours > 0 && (
                          <div className="text-orange-600">{entry.overtimeHours.toFixed(1)}h overtime</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <MapPin className="w-4 h-4" />
                        {entry.location || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{entry.project || 'No project'}</div>
                        {entry.notes && (
                          <div className="text-gray-500 text-xs mt-1">{entry.notes}</div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No time entries found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminTimeTrackingPage
