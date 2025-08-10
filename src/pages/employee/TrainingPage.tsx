import React, { useState } from 'react'
import { BookOpen, Play, CheckCircle, Clock, Award, Filter, Search, Calendar, Star, Users } from 'lucide-react'

const TrainingPage = () => {
  const [activeTab, setActiveTab] = useState('available')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock training data
  const availableTrainings = [
    {
      id: 1,
      title: 'Advanced React Development',
      provider: 'Tech Academy',
      description: 'Master advanced React concepts including hooks, context, and performance optimization.',
      category: 'Technical',
      level: 'Advanced',
      duration: '24 hours',
      format: 'Online',
      rating: 4.8,
      reviews: 234,
      price: 0, // Company paid
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      enrollmentDeadline: '2024-02-10',
      instructor: 'Sarah Mitchell',
      skills: ['React', 'JavaScript', 'Frontend Development'],
      prerequisites: ['Basic React knowledge', 'JavaScript ES6+'],
      learningObjectives: [
        'Master React Hooks and Context API',
        'Optimize React applications for performance',
        'Implement advanced state management patterns',
        'Build scalable React applications'
      ],
      enrolled: 45,
      capacity: 50,
      status: 'open'
    },
    {
      id: 2,
      title: 'Leadership Fundamentals',
      provider: 'Leadership Institute',
      description: 'Essential leadership skills for emerging leaders and team leads.',
      category: 'Leadership',
      level: 'Intermediate',
      duration: '16 hours',
      format: 'Blended',
      rating: 4.6,
      reviews: 189,
      price: 0,
      startDate: '2024-03-01',
      endDate: '2024-03-30',
      enrollmentDeadline: '2024-02-25',
      instructor: 'Michael Chen',
      skills: ['Leadership', 'Team Management', 'Communication'],
      prerequisites: ['2+ years work experience'],
      learningObjectives: [
        'Develop core leadership competencies',
        'Learn effective team management strategies',
        'Master communication and delegation skills',
        'Build emotional intelligence'
      ],
      enrolled: 28,
      capacity: 30,
      status: 'open'
    },
    {
      id: 3,
      title: 'Data Analysis with Python',
      provider: 'Data Science Academy',
      description: 'Learn data analysis, visualization, and basic machine learning with Python.',
      category: 'Technical',
      level: 'Beginner',
      duration: '32 hours',
      format: 'Online',
      rating: 4.7,
      reviews: 156,
      price: 299,
      startDate: '2024-02-20',
      endDate: '2024-04-20',
      enrollmentDeadline: '2024-02-15',
      instructor: 'Dr. Elena Rodriguez',
      skills: ['Python', 'Data Analysis', 'Machine Learning'],
      prerequisites: ['Basic programming knowledge'],
      enrolled: 42,
      capacity: 40,
      status: 'waitlist'
    },
    {
      id: 4,
      title: 'Agile Project Management',
      provider: 'Project Management Institute',
      description: 'Master Agile methodologies and Scrum framework for effective project management.',
      category: 'Project Management',
      level: 'Intermediate',
      duration: '20 hours',
      format: 'In-person',
      rating: 4.9,
      reviews: 298,
      price: 0,
      startDate: '2024-03-10',
      endDate: '2024-03-24',
      enrollmentDeadline: '2024-03-05',
      instructor: 'James Wilson',
      skills: ['Agile', 'Scrum', 'Project Management'],
      prerequisites: ['Basic project management experience'],
      enrolled: 20,
      capacity: 25,
      status: 'open'
    }
  ]

  const enrolledTrainings = [
    {
      id: 1,
      title: 'React Fundamentals',
      provider: 'Tech Academy',
      progress: 85,
      status: 'in_progress',
      enrolledDate: '2024-01-15',
      dueDate: '2024-02-15',
      lastAccessed: '2024-01-20',
      completedModules: 8,
      totalModules: 10,
      grade: null,
      certificate: null
    },
    {
      id: 2,
      title: 'Communication Skills Workshop',
      provider: 'Soft Skills Academy',
      progress: 100,
      status: 'completed',
      enrolledDate: '2023-12-01',
      completedDate: '2023-12-20',
      grade: 92,
      certificate: 'CSW-2023-001234',
      rating: 4.5
    },
    {
      id: 3,
      title: 'Cybersecurity Awareness',
      provider: 'Security Institute',
      progress: 100,
      status: 'completed',
      enrolledDate: '2023-11-01',
      completedDate: '2023-11-15',
      grade: 88,
      certificate: 'CSA-2023-005678',
      rating: 4.2
    }
  ]

  const completedTrainings = [
    {
      id: 1,
      title: 'JavaScript ES6+ Masterclass',
      provider: 'Code Academy',
      completedDate: '2023-10-15',
      grade: 95,
      certificate: 'JS-2023-012345',
      skills: ['JavaScript', 'ES6+', 'Async Programming'],
      duration: '20 hours'
    },
    {
      id: 2,
      title: 'Git Version Control',
      provider: 'Dev Tools Academy',
      completedDate: '2023-09-20',
      grade: 89,
      certificate: 'GIT-2023-067890',
      skills: ['Git', 'Version Control', 'Collaboration'],
      duration: '8 hours'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800'
      case 'waitlist':
        return 'bg-yellow-100 text-yellow-800'
      case 'closed':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'in_progress':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
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

  const filteredTrainings = availableTrainings.filter(training => {
    const matchesFilter = filter === 'all' || training.category === filter
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const handleEnroll = (trainingId: number) => {
    // Enrollment logic here
    console.log('Enrolling in training:', trainingId)
  }

  const stats = {
    totalEnrolled: enrolledTrainings.length,
    completed: enrolledTrainings.filter(t => t.status === 'completed').length,
    inProgress: enrolledTrainings.filter(t => t.status === 'in_progress').length,
    certificates: completedTrainings.length + enrolledTrainings.filter(t => t.certificate).length
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Training Courses</h1>
            <p className="text-gray-600">Explore and enroll in professional development courses</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.totalEnrolled}</div>
                <div className="text-sm text-gray-600">Enrolled</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{stats.certificates}</div>
                <div className="text-sm text-gray-600">Certificates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'available', label: 'Available Courses', count: availableTrainings.length },
              { id: 'enrolled', label: 'My Courses', count: enrolledTrainings.length },
              { id: 'completed', label: 'Completed', count: completedTrainings.length }
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
        {activeTab === 'available' && (
          <div>
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="Technical">Technical</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTrainings.map((training) => (
                <div key={training.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{training.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{training.provider}</p>
                      <p className="text-gray-700 text-sm mb-3">{training.description}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(training.status)} ml-4`}>
                      {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-medium">{training.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <span className="ml-2 font-medium">{training.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Format:</span>
                      <span className="ml-2 font-medium">{training.format}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Level:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getLevelColor(training.level)}`}>
                        {training.level}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="flex">{renderStarRating(training.rating)}</div>
                      <span className="font-medium">{training.rating}</span>
                      <span className="text-gray-500">({training.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{training.enrolled}/{training.capacity}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {training.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                    {training.skills.length > 3 && (
                      <span className="text-gray-500 text-xs">+{training.skills.length - 3} more</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div className="text-gray-500">Starts:</div>
                      <div className="font-medium">{new Date(training.startDate).toLocaleDateString()}</div>
                    </div>
                    <div className="text-sm text-right">
                      <div className="text-gray-500">Price:</div>
                      <div className="font-medium">
                        {training.price === 0 ? 'Company Paid' : `$${training.price}`}
                      </div>
                    </div>
                    <button
                      onClick={() => handleEnroll(training.id)}
                      disabled={training.status !== 'open'}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        training.status === 'open'
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : training.status === 'waitlist'
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {training.status === 'open' ? 'Enroll' : 
                       training.status === 'waitlist' ? 'Join Waitlist' : 'Closed'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'enrolled' && (
          <div className="space-y-6">
            {enrolledTrainings.map((training) => (
              <div key={training.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{training.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{training.provider}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Enrolled: {new Date(training.enrolledDate).toLocaleDateString()}</span>
                      {training.status === 'in_progress' && (
                        <span>Due: {new Date(training.dueDate!).toLocaleDateString()}</span>
                      )}
                      {training.status === 'completed' && training.completedDate && (
                        <span>Completed: {new Date(training.completedDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(training.status)}`}>
                    {training.status === 'in_progress' ? 'In Progress' : 'Completed'}
                  </span>
                </div>

                {training.status === 'in_progress' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{training.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${training.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {training.completedModules}/{training.totalModules} modules completed
                    </div>
                  </div>
                )}

                {training.status === 'completed' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Grade:</span>
                      <span className="ml-2 font-medium text-green-600">{training.grade}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Certificate:</span>
                      <span className="ml-2 font-medium">{training.certificate}</span>
                    </div>
                    {training.rating && (
                      <div>
                        <span className="text-gray-500">My Rating:</span>
                        <div className="ml-2 flex items-center gap-1">
                          <div className="flex">{renderStarRating(training.rating)}</div>
                          <span className="font-medium">{training.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  {training.status === 'in_progress' && (
                    <div className="text-sm text-gray-500">
                      Last accessed: {new Date(training.lastAccessed!).toLocaleDateString()}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {training.status === 'in_progress' && (
                      <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        <Play className="w-4 h-4" />
                        Continue
                      </button>
                    )}
                    {training.certificate && (
                      <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <Award className="w-4 h-4" />
                        View Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedTrainings.map((training) => (
              <div key={training.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{training.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{training.provider}</p>
                    <div className="text-sm text-gray-500">
                      Completed: {new Date(training.completedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium">{training.grade}%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Skills Gained:</div>
                  <div className="flex flex-wrap gap-1">
                    {training.skills.map((skill, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="ml-2 font-medium">{training.duration}</span>
                  </div>
                  <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    <Award className="w-4 h-4" />
                    View Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TrainingPage
