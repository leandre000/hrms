import React, { useState } from 'react'
import { 
  Shield, 
  Eye, 
  Lock, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Users, 
  Database,
  Calendar,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'

interface PrivacyPolicy {
  id: string
  title: string
  category: string
  lastUpdated: string
  status: 'active' | 'draft' | 'archived'
  version: string
  description: string
  complianceLevel: 'high' | 'medium' | 'low'
}

interface DataProcessing {
  id: string
  purpose: string
  dataType: string
  legalBasis: string
  retentionPeriod: string
  status: 'active' | 'review' | 'expired'
  lastReview: string
  riskLevel: 'low' | 'medium' | 'high'
}

interface ConsentRecord {
  id: string
  employeeName: string
  consentType: string
  grantedDate: string
  expiryDate: string
  status: 'active' | 'expired' | 'withdrawn'
  lastActivity: string
}

const mockPrivacyPolicies: PrivacyPolicy[] = [
  {
    id: '1',
    title: 'Employee Data Protection Policy',
    category: 'Data Protection',
    lastUpdated: '2024-01-15',
    status: 'active',
    version: '3.2',
    description: 'Comprehensive policy covering employee data collection, processing, and protection',
    complianceLevel: 'high'
  },
  {
    id: '2',
    title: 'Personal Information Handling',
    category: 'Personal Data',
    lastUpdated: '2024-01-10',
    status: 'active',
    version: '2.1',
    description: 'Guidelines for handling personal information in HR processes',
    complianceLevel: 'high'
  },
  {
    id: '3',
    title: 'Data Retention Guidelines',
    category: 'Data Retention',
    lastUpdated: '2024-01-08',
    status: 'active',
    version: '1.8',
    description: 'Clear guidelines for data retention periods and disposal procedures',
    complianceLevel: 'medium'
  },
  {
    id: '4',
    title: 'Third-Party Data Sharing',
    category: 'Data Sharing',
    lastUpdated: '2024-01-05',
    status: 'draft',
    version: '1.0',
    description: 'Policy for sharing employee data with third-party service providers',
    complianceLevel: 'high'
  },
  {
    id: '5',
    title: 'Employee Privacy Rights',
    category: 'Rights',
    lastUpdated: '2024-01-12',
    status: 'active',
    version: '2.3',
    description: 'Employee rights regarding their personal data and privacy',
    complianceLevel: 'high'
  }
]

const mockDataProcessing: DataProcessing[] = [
  {
    id: '1',
    purpose: 'Payroll Processing',
    dataType: 'Personal & Financial',
    legalBasis: 'Contract Performance',
    retentionPeriod: '7 years',
    status: 'active',
    lastReview: '2024-01-10',
    riskLevel: 'medium'
  },
  {
    id: '2',
    purpose: 'Performance Management',
    dataType: 'Performance & Behavioral',
    legalBasis: 'Legitimate Interest',
    retentionPeriod: '3 years',
    status: 'active',
    lastReview: '2024-01-08',
    riskLevel: 'low'
  },
  {
    id: '3',
    purpose: 'Recruitment & Selection',
    dataType: 'Personal & Professional',
    legalBasis: 'Consent',
    retentionPeriod: '2 years',
    status: 'active',
    lastReview: '2024-01-05',
    riskLevel: 'medium'
  },
  {
    id: '4',
    purpose: 'Benefits Administration',
    dataType: 'Personal & Health',
    legalBasis: 'Contract Performance',
    retentionPeriod: '10 years',
    status: 'review',
    lastReview: '2023-12-15',
    riskLevel: 'high'
  },
  {
    id: '5',
    purpose: 'Training & Development',
    dataType: 'Professional & Learning',
    legalBasis: 'Legitimate Interest',
    retentionPeriod: '5 years',
    status: 'active',
    lastReview: '2024-01-12',
    riskLevel: 'low'
  }
]

const mockConsentRecords: ConsentRecord[] = [
  {
    id: '1',
    employeeName: 'John Smith',
    consentType: 'Marketing Communications',
    grantedDate: '2024-01-10',
    expiryDate: '2025-01-10',
    status: 'active',
    lastActivity: '2024-01-15'
  },
  {
    id: '2',
    employeeName: 'Sarah Johnson',
    consentType: 'Third-Party Data Sharing',
    grantedDate: '2024-01-08',
    expiryDate: '2025-01-08',
    status: 'active',
    lastActivity: '2024-01-12'
  },
  {
    id: '3',
    employeeName: 'Mike Davis',
    consentType: 'Biometric Data Processing',
    grantedDate: '2023-12-20',
    expiryDate: '2024-12-20',
    status: 'active',
    lastActivity: '2024-01-10'
  },
  {
    id: '4',
    employeeName: 'Emily Wilson',
    consentType: 'Marketing Communications',
    grantedDate: '2023-11-15',
    expiryDate: '2024-11-15',
    status: 'expired',
    lastActivity: '2024-01-05'
  },
  {
    id: '5',
    employeeName: 'David Brown',
    consentType: 'Third-Party Data Sharing',
    grantedDate: '2024-01-05',
    expiryDate: '2025-01-05',
    status: 'withdrawn',
    lastActivity: '2024-01-14'
  }
]

const categories = ['All', 'Data Protection', 'Personal Data', 'Data Retention', 'Data Sharing', 'Rights']
const statuses = ['All', 'active', 'draft', 'archived']
const complianceLevels = ['All', 'high', 'medium', 'low']

const HRPrivacyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedCompliance, setSelectedCompliance] = useState('All')
  const [activeTab, setActiveTab] = useState('policies')
  const [showAddPolicyModal, setShowAddPolicyModal] = useState(false)

  const filteredPolicies = mockPrivacyPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || policy.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || policy.status === selectedStatus
    const matchesCompliance = selectedCompliance === 'All' || policy.complianceLevel === selectedCompliance
    
    return matchesSearch && matchesCategory && matchesStatus && matchesCompliance
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getComplianceColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800'
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
          <h1 className="text-3xl font-bold text-gray-900">Privacy Management</h1>
          <p className="text-gray-600 mt-2">Manage data privacy policies, processing activities, and consent records</p>
        </div>
        <button
          onClick={() => setShowAddPolicyModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Policy
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Policies</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPrivacyPolicies.filter(p => p.status === 'active').length}
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
              <p className="text-sm font-medium text-gray-600">Data Processing</p>
              <p className="text-2xl font-bold text-gray-900">{mockDataProcessing.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Consent</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockConsentRecords.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockDataProcessing.filter(d => d.riskLevel === 'high').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('policies')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'policies'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Privacy Policies
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'processing'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Data Processing
            </button>
            <button
              onClick={() => setActiveTab('consent')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'consent'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Consent Management
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Privacy Policies Tab */}
          {activeTab === 'policies' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search policies..."
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
                  value={selectedCompliance}
                  onChange={(e) => setSelectedCompliance(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {complianceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Policies Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPolicies.map((policy) => (
                      <tr key={policy.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{policy.title}</div>
                            <div className="text-sm text-gray-500">{policy.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {policy.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                            {policy.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {policy.version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(policy.lastUpdated).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceColor(policy.complianceLevel)}`}>
                            {policy.complianceLevel}
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
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 size={16} />
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

          {/* Data Processing Tab */}
          {activeTab === 'processing' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Legal Basis</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Review</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockDataProcessing.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.purpose}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.dataType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.legalBasis}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.retentionPeriod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(item.lastReview).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(item.riskLevel)}`}>
                            {item.riskLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Consent Management Tab */}
          {activeTab === 'consent' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consent Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Granted Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockConsentRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.employeeName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.consentType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.grantedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.expiryDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.lastActivity).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={16} />
                            </button>
                            <button className="text-purple-600 hover:text-purple-900">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 size={16} />
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

      {/* Add Policy Modal */}
      {showAddPolicyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Privacy Policy</h3>
              <button
                onClick={() => setShowAddPolicyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Policy Title</label>
                <input
                  type="text"
                  placeholder="Enter policy title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Data Protection</option>
                    <option>Personal Data</option>
                    <option>Data Retention</option>
                    <option>Data Sharing</option>
                    <option>Rights</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Level</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>high</option>
                    <option>medium</option>
                    <option>low</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter policy description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddPolicyModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Add Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRPrivacyPage
