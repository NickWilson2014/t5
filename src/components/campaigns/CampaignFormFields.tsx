import React from 'react';
import type { CreateCampaignData } from '../../types/campaign';

interface Props {
  formData: CreateCampaignData;
  onChange: (data: Partial<CreateCampaignData>) => void;
}

const CampaignFormFields: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Campaign Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Q2 Sales Outreach"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target List
        </label>
        <select 
          required
          value={formData.target_list}
          onChange={(e) => onChange({ target_list: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Contacts</option>
          <option value="uncontacted">Uncontacted Leads</option>
          <option value="followup">Need Follow-up</option>
        </select>
      </div>
    </div>
  );
};

export default React.memo(CampaignFormFields);