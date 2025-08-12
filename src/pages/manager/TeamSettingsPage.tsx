import React, { useState } from 'react'
import { Settings, Users, Bell, Shield, Calendar, Target, Database, Key, Save, X } from 'lucide-react'

interface TeamSetting {
  id: string
  category: string
  name: string
  description: string
  value: any
  type: 'toggle' | 'select' | 'input' | 'textarea'
  options?: string[]
  required?: boolean
}

const TeamSettingsPage = () => {
  const [settings, setSettings] = useState<TeamSetting[]>([
    {
      id: '1',
      category: 'General',
      name: 'Team Name',
      description: 'Display name for your team',
      value: 'Engineering Team Alpha',
      type: 'input',
      required: true
    },
    {
      id: '2',
      category: 'General',
      name: 'Team Description',
      description: 'Brief description of your team\'s purpose and responsibilities',
      value: 'Core engineering team responsible for product development and technical architecture',
      type: 'textarea',
      required: false
    },
    {
      id: '3',
      category: 'General',
      name: 'Team Size Limit',
      description: 'Maximum number of team members allowed',
      value: '15',
      type: 'input',
      required: true
    },
    {
      id: '4',
      category: 'Notifications',
      name: 'Email Notifications',
      description: 'Send email notifications for team updates',
      value: true,
      type: 'toggle',
      required: false
    },
    {
      id: '5',
      category: 'Notifications',
      name: 'Push Notifications',
      description: 'Send push notifications for urgent matters',
      value: true,
      type: 'toggle',
      required: false
    },
    {
      id: '6',
      category: 'Notifications',
      name: 'Weekly Digest',
      description: 'Send weekly summary of team activities',
      value: false,
      type: 'toggle',
      required: false
    },
    {
      id: '7',
      category: 'Work Schedule',
      name: 'Default Working Hours',
      description: 'Standard working hours for the team',
      value: '9:00 AM - 5:00 PM',
      type: 'select',
      options: ['8:00 AM - 4:00 PM', '9:00 AM - 5:00 PM', '10:00 AM - 6:00 PM', 'Flexible'],
      required: true
    },
    {
      id: '8',
      category: 'Work Schedule',
      name: 'Time Zone',
      description: 'Primary time zone for the team',
      value: 'UTC-8 (Pacific Time)',
      type: 'select',
      options: ['UTC-8 (Pacific Time)', 'UTC-5 (Eastern Time)', 'UTC+0 (GMT)', 'UTC+1 (Central European Time)'],
      required: true
    },
    {
      id: '9',
      category: 'Work Schedule',
      name: 'Weekend Work',
      description: 'Allow weekend work assignments',
      value: false,
      type: 'toggle',
      required: false
    },
    {
      id: '10',
      category: 'Performance',
      name: 'Review Frequency',
      description: 'How often to conduct performance reviews',
      value: 'Quarterly',
      type: 'select',
      options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually'],
      required: true
    },
    {
      id: '11',
      category: 'Performance',
      name: 'Goal Setting',
      description: 'Enable team goal setting and tracking',
      value: true,
      type: 'toggle',
      required: false
    },
    {
      id: '12',
      category: 'Performance',
      name: 'Peer Reviews',
      description: 'Allow team members to review each other',
      value: true,
      type: 'toggle',
      required: false
    },
    {
      id: '13',
      category: 'Security',
      name: 'Two-Factor Authentication',
      description: 'Require 2FA for team access',
      value: true,
      type: 'toggle',
      required: false
    },
    {
      id: '14',
      category: 'Security',
      name: 'Session Timeout',
      description: 'Auto-logout after inactivity',
      value: '30 minutes',
      type: 'select',
      options: ['15 minutes', '30 minutes', '1 hour', '4 hours', 'Never'],
      required: true
    },
    {
      id: '15',
      category: 'Data',
      name: 'Data Retention',
      description: 'How long to keep team data',
      value: '2 years',
      type: 'select',
      options: ['6 months', '1 year', '2 years', '5 years', 'Indefinitely'],
      required: true
    },
    {
      id: '16',
      category: 'Data',
      name: 'Export Permissions',
      description: 'Allow team data export',
      value: true,
      type: 'toggle',
      required: false
    }
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<any>('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(settings.map(s => s.category)))]

  const filteredSettings = settings.filter(setting => 
    activeCategory === 'All' || setting.category === activeCategory
  )

  const handleEdit = (setting: TeamSetting) => {
    setEditingId(setting.id)
    setEditValue(setting.value)
  }

  const handleSave = (id: string) => {
    setSettings(prev => prev.map(s => 
      s.id === id ? { ...s, value: editValue } : s
    ))
    setEditingId(null)
    setEditValue('')
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValue('')
  }

  const renderSettingValue = (setting: TeamSetting) => {
    if (editingId === setting.id) {
      switch (setting.type) {
        case 'toggle':
          return (
            <input
              type="checkbox"
              checked={editValue}
              onChange={(e) => setEditValue(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          )
        case 'select':
          return (
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {setting.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )
        case 'textarea':
          return (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={3}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          )
        default:
          return (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          )
      }
    }

    switch (setting.type) {
      case 'toggle':
        return (
          <div className={`w-12 h-6 rounded-full transition-colors ${setting.value ? 'bg-primary-600' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${setting.value ? 'translate-x-6' : 'translate-x-1'}`}></div>
          </div>
        )
      case 'select':
      case 'input':
      case 'textarea':
        return <span className="text-gray-900 font-medium">{setting.value}</span>
      default:
        return <span className="text-gray-900">{setting.value}</span>
    }
  }

  const renderActionButtons = (setting: TeamSetting) => {
    if (editingId === setting.id) {
      return (
        <div className="flex space-x-2">
          <button
            onClick={() => handleSave(setting.id)}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-primary-600 hover:bg-primary-700"
          >
            <Save className="h-3 w-3 mr-1" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            <X className="h-3 w-3 mr-1" />
            Cancel
          </button>
        </div>
      )
    }
    return (
      <button
        onClick={() => handleEdit(setting)}
        className="text-primary-600 hover:text-primary-900 text-sm font-medium"
      >
        Edit
      </button>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Settings</h1>
        <p className="text-gray-600">Configure team preferences, notifications, and security settings</p>
      </div>

      {/* Category Navigation */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {activeCategory === 'All' ? 'All Settings' : `${activeCategory} Settings`}
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredSettings.map((setting) => (
            <div key={setting.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-900">{setting.name}</h3>
                    {setting.required && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{setting.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {renderSettingValue(setting)}
                    </div>
                    <div className="ml-4">
                      {renderActionButtons(setting)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Shield className="h-4 w-4 mr-2" />
          Security Audit
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Database className="h-4 w-4 mr-2" />
          Export Settings
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Key className="h-4 w-4 mr-2" />
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}

export default TeamSettingsPage
