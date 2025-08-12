import React, { useState } from 'react'
import { Award, Plus, Search, Eye, Edit, Trash2, Download, CheckCircle, FileText, Shield } from 'lucide-react'

interface Certification {
  id: string
  name: string
  description: string
  category: string
  duration: string
  validity: string
  status: 'Active' | 'Draft' | 'Archived'
  participants: number
  completionRate: number
}

interface Certificate {
  id: string
  learnerName: string
  certificationName: string
  issueDate: string
  expiryDate: string
  status: 'Valid' | 'Expired' | 'Expiring Soon'
  score: number
}

const mockCertifications: Certification[] = [
  {
    id: '1',
    name: 'Project Management Professional (PMP)',
    description: 'Advanced project management certification',
    category: 'Project Management',
    duration: '6 months',
    validity: '3 years',
    status: 'Active',
    participants: 25,
    completionRate: 80
  },
  {
    id: '2',
    name: 'Certified Scrum Master (CSM)',
    description: 'Agile methodology certification',
    category: 'Agile Development',
    duration: '3 months',
    validity: '2 years',
    status: 'Active',
    participants: 40,
    completionRate: 90
  }
]

const mockCertificates: Certificate[] = [
  {
    id: '1',
    learnerName: 'Sarah Johnson',
    certificationName: 'Project Management Professional (PMP)',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    status: 'Valid',
    score: 92
  },
  {
    id: '2',
    learnerName: 'David Rodriguez',
    certificationName: 'Certified Scrum Master (CSM)',
    issueDate: '2023-11-20',
    expiryDate: '2025-11-20',
    status: 'Valid',
    score: 88
  }
]

const CertificationsPage = () => {
  const [selectedView, setSelectedView] = useState<'programs' | 'certificates'>('programs')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCertifications = mockCertifications.filter(cert =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCertificates = mockCertificates.filter(cert =>
    cert.learnerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Valid': return 'bg-green-100 text-green-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Archived': return 'bg-gray-100 text-gray-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      case 'Expiring Soon': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certifications</h1>
        <p className="text-gray-600">Manage certification programs and issued certificates</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('programs')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'programs'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Certification Programs
          </button>
          <button
            onClick={() => setSelectedView('certificates')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'certificates'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Issued Certificates
          </button>
        </div>
      </div>

      {selectedView === 'programs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create Program
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                      {cert.status}
                    </span>
                    <span className="text-sm text-gray-500">{cert.category}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Duration: {cert.duration} • Validity: {cert.validity}
                  </div>
                  <div className="text-sm text-gray-600">
                    {cert.participants} participants • {cert.completionRate}% completion
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 text-sm text-primary-600 hover:text-primary-900 flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="px-3 py-2 text-sm text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'certificates' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Issued Certificates</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Learner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cert.learnerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.certificationName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.issueDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.expiryDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cert.score}%</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificationsPage
