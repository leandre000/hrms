import React, { useState } from 'react'
import { TrendingUp, Target, Award, BookOpen, Users, ChevronRight, Calendar, Star, CheckCircle } from 'lucide-react'

const CareerPathPage = () => {
  const [activeTab, setActiveTab] = useState('current')

  // Mock career path data
  const careerLevels = [
    {
      id: 1,
      title: 'Junior Developer',
      level: 'L1',
      salary: '$60,000 - $75,000',
      status: 'completed',
      completedDate: '2022-03-01',
      duration: '12 months',
      skills: ['HTML/CSS', 'JavaScript', 'Basic React', 'Git'],
      responsibilities: ['Code simple features', 'Learn best practices', 'Participate in code reviews'],
      achievements: ['Completed bootcamp', 'First production feature', 'Peer recognition award']
    },
    {
      id: 2,
      title: 'Software Developer',
      level: 'L2',
      salary: '$75,000 - $90,000',
      status: 'completed',
      completedDate: '2023-06-15',
      duration: '15 months',
      skills: ['React', 'TypeScript', 'Node.js', 'Testing', 'API Design'],
      responsibilities: ['Develop full features', 'Mentor junior developers', 'Lead small projects'],
      achievements: ['Led authentication project', 'Mentored 2 junior developers', 'Technical excellence award']
    },
    {
      id: 3,
      title: 'Senior Developer',
      level: 'L3',
      salary: '$90,000 - $120,000',
      status: 'current',
      startDate: '2023-06-15',
      expectedDuration: '18-24 months',
      skills: ['Advanced React', 'System Design', 'Architecture', 'Team Leadership', 'Performance Optimization'],
      responsibilities: ['Design system architecture', 'Lead development teams', 'Drive technical decisions'],
      currentProgress: 65,
      achievements: ['Completed microservices migration', 'Team lead certification'],
      nextMilestones: [
        { title: 'Complete system design course', status: 'in_progress', dueDate: '2024-03-15' },
        { title: 'Lead major feature launch', status: 'pending', dueDate: '2024-05-01' },
        { title: 'Mentor 3+ developers', status: 'completed', completedDate: '2024-01-20' }
      ]
    },
    {
      id: 4,
      title: 'Staff Engineer',
      level: 'L4',
      salary: '$120,000 - $150,000',
      status: 'next',
      requirements: [
        'Demonstrated technical leadership',
        'Successful major project delivery',
        'Strong mentoring track record',
        'System design expertise'
      ],
      skills: ['Technical Strategy', 'Cross-team Collaboration', 'Innovation', 'Technical Mentoring'],
      responsibilities: ['Define technical roadmap', 'Drive engineering standards', 'Influence product direction'],
      estimatedTimeframe: '12-18 months'
    },
    {
      id: 5,
      title: 'Principal Engineer',
      level: 'L5',
      salary: '$150,000 - $200,000',
      status: 'future',
      requirements: [
        'Proven architectural expertise',
        'Company-wide technical impact',
        'Innovation and thought leadership',
        'Strategic business understanding'
      ],
      skills: ['Technical Vision', 'Strategic Planning', 'Industry Expertise', 'Executive Communication'],
      responsibilities: ['Set technical vision', 'Drive innovation', 'External technical presence'],
      estimatedTimeframe: '3-5 years'
    }
  ]

  const skillsMatrix = {
    'Technical Skills': {
      'Programming Languages': { current: 4, target: 5, skills: ['JavaScript', 'TypeScript', 'Python'] },
      'Frontend Frameworks': { current: 4, target: 4, skills: ['React', 'Next.js', 'Vue.js'] },
      'Backend Development': { current: 3, target: 4, skills: ['Node.js', 'Express', 'GraphQL'] },
      'System Design': { current: 3, target: 4, skills: ['Microservices', 'API Design', 'Database Design'] },
      'DevOps & Tools': { current: 2, target: 3, skills: ['Docker', 'AWS', 'CI/CD'] }
    },
    'Leadership Skills': {
      'Team Leadership': { current: 3, target: 4, skills: ['Project Management', 'Team Building', 'Delegation'] },
      'Mentoring': { current: 4, target: 4, skills: ['Code Review', 'Knowledge Transfer', 'Career Guidance'] },
      'Communication': { current: 3, target: 4, skills: ['Technical Writing', 'Presentations', 'Stakeholder Management'] },
      'Strategic Thinking': { current: 2, target: 3, skills: ['Planning', 'Decision Making', 'Innovation'] }
    }
  }

  const developmentPlan = [
    {
      id: 1,
      goal: 'Master System Design',
      category: 'Technical',
      priority: 'high',
      targetDate: '2024-06-30',
      progress: 40,
      activities: [
        { name: 'Complete System Design Course', status: 'in_progress', progress: 60 },
        { name: 'Design Authentication Service', status: 'completed', progress: 100 },
        { name: 'Lead Architecture Review', status: 'pending', progress: 0 },
        { name: 'Present to Engineering Team', status: 'pending', progress: 0 }
      ]
    },
    {
      id: 2,
      goal: 'Develop Leadership Skills',
      category: 'Leadership',
      priority: 'high',
      targetDate: '2024-08-31',
      progress: 70,
      activities: [
        { name: 'Complete Leadership Training', status: 'completed', progress: 100 },
        { name: 'Lead Cross-functional Project', status: 'in_progress', progress: 75 },
        { name: 'Mentor Junior Developers', status: 'completed', progress: 100 },
        { name: 'Give Tech Talk', status: 'in_progress', progress: 30 }
      ]
    },
    {
      id: 3,
      goal: 'Cloud Infrastructure Expertise',
      category: 'Technical',
      priority: 'medium',
      targetDate: '2024-12-31',
      progress: 25,
      activities: [
        { name: 'AWS Certification Study', status: 'in_progress', progress: 50 },
        { name: 'Infrastructure Migration Project', status: 'pending', progress: 0 },
        { name: 'DevOps Workshop', status: 'pending', progress: 0 }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'current':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'next':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'future':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
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

  const renderSkillBar = (current: number, target: number, maxLevel = 5) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: maxLevel }, (_, i) => {
          const level = i + 1
          let bgColor = 'bg-gray-200'
          
          if (level <= current) {
            bgColor = 'bg-primary-600'
          } else if (level <= target) {
            bgColor = 'bg-primary-300'
          }
          
          return (
            <div key={i} className={`w-6 h-2 rounded-sm ${bgColor}`} />
          )
        })}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Career Development Path</h1>
            <p className="text-gray-600">Track your career progression and plan your next steps</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'current', label: 'Career Ladder' },
              { id: 'skills', label: 'Skills Matrix' },
              { id: 'development', label: 'Development Plan' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'current' && (
          <div className="space-y-6">
            {/* Career Ladder */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Engineering Career Ladder</h2>
              <div className="space-y-6">
                {careerLevels.map((level, index) => (
                  <div key={level.id} className="relative">
                    {index < careerLevels.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-20 bg-gray-300"></div>
                    )}
                    <div className={`border-2 rounded-lg p-6 ${getStatusColor(level.status)}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                            level.status === 'completed' ? 'bg-green-500' :
                            level.status === 'current' ? 'bg-blue-500' :
                            level.status === 'next' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}>
                            {level.level}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{level.title}</h3>
                            <p className="text-gray-600">{level.salary}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {level.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {level.status === 'current' && (
                            <div className="text-sm text-blue-700 font-medium">
                              {level.currentProgress}% Complete
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Key Skills</h4>
                          <div className="space-y-1">
                            {level.skills.map((skill, idx) => (
                              <div key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Responsibilities</h4>
                          <div className="space-y-1">
                            {level.responsibilities.map((resp, idx) => (
                              <div key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                {resp}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            {level.status === 'completed' ? 'Achievements' : 
                             level.status === 'current' ? 'Current Progress' : 
                             'Requirements'}
                          </h4>
                          {level.achievements && (
                            <div className="space-y-1">
                              {level.achievements.map((achievement, idx) => (
                                <div key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                  <Award className="w-3 h-3 text-yellow-600" />
                                  {achievement}
                                </div>
                              ))}
                            </div>
                          )}
                          {level.nextMilestones && (
                            <div className="space-y-2">
                              {level.nextMilestones.map((milestone, idx) => (
                                <div key={idx} className="text-sm flex items-center gap-2">
                                  {milestone.status === 'completed' ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : milestone.status === 'in_progress' ? (
                                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                                  )}
                                  <span className={milestone.status === 'completed' ? 'text-green-700' : 'text-gray-700'}>
                                    {milestone.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          {level.requirements && (
                            <div className="space-y-1">
                              {level.requirements.map((req, idx) => (
                                <div key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                  <Target className="w-3 h-3 text-blue-600" />
                                  {req}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {level.status === 'current' && level.currentProgress && (
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Progress to Next Level</span>
                            <span className="text-sm font-medium">{level.currentProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${level.currentProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            {Object.entries(skillsMatrix).map(([category, skills]) => (
              <div key={category} className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{category}</h2>
                <div className="space-y-4">
                  {Object.entries(skills).map(([skillName, skillData]) => (
                    <div key={skillName} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-900">{skillName}</h3>
                        <div className="text-sm text-gray-600">
                          Current: {skillData.current}/5 | Target: {skillData.target}/5
                        </div>
                      </div>
                      <div className="mb-3">
                        {renderSkillBar(skillData.current, skillData.target)}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {skillData.skills.map((skill, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'development' && (
          <div className="space-y-6">
            {developmentPlan.map((goal) => (
              <div key={goal.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.goal}</h3>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getPriorityColor(goal.priority)}`}>
                        {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                      </span>
                      <span className="text-sm text-gray-600">
                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{goal.progress}%</div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Activities</h4>
                  <div className="space-y-2">
                    {goal.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {activity.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : activity.status === 'in_progress' ? (
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <div className="w-5 h-5 border border-gray-300 rounded-full"></div>
                          )}
                          <span className={activity.status === 'completed' ? 'text-green-700' : 'text-gray-700'}>
                            {activity.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                activity.status === 'completed' ? 'bg-green-600' :
                                activity.status === 'in_progress' ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                              style={{ width: `${activity.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">{activity.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CareerPathPage
