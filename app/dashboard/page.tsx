"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Trophy,
  Target,
  Activity,
  TrendingUp,
  Plus,
  CheckCircle2,
  Circle,
  Loader2,
  AlertCircle,
  Settings,
} from "lucide-react"
import Link from "next/link"
import {
  getActivities,
  getTodayActivityLogs,
  getTodayPoints,
  getUserProfile,
  logActivity,
  removeActivityLog,
  type Activity as ActivityType,
  type ActivityLog,
  type UserProfile,
} from "@/lib/database"

export default function DashboardPage() {
  // State für Benutzer und Daten
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [todayLogs, setTodayLogs] = useState<ActivityLog[]>([])
  const [todayPoints, setTodayPoints] = useState(0)

  // Loading und Error States
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const supabase = createClientComponentClient()

  // Daten laden
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("🔄 Dashboard: Lade Daten...")

        // Benutzer laden
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()
        if (!currentUser) {
          throw new Error("Kein Benutzer gefunden")
        }
        setUser(currentUser)
        console.log("👤 Benutzer geladen:", currentUser.email)

        // Parallel alle Daten laden
        const [activitiesData, profileData, logsData, pointsData] = await Promise.all([
          getActivities(),
          getUserProfile(currentUser.id), // Diese Funktion erstellt jetzt automatisch ein Profil
          getTodayActivityLogs(currentUser.id),
          getTodayPoints(currentUser.id),
        ])

        setActivities(activitiesData)
        setUserProfile(profileData)
        setTodayLogs(logsData)
        setTodayPoints(pointsData)

        console.log("✅ Dashboard-Daten geladen:", {
          activities: activitiesData.length,
          profile: profileData ? "✅" : "❌",
          logs: logsData.length,
          points: pointsData,
        })
      } catch (err: any) {
        console.error("❌ Fehler beim Laden der Dashboard-Daten:", err)
        setError(err.message || "Fehler beim Laden der Daten")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [supabase])

  // Aktivität als erledigt markieren
  const handleActivityComplete = async (activity: ActivityType) => {
    if (!user || actionLoading) return

    try {
      console.log("🎯 Aktivität wird verarbeitet:", activity.title, activity.points)
      setActionLoading(activity.id)

      // Prüfen ob heute schon erledigt
      const alreadyDone = todayLogs.some((log) => log.activity_id === activity.id)
      console.log("📋 Bereits erledigt heute:", alreadyDone)

      if (alreadyDone) {
        // Rückgängig machen
        const logToRemove = todayLogs.find((log) => log.activity_id === activity.id)
        if (logToRemove) {
          console.log("🗑️ Entferne Log:", logToRemove.id)
          await removeActivityLog(logToRemove.id)

          // State aktualisieren
          setTodayLogs((prev) => prev.filter((log) => log.id !== logToRemove.id))
          setTodayPoints((prev) => prev - logToRemove.points_earned)
          console.log("✅ Log entfernt")
        }
      } else {
        // Aktivität loggen
        console.log("💾 Speichere neue Aktivität...")
        const newLog = await logActivity(user.id, activity.id)
        console.log("✅ Neue Aktivität gespeichert:", newLog)

        // State aktualisieren
        setTodayLogs((prev) => [newLog, ...prev])
        setTodayPoints((prev) => prev + newLog.points_earned)
      }
    } catch (err: any) {
      console.error("❌ Fehler beim Aktivitäts-Logging:", err)
      setError(`Fehler beim Speichern: ${err.message}`)

      // Zeige Fehler für 5 Sekunden
      setTimeout(() => setError(null), 5000)
    } finally {
      setActionLoading(null)
    }
  }

  // Hilfsfunktionen
  const dailyGoal = userProfile?.daily_points_goal || 50
  const progressPercentage = Math.min((todayPoints / dailyGoal) * 100, 100)
  const completedToday = todayLogs.length
  const currentStreak = 5 // TODO: Echte Streak-Berechnung implementieren

  // Beliebte Aktivitäten (Top 6 für Dashboard)
  const popularActivities = activities.slice(0, 8) // Alle Aktivitäten, mehr anzeigen

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Dashboard wird geladen...</p>
          <p className="text-sm text-gray-500 mt-1">Profil wird erstellt...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Fehler:</strong> {error}
          <Button variant="outline" size="sm" className="ml-4" onClick={() => window.location.reload()}>
            Neu laden
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Willkommen zurück, {userProfile?.name || user?.email?.split("@")[0] || "Held"}! 🎯
            </h1>
            <p className="text-green-100">
              Du bist auf einem guten Weg. Lass uns heute wieder großartige Fortschritte machen!
            </p>
          </div>
          <Link href="/profile">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Settings className="h-4 w-4 mr-2" />
              Profil bearbeiten
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heutige Punkte</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{todayPoints}</div>
            <div className="mt-2">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-gray-600 mt-1">
                {dailyGoal - todayPoints > 0
                  ? `Noch ${dailyGoal - todayPoints} Punkte bis zum Tagesziel`
                  : "Tagesziel erreicht! 🎉"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktivitäten heute</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}</div>
            <p className="text-xs text-gray-600">Aktivitäten abgeschlossen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktuelle Serie</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStreak}</div>
            <p className="text-xs text-gray-600">Tage in Folge aktiv</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verfügbare Aktivitäten</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activities.length}</div>
            <p className="text-xs text-gray-600">Aktivitäten verfügbar</p>
          </CardContent>
        </Card>
      </div>

      {/* Schnelle Aktivitäten */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Beliebte Aktivitäten
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Alle anzeigen
            </Button>
          </CardTitle>
          <CardDescription>Markiere erledigte Aktivitäten mit einem Klick</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {popularActivities.map((activity) => {
              const isCompleted = todayLogs.some((log) => log.activity_id === activity.id)
              const isLoading = actionLoading === activity.id

              return (
                <div
                  key={activity.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                    isCompleted
                      ? activity.is_positive
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => handleActivityComplete(activity)}
                >
                  <div className="flex items-center space-x-3">
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                    ) : isCompleted ? (
                      <CheckCircle2 className={`h-5 w-5 ${activity.is_positive ? "text-green-600" : "text-red-600"}`} />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                    <div>
                      <span
                        className={`font-medium ${
                          isCompleted ? (activity.is_positive ? "text-green-800" : "text-red-800") : ""
                        }`}
                      >
                        {activity.title}
                      </span>
                      <p className="text-xs text-gray-500">{activity.category}</p>
                    </div>
                  </div>
                  <Badge
                    variant={isCompleted ? "default" : "secondary"}
                    className={
                      isCompleted
                        ? activity.is_positive
                          ? "bg-green-600"
                          : "bg-red-600"
                        : activity.is_positive
                          ? ""
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {activity.points > 0 ? "+" : ""}
                    {activity.points}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Heutige Aktivitäten Log */}
      {todayLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Heute erledigt</CardTitle>
            <CardDescription>Deine heutigen Aktivitäten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {todayLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{log.activity?.title}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(log.completed_at).toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <Badge variant="secondary">
                    {log.points_earned > 0 ? "+" : ""}
                    {log.points_earned}
                  </Badge>
                </div>
              ))}
              {todayLogs.length > 5 && (
                <p className="text-xs text-gray-500 text-center pt-2">
                  ... und {todayLogs.length - 5} weitere Aktivitäten
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Motivation Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Du machst das großartig! 🌟</h3>
            <p className="text-purple-600 mb-4">
              Du hast bereits {completedToday} Aktivitäten heute abgeschlossen und {todayPoints} Punkte gesammelt!
            </p>
            <div className="flex justify-center space-x-2">
              <Badge className="bg-purple-100 text-purple-800">{currentStreak} Tage Serie</Badge>
              {todayPoints >= dailyGoal && <Badge className="bg-green-100 text-green-800">Tagesziel erreicht</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
