import React from 'react'
import { Database, Users, Shield, Calendar, FileText } from 'lucide-react'

const DataProcessingPage = () => {
  const processingActivities = [
    {
      id: 'PA001',
      name: 'Employee HR Data Processing',
      purpose: 'Human Resources Management',
      dataTypes: ['Personal Identifiers', 'Employment Details', 'Financial Data'],
      legalBasis: 'Contract',
      dataSubjects: 'Employees',
      retention: '7 years post-employment',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'PA002',
      name: 'Customer Data Processing',
      purpose: 'Customer Relationship Management',
      dataTypes: ['Contact Information', 'Purchase History'],
      legalBasis: 'Legitimate Interest',
      dataSubjects: 'Customers',
      retention: '3 years post-relationship',
      lastUpdated: '2024-01-10'
    },
    {
      id: 'PA003',
      name: 'Marketing Communications',
      purpose: 'Direct Marketing',
      dataTypes: ['Contact Information', 'Preferences'],
      legalBasis: 'Consent',
      dataSubjects: 'Prospects & Customers',
      retention: 'Until consent withdrawn',
      lastUpdated: '2024-01-08'
    },
    {
      id: 'PA004',
      name: 'Security Monitoring',
      purpose: 'IT Security & Access Control',
      dataTypes: ['System Logs', 'Access Records'],
      legalBasis: 'Legitimate Interest',
      dataSubjects: 'All System Users',
      retention: '1 year',
      lastUpdated: '2024-01-05'
    }
  ]

  const getLegalBasisColor = (basis: string) => {
    switch (basis) {
      case 'Consent': return 'bg-green-100 text-green-800'
      case 'Contract': return 'bg-blue-100 text-blue-800'
      case 'Legitimate Interest': return 'bg-yellow-100 text-yellow-800'
      case 'Legal Obligation': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Processing Records</h1>
            <p className="text-gray-600">GDPR Article 30 - Records of Processing Activities</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <FileText className="w-4 h-4" />
            Export Records
          </button>
        </div>

        <div className="space-y-6">
          {processingActivities.map((activity) => (
            <div key={activity.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                    <p className="text-sm text-gray-600">ID: {activity.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLegalBasisColor(activity.legalBasis)}`}>
                  {activity.legalBasis}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Purpose</span>
                  </div>
                  <p className="text-sm text-gray-900">{activity.purpose}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Data Subjects</span>
                  </div>
                  <p className="text-sm text-gray-900">{activity.dataSubjects}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Retention Period</span>
                  </div>
                  <p className="text-sm text-gray-900">{activity.retention}</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700 block mb-2">Data Types Processed:</span>
                <div className="flex flex-wrap gap-2">
                  {activity.dataTypes.map((type, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date(activity.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DataProcessingPage
