# HabitHero - Vereinfachter Tech Stack

Dieser Tech Stack ist optimiert für einfache Entwicklung und private Nutzung.

## Frontend (Einfach gehalten)

### Next.js 14 mit App Router
- **Warum**: Alles in einem - Frontend, Backend, Deployment
- **Vorteile**: 
  - Schneller Start
  - Gute Performance out-of-the-box
  - Einfaches Deployment
- **Setup**: `npx create-next-app@latest`

### TypeScript (Optional)
- **Warum**: Weniger Bugs, bessere IDE-Unterstützung
- **Alternative**: Kann auch mit JavaScript starten
- **Empfehlung**: TypeScript für bessere Entwicklererfahrung

### Tailwind CSS
- **Warum**: Schnelle UI-Entwicklung ohne CSS-Dateien
- **Vorteile**:
  - Responsive Design einfach
  - Konsistente Designs
  - Kleine Bundle-Größe
- **Setup**: Kommt mit Next.js Template

### shadcn/ui
- **Warum**: Fertige, schöne UI-Komponenten
- **Vorteile**:
  - Copy-paste Komponenten
  - Anpassbar
  - Accessibility eingebaut
- **Setup**: `npx shadcn@latest init`

### Recharts
- **Warum**: Einfache Charts für Statistiken
- **Alternative**: Chart.js oder native SVG
- **Verwendung**: Punkte-Verlauf, Aktivitäts-Charts

## Backend (All-in-One)

### Next.js API Routes
- **Warum**: Kein separater Backend-Server nötig
- **Verwendung**: 
  - Datenbank-Operationen
  - Authentifizierung
  - Business Logic
- **Einfach**: Alles in einem Projekt

### Supabase (Backend-as-a-Service)
- **Warum**: Alles was wir brauchen in einem Service
- **Beinhaltet**:
  - PostgreSQL Datenbank
  - Authentifizierung
  - Real-time Updates
  - File Storage
  - Dashboard für Verwaltung
- **Kostenlos**: Großzügiger Free Tier

## Datenbank

### PostgreSQL (via Supabase)
- **Warum**: Robust, SQL, JSON-Support
- **Vorteile**:
  - Bekannte Technologie
  - Gute Performance
  - Backup automatisch
- **Verwaltung**: Über Supabase Dashboard

## Deployment (Ein-Klick)

### Vercel
- **Warum**: Perfekt für Next.js
- **Vorteile**:
  - Automatisches Deployment bei Git Push
  - Preview-Deployments
  - Kostenlos für private Projekte
  - Domain inklusive
- **Setup**: GitHub Repository verbinden

### Supabase Cloud
- **Warum**: Verwaltete Datenbank
- **Vorteile**:
  - Automatische Backups
  - Monitoring inklusive
  - Skaliert automatisch
  - Kostenlos starten

## Entwicklung (Einfach)

### Lokale Entwicklung
\`\`\`bash
# Projekt erstellen
npx create-next-app@latest habitHero --typescript --tailwind --app

# Dependencies installieren
npm install @supabase/supabase-js
npx shadcn@latest init

# Entwicklungsserver starten
npm run dev
\`\`\`

### Git Workflow (Einfach)
- **Main Branch**: Produktive Version
- **Feature Branches**: Für neue Features
- **Deployment**: Automatisch bei Push zu main

### Keine komplexen Tools
- **Kein Docker**: Lokale Entwicklung reicht
- **Kein Kubernetes**: Vercel managed alles
- **Kein CI/CD Pipeline**: Git Push reicht
- **Keine Tests**: Manuelles Testen mit Freunden

## Ordnerstruktur (Einfach)

\`\`\`
habitHero/
├── app/                    # Next.js App Router
│   ├── auth/              # Auth-Seiten
│   ├── dashboard/         # Hauptbereich
│   ├── goals/             # Ziele-Verwaltung
│   ├── activities/        # Aktivitäten
│   ├── nutrition/         # Ernährung
│   └── stats/             # Statistiken
├── components/            # UI-Komponenten
│   ├── ui/               # shadcn/ui Komponenten
│   └── custom/           # Eigene Komponenten
├── lib/                  # Utilities
│   ├── supabase.ts       # Supabase Client
│   ├── utils.ts          # Helper Functions
│   └── types.ts          # TypeScript Types
└── public/               # Statische Dateien
\`\`\`

## Datenbank Schema (Einfach)

### Haupttabellen
\`\`\`sql
-- Benutzer (erweitert Supabase Auth)
users_profiles (
  id, name, avatar_url, 
  age, height, weight, activity_level
)

-- Ziele
goals (
  id, user_id, title, category, 
  is_active, created_at
)

-- Aktivitäten
activities (
  id, goal_id, title, points, 
  is_positive, created_at
)

-- Aktivitäts-Logs
activity_logs (
  id, user_id, activity_id, 
  completed_at, points_earned
)

-- Ernährungs-Logs
nutrition_logs (
  id, user_id, meal_type, 
  calories, logged_at
)
\`\`\`

## Was wir NICHT verwenden

### Überflüssige Tools
- **Redux**: React State + Supabase reicht
- **GraphQL**: REST APIs sind einfacher
- **Microservices**: Monolith ist einfacher
- **Docker**: Lokale Entwicklung reicht
- **Jest/Testing**: Manuelles Testen reicht
- **Storybook**: Zu komplex für private App
- **Webpack Config**: Next.js macht das

### Komplexe Services
- **Separate Auth Service**: Supabase Auth reicht
- **Message Queues**: Nicht nötig
- **CDN**: Vercel macht das automatisch
- **Monitoring Tools**: Supabase Dashboard reicht
- **Error Tracking**: Console.log reicht erstmal

## Entwicklungsphilosophie

### Keep It Simple
- **Ein Tool pro Problem**: Nicht 5 Tools für eine Aufgabe
- **Bewährte Lösungen**: Keine experimentellen Tools
- **Weniger Konfiguration**: Defaults verwenden
- **Schneller Start**: Sofort loslegen können

### Pragmatisch
- **Perfekt ist der Feind von gut**: Erstmal zum Laufen bringen
- **Optimierung später**: Erst Features, dann Performance
- **Einfache Lösungen**: Komplexität nur wenn nötig
- **Dokumentation**: Code soll selbsterklärend sein

## Upgrade-Pfad (Zukunft)

### Wenn die App wächst
- **Testing**: Jest hinzufügen
- **Monitoring**: Sentry oder ähnliches
- **Performance**: React Query für Caching
- **Mobile**: React Native oder PWA verbessern
- **CI/CD**: GitHub Actions einrichten

### Wenn mehr Nutzer kommen
- **Caching**: Redis hinzufügen
- **CDN**: Cloudflare oder ähnliches
- **Database**: Optimierungen und Indizes
- **Monitoring**: Erweiterte Analytics
