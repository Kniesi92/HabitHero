"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"

export default function HomePage() {
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    const checkAuthAndRedirect = async () => {
      try {
        const supabase = createClient()
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (!mounted) return

        if (error) {
          console.error("❌ Session Error:", error)
        }

        if (session?.user) {
          router.replace("/dashboard")
        } else {
          router.replace("/auth")
        }
      } catch (error) {
        console.error("💥 Auth Check Error:", error)
        if (mounted) {
          router.replace("/auth")
        }
      }
    }

    checkAuthAndRedirect()

    return () => {
      mounted = false
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">HabitHero wird geladen...</p>
      </div>
    </div>
  )
}
