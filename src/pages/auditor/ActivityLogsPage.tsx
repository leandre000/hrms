import React, { useState } from 'react'
import { Activity, User, Calendar, Search, Filter, Download } from 'lucide-react'

const ActivityLogsPage = () => {
  const [dateRange, setDateRange] = useState('today')
  const [actionFilter, setActionFilter] = useState('all')

  const activityLogs = [
    {
      id: 1,
      timestamp: '2024-01-24T14:30:00',
      user: 'john.doe@company.com',
      action: 'LOGIN',
      resource: 'System',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      status: 'Success'
    },
    {
      id: 2,
      timestamp: '2024-01-24T14:25:00',
      user: 'sarah.wilson@company.com',
      action: 'UPDATE_EMPLOYEE',
      resource: 'Employee Records',
      ipAddress: '192.168.1.105',
      userAgent: 'Firefox 121.0.0.0',
      status: 'Success'
    },
    {
      id: 3,
      timestamp: '2024-01-24T14:20:00',
      user: 'admin@company.com',
      action: 'DELETE_DOCUMENT',
      resource: 'Document Library',
      ipAddress: '192.168.1.001',
      userAgent: 'Chrome 120.0.0.0',
      status: 'Success'
    },
    {
      id: 4,
      timestamp: '2024-01-24T14:15:00',
      user: 'unknown.user@external.com',
      action: 'LOGIN_ATTEMPT',
      resource: 'System',
      ipAddress: '203.0.113.45',
      userAgent: 'Unknown',
      status: 'Failed'
    }
  ]

  const getStatusColor = (status: string) => {
    return status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'LOGIN': return 'bg-blue-100 text-blue-800'
      case 'UPDATE_EMPLOYEE': return 'bg-yellow-100 text-yellow-800'
      case 'DELETE_DOCUMENT': return 'bg-red-100 text-red-800'
      case 'LOGIN_ATTEMPT': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Activity Logs</h1>
            <p className="text-gray-600">Monitor all system activities and user interactions</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search logs..."
                className="flex-1 border-0 focus:ring-0 p-0 text-sm placeholder-gray-500"
              />
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Actions</option>
              <option value="LOGIN">Login</option>
              <option value="UPDATE">Updates</option>
              <option value="DELETE">Deletions</option>
            </select>
          </div>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Timestamp</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Action</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Resource</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">IP Address</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{log.user}</span>
                      </div>
                      <div className="text-xs text-gray-500">{log.userAgent}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{log.resource}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{log.ipAddress}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
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

export default ActivityLogsPage
