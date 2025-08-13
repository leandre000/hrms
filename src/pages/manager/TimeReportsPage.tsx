import {
  Clock,
  Calendar,
  Download,
  Filter,
  BarChart3,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

const TimeReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedEmployee, setSelectedEmployee] = useState("all");

  const timeData = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Senior Developer",
      avatar: "SC",
      totalHours: 40.5,
      regularHours: 40,
      overtimeHours: 0.5,
      projectHours: 38,
      adminHours: 2.5,
      efficiency: 94,
    },
    {
      id: 2,
      name: "David Kim",
      position: "Backend Developer",
      avatar: "DK",
      totalHours: 42,
      regularHours: 40,
      overtimeHours: 2,
      projectHours: 39,
      adminHours: 3,
      efficiency: 93,
    },
    {
      id: 3,
      name: "Emily Watson",
      position: "Frontend Developer",
      avatar: "EW",
      totalHours: 38.5,
      regularHours: 38.5,
      overtimeHours: 0,
      projectHours: 36,
      adminHours: 2.5,
      efficiency: 96,
    },
  ];

  const summaryStats = [
    {
      name: "Total Team Hours",
      value: "121",
      change: "+3",
      changeType: "increase",
      icon: Clock,
      color: "bg-blue-500",
    },
    {
      name: "Avg. Efficiency",
      value: "94.3%",
      change: "+1.2%",
      changeType: "increase",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      name: "Overtime Hours",
      value: "2.5",
      change: "-1.5",
      changeType: "decrease",
      icon: Calendar,
      color: "bg-orange-500",
    },
    {
      name: "Project Hours",
      value: "113",
      change: "+5",
      changeType: "increase",
      icon: BarChart3,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Time Reports</h1>
          <p className="text-gray-600">
            View and analyze team time tracking data
          </p>
        </div>
        <button className="btn-primary">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon
                  className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`}
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee
            </label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Employees</option>
              {timeData.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Time Report Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Time Report</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regular Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overtime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeData.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {employee.avatar}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {employee.totalHours}h
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {employee.regularHours}h
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        employee.overtimeHours > 0
                          ? "text-orange-600"
                          : "text-gray-900"
                      }`}
                    >
                      {employee.overtimeHours}h
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {employee.projectHours}h
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {employee.adminHours}h
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`text-sm font-medium ${
                          employee.efficiency >= 90
                            ? "text-green-600"
                            : employee.efficiency >= 80
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {employee.efficiency}%
                      </span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            employee.efficiency >= 90
                              ? "bg-green-500"
                              : employee.efficiency >= 80
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${employee.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeReportsPage;
