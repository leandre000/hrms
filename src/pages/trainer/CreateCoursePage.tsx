import React, { useState } from 'react'
import { 
  Video, 
  FileText, 
  Target, 
  Clock, 
  Users, 
  Plus,
  Save,
  X,
  Upload,
  Link,
  BookOpen,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface CourseForm {
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedDuration: number
  maxEnrollments: number
  objectives: string[]
  prerequisites: string[]
  modules: CourseModule[]
  assessmentType: string
  certificate: boolean
  price: number
  status: 'draft' | 'active' | 'archived'
  tags: string[]
}

interface CourseModule {
  id: string
  title: string
  description: string
  type: 'video' | 'document' | 'quiz' | 'assignment' | 'interactive'
  duration: number
  content: string
  order: number
}

const CreateCoursePage = () => {
  const [form, setForm] = useState<CourseForm>({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    estimatedDuration: 0,
    maxEnrollments: 100,
    objectives: [''],
    prerequisites: [''],
    modules: [],
    assessmentType: 'quiz',
    certificate: false,
    price: 0,
    status: 'draft',
    tags: []
  })

  const [activeTab, setActiveTab] = useState('basic')
  const [newTag, setNewTag] = useState('')

  const categories = [
    'Technical Skills',
    'Soft Skills',
    'Leadership Development',
    'Sales Training',
    'Customer Service',
    'Compliance Training',
    'Product Training',
    'Safety Training'
  ]

  const assessmentTypes = [
    'Quiz',
    'Assignment',
    'Project',
    'Presentation',
    'Portfolio',
    'No Assessment'
  ]

  const moduleTypes = [
    { value: 'video', label: 'Video', icon: Video },
    { value: 'document', label: 'Document', icon: FileText },
    { value: 'quiz', label: 'Quiz', icon: CheckCircle },
    { value: 'assignment', label: 'Assignment', icon: BookOpen },
    { value: 'interactive', label: 'Interactive', icon: Target }
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

  const addModule = () => {
    const newModule: CourseModule = {
      id: Date.now().toString(),
      title: '',
      description: '',
      type: 'video',
      duration: 0,
      content: '',
      order: form.modules.length + 1
    }
    setForm(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }))
  }

  const removeModule = (moduleId: string) => {
    setForm(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module.id !== moduleId)
    }))
  }

  const updateModule = (moduleId: string, field: keyof CourseModule, value: any) => {
    setForm(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId ? { ...module, [field]: value } : module
      )
    }))
  }

  const moveModule = (moduleId: string, direction: 'up' | 'down') => {
    setForm(prev => {
      const modules = [...prev.modules]
      const currentIndex = modules.findIndex(m => m.id === moduleId)
      
      if (direction === 'up' && currentIndex > 0) {
        [modules[currentIndex], modules[currentIndex - 1]] = [modules[currentIndex - 1], modules[currentIndex]]
      } else if (direction === 'down' && currentIndex < modules.length - 1) {
        [modules[currentIndex], modules[currentIndex + 1]] = [modules[currentIndex + 1], modules[currentIndex]]
      }
      
      // Update order numbers
      modules.forEach((module, index) => {
        module.order = index + 1
      })
      
      return { ...prev, modules }
    })
  }

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Course created:', form)
    // Handle course creation logic here
  }

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: BookOpen },
    { id: 'content', name: 'Course Content', icon: Target },
    { id: 'modules', name: 'Modules & Lessons', icon: Video },
    { id: 'assessment', name: 'Assessment & Settings', icon: CheckCircle },
    { id: 'pricing', name: 'Pricing & Publishing', icon: Users }
  ]

  const getModuleTypeIcon = (type: string) => {
    const moduleType = moduleTypes.find(mt => mt.value === type)
    return moduleType ? moduleType.icon : Video
  }

  const getModuleTypeLabel = (type: string) => {
    const moduleType = moduleTypes.find(mt => mt.value === type)
    return moduleType ? moduleType.label : 'Unknown'
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Course</h1>
        <p className="text-gray-600">Design and configure a new online course for your learners</p>
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
                  Course Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter course title"
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
                  Difficulty Level *
                </label>
                <select
                  value={form.difficulty}
                  onChange={(e) => setForm(prev => ({ ...prev, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Duration (hours) *
                </label>
                <input
                  type="number"
                  value={form.estimatedDuration}
                  onChange={(e) => setForm(prev => ({ ...prev, estimatedDuration: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Enrollments
                </label>
                <input
                  type="number"
                  value={form.maxEnrollments}
                  onChange={(e) => setForm(prev => ({ ...prev, maxEnrollments: parseInt(e.target.value) }))}
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
                placeholder="Describe the course, its goals, and what participants will learn"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Add a tag and press Enter"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
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

        {/* Modules Tab */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Course Modules</h3>
              <button
                type="button"
                onClick={addModule}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Module
              </button>
            </div>

            {form.modules.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Video className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No modules yet</h3>
                <p className="mt-1 text-sm text-gray-500">Start building your course by adding the first module.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {form.modules.map((module, index) => (
                  <div key={module.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                          {module.order}
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">{module.title || `Module ${module.order}`}</h4>
                          <p className="text-sm text-gray-500">{getModuleTypeLabel(module.type)} • {module.duration} min</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => moveModule(module.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveModule(module.id, 'down')}
                          disabled={index === form.modules.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => removeModule(module.id)}
                          className="p-1 text-red-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter module title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Module Type</label>
                        <select
                          value={module.type}
                          onChange={(e) => updateModule(module.id, 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          {moduleTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                        <input
                          type="number"
                          value={module.duration}
                          onChange={(e) => updateModule(module.id, 'duration', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          min="0"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={module.description}
                          onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Describe what this module covers"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                          value={module.content}
                          onChange={(e) => updateModule(module.id, 'content', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Add content details, links, or instructions"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Assessment Tab */}
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
                id="certificate"
                checked={form.certificate}
                onChange={(e) => setForm(prev => ({ ...prev, certificate: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="certificate" className="ml-2 block text-sm text-gray-900">
                Issue certificate upon completion
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Status
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

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Set to 0 for free courses</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Course Preview</h3>
                  <div className="text-sm text-blue-700 space-y-2">
                    <p><strong>Total Duration:</strong> {form.estimatedDuration} hours</p>
                    <p><strong>Modules:</strong> {form.modules.length}</p>
                    <p><strong>Objectives:</strong> {form.objectives.filter(obj => obj.trim()).length}</p>
                    <p><strong>Assessment:</strong> {form.assessmentType}</p>
                    <p><strong>Certificate:</strong> {form.certificate ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
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
            
            {activeTab === 'pricing' && (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Create Course
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateCoursePage
