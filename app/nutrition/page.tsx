"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Apple, Plus } from "lucide-react"

export default function NutritionPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ernährung</h1>
          <p className="text-gray-600 mt-2">Verfolge deine Ernährung und Kalorien</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Mahlzeit hinzufügen
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Apple className="h-5 w-5 mr-2 text-red-500" />
            Ernährungs-Tracker
          </CardTitle>
          <CardDescription>Diese Seite wird in der nächsten Entwicklungsphase implementiert</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Apple className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ernährungs-Feature kommt bald</h3>
            <p className="text-gray-600">Hier kannst du bald deine Mahlzeiten und Kalorien verfolgen.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
