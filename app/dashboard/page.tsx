"use client"

import { Auth } from "@supabase/ui"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import Account from "@/components/Account"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) {
      router.push("/")
    }
  }, [session, router])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Dashboard: Lade Daten...")

      // Timeout nach 10 Sekunden
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout: Daten konnten nicht geladen werden")), 10000),
      )

      // Benutzer laden mit Timeout
      const userPromise = supabase.auth.getUser()
      const {
        data: { user: currentUser },
      } = (await Promise.race([userPromise, timeoutPromise])) as any

      if (!currentUser) {
        throw new Error("Kein Benutzer gefunden")
      }
      setUser(currentUser)
      console.log("👤 Benutzer geladen:", currentUser.email)

      // Rest der Funktion bleibt gleich...
    } catch (e: any) {
      console.error("🚨 Fehler beim Laden der Daten:", e.message)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      loadData()
    }
  }, [session])

  if (!session) {
    return null
  }

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: Auth.Theme.default }} theme="default" />
      ) : (
        <Account session={session} />
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  )
}
