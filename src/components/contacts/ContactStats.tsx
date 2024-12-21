import React, { useState, useEffect } from 'react';
import { Users, UserPlus, UserCheck, Clock } from 'lucide-react';
import { getContactStats } from '../../lib/contactStats';
import type { ContactStats as ContactStatsType } from '../../types';

const ContactStats = () => {
  const [stats, setStats] = useState<ContactStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getContactStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

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

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg mb-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const statItems = [
    { label: 'Total Contacts', value: stats?.total.toString() || '0', icon: Users },
    { label: 'New This Month', value: stats?.newThisMonth.toString() || '0', icon: UserPlus },
    { label: 'Active Contacts', value: stats?.active.toString() || '0', icon: UserCheck },
    { label: 'Needs Follow-up', value: stats?.needsFollowup.toString() || '0', icon: Clock },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((stat) => (
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
};

export default ContactStats;