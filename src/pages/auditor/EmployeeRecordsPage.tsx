import React from 'react'
import { User, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

const EmployeeRecordsPage = () => {
  const employeeRecords = [
    {
      id: 'EMP001',
      name: 'John Doe',
      department: 'Engineering',
      completeness: 95,
      issues: ['Missing emergency contact'],
      lastUpdated: '2024-01-20'
    },
    {
      id: 'EMP002',
      name: 'Sarah Wilson',
      department: 'Marketing',
      completeness: 100,
      issues: [],
      lastUpdated: '2024-01-18'
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      department: 'Sales',
      completeness: 85,
      issues: ['Missing tax documents', 'Outdated address'],
      lastUpdated: '2024-01-15'
    }
  ]

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 95) return 'text-green-600'
    if (completeness >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCompletenessIcon = (completeness: number) => {
    if (completeness >= 95) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (completeness >= 85) return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    return <XCircle className="w-4 h-4 text-red-500" />
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Employee Records</h1>
        <div className="space-y-4">
          {employeeRecords.map((record) => (
            <div key={record.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{record.name}</h3>
                    <p className="text-sm text-gray-600">{record.id} • {record.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getCompletenessIcon(record.completeness)}
                  <span className={`font-medium ${getCompletenessColor(record.completeness)}`}>
                    {record.completeness}% Complete
                  </span>
                </div>
              </div>
              
              {record.issues.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Outstanding Issues:</h4>
                  <ul className="space-y-1">
                    {record.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="text-sm text-gray-500">
                Last updated: {new Date(record.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmployeeRecordsPage
