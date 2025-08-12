import React, { useState } from 'react'
import {
  BookOpen,
  FileText,
  Video,
  Image,
  Download,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Share,
  Star,
  Clock,
  Users,
  FolderOpen
} from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string
  type: 'Document' | 'Video' | 'Image' | 'Presentation' | 'Template' | 'Guide'
  category: string
  tags: string[]
  fileSize: string
  uploadDate: string
  lastModified: string
  uploader: string
  downloads: number
  rating: number
  isPublic: boolean
  isFeatured: boolean
}

interface ResourceCategory {
  id: string
  name: string
  description: string
  resourceCount: number
  icon: string
}

const mockCategories: ResourceCategory[] = [
  {
    id: '1',
    name: 'Project Management',
    description: 'Templates, guides, and resources for project management',
    resourceCount: 24,
    icon: '📊'
  },
  {
    id: '2',
    name: 'Agile Development',
    description: 'Agile methodologies, Scrum guides, and templates',
    resourceCount: 18,
    icon: '🔄'
  },
  {
    id: '3',
    name: 'Data Analysis',
    description: 'Data analysis tools, techniques, and examples',
    resourceCount: 32,
    icon: '📈'
  },
  {
    id: '4',
    name: 'Leadership',
    description: 'Leadership development materials and guides',
    resourceCount: 15,
    icon: '👥'
  }
]

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Project Charter Template',
    description: 'Comprehensive project charter template with stakeholder analysis and risk assessment sections',
    type: 'Template',
    category: 'Project Management',
    tags: ['Template', 'Project Charter', 'Stakeholder Analysis', 'Risk Assessment'],
    fileSize: '2.4 MB',
    uploadDate: '2024-12-20',
    lastModified: '2024-12-20',
    uploader: 'Sarah Johnson',
    downloads: 156,
    rating: 4.8,
    isPublic: true,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Agile Sprint Planning Guide',
    description: 'Step-by-step guide for effective sprint planning in Agile development',
    type: 'Guide',
    category: 'Agile Development',
    tags: ['Agile', 'Sprint Planning', 'Guide', 'Best Practices'],
    fileSize: '1.8 MB',
    uploadDate: '2024-12-19',
    lastModified: '2024-12-19',
    uploader: 'Sarah Johnson',
    downloads: 89,
    rating: 4.6,
    isPublic: true,
    isFeatured: false
  },
  {
    id: '3',
    title: 'Data Visualization Best Practices',
    description: 'Comprehensive guide to creating effective data visualizations and charts',
    type: 'Guide',
    category: 'Data Analysis',
    tags: ['Data Visualization', 'Charts', 'Best Practices', 'Design'],
    fileSize: '3.2 MB',
    uploadDate: '2024-12-18',
    lastModified: '2024-12-18',
    uploader: 'Sarah Johnson',
    downloads: 234,
    rating: 4.9,
    isPublic: true,
    isFeatured: true
  }
]

const ResourceLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [showUploadForm, setShowUploadForm] = useState(false)

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'all' || resource.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter
    
    return matchesSearch && matchesType && matchesCategory
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Document': return <FileText className="w-5 h-5 text-blue-600" />
      case 'Video': return <Video className="w-5 h-5 text-red-600" />
      case 'Image': return <Image className="w-5 h-5 text-green-600" />
      case 'Presentation': return <BookOpen className="w-5 h-5 text-purple-600" />
      case 'Template': return <FileText className="w-5 h-5 text-orange-600" />
      case 'Guide': return <BookOpen className="w-5 h-5 text-indigo-600" />
      default: return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Document': return 'bg-blue-100 text-blue-800'
      case 'Video': return 'bg-red-100 text-red-800'
      case 'Image': return 'bg-green-100 text-green-800'
      case 'Presentation': return 'bg-purple-100 text-purple-800'
      case 'Template': return 'bg-orange-100 text-orange-800'
      case 'Guide': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    totalResources: mockResources.length,
    totalDownloads: mockResources.reduce((sum, resource) => sum + resource.downloads, 0),
    featuredResources: mockResources.filter(resource => resource.isFeatured).length,
    publicResources: mockResources.filter(resource => resource.isPublic).length
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
          <p className="text-gray-600">Manage and organize training materials and resources</p>
        </div>
        <button 
          onClick={() => setShowUploadForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Upload Resource
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Resources</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalResources}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalDownloads}</p>
            </div>
            <Download className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.featuredResources}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Public</p>
              <p className="text-2xl font-bold text-purple-600">{stats.publicResources}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockCategories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <h4 className="font-medium text-gray-900">{category.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{category.resourceCount} resources</span>
                <FolderOpen className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Document">Document</option>
              <option value="Video">Video</option>
              <option value="Image">Image</option>
              <option value="Presentation">Presentation</option>
              <option value="Template">Template</option>
              <option value="Guide">Guide</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {mockCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
                          {resource.isFeatured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{resource.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                              {tag}
                            </span>
                          ))}
                          {resource.tags.length > 3 && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              +{resource.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                      <div className="text-sm text-gray-900">{resource.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{resource.uploader}</div>
                      <div className="text-gray-500">
                        <div>Size: {resource.fileSize}</div>
                        <div>Uploaded: {resource.uploadDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {resource.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          {resource.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Modified: {resource.lastModified}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedResource(resource)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Share className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Bulk Download</h4>
                <p className="text-sm text-gray-500">Download multiple resources at once</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Share className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Share Collection</h4>
                <p className="text-sm text-gray-500">Share a collection of resources</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Featured Resources</h4>
                <p className="text-sm text-gray-500">Manage featured resource selection</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResourceLibraryPage
