import React from 'react'
import { Shield, AlertTriangle, Lock, User } from 'lucide-react'

const SecurityEventsPage = () => {
  const securityEvents = [
    {
      id: 1,
      type: 'Suspicious Login',
      severity: 'High',
      description: 'Login attempt from unusual location',
      user: 'john.doe@company.com',
      ipAddress: '203.0.113.45',
      timestamp: '2024-01-24T15:30:00',
      status: 'Investigating'
    },
    {
      id: 2,
      type: 'Failed Authentication',
      severity: 'Medium',
      description: 'Multiple failed login attempts',
      user: 'unknown.user@external.com',
      ipAddress: '198.51.100.23',
      timestamp: '2024-01-24T14:45:00',
      status: 'Blocked'
    },
    {
      id: 3,
      type: 'Privilege Escalation',
      severity: 'Critical',
      description: 'Unauthorized admin access attempt',
      user: 'temp.user@company.com',
      ipAddress: '192.168.1.200',
      timestamp: '2024-01-24T13:20:00',
      status: 'Resolved'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800'
      case 'Investigating': return 'bg-blue-100 text-blue-800'
      case 'Blocked': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Suspicious Login': return <Lock className="w-5 h-5 text-orange-500" />
      case 'Failed Authentication': return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'Privilege Escalation': return <Shield className="w-5 h-5 text-red-600" />
      default: return <Shield className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Security Events</h1>
          <p className="text-gray-600">Monitor security incidents and potential threats</p>
        </div>

        <div className="space-y-4">
          {securityEvents.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getEventIcon(event.type)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.type}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>User: {event.user}</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">IP: {event.ipAddress}</div>
                </div>
                <div>
                  <div className="text-gray-600">Time: {new Date(event.timestamp).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SecurityEventsPage
