import React, { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Brain,
  Zap,
  Activity
} from 'lucide-react'

interface PerformancePrediction {
  id: string
  learnerName: string
  currentProgram: string
  predictedScore: number
  confidence: number
  riskLevel: 'Low' | 'Medium' | 'High'
  predictedCompletion: string
  factors: string[]
  recommendations: string[]
}

interface PredictionInsight {
  id: string
  type: 'trend' | 'risk' | 'opportunity'
  title: string
  description: string
  impact: 'Positive' | 'Negative' | 'Neutral'
  learnersAffected: number
}

const mockPredictions: PerformancePrediction[] = [
  {
    id: '1',
    learnerName: 'Alex Johnson',
    currentProgram: 'Project Management',
    predictedScore: 87,
    confidence: 92,
    riskLevel: 'Low',
    predictedCompletion: '2024-01-15',
    factors: ['High engagement', 'Consistent progress', 'Strong background'],
    recommendations: ['Continue current pace', 'Consider advanced modules']
  },
  {
    id: '2',
    learnerName: 'Sarah Chen',
    currentProgram: 'Agile Development',
    predictedScore: 72,
    confidence: 78,
    riskLevel: 'Medium',
    predictedCompletion: '2024-02-01',
    factors: ['Inconsistent attendance', 'Mixed assessment scores'],
    recommendations: ['Increase study time', 'Seek additional support']
  },
  {
    id: '3',
    learnerName: 'Mike Rodriguez',
    currentProgram: 'Data Analysis',
    predictedScore: 94,
    confidence: 89,
    riskLevel: 'Low',
    predictedCompletion: '2024-01-10',
    factors: ['Excellent performance', 'Fast learning pace', 'Prior experience'],
    recommendations: ['Accelerate program', 'Explore advanced topics']
  }
]

const mockInsights: PredictionInsight[] = [
  {
    id: '1',
    type: 'trend',
    title: 'Performance Improvement Trend',
    description: 'Overall predicted scores increased by 8% compared to last quarter',
    impact: 'Positive',
    learnersAffected: 45,
  },
  {
    id: '2',
    type: 'risk',
    title: 'High-Risk Learners Identified',
    description: '12 learners show signs of potential program failure',
    impact: 'Negative',
    learnersAffected: 12,
  },
  {
    id: '3',
    type: 'opportunity',
    title: 'Acceleration Opportunities',
    description: '18 high-performing learners can complete programs early',
    impact: 'Positive',
    learnersAffected: 18,
  }
]

const PerformancePredictionsPage: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<string>('all')
  const [riskFilter, setRiskFilter] = useState<string>('all')
  const [selectedPrediction, setSelectedPrediction] = useState<PerformancePrediction | null>(null)

  const filteredPredictions = mockPredictions.filter(pred => {
    const matchesProgram = selectedProgram === 'all' || pred.currentProgram === selectedProgram
    const matchesRisk = riskFilter === 'all' || pred.riskLevel === riskFilter
    
    return matchesProgram && matchesRisk
  })

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Positive': return 'text-green-600'
      case 'Negative': return 'text-red-600'
      case 'Neutral': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const stats = {
    totalLearners: 156,
    highConfidence: mockPredictions.filter(p => p.confidence >= 80).length,
    lowRisk: mockPredictions.filter(p => p.riskLevel === 'Low').length,
    avgPredictedScore: Math.round(mockPredictions.reduce((sum, p) => sum + p.predictedScore, 0) / mockPredictions.length)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Predictions</h1>
          <p className="text-gray-600">AI-powered predictions for learner performance and training outcomes</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Generate New Predictions
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
              <p className="text-sm text-gray-600">High Confidence</p>
              <p className="text-2xl font-bold text-green-600">{stats.highConfidence}</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Risk</p>
              <p className="text-2xl font-bold text-blue-600">{stats.lowRisk}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Predicted Score</p>
              <p className="text-2xl font-bold text-purple-600">{stats.avgPredictedScore}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-5 h-5 text-blue-600 mr-2" />
              Prediction Insights
            </h3>
            <div className="space-y-4">
              {mockInsights.map((insight) => (
                <div key={insight.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {insight.type === 'trend' && <TrendingUp className="w-5 h-5 text-blue-500" />}
                      {insight.type === 'risk' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                      {insight.type === 'opportunity' && <Zap className="w-5 h-5 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{insight.learnersAffected} learners</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(insight.impact) === 'text-green-600' ? 'bg-green-100 text-green-800' : getImpactColor(insight.impact) === 'text-red-600' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
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

        {/* Predictions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Programs</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Agile Development">Agile Development</option>
                    <option value="Data Analysis">Data Analysis</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <select
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="Low">Low Risk</option>
                    <option value="Medium">Medium Risk</option>
                    <option value="High">High Risk</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {filteredPredictions.map((prediction) => (
                  <div key={prediction.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{prediction.learnerName}</h4>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(prediction.riskLevel)}`}>
                            {prediction.riskLevel} Risk
                          </span>
                          <span className="text-sm text-gray-500">{prediction.currentProgram}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">Prediction Details</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Predicted Score:</span>
                                <span className={`text-sm font-medium ${getScoreColor(prediction.predictedScore)}`}>
                                  {prediction.predictedScore}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Confidence:</span>
                                <span className="text-sm font-medium text-gray-900">{prediction.confidence}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Completion:</span>
                                <span className="text-sm font-medium text-gray-900">{prediction.predictedCompletion}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">Key Factors</h5>
                            <div className="space-y-1">
                              {prediction.factors.map((factor, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                  {factor}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500 mb-2">Confidence</div>
                        <div className="text-2xl font-bold text-green-600">{prediction.confidence}%</div>
                        <button 
                          onClick={() => setSelectedPrediction(prediction)}
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

      {/* AI Model Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Prediction Model Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <p className="text-sm font-medium text-blue-800">Prediction Accuracy</p>
              <p className="text-xs text-blue-600">87.3%</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-purple-800">Last Updated</p>
              <p className="text-xs text-purple-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-yellow-800">Data Quality</p>
              <p className="text-xs text-yellow-600">Excellent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformancePredictionsPage
