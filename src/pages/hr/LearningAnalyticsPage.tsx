import React, { useState } from 'react'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  BookOpen,
  GraduationCap
} from 'lucide-react'

interface LearningProgram {
  id: string
  name: string
  category: string
  type: 'Online Course' | 'Workshop' | 'Certification' | 'Mentorship' | 'On-the-Job'
  duration: number
  participants: number
  completionRate: number
  avgScore: number
  cost: number
  status: 'Active' | 'Completed' | 'Planning' | 'Paused'
}

interface EmployeeLearning {
  id: string
  employeeName: string
  employeeId: string
  department: string
  programsCompleted: number
  totalHours: number
  avgScore: number
  certifications: number
  skillsImproved: number
  lastActivity: string
  status: 'Active' | 'Inactive' | 'At Risk'
}

interface LearningMetrics {
  totalPrograms: number
  activeLearners: number
  completionRate: number
  avgScores: number
  totalInvestment: number
  skillsImproved: number
  certificationsEarned: number
  learningHours: number
}

const LearningAnalyticsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const learningPrograms: LearningProgram[] = [
    {
      id: '1',
      name: 'Leadership Development Program',
      category: 'Management',
      type: 'Workshop',
      duration: 12,
      participants: 25,
      completionRate: 88.0,
      avgScore: 4.2,
      cost: 2500,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Technical Skills Bootcamp',
      category: 'Technical',
      type: 'Online Course',
      duration: 8,
      participants: 45,
      completionRate: 92.5,
      avgScore: 4.5,
      cost: 1800,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Sales Excellence Training',
      category: 'Sales',
      type: 'Workshop',
      duration: 6,
      participants: 18,
      completionRate: 78.9,
      avgScore: 3.9,
      cost: 1200,
      status: 'Active'
    },
    {
      id: '4',
      name: 'Data Analytics Fundamentals',
      category: 'Analytics',
      type: 'Online Course',
      duration: 10,
      participants: 32,
      completionRate: 85.2,
      avgScore: 4.1,
      cost: 1500,
      status: 'Completed'
    }
  ]

  const employeeLearning: EmployeeLearning[] = [
    {
      id: '1',
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      programsCompleted: 8,
      totalHours: 120,
      avgScore: 4.3,
      certifications: 3,
      skillsImproved: 12,
      lastActivity: '2024-01-20',
      status: 'Active'
    },
    {
      id: '2',
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      department: 'Sales',
      programsCompleted: 6,
      totalHours: 85,
      avgScore: 4.1,
      certifications: 2,
      skillsImproved: 8,
      lastActivity: '2024-01-18',
      status: 'Active'
    },
    {
      id: '3',
      employeeName: 'David Brown',
      employeeId: 'EMP003',
      department: 'Marketing',
      programsCompleted: 4,
      totalHours: 65,
      avgScore: 3.8,
      certifications: 1,
      skillsImproved: 6,
      lastActivity: '2024-01-15',
      status: 'At Risk'
    }
  ]

  const learningMetrics: LearningMetrics = {
    totalPrograms: 25,
    activeLearners: 89,
    completionRate: 87.3,
    avgScores: 4.2,
    totalInvestment: 45000,
    skillsImproved: 156,
    certificationsEarned: 34,
    learningHours: 2840
  }

  const filteredPrograms = learningPrograms.filter(program => {
    const matchesDepartment = selectedDepartment === 'all' || 
      (selectedDepartment === 'Technical' && program.category === 'Technical') ||
      (selectedDepartment === 'Management' && program.category === 'Management') ||
      (selectedDepartment === 'Sales' && program.category === 'Sales') ||
      (selectedDepartment === 'Analytics' && program.category === 'Analytics')
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory
    
    return matchesDepartment && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Completed': return 'bg-blue-100 text-blue-800'
      case 'Planning': return 'bg-yellow-100 text-yellow-800'
      case 'Paused': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEmployeeStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-gray-100 text-gray-800'
      case 'At Risk': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Analytics</h1>
          <p className="text-gray-600">Analyze learning programs, employee development, and training effectiveness</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download size={20} />
            Export Report
          </button>
          <button className="btn-primary">
            <BarChart3 size={20} />
            Generate Insights
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Programs</p>
              <p className="text-2xl font-bold text-gray-900">{learningMetrics.totalPrograms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Learners</p>
              <p className="text-2xl font-bold text-gray-900">{learningMetrics.activeLearners}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{learningMetrics.completionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Scores</p>
              <p className="text-2xl font-bold text-gray-900">{learningMetrics.avgScores}/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="Technical">Technical</option>
              <option value="Management">Management</option>
              <option value="Sales">Sales</option>
              <option value="Analytics">Analytics</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Management">Management</option>
              <option value="Sales">Sales</option>
              <option value="Analytics">Analytics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'programs', 'employees', 'trends'].map((tab) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Investment</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="font-semibold">${learningMetrics.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Per Employee</span>
                      <span className="font-semibold">${(learningMetrics.totalInvestment / learningMetrics.activeLearners).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROI Expected</span>
                      <span className="font-semibold text-green-600">+35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Outcomes</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Skills Improved</span>
                      <span className="font-semibold text-green-600">{learningMetrics.skillsImproved}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Certifications Earned</span>
                      <span className="font-semibold text-blue-600">{learningMetrics.certificationsEarned}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Learning Hours</span>
                      <span className="font-semibold text-purple-600">{learningMetrics.learningHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Programs</h3>
                <div className="space-y-3">
                  {learningPrograms
                    .sort((a, b) => b.completionRate - a.completionRate)
                    .slice(0, 5)
                    .map((program) => (
                      <div key={program.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{program.name}</p>
                            <p className="text-sm text-gray-600">{program.category} • {program.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-green-600">{program.completionRate}%</span>
                          <span className="text-sm text-gray-500">{program.avgScore}/5</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPrograms.map((program) => (
                      <tr key={program.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{program.name}</div>
                            <div className="text-sm text-gray-500">${program.cost}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.duration} weeks</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.participants}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full" 
                                style={{ width: `${program.completionRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{program.completionRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.avgScore}/5</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(program.status)}`}>
                            {program.status}
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

          {/* Employees Tab */}
          {activeTab === 'employees' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programs Completed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certifications</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employeeLearning.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{employee.employeeName}</div>
                            <div className="text-sm text-gray-500">{employee.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.programsCompleted}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.totalHours}h</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.avgScore}/5</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.certifications}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEmployeeStatusColor(employee.status)}`}>
                            {employee.status}
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

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Trends</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q1 2024</span>
                      <span className="font-semibold text-green-600">87.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q4 2023</span>
                      <span className="font-semibold text-green-600">85.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q3 2023</span>
                      <span className="font-semibold text-blue-600">82.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Q2 2023</span>
                      <span className="font-semibold text-blue-600">80.2%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Technical Programs</span>
                      <span className="font-semibold text-green-600">92.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Management Programs</span>
                      <span className="font-semibold text-green-600">88.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sales Programs</span>
                      <span className="font-semibold text-yellow-600">78.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Analytics Programs</span>
                      <span className="font-semibold text-green-600">85.2%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights & Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Strengths</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        High completion rates for technical programs
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Strong employee engagement in learning
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Good ROI on learning investments
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Areas for Improvement</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                        Sales training completion rates need improvement
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                        Some employees at risk of falling behind
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                        Need more personalized learning paths
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

export default LearningAnalyticsPage
