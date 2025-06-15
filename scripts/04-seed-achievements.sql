-- Standard-Achievements hinzufügen
INSERT INTO achievements (name, description, icon, badge_color, requirement_type, requirement_value, requirement_timeframe, points_reward) VALUES
-- Starter Achievements
('Erste Schritte', 'Dein erstes Ziel erstellt', 'Target', '#10B981', 'goal_completion', 1, 'all_time', 10),
('Punktesammler', '100 Punkte erreicht', 'Trophy', '#F59E0B', 'points', 100, 'all_time', 20),
('Durchstarter', '7 Tage in Folge aktiv', 'Flame', '#EF4444', 'streak', 7, 'daily', 50),

-- Punkte-Achievements
('Hundertschaft', '100 Punkte an einem Tag', 'Star', '#F59E0B', 'points', 100, 'daily', 25),
('Punkteprofi', '1000 Punkte insgesamt', 'Award', '#F59E0B', 'points', 1000, 'all_time', 100),
('Punktemeister', '5000 Punkte insgesamt', 'Crown', '#F59E0B', 'points', 5000, 'all_time', 250),

-- Streak-Achievements
('Wochenkrieger', '7 Tage Streak', 'Calendar', '#3B82F6', 'streak', 7, 'daily', 50),
('Monatsmeister', '30 Tage Streak', 'CalendarDays', '#3B82F6', 'streak', 30, 'daily', 200),
('Jahresheld', '365 Tage Streak', 'CalendarCheck', '#3B82F6', 'streak', 365, 'daily', 1000),

-- Aktivitäts-Achievements
('Aktivitätsfan', '50 Aktivitäten abgeschlossen', 'CheckCircle', '#10B981', 'activity_count', 50, 'all_time', 75),
('Aktivitätsprofi', '200 Aktivitäten abgeschlossen', 'CheckCircle2', '#10B981', 'activity_count', 200, 'all_time', 150),
('Aktivitätsmeister', '500 Aktivitäten abgeschlossen', 'CheckCheck', '#10B981', 'activity_count', 500, 'all_time', 300),

-- Sport-Achievements
('Läufer', '10x Joggen absolviert', 'Play', '#EF4444', 'activity_count', 10, 'all_time', 50),
('Kraftpaket', '20x Krafttraining absolviert', 'Dumbbell', '#EF4444', 'activity_count', 20, 'all_time', 75),
('Ausdauerheld', '50x Ausdauertraining absolviert', 'Zap', '#EF4444', 'activity_count', 50, 'all_time', 150),

-- Ernährungs-Achievements
('Gesund-Esser', '7 Tage Kalorienziel erreicht', 'Apple', '#10B981', 'goal_completion', 7, 'weekly', 50),
('Wasser-Trinker', '30 Tage 2L Wasser getrunken', 'Droplets', '#3B82F6', 'activity_count', 30, 'all_time', 100),
('Gemüse-Fan', '50x Obst/Gemüse gegessen', 'Cherry', '#10B981', 'activity_count', 50, 'all_time', 75),

-- Lifestyle-Achievements
('Frühaufsteher', '14 Tage früh aufgestanden', 'Sunrise', '#F59E0B', 'activity_count', 14, 'all_time', 50),
('Digital Detox', '7 Tage handy-freie Zeit', 'PhoneOff', '#8B5CF6', 'activity_count', 7, 'all_time', 75),
('Ordnungshüter', '30x Zimmer aufgeräumt', 'Home', '#10B981', 'activity_count', 30, 'all_time', 60),

-- Social-Achievements
('Sozialer Schmetterling', '20x Freunde getroffen', 'Users', '#EC4899', 'activity_count', 20, 'all_time', 100),
('Helfer', '10x jemandem geholfen', 'Heart', '#EF4444', 'activity_count', 10, 'all_time', 75),
('Dankbarer Mensch', '30x Dankbarkeit gezeigt', 'ThumbsUp', '#10B981', 'activity_count', 30, 'all_time', 50);
