import { supabase } from './supabase';

export type EmailSequence = {
  id: string;
  subject: string;
  content: string;
  delayDays: number;
  sequenceOrder: number;
};

export type CreateSequenceData = Omit<EmailSequence, 'id'>;

export async function createSequence(campaignId: string, sequence: CreateSequenceData) {
  const { data, error } = await supabase
    .from('campaign_sequences')
    .insert([{
      campaign_id: campaignId,
      subject: sequence.subject,
      content: sequence.content,
      "delayDays": sequence.delayDays,
      "sequenceOrder": sequence.sequenceOrder,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getSequences(campaignId: string) {
  const { data, error } = await supabase
    .from('campaign_sequences')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('sequenceOrder');

  if (error) throw error;
  return data;
}

export async function updateSequence(id: string, updates: Partial<CreateSequenceData>) {
  const { data, error } = await supabase
    .from('campaign_sequences')
    .update({
      ...updates,
      "delayDays": updates.delayDays,
      "sequenceOrder": updates.sequenceOrder,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSequence(id: string) {
  const { error } = await supabase
    .from('campaign_sequences')
    .delete()
    .eq('id', id);

  if (error) throw error;
}