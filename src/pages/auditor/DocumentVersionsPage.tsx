import React from 'react'
import { FileText, GitBranch, Clock, User, Download } from 'lucide-react'

const DocumentVersionsPage = () => {
  const documentVersions = [
    {
      id: 1,
      documentName: 'Employee Handbook',
      version: 'v2.1',
      author: 'HR Admin',
      date: '2024-01-15',
      changes: 'Updated remote work policy section',
      size: '2.4 MB',
      status: 'Current'
    },
    {
      id: 2,
      documentName: 'Employee Handbook',
      version: 'v2.0',
      author: 'Sarah Wilson',
      date: '2023-12-01',
      changes: 'Major revision - added diversity policies',
      size: '2.2 MB',
      status: 'Previous'
    },
    {
      id: 3,
      documentName: 'Security Policy',
      version: 'v3.2',
      author: 'IT Admin',
      date: '2024-01-10',
      changes: 'Enhanced password requirements',
      size: '1.8 MB',
      status: 'Current'
    },
    {
      id: 4,
      documentName: 'Security Policy',
      version: 'v3.1',
      author: 'John Smith',
      date: '2023-11-15',
      changes: 'Added VPN usage guidelines',
      size: '1.7 MB',
      status: 'Previous'
    }
  ]

  const getStatusColor = (status: string) => {
    return status === 'Current' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Document Versions</h1>
        <div className="space-y-4">
          {documentVersions.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.documentName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GitBranch className="w-3 h-3" />
                      {doc.version}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <User className="w-3 h-3" />
                    Author
                  </div>
                  <div className="font-medium">{doc.author}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Clock className="w-3 h-3" />
                    Date
                  </div>
                  <div className="font-medium">{new Date(doc.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Size</div>
                  <div className="font-medium">{doc.size}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Changes</div>
                  <div className="font-medium text-xs">{doc.changes}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DocumentVersionsPage
