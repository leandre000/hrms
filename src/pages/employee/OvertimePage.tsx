import React, { useState } from 'react'
import { Clock, Plus, Calendar, DollarSign, FileText, Filter, Search } from 'lucide-react'

const OvertimePage = () => {
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [newRequest, setNewRequest] = useState({
    date: '',
    startTime: '',
    endTime: '',
    reason: '',
    description: ''
  })

  // Mock overtime requests data
  const overtimeRequests = [
    {
      id: 1,
      date: '2024-01-15',
      startTime: '18:00',
      endTime: '21:00',
      hours: 3,
      reason: 'Project Deadline',
      description: 'Working on critical bug fixes for production release',
      status: 'approved',
      approvedBy: 'Sarah Wilson',
      submittedDate: '2024-01-14',
      rate: 1.5,
      amount: 135
    },
    {
      id: 2,
      date: '2024-01-12',
      startTime: '17:30',
      endTime: '20:00',
      hours: 2.5,
      reason: 'Client Request',
      description: 'Urgent client customization requirements',
      status: 'pending',
      approvedBy: null,
      submittedDate: '2024-01-12',
      rate: 1.5,
      amount: 112.5
    },
    {
      id: 3,
      date: '2024-01-08',
      startTime: '19:00',
      endTime: '22:30',
      hours: 3.5,
      reason: 'System Maintenance',
      description: 'Database migration and server updates',
      status: 'rejected',
      approvedBy: 'Sarah Wilson',
      submittedDate: '2024-01-07',
      rate: 1.5,
      amount: 157.5,
      rejectionReason: 'Not pre-approved by manager'
    },
    {
      id: 4,
      date: '2024-01-05',
      startTime: '16:00',
      endTime: '19:00',
      hours: 3,
      reason: 'Training Session',
      description: 'Conducting training for new team members',
      status: 'approved',
      approvedBy: 'Sarah Wilson',
      submittedDate: '2024-01-04',
      rate: 1.5,
      amount: 135
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

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit overtime request logic here
    console.log('Submitting overtime request:', newRequest)
    setShowNewRequest(false)
    setNewRequest({
      date: '',
      startTime: '',
      endTime: '',
      reason: '',
      description: ''
    })
  }

  const filteredRequests = overtimeRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter
    const matchesSearch = request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalStats = {
    totalHours: overtimeRequests.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.hours, 0),
    totalAmount: overtimeRequests.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.amount, 0),
    pendingRequests: overtimeRequests.filter(r => r.status === 'pending').length,
    thisMonth: overtimeRequests.filter(r => r.date.startsWith('2024-01')).reduce((sum, r) => sum + (r.status === 'approved' ? r.hours : 0), 0)
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Overtime Requests</h1>
            <p className="text-gray-600">Submit and track your overtime work requests</p>
          </div>
          <button
            onClick={() => setShowNewRequest(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Request
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalStats.totalHours}</div>
                <div className="text-sm text-gray-600">Total Approved Hours</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${totalStats.totalAmount}</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalStats.pendingRequests}</div>
                <div className="text-sm text-gray-600">Pending Requests</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalStats.thisMonth}</div>
                <div className="text-sm text-gray-600">This Month Hours</div>
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by reason or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* New Request Modal */}
        {showNewRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">New Overtime Request</h2>
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newRequest.date}
                      onChange={(e) => setNewRequest({...newRequest, date: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <input
                        type="time"
                        required
                        value={newRequest.startTime}
                        onChange={(e) => setNewRequest({...newRequest, startTime: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <input
                        type="time"
                        required
                        value={newRequest.endTime}
                        onChange={(e) => setNewRequest({...newRequest, endTime: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <select
                      required
                      value={newRequest.reason}
                      onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a reason</option>
                      <option value="Project Deadline">Project Deadline</option>
                      <option value="Client Request">Client Request</option>
                      <option value="System Maintenance">System Maintenance</option>
                      <option value="Training Session">Training Session</option>
                      <option value="Emergency Support">Emergency Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newRequest.description}
                      onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                      placeholder="Provide details about the overtime work..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewRequest(false)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Requests List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overtime Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Hours</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Reason</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {new Date(request.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {request.startTime} - {request.endTime}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {request.hours}h
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{request.reason}</div>
                          <div className="text-sm text-gray-600 truncate max-w-xs">
                            {request.description}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                        {request.status === 'rejected' && request.rejectionReason && (
                          <div className="text-xs text-red-600 mt-1">
                            {request.rejectionReason}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {request.status === 'approved' ? (
                          <span className="font-medium text-green-600">${request.amount}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredRequests.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No overtime requests found</p>
                  <p className="text-sm">Submit your first overtime request to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OvertimePage
