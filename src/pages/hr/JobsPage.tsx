import React, { useState } from 'react'
import { Plus, Eye, Edit, MoreHorizontal, MapPin, DollarSign, Calendar, Users } from 'lucide-react'

const JobsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all')

  const jobPostings = [
    {
      id: 'JOB001',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      status: 'Active',
      salaryRange: '$90,000 - $120,000',
      applications: 45,
      posted: '2024-01-15',
      deadline: '2024-02-15',
      hiringManager: 'Sarah Wilson',
      description: 'We are looking for an experienced frontend developer to join our growing team.'
    },
    {
      id: 'JOB002',
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'Active',
      salaryRange: '$65,000 - $80,000',
      applications: 32,
      posted: '2024-01-20',
      deadline: '2024-02-20',
      hiringManager: 'Mike Johnson',
      description: 'Join our marketing team to drive brand awareness and lead generation.'
    },
    {
      id: 'JOB003',
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      status: 'Draft',
      salaryRange: '$100,000 - $130,000',
      applications: 0,
      posted: null,
      deadline: '2024-03-01',
      hiringManager: 'Lisa Rodriguez',
      description: 'Lead product strategy and development for our core platform.'
    },
    {
      id: 'JOB004',
      title: 'UX Designer',
      department: 'Design',
      location: 'Chicago, IL',
      type: 'Contract',
      status: 'Closed',
      salaryRange: '$70,000 - $90,000',
      applications: 28,
      posted: '2023-12-10',
      deadline: '2024-01-10',
      hiringManager: 'David Brown',
      description: 'Create exceptional user experiences for our digital products.'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Closed': return 'bg-red-100 text-red-800'
      case 'Paused': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-blue-100 text-blue-800'
      case 'Part-time': return 'bg-purple-100 text-purple-800'
      case 'Contract': return 'bg-orange-100 text-orange-800'
      case 'Internship': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredJobs = jobPostings.filter(job => 
    statusFilter === 'all' || job.status === statusFilter
  )

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
            <p className="text-gray-600">Manage job openings and recruitment campaigns</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Create Job Posting
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
              <option value="Paused">Paused</option>
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                      {job.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{job.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{job.salaryRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{job.applications} applications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <span>Department: {job.department}</span>
                  <span className="mx-2">•</span>
                  <span>Hiring Manager: {job.hiringManager}</span>
                  {job.posted && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Posted: {new Date(job.posted).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {job.status === 'Active' && (
                    <button className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors">
                      View Applications
                    </button>
                  )}
                  {job.status === 'Draft' && (
                    <button className="bg-green-50 text-green-700 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors">
                      Publish
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-primary-600">{jobPostings.length}</div>
            <div className="text-sm text-gray-600">Total Job Postings</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">
              {jobPostings.filter(j => j.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active Postings</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">
              {jobPostings.reduce((sum, job) => sum + job.applications, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-orange-600">
              {jobPostings.filter(j => j.status === 'Draft').length}
            </div>
            <div className="text-sm text-gray-600">Draft Postings</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobsPage
