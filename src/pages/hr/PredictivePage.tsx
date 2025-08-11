import { useState } from 'react'
import {
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Search,
  RefreshCw,
  Plus,
  ArrowUp,
  ArrowDown,
  Minus,
  Play,
  Settings,
  DollarSign,
  GraduationCap
} from 'lucide-react'

interface PredictiveModel {
  id: string
  name: string
  type: 'attrition' | 'performance' | 'recruitment' | 'workforce_planning' | 'compensation' | 'training'
  status: 'active' | 'training' | 'evaluating' | 'deprecated'
  accuracy: number
  lastTrained: string
  nextTraining: string
  dataPoints: number
  features: string[]
  version: string
  description: string
  owner: string
}

interface Prediction {
  id: string
  modelId: string
  employeeId: string
  employeeName: string
  prediction: string
  confidence: number
  probability: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  factors: string[]
  timestamp: string
  status: 'active' | 'reviewed' | 'actioned' | 'expired'
}

interface WorkforceTrend {
  id: string
  metric: string
  currentValue: number
  predictedValue: number
  change: number
  changePercent: number
  confidence: number
  timeframe: string
  category: 'headcount' | 'attrition' | 'performance' | 'compensation' | 'skills'
  trend: 'up' | 'down' | 'stable'
}

interface ModelPerformance {
  id: string
  modelId: string
  metric: string
  value: number
  target: number
  status: 'above_target' | 'on_target' | 'below_target'
  trend: 'improving' | 'stable' | 'declining'
  lastUpdated: string
}

