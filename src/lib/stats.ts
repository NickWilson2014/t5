import { supabase } from './supabase';
import type { Stats } from '../types';

export async function getDashboardStats(): Promise<Stats> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to view stats');

  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', user.id);

  if (error) throw error;

  // Only count active campaigns
  const activeCampaigns = campaigns?.filter(c => c.status === 'active') || [];
  
  // Sum all sent emails
  const totalEmails = campaigns?.reduce((sum, c) => sum + (c.sent_emails || 0), 0) || 0;
  
  // Calculate averages only from campaigns that have sent emails
  const campaignsWithEmails = campaigns?.filter(c => c.sent_emails > 0) || [];
  const avgOpenRate = campaignsWithEmails.length > 0
    ? campaignsWithEmails.reduce((sum, c) => sum + (c.open_rate || 0), 0) / campaignsWithEmails.length
    : 0;
  const avgReplyRate = campaignsWithEmails.length > 0
    ? campaignsWithEmails.reduce((sum, c) => sum + (c.reply_rate || 0), 0) / campaignsWithEmails.length
    : 0;

  return {
    totalCampaigns: activeCampaigns.length,
    totalEmails,
    averageOpenRate: Number(avgOpenRate.toFixed(1)),
    averageReplyRate: Number(avgReplyRate.toFixed(1))
  };
}