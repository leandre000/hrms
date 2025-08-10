import React from 'react'
import { FileText, CheckCircle, AlertTriangle, XCircle, Calendar } from 'lucide-react'

const DocumentVerificationPage = () => {
  const documents = [
    {
      id: 1,
      employee: 'John Doe',
      documentType: 'Employment Contract',
      status: 'Verified',
      uploadDate: '2024-01-15',
      verifiedDate: '2024-01-16',
      expiryDate: null,
      issues: []
    },
    {
      id: 2,
      employee: 'Sarah Wilson',
      documentType: 'Tax Documents',
      status: 'Pending Verification',
      uploadDate: '2024-01-20',
      verifiedDate: null,
      expiryDate: '2024-12-31',
      issues: ['Signature required']
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      documentType: 'ID Copy',
      status: 'Rejected',
      uploadDate: '2024-01-18',
      verifiedDate: null,
      expiryDate: '2025-06-15',
      issues: ['Poor image quality', 'Partial document']
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Pending Verification': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800'
      case 'Pending Verification': return 'bg-yellow-100 text-yellow-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Document Verification</h1>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.documentType}</h3>
                    <p className="text-sm text-gray-600">{doc.employee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(doc.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Upload Date:</span>
                  <div className="font-medium">{new Date(doc.uploadDate).toLocaleDateString()}</div>
                </div>
                {doc.verifiedDate && (
                  <div>
                    <span className="text-gray-600">Verified Date:</span>
                    <div className="font-medium">{new Date(doc.verifiedDate).toLocaleDateString()}</div>
                  </div>
                )}
                {doc.expiryDate && (
                  <div>
                    <span className="text-gray-600">Expiry Date:</span>
                    <div className="font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(doc.expiryDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              {doc.issues.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Issues:</h4>
                  <ul className="space-y-1">
                    {doc.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DocumentVerificationPage
