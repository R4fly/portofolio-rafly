export type UserRole = 'admin' | 'client' | 'guest';
export type BookingType = 'web_consultation' | 'guitar_session';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  company_name: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  tech_stack: string[];
  live_url: string | null;
  repository_url: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface Track {
  id: string;
  title: string;
  genre: string | null;
  audio_url: string;
  duration: number | null;
  waveform_data: number[] | null;
  created_at: string;
}

export interface LiveStat {
  id: string;
  metric_key: string;
  metric_value: number;
  updated_at: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  is_approved: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  client_id: string | null;
  client_name: string;
  client_email: string;
  booking_type: BookingType;
  scheduled_at: string;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  is_read: boolean;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}