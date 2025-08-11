import React, { useState } from 'react'
import { 
  Users, 
  UserPlus, 
  Shield, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  Building
} from 'lucide-react'

const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const users = [
    {
      id: 'USR001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'HR Administrator',
      department: 'Human Resources',
      status: 'Active',
      lastLogin: '2023-12-01 14:30',
      permissions: ['user_management', 'employee_records', 'payroll', 'reports'],
      phone: '+1 (555) 123-4567',
      hireDate: '2022-03-15',
      manager: 'HR Director',
      location: 'New York'
    },
    {
      id: 'USR002',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'HR Manager',
      department: 'Human Resources',
      status: 'Active',
      lastLogin: '2023-12-01 16:45',
      permissions: ['employee_records', 'payroll', 'reports'],
      phone: '+1 (555) 234-5678',
      hireDate: '2021-08-20',
      manager: 'HR Director',
      location: 'San Francisco'
    },
    {
      id: 'USR003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'Recruiter',
      department: 'Human Resources',
      status: 'Active',
      lastLogin: '2023-12-01 12:15',
      permissions: ['recruitment', 'candidate_management', 'job_posting'],
      phone: '+1 (555) 345-6789',
      hireDate: '2023-01-10',
      manager: 'HR Manager',
      location: 'Chicago'
    },
    {
      id: 'USR004',
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'Payroll Specialist',
      department: 'Finance',
      status: 'Active',
      lastLogin: '2023-12-01 09:20',
      permissions: ['payroll', 'compensation', 'tax_management'],
      phone: '+1 (555) 456-7890',
      hireDate: '2022-11-05',
      manager: 'Finance Manager',
      location: 'Boston'
    },
    {
      id: 'USR005',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@company.com',
      role: 'Training Coordinator',
      department: 'Human Resources',
      status: 'Inactive',
      lastLogin: '2023-11-15 10:30',
      permissions: ['training_management', 'learning_analytics'],
      phone: '+1 (555) 567-8901',
      hireDate: '2023-02-28',
      manager: 'HR Manager',
      location: 'Austin'
    },
    {
      id: 'USR006',
      name: 'Robert Wilson',
      email: 'robert.wilson@company.com',
      role: 'Compliance Officer',
      department: 'Legal',
      status: 'Active',
      lastLogin: '2023-12-01 11:45',
      permissions: ['compliance', 'audit', 'policy_management'],
      phone: '+1 (555) 678-9012',
      hireDate: '2021-12-10',
      manager: 'Legal Director',
      location: 'Washington DC'
    }
  ]

  const roles = [
    'HR Administrator',
    'HR Manager',
    'Recruiter',
    'Payroll Specialist',
    'Training Coordinator',
    'Compliance Officer'
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      case 'Suspended': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    const roleColors: { [key: string]: string } = {
      'HR Administrator': 'bg-purple-100 text-purple-800',
      'HR Manager': 'bg-blue-100 text-blue-800',
      'Recruiter': 'bg-green-100 text-green-800',
      'Payroll Specialist': 'bg-orange-100 text-orange-800',
      'Training Coordinator': 'bg-pink-100 text-pink-800',
      'Compliance Officer': 'bg-red-100 text-red-800'
    }
    return roleColors[role] || 'bg-gray-100 text-gray-800'
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const userStats = [
    {
      name: 'Total Users',
      value: users.length.toString(),
      icon: Users,
      color: 'bg-primary-500'
    },
    {
      name: 'Active Users',
      value: users.filter(u => u.status === 'Active').length.toString(),
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      name: 'Inactive Users',
      value: users.filter(u => u.status === 'Inactive').length.toString(),
      icon: XCircle,
      color: 'bg-red-500'
    },
    {
      name: 'Roles',
      value: roles.length.toString(),
      icon: Shield,
      color: 'bg-blue-500'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage system users, roles, and access permissions</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {userStats.map((stat, index) => (
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
                  placeholder="Search users..."
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
                <option value="Suspended">Suspended</option>
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-800">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">{user.department}</div>
                        <div className="text-xs text-gray-400">{user.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.slice(0, 2).map((perm) => (
                          <span key={perm} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {perm.replace('_', ' ')}
                          </span>
                        ))}
                        {user.permissions.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{user.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="text-primary-600 hover:text-primary-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900" title="Edit User">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Reset Password">
                          <Lock className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Delete User">
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
            <span className="font-medium">{users.length}</span> results
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="">Select role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="">Select department</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Legal">Legal</option>
                  <option value="Engineering">Engineering</option>
                </select>
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
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagementPage
