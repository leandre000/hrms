import React, { useState } from 'react'
import { FileText, Download, Eye, Search, Filter, Calendar, AlertCircle, Star, BookOpen } from 'lucide-react'

const PoliciesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null)

  // Mock policies data
  const policies = [
    {
      id: 1,
      title: 'Code of Conduct',
      category: 'Ethics & Compliance',
      description: 'Guidelines for professional behavior and ethical standards in the workplace.',
      version: '3.1',
      lastUpdated: '2024-01-15',
      effectiveDate: '2024-02-01',
      mandatory: true,
      readStatus: 'completed',
      acknowledgedDate: '2024-01-20',
      size: '2.4 MB',
      pages: 15,
      author: 'Legal Department',
      tags: ['Ethics', 'Behavior', 'Compliance'],
      summary: 'This policy outlines the expected standards of conduct for all employees, including guidelines on professional behavior, conflict of interest, and ethical decision-making.',
      keyPoints: [
        'Professional behavior expectations',
        'Conflict of interest guidelines',
        'Reporting unethical behavior',
        'Disciplinary procedures'
      ]
    },
    {
      id: 2,
      title: 'Remote Work Policy',
      category: 'Work Arrangements',
      description: 'Comprehensive guidelines for remote work arrangements and expectations.',
      version: '2.0',
      lastUpdated: '2023-12-10',
      effectiveDate: '2024-01-01',
      mandatory: true,
      readStatus: 'pending',
      acknowledgedDate: null,
      size: '1.8 MB',
      pages: 12,
      author: 'HR Department',
      tags: ['Remote Work', 'Flexibility', 'Productivity'],
      summary: 'Guidelines for employees working remotely, including eligibility criteria, equipment requirements, and performance expectations.',
      keyPoints: [
        'Eligibility requirements for remote work',
        'Equipment and technology guidelines',
        'Communication expectations',
        'Performance management for remote employees'
      ]
    },
    {
      id: 3,
      title: 'Information Security Policy',
      category: 'IT & Security',
      description: 'Security protocols and guidelines for protecting company and customer data.',
      version: '4.2',
      lastUpdated: '2024-01-05',
      effectiveDate: '2024-01-15',
      mandatory: true,
      readStatus: 'completed',
      acknowledgedDate: '2024-01-18',
      size: '3.1 MB',
      pages: 22,
      author: 'IT Security Team',
      tags: ['Security', 'Data Protection', 'Compliance'],
      summary: 'Comprehensive security guidelines covering data protection, access controls, incident response, and compliance requirements.',
      keyPoints: [
        'Password requirements and management',
        'Data classification and handling',
        'Incident reporting procedures',
        'Compliance with regulations'
      ]
    },
    {
      id: 4,
      title: 'Harassment and Discrimination Policy',
      category: 'HR Policies',
      description: 'Policy outlining zero tolerance for harassment and discrimination.',
      version: '1.5',
      lastUpdated: '2023-11-20',
      effectiveDate: '2023-12-01',
      mandatory: true,
      readStatus: 'completed',
      acknowledgedDate: '2023-12-15',
      size: '1.2 MB',
      pages: 8,
      author: 'HR Department',
      tags: ['Harassment', 'Discrimination', 'Workplace Safety'],
      summary: 'Zero tolerance policy for harassment and discrimination, including reporting procedures and investigation processes.',
      keyPoints: [
        'Definition of harassment and discrimination',
        'Reporting procedures',
        'Investigation process',
        'Protection against retaliation'
      ]
    },
    {
      id: 5,
      title: 'Leave and Time Off Policy',
      category: 'Benefits & Leave',
      description: 'Comprehensive guide to all types of leave and time off benefits.',
      version: '2.3',
      lastUpdated: '2023-10-15',
      effectiveDate: '2024-01-01',
      mandatory: false,
      readStatus: 'not_read',
      acknowledgedDate: null,
      size: '2.0 MB',
      pages: 16,
      author: 'Benefits Team',
      tags: ['Leave', 'Benefits', 'Time Off'],
      summary: 'Detailed information about vacation, sick leave, parental leave, and other time off benefits available to employees.',
      keyPoints: [
        'Accrual rates for different types of leave',
        'Request and approval process',
        'Carryover policies',
        'Emergency leave procedures'
      ]
    },
    {
      id: 6,
      title: 'Professional Development Policy',
      category: 'Learning & Development',
      description: 'Guidelines for professional development opportunities and reimbursements.',
      version: '1.0',
      lastUpdated: '2023-09-30',
      effectiveDate: '2023-10-01',
      mandatory: false,
      readStatus: 'not_read',
      acknowledgedDate: null,
      size: '1.5 MB',
      pages: 10,
      author: 'Learning & Development',
      tags: ['Training', 'Development', 'Education'],
      summary: 'Information about available professional development opportunities, funding, and approval processes.',
      keyPoints: [
        'Available development programs',
        'Tuition reimbursement guidelines',
        'Conference and training approval',
        'Career development planning'
      ]
    }
  ]

  const categories = [
    'All Policies',
    'Ethics & Compliance',
    'Work Arrangements',
    'IT & Security',
    'HR Policies',
    'Benefits & Leave',
    'Learning & Development'
  ]

  const getReadStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'not_read':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getReadStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Eye className="w-4 h-4" />
      case 'pending':
        return <AlertCircle className="w-4 h-4" />
      case 'not_read':
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const handleViewPolicy = (policy: any) => {
    setSelectedPolicy(policy)
  }

  const handleDownloadPolicy = (policy: any) => {
    // Download logic here
    console.log('Downloading policy:', policy.id)
  }

  const handleAcknowledgePolicy = (policy: any) => {
    // Acknowledge policy logic here
    console.log('Acknowledging policy:', policy.id)
    setSelectedPolicy(null)
  }

  const filteredPolicies = policies.filter(policy => {
    const matchesFilter = filter === 'all' || filter === 'All Policies' || policy.category === filter
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: policies.length,
    mandatory: policies.filter(p => p.mandatory).length,
    completed: policies.filter(p => p.readStatus === 'completed').length,
    pending: policies.filter(p => p.readStatus === 'pending' || (p.mandatory && p.readStatus === 'not_read')).length
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Policies</h1>
            <p className="text-gray-600">Access and review company policies and procedures</p>
          </div>
        </div>

        {/* Pending Acknowledgments Alert */}
        {stats.pending > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">Action Required</h3>
                <p className="text-sm text-yellow-700">
                  You have {stats.pending} {stats.pending === 1 ? 'policy' : 'policies'} that require your review and acknowledgment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Policies</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Star className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.mandatory}</div>
                <div className="text-sm text-gray-600">Mandatory</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending Review</div>
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
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPolicies.map((policy) => (
            <div key={policy.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{policy.title}</h3>
                    {policy.mandatory && (
                      <Star className="w-4 h-4 text-red-500" title="Mandatory Policy" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{policy.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Version {policy.version}</span>
                    <span>•</span>
                    <span>{policy.pages} pages</span>
                    <span>•</span>
                    <span>{policy.size}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getReadStatusColor(policy.readStatus)}`}>
                  {getReadStatusIcon(policy.readStatus)}
                  {policy.readStatus === 'not_read' ? 'Not Read' : 
                   policy.readStatus === 'pending' ? 'Pending' : 'Completed'}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">Category & Tags:</div>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                    {policy.category}
                  </span>
                  {policy.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                  {policy.tags.length > 2 && (
                    <span className="text-gray-500 text-xs">+{policy.tags.length - 2} more</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Last Updated:</span>
                  <div className="font-medium">{new Date(policy.lastUpdated).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-500">Effective Date:</span>
                  <div className="font-medium">{new Date(policy.effectiveDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-500">Author:</span>
                  <div className="font-medium">{policy.author}</div>
                </div>
                {policy.acknowledgedDate && (
                  <div>
                    <span className="text-gray-500">Acknowledged:</span>
                    <div className="font-medium text-green-600">{new Date(policy.acknowledgedDate).toLocaleDateString()}</div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewPolicy(policy)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {policy.readStatus === 'not_read' ? 'Read Policy' : 'View Policy'}
                </button>
                <button
                  onClick={() => handleDownloadPolicy(policy)}
                  className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPolicies.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No policies found</h3>
            <p>Try adjusting your search criteria or browse all categories.</p>
          </div>
        )}

        {/* Policy Detail Modal */}
        {selectedPolicy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">{selectedPolicy.title}</h2>
                      {selectedPolicy.mandatory && (
                        <Star className="w-5 h-5 text-red-500" title="Mandatory Policy" />
                      )}
                    </div>
                    <p className="text-gray-600">{selectedPolicy.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPolicy(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Policy Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Version:</span>
                        <span>{selectedPolicy.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span>{selectedPolicy.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Author:</span>
                        <span>{selectedPolicy.author}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pages:</span>
                        <span>{selectedPolicy.pages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span>{selectedPolicy.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Dates</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span>{new Date(selectedPolicy.lastUpdated).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Effective Date:</span>
                        <span>{new Date(selectedPolicy.effectiveDate).toLocaleDateString()}</span>
                      </div>
                      {selectedPolicy.acknowledgedDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Acknowledged:</span>
                          <span className="text-green-600">{new Date(selectedPolicy.acknowledgedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
                  <p className="text-gray-700">{selectedPolicy.summary}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {selectedPolicy.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPolicy.tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t">
                  <button
                    onClick={() => handleDownloadPolicy(selectedPolicy)}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  {selectedPolicy.readStatus !== 'completed' && selectedPolicy.mandatory && (
                    <button
                      onClick={() => handleAcknowledgePolicy(selectedPolicy)}
                      className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Acknowledge Policy
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedPolicy(null)}
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

export default PoliciesPage
