import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Globaler Client - nur EINE Instanz pro Browser
let globalSupabaseClient: ReturnType<typeof createSupabaseClient> | null = null

export const createClient = () => {
  // Wenn bereits ein Client existiert, verwende ihn
  if (globalSupabaseClient) {
    return globalSupabaseClient
  }

  // Erstelle nur EINMAL einen neuen Client
  globalSupabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "habitHero-auth",
    },
  })

  return globalSupabaseClient
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

// Default export - verwende den globalen Client
export default createClient()
