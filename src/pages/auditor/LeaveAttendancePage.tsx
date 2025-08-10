import React from 'react'
import { Calendar, Clock, CheckCircle, AlertTriangle, User } from 'lucide-react'

const LeaveAttendancePage = () => {
  const attendanceData = [
    {
      employee: 'John Doe',
      department: 'Engineering',
      attendanceRate: 98.5,
      leaveBalance: 12,
      absentDays: 2,
      status: 'Good',
      issues: []
    },
    {
      employee: 'Sarah Wilson',
      department: 'Marketing',
      attendanceRate: 92.1,
      leaveBalance: 8,
      absentDays: 8,
      status: 'Concerning',
      issues: ['Frequent unplanned absences']
    },
    {
      employee: 'Mike Johnson',
      department: 'Sales',
      attendanceRate: 87.3,
      leaveBalance: 15,
      absentDays: 12,
      status: 'Critical',
      issues: ['Exceeded absence threshold', 'Pattern of Monday absences']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-800'
      case 'Concerning': return 'bg-yellow-100 text-yellow-800'
      case 'Critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Good': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Concerning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'Critical': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Leave & Attendance Audit</h1>
        <div className="space-y-4">
          {attendanceData.map((record, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{record.employee}</h3>
                    <p className="text-sm text-gray-600">{record.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(record.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Attendance Rate:</span>
                  <div className="font-medium text-lg">{record.attendanceRate}%</div>
                </div>
                <div>
                  <span className="text-gray-600">Leave Balance:</span>
                  <div className="font-medium">{record.leaveBalance} days</div>
                </div>
                <div>
                  <span className="text-gray-600">Absent Days (YTD):</span>
                  <div className="font-medium">{record.absentDays} days</div>
                </div>
                <div>
                  <span className="text-gray-600">Last 30 days:</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        record.attendanceRate >= 95 ? 'bg-green-500' :
                        record.attendanceRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${record.attendanceRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {record.issues.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Issues Identified:</h4>
                  <ul className="space-y-1">
                    {record.issues.map((issue, i) => (
                      <li key={i} className="text-sm text-red-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeaveAttendancePage