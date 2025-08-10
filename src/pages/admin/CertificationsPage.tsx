import React, { useState } from 'react'
import { Award, Calendar, AlertTriangle, CheckCircle, Users, Plus, Eye, Edit } from 'lucide-react'

const CertificationsPage = () => {
  const certifications = [
    {
      id: 1,
      name: 'Safety Training Certification',
      category: 'Safety',
      validPeriod: '1 year',
      totalEmployees: 45,
      certified: 42,
      expiring: 3,
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Data Protection Training',
      category: 'Compliance',
      validPeriod: '2 years',
      totalEmployees: 45,
      certified: 45,
      expiring: 0,
      lastUpdated: '2024-01-10'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Certification Tracking</h1>
            <p className="text-gray-600">Monitor employee certifications and compliance</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{certifications.reduce((sum, c) => sum + c.certified, 0)}</div>
                <div className="text-sm text-gray-600">Total Certified</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{certifications.reduce((sum, c) => sum + c.expiring, 0)}</div>
                <div className="text-sm text-gray-600">Expiring Soon</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{Math.round((certifications.reduce((sum, c) => sum + c.certified, 0) / certifications.reduce((sum, c) => sum + c.totalEmployees, 0)) * 100)}%</div>
                <div className="text-sm text-gray-600">Compliance Rate</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{certifications.length}</div>
                <div className="text-sm text-gray-600">Active Programs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span>Category: {cert.category}</span>
                    <span>Valid Period: {cert.validPeriod}</span>
                    <span>Last Updated: {new Date(cert.lastUpdated).toLocaleDateString()}</span>
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Certification Rate</div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(cert.certified / cert.totalEmployees) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{cert.certified}/{cert.totalEmployees}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Expiring Soon</div>
                  <div className="font-medium text-gray-900">{cert.expiring} employees</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Compliance</div>
                  <div className="font-medium text-gray-900">{Math.round((cert.certified / cert.totalEmployees) * 100)}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Actions</div>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CertificationsPage
