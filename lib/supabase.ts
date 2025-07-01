import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Globale Variable für den Client
let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null

export const createClient = () => {
  // Server-side: Immer neue Instanz (SSR)
  if (typeof window === "undefined") {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  }

  // Browser: Strikt nur EINE Instanz
  if (supabaseClient === null) {
    console.log("🔧 Erstelle EINMALIGE Supabase-Instanz")
    supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "habitHero-auth-singleton",
        flowType: "pkce",
      },
    })

    // Debug: Instanz-Tracking
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Supabase Client erstellt:", supabaseClient)
      // @ts-ignore - Für Debug-Zwecke
      window.__supabaseClient = supabaseClient
    }
  }

  return supabaseClient
}

// Legacy support entfernen
export const useSupabaseClient = createClient
