import React from 'react'
import { Edit, User, Clock, Database } from 'lucide-react'

const ChangeHistoryPage = () => {
  const changes = [
    {
      id: 1,
      table: 'employees',
      recordId: 'EMP001',
      field: 'salary',
      oldValue: '$85,000',
      newValue: '$95,000',
      changedBy: 'lisa.rodriguez@company.com',
      timestamp: '2024-01-24T14:30:00',
      reason: 'Annual salary review'
    },
    {
      id: 2,
      table: 'policies',
      recordId: 'POL002',
      field: 'content',
      oldValue: 'Previous policy text...',
      newValue: 'Updated policy text...',
      changedBy: 'admin@company.com',
      timestamp: '2024-01-24T13:15:00',
      reason: 'Policy update for compliance'
    },
    {
      id: 3,
      table: 'employees',
      recordId: 'EMP005',
      field: 'department',
      oldValue: 'Marketing',
      newValue: 'Engineering',
      changedBy: 'hr@company.com',
      timestamp: '2024-01-24T12:00:00',
      reason: 'Department transfer'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Data Change History</h1>
          <p className="text-gray-600">Track all data modifications and changes across the system</p>
        </div>

        <div className="space-y-4">
          {changes.map((change) => (
            <div key={change.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Edit className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {change.table}.{change.field} modified
                    </h3>
                    <p className="text-sm text-gray-500">Record ID: {change.recordId}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(change.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-sm font-medium text-red-800 mb-1">Previous Value</div>
                  <div className="text-sm text-red-700">{change.oldValue}</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm font-medium text-green-800 mb-1">New Value</div>
                  <div className="text-sm text-green-700">{change.newValue}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Changed by: {change.changedBy}
                </div>
                <div>Reason: {change.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChangeHistoryPage
