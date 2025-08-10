import React, { useState } from 'react'
import { Users, Plus, Search, Filter, Download, Edit, Trash2, Eye, Mail, Phone, MapPin, Calendar, Award, MoreVertical } from 'lucide-react'

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([])
  const [showAddEmployee, setShowAddEmployee] = useState(false)

  // Mock employee data
  const employees = [
    {
      id: 1,
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Senior Developer',
      manager: 'Sarah Wilson',
      startDate: '2022-03-15',
      salary: 95000,
      status: 'active',
      location: 'New York, NY',
      employmentType: 'Full-time',
      lastLogin: '2024-01-20T10:30:00',
      performanceRating: 4.2,
      avatar: '/avatars/john.jpg'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Engineering',
      position: 'Engineering Manager',
      manager: 'Michael Chen',
      startDate: '2021-03-15',
      salary: 120000,
      status: 'active',
      location: 'New York, NY',
      employmentType: 'Full-time',
      lastLogin: '2024-01-20T09:15:00',
      performanceRating: 4.5,
      avatar: '/avatars/sarah.jpg'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 345-6789',
      department: 'Engineering',
      position: 'Principal Engineer',
      manager: 'Lisa Rodriguez',
      startDate: '2019-08-20',
      salary: 140000,
      status: 'active',
      location: 'San Francisco, CA',
      employmentType: 'Full-time',
      lastLogin: '2024-01-20T08:45:00',
      performanceRating: 4.8,
      avatar: '/avatars/michael.jpg'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      firstName: 'Lisa',
      lastName: 'Rodriguez',
      email: 'lisa.rodriguez@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Human Resources',
      position: 'VP of People',
      manager: 'CEO',
      startDate: '2020-01-10',
      salary: 130000,
      status: 'active',
      location: 'Austin, TX',
      employmentType: 'Full-time',
      lastLogin: '2024-01-19T16:20:00',
      performanceRating: 4.6,
      avatar: '/avatars/lisa.jpg'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      firstName: 'Alex',
      lastName: 'Thompson',
      email: 'alex.thompson@company.com',
      phone: '+1 (555) 567-8901',
      department: 'Engineering',
      position: 'Junior Developer',
      manager: 'Sarah Wilson',
      startDate: '2023-09-01',
      salary: 70000,
      status: 'active',
      location: 'New York, NY',
      employmentType: 'Full-time',
      lastLogin: '2024-01-20T11:00:00',
      performanceRating: 3.8,
      avatar: '/avatars/alex.jpg'
    },
    {
      id: 6,
      employeeId: 'EMP006',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 678-9012',
      department: 'Marketing',
      position: 'Marketing Manager',
      manager: 'David Kim',
      startDate: '2021-11-15',
      salary: 85000,
      status: 'inactive',
      location: 'Remote',
      employmentType: 'Full-time',
      lastLogin: '2024-01-15T14:30:00',
      performanceRating: 4.1,
      avatar: '/avatars/emily.jpg'
    }
  ]

  const departments = ['All Departments', 'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance', 'Product']
  const statuses = ['All Statuses', 'active', 'inactive', 'terminated', 'on_leave']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'terminated':
        return 'bg-red-100 text-red-800'
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSelectEmployee = (employeeId: number) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    )
  }

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id))
    }
  }

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === 'all' || departmentFilter === 'All Departments' || employee.department === departmentFilter
    const matchesStatus = statusFilter === 'all' || statusFilter === 'All Statuses' || employee.status === statusFilter
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.status === 'active').length,
    newThisMonth: employees.filter(emp => {
      const startDate = new Date(emp.startDate)
      const now = new Date()
      return startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear()
    }).length,
    avgSalary: Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length)
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
            <p className="text-gray-600">Manage all employees and their information</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddEmployee(true)}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Employee
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Employees</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
                <div className="text-sm text-gray-600">Active Employees</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.newThisMonth}</div>
                <div className="text-sm text-gray-600">New This Month</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${stats.avgSalary.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Average Salary</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-0 focus:ring-0 p-0 text-sm placeholder-gray-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedEmployees.length > 0 && (
          <div className="bg-primary-50 border border-primary-200 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-primary-700">
                {selectedEmployees.length} employee(s) selected
              </div>
              <div className="flex gap-2">
                <button className="text-sm bg-white border border-primary-300 text-primary-700 px-3 py-1 rounded hover:bg-primary-50 transition-colors">
                  Export Selected
                </button>
                <button className="text-sm bg-white border border-primary-300 text-primary-700 px-3 py-1 rounded hover:bg-primary-50 transition-colors">
                  Bulk Edit
                </button>
                <button 
                  onClick={() => setSelectedEmployees([])}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Position</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Start Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Salary</th>
                  <th className="text-center py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={() => handleSelectEmployee(employee.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{employee.employeeId}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{employee.position}</div>
                      <div className="text-sm text-gray-500">Reports to: {employee.manager}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{employee.department}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Date(employee.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      ${employee.salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors" title="Email">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="More">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p>Try adjusting your search criteria or add a new employee.</p>
          </div>
        )}

        {/* Add Employee Modal */}
        {showAddEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Employee</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter position"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter salary"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Add Employee
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddEmployee(false)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeesPage
