import React from 'react';
import { UserPlus, Users } from 'lucide-react';
import type { Lead } from '../../types/lead';

interface Props {
  lead?: Lead;
  leads?: Lead[];
  onAddToContacts: (lead?: Lead) => void;
  onAddAllToContacts?: () => void;
  disabled?: boolean;
}

const LeadActions: React.FC<Props> = ({ 
  lead, 
  leads, 
  onAddToContacts, 
  onAddAllToContacts,
  disabled 
}) => {
  if (lead) {
    return (
      <button
        onClick={() => onAddToContacts(lead)}
        disabled={disabled}
        className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
        title="Add to Contacts"
      >
        <UserPlus className="w-5 h-5" />
      </button>
    );
  }

  if (leads?.length) {
    return (
      <button
        onClick={onAddAllToContacts}
        disabled={disabled}
        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2"
      >
        <Users className="w-4 h-4" />
        Add All to Contacts
      </button>
    );
  }

  return null;
};

export default LeadActions;