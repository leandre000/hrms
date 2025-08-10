import React, { useState } from 'react'
import { FileText, Download, Calendar, DollarSign, Users, TrendingUp, BarChart3, Filter, Eye, RefreshCw } from 'lucide-react'

const TaxReportsPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedQuarter, setSelectedQuarter] = useState('Q1')
  const [reportType, setReportType] = useState('all')

  const taxReports = [
    {
      id: 1,
      name: 'Form 941 - Quarterly Federal Tax Return',
      type: 'quarterly',
      period: '2024 Q1',
      status: 'completed',
      dueDate: '2024-04-30',
      submittedDate: '2024-04-25',
      totalTaxes: 125000,
      employeeCount: 45,
      description: 'Quarterly report of federal income taxes and FICA taxes withheld'
    },
    {
      id: 2,
      name: 'Form W-2 - Wage and Tax Statement',
      type: 'annual',
      period: '2023',
      status: 'completed',
      dueDate: '2024-01-31',
      submittedDate: '2024-01-28',
      totalTaxes: 485000,
      employeeCount: 42,
      description: 'Annual wage and tax statement for all employees'
    },
    {
      id: 3,
      name: 'Form 940 - Federal Unemployment Tax',
      type: 'annual',
      period: '2023',
      status: 'completed',
      dueDate: '2024-01-31',
      submittedDate: '2024-01-30',
      totalTaxes: 15600,
      employeeCount: 42,
      description: 'Annual federal unemployment tax return'
    },
    {
      id: 4,
      name: 'State Quarterly Tax Report',
      type: 'quarterly',
      period: '2024 Q1',
      status: 'pending',
      dueDate: '2024-04-30',
      submittedDate: null,
      totalTaxes: 45000,
      employeeCount: 45,
      description: 'State income tax withholding and unemployment insurance'
    },
    {
      id: 5,
      name: 'Local Tax Report',
      type: 'monthly',
      period: 'March 2024',
      status: 'overdue',
      dueDate: '2024-04-15',
      submittedDate: null,
      totalTaxes: 8500,
      employeeCount: 45,
      description: 'Local municipality tax withholding report'
    }
  ]

  const taxSummary = {
    federalWithheld: 285000,
    stateWithheld: 125000,
    ficaWithheld: 95000,
    medicareWithheld: 22000,
    unemploymentTax: 15600,
    totalWithheld: 542600
  }

  const reportTypes = ['all', 'quarterly', 'annual', 'monthly']
  const years = ['2024', '2023', '2022', '2021']
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FileText className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Calendar className="w-4 h-4 text-yellow-600" />
      case 'overdue':
        return <RefreshCw className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredReports = taxReports.filter(report => {
    const matchesType = reportType === 'all' || report.type === reportType
    const matchesYear = report.period.includes(selectedYear)
    return matchesType && matchesYear
  })

  const stats = {
    totalReports: taxReports.length,
    completedReports: taxReports.filter(r => r.status === 'completed').length,
    pendingReports: taxReports.filter(r => r.status === 'pending').length,
    overdueReports: taxReports.filter(r => r.status === 'overdue').length,
    totalTaxes: taxReports.reduce((sum, r) => sum + r.totalTaxes, 0),
    averageTaxPerEmployee: taxReports.reduce((sum, r) => sum + r.totalTaxes, 0) / taxReports.reduce((sum, r) => sum + r.employeeCount, 0) * taxReports.length
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tax Reports</h1>
            <p className="text-gray-600">Manage tax filings and compliance reporting</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <BarChart3 className="w-4 h-4" />
              Generate Report
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.completedReports}</div>
                <div className="text-sm text-gray-600">Completed Reports</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {Math.round((stats.completedReports / stats.totalReports) * 100)}% completion rate
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.pendingReports}</div>
                <div className="text-sm text-gray-600">Pending Reports</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">
              Awaiting submission
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <RefreshCw className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.overdueReports}</div>
                <div className="text-sm text-gray-600">Overdue Reports</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-red-600">
              Immediate attention required
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(stats.totalTaxes / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Total Taxes Reported</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              ${Math.round(stats.averageTaxPerEmployee).toLocaleString()}/employee avg
            </div>
          </div>
        </div>

        {/* Tax Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tax Withholding Summary (YTD)</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Federal Income Tax:</span>
                <span className="font-semibold text-gray-900">${taxSummary.federalWithheld.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">State Income Tax:</span>
                <span className="font-semibold text-gray-900">${taxSummary.stateWithheld.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">FICA (Social Security):</span>
                <span className="font-semibold text-gray-900">${taxSummary.ficaWithheld.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Medicare:</span>
                <span className="font-semibold text-gray-900">${taxSummary.medicareWithheld.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unemployment Tax:</span>
                <span className="font-semibold text-gray-900">${taxSummary.unemploymentTax.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Withheld:</span>
                  <span className="font-bold text-lg text-gray-900">${taxSummary.totalWithheld.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tax Rate Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Federal Income Tax</span>
                  <span>{((taxSummary.federalWithheld / taxSummary.totalWithheld) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(taxSummary.federalWithheld / taxSummary.totalWithheld) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>State Income Tax</span>
                  <span>{((taxSummary.stateWithheld / taxSummary.totalWithheld) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(taxSummary.stateWithheld / taxSummary.totalWithheld) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>FICA & Medicare</span>
                  <span>{(((taxSummary.ficaWithheld + taxSummary.medicareWithheld) / taxSummary.totalWithheld) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${((taxSummary.ficaWithheld + taxSummary.medicareWithheld) / taxSummary.totalWithheld) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Unemployment Tax</span>
                  <span>{((taxSummary.unemploymentTax / taxSummary.totalWithheld) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(taxSummary.unemploymentTax / taxSummary.totalWithheld) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {quarters.map((quarter) => (
                <option key={quarter} value={quarter}>{quarter}</option>
              ))}
            </select>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {reportTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Report Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tax Reports Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Report</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Period</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Total Taxes</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employees</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(report.status)}
                        <div>
                          <div className="font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-500">{report.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{report.period}</div>
                      <div className="text-sm text-gray-500 capitalize">{report.type} report</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status.replace('_', ' ').toUpperCase()}
                      </span>
                      {report.submittedDate && (
                        <div className="text-sm text-gray-500 mt-1">
                          Submitted: {new Date(report.submittedDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{new Date(report.dueDate).toLocaleDateString()}</div>
                      <div className={`text-sm ${
                        new Date(report.dueDate) < new Date() && report.status !== 'completed' 
                          ? 'text-red-500' 
                          : 'text-gray-500'
                      }`}>
                        {new Date(report.dueDate) < new Date() && report.status !== 'completed' 
                          ? 'Overdue' 
                          : `${Math.ceil((new Date(report.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days remaining`
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">${report.totalTaxes.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">
                        ${Math.round(report.totalTaxes / report.employeeCount).toLocaleString()}/employee
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{report.employeeCount}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View Report">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        {report.status === 'pending' && (
                          <button className="text-sm bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors">
                            Submit
                          </button>
                        )}
                        {report.status === 'overdue' && (
                          <button className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
                            File Now
                          </button>
                        )}
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

export default TaxReportsPage
