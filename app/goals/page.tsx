"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Meine Ziele</h1>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neues Ziel
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-green-500" />
              Ziele-Verwaltung
            </CardTitle>
            <CardDescription>Diese Seite wird in der nächsten Entwicklungsphase implementiert</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Target className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ziele-Feature kommt bald</h3>
              <p className="text-gray-600">Hier kannst du bald deine persönlichen Ziele erstellen und verfolgen.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
