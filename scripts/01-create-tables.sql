-- HabitHero Database Schema
-- Erstelle alle notwendigen Tabellen für das Habit-Tracking System

-- 1. Erweiterte Benutzerprofile (ergänzt Supabase Auth)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    avatar_url TEXT,
    age INTEGER,
    height INTEGER, -- in cm
    weight DECIMAL(5,2), -- in kg
    activity_level TEXT CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active')) DEFAULT 'moderate',
    daily_calorie_goal INTEGER DEFAULT 2000,
    daily_points_goal INTEGER DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Ziele-Kategorien
CREATE TABLE IF NOT EXISTS goal_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- Lucide icon name
    color TEXT DEFAULT '#10B981', -- Tailwind green-500
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Benutzer-Ziele
CREATE TABLE IF NOT EXISTS goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES goal_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    target_value INTEGER, -- z.B. 30 für "30 Min Sport"
    target_unit TEXT, -- z.B. "minutes", "times", "liters"
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Aktivitäten-Vorlagen
CREATE TABLE IF NOT EXISTS activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES goal_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    points INTEGER NOT NULL, -- Kann positiv oder negativ sein
    is_positive BOOLEAN DEFAULT true, -- true = gute Gewohnheit, false = schlechte
    default_duration INTEGER, -- Standard-Dauer in Minuten
    icon TEXT, -- Lucide icon name
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Benutzer-spezifische Aktivitäten (Custom Activities)
CREATE TABLE IF NOT EXISTS user_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES activities(id) ON DELETE SET NULL, -- NULL wenn custom
    title TEXT NOT NULL,
    description TEXT,
    points INTEGER NOT NULL,
    is_positive BOOLEAN DEFAULT true,
    is_custom BOOLEAN DEFAULT false, -- true wenn vom Benutzer erstellt
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Aktivitäts-Logs (Was wurde wann gemacht)
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    user_activity_id UUID REFERENCES user_activities(id) ON DELETE CASCADE NOT NULL,
    points_earned INTEGER NOT NULL,
    duration INTEGER, -- Dauer in Minuten
    notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Ernährungs-Logs
CREATE TABLE IF NOT EXISTS nutrition_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')) NOT NULL,
    food_name TEXT NOT NULL,
    calories INTEGER,
    protein DECIMAL(5,2), -- in g
    carbs DECIMAL(5,2), -- in g
    fat DECIMAL(5,2), -- in g
    notes TEXT,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Achievements (Erfolge)
CREATE TABLE IF NOT EXISTS achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT, -- Lucide icon name
    badge_color TEXT DEFAULT '#F59E0B', -- Tailwind amber-500
    requirement_type TEXT CHECK (requirement_type IN ('points', 'streak', 'activity_count', 'goal_completion')) NOT NULL,
    requirement_value INTEGER NOT NULL,
    requirement_timeframe TEXT, -- 'daily', 'weekly', 'monthly', 'all_time'
    points_reward INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Benutzer-Achievements (Freigeschaltete Erfolge)
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- 10. Tägliche Zusammenfassungen (für Performance)
CREATE TABLE IF NOT EXISTS daily_summaries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    total_points INTEGER DEFAULT 0,
    activities_completed INTEGER DEFAULT 0,
    calories_consumed INTEGER DEFAULT 0,
    goals_achieved INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_date ON activity_logs(user_id, completed_at);
CREATE INDEX IF NOT EXISTS idx_nutrition_logs_user_date ON nutrition_logs(user_id, logged_at);
CREATE INDEX IF NOT EXISTS idx_daily_summaries_user_date ON daily_summaries(user_id, date);
CREATE INDEX IF NOT EXISTS idx_goals_user_active ON goals(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_user_activities_user ON user_activities(user_id);

-- Row Level Security (RLS) aktivieren
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_summaries ENABLE ROW LEVEL SECURITY;

-- RLS Policies erstellen
-- Benutzer können nur ihre eigenen Daten sehen und bearbeiten

-- user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- goals
CREATE POLICY "Users can manage own goals" ON goals FOR ALL USING (auth.uid() = user_id);

-- user_activities
CREATE POLICY "Users can manage own activities" ON user_activities FOR ALL USING (auth.uid() = user_id);

-- activity_logs
CREATE POLICY "Users can manage own activity logs" ON activity_logs FOR ALL USING (auth.uid() = user_id);

-- nutrition_logs
CREATE POLICY "Users can manage own nutrition logs" ON nutrition_logs FOR ALL USING (auth.uid() = user_id);

-- user_achievements
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert achievements" ON user_achievements FOR INSERT WITH CHECK (true);

-- daily_summaries
CREATE POLICY "Users can view own summaries" ON daily_summaries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can manage summaries" ON daily_summaries FOR ALL USING (true);

-- Trigger für updated_at Timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_daily_summaries_updated_at BEFORE UPDATE ON daily_summaries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Funktion zum automatischen Erstellen eines Benutzerprofils
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger für automatische Profil-Erstellung bei Registrierung
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

COMMENT ON TABLE user_profiles IS 'Erweiterte Benutzerprofile mit Gesundheitsdaten';
COMMENT ON TABLE goals IS 'Persönliche Ziele der Benutzer';
COMMENT ON TABLE activities IS 'Vordefinierte Aktivitäten-Vorlagen';
COMMENT ON TABLE user_activities IS 'Benutzer-spezifische Aktivitäten';
COMMENT ON TABLE activity_logs IS 'Log aller durchgeführten Aktivitäten';
COMMENT ON TABLE nutrition_logs IS 'Ernährungs-Einträge der Benutzer';
COMMENT ON TABLE achievements IS 'Verfügbare Erfolge/Achievements';
COMMENT ON TABLE user_achievements IS 'Freigeschaltete Erfolge pro Benutzer';
COMMENT ON TABLE daily_summaries IS 'Tägliche Zusammenfassungen für Performance';
