"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trophy, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = useSupabase()

  // Login State
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register State
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Session-Prüfung
  useEffect(() => {
    let mounted = true

    const checkExistingSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (mounted && session?.user) {
          console.log("👤 Benutzer bereits angemeldet, weiterleiten...")
          router.replace("/dashboard")
        }
      } catch (error) {
        console.error("Session check error:", error)
      }
    }

    checkExistingSession()

    return () => {
      mounted = false
    }
  }, [router, supabase])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      })

      if (error) {
        let errorMessage = "Anmeldung fehlgeschlagen."

        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Ungültige Anmeldedaten. Bitte überprüfe E-Mail und Passwort."
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "E-Mail noch nicht bestätigt. Bitte prüfe dein Postfach."
        } else if (error.message.includes("Too many requests")) {
          errorMessage = "Zu viele Anmeldeversuche. Bitte warte einen Moment."
        }

        setMessage({ type: "error", text: errorMessage })
        return
      }

      if (data.user && data.session) {
        setMessage({ type: "success", text: "Erfolgreich angemeldet! Weiterleitung..." })
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setMessage({
        type: "error",
        text: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    if (registerPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwörter stimmen nicht überein." })
      setIsLoading(false)
      return
    }

    if (registerPassword.length < 6) {
      setMessage({ type: "error", text: "Passwort muss mindestens 6 Zeichen lang sein." })
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail.trim(),
        password: registerPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) {
        let errorMessage = "Registrierung fehlgeschlagen."

        if (error.message.includes("User already registered")) {
          errorMessage = "Diese E-Mail-Adresse ist bereits registriert. Versuche dich anzumelden."
        } else if (error.message.includes("Password should be at least")) {
          errorMessage = "Passwort ist zu schwach. Verwende mindestens 6 Zeichen."
        }

        setMessage({ type: "error", text: errorMessage })
        return
      }

      if (data.user) {
        if (data.session) {
          setMessage({ type: "success", text: "Konto erfolgreich erstellt! Weiterleitung..." })
          setTimeout(() => {
            router.push("/dashboard")
          }, 1000)
        } else {
          setMessage({
            type: "success",
            text: "Konto erstellt! Bitte bestätige deine E-Mail-Adresse, dann kannst du dich anmelden.",
          })
        }
      }
    } catch (error: any) {
      console.error("Register error:", error)
      setMessage({
        type: "error",
        text: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600">HabitHero</h1>
          <p className="text-gray-600 mt-2">Dein Weg zu besseren Gewohnheiten</p>
        </div>

        {/* Auth Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Willkommen</CardTitle>
            <CardDescription className="text-center">Melde dich an oder erstelle ein neues Konto</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Anmelden</TabsTrigger>
                <TabsTrigger value="register">Registrieren</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-Mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="deine@email.de"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Passwort</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Anmeldung läuft..." : "Anmelden"}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">E-Mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="deine@email.de"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Passwort</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Mindestens 6 Zeichen"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Passwort wiederholen"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registrierung läuft..." : "Konto erstellen"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Message Display */}
            {message && (
              <Alert
                className={`mt-4 ${
                  message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }`}
              >
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
          </CardContent>
        </Card>

        {/* Debug Info */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
            <p>
              <strong>Context Debug:</strong>
            </p>
            <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Gesetzt" : "❌ Fehlt"}</p>
            <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Gesetzt" : "❌ Fehlt"}</p>
            <p>Context Client: {supabase ? "✅ Verfügbar" : "❌ Fehlt"}</p>
          </div>
        )}
      </div>
    </div>
  )
}
