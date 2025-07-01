import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Globaler Singleton - wird nur einmal erstellt
let globalSupabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export const createClient = () => {
  // Server-side: Immer neue Instanz
  if (typeof window === "undefined") {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  }

  // Browser: Strikt ein Singleton
  if (!globalSupabaseInstance) {
    console.log("🔧 Erstelle einmalige Supabase-Instanz")
    globalSupabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "habitHero-auth-final",
        flowType: "pkce",
      },
    })
  }

  return globalSupabaseInstance
}

// Legacy support
export const useSupabaseClient = createClient
