import React, { useState } from 'react'
import { Users, Edit, Save, X, MapPin, Building, Calendar, Target, Award, BarChart3, Mail, Phone, Globe } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  email: string
  phone: string
  location: string
  joinDate: string
  skills: string[]
  projects: number
  performance: number
}

interface TeamProfile {
  id: string
  name: string
  description: string
  department: string
  manager: string
  location: string
  established: string
  size: number
  mission: string
  vision: string
  values: string[]
  contactEmail: string
  contactPhone: string
  website: string
  socialLinks: {
    linkedin: string
    twitter: string
    github: string
  }
  achievements: string[]
  goals: string[]
}

const TeamProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<TeamProfile>>({})

  const teamProfile: TeamProfile = {
    id: '1',
    name: 'Engineering Team Alpha',
    description: 'Core engineering team responsible for product development, technical architecture, and innovation across all company products and services.',
    department: 'Engineering',
    manager: 'Mike Smith',
    location: 'San Francisco, CA',
    established: '2020-03-15',
    size: 12,
    mission: 'To build scalable, secure, and user-friendly software solutions that empower our customers and drive business growth.',
    vision: 'To be the leading engineering team known for technical excellence, innovation, and delivering exceptional user experiences.',
    values: [
      'Technical Excellence',
      'Collaboration & Teamwork',
      'Continuous Learning',
      'User-Centric Design',
      'Innovation & Creativity',
      'Quality & Reliability'
    ],
    contactEmail: 'engineering-alpha@company.com',
    contactPhone: '+1 (555) 123-4567',
    website: 'https://engineering.company.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/engineering-alpha',
      twitter: 'https://twitter.com/eng_alpha',
      github: 'https://github.com/company-engineering'
    },
    achievements: [
      'Successfully launched 5 major product features in 2024',
      'Reduced system downtime by 99.9% through improved monitoring',
      'Achieved 95% customer satisfaction score',
      'Implemented CI/CD pipeline reducing deployment time by 80%',
      'Mentored 8 junior developers to senior level'
    ],
    goals: [
      'Launch 3 new microservices by Q2 2025',
      'Achieve 100% test coverage across all critical systems',
      'Reduce technical debt by 30%',
      'Implement advanced AI/ML capabilities',
      'Expand team to 15 members with specialized skills'
    ]
  }

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Mike Smith',
      role: 'Engineering Manager',
      avatar: 'MS',
      email: 'mike.smith@company.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      joinDate: '2020-03-15',
      skills: ['Leadership', 'Project Management', 'System Architecture', 'Agile'],
      projects: 8,
      performance: 95
    },
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      avatar: 'SC',
      email: 'sarah.chen@company.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      joinDate: '2021-06-20',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Microservices'],
      projects: 6,
      performance: 92
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'Frontend Developer',
      avatar: 'MJ',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 345-6789',
      location: 'New York, NY',
      joinDate: '2022-01-10',
      skills: ['Vue.js', 'JavaScript', 'CSS', 'UI/UX', 'Accessibility'],
      projects: 4,
      performance: 88
    },
    {
      id: '4',
      name: 'Emily Davis',
      role: 'UX Designer',
      avatar: 'ED',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 456-7890',
      location: 'San Francisco, CA',
      joinDate: '2021-11-15',
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
      projects: 7,
      performance: 94
    }
  ]

  const handleEdit = () => {
    setEditData(teamProfile)
    setIsEditing(true)
  }

  const handleSave = () => {
    // In a real app, this would save the data
    setIsEditing(false)
    setEditData({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({})
  }

  const handleInputChange = (field: keyof TeamProfile, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const renderEditableField = (field: keyof TeamProfile, label: string, type: 'text' | 'textarea' | 'array' = 'text') => {
    const value = isEditing ? editData[field] || teamProfile[field] : teamProfile[field]

    if (type === 'textarea') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          {isEditing ? (
            <textarea
              value={value as string}
              onChange={(e) => handleInputChange(field, e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          ) : (
            <p className="text-gray-900">{value as string}</p>
          )}
        </div>
      )
    }

    if (type === 'array') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          {isEditing ? (
            <textarea
              value={(value as string[]).join('\n')}
              onChange={(e) => handleInputChange(field, e.target.value.split('\n').filter(item => item.trim()))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter each item on a new line"
            />
          ) : (
            <ul className="list-disc list-inside text-gray-900 space-y-1">
              {(value as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )
    }

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        {isEditing ? (
          <input
            type="text"
            value={value as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        ) : (
          <p className="text-gray-900">{value as string}</p>
        )}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Profile</h1>
            <p className="text-gray-600">Manage your team's profile, mission, and organizational details</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderEditableField('name', 'Team Name')}
              {renderEditableField('department', 'Department')}
              {renderEditableField('manager', 'Team Manager')}
              {renderEditableField('location', 'Location')}
              {renderEditableField('established', 'Established Date')}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                <p className="text-gray-900">{teamProfile.size} members</p>
              </div>
            </div>
            {renderEditableField('description', 'Description', 'textarea')}
          </div>

          {/* Mission & Vision */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mission & Vision</h2>
            {renderEditableField('mission', 'Mission Statement', 'textarea')}
            {renderEditableField('vision', 'Vision Statement', 'textarea')}
          </div>

          {/* Values */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Values</h2>
            {renderEditableField('values', 'Values', 'array')}
          </div>

          {/* Goals & Achievements */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Goals & Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Current Goals</h3>
                {renderEditableField('goals', '', 'array')}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Achievements</h3>
                {renderEditableField('achievements', '', 'array')}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Members</span>
                <span className="text-lg font-bold text-gray-900">{teamProfile.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Projects</span>
                <span className="text-lg font-bold text-gray-900">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Performance</span>
                <span className="text-lg font-bold text-green-600">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Years Active</span>
                <span className="text-lg font-bold text-gray-900">
                  {Math.floor((new Date().getTime() - new Date(teamProfile.established).getTime()) / (1000 * 60 * 60 * 24 * 365))}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <a href={`mailto:${teamProfile.contactEmail}`} className="hover:text-primary-600">
                  {teamProfile.contactEmail}
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <a href={`tel:${teamProfile.contactPhone}`} className="hover:text-primary-600">
                  {teamProfile.contactPhone}
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <a href={teamProfile.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
                  {teamProfile.website}
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
            <div className="space-y-3">
              <a
                href={teamProfile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-600 hover:text-primary-600"
              >
                <Globe className="h-4 w-4 mr-2" />
                LinkedIn
              </a>
              <a
                href={teamProfile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-600 hover:text-primary-600"
              >
                <Globe className="h-4 w-4 mr-2" />
                Twitter
              </a>
              <a
                href={teamProfile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-600 hover:text-primary-600"
              >
                <Globe className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">{member.avatar}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.projects}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">{member.performance}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TeamProfilePage
