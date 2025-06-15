# HabitHero - Vereinfachter Projektplan

Dieser Plan fokussiert sich auf die Kernfunktionen und "Keep it simple" Ansatz für private Nutzung.

## Phase 1: Grundlagen (1-2 Wochen)

### Ziele
- Projekt aufsetzen und zum Laufen bringen
- Einfache Benutzeranmeldung
- Grundlegende UI

### Aufgaben
1. **Projekt Setup**
   - Next.js Projekt erstellen
   - Tailwind CSS einrichten
   - shadcn/ui installieren
   - Git Repository erstellen

2. **Supabase Setup**
   - Supabase Projekt erstellen
   - Authentifizierung konfigurieren
   - Erste Datenbank-Tabellen anlegen

3. **Basis UI**
   - Layout-Komponenten erstellen
   - Anmelde-/Registrierungsseiten
   - Einfache Navigation

### Entscheidungen vor Start
- [x] App-Name und grundlegendes Design
- [x] Welche Anmeldemethoden (E-Mail, Google?)
- [x] Grundlegende Farbpalette

## Phase 2: Kernfunktionen (2-3 Wochen)

### Ziele
- Ziele und Aktivitäten verwalten
- Punkte-System implementieren
- Einfache Statistiken

### Aufgaben
1. **Ziele-System**
   - Ziele erstellen/bearbeiten/löschen
   - Vordefinierte Ziele-Bibliothek
   - Kategorien (Sport, Ernährung, etc.)

2. **Aktivitäten-Tracking**
   - Aktivitäten zu Zielen hinzufügen
   - Aktivitäten als erledigt markieren
   - Einfache Aktivitäten-Liste

3. **Punkte-System**
   - Punkte für Aktivitäten vergeben
   - Tägliche Punkte-Übersicht
   - Einfache Punkte-Historie

4. **Basis-Dashboard**
   - Heutige Punkte anzeigen
   - Aktuelle Ziele anzeigen
   - Letzte Aktivitäten

### Entscheidungen
- [ ] Punkte-Werte für verschiedene Aktivitäten
- [ ] Standard-Ziele definieren
- [ ] Einfache vs. detaillierte Aktivitäten

## Phase 3: Ernährungstracker (2 Wochen)

### Ziele
- Einfaches Mahlzeiten-Logging
- Kalorien-Tracking
- Integration ins Punkte-System

### Aufgaben
1. **Mahlzeiten-Logging**
   - Einfache Mahlzeit-Eingabe
   - Häufige Lebensmittel speichern
   - Wasser-Tracking

2. **Kalorien-System**
   - Tägliches Kalorienziel setzen
   - Einfache Kalorien-Berechnung
   - Übersicht über Kalorienverbrauch

3. **Punkte-Integration**
   - Punkte für Kalorienziele
   - Negative Punkte bei Überschreitung

### Entscheidungen
- [ ] Einfache Lebensmittel-Datenbank vs. API
- [ ] Wie detailliert soll das Tracking sein?

## Phase 4: Gamification (1-2 Wochen)

### Ziele
- Achievements implementieren
- Streaks verfolgen
- Motivierende Elemente

### Aufgaben
1. **Achievements**
   - Einfache Erfolge definieren
   - Achievement-Anzeige
   - Benachrichtigungen bei Erfolgen

2. **Streaks**
   - Tägliche Aktivitäts-Streaks
   - Streak-Anzeige im Dashboard
   - Streak-Belohnungen

3. **Motivation**
   - Einfache Fortschrittsbalken
   - Positive Nachrichten
   - Tägliche Zusammenfassung

### Entscheidungen
- [ ] Welche Achievements sind wichtig?
- [ ] Wie oft Benachrichtigungen?

## Phase 5: Statistiken & Freunde (2 Wochen)

### Ziele
- Bessere Statistiken
- Einfaches Freunde-System
- Grundlegende Challenges

### Aufgaben
1. **Erweiterte Statistiken**
   - Wochen-/Monats-Übersichten
   - Einfache Diagramme
   - Trend-Anzeigen

2. **Freunde-System**
   - Freunde per E-Mail einladen
   - Punkte-Vergleich
   - Einfache Aktivitäts-Feeds

3. **Mini-Challenges**
   - Wöchentliche Challenges
   - Freunde herausfordern
   - Einfache Bestenlisten

### Entscheidungen
- [ ] Wie privat sollen Daten sein?
- [ ] Welche Challenge-Typen?

## Phase 6: Polishing (1 Woche)

### Ziele
- App verfeinern
- Bugs beheben
- Mit Freunden testen

### Aufgaben
1. **Testing & Bugfixes**
   - Mit Familie/Freunden testen
   - Offensichtliche Probleme beheben
   - Mobile Optimierung

2. **UI-Verbesserungen**
   - Design verfeinern
   - Benutzerfreundlichkeit verbessern
   - Responsive Design checken

3. **Deployment**
   - Auf Vercel deployen
   - Domain einrichten (optional)
   - Backup-Strategie

## Nach dem Launch

### Sofort (erste Woche)
- Feedback von ersten Nutzern sammeln
- Kritische Bugs schnell beheben
- Nutzung beobachten

### Kurz-/Mittelfristig
- Features basierend auf Feedback hinzufügen
- Performance optimieren
- Neue Aktivitäten/Ziele hinzufügen

## Vereinfachungen für private Nutzung

### Was wir NICHT brauchen
- Komplexe CI/CD Pipelines
- Umfangreiche Tests (nur basics)
- Skalierungs-Optimierungen
- Enterprise-Features
- Komplexe Monitoring-Systeme

### Was wir einfach halten
- Deployment: Einfach über Vercel Dashboard
- Testing: Manuell mit Freunden/Familie
- Monitoring: Supabase Dashboard reicht
- Backup: Supabase macht das automatisch
- Updates: Direkt über Git push zu Vercel
