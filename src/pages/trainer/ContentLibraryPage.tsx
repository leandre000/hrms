import React, { useState } from 'react'
import { 
  FileText, 
  Video, 
  Image, 
  File, 
  Search, 
  Filter, 
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  Folder,
  Upload,
  Link,
  Calendar,
  User,
  HardDrive
} from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  description: string
  type: 'video' | 'document' | 'image' | 'presentation' | 'audio' | 'interactive'
  category: string
  tags: string[]
  fileSize: string
  uploadDate: string
  uploadedBy: string
  downloads: number
  views: number
  isPublic: boolean
  fileUrl: string
  thumbnail?: string
}

const ContentLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const mockContent: ContentItem[] = [
    {
      id: '1',
      title: 'Leadership Presentation Template',
      description: 'Professional PowerPoint template for leadership training presentations with customizable slides and graphics.',
      type: 'presentation',
      category: 'Leadership Development',
      tags: ['leadership', 'presentation', 'template', 'powerpoint'],
      fileSize: '2.4 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'Sarah Johnson',
      downloads: 156,
      views: 342,
      isPublic: true,
      fileUrl: '/content/leadership-template.pptx'
    },
    {
      id: '2',
      title: 'Customer Service Training Video',
      description: 'High-quality video demonstrating effective customer service techniques and best practices.',
      type: 'video',
      category: 'Customer Service',
      tags: ['customer service', 'video', 'training', 'best practices'],
      fileSize: '45.2 MB',
      uploadDate: '2024-01-12',
      uploadedBy: 'Lisa Rodriguez',
      downloads: 89,
      views: 234,
      isPublic: true,
      fileUrl: '/content/customer-service-video.mp4',
      thumbnail: '/thumbnails/customer-service.jpg'
    },
    {
      id: '3',
      title: 'Technical Skills Assessment',
      description: 'Comprehensive assessment template for evaluating technical skills across various domains.',
      type: 'document',
      category: 'Technical Skills',
      tags: ['assessment', 'technical', 'evaluation', 'template'],
      fileSize: '1.8 MB',
      uploadDate: '2024-01-10',
      uploadedBy: 'Mike Chen',
      downloads: 234,
      views: 567,
      isPublic: true,
      fileUrl: '/content/technical-assessment.docx'
    },
    {
      id: '4',
      title: 'Sales Training Infographic',
      description: 'Visual infographic covering key sales techniques and strategies for training purposes.',
      type: 'image',
      category: 'Sales Training',
      tags: ['sales', 'infographic', 'visual', 'training'],
      fileSize: '3.1 MB',
      uploadDate: '2024-01-08',
      uploadedBy: 'David Thompson',
      downloads: 178,
      views: 445,
      isPublic: true,
      fileUrl: '/content/sales-infographic.png'
    },
    {
      id: '5',
      title: 'Compliance Training Audio',
      description: 'Audio recording covering essential compliance topics and regulatory requirements.',
      type: 'audio',
      category: 'Compliance Training',
      tags: ['compliance', 'audio', 'regulations', 'training'],
      fileSize: '28.7 MB',
      uploadDate: '2024-01-05',
      uploadedBy: 'Robert Wilson',
      downloads: 67,
      views: 123,
      isPublic: false,
      fileUrl: '/content/compliance-audio.mp3'
    },
    {
      id: '6',
      title: 'Interactive Learning Module',
      description: 'HTML5 interactive module for hands-on learning experiences with embedded assessments.',
      type: 'interactive',
      category: 'Technical Skills',
      tags: ['interactive', 'html5', 'learning', 'assessment'],
      fileSize: '15.3 MB',
      uploadDate: '2024-01-03',
      uploadedBy: 'Jennifer Lee',
      downloads: 45,
      views: 89,
      isPublic: true,
      fileUrl: '/content/interactive-module.html'
    }
  ]

  const categories = ['All Categories', 'Leadership Development', 'Customer Service', 'Technical Skills', 'Sales Training', 'Compliance Training', 'Product Training', 'Safety Training']
  const contentTypes = ['All Types', 'video', 'document', 'image', 'presentation', 'audio', 'interactive']

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All Categories' || item.category === selectedCategory
    const matchesType = selectedType === '' || selectedType === 'All Types' || item.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const handleDownload = (itemId: string) => {
    console.log('Downloading item:', itemId)
    // Handle download logic
  }

  const handleView = (itemId: string) => {
    console.log('Viewing item:', itemId)
    // Handle view logic
  }

  const handleEdit = (itemId: string) => {
    console.log('Editing item:', itemId)
    // Handle edit logic
  }

  const handleDelete = (itemId: string) => {
    console.log('Deleting item:', itemId)
    // Handle delete logic
  }

  const handleBulkDownload = () => {
    console.log('Bulk downloading items:', selectedItems)
    // Handle bulk download logic
  }

  const handleBulkDelete = () => {
    console.log('Bulk deleting items:', selectedItems)
    // Handle bulk delete logic
  }

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video
      case 'document': return FileText
      case 'image': return Image
      case 'presentation': return File
      case 'audio': return File
      case 'interactive': return File
      default: return File
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800'
      case 'document': return 'bg-blue-100 text-blue-800'
      case 'image': return 'bg-green-100 text-green-800'
      case 'presentation': return 'bg-purple-100 text-purple-800'
      case 'audio': return 'bg-yellow-100 text-yellow-800'
      case 'interactive': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getFileSizeColor = (fileSize: string) => {
    const size = parseFloat(fileSize.split(' ')[0])
    if (size < 5) return 'text-green-600'
    if (size < 20) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Library</h1>
        <p className="text-gray-600">Manage and organize your training content, materials, and resources</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-bold text-gray-900">{mockContent.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <HardDrive className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockContent.reduce((sum, item) => {
                  const size = parseFloat(item.fileSize.split(' ')[0])
                  return sum + size
                }, 0).toFixed(1)} MB
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockContent.reduce((sum, item) => sum + item.downloads, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockContent.reduce((sum, item) => sum + item.views, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {contentTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'All Types' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'} border-r border-gray-300`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedItems.length} items selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkDownload}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Selected
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => {
            const TypeIcon = getTypeIcon(item.type)
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                        {!item.isPublic && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            Private
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium text-gray-900">{item.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">File Size:</span>
                      <span className={`font-medium ${getFileSizeColor(item.fileSize)}`}>{item.fileSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Downloads:</span>
                      <span className="font-medium text-gray-900">{item.downloads}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Views:</span>
                      <span className="font-medium text-gray-900">{item.views}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By {item.uploadedBy}</span>
                    <span>{formatDate(item.uploadDate)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(item.id)}
                      className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(item.id)}
                      className="px-3 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredContent.length && filteredContent.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(filteredContent.map(item => item.id))
                        } else {
                          setSelectedItems([])
                        }
                      }}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContent.map((item) => {
                  const TypeIcon = getTypeIcon(item.type)
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              <TypeIcon className="w-5 h-5 text-gray-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{item.description}</div>
                            <div className="flex items-center gap-2 mt-1">
                              {item.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 3 && (
                                <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={getFileSizeColor(item.fileSize)}>{item.fileSize}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.downloads}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(item.id)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(item.id)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Upload Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Upload New Content</h3>
          <p className="mt-1 text-sm text-gray-500">
            Drag and drop files here, or click to browse
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Files
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentLibraryPage
