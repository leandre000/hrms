import React, { useState } from 'react'
import { FileText, Copy, Download, Plus, Eye, Edit, Star } from 'lucide-react'

const TemplatesPage = () => {
  const templates = [
    {
      id: 1,
      name: 'Employee Onboarding Checklist',
      category: 'HR',
      description: 'Comprehensive checklist for new employee onboarding process',
      downloads: 45,
      lastModified: '2024-01-15',
      rating: 4.8,
      type: 'Checklist'
    },
    {
      id: 2,
      name: 'Performance Review Template',
      category: 'Performance',
      description: 'Standard template for annual performance evaluations',
      downloads: 67,
      lastModified: '2024-01-10',
      rating: 4.6,
      type: 'Form'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Template Management</h1>
            <p className="text-gray-600">Manage document templates and forms</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{template.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{template.description}</p>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Category: {template.category}</span>
                <span>{template.downloads} downloads</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-3 rounded hover:bg-primary-700 transition-colors text-sm">
                  <Copy className="w-4 h-4" />
                  Use Template
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TemplatesPage
