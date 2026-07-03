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
        Relationships: [
          {
            foreignKeyName: 'introductions_sender_id_fkey'
            columns: ['sender_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'introductions_receiver_id_fkey'
            columns: ['receiver_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'cities_country_id_fkey'
            columns: ['country_id']
            referencedRelation: 'countries'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'compatibility_profiles_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'family_details_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'matches_user_a_id_fkey'
            columns: ['user_a_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'matches_user_b_id_fkey'
            columns: ['user_b_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'matches_action_by_id_fkey'
            columns: ['action_by_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'memberships_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'messages_match_id_fkey'
            columns: ['match_id']
            referencedRelation: 'matches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'messages_sender_id_fkey'
            columns: ['sender_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'notifications_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'payments_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'preferences_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'profile_completion_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'profile_media_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'profile_views_viewer_id_fkey'
            columns: ['viewer_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_views_viewed_id_fkey'
            columns: ['viewed_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'profiles_city_id_fkey'
            columns: ['city_id']
            referencedRelation: 'cities'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_country_id_fkey'
            columns: ['country_id']
            referencedRelation: 'countries'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_profession_id_fkey'
            columns: ['profession_id']
            referencedRelation: 'professions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_religion_id_fkey'
            columns: ['religion_id']
            referencedRelation: 'religions'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'search_history_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: 'verification_documents_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
      }
      saved_profiles: {
        Row: {
          id: string
          user_id: string
          saved_profile_id: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          saved_profile_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          saved_profile_id?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'saved_profiles_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'saved_profiles_saved_profile_id_fkey'
            columns: ['saved_profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
      }
    }
    Views: {
      // Dummy entry prevents Supabase from resolving table operations to `never`
      // when no real views exist in the database
      _placeholder: {
        Row: { id: string }
        Insert: { id?: string }
        Update: { id?: string }
        Relationships: []
      }
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
      // Dummy entry prevents Supabase from resolving table operations to `never`
      // when no real composite types exist in the database
      _placeholder: {
        id: string
      }
    }
  }
}
