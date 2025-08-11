import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Users, Building, ChevronDown, ChevronRight } from 'lucide-react'

interface HierarchyNode {
  id: string
  name: string
  title: string
  department: string
  level: number
  parentId: string | null
  children: string[]
  employeeCount: number
  status: 'active' | 'inactive'
}

const initialHierarchy: HierarchyNode[] = [
  {
    id: '1',
    name: 'John Smith',
    title: 'CEO',
    department: 'Executive',
    level: 1,
    parentId: null,
    children: ['2', '3', '4'],
    employeeCount: 150,
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    title: 'CTO',
    department: 'Technology',
    level: 2,
    parentId: '1',
    children: ['5', '6'],
    employeeCount: 45,
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Brown',
    title: 'CFO',
    department: 'Finance',
    level: 2,
    parentId: '1',
    children: ['7', '8'],
    employeeCount: 35,
    status: 'active'
  },
  {
    id: '4',
    name: 'Lisa Rodriguez',
    title: 'CHRO',
    department: 'Human Resources',
    level: 2,
    parentId: '1',
    children: ['9', '10'],
    employeeCount: 25,
    status: 'active'
  },
  {
    id: '5',
    name: 'Alex Chen',
    title: 'Engineering Manager',
    department: 'Technology',
    level: 3,
    parentId: '2',
    children: [],
    employeeCount: 20,
    status: 'active'
  },
  {
    id: '6',
    name: 'David Kim',
    title: 'Product Manager',
    department: 'Technology',
    level: 3,
    parentId: '2',
    children: [],
    employeeCount: 15,
    status: 'active'
  }
]

const HierarchyPage: React.FC = () => {
  const [hierarchy, setHierarchy] = useState<HierarchyNode[]>(initialHierarchy)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2', '3', '4']))
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [editingNode, setEditingNode] = useState<HierarchyNode | null>(null)

  const filteredHierarchy = hierarchy.filter(node =>
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const renderNode = (node: HierarchyNode, depth: number = 0) => {
    const hasChildren = node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)
    const isVisible = !searchTerm || filteredHierarchy.some(n => n.id === node.id)

    if (!isVisible) return null

    return (
      <div key={node.id} className="mb-2">
        <div 
          className={`flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${
            depth > 0 ? 'ml-6' : ''
          }`}
        >
          <div className="flex items-center flex-1">
            {hasChildren && (
              <button
                onClick={() => toggleNode(node.id)}
                className="p-1 hover:bg-gray-100 rounded mr-2"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-6 mr-2" />}
            
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{node.name}</div>
                <div className="text-sm text-gray-500">{node.title} • {node.department}</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{node.employeeCount}</div>
              <div className="text-xs text-gray-500">employees</div>
            </div>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              node.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {node.status}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditingNode(node)
                  setShowAddModal(true)
                }}
                className="text-blue-600 hover:text-blue-900 p-1"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteNode(node.id)}
                className="text-red-600 hover:text-red-900 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-2">
            {node.children.map(childId => {
              const child = hierarchy.find(n => n.id === childId)
              return child ? renderNode(child, depth + 1) : null
            })}
          </div>
        )}
      </div>
    )
  }

  const handleDeleteNode = (id: string) => {
    if (window.confirm('Are you sure you want to delete this position?')) {
      setHierarchy(hierarchy.filter(node => node.id !== id))
    }
  }

  const getRootNodes = () => hierarchy.filter(node => node.parentId === null)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Organizational Hierarchy</h1>
        <p className="text-gray-600">View and manage the company's organizational structure</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Positions</p>
              <p className="text-2xl font-bold text-gray-900">{hierarchy.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {hierarchy.reduce((sum, node) => sum + node.employeeCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(hierarchy.map(node => node.department)).size}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Max Level</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.max(...hierarchy.map(node => node.level))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Position
          </button>
        </div>
      </div>

      {/* Hierarchy Tree */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Organizational Structure</h3>
        <div className="space-y-2">
          {getRootNodes().map(node => renderNode(node))}
        </div>
      </div>

      {/* Add/Edit Position Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingNode ? 'Edit Position' : 'Add New Position'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingNode(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Position Management</h3>
              <p className="mt-1 text-sm text-gray-500">Add and edit organizational positions</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HierarchyPage
