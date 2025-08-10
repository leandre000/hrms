import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Users, Building, MapPin } from 'lucide-react'

interface Department {
  id: string
  name: string
  code: string
  manager: string
  employeeCount: number
  location: string
  status: 'active' | 'inactive'
  description: string
  createdAt: string
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Human Resources',
    code: 'HR',
    manager: 'Sarah Johnson',
    employeeCount: 12,
    location: 'Main Office',
    status: 'active',
    description: 'Manages all HR operations and employee relations',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Information Technology',
    code: 'IT',
    manager: 'Mike Chen',
    employeeCount: 25,
    location: 'Tech Hub',
    status: 'active',
    description: 'Handles all technical infrastructure and development',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Finance & Accounting',
    code: 'FIN',
    manager: 'Lisa Rodriguez',
    employeeCount: 18,
    location: 'Main Office',
    status: 'active',
    description: 'Manages financial operations and reporting',
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    name: 'Marketing',
    code: 'MKT',
    manager: 'David Kim',
    employeeCount: 15,
    location: 'Creative Studio',
    status: 'active',
    description: 'Handles brand management and marketing campaigns',
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'Sales',
    code: 'SALES',
    manager: 'Jennifer Smith',
    employeeCount: 32,
    location: 'Sales Center',
    status: 'active',
    description: 'Manages customer acquisition and sales operations',
    createdAt: '2024-01-08'
  }
]

const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddDepartment = (newDept: Omit<Department, 'id' | 'createdAt'>) => {
    const department: Department = {
      ...newDept,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    setDepartments([...departments, department])
    setShowAddModal(false)
  }

  const handleEditDepartment = (dept: Department) => {
    setEditingDepartment(dept)
    setShowAddModal(true)
  }

  const handleUpdateDepartment = (updatedDept: Department) => {
    setDepartments(departments.map(dept => 
      dept.id === updatedDept.id ? updatedDept : dept
    ))
    setEditingDepartment(null)
    setShowAddModal(false)
  }

  const handleDeleteDepartment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id))
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Departments</h1>
        <p className="text-gray-600">Manage organizational departments and structure</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Departments</p>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Locations</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(departments.map(dept => dept.location)).size}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Size</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(departments.reduce((sum, dept) => sum + dept.employeeCount, 0) / departments.length)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </button>
          </div>
        </div>

        {/* Departments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDepartments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                      <div className="text-sm text-gray-500">{dept.code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{dept.manager}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{dept.employeeCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{dept.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      dept.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {dept.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dept.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditDepartment(dept)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDepartment(dept.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingDepartment ? 'Edit Department' : 'Add New Department'}
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const newDept = {
                  name: formData.get('name') as string,
                  code: formData.get('code') as string,
                  manager: formData.get('manager') as string,
                  employeeCount: parseInt(formData.get('employeeCount') as string),
                  location: formData.get('location') as string,
                  status: formData.get('status') as 'active' | 'inactive',
                  description: formData.get('description') as string
                }
                
                if (editingDepartment) {
                  handleUpdateDepartment({ ...editingDepartment, ...newDept })
                } else {
                  handleAddDepartment(newDept)
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingDepartment?.name}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Code</label>
                    <input
                      type="text"
                      name="code"
                      defaultValue={editingDepartment?.code}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Manager</label>
                    <input
                      type="text"
                      name="manager"
                      defaultValue={editingDepartment?.manager}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Count</label>
                    <input
                      type="number"
                      name="employeeCount"
                      defaultValue={editingDepartment?.employeeCount}
                      required
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={editingDepartment?.location}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      defaultValue={editingDepartment?.status || 'active'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingDepartment?.description}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingDepartment(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingDepartment ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepartmentsPage
