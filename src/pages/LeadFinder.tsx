import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { searchLeads } from '../lib/leads';
import { addLeadToContacts, addLeadsToContacts } from '../lib/contacts';
import { useTokens } from '../hooks/useTokens';
import { useTokens as useTokenFeature } from '../lib/tokens';
import type { Lead, LeadFilters } from '../types/lead';
import LeadFinderFilters from '../components/leads/LeadFinderFilters';
import LeadList from '../components/leads/LeadList';
import TokenBalance from '../components/tokens/TokenBalance';
import PurchaseTokensModal from '../components/tokens/PurchaseTokensModal';
import LeadActions from '../components/leads/LeadActions';

const TOKENS_PER_SEARCH = 10;

const LeadFinder = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingContacts, setSavingContacts] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<LeadFilters>({});
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { balance, loading: loadingTokens, refresh: refreshTokens } = useTokens();

  const handleSearch = async () => {
    if (!balance || balance.balance < TOKENS_PER_SEARCH) {
      setShowPurchaseModal(true);
      return;
    }

    try {
      setLoading(true);
      setError('');
      await useTokenFeature(TOKENS_PER_SEARCH, 'lead_finder');
      const results = await searchLeads(filters);
      setLeads(results);
      refreshTokens();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search leads');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToContacts = async (lead?: Lead) => {
    if (!lead) return;
    try {
      setSavingContacts(true);
      await addLeadToContacts(lead);
      // Show success message or update UI
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add lead to contacts');
    } finally {
      setSavingContacts(false);
    }
  };

  const handleAddAllToContacts = async () => {
    try {
      setSavingContacts(true);
      await addLeadsToContacts(leads);
      // Show success message or update UI
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add leads to contacts');
    } finally {
      setSavingContacts(false);
    }
  };

  const handleFilterChange = (newFilters: LeadFilters) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    const csv = leads.map(lead => ({
      'First Name': lead.first_name,
      'Last Name': lead.last_name,
      'Email': lead.email,
      'Job Title': lead.job_title,
      'Company': lead.company,
      'Industry': lead.industry,
      'Location': lead.location,
      'LinkedIn': lead.linkedin_url
    }));

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      Object.keys(csv[0]).join(',') + '\n' +
      csv.map(row => Object.values(row).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'leads.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Finder</h1>
            <p className="text-gray-600 mt-1">
              Search and filter potential leads based on various criteria.
            </p>
          </div>
          {!loadingTokens && (
            <TokenBalance
              balance={balance?.balance || 0}
              onPurchase={() => setShowPurchaseModal(true)}
            />
          )}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Each search costs {TOKENS_PER_SEARCH} tokens
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          {leads.length > 0 && (
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleExport}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Results
                </button>
                <LeadActions
                  leads={leads}
                  onAddToContacts={handleAddToContacts}
                  onAddAllToContacts={handleAddAllToContacts}
                  disabled={savingContacts}
                />
              </div>
            </div>
          )}

          <LeadFinderFilters
            filters={filters}
            onChange={handleFilterChange}
            onSearch={handleSearch}
          />
        </div>

        {error ? (
          <div className="p-6">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          </div>
        ) : (
          <LeadList 
            leads={leads} 
            loading={loading} 
            onAddToContacts={handleAddToContacts}
            disabled={savingContacts}
          />
        )}
      </div>

      {showPurchaseModal && (
        <PurchaseTokensModal
          onClose={() => setShowPurchaseModal(false)}
          onSuccess={refreshTokens}
        />
      )}
    </div>
  );
};

export default LeadFinder;