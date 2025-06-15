-- Standard-Aktivitäten hinzufügen
-- Sport & Fitness Aktivitäten
INSERT INTO activities (category_id, title, description, points, is_positive, default_duration, icon) 
SELECT 
    c.id,
    activity.title,
    activity.description,
    activity.points,
    activity.is_positive,
    activity.default_duration,
    activity.icon
FROM goal_categories c,
(VALUES
    ('Sport & Fitness', '30 Min Joggen', 'Ausdauertraining durch Joggen', 30, true, 30, 'Play'),
    ('Sport & Fitness', '45 Min Krafttraining', 'Muskelaufbau und Krafttraining', 40, true, 45, 'Dumbbell'),
    ('Sport & Fitness', '60 Min Radfahren', 'Ausdauertraining mit dem Fahrrad', 35, true, 60, 'Bike'),
    ('Sport & Fitness', '30 Min Yoga', 'Entspannung und Flexibilität', 25, true, 30, 'Flower2'),
    ('Sport & Fitness', '20 Min Spazieren', 'Leichte Bewegung an der frischen Luft', 15, true, 20, 'MapPin'),
    ('Sport & Fitness', '10.000 Schritte', 'Tägliches Schrittziel erreichen', 20, true, null, 'Footprints'),
    
    -- Ernährungs-Aktivitäten
    ('Ernährung', 'Gesunde Mahlzeit', 'Ausgewogene, nährstoffreiche Mahlzeit', 15, true, null, 'Apple'),
    ('Ernährung', '2L Wasser trinken', 'Tägliches Wasserziel erreichen', 10, true, null, 'Droplets'),
    ('Ernährung', '5 Portionen Obst/Gemüse', 'Empfohlene Tagesration Obst und Gemüse', 20, true, null, 'Cherry'),
    ('Ernährung', 'Vitamine nehmen', 'Nahrungsergänzungsmittel einnehmen', 5, true, null, 'Pill'),
    ('Ernährung', 'Fast Food gegessen', 'Ungesunde Schnellimbiss-Mahlzeit', -15, false, null, 'Zap'),
    ('Ernährung', 'Süßigkeiten genascht', 'Übermäßiger Süßigkeiten-Konsum', -5, false, null, 'Candy'),
    ('Ernährung', 'Zu viel Alkohol', 'Übermäßiger Alkoholkonsum', -10, false, null, 'Wine'),
    
    -- Gesundheits-Aktivitäten
    ('Gesundheit', '8 Stunden Schlaf', 'Ausreichend Schlaf bekommen', 15, true, 480, 'Moon'),
    ('Gesundheit', '10 Min Meditation', 'Achtsamkeit und Entspannung', 15, true, 10, 'Brain'),
    ('Gesundheit', 'Arzttermin wahrgenommen', 'Vorsorge und Gesundheitscheck', 25, true, null, 'Stethoscope'),
    ('Gesundheit', 'Medikamente genommen', 'Verschriebene Medikamente eingenommen', 10, true, null, 'Pill'),
    
    -- Bildungs-Aktivitäten
    ('Bildung', '30 Min Lesen', 'Buch oder Artikel lesen', 20, true, 30, 'BookOpen'),
    ('Bildung', 'Online-Kurs Lektion', 'Weiterbildung durch Online-Lernen', 25, true, null, 'GraduationCap'),
    ('Bildung', 'Podcast gehört', 'Bildungs-Podcast angehört', 10, true, null, 'Headphones'),
    ('Bildung', 'Neue Sprache gelernt', 'Sprachlern-Session absolviert', 20, true, 30, 'Languages'),
    
    -- Lifestyle-Aktivitäten
    ('Lifestyle', 'Zimmer aufgeräumt', 'Ordnung und Sauberkeit', 10, true, null, 'Home'),
    ('Lifestyle', 'To-Do Liste abgearbeitet', 'Produktivität und Organisation', 15, true, null, 'CheckSquare'),
    ('Lifestyle', 'Früh aufgestanden', 'Vor 7 Uhr aufgestanden', 10, true, null, 'Sunrise'),
    ('Lifestyle', 'Handy-freie Zeit', '1 Stunde ohne Smartphone', 15, true, 60, 'PhoneOff'),
    ('Lifestyle', 'Zu viel TV geschaut', 'Mehr als 3 Stunden Fernsehen', -10, false, null, 'Tv'),
    ('Lifestyle', 'Social Media Überkonsum', 'Mehr als 2 Stunden Social Media', -5, false, null, 'Smartphone'),
    
    -- Social-Aktivitäten
    ('Social', 'Zeit mit Familie', 'Qualitätszeit mit der Familie verbracht', 20, true, null, 'Users'),
    ('Social', 'Freunde getroffen', 'Soziale Kontakte gepflegt', 15, true, null, 'Coffee'),
    ('Social', 'Jemandem geholfen', 'Anderen Menschen geholfen', 25, true, null, 'Heart'),
    ('Social', 'Dankbarkeit gezeigt', 'Dankbarkeit ausgedrückt', 10, true, null, 'ThumbsUp')
) AS activity(category, title, description, points, is_positive, default_duration, icon)
WHERE c.name = activity.category;
