import React, { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Award,
  Edit,
  Camera,
  Save,
  X,
  TrendingUp,
  Star,
  Clock
} from 'lucide-react'

interface TrainerProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  hireDate: string
  bio: string
  expertise: string[]
  certifications: string[]
  avatar: string
}

interface TrainingStats {
  totalPrograms: number
  totalLearners: number
  completionRate: number
  avgRating: number
  totalHours: number
}

const mockProfile: TrainerProfile = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@company.com',
  phone: '+1 (555) 123-4567',
  department: 'Training & Development',
  position: 'Senior Training Specialist',
  hireDate: '2022-03-15',
  bio: 'Experienced training professional with over 8 years of experience in corporate training, instructional design, and learning management. Specialized in leadership development, technical skills training, and organizational change management.',
  expertise: ['Leadership Development', 'Project Management', 'Agile Methodologies', 'Communication Skills', 'Team Building'],
  certifications: ['Certified Professional in Learning and Performance (CPLP)', 'Project Management Professional (PMP)', 'Agile Certified Practitioner (ACP)', 'Certified Scrum Master (CSM)'],
  avatar: '/api/avatars/trainer-1.jpg'
}

const mockStats: TrainingStats = {
  totalPrograms: 24,
  totalLearners: 342,
  completionRate: 87.5,
  avgRating: 4.6,
  totalHours: 156
}

const TrainerProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<TrainerProfile>(mockProfile)
  const [editedProfile, setEditedProfile] = useState<TrainerProfile>(mockProfile)

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof TrainerProfile, value: string | string[]) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and training profile</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={`${profile.firstName} ${profile.lastName}`}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="text-center bg-gray-50 border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  profile.firstName
                )}
                {' '}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="text-center bg-gray-50 border border-gray-300 rounded px-2 py-1 w-full mt-2"
                  />
                ) : (
                  profile.lastName
                )}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="text-center bg-gray-50 border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  profile.position
                )}
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-50 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      profile.email
                    )}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-50 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      profile.phone
                    )}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="bg-gray-50 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      profile.department
                    )}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">
                    Hired: {profile.hireDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Training Statistics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalPrograms}</p>
                <p className="text-sm text-gray-600">Programs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalLearners}</p>
                <p className="text-sm text-gray-600">Learners</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{mockStats.completionRate}%</p>
                <p className="text-sm text-gray-600">Completion</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{mockStats.avgRating}</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalHours}</p>
                <p className="text-sm text-gray-600">Hours</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-700">{profile.bio}</p>
            )}
          </div>

          {/* Expertise */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {isEditing ? (
                <div className="w-full">
                  <input
                    type="text"
                    value={editedProfile.expertise.join(', ')}
                    onChange={(e) => handleInputChange('expertise', e.target.value.split(', '))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter expertise areas separated by commas"
                  />
                </div>
              ) : (
                profile.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
            <div className="space-y-3">
              {isEditing ? (
                <div className="w-full">
                  <textarea
                    value={editedProfile.certifications.join('\n')}
                    onChange={(e) => handleInputChange('certifications', e.target.value.split('\n'))}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter certifications, one per line"
                  />
                </div>
              ) : (
                profile.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainerProfilePage
