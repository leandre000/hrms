import React, { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Target, 
  Award, 
  Plus,
  Search,
  Filter,
  Calendar,
  Star,
  CheckCircle,
  AlertTriangle,
  User,
  Building,
  MapPin,
  Clock
} from 'lucide-react'

interface CareerPath {
  id: string
  title: string
  level: string
  department: string
  requirements: string[]
  avgTimeToReach: number
  salaryRange: string
  skills: string[]
  employeesOnPath: number
  status: 'Active' | 'Inactive' | 'Planning'
}

interface DevelopmentPlan {
  id: string
  employeeName: string
  employeeId: string
  currentPosition: string
  targetPosition: string
  timeline: number
  progress: number
  mentor: string
  status: 'Planning' | 'In Progress' | 'On Track' | 'Completed' | 'At Risk'
  nextMilestone: string
}

interface SkillGap {
  skill: string
  currentLevel: number
  requiredLevel: number
  gap: number
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  trainingAvailable: boolean
}

const CareerDevelopmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const careerPaths: CareerPath[] = [
    {
      id: '1',
      title: 'Software Engineer',
      level: 'Senior',
      department: 'Engineering',
      requirements: ['5+ years experience', 'Leadership skills', 'Advanced technical knowledge'],
      avgTimeToReach: 3,
      salaryRange: '$120k - $180k',
      skills: ['React', 'Node.js', 'System Design', 'Team Leadership'],
      employeesOnPath: 15,
      status: 'Active'
    },
    {
      id: '2',
      title: 'Sales Manager',
      level: 'Manager',
      department: 'Sales',
      requirements: ['3+ years sales experience', 'Team management', 'Performance metrics'],
      avgTimeToReach: 2,
      salaryRange: '$80k - $120k',
      skills: ['Sales Strategy', 'Team Leadership', 'CRM Systems', 'Analytics'],
      employeesOnPath: 8,
      status: 'Active'
    },
    {
      id: '3',
      title: 'HR Director',
      level: 'Director',
      department: 'HR',
      requirements: ['8+ years HR experience', 'Strategic thinking', 'Executive presence'],
      avgTimeToReach: 5,
      salaryRange: '$150k - $250k',
      skills: ['Strategic HR', 'Change Management', 'Executive Communication', 'Policy Development'],
      employeesOnPath: 3,
      status: 'Planning'
    }
  ]

  const developmentPlans: DevelopmentPlan[] = [
    {
      id: '1',
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      currentPosition: 'Software Engineer II',
      targetPosition: 'Senior Software Engineer',
      timeline: 18,
      progress: 65,
      mentor: 'Sarah Johnson',
      status: 'On Track',
      nextMilestone: 'Complete Advanced System Design Course'
    },
    {
      id: '2',
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      currentPosition: 'Sales Representative',
      targetPosition: 'Sales Manager',
      timeline: 12,
      progress: 45,
      mentor: 'Mike Wilson',
      status: 'In Progress',
      nextMilestone: 'Lead team project presentation'
    },
    {
      id: '3',
      employeeName: 'David Brown',
      employeeId: 'EMP003',
      currentPosition: 'HR Specialist',
      targetPosition: 'HR Manager',
      timeline: 24,
      progress: 30,
      mentor: 'Lisa Chen',
      status: 'Planning',
      nextMilestone: 'Complete HR certification program'
    }
  ]

  const skillGaps: SkillGap[] = [
    {
      skill: 'Leadership',
      currentLevel: 3,
      requiredLevel: 5,
      gap: 2,
      priority: 'High',
      trainingAvailable: true
    },
    {
      skill: 'Advanced Analytics',
      currentLevel: 2,
      requiredLevel: 4,
      gap: 2,
      priority: 'Medium',
      trainingAvailable: true
    },
    {
      skill: 'Strategic Planning',
      currentLevel: 1,
      requiredLevel: 4,
      gap: 3,
      priority: 'Critical',
      trainingAvailable: false
    }
  ]

  const developmentMetrics = {
    totalPlans: 45,
    activePlans: 32,
    completedPlans: 8,
    atRiskPlans: 5,
    avgProgress: 58.3,
    successRate: 82.1
  }

  const filteredPlans = developmentPlans.filter(plan => {
    const matchesSearch = plan.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || plan.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-gray-100 text-gray-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'On Track': return 'bg-green-100 text-green-800'
      case 'Completed': return 'bg-purple-100 text-purple-800'
      case 'At Risk': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-gray-100 text-gray-800'
      case 'Medium': return 'bg-blue-100 text-blue-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Career Development</h1>
          <p className="text-gray-600">Manage career paths, development plans, and skill development</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Filter size={20} />
            Export Data
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Development Plan
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Plans</p>
              <p className="text-2xl font-bold text-gray-900">{developmentMetrics.totalPlans}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Plans</p>
              <p className="text-2xl font-bold text-gray-900">{developmentMetrics.activePlans}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{developmentMetrics.successRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-gray-900">{developmentMetrics.atRiskPlans}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search employees or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="On Track">On Track</option>
              <option value="Completed">Completed</option>
              <option value="At Risk">At Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'plans', 'career-paths', 'skill-gaps'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Progress</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Progress</span>
                      <span className="font-semibold text-blue-600">{developmentMetrics.avgProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${developmentMetrics.avgProgress}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">On Track:</span>
                        <span className="ml-2 font-medium text-green-600">24 plans</span>
                      </div>
                      <div>
                        <span className="text-gray-600">At Risk:</span>
                        <span className="ml-2 font-medium text-red-600">5 plans</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Paths</h3>
                  <div className="space-y-3">
                    {careerPaths.slice(0, 3).map((path) => (
                      <div key={path.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{path.title}</p>
                          <p className="text-sm text-gray-600">{path.department}</p>
                        </div>
                        <span className="text-sm font-medium text-blue-600">{path.employeesOnPath} employees</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Development Activities</h3>
                <div className="space-y-3">
                  {developmentPlans.slice(0, 5).map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{plan.employeeName}</p>
                          <p className="text-sm text-gray-600">{plan.currentPosition} → {plan.targetPosition}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full" 
                            style={{ width: `${plan.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{plan.progress}%</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plan.status)}`}>
                          {plan.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Development Plans Tab */}
          {activeTab === 'plans' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPlans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{plan.employeeName}</div>
                            <div className="text-sm text-gray-500">{plan.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.currentPosition}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.targetPosition}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full" 
                                style={{ width: `${plan.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{plan.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.timeline} months</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.mentor}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plan.status)}`}>
                            {plan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                          <button className="text-gray-600 hover:text-gray-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Career Paths Tab */}
          {activeTab === 'career-paths' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Career Paths</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Career Path
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {careerPaths.map((path) => (
                  <div key={path.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        path.status === 'Active' ? 'bg-green-100 text-green-800' :
                        path.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {path.status}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{path.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{path.level} • {path.department}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg Time:</span>
                        <span className="font-medium">{path.avgTimeToReach} years</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Salary Range:</span>
                        <span className="font-medium">{path.salaryRange}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Employees:</span>
                        <span className="font-medium">{path.employeesOnPath}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-600 mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {skill}
                          </span>
                        ))}
                        {path.skills.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            +{path.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gaps Tab */}
          {activeTab === 'skill-gaps' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gap</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Available</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {skillGaps.map((gap, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{gap.skill}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < gap.currentLevel ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < gap.requiredLevel ? 'text-blue-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-red-600">{gap.gap} levels</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(gap.priority)}`}>
                            {gap.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            gap.trainingAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {gap.trainingAvailable ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">View Training</button>
                          <button className="text-gray-600 hover:text-gray-900">Create Plan</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Development Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Immediate Actions</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Develop Strategic Planning training program
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Assign mentors for Leadership development
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Schedule Advanced Analytics workshops
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Long-term Strategy</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        Establish skill assessment framework
                      </li>
                      <li className="flex items-center">
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        Create internal training programs
                      </li>
                      <li className="flex items-center">
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        Partner with external training providers
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CareerDevelopmentPage
