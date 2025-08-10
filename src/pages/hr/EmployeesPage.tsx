import React, { useState } from 'react'
import { Users, Search, Filter, Plus, Eye, Edit, MoreHorizontal } from 'lucide-react'

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const employees = [
    {
      id: 'EMP001',
      name: 'John Doe',
      position: 'Senior Developer',
      department: 'Engineering',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      hireDate: '2023-01-15',
      salary: 95000,
      manager: 'Sarah Wilson'
    },
    {
      id: 'EMP002',
      name: 'Jane Smith',
      position: 'Marketing Manager',
      department: 'Marketing',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 234-5678',
      status: 'Active',
      hireDate: '2022-08-20',
      salary: 78000,
      manager: 'Mike Johnson'
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      position: 'Sales Director',
      department: 'Sales',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 345-6789',
      status: 'Active',
      hireDate: '2021-03-10',
      salary: 110000,
      manager: 'CEO'
    },
    {
      id: 'EMP004',
      name: 'Sarah Wilson',
      position: 'Engineering Manager',
      department: 'Engineering',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 456-7890',
      status: 'On Leave',
      hireDate: '2020-11-05',
      salary: 120000,
      manager: 'CTO'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'On Leave': return 'bg-yellow-100 text-yellow-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Employees</h1>
            <p className="text-gray-600">Manage employee information and records</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
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
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Position</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Hire Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Manager</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{employee.position}</td>
                    <td className="px-6 py-4 text-gray-900">{employee.department}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{new Date(employee.hireDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-900">{employee.manager}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-primary-600">{employees.length}</div>
            <div className="text-sm text-gray-600">Total Employees</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">
              {employees.filter(e => e.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {employees.filter(e => e.status === 'On Leave').length}
            </div>
            <div className="text-sm text-gray-600">On Leave</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-gray-600">
              {new Set(employees.map(e => e.department)).size}
            </div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeesPage
