import React, { useState } from 'react'
import { 
  Archive, 
  RefreshCw, 
  Eye, 
  Trash2, 
  Search, 
  Filter, 
  Calendar,
  Users,
  Clock,
  BookOpen,
  AlertCircle
} from 'lucide-react'

interface ArchivedProgram {
  id: string
  title: string
  description: string
  category: string
  duration: string
  archivedDate: string
  archivedReason: string
  lastActiveDate: string
  totalEnrollments: number
  completionRate: number
  createdBy: string
  archivedBy: string
  canRestore: boolean
  tags: string[]
}

const ArchivedProgramsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedReason, setSelectedReason] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const mockArchivedPrograms: ArchivedProgram[] = [
    {
      id: '1',
      title: 'Legacy Software Training',
      description: 'Training program for outdated software systems that are no longer in use by the company.',
      category: 'Technical Skills',
      duration: '3 weeks',
      archivedDate: '2024-01-10',
      archivedReason: 'Technology Deprecated',
      lastActiveDate: '2023-12-15',
      totalEnrollments: 45,
      completionRate: 78,
      createdBy: 'Mike Chen',
      archivedBy: 'Sarah Johnson',
      canRestore: false,
      tags: ['legacy', 'software', 'deprecated']
    },
    {
      id: '2',
      title: 'Old Compliance Protocol',
      description: 'Previous compliance training that covered outdated regulatory requirements and procedures.',
      category: 'Compliance Training',
      duration: '2 weeks',
      archivedDate: '2024-01-05',
      archivedReason: 'Regulations Updated',
      lastActiveDate: '2023-12-20',
      totalEnrollments: 89,
      completionRate: 92,
      createdBy: 'Robert Wilson',
      archivedBy: 'Lisa Rodriguez',
      canRestore: false,
      tags: ['compliance', 'regulations', 'outdated']
    },
    {
      id: '3',
      title: 'Seasonal Sales Training 2023',
      description: 'Sales training program specifically designed for the 2023 holiday season campaigns.',
      category: 'Sales Training',
      duration: '1 week',
      archivedDate: '2024-01-01',
      archivedReason: 'Seasonal Program',
      lastActiveDate: '2023-12-31',
      totalEnrollments: 67,
      completionRate: 85,
      createdBy: 'David Thompson',
      archivedBy: 'David Thompson',
      canRestore: true,
      tags: ['seasonal', 'sales', 'holiday']
    },
    {
      id: '4',
      title: 'Basic Excel Workshop',
      description: 'Fundamental Excel training that has been replaced by more comprehensive digital skills programs.',
      category: 'Technical Skills',
      duration: '2 weeks',
      archivedDate: '2023-12-28',
      archivedReason: 'Replaced by Better Program',
      lastActiveDate: '2023-12-15',
      totalEnrollments: 156,
      completionRate: 88,
      createdBy: 'Jennifer Lee',
      archivedBy: 'Mike Chen',
      canRestore: true,
      tags: ['excel', 'basic', 'replaced']
    },
    {
      id: '5',
      title: 'Customer Service Basics',
      description: 'Introductory customer service training that has been consolidated into a comprehensive program.',
      category: 'Customer Service',
      duration: '2 weeks',
      archivedDate: '2023-12-20',
      archivedReason: 'Consolidated',
      lastActiveDate: '2023-12-10',
      totalEnrollments: 234,
      completionRate: 91,
      createdBy: 'Lisa Rodriguez',
      archivedBy: 'Sarah Johnson',
      canRestore: true,
      tags: ['customer service', 'basics', 'consolidated']
    },
    {
      id: '6',
      title: 'Old Product Training',
      description: 'Training for products that have been discontinued or significantly updated.',
      category: 'Product Training',
      duration: '1 week',
      archivedDate: '2023-12-15',
      archivedReason: 'Product Discontinued',
      lastActiveDate: '2023-12-05',
      totalEnrollments: 78,
      completionRate: 76,
      createdBy: 'Jennifer Lee',
      archivedBy: 'Jennifer Lee',
      canRestore: false,
      tags: ['product', 'discontinued', 'outdated']
    }
  ]

  const categories = ['All Categories', 'Technical Skills', 'Compliance Training', 'Sales Training', 'Customer Service', 'Product Training', 'Leadership Development', 'Soft Skills']
  const archiveReasons = ['All Reasons', 'Technology Deprecated', 'Regulations Updated', 'Seasonal Program', 'Replaced by Better Program', 'Consolidated', 'Product Discontinued']

  const filteredPrograms = mockArchivedPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All Categories' || program.category === selectedCategory
    const matchesReason = selectedReason === '' || selectedReason === 'All Reasons' || program.archivedReason === selectedReason

    return matchesSearch && matchesCategory && matchesReason
  })

  const handleRestoreProgram = (programId: string) => {
    console.log('Restoring program:', programId)
    // Show confirmation dialog and restore program
  }

  const handleViewProgram = (programId: string) => {
    console.log('Viewing program:', programId)
    // Navigate to program details view
  }

  const handleDeleteProgram = (programId: string) => {
    console.log('Deleting program:', programId)
    // Show confirmation dialog and permanently delete program
  }

  const handleBulkRestore = () => {
    const restorablePrograms = filteredPrograms.filter(program => program.canRestore)
    console.log('Bulk restoring programs:', restorablePrograms.map(p => p.id))
    // Show confirmation dialog and restore multiple programs
  }

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'Technology Deprecated': return 'bg-red-100 text-red-800'
      case 'Regulations Updated': return 'bg-orange-100 text-orange-800'
      case 'Seasonal Program': return 'bg-blue-100 text-blue-800'
      case 'Replaced by Better Program': return 'bg-green-100 text-green-800'
      case 'Consolidated': return 'bg-purple-100 text-purple-800'
      case 'Product Discontinued': return 'bg-red-100 text-red-800'
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

  const getDaysSinceArchived = (archivedDate: string) => {
    const archived = new Date(archivedDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - archived.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Archived Programs</h1>
        <p className="text-gray-600">View and manage archived training programs</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Archive className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Archived</p>
              <p className="text-2xl font-bold text-gray-900">{mockArchivedPrograms.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <RefreshCw className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Can Restore</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockArchivedPrograms.filter(program => program.canRestore).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockArchivedPrograms.reduce((sum, program) => sum + program.totalEnrollments, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Days Archived</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(mockArchivedPrograms.reduce((sum, program) => sum + getDaysSinceArchived(program.archivedDate), 0) / mockArchivedPrograms.length)}
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
                placeholder="Search archived programs..."
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
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {archiveReasons.map((reason) => (
                <option key={reason} value={reason}>{reason}</option>
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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBulkRestore}
                disabled={filteredPrograms.filter(p => p.canRestore).length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Restore Selected
              </button>
              <span className="text-sm text-gray-500">
                {filteredPrograms.filter(p => p.canRestore).length} programs can be restored
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Archived Programs Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{program.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getReasonColor(program.archivedReason)}`}>
                      {program.archivedReason}
                    </span>
                    {!program.canRestore && (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        Cannot Restore
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium text-gray-900">{program.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-900">{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Archived:</span>
                    <span className="font-medium text-gray-900">{formatDate(program.archivedDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Enrollments:</span>
                    <span className="font-medium text-gray-900">{program.totalEnrollments}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completion:</span>
                    <span className="font-medium text-gray-900">{program.completionRate}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Created by {program.createdBy}</span>
                  <span>Archived by {program.archivedBy}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProgram(program.id)}
                    className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  {program.canRestore && (
                    <button
                      onClick={() => handleRestoreProgram(program.id)}
                      className="px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Restore
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteProgram(program.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md"
                    title="Delete Permanently"
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
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Archived Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollments
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
                {filteredPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{program.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{program.description}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {program.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {program.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(program.archivedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getReasonColor(program.archivedReason)}`}>
                        {program.archivedReason}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {program.totalEnrollments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {program.canRestore ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Can Restore
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Cannot Restore
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewProgram(program.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          View
                        </button>
                        {program.canRestore && (
                          <button
                            onClick={() => handleRestoreProgram(program.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Restore
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteProgram(program.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
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

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <Archive className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No archived programs found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Archive Information */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-2">About Archived Programs</h3>
            <p className="text-sm text-blue-700 mb-3">
              Programs are automatically archived when they become outdated, are replaced by newer versions, 
              or are no longer relevant. Archived programs can be restored if they become relevant again, 
              or permanently deleted if they are no longer needed.
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Can Restore:</strong> Programs that can be reactivated and used again</li>
              <li>• <strong>Cannot Restore:</strong> Programs that are permanently outdated or replaced</li>
              <li>• <strong>Bulk Restore:</strong> Restore multiple programs at once</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchivedProgramsPage
