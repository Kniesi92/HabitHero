"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  // Debug: Client-Instanzen prüfen
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const checkInstances = () => {
        // @ts-ignore
        const instances = window.__supabaseClient || window.__supabaseInstance
        console.log("🔍 Supabase Instanzen Check:", instances)
      }

      checkInstances()
      const interval = setInterval(checkInstances, 5000)
      return () => clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["github", "google"]}
        redirectTo={`${window.location.origin}/auth/callback`}
        onSessionChange={(event, session) => {
          if (session) {
            router.push("/")
          }
        }}
      />
    </div>
  )
}
