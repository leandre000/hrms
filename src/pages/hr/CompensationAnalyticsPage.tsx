import React, { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BarChart3, 
  PieChart,
  Download,
  Filter,
  Calendar,
  Target,
  Award,
  Building,
  AlertTriangle
} from 'lucide-react'

interface CompensationData {
  department: string
  avgSalary: number
  medianSalary: number
  minSalary: number
  maxSalary: number
  employeeCount: number
  budgetUtilization: number
  marketPosition: 'Above' | 'At' | 'Below'
}

interface SalaryRange {
  range: string
  count: number
  percentage: number
}

interface MarketComparison {
  position: string
  ourSalary: number
  marketSalary: number
  difference: number
  percentile: number
}

const CompensationAnalyticsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedYear, setSelectedYear] = useState(2024)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const compensationData: CompensationData[] = [
    {
      department: 'Engineering',
      avgSalary: 95000,
      medianSalary: 92000,
      minSalary: 75000,
      maxSalary: 140000,
      employeeCount: 45,
      budgetUtilization: 87.5,
      marketPosition: 'Above'
    },
    {
      department: 'Sales',
      avgSalary: 78000,
      medianSalary: 75000,
      minSalary: 60000,
      maxSalary: 120000,
      employeeCount: 32,
      budgetUtilization: 92.3,
      marketPosition: 'At'
    },
    {
      department: 'Marketing',
      avgSalary: 72000,
      medianSalary: 70000,
      minSalary: 55000,
      maxSalary: 95000,
      employeeCount: 28,
      budgetUtilization: 78.9,
      marketPosition: 'Below'
    },
    {
      department: 'HR',
      avgSalary: 68000,
      medianSalary: 65000,
      minSalary: 50000,
      maxSalary: 85000,
      employeeCount: 15,
      budgetUtilization: 85.2,
      marketPosition: 'At'
    }
  ]

  const salaryRanges: SalaryRange[] = [
    { range: '$50k - $60k', count: 25, percentage: 18.5 },
    { range: '$60k - $70k', count: 35, percentage: 25.9 },
    { range: '$70k - $80k', count: 28, percentage: 20.7 },
    { range: '$80k - $90k', count: 22, percentage: 16.3 },
    { range: '$90k - $100k', count: 15, percentage: 11.1 },
    { range: '$100k+', count: 10, percentage: 7.4 }
  ]

  const marketComparisons: MarketComparison[] = [
    {
      position: 'Software Engineer',
      ourSalary: 95000,
      marketSalary: 92000,
      difference: 3000,
      percentile: 75
    },
    {
      position: 'Sales Manager',
      ourSalary: 78000,
      marketSalary: 80000,
      difference: -2000,
      percentile: 45
    },
    {
      position: 'Marketing Specialist',
      ourSalary: 72000,
      marketSalary: 75000,
      difference: -3000,
      percentile: 35
    },
    {
      position: 'HR Manager',
      ourSalary: 68000,
      marketSalary: 70000,
      difference: -2000,
      percentile: 40
    }
  ]

  const overallMetrics = {
    totalBudget: 8500000,
    utilizedBudget: 7200000,
    avgCompanySalary: 78250,
    medianCompanySalary: 75000,
    totalEmployees: 135,
    budgetUtilization: 84.7,
    marketCompetitiveness: 78.5
  }

  const filteredData = selectedDepartment === 'all' 
    ? compensationData 
    : compensationData.filter(dept => dept.department === selectedDepartment)

  const getMarketPositionColor = (position: string) => {
    switch (position) {
      case 'Above': return 'text-green-600 bg-green-100'
      case 'At': return 'text-blue-600 bg-blue-100'
      case 'Below': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 75) return 'text-green-600'
    if (percentile >= 50) return 'text-blue-600'
    if (percentile >= 25) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compensation Analytics</h1>
          <p className="text-gray-600">Analyze compensation trends, market positioning, and budget utilization</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download size={20} />
            Export Report
          </button>
          <button className="btn-primary">
            <BarChart3 size={20} />
            Generate Insights
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {compensationData.map(dept => (
                <option key={dept.department} value={dept.department}>{dept.department}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {[2024, 2023, 2022].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">${(overallMetrics.totalBudget / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Budget Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{overallMetrics.budgetUtilization}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Company Salary</p>
              <p className="text-2xl font-bold text-gray-900">${overallMetrics.avgCompanySalary.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Market Competitiveness</p>
              <p className="text-2xl font-bold text-gray-900">{overallMetrics.marketCompetitiveness}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'departments', 'market', 'trends'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Distribution</h3>
                  <div className="space-y-3">
                    {salaryRanges.map((range) => (
                      <div key={range.range} className="flex items-center justify-between">
                        <span className="text-gray-600">{range.range}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full" 
                              style={{ width: `${range.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-12">{range.count}</span>
                          <span className="text-sm text-gray-500 w-12">{range.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Budget</span>
                      <span className="font-semibold">${overallMetrics.totalBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Utilized</span>
                      <span className="font-semibold text-green-600">${overallMetrics.utilizedBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Remaining</span>
                      <span className="font-semibold text-blue-600">${(overallMetrics.totalBudget - overallMetrics.utilizedBudget).toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${overallMetrics.budgetUtilization}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Engineering leads in compensation</p>
                    <p className="text-lg font-semibold text-blue-600">$95k average</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Marketing below market rate</p>
                    <p className="text-lg font-semibold text-yellow-600">$72k average</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Budget utilization optimal</p>
                    <p className="text-lg font-semibold text-green-600">84.7%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Median</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Range</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget Util.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Position</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((dept) => (
                      <tr key={dept.department} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Building className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="font-medium text-gray-900">{dept.department}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.employeeCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${dept.avgSalary.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${dept.medianSalary.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${dept.minSalary.toLocaleString()} - ${dept.maxSalary.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full" 
                                style={{ width: `${dept.budgetUtilization}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{dept.budgetUtilization}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMarketPositionColor(dept.marketPosition)}`}>
                            {dept.marketPosition}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Market Tab */}
          {activeTab === 'market' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Our Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentile</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {marketComparisons.map((comparison) => (
                      <tr key={comparison.position} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{comparison.position}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${comparison.ourSalary.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${comparison.marketSalary.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            comparison.difference >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {comparison.difference >= 0 ? '+' : ''}${comparison.difference.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${getPercentileColor(comparison.percentile)}`}>
                            {comparison.percentile}th
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Position Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Above Market</span>
                      <span className="font-semibold text-green-600">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">At Market</span>
                      <span className="font-semibold text-blue-600">50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Below Market</span>
                      <span className="font-semibold text-yellow-600">25%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Review Marketing compensation to align with market</p>
                    <p>• Consider Engineering premium to retain top talent</p>
                    <p>• Monitor Sales compensation for market alignment</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Growth Trends</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">2022 → 2023</span>
                      <span className="font-semibold text-green-600">+4.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">2023 → 2024</span>
                      <span className="font-semibold text-green-600">+3.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Projected 2025</span>
                      <span className="font-semibold text-blue-600">+4.0%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Trends</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">2022 Utilization</span>
                      <span className="font-semibold text-gray-900">82.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">2023 Utilization</span>
                      <span className="font-semibold text-gray-900">83.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">2024 Utilization</span>
                      <span className="font-semibold text-green-600">84.7%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Forecasting & Planning</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Expected Growth</p>
                    <p className="text-lg font-semibold text-blue-600">4.0%</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Budget Target</p>
                    <p className="text-lg font-semibold text-green-600">85%</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">New Hires</p>
                    <p className="text-lg font-semibold text-purple-600">15</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompensationAnalyticsPage
