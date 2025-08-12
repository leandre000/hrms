import { useState } from 'react'
import { 
  Search, 
  Plus, 
  Users, 
  CheckSquare, 
  Clock, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  BarChart3,
  Target,
  Calendar,
  BookOpen,
  Award,
  Activity,
  FileText,
  Play,
  Pause,
  StopCircle,
  X
} from 'lucide-react'

interface SkillAssessment {
  id: string
  title: string
  description: string
  skillArea: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  questionCount: number
  timeLimit: number // in minutes
  passingScore: number
  totalAttempts: number
  averageScore: number
  status: 'draft' | 'active' | 'paused' | 'archived'
  createdDate: string
  lastModified: string
  instructor: string
  targetAudience: string[]
  tags: string[]
}

const mockAssessments: SkillAssessment[] = [
  {
    id: 'ASS001',
    title: 'Digital Marketing Fundamentals',
    description: 'Comprehensive assessment covering core digital marketing concepts and strategies',
    skillArea: 'Digital Marketing',
    difficulty: 'beginner',
    questionCount: 25,
    timeLimit: 45,
    passingScore: 70,
    totalAttempts: 156,
    averageScore: 78,
    status: 'active',
    createdDate: '2024-01-15',
    lastModified: '2024-03-10',
    instructor: 'Michael Chen',
    targetAudience: ['Marketing Students', 'Career Changers', 'Entry-level Professionals'],
    tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics']
  },
  {
    id: 'ASS002',
    title: 'React.js Advanced Concepts',
    description: 'Advanced React patterns, hooks, and state management assessment',
    skillArea: 'Web Development',
    difficulty: 'advanced',
    questionCount: 30,
    timeLimit: 60,
    passingScore: 75,
    totalAttempts: 89,
    averageScore: 72,
    status: 'active',
    createdDate: '2024-01-20',
    lastModified: '2024-03-15',
    instructor: 'Emily Watson',
    targetAudience: ['Frontend Developers', 'React Developers', 'Senior Developers'],
    tags: ['React Hooks', 'Context API', 'Performance', 'Testing']
  },
  {
    id: 'ASS003',
    title: 'Data Analysis with Python',
    description: 'Assessment covering pandas, numpy, and data visualization skills',
    skillArea: 'Data Science',
    difficulty: 'intermediate',
    questionCount: 35,
    timeLimit: 90,
    passingScore: 80,
    totalAttempts: 234,
    averageScore: 85,
    status: 'active',
    createdDate: '2024-01-10',
    lastModified: '2024-03-05',
    instructor: 'Dr. Robert Kim',
    targetAudience: ['Data Analysts', 'Data Scientists', 'Python Developers'],
    tags: ['Pandas', 'NumPy', 'Matplotlib', 'Data Cleaning']
  },
  {
    id: 'ASS004',
    title: 'Agile Project Management',
    description: 'Assessment on Agile methodologies, Scrum, and Kanban practices',
    skillArea: 'Project Management',
    difficulty: 'intermediate',
    questionCount: 20,
    timeLimit: 40,
    passingScore: 75,
    totalAttempts: 67,
    averageScore: 79,
    status: 'draft',
    createdDate: '2024-02-01',
    lastModified: '2024-03-20',
    instructor: 'Jennifer Lee',
    targetAudience: ['Project Managers', 'Team Leads', 'Scrum Masters'],
    tags: ['Scrum', 'Kanban', 'Sprint Planning', 'Retrospectives']
  },
  {
    id: 'ASS005',
    title: 'UX/UI Design Principles',
    description: 'Assessment covering user experience design fundamentals and best practices',
    skillArea: 'Design',
    difficulty: 'beginner',
    questionCount: 28,
    timeLimit: 50,
    passingScore: 70,
    totalAttempts: 123,
    averageScore: 76,
    status: 'paused',
    createdDate: '2024-01-25',
    lastModified: '2024-03-12',
    instructor: 'Alex Thompson',
    targetAudience: ['Design Students', 'UX Researchers', 'Product Designers'],
    tags: ['User Research', 'Wireframing', 'Prototyping', 'Usability']
  }
]

const SkillAssessmentsPage = () => {
  const [assessments, setAssessments] = useState<SkillAssessment[]>(mockAssessments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [skillAreaFilter, setSkillAreaFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [selectedAssessment, setSelectedAssessment] = useState<SkillAssessment | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.skillArea.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter
    const matchesSkillArea = skillAreaFilter === 'all' || assessment.skillArea === skillAreaFilter
    const matchesDifficulty = difficultyFilter === 'all' || assessment.difficulty === difficultyFilter
    
    return matchesSearch && matchesStatus && matchesSkillArea && matchesDifficulty
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'draft': return 'text-yellow-600 bg-yellow-100'
      case 'paused': return 'text-orange-600 bg-orange-100'
      case 'archived': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-blue-600 bg-blue-100'
      case 'advanced': return 'text-orange-600 bg-orange-100'
      case 'expert': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const quickStats = [
    { label: 'Total Assessments', value: assessments.length, icon: CheckSquare, color: 'text-blue-600' },
    { label: 'Active Assessments', value: assessments.filter(a => a.status === 'active').length, icon: Play, color: 'text-green-600' },
    { label: 'Total Attempts', value: assessments.reduce((sum, a) => sum + a.totalAttempts, 0), icon: Users, color: 'text-purple-600' },
    { label: 'Avg. Score', value: Math.round(assessments.reduce((sum, a) => sum + a.averageScore, 0) / assessments.length), icon: Target, color: 'text-orange-600' }
  ]

  const skillAreas = Array.from(new Set(assessments.map(a => a.skillArea)))

  const handleStatusChange = (assessmentId: string, newStatus: string) => {
    setAssessments(prev => prev.map(a => 
      a.id === assessmentId ? { ...a, status: newStatus as any } : a
    ))
  }

  const handleDeleteAssessment = (assessmentId: string) => {
    setAssessments(prev => prev.filter(a => a.id !== assessmentId))
  }

  const getTimeText = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skill Assessments</h1>
          <p className="text-gray-600">Create and manage skill assessments for learners</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export Results
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            Create Assessment
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
                placeholder="Search assessments, skill areas, or descriptions..."
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
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
              <option value="archived">Archived</option>
            </select>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={skillAreaFilter}
              onChange={(e) => setSkillAreaFilter(e.target.value)}
            >
              <option value="all">All Skill Areas</option>
              {skillAreas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssessments.map((assessment) => (
          <div key={assessment.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{assessment.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{assessment.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                  {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(assessment.difficulty)}`}>
                  {assessment.difficulty.charAt(0).toUpperCase() + assessment.difficulty.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-900">{assessment.skillArea}</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckSquare className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-500">{assessment.questionCount} questions</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-500">{getTimeText(assessment.timeLimit)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Target className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-500">Pass: {assessment.passingScore}%</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Performance</span>
                <span className={`font-medium ${getScoreColor(assessment.averageScore)}`}>
                  {assessment.averageScore}% avg
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getScoreColor(assessment.averageScore)}`}
                  style={{ width: `${assessment.averageScore}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {assessment.totalAttempts} attempts
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Instructor: {assessment.instructor}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setSelectedAssessment(assessment)
                    setShowDetailModal(true)
                  }}
                  className="p-1 text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-yellow-600 hover:text-yellow-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteAssessment(assessment.id)}
                  className="p-1 text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assessment Detail Modal */}
      {showDetailModal && selectedAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Assessment Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Basic Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Title:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAssessment.title}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Description:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAssessment.description}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAssessment.status)}`}>
                      {selectedAssessment.status.charAt(0).toUpperCase() + selectedAssessment.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Difficulty:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(selectedAssessment.difficulty)}`}>
                      {selectedAssessment.difficulty.charAt(0).toUpperCase() + selectedAssessment.difficulty.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Assessment Details</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Skill Area:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAssessment.skillArea}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Questions:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAssessment.questionCount}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Time Limit:</span>
                    <span className="ml-2 text-sm text-gray-900">{getTimeText(selectedAssessment.timeLimit)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Passing Score:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAssessment.passingScore}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Performance Metrics</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Total Attempts:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAssessment.totalAttempts}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Average Score:</span>
                    <span className={`ml-2 text-sm font-medium ${getScoreColor(selectedAssessment.averageScore)}`}>
                      {selectedAssessment.averageScore}%
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Instructor:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedAssessment.instructor}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Target Audience & Tags</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Target Audience:</span>
                    <div className="ml-2 mt-1">
                      {selectedAssessment.targetAudience.map((audience, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Tags:</span>
                    <div className="ml-2 mt-1">
                      {selectedAssessment.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Performance Trends</h3>
              <div className="h-32 bg-white border border-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Performance chart visualization would go here</p>
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
                Edit Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillAssessmentsPage
