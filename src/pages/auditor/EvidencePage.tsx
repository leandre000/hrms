import React from 'react'
import { Archive, FileText, Download, Lock, Calendar, User } from 'lucide-react'

const EvidencePage = () => {
  const evidenceItems = [
    {
      id: 'EV2024001',
      title: 'Unauthorized Access Logs',
      category: 'Security Incident',
      collectedBy: 'Security Team',
      collectedDate: '2024-01-20T14:30:00',
      caseId: 'INV001',
      custodian: 'Lead Auditor',
      integrity: 'Verified',
      files: [
        { name: 'access_logs_20240120.txt', size: '2.4 MB', hash: 'sha256:1a2b3c...' },
        { name: 'user_activity_report.pdf', size: '890 KB', hash: 'sha256:4d5e6f...' }
      ]
    },
    {
      id: 'EV2024002',
      title: 'Financial Transaction Records',
      category: 'Financial Audit',
      collectedBy: 'Finance Auditor',
      collectedDate: '2024-01-18T09:15:00',
      caseId: 'INV002',
      custodian: 'Finance Manager',
      integrity: 'Verified',
      files: [
        { name: 'transactions_q4_2023.xlsx', size: '15.2 MB', hash: 'sha256:7g8h9i...' },
        { name: 'bank_statements.pdf', size: '3.1 MB', hash: 'sha256:0j1k2l...' }
      ]
    },
    {
      id: 'EV2024003',
      title: 'Employee Interview Recordings',
      category: 'HR Investigation',
      collectedBy: 'HR Team',
      collectedDate: '2024-01-15T11:00:00',
      caseId: 'INV003',
      custodian: 'HR Director',
      integrity: 'Verified',
      files: [
        { name: 'interview_transcript_001.pdf', size: '456 KB', hash: 'sha256:3m4n5o...' },
        { name: 'interview_audio_001.mp3', size: '24.5 MB', hash: 'sha256:6p7q8r...' }
      ]
    }
  ]

  const chainOfCustody = [
    {
      evidenceId: 'EV2024001',
      timestamp: '2024-01-20T14:30:00',
      action: 'Collected',
      custodian: 'John Smith (Security Team)',
      location: 'Server Room A',
      notes: 'Original logs extracted from security server'
    },
    {
      evidenceId: 'EV2024001',
      timestamp: '2024-01-20T15:45:00',
      action: 'Transferred',
      custodian: 'Sarah Wilson (Lead Auditor)',
      location: 'Evidence Storage',
      notes: 'Transferred for forensic analysis'
    },
    {
      evidenceId: 'EV2024001',
      timestamp: '2024-01-21T09:00:00',
      action: 'Analyzed',
      custodian: 'Mike Johnson (Forensic Analyst)',
      location: 'Forensics Lab',
      notes: 'Digital forensic analysis completed'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Security Incident': return 'bg-red-100 text-red-800'
      case 'Financial Audit': return 'bg-green-100 text-green-800'
      case 'HR Investigation': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Evidence Collection</h1>

        {/* Evidence Items */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Evidence Repository</h2>
          <div className="space-y-6">
            {evidenceItems.map((evidence) => (
              <div key={evidence.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Archive className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{evidence.title}</h3>
                      <p className="text-sm text-gray-600">Evidence ID: {evidence.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(evidence.category)}`}>
                      {evidence.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Lock className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600">{evidence.integrity}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <User className="w-3 h-3" />
                      Collected By
                    </div>
                    <div className="font-medium">{evidence.collectedBy}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <Calendar className="w-3 h-3" />
                      Collection Date
                    </div>
                    <div className="font-medium">{new Date(evidence.collectedDate).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Case ID</span>
                    <div className="font-medium text-blue-600">{evidence.caseId}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Current Custodian</span>
                    <div className="font-medium">{evidence.custodian}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Associated Files:</h4>
                  <div className="space-y-2">
                    {evidence.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            <div className="text-xs text-gray-500">Size: {file.size} • Hash: {file.hash}</div>
                          </div>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chain of Custody */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Chain of Custody</h2>
          <div className="space-y-4">
            {chainOfCustody.map((entry, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{entry.action}</h4>
                    <span className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Evidence ID:</span>
                      <div className="font-medium">{entry.evidenceId}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Custodian:</span>
                      <div className="font-medium">{entry.custodian}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <div className="font-medium">{entry.location}</div>
                    </div>
                  </div>
                  {entry.notes && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {entry.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EvidencePage
