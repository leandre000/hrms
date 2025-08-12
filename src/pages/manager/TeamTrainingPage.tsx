import React, { useState } from 'react'
import { 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2
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
  status: 'active' | 'inactive' | 'completed' | 'scheduled'
  startDate: string
  endDate: string
  location: string
  type: 'online' | 'in-person' | 'hybrid'
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
    type: 'in-person'
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
    type: 'online'
  }
]

const TeamTrainingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredPrograms = mockTrainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'scheduled': return 'bg-yellow-100 text-yellow-800'
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Training</h1>
          <p className="text-gray-600">Manage training programs and track team development</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Program
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
              <p className="text-sm text-gray-600">Total Programs</p>
              <p className="text-2xl font-bold text-blue-600">{mockTrainingPrograms.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockTrainingPrograms.filter(p => p.status === 'scheduled').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-purple-600">
                {mockTrainingPrograms.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border">
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
          </select>
        </div>
      </div>

      {/* Training Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(program.category)}`}>
                {program.category.replace('-', ' ')}
              </span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(program.status)}`}>
                {program.status}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{program.description}</p>
            
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
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamTrainingPage
