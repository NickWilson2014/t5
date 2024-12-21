import React from 'react';
import CampaignStats from '../components/campaigns/CampaignStats';
import CampaignList from '../components/campaigns/CampaignList';

const Campaigns = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <p className="text-gray-600 mt-1">Create and manage your email campaigns.</p>
      </div>
      
      <CampaignStats />
      <CampaignList />
    </div>
  );
};

export default Campaigns;