export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_notes: {
        Row: {
          id: string
          admin_id: string | null
          target_id: string
          target_type: string
          note: string
          created_at: string | null
        }
        Insert: {
          id?: string
          admin_id?: string | null
          target_id: string
          target_type: string
          note: string
          created_at?: string | null
        }
        Update: {
          id?: string
          admin_id?: string | null
          target_id?: string
          target_type?: string
          note?: string
          created_at?: string | null
        }
      }
      audit_logs: {
        Row: {
          id: string
          action: string
          actor_id: string | null
          target_id: string | null
          metadata: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          action: string
          actor_id?: string | null
          target_id?: string | null
          metadata?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          action?: string
          actor_id?: string | null
          target_id?: string | null
          metadata?: Json | null
          created_at?: string | null
        }
      }
      introductions: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          status: 'pending' | 'accepted' | 'rejected' | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          status?: 'pending' | 'accepted' | 'rejected' | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          status?: 'pending' | 'accepted' | 'rejected' | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      blocks: {
        Row: {
          id: string
          blocker_id: string
          blocked_id: string
          created_at: string | null
        }
        Insert: {
          id?: string
          blocker_id: string
          blocked_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          blocker_id?: string
          blocked_id?: string
          created_at?: string | null
        }
      }
      cities: {
        Row: {
          id: string
          country_id: string | null
          name: string
        }
        Insert: {
          id?: string
          country_id?: string | null
          name: string
        }
        Update: {
          id?: string
          country_id?: string | null
          name?: string
        }
      }
      compatibility_profiles: {
        Row: {
          profile_id: string
          personality_type: string | null
          values: string[] | null
          interests: string[] | null
          lifestyle: string[] | null
          relationship_goals: string | null
          updated_at: string | null
        }
        Insert: {
          profile_id: string
          personality_type?: string | null
          values?: string[] | null
          interests?: string[] | null
          lifestyle?: string[] | null
          relationship_goals?: string | null
          updated_at?: string | null
        }
        Update: {
          profile_id?: string
          personality_type?: string | null
          values?: string[] | null
          interests?: string[] | null
          lifestyle?: string[] | null
          relationship_goals?: string | null
          updated_at?: string | null
        }
      }
      countries: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      family_details: {
        Row: {
          profile_id: string
          father_occupation: string | null
          mother_occupation: string | null
          siblings_info: string | null
          family_type: string | null
          family_values: string | null
          gotra: string | null
          maternal_gotra: string | null
          grandmother_gotra: string | null
          updated_at: string | null
        }
        Insert: {
          profile_id: string
          father_occupation?: string | null
          mother_occupation?: string | null
          siblings_info?: string | null
          family_type?: string | null
          family_values?: string | null
          gotra?: string | null
          maternal_gotra?: string | null
          grandmother_gotra?: string | null
          updated_at?: string | null
        }
        Update: {
          profile_id?: string
          father_occupation?: string | null
          mother_occupation?: string | null
          siblings_info?: string | null
          family_type?: string | null
          family_values?: string | null
          gotra?: string | null
          maternal_gotra?: string | null
          grandmother_gotra?: string | null
          updated_at?: string | null
        }
      }
      matches: {
        Row: {
          id: string
          user_a_id: string
          user_b_id: string
          status: 'pending' | 'accepted' | 'rejected' | 'unmatched' | null
          action_by_id: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_a_id: string
          user_b_id: string
          status?: 'pending' | 'accepted' | 'rejected' | 'unmatched' | null
          action_by_id: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_a_id?: string
          user_b_id?: string
          status?: 'pending' | 'accepted' | 'rejected' | 'unmatched' | null
          action_by_id?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      memberships: {
        Row: {
          id: string
          profile_id: string
          tier: 'basic' | 'premium' | 'elite' | null
          starts_at: string | null
          ends_at: string | null
          is_active: boolean | null
          gateway_customer_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          tier?: 'basic' | 'premium' | 'elite' | null
          starts_at?: string | null
          ends_at?: string | null
          is_active?: boolean | null
          gateway_customer_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          tier?: 'basic' | 'premium' | 'elite' | null
          starts_at?: string | null
          ends_at?: string | null
          is_active?: boolean | null
          gateway_customer_id?: string | null
          created_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          match_id: string
          sender_id: string
          message_type: 'text' | 'image' | 'video' | 'voice' | 'system' | null
          content: string | null
          media_id: string | null
          is_active: boolean | null
          deleted_at: string | null
          read_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          match_id: string
          sender_id: string
          message_type?: 'text' | 'image' | 'video' | 'voice' | 'system' | null
          content?: string | null
          media_id?: string | null
          is_active?: boolean | null
          deleted_at?: string | null
          read_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          match_id?: string
          sender_id?: string
          message_type?: 'text' | 'image' | 'video' | 'voice' | 'system' | null
          content?: string | null
          media_id?: string | null
          is_active?: boolean | null
          deleted_at?: string | null
          read_at?: string | null
          created_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'match' | 'message' | 'verification' | 'payment' | 'membership' | 'system'
          title: string
          body: string
          is_read: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: 'match' | 'message' | 'verification' | 'payment' | 'membership' | 'system'
          title: string
          body: string
          is_read?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'match' | 'message' | 'verification' | 'payment' | 'membership' | 'system'
          title?: string
          body?: string
          is_read?: boolean | null
          created_at?: string | null
        }
      }
      otp_logs: {
        Row: {
          id: string
          email: string
          status: string
          ip: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          email: string
          status: string
          ip?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          status?: string
          ip?: string | null
          created_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          profile_id: string
          amount_cents: number
          currency: string | null
          status: string
          gateway: 'stripe' | 'razorpay' | 'apple' | 'google'
          gateway_transaction_id: string
          gateway_reference: string | null
          receipt_url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          amount_cents: number
          currency?: string | null
          status: string
          gateway: 'stripe' | 'razorpay' | 'apple' | 'google'
          gateway_transaction_id: string
          gateway_reference?: string | null
          receipt_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          amount_cents?: number
          currency?: string | null
          status?: string
          gateway?: 'stripe' | 'razorpay' | 'apple' | 'google'
          gateway_transaction_id?: string
          gateway_reference?: string | null
          receipt_url?: string | null
          created_at?: string | null
        }
      }
      preferences: {
        Row: {
          profile_id: string
          min_age: number | null
          max_age: number | null
          min_height_cm: number | null
          preferred_religions: string[] | null
          preferred_cities: string[] | null
          updated_at: string | null
        }
        Insert: {
          profile_id: string
          min_age?: number | null
          max_age?: number | null
          min_height_cm?: number | null
          preferred_religions?: string[] | null
          preferred_cities?: string[] | null
          updated_at?: string | null
        }
        Update: {
          profile_id?: string
          min_age?: number | null
          max_age?: number | null
          min_height_cm?: number | null
          preferred_religions?: string[] | null
          preferred_cities?: string[] | null
          updated_at?: string | null
        }
      }
      professions: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      profile_completion: {
        Row: {
          profile_id: string
          score: number | null
          updated_at: string | null
        }
        Insert: {
          profile_id: string
          score?: number | null
          updated_at?: string | null
        }
        Update: {
          profile_id?: string
          score?: number | null
          updated_at?: string | null
        }
      }
      profile_media: {
        Row: {
          id: string
          profile_id: string
          type: 'image' | 'video' | 'voice' | null
          bucket_path: string
          thumbnail_path: string | null
          mime_type: string | null
          size_bytes: number | null
          width: number | null
          height: number | null
          alt_text: string | null
          display_order: number
          is_primary: boolean | null
          is_verified: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          type?: 'image' | 'video' | 'voice' | null
          bucket_path: string
          thumbnail_path?: string | null
          mime_type?: string | null
          size_bytes?: number | null
          width?: number | null
          height?: number | null
          alt_text?: string | null
          display_order?: number
          is_primary?: boolean | null
          is_verified?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          type?: 'image' | 'video' | 'voice' | null
          bucket_path?: string
          thumbnail_path?: string | null
          mime_type?: string | null
          size_bytes?: number | null
          width?: number | null
          height?: number | null
          alt_text?: string | null
          display_order?: number
          is_primary?: boolean | null
          is_verified?: boolean | null
          created_at?: string | null
        }
      }
      profile_views: {
        Row: {
          id: string
          viewer_id: string | null
          viewed_id: string
          viewed_at: string | null
        }
        Insert: {
          id?: string
          viewer_id?: string | null
          viewed_id: string
          viewed_at?: string | null
        }
        Update: {
          id?: string
          viewer_id?: string | null
          viewed_id?: string
          viewed_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          gender: 'male' | 'female' | null
          date_of_birth: string | null
          height_cm: number | null
          religion_id: string | null
          profession_id: string | null
          city_id: string | null
          country_id: string | null
          bio: string | null
          verification_status: 'unverified' | 'pending' | 'verified' | 'rejected' | null
          is_paused: boolean | null
          is_active: boolean | null
          deleted_at: string | null
          created_at: string | null
          updated_at: string | null
          phone: string | null
          instagram: string | null
          education: string | null
          university: string | null
          company: string | null
          income_range: string | null
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          gender?: 'male' | 'female' | null
          date_of_birth?: string | null
          height_cm?: number | null
          religion_id?: string | null
          profession_id?: string | null
          city_id?: string | null
          country_id?: string | null
          bio?: string | null
          verification_status?: 'unverified' | 'pending' | 'verified' | 'rejected' | null
          is_paused?: boolean | null
          is_active?: boolean | null
          deleted_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          phone?: string | null
          instagram?: string | null
          education?: string | null
          university?: string | null
          company?: string | null
          income_range?: string | null
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          gender?: 'male' | 'female' | null
          date_of_birth?: string | null
          height_cm?: number | null
          religion_id?: string | null
          profession_id?: string | null
          city_id?: string | null
          country_id?: string | null
          bio?: string | null
          verification_status?: 'unverified' | 'pending' | 'verified' | 'rejected' | null
          is_paused?: boolean | null
          is_active?: boolean | null
          deleted_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          phone?: string | null
          instagram?: string | null
          education?: string | null
          university?: string | null
          company?: string | null
          income_range?: string | null
        }
      }
      religions: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          reported_id: string
          reason: string
          status: 'pending' | 'reviewing' | 'resolved' | 'dismissed' | null
          created_at: string | null
        }
        Insert: {
          id?: string
          reporter_id: string
          reported_id: string
          reason: string
          status?: 'pending' | 'reviewing' | 'resolved' | 'dismissed' | null
          created_at?: string | null
        }
        Update: {
          id?: string
          reporter_id?: string
          reported_id?: string
          reason?: string
          status?: 'pending' | 'reviewing' | 'resolved' | 'dismissed' | null
          created_at?: string | null
        }
      }
      search_history: {
        Row: {
          id: string
          user_id: string
          filters: Json
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          filters: Json
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          filters?: Json
          created_at?: string | null
        }
      }
      user_sessions: {
        Row: {
          id: string
          user_id: string
          device: string | null
          browser: string | null
          ip: string | null
          location: string | null
          last_seen: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          device?: string | null
          browser?: string | null
          ip?: string | null
          location?: string | null
          last_seen?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          device?: string | null
          browser?: string | null
          ip?: string | null
          location?: string | null
          last_seen?: string | null
          created_at?: string | null
        }
      }
      verification_documents: {
        Row: {
          id: string
          profile_id: string
          document_type: string
          bucket_path: string
          status: 'unverified' | 'pending' | 'verified' | 'rejected' | null
          submitted_at: string | null
          reviewed_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          document_type: string
          bucket_path: string
          status?: 'unverified' | 'pending' | 'verified' | 'rejected' | null
          submitted_at?: string | null
          reviewed_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          document_type?: string
          bucket_path?: string
          status?: 'unverified' | 'pending' | 'verified' | 'rejected' | null
          submitted_at?: string | null
          reviewed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      request_introduction: {
        Args: { target_user_id: string }
        Returns: { success: boolean; message?: string; error?: string }
      }
    }
    Enums: {
      gender_type: 'male' | 'female'
      verification_status: 'unverified' | 'pending' | 'verified' | 'rejected'
      match_status: 'pending' | 'accepted' | 'rejected' | 'unmatched'
      membership_tier: 'basic' | 'premium' | 'elite'
      media_type: 'image' | 'video' | 'voice'
      message_type_enum: 'text' | 'image' | 'video' | 'voice' | 'system'
      notification_type: 'match' | 'message' | 'verification' | 'payment' | 'membership' | 'system'
      report_status: 'pending' | 'reviewing' | 'resolved' | 'dismissed'
      payment_gateway_enum: 'stripe' | 'razorpay' | 'apple' | 'google'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
