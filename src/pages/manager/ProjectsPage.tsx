import {
  Briefcase,
  CheckCircle,
  Clock,
  AlertTriangle,
  Filter,
  Search,
  Eye,
  Edit,
  Plus,
  Users,
  Calendar,
  Target,
} from "lucide-react";
import { useState } from "react";

const ProjectsPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      description: "Customer portal development with advanced features",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-800",
      progress: 65,
      startDate: "Nov 1, 2024",
      endDate: "Jan 31, 2025",
      teamSize: 6,
      priority: "High",
      budget: 50000,
      spent: 32500,
      manager: "Mike Smith",
    },
    {
      id: 2,
      name: "Project Beta",
      description: "Mobile app redesign and optimization",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
      progress: 100,
      startDate: "Oct 1, 2024",
      endDate: "Dec 15, 2024",
      teamSize: 4,
      priority: "Medium",
      budget: 30000,
      spent: 28500,
      manager: "Mike Smith",
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "Database migration and optimization",
      status: "Planning",
      statusColor: "bg-yellow-100 text-yellow-800",
      progress: 15,
      startDate: "Jan 1, 2025",
      endDate: "Mar 31, 2025",
      teamSize: 3,
      priority: "Low",
      budget: 25000,
      spent: 3750,
      manager: "Mike Smith",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage and track team projects</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {project.description}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${project.statusColor}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress:</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(
                      project.progress
                    )}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Team Size:</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{project.teamSize}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Priority:</span>
                    <span
                      className={`ml-1 text-xs px-2 py-1 rounded-full ${getPriorityColor(
                        project.priority
                      )}`}
                    >
                      {project.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Start:</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{project.startDate}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">End:</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{project.endDate}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <span className="font-medium">
                      ${project.budget.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Spent:</span>
                    <span className="font-medium">
                      ${project.spent.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors duration-200">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="px-3 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
