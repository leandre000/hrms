import React, { useState } from 'react'
import { Search, Filter, Star, Mail, Phone, Eye, Download } from 'lucide-react'

const CandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')

  const candidates = [
    {
      id: 'CND001',
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Frontend Developer',
      status: 'Interview Scheduled',
      rating: 4.5,
      experience: '5 years',
      location: 'New York, NY',
      appliedDate: '2024-01-20',
      source: 'LinkedIn',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      resume: 'alex_thompson_resume.pdf'
    },
    {
      id: 'CND002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      position: 'Marketing Specialist',
      status: 'Under Review',
      rating: 4.2,
      experience: '3 years',
      location: 'San Francisco, CA',
      appliedDate: '2024-01-22',
      source: 'Company Website',
      skills: ['SEO', 'Content Marketing', 'Google Analytics', 'Social Media'],
      resume: 'sarah_johnson_resume.pdf'
    },
    {
      id: 'CND003',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 345-6789',
      position: 'Product Manager',
      status: 'Offer Extended',
      rating: 4.8,
      experience: '7 years',
      location: 'Remote',
      appliedDate: '2024-01-18',
      source: 'Referral',
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Leadership'],
      resume: 'michael_chen_resume.pdf'
    },
    {
      id: 'CND004',
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+1 (555) 456-7890',
      position: 'UX Designer',
      status: 'Rejected',
      rating: 3.1,
      experience: '2 years',
      location: 'Chicago, IL',
      appliedDate: '2024-01-15',
      source: 'Indeed',
      skills: ['Figma', 'User Research', 'Prototyping', 'Wireframing'],
      resume: 'emma_wilson_resume.pdf'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800'
      case 'Interview Scheduled': return 'bg-blue-100 text-blue-800'
      case 'Offer Extended': return 'bg-green-100 text-green-800'
      case 'Hired': return 'bg-green-100 text-green-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      case 'Withdrawn': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter
    const matchesPosition = positionFilter === 'all' || candidate.position === positionFilter
    return matchesSearch && matchesStatus && matchesPosition
  })

  const positions = ['all', ...new Set(candidates.map(c => c.position))]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Candidate Management</h1>
          <p className="text-gray-600">Review and manage job applicants and candidates</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search candidates..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Extended">Offer Extended</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {positions.map(position => (
                <option key={position} value={position}>
                  {position === 'all' ? 'All Positions' : position}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.position}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(candidate.rating)}
                      <span className="text-sm text-gray-500 ml-1">({candidate.rating})</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <div className="font-medium">{candidate.experience}</div>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <div className="font-medium">{candidate.location}</div>
                </div>
                <div>
                  <span className="text-gray-600">Applied:</span>
                  <div className="font-medium">{new Date(candidate.appliedDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Source:</span>
                  <div className="font-medium">{candidate.source}</div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-600 text-sm block mb-2">Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <a
                    href={`mailto:${candidate.email}`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${candidate.phone}`}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                    View Profile
                  </button>
                  {candidate.status === 'Under Review' && (
                    <button className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition-colors">
                      Schedule Interview
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-primary-600">{candidates.length}</div>
            <div className="text-sm text-gray-600">Total Candidates</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {candidates.filter(c => c.status === 'Under Review').length}
            </div>
            <div className="text-sm text-gray-600">Under Review</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">
              {candidates.filter(c => c.status === 'Interview Scheduled').length}
            </div>
            <div className="text-sm text-gray-600">Interviews</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">
              {candidates.filter(c => c.status === 'Offer Extended').length}
            </div>
            <div className="text-sm text-gray-600">Offers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-red-600">
              {candidates.filter(c => c.status === 'Rejected').length}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidatesPage
