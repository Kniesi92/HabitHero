import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton-Klasse für Supabase
class SupabaseSingleton {
  private static instance: ReturnType<typeof createSupabaseClient> | null = null
  private static isInitialized = false

  public static getInstance() {
    // Server-side: Neue Instanz
    if (typeof window === "undefined") {
      return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
    }

    // Browser: Singleton
    if (!this.isInitialized || this.instance === null) {
      console.log("🔧 Initialisiere Supabase Singleton")

      this.instance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storageKey: "habitHero-singleton",
          flowType: "pkce",
        },
      })

      this.isInitialized = true

      // Debug-Info
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Supabase Singleton erstellt")
        // @ts-ignore
        window.__supabaseInstance = this.instance
      }
    }

    return this.instance
  }

  // Für Tests oder Reset
  public static reset() {
    this.instance = null
    this.isInitialized = false
  }
}

export const createClient = () => SupabaseSingleton.getInstance()
