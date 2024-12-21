import React from 'react';
import { TrendingUp, Users, Mail, MessageCircle } from 'lucide-react';

const metrics = [
  {
    label: 'Email Open Rate',
    value: '45.8%',
    trend: '+5.2%',
    positive: true,
    icon: Mail,
  },
  {
    label: 'Reply Rate',
    value: '12.3%',
    trend: '+2.1%',
    positive: true,
    icon: MessageCircle,
  },
  {
    label: 'Active Contacts',
    value: '1,234',
    trend: '-3.4%',
    positive: false,
    icon: Users,
  },
  {
    label: 'Engagement Score',
    value: '8.7',
    trend: '+0.5',
    positive: true,
    icon: TrendingUp,
  },
];

const AnalyticsCharts = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-50 rounded-lg">
                <metric.icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
              <p className="text-2xl font-semibold mt-1">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder - Campaign metrics over time
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Engagement Trends</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder - Engagement metrics visualization
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;