import React, { useState } from 'react'
import { TrendingUp, Brain, BarChart3, Target, Users, Clock, Eye, Download, Filter, Search, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface Prediction {
  id: string
  learnerName: string
  courseName: string
  predictionType: 'completion' | 'performance' | 'engagement' | 'dropout'
  confidence: number
  predictedValue: string
  currentValue: string
  riskLevel: 'low' | 'medium' | 'high'
  factors: string[]
  lastUpdated: string
  status: 'active' | 'resolved' | 'expired'
}

const mockPredictions: Prediction[] = [
  {
    id: '1',
    learnerName: 'John Doe',
    courseName: 'Advanced React Development',
    predictionType: 'completion',
    confidence: 0.89,
    predictedValue: '95% completion',
    currentValue: '78% completion',
    riskLevel: 'low',
    factors: ['High engagement', 'Consistent progress', 'Good quiz scores'],
    lastUpdated: '2024-01-20',
    status: 'active'
  },
  {
    id: '2',
    learnerName: 'Jane Smith',
    courseName: 'Data Science Fundamentals',
    predictionType: 'dropout',
    confidence: 0.76,
    predictedValue: 'High dropout risk',
    currentValue: '45% completion',
    riskLevel: 'high',
    factors: ['Low engagement', 'Missed deadlines', 'Poor quiz performance'],
    lastUpdated: '2024-01-19',
    status: 'active'
  },
  {
    id: '3',
    learnerName: 'Mike Johnson',
    courseName: 'UI/UX Design Principles',
    predictionType: 'performance',
    confidence: 0.82,
    predictedValue: 'A grade',
    currentValue: 'B+ grade',
    riskLevel: 'medium',
    factors: ['Good project work', 'Inconsistent attendance', 'Mixed quiz scores'],
    lastUpdated: '2024-01-18',
    status: 'active'
  }
]

const predictionTypes = ['All Types', 'completion', 'performance', 'engagement', 'dropout']
const riskLevels = ['All Levels', 'low', 'medium', 'high']
const statuses = ['All Status', 'active', 'resolved', 'expired']

const PredictionsPage = () => {
  const [predictions, setPredictions] = useState<Prediction[]>(mockPredictions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedRisk, setSelectedRisk] = useState('All Levels')
  const [selectedStatus, setSelectedStatus] = useState('All Status')

  const filteredPredictions = predictions.filter(prediction => {
    const matchesSearch = prediction.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prediction.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'All Types' || prediction.predictionType === selectedType
    const matchesRisk = selectedRisk === 'All Levels' || prediction.riskLevel === selectedRisk
    const matchesStatus = selectedStatus === 'All Status' || prediction.status === selectedStatus

    return matchesSearch && matchesType && matchesRisk && matchesStatus
  })

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPredictionTypeIcon = (type: string) => {
    switch (type) {
      case 'completion': return <Target className="w-5 h-5 text-blue-500" />
      case 'performance': return <BarChart3 className="w-5 h-5 text-green-500" />
      case 'engagement': return <Users className="w-5 h-5 text-purple-500" />
      case 'dropout': return <AlertTriangle className="w-5 h-5 text-red-500" />
      default: return <TrendingUp className="w-5 h-5 text-gray-500" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Performance Predictions</h1>
          <p className="text-gray-600">AI-powered insights and predictions for learner performance</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Generate Predictions
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Predictions</p>
              <p className="text-2xl font-bold text-gray-900">{predictions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">High Confidence</p>
              <p className="text-2xl font-bold text-gray-900">
                {predictions.filter(p => p.confidence >= 0.8).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">
                {predictions.filter(p => p.riskLevel === 'high').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {predictions.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search learners or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {predictionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {riskLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Predictions List */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current vs Predicted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPredictions.map((prediction) => (
                <tr key={prediction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getPredictionTypeIcon(prediction.predictionType)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{prediction.learnerName}</div>
                        <div className="text-sm text-gray-500">{prediction.courseName}</div>
                        <div className="text-xs text-gray-400 mt-1">Updated: {prediction.lastUpdated}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {prediction.predictionType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {(prediction.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelColor(prediction.riskLevel)} capitalize`}>
                      {prediction.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{prediction.currentValue}</div>
                      <div className="text-gray-500">→ {prediction.predictedValue}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(prediction.status)} capitalize`}>
                      {prediction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <Filter className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Factors Summary */}
      <div className="mt-6 bg-white rounded-lg border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Prediction Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Positive Factors</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• High engagement levels</li>
              <li>• Consistent progress</li>
              <li>• Good quiz performance</li>
              <li>• Regular attendance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Risk Factors</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Low engagement</li>
              <li>• Missed deadlines</li>
              <li>• Poor quiz scores</li>
              <li>• Irregular attendance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionsPage
