import React from 'react'
import { Search, AlertTriangle, Clock, CheckCircle, User, Calendar } from 'lucide-react'

const InvestigationsPage = () => {
  const investigations = [
    {
      id: 'INV001',
      title: 'Suspicious Financial Transactions',
      priority: 'High',
      status: 'Active',
      assignedTo: 'Lead Auditor',
      createdDate: '2024-01-20',
      lastUpdate: '2024-01-24',
      description: 'Investigation into unusual expense patterns in Q4 2023',
      findings: 3,
      evidence: 8,
      progress: 75
    },
    {
      id: 'INV002',
      title: 'Data Access Violation Investigation',
      priority: 'Critical',
      status: 'Active',
      assignedTo: 'Security Team',
      createdDate: '2024-01-18',
      lastUpdate: '2024-01-23',
      description: 'Unauthorized access to employee personal data',
      findings: 5,
      evidence: 12,
      progress: 60
    },
    {
      id: 'INV003',
      title: 'Policy Compliance Review',
      priority: 'Medium',
      status: 'Completed',
      assignedTo: 'Compliance Officer',
      createdDate: '2024-01-10',
      lastUpdate: '2024-01-22',
      description: 'Review of remote work policy adherence',
      findings: 2,
      evidence: 6,
      progress: 100
    },
    {
      id: 'INV004',
      title: 'Payroll Discrepancy Analysis',
      priority: 'Medium',
      status: 'On Hold',
      assignedTo: 'Finance Auditor',
      createdDate: '2024-01-15',
      lastUpdate: '2024-01-20',
      description: 'Analysis of salary calculation inconsistencies',
      findings: 1,
      evidence: 4,
      progress: 30
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Clock className="w-4 h-4 text-blue-500" />
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'On Hold': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default: return <Search className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'On Hold': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Case Investigation</h1>
            <p className="text-gray-600">Manage and track audit investigations</p>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            New Investigation
          </button>
        </div>

        <div className="space-y-6">
          {investigations.map((investigation) => (
            <div key={investigation.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{investigation.title}</h3>
                    <p className="text-sm text-gray-600">Case ID: {investigation.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(investigation.priority)}`}>
                    {investigation.priority}
                  </span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(investigation.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investigation.status)}`}>
                      {investigation.status}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{investigation.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Investigation Progress</span>
                  <span>{investigation.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      investigation.progress === 100 ? 'bg-green-500' :
                      investigation.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${investigation.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <User className="w-3 h-3" />
                    Assigned To
                  </div>
                  <div className="font-medium">{investigation.assignedTo}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Calendar className="w-3 h-3" />
                    Created
                  </div>
                  <div className="font-medium">{new Date(investigation.createdDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Last Update</span>
                  <div className="font-medium">{new Date(investigation.lastUpdate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Findings</span>
                  <div className="font-medium text-blue-600">{investigation.findings}</div>
                </div>
                <div>
                  <span className="text-gray-600">Evidence Items</span>
                  <div className="font-medium text-green-600">{investigation.evidence}</div>
                </div>
                <div>
                  <span className="text-gray-600">Days Open</span>
                  <div className="font-medium">
                    {Math.floor((new Date().getTime() - new Date(investigation.createdDate).getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvestigationsPage
