import { useState } from 'react'
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Search,
  Plus,
  FileText,
  BookOpen,
  GraduationCap,
  Target,
  RefreshCw,
  AlertCircle
} from 'lucide-react'

interface ComplianceRequirement {
  id: string
  name: string
  category: 'labor_law' | 'data_privacy' | 'health_safety' | 'tax' | 'benefits' | 'discrimination' | 'workplace_safety'
  jurisdiction: string
  description: string
  status: 'compliant' | 'non_compliant' | 'at_risk' | 'under_review'
  priority: 'low' | 'medium' | 'high' | 'critical'
  dueDate: string
  lastReview: string
  nextReview: string
  owner: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  complianceScore: number
  requirements: string[]
  penalties: string[]
}

interface ComplianceAudit {
  id: string
  requirementId: string
  requirementName: string
  auditDate: string
  auditor: string
  status: 'passed' | 'failed' | 'conditional' | 'pending'
  findings: string[]
  recommendations: string[]
  nextAuditDate: string
  score: number
  notes: string
}

interface ComplianceTraining {
  id: string
  name: string
  category: string
  description: string
  duration: string
  requiredFor: string[]
  completionRate: number
  lastUpdated: string
  status: 'active' | 'inactive' | 'under_review'
  mandatory: boolean
}

interface ComplianceIncident {
  id: string
  title: string
  description: string
  category: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  reportedBy: string
  reportedDate: string
  assignedTo: string
  resolutionDate?: string
  actions: string[]
}

