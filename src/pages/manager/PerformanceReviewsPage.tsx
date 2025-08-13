import {
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Filter,
  Search,
  Eye,
  Edit,
  Download,
  Star,
} from "lucide-react";
import { useState } from "react";

const PerformanceReviewsPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const performanceReviews = [
    {
      id: 1,
      employee: "Sarah Chen",
      position: "Senior Developer",
      avatar: "SC",
      reviewType: "Q4 2024",
      dueDate: "Dec 31, 2024",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
      overallScore: 4.8,
      lastReview: "Sep 30, 2024",
      nextReview: "Mar 31, 2025",
      reviewer: "Mike Smith",
    },
    {
      id: 2,
      employee: "Alex Rodriguez",
      position: "UI/UX Designer",
      avatar: "AR",
      reviewType: "Q4 2024",
      dueDate: "Dec 31, 2024",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-800",
      overallScore: 4.5,
      lastReview: "Sep 30, 2024",
      nextReview: "Mar 31, 2025",
      reviewer: "Mike Smith",
    },
    {
      id: 3,
      employee: "David Kim",
      position: "Backend Developer",
      avatar: "DK",
      reviewType: "Q4 2024",
      dueDate: "Dec 31, 2024",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      overallScore: 4.2,
      lastReview: "Sep 30, 2024",
      nextReview: "Mar 31, 2025",
      reviewer: "Mike Smith",
    },
  ];

  const filteredReviews = performanceReviews.filter((review) => {
    const matchesSearch = review.employee
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || review.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4.0) return "text-blue-600";
    if (score >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Performance Reviews
          </h1>
          <p className="text-gray-600">
            Conduct and manage team performance reviews
          </p>
        </div>
        <button className="btn-primary">
          <Edit className="w-4 h-4 mr-2" />
          New Review
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by employee..."
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
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Performance Reviews
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overall Score
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
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {review.avatar}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {review.employee}
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {review.reviewType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {review.dueDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span
                        className={`text-sm font-medium ${getScoreColor(
                          review.overallScore
                        )}`}
                      >
                        {review.overallScore}/5
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.overallScore
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${review.statusColor}`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      {review.status !== "Completed" && (
                        <button className="text-primary-600 hover:text-primary-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
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

export default PerformanceReviewsPage;
