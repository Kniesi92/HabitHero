"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Activity, Calendar, CheckCircle, LogOut } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Beispiel-Daten für die Demo
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
    const supabase = createClient()

    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session?.user) {
          router.replace("/auth")
          return
        }

        setUser(session.user)
      } catch (error) {
        console.error("Auth check failed:", error)
        router.replace("/auth")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace("/auth")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Dashboard wird geladen...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const completedToday = todayActivities.filter((a) => a.completed).length
  const progressPercentage = Math.min((todayPoints / pointsGoal) * 100, 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Einfacher Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-4 h-4 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-green-600">HabitHero</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <span className="font-semibold text-green-700">{todayPoints} Punkte</span>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Willkommen */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Willkommen zurück!</h2>
          <p className="text-gray-600 mt-2">Angemeldet als {user.email}</p>
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

        {/* Info-Box */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">ℹ</span>
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Demo-Modus</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Dies sind Beispiel-Daten. In der nächsten Phase werden echte Datenbank-Verbindungen implementiert.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
