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

// Benutzer-Profil laden oder erstellen (WENIGER LOGS)
export async function getUserProfile(userId: string): Promise<UserProfile> {
  const supabase = createClient()

  try {
    // Versuche das Profil zu laden
    const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).maybeSingle()

    if (error) {
      console.error("❌ Fehler beim Laden des Benutzer-Profils:", error)
      throw error
    }

    // Wenn Profil existiert, zurückgeben
    if (data) {
      // Nur einmal loggen, nicht bei jedem Aufruf
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Profil gefunden für:", userId.slice(0, 8) + "...")
      }
      return data
    }

    // Wenn kein Profil existiert, Standard-Profil erstellen
    console.log("📝 Erstelle Standard-Profil für neuen Benutzer")

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
        console.log("✅ Profil im Fallback gefunden")
        return fallbackData
      }

      throw createError
    }

    console.log("✅ Standard-Profil erstellt")
    return newProfile
  } catch (error) {
    console.error("💥 Unerwarteter Fehler beim Profil-Management:", error)
    throw error
  }
}

// Benutzer-Profil aktualisieren
export async function upsertUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
  const supabase = createClient()

  const updateData = {
    id: userId,
    ...updates,
  }

  const { data, error } = await supabase.from("user_profiles").upsert(updateData).select().single()

  if (error) {
    console.error("❌ Fehler beim Speichern des Benutzer-Profils:", error)
    throw error
  }

  console.log("✅ Profil gespeichert")
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
