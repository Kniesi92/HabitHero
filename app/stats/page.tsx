"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function StatsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Statistiken</h1>
        <p className="text-gray-600 mt-2">Verfolge deinen Fortschritt und deine Trends</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
            Fortschritts-Statistiken
          </CardTitle>
          <CardDescription>Diese Seite wird in der nächsten Entwicklungsphase implementiert</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BarChart3 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Statistiken-Feature kommt bald</h3>
            <p className="text-gray-600">Hier siehst du bald detaillierte Statistiken über deinen Fortschritt.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
