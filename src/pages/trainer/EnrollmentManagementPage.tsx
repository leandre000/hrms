import { useState } from 'react'
import { Search, Plus, Users, UserCheck, Clock, CheckCircle, Eye, Edit, Trash2, X, BookOpen, Calendar, Mail, Filter, Download, RefreshCw } from 'lucide-react'

interface Enrollment {
  id: string
  learnerName: string
  learnerEmail: string
  programName: string
  courseName: string
  enrollmentDate: string
  startDate: string
  endDate: string
  status: 'active' | 'completed' | 'dropped' | 'pending'
  progress: number
  lastActivity: string
  assignedTrainer: string
  completionDate?: string
  grade?: string
}

const mockEnrollments: Enrollment[] = [
  {
    id: 'ENR001',
    learnerName: 'Sarah Johnson',
    learnerEmail: 'sarah.johnson@company.com',
    programName: 'Frontend Development',
    courseName: 'React Fundamentals',
    enrollmentDate: '2024-01-15',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    status: 'active',
    progress: 75,
    lastActivity: '2024-03-20',
    assignedTrainer: 'Alex Chen'
  },
  {
    id: 'ENR002',
    learnerName: 'Michael Brown',
    learnerEmail: 'michael.brown@company.com',
    programName: 'Data Science',
    courseName: 'Python for Data Analysis',
    enrollmentDate: '2024-01-10',
    startDate: '2024-01-20',
    endDate: '2024-05-15',
    status: 'active',
    progress: 45,
    lastActivity: '2024-03-18',
    assignedTrainer: 'Maria Garcia'
  },
  {
    id: 'ENR003',
    learnerName: 'Emily Davis',
    learnerEmail: 'emily.davis@company.com',
    programName: 'Project Management',
    courseName: 'Agile Fundamentals',
    enrollmentDate: '2023-12-01',
    startDate: '2023-12-15',
    endDate: '2024-03-15',
    status: 'completed',
    progress: 100,
    lastActivity: '2024-03-15',
    assignedTrainer: 'David Wilson',
    completionDate: '2024-03-15',
    grade: 'A'
  },
  {
    id: 'ENR004',
    learnerName: 'James Wilson',
    learnerEmail: 'james.wilson@company.com',
    programName: 'Cybersecurity',
    courseName: 'Network Security',
    enrollmentDate: '2024-02-01',
    startDate: '2024-02-15',
    endDate: '2024-06-30',
    status: 'active',
    progress: 30,
    lastActivity: '2024-03-19',
    assignedTrainer: 'Lisa Thompson'
  },
  {
    id: 'ENR005',
    learnerName: 'Jennifer Lee',
    learnerEmail: 'jennifer.lee@company.com',
    programName: 'UX/UI Design',
    courseName: 'Design Thinking',
    enrollmentDate: '2024-01-20',
    startDate: '2024-02-01',
    endDate: '2024-05-30',
    status: 'dropped',
    progress: 20,
    lastActivity: '2024-02-28',
    assignedTrainer: 'Alex Chen'
  },
  {
    id: 'ENR006',
    learnerName: 'Robert Taylor',
    learnerEmail: 'robert.taylor@company.com',
    programName: 'DevOps',
    courseName: 'Docker & Kubernetes',
    enrollmentDate: '2024-02-15',
    startDate: '2024-03-01',
    endDate: '2024-07-15',
    status: 'pending',
    progress: 0,
    lastActivity: '2024-02-15',
    assignedTrainer: 'Maria Garcia'
  }
]

const EnrollmentManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [programFilter, setProgramFilter] = useState<string>('all')
  const [trainerFilter, setTrainerFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredEnrollments = mockEnrollments.filter(enrollment => {
    const matchesSearch = 
      enrollment.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.learnerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter
    const matchesProgram = programFilter === 'all' || enrollment.programName === programFilter
    const matchesTrainer = trainerFilter === 'all' || enrollment.assignedTrainer === trainerFilter

    return matchesSearch && matchesStatus && matchesProgram && matchesTrainer
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'dropped': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 60) return 'text-blue-600'
    if (progress >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const quickStats = [
    { label: 'Total Enrollments', value: mockEnrollments.length, icon: Users, color: 'text-blue-600' },
    { label: 'Active Enrollments', value: mockEnrollments.filter(e => e.status === 'active').length, icon: UserCheck, color: 'text-green-600' },
    { label: 'Pending Enrollments', value: mockEnrollments.filter(e => e.status === 'pending').length, icon: Clock, color: 'text-yellow-600' },
    { label: 'Completed', value: mockEnrollments.filter(e => e.status === 'completed').length, icon: CheckCircle, color: 'text-blue-600' }
  ]

  const uniquePrograms = [...new Set(mockEnrollments.map(e => e.programName))]
  const uniqueTrainers = [...new Set(mockEnrollments.map(e => e.assignedTrainer))]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enrollment Management</h1>
          <p className="text-gray-600">Manage learner enrollments in programs and courses</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            New Enrollment
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search learners, programs, or courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                showFilters ? 'bg-primary-50 border-primary-300 text-primary-700' : 'border-gray-300 text-gray-700'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="dropped">Dropped</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Programs</option>
                  {uniquePrograms.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trainer</label>
                <select
                  value={trainerFilter}
                  onChange={(e) => setTrainerFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Trainers</option>
                  {uniqueTrainers.map(trainer => (
                    <option key={trainer} value={trainer}>{trainer}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredEnrollments.length} of {mockEnrollments.length} enrollments
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">View:</span>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-primary-100 text-primary-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="w-4 h-4 border-2 border-current rounded"></div>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="w-4 h-4 border-2 border-current rounded"></div>
          </button>
        </div>
      </div>

      {/* Enrollments Table */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Learner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program/Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{enrollment.learnerName}</div>
                        <div className="text-sm text-gray-500">{enrollment.learnerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{enrollment.programName}</div>
                        <div className="text-sm text-gray-500">{enrollment.courseName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>Start: {new Date(enrollment.startDate).toLocaleDateString()}</div>
                      <div>End: {new Date(enrollment.endDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enrollment.status)}`}>
                        {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(enrollment.progress)}`}
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getProgressColor(enrollment.progress)}`}>
                          {enrollment.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {enrollment.assignedTrainer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedEnrollment(enrollment)
                            setShowEnrollmentModal(true)
                          }}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
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
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEnrollments.map((enrollment) => (
            <div key={enrollment.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{enrollment.learnerName}</h3>
                  <p className="text-sm text-gray-500">{enrollment.learnerEmail}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enrollment.status)}`}>
                  {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{enrollment.programName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{enrollment.courseName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{enrollment.assignedTrainer}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className={`font-medium ${getProgressColor(enrollment.progress)}`}>{enrollment.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(enrollment.progress)}`}
                    style={{ width: `${enrollment.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedEnrollment(enrollment)
                    setShowEnrollmentModal(true)
                  }}
                  className="flex-1 px-3 py-2 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  View Details
                </button>
                <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enrollment Detail Modal */}
      {showEnrollmentModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Enrollment Details</h2>
                <button
                  onClick={() => setShowEnrollmentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Learner Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Name:</span>
                      <p className="text-gray-900">{selectedEnrollment.learnerName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Email:</span>
                      <p className="text-gray-900">{selectedEnrollment.learnerEmail}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Program Details</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Program:</span>
                      <p className="text-gray-900">{selectedEnrollment.programName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Course:</span>
                      <p className="text-gray-900">{selectedEnrollment.courseName}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Enrollment Details</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Enrollment Date:</span>
                      <p className="text-gray-900">{new Date(selectedEnrollment.enrollmentDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Start Date:</span>
                      <p className="text-gray-900">{new Date(selectedEnrollment.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">End Date:</span>
                      <p className="text-gray-900">{new Date(selectedEnrollment.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Progress & Status</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${getStatusColor(selectedEnrollment.status)}`}>
                        {selectedEnrollment.status.charAt(0).toUpperCase() + selectedEnrollment.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Progress:</span>
                      <p className="text-gray-900">{selectedEnrollment.progress}%</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Last Activity:</span>
                      <p className="text-gray-900">{new Date(selectedEnrollment.lastActivity).toLocaleDateString()}</p>
                    </div>
                    {selectedEnrollment.completionDate && (
                      <div>
                        <span className="text-sm text-gray-600">Completion Date:</span>
                        <p className="text-gray-900">{new Date(selectedEnrollment.completionDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedEnrollment.grade && (
                      <div>
                        <span className="text-sm text-gray-600">Grade:</span>
                        <p className="text-gray-900">{selectedEnrollment.grade}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Assigned Trainer</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedEnrollment.assignedTrainer}</p>
                    <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="btn-primary flex-1">
                  <Edit className="w-4 h-4" />
                  Edit Enrollment
                </button>
                <button className="btn-secondary flex-1">
                  <Mail className="w-4 h-4" />
                  Contact Learner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnrollmentManagementPage
