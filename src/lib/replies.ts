import { supabase } from './supabase';
import type { EmailReply } from '../types';

export async function getReplies(): Promise<EmailReply[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to view replies');

  const { data, error } = await supabase
    .from('email_replies')
    .select(`
      *,
      campaign:campaigns(name)
    `)
    .eq('user_id', user.id)
    .order('received_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function markAsRead(id: string) {
  const { error } = await supabase
    .from('email_replies')
    .update({ read: true })
    .eq('id', id);

  if (error) throw error;
}

export async function archiveReply(id: string) {
  const { error } = await supabase
    .from('email_replies')
    .update({ archived: true })
    .eq('id', id);

  if (error) throw error;
}

export async function sendReply(replyId: string, content: string) {
  // In a real application, this would integrate with an email service
  console.log('Sending reply:', { replyId, content });
  return Promise.resolve();
}