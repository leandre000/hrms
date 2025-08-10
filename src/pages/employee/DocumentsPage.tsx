import React, { useState } from 'react'
import { FileText, Upload, Download, Eye, Trash2, Plus, Search, Filter, Calendar, AlertTriangle, CheckCircle } from 'lucide-react'

const DocumentsPage = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [showUpload, setShowUpload] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newDocument, setNewDocument] = useState({
    name: '',
    category: '',
    description: '',
    file: null as File | null
  })

  // Mock personal documents data
  const personalDocuments = [
    {
      id: 1,
      name: 'Driver\'s License',
      category: 'Identification',
      uploadDate: '2024-01-15',
      expiryDate: '2026-01-15',
      size: '2.1 MB',
      type: 'PDF',
      status: 'approved',
      description: 'Valid driver\'s license for identification purposes',
      approvedBy: 'HR Department',
      approvedDate: '2024-01-16'
    },
    {
      id: 2,
      name: 'Passport',
      category: 'Identification',
      uploadDate: '2024-01-10',
      expiryDate: '2029-05-20',
      size: '1.8 MB',
      type: 'PDF',
      status: 'approved',
      description: 'Passport for international business travel',
      approvedBy: 'HR Department',
      approvedDate: '2024-01-11'
    },
    {
      id: 3,
      name: 'AWS Certificate',
      category: 'Certifications',
      uploadDate: '2023-09-20',
      expiryDate: '2026-09-20',
      size: '950 KB',
      type: 'PDF',
      status: 'approved',
      description: 'AWS Certified Developer - Associate certification',
      approvedBy: 'Manager',
      approvedDate: '2023-09-21'
    },
    {
      id: 4,
      name: 'Emergency Contact Form',
      category: 'HR Forms',
      uploadDate: '2024-01-05',
      expiryDate: null,
      size: '500 KB',
      type: 'PDF',
      status: 'pending',
      description: 'Updated emergency contact information',
      submittedFor: 'HR Review'
    },
    {
      id: 5,
      name: 'Health Insurance Enrollment',
      category: 'Benefits',
      uploadDate: '2023-12-15',
      expiryDate: null,
      size: '750 KB',
      type: 'PDF',
      status: 'rejected',
      description: 'Health insurance enrollment form',
      rejectionReason: 'Missing signature on page 2',
      rejectedBy: 'Benefits Team',
      rejectedDate: '2023-12-16'
    }
  ]

  // Mock document categories
  const documentCategories = [
    { name: 'Identification', count: 2, description: 'ID documents like driver\'s license, passport' },
    { name: 'Certifications', count: 1, description: 'Professional certificates and licenses' },
    { name: 'HR Forms', count: 1, description: 'Human resources related forms' },
    { name: 'Benefits', count: 1, description: 'Benefits enrollment and related documents' },
    { name: 'Contracts', count: 0, description: 'Employment contracts and agreements' },
    { name: 'Training', count: 0, description: 'Training completion certificates' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Calendar className="w-4 h-4" />
      case 'rejected':
        return <AlertTriangle className="w-4 h-4" />
      case 'expired':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const isExpiringSoon = (expiryDate: string | null) => {
    if (!expiryDate) return false
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false
    const today = new Date()
    const expiry = new Date(expiryDate)
    return expiry < today
  }

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault()
    // Upload logic here
    console.log('Uploading document:', newDocument)
    setShowUpload(false)
    setNewDocument({
      name: '',
      category: '',
      description: '',
      file: null
    })
  }

  const handleDownload = (doc: any) => {
    // Download logic here
    console.log('Downloading document:', doc.id)
  }

  const handleView = (doc: any) => {
    // View logic here
    console.log('Viewing document:', doc.id)
  }

  const handleDelete = (doc: any) => {
    // Delete logic here
    if (confirm('Are you sure you want to delete this document?')) {
      console.log('Deleting document:', doc.id)
    }
  }

  const filteredDocuments = personalDocuments.filter(doc => {
    const matchesFilter = filter === 'all' || doc.category === filter
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const expiringDocuments = personalDocuments.filter(doc => isExpiringSoon(doc.expiryDate))
  const expiredDocuments = personalDocuments.filter(doc => isExpired(doc.expiryDate))

  const stats = {
    total: personalDocuments.length,
    approved: personalDocuments.filter(d => d.status === 'approved').length,
    pending: personalDocuments.filter(d => d.status === 'pending').length,
    expiring: expiringDocuments.length
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
            <p className="text-gray-600">Manage your personal documents and files</p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Upload Document
          </button>
        </div>

        {/* Expiry Warnings */}
        {(expiringDocuments.length > 0 || expiredDocuments.length > 0) && (
          <div className="space-y-3 mb-6">
            {expiredDocuments.length > 0 && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Expired Documents</h3>
                    <div className="space-y-1">
                      {expiredDocuments.map((doc) => (
                        <div key={doc.id} className="text-sm text-red-700">
                          <span className="font-medium">{doc.name}</span> expired on{' '}
                          <span className="font-medium">{new Date(doc.expiryDate!).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {expiringDocuments.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Documents Expiring Soon</h3>
                    <div className="space-y-1">
                      {expiringDocuments.map((doc) => (
                        <div key={doc.id} className="text-sm text-yellow-700">
                          <span className="font-medium">{doc.name}</span> expires on{' '}
                          <span className="font-medium">{new Date(doc.expiryDate!).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Documents</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.approved}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.expiring}</div>
                <div className="text-sm text-gray-600">Expiring Soon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'personal', label: 'Personal Documents', count: personalDocuments.length },
              { id: 'categories', label: 'Categories', count: documentCategories.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'personal' && (
          <div>
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {documentCategories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Document Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Upload Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Expiry Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{doc.name}</div>
                            <div className="text-sm text-gray-500">{doc.type} • {doc.size}</div>
                            {doc.description && (
                              <div className="text-sm text-gray-600 mt-1">{doc.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            {doc.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {doc.expiryDate ? (
                            <span className={isExpired(doc.expiryDate) ? 'text-red-600 font-medium' : 
                                           isExpiringSoon(doc.expiryDate) ? 'text-yellow-600 font-medium' : 
                                           'text-gray-600'}>
                              {new Date(doc.expiryDate).toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="text-gray-400">No expiry</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                              {getStatusIcon(doc.status)}
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                            {doc.status === 'approved' && doc.approvedBy && (
                              <div className="text-xs text-green-600 mt-1">
                                By: {doc.approvedBy}
                              </div>
                            )}
                            {doc.status === 'rejected' && doc.rejectionReason && (
                              <div className="text-xs text-red-600 mt-1 max-w-xs">
                                {doc.rejectionReason}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleView(doc)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              title="View Document"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDownload(doc)}
                              className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            {doc.status !== 'approved' && (
                              <button
                                onClick={() => handleDelete(doc)}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredDocuments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No documents found</p>
                    <p className="text-sm">Upload your first document to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} documents</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{category.description}</p>
                <button
                  onClick={() => {
                    setActiveTab('personal')
                    setFilter(category.name)
                  }}
                  className="w-full bg-primary-50 text-primary-700 py-2 px-4 rounded-lg hover:bg-primary-100 transition-colors text-sm"
                >
                  View Documents
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Document Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Document</h2>
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                    <input
                      type="text"
                      required
                      value={newDocument.name}
                      onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter document name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      required
                      value={newDocument.category}
                      onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {documentCategories.map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={newDocument.description}
                      onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Brief description of the document..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => setNewDocument({...newDocument, file: e.target.files?.[0] || null})}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="mt-2 inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
                      >
                        Choose File
                      </label>
                    </div>
                    {newDocument.file && (
                      <p className="text-sm text-green-600 mt-2">
                        Selected: {newDocument.file.name}
                      </p>
                    )}
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> All uploaded documents will be reviewed by HR before approval. 
                      Sensitive documents are encrypted and stored securely.
                    </p>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={!newDocument.file}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Upload Document
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUpload(false)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentsPage
