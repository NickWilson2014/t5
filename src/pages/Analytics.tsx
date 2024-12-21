import React from 'react';
import AnalyticsCharts from '../components/analytics/AnalyticsCharts';

const Analytics = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your campaign performance and engagement metrics.</p>
      </div>
      
      <AnalyticsCharts />
    </div>
  );
};

export default Analytics;