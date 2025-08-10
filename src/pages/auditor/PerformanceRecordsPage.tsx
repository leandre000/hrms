import React from 'react'
import { TrendingUp, Star, Target, User } from 'lucide-react'

const PerformanceRecordsPage = () => {
  const performanceRecords = [
    {
      employee: 'John Doe',
      department: 'Engineering',
      lastReview: '2023-12-15',
      rating: 4.5,
      goalsCompleted: 8,
      totalGoals: 10,
      trend: 'improving',
      issues: []
    },
    {
      employee: 'Sarah Wilson',
      department: 'Marketing',
      lastReview: '2023-11-30',
      rating: 3.8,
      goalsCompleted: 6,
      totalGoals: 8,
      trend: 'stable',
      issues: ['Overdue performance review']
    },
    {
      employee: 'Mike Johnson',
      department: 'Sales',
      lastReview: '2023-09-15',
      rating: 3.2,
      goalsCompleted: 4,
      totalGoals: 10,
      trend: 'declining',
      issues: ['Performance review overdue', 'Below target achievement']
    }
  ]

  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return 'text-green-600'
    if (rating >= 3.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Performance Records</h1>
        <div className="space-y-4">
          {performanceRecords.map((record, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{record.employee}</h3>
                    <p className="text-sm text-gray-600">{record.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(record.trend)}
                  <span className="text-sm text-gray-600 capitalize">{record.trend}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600 text-sm">Rating</span>
                  </div>
                  <div className={`font-bold text-xl ${getRatingColor(record.rating)}`}>
                    {record.rating}/5.0
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600 text-sm">Goals</span>
                  </div>
                  <div className="font-medium">
                    {record.goalsCompleted}/{record.totalGoals} completed
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${(record.goalsCompleted / record.totalGoals) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Last Review</span>
                  <div className="font-medium">{new Date(record.lastReview).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Achievement Rate</span>
                  <div className="font-medium">{((record.goalsCompleted / record.totalGoals) * 100).toFixed(0)}%</div>
                </div>
              </div>

              {record.issues.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Performance Issues:</h4>
                  <ul className="space-y-1">
                    {record.issues.map((issue, i) => (
                      <li key={i} className="text-sm text-red-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PerformanceRecordsPage
