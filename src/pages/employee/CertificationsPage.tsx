import React, { useState } from 'react'
import { Award, Plus, Calendar, AlertCircle, CheckCircle, ExternalLink, Download, Upload, Eye } from 'lucide-react'

const CertificationsPage = () => {
  const [showAddCertification, setShowAddCertification] = useState(false)
  const [activeTab, setActiveTab] = useState('earned')
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
    hasExpiry: true
  })

  // Mock certifications data
  const earnedCertifications = [
    {
      id: 1,
      name: 'AWS Certified Developer - Associate',
      issuingOrganization: 'Amazon Web Services',
      issueDate: '2023-09-15',
      expiryDate: '2026-09-15',
      credentialId: 'AWS-DEV-2023-001234',
      credentialUrl: 'https://aws.amazon.com/verification/001234',
      description: 'Validates expertise in developing and maintaining applications on the AWS platform.',
      skills: ['AWS', 'Cloud Computing', 'Lambda', 'DynamoDB', 'S3'],
      status: 'active',
      badge: '/badges/aws-developer.png',
      verified: true
    },
    {
      id: 2,
      name: 'React Developer Certification',
      issuingOrganization: 'Meta',
      issueDate: '2023-06-20',
      expiryDate: null, // No expiry
      credentialId: 'META-REACT-2023-567890',
      credentialUrl: 'https://meta.com/verify/567890',
      description: 'Demonstrates proficiency in React development, including hooks, state management, and best practices.',
      skills: ['React', 'JavaScript', 'Frontend Development', 'Component Architecture'],
      status: 'active',
      badge: '/badges/react-developer.png',
      verified: true
    },
    {
      id: 3,
      name: 'Certified ScrumMaster (CSM)',
      issuingOrganization: 'Scrum Alliance',
      issueDate: '2023-03-10',
      expiryDate: '2025-03-10',
      credentialId: 'CSM-2023-789012',
      credentialUrl: 'https://scrumalliance.org/verify/789012',
      description: 'Validates understanding of Scrum framework and ability to facilitate Scrum teams.',
      skills: ['Scrum', 'Agile', 'Project Management', 'Team Leadership'],
      status: 'active',
      badge: '/badges/csm.png',
      verified: true
    },
    {
      id: 4,
      name: 'Google Analytics Certified',
      issuingOrganization: 'Google',
      issueDate: '2022-11-05',
      expiryDate: '2023-11-05',
      credentialId: 'GA-2022-345678',
      credentialUrl: 'https://skillshop.google.com/verify/345678',
      description: 'Demonstrates proficiency in Google Analytics and data analysis.',
      skills: ['Google Analytics', 'Data Analysis', 'Digital Marketing'],
      status: 'expired',
      badge: '/badges/google-analytics.png',
      verified: true
    }
  ]

  const inProgressCertifications = [
    {
      id: 1,
      name: 'Certified Kubernetes Application Developer (CKAD)',
      issuingOrganization: 'Linux Foundation',
      targetDate: '2024-03-30',
      progress: 65,
      studyMaterials: [
        { name: 'CKAD Study Guide', type: 'document', url: '#' },
        { name: 'Kubernetes Documentation', type: 'external', url: 'https://kubernetes.io/docs/' },
        { name: 'Practice Labs', type: 'lab', url: '#' }
      ],
      description: 'Validates skills in designing and building applications for Kubernetes.',
      skills: ['Kubernetes', 'Docker', 'Container Orchestration', 'DevOps'],
      examDate: '2024-03-15',
      examLocation: 'Online Proctored'
    },
    {
      id: 2,
      name: 'Certified Information Systems Security Professional (CISSP)',
      issuingOrganization: '(ISC)²',
      targetDate: '2024-06-30',
      progress: 30,
      studyMaterials: [
        { name: 'CISSP Official Study Guide', type: 'book', url: '#' },
        { name: 'Security Training Videos', type: 'video', url: '#' }
      ],
      description: 'Advanced certification for information security professionals.',
      skills: ['Information Security', 'Risk Management', 'Security Architecture'],
      examDate: null,
      examLocation: 'TBD'
    }
  ]

  const availableCertifications = [
    {
      id: 1,
      name: 'Azure Solutions Architect Expert',
      issuingOrganization: 'Microsoft',
      description: 'Design solutions that run on Microsoft Azure',
      difficulty: 'Expert',
      duration: '3-6 months',
      cost: 165,
      examCode: 'AZ-305',
      prerequisites: ['Azure Administrator Associate', 'Azure Developer Associate'],
      skills: ['Azure', 'Cloud Architecture', 'Solution Design'],
      nextExamDate: '2024-02-15'
    },
    {
      id: 2,
      name: 'PMP - Project Management Professional',
      issuingOrganization: 'Project Management Institute',
      description: 'Globally recognized project management certification',
      difficulty: 'Advanced',
      duration: '4-8 months',
      cost: 405,
      examCode: 'PMP',
      prerequisites: ['4500 hours of project management experience'],
      skills: ['Project Management', 'Leadership', 'Risk Management'],
      nextExamDate: '2024-03-01'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      case 'expiring_soon':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800'
      case 'Advanced':
        return 'bg-orange-100 text-orange-800'
      case 'Expert':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSubmitCertification = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit certification logic here
    console.log('Adding certification:', newCertification)
    setShowAddCertification(false)
    setNewCertification({
      name: '',
      issuingOrganization: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      description: '',
      hasExpiry: true
    })
  }

  const getExpiryStatus = (expiryDate: string | null) => {
    if (!expiryDate) return null
    
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))
    
    if (daysUntilExpiry < 0) return 'expired'
    if (daysUntilExpiry <= 90) return 'expiring_soon'
    return 'active'
  }

  const stats = {
    total: earnedCertifications.length,
    active: earnedCertifications.filter(c => getExpiryStatus(c.expiryDate) === 'active' || !c.expiryDate).length,
    expired: earnedCertifications.filter(c => getExpiryStatus(c.expiryDate) === 'expired').length,
    inProgress: inProgressCertifications.length
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
            <p className="text-gray-600">Track your professional certifications and credentials</p>
          </div>
          <button
            onClick={() => setShowAddCertification(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Earned</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.active}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.expired}</div>
                <div className="text-sm text-gray-600">Expired</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Expiry Warnings */}
        {earnedCertifications.some(c => getExpiryStatus(c.expiryDate) === 'expiring_soon') && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Certifications Expiring Soon</h3>
                <div className="space-y-1">
                  {earnedCertifications
                    .filter(c => getExpiryStatus(c.expiryDate) === 'expiring_soon')
                    .map((cert) => (
                      <div key={cert.id} className="text-sm text-yellow-700">
                        <span className="font-medium">{cert.name}</span> expires on{' '}
                        <span className="font-medium">{new Date(cert.expiryDate!).toLocaleDateString()}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'earned', label: 'Earned Certifications', count: earnedCertifications.length },
              { id: 'progress', label: 'In Progress', count: inProgressCertifications.length },
              { id: 'available', label: 'Available', count: availableCertifications.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'earned' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {earnedCertifications.map((cert) => {
              const expiryStatus = getExpiryStatus(cert.expiryDate)
              return (
                <div key={cert.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{cert.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{cert.issuingOrganization}</p>
                        <p className="text-sm text-gray-700">{cert.description}</p>
                      </div>
                    </div>
                    {cert.verified && (
                      <CheckCircle className="w-5 h-5 text-green-600" title="Verified" />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Issued:</span>
                      <span className="ml-2 font-medium">{new Date(cert.issueDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Expires:</span>
                      <span className="ml-2 font-medium">
                        {cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Credential ID:</span>
                      <span className="ml-2 font-medium font-mono text-xs">{cert.credentialId}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(expiryStatus || cert.status)}`}>
                      {expiryStatus === 'expired' ? 'Expired' :
                       expiryStatus === 'expiring_soon' ? 'Expiring Soon' : 'Active'}
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Download Certificate"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {cert.credentialUrl && (
                        <button
                          className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                          title="Verify Online"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {inProgressCertifications.map((cert) => (
              <div key={cert.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{cert.issuingOrganization}</p>
                    <p className="text-gray-700 mb-3">{cert.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{cert.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${cert.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Target Date:</span>
                    <span className="ml-2 font-medium">{new Date(cert.targetDate).toLocaleDateString()}</span>
                  </div>
                  {cert.examDate && (
                    <div>
                      <span className="text-gray-500">Exam Date:</span>
                      <span className="ml-2 font-medium">{new Date(cert.examDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Study Materials:</div>
                  <div className="space-y-1">
                    {cert.studyMaterials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                        <span>{material.name}</span>
                        <span className="text-gray-500">({material.type})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'available' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableCertifications.map((cert) => (
              <div key={cert.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{cert.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{cert.issuingOrganization}</p>
                  <p className="text-gray-700">{cert.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Difficulty:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getDifficultyColor(cert.difficulty)}`}>
                      {cert.difficulty}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <span className="ml-2 font-medium">{cert.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cost:</span>
                    <span className="ml-2 font-medium">${cert.cost}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Exam Code:</span>
                    <span className="ml-2 font-medium font-mono text-xs">{cert.examCode}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Skills Gained:</div>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {cert.prerequisites.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Prerequisites:</div>
                    <ul className="space-y-1">
                      {cert.prerequisites.map((prereq, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2"></span>
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-gray-500">Next Exam:</span>
                    <span className="ml-2 font-medium">{new Date(cert.nextExamDate).toLocaleDateString()}</span>
                  </div>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Start Learning Path
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Certification Modal */}
        {showAddCertification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Certification</h2>
                <form onSubmit={handleSubmitCertification} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                    <input
                      type="text"
                      required
                      value={newCertification.name}
                      onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., AWS Certified Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                    <input
                      type="text"
                      required
                      value={newCertification.issuingOrganization}
                      onChange={(e) => setNewCertification({...newCertification, issuingOrganization: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Amazon Web Services"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                      <input
                        type="date"
                        required
                        value={newCertification.issueDate}
                        onChange={(e) => setNewCertification({...newCertification, issueDate: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newCertification.hasExpiry}
                            onChange={(e) => setNewCertification({...newCertification, hasExpiry: e.target.checked})}
                          />
                          <span>Has Expiry Date</span>
                        </div>
                      </label>
                      {newCertification.hasExpiry && (
                        <input
                          type="date"
                          value={newCertification.expiryDate}
                          onChange={(e) => setNewCertification({...newCertification, expiryDate: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID</label>
                    <input
                      type="text"
                      value={newCertification.credentialId}
                      onChange={(e) => setNewCertification({...newCertification, credentialId: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Certificate or badge ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
                    <input
                      type="url"
                      value={newCertification.credentialUrl}
                      onChange={(e) => setNewCertification({...newCertification, credentialUrl: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={newCertification.description}
                      onChange={(e) => setNewCertification({...newCertification, description: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Brief description of the certification..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Certificate</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Add Certification
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddCertification(false)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CertificationsPage
