import React from 'react'
import { UserPlus, Clock, CheckCircle, AlertTriangle, Calendar } from 'lucide-react'

const OnboardingPage = () => {
  const onboardingCandidates = [
    {
      id: 1,
      name: 'Alice Johnson',
      position: 'Frontend Developer',
      department: 'Engineering',
      startDate: '2024-02-01',
      status: 'In Progress',
      progress: 65,
      checklist: {
        completed: 7,
        total: 12
      },
      stage: 'Documentation'
    },
    {
      id: 2,
      name: 'Robert Chen',
      position: 'Product Manager',
      department: 'Product',
      startDate: '2024-02-05',
      status: 'Pending',
      progress: 20,
      checklist: {
        completed: 3,
        total: 12
      },
      stage: 'Pre-boarding'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      position: 'UX Designer',
      department: 'Design',
      startDate: '2024-01-25',
      status: 'Completed',
      progress: 100,
      checklist: {
        completed: 12,
        total: 12
      },
      stage: 'Complete'
    }
  ]

  const onboardingTasks = [
    { task: 'Send welcome email', required: true, category: 'Pre-boarding' },
    { task: 'Prepare workspace', required: true, category: 'Pre-boarding' },
    { task: 'Create system accounts', required: true, category: 'Pre-boarding' },
    { task: 'Complete I-9 form', required: true, category: 'Documentation' },
    { task: 'Tax withholding forms', required: true, category: 'Documentation' },
    { task: 'Benefits enrollment', required: true, category: 'Documentation' },
    { task: 'Equipment assignment', required: true, category: 'Setup' },
    { task: 'Security badge creation', required: true, category: 'Setup' },
    { task: 'Department introduction', required: false, category: 'Integration' },
    { task: 'Buddy assignment', required: false, category: 'Integration' },
    { task: 'First week check-in', required: true, category: 'Follow-up' },
    { task: '30-day review', required: true, category: 'Follow-up' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'In Progress': return <Clock className="w-4 h-4 text-blue-500" />
      case 'Pending': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'Overdue': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Onboarding</h1>
            <p className="text-gray-600">Manage new hire onboarding process and checklist</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <UserPlus className="w-4 h-4" />
            Start Onboarding
          </button>
        </div>

        {/* Onboarding Progress */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Onboarding</h2>
          <div className="space-y-4">
            {onboardingCandidates.map((candidate) => (
              <div key={candidate.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-medium">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.position} • {candidate.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(candidate.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600">Start Date</span>
                    <div className="font-medium">{new Date(candidate.startDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Current Stage</span>
                    <div className="font-medium">{candidate.stage}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Progress</span>
                    <div className="font-medium">{candidate.progress}%</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Checklist</span>
                    <div className="font-medium">{candidate.checklist.completed}/{candidate.checklist.total} completed</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      candidate.progress === 100 ? 'bg-green-500' :
                      candidate.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${candidate.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Onboarding Checklist Template */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Checklist Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Pre-boarding', 'Documentation', 'Setup', 'Integration', 'Follow-up'].map(category => (
              <div key={category} className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">{category}</h3>
                <div className="space-y-2">
                  {onboardingTasks
                    .filter(task => task.category === category)
                    .map((task, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 rounded"
                          defaultChecked={false}
                        />
                        <span className={`text-sm ${task.required ? 'text-gray-900' : 'text-gray-600'}`}>
                          {task.task}
                          {task.required && <span className="text-red-500 ml-1">*</span>}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
