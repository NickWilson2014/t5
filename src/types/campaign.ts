export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed';

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  target_list: string;
  sent_emails: number;
  open_rate: number;
  reply_rate: number;
  created_at: string;
}

export interface CreateCampaignData {
  name: string;
  target_list: string;
}