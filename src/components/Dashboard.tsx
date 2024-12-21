import React from 'react';
import { BarChart2, Users, Mail, TrendingUp } from 'lucide-react';
import type { Stats, Campaign } from '../types';

const mockStats: Stats = {
  totalCampaigns: 12,
  totalEmails: 2500,
  averageOpenRate: 45.8,
  averageReplyRate: 12.3,
};

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Outreach',
    status: 'active',
    sentEmails: 450,
    openRate: 48.2,
    replyRate: 15.6,
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    name: 'Product Launch',
    status: 'completed',
    sentEmails: 1200,
    openRate: 52.1,
    replyRate: 18.4,
    createdAt: '2024-03-08',
  },
  {
    id: '3',
    name: 'Follow-up Series',
    status: 'draft',
    sentEmails: 0,
    openRate: 0,
    replyRate: 0,
    createdAt: '2024-03-12',
  },
];

const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
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

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your campaigns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Mail} label="Total Campaigns" value={mockStats.totalCampaigns} />
        <StatCard icon={Users} label="Total Emails Sent" value={mockStats.totalEmails.toLocaleString()} />
        <StatCard icon={BarChart2} label="Avg. Open Rate" value={`${mockStats.averageOpenRate}%`} />
        <StatCard icon={TrendingUp} label="Avg. Reply Rate" value={`${mockStats.averageReplyRate}%`} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Recent Campaigns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reply Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{new Date(campaign.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                        campaign.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.sentEmails.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.openRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.replyRate}%
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

export default Dashboard;