# HabitHero - Feature-Dokumentation (Vereinfacht)

Diese Dokumentation beschreibt die geplanten Features für HabitHero mit Fokus auf Einfachheit und private Nutzung.

## Kern-Features (Must-Have)

### 1. Benutzer-System
- **Registrierung/Anmeldung**
  - E-Mail + Passwort
  - Optional: Google Login
  - Einfaches Profil (Name, Foto)
- **Gesundheitsdaten**
  - Alter, Größe, Gewicht
  - Aktivitätslevel
  - Kalorienbedarf-Berechnung

### 2. Ziele-System
- **Ziel-Kategorien**
  - Sport/Fitness
  - Ernährung/Gewicht
  - Bildung
  - Lifestyle
- **Ziel-Verwaltung**
  - Aus Vorlagen wählen oder eigene erstellen
  - Ziele aktivieren/deaktivieren
  - Einfache Fortschritts-Anzeige

### 3. Aktivitäten & Punkte
- **Aktivitäten-Tracking**
  - Aktivität als "erledigt" markieren
  - Einfache Aktivitäten-Liste
  - Schnell-Buttons für häufige Aktivitäten
- **Punkte-System**
  - Positive Punkte für gute Aktivitäten
  - Negative Punkte für schlechte Gewohnheiten
  - Tägliche Punkte-Übersicht
  - Einfache Punkte-Historie

### 4. Ernährungstracker
- **Mahlzeiten-Logging**
  - Einfache Eingabe von Mahlzeiten
  - Häufige Lebensmittel speichern
  - Grobe Kalorien-Schätzung
- **Kalorien-Tracking**
  - Tägliches Kalorienziel
  - Einfache Übersicht
  - Integration ins Punkte-System

### 5. Dashboard
- **Tages-Übersicht**
  - Aktuelle Punkte
  - Heutige Aktivitäten
  - Kalorienbilanz
- **Schnell-Aktionen**
  - Häufige Aktivitäten markieren
  - Mahlzeit hinzufügen
  - Ziele checken

## Gamification-Features

### 1. Achievements
- **Einfache Erfolge**
  - Erste 100 Punkte
  - 7 Tage Streak
  - Erstes Ziel erreicht
- **Anzeige**
  - Achievement-Badge
  - Kurze Glückwunsch-Nachricht
  - Übersicht aller Erfolge

### 2. Streaks
- **Aktivitäts-Streaks**
  - Tägliche Aktivität
  - Kalorienziel eingehalten
  - Punkte-Ziel erreicht
- **Streak-Anzeige**
  - Aktuelle Streak-Länge
  - Längste Streak
  - Streak-Kalender

### 3. Fortschritt
- **Einfache Visualisierung**
  - Fortschrittsbalken
  - Punkte-Diagramm
  - Wochen-Übersicht

## Social Features (Nice-to-Have)

### 1. Freunde
- **Freunde hinzufügen**
  - Per E-Mail einladen
  - Einfache Freundesliste
- **Vergleichen**
  - Punkte-Vergleich
  - Gemeinsame Ziele sehen

### 2. Mini-Challenges
- **Wöchentliche Challenges**
  - "Wer schafft mehr Punkte?"
  - "7 Tage Sport-Streak"
- **Einfache Bestenliste**
  - Wer ist vorne?
  - Einfache Belohnungen

## Statistiken (Einfach)

### 1. Basis-Statistiken
- **Punkte-Verlauf**
  - Letzte 7/30 Tage
  - Einfaches Linien-Diagramm
- **Aktivitäts-Übersicht**
  - Häufigste Aktivitäten
  - Kategorie-Verteilung

### 2. Trends
- **Einfache Trends**
  - "Du wirst besser!"
  - "Mehr Sport diese Woche"
  - Einfache Tipps

## Was wir NICHT implementieren (vorerst)

### Komplexe Features
- Detaillierte Nährwert-Analyse
- Komplexe Workout-Pläne
- Erweiterte Social-Features
- Push-Benachrichtigungen (erstmal)
- Offline-Modus
- Export-Funktionen

### Enterprise Features
- Team-Management
- Admin-Dashboards
- Komplexe Berechtigungen
- API für Drittanbieter
- Erweiterte Analytics

## Technische Vereinfachungen

### Datenbank
- Einfache Tabellen-Struktur
- Keine komplexen Beziehungen
- Standard-PostgreSQL Features

### UI/UX
- Standard shadcn/ui Komponenten
- Einfache, klare Navigation
- Mobile-first, aber nicht native
- Keine komplexen Animationen

### Performance
- Keine Optimierung für Millionen von Nutzern
- Einfache Caching-Strategien
- Standard Next.js Performance

## Erweiterungsmöglichkeiten (Zukunft)

### Wenn die App gut ankommt
- Native Mobile Apps
- Push-Benachrichtigungen
- Erweiterte Social Features
- Integration mit Fitness-Trackern
- Detailliertere Ernährungs-Features
- KI-basierte Empfehlungen

### Wenn mehr Nutzer dazukommen
- Performance-Optimierungen
- Erweiterte Statistiken
- Community-Features
- Premium-Features (optional)
