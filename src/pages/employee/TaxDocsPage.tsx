import React, { useState } from 'react'
import { Download, Eye, FileText, Calendar, Search, Filter, AlertTriangle } from 'lucide-react'

const TaxDocsPage = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock tax documents data
  const taxDocuments = [
    {
      id: 1,
      type: 'W-2',
      year: 2023,
      description: 'Wage and Tax Statement',
      status: 'available',
      dateAvailable: '2024-01-31',
      employer: 'Your Company Inc.',
      grossWages: 108000,
      federalTax: 16200,
      stateTax: 5400,
      socialSecurity: 6696,
      medicare: 1566
    },
    {
      id: 2,
      type: 'W-2',
      year: 2022,
      description: 'Wage and Tax Statement',
      status: 'available',
      dateAvailable: '2023-01-31',
      employer: 'Your Company Inc.',
      grossWages: 102000,
      federalTax: 15300,
      stateTax: 5100,
      socialSecurity: 6324,
      medicare: 1479
    },
    {
      id: 3,
      type: '1095-C',
      year: 2023,
      description: 'Employer-Provided Health Insurance Offer and Coverage',
      status: 'available',
      dateAvailable: '2024-03-31',
      employer: 'Your Company Inc.'
    },
    {
      id: 4,
      type: '1095-C',
      year: 2022,
      description: 'Employer-Provided Health Insurance Offer and Coverage',
      status: 'available',
      dateAvailable: '2023-03-31',
      employer: 'Your Company Inc.'
    },
    {
      id: 5,
      type: 'W-2',
      year: 2024,
      description: 'Wage and Tax Statement',
      status: 'pending',
      dateAvailable: '2025-01-31',
      employer: 'Your Company Inc.',
      note: 'Will be available after year end'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'W-2':
        return <FileText className="w-8 h-8 text-blue-600" />
      case '1095-C':
        return <FileText className="w-8 h-8 text-green-600" />
      default:
        return <FileText className="w-8 h-8 text-gray-600" />
    }
  }

  const handleDownload = (doc: any) => {
    if (doc.status !== 'available') {
      alert('Document is not yet available for download')
      return
    }
    // Download logic here
    console.log('Downloading document:', doc.id)
  }

  const handleView = (doc: any) => {
    if (doc.status !== 'available') {
      alert('Document is not yet available for viewing')
      return
    }
    // View logic here
    console.log('Viewing document:', doc.id)
  }

  const filteredDocuments = taxDocuments.filter(doc => {
    const matchesFilter = filter === 'all' || doc.year.toString() === filter || doc.type === filter
    const matchesSearch = doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.year.toString().includes(searchTerm)
    return matchesFilter && matchesSearch
  })

  const currentYear = new Date().getFullYear()
  const availableYears = [...new Set(taxDocuments.map(doc => doc.year))].sort((a, b) => b - a)

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tax Documents</h1>
            <p className="text-gray-600">Access your annual tax forms and statements</p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Important Tax Information</h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• W-2 forms are typically available by January 31st following the tax year</p>
                <p>• 1095-C forms are available by March 31st following the tax year</p>
                <p>• Keep copies of all tax documents for your records</p>
                <p>• Contact HR if you have questions about your tax documents</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {taxDocuments.filter(doc => doc.status === 'available').length}
                </div>
                <div className="text-sm text-gray-600">Available Documents</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{availableYears.length}</div>
                <div className="text-sm text-gray-600">Tax Years</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Download className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {taxDocuments.filter(doc => doc.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending Documents</div>
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
                <option value="all">All Documents</option>
                <option value="W-2">W-2 Forms</option>
                <option value="1095-C">1095-C Forms</option>
                {availableYears.map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getDocumentIcon(doc.type)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.type} - {doc.year}</h3>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Employer:</span>
                  <span className="text-gray-900">{doc.employer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available:</span>
                  <span className="text-gray-900">
                    {new Date(doc.dateAvailable).toLocaleDateString()}
                  </span>
                </div>
                {doc.grossWages && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gross Wages:</span>
                    <span className="text-gray-900 font-medium">
                      ${doc.grossWages.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {doc.type === 'W-2' && doc.grossWages && (
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Tax Summary</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Federal Tax:</span>
                      <span>${doc.federalTax?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">State Tax:</span>
                      <span>${doc.stateTax?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Social Security:</span>
                      <span>${doc.socialSecurity?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medicare:</span>
                      <span>${doc.medicare?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {doc.note && (
                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-yellow-700">{doc.note}</p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleView(doc)}
                  disabled={doc.status !== 'available'}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm transition-colors ${
                    doc.status === 'available'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleDownload(doc)}
                  disabled={doc.status !== 'available'}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm transition-colors ${
                    doc.status === 'available'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p>Try adjusting your search criteria or check back later for new documents.</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">Need Help with Your Tax Documents?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">Common Questions:</h4>
              <ul className="space-y-1 text-xs">
                <li>• When will my W-2 be available?</li>
                <li>• How do I access previous year documents?</li>
                <li>• What if I find an error on my tax form?</li>
                <li>• Can I get a corrected W-2?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Contact Information:</h4>
              <div className="text-xs space-y-1">
                <p>HR Department: hr@company.com</p>
                <p>Payroll Questions: payroll@company.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Hours: Mon-Fri, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxDocsPage
