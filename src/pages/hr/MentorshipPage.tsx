import React, { useState } from 'react'
import {
  Users,
  UserPlus,
  MessageSquare,
  Calendar,
  Target,
  Award,
  Star,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react'

interface Mentor {
  id: string
  name: string
  department: string
  position: string
  expertise: string[]
  experience: number
  menteesCount: number
  rating: number
  availability: 'Available' | 'Limited' | 'Unavailable'
  bio: string
  contact: {
    email: string
    phone: string
    location: string
  }
}

interface Mentee {
  id: string
  name: string
  department: string
  position: string
  goals: string[]
  currentMentor?: string
  progress: number
  status: 'Active' | 'Completed' | 'At Risk'
  startDate: string
  lastMeeting: string
}

interface MentorshipProgram {
  id: string
  name: string
  description: string
  duration: number
  participants: number
  successRate: number
  status: 'Active' | 'Planning' | 'Completed'
  startDate: string
  endDate: string
}

const MentorshipPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      expertise: ['React', 'Node.js', 'System Design', 'Team Leadership'],
      experience: 8,
      menteesCount: 3,
      rating: 4.8,
      availability: 'Available',
      bio: 'Passionate about mentoring junior developers and sharing knowledge about modern web technologies.',
      contact: {
        email: 'sarah.johnson@company.com',
        phone: '+1-555-0123',
        location: 'San Francisco, CA'
      }
    },
    {
      id: '2',
      name: 'Michael Chen',
      department: 'Sales',
      position: 'Sales Director',
      expertise: ['Sales Strategy', 'Client Relations', 'Negotiation', 'Team Management'],
      experience: 12,
      menteesCount: 2,
      rating: 4.6,
      availability: 'Limited',
      bio: 'Experienced sales leader with a track record of building high-performing teams and exceeding targets.',
      contact: {
        email: 'michael.chen@company.com',
        phone: '+1-555-0124',
        location: 'New York, NY'
      }
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      department: 'Marketing',
      position: 'Marketing Manager',
      expertise: ['Digital Marketing', 'Brand Strategy', 'Content Creation', 'Analytics'],
      experience: 6,
      menteesCount: 4,
      rating: 4.9,
      availability: 'Available',
      bio: 'Creative marketer with expertise in building brand awareness and driving customer engagement.',
      contact: {
        email: 'lisa.rodriguez@company.com',
        phone: '+1-555-0125',
        location: 'Austin, TX'
      }
    }
  ]

  const mentees: Mentee[] = [
    {
      id: '1',
      name: 'Alex Thompson',
      department: 'Engineering',
      position: 'Junior Developer',
      goals: ['Improve React skills', 'Learn system design', 'Build leadership skills'],
      currentMentor: 'Sarah Johnson',
      progress: 65,
      status: 'Active',
      startDate: '2024-01-15',
      lastMeeting: '2024-01-20'
    },
    {
      id: '2',
      name: 'Jordan Lee',
      department: 'Sales',
      position: 'Sales Representative',
      goals: ['Improve closing rates', 'Build client relationships', 'Develop negotiation skills'],
      currentMentor: 'Michael Chen',
      progress: 45,
      status: 'Active',
      startDate: '2024-01-10',
      lastMeeting: '2024-01-18'
    },
    {
      id: '3',
      name: 'Taylor Smith',
      department: 'Marketing',
      position: 'Marketing Specialist',
      goals: ['Learn digital marketing', 'Improve analytics skills', 'Develop content strategy'],
      currentMentor: 'Lisa Rodriguez',
      progress: 80,
      status: 'Active',
      startDate: '2023-12-01',
      lastMeeting: '2024-01-22'
    }
  ]

  const mentorshipPrograms: MentorshipProgram[] = [
    {
      id: '1',
      name: 'Tech Leadership Program',
      description: 'Comprehensive program for developing technical leadership skills',
      duration: 12,
      participants: 15,
      successRate: 87,
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: '2',
      name: 'Sales Excellence Initiative',
      description: 'Mentorship program focused on sales performance and career growth',
      duration: 8,
      participants: 12,
      successRate: 92,
      status: 'Active',
      startDate: '2024-02-01',
      endDate: '2024-09-30'
    },
    {
      id: '3',
      name: 'Marketing Innovation Lab',
      description: 'Creative mentorship program for marketing professionals',
      duration: 6,
      participants: 8,
      successRate: 78,
      status: 'Planning',
      startDate: '2024-03-01',
      endDate: '2024-08-31'
    }
  ]

  const mentorshipMetrics = {
    totalMentors: 15,
    totalMentees: 28,
    activePrograms: 3,
    successRate: 85.7,
    avgMentorRating: 4.7,
    totalMeetings: 156
  }

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = selectedDepartment === 'all' || mentor.department === selectedDepartment
    const matchesStatus = selectedStatus === 'all' || mentor.availability === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800'
      case 'Limited': return 'bg-yellow-100 text-yellow-800'
      case 'Unavailable': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Completed': return 'bg-blue-100 text-blue-800'
      case 'At Risk': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mentorship Program</h1>
          <p className="text-gray-600">Connect mentors and mentees for professional development</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <UserPlus size={20} />
            New Mentee
          </button>
          <button className="btn-primary">
            <Plus size={20} />
            New Program
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Mentors</p>
              <p className="text-2xl font-bold text-gray-900">{mentorshipMetrics.totalMentors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Mentees</p>
              <p className="text-2xl font-bold text-gray-900">{mentorshipMetrics.totalMentees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mentorshipMetrics.successRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{mentorshipMetrics.avgMentorRating}/5</p>
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
                placeholder="Search mentors, mentees, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Limited">Limited</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'mentors', 'mentees', 'programs'].map((tab) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Programs</span>
                      <span className="font-semibold">{mentorshipMetrics.activePrograms}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Meetings</span>
                      <span className="font-semibold">{mentorshipMetrics.totalMeetings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-semibold text-green-600">{mentorshipMetrics.successRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Engineering</span>
                      <span className="font-semibold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sales</span>
                      <span className="font-semibold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Marketing</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Other</span>
                      <span className="font-semibold">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Sarah Johnson & Alex Thompson</p>
                        <p className="text-sm text-gray-600">Weekly mentorship meeting completed</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <UserPlus className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">New mentee assigned</p>
                        <p className="text-sm text-gray-600">Jordan Lee joined Sales Excellence program</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Program milestone achieved</p>
                        <p className="text-sm text-gray-600">Tech Leadership Program reached 75% completion</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mentors Tab */}
          {activeTab === 'mentors' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <div key={mentor.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                        <p className="text-sm text-gray-600">{mentor.position}</p>
                        <p className="text-sm text-gray-500">{mentor.department}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(mentor.availability)}`}>
                        {mentor.availability}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">{mentor.bio}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{mentor.rating}/5</span>
                        <span className="text-sm text-gray-500">({mentor.experience} years exp.)</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>Mentees: {mentor.menteesCount}</span>
                      <span>Experience: {mentor.experience} years</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {mentor.contact.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {mentor.contact.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {mentor.contact.location}
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Profile
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mentees Tab */}
          {activeTab === 'mentees' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Meeting</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mentees.map((mentee) => (
                      <tr key={mentee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{mentee.name}</div>
                            <div className="text-sm text-gray-500">{mentee.position}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mentee.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mentee.currentMentor || 'Unassigned'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full"
                                style={{ width: `${mentee.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{mentee.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(mentee.status)}`}>
                            {mentee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mentee.lastMeeting}</td>
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

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentorshipPrograms.map((program) => (
                  <div key={program.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                        <p className="text-sm text-gray-600">{program.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        program.status === 'Active' ? 'bg-green-100 text-green-800' :
                        program.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {program.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{program.duration} months</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Participants:</span>
                        <span className="font-medium">{program.participants}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="font-medium text-green-600">{program.successRate}%</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        {program.startDate} - {program.endDate}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MentorshipPage
