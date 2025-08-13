import React from "react";

const ResourcesPage: React.FC = () => {
  const resources = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      type: "Hardware",
      assignee: "Sarah Johnson",
      status: "In Use",
      location: "Office A-12",
      lastUpdated: "2024-01-10",
    },
    {
      id: 2,
      name: "Adobe Creative Suite License",
      type: "Software",
      assignee: "Emily Davis",
      status: "Active",
      location: "Digital",
      lastUpdated: "2024-01-08",
    },
    {
      id: 3,
      name: "Conference Room B",
      type: "Facility",
      assignee: "Team",
      status: "Available",
      location: "Floor 2",
      lastUpdated: "2024-01-15",
    },
    {
      id: 4,
      name: "Projector Setup",
      type: "Equipment",
      assignee: "Mike Chen",
      status: "In Use",
      location: "Meeting Room 3",
      lastUpdated: "2024-01-12",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Hardware":
        return "bg-blue-100 text-blue-800";
      case "Software":
        return "bg-green-100 text-green-800";
      case "Facility":
        return "bg-purple-100 text-purple-800";
      case "Equipment":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "In Use":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "Retired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Resources</h1>
        <p className="text-gray-600">
          Manage team resources, equipment, and facilities
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Resource
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Request Resource
          </button>
        </div>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>Hardware</option>
            <option>Software</option>
            <option>Facility</option>
            <option>Equipment</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Available</option>
            <option>In Use</option>
            <option>Maintenance</option>
            <option>Retired</option>
          </select>
          <input
            type="text"
            placeholder="Search resources..."
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-48"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {resource.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {resource.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                        resource.type
                      )}`}
                    >
                      {resource.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resource.assignee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        resource.status
                      )}`}
                    >
                      {resource.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resource.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resource.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resource Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Resources:</span>
              <span className="text-sm font-medium text-gray-900">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Hardware:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Software:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Facility:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Equipment:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Status Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Available:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">In Use:</span>
              <span className="text-sm font-medium text-gray-900">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Maintenance:</span>
              <span className="text-sm font-medium text-gray-900">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Retired:</span>
              <span className="text-sm font-medium text-gray-900">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              Add New Resource
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
              Request Resource
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
              Generate Reports
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
              View Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