const PredictivePage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModelType, setSelectedModelType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data
  const predictiveModels: PredictiveModel[] = [
    {
      id: '1',
      name: 'Employee Attrition Predictor v2.1',
      type: 'attrition',
      status: 'active',
      accuracy: 87.3,
      lastTrained: '2024-01-15',
      nextTraining: '2024-02-15',
      dataPoints: 15420,
      features: ['tenure', 'performance_rating', 'salary_ratio', 'promotion_history', 'engagement_score'],
      version: '2.1.0',
      description: 'Predicts employee attrition risk based on historical patterns and current indicators',
      owner: 'Data Science Team'
    },
    {
      id: '2',
      name: 'Performance Prediction Model',
      type: 'performance',
      status: 'active',
      accuracy: 82.7,
      lastTrained: '2024-01-10',
      nextTraining: '2024-02-10',
      dataPoints: 12850,
      features: ['skills_assessment', 'training_completion', 'peer_feedback', 'project_success'],
      version: '1.8.2',
      description: 'Forecasts employee performance based on skills, training, and historical data',
      owner: 'HR Analytics Team'
    },
    {
      id: '3',
      name: 'Recruitment Success Predictor',
      type: 'recruitment',
      status: 'training',
      accuracy: 79.5,
      lastTrained: '2024-01-20',
      nextTraining: '2024-02-20',
      dataPoints: 8900,
      features: ['candidate_skills', 'interview_scores', 'experience_level', 'cultural_fit'],
      version: '1.5.1',
      description: 'Predicts recruitment success and candidate retention probability',
      owner: 'Talent Acquisition'
    },
    {
      id: '4',
      name: 'Workforce Planning Model',
      type: 'workforce_planning',
      status: 'active',
      accuracy: 91.2,
      lastTrained: '2024-01-05',
      nextTraining: '2024-02-05',
      dataPoints: 20100,
      features: ['business_growth', 'market_trends', 'skill_demand', 'retirement_patterns'],
      version: '3.0.0',
      description: 'Forecasts workforce needs and skill requirements for strategic planning',
      owner: 'Strategic HR'
    }
  ]

  const predictions: Prediction[] = [
    {
      id: '1',
      modelId: '1',
      employeeId: 'EMP001',
      employeeName: 'Sarah Johnson',
      prediction: 'High attrition risk',
      confidence: 87.3,
      probability: 0.89,
      riskLevel: 'high',
      factors: ['Low engagement score', 'No recent promotions', 'Below market salary'],
      timestamp: '2024-01-22 10:30:00',
      status: 'active'
    },
    {
      id: '2',
      modelId: '1',
      employeeId: 'EMP002',
      employeeName: 'Michael Chen',
      prediction: 'Medium attrition risk',
      confidence: 82.1,
      probability: 0.67,
      riskLevel: 'medium',
      factors: ['Declining performance', 'Limited growth opportunities'],
      timestamp: '2024-01-22 09:15:00',
      status: 'reviewed'
    },
    {
      id: '3',
      modelId: '2',
      employeeId: 'EMP003',
      employeeName: 'Emily Rodriguez',
      prediction: 'High performance potential',
      confidence: 85.9,
      probability: 0.92,
      riskLevel: 'low',
      factors: ['Strong skills assessment', 'High training completion', 'Positive peer feedback'],
      timestamp: '2024-01-22 11:45:00',
      status: 'actioned'
    }
  ]

  const workforceTrends: WorkforceTrend[] = [
    {
      id: '1',
      metric: 'Total Headcount',
      currentValue: 1250,
      predictedValue: 1320,
      change: 70,
      changePercent: 5.6,
      confidence: 89.2,
      timeframe: '6 months',
      category: 'headcount',
      trend: 'up'
    },
    {
      id: '2',
      metric: 'Attrition Rate',
      currentValue: 12.3,
      predictedValue: 14.8,
      change: 2.5,
      changePercent: 20.3,
      confidence: 87.1,
      timeframe: '3 months',
      category: 'attrition',
      trend: 'up'
    },
    {
      id: '3',
      metric: 'Average Performance Score',
      currentValue: 4.2,
      predictedValue: 4.1,
      change: -0.1,
      changePercent: -2.4,
      confidence: 83.7,
      timeframe: '6 months',
      category: 'performance',
      trend: 'down'
    },
    {
      id: '4',
      metric: 'Average Salary',
      currentValue: 75000,
      predictedValue: 78500,
      change: 3500,
      changePercent: 4.7,
      confidence: 91.5,
      timeframe: '12 months',
      category: 'compensation',
      trend: 'up'
    }
  ]

  const modelPerformance: ModelPerformance[] = [
    {
      id: '1',
      modelId: '1',
      metric: 'Precision',
      value: 0.89,
      target: 0.85,
      status: 'above_target',
      trend: 'improving',
      lastUpdated: '2024-01-22'
    },
    {
      id: '2',
      modelId: '1',
      metric: 'Recall',
      value: 0.84,
      target: 0.80,
      status: 'above_target',
      trend: 'stable',
      lastUpdated: '2024-01-22'
    },
    {
      id: '3',
      modelId: '2',
      metric: 'Accuracy',
      value: 0.82,
      target: 0.85,
      status: 'below_target',
      trend: 'declining',
      lastUpdated: '2024-01-22'
    },
    {
      id: '4',
      modelId: '3',
      metric: 'F1 Score',
      value: 0.78,
      target: 0.80,
      status: 'below_target',
      trend: 'stable',
      lastUpdated: '2024-01-22'
    }
  ]

  const overviewMetrics = {
    totalModels: 4,
    activeModels: 3,
    totalPredictions: 15420,
    averageAccuracy: 85.2,
    predictionsToday: 156,
    alertsGenerated: 23,
    modelsTraining: 1,
    lastUpdate: '2 hours ago'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'training': return 'bg-blue-100 text-blue-800'
      case 'evaluating': return 'bg-yellow-100 text-yellow-800'
      case 'deprecated': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getModelTypeIcon = (type: string) => {
    switch (type) {
      case 'attrition': return <Users className="w-5 h-5" />
      case 'performance': return <BarChart3 className="w-5 h-5" />
      case 'recruitment': return <Users className="w-5 h-5" />
      case 'workforce_planning': return <TrendingUp className="w-5 h-5" />
      case 'compensation': return <DollarSign className="w-5 h-5" />
      case 'training': return <GraduationCap className="w-5 h-5" />
      default: return <Activity className="w-5 h-5" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />
      default: return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getPerformanceStatusColor = (status: string) => {
    switch (status) {
      case 'above_target': return 'bg-green-100 text-green-800'
      case 'on_target': return 'bg-blue-100 text-blue-800'
      case 'below_target': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredModels = predictiveModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedModelType === 'all' || model.type === selectedModelType
    const matchesStatus = selectedStatus === 'all' || model.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const filteredPredictions = predictions.filter(prediction => {
    return prediction.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Predictive Analytics</h1>
          <p className="text-gray-600">AI-powered workforce predictions and strategic insights</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <RefreshCw size={20} />
            Refresh Models
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Model
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Models</p>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.activeModels}</p>
              <p className="text-sm text-gray-500">of {overviewMetrics.totalModels} total</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.averageAccuracy}%</p>
              <p className="text-sm text-gray-500">Model Performance</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Predictions Today</p>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.predictionsToday}</p>
              <p className="text-sm text-gray-500">Real-time Insights</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Alerts Generated</p>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.alertsGenerated}</p>
              <p className="text-sm text-gray-500">Risk Notifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search models, predictions, or employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedModelType}
              onChange={(e) => setSelectedModelType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="attrition">Attrition</option>
              <option value="performance">Performance</option>
              <option value="recruitment">Recruitment</option>
              <option value="workforce_planning">Workforce Planning</option>
              <option value="compensation">Compensation</option>
              <option value="training">Training</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="training">Training</option>
              <option value="evaluating">Evaluating</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'models', 'predictions', 'trends', 'performance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Health Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">Active Models</p>
                          <p className="text-sm text-gray-600">3 models running</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">Healthy</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Training Models</p>
                          <p className="text-sm text-gray-600">1 model in training</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">In Progress</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900">Model Updates</p>
                          <p className="text-sm text-gray-600">2 due this month</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">Scheduled</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Predictions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">High attrition risk detected</p>
                          <p className="text-sm text-gray-600">Sarah Johnson - 87% confidence</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">Performance potential identified</p>
                          <p className="text-sm text-gray-600">Emily Rodriguez - 92% confidence</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">4 hours ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">Medium risk alert</p>
                          <p className="text-sm text-gray-600">Michael Chen - 67% confidence</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Play className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Train Models</h4>
                        <p className="text-sm text-gray-600">Start model training cycle</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Generate Report</h4>
                        <p className="text-sm text-gray-600">Create prediction summary</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Settings className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Configure Alerts</h4>
                        <p className="text-sm text-gray-600">Set notification rules</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Models Tab */}
          {activeTab === 'models' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Predictive Models</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Model
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModels.map((model) => (
                  <div key={model.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getModelTypeIcon(model.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">{model.type.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{model.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Accuracy:</span>
                        <span className="font-medium text-green-600">{model.accuracy}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Data Points:</span>
                        <span className="font-medium">{model.dataPoints.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Version:</span>
                        <span className="font-medium">{model.version}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Owner:</span>
                        <span className="font-medium">{model.owner}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {model.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            {feature}
                          </span>
                        ))}
                        {model.features.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            +{model.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Predictions Tab */}
          {activeTab === 'predictions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Predictions</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Prediction
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPredictions.map((prediction) => (
                  <div key={prediction.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{prediction.prediction}</p>
                          <p className="text-sm text-gray-600">{prediction.employeeName} - {prediction.confidence}% confidence</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(prediction.riskLevel)}`}>
                        {prediction.riskLevel}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Factors:</span>
                        <span className="font-medium text-gray-900">{prediction.factors.join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium text-gray-900">{prediction.status}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Timestamp:</span>
                        <span className="font-medium text-gray-900">{prediction.timestamp}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Workforce Trends</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Trend
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workforceTrends.map((trend) => (
                  <div key={trend.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{trend.metric}</h3>
                          <p className="text-sm text-gray-600">{trend.timeframe}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTrendIcon(trend.trend)}`}>
                        {trend.trend}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Current Value:</span>
                        <span className="font-medium text-gray-900">{trend.currentValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Predicted Value:</span>
                        <span className="font-medium text-gray-900">{trend.predictedValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Change:</span>
                        <span className="font-medium text-gray-900">{trend.change.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="font-medium text-gray-900">{trend.confidence}%</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Model Performance</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Metric
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modelPerformance.map((metric) => (
                  <div key={metric.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <BarChart3 className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{metric.metric}</h3>
                          <p className="text-sm text-gray-600">Model: {metric.modelId}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPerformanceStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Value:</span>
                        <span className="font-medium text-gray-900">{metric.value.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium text-gray-900">{metric.target.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Trend:</span>
                        <span className="font-medium text-gray-900">{metric.trend}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium text-gray-900">{metric.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PredictivePage