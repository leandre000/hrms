import React, { useState } from 'react'
import { Calendar, Clock, Users, Plus, Edit, Copy } from 'lucide-react'

const SchedulesPage = () => {
  const [viewMode, setViewMode] = useState('weekly')
  const [selectedWeek, setSelectedWeek] = useState('2024-01-22')

  const scheduleTemplates = [
    {
      id: 'ST001',
      name: 'Standard Office Hours',
      description: 'Monday-Friday 9AM-5PM',
      shifts: [
        { day: 'Monday', start: '09:00', end: '17:00' },
        { day: 'Tuesday', start: '09:00', end: '17:00' },
        { day: 'Wednesday', start: '09:00', end: '17:00' },
        { day: 'Thursday', start: '09:00', end: '17:00' },
        { day: 'Friday', start: '09:00', end: '17:00' }
      ],
      assignedEmployees: 95
    },
    {
      id: 'ST002',
      name: 'Customer Support',
      description: '24/7 rotating shifts',
      shifts: [
        { day: 'Monday', start: '08:00', end: '16:00' },
        { day: 'Tuesday', start: '16:00', end: '24:00' },
        { day: 'Wednesday', start: '00:00', end: '08:00' },
        { day: 'Thursday', start: '08:00', end: '16:00' },
        { day: 'Friday', start: '16:00', end: '24:00' }
      ],
      assignedEmployees: 24
    }
  ]

  const weeklySchedule = [
    {
      employee: 'John Doe',
      department: 'Engineering',
      schedule: {
        Monday: { start: '09:00', end: '17:00', break: '12:00-13:00' },
        Tuesday: { start: '09:00', end: '17:00', break: '12:00-13:00' },
        Wednesday: { start: '09:00', end: '17:00', break: '12:00-13:00' },
        Thursday: { start: '09:00', end: '17:00', break: '12:00-13:00' },
        Friday: { start: '09:00', end: '17:00', break: '12:00-13:00' }
      },
      totalHours: 40
    },
    {
      employee: 'Jane Smith',
      department: 'Marketing',
      schedule: {
        Monday: { start: '08:30', end: '16:30', break: '12:00-12:30' },
        Tuesday: { start: '08:30', end: '16:30', break: '12:00-12:30' },
        Wednesday: { start: '08:30', end: '16:30', break: '12:00-12:30' },
        Thursday: { start: '08:30', end: '16:30', break: '12:00-12:30' },
        Friday: { start: '08:30', end: '16:30', break: '12:00-12:30' }
      },
      totalHours: 37.5
    }
  ]

  const scheduleStats = {
    totalEmployees: 142,
    scheduledEmployees: 138,
    unscheduledEmployees: 4,
    averageHours: 39.2,
    overtimeScheduled: 8
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Work Schedules</h1>
            <p className="text-gray-600">Manage employee work schedules and shift planning</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <Copy className="w-4 h-4" />
              Copy Schedule
            </button>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              Create Schedule
            </button>
          </div>
        </div>

        {/* Schedule Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-gray-900">Total Employees</h3>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {scheduleStats.totalEmployees}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-900">Scheduled</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {scheduleStats.scheduledEmployees}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-gray-900">Unscheduled</h3>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {scheduleStats.unscheduledEmployees}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">Avg Hours</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {scheduleStats.averageHours}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium text-gray-900">Overtime</h3>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {scheduleStats.overtimeScheduled}
            </div>
          </div>
        </div>

        {/* View Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('weekly')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'weekly' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Weekly View
              </button>
              <button
                onClick={() => setViewMode('templates')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'templates' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Templates
              </button>
            </div>
            {viewMode === 'weekly' && (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Week of:</label>
                <input
                  type="date"
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            )}
          </div>
        </div>

        {viewMode === 'weekly' && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Weekly Schedule - {new Date(selectedWeek).toLocaleDateString()}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Employee</th>
                    {daysOfWeek.map(day => (
                      <th key={day} className="text-left py-3 px-4 font-medium text-gray-900">{day}</th>
                    ))}
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Total Hours</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {weeklySchedule.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{employee.employee}</div>
                          <div className="text-sm text-gray-500">{employee.department}</div>
                        </div>
                      </td>
                      {daysOfWeek.map(day => (
                        <td key={day} className="px-4 py-4">
                          {employee.schedule[day as keyof typeof employee.schedule] ? (
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {employee.schedule[day as keyof typeof employee.schedule]?.start} - {employee.schedule[day as keyof typeof employee.schedule]?.end}
                              </div>
                              <div className="text-gray-500">
                                Break: {employee.schedule[day as keyof typeof employee.schedule]?.break}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">Off</span>
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4 font-medium text-gray-900">{employee.totalHours}h</td>
                      <td className="px-6 py-4">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === 'templates' && (
          <div className="space-y-6">
            {scheduleTemplates.map((template) => (
              <div key={template.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-gray-600">{template.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Assigned to {template.assignedEmployees} employees
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-gray-50 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg hover:bg-primary-100 transition-colors">
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {template.shifts.map((shift, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium text-gray-900">{shift.day}</div>
                      <div className="text-sm text-gray-600">
                        {shift.start} - {shift.end}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SchedulesPage
