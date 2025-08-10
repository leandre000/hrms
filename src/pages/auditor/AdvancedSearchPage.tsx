import React, { useState } from 'react'
import { Search, Filter, Calendar, User, FileText, Database } from 'lucide-react'

const AdvancedSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  const searchResults = [
    {
      id: 1,
      type: 'Activity Log',
      title: 'User Login - john.doe@company.com',
      content: 'Successful login from IP 192.168.1.100',
      timestamp: '2024-01-24T14:30:00',
      source: 'Security Logs',
      relevance: 95
    },
    {
      id: 2,
      type: 'Employee Record',
      title: 'John Doe - Employment Contract',
      content: 'Full-time employment contract signed 2023-06-01',
      timestamp: '2023-06-01T09:00:00',
      source: 'HR Database',
      relevance: 88
    },
    {
      id: 3,
      type: 'Financial Record',
      title: 'Payroll Entry - John Doe',
      content: 'Monthly salary payment $8,500',
      timestamp: '2024-01-31T23:59:00',
      source: 'Payroll System',
      relevance: 82
    },
    {
      id: 4,
      type: 'Document Access',
      title: 'Policy Document Accessed',
      content: 'Security Policy v3.2 accessed by john.doe@company.com',
      timestamp: '2024-01-22T11:15:00',
      source: 'Document Management',
      relevance: 76
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Activity Log': return 'bg-blue-100 text-blue-800'
      case 'Employee Record': return 'bg-green-100 text-green-800'
      case 'Financial Record': return 'bg-yellow-100 text-yellow-800'
      case 'Document Access': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Activity Log': return <Database className="w-4 h-4 text-blue-500" />
      case 'Employee Record': return <User className="w-4 h-4 text-green-500" />
      case 'Financial Record': return <FileText className="w-4 h-4 text-yellow-500" />
      case 'Document Access': return <FileText className="w-4 h-4 text-purple-500" />
      default: return <Search className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Advanced Search</h1>

        {/* Search Interface */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search across all audit data..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Search
              </button>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Type</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Records</option>
                  <option value="activity">Activity Logs</option>
                  <option value="employee">Employee Records</option>
                  <option value="financial">Financial Records</option>
                  <option value="documents">Documents</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Source System</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="all">All Systems</option>
                  <option value="hr">HR Database</option>
                  <option value="finance">Financial System</option>
                  <option value="security">Security Logs</option>
                  <option value="documents">Document Management</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Search Results</h2>
            <span className="text-sm text-gray-600">{searchResults.length} results found</span>
          </div>

          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(result.type)}
                    <div>
                      <h3 className="font-medium text-gray-900">{result.title}</h3>
                      <p className="text-sm text-gray-600">{result.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                      {result.type}
                    </span>
                    <span className="text-xs text-gray-500">{result.relevance}% match</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(result.timestamp).toLocaleString()}
                    </div>
                    <span>Source: {result.source}</span>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedSearchPage
