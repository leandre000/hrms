import React, { useState } from 'react'
import { Briefcase, Plus, Edit, Trash2, Eye, Users, Calendar, DollarSign, MapPin, Clock, Search, Filter, Globe, Target } from 'lucide-react'

const JobsPage = () => {
  const [showAddJob, setShowAddJob] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      salaryMin: 90000,
      salaryMax: 120000,
      status: 'active',
      applications: 45,
      views: 234,
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      hiringManager: 'Sarah Wilson',
      description: 'We are looking for a Senior Frontend Developer to join our growing engineering team.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership skills'],
      benefits: ['Health insurance', 'Remote work', '401k matching', 'Professional development'],
      priority: 'high',
      featured: true
    },
    {
      id: 2,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salaryMin: 80000,
      salaryMax: 100000,
      status: 'active',
      applications: 28,
      views: 156,
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      hiringManager: 'David Kim',
      description: 'Lead our marketing initiatives and drive brand growth strategies.',
      requirements: ['5+ years marketing experience', 'Digital marketing expertise', 'Team management'],
      benefits: ['Health insurance', 'Flexible hours', 'Stock options', 'Learning budget'],
      priority: 'medium',
      featured: false
    },
    {
      id: 3,
      title: 'Junior Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salaryMin: 60000,
      salaryMax: 80000,
      status: 'paused',
      applications: 89,
      views: 456,
      postedDate: '2024-01-05',
      deadline: '2024-02-05',
      hiringManager: 'Michael Chen',
      description: 'Entry-level position for new graduates looking to start their development career.',
      requirements: ['Computer Science degree', 'Basic programming knowledge', 'Eagerness to learn'],
      benefits: ['Health insurance', 'Mentorship program', 'Learning resources', 'Career growth'],
      priority: 'low',
      featured: false
    },
    {
      id: 4,
      title: 'HR Specialist',
      department: 'Human Resources',
      location: 'Austin, TX',
      type: 'Full-time',
      salaryMin: 55000,
      salaryMax: 70000,
      status: 'closed',
      applications: 67,
      views: 234,
      postedDate: '2023-12-20',
      deadline: '2024-01-20',
      hiringManager: 'Lisa Rodriguez',
      description: 'Support HR operations and employee relations initiatives.',
      requirements: ['3+ years HR experience', 'SHRM certification preferred', 'Strong communication'],
      benefits: ['Health insurance', 'PTO', 'Professional development', 'Work-life balance'],
      priority: 'medium',
      featured: false
    }
  ]

  const statuses = ['all', 'active', 'paused', 'closed', 'draft']
  const departments = ['all', 'Engineering', 'Marketing', 'Human Resources', 'Sales', 'Finance']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'closed':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(job => job.status === 'active').length,
    totalApplications: jobs.reduce((sum, job) => sum + job.applications, 0),
    avgApplicationsPerJob: Math.round(jobs.reduce((sum, job) => sum + job.applications, 0) / jobs.length)
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
            <p className="text-gray-600">Manage job postings and recruitment campaigns</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddJob(true)}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Globe className="w-4 h-4" />
              Publish to Job Boards
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalJobs}</div>
                <div className="text-sm text-gray-600">Total Job Postings</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.activeJobs}</div>
                <div className="text-sm text-gray-600">Active Postings</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.avgApplicationsPerJob}</div>
                <div className="text-sm text-gray-600">Avg Applications/Job</div>
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
                placeholder="Search job postings..."
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
                    {status.charAt(0).toUpperCase() + status.slice(1)} {status === 'all' ? 'Statuses' : ''}
                  </option>
                ))}
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    {job.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                      {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)} Priority
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{job.description}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Requirements</h4>
                  <ul className="space-y-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                  <ul className="space-y-1">
                    {job.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recruitment Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Applications:</span>
                      <span className="font-medium text-gray-900">{job.applications}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium text-gray-900">{job.views}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Posted:</span>
                      <span className="font-medium text-gray-900">{new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-medium text-gray-900">{new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Hiring Manager: <span className="font-medium text-gray-900">{job.hiringManager}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      View Applications ({job.applications})
                    </button>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                      Manage Posting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Job Modal */}
        {showAddJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Post New Job</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter job title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Salary</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter minimum salary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Salary</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter maximum salary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                    <textarea
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter job description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                      <textarea
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter job requirements (one per line)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                      <textarea
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter benefits (one per line)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select hiring manager</option>
                        <option value="sarah.wilson">Sarah Wilson</option>
                        <option value="michael.chen">Michael Chen</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Post Job
                    </button>
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddJob(false)}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
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

export default JobsPage
