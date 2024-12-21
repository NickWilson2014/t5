import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Send, Plus, Trash2 } from 'lucide-react';
import { getCampaign, startCampaign } from '../lib/campaigns';
import { getSequences, createSequence, updateSequence, deleteSequence } from '../lib/sequences';
import type { Campaign } from '../types/campaign';
import type { EmailSequence, CreateSequenceData } from '../lib/sequences';
import EmailContentEditor from '../components/email/EmailContentEditor';

interface Props {
  id: string;
}

const CampaignDetail: React.FC<Props> = ({ id }) => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCampaign = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const campaignData = await getCampaign(id);
      const sequencesData = await getSequences(id);
      setCampaign(campaignData);
      setSequences(sequencesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load campaign');
      setCampaign(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCampaign();
  }, [loadCampaign]);

  const handleStartCampaign = async () => {
    if (!campaign) return;
    try {
      await startCampaign(campaign.id);
      loadCampaign();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start campaign');
    }
  };

  const handleAddSequence = async () => {
    if (!campaign) return;
    try {
      const newSequence: CreateSequenceData = {
        subject: '',
        content: '',
        delayDays: 1,
        sequenceOrder: sequences.length + 1
      };
      await createSequence(campaign.id, newSequence);
      loadCampaign();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add sequence');
    }
  };

  const handleUpdateSequence = async (id: string, updates: Partial<CreateSequenceData>) => {
    try {
      await updateSequence(id, updates);
      loadCampaign();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update sequence');
    }
  };

  const handleDeleteSequence = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sequence?')) return;
    try {
      await deleteSequence(id);
      loadCampaign();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete sequence');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="p-8">
        <button
          onClick={() => window.location.hash = '#campaigns'}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </button>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error || 'Campaign not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => window.location.hash = '#campaigns'}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
            <p className="text-gray-600 mt-1">
              Created on {new Date(campaign.created_at).toLocaleDateString()}
            </p>
          </div>

          {campaign.status === 'draft' && (
            <button
              onClick={handleStartCampaign}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Start Campaign
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {sequences.map((sequence, index) => (
          <div key={sequence.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Email {index + 1}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteSequence(sequence.id)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={sequence.subject}
                    onChange={(e) => handleUpdateSequence(sequence.id, { subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Send After (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={sequence.delayDays}
                    onChange={(e) => handleUpdateSequence(sequence.id, { delayDays: parseInt(e.target.value) })}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <EmailContentEditor
                  value={sequence.content}
                  onChange={(content) => handleUpdateSequence(sequence.id, { content })}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddSequence}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Follow-up Email
        </button>
      </div>
    </div>
  );
};

export default CampaignDetail;