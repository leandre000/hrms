import React, { useState } from 'react'
import { Clock, DollarSign, TrendingUp, AlertTriangle, Users, Calendar, CheckCircle, XCircle, Eye, Edit, Search, Filter, Download, BarChart3 } from 'lucide-react'

const AdminOvertimePage = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('month')
  const [searchTerm, setSearchTerm] = useState('')

  const overtimeData = [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      date: '2024-01-24',
      regularHours: 8,
      overtimeHours: 2.5,
      totalHours: 10.5,
      hourlyRate: 45,
      overtimeRate: 67.5,
      overtimePay: 168.75,
      status: 'approved',
      approver: 'Sarah Wilson',
      reason: 'Critical bug fix before release',
      project: 'E-Commerce Platform',
      submittedDate: '2024-01-25',
      weeklyOvertime: 8.5,
      monthlyOvertime: 24.5
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Wilson',
      department: 'Engineering',
      position: 'Engineering Manager',
      date: '2024-01-23',
      regularHours: 8,
      overtimeHours: 1.5,
      totalHours: 9.5,
      hourlyRate: 58,
      overtimeRate: 87,
      overtimePay: 130.5,
      status: 'pending',
      approver: 'Michael Chen',
      reason: 'Team support and sprint planning',
      project: 'Team Management',
      submittedDate: '2024-01-24',
      weeklyOvertime: 6.5,
      monthlyOvertime: 18.5
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Michael Chen',
      department: 'Engineering',
      position: 'Principal Engineer',
      date: '2024-01-22',
      regularHours: 8,
      overtimeHours: 3,
      totalHours: 11,
      hourlyRate: 67,
      overtimeRate: 100.5,
      overtimePay: 301.5,
      status: 'approved',
      approver: 'Lisa Rodriguez',
      reason: 'Architecture review and documentation',
      project: 'System Architecture',
      submittedDate: '2024-01-23',
      weeklyOvertime: 12,
      monthlyOvertime: 35
    },
    {
      id: 4,
      employeeId: 'EMP005',
      employeeName: 'Alex Thompson',
      department: 'Engineering',
      position: 'Junior Developer',
      date: '2024-01-24',
      regularHours: 8,
      overtimeHours: 1,
      totalHours: 9,
      hourlyRate: 33,
      overtimeRate: 49.5,
      overtimePay: 49.5,
      status: 'rejected',
      approver: 'Sarah Wilson',
      reason: 'Learning new framework',
      project: 'Training',
      submittedDate: '2024-01-25',
      weeklyOvertime: 1,
      monthlyOvertime: 4,
      rejectionReason: 'Training time should not be counted as overtime'
    },
    {
      id: 5,
      employeeId: 'EMP006',
      employeeName: 'Emily Davis',
      department: 'Marketing',
      position: 'Marketing Manager',
      date: '2024-01-23',
      regularHours: 8,
      overtimeHours: 2,
      totalHours: 10,
      hourlyRate: 40,
      overtimeRate: 60,
      overtimePay: 120,
      status: 'pending',
      approver: 'Lisa Rodriguez',
      reason: 'Campaign launch preparation',
      project: 'Q1 Marketing Campaign',
      submittedDate: '2024-01-24',
      weeklyOvertime: 5,
      monthlyOvertime: 15
    }
  ]

  const departments = ['all', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Human Resources']
  const statuses = ['all', 'pending', 'approved', 'rejected']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredData = overtimeData.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const stats = {
    totalOvertimeHours: overtimeData.reduce((sum, record) => sum + record.overtimeHours, 0),
    totalOvertimePay: overtimeData.reduce((sum, record) => sum + record.overtimePay, 0),
    pendingApprovals: overtimeData.filter(record => record.status === 'pending').length,
    averageOvertimePerEmployee: Math.round((overtimeData.reduce((sum, record) => sum + record.overtimeHours, 0) / new Set(overtimeData.map(r => r.employeeId)).size) * 10) / 10,
    highOvertimeEmployees: new Set(overtimeData.filter(record => record.monthlyOvertime > 30).map(r => r.employeeId)).size,
    approvalRate: Math.round((overtimeData.filter(record => record.status === 'approved').length / overtimeData.length) * 100)
  }

  const departmentOvertimeStats = departments.slice(1).map(dept => {
    const deptRecords = overtimeData.filter(record => record.department === dept)
    const totalHours = deptRecords.reduce((sum, record) => sum + record.overtimeHours, 0)
    const totalPay = deptRecords.reduce((sum, record) => sum + record.overtimePay, 0)
    const employeeCount = new Set(deptRecords.map(r => r.employeeId)).size
    return {
      department: dept,
      totalHours,
      totalPay,
      employeeCount,
      averageHours: employeeCount > 0 ? Math.round((totalHours / employeeCount) * 10) / 10 : 0
    }
  })

  const overtimeTrends = [
    { week: 'Week 1', hours: 12.5, cost: 850 },
    { week: 'Week 2', hours: 18.0, cost: 1200 },
    { week: 'Week 3', hours: 22.5, cost: 1580 },
    { week: 'Week 4', hours: 15.5, cost: 1020 }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Overtime Management</h1>
            <p className="text-gray-600">Monitor and approve employee overtime requests</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <BarChart3 className="w-4 h-4" />
              Overtime Report
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
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalOvertimeHours.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Total Overtime Hours</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              {stats.averageOvertimePerEmployee}h avg/employee
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${stats.totalOvertimePay.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Overtime Pay</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              ${(stats.totalOvertimePay / stats.totalOvertimeHours).toFixed(0)}/hour avg
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</div>
                <div className="text-sm text-gray-600">Pending Approvals</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">
              Require immediate attention
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.highOvertimeEmployees}</div>
                <div className="text-sm text-gray-600">High Overtime (30h+)</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-red-600">
              May need workload review
            </div>
          </div>
        </div>

        {/* Department Overtime Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Overtime Summary</h2>
            <div className="space-y-4">
              {departmentOvertimeStats.map((dept, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{dept.department}</h3>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{dept.totalHours.toFixed(1)}h</div>
                      <div className="text-sm text-gray-500">${dept.totalPay.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{dept.employeeCount} employees</span>
                    <span>Avg: {dept.averageHours}h/employee</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(dept.totalHours / stats.totalOvertimeHours) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Overtime Trends</h2>
            <div className="space-y-4">
              {overtimeTrends.map((week, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{week.week}</h3>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{week.hours}h</div>
                      <div className="text-sm text-gray-500">${week.cost}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(week.hours / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
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
                placeholder="Search overtime records..."
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
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overtime Records Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Hours</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Overtime Pay</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Monthly Total</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Reason</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{record.employeeName}</div>
                          <div className="text-sm text-gray-500">{record.position}</div>
                          <div className="text-sm text-gray-500">{record.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{new Date(record.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">
                        Submitted: {new Date(record.submittedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">
                        <span className="font-medium">{record.overtimeHours}h</span> overtime
                      </div>
                      <div className="text-sm text-gray-500">
                        {record.regularHours}h regular + {record.overtimeHours}h OT = {record.totalHours}h total
                      </div>
                      <div className="text-sm text-gray-500">
                        Weekly: {record.weeklyOvertime}h
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-green-600 text-lg">
                        ${record.overtimePay.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${record.overtimeRate}/hr (1.5x rate)
                      </div>
                      <div className="text-sm text-gray-500">
                        Base: ${record.hourlyRate}/hr
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{record.monthlyOvertime}h</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            record.monthlyOvertime > 40 ? 'bg-red-500' :
                            record.monthlyOvertime > 20 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((record.monthlyOvertime / 50) * 100, 100)}%` }}
                        ></div>
                      </div>
                      {record.monthlyOvertime > 30 && (
                        <div className="text-xs text-red-600 mt-1">High overtime</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(record.status)}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Approver: {record.approver}
                      </div>
                      {record.rejectionReason && (
                        <div className="text-xs text-red-600 mt-1">{record.rejectionReason}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        <div className="font-medium">{record.project}</div>
                        <div className="text-gray-600">{record.reason}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        {record.status === 'pending' && (
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

        {filteredData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No overtime records found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOvertimePage
