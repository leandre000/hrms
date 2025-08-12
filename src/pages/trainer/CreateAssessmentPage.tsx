import { useState } from 'react'
import { Plus, Trash2, Save, Eye, Copy, Settings, FileText, CheckSquare, MessageSquare, Clock, Award, Users, BarChart3 } from 'lucide-react'

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'matching' | 'fill-blank'
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  explanation?: string
}

interface Assessment {
  id: string
  title: string
  description: string
  category: string
  duration: number
  passingScore: number
  totalPoints: number
  instructions: string
  isTimed: boolean
  allowRetakes: boolean
  showResults: boolean
  randomizeQuestions: boolean
  questions: Question[]
  targetAudience: string[]
  prerequisites: string[]
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

const CreateAssessmentPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [assessment, setAssessment] = useState<Partial<Assessment>>({
    title: '',
    description: '',
    category: '',
    duration: 60,
    passingScore: 70,
    totalPoints: 100,
    instructions: '',
    isTimed: true,
    allowRetakes: false,
    showResults: true,
    randomizeQuestions: false,
    questions: [],
    targetAudience: [],
    prerequisites: [],
    tags: [],
    status: 'draft'
  })

  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 10,
    difficulty: 'medium',
    category: ''
  })

  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice', icon: CheckSquare },
    { value: 'true-false', label: 'True/False', icon: CheckSquare },
    { value: 'short-answer', label: 'Short Answer', icon: MessageSquare },
    { value: 'essay', label: 'Essay', icon: FileText },
    { value: 'matching', label: 'Matching', icon: Copy },
    { value: 'fill-blank', label: 'Fill in the Blank', icon: FileText }
  ]

  const categories = [
    'Technical Skills', 'Soft Skills', 'Compliance', 'Product Knowledge', 
    'Safety Training', 'Leadership', 'Communication', 'Problem Solving'
  ]

  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'hard', label: 'Hard', color: 'text-red-600' }
  ]

  const handleSaveQuestion = () => {
    if (editingQuestionId) {
      setAssessment(prev => ({
        ...prev,
        questions: prev.questions?.map(q => 
          q.id === editingQuestionId ? { ...currentQuestion, id: editingQuestionId } as Question : q
        )
      }))
      setEditingQuestionId(null)
    } else {
      const newQuestion: Question = {
        ...currentQuestion,
        id: Date.now().toString()
      } as Question
      
      setAssessment(prev => ({
        ...prev,
        questions: [...(prev.questions || []), newQuestion],
        totalPoints: (prev.totalPoints || 0) + (newQuestion.points || 0)
      }))
    }

    setCurrentQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10,
      difficulty: 'medium',
      category: ''
    })
    setShowQuestionModal(false)
  }

  const handleEditQuestion = (question: Question) => {
    setCurrentQuestion(question)
    setEditingQuestionId(question.id)
    setShowQuestionModal(true)
  }

  const handleDeleteQuestion = (questionId: string) => {
    const question = assessment.questions?.find(q => q.id === questionId)
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions?.filter(q => q.id !== questionId),
      totalPoints: (prev.totalPoints || 0) - (question?.points || 0)
    }))
  }

  const handleDuplicateQuestion = (question: Question) => {
    const duplicatedQuestion: Question = {
      ...question,
      id: Date.now().toString(),
      question: `${question.question} (Copy)`
    }
    
    setAssessment(prev => ({
      ...prev,
      questions: [...(prev.questions || []), duplicatedQuestion],
      totalPoints: (prev.totalPoints || 0) + duplicatedQuestion.points
    }))
  }

  const updateQuestionOptions = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])]
    newOptions[index] = value
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }))
  }

  const addOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), '']
    }))
  }

  const removeOption = (index: number) => {
    const newOptions = currentQuestion.options?.filter((_, i) => i !== index)
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }))
  }

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Assessment details and settings' },
    { number: 2, title: 'Questions', description: 'Add and organize questions' },
    { number: 3, title: 'Settings & Rules', description: 'Configure assessment behavior' },
    { number: 4, title: 'Preview & Publish', description: 'Review and publish assessment' }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Assessment</h1>
          <p className="text-gray-600">Design comprehensive assessments and quizzes for learners</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button className="btn-primary">
            <Save className="w-4 h-4" />
            Save Draft
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step.number 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {step.number}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className={`text-xs ${
                  currentStep >= step.number ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-16 h-0.5 mx-4
                  ${currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {currentStep === 1 && (
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Title</label>
                <input
                  type="text"
                  value={assessment.title}
                  onChange={(e) => setAssessment(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter assessment title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={assessment.category}
                  onChange={(e) => setAssessment(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={assessment.duration}
                  onChange={(e) => setAssessment(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
                <input
                  type="number"
                  value={assessment.passingScore}
                  onChange={(e) => setAssessment(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={assessment.description}
                onChange={(e) => setAssessment(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe the assessment purpose and content"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
              <textarea
                value={assessment.instructions}
                onChange={(e) => setAssessment(prev => ({ ...prev, instructions: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Provide clear instructions for learners"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
              <button
                onClick={() => setShowQuestionModal(true)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>
            
            <div className="space-y-4">
              {assessment.questions?.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2 py-1 rounded">
                        Q{index + 1}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                      <span className="text-sm text-gray-600">{question.points} pts</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditQuestion(question)}
                        className="text-gray-600 hover:text-gray-800 p-1"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateQuestion(question)}
                        className="text-gray-600 hover:text-gray-800 p-1"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-900 mb-2">{question.question}</p>
                  
                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-1">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border ${
                            question.correctAnswer === option ? 'bg-primary-600 border-primary-600' : 'border-gray-300'
                          }`} />
                          <span className="text-sm text-gray-700">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {(!assessment.questions || assessment.questions.length === 0) && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No questions added yet</p>
                  <p className="text-sm">Click "Add Question" to get started</p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Settings & Rules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Assessment Behavior</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Timed Assessment</p>
                    <p className="text-xs text-gray-500">Enforce time limits</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assessment.isTimed}
                      onChange={(e) => setAssessment(prev => ({ ...prev, isTimed: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Allow Retakes</p>
                    <p className="text-xs text-gray-500">Let learners retake the assessment</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={assessment.allowRetakes}
                      onChange={(e) => setAssessment(prev => ({ ...prev, allowRetakes: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Preview & Publish</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assessment Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Title:</span>
                    <p className="text-gray-900">{assessment.title || 'Untitled Assessment'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Category:</span>
                    <p className="text-gray-900">{assessment.category || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Duration:</span>
                    <p className="text-gray-900">{assessment.duration} minutes</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Passing Score:</span>
                    <p className="text-gray-900">{assessment.passingScore}%</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Questions:</span>
                    <p className="text-gray-900">{assessment.questions?.length || 0} questions</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Total Points:</span>
                    <p className="text-gray-900">{assessment.totalPoints} points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex gap-3">
          {currentStep < 4 && (
            <button
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              className="btn-primary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateAssessmentPage
