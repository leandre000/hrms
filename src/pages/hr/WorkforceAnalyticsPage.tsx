import React, { useState } from 'react'
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart,
  Target,
  Calendar,
  Filter,
  Download,
  Eye,
  Activity,
  Award,
  Clock,
  Building,
  MapPin,
  GraduationCap,
  DollarSign,
  Star
} from 'lucide-react'

const WorkforceAnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4-2023')
  const [selectedMetric, setSelectedMetric] = useState('headcount')

  const periods = ['Q4-2023', 'Q3-2023', 'Q2-2023', 'Q1-2023']
  const metrics = ['headcount', 'turnover', 'satisfaction', 'productivity']

  const workforceMetrics = [
    {
      name: 'Total Headcount',
      value: '1,247',
      change: '+23',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      name: 'Active Employees',
      value: '1,198',
      change: '+18',
      changeType: 'increase',
      icon: Users,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      name: 'New Hires (MTD)',
      value: '45',
      change: '+12',
      changeType: 'increase',
      icon: TrendingUp,
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

  const demographicData = [
    {
      category: 'Age Groups',
      data: [
        { label: '18-25', value: 156, percentage: 12.5, color: 'bg-blue-500' },
        { label: '26-35', value: 498, percentage: 40.0, color: 'bg-green-500' },
        { label: '36-45', value: 374, percentage: 30.0, color: 'bg-purple-500' },
        { label: '46-55', value: 187, percentage: 15.0, color: 'bg-orange-500' },
        { label: '55+', value: 32, percentage: 2.5, color: 'bg-red-500' }
      ]
    },
    {
      category: 'Gender Distribution',
      data: [
        { label: 'Male', value: 623, percentage: 50.0, color: 'bg-blue-500' },
        { label: 'Female', value: 598, percentage: 48.0, color: 'bg-pink-500' },
        { label: 'Other', value: 26, percentage: 2.0, color: 'bg-purple-500' }
      ]
    },
    {
      category: 'Experience Levels',
      data: [
        { label: '0-2 years', value: 312, percentage: 25.0, color: 'bg-blue-500' },
        { label: '3-5 years', value: 374, percentage: 30.0, color: 'bg-green-500' },
        { label: '6-10 years', value: 374, percentage: 30.0, color: 'bg-purple-500' },
        { label: '10+ years', value: 187, percentage: 15.0, color: 'bg-orange-500' }
      ]
    }
  ]

  const departmentAnalytics = [
    {
      name: 'Engineering',
      headcount: 450,
      growth: '+15',
      turnover: 6.8,
      satisfaction: 4.1,
      productivity: 4.3,
      avgSalary: 125000,
      diversity: 78.5,
      retention: 93.2
    },
    {
      name: 'Sales',
      headcount: 180,
      growth: '+8',
      turnover: 12.4,
      satisfaction: 4.3,
      productivity: 4.0,
      avgSalary: 95000,
      diversity: 65.2,
      retention: 87.6
    },
    {
      name: 'Marketing',
      headcount: 75,
      growth: '+3',
      turnover: 9.2,
      satisfaction: 4.0,
      productivity: 4.1,
      avgSalary: 85000,
      diversity: 72.8,
      retention: 90.8
    },
    {
      name: 'Operations',
      headcount: 120,
      growth: '+2',
      turnover: 7.5,
      satisfaction: 4.2,
      productivity: 3.9,
      avgSalary: 75000,
      diversity: 68.4,
      retention: 92.5
    },
    {
      name: 'Finance',
      headcount: 45,
      growth: '+1',
      turnover: 5.2,
      satisfaction: 4.4,
      productivity: 4.2,
      avgSalary: 110000,
      diversity: 71.1,
      retention: 94.8
    }
  ]

  const locationInsights = [
    {
      location: 'New York',
      headcount: 298,
      growth: '+12',
      avgSalary: 135000,
      satisfaction: 4.2,
      costOfLiving: 'High'
    },
    {
      location: 'San Francisco',
      headcount: 245,
      growth: '+18',
      avgSalary: 145000,
      satisfaction: 4.0,
      costOfLiving: 'Very High'
    },
    {
      location: 'Chicago',
      headcount: 187,
      growth: '+8',
      avgSalary: 115000,
      satisfaction: 4.3,
      costOfLiving: 'Medium'
    },
    {
      location: 'Austin',
      headcount: 156,
      growth: '+15',
      avgSalary: 105000,
      satisfaction: 4.4,
      costOfLiving: 'Medium'
    },
    {
      location: 'Remote',
      headcount: 361,
      growth: '+25',
      avgSalary: 95000,
      satisfaction: 4.5,
      costOfLiving: 'Low'
    }
  ]

  const keyTrends = [
    {
      title: 'Remote Work Adoption',
      description: 'Remote workforce increased by 25% this quarter, with 361 employees now working remotely.',
      impact: 'High',
      trend: 'up',
      metric: '+25%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Engineering Growth',
      description: 'Engineering team expanded by 15% to support AI/ML and cloud infrastructure initiatives.',
      impact: 'High',
      trend: 'up',
      metric: '+15%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Diversity Improvement',
      description: 'Overall diversity increased by 3.2% across all departments, with targeted hiring initiatives.',
      impact: 'Medium',
      trend: 'up',
      metric: '+3.2%',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      title: 'Retention Enhancement',
      description: 'Employee retention improved by 2.1% due to enhanced benefits and career development.',
      impact: 'High',
      trend: 'up',
      metric: '+2.1%',
      icon: Star,
      color: 'text-orange-600'
    }
  ]

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600'
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCostOfLivingColor = (cost: string) => {
    switch (cost) {
      case 'Very High': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
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
            <h1 className="text-2xl font-bold text-gray-900">Workforce Analytics</h1>
            <p className="text-gray-600">Comprehensive workforce insights and demographic analysis</p>
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
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {metrics.map(metric => (
                <option key={metric} value={metric}>
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* Workforce Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {workforceMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center text-sm ${getTrendColor(metric.trend)}`}>
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

        {/* Demographic Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {demographicData.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">{category.category}</h3>
                <p className="text-sm text-gray-600">Distribution breakdown</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {category.data.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{item.value}</div>
                        <div className="text-xs text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Department Analytics */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Department Analytics</h3>
            <p className="text-sm text-gray-600">Comprehensive metrics by department</p>
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
                    Growth
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turnover %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satisfaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Productivity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diversity %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departmentAnalytics.map((dept) => (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {dept.growth}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.turnover}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.satisfaction}/5.0
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.productivity}/5.0
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${dept.avgSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dept.diversity}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Location Insights and Key Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Location Insights */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Location Insights</h3>
              <p className="text-sm text-gray-600">Workforce distribution by location</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {locationInsights.map((location, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <h4 className="text-sm font-medium text-gray-900">{location.location}</h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCostOfLivingColor(location.costOfLiving)}`}>
                        {location.costOfLiving}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Headcount:</span>
                        <span className="ml-2 font-medium text-gray-900">{location.headcount}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Growth:</span>
                        <span className="ml-2 font-medium text-green-600">{location.growth}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Avg Salary:</span>
                        <span className="ml-2 font-medium text-gray-900">${location.avgSalary.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Satisfaction:</span>
                        <span className="ml-2 font-medium text-gray-900">{location.satisfaction}/5.0</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Trends */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Key Trends</h3>
              <p className="text-sm text-gray-600">Notable workforce patterns and changes</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {keyTrends.map((trend, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <trend.icon className={`w-4 h-4 ${trend.color}`} />
                          <h4 className="text-sm font-medium text-gray-900">{trend.title}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(trend.impact)}`}>
                            {trend.impact}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${getTrendColor(trend.trend)}`}>
                            {trend.metric}
                          </span>
                          <span className="text-xs text-gray-500">this quarter</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Generate Report</span>
            </button>
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <PieChart className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Demographics</span>
            </button>
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <LineChart className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Trends</span>
            </button>
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkforceAnalyticsPage
