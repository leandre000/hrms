import React from "react";

const InterviewsPage: React.FC = () => {
  const interviews = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      position: "Senior Developer",
      date: "2024-01-15",
      time: "10:00 AM",
      interviewer: "John Smith",
      status: "Scheduled",
      type: "Technical",
    },
    {
      id: 2,
      candidate: "Mike Chen",
      position: "Product Manager",
      date: "2024-01-16",
      time: "2:00 PM",
      interviewer: "Lisa Brown",
      status: "Completed",
      type: "Behavioral",
    },
    {
      id: 3,
      candidate: "Emily Davis",
      position: "UX Designer",
      date: "2024-01-17",
      time: "11:00 AM",
      interviewer: "David Wilson",
      status: "Pending",
      type: "Portfolio Review",
    },
    {
      id: 4,
      candidate: "Alex Rodriguez",
      position: "Data Analyst",
      date: "2024-01-18",
      time: "3:00 PM",
      interviewer: "Maria Garcia",
      status: "Scheduled",
      type: "Technical",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Technical":
        return "bg-purple-100 text-purple-800";
      case "Behavioral":
        return "bg-indigo-100 text-indigo-800";
      case "Portfolio Review":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Interviews</h1>
        <p className="text-gray-600">
          Schedule and manage candidate interviews for your team
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Schedule Interview
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            View Calendar
          </button>
        </div>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Scheduled</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>Technical</option>
            <option>Behavioral</option>
            <option>Portfolio Review</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interviewer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {interviews.map((interview) => (
                <tr key={interview.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {interview.candidate}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {interview.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {interview.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {interview.date}
                    </div>
                    <div className="text-sm text-gray-500">
                      {interview.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {interview.interviewer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                        interview.type
                      )}`}
                    >
                      {interview.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        interview.status
                      )}`}
                    >
                      {interview.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Cancel
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
            Interview Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Interviews:</span>
              <span className="text-sm font-medium text-gray-900">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Scheduled:</span>
              <span className="text-sm font-medium text-gray-900">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completed:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Pending:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Interviews
          </h3>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-3">
              <div className="text-sm font-medium text-gray-900">
                Sarah Johnson
              </div>
              <div className="text-xs text-gray-500">
                Senior Developer - Jan 15, 10:00 AM
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <div className="text-sm font-medium text-gray-900">
                Alex Rodriguez
              </div>
              <div className="text-xs text-gray-500">
                Data Analyst - Jan 18, 3:00 PM
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
              Schedule New Interview
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
              View Interview Calendar
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
              Generate Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsPage;
