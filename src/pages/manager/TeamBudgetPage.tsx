import React, { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  PieChart,
  BarChart3,
  Download
} from 'lucide-react'

interface BudgetItem {
  id: string
  category: string
  description: string
  allocated: number
  spent: number
  remaining: number
  status: 'on-track' | 'over-budget' | 'under-budget'
  period: string
  department: string
  lastUpdated: string
}

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
  employee: string
  status: 'pending' | 'approved' | 'rejected'
  receipt?: string
  notes?: string
}

const mockBudgetItems: BudgetItem[] = [
  {
    id: '1',
    category: 'Personnel',
    description: 'Team salaries and benefits',
    allocated: 500000,
    spent: 320000,
    remaining: 180000,
    status: 'on-track',
    period: 'Q1 2024',
    department: 'Engineering',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    category: 'Training & Development',
    description: 'Professional development programs',
    allocated: 50000,
    spent: 35000,
    remaining: 15000,
    status: 'on-track',
    period: 'Q1 2024',
    department: 'Engineering',
    lastUpdated: '2024-01-20'
  },
  {
    id: '3',
    category: 'Equipment & Software',
    description: 'Hardware and software licenses',
    allocated: 75000,
    spent: 80000,
    remaining: -5000,
    status: 'over-budget',
    period: 'Q1 2024',
    department: 'Engineering',
    lastUpdated: '2024-01-25'
  },
  {
    id: '4',
    category: 'Travel & Events',
    description: 'Conference attendance and team events',
    allocated: 25000,
    spent: 15000,
    remaining: 10000,
    status: 'under-budget',
    period: 'Q1 2024',
    department: 'Engineering',
    lastUpdated: '2024-01-18'
  },
  {
    id: '5',
    category: 'Office Supplies',
    description: 'General office materials',
    allocated: 10000,
    spent: 8000,
    remaining: 2000,
    status: 'on-track',
    period: 'Q1 2024',
    department: 'Engineering',
    lastUpdated: '2024-01-22'
  }
]

const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'AWS Cloud Services - January',
    amount: 2500,
    category: 'Infrastructure',
    date: '2024-01-31',
    employee: 'Sarah Johnson',
    status: 'approved',
    notes: 'Monthly cloud hosting costs'
  },
  {
    id: '2',
    description: 'Team Building Event',
    amount: 1200,
    category: 'Team Events',
    date: '2024-01-25',
    employee: 'Mike Chen',
    status: 'approved',
    notes: 'Quarterly team bonding activity'
  },
  {
    id: '3',
    description: 'Adobe Creative Suite Licenses',
    amount: 800,
    category: 'Software',
    date: '2024-01-20',
    employee: 'Emily Davis',
    status: 'pending',
    notes: 'Design team software renewal'
  },
  {
    id: '4',
    description: 'Conference Registration - TechCrunch',
    amount: 1500,
    category: 'Professional Development',
    date: '2024-01-15',
    employee: 'David Wilson',
    status: 'approved',
    notes: 'Industry conference attendance'
  },
  {
    id: '5',
    description: 'Office Furniture',
    amount: 3000,
    category: 'Equipment',
    date: '2024-01-10',
    employee: 'Lisa Brown',
    status: 'rejected',
    notes: 'New ergonomic chairs for team'
  }
]

const TeamBudgetPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'expenses'>('overview')

  const filteredBudgetItems = mockBudgetItems.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredExpenses = mockExpenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800'
      case 'over-budget': return 'bg-red-100 text-red-800'
      case 'under-budget': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getExpenseStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const totalAllocated = mockBudgetItems.reduce((sum, item) => sum + item.allocated, 0)
  const totalSpent = mockBudgetItems.reduce((sum, item) => sum + item.spent, 0)
  const totalRemaining = mockBudgetItems.reduce((sum, item) => sum + item.remaining, 0)
  const utilizationRate = (totalSpent / totalAllocated) * 100

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Budget</h1>
          <p className="text-gray-600">Manage team budget, track expenses, and monitor financial performance</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Budget Item
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Allocated</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalAllocated)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalSpent)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {formatCurrency(totalRemaining)}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Utilization</p>
              <p className="text-2xl font-bold text-purple-600">{utilizationRate.toFixed(1)}%</p>
            </div>
            <PieChart className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'budget'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Budget Items
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'expenses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Expenses
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Filters and Search */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search budget items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Personnel">Personnel</option>
                <option value="Training & Development">Training & Development</option>
                <option value="Equipment & Software">Equipment & Software</option>
                <option value="Travel & Events">Travel & Events</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="on-track">On Track</option>
                <option value="over-budget">Over Budget</option>
                <option value="under-budget">Under Budget</option>
              </select>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Budget Summary Chart */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockBudgetItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{item.category}</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Allocated:</span>
                          <span className="font-medium">{formatCurrency(item.allocated)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Spent:</span>
                          <span className="font-medium">{formatCurrency(item.spent)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Remaining:</span>
                          <span className={`font-medium ${item.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(item.remaining)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${item.spent > item.allocated ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min((item.spent / item.allocated) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Expenses */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockExpenses.slice(0, 5).map((expense) => (
                        <tr key={expense.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(expense.amount)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getExpenseStatusColor(expense.status)}`}>
                              {expense.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(expense.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBudgetItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.allocated)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.spent)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${item.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(item.remaining)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(expense.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.employee}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getExpenseStatusColor(expense.status)}`}>
                          {expense.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamBudgetPage
