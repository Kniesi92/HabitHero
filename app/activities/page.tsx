"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Plus } from "lucide-react"

export default function ActivitiesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Aktivitäten</h1>
          <p className="text-gray-600 mt-2">Verwalte deine täglichen Aktivitäten</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Neue Aktivität
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-500" />
            Aktivitäten-Tracking
          </CardTitle>
          <CardDescription>Diese Seite wird in der nächsten Entwicklungsphase implementiert</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aktivitäten-Feature kommt bald</h3>
            <p className="text-gray-600">Hier kannst du bald deine Aktivitäten verwalten und als erledigt markieren.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
