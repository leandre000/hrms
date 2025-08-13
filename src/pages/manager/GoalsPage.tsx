import React from 'react';

const GoalsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Goals</h1>
        <p className="text-gray-600">Set, track, and manage team goals and objectives</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Team Goals Management</h3>
        <p className="text-gray-600">This page will contain goal setting tools and progress tracking for team members.</p>
      </div>
    </div>
  );
};

export default GoalsPage;
