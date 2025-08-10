import React, { useState } from 'react'
import { BookOpen, Calendar, Users, PlayCircle, CheckCircle, Clock, Star } from 'lucide-react'

const TrainingPage = () => {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const trainingPrograms = [
    {
      id: 'TRN001',
      title: 'React Development Fundamentals',
      category: 'Technical',
      instructor: 'Sarah Wilson',
      duration: '40 hours',
      format: 'Online',
      maxParticipants: 20,
      currentEnrollment: 15,
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      status: 'Upcoming',
      rating: 4.8,
      description: 'Comprehensive course covering React fundamentals, hooks, and state management',
      skills: ['React', 'JavaScript', 'Frontend Development'],
      price: 1200
    },
    {
      id: 'TRN002',
      title: 'Leadership Excellence Program',
      category: 'Leadership',
      instructor: 'Mike Johnson',
      duration: '24 hours',
      format: 'Hybrid',
      maxParticipants: 15,
      currentEnrollment: 12,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      status: 'In Progress',
      rating: 4.6,
      description: 'Develop essential leadership skills for managing teams and driving results',
      skills: ['Leadership', 'Team Management', 'Communication'],
      price: 1800
    },
    {
      id: 'TRN003',
      title: 'Data Analysis with Python',
      category: 'Technical',
      instructor: 'Dr. Lisa Chen',
      duration: '32 hours',
      format: 'Online',
      maxParticipants: 25,
      currentEnrollment: 25,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'Completed',
      rating: 4.9,
      description: 'Learn data analysis techniques using Python, pandas, and visualization libraries',
      skills: ['Python', 'Data Analysis', 'Statistics'],
      price: 1500
    }
  ]

  const enrollments = [
    {
      employee: 'John Doe',
      program: 'React Development Fundamentals',
      status: 'Enrolled',
      progress: 0,
      enrollmentDate: '2024-01-25'
    },
    {
      employee: 'Jane Smith',
      program: 'Leadership Excellence Program',
      status: 'In Progress',
      progress: 65,
      enrollmentDate: '2024-01-15'
    },
    {
      employee: 'David Brown',
      program: 'Data Analysis with Python',
      status: 'Completed',
      progress: 100,
      enrollmentDate: '2023-12-20'
    }
  ]

  const trainingStats = {
    totalPrograms: 24,
    activePrograms: 8,
    totalEnrollments: 156,
    completionRate: 87,
    avgRating: 4.7,
    totalInvestment: 48500
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-100 text-blue-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Upcoming': return <Calendar className="w-4 h-4 text-blue-500" />
      case 'In Progress': return <PlayCircle className="w-4 h-4 text-yellow-500" />
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getEnrollmentStatusColor = (status: string) => {
    switch (status) {
      case 'Enrolled': return 'bg-blue-100 text-blue-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Dropped': return 'bg-red-100 text-red-800'
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

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter
    return matchesCategory && matchesStatus
  })

  const categories = ['all', ...new Set(trainingPrograms.map(p => p.category))]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Training & Development</h1>
          <p className="text-gray-600">Manage training programs and employee development</p>
        </div>

        {/* Training Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-gray-900">Total Programs</h3>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {trainingStats.totalPrograms}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <PlayCircle className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">Active</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {trainingStats.activePrograms}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Enrollments</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {trainingStats.totalEnrollments}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-purple-500" />
              <h3 className="font-medium text-gray-900">Completion</h3>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {trainingStats.completionRate}%
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="font-medium text-gray-900">Avg Rating</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {trainingStats.avgRating}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium text-gray-900">Investment</h3>
            </div>
            <div className="text-xl font-bold text-orange-600">
              ${trainingStats.totalInvestment.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Programs */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Training Programs</h2>
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{program.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                        {program.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Instructor:</span>
                        <div className="font-medium">{program.instructor}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <div className="font-medium">{program.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Format:</span>
                        <div className="font-medium">{program.format}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <div className="font-medium">${program.price}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(program.rating)}
                    </div>
                    <div className="text-sm text-gray-600">{program.rating}/5</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Enrollment:</span>
                    <span>{program.currentEnrollment}/{program.maxParticipants}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${(program.currentEnrollment / program.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {program.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                      View Details
                    </button>
                    {program.status === 'Upcoming' && (
                      <button className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition-colors">
                        Enroll
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Employee Enrollments */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Enrollments</h2>
            <div className="space-y-4">
              {enrollments.map((enrollment, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{enrollment.employee}</h3>
                      <p className="text-sm text-gray-600">{enrollment.program}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnrollmentStatusColor(enrollment.status)}`}>
                      {enrollment.status}
                    </span>
                  </div>
                  
                  {enrollment.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress:</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-600">
                    Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainingPage
