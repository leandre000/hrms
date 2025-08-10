import React from 'react'
import { FileText, CheckCircle, AlertTriangle, Calendar, User } from 'lucide-react'

const ContractCompliancePage = () => {
  const contracts = [
    {
      id: 1,
      employee: 'John Doe',
      contractType: 'Full-time Employment',
      startDate: '2023-06-01',
      endDate: null,
      status: 'Compliant',
      issues: [],
      lastReview: '2024-01-15'
    },
    {
      id: 2,
      employee: 'Sarah Wilson',
      contractType: 'Fixed-term Contract',
      startDate: '2023-09-01',
      endDate: '2024-02-29',
      status: 'Expiring Soon',
      issues: ['Contract renewal required'],
      lastReview: '2024-01-10'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      contractType: 'Contractor Agreement',
      startDate: '2023-12-01',
      endDate: '2024-06-01',
      status: 'Non-compliant',
      issues: ['Missing work authorization', 'Outdated terms'],
      lastReview: '2024-01-05'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800'
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800'
      case 'Non-compliant': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Expiring Soon': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'Non-compliant': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Contract Compliance</h1>
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{contract.employee}</h3>
                    <p className="text-sm text-gray-600">{contract.contractType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(contract.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                    {contract.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Start Date:</span>
                  <div className="font-medium">{new Date(contract.startDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">End Date:</span>
                  <div className="font-medium">
                    {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Indefinite'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Last Review:</span>
                  <div className="font-medium">{new Date(contract.lastReview).toLocaleDateString()}</div>
                </div>
              </div>

              {contract.issues.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Compliance Issues:</h4>
                  <ul className="space-y-1">
                    {contract.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContractCompliancePage
