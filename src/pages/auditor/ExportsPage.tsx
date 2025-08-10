import React, { useState } from 'react'
import { Download, FileText, Calendar, Database, Filter } from 'lucide-react'

const ExportsPage = () => {
  const [exportType, setExportType] = useState('compliance')
  const [format, setFormat] = useState('pdf')
  const [dateRange, setDateRange] = useState('month')

  const recentExports = [
    {
      id: 1,
      name: 'Compliance Report Q4 2023',
      type: 'Compliance',
      format: 'PDF',
      size: '2.4 MB',
      exportDate: '2024-01-24T14:30:00',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Security Audit Data',
      type: 'Security',
      format: 'Excel',
      size: '15.8 MB',
      exportDate: '2024-01-23T16:45:00',
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Employee Records Audit',
      type: 'HR Data',
      format: 'CSV',
      size: '890 KB',
      exportDate: '2024-01-22T11:20:00',
      status: 'Completed'
    },
    {
      id: 4,
      name: 'Financial Transactions',
      type: 'Financial',
      format: 'Excel',
      size: '8.2 MB',
      exportDate: '2024-01-21T09:15:00',
      status: 'Processing'
    }
  ]

  const exportTemplates = [
    {
      name: 'Compliance Report',
      description: 'Comprehensive compliance status and metrics',
      includes: ['Policy adherence', 'Risk assessments', 'Violation reports']
    },
    {
      name: 'Security Audit',
      description: 'Security incidents and access logs',
      includes: ['Security events', 'Access logs', 'Failed logins']
    },
    {
      name: 'Financial Audit',
      description: 'Financial controls and transaction analysis',
      includes: ['Payroll audit', 'Expense verification', 'Budget analysis']
    },
    {
      name: 'Employee Data',
      description: 'Employee records and HR compliance',
      includes: ['Employee records', 'Contract compliance', 'Performance data']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Processing': return 'bg-yellow-100 text-yellow-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF': return <FileText className="w-4 h-4 text-red-500" />
      case 'Excel': return <Database className="w-4 h-4 text-green-500" />
      case 'CSV': return <Database className="w-4 h-4 text-blue-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Export & Downloads</h1>

        {/* Export Configuration */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Export</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Export Type</label>
              <select
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="compliance">Compliance Report</option>
                <option value="security">Security Audit</option>
                <option value="financial">Financial Audit</option>
                <option value="employee">Employee Data</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="pdf">PDF Report</option>
                <option value="excel">Excel Spreadsheet</option>
                <option value="csv">CSV Data</option>
                <option value="json">JSON Data</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Generate Export
              </button>
            </div>
          </div>

          {/* Export Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportTemplates.map((template, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="space-y-1">
                  {template.includes.map((include, i) => (
                    <div key={i} className="text-xs text-gray-500 flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      {include}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Exports */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Exports</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Export Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Format</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Export Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentExports.map((export_) => (
                  <tr key={export_.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{export_.name}</td>
                    <td className="px-4 py-3 text-gray-900">{export_.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getFormatIcon(export_.format)}
                        <span>{export_.format}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-900">{export_.size}</td>
                    <td className="px-4 py-3 text-gray-900">{new Date(export_.exportDate).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(export_.status)}`}>
                        {export_.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {export_.status === 'Completed' && (
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
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

export default ExportsPage
