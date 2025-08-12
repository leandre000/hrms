import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download, 
  Award, 
  Clock, 
  User,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Send
} from 'lucide-react'

interface Certificate {
  id: string
  learnerName: string
  programName: string
  completionDate: string
  issueDate: string
  status: 'Pending' | 'Issued' | 'Expired' | 'Revoked'
  certificateNumber: string
  validityPeriod: string
  score: number
  instructor: string
  programType: string
  level: string
  expiryDate: string
}

const mockCertificates: Certificate[] = [
  {
    id: '1',
    learnerName: 'Sarah Johnson',
    programName: 'Advanced Project Management',
    completionDate: '2024-01-15',
    issueDate: '2024-01-20',
    status: 'Issued',
    certificateNumber: 'CERT-2024-001',
    validityPeriod: '3 years',
    score: 92,
    instructor: 'Dr. Michael Chen',
    programType: 'Professional Certification',
    level: 'Advanced',
    expiryDate: '2027-01-20'
  },
  {
    id: '2',
    learnerName: 'David Rodriguez',
    programName: 'Data Science Fundamentals',
    completionDate: '2024-01-10',
    issueDate: '2024-01-18',
    status: 'Issued',
    certificateNumber: 'CERT-2024-002',
    validityPeriod: '2 years',
    score: 88,
    instructor: 'Prof. Lisa Wang',
    programType: 'Technical Certification',
    level: 'Intermediate',
    expiryDate: '2026-01-18'
  },
  {
    id: '3',
    learnerName: 'Emily Chen',
    programName: 'Leadership Excellence',
    completionDate: '2024-01-08',
    issueDate: '2024-01-15',
    status: 'Issued',
    certificateNumber: 'CERT-2024-003',
    validityPeriod: '5 years',
    score: 95,
    instructor: 'Dr. Robert Smith',
    programType: 'Leadership Certification',
    level: 'Expert',
    expiryDate: '2029-01-15'
  },
  {
    id: '4',
    learnerName: 'James Wilson',
    programName: 'Cybersecurity Basics',
    completionDate: '2024-01-12',
    issueDate: '',
    status: 'Pending',
    certificateNumber: 'CERT-2024-004',
    validityPeriod: '2 years',
    score: 85,
    instructor: 'Prof. Amanda Lee',
    programType: 'Security Certification',
    level: 'Beginner',
    expiryDate: ''
  },
  {
    id: '5',
    learnerName: 'Maria Garcia',
    programName: 'Digital Marketing Strategy',
    completionDate: '2024-01-05',
    issueDate: '2024-01-12',
    status: 'Issued',
    certificateNumber: 'CERT-2024-005',
    validityPeriod: '3 years',
    score: 90,
    instructor: 'Dr. Kevin Brown',
    programType: 'Marketing Certification',
    level: 'Intermediate',
    expiryDate: '2027-01-12'
  }
]

const IssueCertificatesPage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showIssueModal, setShowIssueModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || cert.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: certificates.length,
    pending: certificates.filter(c => c.status === 'Pending').length,
    issued: certificates.filter(c => c.status === 'Issued').length,
    expired: certificates.filter(c => c.status === 'Expired').length
  }

  const handleIssueCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setShowIssueModal(true)
  }

  const confirmIssueCertificate = () => {
    if (selectedCertificate) {
      const today = new Date().toISOString().split('T')[0]
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 2) // Default 2 years
      
      setCertificates(prev => prev.map(cert => 
        cert.id === selectedCertificate.id 
          ? { 
              ...cert, 
              status: 'Issued', 
              issueDate: today,
              expiryDate: expiryDate.toISOString().split('T')[0]
            }
          : cert
      ))
      setShowIssueModal(false)
      setSelectedCertificate(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Issued': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      case 'Revoked': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Issue Certificates</h1>
        <p className="text-gray-600">Manage and issue certificates for completed training programs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Issue</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Issued</p>
              <p className="text-2xl font-bold text-gray-900">{stats.issued}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by learner name, program, or certificate number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Issued">Issued</option>
              <option value="Expired">Expired</option>
              <option value="Revoked">Revoked</option>
            </select>
            
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Learner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certificate Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCertificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{certificate.learnerName}</div>
                        <div className="text-sm text-gray-500">{certificate.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{certificate.programName}</div>
                      <div className="text-sm text-gray-500">{certificate.programType} • {certificate.level}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {certificate.completionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {certificate.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                      {certificate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {certificate.certificateNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {certificate.status === 'Pending' && (
                        <button
                          onClick={() => handleIssueCertificate(certificate)}
                          className="text-primary-600 hover:text-primary-900 flex items-center"
                        >
                          <Award className="w-4 h-4 mr-1" />
                          Issue
                        </button>
                      )}
                      
                      {certificate.status === 'Issued' && (
                        <>
                          <button className="text-blue-600 hover:text-blue-900 flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </button>
                          <button className="text-green-600 hover:text-green-900 flex items-center">
                            <Send className="w-4 h-4 mr-1" />
                            Send
                          </button>
                        </>
                      )}
                      
                      <button className="text-gray-600 hover:text-gray-900 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      
                      <button className="text-gray-600 hover:text-gray-900 flex items-center">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Certificate Modal */}
      {showIssueModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Issue Certificate</h3>
              <button
                onClick={() => setShowIssueModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Learner:</p>
                <p className="font-medium">{selectedCertificate.learnerName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Program:</p>
                <p className="font-medium">{selectedCertificate.programName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Completion Score:</p>
                <p className="font-medium">{selectedCertificate.score}%</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Certificate Number:</p>
                <p className="font-medium">{selectedCertificate.certificateNumber}</p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowIssueModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmIssueCertificate}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Issue Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IssueCertificatesPage
