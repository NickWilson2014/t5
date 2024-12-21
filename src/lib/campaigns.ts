import { supabase } from './supabase';
import type { Campaign, CreateCampaignData } from '../types/campaign';

export async function createCampaign(data: CreateCampaignData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to create campaigns');

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .insert([{
      name: data.name,
      target_list: data.target_list,
      user_id: user.id,
      status: 'draft',
      subject: null,
      content: null,
      sent_emails: 0,
      open_rate: 0,
      reply_rate: 0
    }])
    .select()
    .single();

  if (error) throw error;
  return campaign;
}

export async function getCampaigns(): Promise<Campaign[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to view campaigns');

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getCampaign(id: string): Promise<Campaign> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to view campaigns');

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function startCampaign(id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to manage campaigns');

  const { data, error } = await supabase
    .from('campaigns')
    .update({ status: 'active' })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function pauseCampaign(id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to manage campaigns');

  const { data, error } = await supabase
    .from('campaigns')
    .update({ status: 'paused' })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function restartCampaign(id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to manage campaigns');

  const { data, error } = await supabase
    .from('campaigns')
    .update({ status: 'active' })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCampaign(id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to manage campaigns');

  // First delete all sequences associated with this campaign
  const { error: seqError } = await supabase
    .from('campaign_sequences')
    .delete()
    .eq('campaign_id', id);

  if (seqError) throw seqError;

  // Then delete the campaign itself
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
}