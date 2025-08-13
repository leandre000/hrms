import React from "react";

const HiringPipelinePage: React.FC = () => {
  const pipelineStages = [
    {
      stage: "Applied",
      count: 12,
      candidates: [
        {
          name: "Alex Rodriguez",
          position: "Data Analyst",
          appliedDate: "2024-01-14",
        },
        {
          name: "Lisa Wang",
          position: "Frontend Developer",
          appliedDate: "2024-01-13",
        },
        {
          name: "Tom Brown",
          position: "Product Manager",
          appliedDate: "2024-01-12",
        },
      ],
    },
    {
      stage: "In Review",
      count: 8,
      candidates: [
        {
          name: "Sarah Johnson",
          position: "Senior Developer",
          appliedDate: "2024-01-10",
        },
        {
          name: "David Kim",
          position: "UX Designer",
          appliedDate: "2024-01-09",
        },
      ],
    },
    {
      stage: "Shortlisted",
      count: 5,
      candidates: [
        {
          name: "Emily Davis",
          position: "UX Designer",
          appliedDate: "2024-01-12",
        },
        {
          name: "James Wilson",
          position: "Backend Developer",
          appliedDate: "2024-01-08",
        },
      ],
    },
    {
      stage: "Interviewed",
      count: 3,
      candidates: [
        {
          name: "Mike Chen",
          position: "Product Manager",
          appliedDate: "2024-01-08",
        },
      ],
    },
    {
      stage: "Offer",
      count: 2,
      candidates: [
        {
          name: "Maria Garcia",
          position: "DevOps Engineer",
          appliedDate: "2024-01-05",
        },
      ],
    },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Applied":
        return "bg-blue-500";
      case "In Review":
        return "bg-yellow-500";
      case "Shortlisted":
        return "bg-green-500";
      case "Interviewed":
        return "bg-purple-500";
      case "Offer":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hiring Pipeline</h1>
        <p className="text-gray-600">
          Track candidates through the hiring process
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Candidate
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Pipeline
          </button>
        </div>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Positions</option>
            <option>Senior Developer</option>
            <option>Product Manager</option>
            <option>UX Designer</option>
            <option>Data Analyst</option>
          </select>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Pipeline Overview
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {pipelineStages.map((stage) => (
            <div
              key={stage.stage}
              className="bg-white p-4 rounded-lg shadow-sm border text-center"
            >
              <div
                className={`w-3 h-3 rounded-full mx-auto mb-2 ${getStageColor(
                  stage.stage
                )}`}
              ></div>
              <h3 className="text-sm font-medium text-gray-900">
                {stage.stage}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{stage.count}</p>
              <p className="text-xs text-gray-500">candidates</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-5 gap-6">
        {pipelineStages.map((stage) => (
          <div
            key={stage.stage}
            className="bg-white rounded-lg shadow-sm border"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {stage.stage}
                </h3>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                  {stage.count}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {stage.candidates.map((candidate, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {candidate.position}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Applied: {candidate.appliedDate}
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        View
                      </button>
                      <button className="text-xs text-green-600 hover:text-green-800">
                        Move
                      </button>
                    </div>
                  </div>
                ))}
                {stage.count === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No candidates</p>
                  </div>
                )}
                <button className="w-full text-center py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  + Add Candidate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Metrics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pipeline Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Candidates:</span>
              <span className="text-sm font-medium text-gray-900">30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Conversion Rate:</span>
              <span className="text-sm font-medium text-gray-900">16.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg. Time to Hire:</span>
              <span className="text-sm font-medium text-gray-900">18 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Open Positions:</span>
              <span className="text-sm font-medium text-gray-900">4</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="text-sm">
              <div className="text-gray-900">
                Sarah Johnson moved to In Review
              </div>
              <div className="text-gray-500">2 hours ago</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-900">Mike Chen completed interview</div>
              <div className="text-gray-500">1 day ago</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-900">Emily Davis shortlisted</div>
              <div className="text-gray-500">2 days ago</div>
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
              Move Candidates
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
              Generate Reports
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
              Schedule Interviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringPipelinePage;
