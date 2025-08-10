import React from 'react'
import { AlertTriangle, Calendar, User, Eye } from 'lucide-react'

const ViolationsPage = () => {
  const violations = [
    {
      id: 1,
      type: 'Data Access Violation',
      severity: 'High',
      employee: 'John Doe',
      date: '2024-01-24',
      description: 'Unauthorized access to sensitive HR data',
      status: 'Under Investigation'
    },
    {
      id: 2,
      type: 'Policy Violation',
      severity: 'Medium',
      employee: 'Jane Smith',
      date: '2024-01-22',
      description: 'Violation of remote work policy guidelines',
      status: 'Resolved'
    },
    {
      id: 3,
      type: 'Security Violation',
      severity: 'Critical',
      employee: 'Mike Johnson',
      date: '2024-01-20',
      description: 'Failed to follow password security protocols',
      status: 'Action Required'
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
      case 'Under Investigation': return 'bg-blue-100 text-blue-800'
      case 'Action Required': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Violation Tracking</h1>
          <p className="text-gray-600">Monitor and track policy and compliance violations</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Violation</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Severity</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {violations.map((violation) => (
                  <tr key={violation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{violation.type}</div>
                        <div className="text-sm text-gray-500">{violation.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{violation.employee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(violation.severity)}`}>
                        {violation.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{new Date(violation.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(violation.status)}`}>
                        {violation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
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

export default ViolationsPage
