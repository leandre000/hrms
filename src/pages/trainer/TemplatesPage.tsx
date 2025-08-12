import React, { useState } from 'react'
import { 
  BookOpen, 
  Copy, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Plus,
  Star,
  Users,
  Clock,
  Target
} from 'lucide-react'

interface ProgramTemplate {
  id: string
  title: string
  description: string
  category: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  usageCount: number
  lastUsed: string
  createdBy: string
  tags: string[]
  estimatedHours: number
  maxParticipants: number
  isPublic: boolean
}

const TemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const mockTemplates: ProgramTemplate[] = [
    {
      id: '1',
      title: 'Leadership Fundamentals',
      description: 'A comprehensive program covering essential leadership skills including communication, decision-making, and team management.',
      category: 'Leadership Development',
      duration: '6 weeks',
      difficulty: 'intermediate',
      rating: 4.8,
      usageCount: 156,
      lastUsed: '2024-01-15',
      createdBy: 'Sarah Johnson',
      tags: ['leadership', 'management', 'communication'],
      estimatedHours: 24,
      maxParticipants: 25,
      isPublic: true
    },
    {
      id: '2',
      title: 'Technical Skills Bootcamp',
      description: 'Intensive technical training covering programming fundamentals, database management, and system architecture.',
      category: 'Technical Skills',
      duration: '4 weeks',
      difficulty: 'advanced',
      rating: 4.6,
      usageCount: 89,
      lastUsed: '2024-01-10',
      createdBy: 'Mike Chen',
      tags: ['programming', 'database', 'architecture'],
      estimatedHours: 32,
      maxParticipants: 20,
      isPublic: true
    },
    {
      id: '3',
      title: 'Customer Service Excellence',
      description: 'Training program focused on delivering exceptional customer service through active listening and problem-solving.',
      category: 'Soft Skills',
      duration: '3 weeks',
      difficulty: 'beginner',
      rating: 4.9,
      usageCount: 234,
      lastUsed: '2024-01-12',
      createdBy: 'Lisa Rodriguez',
      tags: ['customer service', 'communication', 'problem-solving'],
      estimatedHours: 18,
      maxParticipants: 30,
      isPublic: true
    },
    {
      id: '4',
      title: 'Sales Mastery Program',
      description: 'Advanced sales techniques including prospecting, negotiation, and closing strategies for experienced sales professionals.',
      category: 'Sales Training',
      duration: '5 weeks',
      difficulty: 'advanced',
      rating: 4.7,
      usageCount: 67,
      lastUsed: '2024-01-08',
      createdBy: 'David Thompson',
      tags: ['sales', 'negotiation', 'prospecting'],
      estimatedHours: 28,
      maxParticipants: 18,
      isPublic: false
    },
    {
      id: '5',
      title: 'Safety Compliance Training',
      description: 'Comprehensive safety training covering workplace hazards, emergency procedures, and regulatory compliance requirements.',
      category: 'Safety Training',
      duration: '2 weeks',
      difficulty: 'beginner',
      rating: 4.5,
      usageCount: 312,
      lastUsed: '2024-01-14',
      createdBy: 'Robert Wilson',
      tags: ['safety', 'compliance', 'workplace'],
      estimatedHours: 12,
      maxParticipants: 40,
      isPublic: true
    },
    {
      id: '6',
      title: 'Product Knowledge Workshop',
      description: 'In-depth training on company products, features, benefits, and competitive positioning for sales and support teams.',
      category: 'Product Training',
      duration: '1 week',
      difficulty: 'intermediate',
      rating: 4.4,
      usageCount: 178,
      lastUsed: '2024-01-11',
      createdBy: 'Jennifer Lee',
      tags: ['product', 'features', 'competitive'],
      estimatedHours: 8,
      maxParticipants: 35,
      isPublic: true
    }
  ]

  const categories = ['All Categories', 'Leadership Development', 'Technical Skills', 'Soft Skills', 'Sales Training', 'Safety Training', 'Product Training', 'Customer Service']
  const difficulties = ['All Levels', 'beginner', 'intermediate', 'advanced']

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All Categories' || template.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === '' || selectedDifficulty === 'All Levels' || template.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleUseTemplate = (templateId: string) => {
    console.log('Using template:', templateId)
    // Navigate to create program page with template data
  }

  const handleEditTemplate = (templateId: string) => {
    console.log('Editing template:', templateId)
    // Navigate to edit template page
  }

  const handleDeleteTemplate = (templateId: string) => {
    console.log('Deleting template:', templateId)
    // Show confirmation dialog and delete template
  }

  const handleDuplicateTemplate = (templateId: string) => {
    console.log('Duplicating template:', templateId)
    // Create a copy of the template
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Program Templates</h1>
        <p className="text-gray-600">Browse and use pre-designed training program templates</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">{mockTemplates.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Usage</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockTemplates.reduce((sum, template) => sum + template.usageCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {(mockTemplates.reduce((sum, template) => sum + template.rating, 0) / mockTemplates.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Public Templates</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockTemplates.filter(template => template.isPublic).length}
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
                placeholder="Search templates..."
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
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'All Levels' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
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
      </div>

      {/* Templates Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>
                  </div>
                  {!template.isPublic && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      Private
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium text-gray-900">{template.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-900">{template.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Difficulty:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(template.rating)}
                      <span className="ml-1 text-sm text-gray-600">({template.rating})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Used {template.usageCount} times</span>
                  <span>By {template.createdBy}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Use Template
                  </button>
                  <button
                    onClick={() => handleDuplicateTemplate(template.id)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditTemplate(template.id)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{template.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{template.description}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {template.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {template.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {template.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {renderStars(template.rating)}
                        <span className="ml-1 text-sm text-gray-600">({template.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {template.usageCount} times
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUseTemplate(template.id)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Use
                        </button>
                        <button
                          onClick={() => handleDuplicateTemplate(template.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => handleEditTemplate(template.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Edit
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

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No templates found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}

export default TemplatesPage
