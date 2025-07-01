import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Singleton pattern to avoid multiple instances
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  // Server-side: always create new instance
  if (typeof window === "undefined") {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  }

  // Client-side: use singleton
  if (!supabaseInstance) {
    console.log("🔧 Creating Supabase singleton instance")
    supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    })
  }

  return supabaseInstance
}

/* -------------------------------------------------------------------------- */
/*  Browser-side singleton – prevents multiple GoTrueClient warnings          */
/* -------------------------------------------------------------------------- */
import type { SupabaseClient } from "@supabase/supabase-js"

let _supabaseSingleton: SupabaseClient | undefined

export const supabase: SupabaseClient =
  typeof window === "undefined"
    ? createClient() // fresh client during SSR
    : (_supabaseSingleton ?? (_supabaseSingleton = createClient()))
