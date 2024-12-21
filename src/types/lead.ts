export interface Lead {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  job_title: string | null;
  company: string | null;
  industry: string | null;
  company_size: string | null;
  location: string | null;
  country: string | null;
  linkedin_url: string | null;
  website: string | null;
  source: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface LeadFilters {
  jobTitle?: string;
  company?: string;
  industry?: string;
  location?: string;
  companySize?: string;
  country?: string;
}