import { useState } from 'react'
import {
  Database,
  Download,
  RefreshCw,
  Search,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  Lock,
  Plus,
  BarChart3,
  Archive,
  HardDrive} from 'lucide-react'

interface DataBackup {
  id: string
  name: string
  type: 'full' | 'incremental' | 'differential'
  size: string
  status: 'completed' | 'in_progress' | 'failed' | 'scheduled'
  createdAt: string
  completedAt?: string
  retentionDays: number
  location: 'local' | 'cloud' | 'hybrid'
  encryption: boolean
}

interface DataQualityIssue {
  id: string
  type: 'duplicate' | 'missing' | 'invalid' | 'inconsistent' | 'outdated'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  affectedRecords: number
  affectedTable: string
  detectedAt: string
  status: 'open' | 'investigating' | 'resolved' | 'ignored'
  assignedTo?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

interface DataGovernancePolicy {
  id: string
  name: string
  category: 'privacy' | 'security' | 'retention' | 'access' | 'quality'
  description: string
  status: 'active' | 'draft' | 'archived' | 'review'
  lastReviewed: string
  nextReview: string
  owner: string
  compliance: string[]
  enforcement: 'automatic' | 'manual' | 'hybrid'
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

interface DataRetentionRule {
  id: string
  dataType: string
  retentionPeriod: string
  action: 'archive' | 'delete' | 'anonymize' | 'retain'
  conditions: string[]
  status: 'active' | 'inactive' | 'scheduled'
  lastExecuted?: string
  nextExecution?: string
  affectedRecords: number
}

const DataManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const dataBackups: DataBackup[] = [
    {
      id: '1',
      name: 'Full Backup - 2024-01-20',
      type: 'full',
      size: '2.4 GB',
      status: 'completed',
      createdAt: '2024-01-20 02:00:00',
      completedAt: '2024-01-20 02:45:00',
      retentionDays: 30,
      location: 'cloud',
      encryption: true
    },
    {
      id: '2',
      name: 'Incremental Backup - 2024-01-21',
      type: 'incremental',
      size: '156 MB',
      status: 'completed',
      createdAt: '2024-01-21 02:00:00',
      completedAt: '2024-01-21 02:15:00',
      retentionDays: 30,
      location: 'cloud',
      encryption: true
    },
    {
      id: '3',
      name: 'Full Backup - 2024-01-22',
      type: 'full',
      size: '2.5 GB',
      status: 'in_progress',
      createdAt: '2024-01-22 02:00:00',
      retentionDays: 30,
      location: 'hybrid',
      encryption: true
    },
    {
      id: '4',
      name: 'Differential Backup - 2024-01-19',
      type: 'differential',
      size: '890 MB',
      status: 'completed',
      createdAt: '2024-01-19 02:00:00',
      completedAt: '2024-01-19 02:30:00',
      retentionDays: 30,
      location: 'local',
      encryption: false
    }
  ]

  const dataQualityIssues: DataQualityIssue[] = [
    {
      id: '1',
      type: 'duplicate',
      severity: 'high',
      description: 'Duplicate employee records found in employee table',
      affectedRecords: 23,
      affectedTable: 'employees',
      detectedAt: '2024-01-22 10:30:00',
      status: 'open',
      assignedTo: 'Data Team',
      priority: 'high'
    },
    {
      id: '2',
      type: 'missing',
      severity: 'medium',
      description: 'Missing email addresses for 15 employees',
      affectedRecords: 15,
      affectedTable: 'employees',
      detectedAt: '2024-01-22 09:15:00',
      status: 'investigating',
      assignedTo: 'HR Team',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'invalid',
      severity: 'critical',
      description: 'Invalid date formats in attendance records',
      affectedRecords: 156,
      affectedTable: 'attendance',
      detectedAt: '2024-01-21 16:45:00',
      status: 'open',
      assignedTo: 'Data Team',
      priority: 'urgent'
    },
    {
      id: '4',
      type: 'inconsistent',
      severity: 'medium',
      description: 'Inconsistent department codes across tables',
      affectedRecords: 89,
      affectedTable: 'departments',
      detectedAt: '2024-01-20 14:20:00',
      status: 'resolved',
      assignedTo: 'Data Team',
      priority: 'medium'
    }
  ]

  const dataGovernancePolicies: DataGovernancePolicy[] = [
    {
      id: '1',
      name: 'Employee Data Privacy Policy',
      category: 'privacy',
      description: 'Policy governing the collection, use, and protection of employee personal data',
      status: 'active',
      lastReviewed: '2024-01-15',
      nextReview: '2024-07-15',
      owner: 'Legal Team',
      compliance: ['GDPR', 'CCPA', 'Local Privacy Laws'],
      enforcement: 'automatic',
      riskLevel: 'high'
    },
    {
      id: '2',
      name: 'Data Retention Policy',
      category: 'retention',
      description: 'Rules for how long different types of data should be retained',
      status: 'active',
      lastReviewed: '2024-01-10',
      nextReview: '2024-07-10',
      owner: 'Data Team',
      compliance: ['SOX', 'Industry Standards'],
      enforcement: 'automatic',
      riskLevel: 'medium'
    },
    {
      id: '3',
      name: 'Access Control Policy',
      category: 'security',
      description: 'Policy defining who can access what data and under what circumstances',
      status: 'active',
      lastReviewed: '2024-01-05',
      nextReview: '2024-07-05',
      owner: 'IT Security',
      compliance: ['ISO 27001', 'SOC 2'],
      enforcement: 'automatic',
      riskLevel: 'high'
    },
    {
      id: '4',
      name: 'Data Quality Standards',
      category: 'quality',
      description: 'Standards for data accuracy, completeness, and consistency',
      status: 'draft',
      lastReviewed: '2024-01-18',
      nextReview: '2024-04-18',
      owner: 'Data Team',
      compliance: ['Industry Best Practices'],
      enforcement: 'hybrid',
      riskLevel: 'medium'
    }
  ]

  const dataRetentionRules: DataRetentionRule[] = [
    {
      id: '1',
      dataType: 'Employee Records',
      retentionPeriod: '7 years after termination',
      action: 'archive',
      conditions: ['After employee termination', 'After 7 years'],
      status: 'active',
      lastExecuted: '2024-01-15',
      nextExecution: '2024-02-15',
      affectedRecords: 45
    },
    {
      id: '2',
      dataType: 'Payroll Records',
      retentionPeriod: '10 years',
      action: 'retain',
      conditions: ['Tax compliance', 'Audit requirements'],
      status: 'active',
      lastExecuted: '2024-01-01',
      nextExecution: '2024-02-01',
      affectedRecords: 120
    },
    {
      id: '3',
      dataType: 'Performance Reviews',
      retentionPeriod: '5 years after review',
      action: 'archive',
      conditions: ['After review completion', 'After 5 years'],
      status: 'active',
      lastExecuted: '2024-01-10',
      nextExecution: '2024-02-10',
      affectedRecords: 23
    },
    {
      id: '4',
      dataType: 'Training Records',
      retentionPeriod: '3 years after completion',
      action: 'delete',
      conditions: ['After training completion', 'After 3 years'],
      status: 'scheduled',
      lastExecuted: '2024-01-05',
      nextExecution: '2024-02-05',
      affectedRecords: 67
    }
  ]

  const dataMetrics = {
    totalStorage: '45.2 GB',
    usedStorage: '32.8 GB',
    availableStorage: '12.4 GB',
    totalRecords: '2.4M',
    activeBackups: 4,
    failedBackups: 0,
    qualityScore: 94.2,
    complianceScore: 98.7,
    lastBackup: '2 hours ago',
    nextBackup: '10 hours'
  }

