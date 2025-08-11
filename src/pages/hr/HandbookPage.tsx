import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, FileText, Calendar, Users, Download } from 'lucide-react'

interface Handbook {
  id: string
  title: string
  description: string
  version: string
  department: string
  author: string
  lastUpdated: string
  status: 'active' | 'draft' | 'archived'
  downloadCount: number
  category: 'general' | 'hr' | 'it' | 'finance' | 'operations'
}

const initialHandbooks: Handbook[] = [
  {
    id: '1',
    title: 'Employee Handbook 2024',
    description: 'Comprehensive guide for all employees covering company policies, procedures, and benefits',
    version: '2.1',
    department: 'HR',
    author: 'Sarah Johnson',
    lastUpdated: '2024-01-15',
    status: 'active',
    downloadCount: 245,
    category: 'general'
  },
  {
    id: '2',
    title: 'IT Security Policy',
    description: 'Information technology security guidelines and best practices for employees',
    version: '1.3',
    department: 'IT',
    author: 'Alex Chen',
    lastUpdated: '2024-02-01',
    status: 'active',
    downloadCount: 189,
    category: 'it'
  },
  {
    id: '3',
    title: 'Financial Procedures Manual',
    description: 'Standard operating procedures for financial operations and expense management',
    version: '1.0',
    department: 'Finance',
    author: 'Michael Brown',
    lastUpdated: '2024-01-20',
    status: 'active',
    downloadCount: 156,
    category: 'finance'
  },
  {
    id: '4',
    title: 'Remote Work Guidelines',
    description: 'Policies and procedures for remote work arrangements and telecommuting',
    version: '1.2',
    department: 'HR',
    author: 'Lisa Rodriguez',
    lastUpdated: '2024-01-10',
    status: 'active',
    downloadCount: 312,
    category: 'hr'
  }
]

const HandbookPage: React.FC = () => {
  const [handbooks, setHandbooks] = useState<Handbook[]>(initialHandbooks)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [editingHandbook, setEditingHandbook] = useState<Handbook | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredHandbooks = handbooks.filter(handbook =>
    (selectedCategory === 'all' || handbook.category === selectedCategory) &&
    (handbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     handbook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     handbook.department.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleAddHandbook = (newHandbook: Omit<Handbook, 'id'>) => {
    const handbook: Handbook = {
      ...newHandbook,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    setHandbooks([...handbooks, handbook])
    setShowAddModal(false)
  }

  const handleUpdateHandbook = (updatedHandbook: Handbook) => {
    setHandbooks(handbooks.map(h => h.id === updatedHandbook.id ? updatedHandbook : h))
    setShowAddModal(false)
    setEditingHandbook(null)
  }

  const handleDeleteHandbook = (id: string) => {
    if (window.confirm('Are you sure you want to delete this handbook?')) {
      setHandbooks(handbooks.filter(h => h.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'bg-blue-100 text-blue-800'
      case 'hr': return 'bg-green-100 text-green-800'
      case 'it': return 'bg-purple-100 text-purple-800'
      case 'finance': return 'bg-orange-100 text-orange-800'
      case 'operations': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Handbooks</h1>
        <p className="text-gray-600">Manage and maintain company handbooks and policy documents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Handbooks</p>
              <p className="text-2xl font-bold text-gray-900">{handbooks.length}</p>
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
                {handbooks.reduce((sum, h) => sum + h.downloadCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Handbooks</p>
              <p className="text-2xl font-bold text-gray-900">
                {handbooks.filter(h => h.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(handbooks.map(h => h.department)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search handbooks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="hr">HR</option>
              <option value="it">IT</option>
              <option value="general">Finance</option>
              <option value="operations">Operations</option>
            </select>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Handbook
          </button>
        </div>
      </div>

      {/* Handbooks Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Handbook
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHandbooks.map((handbook) => (
                <tr key={handbook.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{handbook.title}</div>
                      <div className="text-sm text-gray-500">{handbook.description}</div>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(handbook.category)}`}>
                          {handbook.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{handbook.department}</div>
                    <div className="text-sm text-gray-500">by {handbook.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{handbook.version}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{handbook.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs font-medium text-gray-900">{handbook.downloadCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(handbook.status)}`}>
                      {handbook.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingHandbook(handbook)
                        setShowAddModal(true)
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteHandbook(handbook.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Handbook Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingHandbook ? 'Edit Handbook' : 'Add New Handbook'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingHandbook(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
                      const newHandbook = {
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          version: formData.get('version') as string,
          department: formData.get('department') as string,
          author: formData.get('author') as string,
          status: formData.get('status') as 'active' | 'draft' | 'archived',
          category: formData.get('category') as 'general' | 'hr' | 'it' | 'finance' | 'operations',
          lastUpdated: new Date().toISOString().split('T')[0],
          downloadCount: 0
        }
              
              if (editingHandbook) {
                handleUpdateHandbook({ ...editingHandbook, ...newHandbook })
              } else {
                handleAddHandbook(newHandbook)
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingHandbook?.title}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingHandbook?.description}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Version</label>
                    <input
                      type="text"
                      name="version"
                      defaultValue={editingHandbook?.version}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <input
                      type="text"
                      name="department"
                      defaultValue={editingHandbook?.department}
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
                    defaultValue={editingHandbook?.author}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      name="category"
                      defaultValue={editingHandbook?.category || 'general'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="general">General</option>
                      <option value="hr">HR</option>
                      <option value="it">IT</option>
                      <option value="finance">Finance</option>
                      <option value="operations">Operations</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      defaultValue={editingHandbook?.status || 'draft'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingHandbook(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingHandbook ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default HandbookPage
