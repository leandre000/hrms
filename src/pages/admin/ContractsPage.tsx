import React, { useState } from 'react'
import { FileText, Calendar, User, DollarSign, AlertCircle, CheckCircle, Clock, Eye, Edit, Plus, Search } from 'lucide-react'

const ContractsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const contracts = [
    {
      id: 1,
      employeeName: 'John Doe',
      contractType: 'Full-time Employment',
      startDate: '2022-03-15',
      endDate: null,
      salary: 95000,
      status: 'active',
      department: 'Engineering',
      signedDate: '2022-03-10',
      renewalDate: '2025-03-15'
    },
    {
      id: 2,
      employeeName: 'Sarah Wilson',
      contractType: 'Management Agreement',
      startDate: '2021-03-15',
      endDate: null,
      salary: 120000,
      status: 'active',
      department: 'Engineering',
      signedDate: '2021-03-10',
      renewalDate: '2024-03-15'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contract Management</h1>
            <p className="text-gray-600">Manage employee contracts and agreements</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Contract
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{contracts.filter(c => c.status === 'active').length}</div>
                <div className="text-sm text-gray-600">Active Contracts</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Expiring Soon</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(contracts.reduce((sum, c) => sum + c.salary, 0) / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Total Contract Value</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{contracts.length}</div>
                <div className="text-sm text-gray-600">Total Contracts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Contract Type</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Duration</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Salary</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{contract.employeeName}</div>
                      <div className="text-sm text-gray-500">{contract.department}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{contract.contractType}</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{new Date(contract.startDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">
                        {contract.endDate ? `to ${new Date(contract.endDate).toLocaleDateString()}` : 'Permanent'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">${contract.salary.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                        {contract.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
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

export default ContractsPage
