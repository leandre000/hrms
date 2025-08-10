import React, { useState } from 'react'
import { Shield, Heart, DollarSign, Calendar, Users, Plus } from 'lucide-react'

const BenefitsPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const benefitPlans = [
    {
      id: 'HEALTH001',
      name: 'Premium Health Plan',
      type: 'Health Insurance',
      provider: 'BlueCross BlueShield',
      employeeCost: 150,
      employerCost: 450,
      enrolled: 89,
      eligible: 142,
      coverage: 'Employee + Family'
    },
    {
      id: 'DENTAL001',
      name: 'Comprehensive Dental',
      type: 'Dental Insurance',
      provider: 'Delta Dental',
      employeeCost: 25,
      employerCost: 75,
      enrolled: 125,
      eligible: 142,
      coverage: 'Employee + Family'
    },
    {
      id: 'VISION001',
      name: 'Vision Care Plan',
      type: 'Vision Insurance',
      provider: 'VSP',
      employeeCost: 15,
      employerCost: 35,
      enrolled: 98,
      eligible: 142,
      coverage: 'Employee Only'
    },
    {
      id: 'RETIRE001',
      name: '401(k) Retirement Plan',
      type: 'Retirement',
      provider: 'Fidelity',
      employeeCost: 0,
      employerCost: 0,
      enrolled: 134,
      eligible: 142,
      coverage: 'Up to 6% match'
    }
  ]

  const enrollmentData = [
    { month: 'Jan', enrolled: 128 },
    { month: 'Feb', enrolled: 132 },
    { month: 'Mar', enrolled: 135 },
    { month: 'Apr', enrolled: 138 },
    { month: 'May', enrolled: 142 }
  ]

  const benefitsSummary = {
    totalCost: benefitPlans.reduce((sum, plan) => sum + (plan.employerCost * plan.enrolled), 0),
    totalEnrolled: benefitPlans.reduce((sum, plan) => sum + plan.enrolled, 0),
    enrollmentRate: (benefitPlans.reduce((sum, plan) => sum + plan.enrolled, 0) / (benefitPlans.length * 142)) * 100,
    monthlyIncrease: 8.5
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Health Insurance': return <Heart className="w-5 h-5 text-red-500" />
      case 'Dental Insurance': return <Shield className="w-5 h-5 text-blue-500" />
      case 'Vision Insurance': return <Shield className="w-5 h-5 text-green-500" />
      case 'Retirement': return <DollarSign className="w-5 h-5 text-purple-500" />
      default: return <Shield className="w-5 h-5 text-gray-500" />
    }
  }

  const getEnrollmentPercentage = (enrolled: number, eligible: number) => {
    return ((enrolled / eligible) * 100).toFixed(1)
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Benefits Administration</h1>
            <p className="text-gray-600">Manage employee benefits plans and enrollment</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Benefit Plan
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'plans' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Plans
            </button>
            <button
              onClick={() => setActiveTab('enrollment')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'enrollment' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Enrollment
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-primary-500" />
                  <h3 className="font-medium text-gray-900">Total Monthly Cost</h3>
                </div>
                <div className="text-2xl font-bold text-primary-600">
                  ${benefitsSummary.totalCost.toLocaleString()}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-gray-900">Total Enrolled</h3>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {benefitsSummary.totalEnrolled}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="font-medium text-gray-900">Enrollment Rate</h3>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {benefitsSummary.enrollmentRate.toFixed(1)}%
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <h3 className="font-medium text-gray-900">Monthly Growth</h3>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  +{benefitsSummary.monthlyIncrease}%
                </div>
              </div>
            </div>

            {/* Enrollment Trend */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Trend</h2>
              <div className="flex items-end justify-between h-32">
                {enrollmentData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-primary-500 rounded-t w-8"
                      style={{ height: `${(data.enrolled / 150) * 100}%` }}
                    ></div>
                    <div className="text-sm text-gray-600 mt-2">{data.month}</div>
                    <div className="text-xs font-medium">{data.enrolled}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-4">
            {benefitPlans.map((plan) => (
              <div key={plan.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(plan.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600">{plan.type} • {plan.provider}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600">
                      {getEnrollmentPercentage(plan.enrolled, plan.eligible)}%
                    </div>
                    <div className="text-sm text-gray-600">Enrollment Rate</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-gray-600 text-sm">Employee Cost:</span>
                    <div className="font-medium">${plan.employeeCost}/month</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Employer Cost:</span>
                    <div className="font-medium">${plan.employerCost}/month</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Enrolled:</span>
                    <div className="font-medium">{plan.enrolled} of {plan.eligible}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Coverage:</span>
                    <div className="font-medium">{plan.coverage}</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-primary-500"
                    style={{ width: `${getEnrollmentPercentage(plan.enrolled, plan.eligible)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'enrollment' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Management</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Open Enrollment Period</h3>
                <p className="text-blue-800 text-sm">
                  The annual open enrollment period runs from November 1-30. 
                  Employees can make changes to their benefit selections during this time.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Enrollment Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      Process New Enrollments
                    </button>
                    <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      Handle Plan Changes
                    </button>
                    <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      Manage Qualifying Events
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Pending Actions</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm">New enrollments</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">5</span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm">Plan changes</span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">3</span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm">Cancellations</span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BenefitsPage
