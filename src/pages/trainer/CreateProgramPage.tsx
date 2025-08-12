import React, { useState } from 'react'
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Target, 
  FileText, 
  Video, 
  CheckSquare, 
  Award,
  Plus,
  Save,
  X
} from 'lucide-react'

interface ProgramForm {
  title: string
  description: string
  category: string
  duration: string
  maxParticipants: number
  objectives: string[]
  prerequisites: string[]
  materials: string[]
  assessmentType: string
  certification: boolean
  startDate: string
  endDate: string
  instructor: string
  location: string
  price: number
  status: 'draft' | 'active' | 'archived'
}

const CreateProgramPage = () => {
  const [form, setForm] = useState<ProgramForm>({
    title: '',
    description: '',
    category: '',
    duration: '',
    maxParticipants: 20,
    objectives: [''],
    prerequisites: [''],
    materials: [''],
    assessmentType: 'quiz',
    certification: false,
    startDate: '',
    endDate: '',
    instructor: '',
    location: '',
    price: 0,
    status: 'draft'
  })

  const [activeTab, setActiveTab] = useState('basic')

  const categories = [
    'Leadership Development',
    'Technical Skills',
    'Soft Skills',
    'Compliance Training',
    'Product Training',
    'Sales Training',
    'Customer Service',
    'Safety Training'
  ]

  const assessmentTypes = [
    'Quiz',
    'Practical Assignment',
    'Presentation',
    'Case Study',
    'Portfolio Review',
    'No Assessment'
  ]

  const addObjective = () => {
    setForm(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }))
  }

  const removeObjective = (index: number) => {
    setForm(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }))
  }

  const updateObjective = (index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }))
  }

  const addPrerequisite = () => {
    setForm(prev => ({
      ...prev,
      prerequisites: [...prev.prerequisites, '']
    }))
  }

  const removePrerequisite = (index: number) => {
    setForm(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index)
    }))
  }

  const updatePrerequisite = (index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.map((prereq, i) => i === index ? value : prereq)
    }))
  }

  const addMaterial = () => {
    setForm(prev => ({
      ...prev,
      materials: [...prev.materials, '']
    }))
  }

  const removeMaterial = (index: number) => {
    setForm(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }))
  }

  const updateMaterial = (index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      materials: prev.materials.map((mat, i) => i === index ? value : mat)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Program created:', form)
    // Handle program creation logic here
  }

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: BookOpen },
    { id: 'content', name: 'Content & Objectives', icon: Target },
    { id: 'schedule', name: 'Schedule & Location', icon: Calendar },
    { id: 'assessment', name: 'Assessment & Certification', icon: CheckSquare },
    { id: 'materials', name: 'Materials & Resources', icon: FileText }
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Training Program</h1>
        <p className="text-gray-600">Design and configure a new training program for your learners</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter program title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => setForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 2 weeks, 40 hours"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={form.maxParticipants}
                  onChange={(e) => setForm(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe the program, its goals, and what participants will learn"
                required
              />
            </div>
          </div>
        )}

        {/* Content & Objectives Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Objectives *
              </label>
              <div className="space-y-3">
                {form.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={`Objective ${index + 1}`}
                      required
                    />
                    {form.objectives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeObjective(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addObjective}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Objective
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prerequisites
              </label>
              <div className="space-y-3">
                {form.prerequisites.map((prereq, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={prereq}
                      onChange={(e) => updatePrerequisite(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={`Prerequisite ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removePrerequisite(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPrerequisite}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Prerequisite
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule & Location Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructor *
                </label>
                <input
                  type="text"
                  value={form.instructor}
                  onChange={(e) => setForm(prev => ({ ...prev, instructor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter instructor name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter location or 'Online'"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        )}

        {/* Assessment & Certification Tab */}
        {activeTab === 'assessment' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Type *
              </label>
              <select
                value={form.assessmentType}
                onChange={(e) => setForm(prev => ({ ...prev, assessmentType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                {assessmentTypes.map((type) => (
                  <option key={type} value={type.toLowerCase().replace(' ', '-')}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="certification"
                checked={form.certification}
                onChange={(e) => setForm(prev => ({ ...prev, certification: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="certification" className="ml-2 block text-sm text-gray-900">
                Issue certificate upon completion
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value as 'draft' | 'active' | 'archived' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        )}

        {/* Materials & Resources Tab */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Materials
              </label>
              <div className="space-y-3">
                {form.materials.map((material, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => updateMaterial(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={`Material ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMaterial}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Material
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">File Upload</h3>
              <p className="text-sm text-gray-600 mb-3">
                Upload program materials, presentations, and resources
              </p>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                Upload Files
              </button>
            </div>
          </div>
        )}

        {/* Navigation and Submit */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <div className="flex gap-3">
            {tabs.findIndex(tab => tab.id === activeTab) > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab(tabs[tabs.findIndex(tab => tab.id === activeTab) - 1].id)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {tabs.findIndex(tab => tab.id === activeTab) < tabs.length - 1 && (
              <button
                type="button"
                onClick={() => setActiveTab(tabs[tabs.findIndex(tab => tab.id === activeTab) + 1].id)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Next
              </button>
            )}
            
            {activeTab === 'materials' && (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Create Program
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProgramPage
