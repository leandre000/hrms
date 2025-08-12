import React, { useState } from 'react'
import { 
  Video, 
  Play, 
  Clock, 
  Users, 
  BookOpen, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Share2,
  Star,
  CheckCircle
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  category: string
  instructor: string
  duration: string
  modules: number
  lessons: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: 'draft' | 'published' | 'archived'
  enrollmentCount: number
  rating: number
  completionRate: number
  lastUpdated: string
  thumbnail: string
  tags: string[]
  price: number
  isFree: boolean
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, state, props, and hooks.',
    category: 'Web Development',
    instructor: 'Sarah Johnson',
    duration: '12 hours',
    modules: 8,
    lessons: 24,
    difficulty: 'beginner',
    status: 'published',
    enrollmentCount: 156,
    rating: 4.7,
    completionRate: 78,
    lastUpdated: '2024-01-15',
    thumbnail: '/api/placeholder/300/200',
    tags: ['React', 'JavaScript', 'Frontend'],
    price: 49.99,
    isFree: false
  },
  {
    id: '2',
    title: 'Advanced JavaScript Patterns',
    description: 'Master advanced JavaScript concepts and design patterns for better code quality.',
    category: 'Programming',
    instructor: 'Mike Chen',
    duration: '18 hours',
    modules: 12,
    lessons: 36,
    difficulty: 'advanced',
    status: 'published',
    enrollmentCount: 89,
    rating: 4.9,
    completionRate: 65,
    lastUpdated: '2024-01-20',
    thumbnail: '/api/placeholder/300/200',
    tags: ['JavaScript', 'Design Patterns', 'Advanced'],
    price: 79.99,
    isFree: false
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn fundamental design principles and create user-friendly interfaces.',
    category: 'Design',
    instructor: 'Emily Davis',
    duration: '15 hours',
    modules: 10,
    lessons: 30,
    difficulty: 'beginner',
    status: 'published',
    enrollmentCount: 203,
    rating: 4.6,
    completionRate: 82,
    lastUpdated: '2024-01-18',
    thumbnail: '/api/placeholder/300/200',
    tags: ['Design', 'UI/UX', 'User Experience'],
    price: 59.99,
    isFree: false
  },
  {
    id: '4',
    title: 'Data Science Basics',
    description: 'Introduction to data science concepts, tools, and methodologies.',
    category: 'Data Science',
    instructor: 'David Wilson',
    duration: '20 hours',
    modules: 14,
    lessons: 42,
    difficulty: 'intermediate',
    status: 'draft',
    enrollmentCount: 0,
    rating: 0,
    completionRate: 0,
    lastUpdated: '2024-01-25',
    thumbnail: '/api/placeholder/300/200',
    tags: ['Data Science', 'Python', 'Analytics'],
    price: 89.99,
    isFree: false
  },
  {
    id: '5',
    title: 'Project Management Essentials',
    description: 'Learn essential project management skills and methodologies.',
    category: 'Business',
    instructor: 'Lisa Brown',
    duration: '16 hours',
    modules: 11,
    lessons: 33,
    difficulty: 'beginner',
    status: 'published',
    enrollmentCount: 134,
    rating: 4.5,
    completionRate: 75,
    lastUpdated: '2024-01-22',
    thumbnail: '/api/placeholder/300/200',
    tags: ['Project Management', 'Leadership', 'Business'],
    price: 69.99,
    isFree: false
  }
]

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter
    
    return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </div>
    ))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Create, manage, and organize your training courses</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Course
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-blue-600">{mockCourses.length}</p>
            </div>
            <Video className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {mockCourses.filter(c => c.status === 'published').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-purple-600">
                {mockCourses.reduce((sum, c) => sum + c.enrollmentCount, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-orange-600">
                {(mockCourses.filter(c => c.rating > 0).reduce((sum, c) => sum + c.rating, 0) / 
                  mockCourses.filter(c => c.rating > 0).length || 0).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Business">Business</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <div className="space-y-1 w-4 h-4">
                <div className="bg-current rounded-sm h-1"></div>
                <div className="bg-current rounded-sm h-1"></div>
                <div className="bg-current rounded-sm h-1"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Courses Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {course.isFree ? 'Free' : formatPrice(course.price)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Modules:</span>
                    <span className="text-gray-900">{course.modules}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lessons:</span>
                    <span className="text-gray-900">{course.lessons}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 2 && (
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{course.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{course.enrollmentCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(course.rating)}
                    <span className="text-sm text-gray-600">({course.rating})</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{course.instructor}</span>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-900">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                        <Play className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.instructor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.enrollmentCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(course.rating)}
                      <span className="text-sm text-gray-600">({course.rating})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Video className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  )
}

export default CoursesPage
