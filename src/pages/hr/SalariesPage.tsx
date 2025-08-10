import React, { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Search, Edit, Eye } from 'lucide-react'

const SalariesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  const salaryData = [
    {
      id: 'EMP001',
      name: 'John Doe',
      position: 'Senior Developer',
      department: 'Engineering',
      currentSalary: 95000,
      previousSalary: 85000,
      lastReview: '2024-01-15',
      nextReview: '2024-07-15',
      marketRate: 105000,
      performance: 4.5,
      status: 'Current'
    },
    {
      id: 'EMP002',
      name: 'Jane Smith',
      position: 'Marketing Manager',
      department: 'Marketing',
      currentSalary: 78000,
      previousSalary: 72000,
      lastReview: '2023-12-01',
      nextReview: '2024-06-01',
      marketRate: 82000,
      performance: 4.2,
      status: 'Due for Review'
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      position: 'Sales Director',
      department: 'Sales',
      currentSalary: 110000,
      previousSalary: 100000,
      lastReview: '2024-01-01',
      nextReview: '2024-07-01',
      marketRate: 115000,
      performance: 4.8,
      status: 'Current'
    },
    {
      id: 'EMP004',
      name: 'Sarah Wilson',
      position: 'Engineering Manager',
      department: 'Engineering',
      currentSalary: 120000,
      previousSalary: 110000,
      lastReview: '2023-11-15',
      nextReview: '2024-05-15',
      marketRate: 125000,
      performance: 4.6,
      status: 'Below Market'
    }
  ]

  const departments = ['all', ...new Set(salaryData.map(emp => emp.department))]

  const filteredData = salaryData.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800'
      case 'Due for Review': return 'bg-yellow-100 text-yellow-800'
      case 'Below Market': return 'bg-red-100 text-red-800'
      case 'Above Market': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSalaryTrend = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    }
    return <div className="w-4 h-4"></div>
  }

  const getMarketComparison = (current: number, market: number) => {
    const difference = ((current - market) / market) * 100
    return {
      percentage: Math.abs(difference).toFixed(1),
      status: difference > 0 ? 'above' : difference < 0 ? 'below' : 'equal',
      color: difference > 0 ? 'text-blue-600' : difference < 0 ? 'text-red-600' : 'text-green-600'
    }
  }

  const salaryStats = {
    totalBudget: salaryData.reduce((sum, emp) => sum + emp.currentSalary, 0),
    averageSalary: salaryData.reduce((sum, emp) => sum + emp.currentSalary, 0) / salaryData.length,
    recentIncreases: salaryData.filter(emp => emp.currentSalary > emp.previousSalary).length,
    dueForReview: salaryData.filter(emp => emp.status === 'Due for Review').length
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Salary Management</h1>
          <p className="text-gray-600">Manage employee compensation and salary reviews</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-gray-900">Total Budget</h3>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              ${salaryStats.totalBudget.toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Average Salary</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${Math.round(salaryStats.averageSalary).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">Recent Increases</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {salaryStats.recentIncreases}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium text-gray-900">Due for Review</h3>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {salaryStats.dueForReview}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Salary Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Current Salary</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Market Rate</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Performance</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Next Review</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((employee) => {
                  const marketComp = getMarketComparison(employee.currentSalary, employee.marketRate)
                  
                  return (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.position}</div>
                          <div className="text-sm text-gray-500">{employee.department}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            ${employee.currentSalary.toLocaleString()}
                          </span>
                          {getSalaryTrend(employee.currentSalary, employee.previousSalary)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Previous: ${employee.previousSalary.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          ${employee.marketRate.toLocaleString()}
                        </div>
                        <div className={`text-sm ${marketComp.color}`}>
                          {marketComp.percentage}% {marketComp.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{employee.performance}/5.0</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {new Date(employee.nextReview).toLocaleDateString()}
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
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalariesPage
