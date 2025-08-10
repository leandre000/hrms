import React from 'react'
import { Shield, AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react'

const GDPRPage = () => {
  const gdprCompliance = [
    {
      requirement: 'Lawful Basis for Processing',
      status: 'Compliant',
      lastReview: '2024-01-15',
      nextReview: '2024-04-15',
      risk: 'Low'
    },
    {
      requirement: 'Data Subject Rights',
      status: 'Partially Compliant',
      lastReview: '2024-01-10',
      nextReview: '2024-02-10',
      risk: 'Medium'
    },
    {
      requirement: 'Privacy by Design',
      status: 'Compliant',
      lastReview: '2024-01-08',
      nextReview: '2024-07-08',
      risk: 'Low'
    },
    {
      requirement: 'Data Protection Impact Assessments',
      status: 'Non-Compliant',
      lastReview: '2023-12-20',
      nextReview: '2024-01-30',
      risk: 'High'
    },
    {
      requirement: 'Breach Notification Procedures',
      status: 'Compliant',
      lastReview: '2024-01-12',
      nextReview: '2024-04-12',
      risk: 'Low'
    }
  ]

  const dataSubjectRequests = [
    {
      id: 'DSR001',
      type: 'Right to Access',
      requestDate: '2024-01-20',
      dueDate: '2024-02-19',
      status: 'In Progress',
      requester: 'john.doe@example.com'
    },
    {
      id: 'DSR002',
      type: 'Right to Erasure',
      requestDate: '2024-01-18',
      dueDate: '2024-02-17',
      status: 'Completed',
      requester: 'jane.smith@example.com'
    },
    {
      id: 'DSR003',
      type: 'Right to Rectification',
      requestDate: '2024-01-15',
      dueDate: '2024-02-14',
      status: 'Overdue',
      requester: 'mike.wilson@example.com'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Partially Compliant': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'Non-Compliant': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800'
      case 'Partially Compliant': return 'bg-yellow-100 text-yellow-800'
      case 'Non-Compliant': return 'bg-red-100 text-red-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">GDPR Compliance</h1>

        {/* GDPR Requirements */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">GDPR Requirements Status</h2>
          <div className="space-y-4">
            {gdprCompliance.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">{item.requirement}</h3>
                    <p className="text-sm text-gray-600">
                      Last reviewed: {new Date(item.lastReview).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(item.risk)}`}>
                    {item.risk} Risk
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Subject Requests */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Subject Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Request ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Requester</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Request Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dataSubjectRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{request.id}</td>
                    <td className="px-4 py-3 text-gray-900">{request.type}</td>
                    <td className="px-4 py-3 text-gray-900">{request.requester}</td>
                    <td className="px-4 py-3 text-gray-900">{new Date(request.requestDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gray-900">{new Date(request.dueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
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

export default GDPRPage
