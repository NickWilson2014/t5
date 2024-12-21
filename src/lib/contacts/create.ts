import { supabase } from '../supabase';
import type { Contact } from '../../types';

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