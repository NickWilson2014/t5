import { supabase } from './supabase';
import type { ContactStats } from '../types';

export async function getContactStats(): Promise<ContactStats> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to view contact stats');

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { data: totalContacts, error: totalError } = await supabase
    .from('contacts')
    .select('id', { count: 'exact' });

  if (totalError) throw totalError;

  const { data: newContacts, error: newError } = await supabase
    .from('contacts')
    .select('id', { count: 'exact' })
    .gte('created_at', firstDayOfMonth);

  if (newError) throw newError;

  const { data: activeContacts, error: activeError } = await supabase
    .from('contacts')
    .select('id', { count: 'exact' })
    .eq('status', 'active');

  if (activeError) throw activeError;

  const { data: needsFollowup, error: followupError } = await supabase
    .from('contacts')
    .select('id', { count: 'exact' })
    .is('last_contacted', null)
    .eq('status', 'active');

  if (followupError) throw followupError;

  return {
    total: totalContacts.length,
    newThisMonth: newContacts.length,
    active: activeContacts.length,
    needsFollowup: needsFollowup.length
  };
}