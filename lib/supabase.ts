import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

/**
 * Central place for all Supabase access in the app.
 *
 * - `supabase`  – a browser-side singleton (recommended for Client Components)
 * - `createClient` – factory to create a fresh client (SSR / API Routes)
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

/* -------------------------------------------------------------------------- */
/*  Factory: always returns a NEW Supabase client                              */
/* -------------------------------------------------------------------------- */
export function createClient(): SupabaseClient {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: typeof window !== "undefined", // only persist in browser
    },
  })
}

/* -------------------------------------------------------------------------- */
/*  Singleton for the browser – avoids the “GoTrueClient instances” warning   */
/* -------------------------------------------------------------------------- */
let _supabase: SupabaseClient | undefined

export const supabase =
  _supabase ??
  ((): SupabaseClient => {
    _supabase = createClient()
    return _supabase
  })()
