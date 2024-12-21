import React from 'react';
import CampaignForm from '../components/campaigns/CampaignForm';

const NewCampaign = () => {
  const handleClose = () => {
    window.location.hash = '#campaigns';
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <CampaignForm onClose={handleClose} />
      </div>
    </div>
  );
};

export default NewCampaign;