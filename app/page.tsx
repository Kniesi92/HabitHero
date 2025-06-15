"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"

export default function HomePage() {
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    const checkAuthAndRedirect = async () => {
      try {
        console.log("🏠 Homepage: Prüfe Auth-Status...")

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (!mounted) return

        console.log("📊 Homepage Session:", { hasSession: !!session, error })

        if (error) {
          console.error("❌ Homepage Session Error:", error)
        }

        if (session?.user) {
          console.log("✅ Benutzer gefunden, weiterleiten zum Dashboard")
          window.location.href = "/dashboard" // Forciere komplette Navigation
        } else {
          console.log("👤 Kein Benutzer, weiterleiten zu Auth")
          window.location.href = "/auth"
        }
      } catch (error) {
        console.error("💥 Homepage Auth Check Error:", error)
        if (mounted) {
          window.location.href = "/auth"
        }
      }
    }

    // Sofort prüfen
    checkAuthAndRedirect()

    // Auth State Changes überwachen
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return

      console.log("🔄 Homepage Auth Change:", event, !!session)

      if (event === "SIGNED_IN" && session) {
        window.location.href = "/dashboard"
      } else if (event === "SIGNED_OUT") {
        window.location.href = "/auth"
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">HabitHero wird geladen...</p>
        <p className="text-sm text-gray-500 mt-2">Authentifizierung wird geprüft...</p>
      </div>
    </div>
  )
}
