import React, { useState } from 'react'
import { Star, TrendingUp, Calendar, FileText, Award, Target, Eye, Download } from 'lucide-react'

const PerformancePage = () => {
  const [selectedReview, setSelectedReview] = useState<any>(null)

  // Mock performance data
  const currentRating = {
    overall: 4.2,
    categories: [
      { name: 'Technical Skills', rating: 4.5, trend: 'up' },
      { name: 'Communication', rating: 4.0, trend: 'up' },
      { name: 'Leadership', rating: 3.8, trend: 'stable' },
      { name: 'Problem Solving', rating: 4.3, trend: 'up' },
      { name: 'Teamwork', rating: 4.1, trend: 'stable' }
    ]
  }

  const performanceReviews = [
    {
      id: 1,
      period: 'Q4 2023',
      type: 'Quarterly Review',
      status: 'completed',
      overallRating: 4.2,
      completedDate: '2024-01-15',
      reviewer: 'Sarah Wilson',
      nextReviewDate: '2024-04-15',
      goals: 5,
      goalsAchieved: 4,
      strengths: [
        'Excellent technical problem-solving skills',
        'Strong collaboration with team members',
        'Proactive in learning new technologies'
      ],
      improvements: [
        'Could improve presentation skills',
        'Take more initiative in leading projects'
      ],
      comments: 'John has shown consistent growth and delivers high-quality work. Looking forward to seeing him take on more leadership responsibilities.'
    },
    {
      id: 2,
      period: 'Q3 2023',
      type: 'Quarterly Review',
      status: 'completed',
      overallRating: 3.9,
      completedDate: '2023-10-15',
      reviewer: 'Sarah Wilson',
      goals: 4,
      goalsAchieved: 3,
      strengths: [
        'Solid technical foundation',
        'Reliable and consistent delivery',
        'Good attention to detail'
      ],
      improvements: [
        'Increase participation in team meetings',
        'Work on time management skills'
      ]
    },
    {
      id: 3,
      period: 'Mid-Year 2023',
      type: 'Mid-Year Review',
      status: 'completed',
      overallRating: 3.7,
      completedDate: '2023-07-15',
      reviewer: 'Sarah Wilson',
      goals: 6,
      goalsAchieved: 4
    },
    {
      id: 4,
      period: 'Q1 2024',
      type: 'Quarterly Review',
      status: 'pending',
      dueDate: '2024-04-15',
      reviewer: 'Sarah Wilson'
    }
  ]

  const achievements = [
    {
      id: 1,
      title: 'Project Excellence Award',
      description: 'Outstanding performance on HRMS development project',
      date: '2024-01-20',
      type: 'recognition',
      icon: Award
    },
    {
      id: 2,
      title: 'Customer Success Champion',
      description: 'Resolved critical customer issues with innovative solutions',
      date: '2023-11-15',
      type: 'achievement',
      icon: Star
    },
    {
      id: 3,
      title: 'Team Player of the Month',
      description: 'Exceptional collaboration and support to team members',
      date: '2023-09-01',
      type: 'recognition',
      icon: Award
    }
  ]

  const renderStarRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key={fullStars} className="w-4 h-4 text-yellow-400 fill-current opacity-50" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={fullStars + i + 1} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />
      default:
        return <div className="w-4 h-4 border-t-2 border-gray-400"></div>
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Performance</h1>
            <p className="text-gray-600">Track your performance reviews, ratings, and achievements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Rating Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Current Performance Rating</h2>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary-600">{currentRating.overall}</span>
                  <div className="flex">{renderStarRating(currentRating.overall)}</div>
                </div>
              </div>

              <div className="space-y-4">
                {currentRating.categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      {getTrendIcon(category.trend)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{category.rating}</span>
                      <div className="flex">{renderStarRating(category.rating)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Reviews</h2>
              <div className="space-y-4">
                {performanceReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">{review.period}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(review.status)}`}>
                            {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{review.type}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {review.status === 'completed' 
                                ? `Completed: ${new Date(review.completedDate!).toLocaleDateString()}`
                                : `Due: ${new Date(review.dueDate!).toLocaleDateString()}`
                              }
                            </span>
                          </div>
                          <span>Reviewer: {review.reviewer}</span>
                        </div>
                        {review.overallRating && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-gray-600">Overall Rating:</span>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold">{review.overallRating}</span>
                              <div className="flex">{renderStarRating(review.overallRating)}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {review.status === 'completed' && (
                          <>
                            <button
                              onClick={() => setSelectedReview(review)}
                              className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                              title="Download PDF"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <achievement.icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reviews Completed</span>
                  <span className="font-semibold text-primary-600">
                    {performanceReviews.filter(r => r.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Goals Achievement Rate</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Peer Recognition</span>
                  <span className="font-semibold text-yellow-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Training Completed</span>
                  <span className="font-semibold text-blue-600">8</span>
                </div>
              </div>
            </div>

            {/* Upcoming Reviews */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">Upcoming Review</h4>
              </div>
              <p className="text-sm text-yellow-700">
                Your Q1 2024 performance review is due on April 15, 2024.
              </p>
              <button className="mt-2 text-xs text-yellow-800 underline hover:text-yellow-900">
                Prepare for review
              </button>
            </div>
          </div>
        </div>

        {/* Review Detail Modal */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Performance Review - {selectedReview.period}
                  </h2>
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Review Summary */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Review Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Period:</span>
                          <span>{selectedReview.period}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span>{selectedReview.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reviewer:</span>
                          <span>{selectedReview.reviewer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span>{new Date(selectedReview.completedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Overall Rating:</span>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">{selectedReview.overallRating}</span>
                            <div className="flex">{renderStarRating(selectedReview.overallRating)}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-3">Goal Achievement</h3>
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">
                            {selectedReview.goalsAchieved}/{selectedReview.goals}
                          </div>
                          <div className="text-sm text-green-700">Goals Achieved</div>
                          <div className="text-xs text-green-600 mt-1">
                            {Math.round((selectedReview.goalsAchieved / selectedReview.goals) * 100)}% Success Rate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Feedback */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Strengths</h3>
                      <ul className="space-y-2">
                        {selectedReview.strengths?.map((strength: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Areas for Improvement</h3>
                      <ul className="space-y-2">
                        {selectedReview.improvements?.map((improvement: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedReview.comments && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Manager Comments</h3>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-900">{selectedReview.comments}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => setSelectedReview(null)}
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

export default PerformancePage
