import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Copy, 
  Download, 
  Award, 
  FileText, 
  Palette,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  Settings
} from 'lucide-react'

interface CertificateTemplate {
  id: string
  name: string
  description: string
  category: string
  designType: 'Professional' | 'Creative' | 'Minimal' | 'Corporate'
  status: 'Active' | 'Draft' | 'Archived'
  lastUsed: string
  usageCount: number
  createdBy: string
  lastModified: string
  previewUrl: string
  fields: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

const mockTemplates: CertificateTemplate[] = [
  {
    id: '1',
    name: 'Professional Achievement',
    description: 'Elegant professional certificate for corporate achievements',
    category: 'Professional Development',
    designType: 'Professional',
    status: 'Active',
    lastUsed: '2024-01-20',
    usageCount: 45,
    createdBy: 'Dr. Michael Chen',
    lastModified: '2024-01-15',
    previewUrl: '/templates/professional-achievement',
    fields: ['Learner Name', 'Program Name', 'Completion Date', 'Score', 'Instructor'],
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#3b82f6'
    }
  },
  {
    id: '2',
    name: 'Creative Excellence',
    description: 'Modern and creative design for innovative programs',
    category: 'Creative Arts',
    designType: 'Creative',
    status: 'Active',
    lastUsed: '2024-01-18',
    usageCount: 32,
    createdBy: 'Prof. Lisa Wang',
    lastModified: '2024-01-10',
    previewUrl: '/templates/creative-excellence',
    fields: ['Learner Name', 'Program Name', 'Completion Date', 'Achievement Level'],
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#f59e0b'
    }
  },
  {
    id: '3',
    name: 'Minimal Success',
    description: 'Clean and minimal design focusing on content',
    category: 'Technical Skills',
    designType: 'Minimal',
    status: 'Active',
    lastUsed: '2024-01-15',
    usageCount: 28,
    createdBy: 'Dr. Robert Smith',
    lastModified: '2024-01-08',
    previewUrl: '/templates/minimal-success',
    fields: ['Learner Name', 'Program Name', 'Completion Date', 'Score'],
    colors: {
      primary: '#374151',
      secondary: '#9ca3af',
      accent: '#10b981'
    }
  },
  {
    id: '4',
    name: 'Corporate Recognition',
    description: 'Formal corporate certificate for business programs',
    category: 'Business',
    designType: 'Corporate',
    status: 'Draft',
    lastUsed: '2024-01-12',
    usageCount: 15,
    createdBy: 'Prof. Amanda Lee',
    lastModified: '2024-01-05',
    previewUrl: '/templates/corporate-recognition',
    fields: ['Learner Name', 'Program Name', 'Completion Date', 'Department', 'Manager'],
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444',
      accent: '#fbbf24'
    }
  },
  {
    id: '5',
    name: 'Leadership Achievement',
    description: 'Prestigious certificate for leadership programs',
    category: 'Leadership',
    designType: 'Professional',
    status: 'Active',
    lastUsed: '2024-01-10',
    usageCount: 38,
    createdBy: 'Dr. Kevin Brown',
    lastModified: '2024-01-03',
    previewUrl: '/templates/leadership-achievement',
    fields: ['Learner Name', 'Program Name', 'Completion Date', 'Leadership Level', 'Endorsements'],
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#f59e0b'
    }
  }
]

const CertificateTemplatesPage = () => {
  const [templates, setTemplates] = useState<CertificateTemplate[]>(mockTemplates)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [designFilter, setDesignFilter] = useState('All')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate | null>(null)

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || template.category === categoryFilter
    const matchesDesign = designFilter === 'All' || template.designType === designFilter
    return matchesSearch && matchesCategory && matchesDesign
  })

  const stats = {
    total: templates.length,
    active: templates.filter(t => t.status === 'Active').length,
    draft: templates.filter(t => t.status === 'Draft').length,
    archived: templates.filter(t => t.status === 'Archived').length
  }

  const handleEditTemplate = (template: CertificateTemplate) => {
    setSelectedTemplate(template)
    setShowEditModal(true)
  }

  const handleDuplicateTemplate = (template: CertificateTemplate) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      status: 'Draft' as const,
      usageCount: 0,
      lastUsed: '',
      lastModified: new Date().toISOString().split('T')[0]
    }
    setTemplates(prev => [newTemplate, ...prev])
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDesignColor = (designType: string) => {
    switch (designType) {
      case 'Professional': return 'bg-blue-100 text-blue-800'
      case 'Creative': return 'bg-purple-100 text-purple-800'
      case 'Minimal': return 'bg-gray-100 text-gray-800'
      case 'Corporate': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Templates</h1>
        <p className="text-gray-600">Create and manage certificate templates for different programs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <XCircle className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Archived</p>
              <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </button>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Categories</option>
              <option value="Professional Development">Professional Development</option>
              <option value="Creative Arts">Creative Arts</option>
              <option value="Technical Skills">Technical Skills</option>
              <option value="Business">Business</option>
              <option value="Leadership">Leadership</option>
            </select>
            
            <select
              value={designFilter}
              onChange={(e) => setDesignFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Designs</option>
              <option value="Professional">Professional</option>
              <option value="Creative">Creative</option>
              <option value="Minimal">Minimal</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Template Preview */}
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              <div className="text-center">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Template Preview</p>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                  {template.status}
                </span>
              </div>
              
              {/* Design Type Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDesignColor(template.designType)}`}>
                  {template.designType}
                </span>
              </div>
            </div>
            
            {/* Template Info */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>Category: {template.category}</span>
                  <span>Used {template.usageCount} times</span>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Created by: {template.createdBy}</p>
                  <p>Last modified: {template.lastModified}</p>
                </div>
              </div>
              
              {/* Color Palette Preview */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Color Scheme:</p>
                <div className="flex space-x-2">
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-200" 
                    style={{ backgroundColor: template.colors.primary }}
                    title="Primary"
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-200" 
                    style={{ backgroundColor: template.colors.secondary }}
                    title="Secondary"
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-200" 
                    style={{ backgroundColor: template.colors.accent }}
                    title="Accent"
                  ></div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTemplate(template)}
                  className="flex-1 px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                
                <button
                  onClick={() => handleDuplicateTemplate(template)}
                  className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="px-3 py-2 text-sm border border-gray-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Template</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter template name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Enter template description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>Professional Development</option>
                  <option>Creative Arts</option>
                  <option>Technical Skills</option>
                  <option>Business</option>
                  <option>Leadership</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>Professional</option>
                  <option>Creative</option>
                  <option>Minimal</option>
                  <option>Corporate</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Create Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificateTemplatesPage
