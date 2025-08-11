import React, { useState } from 'react'
import { 
  Shield, 
  Users, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'

const RolesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)

  const roles = [
    {
      id: 'ROLE001',
      name: 'HR Administrator',
      description: 'Full access to HR system with user management capabilities',
      permissions: ['user_management', 'employee_records', 'payroll', 'reports', 'settings'],
      usersCount: 3,
      status: 'Active',
      createdAt: '2023-01-15',
      lastModified: '2023-11-20',
      priority: 'high'
    },
    {
      id: 'ROLE002',
      name: 'HR Manager',
      description: 'Management level access to employee records and basic HR functions',
      permissions: ['employee_records', 'payroll', 'reports'],
      usersCount: 8,
      status: 'Active',
      createdAt: '2023-02-10',
      lastModified: '2023-10-15',
      priority: 'medium'
    },
    {
      id: 'ROLE003',
      name: 'Recruiter',
      description: 'Access to recruitment pipeline and candidate management',
      permissions: ['recruitment', 'candidate_management', 'job_posting'],
      usersCount: 12,
      status: 'Active',
      createdAt: '2023-03-05',
      lastModified: '2023-09-28',
      priority: 'medium'
    },
    {
      id: 'ROLE004',
      name: 'Payroll Specialist',
      description: 'Dedicated access to payroll and compensation functions',
      permissions: ['payroll', 'compensation', 'tax_management'],
      usersCount: 5,
      status: 'Active',
      createdAt: '2023-01-20',
      lastModified: '2023-11-10',
      priority: 'high'
    },
    {
      id: 'ROLE005',
      name: 'Training Coordinator',
      description: 'Access to training programs and learning management',
      permissions: ['training_management', 'learning_analytics', 'certifications'],
      usersCount: 6,
      status: 'Active',
      createdAt: '2023-04-12',
      lastModified: '2023-08-15',
      priority: 'low'
    },
    {
      id: 'ROLE006',
      name: 'Compliance Officer',
      description: 'Access to compliance monitoring and audit functions',
      permissions: ['compliance', 'audit', 'policy_management', 'reports'],
      usersCount: 4,
      status: 'Active',
      createdAt: '2023-02-28',
      lastModified: '2023-11-05',
      priority: 'high'
    }
  ]

  const permissions = [
    { id: 'user_management', name: 'User Management', category: 'System' },
    { id: 'employee_records', name: 'Employee Records', category: 'HR' },
    { id: 'payroll', name: 'Payroll', category: 'Finance' },
    { id: 'reports', name: 'Reports', category: 'Analytics' },
    { id: 'settings', name: 'System Settings', category: 'System' },
    { id: 'recruitment', name: 'Recruitment', category: 'HR' },
    { id: 'candidate_management', name: 'Candidate Management', category: 'HR' },
    { id: 'job_posting', name: 'Job Posting', category: 'HR' },
    { id: 'compensation', name: 'Compensation', category: 'Finance' },
    { id: 'tax_management', name: 'Tax Management', category: 'Finance' },
    { id: 'training_management', name: 'Training Management', category: 'HR' },
    { id: 'learning_analytics', name: 'Learning Analytics', category: 'Analytics' },
    { id: 'certifications', name: 'Certifications', category: 'HR' },
    { id: 'compliance', name: 'Compliance', category: 'Legal' },
    { id: 'audit', name: 'Audit', category: 'Legal' },
    { id: 'policy_management', name: 'Policy Management', category: 'Legal' }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || role.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const roleStats = [
    {
      name: 'Total Roles',
      value: roles.length.toString(),
      icon: Shield,
      color: 'bg-primary-500'
    },
    {
      name: 'Active Roles',
      value: roles.filter(r => r.status === 'Active').length.toString(),
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      name: 'Total Users',
      value: roles.reduce((sum, role) => sum + role.usersCount, 0).toString(),
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'High Priority',
      value: roles.filter(r => r.priority === 'high').length.toString(),
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
            <p className="text-gray-600">Manage user roles, permissions, and access control</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Role
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {roleStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search roles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Roles Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{role.name}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                        <div className="text-xs text-gray-400">ID: {role.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((perm) => {
                          const permission = permissions.find(p => p.id === perm)
                          return (
                            <span key={perm} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              {permission?.name || perm}
                            </span>
                          )
                        })}
                        {role.permissions.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{role.usersCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(role.status)}`}>
                        {role.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(role.priority)}`}>
                        {role.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(role.lastModified).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedRole(role)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRoles.length}</span> of{' '}
            <span className="font-medium">{roles.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Role</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter role description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {permissions.map((perm) => (
                    <label key={perm.id} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-gray-700">{perm.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RolesPage
