import React from 'react'
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const RiskAssessmentPage = () => {
  const riskAreas = [
    { area: 'Data Security', level: 'High', score: 8.2, trend: 'up', description: 'Increased cyber threats detected' },
    { area: 'Financial Controls', level: 'Medium', score: 5.1, trend: 'down', description: 'Improved internal controls' },
    { area: 'Regulatory Compliance', level: 'Medium', score: 6.3, trend: 'stable', description: 'Stable compliance metrics' },
    { area: 'Operational Risk', level: 'Low', score: 3.2, trend: 'down', description: 'Process improvements effective' }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />
      default: return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Risk Assessment</h1>
          <p className="text-gray-600">Evaluate and monitor organizational risk factors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {riskAreas.map((risk, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{risk.area}</h3>
                <div className="flex items-center gap-2">
                  {getTrendIcon(risk.trend)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.level)}`}>
                    {risk.level}
                  </span>
                </div>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-2">{risk.score}/10</div>
              <div className="text-sm text-gray-600 mb-4">{risk.description}</div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    risk.score >= 7 ? 'bg-red-500' :
                    risk.score >= 4 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(risk.score / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RiskAssessmentPage
