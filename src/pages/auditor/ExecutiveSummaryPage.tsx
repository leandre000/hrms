import React from 'react'
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, FileText } from 'lucide-react'

const ExecutiveSummaryPage = () => {
  const executiveSummary = {
    period: 'Q4 2023',
    overallRisk: 'Medium',
    complianceScore: 92,
    criticalFindings: 3,
    resolvedIssues: 15,
    pendingActions: 7
  }

  const keyFindings = [
    {
      area: 'Data Security',
      severity: 'High',
      finding: 'Unauthorized access attempts detected',
      impact: 'Potential data breach risk',
      recommendation: 'Implement additional access controls'
    },
    {
      area: 'Financial Controls',
      severity: 'Medium',
      finding: 'Segregation of duties gaps identified',
      impact: 'Risk of financial misstatement',
      recommendation: 'Review and update approval workflows'
    },
    {
      area: 'Policy Compliance',
      severity: 'Low',
      finding: 'Minor policy acknowledgment delays',
      impact: 'Limited compliance risk',
      recommendation: 'Automate policy distribution process'
    }
  ]

  const trends = [
    { metric: 'Overall Compliance', current: 92, previous: 88, trend: 'up' },
    { metric: 'Security Incidents', current: 4, previous: 7, trend: 'down' },
    { metric: 'Audit Findings', current: 12, previous: 18, trend: 'down' },
    { metric: 'Policy Violations', current: 9, previous: 6, trend: 'up' }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> :
      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Executive Summary</h1>
            <p className="text-gray-600">High-level audit overview for leadership</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <FileText className="w-4 h-4" />
            Export Summary
          </button>
        </div>

        {/* Executive Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Executive Overview - {executiveSummary.period}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{executiveSummary.complianceScore}%</div>
              <div className="text-sm text-gray-600">Compliance Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{executiveSummary.overallRisk}</div>
              <div className="text-sm text-gray-600">Overall Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{executiveSummary.criticalFindings}</div>
              <div className="text-sm text-gray-600">Critical Findings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{executiveSummary.resolvedIssues}</div>
              <div className="text-sm text-gray-600">Resolved Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{executiveSummary.pendingActions}</div>
              <div className="text-sm text-gray-600">Pending Actions</div>
            </div>
          </div>
        </div>

        {/* Key Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trends.map((trend, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{trend.metric}</h3>
                  {getTrendIcon(trend.trend)}
                </div>
                <div className="text-xl font-bold text-gray-900">{trend.current}</div>
                <div className="text-sm text-gray-600">
                  Previous: {trend.previous}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Findings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Findings</h2>
          <div className="space-y-4">
            {keyFindings.map((finding, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{finding.area}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                    {finding.severity}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Finding:</span>
                    <p className="text-gray-600 mt-1">{finding.finding}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Impact:</span>
                    <p className="text-gray-600 mt-1">{finding.impact}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Recommendation:</span>
                    <p className="text-gray-600 mt-1">{finding.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveSummaryPage
