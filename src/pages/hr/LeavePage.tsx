import React, { useState } from 'react'
import { Calendar, Check, X, Clock, AlertCircle, Plus, Filter } from 'lucide-react'

const LeavePage = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const leaveRequests = [
    {
      id: 'LR001',
      employee: 'John Doe',
      department: 'Engineering',
      type: 'Vacation',
      startDate: '2024-02-15',
      endDate: '2024-02-19',
      days: 5,
      status: 'Pending',
      reason: 'Family vacation',
      appliedDate: '2024-01-20',
      approver: 'Sarah Wilson'
    },
    {
      id: 'LR002',
      employee: 'Jane Smith',
      department: 'Marketing',
      type: 'Sick Leave',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      status: 'Approved',
      reason: 'Medical appointment',
      appliedDate: '2024-01-24',
      approver: 'Mike Johnson'
    },
    {
      id: 'LR003',
      employee: 'Mike Johnson',
      department: 'Sales',
      type: 'Personal',
      startDate: '2024-02-01',
      endDate: '2024-02-01',
      days: 1,
      status: 'Rejected',
      reason: 'Personal matter',
      appliedDate: '2024-01-28',
      approver: 'HR Manager'
    }
  ]

  const leaveBalance = [
    {
      employee: 'John Doe',
      vacation: { used: 5, available: 15, total: 20 },
      sick: { used: 2, available: 8, total: 10 },
      personal: { used: 1, available: 4, total: 5 }
    },
    {
      employee: 'Jane Smith',
      vacation: { used: 8, available: 12, total: 20 },
      sick: { used: 3, available: 7, total: 10 },
      personal: { used: 2, available: 3, total: 5 }
    }
  ]

  const leaveStats = {
    totalRequests: 45,
    pending: 12,
    approved: 28,
    rejected: 5,
    averageDays: 3.2
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <Check className="w-4 h-4 text-green-500" />
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'Rejected': return <X className="w-4 h-4 text-red-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Vacation': return 'bg-blue-100 text-blue-800'
      case 'Sick Leave': return 'bg-red-100 text-red-800'
      case 'Personal': return 'bg-purple-100 text-purple-800'
      case 'Maternity': return 'bg-pink-100 text-pink-800'
      case 'Paternity': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRequests = leaveRequests.filter(request => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    const matchesType = typeFilter === 'all' || request.type === typeFilter
    return matchesStatus && matchesType
  })

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-gray-600">Manage employee leave requests and balances</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Leave Request
          </button>
        </div>

        {/* Leave Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-gray-900">Total Requests</h3>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {leaveStats.totalRequests}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <h3 className="font-medium text-gray-900">Pending</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {leaveStats.pending}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Check className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Approved</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {leaveStats.approved}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-gray-900">Rejected</h3>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {leaveStats.rejected}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">Avg Days</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {leaveStats.averageDays}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Types</option>
              <option value="Vacation">Vacation</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal">Personal</option>
              <option value="Maternity">Maternity</option>
              <option value="Paternity">Paternity</option>
            </select>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leave Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Start Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">End Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Days</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Approver</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{request.employee}</div>
                        <div className="text-sm text-gray-500">{request.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(request.type)}`}>
                        {request.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Date(request.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Date(request.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{request.days}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{request.approver}</td>
                    <td className="px-6 py-4">
                      {request.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button className="bg-green-50 text-green-700 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors">
                            Approve
                          </button>
                          <button className="bg-red-50 text-red-700 px-3 py-1 rounded-lg hover:bg-red-100 transition-colors">
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leave Balance Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance Overview</h2>
          <div className="space-y-4">
            {leaveBalance.map((employee, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">{employee.employee}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Vacation</div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used: {employee.vacation.used}</span>
                      <span>Available: {employee.vacation.available}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(employee.vacation.used / employee.vacation.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Sick Leave</div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used: {employee.sick.used}</span>
                      <span>Available: {employee.sick.available}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: `${(employee.sick.used / employee.sick.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Personal</div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used: {employee.personal.used}</span>
                      <span>Available: {employee.personal.available}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-purple-500"
                        style={{ width: `${(employee.personal.used / employee.personal.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeavePage
