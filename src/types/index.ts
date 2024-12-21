// Add to existing types file
export interface EmailReply {
  id: string;
  user_id: string;
  campaign_id: string | null;
  from_email: string;
  subject: string;
  content: string;
  received_at: string;
  read: boolean;
  archived: boolean;
  created_at: string;
  campaign?: {
    name: string;
  };
}