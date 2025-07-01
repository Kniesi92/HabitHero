import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Globaler Singleton - wird im Browser-Window gespeichert
declare global {
  var __supabase_client__: ReturnType<typeof createSupabaseClient> | undefined
}

export const createClient = () => {
  // Prüfe ob bereits eine Instanz im globalen Scope existiert
  if (typeof window !== "undefined" && window.__supabase_client__) {
    console.log("🔄 Verwende existierenden Supabase Client")
    return window.__supabase_client__
  }

  console.log("🆕 Erstelle neuen Supabase Client")

  // Erstelle neuen Client
  const client = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "habitHero-auth-v2", // Neue Storage-Key um alte Sessions zu clearen
    },
  })

  // Speichere im globalen Scope (nur im Browser)
  if (typeof window !== "undefined") {
    window.__supabase_client__ = client
  }

  return client
}

// Server-side client für API Routes
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

// Default export
export default createClient()
