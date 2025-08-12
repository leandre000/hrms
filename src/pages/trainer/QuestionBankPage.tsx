import { useState } from 'react'
import { Search, Plus, Filter, Edit, Trash2, Copy, Eye, CheckSquare, MessageSquare, FileText, Clock, Award, Users, BarChart3, Download, RefreshCw, X } from 'lucide-react'

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'matching' | 'fill-blank'
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  subcategory: string
  tags: string[]
  usageCount: number
  lastUsed: string
  createdBy: string
  createdAt: string
  isActive: boolean
}

const mockQuestions: Question[] = [
  {
    id: 'Q001',
    type: 'multiple-choice',
    question: 'What is the primary purpose of React hooks?',
    options: [
      'To manage component state and side effects',
      'To create new components',
      'To style components',
      'To handle routing'
    ],
    correctAnswer: 'To manage component state and side effects',
    points: 10,
    difficulty: 'medium',
    category: 'Technical Skills',
    subcategory: 'Frontend Development',
    tags: ['react', 'hooks', 'javascript'],
    usageCount: 45,
    lastUsed: '2024-03-15',
    createdBy: 'Alex Chen',
    createdAt: '2024-01-10',
    isActive: true
  },
  {
    id: 'Q002',
    type: 'true-false',
    question: 'TypeScript is a superset of JavaScript that adds static typing.',
    correctAnswer: 'True',
    points: 5,
    difficulty: 'easy',
    category: 'Technical Skills',
    subcategory: 'Programming Languages',
    tags: ['typescript', 'javascript', 'programming'],
    usageCount: 32,
    lastUsed: '2024-03-18',
    createdBy: 'Maria Garcia',
    createdAt: '2024-01-15',
    isActive: true
  },
  {
    id: 'Q003',
    type: 'short-answer',
    question: 'Explain the concept of RESTful API design principles.',
    points: 15,
    difficulty: 'hard',
    category: 'Technical Skills',
    subcategory: 'Backend Development',
    tags: ['api', 'rest', 'web-development'],
    usageCount: 18,
    lastUsed: '2024-03-10',
    createdBy: 'David Wilson',
    createdAt: '2024-01-20',
    isActive: true
  },
  {
    id: 'Q004',
    type: 'multiple-choice',
    question: 'Which of the following is NOT a principle of Agile methodology?',
    options: [
      'Individuals and interactions over processes and tools',
      'Working software over comprehensive documentation',
      'Customer collaboration over contract negotiation',
      'Following a strict plan over responding to change'
    ],
    correctAnswer: 'Following a strict plan over responding to change',
    points: 10,
    difficulty: 'medium',
    category: 'Soft Skills',
    subcategory: 'Project Management',
    tags: ['agile', 'methodology', 'project-management'],
    usageCount: 28,
    lastUsed: '2024-03-12',
    createdBy: 'Lisa Thompson',
    createdAt: '2024-01-25',
    isActive: true
  },
  {
    id: 'Q005',
    type: 'essay',
    question: 'Describe the key differences between leadership and management in a professional context.',
    points: 20,
    difficulty: 'hard',
    category: 'Soft Skills',
    subcategory: 'Leadership',
    tags: ['leadership', 'management', 'soft-skills'],
    usageCount: 12,
    lastUsed: '2024-03-05',
    createdBy: 'Alex Chen',
    createdAt: '2024-02-01',
    isActive: true
  }
]

const QuestionBankPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [showQuestionModal, setShowQuestionModal] = useState(false)

  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = 
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = typeFilter === 'all' || question.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter
    const matchesDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter
    const matchesStatus = statusFilter === 'all' || question.isActive === (statusFilter === 'active')

    return matchesSearch && matchesType && matchesCategory && matchesDifficulty && matchesStatus
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice': return CheckSquare
      case 'true-false': return CheckSquare
      case 'short-answer': return MessageSquare
      case 'essay': return FileText
      case 'matching': return Copy
      case 'fill-blank': return FileText
      default: return FileText
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple-choice': return 'Multiple Choice'
      case 'true-false': return 'True/False'
      case 'short-answer': return 'Short Answer'
      case 'essay': return 'Essay'
      case 'matching': return 'Matching'
      case 'fill-blank': return 'Fill in the Blank'
      default: return type
    }
  }

  const quickStats = [
    { label: 'Total Questions', value: mockQuestions.length, icon: FileText, color: 'text-blue-600' },
    { label: 'Active Questions', value: mockQuestions.filter(q => q.isActive).length, icon: CheckSquare, color: 'text-green-600' },
    { label: 'Most Used', value: Math.max(...mockQuestions.map(q => q.usageCount)), icon: BarChart3, color: 'text-purple-600' },
    { label: 'Categories', value: new Set(mockQuestions.map(q => q.category)).size, icon: Award, color: 'text-orange-600' }
  ]

  const uniqueCategories = [...new Set(mockQuestions.map(q => q.category))]
  const uniqueTypes = [...new Set(mockQuestions.map(q => q.type))]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
          <p className="text-gray-600">Manage and organize assessment questions</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            Add Question
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
                placeholder="Search questions, categories, or tags..."
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{getTypeLabel(type)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredQuestions.length} of {mockQuestions.length} questions
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

      {/* Questions Table */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuestions.map((question) => {
                  const TypeIcon = getTypeIcon(question.type)
                  return (
                    <tr key={question.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">
                            {question.question}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {question.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                {tag}
                              </span>
                            ))}
                            {question.tags.length > 3 && (
                              <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                +{question.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <TypeIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{getTypeLabel(question.type)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{question.category}</div>
                          <div className="text-sm text-gray-500">{question.subcategory}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {question.points} pts
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{question.usageCount}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(question.lastUsed).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedQuestion(question)
                              setShowQuestionModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestions.map((question) => {
            const TypeIcon = getTypeIcon(question.type)
            return (
              <div key={question.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TypeIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{getTypeLabel(question.type)}</span>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-900 mb-3 line-clamp-3">{question.question}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900">{question.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Points:</span>
                    <span className="text-gray-900">{question.points} pts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Used:</span>
                    <span className="text-gray-900">{question.usageCount} times</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {question.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {tag}
                    </span>
                  ))}
                  {question.tags.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      +{question.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedQuestion(question)
                      setShowQuestionModal(true)
                    }}
                    className="flex-1 px-3 py-2 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    View Details
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Question Detail Modal */}
      {showQuestionModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Question Details</h2>
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Question</h3>
                  <p className="text-gray-700">{selectedQuestion.question}</p>
                </div>
                
                {selectedQuestion.options && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Options</h3>
                    <div className="space-y-2">
                      {selectedQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border ${
                            selectedQuestion.correctAnswer === option ? 'bg-primary-600 border-primary-600' : 'border-gray-300'
                          }`} />
                          <span className="text-gray-700">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Type:</span>
                    <p className="text-gray-900">{getTypeLabel(selectedQuestion.type)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Difficulty:</span>
                    <p className="text-gray-900">{selectedQuestion.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Points:</span>
                    <p className="text-gray-900">{selectedQuestion.points}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Usage Count:</span>
                    <p className="text-gray-900">{selectedQuestion.usageCount}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuestion.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="btn-primary flex-1">
                  <Edit className="w-4 h-4" />
                  Edit Question
                </button>
                <button className="btn-secondary flex-1">
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionBankPage
