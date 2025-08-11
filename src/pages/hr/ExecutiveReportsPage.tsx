import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Calendar,
  Download,
  Filter,
  Eye,
  FileText,
  PieChart,
  LineChart,
  Activity,
  Award,
  Clock,
  Building
} from 'lucide-react'

const ExecutiveReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4-2023')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const periods = ['Q4-2023', 'Q3-2023', 'Q2-2023', 'Q1-2023']
  const departments = ['all', 'Engineering', 'Sales', 'Marketing', 'Operations', 'Finance']

  const executiveMetrics = [
    {
      name: 'Total Workforce',
      value: '1,247',
      change: '+23',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      name: 'Revenue per Employee',
      value: '$342K',
      change: '+12.5%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      name: 'Employee Satisfaction',
      value: '4.2/5.0',
      change: '+0.3',
      changeType: 'increase',
      icon: Award,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      name: 'Turnover Rate',
      value: '8.2%',
      change: '-1.8%',
      changeType: 'decrease',
      icon: TrendingDown,
      color: 'bg-orange-500',
      trend: 'down'
    }
  ]

  const departmentPerformance = [
    {
      name: 'Engineering',
      headcount: 450,
      budget: '$45.2M',
      productivity: 4.3,
      satisfaction: 4.1,
      turnover: 6.8,
      growth: '+15'
    },
    {
      name: 'Sales',
      headcount: 180,
      budget: '$28.7M',
      productivity: 4.0,
      satisfaction: 4.3,
      turnover: 12.4,
      growth: '+8'
    },
    {
      name: 'Marketing',
      headcount: 75,
      budget: '$12.3M',
      productivity: 4.1,
      satisfaction: 4.0,
      turnover: 9.2,
      growth: '+3'
    },
    {
      name: 'Operations',
      headcount: 120,
      budget: '$18.9M',
      productivity: 3.9,
      satisfaction: 4.2,
      turnover: 7.5,
      growth: '+2'
    },
    {
      name: 'Finance',
      headcount: 45,
      budget: '$8.1M',
      productivity: 4.2,
      satisfaction: 4.4,
      turnover: 5.2,
      growth: '+1'
    }
  ]

  const keyInsights = [
    {
      title: 'Engineering Team Expansion',
      description: 'Engineering headcount increased by 15% this quarter, with 67 new hires primarily in AI/ML and cloud infrastructure.',
      impact: 'High',
      category: 'Growth',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Sales Performance Decline',
      description: 'Sales team productivity dropped 0.3 points due to market conditions and increased competition.',
      impact: 'Medium',
      category: 'Performance',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      title: 'Employee Retention Improvement',
      description: 'Overall turnover rate decreased by 1.8% due to enhanced benefits and career development programs.',
      impact: 'High',
      category: 'Retention',
      icon: Award,
      color: 'text-blue-600'
    },
    {
      title: 'Budget Utilization',
      description: 'HR budget utilization at 94.2%, with 5.8% remaining for Q4 initiatives and year-end bonuses.',
      impact: 'Medium',
      category: 'Finance',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ]

  const upcomingMilestones = [
    {
      title: 'Annual Performance Reviews',
      date: 'Dec 15, 2023',
      status: 'In Progress',
      completion: 75,
      priority: 'High'
    },
    {
      title: 'Benefits Renewal',
      date: 'Jan 1, 2024',
      status: 'Pending',
      completion: 0,
      priority: 'High'
    },
    {
      title: 'Compensation Review',
      date: 'Jan 15, 2024',
      status: 'Planning',
      completion: 25,
      priority: 'Medium'
    },
    {
      title: 'Training Program Launch',
      date: 'Feb 1, 2024',
      status: 'Planning',
      completion: 15,
      priority: 'Medium'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Planning': return 'bg-purple-100 text-purple-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Executive Reports</h1>
            <p className="text-gray-600">Comprehensive HR analytics and insights for executive decision-making</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Executive Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {executiveMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Department Performance Overview</h3>
            <p className="text-sm text-gray-600">Key metrics by department for {selectedPeriod}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Headcount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Productivity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satisfaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turnover %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departmentPerformance.map((dept) => (
                  <tr key={dept.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.headcount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.budget}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.productivity}/5.0
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.satisfaction}/5.0
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.turnover}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {dept.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insights and Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Key Insights */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Key Insights</h3>
              <p className="text-sm text-gray-600">Critical findings and recommendations</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {keyInsights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <insight.icon className={`w-4 h-4 ${insight.color}`} />
                          <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                            {insight.impact}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {insight.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Milestones</h3>
              <p className="text-sm text-gray-600">Key HR initiatives and deadlines</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{milestone.title}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(milestone.priority)}`}>
                        {milestone.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {milestone.date}
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${milestone.completion}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{milestone.completion}% Complete</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Generate Custom Report</span>
            </button>
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Download PDF Report</span>
            </button>
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Activity className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Schedule Review Meeting</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveReportsPage
