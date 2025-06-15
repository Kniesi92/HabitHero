import { createClient } from "./supabase"

// Typen für unsere Datenbank-Objekte
export interface Activity {
  id: string
  title: string
  points: number
  is_positive: boolean
  category: string
  created_at: string
}

export interface ActivityLog {
  id: string
  user_id: string
  activity_id: string
  points_earned: number
  completed_at: string
  activity?: Activity
}

export interface UserProfile {
  id: string
  name: string | null
  avatar_url: string | null
  age: number | null
  height: number | null // in cm
  weight: number | null // in kg
  activity_level: "sedentary" | "light" | "moderate" | "active" | "very_active"
  daily_calorie_goal: number
  daily_points_goal: number
  created_at: string
  updated_at: string
}

// Alle verfügbaren Aktivitäten laden
export async function getActivities(): Promise<Activity[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("category", { ascending: true })
    .order("points", { ascending: false })

  if (error) {
    console.error("❌ Fehler beim Laden der Aktivitäten:", error)
    throw error
  }

  return data || []
}

// Heutige Aktivitäts-Logs eines Benutzers laden
export async function getTodayActivityLogs(userId: string): Promise<ActivityLog[]> {
  const supabase = createClient()
  const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD Format

  const { data, error } = await supabase
    .from("activity_logs")
    .select(`
      *,
      activities (
        id,
        title,
        points,
        is_positive,
        category
      )
    `)
    .eq("user_id", userId)
    .gte("completed_at", `${today}T00:00:00.000Z`)
    .lt("completed_at", `${today}T23:59:59.999Z`)
    .order("completed_at", { ascending: false })

  if (error) {
    console.error("❌ Fehler beim Laden der heutigen Aktivitäts-Logs:", error)
    throw error
  }

  return data || []
}

// Aktivität als erledigt markieren
export async function logActivity(userId: string, activityId: string): Promise<ActivityLog> {
  const supabase = createClient()

  console.log("🔍 Lade Aktivität:", activityId)

  // Erst die Aktivität laden, um die Punkte zu bekommen
  const { data: activity, error: activityError } = await supabase
    .from("activities")
    .select("*")
    .eq("id", activityId)
    .single()

  if (activityError || !activity) {
    console.error("❌ Aktivität nicht gefunden:", activityError)
    throw activityError || new Error("Aktivität nicht gefunden")
  }

  console.log("✅ Aktivität gefunden:", activity.title, activity.points)

  // Aktivitäts-Log erstellen
  const logData = {
    user_id: userId,
    activity_id: activityId,
    points_earned: activity.points,
    completed_at: new Date().toISOString(),
  }

  console.log("💾 Erstelle Log:", logData)

  const { data, error } = await supabase
    .from("activity_logs")
    .insert(logData)
    .select(`
      *,
      activities (
        id,
        title,
        points,
        is_positive,
        category
      )
    `)
    .single()

  if (error) {
    console.error("❌ Fehler beim Loggen der Aktivität:", error)
    throw error
  }

  console.log("✅ Log erstellt:", data)
  return data
}

// Aktivitäts-Log löschen (für "Rückgängig")
export async function removeActivityLog(logId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.from("activity_logs").delete().eq("id", logId)

  if (error) {
    console.error("❌ Fehler beim Löschen des Aktivitäts-Logs:", error)
    throw error
  }
}

// Heutige Punkte eines Benutzers berechnen
export async function getTodayPoints(userId: string): Promise<number> {
  const logs = await getTodayActivityLogs(userId)
  return logs.reduce((total, log) => total + log.points_earned, 0)
}

// Benutzer-Profil laden oder erstellen (ROBUSTE VERSION)
export async function getUserProfile(userId: string): Promise<UserProfile> {
  const supabase = createClient()

  console.log("🔍 Lade Profil für Benutzer:", userId)

  try {
    // Versuche das Profil zu laden
    const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).maybeSingle()

    if (error) {
      console.error("❌ Fehler beim Laden des Benutzer-Profils:", error)
      throw error
    }

    // Wenn Profil existiert, zurückgeben
    if (data) {
      console.log("✅ Profil gefunden:", data)
      return data
    }

    // Wenn kein Profil existiert, Standard-Profil erstellen
    console.log("📝 Kein Profil gefunden, erstelle Standard-Profil...")

    const {
      data: { user },
    } = await supabase.auth.getUser()
    const defaultName = user?.email?.split("@")[0] || "Benutzer"

    // Erstelle minimales Profil
    const { data: newProfile, error: createError } = await supabase
      .from("user_profiles")
      .insert({
        id: userId,
        name: defaultName,
        activity_level: "moderate",
        daily_calorie_goal: 2000,
        daily_points_goal: 50,
      })
      .select()
      .single()

    if (createError) {
      console.error("❌ Fehler beim Erstellen des Standard-Profils:", createError)

      // Fallback: Versuche nochmal zu laden (falls zwischenzeitlich erstellt)
      const { data: fallbackData } = await supabase.from("user_profiles").select("*").eq("id", userId).maybeSingle()

      if (fallbackData) {
        console.log("✅ Profil im Fallback gefunden:", fallbackData)
        return fallbackData
      }

      throw createError
    }

    console.log("✅ Standard-Profil erstellt:", newProfile)
    return newProfile
  } catch (error) {
    console.error("💥 Unerwarteter Fehler beim Profil-Management:", error)
    throw error
  }
}

// Benutzer-Profil aktualisieren
export async function upsertUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
  const supabase = createClient()

  console.log("💾 Speichere Profil-Updates:", updates)

  const updateData = {
    id: userId,
    ...updates,
  }

  const { data, error } = await supabase.from("user_profiles").upsert(updateData).select().single()

  if (error) {
    console.error("❌ Fehler beim Speichern des Benutzer-Profils:", error)
    throw error
  }

  console.log("✅ Profil gespeichert:", data)
  return data
}

// Kalorienbedarf berechnen (Harris-Benedict-Formel)
export function calculateCalorieGoal(
  age: number,
  height: number, // cm
  weight: number, // kg
  gender: "male" | "female",
  activityLevel: UserProfile["activity_level"],
): number {
  // Grundumsatz berechnen (Harris-Benedict)
  let bmr: number
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
  }

  // Aktivitätsfaktor
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  }

  const totalCalories = bmr * activityFactors[activityLevel]
  return Math.round(totalCalories)
}

// BMI berechnen
export function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10
}

// BMI-Kategorie bestimmen
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Untergewicht"
  if (bmi < 25) return "Normalgewicht"
  if (bmi < 30) return "Übergewicht"
  return "Adipositas"
}
