"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session?.user) {
          router.replace("/dashboard")
        }
      } catch (error) {
        console.error("Session check error:", error)
      }
    }

    checkExistingSession()
  }, [router])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        setMessage("Registrierung erfolgreich! Du kannst dich jetzt anmelden.")
        setIsSignUp(false)
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push("/dashboard")
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">HabitHero</h1>
          <p className="text-gray-600 mt-2">Dein Weg zu besseren Gewohnheiten</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-6">{isSignUp ? "Registrieren" : "Anmelden"}</h2>

          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Lädt..." : isSignUp ? "Registrieren" : "Anmelden"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isSignUp ? "Bereits ein Konto? Anmelden" : "Kein Konto? Registrieren"}
            </button>
          </div>

          {message && <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">{message}</div>}
        </div>
      </div>
    </div>
  )
}
