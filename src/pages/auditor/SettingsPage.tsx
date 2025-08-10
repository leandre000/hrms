import React, { useState } from 'react'
import { Settings, Bell, Shield, Eye, Database, Save } from 'lucide-react'

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    criticalAlerts: true,
    weeklyReports: false
  })

  const [privacy, setPrivacy] = useState({
    activityTracking: true,
    dataRetention: '7years',
    twoFactorAuth: true
  })

  const [auditSettings, setAuditSettings] = useState({
    autoArchive: true,
    reportFormat: 'pdf',
    defaultDateRange: '30days',
    evidenceEncryption: true
  })

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Auditor Settings</h1>

        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive audit alerts via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">In-App Notifications</h3>
                  <p className="text-sm text-gray-600">Show notifications within the application</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.inApp}
                  onChange={(e) => setNotifications({...notifications, inApp: e.target.checked})}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Critical Security Alerts</h3>
                  <p className="text-sm text-gray-600">Immediate alerts for security incidents</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.criticalAlerts}
                  onChange={(e) => setNotifications({...notifications, criticalAlerts: e.target.checked})}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Weekly Summary Reports</h3>
                  <p className="text-sm text-gray-600">Weekly digest of audit activities</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.weeklyReports}
                  onChange={(e) => setNotifications({...notifications, weeklyReports: e.target.checked})}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Activity Tracking</h3>
                  <p className="text-sm text-gray-600">Track audit activities for compliance</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacy.activityTracking}
                  onChange={(e) => setPrivacy({...privacy, activityTracking: e.target.checked})}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Enhanced security for audit access</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacy.twoFactorAuth}
                  onChange={(e) => setPrivacy({...privacy, twoFactorAuth: e.target.checked})}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention Period</label>
                <select
                  value={privacy.dataRetention}
                  onChange={(e) => setPrivacy({...privacy, dataRetention: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="1year">1 Year</option>
                  <option value="3years">3 Years</option>
                  <option value="5years">5 Years</option>
                  <option value="7years">7 Years</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audit Settings */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900">Audit Configuration</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Auto-Archive Reports</h3>
                  <p className="text-sm text-gray-600">Automatically archive completed audit reports</p>
                </div>
                <input
                  type="checkbox"
                  checked={auditSettings.autoArchive}
                  onChange={(e) => setAuditSettings({...auditSettings, autoArchive: e.target.checked})}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Evidence Encryption</h3>
                  <p className="text-sm text-gray-600">Encrypt all evidence files at rest</p>
                </div>
                <input
                  type="checkbox"
                  checked={auditSettings.evidenceEncryption}
                  onChange={(e) => setAuditSettings({...auditSettings, evidenceEncryption: e.target.checked})}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Report Format</label>
                  <select
                    value={auditSettings.reportFormat}
                    onChange={(e) => setAuditSettings({...auditSettings, reportFormat: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Date Range</label>
                  <select
                    value={auditSettings.defaultDateRange}
                    onChange={(e) => setAuditSettings({...auditSettings, defaultDateRange: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="1year">Last Year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage