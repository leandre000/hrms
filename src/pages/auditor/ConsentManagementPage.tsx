import React from 'react'
import { Check, X, Clock, User, Calendar } from 'lucide-react'

const ConsentManagementPage = () => {
  const consentRecords = [
    {
      id: 'CNS001',
      dataSubject: 'john.doe@example.com',
      purpose: 'Marketing Communications',
      status: 'Given',
      dateGiven: '2024-01-15',
      dateWithdrawn: null,
      method: 'Website Form',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'CNS002',
      dataSubject: 'jane.smith@example.com',
      purpose: 'Newsletter Subscription',
      status: 'Withdrawn',
      dateGiven: '2023-11-20',
      dateWithdrawn: '2024-01-10',
      method: 'Email Preferences',
      ipAddress: '192.168.1.105'
    },
    {
      id: 'CNS003',
      dataSubject: 'mike.wilson@example.com',
      purpose: 'Data Analytics',
      status: 'Given',
      dateGiven: '2024-01-12',
      dateWithdrawn: null,
      method: 'Cookie Banner',
      ipAddress: '192.168.1.110'
    },
    {
      id: 'CNS004',
      dataSubject: 'sarah.brown@example.com',
      purpose: 'Promotional Offers',
      status: 'Expired',
      dateGiven: '2022-01-15',
      dateWithdrawn: null,
      method: 'In-store Form',
      ipAddress: '192.168.1.115'
    }
  ]

  const consentSummary = [
    { purpose: 'Marketing Communications', given: 1250, withdrawn: 230, expired: 45 },
    { purpose: 'Newsletter Subscription', given: 890, withdrawn: 156, expired: 22 },
    { purpose: 'Data Analytics', given: 2100, withdrawn: 89, expired: 12 },
    { purpose: 'Promotional Offers', given: 567, withdrawn: 234, expired: 78 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Given': return <Check className="w-4 h-4 text-green-500" />
      case 'Withdrawn': return <X className="w-4 h-4 text-red-500" />
      case 'Expired': return <Clock className="w-4 h-4 text-gray-500" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Given': return 'bg-green-100 text-green-800'
      case 'Withdrawn': return 'bg-red-100 text-red-800'
      case 'Expired': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Consent Management</h1>

        {/* Consent Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Consent Summary by Purpose</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Purpose</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Given</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Withdrawn</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Expired</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Active Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {consentSummary.map((summary, index) => {
                  const total = summary.given + summary.withdrawn + summary.expired
                  const activeRate = ((summary.given / total) * 100).toFixed(1)
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{summary.purpose}</td>
                      <td className="px-4 py-3 text-green-600 font-medium">{summary.given}</td>
                      <td className="px-4 py-3 text-red-600">{summary.withdrawn}</td>
                      <td className="px-4 py-3 text-gray-600">{summary.expired}</td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${parseFloat(activeRate) >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {activeRate}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Consent Records */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Consent Records</h2>
          <div className="space-y-4">
            {consentRecords.map((record) => (
              <div key={record.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{record.dataSubject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Purpose:</span>
                    <div className="font-medium">{record.purpose}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Date Given:</span>
                    <div className="font-medium">{new Date(record.dateGiven).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Method:</span>
                    <div className="font-medium">{record.method}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">IP Address:</span>
                    <div className="font-medium">{record.ipAddress}</div>
                  </div>
                </div>

                {record.dateWithdrawn && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm">
                    <span className="text-red-800 font-medium">Withdrawn:</span>
                    <span className="text-red-700 ml-2">{new Date(record.dateWithdrawn).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsentManagementPage
