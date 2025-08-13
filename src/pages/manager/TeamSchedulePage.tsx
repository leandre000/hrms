import {
  Users,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Video,
  Phone,
  Coffee,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

const TeamSchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("week");
  const [filterStatus, setFilterStatus] = useState("all");

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Senior Developer",
      avatar: "SC",
      status: "Present",
      statusColor: "bg-green-100 text-green-800",
      location: "Office",
      startTime: "9:00 AM",
      endTime: "6:00 PM",
      meetings: [
        { title: "Daily Standup", time: "9:30 AM", type: "team", duration: 15 },
        {
          title: "Sprint Planning",
          time: "2:00 PM",
          type: "project",
          duration: 60,
        },
      ],
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      position: "UI/UX Designer",
      avatar: "AR",
      status: "On Leave",
      statusColor: "bg-yellow-100 text-yellow-800",
      location: "Remote",
      startTime: "10:00 AM",
      endTime: "6:00 PM",
      meetings: [
        {
          title: "Design Review",
          time: "11:00 AM",
          type: "design",
          duration: 45,
        },
      ],
    },
    {
      id: 3,
      name: "David Kim",
      position: "Backend Developer",
      avatar: "DK",
      status: "Present",
      statusColor: "bg-green-100 text-green-800",
      location: "Office",
      startTime: "8:30 AM",
      endTime: "5:30 PM",
      meetings: [
        { title: "Daily Standup", time: "9:30 AM", type: "team", duration: 15 },
        {
          title: "Architecture Review",
          time: "1:30 PM",
          type: "technical",
          duration: 60,
        },
      ],
    },
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case "team":
        return <Users className="w-4 h-4" />;
      case "project":
        return <Briefcase className="w-4 h-4" />;
      case "technical":
        return <CheckCircle className="w-4 h-4" />;
      case "design":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getMeetingColor = (type: string) => {
    switch (type) {
      case "team":
        return "bg-blue-100 text-blue-800";
      case "project":
        return "bg-purple-100 text-purple-800";
      case "technical":
        return "bg-green-100 text-green-800";
      case "design":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Schedule</h1>
          <p className="text-gray-600">
            Manage and view your team's schedules and availability
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Meeting
          </button>
        </div>
      </div>

      {/* Schedule Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedView("day")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  selectedView === "day"
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setSelectedView("week")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  selectedView === "week"
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setSelectedView("month")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  selectedView === "month"
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Month
              </button>
            </div>

            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="present">Present</option>
              <option value="remote">Remote</option>
              <option value="leave">On Leave</option>
              <option value="late">Late</option>
            </select>
          </div>
        </div>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  Team Member
                </th>
                {weekDays.map((day) => (
                  <th
                    key={day}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers
                .filter(
                  (member) =>
                    filterStatus === "all" ||
                    member.status.toLowerCase().includes(filterStatus)
                )
                .map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {member.avatar}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.position}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${member.statusColor}`}
                            >
                              {member.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {member.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    {weekDays.map((day, dayIndex) => (
                      <td key={day} className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="text-xs text-gray-600">
                            {member.startTime} - {member.endTime}
                          </div>

                          {member.meetings
                            .filter((_, index) => index < 2)
                            .map((meeting, meetingIndex) => (
                              <div
                                key={meetingIndex}
                                className={`text-xs px-2 py-1 rounded ${getMeetingColor(
                                  meeting.type
                                )} flex items-center space-x-1`}
                              >
                                {getMeetingIcon(meeting.type)}
                                <span className="truncate">
                                  {meeting.title}
                                </span>
                              </div>
                            ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Availability Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Today's Schedule
          </h3>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {member.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {member.name}
                      </h4>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${member.statusColor}`}
                  >
                    {member.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Working Hours:</span>
                    <span className="font-medium">
                      {member.startTime} - {member.endTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{member.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Meetings:</span>
                    <span className="font-medium">
                      {member.meetings.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Meetings
          </h3>
          <div className="space-y-4">
            {teamMembers
              .flatMap((member) =>
                member.meetings.map((meeting) => ({
                  ...meeting,
                  memberName: member.name,
                  memberAvatar: member.avatar,
                }))
              )
              .slice(0, 6)
              .map((meeting, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`p-2 rounded-lg ${getMeetingColor(
                      meeting.type
                    )}`}
                  >
                    {getMeetingIcon(meeting.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {meeting.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {meeting.memberName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {meeting.time} • {meeting.duration}min
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Plus className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">
              Schedule Meeting
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Calendar className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">View Calendar</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Time Tracking</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Users className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">
              Team Availability
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamSchedulePage;
