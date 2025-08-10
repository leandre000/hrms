import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Users, Target, Calendar } from 'lucide-react'

interface Team {
  id: string
  name: string
  department: string
  leader: string
  memberCount: number
  status: 'active' | 'inactive'
  description: string
  projects: string[]
  createdAt: string
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Development',
    department: 'Information Technology',
    leader: 'Michael Chen',
    memberCount: 8,
    status: 'active',
    description: 'Responsible for user interface development and user experience',
    projects: ['Customer Portal', 'Mobile App', 'Admin Dashboard'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Backend Development',
    department: 'Information Technology',
    leader: 'Sarah Johnson',
    memberCount: 6,
    status: 'active',
    description: 'Handles server-side logic and database management',
    projects: ['API Development', 'Database Optimization', 'System Integration'],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Digital Marketing',
    department: 'Marketing',
    leader: 'David Kim',
    memberCount: 5,
    status: 'active',
    description: 'Manages online marketing campaigns and social media presence',
    projects: ['Social Media Campaign', 'SEO Optimization', 'Content Marketing'],
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    name: 'Financial Planning',
    department: 'Finance',
    leader: 'Emily Rodriguez',
    memberCount: 4,
    status: 'active',
    description: 'Handles budgeting, forecasting, and financial analysis',
    projects: ['Annual Budget', 'Financial Reports', 'Cost Analysis'],
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    name: 'HR Operations',
    department: 'Human Resources',
    leader: 'Lisa Thompson',
    memberCount: 7,
    status: 'active',
    description: 'Manages day-to-day HR operations and employee relations',
    projects: ['Employee Onboarding', 'Policy Updates', 'Training Programs'],
    createdAt: '2024-01-25'
  }
]

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(mockTeams)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leader.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setTeams(teams.filter(team => team.id !== id))
  }

  const handleStatusToggle = (id: string) => {
    setTeams(teams.map(team =>
      team.id === id
        ? { ...team, status: team.status === 'active' ? 'inactive' : 'active' }
        : team
    ))
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
              <p className="text-gray-600 mt-2">Manage team structures and project assignments</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Team
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Teams</p>
                <p className="text-2xl font-bold text-gray-900">{teams.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teams.reduce((sum, team) => sum + team.memberCount, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Teams</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teams.filter(team => team.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teams.reduce((sum, team) => sum + team.projects.length, 0)}
                </p>
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
                  placeholder="Search teams, departments, or leaders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">All Departments</option>
                {Array.from(new Set(teams.map(team => team.department))).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                  <p className="text-sm text-gray-500">{team.department}</p>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    team.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {team.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Leader: {team.leader}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Members: {team.memberCount}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">{team.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Active Projects:</h4>
                <div className="flex flex-wrap gap-1">
                  {team.projects.map((project, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Created: {new Date(team.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingTeam(team)}
                    className="text-primary-600 hover:text-primary-900 p-1"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStatusToggle(team.id)}
                    className={`p-1 rounded ${
                      team.status === 'active'
                        ? 'text-orange-600 hover:text-orange-900'
                        : 'text-green-600 hover:text-green-900'
                    }`}
                  >
                    {team.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No teams found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new team.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Add Team
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Team Modal */}
      {(showAddModal || editingTeam) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingTeam ? 'Edit Team' : 'Add New Team'}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Name</label>
                  <input
                    type="text"
                    defaultValue={editingTeam?.name || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select
                    defaultValue={editingTeam?.department || ''}
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
                  <label className="block text-sm font-medium text-gray-700">Team Leader</label>
                  <input
                    type="text"
                    defaultValue={editingTeam?.leader || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Count</label>
                  <input
                    type="number"
                    defaultValue={editingTeam?.memberCount || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    defaultValue={editingTeam?.description || ''}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingTeam(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    {editingTeam ? 'Update' : 'Create'}
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

export default TeamsPage
