import React, { useState } from 'react'
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  Clock, 
  Eye, 
  Edit,
  Plus,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Target,
  AlertCircle
} from 'lucide-react'

interface RiskItem {
  id: string
  title: string
  category: string
  likelihood: 'low' | 'medium' | 'high' | 'critical'
  impact: 'low' | 'medium' | 'high' | 'critical'
  riskScore: number
  status: 'active' | 'mitigated' | 'monitoring' | 'closed'
  owner: string
  lastAssessed: string
  nextReview: string
  description: string
}

interface MitigationStrategy {
  id: string
  riskId: string
  title: string
  description: string
  status: 'planned' | 'in-progress' | 'completed' | 'failed'
  assignedTo: string
  dueDate: string
  completionDate?: string
  effectiveness: 'low' | 'medium' | 'high'
}

const mockRisks: RiskItem[] = [
  {
    id: '1',
    title: 'Data Breach Risk',
    category: 'Information Security',
    likelihood: 'medium',
    impact: 'critical',
    riskScore: 16,
    status: 'active',
    owner: 'IT Security Team',
    lastAssessed: '2024-01-15',
    nextReview: '2024-04-15',
    description: 'Risk of unauthorized access to employee personal data'
  },
  {
    id: '2',
    title: 'Compliance Violation',
    category: 'Regulatory',
    likelihood: 'low',
    impact: 'high',
    riskScore: 12,
    status: 'monitoring',
    owner: 'Legal Team',
    lastAssessed: '2024-01-10',
    nextReview: '2024-07-10',
    description: 'Risk of non-compliance with labor laws and regulations'
  },
  {
    id: '3',
    title: 'Key Employee Departure',
    category: 'Operational',
    likelihood: 'medium',
    impact: 'high',
    riskScore: 15,
    status: 'active',
    owner: 'HR Management',
    lastAssessed: '2024-01-12',
    nextReview: '2024-04-12',
    description: 'Risk of losing critical employees with specialized knowledge'
  },
  {
    id: '4',
    title: 'Workplace Safety Incident',
    category: 'Health & Safety',
    likelihood: 'low',
    impact: 'critical',
    riskScore: 14,
    status: 'mitigated',
    owner: 'Safety Officer',
    lastAssessed: '2024-01-08',
    nextReview: '2024-07-08',
    description: 'Risk of workplace accidents and safety violations'
  },
  {
    id: '5',
    title: 'Payroll System Failure',
    category: 'Technology',
    likelihood: 'low',
    impact: 'high',
    riskScore: 10,
    status: 'monitoring',
    owner: 'IT Operations',
    lastAssessed: '2024-01-05',
    nextReview: '2024-07-05',
    description: 'Risk of payroll system downtime affecting employee payments'
  },
  {
    id: '6',
    title: 'Discrimination Claims',
    category: 'Legal',
    likelihood: 'medium',
    impact: 'high',
    riskScore: 15,
    status: 'active',
    owner: 'Legal Team',
    lastAssessed: '2024-01-14',
    nextReview: '2024-04-14',
    description: 'Risk of employment discrimination lawsuits'
  },
  {
    id: '7',
    title: 'Benefits Administration Error',
    category: 'Operational',
    likelihood: 'medium',
    impact: 'medium',
    riskScore: 9,
    status: 'active',
    owner: 'Benefits Team',
    lastAssessed: '2024-01-11',
    nextReview: '2024-04-11',
    description: 'Risk of errors in benefits enrollment and administration'
  },
  {
    id: '8',
    title: 'Training Program Ineffectiveness',
    category: 'Learning & Development',
    likelihood: 'high',
    impact: 'medium',
    riskScore: 12,
    status: 'monitoring',
    owner: 'L&D Team',
    lastAssessed: '2024-01-09',
    nextReview: '2024-04-09',
    description: 'Risk of training programs not meeting learning objectives'
  }
]

const mockMitigationStrategies: MitigationStrategy[] = [
  {
    id: '1',
    riskId: '1',
    title: 'Implement Multi-Factor Authentication',
    description: 'Add MFA to all HR systems and databases',
    status: 'in-progress',
    assignedTo: 'IT Security Team',
    dueDate: '2024-03-15',
    effectiveness: 'high'
  },
  {
    id: '2',
    riskId: '1',
    title: 'Regular Security Audits',
    description: 'Conduct quarterly security assessments',
    status: 'completed',
    assignedTo: 'IT Security Team',
    dueDate: '2024-01-15',
    completionDate: '2024-01-15',
    effectiveness: 'high'
  },
  {
    id: '3',
    riskId: '3',
    title: 'Succession Planning',
    description: 'Develop comprehensive succession plans for key roles',
    status: 'planned',
    assignedTo: 'HR Management',
    dueDate: '2024-06-30',
    effectiveness: 'medium'
  },
  {
    id: '4',
    riskId: '4',
    title: 'Safety Training Program',
    description: 'Implement mandatory safety training for all employees',
    status: 'completed',
    assignedTo: 'Safety Officer',
    dueDate: '2024-01-31',
    completionDate: '2024-01-25',
    effectiveness: 'high'
  }
]

const categories = ['All', 'Information Security', 'Regulatory', 'Operational', 'Health & Safety', 'Technology', 'Legal', 'Learning & Development']
const statuses = ['All', 'active', 'mitigated', 'monitoring', 'closed']
const likelihoodLevels = ['All', 'low', 'medium', 'high', 'critical']
const impactLevels = ['All', 'low', 'medium', 'high', 'critical']

const HRRiskPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedLikelihood, setSelectedLikelihood] = useState('All')
  const [selectedImpact, setSelectedImpact] = useState('All')
  const [activeTab, setActiveTab] = useState('risks')
  const [showAddRiskModal, setShowAddRiskModal] = useState(false)

  const filteredRisks = mockRisks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || risk.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || risk.status === selectedStatus
    const matchesLikelihood = selectedLikelihood === 'All' || risk.likelihood === selectedLikelihood
    const matchesImpact = selectedImpact === 'All' || risk.impact === selectedImpact
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLikelihood && matchesImpact
  })

  const getRiskScoreColor = (score: number) => {
    if (score >= 16) return 'bg-red-100 text-red-800'
    if (score >= 12) return 'bg-orange-100 text-orange-800'
    if (score >= 8) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800'
      case 'mitigated': return 'bg-green-100 text-green-800'
      case 'monitoring': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMitigationStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'high': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateRiskScore = (likelihood: string, impact: string) => {
    const likelihoodScores = { low: 1, medium: 2, high: 3, critical: 4 }
    const impactScores = { low: 1, medium: 2, high: 3, critical: 4 }
    return likelihoodScores[likelihood as keyof typeof likelihoodScores] * impactScores[impact as keyof typeof impactScores]
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Management</h1>
          <p className="text-gray-600 mt-2">Identify, assess, and mitigate HR-related risks</p>
        </div>
        <button
          onClick={() => setShowAddRiskModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Risk
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Risks</p>
              <p className="text-2xl font-bold text-gray-900">{mockRisks.length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockRisks.filter(r => r.riskScore >= 12).length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mitigated</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockRisks.filter(r => r.status === 'mitigated').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockRisks.filter(r => r.status === 'active' || r.status === 'monitoring').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Risk Matrix Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Matrix</h3>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Risk matrix visualization would be displayed here</p>
          <p className="text-sm text-gray-500">Showing likelihood vs impact matrix with color-coded risk levels</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('risks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'risks'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Risk Assessment
            </button>
            <button
              onClick={() => setActiveTab('mitigation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'mitigation'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mitigation Strategies
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Risk Assessment Tab */}
          {activeTab === 'risks' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search risks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                
                <select
                  value={selectedLikelihood}
                  onChange={(e) => setSelectedLikelihood(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {likelihoodLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                
                <select
                  value={selectedImpact}
                  onChange={(e) => setSelectedImpact(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {impactLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Risks Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likelihood</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRisks.map((risk) => (
                      <tr key={risk.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                            <div className="text-sm text-gray-500">{risk.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {risk.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            risk.likelihood === 'critical' ? 'bg-red-100 text-red-800' :
                            risk.likelihood === 'high' ? 'bg-orange-100 text-orange-800' :
                            risk.likelihood === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {risk.likelihood}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            risk.impact === 'critical' ? 'bg-red-100 text-red-800' :
                            risk.impact === 'high' ? 'bg-orange-100 text-orange-800' :
                            risk.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {risk.impact}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskScoreColor(risk.riskScore)}`}>
                            {risk.riskScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(risk.status)}`}>
                            {risk.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {risk.owner}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(risk.nextReview).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={16} />
                            </button>
                            <button className="text-purple-600 hover:text-purple-900">
                              <Edit size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mitigation Strategies Tab */}
          {activeTab === 'mitigation' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strategy</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effectiveness</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockMitigationStrategies.map((strategy) => {
                      const risk = mockRisks.find(r => r.id === strategy.riskId)
                      return (
                        <tr key={strategy.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{strategy.title}</div>
                              <div className="text-sm text-gray-500">{strategy.description}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {risk?.title || 'Unknown Risk'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMitigationStatusColor(strategy.status)}`}>
                              {strategy.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {strategy.assignedTo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(strategy.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {strategy.completionDate ? new Date(strategy.completionDate).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEffectivenessColor(strategy.effectiveness)}`}>
                              {strategy.effectiveness}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye size={16} />
                              </button>
                              <button className="text-purple-600 hover:text-purple-900">
                                <Edit size={16} />
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
          )}
        </div>
      </div>

      {/* Add Risk Modal */}
      {showAddRiskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Risk</h3>
              <button
                onClick={() => setShowAddRiskModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Title</label>
                <input
                  type="text"
                  placeholder="Enter risk title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Information Security</option>
                    <option>Regulatory</option>
                    <option>Operational</option>
                    <option>Health & Safety</option>
                    <option>Technology</option>
                    <option>Legal</option>
                    <option>Learning & Development</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
                  <input
                    type="text"
                    placeholder="Enter risk owner"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Likelihood</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                    <option>critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Impact</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                    <option>critical</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter risk description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddRiskModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Add Risk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRRiskPage
