import React from 'react';
import { Mail, Building2, MapPin, LinkedinIcon, ExternalLink } from 'lucide-react';
import type { Lead } from '../../types/lead';
import LeadActions from './LeadActions';

interface Props {
  leads: Lead[];
  loading?: boolean;
  onAddToContacts?: (lead: Lead) => void;
  disabled?: boolean;
}

const LeadList: React.FC<Props> = ({ leads, loading, onAddToContacts, disabled }) => {
  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No leads found matching your criteria.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {leads.map((lead) => (
        <div key={lead.id} className="p-6 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {lead.first_name} {lead.last_name}
              </h3>
              <p className="text-gray-600">{lead.job_title}</p>
            </div>
            <div className="flex items-center gap-2">
              {onAddToContacts && (
                <LeadActions 
                  lead={lead} 
                  onAddToContacts={onAddToContacts}
                  disabled={disabled}
                />
              )}
              {lead.linkedin_url && (
                <a
                  href={lead.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              )}
              {lead.website && (
                <a
                  href={lead.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {lead.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{lead.email}</span>
              </div>
            )}
            {lead.company && (
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">
                  {lead.company}
                  {lead.industry && ` • ${lead.industry}`}
                </span>
              </div>
            )}
            {(lead.location || lead.country) && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {[lead.location, lead.country].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadList;