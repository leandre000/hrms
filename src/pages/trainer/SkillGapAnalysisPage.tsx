import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Users,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

interface SkillGap {
  id: string
  skillName: string
  category: string
  currentLevel: number
  requiredLevel: number
  gap: number
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  affectedEmployees: number
  businessImpact: 'Low' | 'Medium' | 'High' | 'Critical'
  recommendedTraining: string[]
  estimatedCost: number
  timeline: string
}

interface DepartmentGap {
  department: string
  totalGaps: number
  criticalGaps: number
  averageGap: number
  topSkills: string[]
  trainingBudget: number
}

const mockSkillGaps: SkillGap[] = [
  {
    id: '1',
    skillName: 'Data Analysis',
    category: 'Technical',
    currentLevel: 3.2,
    requiredLevel: 4.5,
    gap: 1.3,
    priority: 'Critical',
    affectedEmployees: 45,
    businessImpact: 'Critical',
    recommendedTraining: ['Advanced Analytics Course', 'Data Visualization Workshop', 'Statistical Analysis Training'],
    estimatedCost: 15000,
    timeline: '3-6 months'
  },
  {
    id: '2',
    skillName: 'Project Management',
    category: 'Leadership',
    currentLevel: 3.8,
    requiredLevel: 4.2,
    gap: 0.4,
    priority: 'High',
    affectedEmployees: 28,
    businessImpact: 'High',
    recommendedTraining: ['Agile Project Management', 'Risk Management Course', 'Stakeholder Communication'],
    estimatedCost: 12000,
    timeline: '2-4 months'
  },
  {
    id: '3',
    skillName: 'Digital Marketing',
    category: 'Marketing',
    currentLevel: 2.5,
    requiredLevel: 4.0,
    gap: 1.5,
    priority: 'High',
    affectedEmployees: 32,
    businessImpact: 'High',
    recommendedTraining: ['Digital Marketing Fundamentals', 'SEO & SEM Training', 'Social Media Strategy'],
    estimatedCost: 18000,
    timeline: '4-6 months'
  },
  {
    id: '4',
    skillName: 'Cybersecurity',
    category: 'Technical',
    currentLevel: 2.8,
    requiredLevel: 4.5,
    gap: 1.7,
    priority: 'Critical',
    affectedEmployees: 38,
    businessImpact: 'Critical',
    recommendedTraining: ['Security Fundamentals', 'Threat Detection', 'Incident Response'],
    estimatedCost: 25000,
    timeline: '6-8 months'
  }
]

const mockDepartmentGaps: DepartmentGap[] = [
  {
    department: 'Engineering',
    totalGaps: 12,
    criticalGaps: 3,
    averageGap: 1.2,
    topSkills: ['Data Analysis', 'Cybersecurity', 'Cloud Computing'],
    trainingBudget: 45000
  },
  {
    department: 'Marketing',
    totalGaps: 8,
    criticalGaps: 2,
    averageGap: 1.1,
    topSkills: ['Digital Marketing', 'Data Analytics', 'Content Strategy'],
    trainingBudget: 32000
  },
  {
    department: 'Sales',
    totalGaps: 6,
    criticalGaps: 1,
    averageGap: 0.8,
    topSkills: ['CRM Systems', 'Negotiation Skills', 'Product Knowledge'],
    trainingBudget: 28000
  }
]

const SkillGapAnalysisPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [selectedView, setSelectedView] = useState<'gaps' | 'departments' | 'trends'>('gaps')

  const filteredGaps = mockSkillGaps.filter(gap => {
    const matchesSearch = gap.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gap.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || gap.category === categoryFilter
    const matchesPriority = priorityFilter === 'All' || gap.priority === priorityFilter
    return matchesSearch && matchesCategory && matchesPriority
  })

  const totalGaps = mockSkillGaps.length
  const criticalGaps = mockSkillGaps.filter(g => g.priority === 'Critical').length
  const highPriorityGaps = mockSkillGaps.filter(g => g.priority === 'High').length
  const totalCost = mockSkillGaps.reduce((acc, gap) => acc + gap.estimatedCost, 0)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-gray-100 text-gray-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low': return 'bg-gray-100 text-gray-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGapIndicator = (gap: number) => {
    if (gap > 1.5) return { icon: ArrowUp, color: 'text-red-600', bg: 'bg-red-100' }
    if (gap > 0.8) return { icon: ArrowUp, color: 'text-orange-600', bg: 'bg-orange-100' }
    if (gap > 0.3) return { icon: ArrowUp, color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { icon: Minus, color: 'text-green-600', bg: 'bg-green-100' }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Gap Analysis</h1>
        <p className="text-gray-600">Identify skill gaps and plan targeted training interventions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Gaps</p>
              <p className="text-2xl font-bold text-gray-900">{totalGaps}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Gaps</p>
              <p className="text-2xl font-bold text-gray-900">{criticalGaps}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">{highPriorityGaps}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">${(totalCost / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('gaps')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'gaps'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Skill Gaps
          </button>
          <button
            onClick={() => setSelectedView('departments')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'departments'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Department Analysis
          </button>
          <button
            onClick={() => setSelectedView('trends')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'trends'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Trends & Insights
          </button>
        </div>
      </div>

      {/* Skill Gaps View */}
      {selectedView === 'gaps' && (
        <>
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Technical">Technical</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Marketing">Marketing</option>
                </select>
                
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="All">All Priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>

          {/* Gaps Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skill
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Required Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gap
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Impact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGaps.map((gap) => {
                    const gapIndicator = getGapIndicator(gap.gap)
                    return (
                      <tr key={gap.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{gap.skillName}</div>
                            <div className="text-sm text-gray-500">{gap.category}</div>
                            <div className="text-xs text-gray-400">{gap.affectedEmployees} employees affected</div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{gap.currentLevel.toFixed(1)}/5.0</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{gap.requiredLevel.toFixed(1)}/5.0</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`p-1 rounded-full ${gapIndicator.bg} mr-2`}>
                              <gapIndicator.icon className={`w-4 h-4 ${gapIndicator.color}`} />
                            </div>
                            <span className={`text-sm font-medium ${gapIndicator.color}`}>
                              {gap.gap.toFixed(1)}
                            </span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(gap.priority)}`}>
                            {gap.priority}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(gap.businessImpact)}`}>
                            {gap.businessImpact}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">View Details</button>
                            <button className="text-blue-600 hover:text-blue-900">Plan Training</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Department Analysis View */}
      {selectedView === 'departments' && (
        <div className="space-y-6">
          {mockDepartmentGaps.map((dept) => (
            <div key={dept.department} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{dept.department}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${(dept.trainingBudget / 1000).toFixed(0)}k</div>
                  <div className="text-sm text-gray-500">Training Budget</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dept.totalGaps}</div>
                  <div className="text-sm text-gray-500">Total Gaps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{dept.criticalGaps}</div>
                  <div className="text-sm text-gray-500">Critical Gaps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{dept.averageGap.toFixed(1)}</div>
                  <div className="text-sm text-gray-500">Avg Gap</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dept.topSkills.length}</div>
                  <div className="text-sm text-gray-500">Top Skills</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Top Skills Needing Training:</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.topSkills.map((skill, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trends & Insights View */}
      {selectedView === 'trends' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Training Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Immediate Actions (Next 3 months)</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Implement cybersecurity training for all technical staff</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Launch data analysis certification program</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Medium-term Initiatives (3-6 months)</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Develop leadership pipeline program</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Create digital marketing academy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">ROI Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$2.4M</div>
                <div className="text-sm text-gray-500">Potential Revenue Impact</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">$70k</div>
                <div className="text-sm text-gray-500">Total Training Investment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">34:1</div>
                <div className="text-sm text-gray-500">ROI Ratio</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillGapAnalysisPage
