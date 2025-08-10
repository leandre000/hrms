import React, { useState } from 'react'
import { Users, TrendingUp, Clock, CheckCircle, XCircle, ArrowRight, BarChart3, Filter, Eye, Plus } from 'lucide-react'

const PipelinePage = () => {
  const [selectedPosition, setSelectedPosition] = useState('all')
  const [timeRange, setTimeRange] = useState('month')

  const pipelineStages = [
    { id: 'applied', name: 'Applied', color: 'bg-blue-500' },
    { id: 'screening', name: 'HR Screening', color: 'bg-yellow-500' },
    { id: 'assessment', name: 'Assessment', color: 'bg-orange-500' },
    { id: 'interview', name: 'Interview', color: 'bg-purple-500' },
    { id: 'final', name: 'Final Review', color: 'bg-indigo-500' },
    { id: 'offer', name: 'Offer', color: 'bg-green-500' },
    { id: 'hired', name: 'Hired', color: 'bg-emerald-500' }
  ]

  const pipelineData = [
    {
      position: 'Senior Frontend Developer',
      totalCandidates: 45,
      stages: {
        applied: 45,
        screening: 32,
        assessment: 18,
        interview: 12,
        final: 6,
        offer: 3,
        hired: 1
      },
      conversionRates: {
        screening: 71,
        assessment: 56,
        interview: 67,
        final: 50,
        offer: 50,
        hired: 33
      }
    },
    {
      position: 'Marketing Manager',
      totalCandidates: 28,
      stages: {
        applied: 28,
        screening: 20,
        assessment: 15,
        interview: 8,
        final: 4,
        offer: 2,
        hired: 1
      },
      conversionRates: {
        screening: 71,
        assessment: 75,
        interview: 53,
        final: 50,
        offer: 50,
        hired: 50
      }
    },
    {
      position: 'Junior Developer',
      totalCandidates: 89,
      stages: {
        applied: 89,
        screening: 45,
        assessment: 28,
        interview: 15,
        final: 8,
        offer: 3,
        hired: 0
      },
      conversionRates: {
        screening: 51,
        assessment: 62,
        interview: 54,
        final: 53,
        offer: 38,
        hired: 0
      }
    }
  ]

  const candidates = [
    {
      id: 1,
      name: 'Alice Johnson',
      position: 'Senior Frontend Developer',
      currentStage: 'interview',
      appliedDate: '2024-01-20',
      daysInStage: 2,
      rating: 4.5,
      nextAction: 'Technical Interview - Jan 25',
      probability: 85
    },
    {
      id: 2,
      name: 'Robert Kim',
      position: 'Marketing Manager',
      currentStage: 'screening',
      appliedDate: '2024-01-18',
      daysInStage: 4,
      rating: 4.2,
      nextAction: 'HR Screening - Jan 24',
      probability: 75
    },
    {
      id: 3,
      name: 'Emma Davis',
      position: 'Junior Developer',
      currentStage: 'assessment',
      appliedDate: '2024-01-22',
      daysInStage: 1,
      rating: 3.8,
      nextAction: 'Coding Assessment - Jan 26',
      probability: 65
    },
    {
      id: 4,
      name: 'Carlos Rodriguez',
      position: 'HR Specialist',
      currentStage: 'hired',
      appliedDate: '2024-01-10',
      daysInStage: 0,
      rating: 4.7,
      nextAction: 'Onboarding - Feb 1',
      probability: 100
    }
  ]

  const getStageInfo = (stageId: string) => {
    return pipelineStages.find(stage => stage.id === stageId) || pipelineStages[0]
  }

  const positions = ['all', ...pipelineData.map(p => p.position)]
  const filteredData = selectedPosition === 'all' ? pipelineData : pipelineData.filter(p => p.position === selectedPosition)

  const totalStats = {
    totalCandidates: pipelineData.reduce((sum, p) => sum + p.totalCandidates, 0),
    averageConversion: Math.round(pipelineData.reduce((sum, p) => sum + (p.stages.hired / p.totalCandidates * 100), 0) / pipelineData.length),
    activePositions: pipelineData.length,
    hiredThisMonth: pipelineData.reduce((sum, p) => sum + p.stages.hired, 0)
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hiring Pipeline</h1>
            <p className="text-gray-600">Track candidates through the recruitment process</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Candidate
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalStats.totalCandidates}</div>
                <div className="text-sm text-gray-600">Total Candidates</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalStats.averageConversion}%</div>
                <div className="text-sm text-gray-600">Avg Conversion</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalStats.activePositions}</div>
                <div className="text-sm text-gray-600">Active Positions</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalStats.hiredThisMonth}</div>
                <div className="text-sm text-gray-600">Hired This Month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex gap-4">
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position === 'all' ? 'All Positions' : position}
                </option>
              ))}
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Overview</h2>
          
          {filteredData.map((positionData, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-900">{positionData.position}</h3>
                <span className="text-sm text-gray-600">{positionData.totalCandidates} total candidates</span>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {pipelineStages.map((stage, stageIndex) => (
                  <div key={stage.id} className="text-center">
                    <div className="text-xs font-medium text-gray-600 mb-2">{stage.name}</div>
                    <div className={`${stage.color} text-white p-4 rounded-lg mb-2`}>
                      <div className="text-2xl font-bold">{positionData.stages[stage.id as keyof typeof positionData.stages]}</div>
                    </div>
                    {stageIndex < pipelineStages.length - 1 && (
                      <div className="text-xs text-gray-500">
                        {positionData.conversionRates[pipelineStages[stageIndex + 1].id as keyof typeof positionData.conversionRates]}% →
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Flow visualization */}
              <div className="flex items-center justify-between mb-2">
                {pipelineStages.map((stage, stageIndex) => (
                  <React.Fragment key={stage.id}>
                    <div className="flex-1 text-center">
                      <div className={`h-2 ${stage.color} rounded-full mx-1`} 
                           style={{ 
                             width: `${(positionData.stages[stage.id as keyof typeof positionData.stages] / positionData.totalCandidates) * 100}%`,
                             minWidth: '10px'
                           }}
                      ></div>
                    </div>
                    {stageIndex < pipelineStages.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Active Candidates */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Active Candidates</h2>
            <p className="text-sm text-gray-600">Candidates currently in the pipeline</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Candidate</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Position</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Current Stage</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Days in Stage</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Rating</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Next Action</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Probability</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {candidates.map((candidate) => {
                  const stageInfo = getStageInfo(candidate.currentStage)
                  return (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-sm text-gray-500">Applied {new Date(candidate.appliedDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{candidate.position}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${stageInfo.color}`}>
                          {stageInfo.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${candidate.daysInStage > 7 ? 'text-red-600' : candidate.daysInStage > 3 ? 'text-yellow-600' : 'text-gray-900'}`}>
                          {candidate.daysInStage} days
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                className={`w-4 h-4 ${star <= candidate.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                ★
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-1">{candidate.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{candidate.nextAction}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${candidate.probability}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{candidate.probability}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Move Stage">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PipelinePage
