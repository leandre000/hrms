import React from 'react'
import { FileText, Calendar, CheckCircle, AlertTriangle } from 'lucide-react'

const TaxCompliancePage = () => {
  const taxCompliance = [
    {
      type: 'Federal Income Tax',
      quarter: 'Q4 2023',
      status: 'Filed',
      dueDate: '2024-01-31',
      filedDate: '2024-01-25',
      amount: 125000
    },
    {
      type: 'State Tax',
      quarter: 'Q4 2023',
      status: 'Pending',
      dueDate: '2024-02-15',
      filedDate: null,
      amount: 35000
    },
    {
      type: 'Payroll Tax',
      quarter: 'Q4 2023',
      status: 'Filed',
      dueDate: '2024-01-31',
      filedDate: '2024-01-30',
      amount: 85000
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tax Compliance</h1>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Tax Type</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Period</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Due Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {taxCompliance.map((tax, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-gray-900">{tax.type}</td>
                  <td className="px-6 py-4 text-gray-900">{tax.quarter}</td>
                  <td className="px-6 py-4 text-gray-900">{new Date(tax.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {tax.status === 'Filed' ? 
                        <CheckCircle className="w-4 h-4 text-green-500" /> :
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      }
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tax.status === 'Filed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tax.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">${tax.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TaxCompliancePage