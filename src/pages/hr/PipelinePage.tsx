import React from 'react'
import { Users, ArrowRight, Clock, CheckCircle } from 'lucide-react'

const PipelinePage = () => {
  const pipelineStages = [
    { name: 'Applied', count: 45, color: 'bg-gray-500' },
    { name: 'Screening', count: 32, color: 'bg-blue-500' },
    { name: 'Phone Interview', count: 18, color: 'bg-yellow-500' },
    { name: 'Technical Interview', count: 12, color: 'bg-orange-500' },
    { name: 'Final Interview', count: 8, color: 'bg-purple-500' },
    { name: 'Offer', count: 3, color: 'bg-green-500' },
    { name: 'Hired', count: 2, color: 'bg-green-600' }
  ]

  const candidates = [
    {
      name: 'Alex Thompson',
      position: 'Senior Frontend Developer',
      stage: 'Technical Interview',
      daysInStage: 3,
      score: 8.5,
      interviewer: 'Sarah Wilson'
    },
    {
      name: 'Sarah Johnson',
      position: 'Marketing Specialist',
      stage: 'Phone Interview',
      daysInStage: 1,
      score: 7.2,
      interviewer: 'Mike Johnson'
    },
    {
      name: 'Michael Chen',
      position: 'Product Manager',
      stage: 'Offer',
      daysInStage: 2,
      score: 9.1,
      interviewer: 'Lisa Rodriguez'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Hiring Pipeline</h1>
        
        {/* Pipeline Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold mb-4">Pipeline Overview</h2>
          <div className="flex items-center justify-between mb-4">
            {pipelineStages.map((stage, index) => (
              <div key={stage.name} className="flex items-center">
                <div className="text-center">
                  <div className={`w-16 h-16 ${stage.color} rounded-full flex items-center justify-center text-white font-bold mb-2`}>
                    {stage.count}
                  </div>
                  <div className="text-sm font-medium">{stage.name}</div>
                </div>
                {index < pipelineStages.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Candidates */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Active Candidates</h2>
          <div className="space-y-4">
            {candidates.map((candidate, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-medium">{candidate.stage}</div>
                    <div className="text-sm text-gray-600">{candidate.daysInStage} days</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{candidate.score}/10</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{candidate.interviewer}</div>
                    <div className="text-sm text-gray-600">Interviewer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PipelinePage
