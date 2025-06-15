-- Prüfe und repariere die user_profiles Tabelle
-- Erst schauen, was existiert
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Falls die Tabelle nicht die richtigen Spalten hat, füge sie hinzu
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS daily_points_goal INTEGER DEFAULT 50;

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS daily_calorie_goal INTEGER DEFAULT 2000;

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS activity_level TEXT DEFAULT 'moderate';

-- Prüfe das Ergebnis
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;
