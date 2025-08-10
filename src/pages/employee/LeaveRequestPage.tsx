import React, { useState } from 'react'
import { Calendar, Plus, Clock, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

const LeaveRequestPage = () => {
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [newRequest, setNewRequest] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    halfDay: false,
    halfDayPeriod: 'morning'
  })

  // Mock leave balances
  const leaveBalances = [
    { type: 'Annual Leave', available: 18, used: 7, total: 25, color: 'bg-blue-500' },
    { type: 'Sick Leave', available: 8, used: 2, total: 10, color: 'bg-red-500' },
    { type: 'Personal Leave', available: 3, used: 2, total: 5, color: 'bg-green-500' },
    { type: 'Maternity/Paternity', available: 90, used: 0, total: 90, color: 'bg-purple-500' }
  ]

  // Mock recent requests
  const recentRequests = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      days: 3,
      reason: 'Family vacation',
      status: 'pending',
      submittedDate: '2024-01-15',
      approver: 'Sarah Wilson'
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
      approvedDate: '2024-01-09'
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
      approvedDate: '2024-01-03'
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

  const calculateDays = () => {
    if (!newRequest.startDate || !newRequest.endDate) return 0
    const start = new Date(newRequest.startDate)
    const end = new Date(newRequest.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return newRequest.halfDay ? 0.5 : diffDays
  }

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit leave request logic here
    console.log('Submitting leave request:', newRequest)
    setShowNewRequest(false)
    setNewRequest({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      halfDay: false,
      halfDayPeriod: 'morning'
    })
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Request Leave</h1>
            <p className="text-gray-600">Submit new leave requests and track their status</p>
          </div>
          <button
            onClick={() => setShowNewRequest(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Leave Request
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leave Balances */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Balances</h2>
              <div className="space-y-4">
                {leaveBalances.map((balance, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-900">{balance.type}</h3>
                      <span className="text-sm text-gray-600">{balance.available}/{balance.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`${balance.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${(balance.available / balance.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Used: {balance.used}</span>
                      <span>Available: {balance.available}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Requests</span>
                  <span className="font-semibold text-yellow-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Approved This Month</span>
                  <span className="font-semibold text-green-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Days Off This Month</span>
                  <span className="font-semibold text-primary-600">3.5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h2>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{request.type}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{request.reason}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(request.startDate).toLocaleDateString()} 
                              {request.startDate !== request.endDate && 
                                ` - ${new Date(request.endDate).toLocaleDateString()}`
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{request.days} {request.days === 1 ? 'day' : 'days'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-3 text-sm text-gray-600">
                      <div className="flex justify-between items-center">
                        <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                        <span>Approver: {request.approver}</span>
                      </div>
                      {request.approvedDate && (
                        <div className="mt-1 text-green-600">
                          Approved: {new Date(request.approvedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* New Request Modal */}
        {showNewRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">New Leave Request</h2>
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                    <select
                      required
                      value={newRequest.leaveType}
                      onChange={(e) => setNewRequest({...newRequest, leaveType: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select leave type</option>
                      <option value="Annual Leave">Annual Leave</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Personal Leave">Personal Leave</option>
                      <option value="Emergency Leave">Emergency Leave</option>
                      <option value="Maternity/Paternity">Maternity/Paternity Leave</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="halfDay"
                      checked={newRequest.halfDay}
                      onChange={(e) => setNewRequest({...newRequest, halfDay: e.target.checked})}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="halfDay" className="text-sm font-medium text-gray-700">
                      Half Day Leave
                    </label>
                  </div>

                  {newRequest.halfDay && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Half Day Period</label>
                      <select
                        value={newRequest.halfDayPeriod}
                        onChange={(e) => setNewRequest({...newRequest, halfDayPeriod: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="morning">Morning (First Half)</option>
                        <option value="afternoon">Afternoon (Second Half)</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={newRequest.startDate}
                      onChange={(e) => setNewRequest({...newRequest, startDate: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {!newRequest.halfDay && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        required={!newRequest.halfDay}
                        value={newRequest.endDate}
                        onChange={(e) => setNewRequest({...newRequest, endDate: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {calculateDays() > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-800">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Total Days: {calculateDays()} {calculateDays() === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <textarea
                      required
                      rows={3}
                      value={newRequest.reason}
                      onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                      placeholder="Please provide a reason for your leave request..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2 text-yellow-800">
                      <AlertCircle className="w-4 h-4 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Important Notes:</p>
                        <ul className="mt-1 space-y-1 text-xs">
                          <li>• Leave requests should be submitted at least 48 hours in advance</li>
                          <li>• Emergency leave can be submitted retroactively with manager approval</li>
                          <li>• Check your leave balance before submitting</li>
                        </ul>
                      </div>
                    </div>
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
      </div>
    </div>
  )
}

export default LeaveRequestPage
