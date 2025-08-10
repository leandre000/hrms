import React, { useState } from 'react'
import { Users, Calendar, CheckCircle, XCircle, Clock, AlertTriangle, Search, Filter, Download, BarChart3, TrendingUp, TrendingDown, Eye } from 'lucide-react'

const AdminAttendancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [view, setView] = useState<'calendar' | 'summary'>('summary')

  const attendanceData = [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      workingDays: 22,
      presentDays: 20,
      absentDays: 2,
      lateDays: 3,
      halfDays: 1,
      attendanceRate: 90.9,
      punctualityRate: 85.0,
      totalHours: 168,
      averageHours: 8.4,
      status: 'good'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Wilson',
      department: 'Engineering',
      position: 'Engineering Manager',
      workingDays: 22,
      presentDays: 22,
      absentDays: 0,
      lateDays: 1,
      halfDays: 0,
      attendanceRate: 100,
      punctualityRate: 95.5,
      totalHours: 185,
      averageHours: 8.4,
      status: 'excellent'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Michael Chen',
      department: 'Engineering',
      position: 'Principal Engineer',
      workingDays: 22,
      presentDays: 19,
      absentDays: 3,
      lateDays: 2,
      halfDays: 0,
      attendanceRate: 86.4,
      punctualityRate: 89.5,
      totalHours: 162,
      averageHours: 8.5,
      status: 'average'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Lisa Rodriguez',
      department: 'Human Resources',
      position: 'VP of People',
      workingDays: 22,
      presentDays: 21,
      absentDays: 1,
      lateDays: 0,
      halfDays: 0,
      attendanceRate: 95.5,
      punctualityRate: 100,
      totalHours: 175,
      averageHours: 8.3,
      status: 'excellent'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'Alex Thompson',
      department: 'Engineering',
      position: 'Junior Developer',
      workingDays: 22,
      presentDays: 18,
      absentDays: 4,
      lateDays: 5,
      halfDays: 2,
      attendanceRate: 81.8,
      punctualityRate: 72.2,
      totalHours: 148,
      averageHours: 8.2,
      status: 'needs_attention'
    },
    {
      id: 6,
      employeeId: 'EMP006',
      employeeName: 'Emily Davis',
      department: 'Marketing',
      position: 'Marketing Manager',
      workingDays: 22,
      presentDays: 16,
      absentDays: 6,
      lateDays: 2,
      halfDays: 1,
      attendanceRate: 72.7,
      punctualityRate: 87.5,
      totalHours: 132,
      averageHours: 8.3,
      status: 'poor'
    }
  ]

  const departments = ['all', 'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance']
  const statuses = ['all', 'excellent', 'good', 'average', 'needs_attention', 'poor']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800'
      case 'good':
        return 'bg-blue-100 text-blue-800'
      case 'average':
        return 'bg-yellow-100 text-yellow-800'
      case 'needs_attention':
        return 'bg-orange-100 text-orange-800'
      case 'poor':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4" />
      case 'good':
        return <TrendingUp className="w-4 h-4" />
      case 'average':
        return <Clock className="w-4 h-4" />
      case 'needs_attention':
        return <AlertTriangle className="w-4 h-4" />
      case 'poor':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredData = attendanceData.filter(employee => {
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter
    return matchesDepartment && matchesStatus
  })

  const stats = {
    totalEmployees: attendanceData.length,
    averageAttendance: Math.round(attendanceData.reduce((sum, emp) => sum + emp.attendanceRate, 0) / attendanceData.length),
    perfectAttendance: attendanceData.filter(emp => emp.attendanceRate === 100).length,
    needsAttention: attendanceData.filter(emp => emp.status === 'needs_attention' || emp.status === 'poor').length,
    totalAbsentDays: attendanceData.reduce((sum, emp) => sum + emp.absentDays, 0),
    totalLateDays: attendanceData.reduce((sum, emp) => sum + emp.lateDays, 0),
    averagePunctuality: Math.round(attendanceData.reduce((sum, emp) => sum + emp.punctualityRate, 0) / attendanceData.length),
    totalHours: attendanceData.reduce((sum, emp) => sum + emp.totalHours, 0)
  }

  const attendanceTrends = [
    { month: 'Sep', rate: 88 },
    { month: 'Oct', rate: 91 },
    { month: 'Nov', rate: 87 },
    { month: 'Dec', rate: 85 },
    { month: 'Jan', rate: stats.averageAttendance }
  ]

  // Mock calendar data for the current month
  const calendarData = [
    { date: '2024-01-01', present: 28, absent: 5, late: 2, total: 33 },
    { date: '2024-01-02', present: 30, absent: 2, late: 1, total: 33 },
    { date: '2024-01-03', present: 29, absent: 3, late: 1, total: 33 },
    { date: '2024-01-04', present: 31, absent: 1, late: 1, total: 33 },
    { date: '2024-01-05', present: 28, absent: 4, late: 1, total: 33 }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600">Monitor and analyze employee attendance patterns</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('summary')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'summary' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Calendar
              </button>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <BarChart3 className="w-4 h-4" />
              Generate Report
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.averageAttendance}%</div>
                <div className="text-sm text-gray-600">Average Attendance</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              {stats.averageAttendance > 90 ? '↗ Above target' : '↘ Below target'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.perfectAttendance}</div>
                <div className="text-sm text-gray-600">Perfect Attendance</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {((stats.perfectAttendance / stats.totalEmployees) * 100).toFixed(0)}% of workforce
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.needsAttention}</div>
                <div className="text-sm text-gray-600">Needs Attention</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-red-600">
              Attendance below 85%
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.averagePunctuality}%</div>
                <div className="text-sm text-gray-600">Punctuality Rate</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">
              {stats.totalLateDays} late arrivals this month
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{stats.totalAbsentDays}</div>
              <div className="text-sm text-gray-600">Total Absent Days</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{stats.totalLateDays}</div>
              <div className="text-sm text-gray-600">Late Arrivals</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{stats.totalHours}</div>
              <div className="text-sm text-gray-600">Total Hours Worked</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{(stats.totalHours / stats.totalEmployees).toFixed(1)}</div>
              <div className="text-sm text-gray-600">Average Hours/Employee</div>
            </div>
          </div>
        </div>

        {view === 'summary' ? (
          <>
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="2024-01">January 2024</option>
                  <option value="2023-12">December 2023</option>
                  <option value="2023-11">November 2023</option>
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
              </div>
            </div>

            {/* Attendance Summary Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Attendance Rate</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Present/Working Days</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Absent Days</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Late Days</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Total Hours</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{employee.employeeName}</div>
                              <div className="text-sm text-gray-500">{employee.position}</div>
                              <div className="text-sm text-gray-500">{employee.department}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-semibold text-gray-900">{employee.attendanceRate.toFixed(1)}%</div>
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className={`h-2 rounded-full ${
                                employee.attendanceRate >= 95 ? 'bg-green-500' :
                                employee.attendanceRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${employee.attendanceRate}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{employee.presentDays}/{employee.workingDays}</div>
                          <div className="text-sm text-gray-500">
                            {employee.halfDays > 0 && `${employee.halfDays} half days`}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-medium text-red-600">{employee.absentDays}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-medium text-yellow-600">{employee.lateDays}</div>
                          <div className="text-sm text-gray-500">
                            {employee.punctualityRate.toFixed(1)}% punctuality
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{employee.totalHours}h</div>
                          <div className="text-sm text-gray-500">
                            {employee.averageHours.toFixed(1)}h avg/day
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(employee.status)}
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                              {employee.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Send Reminder">
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Calendar View */
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Attendance Calendar - {selectedMonth}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {calendarData.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {((day.present / day.total) * 100).toFixed(0)}% present
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        Present
                      </span>
                      <span className="font-medium">{day.present}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        Absent
                      </span>
                      <span className="font-medium">{day.absent}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        Late
                      </span>
                      <span className="font-medium">{day.late}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(day.present / day.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance data found</h3>
            <p>Try adjusting your filters or date range.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminAttendancePage
