import React, { useState } from 'react'
import { 
  DollarSign, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  Plus,
  Search,
  Filter,
  Calendar,
  Calculator,
  Shield,
  BarChart3
} from 'lucide-react'

interface TaxRecord {
  id: string
  employeeId: string
  employeeName: string
  taxYear: number
  taxType: 'Federal' | 'State' | 'Local' | 'Social Security' | 'Medicare'
  grossIncome: number
  taxableIncome: number
  taxAmount: number
  status: 'Pending' | 'Filed' | 'Approved' | 'Rejected'
  dueDate: string
  filedDate?: string
  notes?: string
}

interface TaxReport {
  id: string
  name: string
  type: 'Quarterly' | 'Annual' | 'Monthly'
  period: string
  status: 'Draft' | 'Ready' | 'Filed' | 'Approved'
  dueDate: string
  filedDate?: string
  totalAmount: number
}

const TaxManagementPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data
  const taxRecords: TaxRecord[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      taxYear: 2024,
      taxType: 'Federal',
      grossIncome: 75000,
      taxableIncome: 65000,
      taxAmount: 12500,
      status: 'Filed',
      dueDate: '2024-04-15',
      filedDate: '2024-04-10',
      notes: 'Filed electronically'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Sarah Johnson',
      taxYear: 2024,
      taxType: 'Federal',
      grossIncome: 82000,
      taxableIncome: 72000,
      taxAmount: 13800,
      status: 'Pending',
      dueDate: '2024-04-15',
      notes: 'Awaiting W-2 verification'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'Michael Brown',
      taxYear: 2024,
      taxType: 'State',
      grossIncome: 68000,
      taxableIncome: 58000,
      taxAmount: 2900,
      status: 'Approved',
      dueDate: '2024-04-15',
      filedDate: '2024-04-05'
    }
  ]

  const taxReports: TaxReport[] = [
    {
      id: '1',
      name: 'Q1 2024 Federal Tax Report',
      type: 'Quarterly',
      period: 'Q1 2024',
      status: 'Filed',
      dueDate: '2024-04-30',
      filedDate: '2024-04-25',
      totalAmount: 125000
    },
    {
      id: '2',
      name: 'Q1 2024 State Tax Report',
      type: 'Quarterly',
      period: 'Q1 2024',
      status: 'Ready',
      dueDate: '2024-04-30',
      totalAmount: 45000
    },
    {
      id: '3',
      name: 'Annual 2023 Tax Summary',
      type: 'Annual',
      period: '2023',
      status: 'Approved',
      dueDate: '2024-03-15',
      filedDate: '2024-03-10',
      totalAmount: 485000
    }
  ]

  const taxSummary = {
    totalTaxes: 29200,
    federalTaxes: 26300,
    stateTaxes: 2900,
    pendingAmount: 13800,
    filedAmount: 15400,
    complianceRate: 92.5
  }

  const filteredRecords = taxRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = record.taxYear === selectedYear
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus
    
    return matchesSearch && matchesYear && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Filed': return 'bg-blue-100 text-blue-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800'
      case 'Ready': return 'bg-blue-100 text-blue-800'
      case 'Filed': return 'bg-yellow-100 text-yellow-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tax Management</h1>
          <p className="text-gray-600">Manage employee tax records, reporting, and compliance</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download size={20} />
            Export Data
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Tax Record
          </button>
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
              <p className="text-sm font-medium text-gray-600">Total Taxes</p>
              <p className="text-2xl font-bold text-gray-900">${taxSummary.totalTaxes.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-gray-900">${taxSummary.pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{taxSummary.complianceRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tax Year</p>
              <p className="text-2xl font-bold text-gray-900">{selectedYear}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'records', 'reports', 'compliance'].map((tab) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Federal Taxes</span>
                      <span className="font-semibold">${taxSummary.federalTaxes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">State Taxes</span>
                      <span className="font-semibold">${taxSummary.stateTaxes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Local Taxes</span>
                      <span className="font-semibold">$0</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Filed</span>
                      <span className="font-semibold text-green-600">${taxSummary.filedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-semibold text-yellow-600">${taxSummary.pendingAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overdue</span>
                      <span className="font-semibold text-red-600">$0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {taxReports
                    .filter(report => report.status === 'Ready' || report.status === 'Draft')
                    .slice(0, 5)
                    .map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{report.name}</p>
                          <p className="text-sm text-gray-600">Due: {report.dueDate}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getReportStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Records Tab */}
          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search employees or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {[2024, 2023, 2022].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Filed">Filed</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Income</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                            <div className="text-sm text-gray-500">{record.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{record.taxType}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">${record.grossIncome.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">${record.taxAmount.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{record.dueDate}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                          <button className="text-gray-600 hover:text-gray-900">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Tax Reports</h3>
                <button className="btn-primary">
                  <Plus size={20} />
                  New Report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taxReports.map((report) => (
                  <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getReportStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{report.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{report.period}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{report.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">{report.dueDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">${report.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Overall Compliance</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${taxSummary.complianceRate}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{taxSummary.complianceRate}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Federal Compliance</span>
                        <span className="text-green-600 font-medium">✓ Compliant</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">State Compliance</span>
                        <span className="text-green-600 font-medium">✓ Compliant</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Local Compliance</span>
                        <span className="text-green-600 font-medium">✓ Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-700">Low Risk</span>
                      <span className="text-sm font-medium text-green-600">85%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm text-gray-700">Medium Risk</span>
                      <span className="text-sm font-medium text-yellow-600">12%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="text-sm text-gray-700">High Risk</span>
                      <span className="text-sm font-medium text-red-600">3%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Compliance Activities</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Q1 2024 Federal Tax Report filed successfully</span>
                    <span className="ml-auto text-xs text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">State tax compliance audit completed</span>
                    <span className="ml-auto text-xs text-gray-500">1 week ago</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">3 tax records pending review</span>
                    <span className="ml-auto text-xs text-gray-500">2 weeks ago</span>
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

export default TaxManagementPage
