import React, { useState } from 'react'
import { FileText, FolderOpen, Upload, Download, Eye, Edit, Trash2, Share2, Lock, Users, Search, Filter, Plus } from 'lucide-react'

const AdminDocumentsPage = () => {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [accessFilter, setAccessFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const documents = [
    {
      id: 1,
      title: 'Employee Handbook 2024',
      description: 'Complete guide to company policies and procedures',
      category: 'Policy',
      type: 'PDF',
      size: '2.3 MB',
      uploadDate: '2024-01-15',
      lastModified: '2024-01-20',
      uploadedBy: 'Lisa Rodriguez',
      version: '3.2',
      accessLevel: 'All Employees',
      downloads: 145,
      views: 289,
      status: 'published',
      tags: ['handbook', 'policies', 'procedures'],
      department: 'HR',
      expiryDate: '2024-12-31'
    },
    {
      id: 2,
      title: 'Code of Conduct',
      description: 'Ethical guidelines and behavioral expectations',
      category: 'Compliance',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-01-10',
      lastModified: '2024-01-10',
      uploadedBy: 'Legal Team',
      version: '2.1',
      accessLevel: 'All Employees',
      downloads: 203,
      views: 456,
      status: 'published',
      tags: ['ethics', 'conduct', 'compliance'],
      department: 'Legal',
      expiryDate: '2025-01-10'
    },
    {
      id: 3,
      title: 'Software Development Guidelines',
      description: 'Best practices and coding standards for development team',
      category: 'Technical',
      type: 'PDF',
      size: '5.7 MB',
      uploadDate: '2024-01-05',
      lastModified: '2024-01-18',
      uploadedBy: 'Michael Chen',
      version: '4.0',
      accessLevel: 'Engineering Only',
      downloads: 67,
      views: 123,
      status: 'published',
      tags: ['development', 'coding', 'standards'],
      department: 'Engineering',
      expiryDate: '2024-06-30'
    },
    {
      id: 4,
      title: 'Emergency Procedures',
      description: 'Safety protocols and emergency response procedures',
      category: 'Safety',
      type: 'PDF',
      size: '3.1 MB',
      uploadDate: '2024-01-08',
      lastModified: '2024-01-08',
      uploadedBy: 'Safety Committee',
      version: '1.5',
      accessLevel: 'All Employees',
      downloads: 89,
      views: 167,
      status: 'published',
      tags: ['safety', 'emergency', 'procedures'],
      department: 'Operations',
      expiryDate: '2024-12-31'
    },
    {
      id: 5,
      title: 'Data Privacy Policy DRAFT',
      description: 'Updated data protection and privacy guidelines',
      category: 'Policy',
      type: 'DOCX',
      size: '892 KB',
      uploadDate: '2024-01-22',
      lastModified: '2024-01-23',
      uploadedBy: 'Legal Team',
      version: '1.0',
      accessLevel: 'Management Only',
      downloads: 12,
      views: 25,
      status: 'draft',
      tags: ['privacy', 'data', 'GDPR'],
      department: 'Legal',
      expiryDate: null
    }
  ]

  const categories = ['all', 'Policy', 'Compliance', 'Technical', 'Safety', 'Training', 'Forms']
  const accessLevels = ['all', 'All Employees', 'Management Only', 'Engineering Only', 'HR Only']
  const statuses = ['all', 'published', 'draft', 'under_review', 'archived']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'under_review':
        return 'bg-blue-100 text-blue-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'All Employees':
        return 'bg-blue-100 text-blue-800'
      case 'Management Only':
        return 'bg-red-100 text-red-800'
      case 'Engineering Only':
        return 'bg-purple-100 text-purple-800'
      case 'HR Only':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />
      case 'docx':
      case 'doc':
        return <FileText className="w-5 h-5 text-blue-500" />
      case 'xlsx':
      case 'xls':
        return <FileText className="w-5 h-5 text-green-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter
    const matchesAccess = accessFilter === 'all' || doc.accessLevel === accessFilter
    return matchesSearch && matchesCategory && matchesAccess
  })

  const stats = {
    totalDocuments: documents.length,
    publishedDocuments: documents.filter(d => d.status === 'published').length,
    totalDownloads: documents.reduce((sum, d) => sum + d.downloads, 0),
    totalViews: documents.reduce((sum, d) => sum + d.views, 0),
    draftDocuments: documents.filter(d => d.status === 'draft').length,
    expiringDocuments: documents.filter(d => {
      if (!d.expiryDate) return false
      const expiry = new Date(d.expiryDate)
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
      return expiry <= thirtyDaysFromNow
    }).length
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Document Library</h1>
            <p className="text-gray-600">Manage company documents and knowledge base</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('grid')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Plus className="w-4 h-4" />
              New Folder
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.publishedDocuments}</div>
                <div className="text-sm text-gray-600">Published Documents</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              {stats.totalDocuments} total documents
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</div>
                <div className="text-sm text-gray-600">Total Downloads</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {stats.totalViews} total views
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Edit className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.draftDocuments}</div>
                <div className="text-sm text-gray-600">Draft Documents</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">
              Pending review
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.expiringDocuments}</div>
                <div className="text-sm text-gray-600">Expiring Soon</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-red-600">
              Next 30 days
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-0 focus:ring-0 p-0 text-sm placeholder-gray-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <select
                value={accessFilter}
                onChange={(e) => setAccessFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {accessLevels.map((access) => (
                  <option key={access} value={access}>
                    {access === 'all' ? 'All Access Levels' : access}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Documents Display */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(document.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{document.title}</h3>
                      <p className="text-xs text-gray-500">v{document.version}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                      <Download className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{document.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                    {document.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAccessColor(document.accessLevel)}`}>
                    <Lock className="w-3 h-3 mr-1" />
                    {document.accessLevel}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="text-gray-900">{document.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="text-gray-900">{document.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Downloads:</span>
                    <span className="text-gray-900">{document.downloads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Views:</span>
                    <span className="text-gray-900">{document.views}</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>By {document.uploadedBy}</span>
                    <span>{new Date(document.lastModified).toLocaleDateString()}</span>
                  </div>
                  {document.expiryDate && (
                    <div className="text-xs text-red-500 mt-1">
                      Expires: {new Date(document.expiryDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Document</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Category</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Access Level</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Usage</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Modified</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDocuments.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(document.type)}
                          <div>
                            <div className="font-medium text-gray-900">{document.title}</div>
                            <div className="text-sm text-gray-500">{document.description}</div>
                            <div className="text-xs text-gray-400">v{document.version} • {document.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                          {document.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAccessColor(document.accessLevel)}`}>
                          <Lock className="w-3 h-3 mr-1" />
                          {document.accessLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                          {document.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{document.downloads} downloads</div>
                        <div className="text-xs text-gray-500">{document.views} views</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{new Date(document.lastModified).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">by {document.uploadedBy}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors" title="Share">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-yellow-600 transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p>Try adjusting your search criteria or upload new documents.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDocumentsPage
