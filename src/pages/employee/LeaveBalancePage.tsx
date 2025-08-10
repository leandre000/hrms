import React, { useState } from 'react'
import { Calendar, TrendingUp, AlertCircle, Clock, Award, RefreshCw } from 'lucide-react'

const LeaveBalancePage = () => {
  const [selectedYear, setSelectedYear] = useState('2024')

  // Mock leave balance data
  const leaveBalances = [
    {
      type: 'Annual Leave',
      total: 25,
      used: 7,
      pending: 3,
      available: 15,
      carryover: 2,
      accrualRate: 2.08, // per month
      description: 'Vacation days for personal time off',
      expiryDate: '2024-12-31',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800'
    },
    {
      type: 'Sick Leave',
      total: 10,
      used: 2,
      pending: 0,
      available: 8,
      carryover: 0,
      accrualRate: 0.83, // per month
      description: 'Medical leave for illness or injury',
      expiryDate: '2024-12-31',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-800'
    },
    {
      type: 'Personal Leave',
      total: 5,
      used: 2,
      pending: 0,
      available: 3,
      carryover: 0,
      accrualRate: 0.42, // per month
      description: 'Personal matters and appointments',
      expiryDate: '2024-12-31',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800'
    },
    {
      type: 'Maternity/Paternity',
      total: 90,
      used: 0,
      pending: 0,
      available: 90,
      carryover: 0,
      accrualRate: 0, // not accrued monthly
      description: 'Leave for new parents',
      expiryDate: 'Does not expire',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800'
    }
  ]

  // Mock accrual history
  const accrualHistory = [
    { month: 'January 2024', annual: 2.08, sick: 0.83, personal: 0.42, total: 3.33 },
    { month: 'February 2024', annual: 2.08, sick: 0.83, personal: 0.42, total: 3.33 },
    { month: 'March 2024', annual: 2.08, sick: 0.83, personal: 0.42, total: 3.33 },
    { month: 'April 2024', annual: 2.08, sick: 0.83, personal: 0.42, total: 3.33 },
    { month: 'May 2024', annual: 2.08, sick: 0.83, personal: 0.42, total: 3.33 },
    { month: 'June 2024', annual: 2.08, sick: 0.83, personal: 0.42, total: 3.33 }
  ]

  const upcomingExpirations = [
    {
      type: 'Annual Leave',
      days: 2,
      expiryDate: '2024-12-31',
      status: 'warning'
    }
  ]

  const getUsagePercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100)
  }

  const getAvailabilityStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage > 70) return { status: 'good', color: 'text-green-600' }
    if (percentage > 30) return { status: 'moderate', color: 'text-yellow-600' }
    return { status: 'low', color: 'text-red-600' }
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave Balance</h1>
            <p className="text-gray-600">Track your leave entitlements and usage</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {leaveBalances.map((balance, index) => (
            <div key={index} className={`${balance.bgColor} p-6 rounded-lg border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${balance.textColor}`}>{balance.type}</h3>
                <div className={`w-3 h-3 rounded-full ${balance.color}`}></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available</span>
                  <span className={`text-2xl font-bold ${balance.textColor}`}>
                    {balance.available}
                  </span>
                </div>
                
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className={`${balance.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${((balance.total - balance.available) / balance.total) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Used: {balance.used}</span>
                  <span>Total: {balance.total}</span>
                </div>
                
                {balance.pending > 0 && (
                  <div className="flex items-center gap-1 text-xs text-yellow-600">
                    <Clock className="w-3 h-3" />
                    <span>{balance.pending} pending</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detailed Balance Table */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Balance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-900">Leave Type</th>
                    <th className="text-center py-2 text-sm font-medium text-gray-900">Total</th>
                    <th className="text-center py-2 text-sm font-medium text-gray-900">Used</th>
                    <th className="text-center py-2 text-sm font-medium text-gray-900">Available</th>
                    <th className="text-center py-2 text-sm font-medium text-gray-900">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveBalances.map((balance, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${balance.color}`}></div>
                          <span className="font-medium text-gray-900">{balance.type}</span>
                        </div>
                      </td>
                      <td className="py-3 text-center text-gray-900">{balance.total}</td>
                      <td className="py-3 text-center text-gray-900">{balance.used}</td>
                      <td className="py-3 text-center">
                        <span className={getAvailabilityStatus(balance.available, balance.total).color}>
                          {balance.available}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="text-sm text-gray-600">
                          {getUsagePercentage(balance.used, balance.total)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Accrual Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Accrual Information</h2>
            <div className="space-y-4">
              {leaveBalances.filter(b => b.accrualRate > 0).map((balance, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{balance.type}</h3>
                    <span className="text-sm text-primary-600 font-medium">
                      +{balance.accrualRate}/month
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{balance.description}</p>
                  {balance.carryover > 0 && (
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <Award className="w-3 h-3" />
                      <span>{balance.carryover} days carried over from last year</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    Expires: {balance.expiryDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accrual History */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Accrual History (2024)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-900">Month</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-900">Annual Leave</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-900">Sick Leave</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-900">Personal Leave</th>
                  <th className="text-center py-2 text-sm font-medium text-gray-900">Total Accrued</th>
                </tr>
              </thead>
              <tbody>
                {accrualHistory.map((month, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-900">{month.month}</td>
                    <td className="py-3 text-center text-gray-900">{month.annual}</td>
                    <td className="py-3 text-center text-gray-900">{month.sick}</td>
                    <td className="py-3 text-center text-gray-900">{month.personal}</td>
                    <td className="py-3 text-center font-medium text-primary-600">{month.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Expirations */}
        {upcomingExpirations.length > 0 && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 mb-2">Upcoming Leave Expirations</h3>
                <div className="space-y-2">
                  {upcomingExpirations.map((expiration, index) => (
                    <div key={index} className="text-sm text-yellow-700">
                      <span className="font-medium">{expiration.days} days</span> of {expiration.type} will expire on{' '}
                      <span className="font-medium">{expiration.expiryDate}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-yellow-700 mt-2">
                  Consider submitting leave requests to utilize these days before they expire.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Leave Policy Summary */}
        <div className="mt-6 bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">Leave Policy Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">Annual Leave</h4>
              <ul className="space-y-1 text-xs">
                <li>• 25 days per year (accrued monthly)</li>
                <li>• Can carry over up to 5 days</li>
                <li>• Requires 48-hour advance notice</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Sick Leave</h4>
              <ul className="space-y-1 text-xs">
                <li>• 10 days per year</li>
                <li>• Medical certificate required for 3+ days</li>
                <li>• Cannot be carried over</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Personal Leave</h4>
              <ul className="space-y-1 text-xs">
                <li>• 5 days per year</li>
                <li>• Manager approval required</li>
                <li>• Cannot be carried over</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Maternity/Paternity</h4>
              <ul className="space-y-1 text-xs">
                <li>• 90 days available</li>
                <li>• HR approval required</li>
                <li>• Medical documentation needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveBalancePage
