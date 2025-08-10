import React, { useState } from 'react'
import { BookOpen, Users, Calendar, CheckCircle, Clock, Play, Award, TrendingUp, Plus, Eye, Edit, Search, Filter, Download } from 'lucide-react'

const AdminTrainingPage = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [view, setView] = useState<'courses' | 'enrollments' | 'analytics'>('courses')

  const trainingCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      category: 'Technical',
      instructor: 'Michael Chen',
      duration: '40 hours',
      format: 'Online',
      price: 1200,
      maxParticipants: 20,
      currentEnrollments: 15,
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      status: 'active',
      completionRate: 75,
      rating: 4.6,
      description: 'Advanced concepts in React including hooks, context, and performance optimization',
      prerequisites: ['Basic React knowledge', '2+ years JavaScript experience'],
      learningOutcomes: ['Master React hooks', 'Optimize React performance', 'Build scalable applications'],
      department: 'Engineering'
    },
    {
      id: 2,
      title: 'Leadership Fundamentals',
      category: 'Leadership',
      instructor: 'Lisa Rodriguez',
      duration: '16 hours',
      format: 'Hybrid',
      price: 800,
      maxParticipants: 15,
      currentEnrollments: 12,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      status: 'active',
      completionRate: 60,
      rating: 4.8,
      description: 'Essential leadership skills for managers and team leads',
      prerequisites: ['1+ year management experience'],
      learningOutcomes: ['Effective team communication', 'Conflict resolution', 'Performance management'],
      department: 'All'
    },
    {
      id: 3,
      title: 'Data Analytics with Python',
      category: 'Technical',
      instructor: 'External Provider',
      duration: '32 hours',
      format: 'Online',
      price: 950,
      maxParticipants: 25,
      currentEnrollments: 8,
      startDate: '2024-02-15',
      endDate: '2024-03-30',
      status: 'enrollment_open',
      completionRate: 0,
      rating: 4.4,
      description: 'Learn data analysis and visualization using Python and popular libraries',
      prerequisites: ['Basic programming knowledge', 'Statistics fundamentals'],
      learningOutcomes: ['Python for data analysis', 'Data visualization', 'Statistical analysis'],
      department: 'Engineering'
    }
  ]

  const enrollments = [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      courseTitle: 'Advanced React Development',
      enrollmentDate: '2024-01-20',
      progress: 85,
      status: 'in_progress',
      completionDate: null,
      score: null,
      certificateIssued: false,
      manager: 'Sarah Wilson'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Wilson',
      department: 'Engineering',
      position: 'Engineering Manager',
      courseTitle: 'Leadership Fundamentals',
      enrollmentDate: '2024-01-10',
      progress: 100,
      status: 'completed',
      completionDate: '2024-01-25',
      score: 92,
      certificateIssued: true,
      manager: 'Michael Chen'
    },
    {
      id: 3,
      employeeId: 'EMP005',
      employeeName: 'Alex Thompson',
      department: 'Engineering',
      position: 'Junior Developer',
      courseTitle: 'Advanced React Development',
      enrollmentDate: '2024-01-22',
      progress: 45,
      status: 'in_progress',
      completionDate: null,
      score: null,
      certificateIssued: false,
      manager: 'Sarah Wilson'
    }
  ]

  const categories = ['all', 'Technical', 'Leadership', 'Compliance', 'Soft Skills', 'Product']
  const statuses = ['all', 'active', 'enrollment_open', 'completed', 'cancelled', 'draft']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'enrollment_open':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredCourses = trainingCourses.filter(course => {
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter
    return matchesStatus && matchesCategory
  })

  const stats = {
    totalCourses: trainingCourses.length,
    activeCourses: trainingCourses.filter(c => c.status === 'active').length,
    totalEnrollments: enrollments.length,
    completedTrainings: enrollments.filter(e => e.status === 'completed').length,
    averageRating: (trainingCourses.reduce((sum, c) => sum + c.rating, 0) / trainingCourses.length).toFixed(1),
    totalInvestment: trainingCourses.reduce((sum, c) => sum + (c.price * c.currentEnrollments), 0),
    certificatesIssued: enrollments.filter(e => e.certificateIssued).length,
    averageCompletion: Math.round(trainingCourses.reduce((sum, c) => sum + c.completionRate, 0) / trainingCourses.length)
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Training Administration</h1>
            <p className="text-gray-600">Manage training programs and employee development</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('courses')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'courses' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setView('enrollments')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'enrollments' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Enrollments
              </button>
              <button
                onClick={() => setView('analytics')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'analytics' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Analytics
              </button>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              Create Course
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.activeCourses}</div>
                <div className="text-sm text-gray-600">Active Courses</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              {stats.totalCourses} total courses
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</div>
                <div className="text-sm text-gray-600">Total Enrollments</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              {stats.completedTrainings} completed
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.certificatesIssued}</div>
                <div className="text-sm text-gray-600">Certificates Issued</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-purple-600">
              {stats.averageRating} avg rating
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(stats.totalInvestment / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Training Investment</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-yellow-600">
              {stats.averageCompletion}% avg completion
            </div>
          </div>
        </div>

        {view === 'courses' && (
          <>
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status.replace('_', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                          {course.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Category: {course.category}</span>
                        <span>Duration: {course.duration}</span>
                        <span>Format: {course.format}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Instructor</div>
                      <div className="font-medium text-gray-900">{course.instructor}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Price</div>
                      <div className="font-medium text-gray-900">${course.price}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Enrollments</div>
                      <div className="font-medium text-gray-900">{course.currentEnrollments}/{course.maxParticipants}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Rating</div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-900">{course.rating}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className={`w-3 h-3 ${star <= course.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="text-sm font-medium text-gray-900">{course.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${course.completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors">
                          Manage
                        </button>
                        <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors">
                          Enroll Users
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'enrollments' && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Course</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Progress</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Score</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Certificate</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{enrollment.employeeName}</div>
                            <div className="text-sm text-gray-500">{enrollment.position}</div>
                            <div className="text-sm text-gray-500">{enrollment.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{enrollment.courseTitle}</div>
                        <div className="text-sm text-gray-500">
                          Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{enrollment.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                          {enrollment.status.replace('_', ' ').toUpperCase()}
                        </span>
                        {enrollment.completionDate && (
                          <div className="text-sm text-gray-500 mt-1">
                            Completed: {new Date(enrollment.completionDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {enrollment.score ? (
                          <span className="font-medium text-gray-900">{enrollment.score}%</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {enrollment.certificateIssued ? (
                          <span className="text-green-600 font-medium">Issued</span>
                        ) : (
                          <span className="text-gray-400">Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <Play className="w-4 h-4" />
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

        {view === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Training ROI Analysis</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Investment:</span>
                  <span className="font-semibold text-gray-900">${stats.totalInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completion Rate:</span>
                  <span className="font-semibold text-gray-900">{stats.averageCompletion}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Employee Satisfaction:</span>
                  <span className="font-semibold text-gray-900">{stats.averageRating}/5.0</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h2>
              <div className="space-y-3">
                {categories.slice(1).map((category) => {
                  const categoryEnrollments = enrollments.filter(e => 
                    trainingCourses.find(c => c.title === e.courseTitle)?.category === category
                  ).length
                  return (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-gray-600">{category}:</span>
                      <span className="font-semibold text-gray-900">{categoryEnrollments} enrollments</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminTrainingPage
