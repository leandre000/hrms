import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, FileText, Calendar, Users, Clock } from 'lucide-react'

interface Contract {
  id: string
  title: string
  employeeName: string
  employeeId: string
  contractType: 'full-time' | 'part-time' | 'contractor' | 'intern'
  startDate: string
  endDate: string
  status: 'active' | 'expired' | 'pending' | 'terminated'
  department: string
  manager: string
  salary: number
  lastModified: string
}

const initialContracts: Contract[] = [
  {
    id: '1',
    title: 'Software Engineer Employment Contract',
    employeeName: 'John Smith',
    employeeId: 'EMP001',
    contractType: 'full-time',
    startDate: '2024-01-15',
    endDate: '2027-01-15',
    status: 'active',
    department: 'Engineering',
    manager: 'Sarah Johnson',
    salary: 85000,
    lastModified: '2024-01-15'
  },
  {
    id: '2',
    title: 'Marketing Specialist Contract',
    employeeName: 'Emily Davis',
    employeeId: 'EMP002',
    contractType: 'full-time',
    startDate: '2024-02-01',
    endDate: '2027-02-01',
    status: 'active',
    department: 'Marketing',
    manager: 'Michael Brown',
    salary: 65000,
    lastModified: '2024-02-01'
  },
  {
    id: '3',
    title: 'HR Intern Contract',
    employeeName: 'Alex Chen',
    employeeId: 'EMP003',
    contractType: 'intern',
    startDate: '2024-06-01',
    endDate: '2024-12-01',
    status: 'active',
    department: 'HR',
    manager: 'Lisa Rodriguez',
    salary: 25000,
    lastModified: '2024-06-01'
  },
  {
    id: '4',
    title: 'Sales Representative Contract',
    employeeName: 'David Wilson',
    employeeId: 'EMP004',
    contractType: 'full-time',
    startDate: '2023-08-01',
    endDate: '2026-08-01',
    status: 'active',
    department: 'Sales',
    manager: 'Robert Taylor',
    salary: 70000,
    lastModified: '2023-08-01'
  }
]

const ContractsPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>(initialContracts)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [editingContract, setEditingContract] = useState<Contract | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredContracts = contracts.filter(contract =>
    (selectedStatus === 'all' || contract.status === selectedStatus) &&
    (selectedType === 'all' || contract.contractType === selectedType) &&
    (contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contract.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contract.department.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleAddContract = (newContract: Omit<Contract, 'id'>) => {
    const contract: Contract = {
      ...newContract,
      id: Date.now().toString(),
      lastModified: new Date().toISOString().split('T')[0]
    }
    setContracts([...contracts, contract])
    setShowAddModal(false)
  }

  const handleUpdateContract = (updatedContract: Contract) => {
    setContracts(contracts.map(c => c.id === updatedContract.id ? updatedContract : c))
    setShowAddModal(false)
    setEditingContract(null)
  }

  const handleDeleteContract = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      setContracts(contracts.filter(c => c.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'terminated': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-blue-100 text-blue-800'
      case 'part-time': return 'bg-purple-100 text-purple-800'
      case 'contractor': return 'bg-orange-100 text-orange-800'
      case 'intern': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = [
    { title: 'Total Contracts', value: contracts.length, icon: FileText, color: 'text-blue-600' },
    { title: 'Active Contracts', value: contracts.filter(c => c.status === 'active').length, icon: Users, color: 'text-green-600' },
    { title: 'Expiring Soon', value: contracts.filter(c => {
      const endDate = new Date(c.endDate)
      const today = new Date()
      const diffTime = endDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 90 && diffDays > 0
    }).length, icon: Clock, color: 'text-yellow-600' },
    { title: 'Total Value', value: `$${contracts.reduce((sum, c) => sum + c.salary, 0).toLocaleString()}`, icon: Calendar, color: 'text-purple-600' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contracts Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contract
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
            <option value="terminated">Terminated</option>
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contractor">Contractor</option>
            <option value="intern">Intern</option>
          </select>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{contract.title}</div>
                      <div className="text-sm text-gray-500">{contract.department}</div>
                      <div className="text-sm text-gray-500">Manager: {contract.manager}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contract.employeeName}</div>
                    <div className="text-sm text-gray-500">ID: {contract.employeeId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(contract.contractType)}`}>
                      {contract.contractType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.startDate}</div>
                    <div className="text-sm text-gray-500">to {contract.endDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${contract.salary.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingContract(contract)
                        setShowAddModal(true)
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteContract(contract.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingContract ? 'Edit Contract' : 'Add New Contract'}
              </h3>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const newContract = {
                  title: formData.get('title') as string,
                  employeeName: formData.get('employeeName') as string,
                  employeeId: formData.get('employeeId') as string,
                  contractType: formData.get('contractType') as 'full-time' | 'part-time' | 'contractor' | 'intern',
                  startDate: formData.get('startDate') as string,
                  endDate: formData.get('endDate') as string,
                  status: formData.get('status') as 'active' | 'expired' | 'pending' | 'terminated',
                  department: formData.get('department') as string,
                  manager: formData.get('manager') as string,
                  salary: parseFloat(formData.get('salary') as string),
                  lastModified: new Date().toISOString().split('T')[0]
                }
                
                if (editingContract) {
                  handleUpdateContract({ ...editingContract, ...newContract, lastModified: new Date().toISOString().split('T')[0] })
                } else {
                  handleAddContract(newContract)
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contract Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingContract?.title}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                    <input
                      type="text"
                      name="employeeName"
                      defaultValue={editingContract?.employeeName}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <input
                      type="text"
                      name="employeeId"
                      defaultValue={editingContract?.employeeId}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contract Type</label>
                    <select
                      name="contractType"
                      defaultValue={editingContract?.contractType || 'full-time'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contractor">Contractor</option>
                      <option value="intern">Intern</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        defaultValue={editingContract?.startDate}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        defaultValue={editingContract?.endDate}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      defaultValue={editingContract?.status || 'active'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="expired">Expired</option>
                      <option value="pending">Pending</option>
                      <option value="terminated">Terminated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <input
                      type="text"
                      name="department"
                      defaultValue={editingContract?.department}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Manager</label>
                    <input
                      type="text"
                      name="manager"
                      defaultValue={editingContract?.manager}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      defaultValue={editingContract?.salary}
                      required
                      min="0"
                      step="0.01"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingContract(null)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {editingContract ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContractsPage
