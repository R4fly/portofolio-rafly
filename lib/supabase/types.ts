// Auto-generated type definitions for Supabase
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'admin' | 'client' | 'guest';
          company_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'client' | 'guest';
          company_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'client' | 'guest';
          company_name?: string | null;
          created_at?: string;
        };
      };
      projects: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          thumbnail_url?: string | null;
          tech_stack?: string[];
          live_url?: string | null;
          repository_url?: string | null;
          is_featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          thumbnail_url?: string | null;
          tech_stack?: string[];
          live_url?: string | null;
          repository_url?: string | null;
          is_featured?: boolean;
          created_at?: string;
        };
      };
      tracks: {
        Row: {
          id: string;
          title: string;
          genre: string | null;
          audio_url: string;
          duration: number | null;
          waveform_data: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          genre?: string | null;
          audio_url: string;
          duration?: number | null;
          waveform_data?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          genre?: string | null;
          audio_url?: string;
          duration?: number | null;
          waveform_data?: Json | null;
          created_at?: string;
        };
      };
      live_stats: {
        Row: {
          id: string;
          metric_key: string;
          metric_value: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          metric_key: string;
          metric_value?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          metric_key?: string;
          metric_value?: number;
          updated_at?: string;
        };
      };
      guestbook: {
        Row: {
          id: string;
          name: string;
          message: string;
          is_approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          message: string;
          is_approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          message?: string;
          is_approved?: boolean;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          client_id: string | null;
          client_name: string;
          client_email: string;
          booking_type: 'web_consultation' | 'guitar_session';
          scheduled_at: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id?: string | null;
          client_name: string;
          client_email: string;
          booking_type: 'web_consultation' | 'guitar_session';
          scheduled_at: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string | null;
          client_name?: string;
          client_email?: string;
          booking_type?: 'web_consultation' | 'guitar_session';
          scheduled_at?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          notes?: string | null;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          message_text: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          message_text: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          message_text?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}