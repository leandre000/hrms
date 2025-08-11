import { useState } from 'react'
import {
  Settings,
  Save,
  RefreshCw,
  Search,
  Link,
  CheckCircle,
  Shield,
  Plus,
  Database,
  Zap,
  Bell,
  Activity,
  Download
} from 'lucide-react'

interface SystemSetting {
  id: string
  category: 'general' | 'security' | 'performance' | 'integration' | 'backup' | 'notification'
  name: string
  description: string
  value: string | number | boolean
  type: 'string' | 'number' | 'boolean' | 'select' | 'multiselect'
  options?: string[]
  unit?: string
  required: boolean
  editable: boolean
  lastModified: string
  modifiedBy: string
  status: 'active' | 'inactive' | 'deprecated'
  validation?: string
  helpText?: string
}

interface SystemMetric {
  id: string
  name: string
  value: string | number
  unit: string
  status: 'normal' | 'warning' | 'critical' | 'offline'
  trend: 'up' | 'down' | 'stable'
  lastUpdated: string
  threshold: {
    warning: number
    critical: number
  }
}

interface SystemLog {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'critical'
  category: string
  message: string
  source: string
  userId?: string
  ipAddress?: string
  details?: Record<string, any>
}

interface UserPreference {
  id: string
  userId: string
  category: 'interface' | 'notifications' | 'privacy' | 'accessibility'
  name: string
  value: string | number | boolean
  type: 'string' | 'number' | 'boolean' | 'select'
  options?: string[]
  description: string
  lastModified: string
}

const SystemSettingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('general')
  const [showNewSetting, setShowNewSetting] = useState(false)
  const [editingSetting, setEditingSetting] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string | number | boolean>('')

  // Mock data
  const systemSettings: SystemSetting[] = [
    {
      id: '1',
      category: 'general',
      name: 'System Name',
      description: 'Display name for the HRMS system',
      value: 'Acme Corp HRMS',
      type: 'string',
      required: true,
      editable: true,
      lastModified: '2024-01-20 10:30:00',
      modifiedBy: 'Admin User',
      status: 'active',
      helpText: 'This name will be displayed in the browser title and system headers'
    },
    {
      id: '2',
      category: 'general',
      name: 'Default Language',
      description: 'Default language for the system interface',
      value: 'English',
      type: 'select',
      options: ['English', 'Spanish', 'French', 'German', 'Chinese'],
      required: true,
      editable: true,
      lastModified: '2024-01-19 14:20:00',
      modifiedBy: 'Admin User',
      status: 'active'
    },
    {
      id: '3',
      category: 'general',
      name: 'Time Zone',
      description: 'Default time zone for the system',
      value: 'UTC-5 (Eastern Time)',
      type: 'select',
      options: ['UTC-8 (Pacific Time)', 'UTC-7 (Mountain Time)', 'UTC-6 (Central Time)', 'UTC-5 (Eastern Time)', 'UTC+0 (UTC)', 'UTC+1 (Central European Time)'],
      required: true,
      editable: true,
      lastModified: '2024-01-18 09:15:00',
      modifiedBy: 'Admin User',
      status: 'active'
    },
    {
      id: '4',
      category: 'security',
      name: 'Password Policy',
      description: 'Minimum password requirements',
      value: 'Strong',
      type: 'select',
      options: ['Basic', 'Standard', 'Strong', 'Very Strong'],
      required: true,
      editable: true,
      lastModified: '2024-01-20 11:45:00',
      modifiedBy: 'Security Admin',
      status: 'active',
      helpText: 'Defines the complexity requirements for user passwords'
    },
    {
      id: '5',
      category: 'security',
      name: 'Session Timeout',
      description: 'Automatic logout after inactivity (minutes)',
      value: 30,
      type: 'number',
      unit: 'minutes',
      required: true,
      editable: true,
      lastModified: '2024-01-19 16:30:00',
      modifiedBy: 'Security Admin',
      status: 'active',
      validation: 'min:5,max:480'
    },
    {
      id: '6',
      category: 'security',
      name: 'Two-Factor Authentication',
      description: 'Require 2FA for all users',
      value: true,
      type: 'boolean',
      required: false,
      editable: true,
      lastModified: '2024-01-20 08:15:00',
      modifiedBy: 'Security Admin',
      status: 'active'
    },
    {
      id: '7',
      category: 'performance',
      name: 'Cache TTL',
      description: 'Cache time-to-live in seconds',
      value: 300,
      type: 'number',
      unit: 'seconds',
      required: true,
      editable: true,
      lastModified: '2024-01-17 13:45:00',
      modifiedBy: 'System Admin',
      status: 'active',
      validation: 'min:60,max:3600'
    },
    {
      id: '8',
      category: 'performance',
      name: 'Max Concurrent Users',
      description: 'Maximum number of simultaneous users',
      value: 1000,
      type: 'number',
      required: true,
      editable: true,
      lastModified: '2024-01-16 10:20:00',
      modifiedBy: 'System Admin',
      status: 'active',
      validation: 'min:100,max:10000'
    },
    {
      id: '9',
      category: 'backup',
      name: 'Auto Backup',
      description: 'Enable automatic system backups',
      value: true,
      type: 'boolean',
      required: false,
      editable: true,
      lastModified: '2024-01-15 12:00:00',
      modifiedBy: 'System Admin',
      status: 'active'
    },
    {
      id: '10',
      category: 'backup',
      name: 'Backup Retention',
      description: 'Number of backup files to keep',
      value: 30,
      type: 'number',
      unit: 'days',
      required: true,
      editable: true,
      lastModified: '2024-01-14 15:30:00',
      modifiedBy: 'System Admin',
      status: 'active',
      validation: 'min:7,max:365'
    }
  ]

  const systemMetrics: SystemMetric[] = [
    {
      id: '1',
      name: 'CPU Usage',
      value: 45,
      unit: '%',
      status: 'normal',
      trend: 'stable',
      lastUpdated: '2 minutes ago',
      threshold: { warning: 70, critical: 90 }
    },
    {
      id: '2',
      name: 'Memory Usage',
      value: 78,
      unit: '%',
      status: 'warning',
      trend: 'up',
      lastUpdated: '2 minutes ago',
      threshold: { warning: 75, critical: 90 }
    },
    {
      id: '3',
      name: 'Disk Usage',
      value: 65,
      unit: '%',
      status: 'normal',
      trend: 'stable',
      lastUpdated: '2 minutes ago',
      threshold: { warning: 80, critical: 95 }
    },
    {
      id: '4',
      name: 'Network Load',
      value: 32,
      unit: '%',
      status: 'normal',
      trend: 'down',
      lastUpdated: '2 minutes ago',
      threshold: { warning: 70, critical: 85 }
    },
    {
      id: '5',
      name: 'Active Users',
      value: 156,
      unit: 'users',
      status: 'normal',
      trend: 'stable',
      lastUpdated: '2 minutes ago',
      threshold: { warning: 800, critical: 950 }
    },
    {
      id: '6',
      name: 'Database Connections',
      value: 23,
      unit: 'connections',
      status: 'normal',
      trend: 'stable',
      lastUpdated: '2 minutes ago',
      threshold: { warning: 80, critical: 100 }
    }
  ]

  const systemLogs: SystemLog[] = [
    {
      id: '1',
      timestamp: '2024-01-22 15:30:00',
      level: 'info',
      category: 'User Management',
      message: 'User login successful',
      source: 'Authentication Service',
      userId: 'user123',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-01-22 15:28:00',
      level: 'warning',
      category: 'Performance',
      message: 'High memory usage detected',
      source: 'System Monitor',
      details: { memoryUsage: '78%', threshold: '75%' }
    },
    {
      id: '3',
      timestamp: '2024-01-22 15:25:00',
      level: 'info',
      category: 'Backup',
      message: 'Daily backup completed successfully',
      source: 'Backup Service',
      details: { size: '2.4 GB', duration: '15 minutes' }
    },
    {
      id: '4',
      timestamp: '2024-01-22 15:20:00',
      level: 'error',
      category: 'Integration',
      message: 'Failed to sync with external API',
      source: 'Integration Service',
      details: { api: 'Payroll API', error: 'Connection timeout' }
    },
    {
      id: '5',
      timestamp: '2024-01-22 15:15:00',
      level: 'info',
      category: 'Security',
      message: 'Password policy updated',
      source: 'Security Service',
      userId: 'admin456'
    }
  ]

  const userPreferences: UserPreference[] = [
    {
      id: '1',
      userId: 'user123',
      category: 'interface',
      name: 'Theme',
      value: 'Light',
      type: 'select',
      options: ['Light', 'Dark', 'Auto'],
      description: 'User interface theme preference',
      lastModified: '2024-01-20 14:30:00'
    },
    {
      id: '2',
      userId: 'user123',
      category: 'notifications',
      name: 'Email Notifications',
      value: true,
      type: 'boolean',
      description: 'Receive email notifications',
      lastModified: '2024-01-19 16:45:00'
    },
    {
      id: '3',
      userId: 'user123',
      category: 'notifications',
      name: 'Push Notifications',
      value: false,
      type: 'boolean',
      description: 'Receive push notifications',
      lastModified: '2024-01-18 11:20:00'
    },
    {
      id: '4',
      userId: 'user123',
      category: 'privacy',
      name: 'Profile Visibility',
      value: 'Team Only',
      type: 'select',
      options: ['Public', 'Team Only', 'Private'],
      description: 'Who can see your profile information',
      lastModified: '2024-01-17 09:15:00'
    }
  ]

  const filteredSettings = systemSettings.filter(setting => {
    const matchesSearch = setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         setting.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || setting.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || setting.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'deprecated': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      case 'offline': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'bg-blue-100 text-blue-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return <Settings className="w-5 h-5" />
      case 'security': return <Shield className="w-5 h-5" />
      case 'performance': return <Zap className="w-5 h-5" />
      case 'integration': return <Link className="w-5 h-5" />
      case 'backup': return <Database className="w-5 h-5" />
      case 'notification': return <Bell className="w-5 h-5" />
      default: return <Settings className="w-5 h-5" />
    }
  }

  const handleEdit = (setting: SystemSetting) => {
    setEditingSetting(setting.id)
    setEditValue(setting.value)
  }

  const handleSave = (settingId: string) => {
    // Here you would typically save to the backend
    const updatedSettings = systemSettings.map(s => 
      s.id === settingId ? { ...s, value: editValue, lastModified: new Date().toISOString() } : s
    )
    setEditingSetting(null)
    setEditValue('')
  }

  const handleCancel = () => {
    setEditingSetting(null)
    setEditValue('')
  }

  const renderSettingValue = (setting: SystemSetting) => {
    if (editingSetting === setting.id) {
      switch (setting.type) {
        case 'boolean':
          return (
            <select
              value={editValue.toString()}
              onChange={(e) => setEditValue(e.target.value === 'true')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          )
        case 'select':
          return (
            <select
              value={editValue.toString()}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {setting.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )
        case 'number':
          return (
            <input
              type="number"
              value={editValue.toString()}
              onChange={(e) => setEditValue(parseFloat(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          )
        default:
          return (
            <input
              type="text"
              value={editValue.toString()}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          )
      }
    }

    // Display value
    if (setting.type === 'boolean') {
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          setting.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {setting.value ? 'Yes' : 'No'}
        </span>
      )
    }

    return (
      <span className="text-gray-900">
        {setting.value}{setting.unit && ` ${setting.unit}`}
      </span>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system-wide settings, security policies, and user preferences</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <RefreshCw size={20} />
            Refresh
          </button>
          <button
            onClick={() => setShowNewSetting(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            New Setting
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Settings</p>
              <p className="text-2xl font-bold text-gray-900">{systemSettings.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Settings</p>
              <p className="text-2xl font-bold text-gray-900">{systemSettings.filter(s => s.status === 'active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Security Settings</p>
              <p className="text-2xl font-bold text-gray-900">{systemSettings.filter(s => s.category === 'security').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-gray-900">Good</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search settings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="security">Security</option>
              <option value="performance">Performance</option>
              <option value="integration">Integration</option>
              <option value="backup">Backup</option>
              <option value="notification">Notification</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['general', 'security', 'performance', 'monitoring', 'logs', 'preferences'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                <button className="btn-primary">
                  <Save size={20} />
                  Save All Changes
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSettings.filter(s => s.category === 'general').map((setting) => (
                      <tr key={setting.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{setting.name}</div>
                            <div className="text-sm text-gray-500">{setting.description}</div>
                            {setting.helpText && (
                              <div className="text-xs text-gray-400 mt-1">{setting.helpText}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderSettingValue(setting)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon(setting.category)}
                            <span className="text-sm text-gray-900 capitalize">{setting.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(setting.status)}`}>
                            {setting.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div>{setting.lastModified}</div>
                            <div className="text-xs text-gray-500">by {setting.modifiedBy}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingSetting === setting.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSave(setting.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              {setting.editable && (
                                <button
                                  onClick={() => handleEdit(setting)}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  Edit
                                </button>
                              )}
                              <button className="text-gray-600 hover:text-gray-900">View</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                <button className="btn-primary">
                  <Save size={20} />
                  Save All Changes
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSettings.filter(s => s.category === 'security').map((setting) => (
                      <tr key={setting.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{setting.name}</div>
                            <div className="text-sm text-gray-500">{setting.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderSettingValue(setting)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(setting.status)}`}>
                            {setting.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div>{setting.lastModified}</div>
                            <div className="text-xs text-gray-500">by {setting.modifiedBy}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingSetting === setting.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSave(setting.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              {setting.editable && (
                                <button
                                  onClick={() => handleEdit(setting)}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  Edit
                                </button>
                              )}
                              <button className="text-gray-600 hover:text-gray-900">View</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Performance Settings</h3>
                <button className="btn-primary">
                  <Save size={20} />
                  Save All Changes
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSettings.filter(s => s.category === 'performance').map((setting) => (
                      <tr key={setting.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{setting.name}</div>
                            <div className="text-sm text-gray-500">{setting.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderSettingValue(setting)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(setting.status)}`}>
                            {setting.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div>{setting.lastModified}</div>
                            <div className="text-xs text-gray-500">by {setting.modifiedBy}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingSetting === setting.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSave(setting.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              {setting.editable && (
                                <button
                                  onClick={() => handleEdit(setting)}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  Edit
                                </button>
                              )}
                              <button className="text-gray-600 hover:text-gray-900">View</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Monitoring Tab */}
          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">System Monitoring</h3>
                <button className="btn-secondary">
                  <RefreshCw size={20} />
                  Refresh Metrics
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemMetrics.map((metric) => (
                  <div key={metric.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
                        <p className="text-sm text-gray-600">Current Value</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMetricStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900">
                        {metric.value}{metric.unit}
                      </div>
                      <div className="text-sm text-gray-500">
                        Last updated: {metric.lastUpdated}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Warning Threshold:</span>
                        <span className="font-medium">{metric.threshold.warning}{metric.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Critical Threshold:</span>
                        <span className="font-medium">{metric.threshold.critical}{metric.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Trend:</span>
                        <span className="font-medium capitalize">{metric.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
                <div className="flex space-x-2">
                  <button className="btn-secondary">
                    <Download size={20} />
                    Export Logs
                  </button>
                  <button className="btn-secondary">
                    <RefreshCw size={20} />
                    Refresh
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {systemLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLogLevelColor(log.level)}`}>
                            {log.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.category}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{log.message}</div>
                          {log.details && (
                            <div className="text-xs text-gray-500 mt-1">
                              {Object.entries(log.details).map(([key, value]) => (
                                <span key={key} className="mr-2">{key}: {value}</span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.source}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Export</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">User Preferences</h3>
                <button className="btn-primary">
                  <Save size={20} />
                  Save Preferences
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPreferences.map((preference) => (
                  <div key={preference.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{preference.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{preference.category}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{preference.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Current Value:</span>
                        <span className="font-medium">
                          {preference.type === 'boolean' 
                            ? (preference.value ? 'Yes' : 'No')
                            : preference.value.toString()
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Modified:</span>
                        <span className="font-medium">{preference.lastModified}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Reset
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SystemSettingsPage
