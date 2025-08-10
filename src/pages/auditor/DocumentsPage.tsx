import React from 'react'
import { FileText, Folder, Search, Download, Eye, Calendar } from 'lucide-react'

const DocumentsPage = () => {
  const documents = [
    {
      id: 1,
      name: 'Employee Handbook 2024.pdf',
      category: 'Policies',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      lastAccessed: '2024-01-23',
      accessCount: 156,
      department: 'HR'
    },
    {
      id: 2,
      name: 'Security Policy v3.2.pdf',
      category: 'Policies',
      size: '1.8 MB',
      uploadDate: '2024-01-10',
      lastAccessed: '2024-01-22',
      accessCount: 89,
      department: 'IT'
    },
    {
      id: 3,
      name: 'Financial Report Q4 2023.xlsx',
      category: 'Financial',
      size: '3.2 MB',
      uploadDate: '2024-01-05',
      lastAccessed: '2024-01-24',
      accessCount: 23,
      department: 'Finance'
    },
    {
      id: 4,
      name: 'Training Materials - Compliance.zip',
      category: 'Training',
      size: '15.6 MB',
      uploadDate: '2023-12-20',
      lastAccessed: '2024-01-20',
      accessCount: 67,
      department: 'HR'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Policies': return 'bg-blue-100 text-blue-800'
      case 'Financial': return 'bg-green-100 text-green-800'
      case 'Training': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Document Repository</h1>
            <p className="text-gray-600">Audit document access and management</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Search className="w-4 h-4" />
              Search
            </button>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Document</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Size</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Last Accessed</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Access Count</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-500">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{doc.department}</td>
                    <td className="px-6 py-4 text-gray-900">{doc.size}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(doc.lastAccessed).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{doc.accessCount} times</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
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

export default DocumentsPage
