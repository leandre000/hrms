import React, { useState } from 'react'
import { Settings, User, Shield, Bell, Database, Globe, Save, Eye, EyeOff } from 'lucide-react'

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [showPassword, setShowPassword] = useState(false)

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'account', name: 'Account', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'system', name: 'System', icon: Database },
    { id: 'integrations', name: 'Integrations', icon: Globe }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600">Manage system settings and configurations</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r bg-gray-50">
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          defaultValue="TechCorp Inc."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>UTC-05:00 (Eastern Time)</option>
                          <option>UTC-08:00 (Pacific Time)</option>
                          <option>UTC+00:00 (UTC)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue="Admin User"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          defaultValue="admin@company.com"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <input
                          type="text"
                          defaultValue="Administration"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div className="border-t pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                    <div className="space-y-4">
                      {[
                        { id: 'email_notifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                        { id: 'system_alerts', label: 'System Alerts', description: 'Important system and security alerts' },
                        { id: 'employee_updates', label: 'Employee Updates', description: 'Notifications about employee changes' },
                        { id: 'compliance_reminders', label: 'Compliance Reminders', description: 'Alerts for compliance deadlines' },
                        { id: 'performance_reviews', label: 'Performance Reviews', description: 'Notifications about review cycles' }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{item.label}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'system' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          defaultValue="30"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max File Upload Size (MB)</label>
                        <input
                          type="number"
                          defaultValue="10"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Log Retention (days)</label>
                        <input
                          type="number"
                          defaultValue="90"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Third-Party Integrations</h2>
                    <div className="space-y-4">
                      {[
                        { name: 'Slack Integration', description: 'Connect with Slack for notifications', status: 'connected' },
                        { name: 'Google Workspace', description: 'Sync with Google Calendar and Drive', status: 'connected' },
                        { name: 'Microsoft 365', description: 'Integration with Microsoft Office suite', status: 'disconnected' },
                        { name: 'Zoom', description: 'Video conferencing integration', status: 'connected' }
                      ].map((integration, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{integration.name}</h4>
                            <p className="text-sm text-gray-600">{integration.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              integration.status === 'connected' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {integration.status === 'connected' ? 'Connected' : 'Disconnected'}
                            </span>
                            <button className={`text-sm px-3 py-1 rounded ${
                              integration.status === 'connected'
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-primary-600 text-white hover:bg-primary-700'
                            } transition-colors`}>
                              {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="border-t pt-6 mt-8">
                <div className="flex justify-end">
                  <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettingsPage
