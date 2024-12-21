import React from 'react';
import { BarChart2, Users, Mail, TrendingUp } from 'lucide-react';
import type { Stats } from '../../types';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
    </div>
  </div>
);

interface DashboardStatsProps {
  stats: Stats;
  loading?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="animate-pulse space-y-3">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const statItems = [
    { icon: Mail, label: 'Active Campaigns', value: stats.totalCampaigns },
    { icon: Users, label: 'Total Emails Sent', value: stats.totalEmails.toLocaleString() },
    { icon: BarChart2, label: 'Avg. Open Rate', value: `${stats.averageOpenRate}%` },
    { icon: TrendingUp, label: 'Avg. Reply Rate', value: `${stats.averageReplyRate}%` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;