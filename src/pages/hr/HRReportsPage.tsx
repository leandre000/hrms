import React, { useState } from 'react'
import { 
  FileText, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  Users, 
  TrendingUp, 
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Eye,
  Shield
} from 'lucide-react'

interface Report {
  id: string
  name: string
  type: string
  category: string
  lastGenerated: string
  status: 'ready' | 'processing' | 'failed'
  size: string
  format: string
  description: string
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Employee Turnover Report',
    type: 'Analytics',
    category: 'Workforce',
    lastGenerated: '2024-01-15',
    status: 'ready',
    size: '2.4 MB',
    format: 'PDF',
    description: 'Comprehensive analysis of employee retention and turnover patterns'
  },
  {
    id: '2',
    name: 'Payroll Summary Q4 2024',
    type: 'Financial',
    category: 'Compensation',
    lastGenerated: '2024-01-10',
    status: 'ready',
    size: '1.8 MB',
    format: 'Excel',
    description: 'Quarterly payroll analysis with cost breakdowns'
  },
  {
    id: '3',
    name: 'Performance Metrics Dashboard',
    type: 'Analytics',
    category: 'Performance',
    lastGenerated: '2024-01-12',
    status: 'ready',
    size: '3.2 MB',
    format: 'PDF',
    description: 'Employee performance trends and KPI analysis'
  },
  {
    id: '4',
    name: 'Training Completion Report',
    type: 'Operational',
    category: 'Learning',
    lastGenerated: '2024-01-08',
    status: 'ready',
    size: '1.5 MB',
    format: 'Excel',
    description: 'Training program completion rates and effectiveness'
  },
  {
    id: '5',
    name: 'Compliance Audit Report',
    type: 'Compliance',
    category: 'Legal',
    lastGenerated: '2024-01-05',
    status: 'ready',
    size: '4.1 MB',
    format: 'PDF',
    description: 'Regulatory compliance status and audit findings'
  },
  {
    id: '6',
    name: 'Recruitment Pipeline Analysis',
    type: 'Analytics',
    category: 'Talent',
    lastGenerated: '2024-01-14',
    status: 'processing',
    size: '2.7 MB',
    format: 'PDF',
    description: 'Hiring pipeline efficiency and candidate quality metrics'
  },
  {
    id: '7',
    name: 'Benefits Utilization Report',
    type: 'Operational',
    category: 'Benefits',
    lastGenerated: '2024-01-11',
    status: 'ready',
    size: '1.9 MB',
    format: 'Excel',
    description: 'Employee benefits usage and cost analysis'
  },
  {
    id: '8',
    name: 'Leave Management Summary',
    type: 'Operational',
    category: 'Attendance',
    lastGenerated: '2024-01-09',
    status: 'ready',
    size: '1.2 MB',
    format: 'Excel',
    description: 'Leave patterns and absence management insights'
  },
  {
    id: '9',
    name: 'Compliance Risk Assessment',
    type: 'Compliance',
    category: 'Risk Management',
    lastGenerated: '2024-01-16',
    status: 'ready',
    size: '3.8 MB',
    format: 'PDF',
    description: 'Comprehensive risk assessment for all HR policies and procedures'
  },
  {
    id: '10',
    name: 'Regulatory Compliance Dashboard',
    type: 'Regulatory',
    category: 'Compliance',
    lastGenerated: '2024-01-14',
    status: 'ready',
    size: '2.9 MB',
    format: 'PDF',
    description: 'Real-time dashboard showing regulatory compliance status across all areas'
  },
  {
    id: '11',
    name: 'Audit Findings Report',
    type: 'Compliance',
    category: 'Audit',
    lastGenerated: '2024-01-12',
    status: 'ready',
    size: '4.5 MB',
    format: 'PDF',
    description: 'Detailed findings from latest internal and external compliance audits'
  },
  {
    id: '12',
    name: 'Policy Compliance Matrix',
    type: 'Compliance',
    category: 'Legal',
    lastGenerated: '2024-01-18',
    status: 'ready',
    size: '2.1 MB',
    format: 'Excel',
    description: 'Matrix showing compliance status of all policies against regulatory requirements'
  }
]

const reportTypes = ['All', 'Analytics', 'Financial', 'Operational', 'Compliance', 'Regulatory']
const categories = ['All', 'Workforce', 'Compensation', 'Performance', 'Learning', 'Legal', 'Talent', 'Benefits', 'Attendance', 'Compliance', 'Risk Management', 'Audit']
const formats = ['All', 'PDF', 'Excel', 'CSV', 'PowerPoint']

const HRReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedFormat, setSelectedFormat] = useState('All')
  const [showGenerateModal, setShowGenerateModal] = useState(false)

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'All' || report.type === selectedType
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory
    const matchesFormat = selectedFormat === 'All' || report.format === selectedFormat
    
    return matchesSearch && matchesType && matchesCategory && matchesFormat
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return '✓'
      case 'processing': return '⏳'
      case 'failed': return '✗'
      default: return '•'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">Generate and manage HR reports and analytics</p>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <FileText size={20} />
          Generate Report
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
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready Reports</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockReports.filter(r => r.status === 'ready').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockReports.filter(r => r.status === 'processing').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockReports.filter(r => r.status === 'failed').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Reports Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Compliance Reports Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {mockReports.filter(r => r.type === 'Compliance' || r.type === 'Regulatory').length}
              </p>
              <p className="text-sm text-blue-800">Compliance Reports</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockReports.filter(r => r.category === 'Risk Management').length}
              </p>
              <p className="text-sm text-green-800">Risk Reports</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {mockReports.filter(r => r.category === 'Audit').length}
              </p>
              <p className="text-sm text-purple-800">Audit Reports</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {mockReports.filter(r => r.category === 'Legal').length}
              </p>
              <p className="text-sm text-orange-800">Legal Reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {reportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {formats.map(format => (
              <option key={format} value={format}>{format}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {report.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(report.lastGenerated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)} {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-purple-600 hover:text-purple-900">
                        <Download size={16} />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Generate New Report</h3>
              <button
                onClick={() => setShowGenerateModal(false)}
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
                    <option>Analytics</option>
                    <option>Financial</option>
                    <option>Operational</option>
                    <option>Compliance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Workforce</option>
                    <option>Compensation</option>
                    <option>Performance</option>
                    <option>Learning</option>
                    <option>Legal</option>
                    <option>Talent</option>
                    <option>Benefits</option>
                    <option>Attendance</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                    <option>PowerPoint</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                    <option>Custom range</option>
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
                onClick={() => setShowGenerateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HRReportsPage
