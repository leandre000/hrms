import React from 'react';

const FeedbackPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Feedback</h1>
        <p className="text-gray-600">Manage and provide feedback to team members</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback Management</h3>
        <p className="text-gray-600">This page will contain feedback tools and performance review management.</p>
      </div>
    </div>
  );
};

export default FeedbackPage;
