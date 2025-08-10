import React, { useState } from 'react'
import { Settings, User, Bell, Shield, Globe, Palette, Save, Eye, EyeOff } from 'lucide-react'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // Profile Settings
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Senior Developer',
    department: 'Engineering',
    manager: 'Sarah Wilson',
    bio: 'Passionate developer with 5+ years of experience in React and Node.js.',
    timezone: 'America/New_York',
    workingHours: {
      start: '09:00',
      end: '17:00'
    },
    
    // Notification Settings
    emailNotifications: {
      messages: true,
      mentions: true,
      taskAssignments: true,
      meetings: true,
      announcements: false,
      newsletters: false
    },
    pushNotifications: {
      messages: true,
      mentions: true,
      taskAssignments: false,
      meetings: true
    },
    notificationFrequency: 'immediate',
    
    // Privacy Settings
    profileVisibility: 'company',
    showEmail: true,
    showPhone: false,
    showBirthday: true,
    allowDirectMessages: true,
    
    // Appearance Settings
    theme: 'light',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    
    // Account Settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  })

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Saving settings:', settings)
    alert('Settings saved successfully!')
  }

  const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'America/Denver',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai'
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' }
  ]

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and settings</p>
          </div>
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Settings Navigation */}
            <div className="lg:col-span-1 border-r border-gray-200 p-4">
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'notifications', label: 'Notifications', icon: Bell },
                  { id: 'privacy', label: 'Privacy', icon: Shield },
                  { id: 'appearance', label: 'Appearance', icon: Palette },
                  { id: 'account', label: 'Account', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3 p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          value={settings.firstName}
                          onChange={(e) => setSettings({...settings, firstName: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          value={settings.lastName}
                          onChange={(e) => setSettings({...settings, lastName: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({...settings, email: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={settings.phone}
                          onChange={(e) => setSettings({...settings, phone: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={settings.jobTitle}
                          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input
                          type="text"
                          value={settings.department}
                          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        rows={3}
                        value={settings.bio}
                        onChange={(e) => setSettings({...settings, bio: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Work Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                        <select
                          value={settings.timezone}
                          onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          {timezones.map((tz) => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={settings.workingHours.start}
                            onChange={(e) => handleInputChange('workingHours', 'start', e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <span className="flex items-center text-gray-500">to</span>
                          <input
                            type="time"
                            value={settings.workingHours.end}
                            onChange={(e) => handleInputChange('workingHours', 'end', e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h2>
                    <div className="space-y-3">
                      {Object.entries(settings.emailNotifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <label className="text-sm text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => handleInputChange('emailNotifications', key, e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {Object.entries(settings.pushNotifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <label className="text-sm text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => handleInputChange('pushNotifications', key, e.target.checked)}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Notification Frequency</h3>
                    <select
                      value={settings.notificationFrequency}
                      onChange={(e) => setSettings({...settings, notificationFrequency: e.target.value})}
                      className="w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="hourly">Hourly Digest</option>
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Digest</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h2>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => setSettings({...settings, profileVisibility: e.target.value})}
                      className="w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="public">Public (Everyone)</option>
                      <option value="company">Company Only</option>
                      <option value="team">Team Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Contact Information Visibility</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700">Show Email Address</label>
                        <input
                          type="checkbox"
                          checked={settings.showEmail}
                          onChange={(e) => setSettings({...settings, showEmail: e.target.checked})}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700">Show Phone Number</label>
                        <input
                          type="checkbox"
                          checked={settings.showPhone}
                          onChange={(e) => setSettings({...settings, showPhone: e.target.checked})}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700">Show Birthday</label>
                        <input
                          type="checkbox"
                          checked={settings.showBirthday}
                          onChange={(e) => setSettings({...settings, showBirthday: e.target.checked})}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Communication Preferences</h3>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Allow Direct Messages</label>
                      <input
                        type="checkbox"
                        checked={settings.allowDirectMessages}
                        onChange={(e) => setSettings({...settings, allowDirectMessages: e.target.checked})}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Theme</h2>
                    <div className="grid grid-cols-3 gap-3 max-w-md">
                      {['light', 'dark', 'auto'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setSettings({...settings, theme})}
                          className={`p-3 border rounded-lg text-center capitalize transition-colors ${
                            settings.theme === theme
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Language & Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <select
                          value={settings.language}
                          onChange={(e) => setSettings({...settings, language: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                        <select
                          value={settings.dateFormat}
                          onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                        <select
                          value={settings.timeFormat}
                          onChange={(e) => setSettings({...settings, timeFormat: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="12h">12 Hour</option>
                          <option value="24h">24 Hour</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={settings.currentPassword}
                            onChange={(e) => setSettings({...settings, currentPassword: e.target.value})}
                            className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          value={settings.newPassword}
                          onChange={(e) => setSettings({...settings, newPassword: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={settings.confirmPassword}
                          onChange={(e) => setSettings({...settings, confirmPassword: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Enable 2FA</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.twoFactorEnabled}
                        onChange={(e) => setSettings({...settings, twoFactorEnabled: e.target.checked})}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-md font-semibold text-red-900 mb-4">Danger Zone</h3>
                    <div className="space-y-3">
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Deactivate Account
                      </button>
                      <p className="text-sm text-gray-600">
                        Deactivating your account will hide your profile and prevent login. Contact IT to reactivate.
                      </p>
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

export default SettingsPage
