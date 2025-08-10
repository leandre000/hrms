import React, { useState } from 'react'
import { Heart, Shield, DollarSign, Calendar, Users, TrendingUp, Plus, Eye, Edit, Search, Filter } from 'lucide-react'

const AdminBenefitsPage = () => {
  const [planFilter, setPlanFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const benefitPlans = [
    {
      id: 1,
      name: 'Health Insurance Premium',
      category: 'Health',
      provider: 'BlueCross BlueShield',
      type: 'Medical',
      employerContribution: 80,
      employeeContribution: 20,
      totalCost: 850,
      enrolledEmployees: 42,
      eligibleEmployees: 50,
      status: 'active',
      renewalDate: '2024-12-31',
      description: 'Comprehensive health coverage including medical, dental, and vision'
    },
    {
      id: 2,
      name: '401(k) Retirement Plan',
      category: 'Retirement',
      provider: 'Fidelity',
      type: 'Retirement',
      employerContribution: 50,
      employeeContribution: 50,
      totalCost: 0,
      enrolledEmployees: 38,
      eligibleEmployees: 50,
      status: 'active',
      renewalDate: '2024-12-31',
      description: 'Company matching up to 6% of salary with immediate vesting'
    },
    {
      id: 3,
      name: 'Life Insurance',
      category: 'Insurance',
      provider: 'MetLife',
      type: 'Life',
      employerContribution: 100,
      employeeContribution: 0,
      totalCost: 125,
      enrolledEmployees: 50,
      eligibleEmployees: 50,
      status: 'active',
      renewalDate: '2024-12-31',
      description: 'Basic life insurance coverage equal to 2x annual salary'
    },
    {
      id: 4,
      name: 'Dental Insurance',
      category: 'Health',
      provider: 'Delta Dental',
      type: 'Dental',
      employerContribution: 75,
      employeeContribution: 25,
      totalCost: 95,
      enrolledEmployees: 35,
      eligibleEmployees: 50,
      status: 'active',
      renewalDate: '2024-12-31',
      description: 'Comprehensive dental coverage including preventive and major services'
    },
    {
      id: 5,
      name: 'Flexible Spending Account',
      category: 'Health',
      provider: 'WageWorks',
      type: 'FSA',
      employerContribution: 0,
      employeeContribution: 100,
      totalCost: 0,
      enrolledEmployees: 22,
      eligibleEmployees: 50,
      status: 'active',
      renewalDate: '2024-12-31',
      description: 'Pre-tax savings for healthcare and dependent care expenses'
    }
  ]

  const categories = ['all', 'Health', 'Retirement', 'Insurance', 'Wellness']
  const statuses = ['all', 'active', 'pending', 'expired', 'suspended']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      case 'suspended':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Health':
        return <Heart className="w-5 h-5 text-red-500" />
      case 'Retirement':
        return <TrendingUp className="w-5 h-5 text-blue-500" />
      case 'Insurance':
        return <Shield className="w-5 h-5 text-green-500" />
      case 'Wellness':
        return <Users className="w-5 h-5 text-purple-500" />
      default:
        return <DollarSign className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredPlans = benefitPlans.filter(plan => {
    const matchesCategory = planFilter === 'all' || plan.category === planFilter
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter
    return matchesCategory && matchesStatus
  })

  const stats = {
    totalPlans: benefitPlans.length,
    activePlans: benefitPlans.filter(p => p.status === 'active').length,
    totalEnrolled: benefitPlans.reduce((sum, p) => sum + p.enrolledEmployees, 0),
    totalCost: benefitPlans.reduce((sum, p) => sum + (p.totalCost * p.enrolledEmployees), 0),
    averageParticipation: Math.round((benefitPlans.reduce((sum, p) => sum + (p.enrolledEmployees / p.eligibleEmployees), 0) / benefitPlans.length) * 100),
    employerContribution: benefitPlans.reduce((sum, p) => sum + (p.totalCost * p.enrolledEmployees * p.employerContribution / 100), 0)
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Benefits Administration</h1>
            <p className="text-gray-600">Manage employee benefit plans and enrollment</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Benefit Plan
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Calendar className="w-4 h-4" />
              Open Enrollment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.activePlans}</div>
                <div className="text-sm text-gray-600">Active Plans</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              {stats.totalPlans} total plans
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.averageParticipation}%</div>
                <div className="text-sm text-gray-600">Participation Rate</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {stats.totalEnrolled} total enrollments
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(stats.totalCost / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Total Monthly Cost</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              ${(stats.totalCost * 12 / 1000).toFixed(0)}K annually
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(stats.employerContribution / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Employer Contribution</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">
              {Math.round((stats.employerContribution / stats.totalCost) * 100)}% of total cost
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Benefits Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(plan.category)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.provider} • {plan.type}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                    {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Enrollment</div>
                  <div className="font-medium text-gray-900">{plan.enrolledEmployees}/{plan.eligibleEmployees}</div>
                  <div className="text-xs text-gray-500">
                    {Math.round((plan.enrolledEmployees / plan.eligibleEmployees) * 100)}% participation
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Monthly Cost</div>
                  <div className="font-medium text-gray-900">${plan.totalCost}/employee</div>
                  <div className="text-xs text-gray-500">
                    ${(plan.totalCost * plan.enrolledEmployees).toLocaleString()} total
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Cost Sharing</div>
                <div className="flex rounded-lg overflow-hidden h-3">
                  <div 
                    className="bg-blue-500" 
                    style={{ width: `${plan.employerContribution}%` }}
                    title={`Employer: ${plan.employerContribution}%`}
                  ></div>
                  <div 
                    className="bg-gray-300" 
                    style={{ width: `${plan.employeeContribution}%` }}
                    title={`Employee: ${plan.employeeContribution}%`}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Employer: {plan.employerContribution}%</span>
                  <span>Employee: {plan.employeeContribution}%</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Renewal: {new Date(plan.renewalDate).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors">
                      Manage Enrollment
                    </button>
                    <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors">
                      View Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Benefits Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Most Popular Benefits</h3>
              <div className="space-y-2">
                {benefitPlans
                  .sort((a, b) => (b.enrolledEmployees / b.eligibleEmployees) - (a.enrolledEmployees / a.eligibleEmployees))
                  .slice(0, 3)
                  .map((plan, index) => (
                    <div key={plan.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{plan.name}</span>
                      <span className="font-medium">{Math.round((plan.enrolledEmployees / plan.eligibleEmployees) * 100)}%</span>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Cost by Category</h3>
              <div className="space-y-2">
                {categories.slice(1).map((category) => {
                  const categoryPlans = benefitPlans.filter(p => p.category === category)
                  const categoryCost = categoryPlans.reduce((sum, p) => sum + (p.totalCost * p.enrolledEmployees), 0)
                  return (
                    <div key={category} className="flex justify-between text-sm">
                      <span className="text-gray-600">{category}</span>
                      <span className="font-medium">${categoryCost.toLocaleString()}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Upcoming Renewals</h3>
              <div className="space-y-2">
                {benefitPlans
                  .filter(p => new Date(p.renewalDate) <= new Date('2024-12-31'))
                  .map((plan) => (
                    <div key={plan.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{plan.name}</span>
                      <span className="font-medium">{new Date(plan.renewalDate).toLocaleDateString()}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBenefitsPage
