import React, { useState } from 'react'
import { BarChart3, TrendingUp, Target, Award, Users, Calendar, Filter } from 'lucide-react'

interface PerformanceMetric {
  id: string
  name: string
  target: number
  actual: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  change: number
}

interface TeamMemberPerformance {
  id: string
  name: string
  role: string
  avatar: string
  overallScore: number
  productivity: number
  quality: number
  collaboration: number
  innovation: number
  lastReview: string
  nextReview: string
}

const TeamPerformancePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2024')
  const [selectedMetric, setSelectedMetric] = useState('All')

  const performanceMetrics: PerformanceMetric[] = [
    {
      id: '1',
      name: 'Project Completion Rate',
      target: 85,
      actual: 92,
      unit: '%',
      trend: 'up',
      change: 7
    },
    {
      id: '2',
      name: 'Code Quality Score',
      target: 90,
      actual: 87,
      unit: '%',
      trend: 'down',
      change: -3
    },
    {
      id: '3',
      name: 'Customer Satisfaction',
      target: 4.5,
      actual: 4.7,
      unit: '/5',
      trend: 'up',
      change: 0.2
    },
    {
      id: '4',
      name: 'Team Velocity',
      target: 25,
      actual: 28,
      unit: 'points/sprint',
      trend: 'up',
      change: 3
    },
    {
      id: '5',
      name: 'Bug Resolution Time',
      target: 2,
      actual: 1.8,
      unit: 'days',
      trend: 'up',
      change: -0.2
    }
  ]

  const teamPerformance: TeamMemberPerformance[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Senior Developer',
      avatar: 'SC',
      overallScore: 92,
      productivity: 95,
      quality: 88,
      collaboration: 90,
      innovation: 94,
      lastReview: '2024-10-15',
      nextReview: '2025-01-15'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Frontend Developer',
      avatar: 'MJ',
      overallScore: 87,
      productivity: 85,
      quality: 90,
      collaboration: 88,
      innovation: 85,
      lastReview: '2024-10-20',
      nextReview: '2025-01-20'
    },
    {
      id: '3',
      name: 'Emily Davis',
      role: 'UX Designer',
      avatar: 'ED',
      overallScore: 95,
      productivity: 92,
      quality: 96,
      collaboration: 94,
      innovation: 98,
      lastReview: '2024-10-10',
      nextReview: '2025-01-10'
    }
  ]

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />
      case 'down': return <TrendingUp className="h-4 w-4 transform rotate-180" />
      default: return <div className="h-4 w-4" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Performance</h1>
        <p className="text-gray-600">Monitor and analyze your team's performance metrics and individual contributions</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="Q4 2024">Q4 2024</option>
              <option value="Q3 2024">Q3 2024</option>
              <option value="Q2 2024">Q2 2024</option>
              <option value="Q1 2024">Q1 2024</option>
            </select>
            
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Metrics</option>
              <option value="Productivity">Productivity</option>
              <option value="Quality">Quality</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Innovation">Innovation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Key Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Metrics</h2>
          <div className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{metric.name}</h3>
                  <p className="text-xs text-gray-500">Target: {metric.target}{metric.unit}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{metric.actual}{metric.unit}</span>
                    <div className={`flex items-center ${getTrendColor(metric.trend)}`}>
                      {getTrendIcon(metric.trend)}
                      <span className="text-sm ml-1">
                        {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Performance Trends</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overall Team Score</span>
              <span className="text-2xl font-bold text-primary-600">89%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '89%' }}></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-600">Productivity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">88%</div>
                <div className="text-sm text-gray-600">Quality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">91%</div>
                <div className="text-sm text-gray-600">Collaboration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">89%</div>
                <div className="text-sm text-gray-600">Innovation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Individual Performance</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productivity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collaboration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Innovation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamPerformance.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">{member.avatar}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-lg font-bold ${getScoreColor(member.overallScore)}`}>
                      {member.overallScore}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getScoreColor(member.productivity)}`}>
                      {member.productivity}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getScoreColor(member.quality)}`}>
                      {member.quality}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getScoreColor(member.collaboration)}`}>
                      {member.collaboration}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getScoreColor(member.innovation)}`}>
                      {member.innovation}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(member.nextReview).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">View Details</button>
                    <button className="text-primary-600 hover:text-primary-900">Schedule Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Performance Report
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Team Reviews
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Award className="h-4 w-4 mr-2" />
          Set Performance Goals
        </button>
      </div>
    </div>
  )
}

export default TeamPerformancePage
