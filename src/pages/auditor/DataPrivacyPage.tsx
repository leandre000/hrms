import React from 'react'
import { Shield, Eye, Lock, AlertTriangle, CheckCircle } from 'lucide-react'

const DataPrivacyPage = () => {
  const privacyMetrics = [
    { name: 'Data Processing Activities', value: 23, compliant: 21, percentage: 91.3 },
    { name: 'Consent Records', value: 1250, valid: 1195, percentage: 95.6 },
    { name: 'Data Subject Requests', value: 18, resolved: 16, percentage: 88.9 },
    { name: 'Privacy Impact Assessments', value: 8, completed: 7, percentage: 87.5 }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'Data Subject Request',
      description: 'Right to erasure request processed',
      date: '2024-01-24',
      status: 'Completed',
      impact: 'Low'
    },
    {
      id: 2,
      type: 'Consent Update',
      description: 'Marketing consent preferences updated',
      date: '2024-01-23',
      status: 'Processed',
      impact: 'Low'
    },
    {
      id: 3,
      type: 'Data Breach Assessment',
      description: 'Minor data exposure incident reviewed',
      date: '2024-01-22',
      status: 'Under Review',
      impact: 'Medium'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Processed': return 'bg-blue-100 text-blue-800'
      case 'Under Review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Data Privacy Overview</h1>

        {/* Privacy Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {privacyMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-blue-500" />
                <h3 className="font-medium text-gray-900">{metric.name}</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{metric.compliant || metric.valid || metric.resolved || metric.completed}/{metric.value}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Compliance Rate</span>
                <span className={`font-medium ${metric.percentage >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {metric.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${metric.percentage >= 90 ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${metric.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Privacy Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-900">{activity.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(activity.impact)}`}>
                      {activity.impact} Impact
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium mb-1 ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </div>
                  <div className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataPrivacyPage
