import React, { useState } from 'react'
import { DollarSign, Calendar, Users, TrendingUp, Download, FileText, Calculator, AlertCircle } from 'lucide-react'

const PayrollPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01')

  const payrollStats = {
    totalPayroll: 850000,
    employeesProcessed: 45,
    averageSalary: 85000,
    totalBenefits: 125000,
    taxesWithheld: 195000,
    netPay: 680000
  }

  const payrollPeriods = [
    {
      id: '2024-01',
      period: 'January 2024',
      status: 'processed',
      totalAmount: 850000,
      employeeCount: 45,
      processDate: '2024-01-31',
      dueDate: '2024-02-01'
    },
    {
      id: '2023-12',
      period: 'December 2023',
      status: 'processed',
      totalAmount: 920000,
      employeeCount: 44,
      processDate: '2023-12-31',
      dueDate: '2024-01-02'
    },
    {
      id: '2024-02',
      period: 'February 2024',
      status: 'pending',
      totalAmount: 0,
      employeeCount: 45,
      processDate: null,
      dueDate: '2024-03-01'
    }
  ]

  const departmentPayroll = [
    { department: 'Engineering', employees: 25, totalCost: 450000, avgSalary: 105000 },
    { department: 'Sales', employees: 12, totalCost: 180000, avgSalary: 85000 },
    { department: 'Marketing', employees: 8, totalCost: 120000, avgSalary: 68000 },
    { department: 'HR', employees: 5, totalCost: 100000, avgSalary: 75000 }
  ]

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Overview</h1>
            <p className="text-gray-600">Manage payroll processing and employee compensation</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Calculator className="w-4 h-4" />
              Process Payroll
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Alert for upcoming payroll */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Upcoming Payroll Processing</h3>
              <p className="text-sm text-yellow-700">
                February 2024 payroll is due for processing on March 1st, 2024. Please review and approve all timesheets.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(payrollStats.totalPayroll / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Monthly Payroll</div>
              </div>
            </div>
            <div className="text-sm text-green-600">+5.2% from last month</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{payrollStats.employeesProcessed}</div>
                <div className="text-sm text-gray-600">Employees Processed</div>
              </div>
            </div>
            <div className="text-sm text-blue-600">All employees current</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(payrollStats.averageSalary / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Average Salary</div>
              </div>
            </div>
            <div className="text-sm text-purple-600">Industry competitive</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payroll Periods */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payroll Periods</h2>
            <div className="space-y-3">
              {payrollPeriods.map((period) => (
                <div key={period.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{period.period}</h3>
                      <p className="text-sm text-gray-600">{period.employeeCount} employees</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      period.status === 'processed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {period.status.charAt(0).toUpperCase() + period.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold text-gray-900">
                      ${period.totalAmount > 0 ? (period.totalAmount / 1000).toFixed(0) + 'K' : 'TBD'}
                    </div>
                    {period.status === 'processed' && (
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Payroll Breakdown</h2>
            <div className="space-y-4">
              {departmentPayroll.map((dept, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{dept.department}</h3>
                    <span className="text-lg font-semibold text-gray-900">
                      ${(dept.totalCost / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{dept.employees} employees</span>
                    <span>Avg: ${(dept.avgSalary / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(dept.totalCost / 450000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payroll Details */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payroll Breakdown - January 2024</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${(payrollStats.totalPayroll / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Gross Payroll</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${(payrollStats.totalBenefits / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Benefits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">${(payrollStats.taxesWithheld / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Taxes Withheld</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">${(payrollStats.netPay / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Net Pay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayrollPage
