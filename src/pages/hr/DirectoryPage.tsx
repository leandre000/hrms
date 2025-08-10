import React, { useState } from 'react'
import { Search, Users, Mail, Phone, MapPin, Building } from 'lucide-react'

const DirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  const employees = [
    {
      id: 'EMP001',
      name: 'John Doe',
      position: 'Senior Developer',
      department: 'Engineering',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      location: 'New York Office',
      manager: 'Sarah Wilson',
      team: 'Frontend Team',
      skills: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: 'EMP002',
      name: 'Jane Smith',
      position: 'Marketing Manager',
      department: 'Marketing',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco Office',
      manager: 'Mike Johnson',
      team: 'Digital Marketing',
      skills: ['SEO', 'Content Marketing', 'Analytics']
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      position: 'Sales Director',
      department: 'Sales',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago Office',
      manager: 'CEO',
      team: 'Enterprise Sales',
      skills: ['B2B Sales', 'Negotiation', 'CRM']
    },
    {
      id: 'EMP004',
      name: 'Sarah Wilson',
      position: 'Engineering Manager',
      department: 'Engineering',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 456-7890',
      location: 'New York Office',
      manager: 'CTO',
      team: 'Engineering Leadership',
      skills: ['Team Management', 'Architecture', 'Agile']
    },
    {
      id: 'EMP005',
      name: 'David Brown',
      position: 'UX Designer',
      department: 'Design',
      email: 'david.brown@company.com',
      phone: '+1 (555) 567-8901',
      location: 'San Francisco Office',
      manager: 'Design Director',
      team: 'Product Design',
      skills: ['Figma', 'User Research', 'Prototyping']
    },
    {
      id: 'EMP006',
      name: 'Lisa Rodriguez',
      position: 'HR Specialist',
      department: 'Human Resources',
      email: 'lisa.rodriguez@company.com',
      phone: '+1 (555) 678-9012',
      location: 'Chicago Office',
      manager: 'HR Director',
      team: 'People Operations',
      skills: ['Recruitment', 'Employee Relations', 'HRIS']
    }
  ]

  const departments = ['all', ...new Set(employees.map(emp => emp.department))]

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
          <p className="text-gray-600">Find and connect with colleagues across the organization</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, position, or skills..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                  <p className="text-gray-600">{employee.position}</p>
                  <p className="text-sm text-gray-500">{employee.team}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{employee.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{employee.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Reports to: {employee.manager}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`mailto:${employee.email}`}
                  className="flex items-center gap-2 flex-1 bg-primary-50 text-primary-700 px-3 py-2 rounded-lg hover:bg-primary-100 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <a
                  href={`tel:${employee.phone}`}
                  className="flex items-center gap-2 flex-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-6 text-center text-gray-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>
    </div>
  )
}

export default DirectoryPage
