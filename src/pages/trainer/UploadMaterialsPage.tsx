import React, { useState } from 'react'
import {
  Upload,
  FileText,
  Video,
  Image,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Eye,
  Download,
  Trash2
} from 'lucide-react'

interface UploadItem {
  id: string
  fileName: string
  fileSize: string
  fileType: string
  uploadProgress: number
  status: 'Uploading' | 'Completed' | 'Failed' | 'Processing'
  uploadDate: string
  category: string
  tags: string[]
  description: string
  isPublic: boolean
}

interface UploadStats {
  totalUploads: number
  successfulUploads: number
  failedUploads: number
  totalSize: string
}

const mockUploads: UploadItem[] = [
  {
    id: '1',
    fileName: 'project_management_guide.pdf',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    uploadProgress: 100,
    status: 'Completed',
    uploadDate: '2024-12-20 10:30 AM',
    category: 'Project Management',
    tags: ['Guide', 'PDF', 'Project Management'],
    description: 'Comprehensive guide to project management methodologies',
    isPublic: true
  },
  {
    id: '2',
    fileName: 'agile_sprint_video.mp4',
    fileSize: '45.2 MB',
    fileType: 'MP4',
    uploadProgress: 75,
    status: 'Uploading',
    uploadDate: '2024-12-20 10:25 AM',
    category: 'Agile Development',
    tags: ['Video', 'Agile', 'Sprint Planning'],
    description: 'Video tutorial on Agile sprint planning',
    isPublic: false
  },
  {
    id: '3',
    fileName: 'data_analysis_template.xlsx',
    fileSize: '1.8 MB',
    fileType: 'Excel',
    uploadProgress: 100,
    status: 'Completed',
    uploadDate: '2024-12-20 10:20 AM',
    category: 'Data Analysis',
    tags: ['Template', 'Excel', 'Data Analysis'],
    description: 'Excel template for data analysis projects',
    isPublic: true
  }
]

const UploadMaterialsPage: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>(mockUploads)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const stats: UploadStats = {
    totalUploads: uploads.length,
    successfulUploads: uploads.filter(upload => upload.status === 'Completed').length,
    failedUploads: uploads.filter(upload => upload.status === 'Failed').length,
    totalSize: uploads.reduce((total, upload) => {
      const size = parseFloat(upload.fileSize.split(' ')[0])
      return total + size
    }, 0).toFixed(1) + ' MB'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Uploading': return 'bg-blue-100 text-blue-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      case 'Processing': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Uploading': return <Clock className="w-4 h-4" />
      case 'Completed': return <CheckCircle className="w-4 h-4" />
      case 'Failed': return <AlertCircle className="w-4 h-4" />
      case 'Processing': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-600" />
      case 'mp4': case 'avi': case 'mov': return <Video className="w-5 h-5 text-blue-600" />
      case 'jpg': case 'png': case 'gif': return <Image className="w-5 h-5 text-green-600" />
      case 'xlsx': case 'xls': return <FileText className="w-5 h-5 text-green-600" />
      case 'docx': case 'doc': return <FileText className="w-5 h-5 text-blue-600" />
      default: return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setSelectedFiles(prev => [...prev, ...files])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Materials</h1>
          <p className="text-gray-600">Upload and manage training materials and resources</p>
        </div>
        <button 
          onClick={() => setShowUploadForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Upload
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Uploads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUploads}</p>
            </div>
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-green-600">{stats.successfulUploads}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{stats.failedUploads}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalSize}</p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Materials</h3>
        
        {/* Drag & Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drag and drop files here, or click to select
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Support for PDF, Word, Excel, PowerPoint, images, and video files
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Choose Files
          </label>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Selected Files ({selectedFiles.length})</h4>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getFileTypeIcon(file.name.split('.').pop() || '')}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Files
              </button>
              <button 
                onClick={() => setSelectedFiles([])}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Uploads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category & Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uploads.map((upload) => (
                <tr key={upload.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getFileTypeIcon(upload.fileType)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{upload.fileName}</div>
                        <div className="text-sm text-gray-500">{upload.fileSize}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-900">{upload.category}</div>
                      <div className="flex flex-wrap gap-1">
                        {upload.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {tag}
                          </span>
                        ))}
                        {upload.tags.length > 2 && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            +{upload.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="text-gray-500">{upload.uploadDate}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {upload.isPublic ? 'Public' : 'Private'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(upload.status)}`}>
                        {getStatusIcon(upload.status)}
                        <span className="ml-1">{upload.status}</span>
                      </span>
                      {upload.status === 'Uploading' && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${upload.uploadProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => removeUpload(upload.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Guidelines */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Supported File Types</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Documents: PDF, Word (.doc, .docx), Excel (.xls, .xlsx)</li>
              <li>• Presentations: PowerPoint (.ppt, .pptx)</li>
              <li>• Images: JPG, PNG, GIF (max 10MB)</li>
              <li>• Videos: MP4, AVI, MOV (max 100MB)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Best Practices</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use descriptive file names</li>
              <li>• Add relevant tags and categories</li>
              <li>• Include clear descriptions</li>
              <li>• Set appropriate privacy settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadMaterialsPage
