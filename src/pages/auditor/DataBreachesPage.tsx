import React from 'react'
import { AlertTriangle, Shield, Clock, CheckCircle, User } from 'lucide-react'

const DataBreachesPage = () => {
  const breachIncidents = [
    {
      id: 'BR001',
      title: 'Unauthorized Database Access',
      severity: 'High',
      status: 'Resolved',
      discoveredDate: '2024-01-20',
      reportedDate: '2024-01-21',
      affectedRecords: 150,
      dataTypes: ['Personal Identifiers', 'Contact Information'],
      notificationRequired: true,
      notificationSent: true,
      description: 'Unauthorized access to employee database through compromised credentials'
    },
    {
      id: 'BR002',
      title: 'Email Misconfiguration',
      severity: 'Medium',
      status: 'Under Investigation',
      discoveredDate: '2024-01-18',
      reportedDate: '2024-01-19',
      affectedRecords: 45,
      dataTypes: ['Email Addresses'],
      notificationRequired: false,
      notificationSent: false,
      description: 'Email system misconfiguration led to internal data exposure'
    },
    {
      id: 'BR003',
      title: 'Document Sharing Error',
      severity: 'Low',
      status: 'Resolved',
      discoveredDate: '2024-01-15',
      reportedDate: '2024-01-15',
      affectedRecords: 12,
      dataTypes: ['Employment Records'],
      notificationRequired: false,
      notificationSent: false,
      description: 'Accidental sharing of confidential document via email'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Under Investigation': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'Open': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Shield className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800'
      case 'Under Investigation': return 'bg-yellow-100 text-yellow-800'
      case 'Open': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityIcon = (severity: string) => {
    return <AlertTriangle className={`w-4 h-4 ${
      severity === 'High' ? 'text-red-500' :
      severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'
    }`} />
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Data Breach Logs</h1>

        <div className="space-y-6">
          {breachIncidents.map((incident) => (
            <div key={incident.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(incident.severity)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                    <p className="text-sm text-gray-600">Incident ID: {incident.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                    {incident.severity} Severity
                  </span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(incident.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{incident.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                <div>
                  <span className="text-gray-600 text-sm">Discovered</span>
                  <div className="font-medium">{new Date(incident.discoveredDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Reported</span>
                  <div className="font-medium">{new Date(incident.reportedDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Affected Records</span>
                  <div className="font-medium text-red-600">{incident.affectedRecords}</div>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">72h Notification</span>
                  <div className={`font-medium ${incident.notificationRequired ? 'text-red-600' : 'text-green-600'}`}>
                    {incident.notificationRequired ? 'Required' : 'Not Required'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Notification Sent</span>
                  <div className={`font-medium ${incident.notificationSent ? 'text-green-600' : 'text-red-600'}`}>
                    {incident.notificationSent ? 'Yes' : 'No'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Response Time</span>
                  <div className="font-medium">
                    {Math.floor((new Date(incident.reportedDate).getTime() - new Date(incident.discoveredDate).getTime()) / (1000 * 60 * 60 * 24))} days
                  </div>
                </div>
              </div>

              <div>
                <span className="text-gray-600 text-sm block mb-2">Data Types Affected:</span>
                <div className="flex flex-wrap gap-2">
                  {incident.dataTypes.map((type, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DataBreachesPage
