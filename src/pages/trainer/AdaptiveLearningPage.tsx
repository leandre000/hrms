import React, { useState } from 'react'
import {
  Brain,
  Target,
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Zap,
  Activity,
  BarChart3,
  Lightbulb
} from 'lucide-react'

interface AdaptivePath {
  id: string
  learnerName: string
  currentLevel: string
  learningStyle: string
  recommendedPath: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: number
  successProbability: number
  adaptiveFeatures: string[]
}

interface LearningRecommendation {
  id: string
  type: 'content' | 'assessment' | 'support' | 'acceleration'
  title: string
  description: string
  priority: 'High' | 'Medium' | 'Low'
  impact: string
}

const mockAdaptivePaths: AdaptivePath[] = [
  {
    id: '1',
    learnerName: 'Alex Johnson',
    currentLevel: 'Intermediate',
    learningStyle: 'Visual + Hands-on',
    recommendedPath: 'Project Management Advanced',
    difficulty: 'Advanced',
    estimatedTime: 32,
    successProbability: 89,
    adaptiveFeatures: ['Dynamic difficulty', 'Visual content', 'Interactive exercises']
  },
  {
    id: '2',
    learnerName: 'Sarah Chen',
    currentLevel: 'Beginner',
    learningStyle: 'Reading + Practice',
    recommendedPath: 'Agile Fundamentals',
    difficulty: 'Beginner',
    estimatedTime: 24,
    successProbability: 92,
    adaptiveFeatures: ['Step-by-step guidance', 'Practice scenarios', 'Progress tracking']
  },
  {
    id: '3',
    learnerName: 'Mike Rodriguez',
    currentLevel: 'Advanced',
    learningStyle: 'Problem-solving',
    recommendedPath: 'Data Science Mastery',
    difficulty: 'Advanced',
    estimatedTime: 40,
    successProbability: 78,
    adaptiveFeatures: ['Complex challenges', 'Real-world projects', 'Peer collaboration']
  }
]

const mockRecommendations: LearningRecommendation[] = [
  {
    id: '1',
    type: 'content',
    title: 'Personalized Content Curation',
    description: 'AI-curated content based on learning preferences and progress',
    priority: 'High',
    impact: 'Improves engagement by 35%'
  },
  {
    id: '2',
    type: 'assessment',
    title: 'Adaptive Assessments',
    description: 'Dynamic difficulty adjustment based on performance',
    priority: 'High',
    impact: 'Increases accuracy by 28%'
  },
  {
    id: '3',
    type: 'support',
    title: 'Intelligent Support System',
    description: 'Context-aware help and guidance when learners struggle',
    priority: 'Medium',
    impact: 'Reduces dropout rate by 22%'
  }
]

const AdaptiveLearningPage: React.FC = () => {
  const [selectedLearner, setSelectedLearner] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [selectedPath, setSelectedPath] = useState<AdaptivePath | null>(null)

  const filteredPaths = mockAdaptivePaths.filter(path => {
    const matchesLearner = selectedLearner === 'all' || path.learnerName === selectedLearner
    const matchesDifficulty = difficultyFilter === 'all' || path.difficulty === difficultyFilter
    
    return matchesLearner && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'content': return <BookOpen className="w-5 h-5" />
      case 'assessment': return <Target className="w-5 h-5" />
      case 'support': return <Lightbulb className="w-5 h-5" />
      case 'acceleration': return <Zap className="w-5 h-5" />
      default: return <Activity className="w-5 h-5" />
    }
  }

  const stats = {
    totalLearners: 156,
    adaptivePaths: mockAdaptivePaths.length,
    highSuccessRate: mockAdaptivePaths.filter(p => p.successProbability >= 80).length,
    avgSuccessProbability: Math.round(mockAdaptivePaths.reduce((sum, p) => sum + p.successProbability, 0) / mockAdaptivePaths.length)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Adaptive Learning</h1>
          <p className="text-gray-600">Personalized learning paths and adaptive content recommendations</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Generate New Paths
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Learners</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalLearners}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Adaptive Paths</p>
              <p className="text-2xl font-bold text-green-600">{stats.adaptivePaths}</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Success Rate</p>
              <p className="text-2xl font-bold text-purple-600">{stats.highSuccessRate}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Success Rate</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.avgSuccessProbability}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Recommendations */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
              Learning Recommendations
            </h3>
            <div className="space-y-4">
              {mockRecommendations.map((recommendation) => (
                <div key={recommendation.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(recommendation.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900">{recommendation.title}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(recommendation.priority)}`}>
                          {recommendation.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{recommendation.description}</p>
                      <span className="text-xs text-green-600 font-medium">{recommendation.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Adaptive Paths List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <select
                    value={selectedLearner}
                    onChange={(e) => setSelectedLearner(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Learners</option>
                    {mockAdaptivePaths.map((path) => (
                      <option key={path.learnerName} value={path.learnerName}>
                        {path.learnerName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {filteredPaths.map((path) => (
                  <div key={path.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{path.learnerName}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(path.difficulty)}`}>
                            {path.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">{path.currentLevel}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">Learning Profile</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Learning Style:</span>
                                <span className="text-sm font-medium text-gray-900">{path.learningStyle}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Recommended Path:</span>
                                <span className="text-sm font-medium text-blue-600">{path.recommendedPath}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Estimated Time:</span>
                                <span className="text-sm font-medium text-gray-900">{path.estimatedTime} hours</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">Adaptive Features</h5>
                            <div className="space-y-1">
                              {path.adaptiveFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500 mb-2">Success Probability</div>
                        <div className="text-2xl font-bold text-green-600">{path.successProbability}%</div>
                        <button 
                          onClick={() => setSelectedPath(path)}
                          className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Learning Engine Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Learning Engine Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-green-800">Engine Status</p>
              <p className="text-xs text-green-600">Active & Learning</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-blue-800">Personalization</p>
              <p className="text-xs text-blue-600">94.2%</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-purple-800">Content Adaptation</p>
              <p className="text-xs text-purple-600">89.7%</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-yellow-800">Learning Paths</p>
              <p className="text-xs text-yellow-600">156 Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdaptiveLearningPage
