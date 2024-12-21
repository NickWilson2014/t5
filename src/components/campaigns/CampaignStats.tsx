import React from 'react';
import { Send, Inbox, BarChart2, Clock } from 'lucide-react';

const stats = [
  { label: 'Active Campaigns', value: '8', icon: Send },
  { label: 'Total Sent', value: '12,456', icon: Inbox },
  { label: 'Avg. Open Rate', value: '45.8%', icon: BarChart2 },
  { label: 'Avg. Reply Rate', value: '12.3%', icon: Clock },
];

const CampaignStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CampaignStats;