-- Vollständige Reparatur der user_profiles Tabelle
-- Prüfe aktuelle Struktur
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Füge alle fehlenden Spalten hinzu
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS daily_points_goal INTEGER DEFAULT 50;

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS daily_calorie_goal INTEGER DEFAULT 2000;

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS activity_level TEXT DEFAULT 'moderate';

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Stelle sicher, dass created_at existiert
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Aktualisiere NULL-Werte in updated_at
UPDATE user_profiles 
SET updated_at = NOW() 
WHERE updated_at IS NULL;

-- Aktualisiere NULL-Werte in created_at
UPDATE user_profiles 
SET created_at = NOW() 
WHERE created_at IS NULL;

-- Erstelle oder aktualisiere den Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Lösche alten Trigger falls vorhanden
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;

-- Erstelle neuen Trigger
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Prüfe das finale Ergebnis
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Zeige alle vorhandenen Profile
SELECT id, name, daily_points_goal, daily_calorie_goal, activity_level, created_at, updated_at
FROM user_profiles;
