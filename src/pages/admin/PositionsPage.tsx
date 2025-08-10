import React, { useState } from 'react'
import { Briefcase, Plus, Edit, Trash2, Users, DollarSign, TrendingUp, Star } from 'lucide-react'

const PositionsPage = () => {
  const [showAddPosition, setShowAddPosition] = useState(false)
  const [filter, setFilter] = useState('all')

  const positions = [
    {
      id: 1,
      title: 'Senior Developer',
      department: 'Engineering',
      level: 'Senior',
      minSalary: 90000,
      maxSalary: 120000,
      currentEmployees: 8,
      description: 'Experienced software developer responsible for complex feature development',
      requirements: ['5+ years experience', 'React/Node.js', 'Team leadership'],
      responsibilities: ['Code development', 'Code reviews', 'Mentoring'],
      status: 'active'
    },
    {
      id: 2,
      title: 'Engineering Manager',
      department: 'Engineering',
      level: 'Manager',
      minSalary: 120000,
      maxSalary: 150000,
      currentEmployees: 2,
      description: 'Lead and manage engineering teams, drive technical decisions',
      requirements: ['8+ years experience', 'Leadership experience', 'Technical expertise'],
      responsibilities: ['Team management', 'Strategic planning', 'Performance reviews'],
      status: 'active'
    },
    {
      id: 3,
      title: 'Junior Developer',
      department: 'Engineering',
      level: 'Junior',
      minSalary: 60000,
      maxSalary: 80000,
      currentEmployees: 5,
      description: 'Entry-level developer focused on learning and contributing',
      requirements: ['0-2 years experience', 'Computer Science degree', 'Programming fundamentals'],
      responsibilities: ['Code development', 'Learning', 'Bug fixes'],
      status: 'active'
    },
    {
      id: 4,
      title: 'HR Manager',
      department: 'Human Resources',
      level: 'Manager',
      minSalary: 80000,
      maxSalary: 100000,
      currentEmployees: 1,
      description: 'Manage HR operations and employee relations',
      requirements: ['5+ years HR experience', 'SHRM certification preferred', 'Leadership skills'],
      responsibilities: ['Employee relations', 'Policy development', 'Compliance'],
      status: 'active'
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      department: 'Marketing',
      level: 'Mid',
      minSalary: 55000,
      maxSalary: 75000,
      currentEmployees: 3,
      description: 'Execute marketing campaigns and brand initiatives',
      requirements: ['2-4 years experience', 'Marketing degree', 'Digital marketing'],
      responsibilities: ['Campaign execution', 'Content creation', 'Analytics'],
      status: 'active'
    }
  ]

  const departments = ['all', 'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance']
  const levels = ['all', 'Junior', 'Mid', 'Senior', 'Manager', 'Director', 'VP']

  const filteredPositions = positions.filter(position => {
    if (filter === 'all') return true
    return position.department === filter
  })

  const stats = {
    totalPositions: positions.length,
    totalEmployees: positions.reduce((sum, pos) => sum + pos.currentEmployees, 0),
    avgSalary: Math.round(positions.reduce((sum, pos) => sum + ((pos.minSalary + pos.maxSalary) / 2), 0) / positions.length),
    openPositions: 3
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Positions</h1>
            <p className="text-gray-600">Manage job positions and role definitions</p>
          </div>
          <button
            onClick={() => setShowAddPosition(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Position
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalPositions}</div>
                <div className="text-sm text-gray-600">Total Positions</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</div>
                <div className="text-sm text-gray-600">Employees in Roles</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${stats.avgSalary.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Average Salary</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.openPositions}</div>
                <div className="text-sm text-gray-600">Open Positions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.slice(1).map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Positions List */}
        <div className="space-y-4">
          {filteredPositions.map((position) => (
            <div key={position.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{position.title}</h3>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                      {position.level}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {position.department}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{position.description}</p>
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Requirements</h4>
                  <ul className="space-y-1">
                    {position.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Responsibilities</h4>
                  <ul className="space-y-1">
                    {position.responsibilities.map((resp, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Position Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salary Range:</span>
                      <span className="font-medium">${position.minSalary.toLocaleString()} - ${position.maxSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Employees:</span>
                      <span className="font-medium">{position.currentEmployees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {position.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View All Employees in This Role
                  </button>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    Post Job Opening
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Position Modal */}
        {showAddPosition && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Position</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position Title</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter position title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select level</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Salary</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter minimum salary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Salary</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter maximum salary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter position description"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Create Position
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddPosition(false)}
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

export default PositionsPage
