import React from "react";

const AnalyticsPage: React.FC = () => {
  const analyticsData = {
    teamPerformance: {
      productivity: 87,
      quality: 92,
      efficiency: 78,
      satisfaction: 4.2,
    },
    trends: {
      weekly: [65, 72, 68, 75, 80, 85, 87],
      monthly: [70, 75, 78, 82, 85, 87, 89, 91, 88, 90, 92, 94],
    },
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Analytics</h1>
        <p className="text-gray-600">
          Comprehensive insights into team performance and trends
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Data
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
            <option>All Metrics</option>
            <option>Productivity</option>
            <option>Quality</option>
            <option>Efficiency</option>
            <option>Satisfaction</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Productivity</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.teamPerformance.productivity}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Quality</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.teamPerformance.quality}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Efficiency</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.teamPerformance.efficiency}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.teamPerformance.satisfaction}/5
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Performance Trend
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Weekly Performance Chart</p>
              <div className="flex items-end space-x-1 h-32">
                {analyticsData.trends.weekly.map((value, index) => (
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
            Monthly Performance Trend
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Monthly Performance Chart</p>
              <div className="flex items-end space-x-1 h-32">
                {analyticsData.trends.monthly.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-4 bg-green-500 rounded-t"
                      style={{ height: `${(value / 100) * 128}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">{value}%</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Months</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Comparison */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Team Performance Comparison
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Your Team</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "87%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900">87%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Company Average
            </span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900">82%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Industry Benchmark
            </span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900">78%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Insights
          </h3>
          <div className="space-y-3">
            <div className="text-sm">
              <div className="text-gray-900 font-medium">
                Strong Productivity
              </div>
              <div className="text-gray-500">
                Your team is performing 5% above company average
              </div>
            </div>
            <div className="text-sm">
              <div className="text-gray-900 font-medium">
                Quality Excellence
              </div>
              <div className="text-gray-500">
                Quality metrics are consistently high
              </div>
            </div>
            <div className="text-sm">
              <div className="text-gray-900 font-medium">
                Efficiency Opportunity
              </div>
              <div className="text-gray-500">
                Room for improvement in process efficiency
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recommendations
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              Optimize Workflows
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
              Team Training
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
              Process Review
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
              Performance Review
            </button>
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
              Export Data
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
              Set Goals
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
              Schedule Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
