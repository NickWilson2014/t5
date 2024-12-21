import React, { useState, useEffect } from 'react';
import { MoreVertical, Play, Pause, Trash2 } from 'lucide-react';
import { getCampaigns, pauseCampaign, deleteCampaign, restartCampaign } from '../../lib/campaigns';
import type { Campaign } from '../../types';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handlePauseCampaign = async (id: string) => {
    try {
      await pauseCampaign(id);
      loadCampaigns();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to pause campaign');
    }
  };

  const handleRestartCampaign = async (id: string) => {
    try {
      await restartCampaign(id);
      loadCampaigns();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restart campaign');
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    
    try {
      await deleteCampaign(id);
      loadCampaigns();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete campaign');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Active Campaigns</h2>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="divide-y divide-gray-100">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Active Campaigns</h2>
        <button 
          onClick={() => window.location.hash = '#new-campaign'}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Campaign
        </button>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50">
          {error}
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {campaigns.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No campaigns yet. Create your first campaign to get started!
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : campaign.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : campaign.status === 'paused'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Created on {new Date(campaign.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {campaign.status === 'active' ? (
                    <button 
                      onClick={() => handlePauseCampaign(campaign.id)}
                      className="p-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-gray-100"
                      title="Pause Campaign"
                    >
                      <Pause className="w-5 h-5" />
                    </button>
                  ) : campaign.status === 'paused' ? (
                    <button 
                      onClick={() => handleRestartCampaign(campaign.id)}
                      className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-gray-100"
                      title="Restart Campaign"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  ) : campaign.status === 'draft' ? (
                    <button 
                      onClick={() => window.location.hash = `#campaign/${campaign.id}`}
                      className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-gray-100"
                      title="Edit Campaign"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  ) : null}
                  <button 
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100"
                    title="Delete Campaign"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-sm">
                  <span className="text-gray-600">Sent: </span>
                  <span className="font-medium">{campaign.sent_emails.toLocaleString()}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Open Rate: </span>
                  <span className="font-medium">{campaign.open_rate}%</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Reply Rate: </span>
                  <span className="font-medium">{campaign.reply_rate}%</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignList;