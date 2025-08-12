import React, { useState } from 'react'
import {
  ExternalLink,
  Globe,
  BookOpen,
  Video,
  Link,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Clock,
  Users,
  Search,
  Filter,
  Share,
  Bookmark
} from 'lucide-react'

interface ExternalResource {
  id: string
  title: string
  description: string
  url: string
  type: 'Article' | 'Video' | 'Course' | 'Tool' | 'Documentation' | 'Community'
  category: string
  tags: string[]
  language: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  isBookmarked: boolean
  isFeatured: boolean
  lastVerified: string
  addedDate: string
  addedBy: string
  visitCount: number
}

const mockResources: ExternalResource[] = [
  {
    id: '1',
    title: 'React Documentation',
    description: 'Official React documentation with tutorials and API reference',
    url: 'https://react.dev',
    type: 'Documentation',
    category: 'Programming',
    tags: ['React', 'JavaScript', 'Frontend'],
    language: 'English',
    difficulty: 'Beginner',
    rating: 4.9,
    isBookmarked: true,
    isFeatured: true,
    lastVerified: '2024-12-20',
    addedDate: '2024-12-15',
    addedBy: 'Sarah Johnson',
    visitCount: 234
  }
]

const ExternalResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<ExternalResource[]>(mockResources)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">External Resources</h1>
          <p className="text-gray-600">Manage external learning links, tools, and references</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
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
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
                          {resource.isFeatured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                          {resource.isBookmarked && <Bookmark className="w-4 h-4 text-blue-400 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <span>Added by {resource.addedBy}</span>
                          <span>•</span>
                          <span>{resource.addedDate}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        {resource.category}
                      </span>
                      <div className="text-sm text-gray-900">{resource.type}</div>
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                        {resource.difficulty}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button className="text-green-600 hover:text-green-900">
                        <Eye className="w-4 h-4" />
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
          <Globe className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ExternalResourcesPage
