import React, { useState } from 'react'
import { Users, Search, Filter, Mail, Phone, MapPin, Building, UserPlus } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  location: string
  avatar: string
  skills: string[]
  joinDate: string
  manager: string
}

const TeamDirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('All')
  const [filterLocation, setFilterLocation] = useState('All')

  const mockTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'sarah.chen@company.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco',
      avatar: 'SC',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      joinDate: '2022-03-15',
      manager: 'Mike Smith'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Frontend Developer',
      department: 'Engineering',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 234-5678',
      location: 'New York',
      avatar: 'MJ',
      skills: ['Vue.js', 'JavaScript', 'CSS', 'UI/UX'],
      joinDate: '2023-01-10',
      manager: 'Mike Smith'
    },
    {
      id: '3',
      name: 'Emily Davis',
      role: 'UX Designer',
      department: 'Design',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 345-6789',
      location: 'San Francisco',
      avatar: 'ED',
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
      joinDate: '2021-11-20',
      manager: 'Lisa Wang'
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      role: 'Backend Developer',
      department: 'Engineering',
      email: 'alex.rodriguez@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Remote',
      avatar: 'AR',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      joinDate: '2023-06-05',
      manager: 'Mike Smith'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      role: 'Product Manager',
      department: 'Product',
      email: 'lisa.wang@company.com',
      phone: '+1 (555) 567-8901',
      location: 'San Francisco',
      avatar: 'LW',
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Stakeholder Management'],
      joinDate: '2020-08-12',
      manager: 'Direct Report'
    }
  ]

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = filterDepartment === 'All' || member.department === filterDepartment
    const matchesLocation = filterLocation === 'All' || member.location === filterLocation
    
    return matchesSearch && matchesDepartment && matchesLocation
  })

  const departments = ['All', ...Array.from(new Set(mockTeamMembers.map(m => m.department)))]
  const locations = ['All', ...Array.from(new Set(mockTeamMembers.map(m => m.location)))]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Directory</h1>
        <p className="text-gray-600">Comprehensive directory of all team members with contact information and skills</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, role, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-lg font-medium text-primary-600">{member.avatar}</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {member.department}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <a href={`mailto:${member.email}`} className="hover:text-primary-600">{member.email}</a>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <a href={`tel:${member.phone}`} className="hover:text-primary-600">{member.phone}</a>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{member.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Building className="h-4 w-4 mr-2 text-gray-400" />
                <span>Manager: {member.manager}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
              <div className="flex space-x-2">
                <button className="text-primary-600 hover:text-primary-800">
                  <Mail className="h-4 w-4" />
                </button>
                <button className="text-primary-600 hover:text-primary-800">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex gap-4">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Member
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Users className="h-4 w-4 mr-2" />
          Export Directory
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </button>
      </div>
    </div>
  )
}

export default TeamDirectoryPage
