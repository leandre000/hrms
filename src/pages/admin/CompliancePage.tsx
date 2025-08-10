import React, { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, FileText, Users, Calendar, TrendingUp, Eye, Plus } from 'lucide-react'

const AdminCompliancePage = () => {
  const complianceItems = [
    {
      id: 1,
      title: 'GDPR Compliance Review',
      category: 'Data Protection',
      status: 'compliant',
      lastAudit: '2024-01-15',
      nextAudit: '2024-07-15',
      risk: 'low',
      responsible: 'Legal Team',
      completion: 95
    },
    {
      id: 2,
      title: 'Employee Safety Training',
      category: 'Health & Safety',
      status: 'in_progress',
      lastAudit: '2023-12-01',
      nextAudit: '2024-06-01',
      risk: 'medium',
      responsible: 'HR Department',
      completion: 78
    },
    {
      id: 3,
      title: 'Financial Record Keeping',
      category: 'Financial',
      status: 'compliant',
      lastAudit: '2024-01-10',
      nextAudit: '2024-04-10',
      risk: 'low',
      responsible: 'Finance Team',
      completion: 100
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'non_compliant': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compliance Overview</h1>
            <p className="text-gray-600">Monitor regulatory compliance and risk management</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Compliance Item
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{Math.round((complianceItems.filter(c => c.status === 'compliant').length / complianceItems.length) * 100)}%</div>
                <div className="text-sm text-gray-600">Compliance Rate</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{complianceItems.filter(c => c.risk === 'high').length}</div>
                <div className="text-sm text-gray-600">High Risk Items</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Overdue Audits</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{Math.round(complianceItems.reduce((sum, c) => sum + c.completion, 0) / complianceItems.length)}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Items */}
        <div className="space-y-4">
          {complianceItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span>Category: {item.category}</span>
                    <span>Responsible: {item.responsible}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(item.risk)}`}>
                    {item.risk.toUpperCase()} RISK
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Completion</div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${item.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{item.completion}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Last Audit</div>
                  <div className="font-medium text-gray-900">{new Date(item.lastAudit).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Next Audit</div>
                  <div className="font-medium text-gray-900">{new Date(item.nextAudit).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Actions</div>
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminCompliancePage
