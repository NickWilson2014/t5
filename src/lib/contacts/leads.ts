import type { Lead, Contact } from '../../types';
import { createContact, createContacts } from './create';

export async function addLeadToContacts(lead: Lead): Promise<Contact> {
  const contact: Omit<Contact, 'id' | 'lastContacted'> = {
    name: `${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
    email: lead.email || '',
    phone: '',
    company: lead.company || '',
    location: lead.location || '',
    status: 'active'
  };

  return createContact(contact);
}

export async function addLeadsToContacts(leads: Lead[]): Promise<Contact[]> {
  const contacts = leads.map(lead => ({
    name: `${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
    email: lead.email || '',
    phone: '',
    company: lead.company || '',
    location: lead.location || '',
    status: 'active'
  }));

  return createContacts(contacts);
}