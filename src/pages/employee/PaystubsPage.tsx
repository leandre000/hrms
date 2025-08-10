import React, { useState } from 'react'
import { Download, Eye, Filter, Search, DollarSign, Calendar, FileText } from 'lucide-react'

const PaystubsPage = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPaystub, setSelectedPaystub] = useState<any>(null)

  // Mock paystub data
  const paystubs = [
    {
      id: 1,
      payPeriod: '2024-01-01 to 2024-01-15',
      payDate: '2024-01-20',
      grossPay: 4500.00,
      netPay: 3375.00,
      deductions: 1125.00,
      status: 'paid',
      year: 2024,
      month: 'January'
    },
    {
      id: 2,
      payPeriod: '2023-12-16 to 2023-12-31',
      payDate: '2024-01-05',
      grossPay: 4500.00,
      netPay: 3375.00,
      deductions: 1125.00,
      status: 'paid',
      year: 2023,
      month: 'December'
    },
    {
      id: 3,
      payPeriod: '2023-12-01 to 2023-12-15',
      payDate: '2023-12-20',
      grossPay: 4500.00,
      netPay: 3375.00,
      deductions: 1125.00,
      status: 'paid',
      year: 2023,
      month: 'December'
    },
    {
      id: 4,
      payPeriod: '2023-11-16 to 2023-11-30',
      payDate: '2023-12-05',
      grossPay: 4500.00,
      netPay: 3375.00,
      deductions: 1125.00,
      status: 'paid',
      year: 2023,
      month: 'November'
    }
  ]

  // Mock detailed paystub breakdown
  const paystubDetails = {
    employee: {
      name: 'John Doe',
      id: 'EMP001',
      department: 'Engineering',
      position: 'Senior Software Developer'
    },
    earnings: [
      { description: 'Base Salary', hours: 80, rate: 56.25, amount: 4500.00 },
      { description: 'Overtime (1.5x)', hours: 0, rate: 84.38, amount: 0.00 },
      { description: 'Bonus', hours: null, rate: null, amount: 0.00 }
    ],
    deductions: [
      { description: 'Federal Income Tax', amount: 675.00, percentage: 15.00 },
      { description: 'State Income Tax', amount: 225.00, percentage: 5.00 },
      { description: 'Social Security', amount: 279.00, percentage: 6.20 },
      { description: 'Medicare', amount: 65.25, percentage: 1.45 },
      { description: 'Health Insurance', amount: 150.00, percentage: null },
      { description: '401(k) Contribution', amount: 225.00, percentage: 5.00 }
    ],
    summary: {
      grossPay: 4500.00,
      totalDeductions: 1619.25,
      netPay: 2880.75
    }
  }

  const handleViewPaystub = (paystub: any) => {
    setSelectedPaystub(paystub)
  }

  const handleDownloadPaystub = (paystub: any) => {
    // Download logic here
    console.log('Downloading paystub:', paystub.id)
  }

  const handleDownloadAll = () => {
    // Download all paystubs logic
    console.log('Downloading all paystubs')
  }

  const filteredPaystubs = paystubs.filter(paystub => {
    const matchesFilter = filter === 'all' || paystub.year.toString() === filter
    const matchesSearch = paystub.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paystub.payPeriod.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const yearlyEarnings = {
    2024: paystubs.filter(p => p.year === 2024).reduce((sum, p) => sum + p.grossPay, 0),
    2023: paystubs.filter(p => p.year === 2023).reduce((sum, p) => sum + p.grossPay, 0)
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pay Stubs</h1>
            <p className="text-gray-600">View and download your pay statements</p>
          </div>
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download All
          </button>
        </div>

        {/* Yearly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${yearlyEarnings[2024].toLocaleString()}</div>
                <div className="text-sm text-gray-600">2024 YTD Gross</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{paystubs.filter(p => p.year === 2024).length}</div>
                <div className="text-sm text-gray-600">2024 Pay Periods</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(yearlyEarnings[2024] / Math.max(paystubs.filter(p => p.year === 2024).length, 1)).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Avg per Period</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by month or pay period..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Paystubs List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pay Statements</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Pay Period</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Pay Date</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Gross Pay</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Deductions</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Net Pay</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPaystubs.map((paystub) => (
                    <tr key={paystub.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{paystub.payPeriod}</div>
                          <div className="text-sm text-gray-600">{paystub.month} {paystub.year}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-900">
                          {new Date(paystub.payDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-medium text-gray-900">
                          ${paystub.grossPay.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-red-600">
                          -${paystub.deductions.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-semibold text-green-600">
                          ${paystub.netPay.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleViewPaystub(paystub)}
                            className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadPaystub(paystub)}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPaystubs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No pay stubs found</p>
                  <p className="text-sm">Try adjusting your filters to see more results</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Paystub Detail Modal */}
        {selectedPaystub && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Pay Statement Detail</h2>
                  <button
                    onClick={() => setSelectedPaystub(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                {/* Employee Info */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Employee</div>
                      <div className="font-medium">{paystubDetails.employee.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Employee ID</div>
                      <div className="font-medium">{paystubDetails.employee.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Department</div>
                      <div className="font-medium">{paystubDetails.employee.department}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Position</div>
                      <div className="font-medium">{paystubDetails.employee.position}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Earnings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings</h3>
                    <div className="space-y-3">
                      {paystubDetails.earnings.map((earning, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{earning.description}</div>
                            {earning.hours && (
                              <div className="text-sm text-gray-600">
                                {earning.hours} hrs × ${earning.rate}/hr
                              </div>
                            )}
                          </div>
                          <div className="font-semibold text-green-600">
                            ${earning.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center font-semibold text-lg">
                          <span>Gross Pay</span>
                          <span className="text-green-600">${paystubDetails.summary.grossPay.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Deductions</h3>
                    <div className="space-y-3">
                      {paystubDetails.deductions.map((deduction, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{deduction.description}</div>
                            {deduction.percentage && (
                              <div className="text-sm text-gray-600">
                                {deduction.percentage}%
                              </div>
                            )}
                          </div>
                          <div className="font-semibold text-red-600">
                            -${deduction.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center font-semibold text-lg">
                          <span>Total Deductions</span>
                          <span className="text-red-600">-${paystubDetails.summary.totalDeductions.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Pay Summary */}
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Net Pay</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${paystubDetails.summary.netPay.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Pay Period: {selectedPaystub.payPeriod} | Pay Date: {new Date(selectedPaystub.payDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => handleDownloadPaystub(selectedPaystub)}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => setSelectedPaystub(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaystubsPage
