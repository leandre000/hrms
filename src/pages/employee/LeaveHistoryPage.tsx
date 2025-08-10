import React, { useState } from 'react'
import { Calendar, Filter, Search, Download, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const LeaveHistoryPage = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState('2024')

  // Mock leave history data
  const leaveHistory = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      days: 3,
      reason: 'Family vacation',
      status: 'pending',
      submittedDate: '2024-01-15',
      approver: 'Sarah Wilson',
      approvedDate: null,
      rejectionReason: null
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2024-01-10',
      endDate: '2024-01-10',
      days: 1,
      reason: 'Flu symptoms',
      status: 'approved',
      submittedDate: '2024-01-09',
      approver: 'Sarah Wilson',
      approvedDate: '2024-01-09',
      rejectionReason: null
    },
    {
      id: 3,
      type: 'Personal Leave',
      startDate: '2024-01-05',
      endDate: '2024-01-05',
      days: 0.5,
      reason: 'Medical appointment',
      status: 'approved',
      submittedDate: '2024-01-02',
      approver: 'Sarah Wilson',
      approvedDate: '2024-01-03',
      rejectionReason: null
    },
    {
      id: 4,
      type: 'Annual Leave',
      startDate: '2023-12-25',
      endDate: '2023-12-29',
      days: 5,
      reason: 'Christmas holiday',
      status: 'approved',
      submittedDate: '2023-11-15',
      approver: 'Sarah Wilson',
      approvedDate: '2023-11-16',
      rejectionReason: null
    },
    {
      id: 5,
      type: 'Personal Leave',
      startDate: '2023-11-20',
      endDate: '2023-11-20',
      days: 1,
      reason: 'Personal matters',
      status: 'rejected',
      submittedDate: '2023-11-19',
      approver: 'Sarah Wilson',
      approvedDate: null,
      rejectionReason: 'Insufficient notice provided'
    },
    {
      id: 6,
      type: 'Sick Leave',
      startDate: '2023-10-15',
      endDate: '2023-10-16',
      days: 2,
      reason: 'Food poisoning',
      status: 'approved',
      submittedDate: '2023-10-15',
      approver: 'Sarah Wilson',
      approvedDate: '2023-10-16',
      rejectionReason: null
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Annual Leave':
        return 'bg-blue-100 text-blue-800'
      case 'Sick Leave':
        return 'bg-red-100 text-red-800'
      case 'Personal Leave':
        return 'bg-green-100 text-green-800'
      case 'Emergency Leave':
        return 'bg-orange-100 text-orange-800'
      case 'Maternity/Paternity':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredHistory = leaveHistory.filter(leave => {
    const matchesFilter = filter === 'all' || leave.status === filter
    const matchesSearch = leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leave.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = dateRange === 'all' || leave.startDate.startsWith(dateRange)
    return matchesFilter && matchesSearch && matchesDate
  })

  const yearlyStats = {
    totalDays: leaveHistory.filter(l => l.startDate.startsWith('2024') && l.status === 'approved').reduce((sum, l) => sum + l.days, 0),
    approved: leaveHistory.filter(l => l.startDate.startsWith('2024') && l.status === 'approved').length,
    pending: leaveHistory.filter(l => l.startDate.startsWith('2024') && l.status === 'pending').length,
    rejected: leaveHistory.filter(l => l.startDate.startsWith('2024') && l.status === 'rejected').length
  }

  const handleExport = () => {
    // Export logic here
    console.log('Exporting leave history...')
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave History</h1>
            <p className="text-gray-600">View your complete leave request history and status</p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export History
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{yearlyStats.totalDays}</div>
                <div className="text-sm text-gray-600">Total Days (2024)</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{yearlyStats.approved}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{yearlyStats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{yearlyStats.rejected}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by reason or leave type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Leave History Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Leave History ({filteredHistory.length} {filteredHistory.length === 1 ? 'record' : 'records'})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Dates</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Days</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Reason</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Approver</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((leave) => (
                    <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getTypeColor(leave.type)}`}>
                          {leave.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {new Date(leave.startDate).toLocaleDateString()}
                            {leave.startDate !== leave.endDate && 
                              ` - ${new Date(leave.endDate).toLocaleDateString()}`
                            }
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">
                          {leave.days} {leave.days === 1 ? 'day' : 'days'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs">
                          <p className="text-gray-900 truncate">{leave.reason}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(leave.status)}`}>
                            {getStatusIcon(leave.status)}
                            {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                          </span>
                          {leave.status === 'approved' && leave.approvedDate && (
                            <div className="text-xs text-green-600 mt-1">
                              Approved: {new Date(leave.approvedDate).toLocaleDateString()}
                            </div>
                          )}
                          {leave.status === 'rejected' && leave.rejectionReason && (
                            <div className="text-xs text-red-600 mt-1 max-w-xs">
                              Reason: {leave.rejectionReason}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-900">{leave.approver}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">
                          {new Date(leave.submittedDate).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredHistory.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No leave records found</p>
                  <p className="text-sm">Try adjusting your filters to see more results</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">2024 Monthly Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
              const monthNumber = String(index + 1).padStart(2, '0')
              const monthLeaves = leaveHistory.filter(l => 
                l.startDate.startsWith(`2024-${monthNumber}`) && l.status === 'approved'
              )
              const totalDays = monthLeaves.reduce((sum, l) => sum + l.days, 0)
              
              return (
                <div key={month} className="text-center p-3 border border-gray-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">{month}</div>
                  <div className="text-2xl font-bold text-primary-600 mt-1">{totalDays}</div>
                  <div className="text-xs text-gray-600">{totalDays === 1 ? 'day' : 'days'}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveHistoryPage
