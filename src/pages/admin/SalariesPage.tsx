import React, { useState } from 'react'
import { DollarSign, TrendingUp, Users, Edit, Plus, Search, Download, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react'

const SalariesPage = () => {
  const [showAdjustment, setShowAdjustment] = useState(false)
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const salaryData = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'John Doe',
      position: 'Senior Developer',
      department: 'Engineering',
      currentSalary: 95000,
      baseSalary: 90000,
      allowances: 3000,
      bonuses: 2000,
      lastReview: '2023-12-01',
      nextReview: '2024-12-01',
      performanceRating: 4.2,
      marketRate: 92000,
      status: 'current',
      salaryGrade: 'L5',
      hireDate: '2022-03-15'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Sarah Wilson',
      position: 'Engineering Manager',
      department: 'Engineering',
      currentSalary: 120000,
      baseSalary: 115000,
      allowances: 3000,
      bonuses: 2000,
      lastReview: '2023-11-15',
      nextReview: '2024-11-15',
      performanceRating: 4.5,
      marketRate: 118000,
      status: 'above_market',
      salaryGrade: 'M1',
      hireDate: '2021-03-15'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Michael Chen',
      position: 'Principal Engineer',
      department: 'Engineering',
      currentSalary: 140000,
      baseSalary: 135000,
      allowances: 3000,
      bonuses: 2000,
      lastReview: '2023-10-01',
      nextReview: '2024-10-01',
      performanceRating: 4.8,
      marketRate: 145000,
      status: 'below_market',
      salaryGrade: 'L6',
      hireDate: '2019-08-20'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Lisa Rodriguez',
      position: 'VP of People',
      department: 'Human Resources',
      currentSalary: 130000,
      baseSalary: 125000,
      allowances: 3000,
      bonuses: 2000,
      lastReview: '2023-09-01',
      nextReview: '2024-09-01',
      performanceRating: 4.6,
      marketRate: 128000,
      status: 'current',
      salaryGrade: 'VP1',
      hireDate: '2020-01-10'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'Alex Thompson',
      position: 'Junior Developer',
      department: 'Engineering',
      currentSalary: 70000,
      baseSalary: 68000,
      allowances: 1000,
      bonuses: 1000,
      lastReview: '2023-09-01',
      nextReview: '2024-09-01',
      performanceRating: 3.8,
      marketRate: 72000,
      status: 'below_market',
      salaryGrade: 'L2',
      hireDate: '2023-09-01'
    }
  ]

  const departments = ['all', 'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800'
      case 'below_market':
        return 'bg-red-100 text-red-800'
      case 'above_market':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <CheckCircle className="w-4 h-4" />
      case 'below_market':
        return <AlertTriangle className="w-4 h-4" />
      case 'above_market':
        return <TrendingUp className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const filteredSalaries = salaryData.filter(salary => {
    const matchesSearch = salary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salary.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salary.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === 'all' || salary.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const stats = {
    totalPayroll: salaryData.reduce((sum, emp) => sum + emp.currentSalary, 0),
    avgSalary: Math.round(salaryData.reduce((sum, emp) => sum + emp.currentSalary, 0) / salaryData.length),
    belowMarket: salaryData.filter(emp => emp.status === 'below_market').length,
    pendingReviews: salaryData.filter(emp => {
      const nextReview = new Date(emp.nextReview)
      const threeMonthsFromNow = new Date()
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
      return nextReview <= threeMonthsFromNow
    }).length
  }

  const salaryGrades = [
    { grade: 'L1', title: 'Entry Level', minSalary: 50000, maxSalary: 65000, employees: 3 },
    { grade: 'L2', title: 'Junior', minSalary: 65000, maxSalary: 80000, employees: 5 },
    { grade: 'L3', title: 'Mid Level', minSalary: 80000, maxSalary: 95000, employees: 8 },
    { grade: 'L4', title: 'Senior', minSalary: 95000, maxSalary: 110000, employees: 6 },
    { grade: 'L5', title: 'Senior II', minSalary: 110000, maxSalary: 130000, employees: 4 },
    { grade: 'L6', title: 'Principal', minSalary: 130000, maxSalary: 150000, employees: 2 },
    { grade: 'M1', title: 'Manager', minSalary: 115000, maxSalary: 140000, employees: 3 },
    { grade: 'VP1', title: 'VP Level', minSalary: 140000, maxSalary: 180000, employees: 2 }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Salary Management</h1>
            <p className="text-gray-600">Manage employee compensation and salary structures</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAdjustment(true)}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Salary Adjustment
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(stats.totalPayroll / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-600">Total Payroll</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${stats.avgSalary.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Average Salary</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.belowMarket}</div>
                <div className="text-sm text-gray-600">Below Market</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.pendingReviews}</div>
                <div className="text-sm text-gray-600">Pending Reviews</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Salary Grades */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Salary Grades</h2>
              <div className="space-y-3">
                {salaryGrades.map((grade) => (
                  <div key={grade.grade} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{grade.grade}</h3>
                        <p className="text-sm text-gray-600">{grade.title}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-500">{grade.employees} emp</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      ${grade.minSalary.toLocaleString()} - ${grade.maxSalary.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Salary Analysis</h2>
              <div className="space-y-4">
                {departments.slice(1).map((dept) => {
                  const deptEmployees = salaryData.filter(emp => emp.department === dept)
                  const deptTotal = deptEmployees.reduce((sum, emp) => sum + emp.currentSalary, 0)
                  const deptAvg = deptEmployees.length > 0 ? Math.round(deptTotal / deptEmployees.length) : 0
                  
                  return (
                    <div key={dept} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">{dept}</h3>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${(deptTotal / 1000).toFixed(0)}K</div>
                          <div className="text-sm text-gray-500">{deptEmployees.length} employees</div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Average: ${deptAvg.toLocaleString()}</span>
                        <span>% of Total: {((deptTotal / stats.totalPayroll) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${(deptTotal / stats.totalPayroll) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-0 focus:ring-0 p-0 text-sm placeholder-gray-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
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
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Market Comparison</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Grade</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Last Review</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Performance</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSalaries.map((salary) => (
                  <tr key={salary.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{salary.name}</div>
                        <div className="text-sm text-gray-500">{salary.position}</div>
                        <div className="text-sm text-gray-500">{salary.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-semibold text-gray-900">${salary.currentSalary.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">
                        Base: ${salary.baseSalary.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        + ${(salary.allowances + salary.bonuses).toLocaleString()} benefits
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(salary.status)}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(salary.status)}`}>
                          {salary.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Market: ${salary.marketRate.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Diff: {salary.currentSalary > salary.marketRate ? '+' : ''}
                        {((salary.currentSalary - salary.marketRate) / salary.marketRate * 100).toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                        {salary.salaryGrade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{new Date(salary.lastReview).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">
                        Next: {new Date(salary.nextReview).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              className={`w-4 h-4 ${star <= salary.performanceRating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">{salary.performanceRating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setShowAdjustment(true)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Adjust Salary"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Review">
                          <TrendingUp className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Salary Adjustment Modal */}
        {showAdjustment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Salary Adjustment</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select employee</option>
                        {salaryData.map((emp) => (
                          <option key={emp.id} value={emp.id}>{emp.name} - {emp.position}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Type</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="merit">Merit Increase</option>
                        <option value="promotion">Promotion</option>
                        <option value="market">Market Adjustment</option>
                        <option value="cost_of_living">Cost of Living</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Salary</label>
                      <input
                        type="number"
                        value="95000"
                        disabled
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Salary</label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter new salary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Review Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Justification</label>
                    <textarea
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter justification for salary adjustment"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Apply Adjustment
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAdjustment(false)}
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

export default SalariesPage
