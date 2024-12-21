import { supabase } from './supabase';
import type { Contact, Lead } from './types';

export async function createContact(contact: Omit<Contact, 'id' | 'lastContacted'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to create contacts');

  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      ...contact,
      user_id: user.id,
      last_contacted: null
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createContacts(contacts: Omit<Contact, 'id' | 'lastContacted'>[]) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to create contacts');

  const { data, error } = await supabase
    .from('contacts')
    .insert(
      contacts.map(contact => ({
        ...contact,
        user_id: user.id,
        last_contacted: null
      }))
    )
    .select();

  if (error) throw error;
  return data;
}

export async function getContacts(): Promise<Contact[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to view contacts');

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

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