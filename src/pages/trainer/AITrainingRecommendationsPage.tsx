import React, { useState } from 'react'
import {
  Lightbulb,
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Clock,
  Star,
  ArrowRight,
  Filter,
  Search,
  Brain,
  Zap
} from 'lucide-react'

interface AIRecommendation {
  id: string
  learnerName: string
  currentRole: string
  skillGaps: string[]
  recommendedPrograms: string[]
  confidence: number
  estimatedImpact: 'High' | 'Medium' | 'Low'
  priority: 'High' | 'Medium' | 'Low'
  lastUpdated: string
}

interface RecommendationInsight {
  id: string
  type: 'skill-gap' | 'career-path' | 'performance' | 'trend'
  title: string
  description: string
  learnersAffected: number
  impact: string
}

const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    learnerName: 'Alex Johnson',
    currentRole: 'Software Developer',
    skillGaps: ['Machine Learning', 'Data Analysis', 'Cloud Architecture'],
    recommendedPrograms: ['AI Fundamentals', 'Data Science Bootcamp', 'AWS Certification'],
    confidence: 92,
    estimatedImpact: 'High',
    priority: 'High',
    lastUpdated: '2024-12-20'
  },
  {
    id: '2',
    learnerName: 'Sarah Chen',
    currentRole: 'Project Manager',
    skillGaps: ['Agile Methodologies', 'Stakeholder Management', 'Risk Assessment'],
    recommendedPrograms: ['Agile Scrum Master', 'Advanced Project Management', 'Risk Management'],
    confidence: 88,
    estimatedImpact: 'High',
    priority: 'High',
    lastUpdated: '2024-12-19'
  },
  {
    id: '3',
    learnerName: 'Mike Rodriguez',
    currentRole: 'Marketing Specialist',
    skillGaps: ['Digital Marketing', 'Analytics', 'Content Strategy'],
    recommendedPrograms: ['Digital Marketing Mastery', 'Google Analytics', 'Content Marketing'],
    confidence: 85,
    estimatedImpact: 'Medium',
    priority: 'Medium',
    lastUpdated: '2024-12-18'
  }
]

const mockInsights: RecommendationInsight[] = [
  {
    id: '1',
    type: 'skill-gap',
    title: 'AI & Machine Learning Skills Gap',
    description: '47% of developers lack foundational AI/ML skills needed for current projects',
    learnersAffected: 23,
    impact: 'High - Project delays and technical debt'
  },
  {
    id: '2',
    type: 'career-path',
    title: 'Leadership Development Opportunity',
    description: '12 mid-level managers show high potential for senior leadership roles',
    learnersAffected: 12,
    impact: 'Medium - Succession planning and retention'
  },
  {
    id: '3',
    type: 'performance',
    title: 'Agile Methodology Adoption',
    description: 'Teams using Agile practices show 34% higher project success rates',
    learnersAffected: 18,
    impact: 'High - Improved project outcomes'
  }
]

const AITrainingRecommendationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [impactFilter, setImpactFilter] = useState<string>('all')
  const [selectedRecommendation, setSelectedRecommendation] = useState<AIRecommendation | null>(null)

  const filteredRecommendations = mockRecommendations.filter(rec => {
    const matchesSearch = rec.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rec.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === 'all' || rec.priority === priorityFilter
    const matchesImpact = impactFilter === 'all' || rec.estimatedImpact === impactFilter
    
    return matchesSearch && matchesPriority && matchesImpact
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'skill-gap': return <Target className="w-5 h-5" />
      case 'career-path': return <TrendingUp className="w-5 h-5" />
      case 'performance': return <Star className="w-5 h-5" />
      case 'trend': return <Zap className="w-5 h-5" />
      default: return <Lightbulb className="w-5 h-5" />
    }
  }

  const stats = {
    totalLearners: 156,
    recommendationsGenerated: 89,
    highPriority: mockRecommendations.filter(r => r.priority === 'High').length,
    avgConfidence: Math.round(mockRecommendations.reduce((sum, r) => sum + r.confidence, 0) / mockRecommendations.length)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Training Recommendations</h1>
          <p className="text-gray-600">AI-powered personalized training suggestions for your learners</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Generate New Recommendations
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
              <p className="text-sm text-gray-600">Recommendations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.recommendationsGenerated}</p>
            </div>
            <Lightbulb className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
            </div>
            <Target className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-bold text-green-600">{stats.avgConfidence}%</p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-5 h-5 text-blue-600 mr-2" />
              AI Insights
            </h3>
            <div className="space-y-4">
              {mockInsights.map((insight) => (
                <div key={insight.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{insight.learnersAffected} learners</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${insight.impact.includes('High') ? 'bg-red-100 text-red-800' : insight.impact.includes('Medium') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {insight.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search learners or roles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Priorities</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                  <select
                    value={impactFilter}
                    onChange={(e) => setImpactFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Impacts</option>
                    <option value="High">High Impact</option>
                    <option value="Medium">Medium Impact</option>
                    <option value="Low">Low Impact</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {filteredRecommendations.map((recommendation) => (
                  <div key={recommendation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{recommendation.learnerName}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(recommendation.priority)}`}>
                            {recommendation.priority} Priority
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(recommendation.estimatedImpact)}`}>
                            {recommendation.estimatedImpact} Impact
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{recommendation.currentRole}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">Skill Gaps Identified</h5>
                            <div className="flex flex-wrap gap-2">
                              {recommendation.skillGaps.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">Recommended Programs</h5>
                            <div className="space-y-1">
                              {recommendation.recommendedPrograms.map((program, index) => (
                                <div key={index} className="flex items-center text-sm text-blue-600">
                                  <BookOpen className="w-3 h-3 mr-2" />
                                  {program}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500 mb-2">Confidence</div>
                        <div className="text-2xl font-bold text-green-600">{recommendation.confidence}%</div>
                        <div className="text-xs text-gray-400 mt-1">Updated {recommendation.lastUpdated}</div>
                        <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" />
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

      {/* AI Model Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-green-800">Model Status</p>
              <p className="text-xs text-green-600">Active & Learning</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-blue-800">Last Training</p>
              <p className="text-xs text-blue-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-purple-800">Accuracy</p>
              <p className="text-xs text-purple-600">94.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AITrainingRecommendationsPage
