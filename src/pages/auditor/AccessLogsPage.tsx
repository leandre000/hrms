import React from 'react'
import { Lock, User, Clock, MapPin } from 'lucide-react'

const AccessLogsPage = () => {
  const accessLogs = [
    {
      id: 1,
      user: 'john.doe@company.com',
      accessType: 'System Login',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      timestamp: '2024-01-24T14:30:00',
      duration: '2h 15m',
      status: 'Active'
    },
    {
      id: 2,
      user: 'sarah.wilson@company.com',
      accessType: 'Admin Panel',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.105',
      timestamp: '2024-01-24T13:45:00',
      duration: '45m',
      status: 'Completed'
    },
    {
      id: 3,
      user: 'mike.johnson@company.com',
      accessType: 'Document Access',
      location: 'Chicago, IL',
      ipAddress: '192.168.1.110',
      timestamp: '2024-01-24T12:30:00',
      duration: '1h 20m',
      status: 'Completed'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Completed': return 'bg-blue-100 text-blue-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Access Logs</h1>
          <p className="text-gray-600">Track user access patterns and session information</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Access Type</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Timestamp</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Duration</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {accessLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{log.user}</span>
                      </div>
                      <div className="text-xs text-gray-500">{log.ipAddress}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-900">{log.accessType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{log.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{log.duration}</td>
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

export default AccessLogsPage
