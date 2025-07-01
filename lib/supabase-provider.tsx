"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Context für den Supabase Client
const SupabaseContext = createContext<SupabaseClient | null>(null)

// Provider Component
export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => {
    console.log("🔧 Erstelle EINMALIGE Supabase-Instanz via Context")

    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "habitHero-context",
        flowType: "pkce",
      },
    })

    // Debug-Info
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Supabase Context Client erstellt")
      // @ts-ignore
      window.__supabaseContextClient = client
    }

    return client
  })

  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
}

// Hook zum Verwenden des Supabase Clients
export function useSupabase() {
  const context = useContext(SupabaseContext)

  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }

  return context
}

// Für Server-Side Rendering
export function createServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
