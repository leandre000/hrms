import React, { useState } from 'react'
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  BookOpen,
  Target,
  Calendar,
  TrendingUp,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Clock
} from 'lucide-react'

interface Learner {
  id: string
  name: string
  email: string
  phone: string
  department: string
  position: string
  location: string
  enrollmentDate: string
  totalCourses: number
  completedCourses: number
  currentCourses: number
  completionRate: number
  lastActivity: string
  status: 'active' | 'inactive' | 'suspended'
  skills: string[]
  interests: string[]
  avatar?: string
}

const LearnersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null)
  const [showLearnerModal, setShowLearnerModal] = useState(false)

  const mockLearners: Learner[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Senior Developer',
      location: 'New York, NY',
      enrollmentDate: '2024-01-01',
      totalCourses: 12,
      completedCourses: 8,
      currentCourses: 2,
      completionRate: 67,
      lastActivity: '2024-01-15',
      status: 'active',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      interests: ['Web Development', 'Machine Learning', 'Cloud Computing']
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Marketing',
      position: 'Marketing Manager',
      location: 'San Francisco, CA',
      enrollmentDate: '2024-01-02',
      totalCourses: 8,
      completedCourses: 6,
      currentCourses: 1,
      completionRate: 75,
      lastActivity: '2024-01-14',
      status: 'active',
      skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
      interests: ['Digital Marketing', 'Brand Strategy', 'Content Creation']
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      department: 'Sales',
      position: 'Sales Representative',
      location: 'Chicago, IL',
      enrollmentDate: '2024-01-03',
      totalCourses: 15,
      completedCourses: 12,
      currentCourses: 2,
      completionRate: 80,
      lastActivity: '2024-01-16',
      status: 'active',
      skills: ['Sales Techniques', 'Negotiation', 'CRM', 'Customer Relations'],
      interests: ['Sales Training', 'Leadership', 'Customer Success']
    },
    {
      id: '4',
      name: 'David Thompson',
      email: 'david.thompson@company.com',
      phone: '+1 (555) 456-7890',
      department: 'HR',
      position: 'HR Specialist',
      location: 'Austin, TX',
      enrollmentDate: '2024-01-04',
      totalCourses: 6,
      completedCourses: 4,
      currentCourses: 1,
      completionRate: 67,
      lastActivity: '2024-01-10',
      status: 'active',
      skills: ['HR Management', 'Recruitment', 'Employee Relations', 'Compliance'],
      interests: ['HR Best Practices', 'Leadership Development', 'Workplace Culture']
    },
    {
      id: '5',
      name: 'Jennifer Lee',
      email: 'jennifer.lee@company.com',
      phone: '+1 (555) 567-8901',
      department: 'Finance',
      position: 'Financial Analyst',
      location: 'Seattle, WA',
      enrollmentDate: '2024-01-05',
      totalCourses: 10,
      completedCourses: 7,
      currentCourses: 2,
      completionRate: 70,
      lastActivity: '2024-01-13',
      status: 'active',
      skills: ['Financial Analysis', 'Excel', 'Data Modeling', 'Reporting'],
      interests: ['Financial Planning', 'Data Analysis', 'Business Intelligence']
    },
    {
      id: '6',
      name: 'Robert Wilson',
      email: 'robert.wilson@company.com',
      phone: '+1 (555) 678-9012',
      department: 'Operations',
      position: 'Operations Manager',
      location: 'Denver, CO',
      enrollmentDate: '2024-01-06',
      totalCourses: 9,
      completedCourses: 6,
      currentCourses: 1,
      completionRate: 67,
      lastActivity: '2024-01-12',
      status: 'inactive',
      skills: ['Process Improvement', 'Project Management', 'Team Leadership', 'Analytics'],
      interests: ['Operations Excellence', 'Lean Management', 'Leadership']
    },
    {
      id: '7',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 789-0123',
      department: 'Customer Support',
      position: 'Support Specialist',
      location: 'Boston, MA',
      enrollmentDate: '2024-01-07',
      totalCourses: 11,
      completedCourses: 9,
      currentCourses: 1,
      completionRate: 82,
      lastActivity: '2024-01-15',
      status: 'active',
      skills: ['Customer Service', 'Problem Solving', 'Communication', 'Product Knowledge'],
      interests: ['Customer Experience', 'Communication Skills', 'Product Training']
    },
    {
      id: '8',
      name: 'James Brown',
      email: 'james.brown@company.com',
      phone: '+1 (555) 890-1234',
      department: 'Engineering',
      position: 'DevOps Engineer',
      location: 'Portland, OR',
      enrollmentDate: '2024-01-08',
      totalCourses: 14,
      completedCourses: 11,
      currentCourses: 2,
      completionRate: 79,
      lastActivity: '2024-01-14',
      status: 'suspended',
      skills: ['DevOps', 'Docker', 'Kubernetes', 'AWS', 'Linux'],
      interests: ['Cloud Infrastructure', 'Automation', 'System Administration']
    }
  ]

  const departments = ['All Departments', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Customer Support']
  const statusOptions = ['All Status', 'active', 'inactive', 'suspended']

  const filteredLearners = mockLearners.filter(learner => {
    const matchesSearch = learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learner.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learner.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDepartment = selectedDepartment === '' || selectedDepartment === 'All Departments' || learner.department === selectedDepartment
    const matchesStatus = selectedStatus === '' || selectedStatus === 'All Status' || learner.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewLearner = (learner: Learner) => {
    setSelectedLearner(learner)
    setShowLearnerModal(true)
  }

  const handleEditLearner = (learnerId: string) => {
    console.log('Editing learner:', learnerId)
    // Navigate to edit learner page
  }

  const handleMessageLearner = (learnerId: string) => {
    console.log('Messaging learner:', learnerId)
    // Open messaging interface
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysSinceLastActivity = (lastActivity: string) => {
    const last = new Date(lastActivity)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - last.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Learners</h1>
        <p className="text-gray-600">Manage and monitor all learners enrolled in your training programs</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Learners</p>
              <p className="text-2xl font-bold text-gray-900">{mockLearners.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Learners</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockLearners.filter(learner => learner.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Completion</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(mockLearners.reduce((sum, learner) => sum + learner.completionRate, 0) / mockLearners.length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockLearners.reduce((sum, learner) => sum + learner.totalCourses, 0)}
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
                placeholder="Search learners by name, email, department, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {departments.map((department) => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'All Status' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
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

            <button
              onClick={() => console.log('Add new learner')}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Learner
            </button>
          </div>
        </div>
      </div>

      {/* Learners Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLearners.map((learner) => (
            <div key={learner.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-lg">
                        {learner.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{learner.name}</h3>
                      <p className="text-sm text-gray-500">{learner.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(learner.status)}`}>
                      {learner.status.charAt(0).toUpperCase() + learner.status.slice(1)}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{learner.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{learner.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{learner.department}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Enrolled:</span>
                    <span className="font-medium text-gray-900">{formatDate(learner.enrollmentDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Courses:</span>
                    <span className="font-medium text-gray-900">{learner.completedCourses}/{learner.totalCourses}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completion:</span>
                    <span className="font-medium text-gray-900">{learner.completionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Activity:</span>
                    <span className="font-medium text-gray-900">{getDaysSinceLastActivity(learner.lastActivity)} days ago</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {learner.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {skill}
                    </span>
                  ))}
                  {learner.skills.length > 3 && (
                    <span className="text-xs text-gray-500">+{learner.skills.length - 3} more</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewLearner(learner)}
                    className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEditLearner(learner.id)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                    title="Edit Learner"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMessageLearner(learner.id)}
                    className="px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-md"
                    title="Message Learner"
                  >
                    <MessageSquare className="w-4 h-4" />
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
                    Learner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
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
                {filteredLearners.map((learner) => (
                  <tr key={learner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold text-sm">
                            {learner.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{learner.name}</div>
                          <div className="text-sm text-gray-500">{learner.email}</div>
                          <div className="text-sm text-gray-500">{learner.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {learner.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {learner.completedCourses}/{learner.totalCourses}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {learner.completionRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getDaysSinceLastActivity(learner.lastActivity)} days ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(learner.status)}`}>
                        {learner.status.charAt(0).toUpperCase() + learner.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewLearner(learner)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditLearner(learner.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleMessageLearner(learner.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Message
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

      {filteredLearners.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No learners found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Learner Detail Modal */}
      {showLearnerModal && selectedLearner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Learner Details</h2>
              <button
                onClick={() => setShowLearnerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-xl">
                    {selectedLearner.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedLearner.name}</h3>
                  <p className="text-gray-600">{selectedLearner.position}</p>
                  <p className="text-sm text-gray-500">{selectedLearner.department}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{selectedLearner.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{selectedLearner.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{selectedLearner.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Enrolled: {formatDate(selectedLearner.enrollmentDate)}</span>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{selectedLearner.totalCourses}</div>
                  <div className="text-sm text-gray-600">Total Courses</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedLearner.completedCourses}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedLearner.completionRate}%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLearner.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Learning Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLearner.interests.map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => handleEditLearner(selectedLearner.id)}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Edit Learner
              </button>
              <button
                onClick={() => handleMessageLearner(selectedLearner.id)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Send Message
              </button>
              <button
                onClick={() => setShowLearnerModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LearnersPage
