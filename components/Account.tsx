"use client"

import { useState } from "react"
import type { Session } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@/lib/supabase"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AccountProps {
  session: Session
}

/**
 * Very lightweight Account component to unblock the build.
 * Displays the signed-in user’s e-mail and offers a Sign-out button.
 */
export default function Account({ session }: AccountProps) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    // Force full reload to clear any stale state
    window.location.href = "/auth"
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Angemeldet als {session.user?.email}</CardDescription>
      </CardHeader>

      <CardContent>
        <Button onClick={handleSignOut} disabled={loading} className="w-full">
          {loading ? "Abmelden …" : "Abmelden"}
        </Button>
      </CardContent>
    </Card>
  )
}
