import React from 'react'
import { Search, Database, FileText, Hash, Calendar, Shield } from 'lucide-react'

const ForensicAnalysisPage = () => {
  const forensicCases = [
    {
      id: 'FA001',
      title: 'System Intrusion Analysis',
      type: 'Security Breach',
      status: 'In Progress',
      startDate: '2024-01-20',
      analyst: 'Digital Forensics Team',
      artifacts: [
        { type: 'System Logs', count: 1250, analyzed: 980 },
        { type: 'Network Traffic', count: 45, analyzed: 45 },
        { type: 'File Hashes', count: 230, analyzed: 180 }
      ],
      findings: [
        'Unusual login patterns detected',
        'Unauthorized file access recorded',
        'Network anomalies identified'
      ]
    },
    {
      id: 'FA002',
      title: 'Data Exfiltration Investigation',
      type: 'Data Loss',
      status: 'Completed',
      startDate: '2024-01-15',
      analyst: 'Security Analyst',
      artifacts: [
        { type: 'Email Logs', count: 890, analyzed: 890 },
        { type: 'File Access Logs', count: 340, analyzed: 340 },
        { type: 'USB Activity', count: 12, analyzed: 12 }
      ],
      findings: [
        'No evidence of data exfiltration',
        'All file transfers were authorized',
        'Security protocols followed correctly'
      ]
    }
  ]

  const digitalEvidence = [
    {
      id: 'EV001',
      name: 'Security_Logs_20240120.zip',
      type: 'Log Files',
      size: '145 MB',
      hash: 'sha256:a1b2c3d4e5f6...',
      collected: '2024-01-20T10:30:00',
      chain: 'Verified',
      status: 'Analyzed'
    },
    {
      id: 'EV002',
      name: 'Database_Backup_Suspicious.sql',
      type: 'Database',
      size: '2.3 GB',
      hash: 'sha256:f6e5d4c3b2a1...',
      collected: '2024-01-19T16:45:00',
      chain: 'Verified',
      status: 'Processing'
    },
    {
      id: 'EV003',
      name: 'Network_Capture_Incident.pcap',
      type: 'Network Traffic',
      size: '890 MB',
      hash: 'sha256:1a2b3c4d5e6f...',
      collected: '2024-01-21T08:15:00',
      chain: 'Verified',
      status: 'Queued'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Analyzed': return 'bg-green-100 text-green-800'
      case 'Processing': return 'bg-yellow-100 text-yellow-800'
      case 'Queued': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Log Files': return <Database className="w-4 h-4 text-blue-500" />
      case 'Database': return <Database className="w-4 h-4 text-green-500" />
      case 'Network Traffic': return <Shield className="w-4 h-4 text-purple-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Forensic Analysis</h1>

        {/* Active Cases */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Forensic Cases</h2>
          <div className="space-y-6">
            {forensicCases.map((case_) => (
              <div key={case_.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{case_.title}</h3>
                      <p className="text-sm text-gray-600">Case ID: {case_.id} • {case_.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                    {case_.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {case_.artifacts.map((artifact, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-1">{artifact.type}</h4>
                      <div className="text-sm text-gray-600">
                        {artifact.analyzed}/{artifact.count} analyzed
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div 
                          className="h-1 rounded-full bg-blue-500"
                          style={{ width: `${(artifact.analyzed / artifact.count) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Findings:</h4>
                  <ul className="space-y-1">
                    {case_.findings.map((finding, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Started: {new Date(case_.startDate).toLocaleDateString()}
                  </div>
                  <div>Analyst: {case_.analyst}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Evidence */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Digital Evidence Chain</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Evidence</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Hash</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Collected</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {digitalEvidence.map((evidence) => (
                  <tr key={evidence.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(evidence.type)}
                        <div>
                          <div className="font-medium text-gray-900">{evidence.name}</div>
                          <div className="text-xs text-gray-500">ID: {evidence.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-900">{evidence.type}</td>
                    <td className="px-4 py-3 text-gray-900">{evidence.size}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Hash className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 font-mono">{evidence.hash}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-900">{new Date(evidence.collected).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(evidence.status)}`}>
                        {evidence.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForensicAnalysisPage
