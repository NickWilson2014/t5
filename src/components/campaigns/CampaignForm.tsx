import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { createCampaign } from '../../lib/campaigns';
import type { CreateCampaignData } from '../../types/campaign';
import CampaignFormFields from './CampaignFormFields';

type Props = {
  onClose: () => void;
};

const CampaignForm = ({ onClose }: Props) => {
  const [formData, setFormData] = useState<CreateCampaignData>({
    name: '',
    target_list: 'all'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const campaign = await createCampaign(formData);
      window.location.hash = `#campaign/${campaign.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create campaign');
      setLoading(false);
    }
  };

  const handleChange = (updates: Partial<CreateCampaignData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Create New Campaign</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <CampaignFormFields formData={formData} onChange={handleChange} />

        <div className="flex items-center gap-3 pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;