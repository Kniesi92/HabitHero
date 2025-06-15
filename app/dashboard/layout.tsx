"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    const checkUserAndSetup = async () => {
      try {
        console.log("🏠 Dashboard Layout: Prüfe Benutzer...")

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (!mounted) return

        console.log("📊 Dashboard Layout Session:", { hasSession: !!session, error })

        if (error) {
          console.error("❌ Dashboard Layout Session Error:", error)
          window.location.href = "/auth"
          return
        }

        if (!session?.user) {
          console.log("👤 Dashboard Layout: Kein Benutzer - Weiterleitung")
          window.location.href = "/auth"
          return
        }

        console.log("✅ Dashboard Layout: Benutzer gefunden:", session.user.email)
        setUser(session.user)
        setLoading(false)
      } catch (error) {
        console.error("💥 Dashboard Layout Error:", error)
        if (mounted) {
          window.location.href = "/auth"
        }
      }
    }

    checkUserAndSetup()

    // Auth State Changes überwachen
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return

      console.log("🔄 Dashboard Layout Auth Change:", event, !!session)

      if (event === "SIGNED_OUT" || !session) {
        console.log("👋 Benutzer abgemeldet - Weiterleitung")
        window.location.href = "/auth"
      } else if (event === "SIGNED_IN" && session) {
        console.log("👋 Benutzer angemeldet:", session.user.email)
        setUser(session.user)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Dashboard wird geladen...</p>
          <p className="text-sm text-gray-500 mt-1">Benutzer wird authentifiziert...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Weiterleitung zur Anmeldung...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <div className="flex flex-col md:flex-row">
        <aside className="md:w-64 order-2 md:order-1">
          <Navigation />
        </aside>
        <main className="flex-1 order-1 md:order-2">
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
