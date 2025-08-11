import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Users, Target, Star } from 'lucide-react'

interface Team {
  id: string
  name: string
  description: string
  leader: string
  memberCount: number
  department: string
  status: 'active' | 'inactive'
  createdAt: string
  projects: number
  performance: 'excellent' | 'good' | 'average' | 'poor'
}

const initialTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Development',
    description: 'Responsible for user interface development and user experience',
    leader: 'Alex Johnson',
    memberCount: 8,
    department: 'Information Technology',
    status: 'active',
    createdAt: '2024-01-15',
    projects: 12,
    performance: 'excellent'
  },
  {
    id: '2',
    name: 'Backend Development',
    description: 'Handles server-side logic and database management',
    leader: 'Sarah Chen',
    memberCount: 6,
    department: 'Information Technology',
    status: 'active',
    createdAt: '2024-01-10',
    projects: 15,
    performance: 'good'
  },
  {
    id: '3',
    name: 'Quality Assurance',
    description: 'Ensures software quality through testing and validation',
    leader: 'Mike Rodriguez',
    memberCount: 5,
    department: 'Information Technology',
    status: 'active',
    createdAt: '2024-01-20',
    projects: 8,
    performance: 'good'
  },
  {
    id: '4',
    name: 'Marketing Campaigns',
    description: 'Creates and executes marketing strategies and campaigns',
    leader: 'Jennifer Smith',
    memberCount: 7,
    department: 'Marketing',
    status: 'active',
    createdAt: '2024-01-12',
    projects: 6,
    performance: 'excellent'
  },
  {
    id: '5',
    name: 'Sales Operations',
    description: 'Manages sales processes and customer relationships',
    leader: 'David Kim',
    memberCount: 10,
    department: 'Sales',
    status: 'active',
    createdAt: '2024-01-08',
    projects: 4,
    performance: 'average'
  }
]

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTeam = (newTeam: Omit<Team, 'id' | 'createdAt'>) => {
    const team: Team = {
      ...newTeam,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    setTeams([...teams, team])
    setShowAddModal(false)
  }

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team)
    setShowAddModal(true)
  }

  const handleUpdateTeam = (updatedTeam: Team) => {
    setTeams(teams.map(team => 
      team.id === updatedTeam.id ? updatedTeam : team
    ))
    setEditingTeam(null)
    setShowAddModal(false)
  }

  const handleDeleteTeam = (id: string) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      setTeams(teams.filter(team => team.id !== id))
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'average': return 'bg-yellow-100 text-yellow-800'
      case 'poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Teams</h1>
        <p className="text-gray-600">Manage organizational teams and their performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Teams</p>
              <p className="text-2xl font-bold text-gray-900">{teams.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {teams.reduce((sum, team) => sum + team.memberCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">
                {teams.reduce((sum, team) => sum + team.projects, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-gray-900">
                {teams.filter(team => team.performance === 'excellent' || team.performance === 'good').length}/{teams.length}
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
                placeholder="Search teams..."
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
              Add Team
            </button>
          </div>
        </div>

        {/* Teams Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leader
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{team.name}</div>
                      <div className="text-sm text-gray-500">{team.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{team.leader}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{team.memberCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{team.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{team.projects}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(team.performance)}`}>
                      {team.performance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      team.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {team.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditTeam(team)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(team.id)}
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

      {/* Add/Edit Team Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTeam ? 'Edit Team' : 'Add New Team'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingTeam(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const newTeam = {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                leader: formData.get('leader') as string,
                memberCount: parseInt(formData.get('memberCount') as string),
                department: formData.get('department') as string,
                status: formData.get('status') as 'active' | 'inactive',
                projects: parseInt(formData.get('projects') as string),
                performance: formData.get('performance') as 'excellent' | 'good' | 'average' | 'poor'
              }
              
              if (editingTeam) {
                handleUpdateTeam({ ...editingTeam, ...newTeam })
              } else {
                handleAddTeam(newTeam)
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingTeam?.name}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingTeam?.description}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Leader</label>
                  <input
                    type="text"
                    name="leader"
                    defaultValue={editingTeam?.leader}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Count</label>
                  <input
                    type="number"
                    name="memberCount"
                    defaultValue={editingTeam?.memberCount}
                    required
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    name="department"
                    defaultValue={editingTeam?.department}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Projects</label>
                  <input
                    type="number"
                    name="projects"
                    defaultValue={editingTeam?.projects}
                    required
                    min="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Performance</label>
                  <select
                    name="performance"
                    defaultValue={editingTeam?.performance || 'good'}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    defaultValue={editingTeam?.status || 'active'}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingTeam(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingTeam ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamsPage
