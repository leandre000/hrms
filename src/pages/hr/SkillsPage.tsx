import React, { useState } from 'react'
import { 
  Target, 
  Users, 
  TrendingUp, 
  Plus,
  Search,
  Filter,
  Star,
  CheckCircle,
  AlertTriangle,
  User,
  Building,
  Award,
  Clock,
  Download
} from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  description: string
  employeesWithSkill: number
  demandLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  trainingAvailable: boolean
  lastUpdated: string
  status: 'Active' | 'Inactive' | 'Under Review'
}

interface SkillAssessment {
  id: string
  employeeName: string
  employeeId: string
  skillName: string
  currentLevel: number
  targetLevel: number
  assessmentDate: string
  assessor: string
  notes: string
  nextReviewDate: string
}

interface SkillGap {
  skill: string
  department: string
  currentAvgLevel: number
  requiredLevel: number
  gap: number
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  affectedEmployees: number
}

const SkillsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDemand, setSelectedDemand] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const skills: Skill[] = [
    {
      id: '1',
      name: 'React Development',
      category: 'Technical',
      level: 5,
      description: 'Frontend development using React framework',
      employeesWithSkill: 25,
      demandLevel: 'High',
      trainingAvailable: true,
      lastUpdated: '2024-01-15',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Leadership',
      category: 'Soft Skills',
      level: 5,
      description: 'Team leadership and management skills',
      employeesWithSkill: 18,
      demandLevel: 'Critical',
      trainingAvailable: true,
      lastUpdated: '2024-01-20',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Data Analysis',
      category: 'Analytics',
      level: 4,
      description: 'Data analysis and visualization skills',
      employeesWithSkill: 12,
      demandLevel: 'High',
      trainingAvailable: true,
      lastUpdated: '2024-01-10',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Project Management',
      category: 'Management',
      level: 4,
      description: 'Project planning and execution skills',
      employeesWithSkill: 15,
      demandLevel: 'Medium',
      trainingAvailable: true,
      lastUpdated: '2024-01-18',
      status: 'Active'
    }
  ]

  const skillAssessments: SkillAssessment[] = [
    {
      id: '1',
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      skillName: 'React Development',
      currentLevel: 4,
      targetLevel: 5,
      assessmentDate: '2024-01-15',
      assessor: 'Sarah Johnson',
      notes: 'Strong foundation, needs advanced concepts',
      nextReviewDate: '2024-04-15'
    },
    {
      id: '2',
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      skillName: 'Leadership',
      currentLevel: 3,
      targetLevel: 4,
      assessmentDate: '2024-01-20',
      assessor: 'Mike Wilson',
      notes: 'Good potential, needs mentoring',
      nextReviewDate: '2024-04-20'
    }
  ]

  const skillGaps: SkillGap[] = [
    {
      skill: 'Leadership',
      department: 'Engineering',
      currentAvgLevel: 2.8,
      requiredLevel: 4.0,
      gap: 1.2,
      priority: 'Critical',
      affectedEmployees: 15
    },
    {
      skill: 'Data Analysis',
      department: 'Marketing',
      currentAvgLevel: 2.5,
      requiredLevel: 3.5,
      gap: 1.0,
      priority: 'High',
      affectedEmployees: 8
    },
    {
      skill: 'Project Management',
      department: 'Sales',
      currentAvgLevel: 3.2,
      requiredLevel: 4.0,
      gap: 0.8,
      priority: 'Medium',
      affectedEmployees: 12
    }
  ]

  const skillMetrics = {
    totalSkills: 45,
    activeSkills: 42,
    skillsWithTraining: 38,
    avgSkillLevel: 3.4,
    criticalGaps: 5,
    highDemandSkills: 12
  }

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory
    const matchesDemand = selectedDemand === 'all' || skill.demandLevel === selectedDemand
    
    return matchesSearch && matchesCategory && matchesDemand
  })

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Low': return 'bg-gray-100 text-gray-800'
      case 'Medium': return 'bg-blue-100 text-blue-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Critical': return 'bg-red-100 text-red-800'
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

  const getSkillStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < level ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skill Management</h1>
          <p className="text-gray-600">Manage employee skills, assessments, and development plans</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download size={20} />
            Export Data
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Skill
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
              <p className="text-sm font-medium text-gray-600">Total Skills</p>
              <p className="text-2xl font-bold text-gray-900">{skillMetrics.totalSkills}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Skill Level</p>
              <p className="text-2xl font-bold text-gray-900">{skillMetrics.avgSkillLevel}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Gaps</p>
              <p className="text-2xl font-bold text-gray-900">{skillMetrics.criticalGaps}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Demand</p>
              <p className="text-2xl font-bold text-gray-900">{skillMetrics.highDemandSkills}</p>
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
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Analytics">Analytics</option>
              <option value="Management">Management</option>
            </select>
            <select
              value={selectedDemand}
              onChange={(e) => setSelectedDemand(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Demand Levels</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'skills', 'assessments', 'gaps'].map((tab) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Technical Skills</span>
                      <span className="font-semibold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Soft Skills</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Analytics</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Management</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      <div className="bg-green-500 h-2 rounded-full -mt-2" style={{ width: '25%' }}></div>
                      <div className="bg-purple-500 h-2 rounded-full -mt-2" style={{ width: '20%' }}></div>
                      <div className="bg-orange-500 h-2 rounded-full -mt-2" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Demand Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Critical</span>
                      <span className="font-semibold text-red-600">{skillMetrics.criticalGaps}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">High</span>
                      <span className="font-semibold text-orange-600">{skillMetrics.highDemandSkills}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Medium</span>
                      <span className="font-semibold text-blue-600">18</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Low</span>
                      <span className="font-semibold text-gray-600">10</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Skill Assessments</h3>
                <div className="space-y-3">
                  {skillAssessments.slice(0, 5).map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{assessment.employeeName}</p>
                          <p className="text-sm text-gray-600">{assessment.skillName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex">{getSkillStars(assessment.currentLevel)}</div>
                        <span className="text-sm text-gray-500">→</span>
                        <div className="flex">{getSkillStars(assessment.targetLevel)}</div>
                        <span className="text-sm text-gray-600">{assessment.assessmentDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSkills.map((skill) => (
                      <tr key={skill.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{skill.name}</div>
                            <div className="text-sm text-gray-500">{skill.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{skill.category}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">{getSkillStars(skill.level)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{skill.employeesWithSkill}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDemandColor(skill.demandLevel)}`}>
                            {skill.demandLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            skill.trainingAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {skill.trainingAvailable ? 'Available' : 'Not Available'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            skill.status === 'Active' ? 'bg-green-100 text-green-800' :
                            skill.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {skill.status}
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

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Skill Assessments</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Assessment
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {skillAssessments.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{assessment.employeeName}</div>
                            <div className="text-sm text-gray-500">{assessment.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assessment.skillName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">{getSkillStars(assessment.currentLevel)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">{getSkillStars(assessment.targetLevel)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assessment.assessmentDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assessment.nextReviewDate}</td>
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

          {/* Skill Gaps Tab */}
          {activeTab === 'gaps' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gap</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affected</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {skillGaps.map((gap, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{gap.skill}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{gap.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">{getSkillStars(Math.round(gap.currentAvgLevel))}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">{getSkillStars(gap.requiredLevel)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-red-600">{gap.gap.toFixed(1)} levels</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(gap.priority)}`}>
                            {gap.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{gap.affectedEmployees}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">Create Plan</button>
                          <button className="text-gray-600 hover:text-gray-900">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gap Analysis Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Immediate Actions</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Develop Leadership training for Engineering team
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Create Data Analysis certification program
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Implement Project Management workshops
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Long-term Strategy</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        Establish skill development framework
                      </li>
                      <li className="flex items-center">
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        Create mentorship programs
                      </li>
                      <li className="flex items-center">
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        Implement continuous assessment system
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

export default SkillsPage
