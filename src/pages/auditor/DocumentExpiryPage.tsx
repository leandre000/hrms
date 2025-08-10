import React from 'react'
import { Calendar, AlertTriangle, Clock, FileText, CheckCircle } from 'lucide-react'

const DocumentExpiryPage = () => {
  const expiringDocuments = [
    {
      id: 1,
      name: 'ISO 27001 Certificate',
      owner: 'IT Department',
      currentExpiry: '2024-02-15',
      daysUntilExpiry: 22,
      status: 'Critical',
      renewalStatus: 'In Progress',
      lastReminder: '2024-01-20'
    },
    {
      id: 2,
      name: 'Insurance Policy - General Liability',
      owner: 'Finance Department',
      currentExpiry: '2024-03-31',
      daysUntilExpiry: 66,
      status: 'Warning',
      renewalStatus: 'Not Started',
      lastReminder: '2024-01-15'
    },
    {
      id: 3,
      name: 'Software License - MS Office',
      owner: 'IT Department',
      currentExpiry: '2024-06-30',
      daysUntilExpiry: 157,
      status: 'Good',
      renewalStatus: 'Scheduled',
      lastReminder: null
    },
    {
      id: 4,
      name: 'Employment Visa - John Smith',
      owner: 'HR Department',
      currentExpiry: '2024-01-30',
      daysUntilExpiry: 6,
      status: 'Urgent',
      renewalStatus: 'Submitted',
      lastReminder: '2024-01-23'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Urgent': return 'bg-red-100 text-red-800'
      case 'Critical': return 'bg-orange-100 text-orange-800'
      case 'Warning': return 'bg-yellow-100 text-yellow-800'
      case 'Good': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'Critical': return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'Warning': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'Good': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getRenewalStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-100 text-blue-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Scheduled': return 'bg-green-100 text-green-800'
      case 'Not Started': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Document Expiry</h1>
        <div className="space-y-4">
          {expiringDocuments.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.owner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(doc.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Calendar className="w-3 h-3" />
                    Expiry Date
                  </div>
                  <div className="font-medium">{new Date(doc.currentExpiry).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Days Until Expiry</span>
                  <div className={`font-bold text-lg ${
                    doc.daysUntilExpiry <= 7 ? 'text-red-600' :
                    doc.daysUntilExpiry <= 30 ? 'text-orange-600' :
                    doc.daysUntilExpiry <= 60 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {doc.daysUntilExpiry} days
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Renewal Status</span>
                  <div className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRenewalStatusColor(doc.renewalStatus)}`}>
                      {doc.renewalStatus}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Last Reminder</span>
                  <div className="font-medium">
                    {doc.lastReminder ? new Date(doc.lastReminder).toLocaleDateString() : 'None sent'}
                  </div>
                </div>
              </div>

              {doc.daysUntilExpiry <= 30 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="text-sm text-orange-800 font-medium">🔔 Action Required</div>
                  <div className="text-sm text-orange-700 mt-1">
                    Document expires in {doc.daysUntilExpiry} days. 
                    {doc.renewalStatus === 'Not Started' && ' Please initiate renewal process.'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DocumentExpiryPage
