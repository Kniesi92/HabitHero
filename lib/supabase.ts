import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Singleton-Instanz - wird nur einmal erstellt
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export const createClient = () => {
  // Wenn bereits eine Instanz existiert, verwende sie
  if (supabaseInstance) {
    return supabaseInstance
  }

  console.log("🆕 Erstelle EINMALIG Supabase Client")

  // Erstelle die Instanz nur einmal
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "habitHero-auth-final",
    },
  })

  return supabaseInstance
}

// Hook für React-Komponenten
export const useSupabaseClient = () => {
  return createClient()
}

// Server-side client
export const createServerClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseServiceKey) {
    throw new Error("Missing Supabase service role key")
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
