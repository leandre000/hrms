import React, { useState } from 'react'
import { Briefcase, MapPin, Calendar, DollarSign, Search, Filter, Heart, Eye, Send, Clock, Users } from 'lucide-react'

const InternalJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [savedJobs, setSavedJobs] = useState<number[]>([1, 3])

  // Mock internal job postings
  const internalJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      level: 'Senior',
      salary: '$110,000 - $140,000',
      postedDate: '2024-01-15',
      applicationDeadline: '2024-02-15',
      manager: 'Sarah Wilson',
      team: 'Product Development',
      description: 'We are looking for a Senior Frontend Developer to join our growing product team. You will be responsible for building user-facing features and improving our web application performance.',
      requirements: [
        '5+ years of React development experience',
        'Strong JavaScript and TypeScript skills',
        'Experience with modern build tools and CI/CD',
        'Understanding of web performance optimization',
        'Experience with testing frameworks'
      ],
      responsibilities: [
        'Develop and maintain frontend applications',
        'Collaborate with designers and backend developers',
        'Optimize application performance and user experience',
        'Mentor junior developers',
        'Participate in code reviews and architectural decisions'
      ],
      benefits: [
        'Competitive salary and equity',
        'Flexible work arrangements',
        'Professional development budget',
        'Health and wellness benefits',
        'Annual team retreats'
      ],
      skills: ['React', 'TypeScript', 'CSS', 'Node.js', 'GraphQL'],
      applicants: 12,
      isUrgent: false,
      referralBonus: 2000
    },
    {
      id: 2,
      title: 'Product Manager - HR Tech',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      level: 'Mid-level',
      salary: '$120,000 - $150,000',
      postedDate: '2024-01-10',
      applicationDeadline: '2024-02-10',
      manager: 'Michael Chen',
      team: 'HR Platform',
      description: 'Join our product team to help shape the future of HR technology. You will own the product roadmap for our core HR features and work closely with engineering and design teams.',
      requirements: [
        '3+ years of product management experience',
        'Experience with B2B SaaS products',
        'Strong analytical and problem-solving skills',
        'Excellent communication and stakeholder management',
        'Experience with HR tech or similar domain'
      ],
      responsibilities: [
        'Define and execute product strategy and roadmap',
        'Gather and prioritize product requirements',
        'Work closely with engineering and design teams',
        'Analyze product metrics and user feedback',
        'Manage stakeholder communications'
      ],
      benefits: [
        'Competitive salary and equity',
        'Flexible PTO policy',
        'Professional development opportunities',
        'Comprehensive health benefits',
        'Stock options'
      ],
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'Stakeholder Management'],
      applicants: 8,
      isUrgent: true,
      referralBonus: 2500
    },
    {
      id: 3,
      title: 'Senior HR Business Partner',
      department: 'Human Resources',
      location: 'Remote',
      type: 'Full-time',
      level: 'Senior',
      salary: '$95,000 - $120,000',
      postedDate: '2024-01-08',
      applicationDeadline: '2024-02-08',
      manager: 'Lisa Rodriguez',
      team: 'People Operations',
      description: 'We are seeking an experienced HR Business Partner to support our growing organization. You will partner with leadership to drive people initiatives and support our company culture.',
      requirements: [
        '7+ years of HR business partner experience',
        'Strong knowledge of employment law',
        'Experience with performance management',
        'Excellent interpersonal and communication skills',
        'SHRM-CP or PHR certification preferred'
      ],
      responsibilities: [
        'Partner with business leaders on people strategy',
        'Manage employee relations and conflict resolution',
        'Support performance management processes',
        'Drive talent development and succession planning',
        'Ensure compliance with employment regulations'
      ],
      benefits: [
        'Competitive salary',
        'Remote work flexibility',
        'Professional certification support',
        'Comprehensive benefits package',
        'Learning and development budget'
      ],
      skills: ['HR Strategy', 'Employment Law', 'Performance Management', 'Conflict Resolution', 'Leadership Development'],
      applicants: 15,
      isUrgent: false,
      referralBonus: 1500
    },
    {
      id: 4,
      title: 'Data Analyst - People Analytics',
      department: 'Human Resources',
      location: 'Austin, TX',
      type: 'Full-time',
      level: 'Mid-level',
      salary: '$80,000 - $100,000',
      postedDate: '2024-01-05',
      applicationDeadline: '2024-02-05',
      manager: 'David Kim',
      team: 'People Analytics',
      description: 'Join our People Analytics team to help drive data-driven HR decisions. You will analyze employee data to provide insights on retention, performance, and engagement.',
      requirements: [
        '3+ years of data analysis experience',
        'Proficiency in SQL, Python, or R',
        'Experience with data visualization tools',
        'Knowledge of HR metrics and analytics',
        'Strong statistical analysis skills'
      ],
      responsibilities: [
        'Analyze employee data and trends',
        'Create dashboards and reports for leadership',
        'Support predictive analytics initiatives',
        'Collaborate with HR teams on data projects',
        'Present findings to stakeholders'
      ],
      benefits: [
        'Competitive salary',
        'Flexible work schedule',
        'Learning and development opportunities',
        'Health and wellness benefits',
        'Collaborative team environment'
      ],
      skills: ['SQL', 'Python', 'Tableau', 'Statistics', 'Data Visualization'],
      applicants: 6,
      isUrgent: false,
      referralBonus: 1000
    }
  ]

  const departments = ['All Departments', 'Engineering', 'Product', 'Human Resources', 'Sales', 'Marketing', 'Finance']
  const locations = ['All Locations', 'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Remote']
  const types = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Internship']

  const handleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const handleApplyJob = (job: any) => {
    // Apply logic here
    console.log('Applying to job:', job.id)
    alert(`Application submitted for ${job.title}!`)
  }

  const handleViewJob = (job: any) => {
    setSelectedJob(job)
  }

  const filteredJobs = internalJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = departmentFilter === 'all' || departmentFilter === 'All Departments' || job.department === departmentFilter
    const matchesLocation = locationFilter === 'all' || locationFilter === 'All Locations' || job.location === locationFilter
    const matchesType = typeFilter === 'all' || typeFilter === 'All Types' || job.type === typeFilter
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesType
  })

  const stats = {
    total: internalJobs.length,
    applied: 2,
    saved: savedJobs.length,
    newThisWeek: internalJobs.filter(job => {
      const postedDate = new Date(job.postedDate)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return postedDate > weekAgo
    }).length
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Internal Job Opportunities</h1>
            <p className="text-gray-600">Explore career opportunities within the company</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Open Positions</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Send className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.applied}</div>
                <div className="text-sm text-gray-600">Applications Sent</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.saved}</div>
                <div className="text-sm text-gray-600">Saved Jobs</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.newThisWeek}</div>
                <div className="text-sm text-gray-600">New This Week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    {job.isUrgent && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        Urgent
                      </span>
                    )}
                    {stats.newThisWeek > 0 && new Date(job.postedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {job.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="text-gray-500 text-xs">+{job.skills.length - 4} more</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                    </div>
                    {job.referralBonus > 0 && (
                      <div className="text-green-600 font-medium">
                        ${job.referralBonus.toLocaleString()} referral bonus
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handleSaveJob(job.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      savedJobs.includes(job.id)
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={savedJobs.includes(job.id) ? 'Remove from saved' : 'Save job'}
                  >
                    <Heart className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleViewJob(job)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => handleApplyJob(job)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Apply Now
                </button>
                <button
                  onClick={() => handleViewJob(job)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p>Try adjusting your search criteria or check back later for new opportunities.</p>
          </div>
        )}

        {/* Job Detail Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-semibold text-gray-900">{selectedJob.title}</h2>
                      {selectedJob.isUrgent && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="font-medium">{selectedJob.department}</span>
                      <span>•</span>
                      <span>{selectedJob.location}</span>
                      <span>•</span>
                      <span>{selectedJob.type}</span>
                      <span>•</span>
                      <span>{selectedJob.level}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                      <p className="text-gray-700">{selectedJob.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
                      <ul className="space-y-2">
                        {selectedJob.responsibilities.map((resp: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                      <ul className="space-y-2">
                        {selectedJob.benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Job Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Salary:</span>
                          <span className="font-medium">{selectedJob.salary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Manager:</span>
                          <span>{selectedJob.manager}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Team:</span>
                          <span>{selectedJob.team}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Posted:</span>
                          <span>{new Date(selectedJob.postedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deadline:</span>
                          <span>{new Date(selectedJob.applicationDeadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Applicants:</span>
                          <span>{selectedJob.applicants}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill: string, index: number) => (
                          <span key={index} className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedJob.referralBonus > 0 && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">Referral Bonus</h3>
                        <p className="text-sm text-green-700">
                          Earn ${selectedJob.referralBonus.toLocaleString()} for successful referrals for this position.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t mt-6">
                  <button
                    onClick={() => handleApplyJob(selectedJob)}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Apply for this Position
                  </button>
                  <button
                    onClick={() => handleSaveJob(selectedJob.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      savedJobs.includes(selectedJob.id)
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${savedJobs.includes(selectedJob.id) ? 'fill-current' : ''}`} />
                    {savedJobs.includes(selectedJob.id) ? 'Saved' : 'Save Job'}
                  </button>
                  <button
                    onClick={() => setSelectedJob(null)}
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

export default InternalJobsPage
