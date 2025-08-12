import React, { useState } from 'react'
import {
  FileText,
  Plus,
  Search,
  Edit,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Shield,
  BookOpen,
  Users,
  Calendar
} from 'lucide-react'

interface Policy {
  id: string
  title: string
  category: 'employment' | 'workplace' | 'benefits' | 'safety' | 'conduct' | 'technology'
  status: 'active' | 'draft' | 'archived' | 'under-review'
  lastUpdated: string
  effectiveDate: string
  version: string
  department: string
  createdBy: string
  description: string
  isRequired: boolean
  requiresAcknowledgment: boolean
  acknowledgmentCount: number
  isCompliance: boolean
  complianceType?: 'regulatory' | 'internal' | 'industry' | 'legal'
  lastAudit?: string
  auditStatus?: 'compliant' | 'non-compliant' | 'pending' | 'under-review'
  nextReviewDate?: string
  riskLevel?: 'low' | 'medium' | 'high' | 'critical'
}

const mockPolicies: Policy[] = [
  {
    id: '1',
    title: 'Employee Code of Conduct',
    category: 'conduct',
    status: 'active',
    lastUpdated: '2024-01-15',
    effectiveDate: '2024-01-01',
    version: '3.2',
    department: 'HR',
    createdBy: 'Legal Team',
    description: 'Comprehensive code of conduct outlining expected employee behavior and ethical standards',
    isRequired: true,
    requiresAcknowledgment: true,
    acknowledgmentCount: 156,
    isCompliance: true,
    complianceType: 'internal',
    lastAudit: '2024-01-10',
    auditStatus: 'compliant',
    nextReviewDate: '2024-07-01',
    riskLevel: 'medium'
  },
  {
    id: '2',
    title: 'Remote Work Policy',
    category: 'workplace',
    status: 'active',
    lastUpdated: '2024-01-10',
    effectiveDate: '2024-01-01',
    version: '2.1',
    department: 'HR',
    createdBy: 'HR Director',
    description: 'Guidelines and expectations for remote work arrangements',
    isRequired: true,
    requiresAcknowledgment: true,
    acknowledgmentCount: 142,
    isCompliance: true,
    complianceType: 'internal',
    lastAudit: '2024-01-08',
    auditStatus: 'compliant',
    nextReviewDate: '2024-06-01',
    riskLevel: 'low'
  },
  {
    id: '3',
    title: 'Health and Safety Guidelines',
    category: 'safety',
    status: 'active',
    lastUpdated: '2024-01-08',
    effectiveDate: '2024-01-01',
    version: '4.0',
    department: 'Safety',
    createdBy: 'Safety Officer',
    description: 'Workplace health and safety protocols and procedures',
    isRequired: true,
    requiresAcknowledgment: true,
    acknowledgmentCount: 167,
    isCompliance: true,
    complianceType: 'regulatory',
    lastAudit: '2024-01-05',
    auditStatus: 'compliant',
    nextReviewDate: '2024-05-01',
    riskLevel: 'high'
  },
  {
    id: '4',
    title: 'Benefits Enrollment Policy',
    category: 'benefits',
    status: 'active',
    lastUpdated: '2024-01-05',
    effectiveDate: '2024-01-01',
    version: '2.3',
    department: 'Benefits',
    createdBy: 'Benefits Manager',
    description: 'Employee benefits enrollment procedures and eligibility requirements',
    isRequired: false,
    requiresAcknowledgment: false,
    acknowledgmentCount: 89,
    isCompliance: false
  },
  {
    id: '5',
    title: 'IT Security Policy',
    category: 'technology',
    status: 'active',
    lastUpdated: '2024-01-12',
    effectiveDate: '2024-01-01',
    version: '3.1',
    department: 'IT',
    createdBy: 'IT Security',
    description: 'Information technology security guidelines and data protection protocols',
    isRequired: true,
    requiresAcknowledgment: true,
    acknowledgmentCount: 134,
    isCompliance: true,
    complianceType: 'regulatory',
    lastAudit: '2024-01-10',
    auditStatus: 'compliant',
    nextReviewDate: '2024-08-01',
    riskLevel: 'high'
  },
  {
    id: '6',
    title: 'Leave Management Policy',
    category: 'employment',
    status: 'active',
    lastUpdated: '2024-01-03',
    effectiveDate: '2024-01-01',
    version: '2.5',
    department: 'HR',
    createdBy: 'HR Operations',
    description: 'Comprehensive leave management including vacation, sick, and personal time',
    isRequired: true,
    requiresAcknowledgment: true,
    acknowledgmentCount: 178,
    isCompliance: true,
    complianceType: 'internal',
    lastAudit: '2024-01-02',
    auditStatus: 'compliant',
    nextReviewDate: '2024-07-01',
    riskLevel: 'low'
  },
  {
    id: '7',
    title: 'Performance Management Policy',
    category: 'employment',
    status: 'active',
    lastUpdated: '2024-01-07',
    effectiveDate: '2024-01-01',
    version: '2.8',
    department: 'HR',
    createdBy: 'Performance Team',
    description: 'Performance evaluation processes and improvement frameworks',
    isRequired: true,
    requiresAcknowledgment: false,
    acknowledgmentCount: 112,
    isCompliance: false
  },
  {
    id: '8',
    title: 'Diversity and Inclusion Policy',
    category: 'workplace',
    status: 'active',
    lastUpdated: '2024-01-14',
    effectiveDate: '2024-01-01',
    version: '1.5',
    department: 'HR',
    createdBy: 'D&I Committee',
    description: 'Commitment to diversity, equity, and inclusion in the workplace',
    isRequired: true,
    requiresAcknowledgment: true,
    acknowledgmentCount: 145,
    isCompliance: true,
    complianceType: 'internal',
    lastAudit: '2024-01-12',
    auditStatus: 'compliant',
    nextReviewDate: '2024-09-01',
    riskLevel: 'medium'
  }
]

const categories = ['All', 'employment', 'workplace', 'benefits', 'safety', 'conduct', 'technology']
const statuses = ['All', 'active', 'draft', 'archived', 'under-review']

const HRPoliciesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showCreateModal, setShowCreateModal] = useState(false)


  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || policy.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || policy.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      case 'under-review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'employment': return <Users className="w-5 h-5" />
      case 'workplace': return <Shield className="w-5 h-5" />
      case 'benefits': return <CheckCircle className="w-5 h-5" />
      case 'safety': return <AlertTriangle className="w-5 h-5" />
      case 'conduct': return <BookOpen className="w-5 h-5" />
      case 'technology': return <Shield className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'employment': return 'bg-blue-100 text-blue-800'
      case 'workplace': return 'bg-purple-100 text-purple-800'
      case 'benefits': return 'bg-green-100 text-green-800'
      case 'safety': return 'bg-red-100 text-red-800'
      case 'conduct': return 'bg-orange-100 text-orange-800'
      case 'technology': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policies</h1>
          <p className="text-gray-600 mt-2">Manage HR policies, procedures, and compliance requirements</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Create Policy
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Policies</p>
              <p className="text-2xl font-bold text-gray-900">{mockPolicies.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Policies</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPolicies.filter(p => p.status === 'active').length}
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
              <p className="text-sm font-medium text-gray-600">Required Policies</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPolicies.filter(p => p.isRequired).length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Acknowledgments</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPolicies.reduce((sum, p) => sum + p.acknowledgmentCount, 0)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Compliance & Risk Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockPolicies.filter(p => p.isCompliance).length}
              </p>
              <p className="text-sm text-green-800">Compliance Policies</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {mockPolicies.filter(p => p.isCompliance && p.auditStatus === 'compliant').length}
              </p>
              <p className="text-sm text-blue-800">Compliant</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {mockPolicies.filter(p => p.isCompliance && p.auditStatus === 'pending').length}
              </p>
              <p className="text-sm text-yellow-800">Pending Review</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {mockPolicies.filter(p => p.isCompliance && p.auditStatus === 'non-compliant').length}
              </p>
              <p className="text-sm text-red-800">Non-Compliant</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {mockPolicies.filter(p => p.riskLevel === 'high' || p.riskLevel === 'critical').length}
              </p>
              <p className="text-sm text-orange-800">High Risk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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
              <option key={category} value={category}>
                {category === 'All' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'All' ? 'All Statuses' : status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolicies.map((policy) => (
          <div key={policy.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Policy Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(policy.category)}`}>
                    {getCategoryIcon(policy.category)}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                    {policy.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {policy.isRequired && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                      Required
                    </span>
                  )}
                  {policy.requiresAcknowledgment && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      Acknowledgment Required
                    </span>
                  )}
                </div>
              </div>

              {/* Policy Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
              </div>

              {/* Policy Details */}
              <div className="text-sm text-gray-500 mb-4 space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Effective: {new Date(policy.effectiveDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>Updated: {new Date(policy.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={14} />
                  <span>Version: {policy.version}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>Department: {policy.department}</span>
                </div>
              </div>

              {/* Acknowledgment Info */}
              {policy.requiresAcknowledgment && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-1">Acknowledgment Required</div>
                    <div>{policy.acknowledgmentCount} employees have acknowledged</div>
                  </div>
                </div>
              )}

              {/* Policy Actions */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">By {policy.createdBy}</span>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Policy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New Policy</h3>
              <button
                onClick={() => setShowCreateModal(false)}
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
                    <option>employment</option>
                    <option>workplace</option>
                    <option>benefits</option>
                    <option>safety</option>
                    <option>conduct</option>
                    <option>technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>HR</option>
                    <option>Legal</option>
                    <option>IT</option>
                    <option>Safety</option>
                    <option>Benefits</option>
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

              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <span className="ml-2 text-sm text-gray-700">Required Policy</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <span className="ml-2 text-sm text-gray-700">Requires Acknowledgment</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Create Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRPoliciesPage
