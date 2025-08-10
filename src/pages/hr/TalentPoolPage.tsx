import React, { useState } from 'react'
import { Search, Star, Filter, Plus, Eye } from 'lucide-react'

const TalentPoolPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [skillFilter, setSkillFilter] = useState('all')

  const talents = [
    {
      id: 'TP001',
      name: 'David Kim',
      currentRole: 'Software Engineer at TechCorp',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      experience: '4 years',
      location: 'San Francisco, CA',
      interest: 'Senior Developer Role',
      rating: 4.3,
      lastContact: '2024-01-15',
      source: 'LinkedIn',
      notes: 'Strong technical background, interested in fintech'
    },
    {
      id: 'TP002',
      name: 'Lisa Chen',
      currentRole: 'Marketing Manager at StartupXYZ',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      experience: '6 years',
      location: 'New York, NY',
      interest: 'Senior Marketing Position',
      rating: 4.7,
      lastContact: '2024-01-10',
      source: 'Referral',
      notes: 'Excellent track record in B2B marketing'
    },
    {
      id: 'TP003',
      name: 'James Rodriguez',
      currentRole: 'Product Designer at DesignStudio',
      skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
      experience: '5 years',
      location: 'Austin, TX',
      interest: 'Lead Designer Role',
      rating: 4.1,
      lastContact: '2024-01-08',
      source: 'Portfolio Website',
      notes: 'Strong portfolio, specializes in mobile apps'
    }
  ]

  const skills = ['all', 'React', 'Node.js', 'Python', 'Digital Marketing', 'UI/UX Design', 'SEO']

  const filteredTalents = talents.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSkill = skillFilter === 'all' || talent.skills.includes(skillFilter)
    return matchesSearch && matchesSkill
  })

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

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Talent Pool</h1>
            <p className="text-gray-600">Manage passive candidates and talent pipeline</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add to Pool
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search talent pool..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {skills.map(skill => (
                <option key={skill} value={skill}>
                  {skill === 'all' ? 'All Skills' : skill}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Talent Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTalents.map((talent) => (
            <div key={talent.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">
                      {talent.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{talent.name}</h3>
                    <p className="text-gray-600">{talent.currentRole}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(talent.rating)}
                      <span className="text-sm text-gray-500 ml-1">({talent.rating})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <div className="font-medium">{talent.experience}</div>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <div className="font-medium">{talent.location}</div>
                </div>
                <div>
                  <span className="text-gray-600">Interest:</span>
                  <div className="font-medium">{talent.interest}</div>
                </div>
                <div>
                  <span className="text-gray-600">Source:</span>
                  <div className="font-medium">{talent.source}</div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-600 text-sm block mb-2">Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {talent.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-700">{talent.notes}</div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Last contact: {new Date(talent.lastContact).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TalentPoolPage
