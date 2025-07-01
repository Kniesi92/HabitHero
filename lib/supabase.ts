import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Einfacher Client - keine Singleton-Komplexität
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "habitHero-simple",
      // Reduziere die Anzahl der Auth-Listener
      flowType: "pkce",
    },
  })
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

// -----------------------------------------------------------------------------
// React helper - keeps legacy components working
// -----------------------------------------------------------------------------
/**
 * Simple helper hook that returns a new Supabase client.
 * NOTE: Because we no longer enforce a singleton on the browser,
 * this hook is merely a thin wrapper around `createClient()`.
 * You can gradually migrate existing components to `createClient()` directly.
 */
export const useSupabaseClient = () => {
  // We intentionally create a fresh client per call; this avoids the
  // earlier multiple-instance problems created by stale singletons.
  return createClient()
}
