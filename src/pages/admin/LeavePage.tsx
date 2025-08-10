import React, { useState } from 'react'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Users, Filter, Search, Plus, Eye, Edit, Download, BarChart3 } from 'lucide-react'

const AdminLeavePage = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [view, setView] = useState<'requests' | 'calendar' | 'balances'>('requests')

  const leaveRequests = [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      leaveType: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-19',
      days: 5,
      status: 'pending',
      appliedDate: '2024-01-20',
      reason: 'Family vacation',
      approver: 'Sarah Wilson',
      priority: 'normal',
      notes: 'Project handover completed',
      currentBalance: 15,
      remainingAfter: 10
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Wilson',
      department: 'Engineering',
      position: 'Engineering Manager',
      leaveType: 'Sick Leave',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      status: 'approved',
      appliedDate: '2024-01-24',
      reason: 'Medical appointment',
      approver: 'Michael Chen',
      priority: 'urgent',
      notes: 'Doctor recommended rest',
      currentBalance: 8,
      remainingAfter: 6
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Michael Chen',
      department: 'Engineering',
      position: 'Principal Engineer',
      leaveType: 'Personal Leave',
      startDate: '2024-02-01',
      endDate: '2024-02-02',
      days: 2,
      status: 'rejected',
      appliedDate: '2024-01-18',
      reason: 'Personal matters',
      approver: 'Lisa Rodriguez',
      priority: 'normal',
      notes: 'Critical project deadline conflict',
      currentBalance: 3,
      remainingAfter: 3
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Lisa Rodriguez',
      department: 'Human Resources',
      position: 'VP of People',
      leaveType: 'Maternity Leave',
      startDate: '2024-03-01',
      endDate: '2024-05-30',
      days: 90,
      status: 'approved',
      appliedDate: '2024-01-10',
      reason: 'Maternity leave',
      approver: 'CEO',
      priority: 'high',
      notes: 'Coverage plan in place',
      currentBalance: 90,
      remainingAfter: 0
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'Alex Thompson',
      department: 'Engineering',
      position: 'Junior Developer',
      leaveType: 'Annual Leave',
      startDate: '2024-01-29',
      endDate: '2024-01-29',
      days: 1,
      status: 'pending',
      appliedDate: '2024-01-22',
      reason: 'Personal appointment',
      approver: 'Sarah Wilson',
      priority: 'normal',
      notes: 'Half day leave',
      currentBalance: 12,
      remainingAfter: 11
    }
  ]

  const leaveTypes = ['all', 'Annual Leave', 'Sick Leave', 'Personal Leave', 'Maternity Leave', 'Paternity Leave', 'Emergency Leave']
  const statuses = ['all', 'pending', 'approved', 'rejected', 'cancelled']
  const departments = ['all', 'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'normal':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    const matchesType = typeFilter === 'all' || request.leaveType === typeFilter
    const matchesDepartment = departmentFilter === 'all' || request.department === departmentFilter
    return matchesSearch && matchesStatus && matchesType && matchesDepartment
  })

  const stats = {
    totalRequests: leaveRequests.length,
    pendingRequests: leaveRequests.filter(r => r.status === 'pending').length,
    approvedRequests: leaveRequests.filter(r => r.status === 'approved').length,
    rejectedRequests: leaveRequests.filter(r => r.status === 'rejected').length,
    totalDaysRequested: leaveRequests.reduce((sum, r) => sum + r.days, 0),
    averageDaysPerRequest: Math.round(leaveRequests.reduce((sum, r) => sum + r.days, 0) / leaveRequests.length),
    urgentRequests: leaveRequests.filter(r => r.priority === 'urgent' && r.status === 'pending').length
  }

  const leaveBalances = [
    { employeeId: 'EMP001', name: 'John Doe', department: 'Engineering', annualLeave: 15, sickLeave: 8, personalLeave: 3, usedAnnual: 5, usedSick: 2, usedPersonal: 1 },
    { employeeId: 'EMP002', name: 'Sarah Wilson', department: 'Engineering', annualLeave: 20, sickLeave: 10, personalLeave: 5, usedAnnual: 8, usedSick: 4, usedPersonal: 2 },
    { employeeId: 'EMP003', name: 'Michael Chen', department: 'Engineering', annualLeave: 22, sickLeave: 12, personalLeave: 6, usedAnnual: 12, usedSick: 3, usedPersonal: 3 },
    { employeeId: 'EMP004', name: 'Lisa Rodriguez', department: 'Human Resources', annualLeave: 25, sickLeave: 15, personalLeave: 8, usedAnnual: 10, usedSick: 5, usedPersonal: 2 },
    { employeeId: 'EMP005', name: 'Alex Thompson', department: 'Engineering', annualLeave: 12, sickLeave: 6, personalLeave: 2, usedAnnual: 0, usedSick: 0, usedPersonal: 0 }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-gray-600">Manage employee leave requests and balances</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('requests')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'requests' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Requests
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setView('balances')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'balances' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Balances
              </button>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <BarChart3 className="w-4 h-4" />
              Leave Report
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</div>
                <div className="text-sm text-gray-600">Pending Requests</div>
              </div>
            </div>
            {stats.urgentRequests > 0 && (
              <div className="mt-2 text-sm text-red-600">
                {stats.urgentRequests} urgent
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.approvedRequests}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {((stats.approvedRequests / stats.totalRequests) * 100).toFixed(0)}% approval rate
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalDaysRequested}</div>
                <div className="text-sm text-gray-600">Total Days Requested</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              {stats.averageDaysPerRequest} days avg/request
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.rejectedRequests}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-red-600">
              {((stats.rejectedRequests / stats.totalRequests) * 100).toFixed(0)}% rejection rate
            </div>
          </div>
        </div>

        {view === 'requests' && (
          <>
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search leave requests..."
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
                        {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {leaveTypes.map((type) => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
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
                </div>
              </div>
            </div>

            {/* Leave Requests Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Leave Type</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Dates</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Duration</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Reason</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Approver</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{request.employeeName}</div>
                              <div className="text-sm text-gray-500">{request.position}</div>
                              <div className="text-sm text-gray-500">{request.department}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{request.leaveType}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                              {request.priority.toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">
                            {new Date(request.startDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            to {new Date(request.endDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{request.days} day{request.days > 1 ? 's' : ''}</div>
                          <div className="text-sm text-gray-500">
                            Balance: {request.remainingAfter}/{request.currentBalance}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Applied: {new Date(request.appliedDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 max-w-xs truncate">{request.reason}</div>
                          {request.notes && (
                            <div className="text-sm text-gray-500 max-w-xs truncate">{request.notes}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{request.approver}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                              <Eye className="w-4 h-4" />
                            </button>
                            {request.status === 'pending' && (
                              <>
                                <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Approve">
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Reject">
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
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
        )}

        {view === 'balances' && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Employee Leave Balances</h2>
              <p className="text-sm text-gray-600">Current leave balances and usage for all employees</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Annual Leave</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Sick Leave</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Personal Leave</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Total Used</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Total Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaveBalances.map((balance, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{balance.name}</div>
                            <div className="text-sm text-gray-500">{balance.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{balance.annualLeave - balance.usedAnnual}/{balance.annualLeave}</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${((balance.annualLeave - balance.usedAnnual) / balance.annualLeave) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Used: {balance.usedAnnual}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{balance.sickLeave - balance.usedSick}/{balance.sickLeave}</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${((balance.sickLeave - balance.usedSick) / balance.sickLeave) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Used: {balance.usedSick}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{balance.personalLeave - balance.usedPersonal}/{balance.personalLeave}</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${((balance.personalLeave - balance.usedPersonal) / balance.personalLeave) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Used: {balance.usedPersonal}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-red-600">
                          {balance.usedAnnual + balance.usedSick + balance.usedPersonal} days
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-green-600">
                          {(balance.annualLeave - balance.usedAnnual) + (balance.sickLeave - balance.usedSick) + (balance.personalLeave - balance.usedPersonal)} days
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'calendar' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRequests.filter(r => r.status === 'approved').map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900">{request.employeeName}</h3>
                    <span className="text-sm text-gray-500">{request.days} days</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-600">{request.leaveType}</div>
                    <div className="text-gray-900">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </div>
                    <div className="text-gray-600">{request.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredRequests.length === 0 && view === 'requests' && (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminLeavePage
