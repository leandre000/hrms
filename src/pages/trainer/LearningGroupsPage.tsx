import { useState } from 'react'
import { 
  Search, 
  Plus, 
  Users, 
  BookOpen, 
  Calendar, 
  Eye, 
  Edit, 
  Trash2,
  MessageSquare,
  UserPlus,
  Settings,
  Target,
  TrendingUp,
  X
} from 'lucide-react'

interface LearningGroup {
  id: string
  name: string
  description: string
  program: string
  course: string
  instructor: string
  memberCount: number
  maxMembers: number
  startDate: string
  endDate: string
  status: 'active' | 'completed' | 'planning' | 'paused'
  progress: number
  meetingSchedule: string
  lastActivity: string
}

const mockGroups: LearningGroup[] = [
  {
    id: 'GRP001',
    name: 'Digital Marketing Cohort A',
    description: 'Advanced digital marketing strategies and implementation',
    program: 'Digital Marketing Fundamentals',
    course: 'Social Media Marketing',
    instructor: 'Michael Chen',
    memberCount: 18,
    maxMembers: 25,
    startDate: '2024-02-01',
    endDate: '2024-05-31',
    status: 'active',
    progress: 65,
    meetingSchedule: 'Every Tuesday & Thursday, 2:00 PM',
    lastActivity: '2024-03-20'
  },
  {
    id: 'GRP002',
    name: 'Web Development Bootcamp Group 1',
    description: 'Full-stack web development intensive program',
    program: 'Web Development Bootcamp',
    course: 'React.js Advanced',
    instructor: 'Emily Watson',
    memberCount: 22,
    maxMembers: 30,
    startDate: '2024-02-15',
    endDate: '2024-06-15',
    status: 'active',
    progress: 45,
    meetingSchedule: 'Every Monday, Wednesday, Friday, 10:00 AM',
    lastActivity: '2024-03-18'
  },
  {
    id: 'GRP003',
    name: 'Data Science Study Group',
    description: 'Collaborative learning for data science concepts',
    program: 'Data Science Essentials',
    course: 'Python for Data Analysis',
    instructor: 'Dr. Robert Kim',
    memberCount: 15,
    maxMembers: 20,
    startDate: '2024-01-25',
    endDate: '2024-04-25',
    status: 'completed',
    progress: 100,
    meetingSchedule: 'Every Saturday, 1:00 PM',
    lastActivity: '2024-04-20'
  },
  {
    id: 'GRP004',
    name: 'UX/UI Design Workshop',
    description: 'Hands-on design thinking and prototyping',
    program: 'UX/UI Design',
    course: 'User Research Methods',
    instructor: 'Alex Thompson',
    memberCount: 12,
    maxMembers: 15,
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    status: 'planning',
    progress: 0,
    meetingSchedule: 'Every Friday, 3:00 PM',
    lastActivity: '2024-03-01'
  }
]

const LearningGroupsPage = () => {
  const [groups, setGroups] = useState<LearningGroup[]>(mockGroups)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [programFilter, setProgramFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [selectedGroup, setSelectedGroup] = useState<LearningGroup | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.program.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || group.status === statusFilter
    const matchesProgram = programFilter === 'all' || group.program === programFilter
    
    return matchesSearch && matchesStatus && matchesProgram
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'planning': return 'text-yellow-600 bg-yellow-100'
      case 'paused': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 60) return 'text-blue-600'
    if (progress >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const quickStats = [
    { label: 'Total Groups', value: groups.length, icon: Users, color: 'text-blue-600' },
    { label: 'Active Groups', value: groups.filter(g => g.status === 'active').length, icon: Target, color: 'text-green-600' },
    { label: 'Total Members', value: groups.reduce((sum, g) => sum + g.memberCount, 0), icon: Users, color: 'text-purple-600' },
    { label: 'Avg. Progress', value: Math.round(groups.reduce((sum, g) => sum + g.progress, 0) / groups.length), icon: TrendingUp, color: 'text-orange-600' }
  ]

  const programs = Array.from(new Set(groups.map(g => g.program)))

  const handleDeleteGroup = (groupId: string) => {
    setGroups(prev => prev.filter(g => g.id !== groupId))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Groups</h1>
          <p className="text-gray-600">Manage collaborative learning groups and cohorts</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
            Group Settings
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            Create Group
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search groups, programs, or descriptions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="planning">Planning</option>
              <option value="paused">Paused</option>
            </select>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
            >
              <option value="all">All Programs</option>
              {programs.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
            
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 ${viewMode === 'table' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Groups List */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program/Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{group.name}</div>
                        <div className="text-sm text-gray-500">{group.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{group.program}</div>
                        <div className="text-sm text-gray-500">{group.course}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {group.memberCount}/{group.maxMembers}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(group.status)}`}>
                        {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(group.progress)}`}
                            style={{ width: `${group.progress}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getProgressColor(group.progress)}`}>
                          {group.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {group.meetingSchedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedGroup(group)
                            setShowDetailModal(true)
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <UserPlus className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-red-600 hover:text-red-900"
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{group.description}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(group.status)}`}>
                  {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{group.program}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-500">{group.memberCount}/{group.maxMembers} members</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-500">{group.meetingSchedule}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className={`font-medium ${getProgressColor(group.progress)}`}>
                    {group.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(group.progress)}`}
                    style={{ width: `${group.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Instructor: {group.instructor}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setSelectedGroup(group)
                      setShowDetailModal(true)
                    }}
                    className="p-1 text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-green-600 hover:text-green-900">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-purple-600 hover:text-purple-900">
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Group Detail Modal */}
      {showDetailModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Group Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Group Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedGroup.name}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Description:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedGroup.description}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedGroup.status)}`}>
                      {selectedGroup.status.charAt(0).toUpperCase() + selectedGroup.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Program Details</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Program:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedGroup.program}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Course:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedGroup.course}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Instructor:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedGroup.instructor}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Membership</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Current Members:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedGroup.memberCount}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Maximum Members:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedGroup.maxMembers}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Progress:</span>
                    <span className={`ml-2 text-sm font-medium ${getProgressColor(selectedGroup.progress)}`}>
                      {selectedGroup.progress}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Schedule</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Meeting Schedule:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedGroup.meetingSchedule}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Start Date:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {new Date(selectedGroup.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">End Date:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {new Date(selectedGroup.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
              <button className="btn-primary">
                <Edit className="w-4 h-4 mr-2" />
                Edit Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LearningGroupsPage
