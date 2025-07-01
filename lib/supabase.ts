import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Singleton-Instanz für Browser
let browserClient: ReturnType<typeof createSupabaseClient> | null = null

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

  // Browser-side: Singleton
  if (!browserClient) {
    console.log("🔧 Erstelle Supabase Browser-Client")

    browserClient = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
        storageKey: "habitHero-auth",
      },
    })
  }

  return browserClient
}
