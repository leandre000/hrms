import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  TrendingUp, 
  Target, 
  Users,
  BarChart3,
  BookOpen,
  Award,
  Clock,
  User,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface PersonalDevelopmentPlan {
  id: string
  employeeName: string
  employeeId: string
  department: string
  position: string
  mentor: string
  startDate: string
  endDate: string
  status: 'Draft' | 'Active' | 'On Track' | 'At Risk' | 'Completed' | 'On Hold'
  progress: number
  goals: {
    id: string
    title: string
    description: string
    category: 'Skill Development' | 'Career Growth' | 'Leadership' | 'Technical' | 'Soft Skills'
    targetDate: string
    status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed'
    progress: number
  }[]
  activities: {
    id: string
    title: string
    type: 'Training' | 'Mentoring' | 'Project' | 'Certification' | 'Workshop'
    startDate: string
    endDate: string
    status: 'Planned' | 'In Progress' | 'Completed' | 'Cancelled'
    hours: number
  }[]
  lastReview: string
  nextReview: string
}

const mockPersonalPlans: PersonalDevelopmentPlan[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP001',
    department: 'Engineering',
    position: 'Software Engineer',
    mentor: 'Dr. Michael Chen',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    status: 'Active',
    progress: 65,
    goals: [
      {
        id: '1',
        title: 'Master React and TypeScript',
        description: 'Develop advanced skills in modern frontend development',
        category: 'Technical',
        targetDate: '2024-06-30',
        status: 'In Progress',
        progress: 70
      },
      {
        id: '2',
        title: 'Lead a Development Team',
        description: 'Take on team leadership responsibilities in a project',
        category: 'Leadership',
        targetDate: '2024-09-30',
        status: 'Not Started',
        progress: 0
      },
      {
        id: '3',
        title: 'Obtain AWS Certification',
        description: 'Complete AWS Solutions Architect certification',
        category: 'Certification',
        targetDate: '2024-08-31',
        status: 'In Progress',
        progress: 40
      }
    ],
    activities: [
      {
        id: '1',
        title: 'Advanced React Course',
        type: 'Training',
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        status: 'In Progress',
        hours: 40
      },
      {
        id: '2',
        title: 'Weekly Mentoring Sessions',
        type: 'Mentoring',
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        status: 'In Progress',
        hours: 2
      }
    ],
    lastReview: '2024-03-15',
    nextReview: '2024-04-15'
  },
  {
    id: '2',
    employeeName: 'David Rodriguez',
    employeeId: 'EMP002',
    department: 'Marketing',
    position: 'Marketing Specialist',
    mentor: 'Lisa Wang',
    startDate: '2024-02-01',
    endDate: '2024-12-31',
    status: 'On Track',
    progress: 45,
    goals: [
      {
        id: '1',
        title: 'Digital Marketing Mastery',
        description: 'Become proficient in all digital marketing channels',
        category: 'Skill Development',
        targetDate: '2024-07-31',
        status: 'In Progress',
        progress: 60
      },
      {
        id: '2',
        title: 'Data Analytics Skills',
        description: 'Learn to analyze marketing data and create reports',
        category: 'Technical',
        targetDate: '2024-08-31',
        status: 'Not Started',
        progress: 0
      }
    ],
    activities: [
      {
        id: '1',
        title: 'Digital Marketing Certification',
        type: 'Certification',
        startDate: '2024-03-01',
        endDate: '2024-06-30',
        status: 'In Progress',
        hours: 60
      }
    ],
    lastReview: '2024-03-01',
    nextReview: '2024-04-01'
  }
]

const PersonalDevelopmentPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PersonalDevelopmentPlan | null>(null)

  const filteredPlans = mockPersonalPlans.filter(plan => {
    const matchesSearch = plan.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === 'All' || plan.department === departmentFilter
    const matchesStatus = statusFilter === 'All' || plan.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const stats = {
    totalPlans: mockPersonalPlans.length,
    activePlans: mockPersonalPlans.filter(p => p.status === 'Active').length,
    onTrackPlans: mockPersonalPlans.filter(p => p.status === 'On Track').length,
    atRiskPlans: mockPersonalPlans.filter(p => p.status === 'At Risk').length,
    avgProgress: Math.round(mockPersonalPlans.reduce((acc, plan) => acc + plan.progress, 0) / mockPersonalPlans.length)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800'
      case 'Active': return 'bg-blue-100 text-blue-800'
      case 'On Track': return 'bg-green-100 text-green-800'
      case 'At Risk': return 'bg-red-100 text-red-800'
      case 'Completed': return 'bg-purple-100 text-purple-800'
      case 'On Hold': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started': return 'bg-gray-100 text-gray-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Delayed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-gray-100 text-gray-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Skill Development': return 'bg-blue-100 text-blue-800'
      case 'Career Growth': return 'bg-green-100 text-green-800'
      case 'Leadership': return 'bg-purple-100 text-purple-800'
      case 'Technical': return 'bg-orange-100 text-orange-800'
      case 'Soft Skills': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Development Plans</h1>
        <p className="text-gray-600">Manage individual development plans and track learner progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Plans</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPlans}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Plans</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activePlans}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">On Track</p>
              <p className="text-2xl font-bold text-gray-900">{stats.onTrackPlans}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-gray-900">{stats.atRiskPlans}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <button
            onClick={() => setShowCreatePlanModal(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Development Plan
          </button>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Development Plans List */}
      <div className="space-y-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-xl font-medium text-gray-900">{plan.employeeName}</h3>
                  <span className="text-sm text-gray-500">ID: {plan.employeeId}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span>{plan.position} • {plan.department}</span>
                  <span>Mentor: {plan.mentor}</span>
                  <span>Progress: {plan.progress}%</span>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-500 mt-2">
                  <span>Start: {plan.startDate}</span>
                  <span>End: {plan.endDate}</span>
                  <span>Last Review: {plan.lastReview}</span>
                  <span>Next Review: {plan.nextReview}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedPlan(plan)}
                  className="px-4 py-2 text-sm text-primary-600 hover:text-primary-900 flex items-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>{plan.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Goals and Activities Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Goals ({plan.goals.length})</h4>
                <div className="space-y-2">
                  {plan.goals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{goal.title}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                            {goal.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                            {goal.category}
                          </span>
                          <span>Due: {goal.targetDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{goal.progress}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {plan.goals.length > 3 && (
                    <div className="text-center text-sm text-gray-500 py-2">
                      +{plan.goals.length - 3} more goals
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Activities ({plan.activities.length})</h4>
                <div className="space-y-2">
                  {plan.activities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActivityStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="capitalize">{activity.type}</span>
                          <span>•</span>
                          <span>{activity.hours}h</span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <div>{activity.startDate}</div>
                        <div>to {activity.endDate}</div>
                      </div>
                    </div>
                  ))}
                  {plan.activities.length > 3 && (
                    <div className="text-center text-sm text-gray-500 py-2">
                      +{plan.activities.length - 3} more activities
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Plan Modal */}
      {showCreatePlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create Development Plan</h3>
              <button
                onClick={() => setShowCreatePlanModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">×</span>
                </div>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter employee name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Select department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mentor</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter mentor name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreatePlanModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Create Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalDevelopmentPlansPage
