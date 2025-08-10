import React, { useState } from 'react'
import { Search, FileText, Calendar, User, CheckCircle, AlertTriangle, Eye, Filter } from 'lucide-react'

const AuditPage = () => {
  const auditLogs = [
    {
      id: 1,
      action: 'Employee Record Updated',
      user: 'Lisa Rodriguez',
      target: 'John Doe Profile',
      timestamp: '2024-01-24T10:30:00',
      ip: '192.168.1.100',
      details: 'Updated salary information',
      category: 'HR'
    },
    {
      id: 2,
      action: 'Document Downloaded',
      user: 'Sarah Wilson',
      target: 'Employee Handbook',
      timestamp: '2024-01-24T09:15:00',
      ip: '192.168.1.105',
      details: 'Downloaded employee handbook PDF',
      category: 'Documents'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Trails</h1>
            <p className="text-gray-600">Track system activities and user actions</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Timestamp</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Action</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Target</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Details</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{log.user}</span>
                      </div>
                      <div className="text-xs text-gray-500">{log.ip}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{log.target}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                    <td className="px-6 py-4">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditPage
