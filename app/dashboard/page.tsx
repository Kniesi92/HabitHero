"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/auth")
        return
      }

      setUser(session.user)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Lädt...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">HabitHero Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Abmelden
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Willkommen!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Angemeldet als: {user?.email}</p>
            <p className="mt-4 text-gray-600">
              Dies ist eine einfache Version des Dashboards. Weitere Features werden schrittweise hinzugefügt.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
