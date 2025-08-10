import React, { useState } from 'react'
import { DollarSign, Calendar, CheckCircle, Clock, AlertTriangle, Download } from 'lucide-react'

const PayrollPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01')

  const payrollRuns = [
    {
      id: 'PR001',
      period: '2024-01',
      status: 'Completed',
      employeeCount: 142,
      totalAmount: 892500,
      processedDate: '2024-01-31',
      payDate: '2024-02-01',
      deductions: 178500,
      taxes: 267750,
      netPay: 446250
    },
    {
      id: 'PR002',
      period: '2023-12',
      status: 'Completed',
      employeeCount: 138,
      totalAmount: 869000,
      processedDate: '2023-12-29',
      payDate: '2023-12-30',
      deductions: 173800,
      taxes: 260700,
      netPay: 434500
    },
    {
      id: 'PR003',
      period: '2024-02',
      status: 'In Progress',
      employeeCount: 145,
      totalAmount: 0,
      processedDate: null,
      payDate: '2024-03-01',
      deductions: 0,
      taxes: 0,
      netPay: 0
    }
  ]

  const payrollSummary = [
    { label: 'Gross Pay', amount: 892500, color: 'text-blue-600' },
    { label: 'Total Deductions', amount: 178500, color: 'text-red-600' },
    { label: 'Total Taxes', amount: 267750, color: 'text-orange-600' },
    { label: 'Net Pay', amount: 446250, color: 'text-green-600' }
  ]

  const upcomingPayroll = [
    { department: 'Engineering', employees: 45, estimated: 380000 },
    { department: 'Sales', employees: 32, estimated: 280000 },
    { department: 'Marketing', employees: 18, estimated: 150000 },
    { department: 'HR', employees: 12, estimated: 95000 },
    { department: 'Finance', employees: 15, estimated: 125000 },
    { department: 'Operations', employees: 23, estimated: 180000 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'In Progress': return <Clock className="w-5 h-5 text-blue-500" />
      case 'Pending': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      default: return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const currentRun = payrollRuns.find(run => run.period === selectedPeriod)

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Processing</h1>
            <p className="text-gray-600">Manage payroll runs and employee compensation</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Process Payroll
            </button>
          </div>
        </div>

        {/* Period Selection */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-900">Select Period:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {payrollRuns.map(run => (
                <option key={run.period} value={run.period}>
                  {run.period}
                </option>
              ))}
            </select>
          </div>
        </div>

        {currentRun && (
          <>
            {/* Payroll Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {payrollSummary.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <h3 className="font-medium text-gray-900">{item.label}</h3>
                  </div>
                  <div className={`text-2xl font-bold ${item.color}`}>
                    ${item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Payroll Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Payroll Details - {currentRun.period}
                </h2>
                <div className="flex items-center gap-2">
                  {getStatusIcon(currentRun.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentRun.status)}`}>
                    {currentRun.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employee Count:</span>
                    <span className="font-medium">{currentRun.employeeCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Gross Pay:</span>
                    <span className="font-medium">${currentRun.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Deductions:</span>
                    <span className="font-medium text-red-600">${currentRun.deductions.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Taxes:</span>
                    <span className="font-medium text-orange-600">${currentRun.taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Pay:</span>
                    <span className="font-medium text-green-600">${currentRun.netPay.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pay Date:</span>
                    <span className="font-medium">{new Date(currentRun.payDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {currentRun.processedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processed Date:</span>
                      <span className="font-medium">{new Date(currentRun.processedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payroll ID:</span>
                    <span className="font-medium">{currentRun.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Department Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Breakdown (Estimated)</h2>
          <div className="space-y-4">
            {upcomingPayroll.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{dept.department}</h3>
                  <p className="text-sm text-gray-600">{dept.employees} employees</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">${dept.estimated.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Estimated</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayrollPage
