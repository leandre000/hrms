import React from 'react'
import { XCircle, User, Clock, MapPin } from 'lucide-react'

const FailedLoginsPage = () => {
  const failedLogins = [
    {
      id: 1,
      email: 'john.doe@company.com',
      ipAddress: '203.0.113.45',
      location: 'Unknown Location',
      timestamp: '2024-01-24T15:45:00',
      reason: 'Invalid password',
      attempts: 3,
      blocked: false
    },
    {
      id: 2,
      email: 'hacker@malicious.com',
      ipAddress: '198.51.100.23',
      location: 'Romania',
      timestamp: '2024-01-24T14:30:00',
      reason: 'Account not found',
      attempts: 15,
      blocked: true
    },
    {
      id: 3,
      email: 'sarah.wilson@company.com',
      ipAddress: '192.168.1.105',
      location: 'San Francisco, CA',
      timestamp: '2024-01-24T09:15:00',
      reason: 'Expired password',
      attempts: 1,
      blocked: false
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Failed Login Attempts</h1>
          <p className="text-gray-600">Monitor unsuccessful authentication attempts</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Email</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Timestamp</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Reason</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Attempts</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {failedLogins.map((login) => (
                  <tr key={login.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">{login.email}</div>
                          <div className="text-xs text-gray-500">{login.ipAddress}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{login.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{new Date(login.timestamp).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{login.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        login.attempts > 5 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {login.attempts} attempts
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {login.blocked ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Blocked
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Monitoring
                        </span>
                      )}
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

export default FailedLoginsPage
