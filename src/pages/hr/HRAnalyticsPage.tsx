import React from 'react'
import { BarChart3, TrendingUp, Users, Target, Shield } from 'lucide-react'

const HRAnalyticsPage = () => {
  const hrMetrics = {
    headcount: {
      current: 142,
      change: +8,
      trend: 'up'
    },
    turnover: {
      rate: 12.5,
      change: -2.3,
      trend: 'down'
    },
    satisfaction: {
      score: 4.2,
      change: +0.3,
      trend: 'up'
    },
    productivity: {
      index: 87,
      change: +5,
      trend: 'up'
    }
  }

  const departmentData = [
    { name: 'Engineering', headcount: 45, satisfaction: 4.3, productivity: 89 },
    { name: 'Sales', headcount: 32, satisfaction: 4.1, productivity: 85 },
    { name: 'Marketing', headcount: 18, satisfaction: 4.4, productivity: 88 },
    { name: 'HR', headcount: 12, satisfaction: 4.2, productivity: 86 },
    { name: 'Finance', headcount: 15, satisfaction: 4.0, productivity: 84 },
    { name: 'Operations', headcount: 20, satisfaction: 4.3, productivity: 87 }
  ]

  const trends = [
    { month: 'Jan', headcount: 138, turnover: 14.2, satisfaction: 3.9 },
    { month: 'Feb', turnover: 13.1, satisfaction: 4.0 },
    { month: 'Mar', turnover: 12.8, satisfaction: 4.1 },
    { month: 'Apr', turnover: 12.5, satisfaction: 4.2 }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> :
      <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
  }

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">HR Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into workforce metrics and trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">Total Headcount</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {hrMetrics.headcount.current}
            </div>
            <div className={`text-sm flex items-center gap-1 ${getTrendColor(hrMetrics.headcount.trend)}`}>
              {getTrendIcon(hrMetrics.headcount.trend)}
              {hrMetrics.headcount.change > 0 ? '+' : ''}{hrMetrics.headcount.change} this month
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-gray-900">Turnover Rate</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {hrMetrics.turnover.rate}%
            </div>
            <div className={`text-sm flex items-center gap-1 ${getTrendColor('up')}`}>
              {getTrendIcon('up')}
              {hrMetrics.turnover.change}% vs last quarter
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Satisfaction Score</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {hrMetrics.satisfaction.score}/5
            </div>
            <div className={`text-sm flex items-center gap-1 ${getTrendColor(hrMetrics.satisfaction.trend)}`}>
              {getTrendIcon(hrMetrics.satisfaction.trend)}
              {hrMetrics.satisfaction.change > 0 ? '+' : ''}{hrMetrics.satisfaction.change} vs last survey
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium text-gray-900">Productivity Index</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {hrMetrics.productivity.index}
            </div>
            <div className={`text-sm flex items-center gap-1 ${getTrendColor(hrMetrics.productivity.trend)}`}>
              {getTrendIcon(hrMetrics.productivity.trend)}
              {hrMetrics.productivity.change > 0 ? '+' : ''}{hrMetrics.productivity.change} points
            </div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Headcount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Satisfaction</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Productivity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {departmentData.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{dept.name}</td>
                    <td className="py-3 px-4 text-gray-700">{dept.headcount}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{dept.satisfaction}/5</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${(dept.satisfaction / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{dept.productivity}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${dept.productivity}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        dept.productivity >= 85 ? 'bg-green-100 text-green-800' : 
                        dept.productivity >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {dept.productivity >= 85 ? 'Excellent' : 
                         dept.productivity >= 80 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Turnover Trend</h2>
            <div className="space-y-4">
              {trends.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{data.month}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: `${(data.turnover / 20) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-medium w-12">{data.turnover}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Satisfaction Trend</h2>
            <div className="space-y-4">
              {trends.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{data.month}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(data.satisfaction / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-medium w-12">{data.satisfaction}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
            <div>
              <h3 className="font-medium mb-2">Positive Trends</h3>
              <ul className="space-y-1 text-sm">
                <li>• Employee satisfaction improving (+0.3 points)</li>
                <li>• Productivity index up by 5 points</li>
                <li>• Turnover rate decreasing (-2.3%)</li>
                <li>• Strong performance in Engineering and Marketing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Areas for Attention</h3>
              <ul className="space-y-1 text-sm">
                <li>• Finance department productivity below average</li>
                <li>• Monitor headcount growth sustainability</li>
                <li>• Focus on retention strategies for Sales team</li>
                <li>• Implement targeted training programs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance Analytics */}
        <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Compliance Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Policies Compliance</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: '87%' }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-medium w-12">87%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Training Completion</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: '92%' }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-medium w-12">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Audit Compliance</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: '95%' }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-medium w-12">95%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-900">High Risk Areas</span>
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-900">Medium Risk Areas</span>
                  <span className="text-yellow-600 font-bold">7</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-900">Low Risk Areas</span>
                  <span className="text-green-600 font-bold">12</span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium">Next Audit Due:</div>
                    <div>Q2 2024 - Regulatory Compliance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HRAnalyticsPage
