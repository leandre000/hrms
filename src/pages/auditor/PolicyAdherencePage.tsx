import React from 'react'
import { Shield, CheckCircle, AlertTriangle, XCircle, Users, FileText } from 'lucide-react'

const PolicyAdherencePage = () => {
  const policies = [
    { name: 'Security Policy', adherence: 95, violations: 2, lastAudit: '2024-01-20' },
    { name: 'Data Privacy Policy', adherence: 88, violations: 5, lastAudit: '2024-01-18' },
    { name: 'Code of Conduct', adherence: 97, violations: 1, lastAudit: '2024-01-15' },
    { name: 'Remote Work Policy', adherence: 92, violations: 3, lastAudit: '2024-01-12' }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Policy Adherence</h1>
          <p className="text-gray-600">Monitor employee compliance with organizational policies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{policy.name}</h3>
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-2">{policy.adherence}%</div>
              <div className="text-sm text-gray-500 mb-4">Adherence Rate</div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className={`h-3 rounded-full ${
                    policy.adherence >= 95 ? 'bg-green-500' :
                    policy.adherence >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${policy.adherence}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Violations: {policy.violations}</span>
                <span className="text-gray-600">Last Audit: {new Date(policy.lastAudit).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PolicyAdherencePage
