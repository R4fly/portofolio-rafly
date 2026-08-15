// API Request/Response Types

export interface ContactFormRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BookingFormRequest {
  client_name: string;
  client_email: string;
  booking_type: 'web_consultation' | 'guitar_session';
  scheduled_at: string;
  notes?: string;
}

export interface GuestbookRequest {
  name: string;
  message: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RealtimeStatsResponse {
  github_commits: number;
  hours_practiced: number;
  projects_active: number;
  lines_of_code: number;
  updated_at: string;
}