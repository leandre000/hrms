import React, { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Briefcase,
  Award,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  Palette,
  Download,
  Upload,
  Trash2,
  Plus,
  Star,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  department: string
  position: string
  employeeId: string
  hireDate: string
  manager: string
  bio: string
  avatar: string
  skills: string[]
  certifications: string[]
  languages: string[]
  emergencyContact: {
    name: string
    relationship: string
    phone: string
    email: string
  }
}

interface ProfileSection {
  id: string
  title: string
  icon: any
  isEditable: boolean
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<UserProfile>>({})
  const [showAvatarUpload, setShowAvatarUpload] = useState(false)

  // Mock user profile data
  const userProfile: UserProfile = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1-555-0123',
    location: 'San Francisco, CA',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    employeeId: 'EMP001',
    hireDate: '2020-03-15',
    manager: 'Michael Chen',
    bio: 'Passionate software engineer with 8+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies. Committed to writing clean, maintainable code and mentoring junior developers.',
    avatar: '/api/avatars/sarah-johnson.jpg',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'GraphQL'],
    certifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional Developer', 'MongoDB Certified Developer'],
    languages: ['English (Native)', 'Spanish (Conversational)', 'French (Basic)'],
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '+1-555-0124',
      email: 'john.johnson@email.com'
    }
  }

  const profileSections: ProfileSection[] = [
    { id: 'personal', title: 'Personal Information', icon: User, isEditable: true },
    { id: 'professional', title: 'Professional Details', icon: Briefcase, isEditable: true },
    { id: 'skills', title: 'Skills & Certifications', icon: Award, isEditable: true },
    { id: 'preferences', title: 'Preferences', icon: Palette, isEditable: true },
    { id: 'security', title: 'Security', icon: Shield, isEditable: true }
  ]

  const handleEdit = () => {
    setEditData({ ...userProfile })
    setIsEditing(true)
  }

  const handleSave = () => {
    // In a real app, this would update the backend
    Object.assign(userProfile, editData)
    setIsEditing(false)
    setEditData({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({})
  }

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const renderField = (field: keyof UserProfile, label: string, icon: any, type: string = 'text') => {
    const value = isEditing ? editData[field] || userProfile[field] : userProfile[field]
    const Icon = icon

    if (isEditing) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          {type === 'textarea' ? (
            <textarea
              value={value as string}
              onChange={(e) => handleInputChange(field, e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          ) : type === 'select' ? (
            <select
              value={value as string}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          ) : (
            <input
              type={type}
              value={value as string}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          )}
        </div>
      )
    }

    return (
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-gray-400" />
        <div>
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">{value as string}</p>
        </div>
      </div>
    )
  }

  const renderSkillsSection = () => {
    if (isEditing) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <div className="flex flex-wrap gap-2">
              {(editData.skills || userProfile.skills).map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center space-x-2">
                  {skill}
                  <button
                    onClick={() => {
                      const newSkills = (editData.skills || userProfile.skills).filter((_, i) => i !== index)
                      handleInputChange('skills', newSkills)
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-gray-400 hover:text-gray-600">
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
            <div className="flex flex-wrap gap-2">
              {(editData.certifications || userProfile.certifications).map((cert, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center space-x-2">
                  {cert}
                  <button
                    onClick={() => {
                      const newCerts = (editData.certifications || userProfile.certifications).filter((_, i) => i !== index)
                      handleInputChange('certifications', newCerts)
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-gray-400 hover:text-gray-600">
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {userProfile.certifications.map((cert, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center space-x-2">
                <Award size={14} />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your personal and professional information</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="btn-secondary">
                <X size={20} />
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                <Save size={20} />
                Save Changes
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className="btn-primary">
              <Edit size={20} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Avatar Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                  {userProfile.avatar ? (
                    <img
                      src={userProfile.avatar}
                      alt={`${userProfile.firstName} ${userProfile.lastName}`}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => setShowAvatarUpload(true)}
                    className="absolute bottom-4 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
                  >
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {userProfile.firstName} {userProfile.lastName}
              </h2>
              <p className="text-gray-600">{userProfile.position}</p>
              <p className="text-sm text-gray-500">{userProfile.department}</p>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Employee ID</span>
                <span className="text-sm font-medium text-gray-900">{userProfile.employeeId}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Hire Date</span>
                <span className="text-sm font-medium text-gray-900">{userProfile.hireDate}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Manager</span>
                <span className="text-sm font-medium text-gray-900">{userProfile.manager}</span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <h4 className="text-sm font-medium text-red-900 mb-2">Emergency Contact</h4>
              <div className="space-y-1 text-sm">
                <p className="text-red-800">{userProfile.emergencyContact.name}</p>
                <p className="text-red-700">{userProfile.emergencyContact.relationship}</p>
                <p className="text-red-700">{userProfile.emergencyContact.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {profileSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === section.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{section.title}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField('firstName', 'First Name', User)}
                    {renderField('lastName', 'Last Name', User)}
                    {renderField('email', 'Email Address', Mail, 'email')}
                    {renderField('phone', 'Phone Number', Phone, 'tel')}
                    {renderField('location', 'Location', MapPin)}
                    {renderField('bio', 'Bio', User, 'textarea')}
                  </div>
                </div>
              )}

              {/* Professional Details Tab */}
              {activeTab === 'professional' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField('department', 'Department', Building, 'select')}
                    {renderField('position', 'Position', Briefcase)}
                    {renderField('employeeId', 'Employee ID', User)}
                    {renderField('hireDate', 'Hire Date', Calendar, 'date')}
                    {renderField('manager', 'Manager', User)}
                  </div>
                </div>
              )}

              {/* Skills & Certifications Tab */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {renderSkillsSection()}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.languages.map((language, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Notification Preferences</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Push notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                          <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Profile visible to team</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                          <span className="ml-2 text-sm text-gray-700">Profile visible to company</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Show contact information</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div className="mt-4">
                      <button className="btn-primary">
                        <Shield size={16} />
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        <p className="text-xs text-gray-500 mt-1">Currently disabled</p>
                      </div>
                      <button className="btn-primary">
                        <Shield size={16} />
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
