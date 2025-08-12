import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Download,
  BarChart3,
  Target,
  Calendar,
  BookOpen,
  Award,
  Activity
} from 'lucide-react'

interface LearnerProgress {
  id: string
  learnerName: string
  learnerEmail: string
  programName: string
  courseName: string
  enrollmentDate: string
  startDate: string
  endDate: string
  overallProgress: number
  completedModules: number
  totalModules: number
  completedAssessments: number
  totalAssessments: number
  averageScore: number
  timeSpent: number // in hours
  lastActivity: string
  status: 'active' | 'completed' | 'at-risk' | 'dropped'
  nextMilestone: string
  instructor: string
}

const mockProgress: LearnerProgress[] = [
  {
    id: 'PROG001',
    learnerName: 'Sarah Johnson',
    learnerEmail: 'sarah.johnson@email.com',
    programName: 'Digital Marketing Fundamentals',
    courseName: 'Social Media Marketing',
    enrollmentDate: '2024-01-15',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    overallProgress: 75,
    completedModules: 6,
    totalModules: 8,
    completedAssessments: 4,
    totalAssessments: 6,
    averageScore: 87,
    timeSpent: 24,
    lastActivity: '2024-03-20',
    status: 'active',
    nextMilestone: 'Complete Module 7',
    instructor: 'Michael Chen'
  },
  {
    id: 'PROG002',
    learnerName: 'David Rodriguez',
    learnerEmail: 'david.rodriguez@email.com',
    programName: 'Web Development Bootcamp',
    courseName: 'React.js Advanced',
    enrollmentDate: '2024-01-20',
    startDate: '2024-02-15',
    endDate: '2024-05-15',
    overallProgress: 45,
    completedModules: 3,
    totalModules: 10,
    completedAssessments: 2,
    totalAssessments: 5,
    averageScore: 78,
    timeSpent: 18,
    lastActivity: '2024-03-18',
    status: 'at-risk',
    nextMilestone: 'Complete Module 4',
    instructor: 'Emily Watson'
  },
  {
    id: 'PROG003',
    learnerName: 'Lisa Chen',
    learnerEmail: 'lisa.chen@email.com',
    programName: 'Data Science Essentials',
    courseName: 'Python for Data Analysis',
    enrollmentDate: '2024-01-10',
    startDate: '2024-01-25',
    endDate: '2024-04-25',
    overallProgress: 100,
    completedModules: 8,
    totalModules: 8,
    completedAssessments: 6,
    totalAssessments: 6,
    averageScore: 94,
    timeSpent: 32,
    lastActivity: '2024-04-20',
    status: 'completed',
    nextMilestone: 'Course Completed',
    instructor: 'Dr. Robert Kim'
  },
  {
    id: 'PROG004',
    learnerName: 'James Wilson',
    learnerEmail: 'james.wilson@email.com',
    programName: 'Project Management',
    courseName: 'Agile Methodology',
    enrollmentDate: '2024-01-25',
    startDate: '2024-02-10',
    endDate: '2024-05-10',
    overallProgress: 20,
    completedModules: 1,
    totalModules: 6,
    completedAssessments: 0,
    totalAssessments: 3,
    averageScore: 0,
    timeSpent: 4,
    lastActivity: '2024-02-25',
    status: 'at-risk',
    nextMilestone: 'Complete Module 2',
    instructor: 'Jennifer Lee'
  }
]

