import React from 'react'
import { Users, TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react'

const EmployeeAnalyticsPage = () => {
  const metrics = [
    { name: 'Total Employees', value: 142, change: +8, trend: 'up', period: 'vs last month' },
    { name: 'Turnover Rate', value: 12.5, change: -2.3, trend: 'down', period: 'vs last quarter', unit: '%' },
    { name: 'New Hires', value: 15, change: +5, trend: 'up', period: 'this month' },
    { name: 'Average Tenure', value: 2.8, change: +0.3, trend: 'up', period: 'years', unit: 'yrs' }
  ]

  const departmentBreakdown = [
    { department: 'Engineering', count: 45, percentage: 31.7, growth: +12 },
    { department: 'Sales', count: 32, percentage: 22.5, growth: +8 },
    { department: 'Marketing', count: 18, percentage: 12.7, growth: +3 },
    { department: 'HR', count: 12, percentage: 8.5, growth: +2 },
    { department: 'Finance', count: 15, percentage: 10.6, growth: +1 },
    { department: 'Operations', count: 20, percentage: 14.1, growth: +5 }
  ]

  const ageDistribution = [
    { range: '18-25', count: 25, percentage: 17.6 },
    { range: '26-35', count: 58, percentage: 40.8 },
    { range: '36-45', count: 42, percentage: 29.6 },
    { range: '46-55', count: 15, percentage: 10.6 },
    { range: '56+', count: 2, percentage: 1.4 }
  ]

  const retentionData = [
    { period: '0-6 months', retention: 95 },
    { period: '6-12 months', retention: 88 },
    { period: '1-2 years', retention: 82 },
    { period: '2-5 years', retention: 78 },
    { period: '5+ years', retention: 85 }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> :
      <TrendingDown className="w-4 h-4 text-red-500" />
  }

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Employee Analytics</h1>
          <p className="text-gray-600">Insights and trends about workforce composition and performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}{metric.unit || ''}
              </div>
              <div className={`text-sm flex items-center gap-1 ${getTrendColor(metric.trend)}`}>
                {metric.change > 0 ? '+' : ''}{metric.change} {metric.period}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Department Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Department Breakdown</h2>
            </div>
            <div className="space-y-4">
              {departmentBreakdown.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{dept.department}</span>
                    <div className="text-right">
                      <span className="font-medium">{dept.count} employees</span>
                      <span className="text-green-600 text-sm ml-2">+{dept.growth}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">{dept.percentage}% of total workforce</div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900">Age Distribution</h2>
            </div>
            <div className="space-y-4">
              {ageDistribution.map((age, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded" style={{ opacity: 1 - (index * 0.15) }}></div>
                    <span className="font-medium text-gray-900">{age.range}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{age.count} employees</div>
                    <div className="text-sm text-gray-600">{age.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Retention Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900">Retention Analysis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {retentionData.map((data, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">{data.retention}%</div>
                <div className="text-sm text-gray-600">{data.period}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${data.retention}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-900 mb-2">Key Insights</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Highest retention in first 6 months indicates good onboarding</li>
              <li>• Retention dip at 1-2 years suggests need for career development programs</li>
              <li>• Strong retention for 5+ year employees shows good long-term satisfaction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeAnalyticsPage
