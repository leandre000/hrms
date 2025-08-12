import React, { useState } from 'react'
import {
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Calendar,
  Clock,
  Users,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'dashboard' | 'chart' | 'table' | 'metric'
  category: string
  schedule: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'manual'
  status: 'active' | 'paused' | 'error'
  lastRun: string
  nextRun: string
  recipients: string[]
  description: string
  createdBy: string
  isFavorite: boolean
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Employee Turnover Dashboard',
    type: 'dashboard',
    category: 'Workforce Analytics',
    schedule: 'monthly',
    status: 'active',
    lastRun: '2024-01-15',
    nextRun: '2024-02-15',
    recipients: ['hr.manager@company.com', 'hr.director@company.com'],
    description: 'Comprehensive dashboard showing employee retention and turnover trends',
    createdBy: 'HR Analytics Team',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Payroll Summary Chart',
    type: 'chart',
    category: 'Financial Reports',
    schedule: 'weekly',
    status: 'active',
    lastRun: '2024-01-14',
    nextRun: '2024-01-21',
    recipients: ['finance.team@company.com', 'hr.manager@company.com'],
    description: 'Weekly payroll summary with cost breakdowns and trends',
    createdBy: 'Payroll Team',
    isFavorite: false
  }
]

const HRReportingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reporting</h1>
          <p className="text-gray-600 mt-2">Manage automated reports, schedules, and reporting analytics</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Create Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{mockReports.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Reports</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockReports.filter(r => r.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Runs</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed Runs</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-800">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {report.status}
                  </span>
                </div>
                <button className="p-1 rounded hover:bg-gray-100 text-yellow-500">
                  ★
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{report.description}</p>
              
              <div className="text-sm text-gray-500 mb-4">
                <p>Category: {report.category}</p>
                <p>Schedule: {report.schedule}</p>
                <p>Created by: {report.createdBy}</p>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={14} />
                  <span>Last run: {new Date(report.lastRun).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Next run: {new Date(report.nextRun).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {report.recipients.length} recipient{report.recipients.length !== 1 ? 's' : ''}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New Report</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
                <input
                  type="text"
                  placeholder="Enter report name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>dashboard</option>
                    <option>chart</option>
                    <option>table</option>
                    <option>metric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Workforce Analytics</option>
                    <option>Financial Reports</option>
                    <option>Performance Management</option>
                    <option>Learning & Development</option>
                    <option>Compliance</option>
                    <option>Talent Acquisition</option>
                    <option>Benefits</option>
                    <option>Time & Attendance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter report description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Create Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRReportingPage
