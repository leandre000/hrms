import React from 'react'
import { User, Mail, Phone, Calendar, Shield, Award, Settings } from 'lucide-react'

const ProfilePage = () => {
  const auditorProfile = {
    name: 'Alex Thompson',
    title: 'Senior Auditor',
    email: 'alex.thompson@company.com',
    phone: '+1 (555) 123-4567',
    employeeId: 'AUD001',
    department: 'Internal Audit',
    joinDate: '2022-03-15',
    certifications: [
      { name: 'Certified Internal Auditor (CIA)', issuer: 'IIA', expiry: '2025-06-30' },
      { name: 'Certified Information Systems Auditor (CISA)', issuer: 'ISACA', expiry: '2024-12-31' },
      { name: 'Certified Fraud Examiner (CFE)', issuer: 'ACFE', expiry: '2025-09-15' }
    ],
    accessLevels: [
      'Financial Records',
      'Employee Data',
      'Security Logs',
      'Compliance Reports',
      'System Administration'
    ],
    recentActivity: [
      { action: 'Generated compliance report', date: '2024-01-24', time: '14:30' },
      { action: 'Reviewed security incident', date: '2024-01-23', time: '16:45' },
      { action: 'Updated investigation case', date: '2024-01-22', time: '10:15' },
      { action: 'Exported audit data', date: '2024-01-21', time: '09:30' }
    ]
  }

  const getExpiryColor = (expiry: string) => {
    const expiryDate = new Date(expiry)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 30) return 'text-red-600'
    if (diffDays < 90) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{auditorProfile.name}</h2>
                  <p className="text-gray-600">{auditorProfile.title}</p>
                  <p className="text-sm text-gray-500">ID: {auditorProfile.employeeId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Email</span>
                    <div className="font-medium">{auditorProfile.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Phone</span>
                    <div className="font-medium">{auditorProfile.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Join Date</span>
                    <div className="font-medium">{new Date(auditorProfile.joinDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Department</span>
                    <div className="font-medium">{auditorProfile.department}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
              </div>
              <div className="space-y-4">
                {auditorProfile.certifications.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{cert.name}</h4>
                      <span className={`text-sm font-medium ${getExpiryColor(cert.expiry)}`}>
                        Expires: {new Date(cert.expiry).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Issued by: {cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {auditorProfile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString()} at {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Access Levels */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">Access Levels</h3>
              </div>
              <div className="space-y-2">
                {auditorProfile.accessLevels.map((access, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{access}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
                <button className="w-full flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Shield className="w-4 h-4" />
                  Security Settings
                </button>
                <button className="w-full flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Award className="w-4 h-4" />
                  Update Certifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
