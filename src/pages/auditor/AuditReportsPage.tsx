import React from 'react'
import { BarChart3, FileText, Calendar, Download, TrendingUp } from 'lucide-react'

const AuditReportsPage = () => {
  const reports = [
    {
      id: 1,
      name: 'Monthly Compliance Report',
      type: 'Compliance',
      period: 'January 2024',
      status: 'Complete',
      generatedDate: '2024-01-31',
      size: '2.4 MB',
      findings: 3
    },
    {
      id: 2,
      name: 'Security Audit Summary',
      type: 'Security',
      period: 'Q4 2023',
      status: 'Complete',
      generatedDate: '2024-01-15',
      size: '1.8 MB',
      findings: 7
    },
    {
      id: 3,
      name: 'Financial Controls Review',
      type: 'Financial',
      period: 'December 2023',
      status: 'In Progress',
      generatedDate: null,
      size: null,
      findings: 0
    },
    {
      id: 4,
      name: 'Employee Data Audit',
      type: 'Data Privacy',
      period: 'Q4 2023',
      status: 'Complete',
      generatedDate: '2024-01-20',
      size: '3.2 MB',
      findings: 12
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Compliance': return 'bg-blue-100 text-blue-800'
      case 'Security': return 'bg-red-100 text-red-800'
      case 'Financial': return 'bg-green-100 text-green-800'
      case 'Data Privacy': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Reports</h1>
            <p className="text-gray-600">Generate and manage audit reports</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <FileText className="w-4 h-4" />
            Generate New Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                    {report.type}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Period: {report.period}</p>

              <div className="space-y-2 text-sm mb-4">
                {report.generatedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Generated:</span>
                    <span>{new Date(report.generatedDate).toLocaleDateString()}</span>
                  </div>
                )}
                {report.size && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span>{report.size}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Findings:</span>
                  <span className={report.findings > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                    {report.findings}
                  </span>
                </div>
              </div>

              {report.status === 'Complete' && (
                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuditReportsPage
