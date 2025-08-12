import React, { useState } from 'react'
import { FolderOpen, Users, Calendar, Target, TrendingUp, Plus, Filter, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  startDate: string
  endDate: string
  progress: number
  teamMembers: string[]
  budget: number
  spent: number
  manager: string
  client: string
  category: string
}

const TeamProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')
  const [filterCategory, setFilterCategory] = useState('All')

  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Platform Redesign',
      description: 'Complete redesign of the company e-commerce platform with modern UI/UX and improved performance',
      status: 'active',
      priority: 'high',
      startDate: '2024-10-01',
      endDate: '2025-02-28',
      progress: 65,
      teamMembers: ['Sarah Chen', 'Mike Johnson', 'Emily Davis'],
      budget: 50000,
      spent: 32500,
      manager: 'Mike Smith',
      client: 'Internal',
      category: 'Web Development'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Development of a new mobile application for iOS and Android platforms',
      status: 'planning',
      priority: 'medium',
      startDate: '2025-01-15',
      endDate: '2025-06-30',
      progress: 15,
      teamMembers: ['Alex Rodriguez', 'Emily Davis'],
      budget: 75000,
      spent: 11250,
      manager: 'Mike Smith',
      client: 'TechCorp Inc.',
      category: 'Mobile Development'
    },
    {
      id: '3',
      name: 'Data Analytics Dashboard',
      description: 'Creation of comprehensive data analytics dashboard for business intelligence',
      status: 'active',
      priority: 'high',
      startDate: '2024-11-01',
      endDate: '2025-01-31',
      progress: 80,
      teamMembers: ['Sarah Chen', 'Alex Rodriguez'],
      budget: 30000,
      spent: 24000,
      manager: 'Mike Smith',
      client: 'Internal',
      category: 'Data Analytics'
    },
    {
      id: '4',
      name: 'API Integration Project',
      description: 'Integration of third-party APIs for payment processing and shipping',
      status: 'on-hold',
      priority: 'medium',
      startDate: '2024-09-15',
      endDate: '2024-12-31',
      progress: 45,
      teamMembers: ['Mike Johnson', 'Alex Rodriguez'],
      budget: 25000,
      spent: 11250,
      manager: 'Mike Smith',
      client: 'E-commerce Partners',
      category: 'Backend Development'
    },
    {
      id: '5',
      name: 'Security Audit Implementation',
      description: 'Implementation of security audit recommendations and vulnerability fixes',
      status: 'completed',
      priority: 'critical',
      startDate: '2024-08-01',
      endDate: '2024-10-31',
      progress: 100,
      teamMembers: ['Sarah Chen', 'Alex Rodriguez'],
      budget: 40000,
      spent: 40000,
      manager: 'Mike Smith',
      client: 'Internal',
      category: 'Security'
    }
  ]

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || project.status === filterStatus
    const matchesPriority = filterPriority === 'All' || project.priority === filterPriority
    const matchesCategory = filterCategory === 'All' || project.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'on-hold': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    if (percentage <= 80) return 'text-green-600'
    if (percentage <= 100) return 'text-yellow-600'
    return 'text-red-600'
  }

  const categories = ['All', ...Array.from(new Set(mockProjects.map(p => p.category)))]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Projects</h1>
        <p className="text-gray-600">Manage and monitor all team projects, timelines, and resource allocation</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FolderOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{mockProjects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockProjects.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {Array.from(new Set(mockProjects.flatMap(p => p.teamMembers))).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(mockProjects.reduce((acc, p) => acc + p.progress, 0) / mockProjects.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Status</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span>{project.teamMembers.length} team members</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Target className="h-4 w-4 mr-2 text-gray-400" />
                <span>Budget: ${project.budget.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span className={getBudgetStatus(project.spent, project.budget)}>
                  Spent: ${project.spent.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Team Members */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Team Members:</h4>
              <div className="flex flex-wrap gap-1">
                {project.teamMembers.map((member, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                <span>Client: {project.client}</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                  View Details
                </button>
                <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Plus className="h-4 w-4 mr-2" />
          Create New Project
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <FolderOpen className="h-4 w-4 mr-2" />
          Export Projects
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <TrendingUp className="h-4 w-4 mr-2" />
          Project Analytics
        </button>
      </div>
    </div>
  )
}

export default TeamProjectsPage
