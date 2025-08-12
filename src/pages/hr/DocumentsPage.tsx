import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, FileText, Download, Eye, Shield } from 'lucide-react'

interface Document {
  id: string
  title: string
  type: 'policy' | 'procedure' | 'form' | 'handbook' | 'contract' | 'template'
  category: string
  version: string
  status: 'active' | 'draft' | 'archived'
  author: string
  lastModified: string
  fileSize: string
  downloads: number
  description: string
  isCompliance: boolean
  complianceType?: 'regulatory' | 'internal' | 'industry' | 'legal'
  lastAudit?: string
  auditStatus?: 'compliant' | 'non-compliant' | 'pending' | 'under-review'
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Employee Handbook 2024',
    type: 'handbook',
    category: 'General',
    version: '2.1',
    status: 'active',
    author: 'HR Department',
    lastModified: '2024-01-15',
    fileSize: '2.5 MB',
    downloads: 45,
    description: 'Comprehensive employee handbook covering all company policies and procedures',
    isCompliance: true,
    complianceType: 'internal',
    lastAudit: '2024-01-10',
    auditStatus: 'compliant'
  },
  {
    id: '2',
    title: 'Leave Policy',
    type: 'policy',
    category: 'Time & Attendance',
    version: '1.3',
    status: 'active',
    author: 'Sarah Wilson',
    lastModified: '2024-01-20',
    fileSize: '1.2 MB',
    downloads: 32,
    description: 'Updated leave policy including vacation, sick leave, and personal time',
    isCompliance: true,
    complianceType: 'regulatory',
    lastAudit: '2024-01-15',
    auditStatus: 'compliant'
  },
  {
    id: '3',
    title: 'Performance Review Form',
    type: 'form',
    category: 'Performance',
    version: '3.0',
    status: 'active',
    author: 'HR Department',
    lastModified: '2024-01-10',
    fileSize: '0.8 MB',
    downloads: 67,
    description: 'Standard performance review form for annual evaluations',
    isCompliance: false
  },
  {
    id: '4',
    title: 'Onboarding Checklist',
    type: 'template',
    category: 'Recruitment',
    version: '2.2',
    status: 'active',
    author: 'Lisa Rodriguez',
    lastModified: '2024-01-25',
    fileSize: '1.5 MB',
    downloads: 28,
    description: 'Comprehensive onboarding checklist for new employees',
    isCompliance: false
  },
  {
    id: '5',
    title: 'Expense Reimbursement Policy',
    type: 'policy',
    category: 'Finance',
    version: '1.1',
    status: 'active',
    author: 'Finance Department',
    lastModified: '2024-01-18',
    fileSize: '1.8 MB',
    downloads: 23,
    description: 'Policy for employee expense reimbursement and approval process',
    isCompliance: true,
    complianceType: 'internal',
    lastAudit: '2024-01-12',
    auditStatus: 'compliant'
  },
  {
    id: '6',
    title: 'Data Protection Policy',
    type: 'policy',
    category: 'IT & Security',
    version: '2.0',
    status: 'active',
    author: 'Legal Team',
    lastModified: '2024-01-22',
    fileSize: '1.6 MB',
    downloads: 89,
    description: 'GDPR and data protection compliance policy for employee data handling',
    isCompliance: true,
    complianceType: 'regulatory',
    lastAudit: '2024-01-20',
    auditStatus: 'compliant'
  },
  {
    id: '7',
    title: 'Workplace Safety Procedures',
    type: 'procedure',
    category: 'Health & Safety',
    version: '3.1',
    status: 'active',
    author: 'Safety Officer',
    lastModified: '2024-01-19',
    fileSize: '2.1 MB',
    downloads: 156,
    description: 'OSHA compliant workplace safety procedures and emergency protocols',
    isCompliance: true,
    complianceType: 'regulatory',
    lastAudit: '2024-01-18',
    auditStatus: 'compliant'
  },
  {
    id: '8',
    title: 'Anti-Discrimination Policy',
    type: 'policy',
    category: 'Legal & Compliance',
    version: '1.8',
    status: 'active',
    author: 'Legal Team',
    lastModified: '2024-01-16',
    fileSize: '1.4 MB',
    downloads: 134,
    description: 'EEOC compliant anti-discrimination and harassment prevention policy',
    isCompliance: true,
    complianceType: 'regulatory',
    lastAudit: '2024-01-14',
    auditStatus: 'compliant'
  }
]

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddDocument = (newDoc: Omit<Document, 'id'>) => {
    const document: Document = {
      ...newDoc,
      id: Date.now().toString()
    }
    setDocuments([...documents, document])
    setShowAddModal(false)
  }

  const handleEditDocument = (doc: Document) => {
    setEditingDocument(doc)
    setShowAddModal(true)
  }

  const handleUpdateDocument = (updatedDoc: Document) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDoc.id ? updatedDoc : doc
    ))
    setEditingDocument(null)
    setShowAddModal(false)
  }

  const handleDeleteDocument = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id))
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'policy': return 'bg-blue-100 text-blue-800'
      case 'procedure': return 'bg-green-100 text-green-800'
      case 'form': return 'bg-purple-100 text-purple-800'
      case 'handbook': return 'bg-orange-100 text-orange-800'
      case 'contract': return 'bg-red-100 text-red-800'
      case 'template': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Documents</h1>
        <p className="text-gray-600">Manage HR documents, policies, and templates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">
                {documents.reduce((sum, doc) => sum + doc.downloads, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Documents</p>
              <p className="text-2xl font-bold text-gray-900">
                {documents.filter(doc => doc.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(documents.map(doc => doc.category)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Compliance Documents Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {documents.filter(doc => doc.isCompliance).length}
              </p>
              <p className="text-sm text-blue-800">Compliance Docs</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {documents.filter(doc => doc.isCompliance && doc.auditStatus === 'compliant').length}
              </p>
              <p className="text-sm text-green-800">Compliant</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {documents.filter(doc => doc.isCompliance && doc.auditStatus === 'pending').length}
              </p>
              <p className="text-sm text-yellow-800">Pending Review</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {documents.filter(doc => doc.isCompliance && doc.auditStatus === 'non-compliant').length}
              </p>
              <p className="text-sm text-red-800">Non-Compliant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Types</option>
                <option value="compliance">Compliance Only</option>
                <option value="non-compliance">Non-Compliance</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Categories</option>
                <option value="regulatory">Regulatory</option>
                <option value="internal">Internal</option>
                <option value="industry">Industry</option>
                <option value="legal">Legal</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </button>
          </div>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                      <div className="text-sm text-gray-500">v{doc.version} • {doc.fileSize}</div>
                      <div className="text-xs text-gray-400 mt-1">{doc.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doc.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doc.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doc.lastModified}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doc.downloads}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      doc.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : doc.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {doc.isCompliance ? (
                      <div className="space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          doc.auditStatus === 'compliant' ? 'bg-green-100 text-green-800' :
                          doc.auditStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          doc.auditStatus === 'non-compliant' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {doc.auditStatus || 'Under Review'}
                        </span>
                        <div className="text-xs text-gray-500">
                          {doc.complianceType && doc.complianceType.charAt(0).toUpperCase() + doc.complianceType.slice(1)}
                        </div>
                        {doc.lastAudit && (
                          <div className="text-xs text-gray-400">
                            Last: {new Date(doc.lastAudit).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditDocument(doc)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingDocument ? 'Edit Document' : 'Add New Document'}
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const newDoc = {
                  title: formData.get('title') as string,
                  type: formData.get('type') as 'policy' | 'procedure' | 'form' | 'handbook' | 'contract' | 'template',
                  category: formData.get('category') as string,
                  version: formData.get('version') as string,
                  status: formData.get('status') as 'active' | 'draft' | 'archived',
                  author: formData.get('author') as string,
                  lastModified: formData.get('lastModified') as string,
                  fileSize: formData.get('fileSize') as string,
                  downloads: parseInt(formData.get('downloads') as string),
                  description: formData.get('description') as string,
                  isCompliance: false
                }
                
                if (editingDocument) {
                  handleUpdateDocument({ ...editingDocument, ...newDoc })
                } else {
                  handleAddDocument(newDoc)
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingDocument?.title}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      name="type"
                      defaultValue={editingDocument?.type || 'policy'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="policy">Policy</option>
                      <option value="procedure">Procedure</option>
                      <option value="form">Form</option>
                      <option value="handbook">Handbook</option>
                      <option value="contract">Contract</option>
                      <option value="template">Template</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={editingDocument?.category}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Version</label>
                      <input
                        type="text"
                        name="version"
                        defaultValue={editingDocument?.version}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">File Size</label>
                      <input
                        type="text"
                        name="fileSize"
                        defaultValue={editingDocument?.fileSize}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                      type="text"
                      name="author"
                      defaultValue={editingDocument?.author}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Modified</label>
                    <input
                      type="date"
                      name="lastModified"
                      defaultValue={editingDocument?.lastModified}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Downloads</label>
                    <input
                      type="number"
                      name="downloads"
                      defaultValue={editingDocument?.downloads || 0}
                      required
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      defaultValue={editingDocument?.status || 'active'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingDocument?.description}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingDocument(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingDocument ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentsPage
