import React, { useState } from 'react'
import { 
  Scale, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  Edit,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Users,
  Shield,
  Gavel,
  BookOpen
} from 'lucide-react'

interface LegalCase {
  id: string
  title: string
  caseNumber: string
  type: string
  status: 'open' | 'pending' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedTo: string
  filingDate: string
  dueDate: string
  description: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

interface ComplianceRequirement {
  id: string
  title: string
  category: string
  jurisdiction: string
  effectiveDate: string
  reviewDate: string
  status: 'compliant' | 'non-compliant' | 'pending' | 'under-review'
  description: string
  impact: 'low' | 'medium' | 'high'
  lastAudit: string
}

interface LegalDocument {
  id: string
  title: string
  type: string
  category: string
  version: string
  lastUpdated: string
  status: 'active' | 'draft' | 'archived' | 'expired'
  owner: string
  description: string
  expiryDate?: string
}

const mockLegalCases: LegalCase[] = [
  {
    id: '1',
    title: 'Discrimination Claim - Smith vs Company',
    caseNumber: 'LC-2024-001',
    type: 'Employment Discrimination',
    status: 'open',
    priority: 'high',
    assignedTo: 'Legal Team',
    filingDate: '2024-01-15',
    dueDate: '2024-04-15',
    description: 'Alleged discrimination based on age and gender in promotion decisions',
    riskLevel: 'high'
  },
  {
    id: '2',
    title: 'Wage and Hour Violation',
    caseNumber: 'LC-2024-002',
    type: 'Wage & Hour',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'Legal Team',
    filingDate: '2024-01-10',
    dueDate: '2024-03-10',
    description: 'Alleged failure to pay overtime and meal break violations',
    riskLevel: 'medium'
  },
  {
    id: '3',
    title: 'Wrongful Termination - Johnson',
    caseNumber: 'LC-2024-003',
    type: 'Wrongful Termination',
    status: 'resolved',
    priority: 'high',
    assignedTo: 'Legal Team',
    filingDate: '2023-12-20',
    dueDate: '2024-02-20',
    description: 'Former employee claims termination was retaliatory',
    riskLevel: 'medium'
  },
  {
    id: '4',
    title: 'Workplace Harassment Investigation',
    caseNumber: 'LC-2024-004',
    type: 'Harassment',
    status: 'open',
    priority: 'critical',
    assignedTo: 'Legal Team',
    filingDate: '2024-01-20',
    dueDate: '2024-02-20',
    description: 'Investigation into alleged workplace harassment by supervisor',
    riskLevel: 'critical'
  },
  {
    id: '5',
    title: 'Contract Dispute - Vendor Agreement',
    caseNumber: 'LC-2024-005',
    type: 'Contract Dispute',
    status: 'pending',
    priority: 'low',
    assignedTo: 'Legal Team',
    filingDate: '2024-01-05',
    dueDate: '2024-06-05',
    description: 'Dispute over terms and conditions in vendor service agreement',
    riskLevel: 'low'
  }
]

const mockComplianceRequirements: ComplianceRequirement[] = [
  {
    id: '1',
    title: 'Equal Employment Opportunity (EEO) Compliance',
    category: 'Anti-Discrimination',
    jurisdiction: 'Federal',
    effectiveDate: '2024-01-01',
    reviewDate: '2024-07-01',
    status: 'compliant',
    description: 'Compliance with federal anti-discrimination laws and regulations',
    impact: 'high',
    lastAudit: '2024-01-15'
  },
  {
    id: '2',
    title: 'Family and Medical Leave Act (FMLA)',
    category: 'Leave Management',
    jurisdiction: 'Federal',
    effectiveDate: '2024-01-01',
    reviewDate: '2024-07-01',
    status: 'compliant',
    description: 'Compliance with FMLA requirements for eligible employees',
    impact: 'high',
    lastAudit: '2024-01-10'
  },
  {
    id: '3',
    title: 'Americans with Disabilities Act (ADA)',
    category: 'Accessibility',
    jurisdiction: 'Federal',
    effectiveDate: '2024-01-01',
    reviewDate: '2024-07-01',
    status: 'under-review',
    description: 'Compliance with ADA requirements for reasonable accommodations',
    impact: 'high',
    lastAudit: '2023-12-15'
  },
  {
    id: '4',
    title: 'State Minimum Wage Requirements',
    category: 'Compensation',
    jurisdiction: 'State',
    effectiveDate: '2024-01-01',
    reviewDate: '2024-04-01',
    status: 'compliant',
    description: 'Compliance with state-specific minimum wage laws',
    impact: 'medium',
    lastAudit: '2024-01-05'
  },
  {
    id: '5',
    title: 'Workplace Safety Standards (OSHA)',
    category: 'Health & Safety',
    jurisdiction: 'Federal',
    effectiveDate: '2024-01-01',
    reviewDate: '2024-07-01',
    status: 'non-compliant',
    description: 'Compliance with OSHA workplace safety regulations',
    impact: 'critical',
    lastAudit: '2024-01-08'
  }
]

const mockLegalDocuments: LegalDocument[] = [
  {
    id: '1',
    title: 'Employee Handbook 2024',
    type: 'Policy Document',
    category: 'Employment Policies',
    version: '3.2',
    lastUpdated: '2024-01-15',
    status: 'active',
    owner: 'HR Legal Team',
    description: 'Comprehensive employee handbook covering all company policies',
    expiryDate: '2025-01-15'
  },
  {
    id: '2',
    title: 'Non-Disclosure Agreement Template',
    type: 'Contract Template',
    category: 'Confidentiality',
    version: '2.1',
    lastUpdated: '2024-01-10',
    status: 'active',
    owner: 'Legal Team',
    description: 'Standard NDA template for employees and contractors'
  },
  {
    id: '3',
    title: 'Employment Contract Template',
    type: 'Contract Template',
    category: 'Employment',
    version: '4.0',
    lastUpdated: '2024-01-08',
    status: 'active',
    owner: 'Legal Team',
    description: 'Standard employment contract template for new hires'
  },
  {
    id: '4',
    title: 'Workplace Harassment Policy',
    type: 'Policy Document',
    category: 'Anti-Harassment',
    version: '2.3',
    lastUpdated: '2024-01-12',
    status: 'active',
    owner: 'HR Legal Team',
    description: 'Policy prohibiting workplace harassment and discrimination'
  },
  {
    id: '5',
    title: 'Termination Procedures Guide',
    type: 'Procedure Document',
    category: 'Termination',
    version: '1.8',
    lastUpdated: '2023-12-20',
    status: 'active',
    owner: 'HR Legal Team',
    description: 'Step-by-step guide for employee termination procedures'
  }
]

const caseTypes = ['All', 'Employment Discrimination', 'Wage & Hour', 'Wrongful Termination', 'Harassment', 'Contract Dispute']
const caseStatuses = ['All', 'open', 'pending', 'resolved', 'closed']
const priorities = ['All', 'low', 'medium', 'high', 'critical']
const complianceCategories = ['All', 'Anti-Discrimination', 'Leave Management', 'Accessibility', 'Compensation', 'Health & Safety']
const complianceStatuses = ['All', 'compliant', 'non-compliant', 'pending', 'under-review']

const HRLegalPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCaseType, setSelectedCaseType] = useState('All')
  const [selectedCaseStatus, setSelectedCaseStatus] = useState('All')
  const [selectedPriority, setSelectedPriority] = useState('All')
  const [selectedComplianceCategory, setSelectedComplianceCategory] = useState('All')
  const [selectedComplianceStatus, setSelectedComplianceStatus] = useState('All')
  const [activeTab, setActiveTab] = useState('cases')
  const [showAddCaseModal, setShowAddCaseModal] = useState(false)

  const filteredCases = mockLegalCases.filter(legalCase => {
    const matchesSearch = legalCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         legalCase.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedCaseType === 'All' || legalCase.type === selectedCaseType
    const matchesStatus = selectedCaseStatus === 'All' || legalCase.status === selectedCaseStatus
    const matchesPriority = selectedPriority === 'All' || legalCase.priority === selectedPriority
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const filteredCompliance = mockComplianceRequirements.filter(requirement => {
    const matchesSearch = requirement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         requirement.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedComplianceCategory === 'All' || requirement.category === selectedComplianceCategory
    const matchesStatus = selectedComplianceStatus === 'All' || requirement.status === selectedComplianceStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
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

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800'
      case 'non-compliant': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'under-review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Legal Management</h1>
          <p className="text-gray-600 mt-2">Manage legal cases, compliance requirements, and legal documents</p>
        </div>
        <button
          onClick={() => setShowAddCaseModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Legal Case
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Cases</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockLegalCases.filter(c => c.status === 'open').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Gavel className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Priority</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockLegalCases.filter(c => c.priority === 'critical').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliant Areas</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockComplianceRequirements.filter(c => c.status === 'compliant').length}
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
              <p className="text-sm font-medium text-gray-600">Active Documents</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockLegalDocuments.filter(d => d.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('cases')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cases'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Legal Cases
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'compliance'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Compliance
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Legal Documents
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Legal Cases Tab */}
          {activeTab === 'cases' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search cases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <select
                  value={selectedCaseType}
                  onChange={(e) => setSelectedCaseType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {caseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                
                <select
                  value={selectedCaseStatus}
                  onChange={(e) => setSelectedCaseStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {caseStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>

              {/* Cases Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filing Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCases.map((legalCase) => (
                      <tr key={legalCase.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{legalCase.title}</div>
                            <div className="text-sm text-gray-500">#{legalCase.caseNumber}</div>
                            <div className="text-sm text-gray-500">{legalCase.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {legalCase.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(legalCase.status)}`}>
                            {legalCase.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(legalCase.priority)}`}>
                            {legalCase.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {legalCase.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(legalCase.filingDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(legalCase.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={16} />
                            </button>
                            <button className="text-purple-600 hover:text-purple-900">
                              <Edit size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Download size={16} />
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

          {/* Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search compliance requirements..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <select
                  value={selectedComplianceCategory}
                  onChange={(e) => setSelectedComplianceCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {complianceCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={selectedComplianceStatus}
                  onChange={(e) => setSelectedComplianceStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {complianceStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Compliance Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurisdiction</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Audit</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCompliance.map((requirement) => (
                      <tr key={requirement.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{requirement.title}</div>
                            <div className="text-sm text-gray-500">{requirement.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {requirement.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {requirement.jurisdiction}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceStatusColor(requirement.status)}`}>
                            {requirement.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(requirement.impact)}`}>
                            {requirement.impact}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(requirement.effectiveDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(requirement.reviewDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(requirement.lastAudit).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Legal Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockLegalDocuments.map((document) => (
                      <tr key={document.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{document.title}</div>
                            <div className="text-sm text-gray-500">{document.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {document.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {document.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {document.version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                            {document.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {document.owner}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(document.lastUpdated).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={16} />
                            </button>
                            <button className="text-purple-600 hover:text-purple-900">
                              <Edit size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Download size={16} />
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
        </div>
      </div>

      {/* Add Legal Case Modal */}
      {showAddCaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Legal Case</h3>
              <button
                onClick={() => setShowAddCaseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Case Title</label>
                <input
                  type="text"
                  placeholder="Enter case title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Case Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Employment Discrimination</option>
                    <option>Wage & Hour</option>
                    <option>Wrongful Termination</option>
                    <option>Harassment</option>
                    <option>Contract Dispute</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                    <option>critical</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filing Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter case description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddCaseModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Add Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRLegalPage
