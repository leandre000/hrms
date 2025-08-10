import React from 'react'
import { FileText, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

const RegulatoryReportsPage = () => {
  const reports = [
    { name: 'SOX Compliance Report', status: 'submitted', dueDate: '2024-02-01', submittedDate: '2024-01-28' },
    { name: 'GDPR Annual Report', status: 'pending', dueDate: '2024-01-31', submittedDate: null },
    { name: 'Financial Audit Report', status: 'overdue', dueDate: '2024-01-20', submittedDate: null },
    { name: 'Security Assessment', status: 'draft', dueDate: '2024-02-15', submittedDate: null }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />
      case 'overdue': return <AlertTriangle className="w-5 h-5 text-red-500" />
      default: return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Regulatory Reports</h1>
          <p className="text-gray-600">Track mandatory regulatory reporting and compliance submissions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Report</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{report.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        <span className="capitalize">{report.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{new Date(report.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {report.submittedDate ? new Date(report.submittedDate).toLocaleDateString() : 'Not submitted'}
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

export default RegulatoryReportsPage
