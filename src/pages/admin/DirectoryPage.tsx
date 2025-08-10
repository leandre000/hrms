import React, { useState } from 'react'
import { Users, Search, Filter, Download, Mail, Phone, Calendar, MapPin, Briefcase, Building2 } from 'lucide-react'

const AdminDirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  // Mock employee directory data (expanded from employee page)
  const employees = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Developer',
      department: 'Engineering',
      manager: 'Sarah Wilson',
      location: 'New York, NY',
      startDate: '2022-03-15',
      status: 'active',
      extension: '1234',
      skills: ['React', 'Node.js', 'TypeScript'],
      employeeId: 'EMP001'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 234-5678',
      position: 'Engineering Manager',
      department: 'Engineering',
      manager: 'Michael Chen',
      location: 'New York, NY',
      startDate: '2021-03-15',
      status: 'active',
      extension: '1235',
      skills: ['Leadership', 'React', 'Team Management'],
      employeeId: 'EMP002'
    }
    // Additional employees would be here...
  ]

  const departments = ['All Departments', 'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance']

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === 'all' || departmentFilter === 'All Departments' || employee.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
            <p className="text-gray-600">Administrative view of all employees and contact information</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              Export Directory
            </button>
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
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-0 focus:ring-0 p-0 text-sm placeholder-gray-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Directory Content */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone} ext. {employee.extension}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{employee.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{employee.location}</span>
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
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Contact</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Department</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Start Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{employee.email}</div>
                        <div className="text-gray-500">{employee.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{employee.department}</td>
                    <td className="px-6 py-4 text-gray-900">{employee.location}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Date(employee.startDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDirectoryPage
