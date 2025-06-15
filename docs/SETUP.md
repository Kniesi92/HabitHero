# HabitHero Setup Guide

## Voraussetzungen

- Node.js 18+ 
- npm 8+
- Supabase Account
- Vercel Account (für Deployment)

## Schritt-für-Schritt Setup

### 1. Supabase Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com)
2. Erstelle ein neues Projekt
3. Notiere dir die Projekt-URL und den anon key

### 2. Datenbank einrichten

1. Öffne den SQL Editor in Supabase
2. Führe `scripts/01-create-tables.sql` aus
3. Führe `scripts/02-seed-activities.sql` aus
4. Überprüfe, dass alle Tabellen erstellt wurden

### 3. Lokale Entwicklung

1. Repository klonen:
   \`\`\`bash
   git clone https://github.com/[username]/habit-hero.git
   cd habit-hero
   \`\`\`

2. Dependencies installieren:
   \`\`\`bash
   npm install
   \`\`\`

3. Umgebungsvariablen einrichten:
   \`\`\`bash
   cp .env.example .env.local
   # Bearbeite .env.local mit deinen Supabase-Credentials
   \`\`\`

4. Entwicklungsserver starten:
   \`\`\`bash
   npm run dev
   \`\`\`

### 4. Vercel Deployment

1. Repository mit Vercel verbinden
2. Umgebungsvariablen in Vercel eintragen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy!

## Troubleshooting

### Häufige Probleme

**Supabase Verbindung fehlgeschlagen**
- Überprüfe die URLs in `.env.local`
- Stelle sicher, dass Row Level Security aktiviert ist

**Build-Fehler**
- Führe `npm run type-check` aus
- Überprüfe TypeScript-Fehler

**Authentifizierung funktioniert nicht**
- Überprüfe Supabase Auth-Einstellungen
- Stelle sicher, dass Email-Bestätigung deaktiviert ist (für Entwicklung)

## Nächste Schritte

Nach dem Setup kannst du:
1. Einen Account erstellen
2. Das Dashboard erkunden
3. Erste Aktivitäten hinzufügen
4. Mit der Entwicklung beginnen!
