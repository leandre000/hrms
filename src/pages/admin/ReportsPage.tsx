import React, { useState } from 'react'
import { BarChart3, Download, Calendar, FileText, TrendingUp, Users, DollarSign, Clock } from 'lucide-react'

const AdminReportsPage = () => {
  const reports = [
    {
      id: 1,
      name: 'Employee Demographics Report',
      description: 'Comprehensive analysis of workforce demographics',
      category: 'HR Analytics',
      lastGenerated: '2024-01-20',
      frequency: 'Monthly',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Payroll Summary Report',
      description: 'Monthly payroll costs and breakdown by department',
      category: 'Financial',
      lastGenerated: '2024-01-15',
      frequency: 'Monthly',
      format: 'Excel'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Generate and manage compliance reports</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">45</div>
                <div className="text-sm text-gray-600">Total Employees</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">$850K</div>
                <div className="text-sm text-gray-600">Monthly Payroll</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,680</div>
                <div className="text-sm text-gray-600">Hours Worked</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">92%</div>
                <div className="text-sm text-gray-600">Attendance Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {reports.map((report) => (
              <div key={report.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{report.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{report.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <span>Category: {report.category}</span>
                      <span>Format: {report.format}</span>
                      <span>Frequency: {report.frequency}</span>
                      <span>Last: {new Date(report.lastGenerated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors text-sm">
                      <BarChart3 className="w-4 h-4" />
                      Generate
                    </button>
                    <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReportsPage
