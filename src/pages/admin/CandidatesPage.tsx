import React, { useState } from 'react'
import { Users, Search, Filter, Eye, Edit, MessageCircle, Calendar, Download, Star, MapPin, Briefcase, GraduationCap, Phone, Mail, ExternalLink } from 'lucide-react'

const CandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')
  const [view, setView] = useState<'list' | 'cards'>('cards')

  const candidates = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      position: 'Senior Frontend Developer',
      status: 'in_review',
      stage: 'Technical Interview',
      appliedDate: '2024-01-20',
      experience: '6 years',
      education: 'Computer Science, Stanford University',
      currentCompany: 'TechCorp Inc.',
      expectedSalary: 110000,
      rating: 4.5,
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      resumeUrl: '/resumes/alice-johnson.pdf',
      notes: 'Strong technical background, excellent communication skills',
      interviewer: 'Sarah Wilson',
      nextInterview: '2024-01-25T10:00:00',
      source: 'LinkedIn'
    },
    {
      id: 2,
      name: 'Robert Kim',
      email: 'robert.kim@email.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      position: 'Marketing Manager',
      status: 'shortlisted',
      stage: 'HR Screening',
      appliedDate: '2024-01-18',
      experience: '5 years',
      education: 'MBA Marketing, NYU',
      currentCompany: 'MarketLeaders Co.',
      expectedSalary: 85000,
      rating: 4.2,
      skills: ['Digital Marketing', 'SEO/SEM', 'Analytics', 'Campaign Management'],
      resumeUrl: '/resumes/robert-kim.pdf',
      notes: 'Great marketing experience, strong analytical skills',
      interviewer: 'David Kim',
      nextInterview: '2024-01-24T14:00:00',
      source: 'Company Website'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      position: 'Junior Developer',
      status: 'new',
      stage: 'Application Review',
      appliedDate: '2024-01-22',
      experience: '1 year',
      education: 'Computer Science, UT Austin',
      currentCompany: 'Freelance',
      expectedSalary: 65000,
      rating: 3.8,
      skills: ['JavaScript', 'React', 'Python', 'Git'],
      resumeUrl: '/resumes/emma-davis.pdf',
      notes: 'Recent graduate, eager to learn, good portfolio projects',
      interviewer: 'Michael Chen',
      nextInterview: null,
      source: 'Job Board'
    },
    {
      id: 4,
      name: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Miami, FL',
      position: 'HR Specialist',
      status: 'hired',
      stage: 'Offer Accepted',
      appliedDate: '2024-01-10',
      experience: '4 years',
      education: 'HR Management, FIU',
      currentCompany: 'People Solutions Inc.',
      expectedSalary: 62000,
      rating: 4.7,
      skills: ['Employee Relations', 'Recruitment', 'HRIS', 'Compliance'],
      resumeUrl: '/resumes/carlos-rodriguez.pdf',
      notes: 'Excellent fit for our company culture, strong HR background',
      interviewer: 'Lisa Rodriguez',
      nextInterview: null,
      source: 'Referral'
    },
    {
      id: 5,
      name: 'Sarah Thompson',
      email: 'sarah.thompson@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA',
      position: 'Senior Frontend Developer',
      status: 'rejected',
      stage: 'Final Interview',
      appliedDate: '2024-01-12',
      experience: '7 years',
      education: 'Computer Engineering, UW',
      currentCompany: 'DevSolutions LLC',
      expectedSalary: 125000,
      rating: 3.5,
      skills: ['Vue.js', 'Angular', 'JavaScript', 'CSS'],
      resumeUrl: '/resumes/sarah-thompson.pdf',
      notes: 'Technical skills good but not aligned with our React stack',
      interviewer: 'Sarah Wilson',
      nextInterview: null,
      source: 'LinkedIn'
    }
  ]

  const statuses = ['all', 'new', 'in_review', 'shortlisted', 'interviewed', 'hired', 'rejected']
  const positions = ['all', 'Senior Frontend Developer', 'Marketing Manager', 'Junior Developer', 'HR Specialist']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800'
      case 'interviewed':
        return 'bg-orange-100 text-orange-800'
      case 'hired':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter
    const matchesPosition = positionFilter === 'all' || candidate.position === positionFilter
    return matchesSearch && matchesStatus && matchesPosition
  })

  const stats = {
    totalCandidates: candidates.length,
    newApplications: candidates.filter(c => c.status === 'new').length,
    inReview: candidates.filter(c => c.status === 'in_review').length,
    hired: candidates.filter(c => c.status === 'hired').length
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
            <p className="text-gray-600">Manage job applications and candidate pipeline</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export Candidates
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('cards')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'cards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalCandidates}</div>
                <div className="text-sm text-gray-600">Total Candidates</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.newApplications}</div>
                <div className="text-sm text-gray-600">New Applications</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.inReview}</div>
                <div className="text-sm text-gray-600">In Review</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.hired}</div>
                <div className="text-sm text-gray-600">Hired</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search candidates by name, email, position, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-0 focus:ring-0 p-0 text-sm placeholder-gray-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position === 'all' ? 'All Positions' : position}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Candidates Display */}
        {view === 'cards' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{candidate.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1).replace('_', ' ')}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">• {candidate.stage}</span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{candidate.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span>{candidate.education}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 4 && (
                      <span className="text-xs text-gray-500">+{candidate.skills.length - 4} more</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {candidate.nextInterview && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm">
                      <span className="font-medium text-blue-900">Next Interview:</span>
                      <div className="text-blue-700">
                        {new Date(candidate.nextInterview).toLocaleDateString()} at{' '}
                        {new Date(candidate.nextInterview).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-blue-600">with {candidate.interviewer}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Candidate</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Position</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Rating</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Applied</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-sm text-gray-500">{candidate.email}</div>
                            <div className="text-sm text-gray-500">{candidate.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{candidate.position}</div>
                        <div className="text-sm text-gray-500">{candidate.experience} experience</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1).replace('_', ' ')}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">{candidate.stage}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{candidate.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {new Date(candidate.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Message">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors" title="Schedule">
                            <Calendar className="w-4 h-4" />
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

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidatesPage
