import React, { useState } from 'react'
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Database,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Check,
  X
} from 'lucide-react'

interface UserPreference {
  id: string
  name: string
  description: string
  value: string | boolean | number
  type: 'text' | 'boolean' | 'select' | 'number'
  options?: string[]
  category: 'general' | 'notifications' | 'security' | 'appearance' | 'data'
}

interface SystemSetting {
  id: string
  name: string
  description: string
  value: string | boolean | number
  type: 'text' | 'boolean' | 'select' | 'number'
  options?: string[]
  category: 'system' | 'security' | 'integration' | 'backup'
  isEditable: boolean
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [editingSetting, setEditingSetting] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')

  // Mock data
  const userPreferences: UserPreference[] = [
    {
      id: '1',
      name: 'Language',
      description: 'Choose your preferred language for the interface',
      value: 'English',
      type: 'select',
      options: ['English', 'Spanish', 'French', 'German', 'Chinese'],
      category: 'general'
    },
    {
      id: '2',
      name: 'Time Zone',
      description: 'Set your local time zone for accurate time display',
      value: 'UTC-5 (Eastern Time)',
      type: 'select',
      options: ['UTC-8 (Pacific Time)', 'UTC-7 (Mountain Time)', 'UTC-6 (Central Time)', 'UTC-5 (Eastern Time)', 'UTC+0 (GMT)'],
      category: 'general'
    },
    {
      id: '3',
      name: 'Date Format',
      description: 'Choose how dates are displayed',
      value: 'MM/DD/YYYY',
      type: 'select',
      options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
      category: 'general'
    },
    {
      id: '4',
      name: 'Email Notifications',
      description: 'Receive email notifications for important updates',
      value: true,
      type: 'boolean',
      category: 'notifications'
    },
    {
      id: '5',
      name: 'Push Notifications',
      description: 'Show push notifications in your browser',
      value: false,
      type: 'boolean',
      category: 'notifications'
    },
    {
      id: '6',
      name: 'Weekly Reports',
      description: 'Send weekly summary reports via email',
      value: true,
      type: 'boolean',
      category: 'notifications'
    },
    {
      id: '7',
      name: 'Two-Factor Authentication',
      description: 'Enable additional security with 2FA',
      value: false,
      type: 'boolean',
      category: 'security'
    },
    {
      id: '8',
      name: 'Session Timeout',
      description: 'Automatically log out after inactivity (minutes)',
      value: 30,
      type: 'number',
      category: 'security'
    },
    {
      id: '9',
      name: 'Theme',
      description: 'Choose your preferred color scheme',
      value: 'Light',
      type: 'select',
      options: ['Light', 'Dark', 'Auto'],
      category: 'appearance'
    },
    {
      id: '10',
      name: 'Compact Mode',
      description: 'Use compact layout for better space utilization',
      value: false,
      type: 'boolean',
      category: 'appearance'
    }
  ]

  const systemSettings: SystemSetting[] = [
    {
      id: '1',
      name: 'Company Name',
      description: 'The name of your organization',
      value: 'Acme Corporation',
      type: 'text',
      category: 'system',
      isEditable: true
    },
    {
      id: '2',
      name: 'Default Currency',
      description: 'Primary currency for financial calculations',
      value: 'USD',
      type: 'select',
      options: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      category: 'system',
      isEditable: true
    },
    {
      id: '3',
      name: 'Data Retention Period',
      description: 'How long to keep employee data after termination (months)',
      value: 7,
      type: 'number',
      category: 'system',
      isEditable: true
    },
    {
      id: '4',
      name: 'Auto Backup',
      description: 'Automatically backup data daily',
      value: true,
      type: 'boolean',
      category: 'backup',
      isEditable: true
    },
    {
      id: '5',
      name: 'Backup Retention',
      description: 'Keep backup files for (days)',
      value: 30,
      type: 'number',
      category: 'backup',
      isEditable: true
    },
    {
      id: '6',
      name: 'API Rate Limiting',
      description: 'Maximum API requests per minute',
      value: 1000,
      type: 'number',
      category: 'integration',
      isEditable: false
    }
  ]

  const handleEdit = (setting: UserPreference | SystemSetting) => {
    setEditingSetting(setting.id)
    setEditValue(String(setting.value))
  }

  const handleSave = (setting: UserPreference | SystemSetting) => {
    // In a real app, this would update the backend
    setting.value = editValue
    setEditingSetting(null)
    setEditValue('')
  }

  const handleCancel = () => {
    setEditingSetting(null)
    setEditValue('')
  }

  const renderSettingValue = (setting: UserPreference | SystemSetting) => {
    if (editingSetting === setting.id) {
      return (
        <div className="flex items-center space-x-2">
          {setting.type === 'select' ? (
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {setting.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : setting.type === 'boolean' ? (
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          ) : setting.type === 'number' ? (
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent w-20"
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          )}
          <button
            onClick={() => handleSave(setting)}
            className="p-1 text-green-600 hover:text-green-800"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <X size={16} />
          </button>
        </div>
      )
    }

    if (setting.type === 'boolean') {
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          setting.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {setting.value ? 'Enabled' : 'Disabled'}
        </span>
      )
    }

    return <span className="text-gray-900">{String(setting.value)}</span>
  }

  const filteredPreferences = userPreferences.filter(pref => {
    const matchesSearch = pref.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pref.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeTab === 'general' || pref.category === activeTab
    return matchesSearch && matchesCategory
  })

  const filteredSystemSettings = systemSettings.filter(setting => {
    const matchesSearch = setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         setting.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your preferences and system configuration</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <RefreshCw size={20} />
            Reset to Defaults
          </button>
          <button className="btn-primary">
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search settings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'general', name: 'General', icon: User },
              { id: 'notifications', name: 'Notifications', icon: Bell },
              { id: 'security', name: 'Security', icon: Shield },
              { id: 'appearance', name: 'Appearance', icon: Palette },
              { id: 'data', name: 'Data', icon: Database },
              { id: 'system', name: 'System', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPreferences.map((pref) => (
                  <div key={pref.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{pref.name}</h3>
                        <p className="text-sm text-gray-600">{pref.description}</p>
                      </div>
                      {pref.category === 'general' && (
                        <button
                          onClick={() => handleEdit(pref)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Current Value:</span>
                      {renderSettingValue(pref)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPreferences.map((pref) => (
                  <div key={pref.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{pref.name}</h3>
                        <p className="text-sm text-gray-600">{pref.description}</p>
                      </div>
                      <button
                        onClick={() => handleEdit(pref)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Current Value:</span>
                      {renderSettingValue(pref)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPreferences.map((pref) => (
                  <div key={pref.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{pref.name}</h3>
                        <p className="text-sm text-gray-600">{pref.description}</p>
                      </div>
                      <button
                        onClick={() => handleEdit(pref)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Current Value:</span>
                      {renderSettingValue(pref)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Password Change Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
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
                    <Key size={16} />
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPreferences.map((pref) => (
                  <div key={pref.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{pref.name}</h3>
                        <p className="text-sm text-gray-600">{pref.description}</p>
                      </div>
                      <button
                        onClick={() => handleEdit(pref)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Current Value:</span>
                      {renderSettingValue(pref)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPreferences.map((pref) => (
                  <div key={pref.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{pref.name}</h3>
                        <p className="text-sm text-gray-600">{pref.description}</p>
                      </div>
                      <button
                        onClick={() => handleEdit(pref)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Current Value:</span>
                      {renderSettingValue(pref)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Export/Import Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Export Data</h4>
                    <p className="text-sm text-gray-600 mb-3">Download your data in various formats</p>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center space-x-2">
                        <Download size={16} />
                        <span>Export as CSV</span>
                      </button>
                      <button className="w-full px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 flex items-center justify-center space-x-2">
                        <Download size={16} />
                        <span>Export as JSON</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Import Data</h4>
                    <p className="text-sm text-gray-600 mb-3">Upload data from external sources</p>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 flex items-center justify-center space-x-2">
                        <Upload size={16} />
                        <span>Import from CSV</span>
                      </button>
                      <button className="w-full px-4 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 flex items-center justify-center space-x-2">
                        <Upload size={16} />
                        <span>Import from JSON</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSystemSettings.map((setting) => (
                  <div key={setting.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{setting.name}</h3>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      {setting.isEditable && (
                        <button
                          onClick={() => handleEdit(setting)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Current Value:</span>
                      {renderSettingValue(setting)}
                    </div>
                    {!setting.isEditable && (
                      <p className="text-xs text-gray-500 mt-2">This setting cannot be modified</p>
                    )}
                  </div>
                ))}
              </div>

              {/* System Actions Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="px-4 py-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center space-x-2">
                    <RefreshCw size={16} />
                    <span>Clear Cache</span>
                  </button>
                  <button className="px-4 py-3 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 flex items-center justify-center space-x-2">
                    <Database size={16} />
                    <span>Optimize Database</span>
                  </button>
                  <button className="px-4 py-3 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center space-x-2">
                    <Trash2 size={16} />
                    <span>Clear Logs</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