const CompliancePage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')

  // Mock data
  const complianceRequirements: ComplianceRequirement[] = [
    {
      id: '1',
      name: 'Minimum Wage Compliance',
      category: 'labor_law',
      jurisdiction: 'Federal & State',
      description: 'Ensure all employees receive at least minimum wage as required by federal and state laws',
      status: 'compliant',
      priority: 'high',
      dueDate: '2024-12-31',
      lastReview: '2024-01-15',
      nextReview: '2024-07-15',
      owner: 'HR Team',
      riskLevel: 'medium',
      complianceScore: 95,
      requirements: ['Regular wage audits', 'Documentation of all payments', 'Overtime calculations'],
      penalties: ['Fines up to $10,000', 'Back pay requirements', 'Legal action']
    },
    {
      id: '2',
      name: 'GDPR Data Protection',
      category: 'data_privacy',
      jurisdiction: 'European Union',
      description: 'Compliance with General Data Protection Regulation for EU employee data',
      status: 'at_risk',
      priority: 'critical',
      dueDate: '2024-06-30',
      lastReview: '2024-01-10',
      nextReview: '2024-04-10',
      owner: 'Legal Team',
      riskLevel: 'high',
      complianceScore: 78,
      requirements: ['Data consent management', 'Right to be forgotten', 'Data breach notification'],
      penalties: ['Fines up to €20M', 'Data processing restrictions', 'Reputational damage']
    },
    {
      id: '3',
      name: 'OSHA Workplace Safety',
      category: 'workplace_safety',
      jurisdiction: 'Federal',
      description: 'Occupational Safety and Health Administration workplace safety standards',
      status: 'compliant',
      priority: 'high',
      dueDate: '2024-12-31',
      lastReview: '2024-01-20',
      nextReview: '2024-07-20',
      owner: 'Safety Team',
      riskLevel: 'medium',
      complianceScore: 92,
      requirements: ['Safety training programs', 'Equipment maintenance', 'Incident reporting'],
      penalties: ['Fines up to $136,532', 'Workplace shutdowns', 'Criminal charges']
    },
    {
      id: '4',
      name: 'ACA Benefits Compliance',
      category: 'benefits',
      jurisdiction: 'Federal',
      description: 'Affordable Care Act employer shared responsibility requirements',
      status: 'non_compliant',
      priority: 'critical',
      dueDate: '2024-03-31',
      lastReview: '2024-01-05',
      nextReview: '2024-02-05',
      owner: 'Benefits Team',
      riskLevel: 'critical',
      complianceScore: 45,
      requirements: ['Full-time employee tracking', 'Affordable coverage offering', 'Reporting requirements'],
      penalties: ['Penalties up to $4,060 per employee', 'Tax implications', 'Legal compliance orders']
    }
  ]

  const complianceAudits: ComplianceAudit[] = [
    {
      id: '1',
      requirementId: '1',
      requirementName: 'Minimum Wage Compliance',
      auditDate: '2024-01-15',
      auditor: 'Internal Audit Team',
      status: 'passed',
      findings: ['All wage records properly maintained', 'Overtime calculations accurate'],
      recommendations: ['Continue current practices', 'Schedule next review in 6 months'],
      nextAuditDate: '2024-07-15',
      score: 95,
      notes: 'Excellent compliance with wage requirements'
    },
    {
      id: '2',
      requirementId: '2',
      requirementName: 'GDPR Data Protection',
      auditDate: '2024-01-10',
      auditor: 'External Consultant',
      status: 'conditional',
      findings: ['Data consent processes need improvement', 'Breach notification procedures adequate'],
      recommendations: ['Implement consent management system', 'Update privacy notices'],
      nextAuditDate: '2024-04-10',
      score: 78,
      notes: 'Several areas need immediate attention'
    }
  ]

  const complianceTraining: ComplianceTraining[] = [
    {
      id: '1',
      name: 'Anti-Harassment Training',
      category: 'Workplace Conduct',
      description: 'Comprehensive training on preventing workplace harassment and discrimination',
      duration: '2 hours',
      requiredFor: ['All employees', 'Managers', 'HR Staff'],
      completionRate: 87,
      lastUpdated: '2024-01-15',
      status: 'active',
      mandatory: true
    },
    {
      id: '2',
      name: 'Data Privacy Awareness',
      category: 'Data Protection',
      description: 'Training on handling sensitive employee data and privacy requirements',
      duration: '1 hour',
      requiredFor: ['HR Staff', 'IT Staff', 'Managers'],
      completionRate: 92,
      lastUpdated: '2024-01-10',
      status: 'active',
      mandatory: true
    },
    {
      id: '3',
      name: 'Workplace Safety Training',
      category: 'Safety',
      description: 'OSHA compliance training for workplace safety and hazard recognition',
      duration: '3 hours',
      requiredFor: ['All employees', 'Safety team'],
      completionRate: 95,
      lastUpdated: '2024-01-20',
      status: 'active',
      mandatory: true
    }
  ]

  const complianceIncidents: ComplianceIncident[] = [
    {
      id: '1',
      title: 'Data Breach Incident',
      description: 'Unauthorized access to employee personal information',
      category: 'Data Privacy',
      severity: 'high',
      status: 'resolved',
      reportedBy: 'IT Security Team',
      reportedDate: '2024-01-15',
      assignedTo: 'Legal Team',
      resolutionDate: '2024-01-20',
      actions: ['Immediate system lockdown', 'Employee notification', 'Regulatory reporting']
    },
    {
      id: '2',
      title: 'Workplace Safety Violation',
      description: 'Failure to provide required safety equipment',
      category: 'Workplace Safety',
      severity: 'medium',
      status: 'investigating',
      reportedBy: 'Employee',
      reportedDate: '2024-01-22',
      assignedTo: 'Safety Team',
      actions: ['Equipment procurement', 'Safety audit', 'Training reinforcement']
    }
  ]

  const overviewMetrics = {
    totalRequirements: 24,
    compliantRequirements: 18,
    atRiskRequirements: 4,
    nonCompliantRequirements: 2,
    overallComplianceScore: 87.5,
    upcomingDeadlines: 3,
    pendingAudits: 2,
    activeIncidents: 1,
    trainingCompletionRate: 91.3
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800'
      case 'non_compliant': return 'bg-red-100 text-red-800'
      case 'at_risk': return 'bg-yellow-100 text-yellow-800'
      case 'under_review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'conditional': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRequirements = complianceRequirements.filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || req.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || req.priority === selectedPriority
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Management</h1>
          <p className="text-gray-600">Monitor and manage regulatory compliance across all HR functions</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <RefreshCw size={20} />
            Refresh Status
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Requirement
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overall Score</p>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.overallComplianceScore}%</p>
              <p className="text-sm text-gray-500">Compliance Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliant</p>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.compliantRequirements}</p>
              <p className="text-sm text-gray-500">of {overviewMetrics.totalRequirements} total</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.atRiskRequirements}</p>
              <p className="text-sm text-gray-500">Require Attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Non-Compliant</p>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.nonCompliantRequirements}</p>
              <p className="text-sm text-gray-500">Immediate Action</p>
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
                placeholder="Search compliance requirements, audits, or incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="labor_law">Labor Law</option>
              <option value="data_privacy">Data Privacy</option>
              <option value="health_safety">Health & Safety</option>
              <option value="tax">Tax</option>
              <option value="benefits">Benefits</option>
              <option value="discrimination">Discrimination</option>
              <option value="workplace_safety">Workplace Safety</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="compliant">Compliant</option>
              <option value="non_compliant">Non-Compliant</option>
              <option value="at_risk">At Risk</option>
              <option value="under_review">Under Review</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'requirements', 'audits', 'training', 'incidents'].map((tab) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Compliant Requirements</span>
                      <span className="font-semibold text-green-600">{overviewMetrics.compliantRequirements}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${(overviewMetrics.compliantRequirements / overviewMetrics.totalRequirements) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">At Risk</span>
                      <span className="font-semibold text-yellow-600">{overviewMetrics.atRiskRequirements}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full"
                        style={{ width: `${(overviewMetrics.atRiskRequirements / overviewMetrics.totalRequirements) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Non-Compliant</span>
                      <span className="font-semibold text-red-600">{overviewMetrics.nonCompliantRequirements}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-500 h-3 rounded-full"
                        style={{ width: `${(overviewMetrics.nonCompliantRequirements / overviewMetrics.totalRequirements) * 100}%` }}
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
                          <p className="font-medium text-gray-900">OSHA audit completed</p>
                          <p className="text-sm text-gray-600">Passed with 92% score</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900">GDPR compliance review</p>
                          <p className="text-sm text-gray-600">78% score - needs improvement</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">5 days ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-900">ACA compliance issue</p>
                          <p className="text-sm text-gray-600">45% score - critical action needed</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 week ago</span>
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
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Generate Report</h4>
                        <p className="text-sm text-gray-600">Create compliance summary report</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <BookOpen className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Schedule Training</h4>
                        <p className="text-sm text-gray-600">Plan compliance training sessions</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Risk Assessment</h4>
                        <p className="text-sm text-gray-600">Conduct compliance risk review</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Requirements Tab */}
          {activeTab === 'requirements' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Compliance Requirements</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Requirement
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRequirements.map((req) => (
                  <div key={req.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getRiskLevelColor(req.riskLevel)}`}>
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{req.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">{req.category.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(req.status)}`}>
                          {req.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(req.priority)}`}>
                          {req.priority}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{req.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Jurisdiction:</span>
                        <span className="font-medium">{req.jurisdiction}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Compliance Score:</span>
                        <span className="font-medium text-green-600">{req.complianceScore}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">{req.dueDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Owner:</span>
                        <span className="font-medium">{req.owner}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Requirements</h4>
                      <div className="flex flex-wrap gap-1">
                        {req.requirements.slice(0, 2).map((item, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            {item}
                          </span>
                        ))}
                        {req.requirements.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            +{req.requirements.length - 2} more
                          </span>
                        )}
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

          {/* Audits Tab */}
          {activeTab === 'audits' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Compliance Audits</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  Schedule Audit
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auditor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Audit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {complianceAudits.map((audit) => (
                      <tr key={audit.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{audit.requirementName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{audit.auditDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{audit.auditor}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAuditStatusColor(audit.status)}`}>
                            {audit.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{audit.score}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{audit.nextAuditDate}</td>
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

          {/* Training Tab */}
          {activeTab === 'training' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Compliance Training</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Training
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complianceTraining.map((training) => (
                  <div key={training.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{training.name}</h3>
                          <p className="text-sm text-gray-600">{training.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          training.status === 'active' ? 'bg-green-100 text-green-800' :
                          training.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {training.status}
                        </span>
                        {training.mandatory && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            Mandatory
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{training.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{training.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Completion Rate:</span>
                        <span className="font-medium text-green-600">{training.completionRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">{training.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Required For</h4>
                      <div className="flex flex-wrap gap-1">
                        {training.requiredFor.map((role, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            {role}
                          </span>
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

          {/* Incidents Tab */}
          {activeTab === 'incidents' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Compliance Incidents</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  Report Incident
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complianceIncidents.map((incident) => (
                  <div key={incident.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getSeverityColor(incident.severity)}`}>
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
                          <p className="text-sm text-gray-600">{incident.category}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{incident.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium capitalize">{incident.status}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Reported By:</span>
                        <span className="font-medium">{incident.reportedBy}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Reported Date:</span>
                        <span className="font-medium">{incident.reportedDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Assigned To:</span>
                        <span className="font-medium">{incident.assignedTo}</span>
                      </div>
                    </div>

                    {incident.resolutionDate && (
                      <div className="mb-4">
                        <span className="text-sm text-gray-600">Resolved: </span>
                        <span className="text-sm font-medium text-gray-900">{incident.resolutionDate}</span>
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Actions Taken</h4>
                      <div className="space-y-1">
                        {incident.actions.map((action, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Update
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

export default CompliancePage
