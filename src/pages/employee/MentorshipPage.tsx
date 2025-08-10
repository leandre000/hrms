import React, { useState } from 'react'
import { Users, Star, MessageSquare, Calendar, Plus, Search, Filter, Award, Clock, Target } from 'lucide-react'

const MentorshipPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Mock mentorship data
  const currentMentorship = {
    mentor: {
      name: 'Sarah Wilson',
      role: 'Engineering Manager',
      department: 'Engineering',
      experience: '8 years',
      specialties: ['Leadership', 'Career Growth', 'Technical Architecture'],
      rating: 4.8,
      avatar: '/avatars/sarah.jpg',
      bio: 'Experienced engineering leader passionate about developing talent and building high-performing teams.'
    },
    relationship: {
      startDate: '2023-10-01',
      meetingFrequency: 'Bi-weekly',
      nextMeeting: '2024-01-25T14:00:00',
      totalSessions: 12,
      goals: [
        'Develop leadership skills',
        'Plan career progression to senior role',
        'Improve technical communication'
      ],
      progress: 75
    }
  }

  const menteeRelationships = [
    {
      id: 1,
      mentee: {
        name: 'Alex Thompson',
        role: 'Junior Developer',
        department: 'Engineering',
        startDate: '2024-01-01',
        avatar: '/avatars/alex.jpg'
      },
      goals: ['Learn React fundamentals', 'Code review best practices', 'Professional development'],
      nextMeeting: '2024-01-24T15:00:00',
      progress: 40
    },
    {
      id: 2,
      mentee: {
        name: 'Emily Chen',
        role: 'Product Analyst',
        department: 'Product',
        startDate: '2023-11-15',
        avatar: '/avatars/emily.jpg'
      },
      goals: ['Data analysis skills', 'Cross-functional collaboration', 'Presentation skills'],
      nextMeeting: '2024-01-26T10:00:00',
      progress: 70
    }
  ]

  const availableMentors = [
    {
      id: 1,
      name: 'Michael Chen',
      role: 'Principal Engineer',
      department: 'Engineering',
      experience: '12 years',
      specialties: ['System Design', 'Technical Leadership', 'Innovation'],
      rating: 4.9,
      availability: 'Available',
      mentees: 2,
      maxMentees: 3,
      bio: 'Technical leader with expertise in scalable systems and team building.',
      testimonials: [
        'Michael helped me understand complex architectural concepts and grow into a tech lead role.',
        'Excellent mentor with deep technical knowledge and great communication skills.'
      ]
    },
    {
      id: 2,
      name: 'Lisa Rodriguez',
      role: 'VP of People',
      department: 'Human Resources',
      experience: '10 years',
      specialties: ['Career Development', 'Leadership', 'Strategic Thinking'],
      rating: 4.7,
      availability: 'Limited',
      mentees: 3,
      maxMentees: 3,
      bio: 'People leader focused on career development and organizational growth.',
      testimonials: [
        'Lisa provided invaluable guidance on career planning and professional development.',
        'Great mentor for anyone looking to develop leadership and strategic thinking skills.'
      ]
    },
    {
      id: 3,
      name: 'David Kim',
      role: 'Senior Product Manager',
      department: 'Product',
      experience: '7 years',
      specialties: ['Product Strategy', 'User Research', 'Data Analysis'],
      rating: 4.6,
      availability: 'Available',
      mentees: 1,
      maxMentees: 2,
      bio: 'Product leader with experience in both B2B and B2C product development.',
      testimonials: [
        'David helped me transition from engineering to product management successfully.'
      ]
    }
  ]

  const mentorshipPrograms = [
    {
      id: 1,
      name: 'Technical Leadership Program',
      description: 'Develop technical leadership skills and advance to senior engineering roles.',
      duration: '6 months',
      format: 'One-on-one + Group sessions',
      eligibility: 'Mid-level engineers with 3+ years experience',
      participants: 15,
      nextCohort: '2024-03-01',
      topics: ['Technical Decision Making', 'Team Leadership', 'Architecture Design', 'Stakeholder Communication']
    },
    {
      id: 2,
      name: 'Career Transition Program',
      description: 'Support employees transitioning between departments or roles.',
      duration: '4 months',
      format: 'One-on-one mentoring',
      eligibility: 'All employees planning role changes',
      participants: 8,
      nextCohort: 'Rolling enrollment',
      topics: ['Skill Assessment', 'Transition Planning', 'Network Building', 'Role Preparation']
    },
    {
      id: 3,
      name: 'New Graduate Program',
      description: 'Comprehensive mentorship for recent graduates and early career professionals.',
      duration: '12 months',
      format: 'One-on-one + Peer groups',
      eligibility: 'New graduates and early career (0-2 years)',
      participants: 25,
      nextCohort: '2024-02-15',
      topics: ['Professional Skills', 'Company Culture', 'Career Planning', 'Technical Growth']
    }
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800'
      case 'Limited':
        return 'bg-yellow-100 text-yellow-800'
      case 'Unavailable':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStarRating = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      )
    }
    return stars
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mentorship</h1>
            <p className="text-gray-600">Connect with mentors and grow your career through guidance and support</p>
          </div>
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Request Mentor
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'mentors', label: 'Find Mentors' },
              { id: 'programs', label: 'Programs' },
              { id: 'my-mentoring', label: 'My Mentoring' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Current Mentorship */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Mentorship</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{currentMentorship.mentor.name}</h3>
                      <p className="text-gray-600 mb-2">{currentMentorship.mentor.role} • {currentMentorship.mentor.department}</p>
                      <p className="text-gray-700 mb-3">{currentMentorship.mentor.bio}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <div className="flex">{renderStarRating(currentMentorship.mentor.rating)}</div>
                          <span>{currentMentorship.mentor.rating}</span>
                        </div>
                        <span>{currentMentorship.mentor.experience} experience</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Current Goals</h4>
                    <ul className="space-y-1">
                      {currentMentorship.relationship.goals.map((goal, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <Target className="w-4 h-4 text-primary-600" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Relationship Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{Math.ceil((new Date().getTime() - new Date(currentMentorship.relationship.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sessions:</span>
                      <span className="font-medium">{currentMentorship.relationship.totalSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{currentMentorship.relationship.meetingFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Meeting:</span>
                      <span className="font-medium">{new Date(currentMentorship.relationship.nextMeeting).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Goal Progress</span>
                      <span className="text-sm font-medium">{currentMentorship.relationship.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${currentMentorship.relationship.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Mentees */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Mentees</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menteeRelationships.map((relationship) => (
                  <div key={relationship.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{relationship.mentee.name}</h3>
                        <p className="text-sm text-gray-600">{relationship.mentee.role}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-1">Goals:</div>
                      <div className="space-y-1">
                        {relationship.goals.slice(0, 2).map((goal, index) => (
                          <div key={index} className="text-sm text-gray-700">• {goal}</div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Next meeting:</span>
                      <span className="font-medium">{new Date(relationship.nextMeeting).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">Progress</span>
                        <span className="text-xs font-medium">{relationship.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-green-600 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${relationship.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mentors' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search mentors by name, role, or expertise..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Human Resources</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Available Mentors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                        <p className="text-gray-600">{mentor.role}</p>
                        <p className="text-sm text-gray-500">{mentor.experience} experience</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getAvailabilityColor(mentor.availability)}`}>
                      {mentor.availability}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{mentor.bio}</p>

                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Specialties:</div>
                    <div className="flex flex-wrap gap-1">
                      {mentor.specialties.map((specialty, index) => (
                        <span key={index} className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <div className="flex">{renderStarRating(mentor.rating)}</div>
                      <span className="text-sm text-gray-600">({mentor.rating})</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {mentor.mentees}/{mentor.maxMentees} mentees
                    </div>
                  </div>

                  {mentor.testimonials.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Recent testimonial:</div>
                      <blockquote className="text-sm text-gray-700 italic border-l-2 border-primary-300 pl-3">
                        "{mentor.testimonials[0]}"
                      </blockquote>
                    </div>
                  )}

                  <button
                    disabled={mentor.availability === 'Unavailable'}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Request as Mentor
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-6">
            {mentorshipPrograms.map((program) => (
              <div key={program.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.name}</h3>
                    <p className="text-gray-700 mb-3">{program.description}</p>
                  </div>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Apply
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <div className="font-medium">{program.duration}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Format:</span>
                    <div className="font-medium">{program.format}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Participants:</span>
                    <div className="font-medium">{program.participants}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Next Cohort:</span>
                    <div className="font-medium">{program.nextCohort}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Eligibility:</div>
                  <div className="text-gray-700">{program.eligibility}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Key Topics:</div>
                  <div className="flex flex-wrap gap-1">
                    {program.topics.map((topic, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MentorshipPage
