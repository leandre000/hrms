import { useState } from 'react'
import { Search, Filter, Download, Eye, CheckCircle, XCircle, MessageSquare, Clock, Award, Users, BarChart3, Send, Save } from 'lucide-react'

interface Submission {
  id: string
  learnerName: string
  learnerEmail: string
  assessmentName: string
  submittedAt: string
  status: 'pending' | 'graded' | 'feedback-given'
  score: number
  totalPoints: number
  percentage: number
  timeSpent: number
  questions: QuestionSubmission[]
  feedback: string
  gradedBy?: string
  gradedAt?: string
}

interface QuestionSubmission {
  id: string
  question: string
  questionType: string
  learnerAnswer: string
  correctAnswer: string
  points: number
  earnedPoints: number
  feedback: string
  isCorrect: boolean
}

const mockSubmissions: Submission[] = [
  {
    id: 'SUB001',
    learnerName: 'Sarah Johnson',
    learnerEmail: 'sarah.johnson@company.com',
    assessmentName: 'React Fundamentals Essay',
    submittedAt: '2024-03-20T14:30:00Z',
    status: 'pending',
    score: 0,
    totalPoints: 100,
    percentage: 0,
    timeSpent: 45,
    questions: [
      {
        id: 'Q1',
        question: 'Explain the concept of React hooks and provide examples.',
        questionType: 'essay',
        learnerAnswer: 'React hooks are functions that allow you to use state and other React features in functional components. Examples include useState for managing state and useEffect for handling side effects.',
        correctAnswer: 'React hooks are functions that allow you to use state and other React features in functional components. Examples include useState for managing state and useEffect for handling side effects.',
        points: 50,
        earnedPoints: 0,
        feedback: '',
        isCorrect: false
      },
      {
        id: 'Q2',
        question: 'Describe the difference between controlled and uncontrolled components.',
        questionType: 'essay',
        learnerAnswer: 'Controlled components have their state controlled by React, while uncontrolled components manage their own state internally.',
        correctAnswer: 'Controlled components have their state controlled by React, while uncontrolled components manage their own state internally.',
        points: 50,
        earnedPoints: 0,
        feedback: '',
        isCorrect: false
      }
    ],
    feedback: ''
  },
  {
    id: 'SUB002',
    learnerName: 'Michael Brown',
    learnerEmail: 'michael.brown@company.com',
    assessmentName: 'JavaScript Coding Challenge',
    submittedAt: '2024-03-19T16:45:00Z',
    status: 'graded',
    score: 85,
    totalPoints: 100,
    percentage: 85,
    timeSpent: 38,
    questions: [
      {
        id: 'Q1',
        question: 'Write a function to find the maximum number in an array.',
        questionType: 'coding',
        learnerAnswer: 'function findMax(arr) { return Math.max(...arr); }',
        correctAnswer: 'function findMax(arr) { return Math.max(...arr); }',
        points: 50,
        earnedPoints: 45,
        feedback: 'Good solution! Consider adding input validation.',
        isCorrect: true
      },
      {
        id: 'Q2',
        question: 'Explain the concept of closures in JavaScript.',
        questionType: 'essay',
        learnerAnswer: 'A closure is a function that has access to variables in its outer scope.',
        correctAnswer: 'A closure is a function that has access to variables in its outer scope.',
        points: 50,
        earnedPoints: 40,
        feedback: 'Correct but could be more detailed with examples.',
        isCorrect: true
      }
    ],
    feedback: 'Good work overall! Your coding solution was efficient. Consider adding more detail to your explanations.',
    gradedBy: 'Alex Chen',
    gradedAt: '2024-03-19T17:30:00Z'
  },
  {
    id: 'SUB003',
    learnerName: 'Emily Davis',
    learnerEmail: 'emily.davis@company.com',
    assessmentName: 'Leadership Case Study',
    submittedAt: '2024-03-18T11:20:00Z',
    status: 'feedback-given',
    score: 92,
    totalPoints: 100,
    percentage: 92,
    timeSpent: 52,
    questions: [
      {
        id: 'Q1',
        question: 'Analyze the leadership style in the given case study.',
        questionType: 'case-study',
        learnerAnswer: 'The leader demonstrates transformational leadership by inspiring and motivating the team.',
        correctAnswer: 'The leader demonstrates transformational leadership by inspiring and motivating the team.',
        points: 100,
        earnedPoints: 92,
        feedback: 'Excellent analysis with good examples. Could include more critical evaluation.',
        isCorrect: true
      }
    ],
    feedback: 'Outstanding work! Your analysis shows deep understanding of leadership concepts.',
    gradedBy: 'Lisa Thompson',
    gradedAt: '2024-03-18T14:15:00Z'
  }
]

const GradingPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [assessmentFilter, setAssessmentFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [showGradingModal, setShowGradingModal] = useState(false)
  const [gradingData, setGradingData] = useState<{ [key: string]: { points: number; feedback: string } }>({})

  const filteredSubmissions = mockSubmissions.filter(submission => {
    const matchesSearch = 
      submission.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.learnerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.assessmentName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter
    const matchesAssessment = assessmentFilter === 'all' || submission.assessmentName === assessmentFilter

    return matchesSearch && matchesStatus && matchesAssessment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'graded': return 'bg-green-100 text-green-800'
      case 'feedback-given': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock
      case 'graded': return CheckCircle
      case 'feedback-given': return MessageSquare
      default: return Clock
    }
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 80) return 'text-blue-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const quickStats = [
    { 
      label: 'Total Submissions', 
      value: mockSubmissions.length, 
      icon: Users, 
      color: 'text-blue-600'
    },
    { 
      label: 'Pending Grading', 
      value: mockSubmissions.filter(s => s.status === 'pending').length, 
      icon: Clock, 
      color: 'text-yellow-600'
    },
    { 
      label: 'Graded', 
      value: mockSubmissions.filter(s => s.status === 'graded').length, 
      icon: CheckCircle, 
      color: 'text-green-600'
    },
    { 
      label: 'Feedback Given', 
      value: mockSubmissions.filter(s => s.status === 'feedback-given').length, 
      icon: MessageSquare, 
      color: 'text-blue-600'
    }
  ]

  const uniqueAssessments = [...new Set(mockSubmissions.map(s => s.assessmentName))]

  const handleGradeSubmission = (submission: Submission) => {
    setSelectedSubmission(submission)
    // Initialize grading data
    const initialGradingData: { [key: string]: { points: number; feedback: string } } = {}
    submission.questions.forEach(q => {
      initialGradingData[q.id] = { points: q.points, feedback: '' }
    })
    setGradingData(initialGradingData)
    setShowGradingModal(true)
  }

  const handleSaveGrade = () => {
    if (!selectedSubmission) return

    // Calculate total score
    let totalScore = 0
    selectedSubmission.questions.forEach(q => {
      const grading = gradingData[q.id]
      if (grading) {
        totalScore += grading.points
      }
    })

    // Update submission
    const updatedSubmission = {
      ...selectedSubmission,
      score: totalScore,
      percentage: Math.round((totalScore / selectedSubmission.totalPoints) * 100),
      status: 'graded' as const,
      gradedBy: 'Current Trainer',
      gradedAt: new Date().toISOString()
    }

    // Update questions with feedback
    updatedSubmission.questions = updatedSubmission.questions.map(q => {
      const grading = gradingData[q.id]
      if (grading) {
        return {
          ...q,
          earnedPoints: grading.points,
          feedback: grading.feedback,
          isCorrect: grading.points === q.points
        }
      }
      return q
    })

    // In a real app, you would save this to the backend
    console.log('Graded submission:', updatedSubmission)
    
    setShowGradingModal(false)
    setSelectedSubmission(null)
    setGradingData({})
  }

  const updateGradingData = (questionId: string, field: 'points' | 'feedback', value: string | number) => {
    setGradingData(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grading & Feedback</h1>
          <p className="text-gray-600">Grade assessments and provide feedback to learners</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export Grades
          </button>
          <button className="btn-primary">
            <BarChart3 className="w-4 h-4" />
            Grading Analytics
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
                placeholder="Search learners, assessments, or submissions..."
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
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="graded">Graded</option>
                  <option value="feedback-given">Feedback Given</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assessment</label>
                <select
                  value={assessmentFilter}
                  onChange={(e) => setAssessmentFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Assessments</option>
                  {uniqueAssessments.map(assessment => (
                    <option key={assessment} value={assessment}>{assessment}</option>
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
          Showing {filteredSubmissions.length} of {mockSubmissions.length} submissions
        </p>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Learner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => {
                const StatusIcon = getStatusIcon(submission.status)
                return (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{submission.learnerName}</div>
                        <div className="text-sm text-gray-500">{submission.learnerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{submission.assessmentName}</div>
                        <div className="text-sm text-gray-500">{submission.questions.length} questions</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.status === 'pending' ? (
                        <span className="text-sm text-gray-500">Not graded</span>
                      ) : (
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${getPerformanceColor(submission.percentage)}`}
                              style={{ width: `${submission.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${getPerformanceColor(submission.percentage)}`}>
                            {submission.score}/{submission.totalPoints} ({submission.percentage}%)
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="w-4 h-4 mr-2" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission)
                            setShowGradingModal(true)
                          }}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {submission.status === 'pending' && (
                          <button
                            onClick={() => handleGradeSubmission(submission)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grading Modal */}
      {showGradingModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Grade Submission - {selectedSubmission.learnerName}
                </h2>
                <button
                  onClick={() => setShowGradingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Submission Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Assessment:</span>
                      <p className="text-gray-900">{selectedSubmission.assessmentName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Submitted:</span>
                      <p className="text-gray-900">
                        {new Date(selectedSubmission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Time Spent:</span>
                      <p className="text-gray-900">{selectedSubmission.timeSpent} minutes</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Total Points:</span>
                      <p className="text-gray-900">{selectedSubmission.totalPoints}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Grade Questions</h3>
                  {selectedSubmission.questions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                          <span className="text-sm text-gray-600">{question.points} points</span>
                        </div>
                        <p className="text-gray-700 mb-3">{question.question}</p>
                        
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-600">Learner's Answer:</span>
                          <p className="text-gray-700 mt-1 bg-gray-50 p-3 rounded">
                            {question.learnerAnswer}
                          </p>
                        </div>
                        
                        {question.correctAnswer && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-600">Correct Answer:</span>
                            <p className="text-gray-700 mt-1 bg-green-50 p-3 rounded">
                              {question.correctAnswer}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Points Awarded
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={question.points}
                            value={gradingData[question.id]?.points || 0}
                            onChange={(e) => updateGradingData(question.id, 'points', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Feedback
                          </label>
                          <textarea
                            value={gradingData[question.id]?.feedback || ''}
                            onChange={(e) => updateGradingData(question.id, 'feedback', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Provide constructive feedback..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Feedback
                  </label>
                  <textarea
                    value={selectedSubmission.feedback}
                    onChange={(e) => {
                      // In a real app, you would update the submission object
                      console.log('Overall feedback:', e.target.value)
                    }}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Provide overall feedback for the learner..."
                  />
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowGradingModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGrade}
                  className="btn-primary flex-1"
                >
                  <Save className="w-4 h-4" />
                  Save Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GradingPage
