import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, MapPin, Users, Building, Globe, Phone } from 'lucide-react'

interface Location {
  id: string
  name: string
  type: 'office' | 'branch' | 'warehouse' | 'remote'
  address: string
  city: string
  country: string
  postalCode: string
  phone: string
  email: string
  employeeCount: number
  departmentCount: number
  status: 'active' | 'inactive'
  timezone: string
  createdAt: string
}

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Main Headquarters',
    type: 'office',
    address: '123 Business Street',
    city: 'New York',
    country: 'United States',
    postalCode: '10001',
    phone: '+1 (555) 123-4567',
    email: 'hq@company.com',
    employeeCount: 150,
    departmentCount: 8,
    status: 'active',
    timezone: 'EST (UTC-5)',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'West Coast Office',
    type: 'office',
    address: '456 Tech Avenue',
    city: 'San Francisco',
    country: 'United States',
    postalCode: '94102',
    phone: '+1 (555) 987-6543',
    email: 'west@company.com',
    employeeCount: 85,
    departmentCount: 5,
    status: 'active',
    timezone: 'PST (UTC-8)',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'European Branch',
    type: 'branch',
    address: '789 Innovation Road',
    city: 'London',
    country: 'United Kingdom',
    postalCode: 'SW1A 1AA',
    phone: '+44 20 7946 0958',
    email: 'europe@company.com',
    employeeCount: 65,
    departmentCount: 4,
    status: 'active',
    timezone: 'GMT (UTC+0)',
    createdAt: '2024-01-25'
  },
  {
    id: '4',
    name: 'Asia Pacific Hub',
    type: 'office',
    address: '321 Growth Street',
    city: 'Singapore',
    country: 'Singapore',
    postalCode: '018956',
    phone: '+65 6789 0123',
    email: 'asia@company.com',
    employeeCount: 45,
    departmentCount: 3,
    status: 'active',
    timezone: 'SGT (UTC+8)',
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    name: 'Distribution Center',
    type: 'warehouse',
    address: '654 Logistics Way',
    city: 'Chicago',
    country: 'United States',
    postalCode: '60601',
    phone: '+1 (555) 456-7890',
    email: 'logistics@company.com',
    employeeCount: 25,
    departmentCount: 2,
    status: 'active',
    timezone: 'CST (UTC-6)',
    createdAt: '2024-01-30'
  }
]

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddLocation = (newLocation: Omit<Location, 'id' | 'createdAt'>) => {
    const location: Location = {
      ...newLocation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    setLocations([...locations, location])
    setShowAddModal(false)
  }

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location)
    setShowAddModal(true)
  }

  const handleUpdateLocation = (updatedLocation: Location) => {
    setLocations(locations.map(location => 
      location.id === updatedLocation.id ? updatedLocation : location
    ))
    setEditingLocation(null)
    setShowAddModal(false)
  }

  const handleDeleteLocation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter(location => location.id !== id))
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'office': return 'bg-blue-100 text-blue-800'
      case 'branch': return 'bg-green-100 text-green-800'
      case 'warehouse': return 'bg-orange-100 text-orange-800'
      case 'remote': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Locations</h1>
        <p className="text-gray-600">Manage company locations and office information</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Locations</p>
              <p className="text-2xl font-bold text-gray-900">{locations.length}</p>
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
                {locations.reduce((sum, location) => sum + location.employeeCount, 0)}
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
              <p className="text-sm font-medium text-gray-600">Total Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {locations.reduce((sum, location) => sum + location.departmentCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Globe className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Countries</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(locations.map(location => location.country)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search locations..."
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
              Add Location
            </button>
          </div>
        </div>

        {/* Locations Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timezone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLocations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{location.name}</div>
                      <div className="text-sm text-gray-500">{location.city}, {location.country}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(location.type)}`}>
                      {location.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{location.address}</div>
                      <div className="text-gray-500">{location.postalCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {location.phone}
                      </div>
                      <div className="text-gray-500">{location.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{location.employeeCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{location.timezone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      location.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {location.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditLocation(location)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLocation(location.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Location Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingLocation ? 'Edit Location' : 'Add New Location'}
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const newLocation = {
                  name: formData.get('name') as string,
                  type: formData.get('type') as 'office' | 'branch' | 'warehouse' | 'remote',
                  address: formData.get('address') as string,
                  city: formData.get('city') as string,
                  country: formData.get('country') as string,
                  postalCode: formData.get('postalCode') as string,
                  phone: formData.get('phone') as string,
                  email: formData.get('email') as string,
                  employeeCount: parseInt(formData.get('employeeCount') as string),
                  departmentCount: parseInt(formData.get('departmentCount') as string),
                  status: formData.get('status') as 'active' | 'inactive',
                  timezone: formData.get('timezone') as string
                }
                
                if (editingLocation) {
                  handleUpdateLocation({ ...editingLocation, ...newLocation })
                } else {
                  handleAddLocation(newLocation)
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingLocation?.name}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      name="type"
                      defaultValue={editingLocation?.type || 'office'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="office">Office</option>
                      <option value="branch">Branch</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={editingLocation?.address}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        defaultValue={editingLocation?.city}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Country</label>
                      <input
                        type="text"
                        name="country"
                        defaultValue={editingLocation?.country}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      defaultValue={editingLocation?.postalCode}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={editingLocation?.phone}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editingLocation?.email}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Employees</label>
                      <input
                        type="number"
                        name="employeeCount"
                        defaultValue={editingLocation?.employeeCount}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Departments</label>
                      <input
                        type="number"
                        name="departmentCount"
                        defaultValue={editingLocation?.departmentCount}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Timezone</label>
                    <input
                      type="text"
                      name="timezone"
                      defaultValue={editingLocation?.timezone}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      defaultValue={editingLocation?.status || 'active'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingLocation(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {editingLocation ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationsPage
