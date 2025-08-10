import React, { useState } from 'react'
import { Building2, Plus, Edit, Trash2, Users, DollarSign, TrendingUp, BarChart3 } from 'lucide-react'

const DepartmentsPage = () => {
  const [showAddDepartment, setShowAddDepartment] = useState(false)

  const departments = [
    {
      id: 1,
      name: 'Engineering',
      description: 'Software development and technical operations',
      head: 'Michael Chen',
      employeeCount: 25,
      budget: 2500000,
      avgSalary: 105000,
      location: 'New York, NY',
      established: '2019-01-01',
      costCenter: 'ENG-001'
    },
    {
      id: 2,
      name: 'Human Resources',
      description: 'People operations and talent management',
      head: 'Lisa Rodriguez',
      employeeCount: 8,
      budget: 800000,
      avgSalary: 75000,
      location: 'Austin, TX',
      established: '2019-01-01',
      costCenter: 'HR-001'
    },
    {
      id: 3,
      name: 'Marketing',
      description: 'Brand management and customer acquisition',
      head: 'David Kim',
      employeeCount: 12,
      budget: 1200000,
      avgSalary: 68000,
      location: 'San Francisco, CA',
      established: '2019-06-01',
      costCenter: 'MKT-001'
    },
    {
      id: 4,
      name: 'Sales',
      description: 'Revenue generation and client relationships',
      head: 'Jennifer Adams',
      employeeCount: 15,
      budget: 1800000,
      avgSalary: 85000,
      location: 'Multiple',
      established: '2019-03-01',
      costCenter: 'SAL-001'
    }
  ]

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0)
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0)

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
            <p className="text-gray-600">Manage organizational departments and structure</p>
          </div>
          <button
            onClick={() => setShowAddDepartment(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Department
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{departments.length}</div>
                <div className="text-sm text-gray-600">Total Departments</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalEmployees}</div>
                <div className="text-sm text-gray-600">Total Employees</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(totalBudget / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-600">Total Budget</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${Math.round(totalBudget / totalEmployees / 1000)}K</div>
                <div className="text-sm text-gray-600">Avg Cost/Employee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {departments.map((department) => (
            <div key={department.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Building2 className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                    <p className="text-sm text-gray-600">{department.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Department Head</div>
                  <div className="font-medium text-gray-900">{department.head}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-medium text-gray-900">{department.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Employees</div>
                  <div className="font-medium text-gray-900">{department.employeeCount}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Cost Center</div>
                  <div className="font-medium text-gray-900">{department.costCenter}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Annual Budget</div>
                    <div className="text-lg font-semibold text-green-600">
                      ${(department.budget / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Average Salary</div>
                    <div className="text-lg font-semibold text-blue-600">
                      ${department.avgSalary.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View Department Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Department Modal */}
        {showAddDepartment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Department</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter department name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter department description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Head</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="">Select department head</option>
                      <option value="john.doe">John Doe</option>
                      <option value="sarah.wilson">Sarah Wilson</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Budget</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter annual budget"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Create Department
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddDepartment(false)}
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

export default DepartmentsPage
