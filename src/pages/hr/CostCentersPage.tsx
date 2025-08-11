import { useState } from 'react'
import {
  Building,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  BarChart3,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  RefreshCw,
  Calculator
} from 'lucide-react'

interface CostCenter {
  id: string
  name: string
  code: string
  department: string
  manager: string
  budget: number
  actualSpent: number
  variance: number
  variancePercent: number
  status: 'under_budget' | 'on_budget' | 'over_budget' | 'critical'
  fiscalYear: string
  lastUpdated: string
  description: string
  location: string
  employeeCount: number
  costPerEmployee: number
}

interface CostAllocation {
  id: string
  costCenterId: string
  costCenterName: string
  category: 'personnel' | 'technology' | 'facilities' | 'training' | 'benefits' | 'overhead' | 'other'
  amount: number
  date: string
  description: string
  approvedBy: string
  status: 'approved' | 'pending' | 'rejected' | 'under_review'
  budgetLine: string
  quarter: string
}

interface BudgetForecast {
  id: string
  costCenterId: string
  costCenterName: string
  quarter: string
  budgetedAmount: number
  forecastedAmount: number
  variance: number
  variancePercent: number
  confidence: 'low' | 'medium' | 'high'
  factors: string[]
  lastUpdated: string
}

interface CostTrend {
  id: string
  costCenterId: string
  costCenterName: string
  metric: string
  currentValue: number
  previousValue: number
  change: number
  changePercent: number
  trend: 'increasing' | 'decreasing' | 'stable'
  timeframe: string
}

const CostCentersPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data
  const costCenters: CostCenter[] = [
    {
      id: '1',
      name: 'Human Resources',
      code: 'HR001',
      department: 'Administration',
      manager: 'Sarah Johnson',
      budget: 1250000,
      actualSpent: 1180000,
      variance: 70000,
      variancePercent: 5.6,
      status: 'under_budget',
      fiscalYear: '2024',
      lastUpdated: '2024-01-22',
      description: 'Central HR operations including recruitment, training, and employee relations',
      location: 'Headquarters',
      employeeCount: 45,
      costPerEmployee: 26222
    },
    {
      id: '2',
      name: 'Information Technology',
      code: 'IT001',
      department: 'Technology',
      manager: 'Michael Chen',
      budget: 2800000,
      actualSpent: 2950000,
      variance: -150000,
      variancePercent: -5.4,
      status: 'over_budget',
      fiscalYear: '2024',
      lastUpdated: '2024-01-22',
      description: 'IT infrastructure, software licenses, and technical support',
      location: 'Headquarters',
      employeeCount: 78,
      costPerEmployee: 37821
    },
    {
      id: '3',
      name: 'Sales & Marketing',
      code: 'SM001',
      department: 'Revenue',
      manager: 'Emily Rodriguez',
      budget: 3200000,
      actualSpent: 3180000,
      variance: 20000,
      variancePercent: 0.6,
      status: 'on_budget',
      fiscalYear: '2024',
      lastUpdated: '2024-01-22',
      description: 'Sales operations, marketing campaigns, and customer acquisition',
      location: 'Headquarters',
      employeeCount: 120,
      costPerEmployee: 26500
    },
    {
      id: '4',
      name: 'Research & Development',
      code: 'RD001',
      department: 'Innovation',
      manager: 'David Kim',
      budget: 4500000,
      actualSpent: 4700000,
      variance: -200000,
      variancePercent: -4.4,
      status: 'over_budget',
      fiscalYear: '2024',
      lastUpdated: '2024-01-22',
      description: 'Product development, research initiatives, and innovation projects',
      location: 'R&D Campus',
      employeeCount: 95,
      costPerEmployee: 49474
    }
  ]

  const costAllocations: CostAllocation[] = [
    {
      id: '1',
      costCenterId: '1',
      costCenterName: 'Human Resources',
      category: 'personnel',
      amount: 850000,
      date: '2024-01-22',
      description: 'HR staff salaries and benefits for Q1',
      approvedBy: 'CFO',
      status: 'approved',
      budgetLine: 'Personnel Costs',
      quarter: 'Q1 2024'
    },
    {
      id: '2',
      costCenterId: '1',
      costCenterName: 'Human Resources',
      category: 'training',
      amount: 180000,
      date: '2024-01-22',
      description: 'Employee training and development programs',
      approvedBy: 'HR Director',
      status: 'approved',
      budgetLine: 'Training & Development',
      quarter: 'Q1 2024'
    },
    {
      id: '3',
      costCenterId: '2',
      costCenterName: 'Information Technology',
      category: 'technology',
      amount: 1200000,
      date: '2024-01-22',
      description: 'Software licenses and cloud infrastructure',
      approvedBy: 'CTO',
      status: 'approved',
      budgetLine: 'Technology Infrastructure',
      quarter: 'Q1 2024'
    },
    {
      id: '4',
      costCenterId: '2',
      costCenterName: 'Information Technology',
      category: 'personnel',
      amount: 1750000,
      date: '2024-01-22',
      description: 'IT staff salaries and benefits',
      approvedBy: 'CFO',
      status: 'approved',
      budgetLine: 'Personnel Costs',
      quarter: 'Q1 2024'
    }
  ]

  const budgetForecasts: BudgetForecast[] = [
    {
      id: '1',
      costCenterId: '1',
      costCenterName: 'Human Resources',
      quarter: 'Q2 2024',
      budgetedAmount: 1250000,
      forecastedAmount: 1280000,
      variance: -30000,
      variancePercent: -2.4,
      confidence: 'high',
      factors: ['Increased training costs', 'New HR initiatives', 'Market rate adjustments'],
      lastUpdated: '2024-01-22'
    },
    {
      id: '2',
      costCenterId: '2',
      costCenterName: 'Information Technology',
      quarter: 'Q2 2024',
      budgetedAmount: 2800000,
      forecastedAmount: 2850000,
      variance: -50000,
      variancePercent: -1.8,
      confidence: 'medium',
      factors: ['Software license renewals', 'Infrastructure upgrades', 'Cybersecurity investments'],
      lastUpdated: '2024-01-22'
    },
    {
      id: '3',
      costCenterId: '3',
      costCenterName: 'Sales & Marketing',
      quarter: 'Q2 2024',
      budgetedAmount: 3200000,
      forecastedAmount: 3150000,
      variance: 50000,
      variancePercent: 1.6,
      confidence: 'high',
      factors: ['Efficient campaign management', 'Digital transformation savings', 'Process optimization'],
      lastUpdated: '2024-01-22'
    }
  ]

  const costTrends: CostTrend[] = [
    {
      id: '1',
      costCenterId: '1',
      costCenterName: 'Human Resources',
      metric: 'Cost per Employee',
      currentValue: 26222,
      previousValue: 25800,
      change: 422,
      changePercent: 1.6,
      trend: 'increasing',
      timeframe: 'Q1 2024 vs Q4 2023'
    },
    {
      id: '2',
      costCenterId: '2',
      costCenterName: 'Information Technology',
      metric: 'Technology Spend',
      currentValue: 2950000,
      previousValue: 2850000,
      change: 100000,
      changePercent: 3.5,
      trend: 'increasing',
      timeframe: 'Q1 2024 vs Q4 2023'
    },
    {
      id: '3',
      costCenterId: '3',
      costCenterName: 'Sales & Marketing',
      metric: 'Customer Acquisition Cost',
      currentValue: 26500,
      previousValue: 27200,
      change: -700,
      changePercent: -2.6,
      trend: 'decreasing',
      timeframe: 'Q1 2024 vs Q4 2023'
    }
  ]

  const overviewMetrics = {
    totalCostCenters: 12,
    totalBudget: 15750000,
    totalSpent: 16010000,
    totalVariance: -260000,
    overallVariancePercent: -1.7,
    underBudgetCenters: 6,
    overBudgetCenters: 4,
    onBudgetCenters: 2,
    averageCostPerEmployee: 31500,
    totalEmployees: 508
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under_budget': return 'bg-green-100 text-green-800'
      case 'on_budget': return 'bg-blue-100 text-blue-800'
      case 'over_budget': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personnel': return 'bg-blue-100 text-blue-800'
      case 'technology': return 'bg-purple-100 text-purple-800'
      case 'facilities': return 'bg-green-100 text-green-800'
      case 'training': return 'bg-yellow-100 text-yellow-800'
      case 'benefits': return 'bg-pink-100 text-pink-800'
      case 'overhead': return 'bg-gray-100 text-gray-800'
      case 'other': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-600" />
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-600" />
      case 'stable': return <Activity className="w-4 h-4 text-gray-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredCostCenters = costCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || center.department === selectedDepartment
    const matchesStatus = selectedStatus === 'all' || center.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const filteredAllocations = costAllocations.filter(allocation => {
    const matchesSearch = allocation.costCenterName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || allocation.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cost Centers</h1>
          <p className="text-gray-600">Manage and monitor cost center budgets, allocations, and performance</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <RefreshCw size={20} />
            Refresh Data
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Cost Center
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">${(overviewMetrics.totalBudget / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">Fiscal Year 2024</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${(overviewMetrics.totalSpent / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">Year to Date</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Variance</p>
              <p className={`text-2xl font-bold ${overviewMetrics.totalVariance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                ${Math.abs(overviewMetrics.totalVariance / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-gray-500">{overviewMetrics.overallVariancePercent}% of budget</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Cost/Employee</p>
              <p className="text-2xl font-bold text-gray-900">${overviewMetrics.averageCostPerEmployee.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{overviewMetrics.totalEmployees} employees</p>
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
                placeholder="Search cost centers, codes, or managers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="Administration">Administration</option>
              <option value="Technology">Technology</option>
              <option value="Revenue">Revenue</option>
              <option value="Innovation">Innovation</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="under_budget">Under Budget</option>
              <option value="on_budget">On Budget</option>
              <option value="over_budget">Over Budget</option>
              <option value="critical">Critical</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="personnel">Personnel</option>
              <option value="technology">Technology</option>
              <option value="facilities">Facilities</option>
              <option value="training">Training</option>
              <option value="benefits">Benefits</option>
              <option value="overhead">Overhead</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'centers', 'allocations', 'forecasts', 'trends'].map((tab) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Performance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Under Budget</span>
                      <span className="font-semibold text-green-600">{overviewMetrics.underBudgetCenters}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${(overviewMetrics.underBudgetCenters / overviewMetrics.totalCostCenters) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">On Budget</span>
                      <span className="font-semibold text-blue-600">{overviewMetrics.onBudgetCenters}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${(overviewMetrics.onBudgetCenters / overviewMetrics.totalCostCenters) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Over Budget</span>
                      <span className="font-semibold text-red-600">{overviewMetrics.overBudgetCenters}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-500 h-3 rounded-full"
                        style={{ width: `${(overviewMetrics.overBudgetCenters / overviewMetrics.totalCostCenters) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">HR budget review completed</p>
                          <p className="text-sm text-gray-600">5.6% under budget</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900">IT budget exceeded</p>
                          <p className="text-sm text-gray-600">5.4% over budget</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">4 hours ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">Sales budget on track</p>
                          <p className="text-sm text-gray-600">0.6% under budget</p>
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
                        <Calculator className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Budget Analysis</h4>
                        <p className="text-sm text-gray-600">Generate budget performance report</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Activity className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Forecast Update</h4>
                        <p className="text-sm text-gray-600">Update budget forecasts</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Budget Planning</h4>
                        <p className="text-sm text-gray-600">Plan next fiscal year budgets</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Centers Tab */}
          {activeTab === 'centers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Cost Centers</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Cost Center
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCostCenters.map((center) => (
                  <div key={center.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{center.name}</h3>
                          <p className="text-sm text-gray-600">{center.code}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(center.status)}`}>
                        {center.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium">{center.department}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Manager:</span>
                        <span className="font-medium">{center.manager}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium">${(center.budget / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Spent:</span>
                        <span className="font-medium">${(center.actualSpent / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Variance:</span>
                        <span className={`font-medium ${center.variance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ${Math.abs(center.variance / 1000).toFixed(0)}K ({center.variancePercent}%)
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Employees:</span>
                        <span className="font-medium">{center.employeeCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Cost/Employee:</span>
                        <span className="font-medium">${center.costPerEmployee.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Allocations Tab */}
          {activeTab === 'allocations' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Cost Allocations</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Allocation
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Center</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quarter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAllocations.map((allocation) => (
                      <tr key={allocation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{allocation.costCenterName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(allocation.category)}`}>
                            {allocation.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${(allocation.amount / 1000).toFixed(0)}K
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            allocation.status === 'approved' ? 'bg-green-100 text-green-800' :
                            allocation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            allocation.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {allocation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.quarter}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Forecasts Tab */}
          {activeTab === 'forecasts' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Budget Forecasts</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Forecast
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {budgetForecasts.map((forecast) => (
                  <div key={forecast.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Target className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{forecast.costCenterName}</h3>
                          <p className="text-sm text-gray-600">{forecast.quarter}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidenceColor(forecast.confidence)}`}>
                        {forecast.confidence} confidence
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Budgeted:</span>
                        <span className="font-medium">${(forecast.budgetedAmount / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Forecasted:</span>
                        <span className="font-medium">${(forecast.forecastedAmount / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Variance:</span>
                        <span className={`font-medium ${forecast.variance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ${Math.abs(forecast.variance / 1000).toFixed(0)}K ({forecast.variancePercent}%)
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Factors</h4>
                      <div className="space-y-1">
                        {forecast.factors.map((factor, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <Info className="w-4 h-4 text-blue-600 mr-2" />
                            {factor}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Edit
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
                <h3 className="text-lg font-semibold text-gray-900">Cost Trends</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Analysis
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {costTrends.map((trend) => (
                  <div key={trend.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{trend.costCenterName}</h3>
                          <p className="text-sm text-gray-600">{trend.metric}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(trend.trend)}
                        <span className="text-xs text-gray-500">{trend.trend}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-medium">${trend.currentValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Previous:</span>
                        <span className="font-medium">${trend.previousValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Change:</span>
                        <span className={`font-medium ${trend.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${Math.abs(trend.change).toLocaleString()} ({trend.changePercent}%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Timeframe:</span>
                        <span className="font-medium">{trend.timeframe}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Analyze
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

export default CostCentersPage
