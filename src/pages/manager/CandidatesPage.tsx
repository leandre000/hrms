import React from "react";

const CandidatesPage: React.FC = () => {
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Developer",
      status: "In Review",
      experience: "5 years",
      skills: ["React", "Node.js", "TypeScript"],
      appliedDate: "2024-01-10",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Mike Chen",
      position: "Product Manager",
      status: "Interviewed",
      experience: "7 years",
      skills: ["Product Strategy", "Agile", "User Research"],
      appliedDate: "2024-01-08",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Emily Davis",
      position: "UX Designer",
      status: "Shortlisted",
      experience: "4 years",
      skills: ["Figma", "User Testing", "Prototyping"],
      appliedDate: "2024-01-12",
      rating: 4.2,
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      position: "Data Analyst",
      status: "New",
      experience: "3 years",
      skills: ["Python", "SQL", "Tableau"],
      appliedDate: "2024-01-14",
      rating: 4.0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "In Review":
        return "bg-yellow-100 text-yellow-800";
      case "Shortlisted":
        return "bg-green-100 text-green-800";
      case "Interviewed":
        return "bg-purple-100 text-purple-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Candidates</h1>
        <p className="text-gray-600">
          Review and manage candidate applications for your team
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Candidate
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export List
          </button>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search candidates..."
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64"
          />
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Positions</option>
            <option>Senior Developer</option>
            <option>Product Manager</option>
            <option>UX Designer</option>
            <option>Data Analyst</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>New</option>
            <option>In Review</option>
            <option>Shortlisted</option>
            <option>Interviewed</option>
            <option>Rejected</option>
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {candidate.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {candidate.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {candidate.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        candidate.status
                      )}`}
                    >
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {candidate.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {candidate.appliedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {candidate.rating}
                      </span>
                      <div className="ml-1 flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(candidate.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Shortlist
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Reject
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
            Candidate Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Candidates:</span>
              <span className="text-sm font-medium text-gray-900">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">New Applications:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">In Review:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Shortlisted:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Interviewed:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Candidates
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Mike Chen
              </span>
              <span className="text-sm text-gray-500">4.8★</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Sarah Johnson
              </span>
              <span className="text-sm text-gray-500">4.5★</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Emily Davis
              </span>
              <span className="text-sm text-gray-500">4.2★</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              Add New Candidate
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
              Review Applications
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

export default CandidatesPage;
