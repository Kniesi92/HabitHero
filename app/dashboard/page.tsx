"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Activity, TrendingUp, Calendar, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = useSupabaseClient() // Verwende Hook statt direkten Import

  // Beispiel-Daten
  const todayPoints = 85
  const pointsGoal = 100
  const todayActivities = [
    { id: 1, name: "30 Min Joggen", points: 30, completed: true, time: "08:00" },
    { id: 2, name: "Gesunde Mahlzeit", points: 15, completed: true, time: "12:30" },
    { id: 3, name: "2L Wasser trinken", points: 10, completed: true, time: "14:00" },
    { id: 4, name: "10 Min Meditation", points: 15, completed: false, time: "" },
    { id: 5, name: "Vitamine nehmen", points: 5, completed: false, time: "" },
  ]

  const weeklyStats = {
    totalPoints: 420,
    activitiesCompleted: 28,
    streak: 5,
    goalsAchieved: 3,
  }

  useEffect(() => {
    let mounted = true

    const checkUser = async () => {
      try {
        console.log("🔍 Dashboard: Prüfe Benutzer...")

        // Timeout nach 10 Sekunden
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout beim Laden der Session")), 10000),
        )

        const sessionPromise = supabase.auth.getSession()
        const {
          data: { session },
          error: sessionError,
        } = (await Promise.race([sessionPromise, timeoutPromise])) as any

        if (!mounted) return

        if (sessionError) {
          console.error("❌ Session Error:", sessionError)
          setError("Fehler beim Laden der Session")
          return
        }

        if (!session?.user) {
          console.log("👤 Kein Benutzer - Weiterleitung zu Auth")
          router.replace("/auth")
          return
        }

        console.log("✅ Benutzer gefunden:", session.user.email)
        setUser(session.user)
      } catch (err: any) {
        console.error("💥 Dashboard Error:", err)
        if (mounted) {
          setError(err.message || "Ein unerwarteter Fehler ist aufgetreten")
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    checkUser()

    // Auth State Changes überwachen
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return

      console.log("🔄 Dashboard Auth Change:", event, !!session)

      if (event === "SIGNED_OUT" || !session) {
        router.replace("/auth")
      } else if (event === "SIGNED_IN" && session) {
        setUser(session.user)
        setError(null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router, supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Dashboard wird geladen...</p>
          <p className="text-sm text-gray-500 mt-2">Benutzer wird authentifiziert...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Fehler</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Seite neu laden
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">Weiterleitung...</p>
      </div>
    )
  }

  const completedToday = todayActivities.filter((a) => a.completed).length
  const progressPercentage = Math.min((todayPoints / pointsGoal) * 100, 100)

  return (
    <div className="space-y-6">
      {/* Willkommen Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Willkommen zurück!</h1>
        <p className="text-gray-600 mt-2">Hier ist dein heutiger Fortschritt</p>
      </div>

      {/* Punkte-Übersicht */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Heutige Punkte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-green-600">{todayPoints}</div>
              <div className="text-sm text-gray-500">von {pointsGoal} Punkten</div>
            </div>
            <Badge variant={todayPoints >= pointsGoal ? "default" : "secondary"} className="text-lg px-3 py-1">
              {Math.round(progressPercentage)}%
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            {todayPoints >= pointsGoal
              ? "🎉 Tagesziel erreicht! Großartig!"
              : `Noch ${pointsGoal - todayPoints} Punkte bis zum Tagesziel`}
          </p>
        </CardContent>
      </Card>

      {/* Heutige Aktivitäten */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            Heutige Aktivitäten
          </CardTitle>
          <CardDescription>
            {completedToday} von {todayActivities.length} abgeschlossen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayActivities.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  activity.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      activity.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                    }`}
                  />
                  <div>
                    <div className={`font-medium ${activity.completed ? "text-green-800" : "text-gray-700"}`}>
                      {activity.name}
                    </div>
                    {activity.time && <div className="text-sm text-gray-500">Erledigt um {activity.time}</div>}
                  </div>
                </div>
                <Badge variant={activity.completed ? "default" : "outline"}>
                  {activity.points > 0 ? "+" : ""}
                  {activity.points} Punkte
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wöchentliche Statistiken */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-gray-900">{weeklyStats.totalPoints}</div>
            <div className="text-sm text-gray-600">Punkte diese Woche</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-gray-900">{weeklyStats.activitiesCompleted}</div>
            <div className="text-sm text-gray-600">Aktivitäten erledigt</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold text-gray-900">{weeklyStats.streak}</div>
            <div className="text-sm text-gray-600">Tage Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-gray-900">{weeklyStats.goalsAchieved}</div>
            <div className="text-sm text-gray-600">Ziele erreicht</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnell-Aktionen</CardTitle>
          <CardDescription>Häufige Aktivitäten schnell hinzufügen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-3 flex flex-col bg-transparent">
              <Activity className="h-5 w-5 mb-1" />
              <span className="text-xs">Sport</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col bg-transparent">
              <Target className="h-5 w-5 mb-1" />
              <span className="text-xs">Mahlzeit</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col bg-transparent">
              <TrendingUp className="h-5 w-5 mb-1" />
              <span className="text-xs">Wasser</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col bg-transparent">
              <CheckCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Sonstiges</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
