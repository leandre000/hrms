import React, { useState } from 'react'
import {
  FileText,
  Mail,
  File,
  Plus,
  Search,
  Filter,
  Edit,
  Copy,
  Trash2,
  Eye,
  Download,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

interface Template {
  id: string
  name: string
  type: 'email' | 'document' | 'form'
  category: string
  lastModified: string
  status: 'active' | 'draft' | 'archived'
  usageCount: number
  createdBy: string
  description: string
  tags: string[]
  isFavorite: boolean
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Welcome Email Template',
    type: 'email',
    category: 'Onboarding',
    lastModified: '2024-01-15',
    status: 'active',
    usageCount: 45,
    createdBy: 'HR Manager',
    description: 'Standard welcome email for new employees',
    tags: ['onboarding', 'welcome', 'new-hire'],
    isFavorite: true
  },
  {
    id: '2',
    name: 'Performance Review Form',
    type: 'form',
    category: 'Performance',
    lastModified: '2024-01-12',
    status: 'active',
    usageCount: 23,
    createdBy: 'Performance Team',
    description: 'Comprehensive performance review template',
    tags: ['performance', 'review', 'evaluation'],
    isFavorite: true
  },
  {
    id: '3',
    name: 'Employee Handbook',
    type: 'document',
    category: 'Policies',
    lastModified: '2024-01-10',
    status: 'active',
    usageCount: 156,
    createdBy: 'Legal Team',
    description: 'Company policies and procedures handbook',
    tags: ['policies', 'handbook', 'procedures'],
    isFavorite: false
  },
  {
    id: '4',
    name: 'Leave Request Form',
    type: 'form',
    category: 'Leave Management',
    lastModified: '2024-01-08',
    status: 'active',
    usageCount: 89,
    createdBy: 'HR Operations',
    description: 'Standard leave request application form',
    tags: ['leave', 'request', 'time-off'],
    isFavorite: false
  },
  {
    id: '5',
    name: 'Termination Letter',
    type: 'document',
    category: 'Offboarding',
    lastModified: '2024-01-05',
    status: 'active',
    usageCount: 12,
    createdBy: 'HR Director',
    description: 'Professional termination letter template',
    tags: ['termination', 'offboarding', 'separation'],
    isFavorite: false
  },
  {
    id: '6',
    name: 'Interview Feedback Form',
    type: 'form',
    category: 'Recruitment',
    lastModified: '2024-01-14',
    status: 'active',
    usageCount: 67,
    createdBy: 'Recruitment Team',
    description: 'Structured interview evaluation form',
    tags: ['interview', 'feedback', 'recruitment'],
    isFavorite: false
  },
  {
    id: '7',
    name: 'Training Completion Certificate',
    type: 'document',
    category: 'Training',
    lastModified: '2024-01-11',
    status: 'active',
    usageCount: 34,
    createdBy: 'L&D Team',
    description: 'Certificate template for training completion',
    tags: ['training', 'certificate', 'completion'],
    isFavorite: false
  },
  {
    id: '8',
    name: 'Employee Survey Template',
    type: 'form',
    category: 'Feedback',
    lastModified: '2024-01-09',
    status: 'draft',
    usageCount: 0,
    createdBy: 'HR Analytics',
    description: 'Employee satisfaction survey template',
    tags: ['survey', 'feedback', 'satisfaction'],
    isFavorite: false
  },
  {
    id: '9',
    name: 'Job Description Template',
    type: 'document',
    category: 'Recruitment',
    lastModified: '2024-01-07',
    status: 'active',
    usageCount: 78,
    createdBy: 'Recruitment Team',
    description: 'Standardized job description format',
    tags: ['job-description', 'recruitment', 'hiring'],
    isFavorite: false
  },
  {
    id: '10',
    name: 'Disciplinary Action Notice',
    type: 'document',
    category: 'Employee Relations',
    lastModified: '2024-01-06',
    status: 'active',
    usageCount: 8,
    createdBy: 'Employee Relations',
    description: 'Template for disciplinary action documentation',
    tags: ['disciplinary', 'action', 'employee-relations'],
    isFavorite: false
  }
]

const templateTypes = ['All', 'email', 'document', 'form']
const categories = ['All', 'Onboarding', 'Performance', 'Policies', 'Leave Management', 'Offboarding', 'Recruitment', 'Training', 'Feedback', 'Employee Relations']
const statuses = ['All', 'active', 'draft', 'archived']

const HRTemplatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'All' || template.type === selectedType
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || template.status === selectedStatus

    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-5 h-5" />
      case 'document': return <FileText className="w-5 h-5" />
      case 'form': return <File className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800'
      case 'document': return 'bg-purple-100 text-purple-800'
      case 'form': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
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

  const toggleFavorite = (templateId: string) => {
    // In a real app, this would update the backend
    console.log('Toggle favorite for template:', templateId)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-600 mt-2">Manage HR document templates, email templates, and forms</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Create Template
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">{mockTemplates.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Templates</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockTemplates.filter(t => t.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Usage</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockTemplates.reduce((sum, t) => sum + t.usageCount, 0)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft Templates</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockTemplates.filter(t => t.status === 'draft').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {templateTypes.map(type => (
              <option key={type} value={type}>{type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status === 'All' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(template.type)}`}>
                    {getTypeIcon(template.type)}
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                      {template.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className={`p-1 rounded hover:bg-gray-100 ${template.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
                  >
                    <Star size={16} fill={template.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              {/* Template Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      +{template.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Template Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Used {template.usageCount} times</span>
                <span>Modified {new Date(template.lastModified).toLocaleDateString()}</span>
              </div>

              {/* Template Actions */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">By {template.createdBy}</span>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors">
                    <Copy size={16} />
                  </button>
                  <button className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New Template</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  placeholder="Enter template name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>email</option>
                    <option>document</option>
                    <option>form</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Onboarding</option>
                    <option>Performance</option>
                    <option>Policies</option>
                    <option>Leave Management</option>
                    <option>Offboarding</option>
                    <option>Recruitment</option>
                    <option>Training</option>
                    <option>Feedback</option>
                    <option>Employee Relations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter template description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="Enter tags separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Template Preview</h3>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Template Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedTemplate.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{selectedTemplate.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedTemplate.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTemplate.status)}`}>
                        {selectedTemplate.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usage Count:</span>
                      <span className="font-medium">{selectedTemplate.usageCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created By:</span>
                      <span className="font-medium">{selectedTemplate.createdBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Modified:</span>
                      <span className="font-medium">{new Date(selectedTemplate.lastModified).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-medium text-gray-900 mb-2 mt-4">Description</h4>
                  <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Template Content Preview</h4>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="text-center text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p>Template content preview would be displayed here</p>
                    <p className="text-sm">Showing the actual template content based on type</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Template
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRTemplatesPage
