import React from 'react'
import { AlertTriangle, DollarSign, User } from 'lucide-react'

const SalaryDiscrepanciesPage = () => {
  const discrepancies = [
    {
      id: 1,
      employee: 'John Doe',
      position: 'Senior Developer',
      currentSalary: 95000,
      marketRate: 105000,
      discrepancy: -10000,
      risk: 'High'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      position: 'Marketing Manager',
      currentSalary: 78000,
      marketRate: 75000,
      discrepancy: 3000,
      risk: 'Low'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Salary Discrepancies</h1>
        <div className="space-y-4">
          {discrepancies.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.employee}</h3>
                    <p className="text-sm text-gray-600">{item.position}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.risk === 'High' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {item.risk} Risk
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Current Salary:</span>
                  <div className="font-medium">${item.currentSalary.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Market Rate:</span>
                  <div className="font-medium">${item.marketRate.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Discrepancy:</span>
                  <div className={`font-medium ${item.discrepancy < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ${Math.abs(item.discrepancy).toLocaleString()} {item.discrepancy < 0 ? 'under' : 'over'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Variance:</span>
                  <div className="font-medium">{((item.discrepancy / item.marketRate) * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SalaryDiscrepanciesPage
