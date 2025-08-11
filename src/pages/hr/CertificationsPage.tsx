import { useState } from 'react'
import {
  Award,
  Search,
  Plus,
  Download,
  CheckCircle,
  AlertTriangle,
  Target,
  Users,
  GraduationCap} from 'lucide-react'

interface Certification {
  id: string
  name: string
  provider: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  validityPeriod: number
  cost: number
  duration: string
  status: 'Active' | 'Inactive' | 'Under Review'
  employeesWithCert: number
  lastUpdated: string
}

interface EmployeeCertification {
  id: string
  employeeName: string
  employeeId: string
  certificationName: string
  issueDate: string
  expiryDate: string
  status: 'Valid' | 'Expired' | 'Expiring Soon' | 'Under Review'
  score?: number
  notes: string
}

const CertificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const certifications: Certification[] = [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      provider: 'Amazon Web Services',
      category: 'Cloud Computing',
      level: 'Advanced',
      validityPeriod: 3,
      cost: 150,
      duration: '6 months',
      status: 'Active',
      employeesWithCert: 8,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'PMP Certification',
      provider: 'Project Management Institute',
      category: 'Project Management',
      level: 'Expert',
      validityPeriod: 3,
      cost: 555,
      duration: '12 months',
      status: 'Active',
      employeesWithCert: 12,
      lastUpdated: '2024-01-20'
    },
    {
      id: '3',
      name: 'Google Analytics Individual Qualification',
      provider: 'Google',
      category: 'Digital Marketing',
      level: 'Intermediate',
      validityPeriod: 1,
      cost: 0,
      duration: '3 months',
      status: 'Active',
      employeesWithCert: 15,
      lastUpdated: '2024-01-10'
    }
  ]

  const employeeCertifications: EmployeeCertification[] = [
    {
      id: '1',
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      certificationName: 'AWS Certified Solutions Architect',
      issueDate: '2023-06-15',
      expiryDate: '2026-06-15',
      status: 'Valid',
      score: 92,
      notes: 'Excellent performance, recommended for advanced training'
    },
    {
      id: '2',
      employeeName: 'Emily Davis',
      employeeId: 'EMP002',
      certificationName: 'PMP Certification',
      issueDate: '2023-03-20',
      expiryDate: '2026-03-20',
      status: 'Valid',
      score: 89,
      notes: 'Strong project management skills demonstrated'
    }
  ]

  const certificationMetrics = {
    totalCertifications: 25,
    activeCertifications: 22,
    employeesWithCerts: 45,
    expiringSoon: 8,
    avgCertificationRate: 78.5,
    totalInvestment: 12500
  }

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || cert.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-blue-100 text-blue-800'
      case 'Advanced': return 'bg-orange-100 text-orange-800'
      case 'Expert': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800'
      case 'Under Review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certification Management</h1>
          <p className="text-gray-600">Manage professional certifications and employee qualifications</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download size={20} />
            Export Data
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Certification
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Certifications</p>
              <p className="text-2xl font-bold text-gray-900">{certificationMetrics.totalCertifications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Employees with Certs</p>
              <p className="text-2xl font-bold text-gray-900">{certificationMetrics.employeesWithCerts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">{certificationMetrics.expiringSoon}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Certification Rate</p>
              <p className="text-2xl font-bold text-gray-900">{certificationMetrics.avgCertificationRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Project Management">Project Management</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'certifications', 'employees', 'expiring'].map((tab) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cloud Computing</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Project Management</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Digital Marketing</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Other</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      <div className="bg-green-500 h-2 rounded-full -mt-2" style={{ width: '25%' }}></div>
                      <div className="bg-purple-500 h-2 rounded-full -mt-2" style={{ width: '20%' }}></div>
                      <div className="bg-orange-500 h-2 rounded-full -mt-2" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="font-semibold">${certificationMetrics.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Cost</span>
                      <span className="font-semibold">${(certificationMetrics.totalInvestment / certificationMetrics.totalCertifications).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROI Expected</span>
                      <span className="font-semibold text-green-600">+45%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Certifications</h3>
                <div className="space-y-3">
                  {employeeCertifications.slice(0, 5).map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{cert.employeeName}</p>
                          <p className="text-sm text-gray-600">{cert.certificationName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(cert.status)}`}>
                          {cert.status}
                        </span>
                        <span className="text-sm text-gray-500">Expires: {cert.expiryDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCertifications.map((cert) => (
                      <tr key={cert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                            <div className="text-sm text-gray-500">{cert.duration}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.provider}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(cert.level)}`}>
                            {cert.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${cert.cost}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.employeesWithCert}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            cert.status === 'Active' ? 'bg-green-100 text-green-800' :
                            cert.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                          <button className="text-gray-600 hover:text-gray-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Employees Tab */}
          {activeTab === 'employees' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employeeCertifications.map((cert) => (
                      <tr key={cert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{cert.employeeName}</div>
                            <div className="text-sm text-gray-500">{cert.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.certificationName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.issueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.expiryDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(cert.status)}`}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.score || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                          <button className="text-gray-600 hover:text-gray-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Expiring Tab */}
          {activeTab === 'expiring' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications Expiring Soon</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">John Smith - AWS Solutions Architect</p>
                        <p className="text-sm text-red-600">Expires in 30 days</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50">
                      Renew
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-gray-900">Emily Davis - PMP Certification</p>
                        <p className="text-sm text-yellow-600">Expires in 60 days</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm font-medium text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-50">
                      Plan Renewal
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Renewal Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Immediate Actions</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Contact John Smith for AWS renewal
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Schedule PMP renewal for Emily Davis
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Prevention Strategy</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        Set up automated expiry notifications
                      </li>
                      <li className="flex items-center">
                        <Target className="w-4 h-4 text-blue-600 mr-2" />
                        Create renewal process documentation
                      </li>
                    </ul>
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

export default CertificationsPage
