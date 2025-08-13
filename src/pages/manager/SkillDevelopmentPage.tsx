import React from "react";

const SkillDevelopmentPage: React.FC = () => {
  const skillData = {
    teamSkills: [
      {
        name: "React",
        category: "Frontend",
        proficiency: 85,
        teamMembers: ["Sarah Johnson", "Alex Rodriguez"],
      },
      {
        name: "Node.js",
        category: "Backend",
        proficiency: 78,
        teamMembers: ["Sarah Johnson", "Mike Chen"],
      },
      {
        name: "UX Design",
        category: "Design",
        proficiency: 92,
        teamMembers: ["Emily Davis"],
      },
      {
        name: "Data Analysis",
        category: "Analytics",
        proficiency: 88,
        teamMembers: ["Alex Rodriguez"],
      },
      {
        name: "Project Management",
        category: "Management",
        proficiency: 82,
        teamMembers: ["Mike Chen"],
      },
    ],
    skillGaps: [
      {
        skill: "DevOps",
        priority: "High",
        impact: "High",
        teamMembers: ["Sarah Johnson", "Mike Chen"],
      },
      {
        skill: "Machine Learning",
        priority: "Medium",
        impact: "Medium",
        teamMembers: ["Alex Rodriguez"],
      },
      {
        skill: "Agile Leadership",
        priority: "High",
        impact: "High",
        teamMembers: ["Mike Chen"],
      },
    ],
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "bg-blue-100 text-blue-800";
      case "Backend":
        return "bg-green-100 text-green-800";
      case "Design":
        return "bg-purple-100 text-purple-800";
      case "Analytics":
        return "bg-orange-100 text-orange-800";
      case "Management":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "text-green-600";
    if (proficiency >= 80) return "text-blue-600";
    if (proficiency >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Team Skill Development
        </h1>
        <p className="text-gray-600">
          Track and manage team skills, competencies, and development areas
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Skill Assessment
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Create Development Plan
          </button>
        </div>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Categories</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Design</option>
            <option>Analytics</option>
            <option>Management</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Proficiency Levels</option>
            <option>Expert (90-100%)</option>
            <option>Advanced (80-89%)</option>
            <option>Intermediate (70-79%)</option>
            <option>Beginner (60-69%)</option>
          </select>
        </div>
      </div>

      {/* Skill Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Skills</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Avg. Proficiency
              </p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Skill Gaps</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Skills */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Current Team Skills
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skill
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {skillData.teamSkills.map((skill) => (
                <tr key={skill.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {skill.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                        skill.category
                      )}`}
                    >
                      {skill.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className={`h-2 rounded-full ${
                            skill.proficiency >= 90
                              ? "bg-green-600"
                              : skill.proficiency >= 80
                              ? "bg-blue-600"
                              : skill.proficiency >= 70
                              ? "bg-yellow-600"
                              : "bg-red-600"
                          }`}
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-sm font-medium ${getProficiencyColor(
                          skill.proficiency
                        )}`}
                      >
                        {skill.proficiency}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {skill.teamMembers.map((member, index) => (
                        <div key={index}>{member}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Assess
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Develop
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skill Gaps */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Identified Skill Gaps
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skill
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {skillData.skillGaps.map((gap) => (
                <tr key={gap.skill} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {gap.skill}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                        gap.priority
                      )}`}
                    >
                      {gap.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                        gap.impact
                      )}`}
                    >
                      {gap.impact}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {gap.teamMembers.map((member, index) => (
                        <div key={index}>{member}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Plan Training
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Assign Mentor
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Skill Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Skills:</span>
              <span className="text-sm font-medium text-gray-900">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">High Proficiency:</span>
              <span className="text-sm font-medium text-gray-900">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Medium Proficiency:</span>
              <span className="text-sm font-medium text-gray-900">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Low Proficiency:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Development Priorities
          </h3>
          <div className="space-y-3">
            <div className="text-sm">
              <div className="text-gray-900 font-medium">DevOps Skills</div>
              <div className="text-gray-500">
                High priority for technical team
              </div>
            </div>
            <div className="text-sm">
              <div className="text-gray-900 font-medium">
                Leadership Development
              </div>
              <div className="text-gray-500">Critical for management roles</div>
            </div>
            <div className="text-sm">
              <div className="text-gray-900 font-medium">
                Advanced Analytics
              </div>
              <div className="text-gray-500">Medium priority for data team</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              Conduct Skill Assessment
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
              Create Development Plan
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
              Assign Mentors
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
              Track Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopmentPage;
