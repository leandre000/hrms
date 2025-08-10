import React from 'react'
import { Lock, User, Shield, CheckCircle, XCircle } from 'lucide-react'

const AccessControlPage = () => {
  const accessControls = [
    {
      resource: 'Financial Reports',
      user: 'john.doe@company.com',
      role: 'Finance Manager',
      permissions: ['Read', 'Write'],
      granted: '2024-01-15',
      lastAccess: '2024-01-23',
      status: 'Active'
    },
    {
      resource: 'Employee Records',
      user: 'sarah.wilson@company.com',
      role: 'HR Specialist',
      permissions: ['Read', 'Write', 'Delete'],
      granted: '2024-01-10',
      lastAccess: '2024-01-24',
      status: 'Active'
    },
    {
      resource: 'Payroll Data',
      user: 'mike.johnson@company.com',
      role: 'Sales Rep',
      permissions: ['Read'],
      granted: '2024-01-08',
      lastAccess: '2024-01-08',
      status: 'Suspicious'
    },
    {
      resource: 'Security Policies',
      user: 'temp.employee@company.com',
      role: 'Temp Worker',
      permissions: ['Read'],
      granted: '2023-12-01',
      lastAccess: '2023-12-15',
      status: 'Revoked'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Suspicious': return 'bg-yellow-100 text-yellow-800'
      case 'Revoked': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Suspicious': return <Shield className="w-4 h-4 text-yellow-500" />
      case 'Revoked': return <XCircle className="w-4 h-4 text-red-500" />
      default: return <Lock className="w-4 h-4 text-gray-500" />
    }
  }

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'Read': return 'bg-blue-100 text-blue-800'
      case 'Write': return 'bg-yellow-100 text-yellow-800'
      case 'Delete': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Access Control Audit</h1>
        <div className="space-y-4">
          {accessControls.map((access, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{access.resource}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-3 h-3" />
                      {access.user}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(access.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(access.status)}`}>
                    {access.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Role:</span>
                  <div className="font-medium">{access.role}</div>
                </div>
                <div>
                  <span className="text-gray-600">Access Granted:</span>
                  <div className="font-medium">{new Date(access.granted).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Last Access:</span>
                  <div className="font-medium">{new Date(access.lastAccess).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Permissions:</span>
                  <div className="flex gap-1 mt-1">
                    {access.permissions.map((permission, i) => (
                      <span 
                        key={i} 
                        className={`px-2 py-1 rounded text-xs font-medium ${getPermissionColor(permission)}`}
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {access.status === 'Suspicious' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-sm text-yellow-800 font-medium">⚠️ Attention Required</div>
                  <div className="text-sm text-yellow-700 mt-1">
                    User role may not require access to this resource. Review permissions.
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AccessControlPage
