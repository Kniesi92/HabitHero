import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// GLOBALER Singleton - überlebt Hot Reloads
declare global {
  var __supabase: ReturnType<typeof createSupabaseClient> | undefined
}

export function createClient() {
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

  // Browser-side: Globaler Singleton (überlebt Hot Reloads)
  if (!globalThis.__supabase) {
    console.log("🔧 Erstelle GLOBALEN Supabase-Client")

    globalThis.__supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
        storageKey: "habitHero-auth",
      },
    })

    // Debug-Info
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Globaler Supabase-Client erstellt")
    }
  }

  return globalThis.__supabase
}
