import React, { useState } from 'react'
import { BarChart3, FileText, Download, Filter, Search, Calendar, TrendingUp, Users, Target, Clock } from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'performance' | 'project' | 'attendance' | 'productivity' | 'financial' | 'custom'
  description: string
  lastGenerated: string
  nextScheduled: string
  status: 'generated' | 'scheduled' | 'failed'
  format: 'pdf' | 'excel' | 'csv'
  size: string
  generatedBy: string
}

const TeamReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  const mockReports: Report[] = [
    {
      id: '1',
      name: 'Q4 2024 Team Performance Report',
      type: 'performance',
      description: 'Comprehensive analysis of team performance metrics, productivity scores, and individual contributions',
      lastGenerated: '2024-12-15',
      nextScheduled: '2025-01-15',
      status: 'generated',
      format: 'pdf',
      size: '2.4 MB',
      generatedBy: 'Mike Smith'
    },
    {
      id: '2',
      name: 'Project Alpha Progress Report',
      type: 'project',
      description: 'Detailed progress tracking for Project Alpha including milestones, budget utilization, and team allocation',
      lastGenerated: '2024-12-18',
      nextScheduled: '2024-12-25',
      status: 'generated',
      format: 'excel',
      size: '1.8 MB',
      generatedBy: 'Mike Smith'
    },
    {
      id: '3',
      name: 'Monthly Attendance Summary',
      type: 'attendance',
      description: 'Team attendance patterns, leave utilization, and overtime analysis for December 2024',
      lastGenerated: '2024-12-01',
      nextScheduled: '2025-01-01',
      status: 'generated',
      format: 'csv',
      size: '0.5 MB',
      generatedBy: 'System'
    },
    {
      id: '4',
      name: 'Team Productivity Analysis',
      type: 'productivity',
      description: 'Productivity metrics, task completion rates, and efficiency analysis across all team members',
      lastGenerated: '2024-12-10',
      nextScheduled: '2025-01-10',
      status: 'generated',
      format: 'pdf',
      size: '3.1 MB',
      generatedBy: 'Mike Smith'
    },
    {
      id: '5',
      name: 'Budget vs Actual Report',
      type: 'financial',
      description: 'Financial analysis comparing budgeted vs actual spending across all active projects',
      lastGenerated: '2024-12-20',
      nextScheduled: '2025-01-20',
      status: 'scheduled',
      format: 'excel',
      size: 'N/A',
      generatedBy: 'System'
    },
    {
      id: '6',
      name: 'Custom Team Analytics',
      type: 'custom',
      description: 'Custom report combining multiple data sources for executive presentation',
      lastGenerated: '2024-12-12',
      nextScheduled: 'N/A',
      status: 'generated',
      format: 'pdf',
      size: '4.2 MB',
      generatedBy: 'Mike Smith'
    }
  ]

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'All' || report.type === filterType
    const matchesStatus = filterStatus === 'All' || report.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-blue-100 text-blue-800'
      case 'project': return 'bg-green-100 text-green-800'
      case 'attendance': return 'bg-purple-100 text-purple-800'
      case 'productivity': return 'bg-orange-100 text-orange-800'
      case 'financial': return 'bg-red-100 text-red-800'
      case 'custom': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="h-4 w-4" />
      case 'excel': return <BarChart3 className="h-4 w-4" />
      case 'csv': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const reportTypes = ['All', ...Array.from(new Set(mockReports.map(r => r.type)))]
  const reportStatuses = ['All', ...Array.from(new Set(mockReports.map(r => r.status)))]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Reports</h1>
        <p className="text-gray-600">Generate, manage, and access comprehensive reports about your team's performance and projects</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{mockReports.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Generated</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockReports.filter(r => r.status === 'generated').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockReports.filter(r => r.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockReports.filter(r => new Date(r.lastGenerated).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {reportTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {reportStatuses.map(status => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate New Report
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredReports.map((report) => (
            <div key={report.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{report.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Last: {new Date(report.lastGenerated).toLocaleDateString()}
                    </div>
                    {report.nextScheduled !== 'N/A' && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Next: {new Date(report.nextScheduled).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {report.generatedBy}
                    </div>
                    {report.status === 'generated' && (
                      <div className="flex items-center">
                        {getFormatIcon(report.format)}
                        <span className="ml-1">{report.format.toUpperCase()} • {report.size}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 flex flex-col gap-2">
                  {report.status === 'generated' && (
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  )}
                  <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Reports
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <FileText className="h-4 w-4 mr-2" />
          Report Templates
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics Dashboard
        </button>
      </div>
    </div>
  )
}

export default TeamReportsPage
