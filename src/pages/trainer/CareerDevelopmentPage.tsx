import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  TrendingUp, 
  Target, 
  Users,
  BarChart3,
  BookOpen,
  Award,
  Clock,
  MapPin,
  Building
} from 'lucide-react'

interface CareerPath {
  id: string
  title: string
  description: string
  department: string
  level: 'Entry' | 'Mid' | 'Senior' | 'Executive'
  duration: string
  skills: string[]
  certifications: string[]
  status: 'Active' | 'Draft' | 'Archived'
  participants: number
  completionRate: number
}

interface DevelopmentPlan {
  id: string
  employeeName: string
  currentRole: string
  targetRole: string
  careerPath: string
  progress: number
  startDate: string
  targetDate: string
  status: 'Planning' | 'In Progress' | 'On Track' | 'At Risk' | 'Completed'
  milestones: { name: string; completed: boolean; dueDate: string }[]
}

const mockCareerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'Software Engineer to Tech Lead',
    description: 'Progression path from individual contributor to technical leadership',
    department: 'Engineering',
    level: 'Senior',
    duration: '18-24 months',
    skills: ['Technical Leadership', 'Project Management', 'Team Building', 'Architecture Design'],
    certifications: ['Agile Leadership', 'Project Management Professional'],
    status: 'Active',
    participants: 12,
    completionRate: 75
  },
  {
    id: '2',
    title: 'Marketing Specialist to Marketing Manager',
    description: 'Career advancement in digital marketing and team management',
    department: 'Marketing',
    level: 'Mid',
    duration: '12-18 months',
    skills: ['Digital Marketing', 'Team Leadership', 'Strategy Development', 'Analytics'],
    certifications: ['Digital Marketing Institute', 'Google Analytics'],
    status: 'Active',
    participants: 8,
    completionRate: 60
  },
  {
    id: '3',
    title: 'Sales Representative to Sales Director',
    description: 'Progression from individual sales to sales leadership and strategy',
    department: 'Sales',
    level: 'Senior',
    duration: '24-36 months',
    skills: ['Sales Leadership', 'Strategic Planning', 'Team Management', 'Client Relations'],
    certifications: ['Sales Leadership Certification', 'Strategic Sales Management'],
    status: 'Active',
    participants: 15,
    completionRate: 80
  }
]

const mockDevelopmentPlans: DevelopmentPlan[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    currentRole: 'Software Engineer',
    targetRole: 'Tech Lead',
    careerPath: 'Software Engineer to Tech Lead',
    progress: 65,
    startDate: '2024-01-15',
    targetDate: '2025-07-15',
    status: 'On Track',
    milestones: [
      { name: 'Complete Leadership Training', completed: true, dueDate: '2024-03-15' },
      { name: 'Lead First Project', completed: true, dueDate: '2024-05-15' },
      { name: 'Mentor Junior Engineers', completed: false, dueDate: '2024-08-15' },
      { name: 'Architecture Design Certification', completed: false, dueDate: '2024-10-15' }
    ]
  },
  {
    id: '2',
    employeeName: 'David Rodriguez',
    currentRole: 'Marketing Specialist',
    targetRole: 'Marketing Manager',
    careerPath: 'Marketing Specialist to Marketing Manager',
    progress: 40,
    startDate: '2024-02-01',
    targetDate: '2025-08-01',
    status: 'In Progress',
    milestones: [
      { name: 'Digital Marketing Certification', completed: true, dueDate: '2024-04-01' },
      { name: 'Lead Campaign Project', completed: false, dueDate: '2024-06-01' },
      { name: 'Analytics Training', completed: false, dueDate: '2024-08-01' },
      { name: 'Team Management Course', completed: false, dueDate: '2024-10-01' }
    ]
  }
]

const CareerDevelopmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [levelFilter, setLevelFilter] = useState('All')
  const [showCreatePathModal, setShowCreatePathModal] = useState(false)
  const [selectedView, setSelectedView] = useState<'paths' | 'plans'>('paths')

  const filteredPaths = mockCareerPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === 'All' || path.department === departmentFilter
    const matchesLevel = levelFilter === 'All' || path.level === levelFilter
    return matchesSearch && matchesDepartment && matchesLevel
  })

  const stats = {
    totalPaths: mockCareerPaths.length,
    activePaths: mockCareerPaths.filter(p => p.status === 'Active').length,
    totalParticipants: mockCareerPaths.reduce((acc, path) => acc + path.participants, 0),
    avgCompletionRate: Math.round(mockCareerPaths.reduce((acc, path) => acc + path.completionRate, 0) / mockCareerPaths.length)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Entry': return 'bg-gray-100 text-gray-800'
      case 'Mid': return 'bg-blue-100 text-blue-800'
      case 'Senior': return 'bg-green-100 text-green-800'
      case 'Executive': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-gray-100 text-gray-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'On Track': return 'bg-green-100 text-green-800'
      case 'At Risk': return 'bg-red-100 text-red-800'
      case 'Completed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Development</h1>
        <p className="text-gray-600">Manage career development programs and individual development plans</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Career Paths</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPaths}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Paths</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activePaths}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalParticipants}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgCompletionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('paths')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'paths'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Career Paths
          </button>
          <button
            onClick={() => setSelectedView('plans')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'plans'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Development Plans
          </button>
        </div>
      </div>

      {/* Career Paths View */}
      {selectedView === 'paths' && (
        <>
          {/* Controls */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <button
                onClick={() => setShowCreatePathModal(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Career Path
              </button>

              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search career paths..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
                
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="All">All Levels</option>
                  <option value="Entry">Entry</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Career Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map((path) => (
              <div key={path.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{path.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(path.level)}`}>
                        {path.level}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{path.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Building className="w-4 h-4" />
                      <span>{path.department}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-xs text-blue-700 rounded">
                          {skill}
                        </span>
                      ))}
                      {path.skills.length > 3 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                          +{path.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Certifications:</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.certifications.map((cert, index) => (
                        <span key={index} className="inline-block px-2 py-1 bg-green-100 text-xs text-green-700 rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{path.participants}</span> participants
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{path.completionRate}%</span> completion rate
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 text-sm text-primary-600 hover:text-primary-900 flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="px-3 py-2 text-sm text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Development Plans View */}
      {selectedView === 'plans' && (
        <div className="space-y-6">
          {mockDevelopmentPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{plan.employeeName}</h3>
                  <p className="text-sm text-gray-500">{plan.currentRole} → {plan.targetRole}</p>
                  <p className="text-xs text-gray-400">{plan.careerPath}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">{plan.progress}%</div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{plan.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Target Date</p>
                  <p className="font-medium">{plan.targetDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="font-medium">{plan.duration}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Milestones Progress:</h4>
                <div className="space-y-2">
                  {plan.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className={`text-sm ${milestone.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {milestone.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{milestone.dueDate}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm text-primary-600 hover:text-primary-900 flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-900 flex items-center">
                  <Edit className="w-4 h-4 mr-1" />
                  Update Progress
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  Export Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Career Path Modal */}
      {showCreatePathModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Career Path</h3>
              <button
                onClick={() => setShowCreatePathModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">×</span>
                </div>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Career Path Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Developer to Tech Lead"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe the career progression path"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Select department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Select level</option>
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreatePathModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Create Path
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerDevelopmentPage
