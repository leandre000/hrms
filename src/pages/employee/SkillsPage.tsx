import React, { useState } from 'react'
import { Star, Plus, TrendingUp, Target, BookOpen, Award, BarChart, Edit, Trash2 } from 'lucide-react'

const SkillsPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddSkill, setShowAddSkill] = useState(false)
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    currentLevel: 1,
    targetLevel: 5,
    priority: 'medium'
  })

  // Mock skills data
  const skillCategories = [
    {
      name: 'Technical Skills',
      skills: [
        {
          id: 1,
          name: 'React',
          currentLevel: 4,
          targetLevel: 5,
          priority: 'high',
          lastAssessed: '2024-01-15',
          endorsements: 8,
          certifications: ['React Developer Certification'],
          learningResources: [
            { name: 'Advanced React Course', type: 'course', progress: 75 },
            { name: 'React Documentation', type: 'documentation', progress: 100 }
          ],
          assessmentHistory: [
            { date: '2024-01-15', level: 4, assessor: 'Self-Assessment' },
            { date: '2023-10-15', level: 3, assessor: 'Manager Review' },
            { date: '2023-07-15', level: 3, assessor: 'Peer Review' }
          ]
        },
        {
          id: 2,
          name: 'JavaScript',
          currentLevel: 4,
          targetLevel: 4,
          priority: 'medium',
          lastAssessed: '2024-01-10',
          endorsements: 12,
          certifications: ['JavaScript ES6+ Masterclass'],
          learningResources: [
            { name: 'Modern JavaScript Course', type: 'course', progress: 100 }
          ],
          assessmentHistory: [
            { date: '2024-01-10', level: 4, assessor: 'Technical Lead' },
            { date: '2023-09-10', level: 4, assessor: 'Self-Assessment' }
          ]
        },
        {
          id: 3,
          name: 'Python',
          currentLevel: 2,
          targetLevel: 4,
          priority: 'high',
          lastAssessed: '2023-12-20',
          endorsements: 3,
          certifications: [],
          learningResources: [
            { name: 'Python for Beginners', type: 'course', progress: 60 },
            { name: 'Data Analysis with Python', type: 'course', progress: 30 }
          ],
          assessmentHistory: [
            { date: '2023-12-20', level: 2, assessor: 'Self-Assessment' },
            { date: '2023-08-20', level: 1, assessor: 'Self-Assessment' }
          ]
        }
      ]
    },
    {
      name: 'Soft Skills',
      skills: [
        {
          id: 4,
          name: 'Communication',
          currentLevel: 4,
          targetLevel: 5,
          priority: 'high',
          lastAssessed: '2024-01-20',
          endorsements: 15,
          certifications: ['Communication Skills Workshop'],
          learningResources: [
            { name: 'Public Speaking Course', type: 'course', progress: 40 }
          ],
          assessmentHistory: [
            { date: '2024-01-20', level: 4, assessor: 'Manager Review' },
            { date: '2023-10-20', level: 3, assessor: 'Peer Review' }
          ]
        },
        {
          id: 5,
          name: 'Leadership',
          currentLevel: 3,
          targetLevel: 4,
          priority: 'medium',
          lastAssessed: '2023-12-15',
          endorsements: 6,
          certifications: [],
          learningResources: [
            { name: 'Leadership Fundamentals', type: 'course', progress: 65 }
          ],
          assessmentHistory: [
            { date: '2023-12-15', level: 3, assessor: 'Manager Review' },
            { date: '2023-06-15', level: 2, assessor: 'Self-Assessment' }
          ]
        }
      ]
    },
    {
      name: 'Tools & Platforms',
      skills: [
        {
          id: 6,
          name: 'Git',
          currentLevel: 4,
          targetLevel: 4,
          priority: 'low',
          lastAssessed: '2024-01-05',
          endorsements: 10,
          certifications: ['Git Version Control'],
          learningResources: [],
          assessmentHistory: [
            { date: '2024-01-05', level: 4, assessor: 'Peer Review' }
          ]
        },
        {
          id: 7,
          name: 'AWS',
          currentLevel: 3,
          targetLevel: 5,
          priority: 'high',
          lastAssessed: '2023-11-30',
          endorsements: 5,
          certifications: ['AWS Certified Developer'],
          learningResources: [
            { name: 'AWS Solutions Architect Course', type: 'course', progress: 20 }
          ],
          assessmentHistory: [
            { date: '2023-11-30', level: 3, assessor: 'Certification Exam' },
            { date: '2023-08-30', level: 2, assessor: 'Self-Assessment' }
          ]
        }
      ]
    }
  ]

  const skillLevels = [
    { level: 1, name: 'Beginner', description: 'Basic understanding', color: 'bg-red-500' },
    { level: 2, name: 'Novice', description: 'Limited experience', color: 'bg-orange-500' },
    { level: 3, name: 'Intermediate', description: 'Practical application', color: 'bg-yellow-500' },
    { level: 4, name: 'Advanced', description: 'Applied theory', color: 'bg-blue-500' },
    { level: 5, name: 'Expert', description: 'Recognized authority', color: 'bg-green-500' }
  ]

  const assessmentSuggestions = [
    {
      skill: 'React',
      type: 'peer_review',
      suggestedBy: 'Learning Algorithm',
      reason: 'Due for quarterly assessment',
      dueDate: '2024-02-15'
    },
    {
      skill: 'Python',
      type: 'certification',
      suggestedBy: 'Career Development Plan',
      reason: 'Target skill for career growth',
      dueDate: '2024-03-30'
    }
  ]

  const allSkills = skillCategories.flatMap(category => category.skills)

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

  const getSkillLevelColor = (level: number) => {
    const skillLevel = skillLevels.find(sl => sl.level === level)
    return skillLevel ? skillLevel.color : 'bg-gray-500'
  }

  const renderSkillBar = (currentLevel: number, targetLevel: number, maxLevel = 5) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: maxLevel }, (_, i) => {
          const level = i + 1
          let bgColor = 'bg-gray-200'
          
          if (level <= currentLevel) {
            bgColor = getSkillLevelColor(level)
          } else if (level <= targetLevel) {
            bgColor = 'bg-gray-300 border-2 border-dashed border-gray-400'
          }
          
          return (
            <div
              key={i}
              className={`w-8 h-3 rounded-sm ${bgColor}`}
              title={`Level ${level}: ${skillLevels[i]?.name}`}
            />
          )
        })}
      </div>
    )
  }

  const handleSubmitSkill = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit skill logic here
    console.log('Adding skill:', newSkill)
    setShowAddSkill(false)
    setNewSkill({
      name: '',
      category: '',
      currentLevel: 1,
      targetLevel: 5,
      priority: 'medium'
    })
  }

  const skillStats = {
    total: allSkills.length,
    improving: allSkills.filter(s => s.currentLevel < s.targetLevel).length,
    advanced: allSkills.filter(s => s.currentLevel >= 4).length,
    certifications: allSkills.filter(s => s.certifications.length > 0).length
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Skills Assessment</h1>
            <p className="text-gray-600">Track and develop your professional skills</p>
          </div>
          <button
            onClick={() => setShowAddSkill(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{skillStats.total}</div>
                <div className="text-sm text-gray-600">Total Skills</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{skillStats.improving}</div>
                <div className="text-sm text-gray-600">Improving</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{skillStats.advanced}</div>
                <div className="text-sm text-gray-600">Advanced</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{skillStats.certifications}</div>
                <div className="text-sm text-gray-600">Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Skills Overview' },
              { id: 'assessment', label: 'Assessment Center' },
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h2>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-gray-900">{skill.name}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getPriorityColor(skill.priority)}`}>
                              {skill.priority.charAt(0).toUpperCase() + skill.priority.slice(1)} Priority
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-sm">
                              <span className="text-gray-500">Current:</span>
                              <span className="ml-1 font-medium">{skillLevels[skill.currentLevel - 1]?.name}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Target:</span>
                              <span className="ml-1 font-medium">{skillLevels[skill.targetLevel - 1]?.name}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Endorsements:</span>
                              <span className="ml-1 font-medium">{skill.endorsements}</span>
                            </div>
                          </div>
                          {renderSkillBar(skill.currentLevel, skill.targetLevel)}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {skill.certifications.length > 0 && (
                        <div className="mb-2">
                          <div className="text-sm text-gray-500 mb-1">Certifications:</div>
                          <div className="flex flex-wrap gap-1">
                            {skill.certifications.map((cert, index) => (
                              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {skill.learningResources.length > 0 && (
                        <div className="text-sm">
                          <div className="text-gray-500 mb-1">Learning Progress:</div>
                          <div className="space-y-1">
                            {skill.learningResources.map((resource, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <BookOpen className="w-3 h-3 text-gray-400" />
                                <span className="flex-1">{resource.name}</span>
                                <div className="w-16 bg-gray-200 rounded-full h-1">
                                  <div 
                                    className="bg-primary-600 h-1 rounded-full"
                                    style={{ width: `${resource.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500 w-8">{resource.progress}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assessment' && (
          <div className="space-y-6">
            {/* Assessment Suggestions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Assessment Suggestions</h2>
              <div className="space-y-4">
                {assessmentSuggestions.map((suggestion, index) => (
                  <div key={index} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-blue-900 mb-1">{suggestion.skill}</h3>
                        <p className="text-sm text-blue-700 mb-2">{suggestion.reason}</p>
                        <div className="flex items-center gap-4 text-xs text-blue-600">
                          <span>Suggested by: {suggestion.suggestedBy}</span>
                          <span>Due: {new Date(suggestion.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Start Assessment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Level Guide */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Skill Level Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {skillLevels.map((level) => (
                  <div key={level.level} className="text-center">
                    <div className={`w-full h-8 rounded-lg ${level.color} mb-2`}></div>
                    <div className="font-medium text-gray-900">{level.name}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment History */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-900">Skill</th>
                      <th className="text-left py-2 font-medium text-gray-900">Level</th>
                      <th className="text-left py-2 font-medium text-gray-900">Assessor</th>
                      <th className="text-left py-2 font-medium text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSkills.flatMap(skill => 
                      skill.assessmentHistory.map((assessment, index) => (
                        <tr key={`${skill.id}-${index}`} className="border-b border-gray-100">
                          <td className="py-2">{skill.name}</td>
                          <td className="py-2">
                            <span className="font-medium">{assessment.level}</span>
                            <span className="text-gray-500 ml-1">
                              ({skillLevels[assessment.level - 1]?.name})
                            </span>
                          </td>
                          <td className="py-2">{assessment.assessor}</td>
                          <td className="py-2">{new Date(assessment.date).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ).slice(0, 10)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'development' && (
          <div className="space-y-6">
            {/* Development Recommendations */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Development Recommendations</h2>
              <div className="space-y-4">
                {allSkills.filter(skill => skill.currentLevel < skill.targetLevel).map((skill) => (
                  <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{skill.name}</h3>
                        <p className="text-sm text-gray-600">
                          Progress from {skillLevels[skill.currentLevel - 1]?.name} to {skillLevels[skill.targetLevel - 1]?.name}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getPriorityColor(skill.priority)}`}>
                        {skill.priority.charAt(0).toUpperCase() + skill.priority.slice(1)} Priority
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      {renderSkillBar(skill.currentLevel, skill.targetLevel)}
                    </div>

                    {skill.learningResources.length > 0 && (
                      <div className="mb-3">
                        <div className="text-sm text-gray-600 mb-2">Recommended Learning:</div>
                        <div className="space-y-2">
                          {skill.learningResources.map((resource, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm">
                              <BookOpen className="w-4 h-4 text-primary-600" />
                              <span className="flex-1">{resource.name}</span>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary-600 h-2 rounded-full"
                                  style={{ width: `${resource.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 w-8">{resource.progress}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button className="text-sm bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors">
                        View Learning Path
                      </button>
                      <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors">
                        Request Assessment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Skill Modal */}
        {showAddSkill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Skill</h2>
                <form onSubmit={handleSubmitSkill} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., TypeScript, Leadership"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      required
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      <option value="Technical Skills">Technical Skills</option>
                      <option value="Soft Skills">Soft Skills</option>
                      <option value="Tools & Platforms">Tools & Platforms</option>
                      <option value="Domain Knowledge">Domain Knowledge</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Level</label>
                      <select
                        value={newSkill.currentLevel}
                        onChange={(e) => setNewSkill({...newSkill, currentLevel: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {skillLevels.map((level) => (
                          <option key={level.level} value={level.level}>
                            {level.level} - {level.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Level</label>
                      <select
                        value={newSkill.targetLevel}
                        onChange={(e) => setNewSkill({...newSkill, targetLevel: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {skillLevels.map((level) => (
                          <option key={level.level} value={level.level}>
                            {level.level} - {level.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newSkill.priority}
                      onChange={(e) => setNewSkill({...newSkill, priority: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Add Skill
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddSkill(false)}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
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

export default SkillsPage