const IndividualProgressPage = () => {
  const [progress, setProgress] = useState<LearnerProgress[]>(mockProgress)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [programFilter, setProgramFilter] = useState<string>('all')
  const [selectedLearner, setSelectedLearner] = useState<LearnerProgress | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredProgress = progress.filter(learner => {
    const matchesSearch = learner.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learner.learnerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learner.programName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || learner.status === statusFilter
    const matchesProgram = programFilter === 'all' || learner.programName === programFilter
    
    return matchesSearch && matchesStatus && matchesProgram
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'at-risk': return 'text-yellow-600 bg-yellow-100'
      case 'dropped': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 60) return 'text-blue-600'
    if (progress >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const quickStats = [
    { label: 'Total Learners', value: progress.length, icon: Users, color: 'text-blue-600' },
    { label: 'Active Learners', value: progress.filter(p => p.status === 'active').length, icon: Activity, color: 'text-green-600' },
    { label: 'Completed', value: progress.filter(p => p.status === 'completed').length, icon: CheckCircle, color: 'text-blue-600' },
    { label: 'At Risk', value: progress.filter(p => p.status === 'at-risk').length, icon: Target, color: 'text-yellow-600' }
  ]

  const programs = Array.from(new Set(progress.map(p => p.programName)))

  const getTimeSpentText = (hours: number) => {
    if (hours < 1) return '< 1 hour'
    if (hours === 1) return '1 hour'
    return `${hours} hours`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Individual Progress</h1>
          <p className="text-gray-600">Track and monitor individual learner progress across all programs</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export Progress
          </button>
          <button className="btn-primary">
            <BarChart3 className="w-4 h-4" />
            Progress Report
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

      {/* Filters and Search */}
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
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="at-risk">At Risk</option>
              <option value="dropped">Dropped</option>
            </select>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
            >
              <option value="all">All Programs</option>
              {programs.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Progress Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Learner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program/Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modules</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProgress.map((learner) => (
                <tr key={learner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{learner.learnerName}</div>
                      <div className="text-sm text-gray-500">{learner.learnerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{learner.programName}</div>
                      <div className="text-sm text-gray-500">{learner.courseName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(learner.overallProgress)}`}
                          style={{ width: `${learner.overallProgress}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getProgressColor(learner.overallProgress)}`}>
                        {learner.overallProgress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {learner.completedModules}/{learner.totalModules}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {learner.completedAssessments}/{learner.totalAssessments}
                    </div>
                    {learner.averageScore > 0 && (
                      <div className={`text-xs font-medium ${getScoreColor(learner.averageScore)}`}>
                        Avg: {learner.averageScore}%
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getTimeSpentText(learner.timeSpent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(learner.status)}`}>
                      {learner.status.charAt(0).toUpperCase() + learner.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedLearner(learner)
                          setShowDetailModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Learner Progress Detail Modal */}
      {showDetailModal && selectedLearner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Learner Progress Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Learner Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedLearner.learnerName}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedLearner.learnerEmail}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLearner.status)}`}>
                      {selectedLearner.status.charAt(0).toUpperCase() + selectedLearner.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Program Details</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Program:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedLearner.programName}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Course:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedLearner.courseName}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Instructor:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedLearner.instructor}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Progress Overview</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Overall Progress:</span>
                    <span className={`ml-2 text-sm font-medium ${getProgressColor(selectedLearner.overallProgress)}`}>
                      {selectedLearner.overallProgress}%
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Modules Completed:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {selectedLearner.completedModules}/{selectedLearner.totalModules}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Assessments Completed:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {selectedLearner.completedAssessments}/{selectedLearner.totalAssessments}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Performance Metrics</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Average Score:</span>
                    <span className={`ml-2 text-sm font-medium ${getScoreColor(selectedLearner.averageScore)}`}>
                      {selectedLearner.averageScore > 0 ? `${selectedLearner.averageScore}%` : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Time Spent:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {getTimeSpentText(selectedLearner.timeSpent)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Next Milestone:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedLearner.nextMilestone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Progress Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Modules Progress</span>
                    <span className="font-medium">{Math.round((selectedLearner.completedModules / selectedLearner.totalModules) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${(selectedLearner.completedModules / selectedLearner.totalModules) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Assessments Progress</span>
                    <span className="font-medium">{Math.round((selectedLearner.completedAssessments / selectedLearner.totalAssessments) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `${(selectedLearner.completedAssessments / selectedLearner.totalAssessments) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-medium">{selectedLearner.overallProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(selectedLearner.overallProgress)}`}
                      style={{ width: `${selectedLearner.overallProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
              <button className="btn-primary">
                <Edit className="w-4 h-4 mr-2" />
                Update Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IndividualProgressPage
