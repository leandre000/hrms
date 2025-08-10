import React, { useState } from 'react'
import { Clock, TrendingUp, DollarSign, Calendar, CheckCircle, AlertTriangle } from 'lucide-react'

const OvertimePage = () => {
  const [dateRange, setDateRange] = useState('this-month')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  const overtimeRecords = [
    {
      id: 'OT001',
      employee: 'John Doe',
      department: 'Engineering',
      date: '2024-01-24',
      regularHours: 8,
      overtimeHours: 3,
      rate: 35,
      overtimeRate: 52.5,
      totalPay: 437.5,
      status: 'Approved',
      reason: 'Project deadline',
      approver: 'Sarah Wilson'
    },
    {
      id: 'OT002',
      employee: 'Jane Smith',
      department: 'Marketing',
      date: '2024-01-23',
      regularHours: 8,
      overtimeHours: 2,
      rate: 30,
      overtimeRate: 45,
      totalPay: 330,
      status: 'Pending',
      reason: 'Campaign launch',
      approver: 'Mike Johnson'
    },
    {
      id: 'OT003',
      employee: 'Mike Johnson',
      department: 'Sales',
      date: '2024-01-22',
      regularHours: 8,
      overtimeHours: 4,
      rate: 32,
      overtimeRate: 48,
      totalPay: 448,
      status: 'Approved',
      reason: 'Client presentation',
      approver: 'Sales Director'
    }
  ]

  const overtimeStats = {
    totalHours: 156,
    totalCost: 8940,
    avgHoursPerEmployee: 2.8,
    topDepartment: 'Engineering',
    monthlyIncrease: 12.5
  }

  const departmentOvertimeData = [
    { department: 'Engineering', hours: 65, cost: 3900, employees: 15 },
    { department: 'Sales', hours: 42, cost: 2520, employees: 12 },
    { department: 'Marketing', hours: 28, cost: 1680, employees: 8 },
    { department: 'Operations', hours: 21, cost: 1260, employees: 7 }
  ]

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
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'Rejected': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredRecords = overtimeRecords.filter(record => 
    departmentFilter === 'all' || record.department === departmentFilter
  )

  const departments = ['all', ...new Set(overtimeRecords.map(record => record.department))]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Overtime Management</h1>
          <p className="text-gray-600">Track and manage employee overtime hours and compensation</p>
        </div>

        {/* Overtime Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-gray-900">Total Hours</h3>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {overtimeStats.totalHours}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Total Cost</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${overtimeStats.totalCost.toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">Avg Hours</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {overtimeStats.avgHoursPerEmployee}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium text-gray-900">Top Dept</h3>
            </div>
            <div className="text-lg font-bold text-orange-600">
              {overtimeStats.topDepartment}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium text-gray-900">Monthly ↑</h3>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              +{overtimeStats.monthlyIncrease}%
            </div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Overtime Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departmentOvertimeData.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900">{dept.department}</h3>
                  <span className="text-sm text-gray-600">{dept.employees} employees</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Total Hours</div>
                    <div className="text-lg font-semibold text-primary-600">{dept.hours}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                    <div className="text-lg font-semibold text-green-600">${dept.cost.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Avg per employee: {(dept.hours / dept.employees).toFixed(1)} hours
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
            </select>
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

        {/* Overtime Records */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Overtime Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Regular Hours</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">OT Hours</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">OT Rate</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Total Pay</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{record.employee}</div>
                        <div className="text-sm text-gray-500">{record.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{record.regularHours}h</td>
                    <td className="px-6 py-4 font-medium text-primary-600">{record.overtimeHours}h</td>
                    <td className="px-6 py-4 text-gray-900">${record.overtimeRate}/hr</td>
                    <td className="px-6 py-4 font-medium text-green-600">${record.totalPay}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{record.reason}</td>
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

export default OvertimePage
