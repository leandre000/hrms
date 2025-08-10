import React, { useState } from 'react'
import { Users, ChevronDown, ChevronRight, Mail, Phone } from 'lucide-react'

const OrgChartPage = () => {
  const [expandedNodes, setExpandedNodes] = useState(['ceo', 'cto', 'sales'])

  const orgStructure = {
    id: 'ceo',
    name: 'John Smith',
    position: 'Chief Executive Officer',
    email: 'john.smith@company.com',
    phone: '+1 (555) 000-0001',
    children: [
      {
        id: 'cto',
        name: 'Sarah Wilson',
        position: 'Chief Technology Officer',
        email: 'sarah.wilson@company.com',
        phone: '+1 (555) 000-0002',
        children: [
          {
            id: 'eng-mgr-1',
            name: 'Mike Johnson',
            position: 'Engineering Manager',
            email: 'mike.johnson@company.com',
            phone: '+1 (555) 000-0003',
            children: [
              {
                id: 'dev-1',
                name: 'John Doe',
                position: 'Senior Developer',
                email: 'john.doe@company.com',
                phone: '+1 (555) 000-0004'
              },
              {
                id: 'dev-2',
                name: 'Jane Smith',
                position: 'Frontend Developer',
                email: 'jane.smith@company.com',
                phone: '+1 (555) 000-0005'
              }
            ]
          },
          {
            id: 'eng-mgr-2',
            name: 'David Brown',
            position: 'DevOps Manager',
            email: 'david.brown@company.com',
            phone: '+1 (555) 000-0006',
            children: [
              {
                id: 'devops-1',
                name: 'Lisa Rodriguez',
                position: 'DevOps Engineer',
                email: 'lisa.rodriguez@company.com',
                phone: '+1 (555) 000-0007'
              }
            ]
          }
        ]
      },
      {
        id: 'sales',
        name: 'Robert Chen',
        position: 'Sales Director',
        email: 'robert.chen@company.com',
        phone: '+1 (555) 000-0008',
        children: [
          {
            id: 'sales-mgr',
            name: 'Maria Garcia',
            position: 'Sales Manager',
            email: 'maria.garcia@company.com',
            phone: '+1 (555) 000-0009',
            children: [
              {
                id: 'sales-rep-1',
                name: 'Alex Thompson',
                position: 'Sales Representative',
                email: 'alex.thompson@company.com',
                phone: '+1 (555) 000-0010'
              },
              {
                id: 'sales-rep-2',
                name: 'Emma Wilson',
                position: 'Senior Sales Rep',
                email: 'emma.wilson@company.com',
                phone: '+1 (555) 000-0011'
              }
            ]
          }
        ]
      },
      {
        id: 'hr',
        name: 'Karen Johnson',
        position: 'HR Director',
        email: 'karen.johnson@company.com',
        phone: '+1 (555) 000-0012',
        children: [
          {
            id: 'hr-specialist',
            name: 'Tom Anderson',
            position: 'HR Specialist',
            email: 'tom.anderson@company.com',
            phone: '+1 (555) 000-0013'
          }
        ]
      }
    ]
  }

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    )
  }

  const renderOrgNode = (node: any, level = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.includes(node.id)

    return (
      <div key={node.id} className={`${level > 0 ? 'ml-6' : ''}`}>
        <div className="bg-white border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasChildren && (
                <button
                  onClick={() => toggleNode(node.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-4 h-4 text-gray-500" /> :
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  }
                </button>
              )}
              {!hasChildren && <div className="w-6"></div>}
              
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">
                  {node.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">{node.name}</h3>
                <p className="text-gray-600">{node.position}</p>
                {hasChildren && (
                  <p className="text-xs text-gray-500">
                    {node.children.length} direct report{node.children.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <a
                href={`mailto:${node.email}`}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${node.phone}`}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="border-l-2 border-gray-200 ml-8">
            {node.children.map((child: any) => renderOrgNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const getTotalEmployees = (node: any): number => {
    let count = 1
    if (node.children) {
      count += node.children.reduce((sum: number, child: any) => sum + getTotalEmployees(child), 0)
    }
    return count
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Organization Chart</h1>
          <p className="text-gray-600">Visual representation of company hierarchy and reporting structure</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-primary-600">{getTotalEmployees(orgStructure)}</div>
            <div className="text-sm text-gray-600">Total Employees</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-gray-600">Management Levels</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-600">Direct to CEO</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex gap-4">
            <button 
              onClick={() => setExpandedNodes(['ceo', 'cto', 'sales', 'hr', 'eng-mgr-1', 'eng-mgr-2', 'sales-mgr'])}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Expand All
            </button>
            <button 
              onClick={() => setExpandedNodes(['ceo'])}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Organization Chart */}
        <div className="bg-gray-50 p-6 rounded-lg">
          {renderOrgNode(orgStructure)}
        </div>
      </div>
    </div>
  )
}

export default OrgChartPage