  const filteredBackups = dataBackups.filter(backup => {
    const matchesSearch = backup.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedCategory === 'all' || backup.type === selectedCategory
    const matchesStatus = selectedStatus === 'all' || backup.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'scheduled': return 'bg-yellow-100 text-yellow-800'
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

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full': return <Database className="w-5 h-5" />
      case 'incremental': return <RefreshCw className="w-5 h-5" />
      case 'differential': return <Archive className="w-5 h-5" />
      default: return <Database className="w-5 h-5" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
          <p className="text-gray-600">Manage data backups, quality, governance, and retention policies</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <RefreshCw size={20} />
            Refresh Data
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Backup
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HardDrive className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">{dataMetrics.usedStorage}</p>
              <p className="text-sm text-gray-500">of {dataMetrics.totalStorage}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Quality Score</p>
              <p className="text-2xl font-bold text-gray-900">{dataMetrics.qualityScore}%</p>
              <p className="text-sm text-gray-500">Data Health</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliance</p>
              <p className="text-2xl font-bold text-gray-900">{dataMetrics.complianceScore}%</p>
              <p className="text-sm text-gray-500">Policy Adherence</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-2xl font-bold text-gray-900">{dataMetrics.lastBackup}</p>
              <p className="text-sm text-gray-500">Next: {dataMetrics.nextBackup}</p>
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
                placeholder="Search backups, policies, or issues..."
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
              <option value="all">All Types</option>
              <option value="full">Full Backup</option>
              <option value="incremental">Incremental</option>
              <option value="differential">Differential</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="failed">Failed</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'backups', 'quality', 'governance', 'retention'].map((tab) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Used Storage</span>
                      <span className="font-semibold text-blue-600">{dataMetrics.usedStorage}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full" 
                        style={{ width: `${(parseFloat(dataMetrics.usedStorage) / parseFloat(dataMetrics.totalStorage)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available</span>
                      <span className="font-semibold text-green-600">{dataMetrics.availableStorage}</span>
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
                          <p className="font-medium text-gray-900">Incremental backup completed</p>
                          <p className="text-sm text-gray-600">156 MB backed up</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900">Data quality check completed</p>
                          <p className="text-sm text-gray-600">4 issues found</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">4 hours ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">Policy review completed</p>
                          <p className="text-sm text-gray-600">2 policies updated</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 day ago</span>
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
                        <Download className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Create Backup</h4>
                        <p className="text-sm text-gray-600">Start a new data backup</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Quality Report</h4>
                        <p className="text-sm text-gray-600">Generate data quality report</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Policy Review</h4>
                        <p className="text-sm text-gray-600">Review governance policies</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Backups Tab */}
          {activeTab === 'backups' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Data Backups</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Backup
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Backup</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBackups.map((backup) => (
                      <tr key={backup.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                            <div className="text-sm text-gray-500">ID: {backup.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(backup.type)}
                            <span className="text-sm text-gray-900 capitalize">{backup.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{backup.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backup.status)}`}>
                            {backup.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{backup.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-900 capitalize">{backup.location}</span>
                            {backup.encryption && <Lock className="w-4 h-4 text-green-600" />}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">Restore</button>
                            <button className="text-gray-600 hover:text-gray-900">Download</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quality Tab */}
          {activeTab === 'quality' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Data Quality Issues</h3>
                <button className="btn-secondary">
                  <RefreshCw size={20} />
                  Run Quality Check
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dataQualityIssues.map((issue) => (
                  <div key={issue.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getSeverityColor(issue.severity)}`}>
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 capitalize">{issue.type}</h3>
                          <p className="text-sm text-gray-600">{issue.affectedTable}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{issue.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Affected Records:</span>
                        <span className="font-medium">{issue.affectedRecords}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Priority:</span>
                        <span className="font-medium capitalize">{issue.priority}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium capitalize">{issue.status}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Detected:</span>
                        <span className="font-medium">{issue.detectedAt}</span>
                      </div>
                    </div>

                    {issue.assignedTo && (
                      <div className="mb-4">
                        <span className="text-sm text-gray-600">Assigned to: </span>
                        <span className="text-sm font-medium text-gray-900">{issue.assignedTo}</span>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        Investigate
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Resolve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Governance Tab */}
          {activeTab === 'governance' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Data Governance Policies</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Policy
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dataGovernancePolicies.map((policy) => (
                  <div key={policy.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getRiskLevelColor(policy.riskLevel)}`}>
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{policy.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">{policy.category}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(policy.riskLevel)}`}>
                        {policy.riskLevel}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{policy.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium capitalize">{policy.status}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Owner:</span>
                        <span className="font-medium">{policy.owner}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Enforcement:</span>
                        <span className="font-medium capitalize">{policy.enforcement}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Reviewed:</span>
                        <span className="font-medium">{policy.lastReviewed}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Next Review:</span>
                        <span className="font-medium">{policy.nextReview}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Compliance</h4>
                      <div className="flex flex-wrap gap-1">
                        {policy.compliance.map((item, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        Review
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

          {/* Retention Tab */}
          {activeTab === 'retention' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Data Retention Rules</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Rule
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Executed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Execution</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataRetentionRules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{rule.dataType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.retentionPeriod}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                            {rule.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            rule.status === 'active' ? 'bg-green-100 text-green-800' : 
                            rule.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {rule.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rule.lastExecuted || 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rule.nextExecution || 'Not scheduled'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">Edit</button>
                            <button className="text-gray-600 hover:text-gray-900">Execute</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
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
    </div>
  )
}

export default DataManagementPage
