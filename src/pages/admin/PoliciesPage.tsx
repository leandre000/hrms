import React, { useState } from 'react'
import { Shield, FileText, Users, CheckCircle, AlertTriangle, Calendar, Plus, Eye, Edit } from 'lucide-react'

const AdminPoliciesPage = () => {
  const policies = [
    {
      id: 1,
      title: 'Remote Work Policy',
      category: 'Workplace',
      description: 'Guidelines for remote work arrangements and expectations',
      version: '2.1',
      effectiveDate: '2024-01-01',
      lastReview: '2024-01-15',
      nextReview: '2024-07-01',
      status: 'active',
      acknowledgedBy: 45,
      totalEmployees: 60,
      owner: 'HR Department'
    },
    {
      id: 2,
      title: 'Code of Conduct',
      category: 'Ethics',
      description: 'Professional behavior and ethical standards',
      version: '3.0',
      effectiveDate: '2024-01-01',
      lastReview: '2024-01-01',
      nextReview: '2025-01-01',
      status: 'active',
      acknowledgedBy: 58,
      totalEmployees: 60,
      owner: 'Legal Department'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Policy Administration</h1>
            <p className="text-gray-600">Manage company policies and employee acknowledgments</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Create Policy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{policies.length}</div>
                <div className="text-sm text-gray-600">Active Policies</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{Math.round((policies.reduce((sum, p) => sum + p.acknowledgedBy, 0) / policies.reduce((sum, p) => sum + p.totalEmployees, 0)) * 100)}%</div>
                <div className="text-sm text-gray-600">Compliance Rate</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Pending Reviews</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Due for Review</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {policies.map((policy) => (
            <div key={policy.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{policy.title}</h3>
                  <p className="text-gray-600">{policy.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span>Category: {policy.category}</span>
                    <span>Version: {policy.version}</span>
                    <span>Owner: {policy.owner}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Acknowledgment Rate</div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(policy.acknowledgedBy / policy.totalEmployees) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{policy.acknowledgedBy}/{policy.totalEmployees}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Effective Date</div>
                  <div className="font-medium text-gray-900">{new Date(policy.effectiveDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Next Review</div>
                  <div className="font-medium text-gray-900">{new Date(policy.nextReview).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPoliciesPage
