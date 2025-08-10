import React, { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, BarChart3, Calendar, FileText } from 'lucide-react'

const CompliancePage = () => {
  const complianceMetrics = [
    { name: 'Overall Compliance', value: 92, target: 95, status: 'warning' },
    { name: 'Policy Adherence', value: 96, target: 95, status: 'good' },
    { name: 'Regulatory Compliance', value: 88, target: 100, status: 'critical' },
    { name: 'Data Privacy (GDPR)', value: 94, target: 100, status: 'good' }
  ]

  const recentIssues = [
    { id: 1, type: 'Policy Violation', severity: 'High', description: 'Unauthorized data access detected', date: '2024-01-24' },
    { id: 2, type: 'Compliance Gap', severity: 'Medium', description: 'Missing employee certifications', date: '2024-01-23' },
    { id: 3, type: 'Regulatory', severity: 'Critical', description: 'Tax filing deadline approaching', date: '2024-01-22' }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Compliance Overview</h1>
          <p className="text-gray-600">Monitor organizational compliance status and regulatory adherence</p>
        </div>

        {/* Compliance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {complianceMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                {metric.status === 'good' && <CheckCircle className="w-5 h-5 text-green-500" />}
                {metric.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                {metric.status === 'critical' && <XCircle className="w-5 h-5 text-red-500" />}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}%</div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Target: {metric.target}%</span>
                <span className={metric.value >= metric.target ? 'text-green-600' : 'text-red-600'}>
                  {metric.value >= metric.target ? '↗' : '↘'} {Math.abs(metric.value - metric.target)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className={`h-2 rounded-full ${
                    metric.status === 'good' ? 'bg-green-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Issues */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Compliance Issues</h2>
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-gray-900">{issue.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      issue.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      issue.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-gray-600">{issue.description}</p>
                </div>
                <div className="text-sm text-gray-500">{new Date(issue.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompliancePage
