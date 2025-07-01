export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">HabitHero</h1>
        <p className="text-gray-600 mb-8">Dein Habit Tracker</p>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">🎯 Willkommen!</h2>
            <p className="text-gray-600">Die App wird schrittweise aufgebaut.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">✅ Status: Deployment erfolgreich</h3>
            <p className="text-sm text-gray-500">Basis-App läuft, Features folgen...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
