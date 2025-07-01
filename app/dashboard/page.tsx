"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Activity, Target, Apple, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Checking authentication...")

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("❌ Session error:", sessionError)
          setError(`Session Error: ${sessionError.message}`)
          return
        }

        if (!session?.user) {
          console.log("❌ No session found, redirecting to auth")
          router.push("/auth")
          return
        }

        console.log("✅ User authenticated:", session.user.email)
        setUser(session.user)
        setLoading(false)
      } catch (error: any) {
        console.error("💥 Auth check failed:", error)
        setError(`Auth Error: ${error.message}`)
        setLoading(false)
      }
    }

    checkAuth()

    // Auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Auth state changed:", event, session?.user?.email)

      if (event === "SIGNED_OUT" || !session) {
        router.push("/auth")
      } else if (event === "SIGNED_IN" && session) {
        setUser(session.user)
        setLoading(false)
        setError(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  const handleSignOut = async () => {
    try {
      console.log("🚪 Signing out...")
      await supabase.auth.signOut()
      router.push("/auth")
    } catch (error: any) {
      console.error("❌ Sign out error:", error)
      setError(`Sign out failed: ${error.message}`)
    }
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Dashboard wird geladen...</p>
          <p className="text-xs text-gray-400 mt-2">Authentifizierung wird geprüft...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">⚠️ Dashboard-Fehler</CardTitle>
            <CardDescription>Es gab ein Problem beim Laden des Dashboards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <div className="space-y-2">
              <Button onClick={() => window.location.reload()} className="w-full">
                Seite neu laden
              </Button>
              <Button onClick={() => router.push("/auth")} variant="outline" className="w-full">
                Zur Anmeldung
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Success State - Dashboard Content
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                <Trophy className="w-4 h-4 text-green-600" />
              </div>
              <h1 className="text-xl font-bold text-green-600">HabitHero</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full">
                <Trophy className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-700">0 Punkte</span>
              </div>

              <Button onClick={handleSignOut} variant="outline" size="sm">
                Abmelden
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Willkommen zurück! 👋</h2>
          <p className="text-gray-600 mt-1">
            Angemeldet als: <span className="font-medium">{user?.email}</span>
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/goals">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Target className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium">Ziele</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/activities">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Activity className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium">Aktivitäten</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/nutrition">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Apple className="h-8 w-8 text-red-600 mb-2" />
                <span className="text-sm font-medium">Ernährung</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/stats">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium">Statistiken</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Heutige Punkte */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heutige Punkte</CardTitle>
              <Trophy className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">0</div>
              <p className="text-xs text-gray-600">Ziel: 50 Punkte</p>
            </CardContent>
          </Card>

          {/* Aktive Ziele */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Ziele</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-600">Ziele erstellt</p>
            </CardContent>
          </Card>

          {/* Aktivitäten heute */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktivitäten heute</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-600">Aktivitäten erledigt</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Info - GEÄNDERT FÜR AUTO-DEPLOY TEST */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 AUTO-DEPLOY TEST - Funktioniert es jetzt?</CardTitle>
            <CardDescription>Testing ob Vercel Auto-Deploy nach Settings-Änderung funktioniert</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">✅ Vercel Settings geändert</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">🧪 Auto-Deploy wird getestet...</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">📝 Code-Änderung in v0 gemacht</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Wenn du diesen Text siehst, funktioniert Auto-Deploy wieder! 🎉</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
