import React from 'react'
import { Receipt, DollarSign, User, Calendar } from 'lucide-react'

const ExpenseAuditPage = () => {
  const expenseAudits = [
    {
      id: 1,
      employee: 'John Doe',
      amount: 1250.00,
      category: 'Travel',
      date: '2024-01-20',
      status: 'Flagged',
      reason: 'Exceeds policy limit'
    },
    {
      id: 2,
      employee: 'Sarah Wilson',
      amount: 450.00,
      category: 'Office Supplies',
      date: '2024-01-18',
      status: 'Approved',
      reason: 'Within policy'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Expense Verification</h1>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenseAudits.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 text-gray-900">{expense.employee}</td>
                  <td className="px-6 py-4 text-gray-900">${expense.amount}</td>
                  <td className="px-6 py-4 text-gray-900">{expense.category}</td>
                  <td className="px-6 py-4 text-gray-900">{expense.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      expense.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {expense.status}
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

export default ExpenseAuditPage
