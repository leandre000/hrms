import React, { useState } from 'react'
import { Search, Filter, Mail, Phone, MapPin, Briefcase, Users, Calendar, Star } from 'lucide-react'

const DirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  // Mock employee directory data
  const employees = [
    {
      id: 1,
      name: 'Sarah Wilson',
      role: 'Engineering Manager',
      department: 'Engineering',
      location: 'New York, NY',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 123-4567',
      manager: 'Michael Chen',
      team: 'Frontend Team',
      startDate: '2021-03-15',
      birthday: '1985-06-12',
      skills: ['React', 'TypeScript', 'Team Leadership', 'Mentoring'],
      avatar: '/avatars/sarah.jpg',
      status: 'online',
      timezone: 'EST',
      workingHours: '9:00 AM - 5:00 PM',
      about: 'Passionate engineering manager with 8+ years of experience building scalable web applications.',
      directReports: 6
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Principal Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 234-5678',
      manager: 'David Kim',
      team: 'Platform Team',
      startDate: '2019-08-20',
      birthday: '1982-11-08',
      skills: ['System Design', 'Microservices', 'AWS', 'Technical Leadership'],
      avatar: '/avatars/michael.jpg',
      status: 'away',
      timezone: 'PST',
      workingHours: '8:00 AM - 4:00 PM',
      about: 'Technical leader focused on building scalable systems and growing engineering teams.',
      directReports: 12
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      role: 'VP of People',
      department: 'Human Resources',
      location: 'Austin, TX',
      email: 'lisa.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      manager: 'CEO',
      team: 'People Operations',
      startDate: '2020-01-10',
      birthday: '1978-03-22',
      skills: ['Leadership', 'Strategy', 'Culture', 'Talent Development'],
      avatar: '/avatars/lisa.jpg',
      status: 'online',
      timezone: 'CST',
      workingHours: '9:00 AM - 6:00 PM',
      about: 'People leader committed to creating inclusive, high-performance workplace cultures.',
      directReports: 8
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Senior Product Manager',
      department: 'Product',
      location: 'Remote',
      email: 'david.kim@company.com',
      phone: '+1 (555) 456-7890',
      manager: 'Lisa Rodriguez',
      team: 'Product Strategy',
      startDate: '2022-05-03',
      birthday: '1990-09-15',
      skills: ['Product Strategy', 'User Research', 'Analytics', 'Agile'],
      avatar: '/avatars/david.jpg',
      status: 'offline',
      timezone: 'PST',
      workingHours: '10:00 AM - 6:00 PM',
      about: 'Product manager passionate about user-centered design and data-driven decisions.',
      directReports: 3
    },
    {
      id: 5,
      name: 'Alex Thompson',
      role: 'Junior Developer',
      department: 'Engineering',
      location: 'New York, NY',
      email: 'alex.thompson@company.com',
      phone: '+1 (555) 567-8901',
      manager: 'Sarah Wilson',
      team: 'Frontend Team',
      startDate: '2023-09-01',
      birthday: '1996-12-03',
      skills: ['React', 'JavaScript', 'CSS', 'Learning'],
      avatar: '/avatars/alex.jpg',
      status: 'online',
      timezone: 'EST',
      workingHours: '9:00 AM - 5:00 PM',
      about: 'Enthusiastic developer eager to learn and contribute to innovative projects.',
      directReports: 0
    },
    {
      id: 6,
      name: 'Emily Chen',
      role: 'Product Analyst',
      department: 'Product',
      location: 'San Francisco, CA',
      email: 'emily.chen@company.com',
      phone: '+1 (555) 678-9012',
      manager: 'David Kim',
      team: 'Analytics Team',
      startDate: '2023-02-15',
      birthday: '1992-07-28',
      skills: ['SQL', 'Python', 'Tableau', 'Data Analysis'],
      avatar: '/avatars/emily.jpg',
      status: 'away',
      timezone: 'PST',
      workingHours: '9:00 AM - 5:00 PM',
      about: 'Data analyst passionate about turning data into actionable insights.',
      directReports: 0
    }
  ]

  const departments = ['All Departments', 'Engineering', 'Product', 'Human Resources', 'Sales', 'Marketing', 'Finance']
  const locations = ['All Locations', 'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Remote']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'away':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online'
      case 'away':
        return 'Away'
      case 'offline':
        return 'Offline'
      default:
        return 'Unknown'
    }
  }

  const isUpcomingBirthday = (birthday: string) => {
    const today = new Date()
    const birthDate = new Date(birthday)
    const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
    
    if (thisYearBirthday < today) {
      thisYearBirthday.setFullYear(today.getFullYear() + 1)
    }
    
    const daysUntilBirthday = Math.ceil((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilBirthday <= 7
  }

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = departmentFilter === 'all' || departmentFilter === 'All Departments' || employee.department === departmentFilter
    const matchesLocation = locationFilter === 'all' || locationFilter === 'All Locations' || employee.location === locationFilter
    
    return matchesSearch && matchesDepartment && matchesLocation
  })

  const upcomingBirthdays = employees.filter(employee => isUpcomingBirthday(employee.birthday))

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
            <p className="text-gray-600">Find and connect with your colleagues</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'grid' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'list' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Upcoming Birthdays */}
        {upcomingBirthdays.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Upcoming Birthdays 🎉</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {upcomingBirthdays.map((employee) => (
                <div key={employee.id} className="flex items-center gap-2 bg-white p-2 rounded-lg border">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-purple-900 text-sm">{employee.name}</div>
                    <div className="text-purple-700 text-xs">{new Date(employee.birthday).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employee List/Grid */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(employee.status)}`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(employee.status)}`}></div>
                      <span>{getStatusText(employee.status)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{employee.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{employee.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Team: {employee.team}</span>
                  </div>
                  {employee.directReports > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4" />
                      <span>{employee.directReports} direct reports</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {employee.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                    {employee.skills.length > 3 && (
                      <span className="text-gray-500 text-xs">+{employee.skills.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Role</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Location</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary-600" />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-white ${getStatusColor(employee.status)}`}></div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-600">{employee.team}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900">{employee.role}</td>
                      <td className="py-4 px-6 text-gray-900">{employee.department}</td>
                      <td className="py-4 px-6 text-gray-900">{employee.location}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(employee.status)}`}></div>
                          <span className="text-sm text-gray-600">{getStatusText(employee.status)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p>Try adjusting your search criteria to find the colleagues you're looking for.</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-primary-600">{employees.length}</div>
            <div className="text-sm text-gray-600">Total Employees</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">{employees.filter(e => e.status === 'online').length}</div>
            <div className="text-sm text-gray-600">Currently Online</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">{new Set(employees.map(e => e.department)).size}</div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-purple-600">{new Set(employees.map(e => e.location)).size}</div>
            <div className="text-sm text-gray-600">Locations</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DirectoryPage
