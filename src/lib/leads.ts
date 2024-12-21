import { supabase } from './supabase';
import type { Lead, LeadFilters } from '../types/lead';

export async function searchLeads(filters: LeadFilters): Promise<Lead[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to search leads');

  let query = supabase
    .from('leads')
    .select()
    .eq('user_id', user.id);

  // Apply filters
  if (filters.jobTitle) {
    query = query.ilike('job_title', `%${filters.jobTitle}%`);
  }
  if (filters.company) {
    query = query.ilike('company', `%${filters.company}%`);
  }
  if (filters.industry) {
    query = query.ilike('industry', `%${filters.industry}%`);
  }
  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  if (filters.companySize) {
    query = query.eq('company_size', filters.companySize);
  }
  if (filters.country) {
    query = query.eq('country', filters.country);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to save leads');

  const { data, error } = await supabase
    .from('leads')
    .insert([{ ...lead, user_id: user.id }])
    .select()
    .single();

  if (error) throw error;
  return data;
}