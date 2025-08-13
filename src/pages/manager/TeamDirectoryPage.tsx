import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Target,
  Award,
  BarChart3,
  Briefcase,
  Star,
  ExternalLink,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

const TeamDirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Senior Developer",
      department: "Engineering",
      email: "sarah.chen@company.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      hireDate: "Jan 15, 2022",
      skills: ["React", "Node.js", "Python", "AWS", "Docker"],
      performance: 4.8,
      status: "Active",
      avatar: "SC",
      statusColor: "bg-green-100 text-green-800",
      projects: ["Project Alpha", "Project Beta"],
      manager: "Mike Smith",
      directReports: 2,
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      position: "UI/UX Designer",
      department: "Design",
      email: "alex.rodriguez@company.com",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      hireDate: "Mar 20, 2022",
      skills: [
        "Figma",
        "Sketch",
        "Adobe Creative Suite",
        "Prototyping",
        "User Research",
      ],
      performance: 4.5,
      status: "On Leave",
      avatar: "AR",
      statusColor: "bg-yellow-100 text-yellow-800",
      projects: ["Project Gamma", "Project Delta"],
      manager: "Mike Smith",
      directReports: 0,
    },
    {
      id: 3,
      name: "David Kim",
      position: "Backend Developer",
      department: "Engineering",
      email: "david.kim@company.com",
      phone: "+1 (555) 345-6789",
      location: "Seattle, WA",
      hireDate: "Jun 10, 2022",
      skills: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Kubernetes"],
      performance: 4.2,
      status: "Active",
      avatar: "DK",
      statusColor: "bg-green-100 text-green-800",
      projects: ["Project Alpha", "Project Epsilon"],
      manager: "Mike Smith",
      directReports: 0,
    },
    {
      id: 4,
      name: "Emily Watson",
      position: "Frontend Developer",
      department: "Engineering",
      email: "emily.watson@company.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      hireDate: "Aug 5, 2022",
      skills: ["Vue.js", "TypeScript", "CSS3", "Webpack", "Jest"],
      performance: 4.6,
      status: "Active",
      avatar: "EW",
      statusColor: "bg-green-100 text-green-800",
      projects: ["Project Beta", "Project Zeta"],
      manager: "Mike Smith",
      directReports: 0,
    },
    {
      id: 5,
      name: "Michael Brown",
      position: "DevOps Engineer",
      department: "Engineering",
      email: "michael.brown@company.com",
      phone: "+1 (555) 567-8901",
      location: "Denver, CO",
      hireDate: "Sep 12, 2022",
      skills: ["Docker", "Kubernetes", "Terraform", "Jenkins", "Linux"],
      performance: 4.3,
      status: "Active",
      avatar: "MB",
      statusColor: "bg-green-100 text-green-800",
      projects: ["Project Alpha", "Project Epsilon"],
      manager: "Mike Smith",
      directReports: 0,
    },
    {
      id: 6,
      name: "Lisa Wang",
      position: "QA Engineer",
      department: "Quality Assurance",
      email: "lisa.wang@company.com",
      phone: "+1 (555) 678-9012",
      location: "Boston, MA",
      hireDate: "Oct 18, 2022",
      skills: ["Selenium", "JUnit", "TestNG", "Cucumber", "Postman"],
      performance: 4.7,
      status: "Active",
      avatar: "LW",
      statusColor: "bg-green-100 text-green-800",
      projects: ["Project Beta", "Project Zeta"],
      manager: "Mike Smith",
      directReports: 0,
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
  const statuses = ["all", "Active", "On Leave", "Terminated", "Suspended"];

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || member.department === filterDepartment;
    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getPerformanceColor = (performance: number) => {
    if (performance >= 4.5) return "text-green-600";
    if (performance >= 4.0) return "text-blue-600";
    if (performance >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Directory</h1>
          <p className="text-gray-600">
            Manage and view detailed information about your team members
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Users className="w-4 h-4 mr-2" />
            Export Directory
          </button>
          <button className="btn-primary">
            <Users className="w-4 h-4 mr-2" />
            Add Member
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, position, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Department Filter */}
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

          {/* Status Filter */}
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
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-700">
                    {member.avatar}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${member.statusColor}`}
                  >
                    {member.status}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{member.position}</p>
                <p className="text-xs text-gray-500">{member.department}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span
                    className={`text-sm font-medium ${getPerformanceColor(
                      member.performance
                    )}`}
                  >
                    {member.performance}/5
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Hired {member.hireDate}
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a
                    href={`mailto:${member.email}`}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a
                    href={`tel:${member.phone}`}
                    className="text-sm text-gray-600 hover:text-gray-700"
                  >
                    {member.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {member.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {member.skills.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{member.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Manager:</span>
                  <p className="font-medium text-gray-900">{member.manager}</p>
                </div>
                <div>
                  <span className="text-gray-500">Direct Reports:</span>
                  <p className="font-medium text-gray-900">
                    {member.directReports}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Current Projects:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {member.projects.map((project, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors duration-200">
                  View Profile
                </button>
                <button className="px-3 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Directory Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {filteredMembers.length}
            </p>
            <p className="text-sm text-gray-600">Total Members</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {filteredMembers.filter((m) => m.status === "Active").length}
            </p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {
                filteredMembers.filter((m) => m.department === "Engineering")
                  .length
              }
            </p>
            <p className="text-sm text-gray-600">Engineering</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {(
                filteredMembers.reduce((acc, m) => acc + m.performance, 0) /
                filteredMembers.length
              ).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Avg Performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDirectoryPage;
