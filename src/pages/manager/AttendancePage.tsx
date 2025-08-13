import {
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Eye,
  BarChart3,
  MapPin,
} from "lucide-react";
import { useState } from "react";

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");

  const attendanceData = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Senior Developer",
      department: "Engineering",
      avatar: "SC",
      status: "Present",
      statusColor: "bg-green-100 text-green-800",
      checkIn: "8:55 AM",
      checkOut: "6:05 PM",
      location: "Office",
      lateMinutes: 0,
      overtimeMinutes: 5,
      totalHours: 9.17,
      attendanceRate: 100,
      trend: "up",
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      position: "UI/UX Designer",
      department: "Design",
      avatar: "AR",
      status: "On Leave",
      statusColor: "bg-yellow-100 text-yellow-800",
      checkIn: "N/A",
      checkOut: "N/A",
      location: "Remote",
      lateMinutes: 0,
      overtimeMinutes: 0,
      totalHours: 0,
      attendanceRate: 0,
      trend: "stable",
    },
    {
      id: 3,
      name: "David Kim",
      position: "Backend Developer",
      department: "Engineering",
      avatar: "DK",
      status: "Present",
      statusColor: "bg-green-100 text-green-800",
      checkIn: "8:30 AM",
      checkOut: "5:30 PM",
      location: "Office",
      lateMinutes: 0,
      overtimeMinutes: 0,
      totalHours: 9.0,
      attendanceRate: 100,
      trend: "up",
    },
    {
      id: 4,
      name: "Emily Watson",
      position: "Frontend Developer",
      department: "Engineering",
      avatar: "EW",
      status: "Late",
      statusColor: "bg-red-100 text-red-800",
      checkIn: "9:45 AM",
      checkOut: "6:30 PM",
      location: "Office",
      lateMinutes: 45,
      overtimeMinutes: 30,
      totalHours: 8.75,
      attendanceRate: 85,
      trend: "down",
    },
    {
      id: 5,
      name: "Michael Brown",
      position: "DevOps Engineer",
      department: "Engineering",
      avatar: "MB",
      status: "Present",
      statusColor: "bg-green-100 text-green-800",
      checkIn: "8:45 AM",
      checkOut: "5:45 PM",
      location: "Office",
      lateMinutes: 0,
      overtimeMinutes: 0,
      totalHours: 9.0,
      attendanceRate: 100,
      trend: "stable",
    },
    {
      id: 6,
      name: "Lisa Wang",
      position: "QA Engineer",
      department: "Quality Assurance",
      avatar: "LW",
      status: "Present",
      statusColor: "bg-green-100 text-green-800",
      checkIn: "9:00 AM",
      checkOut: "6:00 PM",
      location: "Office",
      lateMinutes: 0,
      overtimeMinutes: 0,
      totalHours: 9.0,
      attendanceRate: 100,
      trend: "up",
    },
  ];

  const departments = [
    "all",
    "Engineering",
    "Design",
    "Quality Assurance",
    "Product",
    "Marketing",
  ];
  const statuses = ["all", "Present", "Late", "On Leave", "Absent", "Remote"];

  const filteredData = attendanceData.filter((member) => {
    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;
    const matchesDepartment =
      filterDepartment === "all" || member.department === filterDepartment;
    return matchesStatus && matchesDepartment;
  });

  const attendanceStats = [
    {
      name: "Present Today",
      value: attendanceData.filter((m) => m.status === "Present").length,
      total: attendanceData.length,
      color: "bg-green-500",
      icon: CheckCircle,
    },
    {
      name: "Late Arrivals",
      value: attendanceData.filter((m) => m.status === "Late").length,
      total: attendanceData.length,
      color: "bg-orange-500",
      icon: AlertTriangle,
    },
    {
      name: "On Leave",
      value: attendanceData.filter((m) => m.status === "On Leave").length,
      total: attendanceData.length,
      color: "bg-yellow-500",
      icon: Clock,
    },
    {
      name: "Avg. Attendance Rate",
      value:
        (
          attendanceData.reduce((acc, m) => acc + m.attendanceRate, 0) /
          attendanceData.length
        ).toFixed(1) + "%",
      total: "100%",
      color: "bg-blue-500",
      icon: TrendingUp,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Late":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "On Leave":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "Absent":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Attendance</h1>
          <p className="text-gray-600">
            Track and monitor your team's attendance and time patterns
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="btn-primary">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </button>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map((stat) => (
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
                {stat.total !== "100%" && (
                  <p className="text-sm text-gray-500">
                    of {stat.total} team members
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="w-full md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Statuses" : status}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-48">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Today's Attendance
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Late/Overtime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {member.avatar}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.position}
                        </div>
                        <div className="text-xs text-gray-500">
                          {member.department}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(member.status)}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${member.statusColor}`}
                      >
                        {member.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {member.checkIn}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {member.checkOut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {member.totalHours}h
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {member.lateMinutes > 0 && (
                        <div className="text-orange-600">
                          Late: {member.lateMinutes}m
                        </div>
                      )}
                      {member.overtimeMinutes > 0 && (
                        <div className="text-blue-600">
                          OT: {member.overtimeMinutes}m
                        </div>
                      )}
                      {member.lateMinutes === 0 &&
                        member.overtimeMinutes === 0 && (
                          <span className="text-green-600">On time</span>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {member.location}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Late Arrivals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Late Arrivals This Week
          </h3>
          <div className="space-y-4">
            {attendanceData
              .filter((member) => member.lateMinutes > 0)
              .map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg"
                >
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
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-600">
                      {member.lateMinutes}m late
                    </p>
                    <p className="text-xs text-gray-500">{member.checkIn}</p>
                  </div>
                </div>
              ))}
            {attendanceData.filter((member) => member.lateMinutes > 0)
              .length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No late arrivals this week
              </p>
            )}
          </div>
        </div>

        {/* Attendance Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Attendance Trends
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Overall Attendance Rate
              </span>
              <span className="text-lg font-bold text-green-600">
                {(
                  attendanceData.reduce((acc, m) => acc + m.attendanceRate, 0) /
                  attendanceData.length
                ).toFixed(1)}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${
                    attendanceData.reduce(
                      (acc, m) => acc + m.attendanceRate,
                      0
                    ) / attendanceData.length
                  }%`,
                }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {attendanceData.filter((m) => m.status === "Present").length}
                </p>
                <p className="text-sm text-gray-600">Present Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {attendanceData.filter((m) => m.lateMinutes > 0).length}
                </p>
                <p className="text-sm text-gray-600">Late Arrivals</p>
              </div>
            </div>
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
            <Calendar className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">View Calendar</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <BarChart3 className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">
              Attendance Report
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Time Tracking</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-6 h-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Export Data</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
