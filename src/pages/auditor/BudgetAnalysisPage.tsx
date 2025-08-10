import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'

const BudgetAnalysisPage = () => {
  const budgetData = [
    {
      department: 'Engineering',
      budgeted: 500000,
      actual: 485000,
      variance: -15000,
      variancePercent: -3.0
    },
    {
      department: 'Marketing',
      budgeted: 200000,
      actual: 225000,
      variance: 25000,
      variancePercent: 12.5
    },
    {
      department: 'Sales',
      budgeted: 300000,
      actual: 290000,
      variance: -10000,
      variancePercent: -3.3
    },
    {
      department: 'HR',
      budgeted: 150000,
      actual: 155000,
      variance: 5000,
      variancePercent: 3.3
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Budget Analysis</h1>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Budgeted</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actual</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Variance</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgetData.map((dept, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 font-medium text-gray-900">{dept.department}</td>
                  <td className="px-6 py-4 text-gray-900">${dept.budgeted.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-900">${dept.actual.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {dept.variance < 0 ? 
                        <TrendingDown className="w-4 h-4 text-green-500" /> :
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      }
                      <span className={dept.variance < 0 ? 'text-green-600' : 'text-red-600'}>
                        ${Math.abs(dept.variance).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${dept.variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dept.variancePercent > 0 ? '+' : ''}{dept.variancePercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BudgetAnalysisPage
