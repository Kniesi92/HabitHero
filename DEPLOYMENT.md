# 🚀 Vercel Deployment Guide

## Voraussetzungen
- [x] Supabase Projekt erstellt
- [x] Datenbank-Tabellen erstellt (SQL Scripts ausgeführt)
- [x] GitHub Repository erstellt

## Deployment Schritte

### 1. GitHub Repository
\`\`\`bash
git init
git add .
git commit -m "Initial commit: HabitHero App"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/habitHero.git
git push -u origin main
\`\`\`

### 2. Vercel Deployment
1. Gehe zu [vercel.com](https://vercel.com)
2. "New Project" klicken
3. GitHub Repository auswählen
4. Framework: **Next.js** (automatisch erkannt)

### 3. Environment Variables setzen
In Vercel Dashboard → Settings → Environment Variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://dein-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-anon-key
SUPABASE_SERVICE_ROLE_KEY=dein-service-role-key
\`\`\`

### 4. Deploy!
- Vercel deployed automatisch bei jedem Git Push
- Domain: `https://dein-projekt.vercel.app`

## ✅ Nach dem Deployment testen
- [ ] Login/Registrierung
- [ ] Dashboard lädt
- [ ] Aktivitäten werden gespeichert
- [ ] Punkte werden korrekt angezeigt
- [ ] Profil funktioniert
\`\`\`

Ich optimiere auch die package.json für Vercel:
