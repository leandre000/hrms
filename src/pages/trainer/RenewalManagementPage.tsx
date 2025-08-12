import React, { useState } from 'react'
import {
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Calendar,
  User,
  Award,
  TrendingUp,
  BarChart3
} from 'lucide-react'

interface Renewal {
  id: string
  employeeName: string
  employeeId: string
  certificationName: string
  certificationType: string
  currentExpiry: string
  renewalDeadline: string
  status: 'Pending' | 'In Progress' | 'Completed' | 'Expired' | 'Cancelled'
  renewalType: 'Automatic' | 'Manual' | 'Assessment Required'
  requirements: string[]
  lastReminder: string
  nextReminder: string
  progress: number
}

const mockRenewals: Renewal[] = [
  {
    id: '1',
    employeeName: 'John Smith',
    employeeId: 'EMP001',
    certificationName: 'Project Management Professional (PMP)',
    certificationType: 'Professional Certification',
    currentExpiry: '2024-12-31',
    renewalDeadline: '2024-11-30',
    status: 'Pending',
    renewalType: 'Assessment Required',
    requirements: ['Complete 60 PDUs', 'Pass renewal exam', 'Submit application'],
    lastReminder: '2024-10-15',
    nextReminder: '2024-10-30',
    progress: 0
  },
  {
    id: '2',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP002',
    certificationName: 'Certified Scrum Master (CSM)',
    certificationType: 'Agile Certification',
    currentExpiry: '2024-11-15',
    renewalDeadline: '2024-10-15',
    status: 'In Progress',
    renewalType: 'Manual',
    requirements: ['Complete 20 SEUs', 'Submit renewal form'],
    lastReminder: '2024-09-15',
    nextReminder: '2024-09-30',
    progress: 60
  },
  {
    id: '3',
    employeeName: 'Mike Davis',
    employeeId: 'EMP003',
    certificationName: 'ITIL Foundation',
    certificationType: 'IT Service Management',
    currentExpiry: '2024-10-30',
    renewalDeadline: '2024-09-30',
    status: 'Completed',
    renewalType: 'Automatic',
    requirements: ['Annual subscription renewal'],
    lastReminder: '2024-08-15',
    nextReminder: '2024-09-15',
    progress: 100
  },
  {
    id: '4',
    employeeName: 'Lisa Wilson',
    employeeId: 'EMP004',
    certificationName: 'Six Sigma Green Belt',
    certificationType: 'Quality Management',
    currentExpiry: '2024-09-15',
    renewalDeadline: '2024-08-15',
    status: 'Expired',
    renewalType: 'Assessment Required',
    requirements: ['Complete 3 projects', 'Pass recertification exam'],
    lastReminder: '2024-07-15',
    nextReminder: '2024-07-30',
    progress: 0
  },
  {
    id: '5',
    employeeName: 'David Brown',
    employeeId: 'EMP005',
    certificationName: 'Microsoft Azure Administrator',
    certificationType: 'Cloud Certification',
    currentExpiry: '2025-01-15',
    renewalDeadline: '2024-12-15',
    status: 'Pending',
    renewalType: 'Automatic',
    requirements: ['Annual subscription renewal'],
    lastReminder: '2024-11-15',
    nextReminder: '2024-11-30',
    progress: 0
  }
]

const RenewalManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [selectedRenewal, setSelectedRenewal] = useState<Renewal | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const filteredRenewals = mockRenewals.filter(renewal => {
    const matchesSearch = renewal.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         renewal.certificationName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || renewal.status === statusFilter
    const matchesType = typeFilter === 'all' || renewal.renewalType === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      case 'Cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const stats = {
    total: mockRenewals.length,
    pending: mockRenewals.filter(r => r.status === 'Pending').length,
    inProgress: mockRenewals.filter(r => r.status === 'In Progress').length,
    completed: mockRenewals.filter(r => r.status === 'Completed').length,
    expired: mockRenewals.filter(r => r.status === 'Expired').length
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certification Renewal Management</h1>
          <p className="text-gray-600">Manage and track certification renewals across the organization</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Renewals</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <RefreshCw className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by employee or certification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Expired">Expired</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Assessment Required">Assessment Required</option>
            </select>
          </div>
        </div>
      </div>

      {/* Renewals Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRenewals.map((renewal) => (
                <tr key={renewal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{renewal.employeeName}</div>
                        <div className="text-sm text-gray-500">{renewal.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{renewal.certificationName}</div>
                      <div className="text-sm text-gray-500">{renewal.certificationType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">Expires: {renewal.currentExpiry}</div>
                      <div className="text-sm text-gray-500">Deadline: {renewal.renewalDeadline}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(renewal.status)}`}>
                      {renewal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(renewal.progress)}`}
                          style={{ width: `${renewal.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{renewal.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRenewal(renewal)
                          setShowDetailsModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRenewal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Renewal Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRenewal.employeeName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRenewal.employeeId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Certification</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRenewal.certificationName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRenewal.certificationType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Expiry</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRenewal.currentExpiry}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Renewal Deadline</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRenewal.renewalDeadline}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRenewal.status)}`}>
                    {selectedRenewal.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Renewal Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRenewal.renewalType}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <ul className="mt-1 text-sm text-gray-900 list-disc list-inside">
                  {selectedRenewal.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Reminder</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRenewal.lastReminder}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next Reminder</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRenewal.nextReminder}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Progress</label>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                    <div
                      className={`h-3 rounded-full ${getProgressColor(selectedRenewal.progress)}`}
                      style={{ width: `${selectedRenewal.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-900">{selectedRenewal.progress}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Update Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RenewalManagementPage
