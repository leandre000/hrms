import React, { useState } from 'react'
import { Plus, FileText, Calendar, Filter, Download } from 'lucide-react'

const CustomReportsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const savedReports = [
    {
      id: 1,
      name: 'Monthly Security Review',
      description: 'Security incidents and policy violations',
      filters: ['Security', 'Policy Violations', 'Last 30 days'],
      createdDate: '2024-01-15',
      lastRun: '2024-01-24'
    },
    {
      id: 2,
      name: 'Quarterly Compliance Summary',
      description: 'Comprehensive compliance metrics and trends',
      filters: ['Compliance', 'All Departments', 'Q4 2023'],
      createdDate: '2024-01-10',
      lastRun: '2024-01-20'
    },
    {
      id: 3,
      name: 'Employee Data Audit',
      description: 'Employee records completeness and accuracy',
      filters: ['Employee Data', 'HR Department', 'All Records'],
      createdDate: '2024-01-05',
      lastRun: '2024-01-22'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Custom Reports</h1>
            <p className="text-gray-600">Create and manage custom audit reports</p>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Report
          </button>
        </div>

        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Custom Report</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter report name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows={3}
                    placeholder="Enter report description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Sources</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Security Logs</option>
                    <option>Compliance Data</option>
                    <option>Employee Records</option>
                    <option>Financial Data</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Current Quarter</option>
                    <option>Current Year</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Create Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Saved Reports */}
        <div className="space-y-4">
          {savedReports.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Run Report
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {report.filters.map((filter, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {filter}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Created: {new Date(report.createdDate).toLocaleDateString()}
                </div>
                <div>Last run: {new Date(report.lastRun).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomReportsPage
