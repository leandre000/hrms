import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Calendar, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  FileText,
  Shield,
  Activity,
  BarChart3,
  Plus,
  Edit
} from 'lucide-react'

interface AuditRecord {
  id: string
  action: string
  user: string
  timestamp: string
  resource: string
  resourceType: string
  details: string
  ipAddress: string
  userAgent: string
  status: 'success' | 'failure' | 'warning'
}

interface ComplianceCheck {
  id: string
  title: string
  category: string
  lastCheck: string
  nextCheck: string
  status: 'pass' | 'fail' | 'warning' | 'pending'
  score: number
  description: string
  assignedTo: string
}

const mockAuditRecords: AuditRecord[] = [
  {
    id: '1',
    action: 'Employee Data Access',
    user: 'hr.manager@company.com',
    timestamp: '2024-01-15T10:30:00Z',
    resource: 'Employee Profile - John Smith',
    resourceType: 'Employee Record',
    details: 'Viewed employee personal information',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome/120.0.0.0',
    status: 'success'
  },
  {
    id: '2',
    action: 'Policy Update',
    user: 'hr.director@company.com',
    timestamp: '2024-01-15T09:15:00Z',
    resource: 'Employee Handbook 2024',
    resourceType: 'Policy Document',
    details: 'Updated section 3.2 - Leave Policy',
    ipAddress: '192.168.1.101',
    userAgent: 'Firefox/121.0.0.0',
    status: 'success'
  },
  {
    id: '3',
    action: 'Failed Login Attempt',
    user: 'unknown@company.com',
    timestamp: '2024-01-15T08:45:00Z',
    resource: 'HR System Login',
    resourceType: 'Authentication',
    details: 'Invalid credentials provided',
    ipAddress: '203.45.67.89',
    userAgent: 'Unknown',
    status: 'failure'
  },
  {
    id: '4',
    action: 'Data Export',
    user: 'hr.analyst@company.com',
    timestamp: '2024-01-14T16:20:00Z',
    resource: 'Employee Performance Report',
    resourceType: 'Report',
    details: 'Exported Q4 performance data',
    ipAddress: '192.168.1.102',
    userAgent: 'Chrome/120.0.0.0',
    status: 'success'
  },
  {
    id: '5',
    action: 'Permission Change',
    user: 'admin@company.com',
    timestamp: '2024-01-14T14:30:00Z',
    resource: 'User Permissions - Sarah Johnson',
    resourceType: 'Access Control',
    details: 'Granted manager-level access',
    ipAddress: '192.168.1.103',
    userAgent: 'Chrome/120.0.0.0',
    status: 'success'
  },
  {
    id: '6',
    action: 'System Configuration',
    user: 'it.admin@company.com',
    timestamp: '2024-01-14T11:15:00Z',
    resource: 'HR System Settings',
    resourceType: 'System Configuration',
    details: 'Updated password policy requirements',
    ipAddress: '192.168.1.104',
    userAgent: 'Edge/120.0.0.0',
    status: 'success'
  }
]

const mockComplianceChecks: ComplianceCheck[] = [
  {
    id: '1',
    title: 'Data Privacy Compliance',
    category: 'Privacy',
    lastCheck: '2024-01-15',
    nextCheck: '2024-04-15',
    status: 'pass',
    score: 95,
    description: 'Check compliance with GDPR and data protection regulations',
    assignedTo: 'Privacy Officer'
  },
  {
    id: '2',
    title: 'Access Control Review',
    category: 'Security',
    lastCheck: '2024-01-10',
    nextCheck: '2024-02-10',
    status: 'pass',
    score: 88,
    description: 'Review user access permissions and role assignments',
    assignedTo: 'IT Security Team'
  },
  {
    id: '3',
    title: 'Policy Compliance Audit',
    category: 'Compliance',
    lastCheck: '2024-01-08',
    nextCheck: '2024-04-08',
    status: 'warning',
    score: 72,
    description: 'Audit compliance with company policies and procedures',
    assignedTo: 'Compliance Team'
  },
  {
    id: '4',
    title: 'Training Completion Check',
    category: 'Training',
    lastCheck: '2024-01-05',
    nextCheck: '2024-02-05',
    status: 'fail',
    score: 45,
    description: 'Verify completion of mandatory training programs',
    assignedTo: 'L&D Team'
  },
  {
    id: '5',
    title: 'Document Retention Review',
    category: 'Records',
    lastCheck: '2024-01-12',
    nextCheck: '2024-04-12',
    status: 'pass',
    score: 92,
    description: 'Review document retention and disposal procedures',
    assignedTo: 'Records Management'
  }
]

const resourceTypes = ['All', 'Employee Record', 'Policy Document', 'Authentication', 'Report', 'Access Control', 'System Configuration']
const statuses = ['All', 'success', 'failure', 'warning']
const categories = ['All', 'Privacy', 'Security', 'Compliance', 'Training', 'Records']

const HRAuditPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedResourceType, setSelectedResourceType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeTab, setActiveTab] = useState('audit')
  const [showAddCheckModal, setShowAddCheckModal] = useState(false)

  const filteredAuditRecords = mockAuditRecords.filter(record => {
    const matchesSearch = record.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.resource.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesResourceType = selectedResourceType === 'All' || record.resourceType === selectedResourceType
    const matchesStatus = selectedStatus === 'All' || record.status === selectedStatus
    
    return matchesSearch && matchesResourceType && matchesStatus
  })

  const filteredComplianceChecks = mockComplianceChecks.filter(check => {
    const matchesSearch = check.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || check.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'failure': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800'
      case 'fail': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 70) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit & Compliance</h1>
          <p className="text-gray-600 mt-2">Monitor system activity, audit trails, and compliance checks</p>
        </div>
        <button
          onClick={() => setShowAddCheckModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Compliance Check
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Audit Records</p>
              <p className="text-2xl font-bold text-gray-900">{mockAuditRecords.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed Actions</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockAuditRecords.filter(r => r.status === 'failure').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Checks</p>
              <p className="text-2xl font-bold text-gray-900">{mockComplianceChecks.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Passing Checks</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockComplianceChecks.filter(c => c.status === 'pass').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('audit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'audit'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Audit Trail
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'compliance'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Compliance Checks
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Audit Trail Tab */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search audit records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <select
                  value={selectedResourceType}
                  onChange={(e) => setSelectedResourceType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
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
              </div>

              {/* Audit Records Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAuditRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{record.action}</div>
                            <div className="text-sm text-gray-500">{record.details}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.resource}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {record.resourceType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.ipAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={16} />
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

          {/* Compliance Checks Tab */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search compliance checks..."
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
              </div>

              {/* Compliance Checks Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Check</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComplianceChecks.map((check) => (
                      <tr key={check.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{check.title}</div>
                            <div className="text-sm text-gray-500">{check.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {check.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceStatusColor(check.status)}`}>
                            {check.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(check.score)}`}>
                            {check.score}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(check.lastCheck).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(check.nextCheck).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {check.assignedTo}
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

      {/* Add Compliance Check Modal */}
      {showAddCheckModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Compliance Check</h3>
              <button
                onClick={() => setShowAddCheckModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check Title</label>
                <input
                  type="text"
                  placeholder="Enter check title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Privacy</option>
                    <option>Security</option>
                    <option>Compliance</option>
                    <option>Training</option>
                    <option>Records</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                  <input
                    type="text"
                    placeholder="Enter assigned person/team"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Next Check Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency (months)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>1</option>
                    <option>3</option>
                    <option>6</option>
                    <option>12</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter check description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddCheckModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Add Check
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRAuditPage
