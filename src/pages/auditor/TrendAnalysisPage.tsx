import React from 'react'
import { TrendingUp, TrendingDown, BarChart3, Calendar } from 'lucide-react'

const TrendAnalysisPage = () => {
  const trends = [
    {
      category: 'Security Incidents',
      period: 'Last 6 months',
      data: [12, 8, 15, 6, 9, 4],
      trend: 'down',
      change: -33.3,
      description: 'Security incidents have decreased significantly'
    },
    {
      category: 'Policy Violations',
      period: 'Last 6 months',
      data: [5, 7, 3, 8, 6, 9],
      trend: 'up',
      change: +12.5,
      description: 'Policy violations showing upward trend'
    },
    {
      category: 'Compliance Score',
      period: 'Last 6 months',
      data: [88, 90, 92, 89, 94, 96],
      trend: 'up',
      change: +9.1,
      description: 'Compliance scores steadily improving'
    },
    {
      category: 'Audit Findings',
      period: 'Last 6 months',
      data: [25, 22, 18, 20, 15, 12],
      trend: 'down',
      change: -52.0,
      description: 'Audit findings trending downward'
    }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-5 h-5 text-green-500" /> :
      <TrendingDown className="w-5 h-5 text-red-500" />
  }

  const getTrendColor = (trend: string, category: string) => {
    // For some metrics, up is good, for others down is good
    const goodUp = ['Compliance Score']
    const goodDown = ['Security Incidents', 'Policy Violations', 'Audit Findings']
    
    if (goodUp.includes(category)) {
      return trend === 'up' ? 'text-green-600' : 'text-red-600'
    } else if (goodDown.includes(category)) {
      return trend === 'down' ? 'text-green-600' : 'text-red-600'
    }
    return 'text-gray-600'
  }

  const renderMiniChart = (data: number[]) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    
    return (
      <div className="flex items-end gap-1 h-12">
        {data.map((value, index) => (
          <div
            key={index}
            className="bg-blue-500 rounded-sm"
            style={{
              height: `${((value - min) / range) * 100}%`,
              minHeight: '2px',
              width: '12px'
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Trend Analysis</h1>
          <p className="text-gray-600">Analyze compliance and audit trends over time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trends.map((trend, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">{trend.category}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(trend.trend)}
                  <span className={`font-medium ${getTrendColor(trend.trend, trend.category)}`}>
                    {trend.change > 0 ? '+' : ''}{trend.change}%
                  </span>
                </div>
              </div>

              <div className="mb-4">
                {renderMiniChart(trend.data)}
              </div>

              <div className="text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {trend.period}
                </div>
              </div>

              <p className="text-sm text-gray-700">{trend.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrendAnalysisPage
