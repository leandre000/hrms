import React from 'react'
import { PenTool, CheckCircle, XCircle, AlertTriangle, User, Calendar } from 'lucide-react'

const DigitalSignaturesPage = () => {
  const signatures = [
    {
      id: 1,
      document: 'Employment Contract - Sarah Wilson',
      signer: 'sarah.wilson@company.com',
      signedDate: '2024-01-20',
      certificateStatus: 'Valid',
      signatureValid: true,
      issuer: 'DocuSign CA',
      expiryDate: '2025-01-20'
    },
    {
      id: 2,
      document: 'NDA Agreement - John Doe',
      signer: 'john.doe@company.com',
      signedDate: '2024-01-18',
      certificateStatus: 'Valid',
      signatureValid: true,
      issuer: 'Adobe Sign CA',
      expiryDate: '2025-01-18'
    },
    {
      id: 3,
      document: 'Policy Acknowledgment - Mike Johnson',
      signer: 'mike.johnson@company.com',
      signedDate: '2024-01-15',
      certificateStatus: 'Expired',
      signatureValid: false,
      issuer: 'GlobalSign CA',
      expiryDate: '2024-01-10'
    },
    {
      id: 4,
      document: 'Financial Report Q4 - Finance Team',
      signer: 'finance.manager@company.com',
      signedDate: '2024-01-12',
      certificateStatus: 'Revoked',
      signatureValid: false,
      issuer: 'VeriSign CA',
      expiryDate: '2024-12-31'
    }
  ]

  const getValidityIcon = (isValid: boolean) => {
    return isValid ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <XCircle className="w-4 h-4 text-red-500" />
  }

  const getValidityColor = (isValid: boolean) => {
    return isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getCertificateStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-800'
      case 'Expired': return 'bg-orange-100 text-orange-800'
      case 'Revoked': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Digital Signatures</h1>
        <div className="space-y-4">
          {signatures.map((sig) => (
            <div key={sig.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <PenTool className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{sig.document}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-3 h-3" />
                      {sig.signer}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getValidityIcon(sig.signatureValid)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getValidityColor(sig.signatureValid)}`}>
                    {sig.signatureValid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-gray-600 mb-1">
                    <Calendar className="w-3 h-3" />
                    Signed Date
                  </div>
                  <div className="font-medium">{new Date(sig.signedDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Certificate Authority</span>
                  <div className="font-medium">{sig.issuer}</div>
                </div>
                <div>
                  <span className="text-gray-600">Certificate Status</span>
                  <div className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCertificateStatusColor(sig.certificateStatus)}`}>
                      {sig.certificateStatus}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Certificate Expiry</span>
                  <div className="font-medium">{new Date(sig.expiryDate).toLocaleDateString()}</div>
                </div>
              </div>

              {!sig.signatureValid && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="text-sm text-red-800 font-medium">⚠️ Signature Verification Failed</div>
                  <div className="text-sm text-red-700 mt-1">
                    {sig.certificateStatus === 'Expired' && 'Certificate has expired.'}
                    {sig.certificateStatus === 'Revoked' && 'Certificate has been revoked.'}
                    {' '}Document integrity may be compromised.
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DigitalSignaturesPage
