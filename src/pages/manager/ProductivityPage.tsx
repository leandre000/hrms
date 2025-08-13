import React from "react";

const ProductivityPage: React.FC = () => {
  const productivityData = {
    overall: 87,
    teamMembers: [
      {
        name: "Sarah Johnson",
        role: "Senior Developer",
        productivity: 92,
        tasks: 15,
        completed: 14,
      },
      {
        name: "Mike Chen",
        role: "Product Manager",
        productivity: 88,
        tasks: 12,
        completed: 11,
      },
      {
        name: "Emily Davis",
        role: "UX Designer",
        productivity: 85,
        tasks: 18,
        completed: 16,
      },
      {
        name: "Alex Rodriguez",
        role: "Data Analyst",
        productivity: 90,
        tasks: 10,
        completed: 9,
      },
    ],
    trends: {
      daily: [78, 82, 85, 87, 89, 91, 87],
      weekly: [75, 78, 82, 85, 87, 89, 91, 88, 90, 92, 89, 87],
    },
  };

  const getProductivityColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getProductivityBgColor = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-blue-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Productivity</h1>
        <p className="text-gray-600">
          Monitor and analyze team productivity metrics and performance
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Set Goals
          </button>
        </div>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last Year</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Team Members</option>
            <option>Senior Developer</option>
            <option>Product Manager</option>
            <option>UX Designer</option>
            <option>Data Analyst</option>
          </select>
        </div>
      </div>

      {/* Overall Productivity */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Overall Team Productivity
          </h2>
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-100 mb-4">
            <span
              className={`text-3xl font-bold ${getProductivityColor(
                productivityData.overall
              )}`}
            >
              {productivityData.overall}%
            </span>
          </div>
          <p className="text-gray-600">
            {productivityData.overall >= 90
              ? "Excellent performance! Keep up the great work!"
              : productivityData.overall >= 80
              ? "Good performance with room for improvement."
              : productivityData.overall >= 70
              ? "Moderate performance. Consider optimization strategies."
              : "Performance needs attention. Review processes and provide support."}
          </p>
        </div>
      </div>

      {/* Team Member Productivity */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Individual Team Member Productivity
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productivity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productivityData.teamMembers.map((member) => (
                <tr key={member.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {member.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className={`h-2 rounded-full ${getProductivityBgColor(
                            member.productivity
                          )
                            .replace("bg-", "bg-")
                            .replace("-100", "-600")}`}
                          style={{ width: `${member.productivity}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-sm font-medium ${getProductivityColor(
                          member.productivity
                        )}`}
                      >
                        {member.productivity}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.tasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.completed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Provide Feedback
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Productivity Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Productivity Trend
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Daily Productivity Chart</p>
              <div className="flex items-end space-x-1 h-32">
                {productivityData.trends.daily.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(value / 100) * 128}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">{value}%</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Days of the week</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Productivity Trend
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Weekly Productivity Chart</p>
              <div className="flex items-end space-x-1 h-32">
                {productivityData.trends.weekly.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-4 bg-green-500 rounded-t"
                      style={{ height: `${(value / 100) * 128}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">{value}%</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Weeks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Productivity Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Team Average:</span>
              <span className="text-sm font-medium text-gray-900">
                {productivityData.overall}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Top Performer:</span>
              <span className="text-sm font-medium text-gray-900">
                Sarah Johnson (92%)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Tasks:</span>
              <span className="text-sm font-medium text-gray-900">55</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completed Tasks:</span>
              <span className="text-sm font-medium text-gray-900">50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completion Rate:</span>
              <span className="text-sm font-medium text-gray-900">90.9%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Productivity Insights
          </h3>
          <div className="space-y-3">
            <div className="text-sm">
              <div className="text-gray-900 font-medium">
                Strong Performance
              </div>
              <div className="text-gray-500">
                Team is exceeding productivity targets
              </div>
            </div>
            <div className="text-sm">
              <div className="text-gray-900 font-medium">
                Consistent Delivery
              </div>
              <div className="text-gray-500">
                High task completion rates maintained
              </div>
            </div>
            <div className="text-sm">
              <div className="text-gray-900 font-medium">Room for Growth</div>
              <div className="text-gray-500">
                Some team members can improve efficiency
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              Generate Report
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
              Set Productivity Goals
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
              Team Performance Review
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
              Optimize Workflows
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityPage;
