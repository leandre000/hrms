import React, { useState } from 'react'
import { 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Archive,
  Copy,
  Play,
  Pause,
  Download
} from 'lucide-react'

interface TrainingProgram {
  id: string
  title: string
  description: string
  category: 'technical' | 'soft-skills' | 'compliance' | 'leadership' | 'productivity'
  duration: string
  instructor: string
  maxParticipants: number
  currentParticipants: number
  status: 'active' | 'inactive' | 'completed' | 'scheduled' | 'archived'
  startDate: string
  endDate: string
  location: string
  type: 'online' | 'in-person' | 'hybrid'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  completionRate: number
  rating: number
  lastUpdated: string
}

const mockTrainingPrograms: TrainingProgram[] = [
  {
    id: '1',
    title: 'Advanced Project Management',
    description: 'Comprehensive training on modern project management methodologies and tools.',
    category: 'leadership',
    duration: '40 hours',
    instructor: 'Dr. Sarah Wilson',
    maxParticipants: 25,
    currentParticipants: 18,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-03-15',
    location: 'Conference Room A',
    type: 'in-person',
    difficulty: 'intermediate',
    tags: ['Project Management', 'Leadership', 'Agile'],
    completionRate: 85,
    rating: 4.5,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    title: 'Data Analysis Fundamentals',
    description: 'Learn the basics of data analysis and visualization using modern tools.',
    category: 'technical',
    duration: '30 hours',
    instructor: 'Prof. Michael Chen',
    maxParticipants: 30,
    currentParticipants: 25,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-02-28',
    location: 'Online Platform',
    type: 'online',
    difficulty: 'beginner',
    tags: ['Data Analysis', 'Excel', 'Statistics'],
    completionRate: 92,
    rating: 4.8,
    lastUpdated: '2024-01-20'
  },
  {
    id: '3',
    title: 'Effective Communication Skills',
    description: 'Develop professional communication skills for better workplace collaboration.',
    category: 'soft-skills',
    duration: '20 hours',
    instructor: 'Lisa Rodriguez',
    maxParticipants: 20,
    currentParticipants: 15,
    status: 'scheduled',
    startDate: '2024-03-01',
    endDate: '2024-03-22',
    location: 'Training Room B',
    type: 'hybrid',
    difficulty: 'beginner',
    tags: ['Communication', 'Soft Skills', 'Collaboration'],
    completionRate: 78,
    rating: 4.2,
    lastUpdated: '2024-01-18'
  },
  {
    id: '4',
    title: 'Cybersecurity Awareness',
    description: 'Essential cybersecurity training for all employees to protect company data.',
    category: 'compliance',
    duration: '8 hours',
    instructor: 'Security Team',
    maxParticipants: 100,
    currentParticipants: 85,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Online Platform',
    type: 'online',
    difficulty: 'beginner',
    tags: ['Security', 'Compliance', 'Best Practices'],
    completionRate: 95,
    rating: 4.6,
    lastUpdated: '2024-01-10'
  },
  {
    id: '5',
    title: 'Time Management & Productivity',
    description: 'Learn effective time management techniques to boost productivity.',
    category: 'productivity',
    duration: '16 hours',
    instructor: 'David Thompson',
    maxParticipants: 35,
    currentParticipants: 30,
    status: 'completed',
    startDate: '2023-12-01',
    endDate: '2023-12-15',
    location: 'Training Room C',
    type: 'in-person',
    difficulty: 'beginner',
    tags: ['Productivity', 'Time Management', 'Organization'],
    completionRate: 88,
    rating: 4.4,
    lastUpdated: '2023-12-20'
  }
]

const ProgramsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'all' | 'templates' | 'archived'>('all')

  const filteredPrograms = mockTrainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter
    const matchesDifficulty = difficultyFilter === 'all' || program.difficulty === difficultyFilter
    
    return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'scheduled': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800'
      case 'soft-skills': return 'bg-purple-100 text-purple-800'
      case 'compliance': return 'bg-red-100 text-red-800'
      case 'leadership': return 'bg-green-100 text-green-800'
      case 'productivity': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </div>
    ))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training Programs</h1>
          <p className="text-gray-600">Manage and create comprehensive training programs for learners</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Program
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Programs</p>
              <p className="text-2xl font-bold text-green-600">
                {mockTrainingPrograms.filter(p => p.status === 'active').length}
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Learners</p>
              <p className="text-2xl font-bold text-blue-600">
                {mockTrainingPrograms.reduce((sum, p) => sum + p.currentParticipants, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Completion</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(mockTrainingPrograms.reduce((sum, p) => sum + p.completionRate, 0) / mockTrainingPrograms.length)}%
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-orange-600">
                {(mockTrainingPrograms.reduce((sum, p) => sum + p.rating, 0) / mockTrainingPrograms.length).toFixed(1)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Program Templates
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'archived'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Archived Programs
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Filters and Search */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="technical">Technical</option>
                <option value="soft-skills">Soft Skills</option>
                <option value="compliance">Compliance</option>
                <option value="leadership">Leadership</option>
                <option value="productivity">Productivity</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(program.category)}`}>
                      {program.category.replace('-', ' ')}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(program.difficulty)}`}>
                      {program.difficulty}
                    </span>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(program.status)}`}>
                    {program.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-gray-900">{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Instructor:</span>
                    <span className="text-gray-900">{program.instructor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Participants:</span>
                    <span className="text-gray-900">{program.currentParticipants}/{program.maxParticipants}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="text-gray-900 capitalize">{program.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Completion Rate:</span>
                    <span className="text-gray-900">{program.completionRate}%</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {program.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {tag}
                      </span>
                    ))}
                    {program.tags.length > 3 && (
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{program.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {renderStars(program.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({program.rating})</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{program.location}</span>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-900">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No programs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgramsPage
