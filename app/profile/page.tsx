"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Save, Loader2, CheckCircle, AlertCircle, Calculator, Target, Activity, Heart } from "lucide-react"
import {
  getUserProfile,
  upsertUserProfile,
  calculateCalorieGoal,
  calculateBMI,
  getBMICategory,
  type UserProfile,
} from "@/lib/database"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    activity_level: "moderate" as UserProfile["activity_level"],
    daily_points_goal: "50",
    daily_calorie_goal: "2000",
  })

  const supabase = createClient()
  const router = useRouter()

  // Daten laden
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)

        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser()
        if (!currentUser) {
          router.push("/auth")
          return
        }
        setUser(currentUser)

        const profileData = await getUserProfile(currentUser.id)
        setProfile(profileData)

        // Form mit vorhandenen Daten füllen
        if (profileData) {
          setFormData({
            name: profileData.name || "",
            age: profileData.age?.toString() || "",
            height: profileData.height?.toString() || "",
            weight: profileData.weight?.toString() || "",
            activity_level: profileData.activity_level || "moderate",
            daily_points_goal: profileData.daily_points_goal?.toString() || "50",
            daily_calorie_goal: profileData.daily_calorie_goal?.toString() || "2000",
          })
        }
      } catch (error: any) {
        console.error("❌ Fehler beim Laden des Profils:", error)
        setMessage({ type: "error", text: "Fehler beim Laden des Profils" })
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [supabase, router])

  // Kalorienziel automatisch berechnen
  useEffect(() => {
    const { age, height, weight, activity_level } = formData
    if (age && height && weight) {
      const ageNum = Number.parseInt(age)
      const heightNum = Number.parseInt(height)
      const weightNum = Number.parseFloat(weight)

      if (ageNum > 0 && heightNum > 0 && weightNum > 0) {
        // Standardmäßig "female" - könnte später als Eingabefeld hinzugefügt werden
        const calories = calculateCalorieGoal(ageNum, heightNum, weightNum, "female", activity_level)
        setFormData((prev) => ({
          ...prev,
          daily_calorie_goal: calories.toString(),
        }))
      }
    }
  }, [formData]) // Updated to include formData as a dependency

  // Form-Handler
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!user) return

    try {
      setSaving(true)
      setMessage(null)

      // Validierung
      if (!formData.name.trim()) {
        setMessage({ type: "error", text: "Name ist erforderlich" })
        return
      }

      const pointsGoal = Number.parseInt(formData.daily_points_goal)
      if (pointsGoal < 10 || pointsGoal > 500) {
        setMessage({ type: "error", text: "Punkteziel muss zwischen 10 und 500 liegen" })
        return
      }

      // Profil speichern
      const updatedProfile = await upsertUserProfile(user.id, {
        name: formData.name.trim(),
        age: formData.age ? Number.parseInt(formData.age) : null,
        height: formData.height ? Number.parseInt(formData.height) : null,
        weight: formData.weight ? Number.parseFloat(formData.weight) : null,
        activity_level: formData.activity_level,
        daily_points_goal: pointsGoal,
        daily_calorie_goal: Number.parseInt(formData.daily_calorie_goal),
      })

      setProfile(updatedProfile)
      setMessage({ type: "success", text: "Profil erfolgreich gespeichert!" })

      // Nach 2 Sekunden zurück zum Dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error("❌ Fehler beim Speichern:", error)
      setMessage({ type: "error", text: "Fehler beim Speichern des Profils" })
    } finally {
      setSaving(false)
    }
  }

  // BMI berechnen für Anzeige
  const bmi =
    formData.height && formData.weight
      ? calculateBMI(Number.parseInt(formData.height), Number.parseFloat(formData.weight))
      : null
  const bmiCategory = bmi ? getBMICategory(bmi) : null

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Profil wird geladen...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <Avatar className="h-20 w-20 mx-auto mb-4">
          <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
          <AvatarFallback className="bg-green-100 text-green-600 text-xl">
            {formData.name.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-900">Mein Profil</h1>
        <p className="text-gray-600">Personalisiere deine HabitHero-Erfahrung</p>
      </div>

      {/* Message */}
      {message && (
        <Alert className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
          <div className="flex items-center">
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
            )}
            <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
              {message.text}
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* Persönliche Informationen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Persönliche Informationen
          </CardTitle>
          <CardDescription>Grundlegende Informationen über dich</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Dein Name"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Alter</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="25"
                className="mt-1"
                min="10"
                max="120"
              />
            </div>
            <div>
              <Label htmlFor="height">Größe (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                placeholder="170"
                className="mt-1"
                min="100"
                max="250"
              />
            </div>
            <div>
              <Label htmlFor="weight">Gewicht (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                placeholder="70"
                className="mt-1"
                min="30"
                max="300"
              />
            </div>
          </div>

          {/* BMI Anzeige */}
          {bmi && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800">BMI: {bmi}</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {bmiCategory}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Aktivitätslevel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Aktivitätslevel
          </CardTitle>
          <CardDescription>Wie aktiv bist du normalerweise?</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={formData.activity_level} onValueChange={(value) => handleInputChange("activity_level", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Wenig aktiv (Bürojob, wenig Sport)</SelectItem>
              <SelectItem value="light">Leicht aktiv (1-3 Tage Sport/Woche)</SelectItem>
              <SelectItem value="moderate">Mäßig aktiv (3-5 Tage Sport/Woche)</SelectItem>
              <SelectItem value="active">Sehr aktiv (6-7 Tage Sport/Woche)</SelectItem>
              <SelectItem value="very_active">Extrem aktiv (2x täglich Sport)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Ziele */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Tägliche Ziele
          </CardTitle>
          <CardDescription>Setze deine persönlichen Tagesziele</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="points_goal">Tägliches Punkteziel</Label>
            <Input
              id="points_goal"
              type="number"
              value={formData.daily_points_goal}
              onChange={(e) => handleInputChange("daily_points_goal", e.target.value)}
              className="mt-1"
              min="10"
              max="500"
            />
            <p className="text-xs text-gray-500 mt-1">Empfohlen: 30-100 Punkte pro Tag</p>
          </div>

          <div>
            <Label htmlFor="calorie_goal">
              <div className="flex items-center">
                <Calculator className="h-4 w-4 mr-1" />
                Tägliches Kalorienziel
              </div>
            </Label>
            <Input
              id="calorie_goal"
              type="number"
              value={formData.daily_calorie_goal}
              onChange={(e) => handleInputChange("daily_calorie_goal", e.target.value)}
              className="mt-1"
              min="1000"
              max="5000"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.age && formData.height && formData.weight
                ? "Automatisch basierend auf deinen Daten berechnet"
                : "Gib deine Körperdaten ein für automatische Berechnung"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Aktuelle Statistiken */}
      {profile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Deine Statistiken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{profile.daily_points_goal}</div>
                <div className="text-sm text-green-700">Punkte-Ziel</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{profile.daily_calorie_goal}</div>
                <div className="text-sm text-blue-700">Kalorien-Ziel</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Speichern Button */}
      <div className="flex gap-4">
        <Button onClick={() => router.push("/dashboard")} variant="outline" className="flex-1">
          Abbrechen
        </Button>
        <Button onClick={handleSave} disabled={saving} className="flex-1">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Speichern...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Speichern
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
