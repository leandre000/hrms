import React from 'react'
import { DollarSign, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'

const PayrollAuditPage = () => {
  const payrollAudits = [
    { period: '2024-01', status: 'Complete', discrepancies: 0, totalAmount: 425000, employees: 45 },
    { period: '2023-12', status: 'Complete', discrepancies: 2, totalAmount: 418000, employees: 42 },
    { period: '2023-11', status: 'Under Review', discrepancies: 1, totalAmount: 415000, employees: 42 }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Payroll Audit</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {payrollAudits.map((audit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{audit.period}</h3>
                {audit.discrepancies === 0 ? 
                  <CheckCircle className="w-5 h-5 text-green-500" /> :
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                }
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={audit.status === 'Complete' ? 'text-green-600' : 'text-yellow-600'}>
                    {audit.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-medium">${audit.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Employees:</span>
                  <span>{audit.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discrepancies:</span>
                  <span className={audit.discrepancies === 0 ? 'text-green-600' : 'text-red-600'}>
                    {audit.discrepancies}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PayrollAuditPage
