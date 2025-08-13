import React from "react";

const TimelinePage: React.FC = () => {
  const timelineEvents = [
    {
      id: 1,
      date: "2024-01-15",
      title: "Q4 Performance Review",
      type: "Meeting",
      assignee: "Sarah Johnson",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-01-18",
      title: "Project Alpha Launch",
      type: "Milestone",
      assignee: "Mike Chen",
      status: "In Progress",
    },
    {
      id: 3,
      date: "2024-01-20",
      title: "Team Training Session",
      type: "Training",
      assignee: "Emily Davis",
      status: "Scheduled",
    },
    {
      id: 4,
      date: "2024-01-25",
      title: "Budget Review Meeting",
      type: "Meeting",
      assignee: "Alex Rodriguez",
      status: "Pending",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Meeting":
        return "bg-blue-100 text-blue-800";
      case "Milestone":
        return "bg-green-100 text-green-800";
      case "Training":
        return "bg-purple-100 text-purple-800";
      case "Deadline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Timeline</h1>
        <p className="text-gray-600">
          View team activities, milestones, and project timeline
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Event
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Timeline
          </button>
        </div>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>Meeting</option>
            <option>Milestone</option>
            <option>Training</option>
            <option>Deadline</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Scheduled</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Timeline Overview
        </h2>
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-0.5 h-16 bg-gray-300 mx-auto mt-2"></div>
                )}
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {event.title}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{event.date}</span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                      event.type
                    )}`}
                  >
                    {event.type}
                  </span>
                  <span>Assigned to: {event.assignee}</span>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="text-xs text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                  <button className="text-xs text-green-600 hover:text-green-800">
                    Edit
                  </button>
                  <button className="text-xs text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Calendar View
        </h2>
        <div className="grid grid-cols-7 gap-1">
          {/* Calendar Header */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50"
            >
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {Array.from({ length: 31 }, (_, i) => {
            const day = i + 1;
            const hasEvent = timelineEvents.some(
              (event) => new Date(event.date).getDate() === day
            );

            return (
              <div
                key={day}
                className={`p-2 text-center text-sm border border-gray-200 min-h-[80px] ${
                  hasEvent ? "bg-blue-50" : ""
                }`}
              >
                <div className="text-gray-900">{day}</div>
                {hasEvent && (
                  <div className="mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Timeline Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Events:</span>
              <span className="text-sm font-medium text-gray-900">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completed:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">In Progress:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Scheduled:</span>
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
            Upcoming Events
          </h3>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-3">
              <div className="text-sm font-medium text-gray-900">
                Team Training Session
              </div>
              <div className="text-xs text-gray-500">Jan 20 - Emily Davis</div>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <div className="text-sm font-medium text-gray-900">
                Budget Review Meeting
              </div>
              <div className="text-xs text-gray-500">
                Jan 25 - Alex Rodriguez
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
              Add New Event
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
              Schedule Meeting
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
              Set Milestone
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
              Export Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
