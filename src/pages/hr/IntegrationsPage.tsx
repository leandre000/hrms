import { useState } from 'react'
import {
  Link,
  Plus,
  Search,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  MoreVertical,
  Shield,
  Zap,
  Users,
  Mail,
  CreditCard,
  BarChart3} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  category: 'hr' | 'payroll' | 'communication' | 'analytics' | 'security' | 'productivity'
  provider: string
  status: 'active' | 'inactive' | 'error' | 'pending' | 'disconnected'
  lastSync: string
  syncFrequency: string
  apiKey?: string
  webhookUrl?: string
  features: string[]
  pricing: 'free' | 'basic' | 'premium' | 'enterprise'
  version: string
  lastUpdated: string
  health: 'excellent' | 'good' | 'warning' | 'critical'
  dataFlow: 'inbound' | 'outbound' | 'bidirectional'
}

interface IntegrationCategory {
  id: string
  name: string
  description: string
  icon: any
  color: string
}

const IntegrationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')
  const [showNewIntegration, setShowNewIntegration] = useState(false)

  // Mock data
  const integrations: Integration[] = [
    {
      id: '1',
      name: 'Slack',
      description: 'Team communication and collaboration platform',
      category: 'communication',
      provider: 'Slack Technologies',
      status: 'active',
      lastSync: '2 minutes ago',
      syncFrequency: 'Real-time',
      apiKey: 'sk_1234567890abcdef',
      webhookUrl: 'https://hooks.slack.com/services/...',
      features: ['Team Chat', 'File Sharing', 'Video Calls', 'Integrations'],
      pricing: 'premium',
      version: '2.1.0',
      lastUpdated: '2024-01-20',
      health: 'excellent',
      dataFlow: 'bidirectional'
    },
    {
      id: '2',
      name: 'BambooHR',
      description: 'Human resources information system',
      category: 'hr',
      provider: 'BambooHR LLC',
      status: 'active',
      lastSync: '5 minutes ago',
      syncFrequency: 'Every 15 minutes',
      apiKey: 'bhr_9876543210fedcba',
      features: ['Employee Records', 'Time Tracking', 'Performance Management', 'Recruitment'],
      pricing: 'enterprise',
      version: '3.5.2',
      lastUpdated: '2024-01-19',
      health: 'good',
      dataFlow: 'bidirectional'
    },
    {
      id: '3',
      name: 'QuickBooks',
      description: 'Accounting and payroll management',
      category: 'payroll',
      provider: 'Intuit Inc.',
      status: 'active',
      lastSync: '1 hour ago',
      syncFrequency: 'Daily',
      apiKey: 'qb_abcdef1234567890',
      features: ['Payroll Processing', 'Tax Filing', 'Financial Reporting', 'Expense Tracking'],
      pricing: 'premium',
      version: '2024.1',
      lastUpdated: '2024-01-18',
      health: 'good',
      dataFlow: 'outbound'
    },
    {
      id: '4',
      name: 'Google Workspace',
      description: 'Productivity and collaboration suite',
      category: 'productivity',
      provider: 'Google LLC',
      status: 'active',
      lastSync: '30 minutes ago',
      syncFrequency: 'Every hour',
      apiKey: 'gws_1234567890abcdef',
      features: ['Email', 'Calendar', 'Drive', 'Meet', 'Docs'],
      pricing: 'enterprise',
      version: 'Latest',
      lastUpdated: '2024-01-20',
      health: 'excellent',
      dataFlow: 'bidirectional'
    },
    {
      id: '5',
      name: 'Tableau',
      description: 'Business intelligence and analytics',
      category: 'analytics',
      provider: 'Salesforce Inc.',
      status: 'error',
      lastSync: '2 hours ago',
      syncFrequency: 'Daily',
      apiKey: 'tbl_9876543210fedcba',
      features: ['Data Visualization', 'Reporting', 'Dashboard Creation', 'Data Analysis'],
      pricing: 'enterprise',
      version: '2023.4',
      lastUpdated: '2024-01-17',
      health: 'critical',
      dataFlow: 'inbound'
    },
    {
      id: '6',
      name: 'Okta',
      description: 'Identity and access management',
      category: 'security',
      provider: 'Okta Inc.',
      status: 'active',
      lastSync: '10 minutes ago',
      syncFrequency: 'Real-time',
      apiKey: 'okt_abcdef1234567890',
      features: ['Single Sign-On', 'Multi-Factor Authentication', 'User Provisioning', 'Security Monitoring'],
      pricing: 'enterprise',
      version: '2023.12',
      lastUpdated: '2024-01-20',
      health: 'excellent',
      dataFlow: 'bidirectional'
    }
  ]

  const integrationCategories: IntegrationCategory[] = [
    { id: 'hr', name: 'HR Systems', description: 'Human resources and employee management', icon: Users, color: 'bg-blue-500' },
    { id: 'payroll', name: 'Payroll', description: 'Payroll processing and financial management', icon: CreditCard, color: 'bg-green-500' },
    { id: 'communication', name: 'Communication', description: 'Team collaboration and messaging', icon: Mail, color: 'bg-purple-500' },
    { id: 'analytics', name: 'Analytics', description: 'Business intelligence and reporting', icon: BarChart3, color: 'bg-orange-500' },
    { id: 'security', name: 'Security', description: 'Identity and access management', icon: Shield, color: 'bg-red-500' },
    { id: 'productivity', name: 'Productivity', description: 'Office and collaboration tools', icon: Zap, color: 'bg-indigo-500' }
  ]

  const integrationMetrics = {
    totalIntegrations: 24,
    activeIntegrations: 20,
    errorIntegrations: 2,
    pendingIntegrations: 2,
    lastSyncSuccess: 95.8,
    averageHealth: 'good'
  }

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || integration.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'disconnected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    const categoryInfo = integrationCategories.find(cat => cat.id === category)
    if (categoryInfo) {
      const Icon = categoryInfo.icon
      return <Icon className="w-5 h-5" />
    }
    return <Link className="w-5 h-5" />
  }

  const getCategoryColor = (category: string) => {
    const categoryInfo = integrationCategories.find(cat => cat.id === category)
    return categoryInfo?.color || 'bg-gray-500'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Manage third-party service connections and API integrations</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <RefreshCw size={20} />
            Sync All
          </button>
          <button 
            onClick={() => setShowNewIntegration(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            New Integration
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Link className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Integrations</p>
              <p className="text-2xl font-bold text-gray-900">{integrationMetrics.totalIntegrations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{integrationMetrics.activeIntegrations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-gray-900">{integrationMetrics.errorIntegrations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sync Success</p>
              <p className="text-2xl font-bold text-gray-900">{integrationMetrics.lastSyncSuccess}%</p>
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
                placeholder="Search integrations..."
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
              {integrationCategories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="error">Error</option>
              <option value="pending">Pending</option>
              <option value="disconnected">Disconnected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'integrations', 'api', 'webhooks'].map((tab) => (
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Health</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Excellent</span>
                      <span className="font-semibold text-green-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Good</span>
                      <span className="font-semibold text-blue-600">6</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Warning</span>
                      <span className="font-semibold text-yellow-600">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Critical</span>
                      <span className="font-semibold text-red-600">1</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
                  <div className="space-y-4">
                    {integrationCategories.map((category) => {
                      const count = integrations.filter(i => i.category === category.id).length
                      return (
                        <div key={category.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                            <span className="text-gray-600">{category.name}</span>
                          </div>
                          <span className="font-semibold">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Slack integration synced successfully</p>
                        <p className="text-sm text-gray-600">2 minutes ago</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">Real-time</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Tableau integration failed to sync</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">Daily</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">BambooHR integration updated</p>
                        <p className="text-sm text-gray-600">1 day ago</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">Every 15 min</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations.map((integration) => (
                  <div key={integration.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(integration.category)}`}>
                          {getCategoryIcon(integration.category)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                          <p className="text-sm text-gray-600">{integration.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                          {integration.status}
                        </span>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Version:</span>
                        <span className="font-medium">{integration.version}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Sync:</span>
                        <span className="font-medium">{integration.lastSync}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Health:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getHealthColor(integration.health)}`}>
                          {integration.health}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            {feature}
                          </span>
                        ))}
                        {integration.features.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            +{integration.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>Pricing: {integration.pricing}</span>
                      <span>Data: {integration.dataFlow}</span>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                        Configure
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Tab */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">API Keys</h4>
                    <div className="space-y-3">
                      {integrations.filter(i => i.apiKey).map((integration) => (
                        <div key={integration.id} className="p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{integration.name}</span>
                            <button className="text-primary-600 hover:text-primary-800 text-sm">
                              Regenerate
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="password"
                              value={integration.apiKey}
                              readOnly
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50"
                            />
                            <button className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                              Copy
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Rate Limits</h4>
                    <div className="space-y-3">
                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">Slack API</span>
                          <span className="text-sm text-gray-600">1000 req/min</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>

                      <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">BambooHR API</span>
                          <span className="text-sm text-gray-600">100 req/min</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Webhooks Tab */}
          {activeTab === 'webhooks' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhook Endpoints</h3>
                <div className="space-y-4">
                  {integrations.filter(i => i.webhookUrl).map((integration) => (
                    <div key={integration.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{integration.name}</h4>
                          <p className="text-sm text-gray-600">Webhook URL for {integration.name} integration</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                            {integration.status}
                          </span>
                          <button className="text-primary-600 hover:text-primary-800 text-sm">
                            Test
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={integration.webhookUrl}
                          readOnly
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50"
                        />
                        <button className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                          Copy
                        </button>
                        <button className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhook Logs</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Slack webhook received</p>
                        <p className="text-sm text-gray-600">User joined channel notification</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 minutes ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">BambooHR webhook sent</p>
                        <p className="text-sm text-gray-600">Employee data update</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">15 minutes ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Tableau webhook failed</p>
                        <p className="text-sm text-gray-600">Authentication error</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IntegrationsPage
