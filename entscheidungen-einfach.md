# HabitHero - Wichtige Entscheidungen (Vereinfacht)

Diese Entscheidungen müssen vor und während der Entwicklung getroffen werden.

## Vor dem Start (Wichtig)

### Design & Branding
- [x] **App-Name bestätigen**: "HabitHero" ✓
- [x] **Farbschema wählen**:
  - Primärfarbe: Grün für Gesundheit ✓
  - Sekundärfarbe: Blau ✓
  - Akzentfarbe: Orange/Gelb ✓
  - Dark Mode: Später ✓
- [x] **Logo/Icon**: Trophy-Icon verwenden ✓

### Grundfunktionen
- [x] **Anmeldung**: 
  - E-Mail + Passwort ✓
  - Google Login: Später
  - Registrierung erforderlich ✓
- [x] **Sprache**: Nur Deutsch ✓
- [x] **Zielgruppe bestätigen**: Familie/Freunde ✓

## Phase 1: Setup

### Technische Entscheidungen
- [x] **TypeScript**: Ja ✓
- [x] **Deployment**: Vercel ✓
- [x] **Domain**: Vercel Subdomain ✓

## Phase 2: Kernfunktionen

### Punkte-System
- [ ] **Punkte-Werte festlegen**:
  - 30 Min Sport = 30 Punkte
  - Gesunde Mahlzeit = 15 Punkte  
  - TV schauen = -10 Punkte
  - Süßigkeiten = -5 Punkte
- [ ] **Punkte-Bereiche**:
  - Tägliches Ziel: 50 Punkte
  - Maximum pro Tag: 200 Punkte
  - Minimum (mit Minus): -50 Punkte

### Standard-Ziele definieren
- [ ] **Sport/Fitness**:
  - "Täglich 30 Min Bewegung"
  - "3x pro Woche Sport"
  - "10.000 Schritte täglich"
- [ ] **Ernährung**:
  - "Kalorienziel einhalten"
  - "5 Portionen Obst/Gemüse"
  - "2L Wasser trinken"
- [ ] **Lifestyle**:
  - "8 Stunden Schlaf"
  - "Weniger Bildschirmzeit"
  - "Meditation/Entspannung"

### Aktivitäten-Bibliothek
- [ ] **Sport-Aktivitäten**:
  - Joggen, Radfahren, Schwimmen
  - Krafttraining, Yoga
  - Spazieren gehen
- [ ] **Ernährungs-Aktivitäten**:
  - Gesunde Mahlzeit
  - Wasser trinken
  - Vitamine nehmen
- [ ] **Negative Aktivitäten**:
  - Fast Food
  - Süßigkeiten
  - Zu viel TV/Social Media

## Phase 3: Ernährung

### Ernährungs-Tracking
- [ ] **Detailgrad**:
  - Einfach: Nur Kalorien schätzen ✓
  - Mittel: Kalorien + Makros
  - Komplex: Alle Nährstoffe
- [ ] **Lebensmittel-Datenbank**:
  - Eigene kleine Datenbank ✓
  - API verwenden
- [ ] **Eingabe-Methode**:
  - Nur Text-Eingabe ✓
  - Barcode-Scanner (später)
  - Foto-Erkennung (viel später)

## Phase 4: Gamification

### Achievements definieren
- [ ] **Starter-Achievements**:
  - "Erste Schritte" - Erstes Ziel erstellt
  - "Punktesammler" - 100 Punkte erreicht
  - "Durchstarter" - 7 Tage aktiv
- [ ] **Sport-Achievements**:
  - "Läufer" - 10x Joggen
  - "Kraftpaket" - 20x Krafttraining
  - "Ausdauer" - 30 Tage Sport-Streak
- [ ] **Ernährungs-Achievements**:
  - "Gesund-Esser" - 7 Tage Kalorienziel
  - "Wasser-Trinker" - 30 Tage 2L Wasser
  - "Gemüse-Fan" - 50x Gemüse gegessen

### Benachrichtigungen
- [ ] **Häufigkeit**:
  - Täglich: Erinnerung an Aktivitäten
  - Bei Achievements: Sofort
  - Wöchentlich: Zusammenfassung
- [ ] **Ton**:
  - Motivierend und positiv
  - Nicht nervig oder schulmeisterlich
  - Personalisierbar

## Phase 5: Social Features

### Privatsphäre
- [ ] **Standard-Einstellungen**:
  - Alles privat (nur Freunde sehen Daten) ✓
  - Öffentliche Bestenlisten: Nein
  - Aktivitäts-Details teilen oder nur Punkte?
- [ ] **Freunde-System**:
  - Nur per E-Mail-Einladung ✓
  - Freunde-Codes
  - QR-Code zum Hinzufügen

### Challenges
- [ ] **Challenge-Typen**:
  - "Wer schafft mehr Punkte diese Woche?"
  - "7-Tage Sport-Challenge"
  - "Gesunde Ernährung Challenge"
- [ ] **Belohnungen**:
  - Nur virtuell (Badges, Titel) ✓
  - Echte Belohnungen (selbst organisiert)

## Einfache Entscheidungen (Später)

### Design-Details
- Schriftart: Inter ✓
- Animationen: Einfach halten ✓
- Icons: Lucide React Icons ✓
- Sounds: Erstmal ohne ✓

### Erweiterte Features
- Push-Benachrichtigungen (Phase 2)
- Offline-Modus (wenn nötig)
- Export-Funktionen (später)
- API für andere Apps (viel später)

## Entscheidungs-Prinzipien

### Bei Unsicherheit
1. **Einfachste Lösung wählen** ✓
2. **Später ändern ist okay** ✓
3. **Nutzer fragen** (Familie/Freunde)
4. **Ausprobieren** statt lange überlegen ✓

### Prioritäten
1. **Funktioniert es?** (Wichtigste Frage) ✓
2. **Ist es einfach zu bedienen?** ✓
3. **Macht es Spaß?**
4. **Sieht es gut aus?** (Letzter Punkt)

## Nächste Schritte

### Sofort entscheiden
- [x] App-Name und Grundfarben ✓
- [x] TypeScript ja/nein ✓
- [x] Anmelde-Methoden ✓

### Diese Woche entscheiden  
- [ ] Punkte-Werte für Aktivitäten
- [ ] Standard-Ziele definieren
- [ ] Erste Aktivitäten-Liste

### Nächste Woche entscheiden
- [ ] Ernährungs-Tracking Detailgrad
- [ ] Achievement-Liste
- [ ] Benachrichtigungs-Strategie
