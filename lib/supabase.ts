import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Client-side Supabase client
export const createClient = () => createClientComponentClient()

// Server-side Supabase client
export const createServerClient = () => createServerComponentClient({ cookies })

// Database types (erweitert später)
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
    }
  }
}
