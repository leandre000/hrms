import React, { useState } from 'react'
import { Calendar, Users, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-25')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  const attendanceData = [
    {
      id: 'ATT001',
      employee: 'John Doe',
      department: 'Engineering',
      date: '2024-01-25',
      status: 'Present',
      clockIn: '09:00 AM',
      clockOut: '05:30 PM',
      hoursWorked: 7.5,
      lateMinutes: 0,
      notes: ''
    },
    {
      id: 'ATT002',
      employee: 'Jane Smith',
      department: 'Marketing',
      date: '2024-01-25',
      status: 'Present',
      clockIn: '08:45 AM',
      clockOut: '05:15 PM',
      hoursWorked: 8,
      lateMinutes: 0,
      notes: ''
    },
    {
      id: 'ATT003',
      employee: 'Mike Johnson',
      department: 'Sales',
      date: '2024-01-25',
      status: 'Late',
      clockIn: '09:30 AM',
      clockOut: '05:30 PM',
      hoursWorked: 7.5,
      lateMinutes: 30,
      notes: 'Traffic delay'
    },
    {
      id: 'ATT004',
      employee: 'Sarah Wilson',
      department: 'Engineering',
      date: '2024-01-25',
      status: 'Absent',
      clockIn: null,
      clockOut: null,
      hoursWorked: 0,
      lateMinutes: 0,
      notes: 'Sick leave'
    },
    {
      id: 'ATT005',
      employee: 'David Brown',
      department: 'Design',
      date: '2024-01-25',
      status: 'Half Day',
      clockIn: '09:00 AM',
      clockOut: '01:00 PM',
      hoursWorked: 4,
      lateMinutes: 0,
      notes: 'Personal appointment'
    }
  ]

  const attendanceStats = {
    totalEmployees: 142,
    present: 118,
    absent: 12,
    late: 8,
    halfDay: 4,
    attendanceRate: 89.4
  }

  const departmentStats = [
    { department: 'Engineering', present: 42, total: 45, rate: 93.3 },
    { department: 'Sales', present: 28, total: 32, rate: 87.5 },
    { department: 'Marketing', present: 16, total: 18, rate: 88.9 },
    { department: 'HR', present: 11, total: 12, rate: 91.7 },
    { department: 'Finance', present: 14, total: 15, rate: 93.3 },
    { department: 'Operations', present: 19, total: 20, rate: 95.0 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Absent': return <XCircle className="w-4 h-4 text-red-500" />
      case 'Late': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'Half Day': return <Clock className="w-4 h-4 text-blue-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800'
      case 'Absent': return 'bg-red-100 text-red-800'
      case 'Late': return 'bg-yellow-100 text-yellow-800'
      case 'Half Day': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredData = attendanceData.filter(record => 
    departmentFilter === 'all' || record.department === departmentFilter
  )

  const departments = ['all', ...new Set(attendanceData.map(record => record.department))]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Track daily attendance and monitor patterns</p>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-gray-900">Total</h3>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {attendanceStats.totalEmployees}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Present</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {attendanceStats.present}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-gray-900">Absent</h3>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {attendanceStats.absent}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h3 className="font-medium text-gray-900">Late</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {attendanceStats.late}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">Half Day</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {attendanceStats.halfDay}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium text-gray-900">Rate</h3>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {attendanceStats.attendanceRate}%
            </div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{dept.department}</h3>
                  <span className="text-sm font-medium text-gray-600">{dept.rate}%</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Present: {dept.present}</span>
                  <span>Total: {dept.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${dept.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Clock In</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Clock Out</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Hours</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Late (min)</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{record.employee}</div>
                        <div className="text-sm text-gray-500">{record.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {record.clockIn || <span className="text-gray-400">--</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {record.clockOut || <span className="text-gray-400">--</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {record.hoursWorked > 0 ? `${record.hoursWorked}h` : '--'}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {record.lateMinutes > 0 ? (
                        <span className="text-red-600 font-medium">{record.lateMinutes}</span>
                      ) : (
                        <span className="text-gray-400">--</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{record.notes || '--'}</td>
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

export default AttendancePage
