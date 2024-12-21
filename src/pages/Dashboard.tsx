import React, { useState, useEffect } from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentCampaigns from '../components/dashboard/RecentCampaigns';
import { getDashboardStats } from '../lib/stats';
import { getCampaigns } from '../lib/campaigns';
import { getCurrentUser } from '../lib/auth';
import type { Stats, Campaign } from '../types';

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);
        if (user) {
          loadDashboardData();
        }
      } catch (err) {
        setError('Please sign in to view your dashboard');
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsData, campaignsData] = await Promise.all([
        getDashboardStats(),
        getCampaigns()
      ]);
      setStats(statsData);
      setCampaigns(campaignsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Sign in to view your dashboard</h2>
          <button
            onClick={() => window.location.hash = '#'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your campaigns.</p>
      </div>

      {error ? (
        <div className="bg-red-50 p-4 rounded-lg mb-8">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <>
          <DashboardStats 
            stats={stats || { 
              totalCampaigns: 0, 
              totalEmails: 0, 
              averageOpenRate: 0, 
              averageReplyRate: 0 
            }} 
            loading={loading} 
          />
          <RecentCampaigns campaigns={campaigns} loading={loading} />
        </>
      )}
    </div>
  );
};