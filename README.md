# HabitHero 🎯

Ein gamifizierter Habit- und Ernährungstracker, der durch Punkte, Achievements und Ziele zu einem gesunden Lebensstil motiviert.

## 🚀 Features

- **Gamifiziertes Punktesystem**: Sammle Punkte für positive Aktivitäten
- **Ziele-Management**: Setze und verfolge persönliche Ziele
- **Aktivitäten-Tracking**: Markiere erledigte Aktivitäten
- **Ernährungs-Tracker**: Protokolliere Mahlzeiten und Kalorien
- **Achievements**: Schalte Erfolge frei
- **Statistiken**: Verfolge deinen Fortschritt
- **Social Features**: Teile Erfolge mit Freunden (geplant)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Auth, Database, Storage)
- **Deployment**: Vercel
- **Database**: PostgreSQL (via Supabase)

## 📦 Installation

1. **Repository klonen**
   \`\`\`bash
   git clone https://github.com/[dein-username]/habit-hero.git
   cd habit-hero
   \`\`\`

2. **Dependencies installieren**
   \`\`\`bash
   npm install
   \`\`\`

3. **Umgebungsvariablen einrichten**
   
   Erstelle eine `.env.local` Datei:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=deine_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_supabase_anon_key
   \`\`\`

4. **Datenbank einrichten**
   
   Führe die SQL-Skripte in `scripts/` in deiner Supabase-Instanz aus:
   - `01-create-tables.sql`
   - `02-seed-activities.sql`

5. **Entwicklungsserver starten**
   \`\`\`bash
   npm run dev
   \`\`\`

   Die App ist dann unter [http://localhost:3000](http://localhost:3000) verfügbar.

## 🗄️ Datenbank Schema

### Haupttabellen
- `user_profiles` - Erweiterte Benutzerprofile
- `goals` - Persönliche Ziele der Benutzer
- `activities` - Aktivitäten-Vorlagen
- `activity_logs` - Protokoll der durchgeführten Aktivitäten
- `nutrition_logs` - Ernährungs-Einträge

## 🎯 Roadmap

### Phase 1 (Aktuell)
- [x] Basis-Setup und Authentifizierung
- [x] Dashboard mit Aktivitäten-Tracking
- [ ] Echte Datenbank-Verbindungen
- [ ] Ziele-Verwaltung

### Phase 2
- [ ] Ernährungs-Tracker
- [ ] Achievements-System
- [ ] Erweiterte Statistiken

### Phase 3
- [ ] Social Features
- [ ] Challenges
- [ ] Mobile Optimierungen

## 🤝 Entwicklung

### Projektstruktur
\`\`\`
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Authentifizierung
│   └── dashboard/      # Hauptbereich
├── components/         # UI-Komponenten
│   ├── layout/        # Layout-Komponenten
│   └── ui/            # shadcn/ui Komponenten
└── lib/               # Utilities
    ├── supabase.ts    # Supabase Client
    └── auth.ts        # Auth-Funktionen
\`\`\`

### Entwicklungsphilosophie
- **Keep it Simple**: Einfache, pragmatische Lösungen
- **Mobile First**: Optimiert für mobile Nutzung
- **Gamification**: Motivierende Elemente im Fokus

## 📝 Scripts

- `npm run dev` - Entwicklungsserver starten
- `npm run build` - Produktions-Build erstellen
- `npm run start` - Produktionsserver starten
- `npm run lint` - Code-Qualität prüfen

## 🔧 Konfiguration

### Supabase Setup
1. Neues Supabase-Projekt erstellen
2. SQL-Skripte aus `scripts/` ausführen
3. Row Level Security Policies sind bereits konfiguriert
4. API-Keys in `.env.local` eintragen

### Vercel Deployment
1. Repository mit Vercel verbinden
2. Umgebungsvariablen in Vercel-Dashboard eintragen
3. Automatisches Deployment bei Git Push

## 🐛 Bekannte Issues

- Dashboard zeigt noch Beispiel-Daten (wird in nächster Version behoben)
- Punkte-Berechnung noch nicht mit Datenbank verbunden

## 📄 Lizenz

Dieses Projekt ist für private Nutzung entwickelt.

## 👨‍💻 Autor

Entwickelt mit ❤️ für einen gesunden Lebensstil.

---

**Status**: 🚧 In aktiver Entwicklung

Für Fragen oder Feedback, erstelle gerne ein Issue!
