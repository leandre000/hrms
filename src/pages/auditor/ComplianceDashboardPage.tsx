import React from 'react'
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'

const ComplianceDashboardPage = () => {
  const metrics = [
    { name: 'Overall Compliance', value: 92, change: +2.1, trend: 'up' },
    { name: 'Policy Adherence', value: 96, change: +0.5, trend: 'up' },
    { name: 'Risk Score', value: 15, change: -3.2, trend: 'down' },
    { name: 'Audit Findings', value: 8, change: +2, trend: 'up' }
  ]

  const complianceAreas = [
    { area: 'Data Privacy', score: 95, status: 'good' },
    { area: 'Financial Controls', score: 88, status: 'warning' },
    { area: 'Security Protocols', score: 92, status: 'good' },
    { area: 'HR Policies', score: 97, status: 'good' },
    { area: 'Regulatory Compliance', score: 84, status: 'critical' }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> :
      <TrendingDown className="w-4 h-4 text-red-500" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Compliance Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}%</div>
              <div className={`text-sm flex items-center gap-1 ${
                metric.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change}% from last month
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Areas */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Areas</h2>
          <div className="space-y-4">
            {complianceAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(area.status)}
                  <span className="font-medium text-gray-900">{area.area}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        area.score >= 90 ? 'bg-green-500' :
                        area.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${area.score}%` }}
                    ></div>
                  </div>
                  <span className={`font-bold ${getScoreColor(area.score)}`}>
                    {area.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComplianceDashboardPage
