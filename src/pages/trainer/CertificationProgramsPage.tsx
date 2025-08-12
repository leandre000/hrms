import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Archive, 
  Users, 
  Clock, 
  Award,
  Calendar,
  BookOpen,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface CertificationProgram {
  id: string
  name: string
  description: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  duration: string
  requirements: string[]
  modules: number
  totalHours: number
  status: 'Active' | 'Draft' | 'Archived' | 'Expired'
  validityPeriod: string
  passingScore: number
  enrolledLearners: number
  completionRate: number
  lastUpdated: string
  createdBy: string
}

const mockCertificationPrograms: CertificationProgram[] = [
  {
    id: '1',
    name: 'Project Management Professional (PMP)',
    description: 'Comprehensive project management certification covering methodologies, tools, and best practices.',
    category: 'Project Management',
    level: 'Advanced',
    duration: '6 months',
    requirements: ['Bachelor\'s degree', '3 years experience', '4500 hours leading projects'],
    modules: 12,
    totalHours: 120,
    status: 'Active',
    validityPeriod: '3 years',
    passingScore: 75,
    enrolledLearners: 45,
    completionRate: 78,
    lastUpdated: '2024-01-15',
    createdBy: 'John Smith'
  },
  {
    id: '2',
    name: 'Data Science Fundamentals',
    description: 'Foundation course in data science covering statistics, programming, and machine learning basics.',
    category: 'Data Science',
    level: 'Beginner',
    duration: '4 months',
    requirements: ['Basic math skills', 'No prior experience required'],
    modules: 8,
    totalHours: 80,
    status: 'Active',
    validityPeriod: '2 years',
    passingScore: 70,
    enrolledLearners: 67,
    completionRate: 85,
    lastUpdated: '2024-01-10',
    createdBy: 'Sarah Johnson'
  },
  {
    id: '3',
    name: 'Cybersecurity Specialist',
    description: 'Advanced cybersecurity certification covering threat analysis, incident response, and security architecture.',
    category: 'Cybersecurity',
    level: 'Expert',
    duration: '8 months',
    requirements: ['5 years IT experience', 'Network security background', 'Security+ certification'],
    modules: 15,
    totalHours: 160,
    status: 'Active',
    validityPeriod: '3 years',
    passingScore: 80,
    enrolledLearners: 23,
    completionRate: 65,
    lastUpdated: '2024-01-08',
    createdBy: 'Mike Chen'
  },
  {
    id: '4',
    name: 'Digital Marketing Strategy',
    description: 'Comprehensive digital marketing certification covering SEO, social media, and analytics.',
    category: 'Marketing',
    level: 'Intermediate',
    duration: '5 months',
    requirements: ['Basic marketing knowledge', 'Social media experience'],
    modules: 10,
    totalHours: 100,
    status: 'Draft',
    validityPeriod: '2 years',
    passingScore: 70,
    enrolledLearners: 0,
    completionRate: 0,
    lastUpdated: '2024-01-12',
    createdBy: 'Lisa Wang'
  },
  {
    id: '5',
    name: 'Agile Scrum Master',
    description: 'Agile methodology certification focusing on Scrum framework and team leadership.',
    category: 'Agile',
    level: 'Intermediate',
    duration: '3 months',
    requirements: ['Project experience', 'Team collaboration skills'],
    modules: 6,
    totalHours: 60,
    status: 'Active',
    validityPeriod: '2 years',
    passingScore: 75,
    enrolledLearners: 89,
    completionRate: 92,
    lastUpdated: '2024-01-05',
    createdBy: 'David Brown'
  }
]

const CertificationProgramsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedProgram, setSelectedProgram] = useState<CertificationProgram | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = ['All', 'Project Management', 'Data Science', 'Cybersecurity', 'Marketing', 'Agile']
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert']
  const statuses = ['All', 'Active', 'Draft', 'Archived', 'Expired']

  const filteredPrograms = mockCertificationPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory
    const matchesLevel = selectedLevel === 'All' || program.level === selectedLevel
    const matchesStatus = selectedStatus === 'All' || program.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus
  })

  const stats = {
    total: mockCertificationPrograms.length,
    active: mockCertificationPrograms.filter(p => p.status === 'Active').length,
    draft: mockCertificationPrograms.filter(p => p.status === 'Draft').length,
    archived: mockCertificationPrograms.filter(p => p.status === 'Archived').length,
    totalLearners: mockCertificationPrograms.reduce((sum, p) => sum + p.enrolledLearners, 0),
    avgCompletionRate: Math.round(mockCertificationPrograms.reduce((sum, p) => sum + p.completionRate, 0) / mockCertificationPrograms.length)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Archived': return 'bg-gray-100 text-gray-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800'
      case 'Intermediate': return 'bg-purple-100 text-purple-800'
      case 'Advanced': return 'bg-orange-100 text-orange-800'
      case 'Expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const openProgramModal = (program: CertificationProgram) => {
    setSelectedProgram(program)
    setShowModal(true)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certification Programs</h1>
          <p className="text-gray-600">Manage and oversee certification programs for learners</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Programs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Archive className="h-5 w-5 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Archived</p>
                <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Learners</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLearners}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Target className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgCompletionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Program
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  <div className="w-4 h-4">
                    <div className="w-full h-0.5 bg-current mb-1"></div>
                    <div className="w-full h-0.5 bg-current mb-1"></div>
                    <div className="w-full h-0.5 bg-current"></div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Programs Grid/Table */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map(program => (
              <div key={program.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{program.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Category:</span>
                      <span className="text-sm font-medium text-gray-900">{program.category}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Level:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                        {program.level}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Duration:</span>
                      <span className="text-sm font-medium text-gray-900">{program.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Modules:</span>
                      <span className="text-sm font-medium text-gray-900">{program.modules} modules</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      {program.enrolledLearners}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{program.completionRate}%</span> completion
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openProgramModal(program)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Archive">
                        <Archive className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Learners</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrograms.map(program => (
                    <tr key={program.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{program.name}</div>
                          <div className="text-sm text-gray-500">{program.description.substring(0, 60)}...</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                          {program.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                          {program.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.enrolledLearners}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.completionRate}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openProgramModal(program)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-orange-600 hover:text-orange-900" title="Archive">
                            <Archive className="h-4 w-4" />
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

        {/* Program Details Modal */}
        {showModal && selectedProgram && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProgram.name}</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Description:</span>
                        <p className="text-sm text-gray-900 mt-1">{selectedProgram.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Category:</span>
                          <p className="text-sm text-gray-900 mt-1">{selectedProgram.category}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Level:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedProgram.level)} mt-1 inline-block`}>
                            {selectedProgram.level}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Duration:</span>
                          <p className="text-sm text-gray-900 mt-1">{selectedProgram.duration}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Modules:</span>
                          <p className="text-sm text-gray-900 mt-1">{selectedProgram.modules}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Total Hours:</span>
                          <p className="text-sm text-gray-900 mt-1">{selectedProgram.totalHours}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProgram.status)} mt-1 inline-block`}>
                            {selectedProgram.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements & Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Requirements:</span>
                        <ul className="mt-2 space-y-1">
                          {selectedProgram.requirements.map((req, index) => (
                            <li key={index} className="text-sm text-gray-900 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Validity Period:</span>
                          <p className="text-sm text-gray-900 mt-1">{selectedProgram.validityPeriod}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Passing Score:</span>
                          <p className="text-sm text-gray-900 mt-1">{selectedProgram.passingScore}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedProgram.enrolledLearners}</p>
                          <p className="text-sm text-gray-600">Enrolled Learners</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Target className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedProgram.completionRate}%</p>
                          <p className="text-sm text-gray-600">Completion Rate</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-8 w-8 text-purple-600" />
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedProgram.totalHours}</p>
                          <p className="text-sm text-gray-600">Total Hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>Created by: </span>
                      <span className="font-medium text-gray-900">{selectedProgram.createdBy}</span>
                      <span className="mx-2">•</span>
                      <span>Last updated: </span>
                      <span className="font-medium text-gray-900">{selectedProgram.lastUpdated}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Edit Program
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Manage Learners
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CertificationProgramsPage
