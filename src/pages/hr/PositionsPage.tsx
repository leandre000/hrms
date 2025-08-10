import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Briefcase, Users, DollarSign } from 'lucide-react'

interface Position {
  id: string
  title: string
  code: string
  department: string
  level: string
  salaryRange: string
  status: 'open' | 'filled' | 'closed'
  requirements: string[]
  responsibilities: string[]
  createdAt: string
}

const mockPositions: Position[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    code: 'SWE-SEN',
    department: 'Information Technology',
    level: 'Senior',
    salaryRange: '$80,000 - $120,000',
    status: 'open',
    requirements: ['5+ years experience', 'React/Node.js', 'Bachelor\'s degree'],
    responsibilities: ['Lead development projects', 'Mentor junior developers', 'Code review'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'HR Manager',
    code: 'HR-MGR',
    department: 'Human Resources',
    level: 'Manager',
    salaryRange: '$70,000 - $90,000',
    status: 'filled',
    requirements: ['7+ years HR experience', 'PHR certification', 'Management experience'],
    responsibilities: ['Lead HR team', 'Policy development', 'Employee relations'],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Financial Analyst',
    code: 'FIN-ANA',
    department: 'Finance',
    level: 'Mid-level',
    salaryRange: '$60,000 - $80,000',
    status: 'open',
    requirements: ['3+ years experience', 'Excel/Financial modeling', 'Bachelor\'s degree'],
    responsibilities: ['Financial reporting', 'Budget analysis', 'Data analysis'],
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    code: 'MKT-SPC',
    department: 'Marketing',
    level: 'Mid-level',
    salaryRange: '$50,000 - $70,000',
    status: 'open',
    requirements: ['2+ years experience', 'Digital marketing', 'Creative skills'],
    responsibilities: ['Campaign management', 'Content creation', 'Social media'],
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    title: 'Operations Coordinator',
    code: 'OPS-COORD',
    department: 'Operations',
    level: 'Entry-level',
    salaryRange: '$40,000 - $55,000',
    status: 'filled',
    requirements: ['1+ year experience', 'Organization skills', 'Communication'],
    responsibilities: ['Process coordination', 'Documentation', 'Team support'],
    createdAt: '2024-01-25'
  }
]

const PositionsPage: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>(mockPositions)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPosition, setEditingPosition] = useState<Position | null>(null)

  const filteredPositions = positions.filter(position =>
    position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setPositions(positions.filter(pos => pos.id !== id))
  }

  const handleStatusChange = (id: string, newStatus: 'open' | 'filled' | 'closed') => {
    setPositions(positions.map(pos =>
      pos.id === id ? { ...pos, status: newStatus } : pos
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'filled': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Senior': return 'bg-purple-100 text-purple-800'
      case 'Manager': return 'bg-blue-100 text-blue-800'
      case 'Mid-level': return 'bg-green-100 text-green-800'
      case 'Entry-level': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job Positions</h1>
              <p className="text-gray-600 mt-2">Manage job positions, requirements, and responsibilities</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Position
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Positions</p>
                <p className="text-2xl font-bold text-gray-900">{positions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open Positions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {positions.filter(pos => pos.status === 'open').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Filled Positions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {positions.filter(pos => pos.status === 'filled').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Salary Range</p>
                <p className="text-2xl font-bold text-gray-900">$65,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search positions, codes, or departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="filled">Filled</option>
                <option value="closed">Closed</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">All Levels</option>
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>
        </div>

        {/* Positions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary Range
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
                {filteredPositions.map((position) => (
                  <tr key={position.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{position.title}</div>
                        <div className="text-sm text-gray-500">Code: {position.code}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          Requirements: {position.requirements.slice(0, 2).join(', ')}
                          {position.requirements.length > 2 && '...'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{position.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(position.level)}`}>
                        {position.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{position.salaryRange}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(position.status)}`}>
                        {position.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(position.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingPosition(position)}
                          className="text-primary-600 hover:text-primary-900 p-1"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <select
                          value={position.status}
                          onChange={(e) => handleStatusChange(position.id, e.target.value as 'open' | 'filled' | 'closed')}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="open">Open</option>
                          <option value="filled">Filled</option>
                          <option value="closed">Closed</option>
                        </select>
                        <button
                          onClick={() => handleDelete(position.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
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

        {/* Empty State */}
        {filteredPositions.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No positions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new position.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Add Position
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Position Modal */}
      {(showAddModal || editingPosition) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingPosition ? 'Edit Position' : 'Add New Position'}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position Title</label>
                  <input
                    type="text"
                    defaultValue={editingPosition?.title || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position Code</label>
                  <input
                    type="text"
                    defaultValue={editingPosition?.code || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select
                    defaultValue={editingPosition?.department || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Department</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Level</label>
                  <select
                    defaultValue={editingPosition?.level || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Level</option>
                    <option value="Entry-level">Entry-level</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                  <input
                    type="text"
                    defaultValue={editingPosition?.salaryRange || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingPosition(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    {editingPosition ? 'Update' : 'Create'}
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

export default PositionsPage
